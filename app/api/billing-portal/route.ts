import { NextRequest, NextResponse } from 'next/server';
import { getStripe, SITE_URL } from '@/lib/stripe';
import { listOrdersForClient } from '@/lib/orders';

// お支払い情報の変更・解約・領収書の確認（Stripe カスタマーポータル）。
// マイページ（clientId を知っている本人）からだけ呼ばれる想定。
export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
    const stripe = getStripe();
    if (!stripe) return NextResponse.json({ ok: false, error: '準備中です' }, { status: 503 });

    let body: { clientId?: string };
    try {
        body = await req.json();
    } catch {
        return NextResponse.json({ ok: false, error: 'invalid body' }, { status: 400 });
    }
    const clientId = String(body.clientId || '');
    if (!/^[a-f0-9]{24}$/.test(clientId)) return NextResponse.json({ ok: false, error: 'invalid client' }, { status: 400 });

    const orders = await listOrdersForClient(clientId);
    const customerId = orders.find((o) => o.stripeCustomerId)?.stripeCustomerId;
    if (!customerId) return NextResponse.json({ ok: false, error: 'お支払い情報が見つかりません' }, { status: 404 });

    try {
        const portal = await stripe.billingPortal.sessions.create({
            customer: customerId,
            return_url: `${SITE_URL}/counseling-sheet/my/${clientId}`,
            locale: 'ja',
        });
        return NextResponse.json({ ok: true, url: portal.url });
    } catch (e) {
        console.error('[billing-portal] failed:', e);
        return NextResponse.json({ ok: false, error: 'ポータルを開けませんでした。Stripe ダッシュボードでカスタマーポータルを有効にしてください' }, { status: 500 });
    }
}
