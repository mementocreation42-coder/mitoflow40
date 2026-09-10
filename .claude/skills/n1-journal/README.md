# n1-journal — n=1 ジャーナルの材料（入口）

本人の Apple Health を週の数字にする仕組みは **SAL Health**（`~/Desktop/ScondBrain/SAL Studio/SAL Health`、画面 http://127.0.0.1:8767、スキル `health`）に独立した。
ここに残っているのは、その入口だけ。

```bash
python3 .claude/skills/n1-journal/scripts/weekly.py                  # 取り込み（SAL Health の import。SAL OS にも同期）
python3 .claude/skills/n1-journal/scripts/weekly.py --week 2026-05-13 # その週の「今週の数字」の表
```

- 出力の実体：`SAL Health/data/weeks.json`、`SAL Health/data/tables/week_<開始日>.md`
- SAL OS ダッシュボードの「からだ（n=1）」は `SAL OS/data/n1/weeks.json`（SAL Health が書く）を読む
- 記事の型・語り口・線引きは SAL Health の `skill/SKILL.md`（`~/.claude/skills/health/`）に集約

次の段階（未着手）：WordPress への下書き投稿、SAL Prism の inbox へ「Prism へ送る」、SAL OS の提案カード。
