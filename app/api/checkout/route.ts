import { NextRequest, NextResponse } from 'next/server';
import { getStripe, SITE_URL } from '@/lib/stripe';
import { getPlan, isPlanPurchasable } from '@/lib/products';
import { getClient } from '@/lib/intake';

// 決済開始：プランIDを受け取り、Stripe Checkout（ホスト型決済画面）の URL を返す。
// カード情報はこのサーバーを一切通らない（Stripe の画面で入力される）。
export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
    const stripe = getStripe();
    if (!stripe) {
        return NextResponse.json({ ok: false, error: 'オンライン決済は現在準備中です' }, { status: 503 });
    }

    let body: { planId?: string; clientId?: string };
    try {
        body = await req.json();
    } catch {
        return NextResponse.json({ ok: false, error: 'invalid body' }, { status: 400 });
    }

    const plan = getPlan(String(body.planId || ''));
    if (!plan) return NextResponse.json({ ok: false, error: 'unknown plan' }, { status: 400 });
    if (!isPlanPurchasable(plan)) return NextResponse.json({ ok: false, error: 'このプランは準備中です' }, { status: 400 });

    // マイページから来た既存クライアントなら、同じメールで決済させて紐付けを確実にする
    let customerEmail: string | undefined;
    const clientId = typeof body.clientId === 'string' && /^[a-f0-9]{24}$/.test(body.clientId) ? body.clientId : undefined;
    if (clientId) {
        const client = await getClient(clientId).catch(() => null);
        if (client) customerEmail = client.email;
    }

    // lookup_key で Price を引く（Price ID をコードに直書きしない）
    const prices = await stripe.prices.list({ lookup_keys: [plan.stripeLookupKey], active: true, limit: 1 });
    const price = prices.data[0];
    if (!price) {
        console.error('[checkout] price not found for lookup_key:', plan.stripeLookupKey);
        return NextResponse.json({ ok: false, error: 'このプランは現在ご購入いただけません（商品未登録）' }, { status: 503 });
    }

    const metadata = { planId: plan.id, ...(clientId ? { clientId } : {}) };
    const isSub = plan.kind === 'subscription';

    try {
        const session = await stripe.checkout.sessions.create({
            mode: isSub ? 'subscription' : 'payment',
            line_items: [{ price: price.id, quantity: 1 }],
            locale: 'ja',
            success_url: `${SITE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${SITE_URL}/plans`,
            allow_promotion_codes: true,
            metadata,
            ...(customerEmail ? { customer_email: customerEmail } : {}),
            ...(isSub
                ? { subscription_data: { metadata } }
                : { customer_creation: 'always', payment_intent_data: { metadata } }),
        });
        if (!session.url) throw new Error('no session url');
        return NextResponse.json({ ok: true, url: session.url });
    } catch (e) {
        console.error('[checkout] session create failed:', e);
        return NextResponse.json({ ok: false, error: '決済画面を開けませんでした。時間をおいて再度お試しください' }, { status: 500 });
    }
}
