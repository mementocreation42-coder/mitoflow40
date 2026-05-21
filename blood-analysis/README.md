# MitoFlow40 血液解析 Skill

精密栄養学視点で血液検査・カウンセリング・Apple Watchデータを統合解析する Claude Skill。

---

## 🚀 新規顧客の解析フロー（最短2ステップ）

### ステップ1. 入力を準備

```
blood-analysis/inputs/<氏名>_<検査日YYYYMMDD>/
├── meta.txt          ← 必須。氏名・カナ・性別・年齢・検査日
├── counseling.txt    ← 任意。問診シート回答
└── blood.jpg         ← 必須。血液検査画像（複数可: blood1.jpg, blood2.jpg...）
```

テンプレートは `inputs/_テンプレート_氏名_日付/` をコピーして使用。

Apple Watchデータも使う場合は `~/Desktop/apple_health_export/export.xml` を最新化。

### ステップ2. Claude に一言

```
田中花子_20260601 を解析して
```

これだけで以下が自動実行：

1. `analyze.sh` で出力フォルダ作成 + Apple Watch サマリ生成
2. 血液画像の OCR・問診・ライフデータを統合解析
3. `outputs/<氏名_日付>/` に生成:
   - `analyst.md` — 解析者用詳細レポート
   - `client.html` — お客様用インフォグラフィック
4. **Notion DB に解析者ページ作成**（Vol番号 自動連番）
5. **Vercel Blob に公開**:
   - お客様用URL: `https://mitoflow40.com/r/<token>`
   - 解析者用URL: `https://mitoflow40.com/r/<token>/analyst`
6. Notion ページに URL を書き戻し

完了後、Notionページ URL とお客様用URL を Claude が提示します。

---

## 公開だけ別途実行する場合

解析がすでに `outputs/` に完了している状態から再公開・新トークン発行：

```bash
./blood-analysis/scripts/publish_report.sh <氏名_日付>
```

または Claude に：

```
<氏名_日付> を公開して
```

---

## 環境設定（初回のみ）

プロジェクトルートに `.env.local`：

```
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_...
NEXT_PUBLIC_BLOB_BASE_URL=https://<store-hash>.public.blob.vercel-storage.com
```

Vercel側にも同じ環境変数を設定済みであること。

---

## ファイル構成

```
SKILL.md                            ← 解析手順・絶対ルール（Claude が参照）
README.md                           ← このファイル
reference/
  optimal_ranges_female.md          ← 精密栄養学の理想値（女性）
  optimal_ranges_male.md            ← 男性
  counseling_schema.md              ← カウンセリング項目マッピング
  interpretation_rules.md           ← 解析ロジック
  language_rules.md                 ← 断定しない・予測する 言葉づかいルール
templates/
  analyst_report.md                 ← 解析者用テンプレート
  client_report.html                ← お客様用 HTML テンプレート（モバイル対応）
  assets/                           ← イラスト・背景画像
scripts/
  analyze.sh                        ← 解析パイプライン補助
  html_to_pdf.sh                    ← HTML→PDF 変換
  summarize_apple_health.py         ← Apple Health export.xml 集計
  publish_report.sh                 ← Blob アップロード + URL 発行
  upload_to_blob.mjs                ← お客様用 HTML アップロード
  upload_analyst_to_blob.mjs        ← 解析者用 Markdown→HTML アップロード
inputs/
  _テンプレート_氏名_日付/         ← コピー元
  <氏名>_<検査日>/                 ← 顧客ごとに作る（個人情報のため gitignore）
outputs/
  <氏名>_<検査日>/                 ← 自動生成（gitignore）
examples/                           ← 良い解析例を蓄積
```

---

## 絶対ルール（SKILL.md 抜粋）

1. **断定しない、予測する** — 「〜の可能性」「〜のサイン」「〜という仮説」
2. **判定基準は精密栄養学の理想値のみ**（一般「基準値」は使わない）
3. **🟢🟡🔴** で理想値からの乖離度を表示
4. **三角測量** — 血液 × カウンセリング × Apple Watch の3ソースで仮説検証
5. **単時点評価**（v2フォーマット）— 経年比較は扱わない
6. **医療診断ではない** — 「栄養状態・体質傾向の読み取り」と表現
7. **氏名はレポートに使用**（外部公開時は要マスキング）

---

## Notion DB

📊 https://www.notion.so/49d0c0eac9254b58a0bba6b2098818c1

7プロパティ構成：
- 顧客ID（`氏名 / 解析日YYYY-MM-DD`）
- 血液検査日
- 主要クラスタ
- Vol（その人にとっての解析回数）
- お客様用URL
- 解析者用URL
- 作成日時

詳細所見・主訴・統合所見はページ本文 Markdown に格納（DBプロパティは最小化）。

---

## サイト上の動線

- お客様向け案内ページ: `/sample`（ヘッダー: SAMPLE ANALYSIS）
- レポート閲覧: `/r/<token>`（お客様用）/ `/r/<token>/analyst`（解析者用）
- 法的: `/terms` / `/privacy` / `/legal`
