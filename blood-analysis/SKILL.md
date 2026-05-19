---
name: blood-analysis
description: MitoFlow40専用の血液検査・カウンセリング・Apple Watchデータを精密栄養学視点で統合解析し、解析者用詳細レポートとお客様用インフォグラフィックの2タイプを固定フォーマットで出力する。
---

# MitoFlow40 血液解析スキル

## 役割
MitoFlow40のカウンセラー（小林大介氏）の解析業務を支援する。血液検査画像・カウンセリングシート・Apple Watchデータを統合し、**精密栄養学の理想値**のみを基準に解析する。

## 絶対ルール

0. **断定しない、予測する**。これがこの解析の核。
   - 「〜である」「〜が原因」「〜と診断される」は使わない。
   - 代わりに「〜の可能性があります」「〜と読み取れます」「〜のサインかもしれません」「〜が予測されます」「〜という仮説が立てられます」を使う。
   - スコアや判定も「現時点での観測に基づく仮の見立て」であることを明示。次の検査・問診で更新される前提で書く。
   - お客様用・解析者用ともに、**「これは予測であり、確定ではない」**という姿勢を全文に通す。
   - 数値の解釈は複数の可能性を提示し、どれが妥当かは「次の検査と問診で確かめる」という形で開いたままにする。

1. **判定基準は `reference/optimal_ranges_*.md` のみ**。一般的な「基準値」「正常範囲」は一切参照しない。「基準値内だから正常」という表現を使わない。
2. **理想値からの距離で赤/黄/緑を判定**:
   - 🟢 緑 = 理想範囲内
   - 🟡 黄 = 理想範囲外だが乖離小（±10%以内）または境界付近
   - 🔴 赤 = 理想範囲から大きく乖離
3. **3ソース統合**:
   - 血液（客観・代謝）
   - カウンセリングシート（主観・生活）
   - Apple Watch（客観・自律神経/睡眠/活動）
   - 一致 → 確度高い仮説 / 矛盾 → 深掘り質問へ
4. **医療行為ではない**。「栄養状態・体質の傾向の目安」として表現する。診断・治療提案はしない。
5. **氏名はそのまま使う**。お客様用PDFのカバーに「For ◯◯様」、Notionの顧客ID欄も氏名で管理。MitoFlow40のパーソナルサービスとしての温度感を保つため。ただし外部公開（ブログ・SNS・第三者共有）の際は要マスキング。

## 入力 — ドロップフォルダ方式

ユーザーが「<氏名_日付> を解析して」（例: 「小林大介_20260518 を解析して」）と言ったら、以下のフォルダから自動で全入力を取得する。

### フォルダ構造
```
inputs/<氏名>_<検査日YYYYMMDD>/
├── meta.txt          ← 必須。氏名/カナ/性別/年齢/検査日 等
├── counseling.txt    ← 任意。Googleフォーム回答を貼る
├── blood*.{jpg,png}  ← 必須。複数可（blood.jpg, blood1.jpg, blood2.jpg等）
└── README.txt        ← 説明用、解析時は無視
```

### 自動取得手順
1. **`Bash`で `scripts/analyze.sh <フォルダ名>` を実行** — 出力フォルダ作成＋Apple Watchサマリ生成
2. **`Read` で順に取得**:
   - `inputs/<フォルダ>/meta.txt` → 氏名・性別・年齢・検査日
   - `inputs/<フォルダ>/counseling.txt` → 問診（あれば）
   - `inputs/<フォルダ>/blood*.{jpg,png}` → Vision で数値抽出
   - `outputs/<フォルダ>/watch_summary.md` → Apple Watch（あれば）

Apple Watch生XML（`~/Desktop/apple_health_export/export.xml`）は**絶対にReadしない**。必ずsummarize経由で。

## 処理手順

1. **画像から数値抽出** — 検査項目名・数値・単位を読み取る。読み取り信頼度が低い項目は明示。
2. **理想値テーブル参照** — 性別に応じて `reference/optimal_ranges_female.md` または `optimal_ranges_male.md` を `Read` で取得。
3. **項目ごとに信号判定** — 上記ルールに従う。
4. **カウンセリング・Apple Watchと突き合わせ** — `reference/interpretation_rules.md` の三角測量ロジックを適用。
5. **2タイプの出力を生成**:
   - **解析者用** = `templates/analyst_report.md` の構造でMarkdown生成 → `outputs/<氏名_日付>/analyst.md` に保存 → **Notion DBへpush**（Notion本文 = この Markdown）
     - DB URL: https://www.notion.so/49d0c0eac9254b58a0bba6b2098818c1
     - data_source_id: `f965b1a4-6f9b-4a25-8283-4ef6c032b889`
     - `mcp__notion__notion-create-pages` を使う
     - プロパティ「顧客ID」には **氏名_検査日**（例: `小林大介_20260518`）を入れる
     - **公開後**: `scripts/publish_report.sh` 実行後、同じ顧客IDのNotionページを `mcp__notion__notion-update-page` で更新し、`公開URL`（お客様用）/ `解析者URL`（解析者用Markdown→HTML）/ `公開日` を書き込む。これでNotion単体で公開状態を追える
   - **お客様用** = `templates/client_report.html` を `outputs/<氏名_日付>/client.html` にコピー → 値を流し込み（カバーの `For ◯◯様`, `Subject / Male, 45` 等を実データに置換）→ `scripts/html_to_pdf.sh outputs/<氏名_日付>/client.html outputs/<氏名_日付>/<氏名>_<検査日>_report.pdf` でPDF生成（自動オープン）
6. 完了後、Notionページ URL と PDFパスをユーザーに提示。

## 解釈の方向性 — 複合指標による系統的解析

### 個別項目ではなく「体のシステム」で見る
判定軸は以下の8つの**複合指標（Composite Axes）**で行う。個別項目をこれらの軸にマッピングしてからスコアリングする。

1. **Metabolism 糖代謝** — HbA1c, 血糖, インスリン, 1,5AG, 尿酸, 中性脂肪, 塩分
2. **Oxidation 酸化ストレス** — γ-GT(低), AST/ALT, HDL, ビリルビン, 喫煙/飲酒, 油の質
3. **Inflammation 炎症** — CRP, 好中球%, リンパ球%, フェリチン(高)
4. **Nutrition 栄養（材料）** — TP, ALB, γ-GT(低), Hb, RBC, MCV, BUN, タンパク摂取量
5. **Lipid 脂質** — LDL, HDL, L/H比, 中性脂肪
6. **Autonomic 自律神経** — コルチゾール, Na/K, 好酸球, リンパ球, HRV, 安静時心拍
7. **Sleep 睡眠** — 問診の睡眠5項目, Watchの深睡眠/REM/在床
8. **Activity 活動量** — 運動頻度, 歩数, 活動kcal, VO2max

### 線的解析を最重視
- 単時点の数値より、**「どの方向に動いているか」**を中心に語る。
- 経年データがあれば必ず時系列比較。基準値内でも方向性が悪ければ Critical 扱い。
- 中央値ど真ん中を「最適」、レンジ端は「やや乖離」として扱う。

### CORE PATTERN（中心テーマ）を必ず一つ抽出 — ただし「仮説」として
「単項目の異常リスト」ではなく、**「何が起点で、何に波及している可能性があるか」**を1〜2文で明示する。
書き方は必ず「〜という仮説」「〜の可能性が見えます」「〜という流れが予測されます」の形式で。
例: 「糖代謝の劣化を起点に、糖化＋酸化が進行している**可能性**がある」
例: 「副腎疲労を起点に、糖代謝の不安定化と免疫低下が連動している**ことが予測される**」
例: 「鉄欠乏が酸素運搬と甲状腺機能の両方を制限している**サインかもしれない**」

### 三角測量
- 血液 × 問診 × Apple Watch の3ソースで仮説を検証
- 3つ一致 → 強い疑い／2つ → 傾向あり／1つ → 単独所見
- 矛盾があれば「深掘り質問」として記録

## 出力時の注意
- 解析者用レポートには「お客様には伝えない仮説」セクションを設ける。
- お客様用は専門用語を日常語に翻訳（例：「フェリチン低値」→「体の鉄の貯金が少ない状態」）。
- 「次の一歩」は3つまで。多すぎると実行されない。
- **言葉づかいは出力前に必ず `reference/language_rules.md` でセルフチェック**。断定形が混入していたら全て予測形に書き換える。
- **日本語/英語の使い分け** — UIラベル・ピル・メタ情報は日本語を主役にする。`language_rules.md` の「バイリンガル表記の方針」を参照。

## お客様用レポート — 固定フォーマット（v2: 単時点評価版）

### 評価軸ルール（最重要）
- **単時点評価のみ**。複数時点の血液データがあっても、**最新の検査結果1点のみで評価**する。
- 経年比較・推移チャート・「5年前 → 今」のような表現は使わない。「動いてきた方向」ではなく「**現在値 vs 精密栄養学の理想値**」で語る。
- 過去データは、解析者用レポート（analyst.md）の参考情報としてのみ保持。お客様用には登場させない。

### 固定セクション構成（11ページ）
順序固定。追加・並べ替え禁止。情報量が多ければ意味のある単位で分割する（連番表記は不可）。

1. **Cover** — タイトル / カバー画像 / 検査日・解析日・対象（氏名 性別 年齢）/ Vol.番号
2. **Prologue** — はじめに（500字目安）。入力データ内訳 / 読み方の前提 / 「現在値 vs 理想値」軸の説明
3. **Blood Snapshot** — 血液データ一覧表（カテゴリ別: 糖代謝・尿酸 / 脂質 / 栄養・酸素運搬 / 腎機能・血圧・生活）。各行: 項目 / 現在値 / 理想値 / ミニレンジバー / 判定ピル
4. **System Balance** — 総合スコア（半円ゲージ・針なし・アーク上マーカー＋中央に大きく数字）＋ レーダーチャート（6軸）
5. **Composite Scores** — 8軸スコアバー（Metabolism/Oxidation/Nutrition/Autonomic/Inflammation/Lipid/Sleep/Activity）
6. **Core Pattern** — 中心テーマ1文 + 3ノードのフロー図（起点→中継→結果）+ 200-300字の補足
7. **Summary** — ヘッドライン（60字以内）＋ 物語ナラティブ（250-350字）。シグナルカウント（◯項目）は置かない
8. **Strengths** — 今、整っているところ（2-3項目、現在値で良好なもの）
9. **Critical Findings** — 注目したいポイント（理想から大きく乖離、🔴 注目）
10. **Watch Findings** — 経過観察ポイント（理想から小さく乖離、🟡 観察）
11. **Life Data** — Apple Watch サマリ（睡眠・HRV・歩数等）
12. **Your Story** — 物語化（4つの補助線。冒頭は「今回のデータから見えてくる4つの線」）
13. **Next Steps** — 食事 / 運動 / 生活 / サプリ の4列、各5〜7項目（合計でも実行可能な量に）

### 語彙ルール
- 「**仮の見立て**」を多用しない。文脈で言い換える:
  - Prologue 注記: 「データから読み取れる **予測**」
  - Disclaimer: 「栄養状態・体質傾向の **読み取り**」
  - ゲージ下: 「〜を軸にした **読み取り**」
  - スコア説明: 「体の系ごとの **現在地**」
- 断定回避は維持（「〜可能性」「〜サインかもしれません」「〜と読み取れます」）。

### Cover メタ表記
- `検査日 / YYYY.MM.DD　　解析日 / YYYY.MM.DD`（同じセルに2つ並べる）
- `対象 / 氏名 性別 年齢歳`
- `Vol. 001`

### イラスト配置の基本方針
- 各セクションに `.deco` イラストを1枚配置。多くは**セクション境界からはみ出す（見切れ）**配置で動きを出す。
- `section { overflow:hidden; }` を個別指定して見切れを実現。
- インラインスタイルで `width / opacity / bottom / right (or left) / transform` を上書き。bottom/right に**負の値**で見切れを作る。
- 典型: `width: 240-420px / opacity: 0.85-0.95 / bottom: -50 ~ -110px`。

### 画面とPDFの両立
- `@media screen` 内で section の `height` を auto / max-height: none / padding-top:70px / padding-bottom:140px に上書き（カバーは padding-top:90px / padding-bottom:120px）。
- PDF出力時は `1 section = A4 1ページ`（height: 297mm）が効くので、両立する。

## セクション別 文字数ガイドライン

| セクション | 文字数目安 | 役割 |
|---|---|---|
| **Prologue（はじめに）** | **500文字程度** | 入力データの内訳を簡潔に説明し、「現在値 vs 理想値」の読み方を伝える |
| Summary headline | 60字以内 | 一目で伝わる総合の見立て |
| Summary narrative | 250〜350字 | 中心テーマを物語として導入 |
| CORE PATTERN タイトル | 50字以内 | 中心テーマを1文で |
| CORE PATTERN note | 200〜300字 | フロー図の補足解説 |
| 各カテゴリ category-text | 150〜250字×段落 | 1項目あたり2段落まで |
| Your Story 各項目 | 80〜120字 | 4本の補助線、簡潔に |

Prologueの目安が500字に届かない場合は、入力データの種類（カウンセリング有無、Apple Watch有無）と読み方の前提を補足して厚みを出す。500字を大きく超えると本編の前にお腹いっぱいになるので注意。

## PDF ページレイアウトの原則

`templates/client_report.html` は **1セクション = 1ページ** で設計されている。以下を守る：

### CSS構造
- `section` は `height: 297mm; overflow: hidden; page-break-before/after: always`
- カード類（`.trend-card`、`.category`、`.step`、`.pattern-card`）に `page-break-inside: avoid`

### ページ追加が必要なケース
1セクションに情報が多すぎて1ページに収まらない場合は、**意味のある独立タイトルで別セクションに分割する**。`— 1/2` のような連番表記は使わない。

例:
- `System Balance` → `System Balance`（ゲージ＋レーダー） / `Composite Scores`（スコアバー） / `Core Pattern`（中心テーマ）
- `Findings` → `Critical Findings`（注目すべき所見） / `Watch Findings`（経過観察）
- `The Trend` → `The Trend`（推移チャート） / `What Improved`（改善した指標）

各ページは**それ単体で読んで意味が完結**するように見出しと内容を組む。

## お客様用レポート生成の手順

1. `cp templates/client_report.html outputs/<氏名_日付>/client.html`
2. `cp -r templates/assets outputs/<氏名_日付>/assets`
3. `Edit` で個別化（テンプレは小林大介サンプル相当の値が入っているので**全て書き換える**）:
   - cover-eyebrow: `〜 — For ◯◯ 様`
   - cover-meta: `検査日 / YYYY.MM.DD　　解析日 / YYYY.MM.DD`, `対象 / 氏名 性別 年齢歳`
   - **Blood Snapshot**: 4カテゴリの全行を実データで書き換え（現在値・理想値・ミニバー位置%・判定ピル色）
   - **System Balance**: 総合スコア数値、ゲージ上マーカー位置（score% から計算）、ヘッドライン、レーダー6軸ポリゴン頂点
   - **Composite Scores**: 8軸の値とバー幅%
   - **Core Pattern**: タイトル、3ノードの内容、補足200-300字
   - **Summary**: ヘッドライン60字、ナラティブ250-350字
   - **Strengths / Critical / Watch Findings**: 各カテゴリの値・narrative・range-meta
   - **Life Data**: Apple Watch 値・状態ラベル
   - **Your Story**: opener、4項目、closer
   - **Next Steps**: 食事/運動/生活/サプリ
4. **解析者用Markdown** を `outputs/<氏名_日付>/analyst.md` に保存（テンプレは `templates/analyst_report.md`）
5. PDFが要る場合: `./scripts/html_to_pdf.sh outputs/<氏名_日付>/client.html outputs/<氏名_日付>/<氏名>_<日付>_report.pdf`
6. **本番公開**: `./scripts/publish_report.sh <氏名_日付>`
   - `BLOB_READ_WRITE_TOKEN` が環境にあれば自動で Vercel Blob にアップロード
   - 出力された 公開URL（お客様用）/ 解析者URL を Notion ページの該当列に書き戻し（Claudeが mcp__notion__notion-update-page で実行）
