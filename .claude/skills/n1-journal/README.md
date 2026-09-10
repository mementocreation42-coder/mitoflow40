# n1-journal — n=1 ジャーナルの材料づくり

小林大介本人のデータ（n=1）から、ジャーナル記事の「今週の数字」を機械的に用意する。文章は書かない（体感は本人の言葉だけを使う）。

## 週次データ JSON（Apple Health のみ）
```
python3 .claude/skills/n1-journal/scripts/weekly.py                    # 直近の終わった週（月〜日）
python3 .claude/skills/n1-journal/scripts/weekly.py --week 2026-05-13  # その日を含む週
python3 .claude/skills/n1-journal/scripts/weekly.py --export <export.xml>
```
- 出力：`outputs/week_<開始日>.json`（日別・週平均・前週比・直前 4 週比・目につく変化）と `outputs/week_<開始日>.md`（記事に貼れる表）
- 索引は DaVinci24 の `dv.py`（`~/.cache/davinci24/`）を流用。export.xml は `~/Desktop/apple_health_export/` か外付け Works を探し、無ければ前回の索引を使う
- 数値は Apple Health にあるものだけ。無い日は数えない。「目につく変化」は直前 4 週平均との差が ±8% 以上のものを並べるだけで、良し悪しの判断はしない
- `outputs/` は個人データなので git に入れない（.gitignore 済み）

次の段階（未着手）：SKILL.md（記事の型と語り口、ライブラリの知見ページへのリンク規則）、WordPress への下書き投稿、SAL Prism の outbox からの橋、SAL OS の提案カード。
