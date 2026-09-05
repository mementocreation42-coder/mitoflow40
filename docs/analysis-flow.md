# 解析パイプライン全体像 — 受付から /r/<token> 公開まで

クライアント用レポート（例: https://mitoflow40.com/r/SbCtC5JII0uqihoUR4Bf44l ）ができるまでの流れ。
役者は 3 つ：**DaVinci24**（受付・読み取り）→ **blood-analysis**（解析・レポート生成）→ **Mitoflow40 Web**（公開・クライアントへの配信）。

```
[クライアント]                         [あなた＝解析者]                                        [クライアント]
① 決済（Stripe）
② あなたから案内メール（手動）
③ /counseling-sheet に回答＋血液票・Watch を添付 ──→ /admin/clients に届く
                                 ④ DaVinci24 Inbox「サイトの提出から取り込む」→ inputs/
                                 ⑤ 「DaVinci24 で ◯◯ を読んで」→ 読み取り・判定
                                 ⑥ 「そのまま解析して」→ client.html（クライアント用）/ analyst.md（あなた用）
                                 ⑦ 承認 → publish_report.sh → /r/<token> 公開＋顧客に自動紐付け ──→ マイページに表示
```

## ① 決済
- `/plans` → Stripe Checkout。注文は `/admin/clients` の顧客詳細に「ご契約・決済」として出る
- **決済後のクライアント向け自動メールは止めている**（`ORDER_CLIENT_EMAIL` 未設定＝オフ）。管理者への申込通知だけ届く

## ② 案内メール（あなたが送る）
- 申込通知を見て、あなたのメールで進め方と `/counseling-sheet` のリンクを送る
- `/checkout/success` と `/plans` の FAQ にも「担当者からご案内メールが届く」と書いてある

## ③ カウンセリングシート — クライアントが回答（血液・Watch も同じフォームで添付）
- `/counseling-sheet`：問診 8 ステップ＋添付は **「血液検査の結果」「Apple Watch・ウェアラブルの記録」の2枠**（PDF / PNG / JPG / HEIC）。枠で種類が確定するので Inbox の取り込みで迷わない。マイページの追記も同じ2枠
- 決済と同じメールなら自動で同じ顧客に紐付く。`/admin/clients` で確認できる

## ④ 集める — DaVinci24 Inbox（受付）
- `node .claude/skills/davinci24/scripts/inbox.mjs` → **http://localhost:2424**（ローカル専用・LLM不使用）
- 左の一覧に**クライアントが 1 人ずつ**並ぶ（カウンセリングシートを提出した人＋inputs/ に既にあるフォルダ）。要対応が上
- クライアントを選ぶと右に 1 画面：①性別・検査回 → ②**カウンセリングシート**（未取り込みの添付と問診。種類はプルダウンで直せる）→ ③**足りないデータを足す**（あとから届いた票や Watch の記録のドロップ、Mac 上（air など外付け含む）のフォルダ／ファイルの**パス**、電話などで聞き取った内容のテキスト）→ ④感覚メモ → ボタン 1 つ
  - `inputs/<氏名_日付>/` に meta.txt（氏名・**メール**・性別・年齢・主訴・clientId）、counseling.txt（問診回答＋聞き取りの追記）、blood*/device/、感覚メモ.txt が入る。追加は連番の続き・日時付き追記で、上書きしない
  - ターミナルなら `python3 .claude/skills/davinci24/scripts/dv.py prep <パス>` と同じ。Apple Health の export.xml は初回だけ索引化（360MB≈10秒）
- 「Claude Code に渡す」に「DaVinci24 で ◯◯ を読んで」の一文が出る。コピーして Claude Code に貼る

## ⑤ 読む — 「DaVinci24 で <氏名_日付> を読んで」
Claude 側は 3 手（`dv.py prep` → タイルを読んで extracted.json → `dv.py finish`）。途中報告は 1 行、質問は性別が不明なときだけ、最終報告は 1 回。
Claude Code が画像を直接読み（外部API不要）、`outputs/<氏名_日付>/` に：
- `report.md` … 血液 52 項目を Mitoflow 理想値で 🔴🟡🟢 判定（🟡=±10%以内の乖離）
- `blood_data.txt` … blood-analysis 互換の「項目: 値」
- `device_data.txt` … デバイスをカテゴリ軸（睡眠/自律神経/心肺/活動/血圧/体組成/血糖）で正規化。Apple Health は**検査日 −30〜+14 日**と**最新 30 日**の 2 窓を自動集計
- `counseling_data.txt` … 問診を Mitoflow フォーマット（lib/intake.ts 準拠）に正規化
- **`intake.md`** … 全ソース統合＋**三角測量の種**（あなたの感覚をデータが支持するか/矛盾するか）
ここで一度止まる。数値は原票と照合。

## ⑥ 解析 — 「そのまま解析して」→ blood-analysis スキル
- DaVinci24 が入力一式を `.claude/skills/blood-analysis/inputs/<氏名_日付>/` へ引き継ぎ
- blood-analysis が生成：
  - 解析者用 `analyst.md`（CORE PATTERN・8複合指標・三角測量）
  - クライアント用 `client.html`（インフォグラフィック）
- 断定しない・理想値のみ基準・医療行為ではない、のルールで書かれる

## ⑦-a 承認 — 必ず人間のレビューを挟む（自動では先に進まない）
- `client.html` をプレビューで確認、チェックリスト（数値照合・CORE PATTERN・Vol番号…）
- OK と言うまで公開されない。修正→再チェックのループ

## ⑦-b 公開 — /r/<token>（＋顧客管理へ自動紐付け）
- `./scripts/publish_report.sh <氏名_日付>`（blood-analysis 内）
  - 推測不能トークン24文字を発行 → `client.html` をアップロード
  - **クライアント用**: `https://mitoflow40.com/r/<token>`
  - **解析者用**: `https://mitoflow40.com/r/<解析者用の別token>/analyst`（クライアント用とは別トークン。クライアントには送らない）
- Notion DB（顧客ID/検査日/クラスタ/Vol/URL）に記録
- **顧客管理へ自動紐付け**：`scripts/link_report_to_client.mjs` が `inputs/<氏名_日付>/meta.txt` の「メール:」から clientId を算出し、クライアント用トークンを紐付ける（Inbox から取り込んだフォルダには自動でメールが入る）
  - 前提：`.env.local` に本番と同じ `INTAKE_LINK_SECRET`。無い場合はスキップして「手動で貼ってください」と出る（違う鍵で計算すると別人に紐付くため）

## ⑧ クライアントへ届く
- 紐付いた瞬間に、クライアントの**マイページ** `/counseling-sheet/my/<clientId>` に「解析結果ができました」カードが出る
- 手動で貼る場合は `/admin/clients` のクライアント詳細「解析レポート」欄にトークンを貼る
- 「できました」の連絡はあなたのメールで（自動送信はしていない）
- （決済は Stripe：単発 ¥19,800 / 月額 ¥9,900。注文は同じクライアント詳細に表示）

## 迷ったらこれだけ
1. 申込通知が来たら、あなたのメールで `/counseling-sheet` を案内
2. 提出が届いたら Inbox の「サイトの提出から取り込む」→ 感覚メモを書いて「追記する」
3. 「DaVinci24 で ◯◯ を読んで」→「そのまま解析して」
4. プレビューを見て「OK、公開して」→ 顧客に自動で紐付く（鍵が無ければトークンを手で貼る）
5. クライアントに「マイページで見られます」とメール

## 運用で踏む2つの穴と対処（2026-09-05 実装）

### 決済のメールとシートのメールが違う → 別人として並ぶ
紐付けは「同じメールアドレス（= clientId）」だけが頼り。Apple Pay の中継アドレス等でズレると、注文と票が別々の顧客になる。
- `/admin/clients` で「票 未提出」の顧客＝決済だけの人。その顧客詳細の「ご契約・決済」に **「この決済を既存のクライアントに付け替える」**（付け替え先を選ぶ）
- 逆に票がある顧客の詳細では **「別のメールで決済した注文を紐付ける（候補 n）」** に、決済だけの注文が候補で並ぶ（同じ名前は先頭に「同じ名前」バッジ）
- 実体は `lib/orders.ts` の `relinkOrder()`：注文を新しい clientId 配下へ移し、Stripe ID の逆引きも張り替える（以後の解約・返金 Webhook も新しい顧客に届く）。`relinkedFrom` に元の顧客IDが残る

### レポートの枠が1つ → 継続顧客の履歴が消える
`intake/_reports/<clientId>.json` は履歴（`history[]`）を持つ。`setClientReport()` は追加（同トークンは更新）、`removeClientReport()` で外す。
- 管理画面の「解析レポート」に全件（最新バッジ・ラベル・クライアント用／解析者用リンク・外す）
- マイページは最新を大きなカード、それ以前を「これまでの解析」として一覧
- `publish_report.sh` → `link_report_to_client.mjs <氏名_日付> <client_token> <analyst_token>` が「YYYY-MM-DD の解析」ラベルで履歴に追加
