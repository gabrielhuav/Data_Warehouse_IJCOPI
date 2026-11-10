/* Regression check for the browser worker, using the shipped N3 parser and RDF.
   Run from any directory: node warehouse_ampliado/verificacion/test_grafo_carga.cjs
   No database, network, extra packages or generated files are required. */
'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { webcrypto } = require('node:crypto');
const root = path.resolve(__dirname, '../..');
const N3 = require(path.join(root, 'assets/vendor/n3-1.17.2.min.js'));
const source = fs.readFileSync(path.join(root, 'ijcopi/grafo-zm-worker.js'), 'utf8');
const turtle = fs.readFileSync(path.join(root, 'ijcopi/kg_zm.ttl'), 'utf8');
const summary = JSON.parse(fs.readFileSync(path.join(root, 'ijcopi/datos/grafo.json'), 'utf8'));

function reader(text) {
  const messages = [], imports = [];
  const context = { N3, TextEncoder, TextDecoder, crypto: webcrypto, setTimeout,
    self: {}, postMessage: message => messages.push(message),
    importScripts: url => imports.push(url),
    fetch: async () => ({ ok: true, arrayBuffer: async () => new TextEncoder().encode(text).buffer }) };
  vm.createContext(context); vm.runInContext(source, context);
  return { imports, async call(message) {
    await context.self.onmessage({ data: message });
    return JSON.parse(JSON.stringify(messages.findLast(m => m.id === message.id && !m.progress)));
  } };
}

(async () => {
  const worker = reader(turtle);
  const ready = await worker.call({ id: 1, type: 'init', expectedHash: summary.sha256, expectedTriples: summary.tripletas });
  assert.equal(ready.error, undefined);
  assert.deepEqual(ready.result.stats, { tripletas: 91230, municipios: 63, fronteras: 163, colonias: 5830, vecinas: 15510 });
  assert.equal(ready.result.internas.length, 5830);
  assert.deepEqual(worker.imports, ['../assets/vendor/n3-1.17.2.min.js'], 'Map readiness must not load the SPARQL engine');
  for (const [cve, colonies, adjacencies] of [['09007', 333, 795], ['15033', 490, 1371]]) {
    const traversal = await worker.call({ id: Number(cve), type: 'traverse', cve, abrir: true });
    assert.equal(traversal.error, undefined);
    const inside = new Set(ready.result.internas.filter(r => r.m.value.endsWith('/' + cve)).map(r => r.c.value.split('/').pop()));
    assert.equal(inside.size, colonies);
    assert.equal(traversal.result.adyacencias.length, adjacencies);
    assert(traversal.result.adyacencias.every(([a, b]) => inside.has(a) && inside.has(b) && a < b));
  }
  // One changed label preserves the triple count but must still fail integrity.
  const corrupted = reader(turtle.replace('Ecatepec de Morelos', 'Ecatepec altered'));
  const rejected = await corrupted.call({ id: 2, type: 'init', expectedHash: summary.sha256, expectedTriples: summary.tripletas });
  assert.match(rejected.error, /SHA-256 mismatch/);
  console.log('PASS: verified RDF, lazy SPARQL, two municipal traversals and corrupted-data rejection.');
})().catch(error => { console.error(error); process.exitCode = 1; });
