# 解析パイプライン 接続チェックリスト

- 目的：決済 → 案内 → カウンセリング票 → 受付（DaVinci24）→ 読み取り・解析 → 公開 → マイページ、を実データで一周させる
- 方針：人の判断を挟む箇所（案内メール・解析の起動・公開前の承認）はそのまま残す（有機的に回す）
- 作成日：2026-09-05。全体像は `docs/analysis-flow.md`、各サービスの詳細は `payments-setup.md` / `newsletter-setup.md` / `counseling-sheet-production.md`
- 本番の管理画面が出す「要対応の設定」（`/admin`）、「セットアップ状態」（`/admin/orders`）、「稼働状態」（`/admin/newsletter`）が、そのまま進捗の答え合わせになる

---

## 0. 前提の確認（この Mac）

| 項目 | 状態 | 確認方法 |
|---|---|---|
| Node 22.6 以上（受付が `lib/intake.ts` を直接読むため） | ✅ v24.13.0 | `node --version` |
| Claude Code のスキル `davinci24` / `blood-analysis` | ✅ あり | `.claude/skills/` |
| HEIC → JPEG 変換（macOS の sips） | ✅ macOS 標準 | — |
| 受付サーバーの起動 | ✅ 起動済み（PID は都度変わる） | `node .claude/skills/davinci24/scripts/inbox.mjs` → http://localhost:2424 |
| プロジェクト直下の `.env.local` | ❌ 無い | 下記 1 で作る |

## 1. `.env.local` を作る（この Mac・1 回だけ）

受付と公開スクリプトが Vercel Blob と顧客管理に触るための鍵。**Vercel と同じ値**であること（`INTAKE_LINK_SECRET` が違うと別人に紐付く）。

```
BLOB_READ_WRITE_TOKEN=   # Vercel → Storage → Blob → Tokens
INTAKE_LINK_SECRET=      # Vercel → Settings → Environment Variables と同じ値
ADMIN_PASSWORD=          # 任意。無ければローカルは preview
WP_APP_USERNAME=         # 任意。ローカルで記事の作成・下書き読み込みを試すとき
WP_APP_PASSWORD=         # 同上（WordPress のアプリケーションパスワード）
```

- [ ] 作成した（`.gitignore` の `.env*` で除外されるのでコミットされない）
- [ ] 受付サーバーと `npm run dev` を再起動した
- [ ] http://localhost:2424 の一覧に「サイトの提出」が並ぶ（エラー文 `.env.local に BLOB_READ_WRITE_TOKEN がありません` が消える）

## 2. Vercel の環境変数（本番）

`/admin` の「要対応の設定」が空になるまで埋める。設定後は **Redeploy**（料金ページなど静的生成ページはビルド時に判定が焼き込まれる）。

| 変数 | 役割 | 必須 |
|---|---|---|
| `ADMIN_PASSWORD` | 管理画面ログイン | ◎（無いと本番は誰も入れない） |
| `BLOB_READ_WRITE_TOKEN` | 票・注文・購読者・レポートの保存 | ◎ |
| `INTAKE_LINK_SECRET` | マイページ URL と顧客 ID の鍵 | ◎ |
| `NEXT_PUBLIC_BLOB_BASE_URL` | `/r/<token>` がレポートを Blob から読む | ◎（例 `https://<store>.public.blob.vercel-storage.com`） |
| `RESEND_API_KEY` | 受付確認・通知・確認メール | ◎ |
| `CONTACT_EMAIL` / `INTAKE_NOTIFY_EMAIL` / `ORDER_NOTIFY_EMAIL` | 通知の宛先（未設定は info@mitoflow40.com） | ○ |
| `STRIPE_SECRET_KEY` / `STRIPE_WEBHOOK_SECRET` | 決済と注文記録 | ◎ |
| `WP_APP_USERNAME` / `WP_APP_PASSWORD` | 記事の作成・編集・削除・下書き一覧・メディア | ◎（CMS を使うなら） |
| `CRON_SECRET` | 毎日 03:00 JST の自動バックアップ（`vercel.json`） | ○ |
| `NEXT_PUBLIC_SITE_URL` | メール内リンクの絶対 URL | △（既定 mitoflow40.com） |
| `NEWSLETTER_SECRET` / `NEWSLETTER_FROM` / `NEWSLETTER_REPLY_TO` / `NEWSLETTER_SEGMENT_ID` | レター。未設定は `INTAKE_LINK_SECRET` 流用・既定値 | △ |
| `ORDER_CLIENT_EMAIL=on` | 決済直後の本人向け自動メールを**復活**させる | ✕（いまは手動案内の設計なので付けない） |
| `ANTHROPIC_API_KEY` / `NOTION_API_KEY` | セルフチェック `/check` の生成と匿名統計 | △（解析パイプラインには不要） |

- [ ] すべて **Production** にチェックが入っている（Preview だけになっていない）
- [ ] 値の前後に空白・全角が無い（WordPress のアプリパスワードは半角スペース込みでそのまま）
- [ ] Redeploy した
- [ ] `/admin` の「要対応の設定」パネルが消えた

## 3. 接続ポイントごとの疎通確認（流れの順）

### ① 決済 → 注文記録 → あなたへの通知
- [ ] Stripe：Webhook エンドポイント `https://mitoflow40.com/api/webhooks/stripe` を登録（6 イベント。テスト／本番で別登録）
- [ ] Stripe：顧客ポータルを有効化（マイページの「お支払い情報を管理」が使う）
- [ ] `/admin/orders` の「セットアップ状態」が全部 OK、「Stripe に商品を作成する」を 1 回押して 2 プランが「登録済み」
- [ ] テストモードのカードで `/plans` から申し込み → `/admin/orders` に注文が出る → 申込通知メールが届く

### ② 案内メール（手動・設計どおり）
- [ ] 顧客詳細（`/admin/clients/client/<id>`）の「✉ 案内メールを書く」で下書きが開き、文面がいまの運用に合っている

### ③ カウンセリング票 → 顧客に合流
- [ ] 自分のメールで `/counseling-sheet` を提出 → 受付確認メール（マイページ URL 入り）が届く → `/admin/clients` に出る
- [ ] ①と同じメールで提出すると同じ顧客にまとまる（違うメールだと別人になる → 顧客詳細の「付け替え」で直せることを確認）

### ④ 受付（DaVinci24）で取り込む
- [ ] 管理画面ヘッダー「DaVinci24 ↗」に「（停止中）」が出ていない
- [ ] 受付の一覧に③の提出が出て、決済状況（プラン名）も付いている
- [ ] 「取り込む」→ `.claude/skills/davinci24/inputs/<氏名_日付>/` に `meta.txt`（**メール:** 行が要る。⑥の自動紐付けが読む）・添付・`counseling.txt` ができる
- [ ] 受付の「管理画面へ戻る」リンク先が、いま使っている管理画面（本番 or localhost）になっている

### ⑤ 読み取り → 解析（Claude Code・手動起動＝設計どおり）
- [ ] 受付の「Claude Code に渡す」の文をコピーして貼る →「DaVinci24 で ◯◯ を読んで」→ `outputs/<氏名_日付>/report.md` など
- [ ] 「そのまま解析して」→ `blood-analysis/outputs/<氏名_日付>/client.html` と `analyst.md`
- [ ] `client.html` をプレビューで確認し、数値照合のチェックリストを通す（承認前は公開されない）

### ⑥ 公開 → 自動紐付け → マイページ
- [ ] 公開スクリプトは `.env.local` を**自分では読まない**ので、シェルに読み込んでから実行する：

```bash
set -a; source .env.local; set +a
.claude/skills/blood-analysis/scripts/publish_report.sh <氏名_日付>
```

- [ ] 出力に `🔗 顧客管理に紐付けました` が出る（`⏭ スキップ` が出たら理由がその行に書いてある。手動なら顧客詳細にトークンを貼る）
- [ ] `https://mitoflow40.com/r/<token>` が開く（`NEXT_PUBLIC_BLOB_BASE_URL` が無いと本番では開かない）
- [ ] 本人のマイページに「解析結果ができました」カードが出る
- [ ] **本人への通知メールは自動では飛ばない**。マイページ URL を添えて自分で知らせる
- [ ] 顧客詳細で対応ステータスを「完了」にする（自動では変わらない）

### ⑦ 運用の下地
- [ ] 自動バックアップが動いている（Vercel → Cron のログ、または Blob の `intake/_backups/` に日付ファイル）
- [ ] プライバシーポリシー改訂（`docs/privacy-counseling-draft.md`。要法務確認）と、票の保管期間の決定（`counseling-sheet-production.md` 3 章）

## 4. あとから足してもよいもの（いまは手動でよい）

- 公開時に本人へ「解析結果ができました」メールを自動送信（Resend）
- 取り込み時に「解析中」、公開時に「完了」へステータスを自動更新
- `.env.example` を置く（`docs` が参照しているが実体が無い。`.gitignore` に `!.env.example` を足す必要あり）
- 受付を常駐化する（ログイン時に自動起動）。いまはターミナルで手動起動

## 5. 今日の時点で確かめられたこと・確かめられていないこと

- 確かめた：ローカルのログイン（`preview`）、受付サーバーの起動と応答、`.env.local` 不在によるエラー文、Node のバージョン、コード上の導線（①〜⑥の各関数がつながっていること）
- 確かめていない：本番の環境変数の設定状況（ブラウザの管理画面セッションが切れていたため）。`/admin` `/admin/orders` `/admin/newsletter` の各パネルで確認する
