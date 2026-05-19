# MitoFlow40 血液解析 Skill

精密栄養学視点で血液検査・カウンセリング・Apple Watchデータを統合解析するClaude Skill。

## クイックスタート

### 1. 入力を準備
```
inputs/小林大介_20260518/
├── meta.txt          ← 氏名・性別・年齢・検査日
├── counseling.txt    ← Googleフォーム回答（任意）
└── blood.jpg         ← 血液検査画像（複数可）
```

テンプレートは `inputs/_テンプレート_氏名_日付/` をコピーして使用。

### 2. Claude Code のチャットで一行
```
小林大介_20260518 を解析して
```

### 3. 自動的に
- 解析者用レポート → Notion DB に投稿
- お客様用PDF → `outputs/小林大介_20260518/小林大介_20260518_report.pdf` に生成・自動オープン

## ファイル構成
```
SKILL.md                            ← 解析手順・絶対ルール
reference/
  optimal_ranges_female.md          ← 神宮前クリニックの理想値（女性）
  optimal_ranges_male.md            ← 男性
  counseling_schema.md              ← カウンセリング項目マッピング
  interpretation_rules.md           ← クラスタリング・三角測量ロジック
  language_rules.md                 ← 断定しない・予測する 言葉づかいルール
templates/
  analyst_report.md                 ← 解析者用テンプレート
  client_report.html                ← お客様用HTMLテンプレート
  assets/                           ← イラスト・背景画像
scripts/
  analyze.sh                        ← 解析パイプライン補助
  html_to_pdf.sh                    ← HTML→PDF変換
  summarize_apple_health.py         ← Apple Health export.xml集計
inputs/
  _テンプレート_氏名_日付/         ← コピー元
  <氏名>_<検査日>/                 ← 顧客ごとに作る
outputs/
  <氏名>_<検査日>/                 ← 自動生成される
examples/                           ← 良い解析例を蓄積
```

## 絶対ルール（SKILL.md 抜粋）
0. **断定しない、予測する** — 「〜の可能性」「〜のサイン」「〜という仮説」
1. 判定基準は精密栄養学の理想値のみ
2. 信号機式（🟢🟡🔴）で乖離度を表示
3. 血液 × カウンセリング × Apple Watch の三角測量
4. 医療診断ではない
5. 氏名はレポートに使用（外部公開時は要マスキング）

## Notion DB
https://www.notion.so/49d0c0eac9254b58a0bba6b2098818c1
