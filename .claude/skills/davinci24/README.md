# DaVinci24

血液検査票・ヘルスケアデバイス全般（Watch/Oura/血圧計/CGM…）・カウンセリングシート・感覚メモを一つの入口で受け取り、Claude Code が読み取って構造化する内部エンジン。詳細は SKILL.md。

```
scripts/dv.py                  ← prep（取り込み・タイル・Apple Health 索引）／ finish（判定・デバイス要約・intake.md 骨組み）
scripts/inbox.mjs              ← node scripts/inbox.mjs → http://localhost:2424（受付 UI・サイト提出の取り込み・パス取り込み）
scripts/judge.ts               ← 判定単体（finish が呼ぶ）
inputs/<氏名_日付>/
  meta.txt / blood*.jpg / counseling.txt(or 画像/PDF/CSV) / device/（apple_health_index.json ほか） / 感覚メモ.txt
outputs/<氏名_日付>/
  tiles/                      ← Claude が読むタイル（全体＋四分割）
  extracted.json / judged.json / report.md / blood_data.txt / device_data.txt / counseling_data.txt
  intake.md                   ← 全ソース統合＝blood-analysis への引き継ぎ書
```

流れ：`dv.py prep <元データ>` → タイルを Read して extracted.json → `dv.py finish` → intake.md の空欄を埋めて報告。
