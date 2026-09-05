import Link from 'next/link';
import Pricing from '@/components/Pricing';
import { PLANS } from '@/lib/products';

export const metadata = {
    title: '料金プラン・お申し込み | Mitoflow40',
    description: '血液検査解析プラン（1回完結）と、月1〜2回のセッションで伴走するミトフロープラン。オンラインでお申し込みいただけます。',
    alternates: { canonical: 'https://mitoflow40.com/plans' },
    openGraph: {
        siteName: 'Mitoflow40',
        locale: 'ja_JP',
        title: '料金プラン・お申し込み | Mitoflow40',
        description: '血液検査解析プラン（1回完結）と、月1〜2回のセッションで伴走するミトフロープラン。',
        url: 'https://mitoflow40.com/plans',
        type: 'website',
    },
};

const mitoflow = PLANS.find((p) => p.id === 'mitoflow');

const FAQ: { q: string; a: React.ReactNode }[] = [
    {
        q: 'お支払い方法は？',
        a: 'クレジットカード／デビットカードのほか、Stripe の決済画面で有効になっているお支払い方法（Apple Pay・Google Pay など）をご利用いただけます。お支払い情報は Stripe が安全に処理し、当サイトにカード番号が保存されることはありません。',
    },
    {
        q: '申し込んだあと、何をすればいい？',
        a: (
            <>
                お支払い後、担当（小林）から進め方とカウンセリング票のご案内をメールでお送りします。
                ご案内に沿って<strong>お支払いと同じメールアドレス</strong>で
                <Link href="/counseling-sheet" className="underline">カウンセリング票</Link>をご記入ください。
                問診・血液検査の結果・必要に応じてウェアラブルのデータをお預かりし、解析を開始します。
            </>
        ),
    },
    {
        q: 'ミトフロープランの「ミニマム3ヶ月」とは？',
        a: `ミトフロープランは、血液検査の解析から戦略の実行・見直しまでをひとつの流れとして設計しているため、${mitoflow?.minMonths ?? 3}ヶ月を最低契約期間としています。${mitoflow?.minMonths ?? 3}ヶ月以降は月単位でいつでも解約できます（解約した月の末日まで有効）。`,
    },
    {
        q: '解約・お支払い情報の変更は？',
        a: 'マイページの「ご契約・お支払い」から、お支払い方法の変更・解約・領収書の確認ができます。解約手続きのメールは不要です。',
    },
    {
        q: '領収書は発行されますか？',
        a: 'お支払いごとに Stripe から領収書メールが届きます。マイページの「お支払い情報を管理」からもダウンロードできます。',
    },
    {
        q: 'キャンセル・返金は？',
        a: (
            <>
                サービスの性質上、解析開始後のキャンセル・返金は原則としてお受けできません。解析開始前のキャンセルはお問い合わせ窓口までご連絡ください。
                詳しくは<Link href="/legal" className="underline">特定商取引法に基づく表記</Link>をご覧ください。
            </>
        ),
    },
    {
        q: 'これは医療行為ですか？',
        a: 'いいえ。本サービスは医療行為・診断・治療ではありません。レポートやセッションの内容は、現時点のデータから読み取れる予測・仮説であり、医療上の助言を代替するものではありません。疾患の診断・治療については医師にご相談ください。',
    },
];

export default function PlansPage() {
    return (
        <>
            <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+5rem)] px-6 md:px-4 bg-[#4AF6C3]">
                <div className="max-w-[800px] mx-auto text-center">
                    <p className="text-xs tracking-widest font-bold mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>PLANS & PRICING</p>
                    <h1 className="text-3xl md:text-5xl font-bold text-[#1A1A1A] mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        料金プラン
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A]/80 leading-loose max-w-[600px] mx-auto">
                        血液検査の数値を「細胞がエネルギーを作れているか」という視点で読み解き、
                        あなたの生活に落とし込める戦略に変えます。1回完結の解析から、伴走型の継続プランまで。
                    </p>
                </div>
            </div>

            <Pricing compact />

            <section id="faq" className="px-6 md:px-4 pb-24 bg-[#4AF6C3]">
                <div className="max-w-[800px] mx-auto">
                    <div className="rounded-2xl border border-[#1A1A1A] bg-white/70 backdrop-blur-[2px] p-6 md:p-10">
                        <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>PAYMENT FAQ</p>
                        <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>お支払い・お申し込みについて</h2>
                        <dl className="divide-y divide-[#1A1A1A]/15">
                            {FAQ.map((f) => (
                                <div key={f.q} className="py-5">
                                    <dt className="font-bold text-[#1A1A1A] mb-2">Q. {f.q}</dt>
                                    <dd className="text-sm text-[#4A4A4A] leading-relaxed">{f.a}</dd>
                                </div>
                            ))}
                        </dl>
                        <p className="mt-6 text-xs text-[#4A4A4A]">
                            <Link href="/legal" className="underline">特定商取引法に基づく表記</Link>
                            {' ・ '}
                            <Link href="/terms" className="underline">利用規約</Link>
                            {' ・ '}
                            <Link href="/privacy" className="underline">プライバシーポリシー</Link>
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}
