"""Small fixtures exercise byte preservation, failure modes and restoration."""
import argparse
import hashlib
import importlib.util
import json
from pathlib import Path
import tempfile
import unittest

SPEC = importlib.util.spec_from_file_location("preparar_corpus", Path(__file__).with_name("preparar_corpus.py"))
CORPUS = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(CORPUS)


def pins(data):
    return {"bytes": len(data), "sha256": hashlib.sha256(data).hexdigest(), "md5": hashlib.md5(data).hexdigest()}


class PreservationTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.base = Path(self.temp.name)
        self.old_repo, self.old_part = CORPUS.REPO, CORPUS.PART_BYTES
        CORPUS.REPO, CORPUS.PART_BYTES = self.base / "repo", 20
        self.root = self.base / "corpus"
        self.items, fixed = [], []
        self.bytes_by_id = {}
        for index in range(65):
            identifier = "D15" if index == 61 else "S{:02d}".format(index)
            size = [19, 20, 21, 42][index % 4]
            data = bytes([index]) * size
            filename = "input{}.zip".format(index)
            source_path = self.base / "inputs" / filename
            source_path.parent.mkdir(parents=True, exist_ok=True)
            source_path.write_bytes(data)
            self.bytes_by_id[identifier] = data
            item = {"id": identifier, "name": "Fixture", "filename": filename,
                    "expected": pins(data), "preferred_valid_path": str(source_path)}
            if index == 61:
                # Existing pieces must survive a read across source boundaries.
                data = bytes(range(42))
                self.bytes_by_id[identifier] = data
                item["expected"] = pins(data)
                item["preferred_valid_path"] = None
                item["concatenation_verified"] = True
                item["split_parts"] = []
                for number, start in enumerate(range(0, len(data), 20), 1):
                    piece = data[start:start + 20]
                    part_path = self.base / "inputs" / (filename + ".{:03d}".format(number))
                    part_path.write_bytes(piece)
                    item["split_parts"].append({"expected": pins(piece), "preferred_valid_path": str(part_path)})
            self.items.append(item)
            if index < 62:
                fixed.append(dict({"id": identifier, "archivo": filename}, **item["expected"]))
        manifest_path = CORPUS.REPO / "warehouse_ampliado" / "fuentes.json"
        manifest_path.parent.mkdir(parents=True)
        manifest_path.write_bytes(CORPUS.json_bytes({"fuentes": fixed}))
        self.inventory = {"manifest": pins(manifest_path.read_bytes()), "extension_sources": self.items[:62],
                          "original_sources": self.items[62:64], "additional_inputs": self.items[64:]}
        self.inventory_path = self.base / "private_inventory.json"
        self.save_inventory()
        self.args = argparse.Namespace(root=self.root, inventory=self.inventory_path, pages=None, allow_missing=False)

    def tearDown(self):
        CORPUS.REPO, CORPUS.PART_BYTES = self.old_repo, self.old_part
        self.temp.cleanup()

    def save_inventory(self):
        self.inventory_path.write_bytes(CORPUS.json_bytes(self.inventory))

    def test_complete_boundary_parts_reuse_and_isolated_restoration(self):
        report = CORPUS.prepare(self.args)
        self.assertTrue(report["complete"])
        catalog = CORPUS.read_json(self.root / "catalogo.json")
        by_id = {item["id"]: item for item in catalog["sources"]}
        self.assertEqual([part["bytes"] for part in by_id["S00"]["storage"]["files"]], [19])
        self.assertEqual([part["bytes"] for part in by_id["S01"]["storage"]["files"]], [20])
        self.assertEqual([part["bytes"] for part in by_id["S02"]["storage"]["files"]], [20, 1])
        self.assertEqual([part["bytes"] for part in by_id["D15"]["storage"]["files"]], [20, 20, 2])
        self.assertTrue(by_id["D15"]["storage"]["existing_part_bytes_reused"])
        self.assertNotIn(str(self.base), (self.root / "catalogo.json").read_text(encoding="utf-8"))
        self.assertEqual(CORPUS.prepare(self.args), report)  # Identical rerun is safe.
        stage = self.base / "isolated"
        self.assertEqual(CORPUS.restore(self.root, stage)["restored_inputs"], 65)
        for source in catalog["sources"]:
            self.assertEqual((stage / source["restore_path"]).read_bytes(), self.bytes_by_id[source["id"]])
        with self.assertRaises(ValueError):
            CORPUS.restore(self.root, CORPUS.REPO)

    def test_missing_preflight_is_atomic_and_partial_stays_explicit(self):
        self.items[0]["preferred_valid_path"] = None
        self.save_inventory()
        with self.assertRaisesRegex(ValueError, "No files copied"):
            CORPUS.prepare(self.args)
        self.assertFalse(self.root.exists())
        self.args.allow_missing = True
        report = CORPUS.prepare(self.args)
        self.assertFalse(report["complete"])
        self.assertEqual(report["missing_ids"], ["S00"])
        with self.assertRaisesRegex(ValueError, "incomplete"):
            CORPUS.restore(self.root, self.base / "stage")

    def test_corruption_missing_extra_and_csv_drift_are_rejected(self):
        CORPUS.prepare(self.args)
        extra = self.root / "originales" / "unexpected.txt"
        extra.write_bytes(b"extra")
        with self.assertRaisesRegex(ValueError, "Unexpected or missing"):
            CORPUS.verify(self.root)
        extra.unlink()
        first = self.root / CORPUS.read_json(self.root / "catalogo.json")["sources"][0]["storage"]["files"][0]["path"]
        original = first.read_bytes()
        first.write_bytes(b"X" + original[1:])
        with self.assertRaisesRegex(ValueError, "mismatch"):
            CORPUS.verify(self.root)
        with self.assertRaisesRegex(ValueError, "existing copy"):
            CORPUS.prepare(self.args)
        first.unlink()
        with self.assertRaisesRegex(ValueError, "Missing stored"):
            CORPUS.verify(self.root)
        first.write_bytes(original)
        with (self.root / "catalogo.csv").open("ab") as handle:
            handle.write(b"extra")
        with self.assertRaisesRegex(ValueError, "exact table projection"):
            CORPUS.verify(self.root)

    def test_changed_input_or_manifest_pin_prevents_copy(self):
        original_path = Path(self.items[0]["preferred_valid_path"])
        original_path.write_bytes(b"wrong")
        with self.assertRaisesRegex(ValueError, "preflight"):
            CORPUS.prepare(self.args)
        self.assertFalse(self.root.exists())
        original_path.write_bytes(self.bytes_by_id["S00"])
        self.items[0]["expected"]["sha256"] = "0" * 64
        self.save_inventory()
        with self.assertRaisesRegex(ValueError, "inventory pin"):
            CORPUS.prepare(self.args)


if __name__ == "__main__":
    unittest.main()
