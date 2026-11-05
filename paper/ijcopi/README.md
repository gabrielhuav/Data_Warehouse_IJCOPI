# Manuscrito de agua para IJCOPI

Versión vigente para revisión: [dw_agua_IJCOPI_v3_grafo.docx](dw_agua_IJCOPI_v3_grafo.docx).

- [dw_agua_IJCOPI_v0_base.docx](dw_agua_IJCOPI_v0_base.docx): base congelada de comparación; no modificar.
- [dw_agua_IJCOPI_v3_grafo.docx](dw_agua_IJCOPI_v3_grafo.docx): última versión registrada para revisión.

Solo se incluyen v0 y v3 por decisión de Gabriel; los intermedios y la plantilla no se publican aquí.
La base v0 permanece intacta. El 5 de noviembre de 2026 se revisó la v3 desde su fuente en
Data_Warehouse_static/paper/ijcopi, rama ijcopi-zmvm, y se regeneró con la plantilla obligatoria.
Se precisaron las limitaciones de facturación, anomalías y RDF, se uniformó el inglés británico
y se actualizaron los enlaces de la ampliación a Data_Warehouse_IJCOPI, conservando los de ICOKG.
La declaración académica de IA se conserva sin afirmar que ya terminó la revisión de todos los autores.

Comprobación nueva con Word: 15 páginas, 9,318 palabras frente a 5,615 de la base (+65.95 %),
resumen de 144 palabras y 6 palabras clave. Se inspeccionaron las 15 páginas renderizadas.
No hay texto nuevo sin amarillo frente a la v3 anterior; las diferencias estructurales históricas
frente a v0 siguen diferenciadas en el verificador. Título, autoría, tablas y figuras se conservaron.
No se introdujeron nuevas cifras científicas ni se repitió la reconstrucción completa del almacén.
La aprobación de los coautores y la revisión final para envío siguen pendientes.

Los generadores y fuentes siguen en el repositorio original. Para editar texto o referencias,
usar allí dw_agua_ijcopi.tex y latex_a_ijcopi.py; no modificar Word a mano. Cada commit y push
requiere autorización expresa de Gabriel. Los archivos de esta carpeta viajan con el clon,
son públicos en GitHub y se excluyen del sitio Pages mediante export-ignore.

## Enlaces pendientes

- ADIP: https://datos.cdmx.gob.mx/dataset/consumo-agua devuelve HTTP 403.
- AZCATL: https://doi.org/10.24275/AZC2026E1004 presentó un timeout en la comprobación
  anterior; en la repetición previa a esta publicación respondió HTTP 200. No se modificó el DOI.

Gabriel autorizó expresamente el commit y push de v0 y v3 con las excepciones del 403 de ADIP
y del timeout de AZCATL. Esta autorización se limita a esta publicación; no cubre otros fallos
ni futuros commits o pushes. No se cambiaron el verificador ni los enlaces históricos.
