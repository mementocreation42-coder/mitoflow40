#!/usr/bin/env python3
"""knowledge/<dir> のファイルを、累計サイズ cap（bytes）で区切った「第 n 束」として標準出力に流す（通読用）。
   python3 scripts/batch.py <dir> <n> [cap=42000]   /  python3 scripts/batch.py <dir> plan"""
import sys, pathlib
root = pathlib.Path(__file__).resolve().parent.parent / 'knowledge'
d = sys.argv[1]; arg = sys.argv[2]; cap = int(sys.argv[3]) if len(sys.argv) > 3 else 42000
files = sorted((root / d).glob('*.md'))
batches, cur, size = [], [], 0
for f in files:
    s = f.stat().st_size
    if cur and size + s > cap:
        batches.append(cur); cur, size = [], 0
    cur.append(f); size += s
if cur: batches.append(cur)
if arg == 'plan':
    print(f'{d}: {len(files)} files → {len(batches)} batches (cap {cap})')
    for i, b in enumerate(batches): print(f'  {i}: {sum(x.stat().st_size for x in b)//1000}KB  ' + ', '.join(x.stem[:18] for x in b))
    sys.exit()
n = int(arg)
for f in batches[n]:
    print(f'\n===== {d}/{f.name} =====')
    print(f.read_text(encoding='utf-8'))
