"""Regenerate classic-script companions without changing scientific source files."""
from pathlib import Path
import json

ROOT = Path(__file__).resolve().parents[1]
for source in ROOT.rglob('*'):
    if not source.is_file() or '.git' in source.parts:
        continue
    if source.suffix.lower() not in {'.json', '.geojson', '.ttl', '.rq', '.sql'}:
        continue
    relative = source.relative_to(ROOT).as_posix()
    text = source.read_bytes().decode('utf-8')
    content = 'window.__reviewJsonpLoad__(' + json.dumps(relative) + ',' + json.dumps(text, ensure_ascii=True) + ');\n'
    source.with_name(source.name + '.jsonp.js').write_text(content, encoding='utf-8', newline='\n')
