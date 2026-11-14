# Preserved input corpus

This directory preserves the exact input bytes used by this project. The catalogue
covers **65 logical files**: the 62 entries of the extension source manifest, the
two retained CSV inputs of the original study, and the retained ITER extract used
by the per-capita analysis. These are not 65 independent datasets or observations.
The ITER extract is an auxiliary derivative, not a third original-study source or
an additional entry in the 62-source manifest.

`catalogo.json` records each file's size, SHA-256, MD5 when available, publisher,
declared licence, DOI, provenance links and storage parts. `catalogo.csv` is an
exact tabular projection with one row per logical file. The byte-exact scientific
manifest is retained in `manifiestos/fuentes.json`; the source manifest and ETL are
not rewritten by this preservation tool. The catalogue's `summary.complete` and
`missing_ids` are the authority on whether all input bytes are present.

The [human-readable index](INDICE.md) links all 65 inputs, their original files or
ordered parts, download endpoints, publisher-page captures and available archive
pages. Its missing and pending states remain explicit. Rebuild it after updating
the catalogue or web-evidence metadata:

```text
python corpus/scripts/generar_indice.py
```

## Verify without unpacking

Python 3.7 or later is sufficient; no external package, database, network request
or ETL execution is required. Run from the repository root:

```text
python corpus/scripts/preparar_corpus.py --verify
```

The verifier checks the manifest, both catalogues, every stored part and the
reconstructed SHA-256/MD5 of every logical file. Reconstruction is streamed into
the digest: it does **not** write a full ZIP or unpack its contents. It rejects
missing, additional or renamed data files under `originales/`, symlinks, unsafe
paths, altered part boundaries, wrong byte counts and wrong digests. Exit status
is `0` for a complete valid corpus, `2` for a valid but explicitly incomplete
corpus, and `1` for an error. Screenshot and archive metadata are separate evidence
and are not certified by this scientific-byte check.

## Storage and reconstruction

Each input has its own directory `originales/{id}/`. Files of at most
**20,000,000 bytes** are stored whole. Larger files are split into contiguous
20,000,000-byte parts named `.001`, `.002`, and so on; only the last part may be
shorter. Concatenating the catalogue's ordered parts reproduces the exact input
file. The existing D15 parts are reused with identical boundaries and hashes.
No compression, line-ending conversion, CSV rewriting or archive repacking is
performed. Thus every stored file remains well below GitHub's individual-file
size limit, while the original logical-file size and hash remain explicit.

To verify and restore the complete files into an **isolated staging directory**:

```text
python corpus/scripts/preparar_corpus.py --restore-to tmp/corpus_restaurado
```

This recreates the paths recorded by the existing ETL: retained original CSVs in
`warehouse/data/`, pinned snapshots in `warehouse_ampliado/snapshots/`, and other
extension inputs in `warehouse_ampliado/datos_crudos/{id}/`. It refuses restoration
to the current project or corpus directory and refuses to replace an existing file
with different bytes. Restoration does not execute or change the ETL. Keep the
staging directory outside a published checkout, or use an ignored local directory.

## Rebuild the preservation copy

Preparation is a local maintenance operation. It consumes a **private** inventory
containing already verified input paths. That inventory must not be published.
The preparer hashes those paths again before copying and fails before copying if
any expected input is absent. A public catalogue never includes those local paths.

```text
python corpus/scripts/preparar_corpus.py --inventory PRIVATE_INVENTORY.json --pages PRIVATE_PAGES.json
```

`--pages` is optional; it imports only public provenance URLs and their documented
or unverified status. `--allow-missing` permits a provisional partial copy, marks
the missing IDs explicitly and returns exit status `2`. Rerunning with a complete
inventory fills the gaps. Existing copies with the wrong bytes are rejected rather
than overwritten. The command does not download files or change the scientific
source manifest, original input files, or Git state. `--report PATH` writes a
machine-readable verification result to a chosen local path.

## Provenance, archives and attribution

Download URLs, publisher landing pages and DOI resolvers have separate fields.
An upstream download for the ITER ZIP describes the origin of the retained extract;
it is not asserted to be a direct download of the extract. The exact original
Open-Meteo request URL is not recorded, so it is not invented or regenerated.
An inferred landing page remains labelled unverified until separately checked.

`procedencia_web.json` links source IDs to publisher-page captures under
`capturas/`. `wayback.json`, when present, records archive capture attempts and
results. Both can be updated independently of the pinned scientific bytes. A live
page screenshot or an archive request is not proof of historical retrieval, and
a failed or pending archive request is not a successful capture.

The [browser-attempt record](wayback_intentos_browser.json) documents the Save Page
Now internal errors observed on 13 November 2026 and the successfully opened,
pre-existing SACMEX snapshot. The [retry queue](wayback_pendientes.csv) distinguishes
URLs with no available snapshot reported from URLs with an existing snapshot.
No new Wayback capture was confirmed during this preservation session.

Wayback checks and retry lists are restricted to the source URLs associated with
the 65 corpus input IDs. Bibliography-only URLs and visual-attribution pages are
outside this archive scope. `bibliografia.json` is a separate reference inventory;
it does not request or imply Wayback preservation of the bibliography.

`manifiestos/capturas_sha256.json` records the size, dimensions and SHA-256 of
the 29 evidence images. These checks protect image bytes; they do not certify
the truth of a publisher page or replace a confirmed archive snapshot.

Retain the publishers' licences and attribution conditions recorded in each
catalogue entry and in the source manifest. The repository's software licence does
not replace data licences. An unspecified original-input licence stays unspecified;
no new licence is inferred from a footer or another dataset. The Huerta-Vergara
article retains its stated CC BY-NC-SA terms, and the InSAR data retain their stated
CC0 terms. Publisher and academic author credits must accompany redistribution.

This corpus is a source-preservation package, not part of the interactive Pages
application. Publishing the website should exclude it from the Pages deployment
bundle; source-repository access and website deployment are separate concerns.
