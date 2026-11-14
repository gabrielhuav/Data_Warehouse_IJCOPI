#!/usr/bin/env python3
"""Build a readable index from the catalogue and independent web evidence."""
import argparse
import json
import os
from pathlib import Path, PurePosixPath
import re
import sys
import tempfile
from urllib.parse import quote, urlparse

ROOT = Path(__file__).resolve().parents[1]
LANDING_GAPS = {"D4", "D5", "D6", "D8a", "D8b", "D8c"}
RELATED_VISUAL_IDS = {"VISUAL_OSM_CDMX"}


def read_json(path, default=None):
    if not path.exists() and default is not None:
        return default
    with path.open("r", encoding="utf-8-sig") as handle:
        return json.load(handle)


def label(value):
    return str(value).replace("\\", "\\\\").replace("|", "\\|").replace("[", "\\[").replace("]", "\\]").replace("\n", " ").replace("\r", " ")


def external_link(title, url):
    parsed = urlparse(url)
    if parsed.scheme not in ("https", "http") or not parsed.netloc or any(c in url for c in "\r\n"):
        raise ValueError("Invalid public URL")
    return "[{}](<{}>)".format(label(title), url.replace(">", "%3E"))


def local_link(root, title, relative):
    path = PurePosixPath(relative)
    if path.is_absolute() or "\\" in relative or ":" in relative or any(p == ".." for p in path.parts):
        raise ValueError("Unsafe local evidence link")
    target = root.joinpath(*path.parts)
    if root.resolve() not in target.resolve().parents or not target.is_file() or target.is_symlink():
        raise ValueError("Missing or unsafe indexed file: " + relative)
    return "[{}]({})".format(label(title), quote(relative, safe="/._-"))


def grouped_evidence(entries, ids, kind):
    result = {identifier: [] for identifier in ids}
    seen = set()
    for entry in entries:
        identifier = entry.get("id")
        if not identifier or identifier in seen:
            raise ValueError("Missing or duplicate " + kind + " evidence ID")
        seen.add(identifier)
        source_ids = entry.get("source_ids", [])
        if len(source_ids) != len(set(source_ids)) or any(source not in ids for source in source_ids):
            raise ValueError("Unknown or repeated source ID in " + kind + ": " + identifier)
        for source in source_ids:
            result[source].append(entry)
    return result


def page_cell(root, source, captures):
    if not captures:
        if source["id"] in LANDING_GAPS:
            return "Gap: publisher landing page not documented; capture pending."
        return "Pending: no publisher-page capture recorded."
    parts = []
    for capture in captures:
        status = capture.get("status", "unknown")
        url = capture.get("final_url") or capture.get("requested_url")
        page = external_link("Page", url) if url else "Page URL not recorded"
        screenshot = capture.get("screenshot")
        if status == "visible" and not screenshot:
            raise ValueError("Visible page has no screenshot: " + capture["id"])
        image = local_link(root, "Capture " + capture["id"], screenshot) if screenshot else "No screenshot"
        parts.append("{}; {} ({})".format(page, image, label(status)))
    return "<br>".join(parts)


def wayback_destination(check):
    url = check["url"]
    roles = [role.lower() for role in check.get("roles", [])]
    if urlparse(url).netloc.lower() in ("doi.org", "dx.doi.org") or any("doi" in role for role in roles):
        return "DOI"
    if any("download" in role for role in roles):
        return "Download"
    if any("landing" in role or "provenance" in role or role.startswith("observed_") for role in roles):
        return "Source page"
    return "Other"


def unique_wayback_checks(checks):
    by_url = {}
    for check in checks:
        url = check.get("url")
        if not url:
            raise ValueError("Archive check has no checked URL: " + check["id"])
        if url not in by_url:
            by_url[url] = dict(check)
            by_url[url]["roles"] = list(check.get("roles", []))
        else:
            previous = by_url[url]
            if (previous.get("archived") != check.get("archived")
                    or (previous.get("closest") or {}).get("url") != (check.get("closest") or {}).get("url")):
                raise ValueError("Conflicting archive results for checked URL: " + url)
            previous["roles"] = sorted(set(previous["roles"]) | set(check.get("roles", [])))
    order = {"Download": 0, "Source page": 1, "DOI": 2, "Other": 3}
    return sorted(by_url.values(), key=lambda check: (order[wayback_destination(check)], check["url"]))


def wayback_cell(checks):
    if not checks:
        return "Pending: no archive result recorded."
    parts = []
    for check in unique_wayback_checks(checks):
        destination = external_link(wayback_destination(check), check["url"])
        closest = check.get("closest") or {}
        if check.get("archived") is True:
            if not closest.get("available") or not closest.get("url"):
                raise ValueError("Archived check lacks an available snapshot: " + check["id"])
            date = str(closest.get("timestamp") or "date not recorded")
            if re.fullmatch(r"\d{14}", date):
                date = "{}-{}-{}".format(date[:4], date[4:6], date[6:8])
            state = external_link("Snapshot " + date, closest["url"])
        else:
            status = check.get("status") or ""
            if "error" in status:
                state = "Archive check failed"
            elif status in ("not_queried", "pending") or check.get("queried") is False:
                state = "Archive check pending"
            else:
                state = "No snapshot reported"
        parts.append("{} — {}".format(destination, state))
    return "<br>".join(parts)


def build(root):
    root = root.resolve()
    catalog = read_json(root / "catalogo.json")
    sources = catalog["sources"]
    ids = {source["id"] for source in sources}
    if len(sources) != 65 or len(ids) != 65:
        raise ValueError("Expected 65 unique logical input rows")
    pages = read_json(root / "procedencia_web.json", {"captures": []})
    wayback = read_json(root / "wayback.json", {"checks": []})
    captures = grouped_evidence(pages.get("captures", []), ids | RELATED_VISUAL_IDS, "publisher-page")
    checks = grouped_evidence(wayback.get("checks", []), ids | RELATED_VISUAL_IDS, "Wayback")
    preserved = sum(source["availability"] == "preserved" for source in sources)
    missing = [source["id"] for source in sources if source["availability"] != "preserved"]
    lines = ["# Preserved inputs and provenance", "",
             "This index contains **65 logical input files**: 62 extension-manifest entries, two retained original-study CSVs and one auxiliary ITER extract. These are not 65 independent datasets or observations.", "",
             "**Input bytes preserved: {}/65.** {}".format(preserved, "The input corpus is complete." if not missing else "Missing exact inputs: **{}**.".format(", ".join(missing))), "",
             "The [catalogue](catalogo.json), [CSV catalogue](catalogo.csv) and [unchanged scientific manifest](manifiestos/fuentes.json) record sizes, checksums, licences and citations. See the [verification and restoration instructions](README.md). A current publisher page, screenshot or Wayback page does not certify the bytes or historical retrieval date of an input file. Archive checks do not verify dataset bytes.", "",
             "Download links identify the documented file endpoint; an **upstream ZIP** is the origin of the retained ITER extract, not a direct download of that extract. The exact original Open-Meteo request URL is not recorded. Missing or blocked evidence remains explicit.", "",
             "| ID | Input file and size | Preserved bytes | Download / origin | Publisher-page evidence | Wayback |",
             "| --- | --- | --- | --- | --- | --- |"]
    split_sources = []
    for source in sources:
        identifier = source["id"]
        files = source["storage"]["files"]
        if source["availability"] == "preserved":
            if not files:
                raise ValueError("Preserved input has no file links: " + identifier)
            for part in files:
                local_link(root, "part", part["path"])
            if len(files) == 1:
                storage = local_link(root, "Original file", files[0]["path"])
            else:
                storage = "[{} parts](#files-{})".format(len(files), identifier.lower())
                split_sources.append(source)
        else:
            if files:
                raise ValueError("Missing input has preserved part links: " + identifier)
            storage = "**Missing exact bytes**"
        url = source.get("download_url")
        download = external_link("Upstream ZIP" if source.get("download_role") == "documented_upstream_download" else "Download", url) if url else "Exact download not recorded"
        row = [identifier, "{} ({:,} bytes)".format(label(source["original_filename"]), source["expected"]["bytes"]),
               storage, download, page_cell(root, source, captures[identifier]), wayback_cell(checks[identifier])]
        lines.append("| " + " | ".join(row) + " |")
    related = [identifier for identifier in sorted(RELATED_VISUAL_IDS) if captures[identifier] or checks[identifier]]
    if related:
        lines.extend(["", "## Related visual attribution", "",
                      "The following evidence concerns a visual asset and is separate from the 65 logical input files; it does not increase their count.", ""])
        for identifier in related:
            lines.append("- **{}**: {} Archive: Outside corpus archive scope.".format(identifier, page_cell(root, {"id": identifier}, captures[identifier])))
    lines.extend(["", "## Ordered file parts", "",
                  "Join the parts in the numbered order shown. Each part is at most 20,000,000 bytes. The verifier streams that same order to check the SHA-256 and MD5 of the original logical file; no archive unpacking is required."])
    for source in split_sources:
        lines.extend(["", "### Files: " + source["id"], "",
                      "{}; {:,} bytes; SHA-256: `{}`.".format(label(source["original_filename"]), source["expected"]["bytes"], source["expected"]["sha256"]), ""])
        for index, part in enumerate(source["storage"]["files"], 1):
            lines.append("- {} — {:,} bytes".format(local_link(root, "Part {:03d}".format(index), part["path"]), part["bytes"]))
    report = {"source_rows": len(sources), "preserved_inputs": preserved, "missing_input_ids": missing,
              "source_ids_with_page_evidence": [s["id"] for s in sources if captures[s["id"]]],
              "source_ids_without_page_evidence": [s["id"] for s in sources if not captures[s["id"]]],
              "source_ids_with_archive_check": [s["id"] for s in sources if checks[s["id"]]],
              "source_ids_without_archive_check": [s["id"] for s in sources if not checks[s["id"]]],
              "source_ids_with_available_archive": [s["id"] for s in sources if any(c.get("archived") is True for c in checks[s["id"]])],
              "related_visual_evidence_ids": related,
              "data_bytes_rehashed": False}
    return "\n".join(lines) + "\n", report


def write_atomic(path, content):
    path.parent.mkdir(parents=True, exist_ok=True)
    fd, temporary = tempfile.mkstemp(prefix=".index-", dir=str(path.parent))
    try:
        with os.fdopen(fd, "w", encoding="utf-8", newline="\n") as handle:
            handle.write(content)
        os.replace(temporary, str(path))
    finally:
        if os.path.exists(temporary):
            os.unlink(temporary)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--root", type=Path, default=ROOT)
    parser.add_argument("--report", type=Path)
    args = parser.parse_args()
    try:
        content, report = build(args.root)
        write_atomic(args.root / "INDICE.md", content)
        if args.report:
            write_atomic(args.report, json.dumps(report, ensure_ascii=False, indent=2) + "\n")
        print(json.dumps(report, ensure_ascii=True))
        return 0
    except (OSError, ValueError, KeyError, TypeError) as error:
        print("Index generation failed: " + str(error), file=sys.stderr)
        return 1


if __name__ == "__main__":
    sys.exit(main())
