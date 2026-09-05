import { NextRequest, NextResponse } from 'next/server';
import type Stripe from 'stripe';
import { Resend } from 'resend';
import { getStripe, SITE_URL } from '@/lib/stripe';
import { getPlan, getPlanByLookupKey, formatJpy, type Plan } from '@/lib/products';
import {
    saveOrder, getOrder, findOrderByStripeId, updateOrderStatus, clientIdForEmail,
    type Order, type OrderStatus,
} from '@/lib/orders';

// Stripe Webhook：決済の結果はここで「だけ」確定させる（success ページの表示は信用しない）。
// - checkout.session.completed / async_payment_*  … 単発・サブスクの成立、コンビニ払いの入金
// - customer.subscription.updated / deleted        … 更新・解約・支払い遅延
// - charge.refunded                                … 返金
// 署名検証に失敗したリクエストは 400 で弾く。Stripe は失敗時に再送するため処理は冪等にする。
export const runtime = 'nodejs';
export const maxDuration = 30;

export async function POST(req: NextRequest) {
    const stripe = getStripe();
    const secret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!stripe || !secret) {
        console.error('[stripe-webhook] STRIPE_SECRET_KEY / STRIPE_WEBHOOK_SECRET missing');
        return NextResponse.json({ ok: false }, { status: 503 });
    }

    const sig = req.headers.get('stripe-signature');
    if (!sig) return NextResponse.json({ ok: false }, { status: 400 });

    let event: Stripe.Event;
    try {
        const raw = await req.text();
        event = stripe.webhooks.constructEvent(raw, sig, secret);
    } catch (e) {
        console.warn('[stripe-webhook] signature verification failed:', (e as Error).message);
        return NextResponse.json({ ok: false, error: 'invalid signature' }, { status: 400 });
    }

    try {
        switch (event.type) {
            case 'checkout.session.completed':
            case 'checkout.session.async_payment_succeeded':
                await handleCheckoutSession(stripe, event.data.object as Stripe.Checkout.Session);
                break;
            case 'checkout.session.async_payment_failed':
                await markSessionFailed(event.data.object as Stripe.Checkout.Session);
                break;
            case 'customer.subscription.updated':
            case 'customer.subscription.deleted':
                await handleSubscription(event.data.object as Stripe.Subscription);
                break;
            case 'charge.refunded':
                await handleRefund(event.data.object as Stripe.Charge);
                break;
            default:
                // 購読していないイベントが届いても 200 を返す（再送ループを避ける）
                break;
        }
    } catch (e) {
        // 500 を返すと Stripe が再送してくれる（Blob 一時障害などの救済）
        console.error(`[stripe-webhook] ${event.type} failed:`, e);
        return NextResponse.json({ ok: false }, { status: 500 });
    }

    return NextResponse.json({ received: true });
}

// ── Checkout 成立（単発・サブスク共通） ─────────────────────────────

async function resolvePlan(stripe: Stripe, session: Stripe.Checkout.Session): Promise<Plan | null> {
    const byMeta = session.metadata?.planId ? getPlan(session.metadata.planId) : undefined;
    if (byMeta) return byMeta;
    // metadata が無い（ダッシュボードの Payment Link 経由など）場合は lookup_key から逆引き
    const items = await stripe.checkout.sessions.listLineItems(session.id, { limit: 1, expand: ['data.price'] });
    const key = items.data[0]?.price?.lookup_key;
    return key ? getPlanByLookupKey(key) ?? null : null;
}

function subscriptionPeriodEnd(sub: Stripe.Subscription): string | undefined {
    // API バージョンにより current_period_end の置き場所が異なる（Subscription → SubscriptionItem）
    const legacy = (sub as unknown as { current_period_end?: number }).current_period_end;
    const ts = legacy ?? sub.items?.data?.[0]?.current_period_end;
    return ts ? new Date(ts * 1000).toISOString() : undefined;
}

function mapSubscriptionStatus(s: Stripe.Subscription.Status): OrderStatus {
    switch (s) {
        case 'active':
        case 'trialing':
            return 'active';
        case 'past_due':
        case 'unpaid':
            return 'past_due';
        case 'canceled':
        case 'incomplete_expired':
            return 'canceled';
        default:
            return 'pending'; // incomplete / paused
    }
}

async function handleCheckoutSession(stripe: Stripe, session: Stripe.Checkout.Session) {
    const email = session.customer_details?.email || session.customer_email;
    if (!email) {
        console.error('[stripe-webhook] session without email:', session.id);
        return;
    }
    const plan = await resolvePlan(stripe, session);
    if (!plan) {
        console.error('[stripe-webhook] unknown plan for session:', session.id);
        return;
    }

    // 既存クライアント（マイページ経由）なら metadata の clientId を優先。無ければメールから算出。
    const clientId = session.metadata?.clientId && /^[a-f0-9]{24}$/.test(session.metadata.clientId)
        ? session.metadata.clientId
        : clientIdForEmail(email);

    const isSub = session.mode === 'subscription';
    const subscriptionId = typeof session.subscription === 'string' ? session.subscription : session.subscription?.id;
    const paymentIntentId = typeof session.payment_intent === 'string' ? session.payment_intent : session.payment_intent?.id;
    const customerId = typeof session.customer === 'string' ? session.customer : session.customer?.id;
    const orderId = isSub && subscriptionId ? subscriptionId : session.id;

    let status: OrderStatus;
    let currentPeriodEnd: string | undefined;
    let cancelAtPeriodEnd: boolean | undefined;
    if (isSub && subscriptionId) {
        const sub = await stripe.subscriptions.retrieve(subscriptionId);
        status = mapSubscriptionStatus(sub.status);
        currentPeriodEnd = subscriptionPeriodEnd(sub);
        cancelAtPeriodEnd = sub.cancel_at_period_end;
    } else {
        status = session.payment_status === 'paid' ? 'paid' : 'pending';
    }

    const existing = await getOrder(clientId, orderId);
    const now = new Date().toISOString();
    const order: Order = {
        orderId,
        clientId,
        email,
        name: session.customer_details?.name || existing?.name || undefined,
        planId: plan.id,
        planName: plan.name,
        kind: plan.kind,
        amountJpy: session.amount_total ?? plan.priceJpy,
        status,
        stripeCustomerId: customerId,
        stripeSessionId: session.id,
        stripeSubscriptionId: subscriptionId,
        stripePaymentIntentId: paymentIntentId,
        currentPeriodEnd,
        cancelAtPeriodEnd,
        livemode: session.livemode,
        createdAt: existing?.createdAt ?? now,
        updatedAt: now,
    };
    await saveOrder(order);

    // 「入金確定」に初めて到達したときだけメール（再送・重複イベントでは送らない）
    const settled = status === 'paid' || status === 'active';
    const wasSettled = existing?.status === 'paid' || existing?.status === 'active';
    if (settled && !wasSettled) await sendOrderEmails(order, plan);
}

async function markSessionFailed(session: Stripe.Checkout.Session) {
    const email = session.customer_details?.email || session.customer_email;
    if (!email) return;
    const clientId = session.metadata?.clientId && /^[a-f0-9]{24}$/.test(session.metadata.clientId)
        ? session.metadata.clientId
        : clientIdForEmail(email);
    const existing = await getOrder(clientId, session.id);
    if (existing) await updateOrderStatus(existing, { status: 'failed' });
}

// ── サブスクの状態変化 ───────────────────────────────────────────

async function handleSubscription(sub: Stripe.Subscription) {
    const existing = await findOrderByStripeId(sub.id);
    if (!existing) {
        // checkout.session.completed より先に届いた場合。成立処理側で最新状態を取り直すので無視してよい。
        console.warn('[stripe-webhook] subscription not yet recorded:', sub.id);
        return;
    }
    await updateOrderStatus(existing, {
        status: mapSubscriptionStatus(sub.status),
        currentPeriodEnd: subscriptionPeriodEnd(sub),
        cancelAtPeriodEnd: sub.cancel_at_period_end,
    });
}

// ── 返金 ────────────────────────────────────────────────────────

async function handleRefund(charge: Stripe.Charge) {
    const pi = typeof charge.payment_intent === 'string' ? charge.payment_intent : charge.payment_intent?.id;
    if (!pi || !charge.refunded) return; // 全額返金のときだけ状態を変える（部分返金は Stripe 側で確認）
    const existing = await findOrderByStripeId(pi);
    if (existing) await updateOrderStatus(existing, { status: 'refunded' });
}

// ── 通知メール（Resend。未設定ならスキップ） ─────────────────────────

async function sendOrderEmails(order: Order, plan: Plan) {
    const key = process.env.RESEND_API_KEY;
    if (!key) {
        console.warn('[stripe-webhook] RESEND_API_KEY missing — order emails skipped:', order.orderId);
        return;
    }
    const resend = new Resend(key);
    const myUrl = `${SITE_URL}/counseling-sheet/my/${order.clientId}`;
    const sheetUrl = `${SITE_URL}/counseling-sheet`;
    const amount = formatJpy(order.amountJpy);
    const modeLabel = order.livemode ? '' : '【テスト】';

    // 管理者向け
    try {
        await resend.emails.send({
            from: 'Mitoflow40 <info@mitoflow40.com>',
            to: process.env.ORDER_NOTIFY_EMAIL || process.env.INTAKE_NOTIFY_EMAIL || process.env.CONTACT_EMAIL || 'info@mitoflow40.com',
            subject: `${modeLabel}【Mitoflow40】お申し込み：${plan.name}（${order.name || order.email}）`,
            html: `
                <h2>お申し込みがありました</h2>
                <p><strong>プラン:</strong> ${plan.name}（${order.kind === 'subscription' ? '継続' : '単発'}）</p>
                <p><strong>金額:</strong> ${amount}</p>
                <p><strong>お名前:</strong> ${order.name || '（未取得）'}</p>
                <p><strong>メール:</strong> ${order.email}</p>
                <p><strong>注文ID:</strong> ${order.orderId}</p>
                <p><a href="${SITE_URL}/admin/clients/client/${order.clientId}">管理画面でクライアントを開く</a>（カウンセリング票が未提出の場合は一覧に出ません）</p>
            `,
            replyTo: order.email,
        });
    } catch (e) {
        console.error('[stripe-webhook] admin email failed:', e);
    }

    // 本人向け（次の一歩＝カウンセリング票の提出へ誘導）
    // 運用方針（2026-09）：決済後のご案内は解析者が自分のメールで送るため、自動送信は既定でオフ。
    // 復活させるときは ORDER_CLIENT_EMAIL=on。
    if (process.env.ORDER_CLIENT_EMAIL !== 'on') return;
    try {
        await resend.emails.send({
            from: 'Mitoflow40 <info@mitoflow40.com>',
            to: order.email,
            subject: `${modeLabel}【Mitoflow40】お申し込みありがとうございます（${plan.name}）`,
            html: `
                <p>${order.name ? `${order.name} 様` : 'お客様'}</p>
                <p>「${plan.name}」のお申し込みを受け付けました。ありがとうございます。</p>
                <p><strong>お支払い金額:</strong> ${amount}${order.kind === 'subscription' ? '（月額・自動更新）' : ''}</p>
                <h3>次のステップ</h3>
                <p>解析には、カウンセリング票（問診・血液検査の結果など）が必要です。<br>
                <strong>お支払いと同じメールアドレス</strong>でご記入ください。ご記入内容と今回のお申し込みが自動で紐付きます。</p>
                <p><a href="${sheetUrl}">カウンセリング票を記入する</a></p>
                <p>すでに提出済みの方は、マイページから内容の追加ができます。<br>
                <a href="${myUrl}">${myUrl}</a></p>
                <p style="color:#888;font-size:12px">領収書は Stripe からのメールをご確認ください。このメールに心当たりがない場合は info@mitoflow40.com までご連絡ください。</p>
            `,
        });
    } catch (e) {
        console.error('[stripe-webhook] client email failed:', e);
    }
}
