#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""n=1 の週次データは SAL Health（SAL Studio/SAL Health）に独立した。ここは薄い入口。
  python3 .claude/skills/n1-journal/scripts/weekly.py                 → SAL Health の import（取り込み＋SAL OS 同期）
  python3 .claude/skills/n1-journal/scripts/weekly.py --week 2026-05-13 → その週の表を表示
"""
import subprocess, sys
from pathlib import Path

HEALTH = Path.home() / "Desktop" / "ScondBrain" / "SAL Studio" / "SAL Health"
if not (HEALTH / "app" / "cli.py").exists():
    sys.exit(f"SAL Health が見つかりません: {HEALTH}")
args = sys.argv[1:]
if args[:1] == ["--week"] and len(args) >= 2:
    cmd = ["table", args[1]]
elif args[:1] == ["--table"]:
    cmd = ["table"]
else:
    cmd = ["import"] + [a for a in args if not a.startswith("--")]
sys.exit(subprocess.call([sys.executable, "-m", "app.cli", *cmd], cwd=str(HEALTH)))
