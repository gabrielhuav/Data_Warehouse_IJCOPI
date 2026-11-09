# Manuscrito de agua para IJCOPI

Versión vigente para revisión: [dw_agua_IJCOPI_v3_grafo.docx](dw_agua_IJCOPI_v3_grafo.docx).

- [dw_agua_IJCOPI_v0_base.docx](dw_agua_IJCOPI_v0_base.docx): base congelada de comparación; no modificar.
- [dw_agua_IJCOPI_v3_grafo.docx](dw_agua_IJCOPI_v3_grafo.docx): última versión registrada para revisión.

Solo se incluyen v0 y v3 por decisión de Gabriel; los intermedios y la plantilla no se publican aquí.
La revisión local del 9 de noviembre de 2026 mide **15 páginas y 9,043 palabras**
en Word, frente a 5,615 de v0 (**+61.05 %**), ambos recuentos comprobados de nuevo.
Por instrucción de Gabriel, Roberto Eswart Zagal Flores firma último; Gabriel sigue
primero y como autor de correspondencia. Se conservan adscripción, correos y ORCID.
La sección 5.8 describe la expansión municipal a colonias y la distancia aproximada
entre centroides. El trabajo futuro propone ampliar los datos de población con
densidad, uso del suelo y acceso al servicio para contextualizar geográficamente
los volúmenes facturados, sin inferir consumo real ni causalidad.
Regenerado desde el fuente y conversor en `C:/dev/Data_Warehouse_static`, rama
`ijcopi-zmvm`, y sincronizado aquí por SHA-256. Las quince páginas se inspeccionaron.
Los únicos tres párrafos modificados son autoría, sección 5.8 y trabajo futuro;
los cambios de cuerpo están completamente en amarillo. Título, tablas, imágenes,
declaración académica de IA, plantilla y v0 se conservan. El contador histórico
contra v0 da 81 por alineación/tokenización; no representa añadidos nuevos sin amarillo.
Word v3 SHA-256: `86f7ea1fbc627ad0ab0ea4036f93b9399b55419abce963eb8d028b271081fac9`.
Gabriel autorizó el cierre con un commit y push por repositorio, con su identidad
humana y sin firmas ni créditos automáticos. Cada push exige cero fallos del
verificador Springer; no autoriza envío editorial ni cambios a sitios históricos.
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
