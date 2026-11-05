# Memoria compartida: IJCOPI de agua

Actualizada: 5 de noviembre de 2026. Hablar con Gabriel en español y brevemente.
Leer AGENTS.md completo. Esta memoria es el relevo vigente; sus resultados históricos
no equivalen a verificaciones nuevas. Las rutas dependen de la PC: usar carpetas hermanas.

## Ubicaciones y límites

- Repositorio independiente: https://github.com/gabrielhuav/Data_Warehouse_IJCOPI, rama main.
- Mapa: https://gabrielhuav.github.io/Data_Warehouse_IJCOPI/ijcopi/mapa-zm.html
- Grafo: https://gabrielhuav.github.io/Data_Warehouse_IJCOPI/ijcopi/grafo-zm.html
- Consultas: https://gabrielhuav.github.io/Data_Warehouse_IJCOPI/ijcopi/consultas.html
- Original: https://github.com/gabrielhuav/Data_Warehouse_static, rama ijcopi-zmvm.
  Fuente de la distribución: 984c5144d4669e393262a9cd6ff515ac2ee81ca7.
- Conservar main original, release v1.5-icokg2026, Pages y URL del congreso.
  No modificar tampoco la publicación anterior Data_Warehouse_ZMVM ni sus enlaces.
- Manuscrito en el original: paper/ijcopi/dw_agua_IJCOPI_v3_grafo.docx y PDF.
  Gabriel decidió incorporar aquí solo copias Word v0_base y v3_grafo, en paper/ijcopi/.
  Se descartaron de esta copia local v1, v2 y la plantilla, sin tocar el original.
  El original y los generadores siguen siendo la fuente de trabajo. Texto: dw_agua_ijcopi.tex;
  citas APA: latex_a_ijcopi.py. Los PDF no se copiaron.
  No editar Word a mano ni cambiar autores sin autorización. Revisar las instrucciones
  propias del original antes de trabajar allí. No tocar camera-ready ni v0 congelada.

## Reglas

1. Cada commit (incluido amend), push, publicación o correo necesita autorización expresa
   previa de Gabriel para esa acción. Autorizar ediciones no autoriza commits.
2. Usar únicamente identidad Git humana de Gabriel Hurtado. Nunca asistentes de IA como
   autores, committers, coautores, trailers, firmas o créditos automáticos de commits/PR.
   Conservar licencias, créditos humanos y declaración académica de asistencia de IA.
3. No reescribir historial publicado. No confundir el main nuevo con el original congelado.
4. Antes de cada push, ejecutar scripts/verificar_enlaces_springer.ps1 en el original.
   Exigir fallos: 0 salvo excepción expresa para ese push. No modificar el verificador
   ni ocultar el 403 de ADIP. La excepción del primer push ya se consumió.
5. Toda cifra nueva se recalcula. Facturación no equivale a demanda medida;
   no hay fugas registradas antes de 2021. Plantilla IJCOPI, inglés británico,
   ampliación mínima 40 %, máximo 15 páginas, añadidos en amarillo; regenerar y revisar PDF.
6. AGENTS.md y los Markdown seleccionados de continuidad viajan con Git y se excluyen
   del archivo Pages mediante export-ignore. Históricos y evidencias locales no se publican.
   Actualizar Estado actual, Siguiente paso y Bitácora; luego solicitar commit/push si procede.

## Contenido

ijcopi/: mapa, grafo, consultas y datos estáticos. warehouse_ampliado/: ETL, fuentes,
DDL y verificadores. warehouse/: componente original de Omar Fernando Pulido Morales,
con su licencia MIT. El workflow publica un git archive de main, sin commits automáticos.

## Estado actual

- 5 nov, publicación de la revisión: Gabriel autorizó expresamente commit y push de los
  cambios pendientes con su identidad Git y sin atribuciones de IA. Se prepara un único
  commit en Data_Warehouse_IJCOPI con Word v3, web y documentación. No se hace commit
  ni push del original en esta acción; su fuente, conversor, Word y PDF siguen locales.
- Verificador Springer original repetido para este push: 25 enlaces, fallos: 1, únicamente
  HTTP 403 de ADIP. AZCATL respondió HTTP 200. El push requiere una excepción expresa nueva
  para ese único fallo; las autorizaciones anteriores ya se consumieron.
- Segunda mejora UI/UX local del 5 nov: mapa más amplio con controles en barra superior,
  navegación principal Mapa/Grafo/Consultas y enlaces CDMX en menú secundario; selector de
  municipio que encuadra y abre ficha, compartir vista con centro/zoom/indicador/capas/idioma,
  vista completa y panel de capas desplegable. La ficha se conserva al cambiar idioma.
  Leyenda y advertencias de comparabilidad permanecen visibles; SQL y conteos van en detalles.
- Catálogo de consultas rediseñado con títulos humanos ES/EN, búsqueda sin distinguir acentos,
  filtros por tema, contador y estado vacío; tarjetas de resultados, descarga JSON y detalles
  técnicos separados. Nuevo archivo necesario incluido en la revisión: ijcopi/consultas-ui.css.
- QA UI/UX: Edge en escritorio y 390 px; sin desbordamiento de página, mapa visible en la
  primera pantalla móvil, selector y capas operativos, selección preservada en EN, enlace
  compartido incluye c/ind/capas/lang. Buscar «sequia» devuelve la consulta correspondiente;
  vacío/limpiar recupera el catálogo; menú original conserva enlaces y cierra con Escape.
  La vista ?vista=figura conserva mapa a pantalla completa y controles ocultos. Sintaxis JS
  y diff sin errores. Datos, consultas SQL y TTL intactos. Esta revisión no modifica el Word.
- Revisión local del 5 nov autorizada por Gabriel: Word v3 mejorado desde el .tex y el
  conversor del original (ijcopi-zmvm), regenerado con plantilla y sincronizado en ambos
  repositorios. También se sincronizó su PDF en el original. v0, autoría y título intactos.
  Se corrigieron inferencias de facturación/demanda, cotas y alcance del detector, omisión RDF,
  promesas de disponibilidad, ortografía británica y enlaces metropolitanos al repo nuevo.
  La declaración de IA conserva su alcance sin afirmar revisión y aprobación humana ya terminadas.
- Verificación nueva de la revisión: Word mide 15 páginas y 9,318 palabras; v0 mide 5,615
  palabras (+65.95 %). Resumen 144 palabras y 6 palabras clave. Inspeccionadas las 15 páginas
  exportadas por Word y rasterizadas con Poppler. Tablas y figuras idénticas a la v3 anterior;
  ningún token nuevo sin amarillo respecto de esa v3. No se recalcularon los resultados
  científicos ni se reconstruyó la base: esta tarea no agrega cifras científicas nuevas.
- Web local mejorada: accesibilidad, selector de municipio del grafo por teclado, estados de carga,
  errores y reintento, control de respuestas tardías, SHA-256 completo y descarga JSON en consultas.
  QA real en Edge: mapa, español/inglés, tamaño móvil sin desbordamiento horizontal,
  selección del grafo, SELECT SPARQL y carga de las 15 consultas. Sintaxis JS y diff comprobados;
  el subagente comprobó además error HTTP y recuperación en el cargador. Datos y TTL sin cambios.
- No hubo commit, push ni publicación en esta revisión. Los dos repositorios contienen cambios
  locales: antes de trabajar o clonar en otra PC, recordar que estos cambios todavía no viajan
  con Git. Respaldos, PDF de QA y evidencias en tmp/revision_agua/ (local e ignorado).
- Publicación anterior de v0 y v3: commit 5b91fbd1ec8971b04d3d0a507fad6b8152b09851,
  autor y committer Gabriel Hurtado, sin atribuciones de IA; push completado y Actions
  41974331681 terminó correctamente. Esa autorización ya se consumió.
- Gabriel autorizó expresamente un commit y push con su identidad, sin atribuciones de IA,
  para incorporar solo dw_agua_IJCOPI_v0_base.docx y dw_agua_IJCOPI_v3_grafo.docx,
  manteniendo sus nombres y descartando intermedios. Las dos copias son idénticas por
  SHA-256 al original; no se editaron texto, autores, créditos ni declaración académica de IA.
- También autorizó para este push las excepciones ADIP 403 y timeout de AZCATL.
  Verificador original repetido inmediatamente antes de preparar el commit: enlaces: 25,
  fallos: 1, exclusivamente ADIP 403. AZCATL respondió 200 en esta repetición: el timeout
  anterior queda documentado, no se da por permanente. No se modificaron enlaces ni verificador.
- paper/ queda excluido de Pages mediante export-ignore. Este cambio incorpora los Word
  y su documentación para viajar con el clon. Comprobar Git y origin/main para confirmar
  la publicación; la autorización de este commit y push no cubre acciones posteriores.
- Publicación inicial independiente: b8ee46a4163c1c1bf5eb242d6b0c49a47d8dc78e,
  autor y committer Gabriel Hurtado, sin atribuciones de asistentes. No se importó historia.
  Actions 41890059542 intento 2 finalizó correctamente. En aquella revisión, 184 archivos
  web coincidieron por SHA-256; las 15 consultas se verificaron sin fallos. Son antecedentes.
- Durante la distribución inicial el paper citaba Data_Warehouse_ZMVM. La revisión local
  del 5 nov actualiza los enlaces metropolitanos al repo nuevo y vuelve a medir 15 páginas.
  El primer autor de IJCOPI fue confirmado por Gabriel; no cambiar el bloque de autores.
- El enlace oficial https://datos.cdmx.gob.mx/dataset/consumo-agua continúa en 403.
  Verificación previa a este cambio de contexto: 25 enlaces, fallos: 1, solo ese 403.
  No se verificó un espejo oficial equivalente accesible. Existe respaldo de investigación
  en warehouse/data/consumo_agua_historico_2019.csv, fijado al commit inicial:
  https://raw.githubusercontent.com/gabrielhuav/Data_Warehouse_IJCOPI/b8ee46a4163c1c1bf5eb242d6b0c49a47d8dc78e/warehouse/data/consumo_agua_historico_2019.csv
  Antecedentes verificados: 10,468,723 bytes, 71,102 filas;
  SHA-256 12aede58872a50856405ea24b6933e4b29b20d1de0e32d7463fabf855259b31d.
  Esto permite reproducir datos, pero no corrige el servidor oficial ni sustituye el gate.
- Gabriel autorizó publicar el contexto portable mediante un commit y push, sin atribución
  de IA, y después autorizó expresamente el push de f5dd81d con la única excepción ADIP.
  Se confirmó por git ls-remote que origin/main ya apunta exactamente a
  f5dd81d6c62f8806a54ce76b7f2f2d77b812a474, con autor y committer Gabriel Hurtado,
  sin atribuciones de asistentes ni firma. No fue necesario ejecutar otro push.
  La comprobación posterior del verificador dio dos fallos: ADIP 403 y timeout del DOI
  10.24275/AZC2026E1004. No se amplió la excepción ni se hizo push con ese resultado.
- Los archivos históricos, reportes completos y hooks locales de la PC anterior no viajan
  con el clon. Esta memoria contiene la continuidad necesaria; no afirmar haber leído
  archivos ausentes. Los Word seleccionados se prepararon para viajar con Git; fuentes, PDF y demás cambios
  no publicados requieren copia separada.

## Siguiente paso

0. Confirmar el commit de esta revisión en Data_Warehouse_IJCOPI y obtener excepción nueva
   para el único ADIP 403 antes del push. Mantener identidad humana y ausencia de firmas,
   trailers y coautorías de asistentes. Verificar despliegue de Pages después del push.
1. Gabriel revisa la v3 regenerada y los cambios web locales. Revisión humana de coautores,
   referencias editoriales de ICOKG y aprobación final de envío siguen pendientes.
   No crear commit ni hacer push sin autorización nueva para cada acción; ejecutar otra vez
   el verificador original y pedir excepción específica para los fallos que existan entonces.
   Incluir el nuevo CSS del catálogo cuando se autorice el commit; conservar las versiones
   de assets en los enlaces para evitar que una caché mantenga el diseño anterior.
2. En otra PC, seguir contexto/NUEVA_PC.md y agregar el clon como proyecto local en Codex.
3. Para publicar la revisión, considerar por separado los cambios del original ijcopi-zmvm
   (fuente, conversor, Word y PDF) y los de esta distribución (Word y web); no mezclar ramas
   ni tocar los sitios históricos. No incluir intermedios ni plantilla en este repo.
4. Toda autorización de commit/push se consume al ejecutar esa acción: pedir una nueva
   para cambios posteriores. No enviar correos ni publicar el paper automáticamente.

## Bitácora

- 2026-11-05: Gabriel autorizó commit y push de la revisión pendiente con las reglas locales.
  Preparado el commit de Word/web/documentación; verificador original: 25 enlaces, un fallo
  ADIP 403, AZCATL 200. Push condicionado a excepción expresa nueva. Sin commit del original.
- 2026-11-05: por petición de mejoras visibles de UI/UX, rediseñados explorador y catálogo,
  simplificada navegación, añadida selección de municipio y compartir vista; comprobados
  escritorio, móvil, ES/EN, filtros y vista de figura. Cambios solo locales; sin commit/push.
- 2026-11-05: revisión autorizada del Word y sitio. Fuente y conversor corregidos en el original,
  v3 regenerada y sincronizada; 15 páginas, +65.95 % y amarillo comprobados; tablas, figuras,
  título y autores preservados. Sitio probado en Edge escritorio/móvil y en ES/EN; mejorados
  acceso por teclado, errores y trazabilidad. Sin cambios de datos ni commit/push/publicación.
- 2026-11-04: preparados cinco Word ya copiados localmente, integridad y SHA-256 exactos;
  guía de versión vigente, documentación de clon y exclusión de Pages. Sin edición de los
  documentos ni nuevos commit/push. Verificador original: 25 enlaces, un fallo ADIP 403.

- 2026-11-04: distribución independiente de agua publicada con autorización y excepción
  ADIP para el primer push. Verificados sitio, consultas, identidad humana y respaldo CSV.
- 2026-11-04: preparado relevo local y reforzada autorización individual de commits/push.
- 2026-11-04: Gabriel pidió contexto clonable y autorizó un commit/push sin atribuciones
  de asistentes. Preparada continuidad portable sin históricos; ADIP sigue siendo el único
  fallo del verificador original y requiere nueva excepción para este push.
- 2026-11-04: Gabriel autorizó la excepción exclusiva ADIP para f5dd81d; se confirmó que
  el remoto ya contenía ese commit humano, sin atribuciones ni firma. No se ejecutó otro
  push. El verificador repetido añadió un timeout de AZCATL; no se eludió el control.
  Actualización de continuidad solo local, sin nuevo commit.
- 2026-11-04: Gabriel pidió incluir los Word del paper. Preparadas cinco copias idénticas
  por SHA-256 (v0 a v3 y plantilla), documentación y exclusión de Pages; sin cambios al
  original. Pendientes commit y push expresamente autorizados.
- 2026-11-04: Gabriel limitó la publicación a v0_base y v3_grafo y autorizó expresamente
  commit/push humano, sin atribuciones de IA, con excepciones ADIP 403 y timeout AZCATL.
  Retiradas v1, v2 y plantilla solo de esta copia; original intacto. Nueva verificación:
  25 enlaces, un fallo ADIP; AZCATL recuperó HTTP 200. Excepciones documentadas junto a los Word.
