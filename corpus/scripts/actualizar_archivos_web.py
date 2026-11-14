#!/usr/bin/env python3
"""Build public archive metadata from supplied JSON evidence, without network access.

Example (all input and output paths are supplied by the caller):
  python actualizar_archivos_web.py --catalog catalogo.json --manifest fuentes.json \
    --bibliography bibliography-extract.json --plan source-pages.json \
    --provenance procedencia_web.json --availability availability.json \
    --availability additional-availability.json --output-dir corpus

This program only imports GET Availability API results. It never requests an
archive capture, sends credentials, downloads papers, or copies source documents.
Archive checks and retry queues are always restricted to the 65 logical corpus
IDs in the catalogue. Bibliography-only and visual-attribution URLs are excluded,
including when older, broader Availability reports are imported.
"""
import argparse
from collections import Counter
import csv
from datetime import datetime, timezone
import hashlib
import json
from pathlib import Path
import re
from urllib.parse import parse_qsl, urlsplit


API_DOCUMENTATION = "https://archive.org/help/wayback_api.php"
API_ENDPOINT = "https://archive.org/wayback/available"
ORIGINAL_IDS = {
    "original_sacmex_dataset": "ORIGINAL_SACMEX_2019",
    "open_meteo_historical_weather_docs": "ORIGINAL_OPENMETEO_2019",
}


def read_json(path):
    return json.loads(path.read_text(encoding="utf-8-sig"))


def public_url(url):
    """Reject private paths and URL credentials instead of silently publishing them."""
    if not isinstance(url, str) or not url:
        raise ValueError("A non-empty public URL is required")
    parsed = urlsplit(url)
    if parsed.scheme not in ("http", "https") or not parsed.hostname:
        raise ValueError("Only HTTP(S) URLs can be included")
    if parsed.username is not None or parsed.password is not None:
        raise ValueError("URL credentials cannot be published")
    if parsed.hostname.lower() in ("localhost", "127.0.0.1", "::1"):
        raise ValueError("Local URLs cannot be published")
    if any(re.search(r"(^|[_-])(token|password|passwd|secret|authorization|cookie|api[_-]?key)([_-]|$)", key, re.I)
           for key, _ in parse_qsl(parsed.query, keep_blank_values=True)):
        raise ValueError("Possible secret query parameter cannot be published")
    if "\\" in url or any(ord(char) < 32 for char in url):
        raise ValueError("Invalid characters in public URL")
    return url


def stable_id(url):
    return "WB-"+hashlib.sha256(url.encode("utf-8")).hexdigest()[:12]


def write_json(path, value):
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2)+"\n", encoding="utf-8")


def build(args):
    catalogue = read_json(args.catalog)
    corpus_sources = catalogue["sources"]
    corpus_ids = {row["id"] for row in corpus_sources}
    if len(corpus_sources) != 65 or len(corpus_ids) != 65:
        raise ValueError("The corpus catalogue must contain 65 unique logical input IDs")
    manifest = read_json(args.manifest)
    bibliography = read_json(args.bibliography)
    plan = read_json(args.plan) if args.plan else {}
    provenance = read_json(args.provenance) if args.provenance else {}
    targets = {}

    def add(url, source_ids=(), roles=(), capture_ids=()):
        scoped_ids = set(source_ids) & corpus_ids
        if not url or not scoped_ids:
            return
        public_url(url)
        if urlsplit(url).hostname in ("archive.org", "web.archive.org"):
            return  # Do not archive archive-replay or Save Page Now URLs recursively.
        entry = targets.setdefault(url, {"source_ids": set(), "roles": set(), "capture_ids": set()})
        entry["source_ids"].update(scoped_ids)
        entry["roles"].update(role for role in roles if role != "bibliography")
        entry["capture_ids"].update(capture_ids)

    known_source_ids = corpus_ids
    for row in corpus_sources:
        add(row.get("download_url"), [row["id"]], [row.get("download_role", "documented_download")])
        for page in row.get("landing_pages", []):
            add(page.get("url"), [row["id"]], [page.get("role", "documented_landing_page")])
    for row in manifest["fuentes"]:
        add(row["url"], [row["id"]], ["manifest_download"])
    for row in plan.get("sources", []):
        download = row.get("download") or {}
        add(download.get("url"), [row["id"]], [download.get("role", "documented_download")])
        for page in row.get("provenance_pages", []):
            add(page.get("url"), [row["id"]], [page.get("role", "planned_landing_page")])
    for page in plan.get("pages", []):
        add(page["url"], page.get("source_ids", []), [page.get("role", "planned_landing_page")])
    for capture in provenance.get("captures", []):
        for key in ("requested_url", "final_url", "canonical_url"):
            add(capture.get(key), capture.get("source_ids", []), ["observed_"+key], capture_ids=[capture["id"]])

    observations = {}
    imported_rows = 0
    failed_observation_rows = 0
    rate_limited_observation_rows = 0
    for evidence_path in args.availability:
        evidence = read_json(evidence_path)
        if evidence.get("api_endpoint") != API_ENDPOINT:
            raise ValueError("Only the documented Wayback Availability endpoint is accepted")
        for row in evidence["results"]:
            url = row["url"]
            source_ids = list(row.get("source_ids", []))
            if row.get("id") in known_source_ids:
                source_ids.append(row["id"])
            if row.get("id") in ORIGINAL_IDS:
                source_ids.append(ORIGINAL_IDS[row["id"]])
            # An old bibliography response may be reused only when this exact
            # URL is already independently linked to a real corpus source.
            source_ids.extend(targets.get(url, {}).get("source_ids", []))
            if not (set(source_ids) & corpus_ids):
                continue
            public_url(url)
            if urlsplit(url).hostname in ("archive.org", "web.archive.org"):
                continue
            roles = list(row.get("roles", []))
            if row.get("group"):
                roles.append(row["group"])
            add(url, source_ids, roles, row.get("capture_ids", []))
            imported_rows += 1
            failed_observation_rows += row.get("classification") == "api_error"
            rate_limited_observation_rows += row.get("HTTP_API") == 429
            # Keep the latest queried response for a URL; an unqueried row never
            # discards an earlier observation. Exact URLs are not normalised.
            previous = observations.get(url)
            if previous is None or (row.get("queried") and (not previous.get("queried") or
                    (row.get("checked_at_utc") or "") >= (previous.get("checked_at_utc") or ""))):
                observations[url] = row

    checks = []
    for url in sorted(targets):
        metadata = targets[url]
        row = observations.get(url, {})
        closest = row.get("closest") or {}
        queried = row.get("queried") is True
        api_http = row.get("HTTP_API")
        archived = queried and api_http == 200 and closest.get("available") is True and str(closest.get("status")) == "200"
        if not queried:
            status = "not_queried"
        elif archived:
            status = "existing_snapshot_available"
        elif api_http == 200 and row.get("classification") != "api_error":
            status = "no_available_snapshot_reported"
        else:
            status = "api_error"
        replay_url = closest.get("url")
        if replay_url:
            public_url(replay_url)
            if urlsplit(replay_url).hostname != "web.archive.org":
                raise ValueError("Unexpected snapshot host")
        timestamp = closest.get("timestamp")
        if timestamp is not None and not re.fullmatch(r"\d{14}", str(timestamp)):
            raise ValueError("Unexpected Wayback timestamp")
        checks.append({"id": stable_id(url), "url": url,
                       "source_ids": sorted(metadata["source_ids"]), "roles": sorted(metadata["roles"]),
                       "capture_ids": sorted(metadata["capture_ids"]),
                       "queried": queried, "HTTP_API": api_http, "checked_at_utc": row.get("checked_at_utc"),
                       "closest": {"available": closest.get("available"), "status": closest.get("status"),
                                   "timestamp": timestamp, "url": replay_url},
                       "status": status, "archived": archived, "bytes_verified": False,
                       "new_capture_confirmed": False})
    assert len(checks) == len({row["id"] for row in checks}), "Stable-ID collision"
    counts = Counter(row["status"] for row in checks)
    checked_dates = [row["checked_at_utc"] for row in checks if row["checked_at_utc"]]
    output = {
        "schema_version": 1,
        "scope": "Only source URLs associated with the 65 logical corpus input IDs; bibliography-only and visual-attribution URLs are excluded.",
        "generated_at_utc": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "method": {"documentation": API_DOCUMENTATION, "endpoint": API_ENDPOINT, "http_method": "GET",
                   "timestamp_parameter_used": False, "authentication_used": False, "cookies_used": False,
                   "new_capture_requests_by_this_script": False,
                   "minimum_request_interval_seconds": 1.05},
        "summary": {"unique_urls": len(checks), "imported_observation_rows": imported_rows,
                    "logical_corpus_inputs": len(corpus_ids),
                    "logical_inputs_with_checks": len({source for row in checks for source in row["source_ids"]}),
                    "source_url_associations": sum(len(row["source_ids"]) for row in checks),
                    "api_error_observation_rows": failed_observation_rows,
                    "rate_limited_observation_rows": rate_limited_observation_rows,
                    "queried_urls": sum(row["queried"] for row in checks),
                    "existing_snapshot_available": counts["existing_snapshot_available"],
                    "no_available_snapshot_reported": counts["no_available_snapshot_reported"],
                    "api_errors": counts["api_error"], "not_queried": counts["not_queried"],
                    "first_check_utc": min(checked_dates) if checked_dates else None,
                    "last_check_utc": max(checked_dates) if checked_dates else None,
                    "new_captures_confirmed": 0},
        "new_capture_status": "none_confirmed",
        "limitations": [
            "Availability is positive only when API HTTP status is 200, closest.available is true and closest.status is 200.",
            "A negative response reports no currently available closest snapshot; it does not prove the URL was never archived.",
            "Existing snapshot metadata does not verify archived file bytes, corpus equivalence, completeness, historical retrieval or licensing.",
            "Live source-page screenshots are separate observations and do not confirm a new Wayback capture.",
            "Browser Save Page Now attempts were reported to fail internally; no new snapshot is confirmed by this evidence.",
            "The retry queue includes all URLs without a confirmed new capture, prioritising URLs with no available snapshot or an unresolved API check.",
        ],
        "checks": checks,
    }
    bibliography_output = {
        "schema_version": 1, "extracted_at_utc": bibliography.get("extracted_at_utc"),
        "scope": "Bibliographic titles and public URL/DOI targets only; no author lists, contacts or source document copies.",
        "archive_checks": "Not part of the bibliography catalogue; no Wayback requests or links are generated for references.",
        "reference_count": bibliography["bibliography_reference_count"],
        "unique_url_count": len(bibliography["urls"]),
        "urls": [{"id": row["id"], "titles": row["titles"], "url": public_url(row["url"]),
                  "dois": row.get("dois", []), "bibliography_indices": row["bibliography_indices"]} for row in bibliography["urls"]],
        "references_without_url": bibliography["references_without_url"],
    }
    args.output_dir.mkdir(parents=True, exist_ok=True)
    write_json(args.output_dir/"wayback.json", output)
    write_json(args.output_dir/"bibliografia.json", bibliography_output)
    priority = {"no_available_snapshot_reported": 1, "api_error": 1, "not_queried": 1, "existing_snapshot_available": 2}
    pending = sorted(checks, key=lambda row: (priority[row["status"]], row["url"]))
    with (args.output_dir/"wayback_pendientes.csv").open("w", encoding="utf-8", newline="") as stream:
        columns = ["priority", "wayback_id", "url", "source_ids", "roles", "availability_status", "existing_snapshot_available",
                   "closest_timestamp", "closest_url", "new_capture_confirmed", "reason"]
        writer = csv.DictWriter(stream, fieldnames=columns)
        writer.writeheader()
        for row in pending:
            writer.writerow({"priority": priority[row["status"]], "wayback_id": row["id"], "url": row["url"],
                             "source_ids": ";".join(row["source_ids"]), "roles": ";".join(row["roles"]),
                             "availability_status": row["status"], "existing_snapshot_available": str(row["archived"]).lower(),
                             "closest_timestamp": row["closest"]["timestamp"], "closest_url": row["closest"]["url"],
                             "new_capture_confirmed": "false", "reason": "No new capture confirmed; existing availability is recorded separately."})
    (args.output_dir/"wayback_pendientes.txt").write_text("".join(row["url"]+"\n" for row in pending), encoding="utf-8")
    print(json.dumps(output["summary"], ensure_ascii=False))


def main():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--catalog", required=True, type=Path)
    parser.add_argument("--manifest", required=True, type=Path)
    parser.add_argument("--bibliography", required=True, type=Path)
    parser.add_argument("--availability", required=True, action="append", type=Path)
    parser.add_argument("--plan", type=Path)
    parser.add_argument("--provenance", type=Path)
    parser.add_argument("--output-dir", required=True, type=Path)
    build(parser.parse_args())


if __name__ == "__main__":
    main()
