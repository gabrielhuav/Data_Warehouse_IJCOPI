window.__reviewWorkerFactory=function(self,postMessage,importScripts,fetch){
/* RDF and SPARQL stay off the UI thread. All traversal indexes come from the
   verified Turtle itself; no second set of scientific data is maintained. */
'use strict';

importScripts('../assets/vendor/n3-1.17.2.min.js');

const AGUA = 'https://w3id.org/cdmx/agua/';
const RDF = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type';
const LABEL = 'http://www.w3.org/2000/01/rdf-schema#label';
const TOUCHES = 'http://www.opengis.net/ont/geosparql#sfTouches';
const { namedNode, literal } = N3.DataFactory;
let store, engine, initialising;
const neighbourhoods = new Map(), municipalities = new Map(), neighbourhoodIris = new Map();

const node = value => namedNode(value);
const local = value => value.slice(value.lastIndexOf('/') + 1);
const terms = (subject, predicate) => store.getObjects(node(subject), node(predicate), null);
const first = (subject, predicate) => terms(subject, predicate)[0];
const serialiseTerm = term => term && ({ termType: term.termType, value: term.value });
const serialise = row => Object.fromEntries(Object.entries(row).filter(([, v]) => v).map(([k, v]) => [k, serialiseTerm(v)]));
const progress = (id, phase, extra = {}) => postMessage({ id, progress: { phase, ...extra } });
const tick = () => new Promise(resolve => setTimeout(resolve, 0));

/* Same decimal normalisation and sorted RDF-term fingerprint as materializar.py.
   grafo.json hashes the graph, not the bytes of its Turtle serialisation. */
function fingerprintTerm(term) {
  if (term.termType === 'NamedNode') return `<${term.value}>`;
  if (term.termType === 'BlankNode') return `_:${term.value}`;
  let value = term.value;
  if (term.datatype.value === 'http://www.w3.org/2001/XMLSchema#decimal') {
    value = value.replace(/^\+/, '').replace(/^(-?)0+(?=\d)/, '$1');
    if (value.startsWith('.')) value = '0' + value;
    if (value.startsWith('-.')) value = '-0' + value.slice(1);
    if (/^-?0+(?:\.0*)?$/.test(value)) value = '0.0';
    else { value = value.replace(/(\.\d*?)0+$/, '$1').replace(/\.$/, ''); if (!value.includes('.')) value += '.0'; }
  }
  const quoted = '"' + value.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n').replace(/\r/g, '\\r') + '"';
  return quoted + (term.language ? '@' + term.language : term.datatype.value === 'http://www.w3.org/2001/XMLSchema#string' ? '' : `^^<${term.datatype.value}>`);
}

async function initialise(message) {
  const { id, url, expectedHash, expectedTriples } = message;
  progress(id, 'download');
  const response = await fetch(url, { cache: 'no-cache' });
  if (!response.ok) throw new Error(`RDF: HTTP ${response.status}`);
  const bytes = await response.arrayBuffer();
  progress(id, 'parse', { mb: (bytes.byteLength / 1048576).toFixed(1) });
  /* The synchronous parser is efficient here: only the worker is occupied. */
  store = new N3.Store(new N3.Parser({ format: 'text/turtle' }).parse(new TextDecoder().decode(bytes)));
  if (store.size !== expectedTriples) throw new Error('RDF triple count differs from its manifest.');
  progress(id, 'verify');
  const canonical = store.getQuads(null, null, null, null)
    .map(quad => [quad.subject, quad.predicate, quad.object].map(fingerprintTerm).join(' ')).sort().join('\n');
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(canonical));
  const hash = Array.from(new Uint8Array(digest), b => b.toString(16).padStart(2, '0')).join('');
  if (hash !== expectedHash) throw new Error('RDF graph SHA-256 mismatch. Reload to fetch a consistent version.');
  progress(id, 'index', { triples: store.size });
  const municipalityRows = store.getSubjects(node(RDF), node(AGUA + 'Municipality'), null).map(subject => {
    const cve = local(subject.value);
    municipalities.set(cve, subject.value);
    return serialise({ m: subject, n: first(subject.value, LABEL) });
  });
  const boundaryRows = store.getQuads(null, node(AGUA + 'sharesBoundaryWith'), null, null)
    .map(quad => serialise({ a: quad.subject, b: quad.object }));
  const internalRows = [];
  const subjects = store.getSubjects(node(RDF), node(AGUA + 'Neighbourhood'), null);
  for (let i = 0; i < subjects.length; i++) {
    const subject = subjects[i], m = first(subject.value, AGUA + 'inMunicipality');
    if (!m) continue;
    const cve = local(m.value);
    neighbourhoodIris.set(local(subject.value), subject.value);
    if (!neighbourhoods.has(cve)) neighbourhoods.set(cve, []);
    neighbourhoods.get(cve).push(subject.value);
    internalRows.push(serialise({ c: subject, m, n: first(subject.value, LABEL), p: first(subject.value, AGUA + 'population') }));
    if (i && i % 1000 === 0) { progress(id, 'index', { current: i, total: subjects.length }); await tick(); }
  }
  return { municipios: municipalityRows, vecinos: boundaryRows, internas: internalRows,
    stats: { tripletas: store.size, municipios: municipalityRows.length, fronteras: boundaryRows.length / 2,
      colonias: subjects.length, vecinas: store.countQuads(null, node(TOUCHES), null, null) / 2 } };
}

function traverse({ cve, abrir }) {
  const iri = municipalities.get(cve);
  if (!iri) throw new Error('Unknown municipality.');
  const neighbours = terms(iri, AGUA + 'sharesBoundaryWith');
  const vecinos = neighbours.map(subject => ({ vecino: first(subject.value, LABEL), estado: first(subject.value, AGUA + 'state'),
    litros: first(subject.value, AGUA + 'billedLitresPerDay'), calidadVolumen: first(subject.value, AGUA + 'volumeQuality'),
    cmPorAnio: first(subject.value, AGUA + 'verticalLandMotion') }))
    .filter(row => row.vecino && row.estado && row.calidadVolumen)
    .sort((a, b) => a.estado.value.localeCompare(b.estado.value) || a.vecino.value.localeCompare(b.vecino.value)).map(serialise);
  const acuiferos = terms(iri, AGUA + 'overliesAquifer').map(subject => ({
    acuifero: first(subject.value, LABEL), extraccionEntreRecarga: first(subject.value, AGUA + 'extractionRechargeRatio'),
    municipios: literal(String(store.countQuads(null, node(AGUA + 'overliesAquifer'), subject, null))),
  })).filter(row => row.acuifero && row.extraccionEntreRecarga)
    .sort((a, b) => Number(b.extraccionEntreRecarga.value) - Number(a.extraccionEntreRecarga.value)).map(serialise);
  const adyacencias = [];
  if (abrir) {
    const internals = neighbourhoods.get(cve) || [], inside = new Set(internals);
    for (const a of internals) for (const b of terms(a, TOUCHES)) {
      if (a < b.value && inside.has(b.value)) adyacencias.push([local(a), local(b.value)]);
    }
  }
  return { vecinos, acuiferos, propios: neighbours.map(v => local(v.value)), adyacencias };
}

function neighbourhood({ cve }) {
  const iri = neighbourhoodIris.get(cve);
  if (!iri) throw new Error('Unknown neighbourhood.');
  /* sfTouches is symmetric. Read either asserted direction without inventing
     proximity links or restricting the result to the selected municipality. */
  const adjacent = new Set(terms(iri, TOUCHES).map(term => term.value));
  store.getSubjects(node(TOUCHES), node(iri), null).forEach(term => adjacent.add(term.value));
  const vecinas = [...adjacent].filter(value => value !== iri && neighbourhoodIris.has(local(value)))
    .map(local).sort();
  return { cve, vecinas };
}

self.onmessage = async event => {
  const message = event.data, { id, type } = message;
  try {
    let result;
    if (type === 'init') {
      if (!initialising) initialising = initialise(message);
      result = await initialising;
    } else {
      if (!store) throw new Error('The RDF graph is not ready.');
      if (type === 'traverse') result = traverse(message);
      else if (type === 'neighbourhood') result = neighbourhood(message);
      else if (type === 'query') {
        if (!engine) {
          progress(id, 'engine');
          importScripts('../assets/vendor/comunica-browser-v3.js');
          engine = new Comunica.QueryEngine();
        }
        progress(id, 'query');
        const stream = await engine.queryBindings(message.text, { sources: [store] });
        const rows = await stream.toArray();
        result = rows.map(binding => serialise(Object.fromEntries([...binding].map(([variable, term]) => [variable.value, term]))));
      } else throw new Error('Unknown graph operation.');
    }
    postMessage({ id, result });
  } catch (error) { postMessage({ id, error: error.message || String(error) }); }
};

};
