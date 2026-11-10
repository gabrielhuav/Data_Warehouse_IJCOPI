# Manuscrito de agua para IJCOPI

Versión vigente para revisión: [dw_agua_IJCOPI_v3_grafo.docx](dw_agua_IJCOPI_v3_grafo.docx).

- [dw_agua_IJCOPI_v0_base.docx](dw_agua_IJCOPI_v0_base.docx): base congelada de comparación; no modificar.
- [dw_agua_IJCOPI_v3_grafo.docx](dw_agua_IJCOPI_v3_grafo.docx): última versión registrada para revisión.

Solo se incluyen v0 y v3 por decisión de Gabriel; los intermedios y la plantilla no se publican aquí.
La revisión local del 9 de noviembre de 2026 mide **15 páginas y 9,056 palabras**
en Word, frente a 5,615 de v0 (**+61.28 %**). Resumen: 146 palabras sin la etiqueta
«Abstract.» (147 al incluirla); seis keywords.
Por instrucción de Gabriel, Roberto Eswart Zagal Flores firma último; Gabriel sigue
primero y como autor de correspondencia. El correo del Dr. Roberto cierra el bloque
de contactos; se conservan todos los correos, adscripción y ORCID.
La sección 5.8 describe la expansión municipal a colonias, sus conexiones directas
y la distancia aproximada entre centroides. El trabajo futuro propone ampliar los datos de población con
densidad, uso del suelo y acceso al servicio para contextualizar geográficamente
los volúmenes facturados, sin inferir consumo real ni causalidad.
Regenerado desde el fuente y conversor en `C:/dev/Data_Warehouse_static`, rama
`ijcopi-zmvm`, y sincronizado aquí por SHA-256. Las quince páginas se inspeccionaron.
La figura 1 compara los dos CSV originales (SACMEX y Open-Meteo) con 62 archivos
adicionales por fuente y su integración al almacén. Sustituye las dos capturas antiguas;
sus archivos y enlaces se conservan. Los conteos originales se recalculan desde los CSV
y los ampliados desde exportaciones SQL verificadas por SHA-256, sin reconstruir la base.
Se distinguen archivos, registros de facturación, observaciones meteorológicas y filas
físicas con granos distintos. El resumen separa el alcance del almacén del grafo metropolitano.
Cero palabras nuevas sin amarillo frente a la revisión anterior; figura con marco amarillo.
La figura 3 se recapturó desde el sistema actualizado en inglés: (a) vista metropolitana
del volumen facturado; (b) Tepalcates y sus siete vecinas, incluidas dos en Iztacalco.
Las leyendas se ampliaron para leerlas a 8.4 cm, sin ocultar nodos ni conexiones;
atribución OpenStreetMap visible. Las figuras 1 y 2 ya estaban en inglés.
Título, autores, tablas de datos, figuras 1 y 2, declaración de IA, plantilla y v0 preservados.
El generador reproducible, SVG/PNG y evidencia del diagrama se incluyen en `paper/ijcopi/`
de ambos repositorios. `generar_diagrama_corpus.py` recalcula las cantidades desde sus insumos.
Word v3 SHA-256: `7c62eefda1bb7e27a37f77cff79a76e6f98e39174741f5f1ae3f9ae63625a89e`.
La revisión anterior se publicó en original `52782a7` e IJCOPI `a0730ed`, con identidad
humana sin firma ni trailers. Gabriel autorizó un nuevo commit y push de lo pendiente
en `main`: conexiones, interfaz, manuscrito identificado y capturas actualizadas.
Esta autorización no incluye otro repositorio ni envío editorial.
Antes de cualquier push se exige repetir el verificador Springer y obtener cero fallos
o una excepción expresa para esa ejecución; las autorizaciones consumidas no se reutilizan.
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

Para este cierre de `main`, el verificador Springer original intacto terminó con
25 enlaces y un único fallo: ADIP HTTP 403; AZCATL respondió HTTP 200. Gabriel
autorizó ADIP únicamente si era el único fallo de este push. No se cambiaron
el verificador ni los enlaces históricos. Esta excepción y el permiso de Git se
consumen con el cierre; cualquier acción posterior requiere autorización nueva.
