/* Grafo de conocimiento de la Zona Metropolitana de Ciudad de Mexico.

   Carga ijcopi/kg_zm.ttl, materializado con warehouse_ampliado/grafo/mapeo_zm.r2rml.ttl, y lo consulta
   con SPARQL en un worker del navegador. El recorrido usa indices del mismo RDF verificado,
   sin ejecutar uniones SPARQL al arrancar. Al expandir un municipio se dibujan todas sus colonias con geometria y sus
   colindancias internas. La linea de distancia es una medicion, no una arista RDF.
   Las consultas de ejemplo son los .rq que verifica verificar_grafo_zm.py. Admite
   ?mun=<clave>, ?col=<clave>, ?lang= y ?vista=figura. */
(function () {
  'use strict';

  const q = new URLSearchParams(location.search);
  const CONSULTAS = 'warehouse_ampliado/grafo/consultas/';
  const INICIAL = '09007';   /* Iztapalapa: tiene vecinos a los dos lados del limite */
  const COLOR = { cdmx: '#00897b', zm: '#7b1fa2', cruce: '#ef6c00', sel: '#ff6f00', arista: '#90a4ae', colonia: '#1565c0', distancia: '#ad1457', conexion: '#c62828', vecina: '#00838f' };
  const PREFIJOS = 'PREFIX agua: <https://w3id.org/cdmx/agua/>\nPREFIX geo:  <http://www.opengis.net/ont/geosparql#>\n'
    + 'PREFIX mun:  <https://w3id.org/cdmx/agua/municipio/>\nPREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n\n';

  const TXT = {
    es: {
      titulo: 'Grafo del agua en la zona metropolitana',
      lema: 'El almacén ampliado publicado como grafo de conocimiento. Cruza el límite de la CDMX y se consulta con SPARQL en tu navegador, sin servidor.',
      'nav.mapa': 'Mapa', 'nav.grafo': 'Grafo', 'nav.consultas': 'Consultas al almacén', 'nav.atipicos': 'Atípicos',
      'k.tripletas': 'Tripletas', 'k.municipios': 'Municipios', 'k.fronteras': 'Fronteras entre municipios',
      'k.colonias': 'Colonias', 'k.vecinas': 'Colindancias entre colonias',
      'r.titulo': 'Recorrer el grafo',
      'r.ayuda': 'Pulsa un nodo de municipio o alcaldía, o elígelo en la lista, para desplegar sus colonias y colindancias. Sus vecinos y acuíferos proceden del mismo grafo.',
      'r.municipio': 'Municipio o alcaldía', 'r.error': 'No se pudo completar el recorrido: {msg}',
      'r.volver': 'Ver toda el área metropolitana', 'r.colonia': 'Explorar una colonia',
      'r.elegirMunicipio': 'Elige un municipio o alcaldía…',
      'r.elegirColonia': 'Elige una colonia…', 'r.global': 'Vista metropolitana: elige un municipio o alcaldía para ver sus colonias.',
      'r.cargandoInterior': 'Cargando colonias de {n}…',
      'r.interior': '{n}: {c} colonias y {a} colindancias internas.',
      'r.sinInterior': '{n}: no hay colonias registradas en este grafo.',
      'r.sinGeometria': '{n} colonias sin geometría no se dibujan.',
      'r.interiorNota': 'Los puntos representan colonias CONAPO; las líneas unen polígonos que colindan. No representan tuberías. Se muestran todas las colonias con geometría del municipio elegido.',
      'r.consultaColonias': 'Ver las consultas de colonias y sus colindancias',
      'r.poblacion': 'Población del polígono, CONAPO 2020',
      'c.titulo': 'Conexiones de {n}', 'c.cargando': 'Consultando las colindancias…',
      'c.resumen': '{n} colonias colindantes; {e} en otros municipios o alcaldías.',
      'c.vacio': 'El grafo no registra colonias colindantes con este nodo.',
      'c.nota': 'Se resaltan las colindancias registradas entre polígonos CONAPO, no tuberías ni rutas de suministro. Pulsa una colonia de la lista para continuar el recorrido.',
      'c.ver': 'Ver estas conexiones en el mapa', 'c.error': 'No se pudieron consultar las conexiones: {msg}',
      'c.faltan': '{n} nodos sin geometría se conservan en la lista.',
      'l.coloniaElegida': 'Colonia elegida', 'l.coloniaVecina': 'Colonia colindante', 'l.conexion': 'Conexión del nodo elegido',
      'l.cdmx': 'Alcaldía de la CDMX', 'l.zm': 'Municipio agregado', 'l.arista': 'Frontera entre municipios',
      'l.cruce': 'Frontera que cruza el límite de la CDMX', 'l.sel': 'Municipio elegido',
      'l.colonia': 'Colonia del municipio elegido', 'l.colindancia': 'Colindancia entre colonias',
      'd.titulo': 'Distancia entre dos nodos', 'd.origen': 'Origen', 'd.destino': 'Destino', 'd.nodo': 'Nodo',
      'd.nota': 'Distancia geográfica aproximada en línea recta sobre la superficie terrestre, entre puntos representativos: centroides del anillo exterior de mayor área de cada polígono. No mide la separación entre límites, una ruta ni una red de agua; un centroide puede quedar fuera de un polígono irregular.',
      'd.elegir': 'Elige un nodo…', 'd.municipio': 'Nodo municipal', 'd.colonias': 'Colonias',
      'd.ayuda': 'Elige el nodo de origen y el de destino; pueden estar en municipios distintos.',
      'd.resultado': '{a} → {b}: aproximadamente {n} {u}.',
      'd.sinGeometria': 'Sin geometría disponible para calcular esta distancia.',
      'd.ver': 'Ver distancia en el mapa', 'd.limpiar': 'Limpiar distancia',
      vecinos: 'Vecinos de {n}', acuiferos: 'Acuíferos bajo {n}', sindato: 'sin dato', versparql: 'Ver la consulta SPARQL',
      's.titulo': 'Consultas SPARQL', 's.ayuda': 'Elige un ejemplo o escribe una consulta SELECT. Se ejecuta en tu navegador sobre el grafo completo. También puedes usar Ctrl+Enter (⌘+Enter en Mac).',
      limite: 'Se muestran las primeras {n} filas.',
      's.etiqueta': 'Consulta (la puedes editar)', 's.ejecutar': 'Ejecutar',
      's.pendiente': 'Elige un ejemplo y pulsa Ejecutar para consultar el grafo completo.',
      's.motor': 'Preparando el motor de consultas…',
      'fase.download': 'Descargando y verificando el grafo…', 'fase.parse': 'Leyendo {mb} MB de RDF…',
      'fase.verify': 'Verificando la integridad del grafo…',
      'fase.index': 'Preparando los nodos y sus relaciones…', 'fase.map': 'Dibujando el grafo…',
      'fase.geometry': 'Preparando las geometrías…', 'espera': 'La operación tardó demasiado. Vuelve a intentarlo.',
      'worker.error': 'No se pudo iniciar el lector del grafo.',
      filas: '{n} filas en {ms} ms', fila: '1 fila en {ms} ms', sinfilas: 'La consulta no devolvió filas.', corriendo: 'Ejecutando…',
      pares: '{n} pares municipio-acuífero · {m} municipios distintos · {ms} ms',
      'o.titulo': 'De dónde sale este grafo',
      'o.texto': 'Se materializa desde PostgreSQL con un mapeo R2RML declarativo. Los datos ausentes no producen una afirmación numérica. Las 16 alcaldías se enlazan con skos:exactMatch al grafo original. Las colonias se unen con geo:sfTouches estricto; los municipios usan agua:sharesBoundaryWith porque sus polígonos oficiales presentan pequeños solapes. En las colonias CONAPO, population es la población oficial del polígono; las tasas proxy usan ratePopulationProxy, la población censal asignada por proximidad a las unidades SACMEX enlazadas, y se omiten si falta cobertura. Estas correspondencias no reasignan los registros al polígono. El espacio de nombres w3id identifica recursos; todavía no ofrece un servicio público de desreferenciación.',
      'o.vocabulario': 'Descargar el vocabulario RDF (Turtle)',
      'o.hash': '{n} tripletas. SHA-256 {h}…',
      cargando: 'Cargando el grafo…', analizando: 'Analizando {mb} MB de RDF…', error: 'No se pudo cargar el grafo: {msg}',
    },
    en: {
      titulo: 'Water graph of the metropolitan area',
      lema: 'The extended warehouse published as a knowledge graph. It crosses the Mexico City boundary and runs SPARQL in your browser, with no server.',
      'nav.mapa': 'Map', 'nav.grafo': 'Graph', 'nav.consultas': 'Warehouse queries', 'nav.atipicos': 'Atypical',
      'k.tripletas': 'Triples', 'k.municipios': 'Municipalities', 'k.fronteras': 'Municipal boundaries',
      'k.colonias': 'Neighbourhoods', 'k.vecinas': 'Neighbourhood adjacencies',
      'r.titulo': 'Traverse the graph',
      'r.ayuda': 'Click a municipality or borough node, or choose it from the list, to expand its neighbourhoods and adjacencies. Its neighbours and aquifers come from the same graph.',
      'r.municipio': 'Municipality or borough', 'r.error': 'The traversal could not be completed: {msg}',
      'r.volver': 'Show the whole metropolitan area', 'r.colonia': 'Explore a neighbourhood',
      'r.elegirMunicipio': 'Choose a municipality or borough…',
      'r.elegirColonia': 'Choose a neighbourhood…', 'r.global': 'Metropolitan view: choose a municipality or borough to see its neighbourhoods.',
      'r.cargandoInterior': 'Loading neighbourhoods of {n}…',
      'r.interior': '{n}: {c} neighbourhoods and {a} internal adjacencies.',
      'r.sinInterior': '{n}: no neighbourhoods are recorded in this graph.',
      'r.sinGeometria': '{n} neighbourhoods without geometry are not drawn.',
      'r.interiorNota': 'Points represent CONAPO neighbourhoods; lines join adjacent polygons. They do not represent pipes. All neighbourhoods with geometry in the selected municipality are shown.',
      'r.consultaColonias': 'Show the neighbourhood and adjacency queries',
      'r.poblacion': 'Polygon population, CONAPO 2020',
      'c.titulo': 'Connections of {n}', 'c.cargando': 'Reading neighbourhood adjacencies…',
      'c.resumen': '{n} adjacent neighbourhoods; {e} in other municipalities or boroughs.',
      'c.vacio': 'The graph records no adjacent neighbourhoods for this node.',
      'c.nota': 'Highlighted connections are recorded adjacencies between CONAPO polygons, not pipes or supply routes. Click a neighbourhood in the list to continue the traversal.',
      'c.ver': 'Show these connections on the map', 'c.error': 'The connections could not be retrieved: {msg}',
      'c.faltan': '{n} nodes without geometry remain in the list.',
      'l.coloniaElegida': 'Selected neighbourhood', 'l.coloniaVecina': 'Adjacent neighbourhood', 'l.conexion': 'Selected node connection',
      'l.cdmx': 'Mexico City borough', 'l.zm': 'Added municipality', 'l.arista': 'Boundary between municipalities',
      'l.cruce': 'Boundary crossing the Mexico City limit', 'l.sel': 'Selected municipality',
      'l.colonia': 'Neighbourhood in the selected municipality', 'l.colindancia': 'Neighbourhood adjacency',
      'd.titulo': 'Distance between two nodes', 'd.origen': 'Origin', 'd.destino': 'Destination', 'd.nodo': 'Node',
      'd.nota': 'Approximate straight-line geographical distance over the Earth’s surface, between representative points: centroids of the largest outer ring of each polygon. It does not measure boundary separation, a route or a water network; a centroid may fall outside an irregular polygon.',
      'd.elegir': 'Choose a node…', 'd.municipio': 'Municipal node', 'd.colonias': 'Neighbourhoods',
      'd.ayuda': 'Choose the origin and destination nodes; they may be in different municipalities.',
      'd.resultado': '{a} → {b}: approximately {n} {u}.',
      'd.sinGeometria': 'No geometry is available to calculate this distance.',
      'd.ver': 'Show distance on the map', 'd.limpiar': 'Clear distance',
      vecinos: 'Neighbours of {n}', acuiferos: 'Aquifers under {n}', sindato: 'no data', versparql: 'Show the SPARQL query',
      's.titulo': 'SPARQL queries', 's.ayuda': 'Pick an example or write a SELECT query. It runs in your browser over the whole graph. You can also use Ctrl+Enter (⌘+Enter on Mac).',
      limite: 'The first {n} rows are shown.',
      's.etiqueta': 'Query (you can edit it)', 's.ejecutar': 'Run',
      's.pendiente': 'Choose an example and press Run to query the full graph.',
      's.motor': 'Preparing the query engine…',
      'fase.download': 'Downloading and verifying the graph…', 'fase.parse': 'Reading {mb} MB of RDF…',
      'fase.verify': 'Verifying graph integrity…',
      'fase.index': 'Preparing nodes and their relationships…', 'fase.map': 'Drawing the graph…',
      'fase.geometry': 'Preparing geometries…', 'espera': 'The operation took too long. Please try again.',
      'worker.error': 'The graph reader could not be started.',
      filas: '{n} rows in {ms} ms', fila: '1 row in {ms} ms', sinfilas: 'The query returned no rows.', corriendo: 'Running…',
      pares: '{n} municipality-aquifer pairs · {m} distinct municipalities · {ms} ms',
      'o.titulo': 'Where this graph comes from',
      'o.texto': 'It is materialised from PostgreSQL with a declarative R2RML mapping. Missing values produce no numeric assertion. The 16 boroughs link to the original graph through skos:exactMatch. Neighbourhoods use strict geo:sfTouches; municipalities use agua:sharesBoundaryWith because their official polygons have small overlaps. For CONAPO neighbourhoods, population is the official polygon population; proxy rates use ratePopulationProxy, the census population assigned by proximity to matched SACMEX units, and are omitted when coverage is incomplete. These correspondences do not reallocate records to the polygon. The w3id namespace identifies resources; it does not yet provide a public dereferencing service.',
      'o.vocabulario': 'Download the RDF vocabulary (Turtle)',
      'o.hash': '{n} triples. SHA-256 {h}…',
      cargando: 'Loading the graph…', analizando: 'Parsing {mb} MB of RDF…', error: 'The graph could not be loaded: {msg}',
    },
  };

  let idioma = q.get('lang') === 'en' || q.get('lang') === 'es' ? q.get('lang') : (window.I18N ? I18N.idioma : 'es');
  const t = (k, v) => {
    const s = TXT[idioma][k] || TXT.es[k] || k;
    return v ? s.replace(/\{(\w+)\}/g, (m, n) => (n in v ? v[n] : m)) : s;
  };
  const loc = () => (idioma === 'en' ? 'en-GB' : 'es-MX');
  const fmt = (n, d) => Number(n).toLocaleString(loc(), { maximumFractionDigits: d == null ? 2 : d });
  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const $ = id => document.getElementById(id);
  const zona = cve => (cve.startsWith('09') ? 'cdmx' : 'zm');
  const clave = iri => iri.slice(iri.lastIndexOf('/') + 1);

  let motor = false, mapa, lienzo, resumen, seleccion = null, ejemplos = [], actual = 0, ultima = null;
  let lector, solicitud = 0, faseCarga = null, consultaModificada = false;
  const pendientes = new Map();
  const nodos = {}, poligonos = {}, aristas = [], nombres = {};
  const colonias = {}, coloniasMunicipio = {}, geometriasColonia = {}, marcasColonia = {};
  let capaInterior, capaDistancia, capaVecindad, expandido = null, coloniaElegida = null, vecinosActuales = new Set(), turnoDibujo = 0;
  let adyacenciasActuales = [], consultaColonias = '', consultaAdyacencias = '', turnoColonia = 0;
  const lineasColonia = [], poligonosColonia = {}, conexionesCache = new Map();
  let vecinasElegidas = [];

  const bindings = rows => rows.map(row => new Map(Object.entries(row)));
  const consultar = async (texto, progreso) => bindings(await trabajar('query', { text: texto }, progreso));
  const respirar = () => new Promise(resolve => setTimeout(resolve, 0));

  function crearLector() {
    lector = (window.origin === 'null' || location.hostname === 'anonymous.4open.science')
      ? window.__reviewWorker()
      : new Worker(new URL('ijcopi/grafo-zm-worker.js?v=20261109-conexiones', document.baseURI));
    lector.onmessage = event => {
      const { id, progress, result, error } = event.data, pendiente = pendientes.get(id);
      if (!pendiente) return;
      if (progress) { if (pendiente.progreso) pendiente.progreso(progress); return; }
      clearTimeout(pendiente.timer); pendientes.delete(id);
      if (error) pendiente.reject(new Error(error)); else pendiente.resolve(result);
    };
    lector.onerror = event => {
      event.preventDefault();
      pendientes.forEach(p => { clearTimeout(p.timer); p.reject(new Error(t('worker.error'))); });
      pendientes.clear(); lector.terminate();
    };
  }

  function trabajar(type, datos = {}, progreso) {
    return new Promise((resolve, reject) => {
      const id = ++solicitud;
      const timer = setTimeout(() => {
        pendientes.delete(id);
        reject(new Error(t('espera')));
        if (type === 'init') lector.terminate();
      }, type === 'init' ? 120000 : 60000);
      pendientes.set(id, { resolve, reject, progreso, timer });
      lector.postMessage({ id, type, ...datos });
    });
  }

  function mostrarFase(paso) {
    faseCarga = paso;
    $('status').textContent = t('fase.' + paso.phase, paso);
  }

  function celda(term) {
    if (!term) return '';
    if (term.termType === 'NamedNode') {
      const m = term.value.match(/[/#]([^/#]+)$/);
      return `<span title="${esc(term.value)}">${esc(m ? m[1] : term.value)}</span>`;
    }
    return /^-?\d+(\.\d+)?$/.test(term.value) ? esc(fmt(term.value)) : esc(term.value);
  }

  /* Columnas en el orden del SELECT: los resultados de Comunica no lo conservan */
  function columnas(texto, filas) {
    const m = texto.match(/SELECT\s+(?:DISTINCT\s+)?([\s\S]*?)\s*WHERE/i);
    const pedidas = m ? (m[1].replace(/\([^()]*(\([^()]*\)[^()]*)*\s+AS\s+(\?\w+)\)/gi, '$2').match(/\?\w+/g) || []).map(v => v.slice(1)) : [];
    return pedidas.length ? pedidas : [...filas[0].keys()].map(k => typeof k === 'string' ? k : k.value);
  }

  function tabla(filas, texto) {
    if (!filas.length) return `<p class="zm-meta">${esc(t('sinfilas'))}</p>`;
    const cols = columnas(texto || '', filas);
    return (filas.length > 300 ? `<p class="zm-meta">${esc(t('limite', { n: 300 }))}</p>` : '')
      + `<table><thead><tr>${cols.map(c => `<th scope="col">${esc(c)}</th>`).join('')}</tr></thead><tbody>`
      + filas.slice(0, 300).map(f => `<tr>${cols.map(c => {
        const term = [...f.keys()].find(k => (typeof k === 'string' ? k : k.value) === c);
        return `<td>${term ? celda(f.get(term)) : ''}</td>`;
      }).join('')}</tr>`).join('') + '</tbody></table>';
  }

  /* Centroide del anillo exterior mas grande: da el lugar del nodo */
  function centroide(geom) {
    const anillos = geom.type === 'Polygon' ? [geom.coordinates[0]] : geom.coordinates.map(p => p[0]);
    let mejor = null, mayor = -1;
    anillos.forEach(r => {
      let a = 0, x = 0, y = 0;
      /* Trasladar el origen evita perder precision al restar coordenadas grandes. */
      const ox = r[0][0], oy = r[0][1];
      for (let i = 0; i < r.length - 1; i++) {
        const x0 = r[i][0] - ox, y0 = r[i][1] - oy, x1 = r[i + 1][0] - ox, y1 = r[i + 1][1] - oy;
        const f = x0 * y1 - x1 * y0;
        a += f; x += (x0 + x1) * f; y += (y0 + y1) * f;
      }
      if (a && Math.abs(a) > mayor) { mayor = Math.abs(a); mejor = [oy + y / (3 * a), ox + x / (3 * a)]; }
    });
    return mejor;
  }

  function dibujarRed(geo, municipios, vecinos) {
    lienzo = L.canvas({ padding: 0.3 });
    municipios.forEach(f => {
      const iri = f.get('m').value, cve = clave(iri);
      nombres[cve] = f.get('n').value;
      const g = geo[cve];
      if (!g) return;
      poligonos[cve] = L.geoJSON(g, {
        style: { renderer: lienzo, color: COLOR[zona(cve)], weight: 0.7, fillColor: COLOR[zona(cve)], fillOpacity: 0.08 },
      }).on('click', () => seleccionar(cve)).bindTooltip(esc(nombres[cve]), { sticky: true }).addTo(mapa);
      const punto = centroide(g);
      if (punto) nodos[cve] = punto;
    });
    vecinos.forEach(f => {
      const a = clave(f.get('a').value), b = clave(f.get('b').value);
      if (a >= b || !nodos[a] || !nodos[b]) return;
      const cruza = zona(a) !== zona(b);
      const linea = L.polyline([nodos[a], nodos[b]], { renderer: lienzo, interactive: false,
        color: cruza ? COLOR.cruce : COLOR.arista, weight: cruza ? 2.2 : 1.1, opacity: 0.9 }).addTo(mapa);
      aristas.push({ a, b, cruza, linea });
    });
    Object.keys(nodos).forEach(cve => {
      nodos[cve] = { punto: nodos[cve], marca: L.circleMarker(nodos[cve], { renderer: lienzo, radius: 4.5, weight: 1,
        color: '#fff', fillColor: COLOR[zona(cve)], fillOpacity: 1 })
        .on('click', () => seleccionar(cve)).bindTooltip(esc(nombres[cve])).addTo(mapa) };
    });
  }

  function resaltar(cve, vecinos) {
    Object.keys(poligonos).forEach(c => {
      const elegido = c === cve, vecino = vecinos.has(c);
      poligonos[c].setStyle({ fillColor: elegido ? COLOR.sel : COLOR[zona(c)], fillOpacity: elegido ? 0.55 : vecino ? 0.38 : 0.08,
        color: COLOR[zona(c)], opacity: 1, weight: elegido || vecino ? 1.6 : 0.7 });
      if (nodos[c]) {
        nodos[c].marca.setRadius(elegido ? 8 : vecino ? 6 : 4.5);
        nodos[c].marca.setStyle({ fillColor: elegido ? COLOR.sel : COLOR[zona(c)], opacity: 1, fillOpacity: 1 });
      }
    });
    aristas.forEach(e => {
      const toca = e.a === cve || e.b === cve;
      e.linea.setStyle({ weight: toca ? 3.4 : e.cruza ? 2.2 : 1.1, opacity: toca ? 1 : cve ? 0.45 : 0.9,
        color: e.cruza ? COLOR.cruce : toca ? '#263238' : COLOR.arista });
      if (toca) e.linea.bringToFront();
    });
    Object.keys(nodos).forEach(c => nodos[c].marca.bringToFront());
  }

  function puntoColonia(cve) {
    const c = colonias[cve];
    if (!c) return null;
    if (c.punto === undefined) {
      if (typeof geometriasColonia[cve] === 'string') geometriasColonia[cve] = JSON.parse(geometriasColonia[cve]);
      c.punto = geometriasColonia[cve] ? centroide(geometriasColonia[cve]) : null;
    }
    return c.punto;
  }

  function limpiarVecindad() {
    ++turnoColonia;
    vecinasElegidas = [];
    capaVecindad.clearLayers();
    $('conexionesColonia').hidden = true;
    $('conexionesColonia').setAttribute('aria-busy', 'false');
    delete $('conexionesColonia').dataset.colonia;
    $('listaConexiones').innerHTML = '';
    $('verConexiones').disabled = true;
  }

  function limpiarInterior() {
    ++turnoDibujo;
    limpiarVecindad();
    capaInterior.clearLayers();
    lineasColonia.length = 0;
    Object.keys(marcasColonia).forEach(c => delete marcasColonia[c]);
    Object.keys(poligonosColonia).forEach(c => delete poligonosColonia[c]);
    $('interior').hidden = true;
    $('colonia').disabled = true;
  }

  function estilizarColonias(elegida, vecinas = []) {
    const conectadas = new Set(vecinas);
    const figuraColonia = document.documentElement.classList.contains('figura') && elegida;
    if (elegida) aristas.forEach(e => e.linea.setStyle({ opacity: figuraColonia ? 0 : 0.12, weight: 0.8 }));
    else resaltar(seleccion, vecinosActuales);
    if (figuraColonia) {
      /* The colony figure uses municipal outlines only as neutral geographical context. */
      Object.values(nodos).forEach(n => n.marca.setStyle({ opacity: 0, fillOpacity: 0 }));
      Object.values(poligonos).forEach(p => p.setStyle({ color: '#78909c', opacity: 0.35, fillOpacity: 0, weight: 0.7 }));
    }
    lineasColonia.forEach(linea => linea.setStyle({ opacity: figuraColonia ? 0 : elegida ? 0.12 : 0.65 }));
    Object.entries(marcasColonia).forEach(([cve, marca]) => {
      const propia = cve === elegida, vecina = conectadas.has(cve);
      const oculta = figuraColonia && !propia && !vecina;
      marca.setRadius(propia ? 7 : vecina ? 5.5 : 3.5);
      marca.setStyle({ fillColor: propia ? COLOR.sel : vecina ? COLOR.vecina : COLOR.colonia,
        opacity: oculta ? 0 : 1, fillOpacity: oculta ? 0 : propia || vecina || !elegida ? 1 : 0.28 });
      poligonosColonia[cve].setStyle({ color: propia ? COLOR.sel : vecina ? COLOR.vecina : COLOR.colonia,
        fillColor: propia ? COLOR.sel : vecina ? COLOR.vecina : COLOR.colonia,
        opacity: oculta ? 0 : 1, fillOpacity: oculta ? 0 : propia ? 0.2 : vecina ? 0.13 : 0.04,
        weight: propia || vecina ? 1.5 : 0.6 });
    });
  }

  function enfocarConexiones() {
    const puntos = [coloniaElegida, ...vecinasElegidas].map(puntoColonia).filter(Boolean);
    if (puntos.length) {
      const figura = document.documentElement.classList.contains('figura');
      const margen = figura ? document.querySelector('.zm-lateral').getBoundingClientRect().right + 18 : 42;
      mapa.fitBounds(L.latLngBounds(puntos), figura
        ? { paddingTopLeft: [margen, 28], paddingBottomRight: [28, 28], maxZoom: 15 }
        : { padding: [42, 42], maxZoom: 15 });
    }
  }

  async function irColonia(cve) {
    const colonia = colonias[cve];
    if (!colonia) return;
    if (colonia.municipio !== expandido) {
      const carga = seleccionar(colonia.municipio, true, false), turnoMunicipio = turnoRecorrido;
      await carga;
      if (turnoMunicipio !== turnoRecorrido) return;
    }
    await elegirColonia(cve);
  }

  async function elegirColonia(cve, enfocar = true) {
    const c = colonias[cve];
    if (!c || c.municipio !== expandido || !marcasColonia[cve]) return;
    limpiarVecindad();
    const mio = turnoColonia;
    coloniaElegida = cve;
    $('colonia').value = cve;
    estilizarColonias(cve);
    leyendaGrafo();
    $('conexionesColonia').hidden = false;
    $('conexionesColonia').setAttribute('aria-busy', 'true');
    $('conexionesTitulo').textContent = t('c.titulo', { n: c.nombre });
    $('estadoConexiones').textContent = t('c.cargando');
    const marca = marcasColonia[cve];
    marca.bringToFront();
    marca.bindPopup(`<b>${esc(c.nombre)}</b><br>${esc(nombres[c.municipio])}`
      + (c.poblacion == null ? '' : `<br>${esc(t('r.poblacion'))}: ${esc(fmt(c.poblacion, 0))}`));
    /* Figure views keep nearby nodes visible; the normal explorer shows the details. */
    if (!document.documentElement.classList.contains('figura')) marca.openPopup();
    try {
      let datos = conexionesCache.get(cve);
      if (!datos) {
        datos = await trabajar('neighbourhood', { cve });
        conexionesCache.set(cve, datos);
      }
      if (mio !== turnoColonia || cve !== coloniaElegida || c.municipio !== expandido) return;
      const orden = new Intl.Collator(loc()).compare;
      vecinasElegidas = datos.vecinas.filter(v => colonias[v])
        .sort((a, b) => orden(colonias[a].nombre, colonias[b].nombre));
      estilizarColonias(cve, vecinasElegidas);
      const punto = puntoColonia(cve);
      let faltan = 0;
      vecinasElegidas.forEach(vecina => {
        const destino = puntoColonia(vecina), info = colonias[vecina];
        if (!destino) { faltan++; return; }
        L.polyline([punto, destino], { renderer: lienzo, color: COLOR.conexion, weight: 3, opacity: 1, interactive: false })
          .addTo(capaVecindad);
        if (!marcasColonia[vecina]) {
          L.geoJSON(geometriasColonia[vecina], {
            style: { renderer: lienzo, color: COLOR.vecina, weight: 1.4, fillColor: COLOR.vecina, fillOpacity: 0.13 },
          }).on('click', () => irColonia(vecina)).addTo(capaVecindad);
          L.circleMarker(destino, { renderer: lienzo, radius: 5.5, color: '#fff', weight: 1,
            fillColor: COLOR.vecina, fillOpacity: 1 }).on('click', () => irColonia(vecina))
            .bindTooltip(esc(`${info.nombre} (${nombres[info.municipio]})`)).addTo(capaVecindad);
        }
      });
      vecinasElegidas.forEach(v => { if (marcasColonia[v]) marcasColonia[v].bringToFront(); });
      marca.bringToFront();
      capaDistancia.eachLayer(capa => { if (capa.bringToFront) capa.bringToFront(); });
      $('estadoConexiones').textContent = vecinasElegidas.length ? t('c.resumen', {
        n: fmt(vecinasElegidas.length, 0),
        e: fmt(vecinasElegidas.filter(v => colonias[v].municipio !== c.municipio).length, 0),
      }) : t('c.vacio');
      if (faltan) $('estadoConexiones').textContent += ' ' + t('c.faltan', { n: fmt(faltan, 0) });
      $('listaConexiones').innerHTML = vecinasElegidas.map(vecina => {
        const info = colonias[vecina];
        return `<li><button type="button" data-colonia="${esc(vecina)}">${esc(info.nombre)}</button>`
          + `<small>${esc(nombres[info.municipio])}</small></li>`;
      }).join('');
      $('conexionesColonia').dataset.colonia = cve;
      $('verConexiones').disabled = false;
      if (enfocar) enfocarConexiones();
    } catch (e) {
      if (mio === turnoColonia) $('estadoConexiones').textContent = t('c.error', { msg: e.message || e });
    } finally {
      if (mio === turnoColonia) $('conexionesColonia').setAttribute('aria-busy', 'false');
    }
  }

  async function pintarInterior() {
    limpiarInterior();
    const dibujo = turnoDibujo;
    leyendaGrafo();
    $('vistaMetropolitana').disabled = !expandido;
    if (!expandido) { $('estadoInterior').textContent = t('r.global'); return; }
    const todas = coloniasMunicipio[expandido] || [];
    const visibles = todas.filter(c => puntoColonia(c));
    const lineas = adyacenciasActuales.filter(([a, b]) => puntoColonia(a) && puntoColonia(b));
    $('estadoInterior').textContent = t(todas.length ? 'r.interior' : 'r.sinInterior', {
      n: nombres[expandido], c: fmt(todas.length, 0), a: fmt(adyacenciasActuales.length, 0),
    }) + (visibles.length < todas.length ? ' ' + t('r.sinGeometria', { n: fmt(todas.length - visibles.length, 0) }) : '');
    for (let i = 0; i < lineas.length; i++) {
      if (dibujo !== turnoDibujo) return;
      const [a, b] = lineas[i];
      const linea = L.polyline([puntoColonia(a), puntoColonia(b)], {
        renderer: lienzo, interactive: false, color: '#546e7a', weight: 1.1, opacity: 0.65,
      }).addTo(capaInterior);
      lineasColonia.push(linea);
      if (i && i % 200 === 0) await respirar();
    }
    for (let i = 0; i < visibles.length; i++) {
      if (dibujo !== turnoDibujo) return;
      const cve = visibles[i];
      const c = colonias[cve];
      poligonosColonia[cve] = L.geoJSON(geometriasColonia[cve], {
        style: { renderer: lienzo, color: COLOR.colonia, weight: 0.6, fillColor: COLOR.colonia, fillOpacity: 0.08 },
      }).on('click', () => elegirColonia(cve, false)).addTo(capaInterior);
      marcasColonia[cve] = L.circleMarker(puntoColonia(cve), {
        renderer: lienzo, radius: 3.5, color: '#fff', weight: 0.8, fillColor: COLOR.colonia, fillOpacity: 1,
      }).on('click', () => elegirColonia(cve, false)).bindTooltip(esc(c.nombre)).addTo(capaInterior);
      if (i && i % 30 === 0) await respirar();
    }
    if (dibujo !== turnoDibujo) return;
    /* Los puntos permanecen sobre los poligonos y las colindancias. */
    Object.values(marcasColonia).forEach(m => m.bringToFront());
    if (nodos[expandido]) nodos[expandido].marca.bringToFront();
    capaDistancia.eachLayer(capa => { if (capa.bringToFront) capa.bringToFront(); });
    $('interior').hidden = !todas.length;
    $('colonia').innerHTML = `<option value="">${esc(t('r.elegirColonia'))}</option>` + todas.map(cve =>
      `<option value="${esc(cve)}"${puntoColonia(cve) ? '' : ' disabled'}>${esc(colonias[cve].nombre)} (${esc(cve)})</option>`).join('');
    $('colonia').disabled = !visibles.length;
    if (coloniaElegida && marcasColonia[coloniaElegida]) await elegirColonia(coloniaElegida, false);
  }

  function vistaMetropolitana() {
    ++turnoRecorrido;
    seleccion = null;
    expandido = null;
    coloniaElegida = null;
    vecinosActuales = new Set();
    $('municipio').value = '';
    $('recorrido').innerHTML = '';
    $('recorrido').setAttribute('aria-busy', 'false');
    mapa.closePopup();
    pintarInterior();
    resaltar(seleccion, vecinosActuales);
    const puntos = Object.values(nodos).map(n => n.punto);
    if (puntos.length) mapa.fitBounds(L.latLngBounds(puntos), { padding: [24, 24] });
  }

  function opcionesMunicipios() {
    return Object.keys(nombres).sort((a, b) => nombres[a].localeCompare(nombres[b], loc())).map(cve =>
      `<option value="${esc(cve)}">${esc(nombres[cve])}</option>`).join('');
  }

  function opcionesDistancia(lado, anterior = '') {
    const municipio = $('distMunicipio' + lado).value;
    const sel = $('distNodo' + lado);
    sel.innerHTML = `<option value="">${esc(t('d.elegir'))}</option>`
      + `<optgroup label="${esc(t('d.municipio'))}"><option value="m:${esc(municipio)}">${esc(nombres[municipio])}</option></optgroup>`
      + `<optgroup label="${esc(t('d.colonias'))}">` + (coloniasMunicipio[municipio] || []).map(cve =>
        `<option value="c:${esc(cve)}"${puntoColonia(cve) ? '' : ' disabled'}>${esc(colonias[cve].nombre)} (${esc(cve)})</option>`).join('') + '</optgroup>';
    sel.value = anterior;
    sel.disabled = false;
  }

  function nodoDistancia(valor) {
    const [tipo, cve] = valor.split(':');
    if (tipo === 'm' && nodos[cve]) return { punto: nodos[cve].punto, nombre: nombres[cve] };
    if (tipo === 'c' && colonias[cve] && puntoColonia(cve)) return {
      punto: puntoColonia(cve), nombre: `${colonias[cve].nombre} (${nombres[colonias[cve].municipio]})`,
    };
    return null;
  }

  function pintarDistancia() {
    if (!capaDistancia) return;
    capaDistancia.clearLayers();
    const av = $('distNodoA').value, bv = $('distNodoB').value;
    const a = nodoDistancia(av), b = nodoDistancia(bv);
    $('verDistancia').disabled = !a || !b;
    $('limpiarDistancia').disabled = !av && !bv;
    if (!a || !b) {
      $('distanciaResultado').textContent = t(av && bv ? 'd.sinGeometria' : 'd.ayuda');
      return;
    }
    /* Leaflet usa la formula de Haversine y un radio terrestre de 6371000 m. */
    const metros = mapa.distance(a.punto, b.punto);
    const texto = t('d.resultado', { a: a.nombre, b: b.nombre,
      n: fmt(metros < 1000 ? metros : metros / 1000, metros < 1000 ? 0 : 2), u: metros < 1000 ? 'm' : 'km' });
    $('distanciaResultado').textContent = texto;
    L.polyline([a.punto, b.punto], { renderer: lienzo, color: COLOR.distancia, dashArray: '7 6', weight: 3, interactive: false })
      .addTo(capaDistancia);
    [a, b].forEach((n, i) => L.circleMarker(n.punto, {
      renderer: lienzo, radius: 7, color: COLOR.distancia, weight: 2, fillColor: '#fff', fillOpacity: 1,
    }).bindTooltip(`${esc(t(i ? 'd.destino' : 'd.origen'))}: ${esc(n.nombre)}`).addTo(capaDistancia));
  }

  function prepararDistancia() {
    ['A', 'B'].forEach(lado => {
      const sel = $('distMunicipio' + lado), anterior = sel.value;
      const nodo = $('distNodo' + lado).value;
      sel.innerHTML = opcionesMunicipios();
      sel.value = nombres[anterior] ? anterior : seleccion || INICIAL;
      sel.disabled = false;
      opcionesDistancia(lado, nodo);
    });
    pintarDistancia();
  }

  let turnoRecorrido = 0;
  async function seleccionar(cve, abrir = true, enfocar = true) {
    if (!motor || !nombres[cve]) return;
    const mio = ++turnoRecorrido;
    seleccion = cve;
    if (expandido !== cve) coloniaElegida = null;
    expandido = abrir ? cve : null;
    limpiarInterior();
    $('vistaMetropolitana').disabled = !expandido;
    $('estadoInterior').textContent = expandido ? t('r.cargandoInterior', { n: nombres[cve] }) : t('r.global');
    $('municipio').value = cve;
    $('recorrido').setAttribute('aria-busy', 'true');
    const qVecinos = `${PREFIJOS}SELECT ?vecino ?estado ?litros ?calidadVolumen ?cmPorAnio WHERE {
  mun:${cve} agua:sharesBoundaryWith ?v .
  ?v rdfs:label ?vecino ; agua:state ?estado ; agua:volumeQuality ?calidadVolumen .
  OPTIONAL { ?v agua:billedLitresPerDay ?litros }
  OPTIONAL { ?v agua:verticalLandMotion ?cmPorAnio }
} ORDER BY ?estado ?vecino`;
    const qAcuiferos = `${PREFIJOS}SELECT ?acuifero ?extraccionEntreRecarga (COUNT(?otro) AS ?municipios) WHERE {
  mun:${cve} agua:overliesAquifer ?a .
  ?a rdfs:label ?acuifero ; agua:extractionRechargeRatio ?extraccionEntreRecarga .
  ?otro agua:overliesAquifer ?a .
} GROUP BY ?acuifero ?extraccionEntreRecarga ORDER BY DESC(?extraccionEntreRecarga)`;
    const qColonias = `${PREFIJOS}SELECT ?colonia ?nombre ?poblacion WHERE {
  ?colonia a agua:Neighbourhood ; agua:inMunicipality mun:${cve} ; rdfs:label ?nombre .
  OPTIONAL { ?colonia agua:population ?poblacion }
} ORDER BY ?nombre`;
    const qAdyacencias = `${PREFIJOS}SELECT ?a ?b WHERE {
  ?a a agua:Neighbourhood ; agua:inMunicipality mun:${cve} ; geo:sfTouches ?b .
  ?b a agua:Neighbourhood ; agua:inMunicipality mun:${cve} .
  FILTER(STR(?a) < STR(?b))
}`;
    try {
    const datos = await trabajar('traverse', { cve, abrir });
    if (mio !== turnoRecorrido) return;
    const vecinos = bindings(datos.vecinos), acuiferos = bindings(datos.acuiferos);
    vecinosActuales = new Set(datos.propios);
    resaltar(cve, vecinosActuales);
    adyacenciasActuales = datos.adyacencias;
    consultaColonias = qColonias; consultaAdyacencias = qAdyacencias;
    await pintarInterior();
    if (mio !== turnoRecorrido) return;
    if (expandido && enfocar && poligonos[cve]) mapa.fitBounds(poligonos[cve].getBounds(), { padding: [24, 24], maxZoom: 13 });
    const n = esc(nombres[cve]);
    $('recorrido').innerHTML = `<h3 class="zm-det-t">${t('vecinos', { n })}</h3><div class="zm-tabla">${tabla(vecinos, qVecinos)}</div>
      <details><summary>${esc(t('versparql'))}</summary><pre class="zm-pre">${esc(qVecinos)}</pre></details>
      <h3 class="zm-det-t" style="margin-top:.8rem">${t('acuiferos', { n })}</h3><div class="zm-tabla">${tabla(acuiferos, qAcuiferos)}</div>
      <details><summary>${esc(t('versparql'))}</summary><pre class="zm-pre">${esc(qAcuiferos)}</pre></details>
      <details><summary>${esc(t('r.consultaColonias'))}</summary><pre class="zm-pre">${esc(consultaColonias + '\n\n' + consultaAdyacencias)}</pre></details>`;
    } catch (e) {
      if (mio !== turnoRecorrido) return;
      $('recorrido').innerHTML = `<p class="status show error" role="alert">${esc(t('r.error', { msg: e.message || e }))}</p>`;
      $('estadoInterior').textContent = '';
    } finally {
      if (mio === turnoRecorrido) $('recorrido').setAttribute('aria-busy', 'false');
    }
  }

  function leyendaGrafo() {
    const f = (c, k, cls) => `<div class="zm-ley"><i class="${cls}" style="${cls === 'linea' ? 'border-top-color' : 'background'}:${c}"></i>${esc(t(k))}</div>`;
    if (document.documentElement.classList.contains('figura') && coloniaElegida) {
      $('leyendaGrafo').innerHTML = `<p class="zm-ley-t">${esc(colonias[coloniaElegida].nombre)}</p>`
        + f(COLOR.sel, 'l.coloniaElegida', 'punto') + f(COLOR.vecina, 'l.coloniaVecina', 'punto')
        + f(COLOR.conexion, 'l.conexion', 'linea');
      return;
    }
    $('leyendaGrafo').innerHTML = f(COLOR.cdmx, 'l.cdmx', 'punto') + f(COLOR.zm, 'l.zm', 'punto') + f(COLOR.sel, 'l.sel', 'punto')
      + f(COLOR.arista, 'l.arista', 'linea') + f(COLOR.cruce, 'l.cruce', 'linea')
      + (expandido ? f(COLOR.colonia, 'l.colonia', 'punto') + f('#546e7a', 'l.colindancia', 'linea') : '')
      + (coloniaElegida ? f(COLOR.sel, 'l.coloniaElegida', 'punto') + f(COLOR.vecina, 'l.coloniaVecina', 'punto') + f(COLOR.conexion, 'l.conexion', 'linea') : '');
  }

  function pintarEjemplos() {
    $('ejemplos').innerHTML = '';
    ejemplos.forEach((e, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'zm-ejemplo';
      b.setAttribute('aria-pressed', String(i === actual));
      const [titulo, detalle] = e[idioma];
      b.innerHTML = `${esc(titulo)}<small>${esc(detalle)}</small>`;
      b.onclick = () => { actual = i; pintarEjemplos(); $('consulta').value = e.texto; ejecutar(); };
      $('ejemplos').appendChild(b);
    });
  }

  /* Solo se pinta la ultima consulta pedida: una lenta no debe pisar a la que vino despues */
  let turno = 0;
  async function ejecutar() {
    const mio = ++turno;
    consultaModificada = true;
    $('metrica').textContent = t('corriendo');
    $('salida').setAttribute('aria-busy', 'true');
    const t0 = performance.now();
    try {
      const texto = $('consulta').value;
      const filas = await consultar(texto, paso => {
        if (mio === turno) $('metrica').textContent = t(paso.phase === 'engine' ? 's.motor' : 'corriendo');
      });
      if (mio !== turno) return;
      ultima = { filas, texto, ms: Math.round(performance.now() - t0) };
      pintarSalida();
    } catch (e) {
      if (mio !== turno) return;
      ultima = null;
      $('metrica').textContent = '';
      $('salida').innerHTML = `<p class="status show error">${esc(e.message || e)}</p>`;
    } finally {
      if (mio === turno) $('salida').setAttribute('aria-busy', 'false');
    }
  }

  function pintarSalida() {
    if (!ultima) return;
    $('metrica').textContent = t(ultima.filas.length === 1 ? 'fila' : 'filas', { n: fmt(ultima.filas.length, 0), ms: fmt(ultima.ms, 0) });
    const sinVolumen = ejemplos.find(e => e.nombre === '02_sin_volumen_sobreexplotado.rq'
      && e.texto.trim() === ultima.texto.trim());
    if (sinVolumen) {
      const claves = new Set(ultima.filas.map(f => {
        const k = [...f.keys()].find(v => (typeof v === 'string' ? v : v.value) === 'claveMunicipal');
        return k ? f.get(k).value : null;
      }).filter(v => v != null));
      $('metrica').textContent = t('pares', { n: fmt(ultima.filas.length, 0), m: fmt(claves.size, 0), ms: fmt(ultima.ms, 0) });
    }
    $('salida').innerHTML = tabla(ultima.filas, ultima.texto);
  }

  function pintarHash() {
    if (resumen) $('origenHash').textContent = t('o.hash', { n: fmt(resumen.tripletas, 0), h: resumen.sha256.slice(0, 16) });
  }

  function traducir() {
    document.documentElement.lang = idioma;
    document.title = t('titulo');
    document.querySelectorAll('[data-t]').forEach(el => { el.textContent = t(el.dataset.t); });
    leyendaGrafo();
    pintarHash();
    if (ejemplos.length) pintarEjemplos();
    pintarSalida();
    if (faseCarga) mostrarFase(faseCarga);
    if (!ultima && motor && $('salida').getAttribute('aria-busy') !== 'true') $('salida').textContent = t('s.pendiente');
    if (motor) {
      const anterior = seleccion;
      $('municipio').innerHTML = `<option value="">${esc(t('r.elegirMunicipio'))}</option>` + opcionesMunicipios();
      $('municipio').value = anterior || '';
      if (anterior) seleccionar(anterior, Boolean(expandido), false);
      else pintarInterior();
      prepararDistancia();
    }
  }

  async function cargar() {
    const pedir = async (url, json) => {
      const r = await fetch(url, { cache: 'no-cache' });
      if (!r.ok) throw new Error(`${url}: HTTP ${r.status}`);
      return json ? r.json() : r.text();
    };
    const res = await pedir('ijcopi/datos/grafo.json', true);
    resumen = res;
    pintarHash();
    crearLector();
    /* Fetch the catalogue in parallel, but do not make map readiness depend on
       running any example query or loading the SPARQL engine. */
    const catalogo = Promise.all(res.consultas.map(async n => {
      const texto = await pedir(CONSULTAS + n, false);
      const lineas = texto.replace(/\r/g, '').split('\n');
      const linea = p => lineas.find(l => l.startsWith(`# ${p}: `)).slice(p.length + 4).split(' | ');
      return { nombre: n, es: linea('es'), en: linea('en'), texto: lineas.filter(l => !l.startsWith('# ')).join('\n') };
    })).then(valor => ({ valor }), error => ({ error }));
    const [geo, red] = await Promise.all([
      pedir('ijcopi/datos/12_geometrias.json', true),
      trabajar('init', { url: new URL('ijcopi/kg_zm.ttl', document.baseURI).href,
        expectedHash: res.sha256, expectedTriples: res.tripletas }, mostrarFase),
    ]);
    mostrarFase({ phase: 'geometry' });
    await respirar();
    const geometria = {};
    for (let i = 0; i < geo.filas.length; i++) {
      const [capa, cve, g] = geo.filas[i];
      if (capa === 'municipio') geometria[cve] = JSON.parse(g);
      /* Keep neighbourhood geometry encoded until its municipality is needed. */
      if (capa === 'colonia') geometriasColonia[cve] = g;
      if (i && i % 500 === 0) await respirar();
    }
    const municipios = bindings(red.municipios), vecinos = bindings(red.vecinos), internas = bindings(red.internas);
    internas.forEach(f => {
      const cve = clave(f.get('c').value), municipio = clave(f.get('m').value);
      colonias[cve] = { nombre: f.get('n').value, municipio, poblacion: f.get('p') ? Number(f.get('p').value) : null };
      if (!coloniasMunicipio[municipio]) coloniasMunicipio[municipio] = [];
      coloniasMunicipio[municipio].push(cve);
    });
    const orden = new Intl.Collator(loc()).compare;
    Object.values(coloniasMunicipio).forEach(lista => lista.sort((a, b) => orden(colonias[a].nombre, colonias[b].nombre)));
    mostrarFase({ phase: 'map' });
    await respirar();
    dibujarRed(geometria, municipios, vecinos);
    motor = true;
    $('municipio').innerHTML = `<option value="">${esc(t('r.elegirMunicipio'))}</option>` + opcionesMunicipios();
    $('municipio').disabled = false;
    $('municipio').addEventListener('change', e => e.target.value ? seleccionar(e.target.value) : vistaMetropolitana());
    const stats = red.stats;
    $('kTripletas').textContent = fmt(stats.tripletas, 0);
    $('kMunicipios').textContent = fmt(stats.municipios, 0);
    $('kFronteras').textContent = fmt(stats.fronteras, 0);
    $('kColonias').textContent = fmt(stats.colonias, 0);
    $('kVecinas').textContent = fmt(stats.vecinas, 0);
    $('consulta').value = PREFIJOS + 'SELECT ?clase (COUNT(?s) AS ?total) WHERE { ?s a ?clase } GROUP BY ?clase';
    $('salida').textContent = t('s.pendiente');
    $('ejecutar').disabled = false;
    $('ejecutar').onclick = ejecutar;
    $('consulta').addEventListener('keydown', e => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); ejecutar(); }
    });
    const pedido = q.get('mun'), pedidaColonia = q.get('col');
    const coloniaInicial = colonias[pedidaColonia] && colonias[pedidaColonia].municipio === pedido ? pedidaColonia : null;
    if (pedido && nombres[pedido] || q.get('vista') === 'figura') {
      const abrir = Boolean(pedido && nombres[pedido]) && (q.get('vista') !== 'figura' || Boolean(coloniaInicial));
      await seleccionar(pedido && nombres[pedido] ? pedido : INICIAL, abrir, false);
      if (coloniaInicial) await elegirColonia(coloniaInicial, false);
    } else pintarInterior();
    prepararDistancia();
    const puntos = Object.values(nodos).map(n => n.punto);
    if (coloniaElegida) enfocarConexiones();
    else if (expandido && poligonos[expandido]) mapa.fitBounds(poligonos[expandido].getBounds(), { padding: [24, 24], maxZoom: 13 });
    else if (puntos.length) mapa.fitBounds(L.latLngBounds(puntos), { padding: [24, 24] });
    /* The map is usable even if an optional example file cannot be fetched. */
    catalogo.then(({ valor, error }) => {
      if (error) { console.warn(error); return; }
      ejemplos = valor;
      pintarEjemplos();
      if (!consultaModificada && !ultima && document.activeElement !== $('consulta')) $('consulta').value = ejemplos[0].texto;
    });
  }

  async function iniciar() {
    if (q.get('vista') === 'figura') document.documentElement.classList.add('figura');
    if (window.I18N && idioma !== I18N.idioma) {
      /* ?lang= vale para esta visita: no cambia la preferencia guardada */
      let previa = null;
      try { previa = localStorage.getItem('dwagua-idioma'); } catch (e) { /* sin almacenamiento */ }
      I18N.set(idioma);
      try { if (previa === null) localStorage.removeItem('dwagua-idioma'); else localStorage.setItem('dwagua-idioma', previa); } catch (e) { /* sin almacenamiento */ }
    }
    traducir();
    const st = $('status');
    st.textContent = t('cargando');
    st.className = 'status show loading';
    mapa = L.map('map', { preferCanvas: true, zoomSnap: 0.25 }).setView([19.45, -99.1], 9.5);
    capaInterior = L.layerGroup().addTo(mapa);
    capaDistancia = L.layerGroup().addTo(mapa);
    capaVecindad = L.layerGroup().addTo(mapa);
    $('consulta').addEventListener('input', () => { consultaModificada = true; });
    $('vistaMetropolitana').addEventListener('click', vistaMetropolitana);
    $('colonia').addEventListener('change', e => {
      if (e.target.value) elegirColonia(e.target.value);
      else { coloniaElegida = null; limpiarVecindad(); estilizarColonias(null); leyendaGrafo(); mapa.closePopup(); }
    });
    $('listaConexiones').addEventListener('click', e => {
      const boton = e.target.closest('button[data-colonia]');
      if (boton) irColonia(boton.dataset.colonia);
    });
    $('verConexiones').addEventListener('click', enfocarConexiones);
    ['A', 'B'].forEach(lado => {
      $('distMunicipio' + lado).addEventListener('change', () => { opcionesDistancia(lado); pintarDistancia(); });
      $('distNodo' + lado).addEventListener('change', pintarDistancia);
    });
    $('limpiarDistancia').addEventListener('click', () => {
      $('distNodoA').value = ''; $('distNodoB').value = ''; pintarDistancia();
    });
    $('verDistancia').addEventListener('click', () => {
      const a = nodoDistancia($('distNodoA').value), b = nodoDistancia($('distNodoB').value);
      if (!a || !b) return;
      const limites = L.latLngBounds([a.punto, b.punto]);
      mapa.fitBounds(limites, { padding: [32, 32], maxZoom: 14 });
      $('map').scrollIntoView({ block: 'nearest' });
    });
    try { MapaTeselas.montar(mapa, { maxZoom: 19 }); } catch (e) { console.error(e); }
    try {
      await cargar();
      /* La region viva no debe quedarse diciendo «Analizando…» cuando ya termino */
      st.className = 'status';
      st.textContent = '';
      faseCarga = null;
    } catch (e) {
      console.error(e);
      faseCarga = null;
      st.className = 'status show error';
      st.innerHTML = `${esc(t('error', { msg: e.message || e }))} <button type="button" class="btn btn-secondary">${esc(idioma === 'en' ? 'Try again' : 'Volver a intentar')}</button>`;
      st.querySelector('button').addEventListener('click', () => location.reload());
    }
  }

  document.addEventListener('idiomacambiado', e => {
    idioma = (e.detail && e.detail.idioma) || idioma;
    traducir();
  });

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar);
  else iniciar();
})();
