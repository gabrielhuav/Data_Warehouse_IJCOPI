#!/usr/bin/env python3
"""Preserve pinned input bytes; verify/reconstruct them using only the standard library.

Preparation consumes a PRIVATE inventory of already verified local paths. Neither
those paths nor download credentials are copied into the public catalogue.
"""
import argparse
import csv
import hashlib
import io
import json
import os
from pathlib import Path, PurePosixPath
import re
import sys
import tempfile

PART_BYTES = 20_000_000
BUFFER_BYTES = 1024 * 1024
ROOT = Path(__file__).resolve().parents[1]
REPO = ROOT.parent
CSV_FIELDS = ["id", "scope", "family", "name", "publisher", "original_filename",
              "bytes", "sha256", "md5", "licence", "doi", "download_url",
              "landing_urls", "availability", "stored_files", "restore_path"]


def read_json(path):
    with Path(path).open("r", encoding="utf-8-sig") as handle:
        return json.load(handle)


def json_bytes(value):
    return (json.dumps(value, ensure_ascii=False, indent=2) + "\n").encode("utf-8")


def safe_path(root, relative):
    """Reject traversal, absolute paths and symlinks, including symlink parents."""
    posix = PurePosixPath(relative)
    if (not relative or "\\" in relative or ":" in relative or posix.is_absolute()
            or any(part in ("", ".", "..") for part in posix.parts)):
        raise ValueError("Unsafe relative path: {!r}".format(relative))
    root = root.resolve()
    path = root.joinpath(*posix.parts)
    if path.resolve() != root and root not in path.resolve().parents:
        raise ValueError("Path escapes corpus: " + relative)
    current = path
    while current != root:
        if current.is_symlink():
            raise ValueError("Symlinks are not corpus files: " + relative)
        current = current.parent
    return path


def digest_paths(paths, each=None):
    whole = {"bytes": 0, "sha256": hashlib.sha256(), "md5": hashlib.md5()}
    for index, path in enumerate(paths):
        part = {"bytes": 0, "sha256": hashlib.sha256(), "md5": hashlib.md5()}
        with Path(path).open("rb") as handle:
            while True:
                block = handle.read(BUFFER_BYTES)
                if not block:
                    break
                for state in (whole, part):
                    state["bytes"] += len(block)
                    state["sha256"].update(block)
                    state["md5"].update(block)
        if each is not None:
            each(index, {"bytes": part["bytes"], "sha256": part["sha256"].hexdigest(),
                         "md5": part["md5"].hexdigest()})
    return {"bytes": whole["bytes"], "sha256": whole["sha256"].hexdigest(),
            "md5": whole["md5"].hexdigest()}


def check_digest(actual, expected, label):
    for field in ("bytes", "sha256", "md5"):
        if expected.get(field) is not None and actual[field] != expected[field]:
            raise ValueError("{}: {} mismatch (expected {}, found {})".format(
                label, field, expected[field], actual[field]))


def atomic_bytes(path, content):
    path.parent.mkdir(parents=True, exist_ok=True)
    fd, temp_name = tempfile.mkstemp(prefix=".corpus-", dir=str(path.parent))
    try:
        with os.fdopen(fd, "wb") as handle:
            handle.write(content)
        os.replace(temp_name, str(path))
    finally:
        if os.path.exists(temp_name):
            os.unlink(temp_name)


def csv_bytes(sources):
    output = io.StringIO(newline="")
    writer = csv.DictWriter(output, fieldnames=CSV_FIELDS, lineterminator="\n")
    writer.writeheader()
    for source in sources:
        row = {field: source.get(field) for field in CSV_FIELDS}
        row.update(source["expected"])
        row["landing_urls"] = " | ".join(page["url"] for page in source["landing_pages"])
        row["stored_files"] = " | ".join(part["path"] for part in source["storage"]["files"])
        writer.writerow(row)
    return output.getvalue().encode("utf-8")


def inventory_sources(inventory):
    groups = [("extension_sources", "extension_manifest"),
              ("original_sources", "original_study"),
              ("additional_inputs", "auxiliary_extract")]
    result = []
    for key, scope in groups:
        for source in inventory.get(key, []):
            result.append((source, scope))
    ids = [source["id"] for source, _ in result]
    if len(ids) != 65 or len(set(ids)) != 65:
        raise ValueError("Inventory must contain 65 unique logical inputs")
    if len(inventory.get("extension_sources", [])) != 62:
        raise ValueError("Inventory must retain all 62 manifest entries")
    if len(inventory.get("original_sources", [])) != 2 or len(inventory.get("additional_inputs", [])) != 1:
        raise ValueError("Expected two original inputs and one auxiliary extract")
    return result


def input_paths(source):
    if source.get("preferred_valid_path"):
        return [Path(source["preferred_valid_path"])], False
    parts = source.get("split_parts", [])
    if parts and source.get("concatenation_verified") and all(p.get("preferred_valid_path") for p in parts):
        paths = [Path(p["preferred_valid_path"]) for p in parts]
        for path, part in zip(paths, parts):
            check_digest(digest_paths([path]), part["expected"], source["id"] + " input part")
        return paths, True
    return [], False


def preserved_files(root, source, paths):
    """Concatenate source streams and split deterministically; never edit source files."""
    expected = source["expected"]
    split = expected["bytes"] > PART_BYTES
    filename = PurePosixPath(source["filename"].replace("\\", "/")).name
    files = []
    pending = []
    whole = {"bytes": 0, "sha256": hashlib.sha256(), "md5": hashlib.md5()}
    part = None
    handle = None

    def finish():
        if handle is None:
            return
        handle.close()
        part["sha256"] = part["sha256"].hexdigest()
        destination = safe_path(root, part["path"])
        if destination.exists():
            check_digest(digest_paths([destination]), part, source["id"] + " existing copy")
            Path(part["temporary"]).unlink()
        else:
            pending.append((Path(part["temporary"]), destination))
        files.append({key: part[key] for key in ("path", "bytes", "sha256")})

    try:
        for path in paths:
            with path.open("rb") as original:
                while True:
                    block = original.read(BUFFER_BYTES)
                    if not block:
                        break
                    whole["bytes"] += len(block)
                    whole["sha256"].update(block)
                    whole["md5"].update(block)
                    offset = 0
                    while offset < len(block):
                        if handle is None:
                            number = len(files) + 1
                            name = filename + (".{:03d}".format(number) if split else "")
                            relative = "originales/{}/{}".format(source["id"], name)
                            destination = safe_path(root, relative)
                            destination.parent.mkdir(parents=True, exist_ok=True)
                            fd, temporary = tempfile.mkstemp(prefix=".corpus-", dir=str(destination.parent))
                            handle = os.fdopen(fd, "wb")
                            part = {"path": relative, "bytes": 0, "sha256": hashlib.sha256(), "temporary": temporary}
                        size = min(PART_BYTES - part["bytes"], len(block) - offset)
                        section = block[offset:offset + size]
                        handle.write(section)
                        part["sha256"].update(section)
                        part["bytes"] += size
                        offset += size
                        if part["bytes"] == PART_BYTES:
                            finish()
                            handle = None
        if handle is not None:
            finish()
            handle = None
        actual = {"bytes": whole["bytes"], "sha256": whole["sha256"].hexdigest(), "md5": whole["md5"].hexdigest()}
        check_digest(actual, expected, source["id"] + " reconstructed input")
        for temporary, destination in pending:
            os.replace(str(temporary), str(destination))
        return files, actual
    finally:
        if handle is not None:
            handle.close()
        for temporary, _ in pending:
            if temporary.exists():
                temporary.unlink()
        if part and Path(part["temporary"]).exists():
            Path(part["temporary"]).unlink()


def restore_path(source, scope):
    if scope != "extension_manifest":
        return "warehouse/data/" + PurePosixPath(source["filename"]).name
    prefix = "warehouse_ampliado/snapshots/" if source.get("snapshot") else "warehouse_ampliado/datos_crudos/{}/".format(source["id"])
    return prefix + source["filename"].replace("\\", "/")


def prepare(args):
    root = args.root.resolve()
    inventory = read_json(args.inventory)
    items = inventory_sources(inventory)
    manifest_path = REPO / "warehouse_ampliado" / "fuentes.json"
    manifest_digest = digest_paths([manifest_path])
    check_digest(manifest_digest, inventory["manifest"], "Scientific manifest")
    manifest = read_json(manifest_path)
    pinned = {source["id"]: source for source in manifest["fuentes"]}
    if len(pinned) != 62:
        raise ValueError("Scientific manifest must contain 62 unique sources")
    pages_path = args.pages
    pages = {item["id"]: item for item in read_json(pages_path).get("sources", [])} if pages_path else {}
    ready, missing = {}, []
    for source, scope in items:
        identifier = source["id"]
        if not re.fullmatch(r"[A-Za-z0-9_-]+", identifier):
            raise ValueError("Unsafe source ID: " + identifier)
        if scope == "extension_manifest":
            fixed = pinned.get(identifier)
            if fixed is None:
                raise ValueError("Unknown manifest ID: " + identifier)
            check_digest(source["expected"], fixed, identifier + " inventory pin")
            if source["filename"] != fixed["archivo"]:
                raise ValueError(identifier + ": original filename changed")
        paths, reused = input_paths(source)
        if paths:
            check_digest(digest_paths(paths), source["expected"], identifier + " preflight")
            ready[identifier] = (paths, reused)
        else:
            missing.append(identifier)
    if missing and not args.allow_missing:
        raise ValueError("No files copied: missing exact inputs {}. Supply a complete inventory or use --allow-missing for an explicitly partial corpus.".format(
            ", ".join(missing)))
    root.mkdir(parents=True, exist_ok=True)
    sources = []
    for source, scope in items:
        identifier = source["id"]
        provenance = pages.get(identifier, {})
        files, actual, reused = [], None, False
        if identifier in ready:
            paths, reused = ready[identifier]
            files, actual = preserved_files(root, source, paths)
            if reused:
                existing_parts = source["split_parts"]
                if len(files) != len(existing_parts):
                    raise ValueError(identifier + ": existing part boundaries changed")
                for stored, original in zip(files, existing_parts):
                    check_digest(stored, {key: original["expected"][key] for key in ("bytes", "sha256")}, identifier + " reused part")
        expected = dict(source["expected"])
        if actual:
            expected.setdefault("md5", actual["md5"])
        landing = [{key: page.get(key) for key in ("url", "role", "documented_verbatim", "deduced_unverified")}
                   for page in provenance.get("provenance_pages", [])]
        download = provenance.get("download")
        if provenance:
            download_url = download.get("url") if download else None
        else:
            download_url = source.get("download_url") if scope == "extension_manifest" else None
        sources.append({
            "id": identifier, "scope": scope, "family": source.get("family") or provenance.get("family"),
            "name": source.get("name"), "publisher": source.get("publisher"),
            "original_filename": source["filename"], "expected": expected,
            "licence": source.get("license_declared"), "licence_note": source.get("license_note"),
            "doi": source.get("doi"), "citation": {"title": source.get("name"), "creator_or_publisher": source.get("publisher"), "doi": source.get("doi")},
            "download_url": download_url,
            "download_role": download.get("role") if download else ("documented_download" if download_url else None),
            "landing_pages": landing, "provenance_note": provenance.get("note"),
            "web_evidence": {"source_pages_file": "procedencia_web.json", "wayback_file": "wayback.json", "join_key": identifier},
            "availability": "preserved" if files else "missing",
            "storage": {"split": expected["bytes"] > PART_BYTES, "files": files, "existing_part_bytes_reused": reused},
            "restore_path": restore_path(source, scope)})
    counts = {scope: sum(s["scope"] == scope for s in sources)
              for scope in ("extension_manifest", "original_study", "auxiliary_extract")}
    catalog = {"schema_version": 1, "part_size_limit_bytes": PART_BYTES,
               "scope_note": "65 logical input files: 62 extension-manifest entries, two retained original-study CSVs and one auxiliary ITER extract; not 65 independent datasets or observations.",
               "manifest": {"path": "manifiestos/fuentes.json", "bytes": manifest_digest["bytes"], "sha256": manifest_digest["sha256"]},
               "web_metadata": {"source_pages": "procedencia_web.json", "wayback": "wayback.json", "independently_updatable": True},
               "summary": {"logical_inputs": len(sources), "by_scope": counts, "expected_bytes": sum(s["expected"]["bytes"] for s in sources),
                           "preserved_inputs": sum(s["availability"] == "preserved" for s in sources), "missing_ids": missing,
                           "physical_data_files": sum(len(s["storage"]["files"]) for s in sources), "complete": not missing},
               "sources": sources}
    atomic_bytes(root / "manifiestos" / "fuentes.json", manifest_path.read_bytes())
    atomic_bytes(root / "catalogo.csv", csv_bytes(sources))
    atomic_bytes(root / "catalogo.json", json_bytes(catalog))
    return verify(root)


def verify(root):
    root = root.resolve()
    catalog = read_json(root / "catalogo.json")
    if catalog.get("part_size_limit_bytes") != PART_BYTES:
        raise ValueError("Unsupported part size limit")
    sources = catalog["sources"]
    ids = [source["id"] for source in sources]
    if len(ids) != 65 or len(set(ids)) != 65:
        raise ValueError("Catalogue must contain 65 unique logical inputs")
    if {scope: sum(s["scope"] == scope for s in sources) for scope in ("extension_manifest", "original_study", "auxiliary_extract")} != {
            "extension_manifest": 62, "original_study": 2, "auxiliary_extract": 1}:
        raise ValueError("Catalogue must retain the 62 + 2 + 1 input scope")
    metadata = catalog["manifest"]
    manifest_path = safe_path(root, metadata["path"])
    check_digest(digest_paths([manifest_path]), metadata, "Preserved scientific manifest")
    manifest = {source["id"]: source for source in read_json(manifest_path)["fuentes"]}
    extension = [source for source in sources if source["scope"] == "extension_manifest"]
    if len(manifest) != 62 or {s["id"] for s in extension} != set(manifest):
        raise ValueError("Catalogue and 62-entry scientific manifest differ")
    expected_paths, missing, verified = set(), [], []
    for source in sources:
        identifier = source["id"]
        if source["scope"] == "extension_manifest":
            fixed = manifest[identifier]
            check_digest(source["expected"], fixed, identifier + " scientific pin")
            if source["original_filename"] != fixed["archivo"]:
                raise ValueError(identifier + ": scientific filename changed")
        files = source["storage"]["files"]
        if source["availability"] == "missing":
            if files:
                raise ValueError(identifier + ": missing source has stored files")
            missing.append(identifier)
            continue
        if source["availability"] != "preserved" or not files:
            raise ValueError(identifier + ": invalid preservation state")
        count = (source["expected"]["bytes"] + PART_BYTES - 1) // PART_BYTES
        if source["storage"]["split"] != (source["expected"]["bytes"] > PART_BYTES):
            raise ValueError(identifier + ": inconsistent split flag")
        if len(files) != count:
            raise ValueError(identifier + ": unexpected part count")
        filename = PurePosixPath(source["original_filename"]).name
        paths = []
        for index, part in enumerate(files):
            relative = part["path"]
            canonical = "originales/{}/{}{}".format(identifier, filename, ".{:03d}".format(index + 1) if count > 1 else "")
            if relative != canonical or relative in expected_paths:
                raise ValueError(identifier + ": invalid or duplicate part path")
            expected_paths.add(relative)
            expected_size = min(PART_BYTES, source["expected"]["bytes"] - index * PART_BYTES)
            if part["bytes"] != expected_size or not 0 < part["bytes"] <= PART_BYTES:
                raise ValueError(identifier + ": part is not within the fixed 20 MB boundaries")
            path = safe_path(root, relative)
            if not path.is_file():
                raise ValueError("Missing stored file: " + relative)
            paths.append(path)
        actual = digest_paths(paths, lambda index, value: check_digest(value, files[index], identifier + " part"))
        check_digest(actual, source["expected"], identifier + " whole-file stream")
        verified.append(identifier)
    data_root = root / "originales"
    actual_paths = set()
    if data_root.exists():
        for path in data_root.rglob("*"):
            if path.is_symlink():
                raise ValueError("Unexpected data symlink: " + path.relative_to(root).as_posix())
            if path.is_file():
                actual_paths.add(path.relative_to(root).as_posix())
    if actual_paths != expected_paths:
        raise ValueError("Unexpected or missing data files: " + ", ".join(sorted(actual_paths ^ expected_paths)))
    if (root / "catalogo.csv").read_bytes() != csv_bytes(sources):
        raise ValueError("catalogo.csv is not the exact table projection of catalogo.json")
    expected_summary = {"logical_inputs": len(sources), "expected_bytes": sum(s["expected"]["bytes"] for s in sources),
                        "preserved_inputs": len(verified), "missing_ids": missing, "physical_data_files": len(expected_paths), "complete": not missing,
                        "by_scope": {scope: sum(s["scope"] == scope for s in sources) for scope in ("extension_manifest", "original_study", "auxiliary_extract")}}
    if catalog["summary"] != expected_summary:
        raise ValueError("Catalogue summary does not match its entries")
    # Web evidence can grow independently. Scientific byte checks do not certify
    # the truth or historical date of a screenshot or Wayback capture.
    return {"scientific_integrity_passed": True, "complete": not missing,
            "logical_inputs": len(sources), "verified_inputs": len(verified),
            "physical_data_files": len(expected_paths), "expected_bytes": expected_summary["expected_bytes"],
            "verified_bytes": sum(s["expected"]["bytes"] for s in sources if s["id"] in verified),
            "missing_ids": missing, "part_size_limit_bytes": PART_BYTES,
            "manifest_sha256": metadata["sha256"],
            "web_metadata_checked": False}


def restore(root, destination):
    report = verify(root)
    if not report["complete"]:
        raise ValueError("Cannot restore an incomplete corpus")
    destination = destination.resolve()
    if destination in (REPO.resolve(), root.resolve()) or root.resolve() in destination.parents:
        raise ValueError("Restore into a separate staging directory, not the project or corpus")
    for source in read_json(root / "catalogo.json")["sources"]:
        target = safe_path(destination, source["restore_path"])
        if target.exists():
            check_digest(digest_paths([target]), source["expected"], source["id"] + " existing restoration")
            continue
        target.parent.mkdir(parents=True, exist_ok=True)
        fd, temporary = tempfile.mkstemp(prefix=".corpus-", dir=str(target.parent))
        try:
            with os.fdopen(fd, "wb") as output:
                for part in source["storage"]["files"]:
                    with safe_path(root, part["path"]).open("rb") as handle:
                        while True:
                            block = handle.read(BUFFER_BYTES)
                            if not block:
                                break
                            output.write(block)
            check_digest(digest_paths([temporary]), source["expected"], source["id"] + " restoration")
            os.replace(temporary, str(target))
        finally:
            if os.path.exists(temporary):
                os.unlink(temporary)
    report["restored_inputs"] = report["verified_inputs"]
    return report


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    mode = parser.add_mutually_exclusive_group(required=True)
    mode.add_argument("--inventory", type=Path, help="PRIVATE verified-local-path inventory; prepares corpus")
    mode.add_argument("--verify", action="store_true", help="Hash all stored parts and logical files without reconstructing ZIPs")
    mode.add_argument("--restore-to", type=Path, help="Verify and restore complete input files into a separate staging directory")
    parser.add_argument("--root", type=Path, default=ROOT, help="Corpus directory (defaults to the script's parent corpus)")
    parser.add_argument("--pages", type=Path, help="Optional provenance-page inventory; local private paths are never copied")
    parser.add_argument("--allow-missing", action="store_true", help="Prepare explicitly partial corpus; verification still returns nonzero")
    parser.add_argument("--report", type=Path, help="Optional verification report path")
    args = parser.parse_args()
    try:
        if args.inventory:
            report = prepare(args)
        elif args.restore_to:
            report = restore(args.root, args.restore_to)
        else:
            report = verify(args.root)
        if args.report:
            atomic_bytes(args.report, json_bytes(report))
        print(json.dumps(report, ensure_ascii=True))
        return 0 if report["complete"] else 2
    except (OSError, ValueError, KeyError, TypeError) as error:
        print("Corpus verification/preparation failed: " + str(error), file=sys.stderr)
        return 1


if __name__ == "__main__":
    sys.exit(main())
