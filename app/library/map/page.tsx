import Link from 'next/link';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: 'ライブラリ・マップ｜全体の構造をひと目で | Mitoflow40',
    description: 'Mitoflow40ライブラリの全体像を、インフォグラフィックでひと目に。身体の地図・食べ物・内臓・仕組み・老化と不調・ホルモン・心・フロンティア・生活習慣・症状・思索——11のセクションの構造と、それぞれの代表ページへの入口をまとめた、軽やかな見取り図です。',
    alternates: { canonical: 'https://mitoflow40.com/library/map' },
    openGraph: {
        title: 'ライブラリ・マップ｜全体の構造をひと目で | Mitoflow40',
        description: 'ライブラリの全11セクションの構造を、インフォグラフィックでひと目に。代表ページへの入口つき見取り図。',
        url: 'https://mitoflow40.com/library/map',
        type: 'website',
    },
};

type Sec = {
    n: number;
    en: string;
    ja: string;
    anchor: string;
    color: string;
    desc: string;
    pages: { href: string; label: string }[];
};

const sections: Sec[] = [
    {
        n: 1, en: 'HOW THEY CONNECT', ja: '身体の地図', anchor: '#map', color: '#CFE8F0',
        desc: '点と点をつなぐ全体像。栄養学の考え方そのものから入る、ライブラリの出発点。',
        pages: [
            { href: '/molecular-nutrition', label: '分子栄養学' },
            { href: '/precision-nutrition', label: '精密栄養学' },
            { href: '/nutrition-literacy', label: '学ぶと何が変わる？' },
            { href: '/nutrition-history', label: '栄養学の歴史' },
            { href: '/food-journey', label: '食べてから動くまで' },
        ],
    },
    {
        n: 2, en: 'ON YOUR PLATE', ja: '食べ物', anchor: '#food', color: '#FBE9D0',
        desc: '毎日の皿の上の話。主食から個別の食材、気をつけたい食べ物まで。',
        pages: [
            { href: '/foods', label: '食べ物一覧' },
            { href: '/rice', label: '米' },
            { href: '/wheat', label: '小麦' },
            { href: '/caution-foods', label: '注意したい食べ物' },
            { href: '/calories', label: 'カロリーの誤解' },
        ],
    },
    {
        n: 3, en: 'YOUR ORGANS', ja: '内臓・臓器', anchor: '#organs', color: '#F0E2D8',
        desc: '肝臓・腎臓・腸・心臓・脳など、主要な臓器の役割と、関わる検査・栄養。',
        pages: [
            { href: '/organs', label: '8臓器を見る' },
            { href: '/organs/liver', label: '肝臓' },
            { href: '/organs/gut', label: '腸' },
        ],
    },
    {
        n: 4, en: 'MECHANISM', ja: '身体の仕組み', anchor: '#mechanism', color: '#D7F0E8',
        desc: '細胞の中で起きていること。エネルギー産生から消化・腸・酵素まで、土台の生化学。',
        pages: [
            { href: '/mitochondria', label: 'ミトコンドリア' },
            { href: '/energy', label: 'エネルギー' },
            { href: '/enzymes', label: '酵素' },
            { href: '/acid-alkaline', label: '酸性・アルカリ性' },
            { href: '/gut-health', label: '腸内環境' },
        ],
    },
    {
        n: 5, en: 'AGING & DISEASE', ja: '老化と不調の土台', anchor: '#aging', color: '#F7E2DC',
        desc: 'さびる・こげる・くすぶる——共通の根と、そこから生まれる現代病たち。',
        pages: [
            { href: '/oxidative-stress', label: '酸化' },
            { href: '/glycation', label: '糖化' },
            { href: '/inflammation', label: '炎症' },
            { href: '/modern-diseases', label: '現代病' },
            { href: '/diabetes', label: '糖尿病' },
            { href: '/fatty-liver', label: '脂肪肝' },
            { href: '/sarcopenia', label: 'サルコペニア' },
            { href: '/mental-health', label: '心の現代病' },
        ],
    },
    {
        n: 6, en: 'HORMONES', ja: 'ホルモン', anchor: '#hormones', color: '#F3E0EC',
        desc: '体じゅうに指令を届ける化学メッセンジャー。9種のホルモンと40代の変化。',
        pages: [
            { href: '/hormones', label: 'ホルモンの種類' },
        ],
    },
    {
        n: 7, en: 'MIND & BODY', ja: '心とからだ', anchor: '#mind', color: '#E6E0F2',
        desc: '気分や不安を「体の土台」から読み解く。ストレス・睡眠・自律神経・栄養。',
        pages: [
            { href: '/stress', label: 'ストレス' },
            { href: '/mood-nutrition', label: '気分と栄養' },
            { href: '/mindfulness', label: 'マインドフルネス' },
            { href: '/sleep', label: '睡眠' },
        ],
    },
    {
        n: 8, en: 'FRONTIER', ja: '研究と社会のフロンティア', anchor: '#frontier', color: '#E2EAF2',
        desc: '今まさに研究が進む領域。期待と注意の両方を、フラットに見渡す。',
        pages: [
            { href: '/psychedelics-research', label: 'サイケデリックス研究' },
            { href: '/cannabis', label: 'カンナビス' },
        ],
    },
    {
        n: 9, en: 'LIFESTYLE', ja: '生活習慣', anchor: '#lifestyle', color: '#E7EFD8',
        desc: '運動・断食・光・解毒・サプリ・計測。知識を日々の暮らしに落とし込む。',
        pages: [
            { href: '/exercise', label: '運動' },
            { href: '/fasting', label: '断食' },
            { href: '/sunlight', label: '日光' },
            { href: '/water', label: '水' },
            { href: '/detox', label: 'デトックス' },
            { href: '/nutrient-density', label: '栄養価の変化' },
            { href: '/supplements', label: 'サプリメント' },
        ],
    },
    {
        n: 10, en: 'FROM SYMPTOMS', ja: '症状から引く', anchor: '#symptoms', color: '#FDEAD0',
        desc: '「この不調はなぜ？」から逆引きする入口。体感から仕組みへたどる。',
        pages: [
            { href: '/symptoms', label: '症状から引く' },
        ],
    },
    {
        n: 11, en: 'THOUGHTS', ja: '思索', anchor: '#thoughts', color: '#ECE6DA',
        desc: '健康とは何か。哲学・スピリチュアリティ・カウンターカルチャーまで、視野を広げる。',
        pages: [
            { href: '/health-philosophy', label: '健康哲学' },
            { href: '/spirituality', label: 'スピリチュアリティ' },
            { href: '/counterculture', label: 'カウンターカルチャー' },
        ],
    },
];

export default function LibraryMapPage() {
    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#FFF1DF' }}>
            <img loading="lazy" decoding="async" src="/images/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block"
                style={{ top: '0', right: '-40px', width: '260px', transform: 'scaleY(-1)' }} />
            <img loading="lazy" decoding="async" src="/images/24.png" alt="" className="absolute pointer-events-none"
                style={{ bottom: '-40px', left: '-40px', width: '260px' }} />

            <JsonLd data={medicalWebPage({ name: 'ライブラリ・マップ｜全体の構造をひと目で', description: 'ライブラリの全11セクションの構造を、インフォグラフィックでひと目に。代表ページへの入口つき見取り図。', path: '/library/map' })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: 'ライブラリ・マップ', path: '/library/map' }])} />

            <article className="max-w-[920px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: 'ライブラリ・マップ' }]} />
                <header className="mb-10 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>LIBRARY MAP</p>
                    <h1 className="text-3xl md:text-5xl font-bold mt-4 mb-6 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        ライブラリの見取り図
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-loose max-w-[600px] mx-auto">
                        このライブラリは、<strong>11のセクション</strong>でできています。全体の構造をひと目で見渡し、気になる入口から読みはじめてください。
                    </p>
                </header>

                {/* セクションの流れ（ミニ凡例） */}
                <div className="mb-8 flex flex-wrap justify-center gap-1.5">
                    {sections.map((s) => (
                        <a key={s.anchor} href={`/library${s.anchor}`}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#1A1A1A]/15 text-xs font-bold text-[#1A1A1A] hover:border-[#1A1A1A] transition-colors"
                            style={{ background: s.color }}>
                            <span className="opacity-60">{s.n}</span>{s.ja}
                        </a>
                    ))}
                </div>

                {/* マップ本体：2カラムのセクションカード */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {sections.map((s) => (
                        <div key={s.anchor} className="rounded-2xl border border-black overflow-hidden flex flex-col" style={{ background: s.color }}>
                            <div className="flex items-center gap-3 px-5 pt-5 pb-3">
                                <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-[#1A1A1A] bg-white/80 border border-[#1A1A1A]/15 shrink-0"
                                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{s.n}</div>
                                <div>
                                    <div className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/45 leading-none" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{s.en}</div>
                                    <a href={`/library${s.anchor}`} className="text-lg font-bold text-[#1A1A1A] leading-tight hover:underline decoration-2 underline-offset-2">{s.ja}</a>
                                </div>
                            </div>
                            <p className="px-5 text-sm text-[#1A1A1A]/75 leading-relaxed">{s.desc}</p>
                            <div className="px-5 pt-3 pb-5 mt-auto flex flex-wrap gap-1.5">
                                {s.pages.map((p) => (
                                    <Link key={p.href} href={p.href}
                                        className="text-xs px-2.5 py-1 rounded-full bg-white border border-[#1A1A1A]/15 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">
                                        {p.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <p className="text-xs text-[#1A1A1A]/55 mt-5 text-center leading-relaxed">
                    ※ 各セクションには、ここに挙げた以外にも多くのページがあります。チップは代表的な入口です。
                </p>

                <div className="text-center mt-10 flex flex-wrap justify-center gap-3">
                    <Link href="/library" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">ライブラリ全体を見る →</Link>
                </div>
            </article>
        </div>
    );
}
