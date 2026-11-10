# Manuscrito de agua para IJCOPI

Versión vigente para revisión y envío: [dw_agua_IJCOPI_v3_grafo.docx](dw_agua_IJCOPI_v3_grafo.docx).
PDF local de la misma versión: dw_agua_IJCOPI_v3_grafo.pdf; no incorporado a Git ni enviado.

- [dw_agua_IJCOPI_v0_base.docx](dw_agua_IJCOPI_v0_base.docx): base congelada; no modificar.
- [dw_agua_IJCOPI_v3_grafo.docx](dw_agua_IJCOPI_v3_grafo.docx): artículo extendido identificado.

Revisión del 10 de noviembre de 2026 en `main`: **15 páginas y 9,098 palabras** en
Microsoft Word, frente a 5,615 de v0 (**+62.03 %**). Resumen: **146 palabras** sin
«Abstract.» (147 incluyéndolo); seis keywords. Plantilla IJCOPI, inglés británico,
amarillo y declaraciones conservados. Las quince páginas del PDF se inspeccionaron
a 150 dpi. No se redujeron la letra, el tamaño de página ni los márgenes.

La **Fig. 1 original está restaurada**: ambos PNG son idénticos byte por byte a v0,
con las dos leyendas, los enlaces históricos exactos y la atribución OpenStreetMap.
La v0 nunca se modificó. La sustitución de las capturas por el diagrama ocurrió
en la v3 distribuida en `a0730ed` el 9 de noviembre; el diagrama también se conserva,
ahora como Fig. 2. Sensibilidad es Fig. 3 y las dos vistas metropolitanas, Fig. 4.

La Fig. 4b se recapturó del sistema público real por petición de Gabriel: San Pablo
Xalpa (Azcapotzalco) y sus dos vecinas, San Martin Xochinahuac y Santa Barbara,
ambas en la misma alcaldía. Se verificaron la clave 90020074, las dos colindancias
simétricas del RDF, las veinte teselas completas y cero errores JavaScript. Captura
limpia de 1600 × 1216 px, en inglés y con atribución OpenStreetMap visible.
Vista reproducible: https://gabrielhuav.github.io/Data_Warehouse_IJCOPI/ijcopi/grafo-zm.html?mun=09002&col=90020074&vista=figura&lang=en
La imagen y su leyenda sustituyen únicamente el panel b; Fig. 4a y Fig. 1 permanecen
intactas. Nueva comprobación de las quince páginas después de sustituirla.

Se precisaron cuatro puntos sin cambiar datos ni resultados: la tabla 6 presenta
ocho escenarios seleccionados de diez distintos; las fuentes metropolitanas combinan
periodos no contemporáneos; la precisión al presupuesto igualado es el promedio
ponderado de los recalls de picos y descensos; y la base no identifica el tipo de
facturación por registro, por lo que no permite cuantificar la proporción imputada.
Se marcaron también en amarillo las numeraciones heredadas que cambiaron frente a v0.
Se eliminaron URL duplicados del cuerpo (permanecen íntegros en las leyendas) y líneas
vacías tras las tablas; se repiten sus cabeceras si continúan en otra página.
Todas las celdas de las tablas de datos coinciden con la entrada de `e6671c0`.

Se recuperaron fuente, conversor, plantilla e imágenes del original `52782a7`,
reconciliados contra el Word de `e6671c0` hasta reproducir exactamente texto, imágenes,
resaltado, cursivas, URL y encabezados/pies antes de aplicar estas correcciones.
Fuente de esta revisión y reproducción local:
`tmp/restauracion_main_2026-11-10/fuente/` y evidencia en su carpeta `salida/`.
El Word se regeneró; no se editó a mano. No se cambió la rama ni el contenido del
repositorio original. Antes de una futura sincronización, usar este fuente corregido;
regenerar desde el checkout antiguo del original perdería la restauración.

Las tres comprobaciones pendientes de PostgreSQL **aprobaron realmente** en esta PC:
salida 0, `status=pass`, `passed=true`, `read_only=true`. Resultado conservado en
`resultado_postgresql.json` (raíz): 89 municipios, Spearman 0.9335716717739189 y
Pearson 0.3221003188410962; 39,685 reportes de enero–junio de 2019, todos de falta
de agua y cero fugas; las 15 consultas SQL coinciden con sus JSON. Se comprobó además
que los SQL y JSON actuales de `main` coinciden con el manifiesto verificado.
Contenedor existente `data_warehouse_cdmx`, volumen `warehouse_pgdata`, PostgreSQL
16.15. Sólo lectura; no se ejecutó ETL ni se reconstruyó o modificó el volumen.

A petición de Gabriel, el bloque de contactos sigue la presentación del artículo de
obras `Paper37_IJCOPI_v1_extendida.docx`: una línea por autor, nombre en negrita y
sus correos juntos, separados por punto y coma. Se conservan exactamente los once
correos registrados: cinco autores con dos y el Dr. Roberto sólo con rzagalf@ipn.mx.
Todo el bloque reformateado está en amarillo. No se cambió el orden de firma ni se
inventó un segundo correo para Roberto. Se volvió a medir Word y a revisar las
quince páginas del PDF tras este ajuste.

Título, orden de los seis autores, correspondencia de Gabriel, contactos, créditos,
licencias y declaración académica de IA intactos. La copia anónima de `6f723ea`
se conserva como snapshot anterior; no se actualizó ni se sustituyó con esta v3.
Los Word que se comparten siguen siendo sólo v0 y v3; no añadir intermedios ni plantilla.
Word v3 SHA-256: `5d3d8161e8d759e3e1ddd31b7e7af7cf3808e2fe76304ccfff79ab608d03d0b9`.

Gabriel autorizó expresamente el 10 de noviembre un commit y push de esta revisión
en `main`, con su identidad Git humana, sin firma ni atribuciones automáticas. El
alcance se limita al Word final, este README y la memoria portable; se excluyen
PDF local, fuente local, plantilla, capturas intermedias, correo, resultado PostgreSQL
y todo `tmp/`. El Word lleva embebida la nueva captura final. Antes del push se exige
el verificador Springer original intacto con cero fallos o una excepción expresa
para ese push; no se reutilizan excepciones anteriores. Las autorizaciones se
consumen al ejecutar cada acción y no habilitan otros commits ni amend. No se envía
el correo ni el manuscrito. Aval de coautores y metadatos editoriales siguen pendientes.

## Antecedentes de las revisiones anteriores

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
