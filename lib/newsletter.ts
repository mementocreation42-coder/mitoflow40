import { list, put } from '@vercel/blob';
import { createHmac, createHash, timingSafeEqual } from 'node:crypto';
import { Resend } from 'resend';
import { marked } from 'marked';
import { memo, invalidate, TTL } from './req-cache';

// ── Mitoflow40 ニュースレター（独自配信） ──────────────────────────────
// 役割分担：
//   台帳（購読者・号）…… Vercel Blob  newsletter/subscribers/<hash>.json, newsletter/issues/<id>.json
//   配信・配信停止 …… Resend（Contacts / Segment / Broadcasts）。解除リンクは Resend が処理
//   登録確認・解除リンク …… HMAC 署名トークン（確定前のデータは保存しない＝ダブルオプトイン）
//
// 特定電子メール法：送信者名・連絡先・配信停止の方法を本文に必ず載せる（renderIssueHtml のフッター）。

export const NEWSLETTER_NAME = 'Mitoflow40 レター';
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://mitoflow40.com';
const FROM = process.env.NEWSLETTER_FROM || 'Mitoflow40 <info@mitoflow40.com>';
const REPLY_TO = process.env.NEWSLETTER_REPLY_TO || process.env.CONTACT_EMAIL || 'info@mitoflow40.com';
const SEGMENT_NAME = process.env.NEWSLETTER_SEGMENT_NAME || 'Mitoflow40 Newsletter';
const DEV_SECRET = 'mitoflow40-newsletter-dev-secret';

// pending = 確認メール待ち（ダブルオプトイン中）。リストとしては記録済み。
export type SubscriberStatus = 'pending' | 'active' | 'unsubscribed';

export interface Subscriber {
    email: string;
    status: SubscriberStatus;
    source: string;           // 登録経路（newsletter-page / journal / check / footer …）
    subscribedAt: string;     // 最初に登録リクエストがあった日時
    confirmedAt?: string;     // active になった日時
    optIn?: 'double' | 'single'; // double=確認メール経由 / single=Resend 未接続時にそのまま登録
    unsubscribedAt?: string;
    resendContactId?: string; // Resend に同期済みならその ID（配信接続後に埋まる）
}

export type IssueStatus = 'draft' | 'sent';

export interface Issue {
    id: string;               // 例: 2026-08-21-abcd
    subject: string;
    preheader: string;        // 受信箱のプレビュー文
    markdown: string;
    status: IssueStatus;
    createdAt: string;
    updatedAt: string;
    sentAt?: string;
    broadcastId?: string;
    recipientCount?: number;
    testSentAt?: string;
}

// ── 設定チェック ──
// blob だけあればリスト収集は動く。resend は確認メール・配信に必要。
export function isNewsletterConfigured(): { resend: boolean; blob: boolean; secret: boolean } {
    return {
        resend: Boolean(process.env.RESEND_API_KEY),
        blob: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
        secret: Boolean(process.env.NEWSLETTER_SECRET || process.env.INTAKE_LINK_SECRET),
    };
}

function secret(): string {
    return process.env.NEWSLETTER_SECRET || process.env.INTAKE_LINK_SECRET || DEV_SECRET;
}

function resend(): Resend {
    const key = process.env.RESEND_API_KEY;
    if (!key) throw new Error('RESEND_API_KEY が未設定です');
    return new Resend(key);
}

function blobToken(): string {
    const t = process.env.BLOB_READ_WRITE_TOKEN;
    if (!t) throw new Error('BLOB_READ_WRITE_TOKEN が未設定です');
    return t;
}

export function normalizeEmail(email: string): string {
    return email.trim().toLowerCase();
}

export function isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) && email.length <= 254;
}

function emailHash(email: string): string {
    return createHash('sha256').update(normalizeEmail(email)).digest('hex').slice(0, 24);
}

// ── 署名トークン（確認・解除リンク用） ──
// 形式: base64url(JSON payload) + '.' + base64url(HMAC)
type TokenAction = 'confirm' | 'unsub';
interface TokenPayload { e: string; a: TokenAction; s?: string; t: number }

const CONFIRM_TTL_MS = 1000 * 60 * 60 * 72; // 確認リンクは72時間

function b64url(buf: Buffer | string): string {
    return Buffer.from(buf).toString('base64url');
}

export function signToken(payload: TokenPayload): string {
    const body = b64url(JSON.stringify(payload));
    const sig = createHmac('sha256', secret()).update(body).digest('base64url');
    return `${body}.${sig}`;
}

export function verifyToken(token: string, expected: TokenAction): TokenPayload | null {
    const [body, sig] = String(token || '').split('.');
    if (!body || !sig) return null;
    const good = createHmac('sha256', secret()).update(body).digest('base64url');
    const a = Buffer.from(sig);
    const b = Buffer.from(good);
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
    try {
        const p = JSON.parse(Buffer.from(body, 'base64url').toString('utf8')) as TokenPayload;
        if (p.a !== expected || !isValidEmail(p.e)) return null;
        if (expected === 'confirm' && Date.now() - p.t > CONFIRM_TTL_MS) return null;
        return p;
    } catch {
        return null;
    }
}

export function confirmUrl(email: string, source: string): string {
    return `${SITE_URL}/newsletter/confirm?t=${encodeURIComponent(signToken({ e: normalizeEmail(email), a: 'confirm', s: source, t: Date.now() }))}`;
}

export function unsubscribeUrl(email: string): string {
    // 解除リンクは期限なし（いつでも解除できる）
    return `${SITE_URL}/newsletter/unsubscribe?t=${encodeURIComponent(signToken({ e: normalizeEmail(email), a: 'unsub', t: 0 }))}`;
}

// ── Blob 台帳 ──
const SUB_PREFIX = 'newsletter/subscribers/';
const ISSUE_PREFIX = 'newsletter/issues/';

async function readJson<T>(url: string): Promise<T | null> {
    try {
        const res = await fetch(url, { cache: 'no-store' });
        return res.ok ? ((await res.json()) as T) : null;
    } catch {
        return null;
    }
}

async function writeJson(path: string, data: unknown): Promise<void> {
    await put(path, JSON.stringify(data, null, 2), {
        access: 'public', token: blobToken(), addRandomSuffix: false, contentType: 'application/json', allowOverwrite: true,
    });
}

export async function getSubscriber(email: string): Promise<Subscriber | null> {
    const t = process.env.BLOB_READ_WRITE_TOKEN;
    if (!t) return null;
    const h = emailHash(email);
    const { blobs } = await list({ prefix: `${SUB_PREFIX}${h}`, token: t });
    const b = blobs.find((x) => x.pathname.endsWith(`${h}.json`));
    return b ? readJson<Subscriber>(b.url) : null;
}

async function saveSubscriber(s: Subscriber): Promise<void> {
    invalidate('newsletter');
    await writeJson(`${SUB_PREFIX}${emailHash(s.email)}.json`, s);
}

export function listSubscribers(): Promise<Subscriber[]> {
    return memo('newsletter:subs', TTL.list, listSubscribersUncached);
}
async function listSubscribersUncached(): Promise<Subscriber[]> {
    const t = process.env.BLOB_READ_WRITE_TOKEN;
    if (!t) return [];
    const out: Subscriber[] = [];
    let cursor: string | undefined;
    do {
        const page = await list({ prefix: SUB_PREFIX, token: t, cursor, limit: 1000 });
        const loaded = await Promise.all(page.blobs.filter((b) => b.pathname.endsWith('.json')).map((b) => readJson<Subscriber>(b.url)));
        for (const s of loaded) if (s) out.push(s);
        cursor = page.hasMore ? page.cursor : undefined;
    } while (cursor);
    return out.sort((a, b) => b.subscribedAt.localeCompare(a.subscribedAt));
}

// ── Resend（Segment = 配信リスト） ──
let cachedSegmentId: string | null = null;

export async function getSegmentId(): Promise<string> {
    if (process.env.NEWSLETTER_SEGMENT_ID) return process.env.NEWSLETTER_SEGMENT_ID;
    if (cachedSegmentId) return cachedSegmentId;
    const r = resend();
    const found = await r.segments.list({ limit: 100 });
    if (found.error) throw new Error(`Resend segments.list: ${found.error.message}`);
    const hit = found.data?.data.find((s) => s.name === SEGMENT_NAME);
    if (hit) return (cachedSegmentId = hit.id);
    const created = await r.segments.create({ name: SEGMENT_NAME });
    if (created.error || !created.data) throw new Error(`Resend segments.create: ${created.error?.message}`);
    return (cachedSegmentId = created.data.id);
}

async function upsertResendContact(email: string, unsubscribed: boolean): Promise<string | undefined> {
    const r = resend();
    const segmentId = await getSegmentId();
    const created = await r.contacts.create({ email, unsubscribed, segments: [{ id: segmentId }] });
    if (created.data?.id) return created.data.id;
    // 既存コンタクト（409 等）→ 更新してセグメントに追加
    const updated = await r.contacts.update({ email, unsubscribed });
    if (updated.error) throw new Error(`Resend contacts.update: ${updated.error.message}`);
    try { await r.contacts.segments.add({ email, segmentId }); } catch { /* 既に所属していれば無視 */ }
    const got = await r.contacts.get({ email });
    return got.data?.id;
}

// ── 登録フロー ──
// 方針：リスト収集を配信接続（Resend の Segment/Broadcast）から切り離す。
//   - 登録リクエストの時点で必ず台帳に記録する（確認待ちなら pending）
//   - Resend が使えれば確認メール（ダブルオプトイン）。使えなければそのまま active（シングルオプトイン）
//   - Resend へのコンタクト同期は「できれば」。失敗しても登録は成功させ、あとで pushActiveToResend() で一括同期

export type SubscribeMode = 'double' | 'single' | 'already';

// 1) 登録希望
export async function requestSubscription(rawEmail: string, source: string): Promise<SubscribeMode> {
    const email = normalizeEmail(rawEmail);
    if (!isValidEmail(email)) throw new Error('invalid email');
    const existing = await getSubscriber(email);
    if (existing?.status === 'active') return 'already';
    const now = new Date().toISOString();
    const base: Subscriber = {
        email,
        status: 'pending',
        source: existing?.source && existing.status !== 'unsubscribed' ? existing.source : source,
        subscribedAt: existing?.status === 'pending' ? existing.subscribedAt : now,
        resendContactId: existing?.resendContactId,
    };

    // Resend 未設定 → 確認メールを送れないので、その場で登録完了（シングルオプトイン）
    if (!process.env.RESEND_API_KEY) {
        await saveSubscriber({ ...base, status: 'active', confirmedAt: now, optIn: 'single' });
        return 'single';
    }

    // まず pending で台帳に記録（確認メールが開かれなくてもリストには残る）
    await saveSubscriber(base);
    try {
        const url = confirmUrl(email, source);
        const { error } = await resend().emails.send({
            from: FROM,
            to: email,
            replyTo: REPLY_TO,
            subject: `【${NEWSLETTER_NAME}】登録を確認してください`,
            html: confirmEmailHtml(url),
            text: `${NEWSLETTER_NAME}の登録リクエストを受け付けました。\n以下のリンクを開くと登録が完了します（72時間有効）。\n${url}\n\n心当たりがない場合は、このメールを破棄してください。登録は完了しません。`,
        });
        if (error) throw new Error(error.message);
        return 'double';
    } catch (e) {
        // 送信失敗でも台帳には pending で残っている。管理画面から再送できる。
        console.error('[newsletter] confirmation email failed (kept as pending):', (e as Error).message);
        throw new Error('確認メールを送れませんでした');
    }
}

// 確認メールの再送（管理画面用）
export async function resendConfirmation(rawEmail: string): Promise<void> {
    const email = normalizeEmail(rawEmail);
    const existing = await getSubscriber(email);
    if (!existing || existing.status !== 'pending') throw new Error('確認待ちの購読者ではありません');
    const url = confirmUrl(email, existing.source);
    const { error } = await resend().emails.send({
        from: FROM, to: email, replyTo: REPLY_TO,
        subject: `【${NEWSLETTER_NAME}】登録を確認してください`,
        html: confirmEmailHtml(url),
    });
    if (error) throw new Error(`Resend emails.send: ${error.message}`);
}

// 2) 確認リンク → active に。Resend への同期は「できれば」
export async function confirmSubscription(token: string): Promise<{ email: string; already: boolean } | null> {
    const p = verifyToken(token, 'confirm');
    if (!p) return null;
    const existing = await getSubscriber(p.e);
    if (existing?.status === 'active') return { email: p.e, already: true };
    const now = new Date().toISOString();
    let contactId: string | undefined = existing?.resendContactId;
    try {
        contactId = (await upsertResendContact(p.e, false)) ?? contactId;
    } catch (e) {
        console.warn('[newsletter] resend contact sync skipped (list still recorded):', (e as Error).message);
    }
    await saveSubscriber({
        email: p.e,
        status: 'active',
        source: p.s || existing?.source || 'unknown',
        subscribedAt: existing?.subscribedAt ?? now,
        confirmedAt: now,
        optIn: 'double',
        resendContactId: contactId,
    });
    return { email: p.e, already: false };
}

// 配信接続後：有効な購読者のうち Resend 未同期のものを一括で登録する
export async function pushActiveToResend(): Promise<{ pushed: number; failed: number; skipped: number }> {
    const subs = await listSubscribers();
    let pushed = 0, failed = 0, skipped = 0;
    for (const s of subs) {
        if (s.status !== 'active') { skipped++; continue; }
        if (s.resendContactId) { skipped++; continue; }
        try {
            const id = await upsertResendContact(s.email, false);
            await saveSubscriber({ ...s, resendContactId: id });
            pushed++;
        } catch (e) {
            failed++;
            console.error('[newsletter] push to resend failed:', s.email, (e as Error).message);
        }
    }
    return { pushed, failed, skipped };
}

// 配信接続の状態（管理画面の表示用）
export async function getDeliveryStatus(): Promise<{ resend: boolean; segment: 'ok' | 'error' | 'off'; detail: string }> {
    if (!process.env.RESEND_API_KEY) return { resend: false, segment: 'off', detail: 'RESEND_API_KEY 未設定。リスト収集のみ稼働中（登録は即時完了）' };
    try {
        const id = await getSegmentId();
        return { resend: true, segment: 'ok', detail: `Resend Segment 接続済み（${id.slice(0, 8)}…）` };
    } catch (e) {
        return { resend: true, segment: 'error', detail: `Segment に接続できません：${(e as Error).message}。確認メールとリスト収集は動作します` };
    }
}

// 3) 解除
export async function unsubscribeByToken(token: string): Promise<string | null> {
    const p = verifyToken(token, 'unsub');
    if (!p) return null;
    await unsubscribeEmail(p.e);
    return p.e;
}

export async function unsubscribeEmail(rawEmail: string): Promise<void> {
    const email = normalizeEmail(rawEmail);
    const existing = await getSubscriber(email);
    try {
        const r = resend();
        await r.contacts.update({ email, unsubscribed: true });
    } catch (e) {
        console.warn('[newsletter] resend unsubscribe failed (continuing):', (e as Error).message);
    }
    await saveSubscriber({
        ...(existing ?? {}),
        email,
        status: 'unsubscribed',
        source: existing?.source ?? 'unknown',
        subscribedAt: existing?.subscribedAt ?? new Date().toISOString(),
        unsubscribedAt: new Date().toISOString(),
        resendContactId: existing?.resendContactId,
    });
}

// Resend 側の解除（ブロードキャストの解除リンク経由）を台帳に反映する
export async function syncFromResend(): Promise<{ checked: number; updated: number }> {
    const r = resend();
    const segmentId = await getSegmentId();
    const local = await listSubscribers();
    const byEmail = new Map(local.map((s) => [s.email, s]));
    let checked = 0;
    let updated = 0;
    let after: string | undefined;
    do {
        const page = await r.contacts.list({ segmentId, limit: 100, ...(after ? { after } : {}) });
        if (page.error || !page.data) throw new Error(`Resend contacts.list: ${page.error?.message}`);
        for (const c of page.data.data) {
            checked++;
            const email = normalizeEmail(c.email);
            const s = byEmail.get(email);
            if (c.unsubscribed && s && s.status === 'active') {
                await saveSubscriber({ ...s, status: 'unsubscribed', unsubscribedAt: new Date().toISOString(), resendContactId: c.id });
                updated++;
            } else if (!c.unsubscribed && !s) {
                // Resend 側にだけ存在（ダッシュボードで手動追加など）→ 台帳に取り込む
                await saveSubscriber({ email, status: 'active', source: 'resend', subscribedAt: c.created_at, resendContactId: c.id });
                updated++;
            }
        }
        const last = page.data.data[page.data.data.length - 1];
        after = page.data.has_more && last ? last.id : undefined;
    } while (after);
    return { checked, updated };
}

// ── 号（Issue） ──

export function newIssueId(): string {
    const d = new Date();
    const ymd = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    return `${ymd}-${Math.random().toString(36).slice(2, 6)}`;
}

function safeIssueId(id: string): boolean {
    return /^[0-9]{4}-[0-9]{2}-[0-9]{2}-[a-z0-9]{4}$/.test(id);
}

export async function getIssue(id: string): Promise<Issue | null> {
    const t = process.env.BLOB_READ_WRITE_TOKEN;
    if (!t || !safeIssueId(id)) return null;
    const { blobs } = await list({ prefix: `${ISSUE_PREFIX}${id}`, token: t });
    const b = blobs.find((x) => x.pathname.endsWith(`${id}.json`));
    return b ? readJson<Issue>(b.url) : null;
}

export async function saveIssue(issue: Issue): Promise<void> {
    if (!safeIssueId(issue.id)) throw new Error('invalid issue id');
    invalidate('newsletter');
    await writeJson(`${ISSUE_PREFIX}${issue.id}.json`, issue);
}

export function listIssues(): Promise<Issue[]> {
    return memo('newsletter:issues', TTL.list, listIssuesUncached);
}
async function listIssuesUncached(): Promise<Issue[]> {
    const t = process.env.BLOB_READ_WRITE_TOKEN;
    if (!t) return [];
    const { blobs } = await list({ prefix: ISSUE_PREFIX, token: t, limit: 1000 });
    const loaded = await Promise.all(blobs.filter((b) => b.pathname.endsWith('.json')).map((b) => readJson<Issue>(b.url)));
    return loaded.filter((i): i is Issue => Boolean(i)).sort((a, b) => (b.sentAt ?? b.updatedAt).localeCompare(a.sentAt ?? a.updatedAt));
}

export async function listSentIssues(): Promise<Issue[]> {
    return (await listIssues()).filter((i) => i.status === 'sent');
}

// ── HTML 生成 ──

export function markdownToHtml(md: string): string {
    return marked.parse(md, { async: false, gfm: true, breaks: true }) as string;
}

const UNSUB_PLACEHOLDER = '{{{RESEND_UNSUBSCRIBE_URL}}}';

// Broadcast 用（解除リンクは Resend が各受信者ごとに差し込む）／テスト用（自分の解除リンクを埋める）
export function renderIssueHtml(issue: Pick<Issue, 'subject' | 'preheader' | 'markdown' | 'id'>, opts?: { unsubscribeUrl?: string }): string {
    const body = markdownToHtml(issue.markdown);
    const unsub = opts?.unsubscribeUrl ?? UNSUB_PLACEHOLDER;
    const archive = `${SITE_URL}/newsletter/archive/${issue.id}`;
    return `<!DOCTYPE html>
<html lang="ja"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(issue.subject)}</title></head>
<body style="margin:0;padding:0;background:#F4F4F1;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${escapeHtml(issue.preheader)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F4F4F1;padding:24px 12px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#FFFFFF;border:1px solid #1A1A1A;border-radius:16px;overflow:hidden;">
        <tr><td style="padding:22px 28px;border-bottom:1px solid #1A1A1A;background:#4AF6C3;">
          <span style="font-family:-apple-system,'Hiragino Sans','Noto Sans JP',sans-serif;font-size:20px;font-weight:800;color:#1A1A1A;letter-spacing:-0.02em;">Mitoflow40</span>
          <span style="float:right;font-family:-apple-system,'Hiragino Sans',sans-serif;font-size:10px;letter-spacing:0.2em;font-weight:700;color:#1A1A1A;opacity:0.7;margin-top:6px;">LETTER</span>
        </td></tr>
        <tr><td style="padding:30px 28px 8px;font-family:-apple-system,'Hiragino Sans','Noto Sans JP',sans-serif;color:#1A1A1A;">
          <h1 style="font-size:22px;line-height:1.4;margin:0 0 18px;">${escapeHtml(issue.subject)}</h1>
          <div class="body" style="font-size:15px;line-height:1.9;color:#2A2A2A;">${body}</div>
        </td></tr>
        <tr><td style="padding:22px 28px 26px;border-top:1px solid #E5E5E5;font-family:-apple-system,'Hiragino Sans',sans-serif;font-size:11px;line-height:1.8;color:#777;">
          <p style="margin:0 0 6px;">このメールは、mitoflow40.com でニュースレターに登録いただいた方へお送りしています。</p>
          <p style="margin:0 0 6px;">発行：Mitoflow40（小林大介）・お問い合わせ：<a href="mailto:${REPLY_TO}" style="color:#246E58;">${REPLY_TO}</a>・<a href="${archive}" style="color:#246E58;">ブラウザで読む</a></p>
          <p style="margin:0;"><a href="${unsub}" style="color:#777;text-decoration:underline;">配信停止はこちら</a>（ワンクリックで解除できます）</p>
        </td></tr>
      </table>
      <p style="font-family:-apple-system,sans-serif;font-size:10px;color:#999;margin:14px 0 0;">© Mitoflow40 — 本メールは医療行為・診断・治療ではありません。</p>
    </td></tr>
  </table>
  <style>
    .body h2{font-size:18px;margin:26px 0 10px;border-left:4px solid #41C9B4;padding-left:10px;line-height:1.4}
    .body h3{font-size:16px;margin:22px 0 8px}
    .body p{margin:0 0 14px}
    .body blockquote{margin:0 0 14px;padding:10px 16px;border-left:3px solid #FF9855;background:#FFF6E5;color:#4A4A4A}
    .body a{color:#246E58}
    .body img{max-width:100%;height:auto;border-radius:8px}
    .body ul,.body ol{padding-left:22px;margin:0 0 14px}
    .body li{margin:4px 0}
    .body hr{border:0;border-top:1px solid #E5E5E5;margin:22px 0}
  </style>
</body></html>`;
}

function confirmEmailHtml(url: string): string {
    return `<!DOCTYPE html><html lang="ja"><body style="margin:0;background:#F4F4F1;font-family:-apple-system,'Hiragino Sans','Noto Sans JP',sans-serif;color:#1A1A1A;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:24px 12px;"><tr><td align="center">
    <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#fff;border:1px solid #1A1A1A;border-radius:16px;">
      <tr><td style="padding:28px;">
        <p style="font-size:10px;letter-spacing:0.2em;font-weight:700;color:#FF9855;margin:0 0 8px;">CONFIRM YOUR EMAIL</p>
        <h1 style="font-size:20px;margin:0 0 14px;">${NEWSLETTER_NAME}の登録を確認してください</h1>
        <p style="font-size:14px;line-height:1.8;margin:0 0 20px;">下のボタンを押すと登録が完了します。このリンクは72時間有効です。</p>
        <p style="margin:0 0 22px;"><a href="${url}" style="display:inline-block;padding:12px 22px;background:#1A1A1A;color:#fff;border-radius:999px;font-weight:700;font-size:14px;text-decoration:none;">登録を完了する</a></p>
        <p style="font-size:11px;line-height:1.7;color:#777;margin:0;">ボタンが押せない場合は次のURLを開いてください：<br><a href="${url}" style="color:#246E58;word-break:break-all;">${url}</a></p>
        <p style="font-size:11px;line-height:1.7;color:#777;margin:14px 0 0;">心当たりがない場合は、このメールを破棄してください。登録は完了しません。</p>
      </td></tr>
    </table>
  </td></tr></table></body></html>`;
}

export function escapeHtml(s: string): string {
    return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string));
}

// ── 送信 ──

export async function sendTestIssue(issue: Issue, to: string): Promise<void> {
    const r = resend();
    const html = renderIssueHtml(issue, { unsubscribeUrl: unsubscribeUrl(to) });
    const { error } = await r.emails.send({
        from: FROM, to, replyTo: REPLY_TO,
        subject: `[テスト] ${issue.subject}`,
        html,
    });
    if (error) throw new Error(`Resend emails.send: ${error.message}`);
    await saveIssue({ ...issue, testSentAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
}

export async function sendIssue(issue: Issue): Promise<Issue> {
    if (issue.status === 'sent') throw new Error('この号は配信済みです');
    const r = resend();
    const segmentId = await getSegmentId();
    const active = (await listSubscribers()).filter((s) => s.status === 'active').length;
    if (active === 0) throw new Error('有効な購読者がいません');
    const created = await r.broadcasts.create({
        segmentId,
        from: FROM,
        replyTo: REPLY_TO,
        subject: issue.subject,
        previewText: issue.preheader || undefined,
        name: `${issue.id} ${issue.subject}`.slice(0, 100),
        html: renderIssueHtml(issue),
    });
    if (created.error || !created.data) throw new Error(`Resend broadcasts.create: ${created.error?.message}`);
    const sent = await r.broadcasts.send(created.data.id);
    if (sent.error) throw new Error(`Resend broadcasts.send: ${sent.error.message}`);
    const now = new Date().toISOString();
    const next: Issue = { ...issue, status: 'sent', sentAt: now, updatedAt: now, broadcastId: created.data.id, recipientCount: active };
    await saveIssue(next);
    return next;
}
