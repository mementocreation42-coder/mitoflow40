# Mitoflow40 レター（独自配信）— しくみと運用

- 2026-08-22 作成。SAL Letter（shinealight.jp）への外部リンクをやめ、Mitoflow40 独自のニュースレターに切り替えた
- インフラ：Resend（既存のメール基盤）＋ Vercel Blob（既存の保存先）。新しいサービス契約は不要

## 0. いまの運用モード：リスト収集のみ（2026-09-02）

配信接続（Resend の Segment / Broadcast）は後回しにし、**リストを集めることだけ**を先に動かしている。

| 状態 | 登録フォームの挙動 | 台帳 |
|---|---|---|
| `RESEND_API_KEY` なし | 送信した瞬間に登録完了（シングルオプトイン）。画面は「登録ありがとうございます」 | `active`（`optIn: single`） |
| `RESEND_API_KEY` あり | 確認メールを送る（ダブルオプトイン）。リンクを開くと完了 | まず `pending` → 確認で `active` |
| Segment/Broadcast が使えない | 上と同じ。Resend への同期は失敗しても登録は成功する | `resendContactId` が空のまま |

- 登録された時点で必ず Blob に記録される（確認メールが開かれなくても `pending` として残る）
- `/admin/newsletter` の稼働状態カードに「リスト収集」「確認メール」「配信接続」が個別に出る
- `/admin/newsletter/subscribers`：確認待ちへの「確認メール再送」、CSV エクスポート
- **配信接続がつながったら**：購読者ページの「Resend に一括同期」で、集めた `active` を Segment に登録 → 以降は号を書いて配信

## 1. 流れ

```
登録フォーム（/newsletter, ジャーナル末尾, セルフチェック結果）
  → POST /api/newsletter/subscribe → 確認メール（署名付きリンク・72時間有効）
  → /newsletter/confirm?t=… → 台帳 newsletter/subscribers/<hash>.json に active で保存
                              ＋ Resend のコンタクトに登録（Segment「Mitoflow40 Newsletter」）
管理画面 /admin/newsletter → 新しい号（Markdown）→ 保存 → プレビュー → テスト送信 → 配信
  → Resend Broadcast（Segment 宛）。各受信者に解除リンク {{{RESEND_UNSUBSCRIBE_URL}}} が自動で入る
  → 配信済みの号は /newsletter/archive/<id> に公開
解除：メール末尾のリンク（Resend 処理）／ /newsletter/unsubscribe?t=…（署名リンク→確認ボタン）
  → 管理画面「購読者」の「Resend と同期」で台帳に反映
```

- ダブルオプトイン：確認前のアドレスは**どこにも保存しない**（トークンに署名して持ち回るだけ）
- 登録 API は既存購読者かどうかに関係なく同じ応答（アドレス存在確認に使われない）。ハニーポット付き
- 特定電子メール法：フッターに発行者名・連絡先・配信停止リンクを固定で入れてある（`lib/newsletter.ts` の `renderIssueHtml`）

## 2. 環境変数（Vercel）
| 変数 | 必須 | 用途 |
|---|---|---|
| `RESEND_API_KEY` | ◎ | 既存。確認メール・配信 |
| `BLOB_READ_WRITE_TOKEN` | ◎ | 既存。台帳・号の保存 |
| `NEWSLETTER_SECRET` | ○ | 確認・解除リンクの署名。未設定なら `INTAKE_LINK_SECRET` を流用（それも無いとソース上の既定値＝偽造可） |
| `NEWSLETTER_FROM` | – | 差出人（既定 `Mitoflow40 <info@mitoflow40.com>`。ドメイン認証済みのアドレスであること） |
| `NEWSLETTER_REPLY_TO` | – | 返信先（既定 `CONTACT_EMAIL`） |
| `NEWSLETTER_SEGMENT_ID` | – | Resend の Segment を固定したいとき。未設定なら名前「Mitoflow40 Newsletter」で自動作成 |

Resend 側の準備：ドメイン `mitoflow40.com` の認証（既に送信できていれば済んでいる）。Broadcasts は Resend の有料プラン機能の場合がある——ダッシュボードで「Broadcasts」が使えるか確認する。

## 3. 初回の動作確認
1. `/admin/newsletter` の赤い「セットアップ未完了」が出ていないことを確認
2. `/newsletter` で自分のアドレスを登録 → 確認メール → リンクを開く → `/admin/newsletter/subscribers` に 1 名
3. 「新しい号を書く」→ 件名・本文 → 保存 → プレビュー → テスト送信（自分宛）→ 受信箱で表示と解除リンクを確認
4. 確認欄に `SEND` → 配信 → 数分で届く → `/newsletter/archive` に公開されている
5. メール末尾の解除リンクで解除 → 「購読者」の「Resend と同期」→ 解除に変わる

## 4. 運用メモ
- **配信前の安全弁**：テスト送信をしていない号は配信ボタンが押せない。配信は取り消せない
- **編集ロック**：配信済みの号は編集不可（アーカイブの内容＝送った内容を保証）
- **Markdown**：見出し `##`、リスト、引用 `>`、リンク、画像 `![alt](https://…)`（画像は絶対 URL。`/public` の画像なら `https://mitoflow40.com/images/...`）
- **購読者の CSV**：`/api/admin/newsletter/export`（管理者ログイン必須）
- **削除要求**：「購読者」の解除ボタンで即解除。Blob の台帳ファイルも消す場合は `newsletter/subscribers/<hash>.json` を削除
- **台帳とResendのずれ**：Resend 側での解除は同期ボタンで取り込む。将来は Resend の Webhook（contact.updated）で自動化できる

## 5. 未対応・次の候補
- [ ] 配信後の開封率・クリック率の表示（Resend ダッシュボードで確認可。API で取り込めば管理画面に出せる）
- [ ] 予約配信（`broadcasts.send` は `scheduledAt` を受け取れる）
- [ ] 「ライブラリの新着1枚」を自動で差し込むテンプレート（conditions / symptoms の最新から生成）
- [ ] Resend Webhook で解除・バウンスを自動反映
