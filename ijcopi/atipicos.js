/* Consumos atipicos en tres listas: exceso, deficit y colonias sin volumen facturado.

   Es el diseno que propone la seccion 5.6 del articulo. El ranking desplegado (assets/atipicos.js)
   ordena por A_g = |x - mu| / (sigma + eps); su top 15 global en estos datos solo incluye excesos.
   Esa observacion no implica que A_g sea incapaz de ordenar deficits con otros filtros. Aqui cada
   colonia se compara con su alcaldia en escala logaritmica (log-A_g) y se separa por direccion; las
   colonias sin volumen facturado no tienen logaritmo y van en su propia lista.

   Calcula sobre consumo.json, la misma exportacion del almacen que usa la demostracion, y repite
   los conteos de evaluacion-ml/ranking_real.py para que el lector compruebe que coinciden. */
(function () {
  'use strict';

  const EPS = 1e-9, TOPE = 15;
  const q = new URLSearchParams(location.search);

  /* Valores de evaluacion-ml/evidencia_ranking_real.txt: la pagina los recalcula y los compara */
  const ESPERADO = { colonias: 1553, ceros: 29, debajo: 1022, agTop15: 0, agTop47: 0, logTop15: 15, logTop47: 45,
    ag15: '3.85', log15: '2.89', cruce15: 0, cruce47: 2, maxDebajo: '1.46' };

  const ALCALDIAS = {
    'ALVARO OBREGON': 'Álvaro Obregón', 'AZCAPOTZALCO': 'Azcapotzalco', 'BENITO JUAREZ': 'Benito Juárez',
    'COYOACAN': 'Coyoacán', 'CUAJIMALPA DE MORELOS': 'Cuajimalpa de Morelos', 'CUAUHTEMOC': 'Cuauhtémoc',
    'GUSTAVO A. MADERO': 'Gustavo A. Madero', 'IZTACALCO': 'Iztacalco', 'IZTAPALAPA': 'Iztapalapa',
    'LA MAGDALENA CONTRERAS': 'La Magdalena Contreras', 'MAGDALENA CONTRERAS': 'La Magdalena Contreras',
    'MIGUEL HIDALGO': 'Miguel Hidalgo', 'MILPA ALTA': 'Milpa Alta', 'TLAHUAC': 'Tláhuac', 'TLALPAN': 'Tlalpan',
    'VENUSTIANO CARRANZA': 'Venustiano Carranza', 'XOCHIMILCO': 'Xochimilco',
  };
  const alcaldiaBonita = a => ALCALDIAS[a] || a;

  const TXT = {
    es: {
      titulo: 'Consumos atípicos en tres listas', eyebrow: 'Módulo de atípicos · IJCOPI',
      lema: 'El top 15 global de A_g no incluye colonias bajo la media en estos datos. Aquí cada colonia se compara con su alcaldía en escala logarítmica y se separan exceso, déficit y colonias sin volumen facturado, como se describe en la sección 5.6 del artículo.',
      'nav.mapa': 'Mapa', 'nav.grafo': 'Grafo', 'nav.consultas': 'Consultas al almacén', 'nav.atipicos': 'Atípicos',
      controles: 'Opciones de las listas', alcaldia: 'Alcaldía', todas: 'Todas', cuantas: 'Colonias por lista', descargar: 'Descargar CSV',
      todasAlc: 'Todas las alcaldías',
      aviso: 'Es una función de ordenamiento exploratoria, no un diagnóstico. Los valores son volumen facturado de enero a junio de 2019, no lecturas de medidor: un déficit o un cero pueden ser falta de registro o cuota fija tanto como bajo consumo.',
      'l.exceso': 'Exceso', 'l.exceso.ayuda': 'Colonias por encima del promedio logarítmico de su alcaldía, de mayor a menor log-A_g.',
      'l.deficit': 'Déficit', 'l.deficit.ayuda': 'Colonias por debajo del promedio logarítmico de su alcaldía, de mayor a menor log-A_g. Esta lista permite inspeccionarlas por separado de los excesos.',
      'l.cero': 'Sin volumen facturado', 'l.cero.ayuda': 'Colonias con volumen facturado cero en el semestre. No tienen logaritmo: se marcan aparte, porque pueden ser un hueco de datos tanto como ausencia de uso.',
      'c.n': '#', 'c.colonia': 'Colonia', 'c.alcaldia': 'Alcaldía', 'c.total': 'Facturado (m³)', 'c.log': 'log-A_g', 'c.ag': 'A_g desplegado', 'c.bim': 'Bimestres con registro',
      vacio: 'Ninguna colonia en esta lista.',
      'k.colonias': 'Colonias', 'k.ceros': 'Sin volumen facturado', 'k.ag': 'A_g desplegado: top 15 bajo la media', 'k.log': 'log-A_g: top 15 bajo la media',
      cargando: 'Cargando consumo.json…', error: 'No se pudieron cargar los datos: {msg}', reintentar: 'Volver a intentar',
      'v.titulo': 'Comprobación contra evaluacion-ml/ranking_real.py',
      'v.texto': 'La página repite en el navegador el cálculo del script de Python sobre la misma exportación y compara cada conteo con la evidencia publicada.',
      'v.colonias': 'Totales alcaldía–colonia', 'v.ceros': 'Colonias con total cero', 'v.debajo': 'Colonias bajo la media de su alcaldía',
      'v.agTop15': 'A_g desplegado, top 15 bajo la media', 'v.agTop47': 'A_g desplegado, top 47 bajo la media', 'v.ag15': 'A_g del lugar 15',
      'v.logTop15': 'log-A_g, top 15 bajo la media', 'v.logTop47': 'log-A_g, top 47 bajo la media', 'v.log15': 'log-A_g del lugar 15',
      'v.cruce15': 'Colonias comunes a los dos top 15', 'v.cruce47': 'Colonias comunes a los dos top 47', 'v.maxDebajo': 'A_g máximo bajo la media',
      esperado: 'esperado {v}',
    },
    en: {
      titulo: 'Atypical consumption in three lists', eyebrow: 'Atypical-consumption module · IJCOPI',
      lema: 'The global A_g top 15 contains no neighbourhoods below the mean in these data. Here each neighbourhood is compared with its borough on a logarithmic scale, and excess, deficit and neighbourhoods without billed volume are kept apart, as described in Section 5.6 of the article.',
      'nav.mapa': 'Map', 'nav.grafo': 'Graph', 'nav.consultas': 'Warehouse queries', 'nav.atipicos': 'Atypical',
      controles: 'List options', alcaldia: 'Borough', todas: 'All', cuantas: 'Neighbourhoods per list', descargar: 'Download CSV',
      todasAlc: 'All boroughs',
      aviso: 'This is an exploratory ranking function, not a diagnosis. Values are billed volumes for January to June 2019, not meter readings: a deficit or a zero may be missing records or a fixed fee as much as low use.',
      'l.exceso': 'Excess', 'l.exceso.ayuda': 'Neighbourhoods above the log mean of their borough, by decreasing log-A_g.',
      'l.deficit': 'Deficit', 'l.deficit.ayuda': 'Neighbourhoods below the log mean of their borough, by decreasing log-A_g. This list allows them to be inspected separately from excess.',
      'l.cero': 'No billed volume', 'l.cero.ayuda': 'Neighbourhoods with zero billed volume over the semester. They have no logarithm and are flagged apart, since they may be a data gap as much as an absence of use.',
      'c.n': '#', 'c.colonia': 'Neighbourhood', 'c.alcaldia': 'Borough', 'c.total': 'Billed (m³)', 'c.log': 'log-A_g', 'c.ag': 'Deployed A_g', 'c.bim': 'Bimesters with records',
      vacio: 'No neighbourhood in this list.',
      'k.colonias': 'Neighbourhoods', 'k.ceros': 'No billed volume', 'k.ag': 'Deployed A_g: top 15 below the mean', 'k.log': 'log-A_g: top 15 below the mean',
      cargando: 'Loading consumo.json…', error: 'The data could not be loaded: {msg}', reintentar: 'Try again',
      'v.titulo': 'Check against evaluacion-ml/ranking_real.py',
      'v.texto': 'The page repeats in the browser the computation of the Python script over the same export and compares every count with the published evidence.',
      'v.colonias': 'Borough–neighbourhood totals', 'v.ceros': 'Neighbourhoods with zero total', 'v.debajo': 'Neighbourhoods below their borough mean',
      'v.agTop15': 'Deployed A_g, top 15 below the mean', 'v.agTop47': 'Deployed A_g, top 47 below the mean', 'v.ag15': 'A_g of the 15th entry',
      'v.logTop15': 'log-A_g, top 15 below the mean', 'v.logTop47': 'log-A_g, top 47 below the mean', 'v.log15': 'log-A_g of the 15th entry',
      'v.cruce15': 'Neighbourhoods shared by the two top 15', 'v.cruce47': 'Neighbourhoods shared by the two top 47', 'v.maxDebajo': 'Highest A_g below the mean',
      esperado: 'expected {v}',
    },
  };

  let idioma = q.get('lang') === 'en' || q.get('lang') === 'es' ? q.get('lang') : (window.I18N ? I18N.idioma : 'es');
  const t = (k, v) => {
    const s = (TXT[idioma] && TXT[idioma][k]) || TXT.es[k] || k;
    return v ? s.replace(/\{(\w+)\}/g, (m, n) => (n in v ? v[n] : m)) : s;
  };
  const loc = () => (idioma === 'en' ? 'en-GB' : 'es-MX');
  const fmt = (n, d) => Number(n).toLocaleString(loc(), { minimumFractionDigits: d || 0, maximumFractionDigits: d || 0 });
  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const $ = id => document.getElementById(id);

  let unidades = null, verificacion = null, filtrosInicializados = false;

  const media = v => v.reduce((s, x) => s + x, 0) / v.length;
  const desv = v => { const m = media(v); return Math.sqrt(v.reduce((s, x) => s + (x - m) * (x - m), 0) / v.length); };

  /* Mismo calculo que ranking_real.py: totales por alcaldia--colonia, media y desviacion poblacional
     por alcaldia, y en logaritmos solo sobre las colonias con volumen */
  function calcular(filas) {
    const por = new Map();
    filas.forEach(r => {
      const k = r.alcaldia + '|' + r.colonia;
      if (!por.has(k)) por.set(k, { alcaldia: r.alcaldia, colonia: r.colonia, total: 0, bimestres: new Set() });
      const u = por.get(k);
      const v = Number(r.consumo_total);
      u.total += isFinite(v) ? v : 0;
      u.bimestres.add(r.bimestre);
    });
    const lista = [...por.values()].sort((a, b) => (a.alcaldia < b.alcaldia ? -1 : a.alcaldia > b.alcaldia ? 1
      : a.colonia < b.colonia ? -1 : a.colonia > b.colonia ? 1 : 0));
    const grupos = new Map();
    lista.forEach(u => { if (!grupos.has(u.alcaldia)) grupos.set(u.alcaldia, []); grupos.get(u.alcaldia).push(u); });
    grupos.forEach(g => {
      const tot = g.map(u => u.total), mu = media(tot), sd = desv(tot);
      const pos = g.filter(u => u.total > 0), lg = pos.map(u => Math.log(u.total));
      const muL = lg.length ? media(lg) : 0, sdL = lg.length ? desv(lg) : 0;
      g.forEach(u => {
        u.mu = mu;
        u.ag = Math.abs(u.total - mu) / (sd + EPS);
        u.debajo = u.total < mu;
        if (u.total > 0) {
          const d = Math.log(u.total) - muL;
          u.logAg = Math.abs(d) / (sdL + EPS);
          u.direccion = d > 0 ? 1 : d < 0 ? -1 : 0;
        } else {
          u.logAg = -Infinity;
          u.direccion = 0;
        }
      });
    });
    return lista;
  }

  /* Orden estable de mayor a menor, como el mergesort de pandas */
  const ordenar = (v, campo) => v.map((u, i) => [u, i]).sort((a, b) => (b[0][campo] - a[0][campo]) || (a[1] - b[1])).map(x => x[0]);

  function verificar(lista) {
    const n3 = Math.round(0.03 * lista.length);
    const porAg = ordenar(lista, 'ag'), porLog = ordenar(lista, 'logAg');
    const debajo = v => v.filter(u => u.debajo).length;
    const clave = u => u.alcaldia + '|' + u.colonia;
    const cruce = k => { const a = new Set(porAg.slice(0, k).map(clave)); return porLog.slice(0, k).filter(u => a.has(clave(u))).length; };
    const bajo = lista.filter(u => u.debajo);
    return {
      colonias: lista.length, ceros: lista.filter(u => u.total <= 0).length, debajo: bajo.length,
      agTop15: debajo(porAg.slice(0, TOPE)), agTop47: debajo(porAg.slice(0, n3)), ag15: porAg[TOPE - 1].ag.toFixed(2),
      logTop15: debajo(porLog.slice(0, TOPE)), logTop47: debajo(porLog.slice(0, n3)), log15: porLog[TOPE - 1].logAg.toFixed(2),
      cruce15: cruce(TOPE), cruce47: cruce(n3), maxDebajo: Math.max(...bajo.map(u => u.ag)).toFixed(2),
    };
  }

  function filtradas() {
    const alc = $('alcaldia').value;
    const base = alc ? unidades.filter(u => u.alcaldia === alc) : unidades;
    const n = Number($('cuantas').value);
    const corta = v => (n ? v.slice(0, n) : v);
    return {
      exceso: corta(ordenar(base.filter(u => u.direccion > 0), 'logAg')),
      deficit: corta(ordenar(base.filter(u => u.direccion < 0), 'logAg')),
      cero: corta(ordenar(base.filter(u => u.total <= 0), 'ag')),
    };
  }

  function tabla(v, cero) {
    if (!v.length) return `<p class="zm-meta">${esc(t('vacio'))}</p>`;
    const cab = cero
      ? ['c.n', 'c.colonia', 'c.alcaldia', 'c.bim', 'c.ag']
      : ['c.n', 'c.colonia', 'c.alcaldia', 'c.total', 'c.log', 'c.ag'];
    const num = k => ['c.n', 'c.total', 'c.log', 'c.ag', 'c.bim'].includes(k);
    return `<table><thead><tr>${cab.map(k => `<th scope="col"${num(k) ? ' class="num"' : ''}>${esc(t(k))}</th>`).join('')}</tr></thead><tbody>`
      + v.map((u, i) => `<tr><td class="num">${i + 1}</td><td class="colonia">${esc(u.colonia)}</td><td>${esc(alcaldiaBonita(u.alcaldia))}</td>`
        + (cero
          ? `<td class="num">${u.bimestres.size}</td><td class="num">${fmt(u.ag, 2)}</td>`
          : `<td class="num">${fmt(u.total, 0)}</td><td class="num">${fmt(u.logAg, 2)}</td><td class="num">${fmt(u.ag, 2)}</td>`)
        + '</tr>').join('') + '</tbody></table>';
  }

  function pintarListas() {
    if (!unidades) return;
    const l = filtradas();
    $('exceso').innerHTML = tabla(l.exceso);
    $('deficit').innerHTML = tabla(l.deficit);
    $('cero').innerHTML = tabla(l.cero, true);
    const p = new URLSearchParams(location.search);
    if ($('alcaldia').value) p.set('alcaldia', $('alcaldia').value); else p.delete('alcaldia');
    if ($('cuantas').value !== '15') p.set('n', $('cuantas').value); else p.delete('n');
    const s = p.toString();
    history.replaceState(null, '', location.pathname + (s ? '?' + s : ''));
  }

  function pintarResumen() {
    if (!verificacion) return;
    const v = verificacion;
    $('kpis').innerHTML = [
      ['k.colonias', fmt(v.colonias)], ['k.ceros', fmt(v.ceros)],
      ['k.ag', `${v.agTop15} / ${TOPE}`], ['k.log', `${v.logTop15} / ${TOPE}`],
    ].map(([k, n]) => `<div class="panel zm-kpi"><span>${esc(t(k))}</span><b>${esc(n)}</b></div>`).join('');
    $('verificacion').innerHTML = Object.keys(ESPERADO).map(k => {
      const ok = String(v[k]) === String(ESPERADO[k]);
      const valor = typeof v[k] === 'number' ? fmt(v[k]) : v[k];
      return `<li><span class="${ok ? 'at-ok' : 'at-mal'}" aria-hidden="true">${ok ? '✓' : '✗'}</span> ${esc(t('v.' + k))}: <b>${esc(valor)}</b>`
        + (ok ? '' : ` (${esc(t('esperado', { v: ESPERADO[k] }))})`) + '</li>';
    }).join('');
  }

  function opcionesAlcaldia() {
    const sel = $('alcaldia');
    /* La URL se aplica una vez al cargar los datos. Despues, '' es la eleccion valida «Todas»,
       no una razon para restaurar el filtro de la URL al cambiar de idioma. */
    const valor = filtrosInicializados ? sel.value : (q.get('alcaldia') || '');
    const alcs = unidades ? [...new Set(unidades.map(u => u.alcaldia))] : [];
    sel.innerHTML = `<option value="">${esc(t('todasAlc'))}</option>` + alcs
      .sort((a, b) => alcaldiaBonita(a).localeCompare(alcaldiaBonita(b), loc()))
      .map(a => `<option value="${esc(a)}">${esc(alcaldiaBonita(a))}</option>`).join('');
    sel.value = alcs.includes(valor) ? valor : '';
    if (unidades) filtrosInicializados = true;
  }

  function traducir() {
    document.documentElement.lang = idioma;
    document.title = t('titulo');
    document.querySelectorAll('[data-t]').forEach(el => { el.textContent = t(el.dataset.t); });
    opcionesAlcaldia();
    pintarResumen();
    pintarListas();
  }

  function descargar() {
    const l = filtradas();
    const filas = [['lista', 'rank', 'alcaldia', 'colonia', 'facturado_m3', 'log_A_g', 'A_g', 'bimestres_con_registro']];
    [['exceso', l.exceso], ['deficit', l.deficit], ['sin_volumen', l.cero]].forEach(([nombre, v]) => v.forEach((u, i) => filas.push(
      [nombre, i + 1, alcaldiaBonita(u.alcaldia), u.colonia, u.total.toFixed(2),
        isFinite(u.logAg) ? u.logAg.toFixed(4) : '', u.ag.toFixed(4), u.bimestres.size])));
    const csv = filas.map(f => f.map(x => /[",\n]/.test(String(x)) ? `"${String(x).replace(/"/g, '""')}"` : x).join(',')).join('\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' }));
    a.download = 'atipicos_tres_listas.csv';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }

  async function iniciar() {
    if (window.I18N && idioma !== I18N.idioma) {
      /* ?lang= vale para esta visita: no cambia la preferencia guardada */
      let previa = null;
      try { previa = localStorage.getItem('dwagua-idioma'); } catch (e) { /* sin almacenamiento */ }
      I18N.set(idioma);
      try { if (previa === null) localStorage.removeItem('dwagua-idioma'); else localStorage.setItem('dwagua-idioma', previa); } catch (e) { /* sin almacenamiento */ }
    }
    const n = q.get('n');
    if (['15', '47', '0'].includes(n)) $('cuantas').value = n;
    traducir();
    const st = $('status');
    st.className = 'status show loading';
    st.textContent = t('cargando');
    try {
      const r = await fetch('consumo.json');
      if (!r.ok) throw new Error(`consumo.json: HTTP ${r.status}`);
      const datos = await r.json();
      unidades = calcular(datos.consumo_colonia);
      verificacion = verificar(unidades);
    } catch (e) {
      console.error(e);
      st.className = 'status show error';
      st.innerHTML = `${esc(t('error', { msg: e.message || e }))} <button type="button" class="btn btn-secondary">${esc(t('reintentar'))}</button>`;
      st.querySelector('button').addEventListener('click', () => location.reload());
      return;
    }
    st.className = 'status';
    st.textContent = '';
    ['alcaldia', 'cuantas', 'descargar'].forEach(id => { $(id).disabled = false; });
    $('alcaldia').addEventListener('change', pintarListas);
    $('cuantas').addEventListener('change', pintarListas);
    $('descargar').addEventListener('click', descargar);
    traducir();
  }

  document.addEventListener('idiomacambiado', e => {
    idioma = (e.detail && e.detail.idioma) || idioma;
    traducir();
  });

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar);
  else iniciar();
})();
