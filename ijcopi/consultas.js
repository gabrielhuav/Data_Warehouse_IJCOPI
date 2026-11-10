/* Lista las consultas al almacen con su SQL, su resultado y como repetirlas. */
(function () {
  'use strict';

  const TXT = {
    es: {
      titulo: 'Explora los datos del mapa', 'nav.mapa': 'Mapa', 'nav.grafo': 'Grafo', 'nav.consultas': 'Consultas al almacén', 'nav.atipicos': 'Atípicos',
      coleccion: 'Catálogo de consultas',
      lema: 'Encuentra un tema, explora su resultado y descarga los datos. El SQL y los pasos para repetir cada consulta están a un clic.',
      pasos: 'Cómo repetir las consultas en PostgreSQL',
      'pasos.t': 'Con el almacén levantado, estos comandos arrancan la base de datos, copian las consultas, corren una, abren la consola de PostgreSQL y comparan el mapa con la base de datos.',
      filas: '{n} filas', sql: 'Ver SQL', primeras: 'Ver las primeras {n} filas', comando: 'Comando',
      cargando: 'Cargando consultas y resultados…', error: 'No se pudieron cargar las consultas: {msg}',
      reintentar: 'Volver a intentar', datos: 'Descargar resultado JSON', hash: 'SHA-256 completo del resultado',
      buscar: 'Buscar una consulta', placeholder: 'Ej. sequía, acuíferos, acceso al agua…',
      categorias: 'Filtrar por tema', all: 'Todos los temas', meta: 'Documentación', territory: 'Territorio', water: 'Recursos hídricos', analysis: 'Análisis',
      resultados: 'Consultas disponibles', contador: '{n} de {total} consultas',
      'vacio.titulo': 'No encontramos esa consulta', 'vacio.ayuda': 'Prueba otra palabra o elimina los filtros para ver todos los temas.', limpiar: 'Limpiar filtros',
      verresultado: 'Explorar resultado', tecnico: 'SQL y reproducibilidad', archivo: 'Archivo de consulta', codigo: 'Consulta SQL', repetir: 'Repetir en la base de datos', exportado: 'Resultado exportado',
      cargandoParte: 'Cargando…', errorParte: 'No se pudo cargar: {msg}',
    },
    en: {
      titulo: 'Explore the map data', 'nav.mapa': 'Map', 'nav.grafo': 'Graph', 'nav.consultas': 'Warehouse queries', 'nav.atipicos': 'Atypical',
      coleccion: 'Query catalogue',
      lema: 'Find a topic, explore its result and download the data. The SQL and steps to repeat each query are one click away.',
      pasos: 'How to repeat the queries in PostgreSQL',
      'pasos.t': 'With the warehouse running, these commands start the database, copy the queries, run one of them, open the PostgreSQL console and compare the map with the database.',
      filas: '{n} rows', sql: 'Show SQL', primeras: 'Show the first {n} rows', comando: 'Command',
      cargando: 'Loading queries and results…', error: 'The queries could not be loaded: {msg}',
      reintentar: 'Try again', datos: 'Download JSON result', hash: 'Full SHA-256 of the result',
      buscar: 'Find a query', placeholder: 'E.g. drought, aquifers, access to water…',
      categorias: 'Filter by topic', all: 'All topics', meta: 'Documentation', territory: 'Territory', water: 'Water resources', analysis: 'Analysis',
      resultados: 'Available queries', contador: '{n} of {total} queries',
      'vacio.titulo': 'No matching queries', 'vacio.ayuda': 'Try another word or clear the filters to see every topic.', limpiar: 'Clear filters',
      verresultado: 'Explore result', tecnico: 'SQL and reproducibility', archivo: 'Query file', codigo: 'SQL query', repetir: 'Repeat in the database', exportado: 'Exported result',
      cargandoParte: 'Loading…', errorParte: 'Could not load: {msg}',
    },
  };

  // Labels describe existing SQL outputs; neither SQL nor exported data are changed here.
  const FICHAS = {
    '01': { cat: 'meta', es: ['Fuentes incorporadas al almacén', 'Revisa procedencia y huellas del ETL. Cada fila es una carga a una tabla: un archivo puede aparecer varias veces; el manifiesto identifica los archivos únicos.'], en: ['Sources loaded into the warehouse', 'Inspect provenance and ETL checksums. Each row records a load into a table: a file may appear more than once; the manifest identifies unique files.'] },
    '02': { cat: 'meta', es: ['Contenido de las tablas', 'Consulta los recuentos de filas de cada tabla en la exportación del almacén.'], en: ['What the tables contain', 'Explore the row counts for each table in the warehouse export.'] },
    '03': { cat: 'territory', es: ['Agua por municipio', 'Compara indicadores municipales y revisa la calidad del volumen facturado antes de interpretarlo.'], en: ['Water by municipality', 'Compare municipal indicators and review the quality of billed volumes before interpreting them.'] },
    '04': { cat: 'territory', es: ['Agua por colonia', 'Explora acceso al agua y marginación en polígonos CONAPO. La facturación y los reportes son contexto de unidades SACMEX enlazadas; sus tasas usan población asignada por proximidad, con cobertura explícita.'], en: ['Water by neighbourhood', 'Explore piped-water access and marginalisation in CONAPO polygons. Billing and reports provide context from linked SACMEX units; their rates use population assigned by proximity, with explicit coverage.'] },
    '05': { cat: 'water', es: ['Balance de los acuíferos', 'Revisa recarga, extracción y cambios de nivel en los acuíferos que cubren la zona metropolitana.'], en: ['Aquifer balance', 'Review recharge, extraction and level changes in aquifers beneath the metropolitan area.'] },
    '06': { cat: 'water', es: ['Cambio de nivel en pozos', 'Compara las lecturas de 2010 y 2019. Un descenso positivo indica un nivel de agua más profundo.'], en: ['Water-level changes in wells', 'Compare readings from 2010 and 2019. A positive decline means a deeper water level.'] },
    '07': { cat: 'water', es: ['Volumen de las presas', 'Consulta ubicación, última lectura disponible y volúmenes medios de las presas incluidas.'], en: ['Reservoir volumes', 'Inspect location, the latest available reading and mean volumes for the included reservoirs.'] },
    '08': { cat: 'water', es: ['Evolución mensual de las presas', 'Explora el volumen medio mensual de cada presa desde 2018.'], en: ['Monthly reservoir trends', 'Explore the mean monthly volume of each reservoir from 2018.'] },
    '09': { cat: 'water', es: ['Sequía en la zona metropolitana', 'Revisa la severidad por municipio y fecha según el Monitor de Sequía de México.'], en: ['Drought in the metropolitan area', 'Review severity by municipality and date from the Mexican Drought Monitor.'] },
    '10': { cat: 'water', es: ['Calidad del agua', 'Localiza sitios de monitoreo y revisa el semáforo y los contaminantes publicados por CONAGUA.'], en: ['Water quality', 'Locate monitoring sites and review the status and contaminants published by CONAGUA.'] },
    '11': { cat: 'analysis', es: ['Facturación y reportes de falta de agua', 'Examina los cruces por colonia que relacionan volumen facturado y reportes ciudadanos.'], en: ['Billing and water-shortage reports', 'Examine neighbourhood-level comparisons between billed volume and citizen reports.'] },
    '12': { cat: 'territory', es: ['Geometrías del mapa', 'Consulta los polígonos simplificados de municipios, colonias y acuíferos que dibuja el mapa.'], en: ['Map geometries', 'Inspect the simplified municipality, neighbourhood and aquifer polygons drawn on the map.'] },
    '13': { cat: 'analysis', es: ['Acceso al agua entubada', 'Consulta estimaciones de ocupantes sin agua entubada, agrupadas por entidad.'], en: ['Access to piped water', 'Inspect estimates of occupants without piped water, grouped by state.'] },
    '14': { cat: 'territory', es: ['Municipios que comparten frontera', 'Explora las relaciones de vecindad municipal y la longitud de sus fronteras compartidas.'], en: ['Municipalities sharing a boundary', 'Explore municipal adjacency and the length of shared boundaries.'] },
    '15': { cat: 'analysis', es: ['Conexiones a través del límite de la CDMX', 'Revisa vecindades y acuíferos que conectan la ciudad con el resto de la zona metropolitana.'], en: ['Connections across the Mexico City boundary', 'Review adjacencies and aquifers linking the city to the rest of the metropolitan area.'] },
  };

  const q = new URLSearchParams(location.search).get('lang');
  let idioma = q === 'en' || q === 'es' ? q : (window.I18N ? I18N.idioma : 'es');
  const t = (k, v) => {
    const s = TXT[idioma][k] || k;
    return v ? s.replace(/\{(\w+)\}/g, (m, n) => (n in v ? v[n] : m)) : s;
  };
  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  let cache = null, errorCarga = null, cargando = false, categoria = 'all';
  /* Resultados y SQL se piden al abrir su ficha, no al cargar la pagina: el catalogo solo
     necesita el manifiesto, y antes descargaba los 15 resultados (unos 3.5 MB) de entrada. */
  const PARTES = {};
  const normalizar = s => String(s).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const ficha = c => FICHAS[c.consulta.slice(0, 2)] || { cat: 'meta', es: [c.consulta, ''], en: [c.consulta, ''] };

  function celda(v) {
    const s = v == null ? '' : String(v);
    return `<span title="${esc(s)}">${esc(s.length > 70 ? s.slice(0, 70) + '…' : s)}</span>`;
  }

  /* Contenido de una parte perezosa (tabla o sql): cargada, con error o pendiente */
  function parte(c, tipo, titulo) {
    const p = (PARTES[c.consulta] || {})[tipo];
    if (p && p.error) {
      return `<p class="status show error">${esc(t('errorParte', { msg: p.error }))}</p>`
        + `<button type="button" class="btn btn-secondary cq-reintentar-parte" data-q="${esc(c.consulta)}" data-tipo="${tipo}">${esc(t('reintentar'))}</button>`;
    }
    if (!p || p.valor === undefined) return `<p class="zm-meta">${esc(t('cargandoParte'))}</p>`;
    if (tipo === 'sql') return `<pre>${esc(p.valor)}</pre>`;
    const tabla = p.valor, n = Math.min(10, tabla.filas.length);
    const cab = tabla.columnas.map(x => `<th scope="col">${esc(x)}</th>`).join('');
    const cuerpo = tabla.filas.slice(0, n).map(f => `<tr>${f.map(v => `<td>${celda(v)}</td>`).join('')}</tr>`).join('');
    return `<p class="zm-meta">${t('primeras', { n })}</p><div class="zm-tabla" role="region" tabindex="0" aria-label="${esc(titulo)}"><table><thead><tr>${cab}</tr></thead><tbody>${cuerpo}</tbody></table></div>`;
  }

  async function cargarParte(consulta, tipo) {
    const c = (cache || []).find(x => x.consulta === consulta);
    if (!c) return;
    const partes = PARTES[consulta] = PARTES[consulta] || {};
    if (partes[tipo] && (partes[tipo].valor !== undefined || partes[tipo].pidiendo)) return;
    partes[tipo] = { pidiendo: true };
    pintarParte(c, tipo);
    try {
      const valor = tipo === 'sql'
        ? await pedir('warehouse_ampliado/consultas/' + c.consulta, false)
        : await pedir('ijcopi/datos/' + c.datos, true);
      partes[tipo] = { valor };
    } catch (e) {
      console.error(e);
      partes[tipo] = { error: e.message || String(e) };
    }
    pintarParte(c, tipo);
  }

  function pintarParte(c, tipo) {
    const caja = document.querySelector(`[data-parte="${CSS.escape(c.consulta + ':' + tipo)}"]`);
    if (caja) caja.innerHTML = parte(c, tipo, ficha(c)[idioma][0]);
  }

  function tarjeta(c) {
    const f = ficha(c), [titulo, descripcion] = f[idioma];
    return `<section class="panel cq-card">
      <div class="cq-card-top"><span class="cq-card-type">${t(f.cat)}</span><span class="cq-card-number">${esc(c.consulta.slice(0, 2))}</span></div>
      <h2>${esc(titulo)}</h2>
      <p class="cq-card-desc">${esc(descripcion)}</p>
      <p class="cq-card-meta"><span>${t('filas', { n: c.filas.toLocaleString(idioma === 'en' ? 'en-GB' : 'es-MX') })}</span><span>JSON</span><span>${t('exportado')}</span></p>
      <a class="cq-download" href="ijcopi/datos/${esc(c.datos)}" download><svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M10 2v10m-4-4 4 4 4-4M3 13v4h14v-4"/></svg>${t('datos')}</a>
      <details data-q="${esc(c.consulta)}" data-tipo="tabla"><summary>${t('verresultado')}</summary><div data-parte="${esc(c.consulta)}:tabla">${parte(c, 'tabla', titulo)}</div></details>
      <details data-q="${esc(c.consulta)}" data-tipo="sql"><summary>${t('tecnico')}</summary>
        <p class="cq-tech-caption">${t('archivo')}</p><code class="cq-file">${esc(c.consulta)}</code>
        <p class="cq-tech-caption">${t('repetir')}</p><pre>docker exec data_warehouse_cdmx psql -U postgres -d data_warehouse -f /consultas/${esc(c.consulta)}</pre>
        <p class="cq-tech-caption">${t('hash')}</p><code class="zm-hash">${esc(c.sha256_datos)}</code>
        <p class="cq-tech-caption">${t('codigo')}</p><div data-parte="${esc(c.consulta)}:sql">${parte(c, 'sql', titulo)}</div>
      </details>
    </section>`;
  }

  function pintarResultados() {
    const lista = document.getElementById('lista');
    const busqueda = normalizar(document.getElementById('buscar').value.trim());
    const filtradas = (cache || []).filter(c => {
      const f = ficha(c);
      const texto = normalizar([c.consulta, ...f.es, ...f.en, t(f.cat)].join(' '));
      return (categoria === 'all' || f.cat === categoria) && (!busqueda || texto.includes(busqueda));
    });
    lista.innerHTML = filtradas.map(tarjeta).join('');
    document.getElementById('conteoConsultas').textContent = cache ? t('contador', { n: filtradas.length, total: cache.length }) : '';
    document.getElementById('sinResultados').hidden = !cache || !!filtradas.length || cargando || !!errorCarga;
  }

  function pintar() {
    document.documentElement.lang = idioma;
    document.title = t('titulo');
    document.querySelectorAll('[data-t]').forEach(el => { el.textContent = t(el.dataset.t); });
    document.getElementById('buscar').placeholder = t('placeholder');
    document.getElementById('categorias').setAttribute('aria-label', t('categorias'));
    document.getElementById('categorias').innerHTML = ['all', 'meta', 'territory', 'water', 'analysis'].map(c => `<button class="cq-categoria" type="button" data-categoria="${c}" aria-pressed="${c === categoria}">${t(c)}</button>`).join('');
    pintarResultados();
    const st = document.getElementById('status');
    st.className = cargando ? 'status show loading' : errorCarga ? 'status show error' : 'status';
    st.textContent = cargando ? t('cargando') : errorCarga ? t('error', { msg: errorCarga }) : '';
    document.getElementById('reintentar').hidden = !errorCarga;
    document.getElementById('lista').setAttribute('aria-busy', String(cargando));
  }

  async function pedir(url, json) {
    const respuesta = await fetch(url, { cache: 'no-cache' });
    if (!respuesta.ok) throw new Error(`${url}: HTTP ${respuesta.status}`);
    return json ? respuesta.json() : respuesta.text();
  }

  async function iniciar() {
    cargando = true;
    errorCarga = null;
    pintar();
    try {
      const man = await pedir('ijcopi/datos/manifiesto.json', true);
      cache = man.consultas;
    } catch (e) {
      console.error(e);
      errorCarga = e.message || String(e);
    } finally {
      cargando = false;
      pintar();
    }
  }

  document.addEventListener('idiomacambiado', e => {
    idioma = (e.detail && e.detail.idioma) || idioma;
    pintar();
  });
  document.getElementById('reintentar').addEventListener('click', iniciar);
  /* toggle no burbujea: se escucha en captura. Abrir una ficha pide solo su parte. */
  document.getElementById('lista').addEventListener('toggle', e => {
    const d = e.target;
    if (d.open && d.dataset && d.dataset.q) cargarParte(d.dataset.q, d.dataset.tipo);
  }, true);
  document.getElementById('lista').addEventListener('click', e => {
    const b = e.target.closest('.cq-reintentar-parte');
    if (!b) return;
    delete (PARTES[b.dataset.q] || {})[b.dataset.tipo];
    cargarParte(b.dataset.q, b.dataset.tipo);
  });
  document.getElementById('buscar').addEventListener('input', pintarResultados);
  document.getElementById('categorias').addEventListener('click', e => {
    const boton = e.target.closest('[data-categoria]');
    if (!boton) return;
    categoria = boton.dataset.categoria;
    document.querySelectorAll('[data-categoria]').forEach(b => b.setAttribute('aria-pressed', String(b === boton)));
    pintarResultados();
  });
  document.getElementById('limpiarBusqueda').addEventListener('click', () => {
    categoria = 'all';
    document.getElementById('buscar').value = '';
    pintar();
    document.getElementById('buscar').focus();
  });
  if (window.I18N && idioma !== I18N.idioma) {
    let previa = null;
    try { previa = localStorage.getItem('dwagua-idioma'); } catch (e) { /* sin almacenamiento */ }
    I18N.set(idioma);
    try { if (previa === null) localStorage.removeItem('dwagua-idioma'); else localStorage.setItem('dwagua-idioma', previa); } catch (e) { /* sin almacenamiento */ }
  }
  iniciar();
})();
