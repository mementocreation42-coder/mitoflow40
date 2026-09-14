import Link from 'next/link';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: '生活習慣 ｜ 睡眠・光・水・運動・嗜好品・解毒・計測・サプリ | Mitoflow40',
    description: 'しくみを動かすのは日々の習慣。睡眠・日光・水・運動・嗜好品・解毒・有害物質・計測・サプリメントなど、もっとも効果が大きい「打ち手」をまとめた入口です。',
    alternates: { canonical: 'https://mitoflow40.com/lifestyle' },
    openGraph: {
        siteName: 'Mitoflow40',
        locale: 'ja_JP',
        title: '生活習慣 | Mitoflow40',
        description: '睡眠・光・水・運動・嗜好品・解毒・計測・サプリ',
        url: 'https://mitoflow40.com/lifestyle',
        type: 'article',
    },
};

const topics = [
    { href: '/sleep', en: 'SLEEP', ja: '睡眠', color: '#DCE3F0', body: '修復・再生の最強の回復時間。すべての土台。' },
    { href: '/sunlight', en: 'SUNLIGHT', ja: '日光と健康', color: '#FBEFD2', body: '体内時計・セロトニン・ビタミンDをつくる太陽の光と、紫外線との付き合い方。' },
    { href: '/water', en: 'WATER', ja: '水と健康', color: '#DCE8F0', body: '体の約60%は水。役割・必要量・脱水のサインと、水素水など「機能水」の見極めを中立に。' },
    { href: '/exercise', en: 'EXERCISE', ja: '運動', color: '#E1EFDD', body: 'ミトコンドリアを増やす唯一の確実な方法。' },
    { href: '/stimulants', en: 'ON YOUR HABITS', ja: '嗜好品と体', color: '#E7EFD8', body: 'アルコール・タバコ・カフェイン。体への影響を知って、自分で選ぶ。' },
    { href: '/caffeine', en: 'CAFFEINE', ja: 'カフェイン', color: '#EDE6D3', body: '眠気が飛ぶ仕組み・半減期・代謝の個人差から、自分に合うコーヒーの飲み方を。' },
    { href: '/detox', en: 'DETOX', ja: '解毒', color: '#E7EFD8', body: '肝臓・腸・腎臓に備わる本来の解毒システム。' },
    { href: '/reduce-toxins', en: 'REDUCE EXPOSURE', ja: '有害物質を減らす暮らし', color: '#E7EFD8', body: '農薬・水銀・マイクロプラスチック。「出す」と対になる「入れない」の話。' },
    { href: '/mycotoxins', en: 'FOOD SAFETY', ja: 'カビ毒と食の安全', color: '#E7EFD8', body: 'カビが作る有害物質「マイコトキシン」。種類と、家庭でできる減らし方。' },
    { href: '/nutrient-density', en: 'NUTRIENT DENSITY', ja: '食べ物の栄養価の変化', color: '#E7EFD8', body: '野菜の栄養素は数十年で減少傾向。一方、UV照射きのこは栄養価が上昇。事実ベースで。' },
    { href: '/wearables', en: 'WEARABLES', ja: 'ウェアラブル活用術', color: '#DCE8EC', body: 'Apple Watchで自分の体を読む。HRV・睡眠・心肺機能の活かし方。' },
    { href: '/cgm', en: 'CGM', ja: '血糖モニタリング', color: '#DCE8EC', body: 'フリースタイルリブレ等で「何が自分の血糖を上げるか」を可視化。自分実験の道具。' },
    { href: '/supplements', en: 'SUPPLEMENTS', ja: 'サプリメントの選び方', color: '#EDE6D3', body: '形態・吸収・タイミングで効きが変わる。賢い選び方の地図。' },
];

export default function HubPage() {
    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#E7EFD8' }}>
            <img loading="lazy" decoding="async" src="/images/for-you/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block mf-deco-flip"
                style={{ top: '-48px', right: '0', width: '260px' }} />
            <img loading="lazy" decoding="async" src="/images/misc/24.png" alt="" className="absolute pointer-events-none mf-deco mf-deco-delay"
                style={{ bottom: '8px', left: '8px', width: '260px' }} />

            <JsonLd data={medicalWebPage({ name: '生活習慣', description: '睡眠・光・水・運動・嗜好品・解毒・計測・サプリ', path: '/lifestyle' })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: '生活習慣', path: '/lifestyle' }])} />

            <div className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '生活習慣' }]} />
                <header className="mb-10 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>LIFESTYLE</p>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        LIFESTYLE
                        <span className="block text-base md:text-lg mt-2 text-[#1A1A1A]/70" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>生活習慣</span>
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-relaxed max-w-[560px] mx-auto">
                        しくみを動かすのは、日々の習慣。もっとも効果が大きい<strong>13の打ち手</strong>を、土台（睡眠・光・水・運動）から、減らすもの・入れないもの、そして測る道具まで順に並べました。
                    </p>
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {topics.map((t, i) => (
                        <Link key={t.href} href={t.href}
                            className="group flex flex-col rounded-2xl border border-black p-5 md:p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all"
                            style={{ background: t.color }}>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/50" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{t.en}</span>
                                <span className="text-xs font-bold text-[#1A1A1A]/40" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{String(i + 1).padStart(2, '0')}</span>
                            </div>
                            <div className="text-xl font-bold text-[#1A1A1A] mb-1">{t.ja}</div>
                            <p className="text-sm text-[#1A1A1A]/75 leading-relaxed mb-4 flex-1">{t.body}</p>
                            <span className="inline-flex w-fit items-center gap-1 px-4 py-1.5 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>読む <span className="group-hover:translate-x-1 transition-transform">→</span></span>
                        </Link>
                    ))}
                </div>

                <div className="mt-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-xl font-bold text-[#1A1A1A] mb-3 border-l-4 border-[#FF9855] pl-3 leading-tight">順番のヒント</h2>
                    <p className="text-[#4A4A4A] leading-loose">
                        どれも大事ですが、順番があります。まず<strong>睡眠・日光・水・運動</strong>の土台。次に<strong>嗜好品や有害物質を減らす</strong>。最後に<strong>ウェアラブルや血糖モニターで測り</strong>、サプリメントは足りないところだけ。ライブラリの教科書では、この順で読み進められます。
                    </p>
                </div>
            </div>
        </div>
    );
}
