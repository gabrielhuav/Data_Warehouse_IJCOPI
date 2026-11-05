# Memoria compartida: IJCOPI de agua

Actualizada: 4 de noviembre de 2026. Hablar con Gabriel en español y brevemente.
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
- El paper aún cita Data_Warehouse_ZMVM. No se actualizó ni midió durante la distribución.
  El relevo histórico reportaba 15 páginas sin margen; requiere verificación nueva al editar.
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

1. Completar y comprobar en el remoto el único commit/push autorizado de v0 y v3 y su
   documentación. No incluir intermedios, plantilla ni PDF. Verificar identidad humana
   y ausencia de atribuciones de asistentes. Las excepciones ADIP/AZCATL son solo para ese push.
2. En otra PC, seguir contexto/NUEVA_PC.md y agregar el clon como proyecto local en Codex.
3. En tarea posterior autorizada, actualizar las URL/cita del paper al nuevo repositorio,
   regenerar y verificar formato, fuentes y cifras. Revisión humana final y envío pendientes.
4. Toda autorización de commit/push se consume al ejecutar esa acción: pedir una nueva
   para cambios posteriores. No enviar correos ni publicar el paper automáticamente.

## Bitácora

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
