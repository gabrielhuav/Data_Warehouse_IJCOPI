# Continuar en una PC nueva

1. Clona https://github.com/gabrielhuav/Data_Warehouse_IJCOPI con GitHub Desktop
   (File > Clone repository > URL). Selecciona main y haz Fetch/Pull si ya existía el clon.
2. Agrega esa carpeta como proyecto local en Codex. Los chats anteriores y la configuración
   local de Codex no se trasladan con Git; la memoria publicada sustituye ese relevo.
3. Configura tu identidad Git humana antes de cualquier commit:

   ```powershell
   git config user.name "Gabriel Hurtado"
   git config user.email "gabrielhurtadoaviles@gmail.com"
   git status --short --branch
   git remote -v
   ```

4. Pega el mensaje de contexto/INICIAR_CONVERSACION.md en el nuevo chat.
   AGENTS.md y MEMORIA_COMPARTIDA.md se recuperan con el clon; no hay que copiarlos a mano.
   Cada commit y push requiere autorización nueva. Verifica autor, committer y mensaje
   antes de publicar; no incluyas atribuciones a asistentes de IA.
5. Las copias Word del paper (solo v0 base y v3, sin intermedios ni plantilla) están en paper/ijcopi de este repositorio;
   la versión actual registrada es dw_agua_IJCOPI_v3_grafo.docx. Para regenerar o editar
   el texto fuente, clona por separado https://github.com/gabrielhuav/Data_Warehouse_static
   y selecciona ijcopi-zmvm, sin modificar su main. Fuente y generadores siguen en paper/ijcopi
   del original. No editar las copias Word a mano.
   IMPORTANTE: Git solo recupera lo publicado. Compara con la PC anterior y transfiere
   aparte cualquier Word, PDF, fuente o cambio local no publicado que necesites.
6. Lee las instrucciones del original y configura sus dependencias antes de generar el
   manuscrito o ejecutar ETL. Clonar proporciona archivos, no instala Word, Docker,
   Python, dependencias, contenedores ni bases de datos. No resembrar datos sin necesidad.
7. Antes de push, ejecuta en el original el verificador Springer. El 403 de ADIP requiere
   excepción expresa para ese push si persiste. No cambies enlaces congelados para ocultarlo.

## Qué se recupera y qué no

Viajan con Git las reglas y la memoria portable. Los históricos, evidencias locales,
credenciales, .git/config, .git/hooks y chats no viajan. Los controles de identidad y hooks
de la otra PC no se instalan al clonar. Los archivos de continuidad se excluyen de Pages
mediante .gitattributes export-ignore; sí son públicos en el repositorio GitHub.
