# Memoria compartida: IJCOPI de agua

Actualizada: 9 de noviembre de 2026. Hablar con Gabriel en español y brevemente.
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

Original cerrado en 7375a44 (ijcopi-zmvm); completar el commit/push ya autorizado
de la copia Word y web implementada en este repo independiente (main). Repetir el
verificador original antes de ese push y detenerse ante cualquier fallo, como ordenó
Gabriel. Confirmar remoto y despliegue de Pages IJCOPI. QA ES/EN/móvil y figura
terminada; la v3 tiene 15 páginas.
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
