# Memoria compartida: IJCOPI de agua

Actualizada: 13 de noviembre de 2026. Hablar con Gabriel en español y brevemente.
Leer AGENTS.md completo. Esta memoria es el relevo vigente; sus resultados históricos
no equivalen a verificaciones nuevas. Las rutas dependen de la PC: usar carpetas hermanas.

## Ubicaciones y límites

- Repositorio independiente: https://github.com/gabrielhuav/Data_Warehouse_IJCOPI, rama main.
- Mapa: https://gabrielhuav.github.io/Data_Warehouse_IJCOPI/ijcopi/mapa-zm.html
- Grafo: https://gabrielhuav.github.io/Data_Warehouse_IJCOPI/ijcopi/grafo-zm.html
- Consultas: https://gabrielhuav.github.io/Data_Warehouse_IJCOPI/ijcopi/consultas.html
- Atípicos: https://gabrielhuav.github.io/Data_Warehouse_IJCOPI/ijcopi/atipicos.html
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

- **Cierre del corpus autorizado (13 nov 2026):** Gabriel autoriza un commit y push
  en IJCOPI/main con su identidad humana, sin firmas, coautorías ni créditos de IA.
  Corrige el alcance de Wayback: únicamente fuentes del corpus; se excluyen las URL
  sólo bibliográficas y de atribución visual. El filtro permanente deja 101 URL,
  34 con snapshot existente y 67 sin disponibilidad reportada; 65/65 insumos cubiertos.
  Los informes anteriores más amplios se conservan sólo como evidencia privada.
  Cero capturas nuevas confirmadas: la revisión del perfil distingue Uploads de Web
  Archives y no encontró capturas de este corpus. No se subieron archivos al perfil.
  Verificador Springer original intacto previo a este cierre: 25 enlaces, cero fallos,
  incluidos ADIP y AZCATL HTTP 200. Evidencia en tmp/publicar_corpus_2026-11-13/.
  Commit/push y Pages por confirmar; no reutilizar el permiso una vez consumido.

- **Estado vigente (13 nov 2026), continuidad local:** Gabriel informó que ya envió
  las versiones identificada y anónima y recibió acuse. La revisión principal observó
  en la interfaz el envío del 10 nov a las 01:33, con Word/PDF identificados y un
  enlace para la revisión anónima, y el acuse del 10 nov a las 18:43. Se registra sólo
  el hecho general: no se reproducen mensajes ni enlaces privados y no se auditaron
  los hashes de los adjuntos enviados. El envío ya no es un pendiente; no reenviar.

- **PostgreSQL resuelto el 10 nov:** las tres comprobaciones reales de sólo lectura
  aprobaron, con `resultado_postgresql.json` conservado en IJCOPI. No volver a tratar
  como pendientes las correlaciones, los reportes de 2019 ni las 15 consultas SQL/JSON.
  Esta sesión de respaldo no ejecutó ETL ni modificó el volumen o los resultados.

- **Respaldo local del corpus COMPLETADO:** `corpus/` de IJCOPI conserva 65 insumos
  lógicos: 62 del manifiesto ampliado, dos CSV del estudio original y el extracto
  auxiliar ITER (17 filas: ciudad y 16 alcaldías), separado del ZIP completo de origen.
  Total recalculado: 2,130,015,245 bytes en 159 archivos físicos, ninguno mayor de
  20,000,000 bytes. Verificador final terminó 0, 65/65 insumos y cero faltantes;
  tamaños, MD5/SHA-256 y concatenaciones coinciden con los pines. Se recuperaron B8,
  B11, D10, D16a y D16b desde sus URL originales; D10 se reanudó por rangos y sólo se
  aceptó tras verificar el ZIP completo. Las tres partes originales de D15 y el
  manifiesto científico permanecen byte-idénticos. Cachés y trazas privadas conservadas.
  `INDICE.md` final tiene 65 filas; QA aprobó 232 enlaces locales y 18 anclas.

- **Procedencia y capturas:** catálogo JSON/CSV, manifiesto copiado, scripts estándar
  de preparación/verificación/restauración y README preparados localmente. Hay 29
  imágenes de evidencia y cobertura de página para los 65/65 ID: incluye previsualización
  de A3 sólo lectura, una captura histórica SACMEX y evidencia OSM separada de los
  insumos científicos. Bibliografía inventariada: 42 referencias y 39 URL únicas;
  no se copiaron artículos de pago ni documentos Word al corpus. Licencias y créditos
  existentes conservados; los avisos sin licencia explícita se distinguen como tales.

- **Wayback sigue INCOMPLETO:** alcance corregido a 101 URL del corpus; 34 tienen
  snapshot previo disponible y 67 no devuelven un `closest` disponible. Los informes
  anteriores con bibliografía y otras URL quedan sólo como antecedentes privados.
  Cero errores API pendientes;
  hubo errores transitorios en observaciones anteriores, ya resueltos. Esta consulta
  de disponibilidad no certifica los bytes archivados ni demuestra que una URL nunca
  se haya archivado. El snapshot SACMEX `20250905213619` sí se abrió en la interfaz.
  Save Page Now falla con error interno en Edge con sesión iniciada, incluido el último
  reintento del 13 nov: **cero capturas nuevas confirmadas**. Cola de reintentos guardada;
  no afirmar que las fuentes ya se preservaron de nuevo en Internet Archive.

- **Publicación y límites:** cambios preparados sólo en la distribución IJCOPI.
  Su workflow excluye `corpus/` del despliegue Pages mediante `tar`, sin añadir
  `export-ignore` al corpus, para que un futuro ZIP de GitHub pueda conservarlo.
  README raíz enlaza el respaldo. No hubo commit, push, correo ni despliegue nuevos;
  este trabajo no autoriza acciones Git futuras. Manuscritos, base de datos y sitios
  históricos intactos. Evidencias locales: `tmp/respaldo_corpus_2026-11-13/`, incluidos
  `inventario_local.json`, `verificacion_corpus.json`, `qa_indice_final.json`,
  `qa_entrega_corpus.json` y `qa_exclusion_pages.json`; no publicar las rutas privadas.

Los registros siguientes son antecedentes cronológicos. Los pendientes antiguos de
PostgreSQL y de envío quedaron resueltos; las autorizaciones antiguas no habilitan
commit, push, publicación o correo para este respaldo.

- **Estado anterior (10 nov 2026):** por instrucción de Gabriel se volvió a `main`
  de este repositorio para arreglar primero el artículo identificado. Base previa de esta revisión:
  `e6671c07144326f029260eaa7ad15e785ef314ca`; revisión anónima conserva su ref
  `6f723ea05fb9ca1a419dfb53399507b1f49452c1`. Gabriel autorizó ahora un commit y
  push de la revisión en main con identidad humana, sin firmas/atribuciones de IA,
  tras el gate Springer original: cero fallos o excepción expresa de ese push.
  No hay autorización de amend, otros commits, correo ni envío del manuscrito.
  No cambiar el original ni los históricos. El resultado exacto del cierre se consulta
  con Git. Si origin/main contiene el SHA del Word indicado aquí, el permiso de
  commit/push ya se consumió y no se repite. No reutilizar esta autorización.
  V3 vigente en `paper/ijcopi/dw_agua_IJCOPI_v3_grafo.docx` y PDF junto al Word
  (PDF local no incorporado a Git). 15 páginas, 9,098 palabras frente a 5,615 de v0:
  +62.03 %. Resumen 146 sin etiqueta / 147 con ella; seis keywords. Word y PDF
  revisados completos a 150 dpi. Fig. 1 recupera exactamente las dos capturas de v0,
  sus tres leyendas, los dos URL históricos y el crédito OSM. Diagrama conservado como
  Fig. 2; sensibilidad Fig. 3; vistas metropolitanas Fig. 4. Las tablas de datos,
  título, autores/contactos, plantilla, márgenes, créditos y declaración IA se conservan.
  Fig. 4b recapturada del sistema real: San Pablo Xalpa (Azcapotzalco), clave 90020074,
  y dos vecinas: San Martin Xochinahuac y Santa Barbara. Dos relaciones simétricas
  verificadas en RDF; captura 1600×1216 en inglés, 20 teselas completas, 0 errores JS y
  atribución OSM. Sólo cambia este panel y su leyenda; Fig. 1 y Fig. 4a intactas.
  Evidencia/captura/fuente actualizado en tmp/entrega_fig4b_2026-11-10/ y en el
  fuente de restauracion_main; todo eso se conserva local, sin subirlo a Git.
  Contactos reformateados como Paper37 por petición posterior de Gabriel: una línea
  por autor, nombre en negrita, dos correos separados por punto y coma; Roberto conserva
  sólo rzagalf@ipn.mx. Mismos once correos y orden de firma; bloque completo amarillo.
  Cuatro precisiones: ocho escenarios seleccionados en tabla 6; periodos no contemporáneos;
  precisión ponderada de recalls de picos/descensos; facturación imputada posible en
  proporción desconocida. Amarillo también en numeraciones cambiadas; sin texto nuevo
  real fuera de amarillo. v0 byte-idéntica SHA c3a71fa0...; copia anónima DOCX/PDF
  aebd091c... / b1a1018d... intacta y NO actualizada a esta restauración.
  Word final SHA-256: 5d3d8161e8d759e3e1ddd31b7e7af7cf3808e2fe76304ccfff79ab608d03d0b9.
  Se recuperó el fuente de `52782a7` y se reconcilió exactamente con Word `e6671c0`
  antes de corregirlo. Fuente/conversor/plantilla/insumos en
  `tmp/restauracion_main_2026-11-10/fuente/`, pruebas e informes en `salida/`.
  No se editó Word a mano ni se modificó el checkout del original. Los generadores
  publicados no contienen aún esta restauración; no regenerar desde ellos sin integrar
  primero esta revisión. El paquete anterior `tmp/correo_agua_ijcopi_2026-11-09/`
  conserva adjuntos previos; para enviar usar los archivos actuales en `paper/ijcopi/`.

- **PostgreSQL pendiente RESUELTO con ejecución real:** helper portable original sin
  modificar sobre el contenedor existente `data_warehouse_cdmx`, volumen `warehouse_pgdata`,
  PostgreSQL 16.15, base `data_warehouse`, 45 tablas. Se inició el contenedor existente;
  no ETL, reconstrucción ni escritura en el volumen. Transacción REPEATABLE READ READ ONLY,
  `transaction_read_only=on` y ROLLBACK. Proceso terminó 0: `status=pass`, `passed=true`,
  `read_only=true`, `live_database_verified=true`. 89 municipios: Pearson
  0.3221003188410962; Spearman (también rangos promedio) 0.9335716717739189. Enero–junio
  2019: 39,685 reportes, todos potables y de falta de agua, cero fugas. 15/15 consultas
  SQL/JSON coinciden en filas y hashes. `resultado_postgresql.json` conservado en raíz,
  SHA-256 fa51edd8552fd7c4da1b370a220e9d79f5a08947dabf3c5694c73a188568e1a6.
  Los SQL y JSON de main también coinciden con ese manifiesto; evidencia
  `tmp/restauracion_main_2026-11-10/salida/verificacion_manifest_main.json`.

- **Estado Git previo conservado:** ya había 5,923 adiciones staged (5,922 bajo tmp/
  y resultado_postgresql.json). No se agregaron, retiraron ni descartaron aquí. Incluyen
  evidencias privadas: revisar cuidadosamente antes de cualquier commit autorizado.
  No ejecutar add -A ni publicar tmp/. El commit autorizado usa --only con tres
  rutas tracked exactas: Word v3, paper/ijcopi/README.md y esta memoria. Auditar el
  commit resultante y confirmar que esas 5,923 entradas privadas quedan fuera.
  El PDF y el resultado PostgreSQL siguen locales y conservados.

Los puntos siguientes son antecedentes; las pendientes PostgreSQL y autorizaciones
antiguas no sustituyen el estado vigente anterior.

- Nuevo cierre de `main` expresamente autorizado por Gabriel: un commit y push de lo
  pendiente, con su identidad humana, sin firmas, coautorías ni créditos automáticos.
  Incluye conexiones entre colonias y navegación externa, ajustes de interfaz/caché,
  pruebas de regresión y Word identificado revisado de 15 páginas/9,056 palabras.
  Verificador Springer original intacto ejecutado para este push: 25 enlaces, un fallo
  exclusivamente ADIP HTTP 403; AZCATL HTTP 200. Se aplica la excepción específica
  autorizada sólo para este cierre. Evidencia local: tmp/cierre_main_2026-11-09/.
  Publicación y QA pública aún por confirmar; no dar por actualizado Pages sólo por
  crear el commit o completar el push. La rama anónima y los originales se conservan.

- Entrega de revisión anónima preparada por instrucción posterior de Gabriel, con las
  maestras identificadas intactas. Archivos en tmp/entrega_anonima_2026-11-09/paper/:
  water_data_warehouse_review.docx, 15 páginas/8,954 palabras, SHA-256
  aebd091ca2609b841f010f1d5c1fe2d78c6206a9987b0a1aaae6a43ffc192580;
  PDF b1a1018d94394b65af5a450371f9a2345b008f1255683d96ba49290df6e2ae88.
  Copia fuente independiente en tmp/entrega_anonima_2026-11-09/fuente_repo_revision/,
  con prompt/mensaje, CONTINUAR_EN_OTRA_PC.txt, MENSAJE_INICIO_OTRA_PC.txt y
  verificacion_postgresql/. No confundir esta copia con main ni con los sitios históricos.

- Gabriel aclaró que el volumen ampliado está en otra PC y pidió dejar la última
  verificación para ejecutarla allí. Siguen PENDIENTES las tres comprobaciones reales:
  correlaciones de 89 municipios, 39,685 reportes y 15 consultas SQL contra exportaciones.
  El helper portable sólo lectura está probado (formato canónico, frontera Decimal/float
  2^53, equivalencia Docker/DSN con consulta de control y manejo de error), pero NO está
  aprobado contra el almacén ampliado real. Exige rangos promedio para Spearman y
  compara hashes SQL/JSON. No sustituir esas lecturas por antecedentes ni por exports.
  Diagnóstico aquí: Docker responde, pero el volumen existente sólo tenía la base original;
  reconstrucción ampliada detenida por la instrucción de Gabriel, sin ejecutar ETL ampliado.
  Contenedores temporales propios apagados; datos/caché/volúmenes conservados.

- Cierre nuevo autorizado y CONSUMIDO: un commit/push en la rama independiente
  codex/revision-anonima, con prompt/mensaje y excepción ADIP sólo si era el único fallo.
  Commit raíz 6f723ea05fb9ca1a419dfb53399507b1f49452c1, Gabriel autor/committer humano,
  sin firma ni trailers; push y remoto confirmados por la sesión principal.
  Primer gate Springer intacto: 25 enlaces/2 fallos (ADIP y AZCATL), se detuvo.
  Repetición previa al push: 25/1 sólo ADIP 403; AZCATL 200; excepción específica aplicada.
  main permanece a0730ed8f3532c173eace3c4c1c896372cd2f964; original/main e históricos
  intactos. No hay autorización de otro commit/amend/push ni envío editorial.

- Espejo Anonymous ACTIVO, confirmado en la interfaz con «Your review link is ready»:
  https://anonymous.4open.science/r/water-data-warehouse-review-9D27/
  Snapshot del 9 de noviembre de 2026, acceso gratuito hasta el 9 de mayo de 2027,
  sin actualización automática y sin publicar mediante el Pages original.
  Verificados acceso al README, ruta del grafo, licencia con cinco nombres personales
  ocultos y ZIP público descargable. Auditoría del ZIP real APROBADA: 221 archivos,
  cero identificadores directos o correos fuera de vendor/fuentes, sin privados ni
  historial. Sólo cuatro máscaras legales previstas; condiciones MIT intactas.
  Los 15 JSON, manifiestos, RDF y vocabularios son idénticos byte por byte a los finales
  verificados; Word y PDF coinciden exactamente. ZIP descargado: 74,584,603 bytes,
  SHA-256 06d524d5406e6bd00ee4f82561b82b5f20e88b6b47efae382371a8b09a8a7923.
  Evidencia: tmp/entrega_anonima_2026-11-09/anonymous_ui_zip_audit.json.
  Captura local: tmp/entrega_anonima_2026-11-09/anonymous_publicado.jpg.
  Esta actualización de continuidad queda local, sin acciones Git ni envío editorial.

- Informe de Claude contrastado independientemente el 9 nov, sólo lectura de productos:
  Word/PDF coinciden con sus hashes 7c62eefd.../ae644830..., Word idéntico en ambos repos.
  Medición nueva Microsoft Word: 15 páginas/9,056 palabras; resumen 146 sin etiqueta
  (147 incluye «Abstract.»), mismo texto que antes. Quince páginas a 150 dpi inspeccionadas,
  sin recortes/solapes, figuras en inglés. Tablas/datos, autoría, correo final de Roberto,
  correspondencia y encabezados/pies intactos; recortes de tres frases sólo retóricos.
  Cero tokens nuevos sin amarillo frente a entrada; doce avisos frente a v0 explicados.
  Repetidas aquí 23 pruebas pytest (pasan) y prueba Node del grafo (pasa). rdflib 7.2.1
  sólo instalado en deps ignoradas de auditoría, sin cambiar entorno global.
  Pendiente del corpus RESUELTO: calculate() de ambos generadores reproduce sus evidencias;
  sólo difieren hashes de bytes CRLF/LF de dos CSV y fecha local válida de exportación.
  Contenido canónico, cifras, exports verificados y PNG/SVG coinciden; no igualar hashes
  de bytes ni modificar CSV. Referencias Hill/Purves/Vetrò/Carrera contrastadas con
  fuentes primarias, coherentes. Declaración IA actual preservada; conviene explicitar
  apoyo real al análisis/verificación (política exige declarar usos, no una frase mágica).
  NO repetidas aquí las tres comprobaciones PostgreSQL ni toda la auditoría estadística;
  no tratarlas como fallos detectados. Evidencia ignorada en tmp/auditoria_claude_2026-11-09/
  y tmp/auditoria_claude_word_2026-11-09/. Sin corregir productos, anonimizar, Git o envío.

- Revisión Fable 5.2 del 9 nov COMPLETADA, todo local, sin commit/push/envío.
  Recalculado sin fallos: tablas 1-6, per cápita, ranking real, índice fiscal, pareada y
  sensibilidad (20 semillas); 23 pruebas pytest; 15 JSON contra manifiesto; RDF 91,230 triples,
  15,510 pares sfTouches, 163 fronteras, 27 pares/21 municipios, Tepalcates 7 vecinas (2 en
  Iztacalco); verificador del grafo publicado y prueba Node pasan. NO recalculado por falta de
  PostgreSQL (Docker Desktop no arranca): Spearman 0.934/Pearson 0.322 de 89 municipios,
  39,685 reportes y la comparación viva de las 15 consultas; quedan como antecedente.
  Web local Edge integrado, 1280 y 375 px, ES/EN: 0 errores de consola, recursos 200,
  recorrido entre alcaldías, distancia simétrica/cero, idioma conserva selección, COUNT 91,230.
  Corregido en web: "1 fila/1 row" y claves de caché unificadas (nav.js, zm.css, grafo-zm.js r4).
  Corregido en paper (fuente/conversor): "static" en amarillo; referencia cruzada rota de 5.3
  (la advertencia per cápita estaba en la Discusión de v0, ya reescrita) sustituida por cita;
  ecuación (1) ahora citada; referencias completadas tras Crossref (Hill, Purves, Vetrò, Berro,
  Soares, fascículos); APA 7: nombre completo de autores corporativos en la lista y sigla
  definida en la primera cita, "Article" en números de artículo; figura 2 rotula log-A_g como
  "(log scale)" en vez de "(proposed)" (script y PNG en ambos repos). Para volver a 15 páginas
  se quitaron tres frases retóricas de 5.7. Confirmado con texto completo: Ramos-Bueno 2021.
  Word 15 páginas/9,056 palabras (+61.28 % sobre 5,615), resumen 147, seis keywords, quince
  páginas inspeccionadas, amarillo: 12 tokens de renumeración/título. Word idéntico en ambos:
  7c62eefda1bb7e27a37f77cff79a76e6f98e39174741f5f1ae3f9ae63625a89e; PDF sólo original
  ae644830f667d0989dace86cdd059f1bc407e22bea8bc8fa94ded5395aa8e69c.
  Pendientes humanos: aval de coautores, alcance de la declaración de IA frente a "analytical
  support" de IJCOPI, metadatos de la revista, y la fase de anonimización.
  Respaldo de entrada y evidencia: tmp/revision_fable_2026-11-09/.

- Preparados a petición de Gabriel prompt y mensaje de inicio locales para Fable 5.2:
  contexto/PROMPT_FABLE_5_2_REVISION_AGUA_2026-11-09.txt y
  contexto/MENSAJE_FABLE_5_2_REVISION_AGUA_2026-11-09.txt (ignorados, sin enviar).
  Orden actualizado por instrucción posterior: primero revisión/correcciones del paper
  identificado y sistema; después de atenderlas, Gabriel preparará versión anónima
  del artículo y del material del repositorio. Fable no debe generar aún copia ciega,
  portada separada ni anonimizar/duplicar/renombrar/privatizar repositorios.
  Encarga evaluación/correcciones locales del paper y sistema, con pruebas y resguardo
  del árbol sin publicar. No modifica el manuscrito ni autoriza Git/envío por sí mismo.
  Anonimato verificado en fuentes oficiales: convocatoria ICOKG 2026,
  https://ontologica.cs.buap.mx/icokg2026/cfp.html, especifica doble ciego también para
  el número especial invitado; IJCOPI confirma doble ciego en submissions y
  https://ijcopi.org/ojs/editorial-policies. Ser invitado no exime. La guía también
  pide portada identificada; falta confirmar con comité reparto de archivos y cómo
  cuenta la portada en 15 páginas. Se mantiene la maestra intacta; copia ciega y material
  anónimo quedan para la fase posterior, sin alterar citas/enlaces públicos ni prometer
  anonimato completo si quedan identificadores. No se generó copia ciega ni se contactó al comité.

- Revisión local COMPLETADA del 9 nov, posterior al cierre publicado. Al seleccionar una
  colonia se resaltan sus vecinas y conexiones RDF geo:sfTouches, con lista navegable
  incluso hacia otra alcaldía/municipio. Tepalcates: siete vecinas, dos en Iztacalco.
  Node y Edge pasan: clic real, navegación externa, ES/EN, distancia preservada,
  selecciones rápidas, vacío, móvil 375 px y arranque frío sin Comunica (~1.4 s).
  Datos/RDF intactos. Figura reproducible: ?mun=09007&col=90070211&vista=figura&lang=en.
  El correo de Roberto cierra el bloque de contactos; autoría/correspondencia intactas.
  Dos capturas nuevas para figura 3 desde la interfaz real, íntegramente en inglés,
  salvo topónimos propios: 1600×1216, OSM con atribución, leyendas 26 CSS px, sin
  tapar nodos/conexiones. Figuras 1 y 2 ya estaban en inglés y se conservaron.
  Capturador reproducible actualizado en original/paper/ijcopi/capturar_mapa.ps1 y .cjs;
  servir el sitio actualizado IJCOPI y pasar -Base. Comprueba datos, teselas completas,
  inglés, leyendas y dimensiones antes de sustituir los PNG. No usa plazos virtuales.
  Word/PDF regenerados desde fuente/conversor: 15 páginas/9,012 palabras (+60.498664 %
  sobre v0 de 5,615), resumen 146/seis keywords intactos. Quince PNG inspeccionados;
  cero tokens nuevos sin amarillo. Tablas de datos, figuras 1/2, IA académica, plantilla,
  encabezados/pies y v0 preservados. Word idéntico en ambos repos:
  83f8ae3d45ecf2d8b845bf655878cce3209d4cc7c4bfecb9801082e1ad1d3a59;
  PDF sólo original a237573be4cb0909a5ee1f9535ae2489d872d5d45eb5c1a7b596aeea0780992e.
  Evidencia ignorada: tmp/vecindad_capturas_2026-11-09/,
  tmp/capturas_ingles_2026-11-09/final-legible/ y tmp/conexiones_colonia_2026-11-09/.
  Sin commit/amend/push/publicación de esta revisión: no hay autorización nueva.
  Pages sigue en a0730ed hasta un cierre autorizado con su verificador previo.

- Cierre COMPLETADO: original ijcopi-zmvm 52782a7eca7f12729751f8782d26f0ae9a4c85bc;
  IJCOPI/main a0730ed8f3532c173eace3c4c1c896372cd2f964, remotos confirmados.
  Autor/committer Gabriel Hurtado, sin firmas/trailers/créditos automáticos. Antes de
  cada push se repitió el verificador intacto: original 25/1 sólo AZCATL (excepción
  expresa usada en ese push), IJCOPI 25/0, ADIP/AZCATL 200. No se repite autorización.
  Pages 42726420511 success; HTML/JS/worker publicados coinciden por SHA-256.
  QA pública Edge con perfil nuevo: controles listos en 2,065 ms, estado de carga vacío,
  333 colonias/795 colindancias Iztapalapa, distancia entre colonias de municipios
  distintos y COUNT completo 91,230 correctos; 0 errores JS/recursos propios fallidos.
  También pasó carrera del catálogo retrasado sin sobrescribir consulta en ejecución.
  Word/diagrama y generador publicados en ambos repos, sin PDF extra en IJCOPI.
  Históricos y datos científicos intactos. Evidencia ignorada:
  `tmp/grafo_2026-11-09/qa-publica-carga.json` y `qa-carga-worker.json`,
  `tmp/cierre_diagrama_grafo_2026-11-09/`. Este registro posterior queda local,
  sin otro commit/amend/push. Los permisos de este cierre se consumieron.

- Cierre autorizado el 9 nov por Gabriel: un commit/push por repositorio para diagrama,
  manuscrito y corrección de carga del grafo, identidad humana sin firmas ni créditos
  automáticos. Sólo se admite AZCATL si es el único fallo del verificador de ese push.
  Original ya publicado: 52782a7eca7f12729751f8782d26f0ae9a4c85bc en ijcopi-zmvm,
  autor/committer Gabriel Hurtado, sin firma/trailers. Gate previo: 25 enlaces/1 fallo,
  exclusivamente DOI AZCATL, excepción autorizada aplicada sólo a ese push.
  SVG/PNG, evidencia y generador también incluidos/recalculados en IJCOPI; Word idéntico
  a la QA de 15 páginas/9,014 palabras. Nueva .gitattributes del paper original conserva
  bytes SVG/JSON para sus hashes entre clones. No se alteraron v0, datos ni históricos.
- Corrección web para el bloqueo «Parsing 2.8 MB»: lectura/indexación/verificación del RDF
  en worker; recorridos por índices del mismo grafo, sin unión SPARQL masiva al arrancar.
  SPARQL completo se prepara sólo al ejecutar; geometrías de colonia diferidas y dibujo
  por lotes. Estados separados, errores/reintento y caché versionada. Regresión verifica
  RDF/91,230 triples, carga sin Comunica, dos recorridos y rechazo de literal alterado.
  QA fría local Edge: escritorio 996 ms, móvil 899 ms; CPU×4/red 1.6 Mbit/s 36.6 s,
  interfaz responde. Colonias/distancia, dos consultas SPARQL, fallos y recuperación pasan.
  Evidencias ignoradas en `tmp/grafo_2026-11-09/qa-carga-worker.json`; cierre IJCOPI pendiente.

- Diagrama de corpus incorporado por petición de Gabriel: figura 1 en inglés, reemplaza
  las dos capturas antiguas (assets/URLs conservados), tres figuras totales. Generador,
  SVG/PNG y evidencia en `C:/dev/Data_Warehouse_static/paper/ijcopi/`:
  `generar_diagrama_corpus.py`, `figura_corpus_fuentes.svg/.png`, `evidencia_corpus_fuentes.json`.
  Recalculados CSV: SACMEX 71,102→216 excluidos→70,886 hechos; Open-Meteo 4,344 horas→181 días.
  Los dos CSV se retienen fuera de los 62 archivos adicionales del manifiesto:
  INEGI 21, CONAGUA/SMN 25, CONAPO 6, SACMEX/ADIP 2, SHCP 1 y académicos 7
  (MexHiResClimDB 4, InSAR 1, Huerta 1, Hidro-MX 1). Exportación SQL validada por SHA-256:
  45 tablas/2,794,184 filas físicas, incluidas 97 de control; no son observaciones independientes
  ni se limitan todas a la ZM. No hubo nueva consulta PostgreSQL ni reconstrucción del ETL.
  Fuente y v3 regeneradas: 15 páginas/9,014 palabras, resumen 146, seis keywords (+60.534283 %
  sobre v0 de 5,615); inspeccionadas todas las páginas. Cero tokens nuevos sin amarillo,
  figura con borde amarillo; título, autoría, datos tabulados, otras figuras y declaración IA
  preservados. Word idéntico en ambos repos:
  5051dbebb10345ea1ba65e71c6a84676121bcc7e6115bae5152c6ecb833cb018;
  PDF original 4d950cb6a0d4b570946f3061e6f29dc23c56732e740982be6f64d5042d45d5e0.
  Cambios del diagrama siguen locales, sin commit/amend/push; autorización anterior consumida.

- Publicación IJCOPI confirmada el 9 nov: origin/main ya contenía 03daef8b2a0c268d10e617d9f47ecae941ccd467
  al revisar; no se repitió push ni se hizo commit/amend. Identidad humana de Gabriel,
  sin firma ni trailers. Gabriel autorizó excepción exclusiva AZCATL, pero la ejecución
  actual intacta terminó 25 enlaces/0 fallos (ADIP y AZCATL 200); no fue necesario usarla.
  Actions 42721196699 terminó success, tres archivos grafo HTML/JS/CSS publicados coinciden
  por SHA-256. QA en Edge de la URL pública: expansión a colonias y distancia entre colonias
  de distintos municipios correctas, 0 errores JS/recursos propios fallidos. Cierre completado.
  Evidencia ignorada: `tmp/grafo_2026-11-09/qa-publica.json` y `springer_excepcion_azcatl.txt`.
- Pedido posterior: diagrama para el paper que compare procedencia y cantidades del
  corpus original y ampliado. Recuentos originales desde CSV y ampliados desde exportaciones
  JSON con hashes, sin PostgreSQL en vivo. Se sustituirá la figura antigua de capturas para
  respetar 15 páginas; se conservan assets/enlaces originales. No hay autorización de otro
  commit/push por este diagrama. Evidencia ignorada `tmp/diagrama_corpus_2026-11-09/`.

- Reanudación solicitada el 9 nov: Gabriel pidió repetir verificador y hacer solo
  el push pendiente si daba cero fallos. Nueva ejecución intacta: 25 enlaces/1 fallo,
  nuevamente acceso a DOI AZCATL 10.24275/AZC2026E1004; ADIP 200. No hubo push,
  commit, amend ni despliegue; 03daef8 permanece local. Evidencia ignorada:
  `tmp/grafo_2026-11-09/springer_reanudacion_ijcopi.txt`.
  Confirmada además la cita solicitada 10.1007/978-3-032-42081-7_6: sección 2.3 y
  referencias de ambos Word v3, Daowz Laguna et al. (2027). Ficha oficial Springer
  y resumen contrastados; no se editó el manuscrito ni se afirmó leer el texto completo.

- Cierre detenido por orden de Gabriel: original 7375a44025c029ce0d7b77e5100962e0d0c026cd
  publicado en ijcopi-zmvm tras verificador 25/0. IJCOPI tiene commit local
  03daef8b2a0c268d10e617d9f47ecae941ccd467 (Gabriel autor/committer, sin firma ni
  trailers). Su verificador inmediatamente previo al push terminó 25 enlaces/1 fallo:
  acceso al DOI https://doi.org/10.24275/AZC2026E1004, sin código HTTP en la salida.
  ADIP respondió 200. NO se ejecutó push de IJCOPI ni reintento del verificador;
  el sistema nuevo está implementado en el commit local pero Pages sigue sin esos cambios.
  Permisos de ambos commits y push del original consumidos; push IJCOPI sin ejecutar,
  detenido por el fallo. Este registro de cierre queda local, sin otro commit/amend.
  Evidencia: `tmp/grafo_2026-11-09/springer_push_ijcopi.txt`.

- Original publicado y remoto confirmado en ijcopi-zmvm:
  7375a44025c029ce0d7b77e5100962e0d0c026cd, autor/committer Gabriel Hurtado,
  sin firma ni trailers. Antes de ese push, nueva ejecución Springer: 25 enlaces,
  0 fallos. Permiso de commit/push del original consumido. Falta cerrar IJCOPI/main
  con su permiso ya otorgado y otra ejecución del verificador; detenerse si falla.

- Cierre autorizado por Gabriel el 9 nov: un commit y push por repositorio, con su
  identidad humana, sin firmas ni créditos automáticos. Orden expresa: detenerse si
  el verificador Springer presenta fallos, sin excepciones implícitas. Primera ejecución
  para este cierre: 25 enlaces, 0 fallos; verificador intacto, ADIP y AZCATL HTTP 200.
  Se volverá a ejecutar antes de cada push. Implementación y QA del grafo confirmados;
  población CONAPO existente visible, nuevas fuentes demográficas siguen como futuro.
  No incluye envío editorial, correo, release, DOI ni cambios de sitios históricos.

- Petición vigente del 9 nov: Gabriel autorizó mover al Dr. Roberto Eswart Zagal
  Flores al último lugar, ampliar navegación/distancias del grafo y trabajo futuro.
  Fuente actual recuperado en un clon separado `C:/dev/Data_Warehouse_static`, rama
  `ijcopi-zmvm`, HEAD 967b9f9b; el clon viejo de Descargas sigue intacto en main.
  Manuscrito regenerado desde .tex/conversor, Word idéntico en ambos repos y PDF
  en el original: 15 páginas/9,043 palabras, v0 recalculada 5,615 (+61.0507569 %).
  Se conserva Gabriel primero/correspondencia, adscripción, contactos y ORCID.
  Secciones 5.8 y 7.3: expansión a colonias, distancia aproximada entre centroides,
  ampliación de población/densidad/uso del suelo/acceso al agua para contextualizar
  facturación con territorios/años/cobertura compatibles; sin causalidad ni consumo medido.
  Quince páginas inspeccionadas, solo tres párrafos modificados; cuerpo modificado
  todo amarillo, título/tablas/imágenes/declaración IA/v0 intactos.
  Word SHA-256 86f7ea1fbc627ad0ab0ea4036f93b9399b55419abce963eb8d028b271081fac9;
  PDF bb59ccc1d85c352cec73f89e5c94430f5bc123f82ea24143a7fa86a8707bda03.
  Web verificada en Edge, ES/EN, escritorio y 375 px: expansión a todas sus colonias con geometría,
  colindancias, regreso a la vista global y distancia entre nodos de distintos municipios.
  Selección preservada al traducir, distancia simétrica y cero en el mismo nodo,
  sin desbordamiento móvil ni errores JS; vista figura conservada. Centroides del
  anillo exterior mayor y Haversine, con límites explícitos. Datos/RDF sin cambios.
  La autorización inicial solo cubría edición; el cierre Git posterior se registra arriba.
  Evidencia y respaldos locales ignorados: `tmp/autor_grafo_2026-11-09/`.

Los registros siguientes son antecedentes; no autorizan acciones Git adicionales.

- Commit del original de esta revisión: 967b9f9b05017a870495cdea17578eb8bd1d672c en ijcopi-zmvm,
  autor/committer Gabriel Hurtado, sin firma ni trailers. Push sujeto al verificador.
- Revisión posterior al informe independiente del 9 nov: corregidos los hallazgos
  contrastados con fuentes y datos; descartadas cifras y autorías ajenas a esta versión.
  Word/PDF regenerados desde fuente: 15 páginas, 9,029 palabras, v0 5,615 (+60.8014 %),
  resumen 144 y seis keywords. Las quince páginas se inspeccionaron a 150 dpi; cero
  palabras nuevas sin amarillo frente al respaldo de 9,116 palabras. Título, autores,
  declaración académica de IA, figuras, plantilla y v0 preservados.
  Word SHA-256 d38e1e48c1741dcf80f3f58f8d62828bfed7089a2a581d4b345f6eeb93ff771e;
  PDF SHA-256 416f39d6b1ab0240d34f93d5fc6543c677d1ebdff405c40180a7ea570ae91c59.
- Datos: vista común de colonias expone población CONAPO, población asignada SACMEX,
  volumen y cobertura. Tasas etiquetadas como proxies, sin dividir por población de
  otro soporte; se omiten denominadores parciales. Desempate espacial determinista
  por menor clave numérica: reconciliados 22 enlaces sin resembrar ni tocar hechos.
  Reconstrucción cruda y JSON coinciden en diez campos; población unidad por unidad
  coincide con PostgreSQL. Quince consultas verificadas, 0 fallos.
- RDF: 91,230 triples; clase simétrica OWL correcta, población/cobertura proxy
  explícitas, huella decimal estable tras serializar y validación SQL/RDF sin fallos.
  Consulta 02: 27 pares de 21 municipios; interfaz muestra ambas cantidades ES/EN.
  Añadidos créditos bibliográficos de clima, vulnerabilidad e Hidro-MX con metadatos
  primarios; corregida atribución de Huerta en el informe ya versionado.
- Web: fichas muestran ambos soportes y cobertura, notas ES/EN, fuentes metropolitanas
  en el pie y vocabulario descargable; datos se revalidan para evitar caché antigua.
  QA real de mapa/grafo en escritorio y 375 px, catálogo y conteo SPARQL correctos.
- Gabriel autorizó un commit y push por repositorio para estas correcciones, con
  identidad Git humana y sin firmas/trailers/atribuciones de asistentes. No autoriza
  release, DOI, correo ni envío editorial. Cada push exige ejecutar el verificador
  original intacto: cero fallos o nueva excepción expresa de esa ejecución.

- Publicación del cierre confirmada: original 22a8ac1d3e5a436a8ae4617f1fa15fef45ed7157
  en ijcopi-zmvm; distribución 2126f8d155bf6ee209425df426c3539eabe64a3c en main.
  Ambos con identidad humana, sin firmas/trailers de asistentes. Pages 42585668947
  terminó success y seis archivos web coincidieron por SHA-256 con el despliegue.
  Gabriel autorizó para esos dos pushes ADIP 403 y dos 504 de GitHub; en las ejecuciones
  que permitieron publicar solo persistió ADIP 403. Permisos consumidos; históricos intactos.
- Nueva petición: preparados localmente mensaje y prompt para que Gemini 4 Argon, con
  Deep Research, revise el paper de agua y la web en esas versiones exactas. Archivos
  contexto/MENSAJE_GEMINI_DEEP_RESEARCH_AGUA_2026-11-09.txt y
  contexto/PROMPT_GEMINI_DEEP_RESEARCH_AGUA_2026-11-09.txt, ignorados y sin publicar.
  Exigen revisión independiente, fuentes primarias y distinguir lectura/observación/
  ejecución de lo no verificado. No se enviaron a Gemini ni se autorizan nuevas ediciones
  o acciones Git por preparar estos textos. Solo continuidad local, sin nuevo commit/push.
- Cierre corregido del 9 nov, autorizado por Gabriel con un commit y push por repositorio
  (original ijcopi-zmvm y distribución main), identidad humana y sin atribuciones/firmas de
  asistentes. No incluye release/DOI, correo o envío editorial. Cada push sigue condicionado
  al verificador original sin modificar: cero fallos o excepción expresa de esa ejecución.
- Fuente, generador, Word/PDF y scripts del original guardados en el commit humano
  22a8ac1d3e5a436a8ae4617f1fa15fef45ed7157, rama ijcopi-zmvm; sin firma ni trailers.
  Verificar remoto para saber si el push ya se completó; no repetir la autorización.
- Word/PDF regenerados: 15 páginas, 9,116 palabras, v0 5,615 (+62.350846 %), resumen 144
  y seis keywords. Word SHA-256 d33e5f09cc6dc1d64546f8a5ff8b01de579085d1ed9e7d1dff20cda338ebd85f.
  Copias idénticas; título, autores, IA académica, imágenes, plantilla y v0 intactos. Quince
  páginas inspeccionadas; cero tokens nuevos sin amarillo contra el respaldo de 9,431 palabras.
  Contador histórico v0: 83 falsos positivos. Corregidos grano fiscal con cifras/script,
  definición AP, tres listas implementadas, Discusión y cita fiscal de 2019 (Consejería HTTP 200).
- Web: Todas conservada al traducir, límites coherentes de listas/CSV, alcance de A_g e
  incertidumbre de captura/cuota fija precisados ES/EN, KPI móviles en dos columnas. QA real
  a 375 px sin desbordamiento; catálogo/grafo cargan. Doce conteos intactos, seis pruebas
  de estadística/grano pasan en ambos repos, prueba exacta sin SciPy y deduplicación correcta.
  CSV base, SQL, TTL, almacenes e históricos intactos. Evidencias en tmp/correccion_2026-11-09/.
  Consultar Git local/remoto y Pages para confirmar ejecución del cierre; los permisos usados
  no autorizan nuevos commits, pushes o publicaciones en otra sesión.
- Auditoría independiente del informe del 8–9 nov, solo lectura de productos: Word
  medido de nuevo con Word, 15 páginas/9,431 palabras; v0 5,615 (+67.960819 %), resumen
  144 y seis keywords. PDF de 15 páginas inspeccionado sin recortes/solapes. Word v3
  original/copia idénticos (SHA-256 5d1abfc22e396d5d7bf6a823afd90205158dffc021698ba70f140d064aa4963b);
  v0, título, autores, declaración de IA e imágenes preservados. El verificador histórico
  marca 79 contra v0 y 53 contra respaldo; no significa añadidos reales sin amarillo:
  la revisión de párrafos/runs confirmó falsos positivos por alineación y puntuación.
  Recalculados 10 escenarios distintos, victorias IF 19/20 y AP 20/20, 89 municipios y
  1,508 colonias (semántica SQL de SUM con nulos), y los 12 conteos del módulo atípicos.
- Hallazgos pendientes de corregir: 5.2 atribuye índice fiscal a colonias aunque el dato
  es por manzana/registro y 1,200 de 1,553 colonias mezclan categorías; trabajo futuro
  todavía incluye tres listas que la nueva web ya implementa. La web generaliza que A_g
  solo puede detectar excesos (el resultado corresponde al top global observado) y
  descarta error de captura en Tláhuac/Milpa Alta sin prueba causal. Bug reproducido en
  navegador: abrir atipicos con ?alcaldia=IZTAPALAPA, elegir Todas y cambiar idioma restaura
  Iztapalapa. El límite por lista tampoco afecta ceros. comparacion_pareada.py anuncia
  Wilcoxon exacto pero no fija método/versión; p cambia con SciPy. Ningún producto corregido
  en esta auditoría, sin commit/push; solo evidencia tmp y continuidad local.
- Referencia primaria localizada para el pendiente fiscal: Gaceta Oficial CDMX núm. 62,
  1 abril 2019, pp. 39–40, resolución de tandeo vinculada al art. 172 y transitorio del
  decreto 31 dic 2018. Texto del PDF oficial SACMEX verificado, no incorporado al paper:
  https://www.sacmex.cdmx.gob.mx/storage/app/media/tandeo/Tandeo_2019_GOCDMX.pdf
  Acredita régimen de cuota fija, no cómo se llenó cada campo del dataset ni la causa
  de los volúmenes extremos. Evidencias locales en tmp/auditoria_2026-11-09/ y
  tmp/auditoria_paper_2026-11-09/. No se reconstruyó la base ni se repitió la simulación completa.
- Revisión del 8–9 nov autorizada por Gabriel (ediciones sí; commit y push NUNCA sin pedirlo).
  Paper: corregidos en dw_agua_ijcopi.tex y latex_a_ijcopi.py del original errores de hoja de ruta,
  concordancia, unidades/formato de tabla 3, título del recurso (1° Semestre), correlación climática
  inexistente, «consumo» por «volumen facturado», 10 escenarios de sensibilidad (no 12), precisiones
  de 5.7 y pie de Fig. 3; comparación pareada A_g/Isolation Forest (19 de 20 semillas; PR-AUC 20 de 20)
  con evaluacion-ml/comparacion_pareada.py y su evidencia (copiados en ambos repos). Referencias APA:
  n.d. primero y «Mexico City». v3 regenerada: 15 páginas, 9,431 palabras (+67.96 %), resumen 144;
  0 palabras nuevas sin amarillo frente a la v3 previa. Word y PDF instalados en el original y Word
  sincronizado aquí (SHA-256 5d1abfc2…). Respaldo previo en tmp/revision_2026-11-08/antes/.
- Web local: mapa con ficha traducida (banda 10–400 L), nota para Tláhuac/Milpa Alta, municipio en
  la ficha de colonia, nota de población (CONAPO 2019 frente a Censo 2020 de la tabla 4), conteos de
  sequía dinámicos, región de estado limpia y reintento; catálogo con carga diferida (solo manifiesto
  al inicio); grafo con estado limpio y reintento; página nueva ijcopi/atipicos.html con las tres
  listas de la sección 5.6, cuyos 12 conteos coinciden con evidencia_ranking_real.txt. Barra con
  «Atípicos». Probado en navegador: escritorio, 375 px, ES/EN, sin errores de consola. Sin commit/push.
- Gabriel autorizó expresamente crear el remoto público de sismos y conectarlo a la
  carpeta local. Creado y verificado https://github.com/gabrielhuav/Seismic_Data_Geosciences,
  origin HTTPS correcto en Seismic_Data_Geosciences, 0 refs remotas y 0 commits locales.
  Identidad Git humana confirmada; continuidad autónoma actualizada en el nuevo proyecto.
  Esta autorización de creación/conexión ya se consumió; no autoriza commit ni push.
  El repo GitHub está vacío y los archivos siguen locales. Sin publicación de contenido.
- Gabriel autorizó crear la carpeta y repo local de sismos. Creado
  C:\Users\gabri\Documents\GitHub Desktop\Seismic_Data_Geosciences, Git inicializado
  en main sin commits ni remoto. Identidad local Gabriel Hurtado
  <gabrielhurtadoaviles@gmail.com>, firmas de commit/tag desactivadas. Incluye AGENTS.md,
  README, .gitignore, .gitattributes y los tres Markdown de continuidad autónoma; prompt
  TXT como ayuda local ignorada. No hubo commit, push, publicación ni cambios a históricos.
- Gabriel acepta Computers & Geosciences como destino del nuevo trabajo y solicita
  prompt completo y mensaje de inicio. Preparados localmente
  contexto/PROMPT_INICIO_SISMOS_COMPUTERS_GEOSCIENCES.txt y
  contexto/MENSAJE_INICIO_SISMOS_COMPUTERS_GEOSCIENCES.txt. El anterior prompt para
  Geotechnics queda marcado como antecedente. Los TXT están ignorados, sin publicar.
  Verificada guía específica: plantillas editoriales Word/LaTeX cageo, una columna,
  doble espacio, líneas, resumen 300 palabras, 1–6 keywords, highlights obligatorios,
  referencias autor–fecha sin abreviar nombres de revistas y código público al enviar.
  Se mantiene costo personal cero por suscripción y autoría Villa Vargas/Gabriel.
  Solo se preparó el relevo: no se creó el proyecto ni hubo commit/push/publicación.
- Condición editorial prioritaria de Gabriel: publicar sismos sin gasto personal.
  Verificado el 5 nov en navegador, páginas oficiales ScienceDirect: Applied Computing
  and Geosciences es OA con APC USD 2,230 sin impuestos; no asumir exención ni convenio
  institucional confirmado. Computers & Geosciences sí ofrece publicación por suscripción
  sin cargo de publicación al autor, separada de la opción OA de pago. Candidata por
  evaluar, no destino decidido; requiere aporte computacional y geocientífico novedoso.
- Gabriel cuestiona el encaje de sismos con Computers and Geotechnics. El destino
  editorial queda por decidir: el enfoque actual de catálogo/ETL/visualización no
  acredita por sí solo una contribución geotécnica. Reconfirmado el alcance oficial
  en Elsevier; no se cambia la investigación para forzar el encaje ni se crea el repo.
  El prompt preparado para esa revista sigue siendo un borrador local pendiente.
- Nueva petición del 5 nov: preparado localmente contexto/PROMPT_INICIO_SISMOS_CG.txt
  para un artículo independiente en Computers and Geotechnics. Autores indicados:
  José Manuel Villa Vargas primero; Gabriel Hurtado Avilés segundo y de correspondencia.
  Verificadas guía oficial y plantilla CAS v2.4; Word editable a una columna también
  admitido. El prompt exige evaluar primero un aporte computacional geotécnico y auditar
  los datos propuestos de Actronix09/fuentes-alternas, rama sismos-norteamerica.
  Identificado el antecedente AZCATL Cuando México tiembla, pendiente de confirmar que
  sea el artículo base referido por Gabriel. No se creó repo ni se hizo commit/push.
  El prompt queda local e ignorado; no se publica como contexto del paper de agua.
- Las entradas siguientes conservan antecedentes de las etapas de revisión y publicación;
  sus permisos ya se consumieron y sus estados intermedios no revocan el cierre confirmado.
- Publicación confirmada el 5 nov: commit 29a30dce7fd2f8ff26c9d7ecff0f3000248535fa
  enviado a origin/main con autorización expresa. Autor y committer Gabriel Hurtado;
  sin firmas, trailers ni coautorías de asistentes. Verificador original repetido justo
  antes del push: 25 enlaces, fallos: 0; ADIP y AZCATL respondieron 200. No se utilizó
  la excepción autorizada para ADIP. Este registro de cierre queda local, sin otro commit.
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

Completar el único cierre autorizado del corpus en main y comprobar su remoto y
Pages. Wayback sigue limitado al corpus y pendiente de nuevas capturas confirmadas.
El mensaje para el artículo de obras públicas es un relevo separado: la autorización
de Git de agua no se transfiere a ese proyecto.

Pendiente vigente al 13 nov: reintentar la cola de Wayback cuando Save Page Now
vuelva a responder y confirmar cada captura nueva mediante su URL/fecha real.
Las 34 capturas existentes y las 67 respuestas sin `closest` no completan ese paso.
Conservar el corpus local ya verificado y sus evidencias; no repetir ETL ni reabrir
las tres comprobaciones PostgreSQL, resueltas el 10 nov. El envío y el acuse ya ocurrieron;
no reenviar el manuscrito ni preparar otro envío automáticamente.

Gabriel autorizó el cierre actual del corpus con un commit y push, identidad humana
y sin firmas ni créditos automáticos. El permiso se consume con esas acciones;
cualquier otra requiere autorización nueva. Ejecutar antes de cada push el verificador
Springer original intacto: cero fallos o excepción expresa para ese push. No incluir
privados ni evidencias de correo.
El corpus está excluido de Pages; no modificar los sitios históricos ni el manuscrito.

Los pasos siguientes se conservan únicamente como antecedentes, superados en lo
relativo a PostgreSQL y al envío. No ejecutar permisos ni pendientes antiguos.

Gabriel y los coautores revisan la v3 identificada final y efectúan el envío si lo deciden.
Usar el Word/PDF de `paper/ijcopi/`, con Fig. 1 original restaurada, 15 páginas y
9,098 palabras. Las tres verificaciones PostgreSQL reales ya aprobaron; conservar su
JSON y no ejecutar ETL, reconstruir el volumen ni sustituir esta evidencia por expectativas.
La copia anónima de 6f723ea está preservada como snapshot anterior; no afirmar que contiene
esta restauración ni incluir el espejo Anonymous en el correo (instrucción de Gabriel).
Cerrar el único commit y push expresamente autorizados de esta revisión en main,
excluyendo las 5,923 entradas staged privadas mediante whitelist exacta. Autor y committer
humanos, sin firma ni trailers; inspeccionar árbol/diff antes de subir. Ejecutar el gate
Springer original intacto inmediatamente antes del push y exigir cero fallos o excepción
expresa específica. No reutilizar permisos después de consumirlos ni hacer amend.
El correo queda como plantilla privada lista para copiar, sin enviar.
Pendientes humanos: aval de coautores y metadatos que asigne la revista.

Los siguientes pasos anteriores se conservan como antecedentes cronológicos:

Gabriel revisa conexiones de colonias, correo final de Roberto y nuevas capturas en inglés
de figura 3, con Word de 15 páginas/9,056 palabras sincronizado en ambos repos. Todo
esto sigue local; publicar requiere autorización nueva por commit/push/repositorio y
verificador Springer antes de cada push. No reutilizar excepciones previas.
Cierre anterior publicado y verificado: original 52782a7 e IJCOPI a0730ed. Aval de
coautores y metadatos editoriales siguen pendientes.
No repetir commits, amend o pushes: requieren autorización nueva por acción/repositorio.
La excepción AZCATL usada no habilita futuros pushes. No enviar el paper automáticamente.
No ejecutar publicadores históricos, release/DOI, correo ni envío editorial.
Metadatos y aval final de coautores pendientes. Permisos consumidos no se reutilizan.

Antecedentes y otros proyectos:

Entregar el mensaje y prompt de Deep Research; adjuntar v3/v0 y, si es útil, PDF en
Gemini. Al recibir su informe, contrastar cada hallazgo con la versión fijada antes
de editar. No tratar sus recomendaciones como hechos ni como autorización de Git.

0. Para sismos, abrir como proyecto local Seismic_Data_Geosciences y usar su propio
   contexto/INICIAR_CONVERSACION.md. La carpeta, repo local y remoto público ya están
   creados y conectados, sin commits ni push. Leer sus reglas/memoria y confirmar antecedente y contribución
   científica con diagnóstico y plan antes de implementar.
   No trasladar reglas de IJCOPI o Geotechnics a esta revista. Revalidar costo al enviar;
   cualquier OA con APC requiere cobertura total o exención confirmada, sin asumirlas.
   No hay autorización de commit/push del nuevo trabajo.
   Agua: push de 29a30dc y Pages confirmados (Actions 42085551920, success). Esta autorización ya se
   consumió. Los cambios de fuente/conversor/Word/PDF del original siguen locales y
   requieren autorización propia para commit y push. No confundirlos con esta distribución.
1. Gabriel revisa la v3 corregida (9,116 palabras) y los coautores dan su aval final.
   Faltan referencia editorial de ICOKG y metadatos que asigne la revista: no inventar DOI,
   volumen o páginas. El release/DOI de la ampliación requiere autorización y flujo propios.
   Cita fiscal, Discusión, cifras del índice, prueba exacta y correcciones UI ya atendidas.
   Confirmar cierre con Git y Pages; cada acción posterior necesita autorización nueva y
   cada push exige repetir el verificador y obtener excepción específica si hay fallos.
2. En otra PC, seguir contexto/NUEVA_PC.md y agregar el clon como proyecto local en Codex.
3. Para publicar la revisión, considerar por separado los cambios del original ijcopi-zmvm
   (fuente, conversor, Word y PDF) y los de esta distribución (Word y web); no mezclar ramas
   ni tocar los sitios históricos. No incluir intermedios ni plantilla en este repo.
4. Toda autorización de commit/push se consume al ejecutar esa acción: pedir una nueva
   para cambios posteriores. No enviar correos ni publicar el paper automáticamente.

## Bitácora

- 2026-11-13: Gabriel autorizó commit y push humano del corpus y restringió Wayback
  a fuentes del corpus. Filtradas las consultas/colas a 101 URL (34 existentes, 67 sin
  disponibilidad); no se crearon capturas nuevas. Perfil de Archive comprobado sin
  publicar información ajena al estudio. Gate Springer previo: 25 enlaces/0 fallos.
  Cierre de Git en preparación; mensaje de respaldo para obras públicas solicitado.

- 2026-11-13: continuidad local tras el envío identificado/anónimo y el acuse
  observados en interfaz; sin exportar mensajes, enlaces privados ni auditar hashes
  de adjuntos. PostgreSQL ya resuelto el 10 nov. Respaldo `corpus/` aprobado 65/65,
  159 archivos, 2,130,015,245 bytes; cinco faltantes recuperados con pines exactos,
  D15/manifiesto intactos, 29 capturas con cobertura de 65 ID e índice QA aprobado.
  Wayback: 128 URL, 38 snapshots previos, 90 sin disponibilidad y cero errores
  pendientes; Save Page Now con error interno, ninguna captura nueva confirmada.
  Cola conservada para reintento. Workflow preparado excluye corpus de Pages,
  sin export-ignore del corpus. Sólo edición local; sin nuevas acciones Git ni envío.

- 2026-11-10: Gabriel pidió una Fig. 4b más visual, como su ejemplo de Azcapotzalco,
  y autorizó un commit/push de esta revisión en main con identidad humana, sin firmas
  ni atribuciones automáticas, ejecutando antes el verificador Springer y excluyendo
  temporales/privados. Recaptura real de San Pablo Xalpa 90020074 y sus dos vecinas,
  RDF simétrico/teselas completas/0 errores/OSM. Sólo panel b y leyenda sustituidos.
  Word/PDF regenerados: 15 páginas, 9,098 palabras, +62.03 %, resumen 146,seis keywords. Fig. 1 original,
  autores/correos/IA/tablas y v0 conservados. Whitelist de 3 archivos públicos existentes;
  las 5,923 entradas staged privadas no se incluyen. Correo preparado sin enviar.

- 2026-11-10: por instrucción de Gabriel, adaptado el bloque de correos al formato
  de PublicMunicipalWorks_IJCOPI/paper/ijcopi/Paper37_IJCOPI_v1_extendida.docx.
  Seis líneas en orden de firma, nombres en negrita, distribución de correos 2/2/2/2/2/1,
  sin agregar ni quitar direcciones. Bloque amarillo. Regeneración y nueva revisión
  completa: 15 páginas, 9,098 palabras, +62.03 %, resumen 146, seis keywords.
  Fig. 1 original y resto de integridad aprobados. Word SHA-256
  5d3d8161e8d759e3e1ddd31b7e7af7cf3808e2fe76304ccfff79ab608d03d0b9.
  Original de obras sólo leído; v0 y copia anónima conservadas. Sin acciones Git ni envío.

- 2026-11-10: completadas las tres verificaciones PostgreSQL reales en sólo lectura,
  proceso 0 y pass/passed=true; resultado_postgresql.json conservado. Por instrucción
  posterior, vuelta a main y restauración exacta de Fig. 1 desde v0. Conservados diagrama
  y demás figuras, tablas/cifras, título, autoría, IA, plantilla, v0 y snapshot anónimo.
  Fuente recuperado/reconciliado con e6671c0 y regeneración; cuatro precisiones editoriales,
  amarillo de renumeraciones y maquetación sin reducir fuente/márgenes. Word/PDF finales:
  15 páginas, 9,098 palabras, +62.03 %, resumen 146, seis keywords; inspección visual
  de las quince páginas e integridad aprobadas. Word SHA 902ba9f5...; evidencia en
  tmp/restauracion_main_2026-11-10/. Todo local, sin commits/push/publicación/envío.

- 2026-11-09: Gabriel autorizó expresamente cerrar lo pendiente en IJCOPI/main,
  con identidad humana y sin firmas/créditos automáticos. Verificador previo intacto:
  25 enlaces, sólo ADIP 403; AZCATL 200. Excepción ADIP específica aplicable.
  Commit/push y despliegue en preparación; tres comprobaciones PostgreSQL siguen
  pendientes para la PC con el volumen ampliado, sin ejecutar ETL aquí.

- 2026-11-09: auditoría del ZIP público real de Anonymous aprobada: 221 archivos,
  sin identificadores directos/correos fuera de vendor/fuentes ni privados/historial;
  cuatro máscaras legales previstas, MIT intacta. JSON/manifiestos/RDF/vocabularios y
  Word/PDF exactos a finales. ZIP de 74,584,603 bytes, SHA-256 06d524d5...; evidencia
  anonymous_ui_zip_audit.json. Sólo quedan tres comprobaciones PostgreSQL en otra PC.
  Continuidad local sin acciones Git ni envío.

- 2026-11-09: Anonymous confirmado activo en su interfaz, snapshot del 9 de noviembre,
  acceso gratuito hasta el 9 de mayo de 2027, sin actualización automática ni cambios
  al Pages original. README, ruta del grafo, licencia con cinco nombres ocultos y ZIP
  descargable verificados. Auditoría del ZIP real pendiente. Captura local guardada;
  continuidad actualizada sin otro commit, push ni envío.

- 2026-11-09: entrega anónima preparada (Word 15p/8,954, aebd091c...; PDF b1a1018d...),
  maestras intactas. Gabriel dejó PostgreSQL para la otra PC con su volumen: helper
  portable probado, tres comprobaciones reales pendientes; reconstrucción local detenida
  y contenedores propios apagados sin borrar datos. Publicada rama codex/revision-anonima
  en commit raíz humano 6f723ea; gate 25/2 detenido y repetición 25/1 sólo ADIP autorizado.
  main intacto, permiso consumido. Espejo Anonymous en preparación, aún sin confirmar activo.
  Continuidad posterior sólo local, sin más Git ni envío.

- 2026-11-09: contrastado informe Claude con productos y fuentes primarias: Word15p/9056,
  resumen146 sin etiqueta,15p inspeccionadas, tablas/autoría/amarillo preservados. 23tests
  y Node pasan. Corpus CRLF/LF/fechas verificado sin error de datos. Sin editar productos,
  anonimizar o publicar; siguen pendientes tres comprobaciones PostgreSQL y aval humano.

- 2026-11-09: revisión Fable 5.2 completada: cifras, RDF y web verificados; correcciones de
  referencias, APA, amarillo, figura 2 y referencia cruzada; Word 15 páginas/9,056 palabras
  sincronizado (7c62eefd...). Sin PostgreSQL en vivo. Sin Git ni envío.

- 2026-11-09: actualizados prompt y mensajito para Fable según secuencia de Gabriel:
  revisión/correcciones primero, anonimización del artículo y material del repo después.
  Retiradas órdenes de generar copias ciegas ahora; TXT locales ignorados, sin enviar.
  Manuscrito/sistema intactos; sin acciones Git, anonimización ni publicación.

- 2026-11-09: preparado prompt de revisión/corrección para Fable 5.2, local ignorado,
  revisado independientemente. Confirmado doble ciego del número especial en convocatoria
  ICOKG 2026 y política IJCOPI; reparto de portada/manuscrito por confirmar. Sin modificar
  paper/sistema, generar versión anónima, enviar mensajes ni efectuar acciones Git.

- 2026-11-09: restauradas conexiones de colonia seleccionada y navegación a vecinas
  externas; Node/Edge pasan, sin cambiar RDF/datos. Correo de Roberto al final del bloque.
  Figura 3 recapturada en inglés, leyendas legibles y OSM; generador reproducible actualizado.
  Word/PDF desde fuente: 15 páginas/9,012 palabras; quince páginas y amarillo revisados,
  Word idéntico en ambos repos, v0/cifras/autoría/IA intactos. Cambios locales sin Git ni publicación.

- 2026-11-09: cierre terminado: original 52782a7 (gate 25/1 sólo AZCATL autorizado) e
  IJCOPI a0730ed (gate 25/0), identidad humana sin firma/trailers. Pages 42726420511
  success y tres archivos web idénticos por SHA-256. QA pública fría: mapa operativo
  en 2.065 s, colonias/distancia/COUNT correctos, 0 errores; datos/históricos intactos.
  Continuidad posterior sólo local, sin más commits/amend/pushes.

- 2026-11-09: cierre del diagrama y manuscrito autorizado; publicado original 52782a7,
  identidad humana sin firma/trailers, gate 25/1 sólo AZCATL y excepción aplicada.
  Diagrama y generador copiados/recalculados en IJCOPI. Bloqueo del grafo diagnosticado
  como unión inicial masiva; worker/índices/carga diferida probados, cierre IJCOPI pendiente.

- 2026-11-09: diagrama de procedencia original/ampliada solicitado, recuentos recalculados,
  figura 1 sustituida conservando assets/URLs, generador SVG/PNG/evidencia reproducibles.
  V3 regenerada: 15 páginas/9,014 palabras, resumen 146 y amarillo verificado; QA completa,
  Word sincronizado y demás resultados/figuras/autoría/IA conservados. Todo nuevo local,
  sin commit/amend/push. Sitio anterior 03daef8 ya publicado y probado.

- 2026-11-09: confirmado IJCOPI 03daef8 remoto y Pages success 42721196699, identidad
  humana sin firma/trailers; gate actual 25/0, excepción AZCATL autorizada no utilizada.
  Tres archivos coinciden por SHA-256, QA real pública sin errores. Nuevo diagrama de
  corpus solicitado, en preparación local; sin nuevos commits/amend/pushes.

- 2026-11-09: repetido verificador por solicitud de Gabriel para reanudar solo con
  cero fallos: 25/1, acceso al DOI AZCATL. Sin push ni publicación; no se repitieron
  commits. Confirmado DOI Springer 10.1007/978-3-032-42081-7_6 en 2.3/bibliografía,
  ambas v3 idénticas; ficha/resumen oficial verificados, sin editar el paper.

- 2026-11-09: original 7375a44 publicado con gate 25/0; creado commit humano IJCOPI
  03daef8 sin firmas ni trailers. Gate para su push terminó 25/1 por acceso a DOI AZCATL
  (ADIP 200). Detenido sin push ni reintento, según orden expresa. Web implementada local,
  no desplegada. Continuidad actualizada solo localmente; sin nuevos commits/amend.

- 2026-11-09: commit/push humano del original 7375a44 completado y remoto confirmado;
  sin firma, trailers ni créditos automáticos. Verificador repetido inmediatamente
  antes de ese push: 25 enlaces, 0 fallos. Permiso del original consumido.

- 2026-11-09: Gabriel autorizó un commit y push por repositorio con identidad humana,
  sin firmas/créditos automáticos y detención ante fallos. Verificador original intacto:
  25 enlaces, 0 fallos, ADIP/AZCATL 200. Implementación web y QA persistida confirmadas.

- 2026-11-09: a petición de Gabriel, Roberto Eswart Zagal Flores al último lugar;
  regenerada v3 desde fuente, 15 páginas/9,043 palabras, amarillo e integridad revisados.
  Trabajo futuro amplía población/contexto geográfico; sección 5.8 acompaña navegación
  a colonias y distancia entre centroides. Recuperado clon corto del original en su rama
  de revista, sin tocar main. Web probada en Edge, ES/EN y 375 px, sin errores JS:
  expansión, distancia, simetría/cero, estado traducido y figura correctos.
  Evidencias ignoradas en `tmp/grafo_2026-11-09/`. Sin commit/push/publicación/correo.

- 2026-11-09: corregida revisión independiente tras contrastar hallazgos; SQL y RDF
  reproducibles, 22 enlaces deterministas, población/cobertura explícitas y créditos
  científicos verificados. Word final 15 páginas/9,029 palabras, amarillo e identidad
  académica preservados. Cierre Git autorizado, sujeto al verificador por push.

- 2026-11-09: preparados mensaje y prompt locales para revisión independiente en Gemini
  Deep Research, con commits fijos, documentos, web y criterios científicos/editoriales.
  Registrado cierre Git/Pages confirmado; sin enviar mensajes ni nuevos commits/pushes.
- 2026-11-09: corregidos hallazgos científicos/UI y reproducibilidad con autorización de
  commit/push por repositorio. Word/PDF en 15 páginas/9,116 palabras, amarillo e identidad
  académica preservados; seis pruebas y QA web correctos. Cierre Git sujeto al verificador.
- 2026-11-09: contrastado informe de revisión con Word/PDF, Git, datos crudos y scripts;
  confirmadas métricas centrales, amarillo y conteos. Detectados pendientes científicos,
  reproducibilidad Wilcoxon y fallos UI; localizada fuente fiscal primaria de 2019.
  Productos intactos; solo evidencia y continuidad local, sin commit/push/publicación.
- 2026-11-09: revisión autorizada del paper y la web. Fuente/conversor corregidos, v3 regenerada
  (15 páginas, +67.96 %, amarillo comprobado), script de comparación pareada, mejoras de mapa,
  catálogo y grafo, y página de tres listas de atípicos verificada. Todo local; sin commit ni push.
- 2026-11-05: con autorización expresa de Gabriel, creado repositorio público
  gabrielhuav/Seismic_Data_Geosciences y conectado como origin a la carpeta homónima.
  Verificado remoto vacío y 0 commits locales; identidad humana, sin commit ni push.
- 2026-11-05: creada por autorización expresa la carpeta Seismic_Data_Geosciences y su
  repo Git local vacío en main. Identidad humana, firmas desactivadas y continuidad
  autónoma preparada. Sin commit, remoto, push ni publicación; originales intactos.
- 2026-11-05: a petición de Gabriel, adaptados prompt y mensaje para Computers &
  Geosciences con vía de suscripción sin cargo al autor. Guía y plantillas específicas
  verificadas; corregidas diferencias respecto de Geotechnics. Autoría y autorizaciones
  individuales preservadas. Entregables TXT locales ignorados; sin repo nuevo ni commit/push.
- 2026-11-05: Gabriel prioriza publicación sin gasto personal y pregunta por Applied
  Computing and Geosciences. Comprobado APC oficial USD 2,230 sin impuestos. Verificada
  la alternativa por suscripción sin cargo al autor en Computers & Geosciences. Destino
  editorial pendiente; sin cambios al prompt, creación de repo ni commit/push.
- 2026-11-05: Gabriel replantea el destino Computers and Geotechnics por su alcance.
  Verificado el alcance en la página oficial de Elsevier; la selección editorial queda
  pendiente de encaje con la contribución de sismos. Sin cambios al prompt ni commit/push.
- 2026-11-05: preparado prompt local para el nuevo artículo de sismos; revisados antecedentes,
  repositorio histórico, fuentes alternativas y guía/plantilla oficial de Computers and
  Geotechnics. CAS v2.4 y Word a una columna; prioridad a encaje científico geotécnico.
  Autoría solicitada preservada. Sin creación de repo, cambios a históricos ni commit/push.
- 2026-11-05: push autorizado de 29a30dc completado y remoto confirmado. Identidad humana,
  sin atribuciones ni firma de IA. Verificador original: 25 enlaces y 0 fallos, incluidos
  ADIP 200 y AZCATL 200. No se creó otro commit; cierre de continuidad solo local.
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
