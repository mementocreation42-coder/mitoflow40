import Link from 'next/link';
import { getStripe } from '@/lib/stripe';
import { getPlan, formatJpy } from '@/lib/products';
import { clientIdForEmail } from '@/lib/orders';

// 決済完了後の着地ページ。表示のためだけに Stripe から Session を取り直す。
// 注文の確定・記録・メール送信は Webhook 側で行う（ここでは一切書き込まない）。
export const metadata = {
    title: 'お申し込みありがとうございます | Mitoflow40',
    robots: { index: false, follow: false },
};
export const dynamic = 'force-dynamic';

const font = { fontFamily: "'Space Grotesk', sans-serif" } as const;

export default async function CheckoutSuccessPage({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
    const { session_id } = await searchParams;
    const stripe = getStripe();

    let view: {
        planName: string;
        amount: string;
        recurring: boolean;
        paid: boolean;
        email?: string;
        clientId?: string;
        name?: string;
    } | null = null;

    if (stripe && session_id && /^cs_[A-Za-z0-9_]+$/.test(session_id)) {
        try {
            const s = await stripe.checkout.sessions.retrieve(session_id);
            const plan = s.metadata?.planId ? getPlan(s.metadata.planId) : undefined;
            const email = s.customer_details?.email || s.customer_email || undefined;
            view = {
                planName: plan?.name ?? 'お申し込み',
                amount: formatJpy(s.amount_total ?? plan?.priceJpy ?? 0),
                recurring: s.mode === 'subscription',
                paid: s.payment_status === 'paid' || s.payment_status === 'no_payment_required',
                email,
                clientId: email ? clientIdForEmail(email) : undefined,
                name: s.customer_details?.name || undefined,
            };
        } catch (e) {
            console.warn('[checkout/success] session retrieve failed:', (e as Error).message);
        }
    }

    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen" style={{ background: '#DEEAF2' }}>
            <div className="max-w-[640px] mx-auto">
                <div className="text-center bg-white/70 rounded-2xl p-8 md:p-12 border border-black">
                    <p className="text-xs tracking-widest font-bold mb-3" style={{ ...font, color: '#FF9855' }}>
                        {view?.paid === false ? 'PAYMENT PENDING' : 'THANK YOU'}
                    </p>
                    <h1 className="text-2xl md:text-3xl font-bold mb-4 text-[#1A1A1A]" style={font}>
                        {view?.paid === false ? 'お支払いを受け付けました' : 'お申し込みありがとうございます'}
                    </h1>

                    {view ? (
                        <>
                            <div className="inline-block text-left rounded-xl border border-[#1A1A1A]/15 bg-white px-5 py-4 mb-6">
                                <p className="text-[10px] tracking-widest font-bold text-[#1A1A1A]/50 mb-1" style={font}>ORDER</p>
                                <p className="font-bold text-[#1A1A1A]">{view.planName}</p>
                                <p className="text-sm text-[#4A4A4A]">
                                    {view.amount}{view.recurring ? '／月（税込・自動更新）' : '（税込）'}
                                    {view.email && <><br /><span className="text-xs">{view.email}</span></>}
                                </p>
                            </div>
                            {view.paid === false && (
                                <p className="text-xs text-[#8C3E25] font-bold mb-6">
                                    入金の確認が取れ次第、確認メールをお送りします。それまで解析は開始されません。
                                </p>
                            )}
                        </>
                    ) : (
                        <p className="text-sm text-[#4A4A4A] leading-loose mb-6">
                            お支払いの確認メールをお送りしています。届かない場合は info@mitoflow40.com までご連絡ください。
                        </p>
                    )}

                    <div className="text-left rounded-2xl border border-black bg-[#D7F7ED] p-6 mb-6">
                        <p className="text-[10px] tracking-widest font-bold mb-2" style={{ ...font, color: '#246E58' }}>NEXT STEP</p>
                        <h2 className="font-bold text-[#1A1A1A] mb-2">担当者からご案内メールをお送りします</h2>
                        <p className="text-sm text-[#1A1A1A]/80 leading-relaxed mb-4">
                            お申し込み内容を確認のうえ、担当（小林）から進め方とカウンセリング票のご案内をメールでお送りします。
                            お急ぎの方は、いまカウンセリング票をご記入いただいても構いません。<strong>お支払いと同じメールアドレス</strong>でご記入いただくと、
                            今回のお申し込みと自動で紐付き、マイページから解析結果をご覧いただけるようになります。
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Link href="/counseling-sheet" className="inline-block text-center px-6 py-3 rounded-full text-sm font-bold bg-[#1A1A1A] text-white" style={font}>
                                先にカウンセリング票を記入する →
                            </Link>
                            {view?.clientId && (
                                <Link href={`/counseling-sheet/my/${view.clientId}`} className="inline-block text-center px-6 py-3 rounded-full text-sm font-bold border border-[#1A1A1A] text-[#1A1A1A] bg-white/70" style={font}>
                                    提出済みの方はマイページへ
                                </Link>
                            )}
                        </div>
                    </div>

                    <p className="text-xs text-[#4A4A4A] leading-relaxed">
                        領収書は Stripe から別途メールでお送りします。
                        {view?.recurring && ' お支払い方法の変更・解約は、マイページの「ご契約・お支払い」から行えます。'}
                    </p>
                </div>
            </div>
        </div>
    );
}
