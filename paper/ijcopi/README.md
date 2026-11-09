# Manuscrito de agua para IJCOPI

Versión vigente para revisión: [dw_agua_IJCOPI_v3_grafo.docx](dw_agua_IJCOPI_v3_grafo.docx).

- [dw_agua_IJCOPI_v0_base.docx](dw_agua_IJCOPI_v0_base.docx): base congelada de comparación; no modificar.
- [dw_agua_IJCOPI_v3_grafo.docx](dw_agua_IJCOPI_v3_grafo.docx): última versión registrada para revisión.

Solo se incluyen v0 y v3 por decisión de Gabriel; los intermedios y la plantilla no se publican aquí.
La revisión posterior al informe independiente del 9 de noviembre de 2026 mide
**15 páginas y 9,029 palabras** en Word, frente a 5,615 de v0 (**+60.80 %**),
con resumen de 144 palabras y seis keywords. Se aclararon los tres denominadores
territoriales/temporales, cobertura y NA, coordenadas válidas y grano de las ingestas.
Se añadieron tres créditos científicos verificados y se actualizó el grafo a 91,230
triples: la consulta de volumen no reportado devuelve 27 pares de 21 municipios.
Título, autores, declaración académica de IA, figuras, plantilla y v0 intactos.
Las quince páginas se inspeccionaron renderizadas; cero palabras añadidas frente
al respaldo de 9,116 palabras quedan sin amarillo. El contador histórico contra v0
sigue en 83 por tokenización/alineación.
Word v3 SHA-256: `d38e1e48c1741dcf80f3f58f8d62828bfed7089a2a581d4b345f6eeb93ff771e`.
Las correcciones previas de grano fiscal, AP, tres listas y prueba exacta se conservan.
La aprobación humana final y los metadatos asignados por la editorial siguen pendientes.

Antecedentes de las revisiones anteriores:
La base v0 permanece intacta. El 5 de noviembre de 2026 se revisó la v3 desde su fuente en
Data_Warehouse_static/paper/ijcopi, rama ijcopi-zmvm, y se regeneró con la plantilla obligatoria.
Se precisaron las limitaciones de facturación, anomalías y RDF, se uniformó el inglés británico
y se actualizaron los enlaces de la ampliación a Data_Warehouse_IJCOPI, conservando los de ICOKG.
La declaración académica de IA se conserva sin afirmar que ya terminó la revisión de todos los autores.

Revisión del 8–9 de noviembre de 2026, también desde la fuente y el conversor del original:
se corrigieron la hoja de ruta (faltaban las secciones 4 y 6), «point» → «points», unidades y
formato de la tabla 3, el título real del recurso (1° Semestre), la mención a una correlación
climática que el artículo no reporta, el uso de «consumo» para volumen facturado en texto heredado,
el conteo de escenarios de sensibilidad (10 distintos, no 12) y precisiones de la sección 5.7
(1,508 colonias con al menos 500 habitantes, litros por habitante, 89 municipios del Edomex en 2018).
La comparación A_g contra Isolation Forest ahora es pareada por semilla (19 de 20; PR-AUC 20 de 20),
reproducible con evaluacion-ml/comparacion_pareada.py. El pie de la Fig. 3 explica el borde punteado
de Tláhuac y Milpa Alta. Referencias: «Mexico City» y obras n.d. antes de las fechadas (APA 7).
El conversor alinea a la izquierda los párrafos con URL largos y usa el signo menos tipográfico.

Comprobación de aquella versión con Word: 15 páginas, 9,431 palabras frente a 5,615 de la base (+67.96 %),
resumen de 144 palabras y 6 palabras clave; la página 15 queda tan llena como antes. Se revisaron
las páginas renderizadas. Ninguna palabra nueva queda sin amarillo frente a la v3 anterior
(comparación por párrafo); verificar_amarillo.py frente a v0 sube de 67 a 79 solo por cortes de
token junto al texto resaltado. Título, autoría, figuras y v0 se conservaron. Respaldo de la versión
anterior en tmp/revision_2026-11-08/antes/ (local e ignorado).
La aprobación de los coautores y la revisión final para envío siguen pendientes.

Los generadores y fuentes siguen en el repositorio original. Para editar texto o referencias,
usar allí dw_agua_ijcopi.tex y latex_a_ijcopi.py; no modificar Word a mano. Cada commit y push
requiere autorización expresa de Gabriel. Los archivos de esta carpeta viajan con el clon,
son públicos en GitHub y se excluyen del sitio Pages mediante export-ignore.
La base de esta revisión es `22a8ac1d3e5a436a8ae4617f1fa15fef45ed7157` del original;
las fuentes corregidas están en el commit 967b9f9b05017a870495cdea17578eb8bd1d672c, rama ijcopi-zmvm.

## Enlaces pendientes

- ADIP: https://datos.cdmx.gob.mx/dataset/consumo-agua devuelve HTTP 403.
- AZCATL: https://doi.org/10.24275/AZC2026E1004 presentó un timeout en la comprobación
  anterior; en la repetición previa a esta publicación respondió HTTP 200. No se modificó el DOI.

La publicación inicial de v0 y v3 tuvo autorización expresa con excepciones ADIP/AZCATL;
ese permiso ya se consumió. Gabriel autorizó las correcciones, commit y push del cierre
del 9 de noviembre, pero cada push sigue exigiendo fallos: 0 o excepción expresa para
esa ejecución. No se cambiaron el verificador ni los enlaces históricos.
