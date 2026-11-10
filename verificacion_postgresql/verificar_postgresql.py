#!/usr/bin/env python3
"""Run the three pending checks against a live PostgreSQL warehouse, read only.

Standard library + Docker/psql for --container; psycopg2 is needed only for --dsn.
The result is written as JSON. Exit codes: 0=all pass, 1=mismatch, 2=not verified/error.
"""
from __future__ import annotations

import argparse
import datetime as dt
import decimal
import hashlib
import json
import os
from pathlib import Path
import subprocess
import sys


CORRELATION_SQL = """WITH x AS (
 SELECT a.ingreso_agua_pesos i, r.monto_agua_pesos s
 FROM fact_agua_municipio a
 JOIN fact_recaudacion_agua r ON r.cve_mun=a.cve_mun AND r.anio=a.anio
 JOIN dim_municipio m ON m.cve_mun=a.cve_mun
 WHERE a.anio=2018 AND m.cve_ent='15' AND a.ingreso_agua_pesos>0 AND r.monto_agua_pesos>0
), y AS (
 SELECT *,rank() OVER(ORDER BY i) ri,rank() OVER(ORDER BY s) rs,
 rank() OVER(ORDER BY i)+(count(*) OVER(PARTITION BY i)-1)/2.0 rai,
 rank() OVER(ORDER BY s)+(count(*) OVER(PARTITION BY s)-1)/2.0 ras FROM x
)
SELECT count(*) AS municipalities,corr(i,s) AS pearson,corr(ri,rs) AS spearman_repository,
 corr(rai,ras) AS spearman_average_ranks FROM y"""
CORRELATION_COLUMNS = ['municipalities', 'pearson', 'spearman_repository', 'spearman_average_ranks']
REPORTS_SQL = """SELECT count(*) AS all_reports,
 count(*) FILTER(WHERE tr.clasificacion='Agua Potable') AS potable_reports,
 count(*) FILTER(WHERE tr.clasificacion='Agua Potable' AND tr.reporte='Falta de agua') AS shortage_reports,
 count(*) FILTER(WHERE tr.clasificacion='Agua Potable' AND tr.reporte='Fuga') AS leak_reports
 FROM fact_reporte_agua r JOIN dim_tiempo t USING(id_tiempo)
 JOIN dim_tipo_reporte tr USING(id_tipo_reporte)
 WHERE t.fecha BETWEEN DATE '2019-01-01' AND DATE '2019-06-30'"""
REPORTS_COLUMNS = ['all_reports', 'potable_reports', 'shortage_reports', 'leak_reports']


def sha(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def plain(value):
    """Same scalar conversion as warehouse_ampliado/etl/exportar_mapa.py."""
    if isinstance(value, decimal.Decimal):
        return int(value) if value == value.to_integral_value() and abs(value) < 2**53 else float(value)
    if isinstance(value, (dt.date, dt.datetime)):
        return value.isoformat()
    return value


def canonical(columns, rows) -> bytes:
    return json.dumps({'columnas': columns, 'filas': rows}, ensure_ascii=False,
                      separators=(',', ':')).encode('utf-8')


def json_native(value):
    if isinstance(value, decimal.Decimal):
        return float(value)
    if isinstance(value, list):
        return [json_native(v) for v in value]
    if isinstance(value, dict):
        return {k: json_native(v) for k, v in value.items()}
    return value


def decode_cell(value, pg_type):
    if value is None:
        return None
    if pg_type in ('real', 'double precision'):
        return float(value)
    if pg_type in ('numeric', 'decimal'):
        return plain(decimal.Decimal(str(value)))
    if pg_type in ('json', 'jsonb'):
        return json_native(value)
    if pg_type == 'date':
        return dt.date.fromisoformat(value).isoformat()
    if pg_type.startswith('timestamp'):
        return dt.datetime.fromisoformat(value).isoformat()
    return plain(value)


def quoted_identifier(value):
    return '"' + value.replace('"', '""') + '"'


def row_wrapper(query):
    types = ','.join('pg_typeof(_result.' + quoted_identifier(c) + ')::text' for c in query['columns'])
    sql = query['sql'].strip().rstrip(';')
    return (f'WITH _result AS MATERIALIZED ({sql}) '
            f"SELECT json_build_object('types',json_build_array({types}),'row',row_to_json(_result)) FROM _result;")


def query_dsn(queries, dsn, timeout_ms):
    try:
        import psycopg2
    except ImportError as exc:
        raise RuntimeError('Install requirements.txt in your Python environment, or use --container.') from exc
    result = {}
    # The connection string is never included in the report or command output.
    with psycopg2.connect(dsn, connect_timeout=10) as conn:
        conn.set_session(readonly=True, isolation_level='REPEATABLE READ')
        try:
            with conn.cursor() as cur:
                cur.execute('SHOW transaction_read_only')
                if cur.fetchone()[0] != 'on':
                    raise RuntimeError('The transaction is not read only.')
                cur.execute('SET LOCAL statement_timeout=%s', (timeout_ms,))
                for item in queries:
                    cur.execute(item['sql'])
                    columns = [c.name for c in cur.description]
                    rows = [[plain(v) for v in row] for row in cur.fetchall()]
                    result[item['key']] = (columns, rows)
        finally:
            conn.rollback()
    return result


def query_container(queries, container, database, user, timeout_ms):
    script = ['BEGIN ISOLATION LEVEL REPEATABLE READ READ ONLY;',
              f'SET LOCAL statement_timeout={timeout_ms};',
              "SELECT CASE WHEN current_setting('transaction_read_only')='on' THEN '__READ_ONLY_OK__' ELSE '__NOT_READ_ONLY__' END;"]
    for i, item in enumerate(queries):
        script += [f'\\echo __CHECK_BEGIN_{i}__', row_wrapper(item), f'\\echo __CHECK_END_{i}__']
    script += ['ROLLBACK;']
    args = ['docker', 'exec', '-i', '-e', 'PGCLIENTENCODING=UTF8', container,
            'psql', '-X', '-w', '-qAt', '-v', 'ON_ERROR_STOP=1', '-U', user, '-d', database]
    process = subprocess.run(args, input='\n'.join(script)+'\n', capture_output=True,
                             text=True, encoding='utf-8', errors='replace',
                             timeout=max(60, (timeout_ms/1000)*len(queries)+30))
    if process.returncode:
        # Do not copy connection/environment details or raw server errors into a shareable report.
        raise RuntimeError('Docker/psql failed. Check container/database/user, warehouse schema and permissions; no check is certified.')
    lines = process.stdout.splitlines()
    if '__READ_ONLY_OK__' not in lines:
        raise RuntimeError('Could not confirm a read-only transaction.')
    result = {}
    for i, item in enumerate(queries):
        start, end = lines.index(f'__CHECK_BEGIN_{i}__'), lines.index(f'__CHECK_END_{i}__')
        columns, rows = None, []
        for line in lines[start+1:end]:
            if not line.strip():
                continue
            record = json.loads(line, parse_float=decimal.Decimal)
            names = list(record['row'])
            if columns is None:
                columns = names
            if names != columns:
                raise RuntimeError('Inconsistent result columns.')
            if names != item['columns']:
                raise RuntimeError('The live SQL columns differ from the manifest.')
            rows.append([decode_cell(record['row'][c], t) for c,t in zip(names,record['types'])])
        # All 15 reference exports are nonempty. Empty live results will fail their row/hash check.
        result[item['key']] = (columns if columns is not None else item['columns'], rows)
    return result


def load_queries(repo):
    sql_dir = repo/'warehouse_ampliado/consultas'
    data_dir = repo/'ijcopi/datos'
    manifest = json.loads((data_dir/'manifiesto.json').read_text(encoding='utf-8'))
    records = manifest['consultas']
    if len(records) != 15 or {p.name for p in sql_dir.glob('*.sql')} != {r['consulta'] for r in records}:
        raise RuntimeError('Expected the same 15 SQL files listed in the manifest.')
    queries = [{'key':'correlations', 'sql':CORRELATION_SQL, 'columns':CORRELATION_COLUMNS},
               {'key':'reports', 'sql':REPORTS_SQL, 'columns':REPORTS_COLUMNS}]
    for record in records:
        if Path(record['consulta']).name != record['consulta'] or Path(record['datos']).name != record['datos']:
            raise RuntimeError('Invalid manifest filename.')
        raw=(sql_dir/record['consulta']).read_bytes()
        if sha(raw.replace(b'\r\n', b'\n')) != record['sha256_consulta']:
            raise RuntimeError('SQL hash differs from the manifest: '+record['consulta'])
        if sha((data_dir/record['datos']).read_bytes()) != record['sha256_datos']:
            raise RuntimeError('Reference export hash differs from the manifest: '+record['datos'])
        queries.append({'key':record['consulta'], 'sql':raw.decode('utf-8'), 'columns':record['columnas']})
    return queries, records


def self_test():
    examples=[(decimal.Decimal('2.000'),'numeric',2), (decimal.Decimal('2.25'),'numeric',2.25),
              (1,'double precision',1.0), (None,'numeric',None),
              ({'x':decimal.Decimal('1.0'),'y':[2]},'jsonb',{'x':1.0,'y':[2]}),
              ('2019-01-01','date','2019-01-01')]
    for value, kind, expected in examples:
        assert decode_cell(value,kind)==expected
    assert isinstance(plain(decimal.Decimal(2**53-1)),int)
    assert isinstance(plain(decimal.Decimal(2**53)),float)
    assert isinstance(decode_cell(1,'double precision'),float)
    assert canonical(['n','f'],[[2,1.0]])==b'{"columnas":["n","f"],"filas":[[2,1.0]]}'
    print('PASS: local serialization tests only. No live PostgreSQL result is certified.')


def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--repo',type=Path,help='Root of the complete repository to verify.')
    connection=parser.add_mutually_exclusive_group()
    connection.add_argument('--container',help='Existing container holding the expanded warehouse.')
    connection.add_argument('--dsn',help='Connection string; prefer the DW_DSN environment variable.')
    parser.add_argument('--database',default='data_warehouse',help='Database for --container.')
    parser.add_argument('--user',default='postgres',help='Database role for --container.')
    parser.add_argument('--output',type=Path,default=Path('resultado_postgresql.json'))
    parser.add_argument('--statement-timeout-ms',type=int,default=300000)
    parser.add_argument('--self-test',action='store_true')
    args=parser.parse_args()
    if args.self_test:
        self_test();return 0
    if not args.repo or args.statement_timeout_ms<=0:
        parser.error('--repo and a positive timeout are required.')
    dsn=args.dsn or os.environ.get('DW_DSN')
    if not args.container and not dsn:
        parser.error('Choose --container or provide DW_DSN/--dsn. Credentials are not embedded.')
    report={'timestamp_utc':dt.datetime.now(dt.timezone.utc).isoformat(),
            'live_database_verified':False,'read_only':True,'status':'not_verified',
            'checks':{},'passed':False}
    exit_code=2
    try:
        repo=args.repo.expanduser().resolve()
        queries,records=load_queries(repo)
        results=(query_container(queries,args.container,args.database,args.user,args.statement_timeout_ms)
                 if args.container else query_dsn(queries,dsn,args.statement_timeout_ms))
        _,rows=results['correlations']
        n,pearson,spearman,average=rows[0]
        average_matches=average is not None and round(average,3)==0.934
        correlation_ok=(n==89 and pearson is not None and spearman is not None
                        and round(pearson,3)==0.322 and round(spearman,3)==0.934
                        and average_matches)
        report['checks']['correlations']={'municipalities':n,'pearson':pearson,'spearman_repository':spearman,
            'spearman_average_ranks':average,'average_ranks_match_paper':average_matches,
            'needs_review_of_paper_spearman':not average_matches,'passed':correlation_ok}
        _,rows=results['reports'];total,potable,shortages,leaks=rows[0]
        report['checks']['reports_2019_s1']={'all_reports':total,'potable_reports':potable,
            'shortage_reports':shortages,'leak_reports':leaks,
            'passed':(total,potable,shortages,leaks)==(39685,39685,39685,0)}
        exports=[]
        for record in records:
            columns,rows=results[record['consulta']]
            digest=sha(canonical(columns,rows))
            exports.append({'query':record['consulta'],'rows':len(rows),'sha256_live_result':digest,
                            'expected_sha256':record['sha256_datos'],
                            'passed':digest==record['sha256_datos'] and len(rows)==record['filas']})
        report['checks']['fifteen_sql_exports']={'queries':exports,'passed':all(r['passed'] for r in exports)}
        report['live_database_verified']=True
        report['passed']=all(c['passed'] for c in report['checks'].values())
        report['status']='pass' if report['passed'] else 'fail'
        exit_code=0 if report['passed'] else 1
    except Exception as exc:
        # Avoid secrets in operational errors; the exception category aids diagnosis.
        report['error_type']=type(exc).__name__
        report['error']=(str(exc) if isinstance(exc,RuntimeError) else
            'Verification could not finish; inspect repository files, database availability, schema, role and dependencies. No pass is certified.')
    args.output.parent.mkdir(parents=True,exist_ok=True)
    args.output.write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print(f"Status: {report['status']}; output: {args.output}")
    for name,check in report['checks'].items():
        print(f"{'PASS' if check['passed'] else 'FAIL'}: {name}")
    return exit_code


if __name__=='__main__':
    raise SystemExit(main())
