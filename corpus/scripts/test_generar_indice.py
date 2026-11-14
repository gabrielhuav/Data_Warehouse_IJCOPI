"""Check index links, coverage and honest incomplete-evidence labels."""
import importlib.util
import json
from pathlib import Path
import tempfile
import unittest

SPEC = importlib.util.spec_from_file_location("generar_indice", Path(__file__).with_name("generar_indice.py"))
INDEX = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(INDEX)


class IndexTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.root = Path(self.temp.name)
        self.sources = []
        for index in range(65):
            self.sources.append({"id": "D4" if index == 64 else "S{:02d}".format(index),
                                 "availability": "missing", "storage": {"files": []},
                                 "original_filename": "input.zip", "expected": {"bytes": 21, "sha256": "0" * 64},
                                 "download_url": None})
        self.pages = {"captures": []}
        self.wayback = {"checks": []}

    def tearDown(self):
        self.temp.cleanup()

    def save(self):
        for name, value in [("catalogo.json", {"sources": self.sources}),
                            ("procedencia_web.json", self.pages), ("wayback.json", self.wayback)]:
            (self.root / name).write_text(json.dumps(value), encoding="utf-8")

    def test_all_rows_parts_shared_capture_and_available_or_pending_archive(self):
        self.sources[0]["availability"] = "preserved"
        for number in (1, 2):
            relative = "originales/S00/input.zip.{:03d}".format(number)
            path = self.root / relative
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_bytes(b"data")
            self.sources[0]["storage"]["files"].append({"path": relative, "bytes": 20 if number == 1 else 1})
        (self.root / "capturas").mkdir()
        (self.root / "capturas" / "shared.jpg").write_bytes(b"fixture")
        self.pages["captures"] = [{"id": "shared", "source_ids": ["S00", "S01"], "status": "visible",
                                   "final_url": "https://example.org/source", "screenshot": "capturas/shared.jpg"}]
        self.wayback["checks"] = [{"id": "WB-ok", "url": "https://example.org/source", "roles": ["provenance_page"], "source_ids": ["S00"], "archived": True,
                                    "closest": {"available": True, "url": "https://web.archive.org/web/20260101000000/https://example.org/source", "timestamp": "20260101000000"}, "bytes_verified": False},
                                   {"id": "WB-missing", "url": "https://example.org/input.zip", "roles": ["manifest_download"], "source_ids": ["S01"], "archived": False, "status": "api_error", "closest": None, "bytes_verified": False}]
        self.save()
        content, report = INDEX.build(self.root)
        rows = [line for line in content.splitlines() if line.startswith("| S") or line.startswith("| D4 |")]
        self.assertEqual(len(rows), 65)
        self.assertEqual(report["source_ids_with_page_evidence"], ["S00", "S01"])
        self.assertEqual(report["source_ids_with_available_archive"], ["S00"])
        self.assertIn("[2 parts](#files-s00)", content)
        self.assertIn("originales/S00/input.zip.002", content)
        self.assertIn("Snapshot 2026-01-01", content)
        self.assertIn("[Source page](<https://example.org/source>) — [Snapshot", content)
        self.assertIn("[Download](<https://example.org/input.zip>) — Archive check failed", content)
        self.assertIn("Gap: publisher landing page not documented", content)
        self.assertIn("Archive checks do not verify dataset bytes", content)
        self.assertFalse(report["data_bytes_rehashed"])

    def test_unknown_ids_missing_screenshot_and_false_archive_claim_fail(self):
        self.pages["captures"] = [{"id": "bad", "source_ids": ["unknown"], "status": "visible"}]
        self.save()
        with self.assertRaisesRegex(ValueError, "Unknown"):
            INDEX.build(self.root)
        self.pages["captures"][0]["source_ids"] = ["S00"]
        self.save()
        with self.assertRaisesRegex(ValueError, "no screenshot"):
            INDEX.build(self.root)
        self.pages["captures"] = []
        self.wayback["checks"] = [{"id": "bad", "url": "https://example.org/source", "source_ids": ["S00"], "archived": True, "closest": {}}]
        self.save()
        with self.assertRaisesRegex(ValueError, "lacks an available snapshot"):
            INDEX.build(self.root)

    def test_checked_urls_are_deduplicated_and_destinations_are_clear(self):
        base = {"id": "download", "url": "https://example.org/input.zip", "roles": ["documented_download"],
                "archived": False, "status": "no_available_snapshot_reported", "closest": {}}
        duplicate = dict(base, id="duplicate", roles=["manifest_download"])
        doi = dict(base, id="doi", url="https://doi.org/10.1234/test", roles=["documented_doi_resolver"])
        page = dict(base, id="page", url="https://example.org/source", roles=["provenance_page"])
        other = dict(base, id="other", url="https://example.org/other", roles=["bibliography"])
        cell = INDEX.wayback_cell([base, duplicate, doi, page, other])
        self.assertEqual(cell.count("https://example.org/input.zip"), 1)
        self.assertEqual(cell.count("No snapshot reported"), 4)
        for destination in ("Download", "Source page", "DOI", "Other"):
            self.assertIn("[{}](<".format(destination), cell)
        self.assertNotIn("no_available_snapshot_reported", cell)
        with self.assertRaisesRegex(ValueError, "Conflicting"):
            INDEX.wayback_cell([base, dict(duplicate, archived=True)])

    def test_visual_attribution_is_outside_archive_scope(self):
        (self.root / "capturas").mkdir()
        (self.root / "capturas" / "osm.jpg").write_bytes(b"fixture")
        self.pages["captures"] = [{"id": "osm", "source_ids": ["VISUAL_OSM_CDMX"], "status": "visible",
                                   "final_url": "https://www.openstreetmap.org/copyright", "screenshot": "capturas/osm.jpg"}]
        self.save()
        content, report = INDEX.build(self.root)
        visual = content.split("## Related visual attribution", 1)[1].split("## Ordered file parts", 1)[0]
        self.assertIn("Outside corpus archive scope", visual)
        self.assertNotIn("Pending", visual)
        self.assertNotIn("web.archive.org", visual)
        self.assertEqual(report["related_visual_evidence_ids"], ["VISUAL_OSM_CDMX"])


if __name__ == "__main__":
    unittest.main()
