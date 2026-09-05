# オンライン決済（Stripe）— セットアップと運用

- 対象：血液検査解析プラン（単発 ¥19,800）／ミトフロープラン（月額 ¥9,900）
- 方式：Stripe Checkout（ホスト型）。カード情報は当サイトのサーバーを通らない
- 注文記録：Vercel Blob `orders/<clientId>/…`（カウンセリング票と同じ clientId = メールの HMAC で紐付く）
- 作成日：2026-08-21

## 1. しくみ（全体像）

```
/plans or トップの PRICE
  → [申し込む] → POST /api/checkout → Stripe Checkout（決済画面）
  → 成功 → /checkout/success（表示だけ。ここでは何も確定しない）
  → Stripe → POST /api/webhooks/stripe（署名検証）
        → orders/ に記録 → 管理者通知メール（本人向け自動メールは既定オフ。解析者が手動でご案内）
  → 本人が同じメールで /counseling-sheet を提出 → 管理画面のクライアント詳細に「ご契約・決済」が出る
  → 解析 → /r/<token> を紐付け → マイページで閲覧
```

- プラン・価格の定義：`lib/products.ts`（**唯一の定義**。ここを直すと料金ページ・決済・管理画面すべてに反映）
- 決済開始：`app/api/checkout/route.ts`
- 確定処理：`app/api/webhooks/stripe/route.ts`
- 注文ストレージ：`lib/orders.ts`
- 料金ページ：`app/plans/page.tsx`（共通部品 `components/Pricing.tsx` はトップページと共用）
- マイページ「ご契約・お支払い」：`app/counseling-sheet/my/[clientId]/page.tsx`
- 管理画面：`/admin/orders`（セットアップ状態・商品同期・注文一覧）、クライアント詳細の「ご契約・決済」パネル

## 2. Stripe ダッシュボード側でやること（1回だけ）

### 2-1. アカウント
- [ ] 本人確認・口座登録を完了し、**本番決済を有効化**（テストモードだけなら未完了でも動く）
- [ ] 設定 → ブランディング：ロゴ・色（Checkout 画面に反映）
- [ ] 設定 → 公開情報：サポートメール `info@mitoflow40.com`、明細書表記（カード明細に出る名前）
- [ ] 設定 → 支払い方法：カードに加えて Apple Pay / Google Pay。コンビニ払い・PayPay は任意（対応済みの実装：コンビニの入金待ち→入金確定も Webhook で拾う）
- [ ] 設定 → 顧客ポータル：**有効化**し、「サブスクリプションのキャンセル」「支払い方法の更新」「請求書履歴」をオン  
      （マイページの「お支払い情報を管理」はこのポータルを開く。未有効だとエラーになる）
- [ ] 設定 → メール：「支払い成功時に領収書を送る」をオン（領収書は Stripe に任せる設計）

### 2-2. API キー → Vercel 環境変数
Stripe ダッシュボード → 開発者 → API キー
- [ ] `STRIPE_SECRET_KEY` … まず `sk_test_…` で動作確認 → OK なら `sk_live_…` に差し替え
- [ ] Vercel → Project → Settings → Environment Variables に設定（Production / Preview を分けるなら Preview はテストキー）
- [ ] 設定後は**再デプロイ**する（`/plans` とトップページは静的生成のため、キー有無の判定がビルド時に焼き込まれる。再デプロイするまで「準備中」表示のまま）

### 2-3. Webhook
Stripe ダッシュボード → 開発者 → Webhook → エンドポイントを追加
- [ ] URL：`https://mitoflow40.com/api/webhooks/stripe`
- [ ] イベント（6つ）：
  - `checkout.session.completed`
  - `checkout.session.async_payment_succeeded`
  - `checkout.session.async_payment_failed`
  - `customer.subscription.updated`
  - `customer.subscription.deleted`
  - `charge.refunded`
- [ ] 発行された署名シークレット `whsec_…` を Vercel の `STRIPE_WEBHOOK_SECRET` に設定
- [ ] テストモードと本番モードは**別々に**エンドポイント登録が必要（シークレットも別）

### 2-4. 商品（Product / Price）の登録
手作業不要。`/admin/orders` の「Stripe に商品を作成する」を押すと `lib/products.ts` から自動作成される。
- lookup_key：`mf40_mitoflow_monthly_v1`／`mf40_analysis_v1`
- 価格を変えるとき：`lib/products.ts` の `priceJpy` を変更し、`stripeLookupKey` の `_v1` → `_v2` に上げてデプロイ → 再度ボタン。  
  （Stripe の Price は金額変更不可のため新規作成になる。既存の契約者は旧価格のまま継続される）

## 3. 任意の環境変数
| 変数 | 用途 |
|---|---|
| `ORDER_NOTIFY_EMAIL` | 申込通知の宛先（省略時 `INTAKE_NOTIFY_EMAIL` → `CONTACT_EMAIL`） |
| `ORDER_CLIENT_EMAIL` | `on` にするとクライアント向けの自動確認メールを送る。**既定はオフ**（2026-09 の運用方針：決済後のご案内は解析者が自分のメールで送る。管理者通知は常に送る） |
| `RESEND_API_KEY` | 既存。未設定だと注文メール（管理者・本人）はスキップされ、ログに警告 |

## 4. 動作確認（テストモード）
1. `STRIPE_SECRET_KEY=sk_test_…` と テスト用 `STRIPE_WEBHOOK_SECRET` を設定してデプロイ
2. `/admin/orders` で 3 つの項目が OK、「Stripe に商品を作成する」→ 2 プランが「登録済み」
3. `/plans` → 申し込む → テストカード `4242 4242 4242 4242`（有効期限は未来・CVC 任意）
4. `/checkout/success` に着地 → 数秒で `/admin/orders` に注文が出る（TEST バッジ付き）
5. 同じメールで `/counseling-sheet` を提出 → クライアント詳細に「ご契約・決済」が出る
6. マイページの「お支払い情報を管理」→ 顧客ポータルが開く
7. Stripe ダッシュボードで返金 → 注文が「返金済み」に変わる
8. 本番キーに差し替え → 本番 Webhook を登録 → 少額で 1 回本番テスト → 返金

## 5. 運用ルール・注意
- **ミニマム3ヶ月**：Stripe のサブスクでは技術的に強制していない（初月解約も可能）。料金ページ FAQ と利用規約での明記で担保する。厳密に縛るなら「初回3ヶ月分を一括 → 以降月額」の2段階 Price に分ける設計に変更可能
- **通知メール**：本文に健康情報は載せない（氏名・メール・プラン・金額・注文IDのみ）。既存の intake と同じ方針
- **Blob の公開 URL**：注文 JSON は intake と同じ「推測不能な公開 URL」。真に非公開にするなら intake ごと S3 private 等へ移行（既存の課題と同じ）
- **返金**：Stripe ダッシュボードから行う。全額返金は Webhook で自動反映。部分返金は Stripe 側で確認
- **銀行振込・対面決済**：このシステムの対象外。クライアント詳細のメモに記録
- **テスト注文の掃除**：テストモードの注文は `livemode: false` で TEST バッジが付く。Blob から消すなら `orders/` 配下の該当 JSON と `orders/_index/` の対応ファイルを削除

## 6. まだやっていないこと（次の候補）
- [ ] 利用規約（/terms）に「ミニマム3ヶ月」「自動更新」「解約方法」を追記（要確認）
- [ ] 特商法表記（/legal）の「支払方法」「サービス提供時期」をオンライン決済の実態に合わせて更新
- [ ] 申込完了 → カウンセリング票の**自動プリフィル**（現状は「同じメールで記入」の案内のみ）
- [ ] 会員ログイン（Supabase 等）を入れるなら、`isMember()` を `hasActiveSubscription()` ベースに接続
- [ ] コンビニ払い／PayPay の有効化（Stripe 側のオンだけで動く想定。要テスト）
