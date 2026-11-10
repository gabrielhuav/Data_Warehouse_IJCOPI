# Water data warehouse review artefact

This snapshot accompanies the manuscript on territorial information retrieval
from heterogeneous open water data for Mexico City and its metropolitan area.
It contains the current source files, including the latest neighbourhood traversal
and screenshot-related changes. It has no development history, author manuscript,
private continuity notes, or deployment workflow.

## Explore the demonstration

Serve the repository root over HTTP, then open these relative paths:

- [Metropolitan map](ijcopi/mapa-zm.html?lang=en)
- [Metropolitan knowledge graph](ijcopi/grafo-zm.html?lang=en)
- [Warehouse queries](ijcopi/consultas.html?lang=en)
- [Atypical billing lists](ijcopi/atipicos.html?lang=en)
- [Original city map](mapa.html?lang=en)
- [Original graph](grafo.html?lang=en)
- [Original neighbourhood traversal](vecindad.html?lang=en)

For example, run `python -m http.server 8765` from this directory. The original
and metropolitan pages, worker, scripts, data and vendor libraries retain the
same relative hierarchy. Opening HTML with `file://` will not load the data.
The Anonymous repository viewer displays source files; a live web preview is
available only if the hosting service enables its Pages feature.

## Reproduce and verify

- `warehouse/`: original PostgreSQL schema, ETL, Docker configuration and CSVs.
- `warehouse_ampliado/`: fixed source manifest, snapshots, ETL, SQL and RDF mapping.
- `warehouse_ampliado/consultas/`: fifteen SQL queries and their instructions.
- `evaluacion-ml/`: anomaly calculations, exact paired tests and recorded evidence.
- `scripts/`: original analyses and static export tools.
- `paper/ijcopi/`: the corpus diagram, generator and count evidence, without the author manuscript.
- `verificacion_postgresql/`: portable final checks for a PC with the extended database.

The original two CSVs and additional source files have different roles and grains.
Exported table rows are not independent observations. The demonstrator reads static
JSON/RDF; it does not query the live database. Consult the component READMEs and
`warehouse_ampliado/fuentes.json` for dependencies, source versions and licences.
Rebuilding the extended warehouse requires PostgreSQL, separate Python environments
for ETL and RDF, and the manifest-pinned downloads not included among the snapshots.

## Verification status

The three live PostgreSQL checks passed in a read-only transaction: 89 municipalities
(Pearson 0.3221003188410962; Spearman with average ranks 0.9335716717739189),
39,685 shortage reports and zero leak reports in January–June 2019, and all fifteen
SQL results matching their JSON exports. No ETL or database reconstruction was run.

## Data interpretation

The water values are billed volumes, not a complete measurement of physical demand.
Population supports, years and coverage differ between layers; proxy rates are
labelled accordingly. Colour intensity ranks the available values. Adjacency and
centroid distances do not represent pipes or supply routes. Missing leak records
before 2021 must not be interpreted as evidence that no leaks occurred.

## Licences and attribution

The MIT licence and original human attribution notices are retained in the source
snapshot. The review mirror conceals identifying author terms in its presentation
layer; this does not change the ownership or licensing of the source work.
Third-party notices are retained, including the notices for Comunica and Leaflet.
Public data retain their publishers' licences. The base map is Â© OpenStreetMap
contributors, ODbL. Scientific dataset identifiers and RDF vocabulary IRIs are retained
so that queries, provenance and integrity checks continue to work.
