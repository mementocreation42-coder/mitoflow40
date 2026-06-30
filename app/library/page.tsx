import Link from 'next/link';
import LibrarySearch from '@/components/LibrarySearch';
import { genes } from '@/lib/genes';
import { nutrients } from '@/lib/nutrients';
import { biomarkers } from '@/lib/biomarkers';
import { foods } from '@/lib/foods';
import { organs } from '@/lib/organs';

export const metadata = {
    title: 'LIBRARY | Mitoflow40',
    description: '遺伝子・栄養素・血液検査の3つの視点から、自分の体を読み解く知識ライブラリ。設計図(遺伝子)・現在地(血液検査)・材料(栄養素)をつなげて理解する。',
    alternates: { canonical: 'https://mitoflow40.com/library' },
    openGraph: {
        title: 'LIBRARY | Mitoflow40',
        description: '遺伝子・栄養素・血液検査の3つの視点から、自分の体を読み解く知識ライブラリ。',
        url: 'https://mitoflow40.com/library',
        type: 'website',
    },
};

const sections = [
    {
        href: '/genes',
        label: 'GENES',
        ja: '遺伝子',
        role: '設計図',
        count: genes.length,
        unit: '遺伝子',
        color: '#DCF1EA',
        illustration: '/images/about-illustration-bg.png',
        description: '生まれ持った体質の「設計図」。MTHFRやCOMTなど、栄養の使い方やストレス耐性を左右する主要遺伝子を解説します。',
    },
    {
        href: '/biomarkers',
        label: 'BIOMARKERS',
        ja: '血液検査',
        role: '現在地',
        count: biomarkers.length,
        unit: '項目',
        color: '#DEEDF7',
        illustration: '/images/24.png',
        description: '今の体の「現在地」。血液検査50項目を精密栄養学の視点で読み解き、基準値だけでなく理想値から状態を捉えます。',
    },
    {
        href: '/nutrients',
        label: 'NUTRIENTS',
        ja: '栄養素',
        role: '材料',
        count: nutrients.length,
        unit: '栄養素',
        color: '#FCE3D4',
        illustration: '/images/2.png',
        description: '体をつくり、整える「材料」。タンパク質・ビタミン・ミネラルなど、体を支えるための栄養素を働き・食品・摂り方から解説します。',
    },
];

const foodSections = [
    {
        href: '/foods',
        label: 'FOODS',
        ja: '食べ物',
        role: '食卓',
        count: foods.length,
        unit: '食材',
        color: '#FFEFD6',
        illustration: '/images/25.png',
        description: '「材料」を実際に運ぶ食卓。卵・鮭・納豆など身近な食材で何が摂れるか、40代向けの食べ方・組み合わせから解説します。',
    },
];

const organSections = [
    {
        href: '/organs',
        label: 'ORGANS',
        ja: '内臓・臓器',
        role: '装置',
        count: organs.length,
        unit: '臓器',
        color: '#F4E2D2',
        illustration: '/images/13.png',
        description: '肝臓・腎臓・腸・心臓・脳など、主要な内臓の役割。40代での変化と、関わる血液検査・栄養素をあわせて読み解きます。',
    },
];

export default function LibraryIndex() {
    return (
        <div className="relative overflow-hidden pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen" style={{ background: '#ECE6F3' }}>
            {/* Decorative illustrations */}
            <img loading="lazy" decoding="async" src="/images/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block"
                style={{ top: '0', right: '-40px', width: '260px', transform: 'scaleY(-1)' }} />
            <img loading="lazy" decoding="async" src="/images/24.png" alt="" className="absolute pointer-events-none"
                style={{ bottom: '-40px', left: '-40px', width: '260px' }} />

            <div className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                {/* Hero */}
                <div className="mb-12">
                    <p className="text-xs tracking-widest font-bold mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>
                        KNOWLEDGE LIBRARY
                    </p>
                    <h1 className="text-4xl md:text-6xl font-bold text-[#41C9B4] leading-[1.2] tracking-tight mb-5">
                        仕組みを知り、<br />現在地を知り、<br />暮らしで整える。
                    </h1>
                    <p className="text-sm md:text-base text-[#4A4A4A] max-w-[600px] leading-relaxed">
                        遺伝子・血液検査・栄養素から、心と暮らしまで。自分の体を読み解く知識ライブラリ。
                    </p>
                </div>

                {/* 横断検索 ＋ 見取り図への導線 */}
                <div className="my-12 flex flex-col sm:flex-row items-center justify-center gap-3 [&>div]:!my-0 [&>div]:!mx-0 [&>div]:w-full sm:[&>div]:w-auto">
                    <LibrarySearch />
                    <Link href="/library/map"
                        className="shrink-0 inline-flex items-center justify-center gap-2 px-5 py-4 rounded-full bg-white border border-black text-sm font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white transition-colors whitespace-nowrap">
                        🗺️ 見取り図
                    </Link>
                </div>

                {/* はじめに */}
                <div className="mt-12 mb-5 flex items-stretch gap-3">
                    <span className="w-1.5 rounded-full bg-[#41C9B4]" />
                    <div className="py-0.5">
                        <p className="text-3xl md:text-4xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>はじめに</p>
                        <p className="text-[10px] tracking-[0.2em] font-bold text-[#41C9B4]/60 mt-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>START HERE</p>
                    </div>
                </div>

                {/* 健康とは（思想の最上流） */}
                <Link href="/health-philosophy"
                    className="group mb-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 rounded-2xl border border-black bg-white/70 p-5 md:p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all">
                    <div className="flex-shrink-0">
                        <span className="text-[10px] font-bold tracking-widest text-[#41C9B4]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>THE APPROACH</span>
                        <div className="text-xl md:text-2xl font-bold text-[#1A1A1A] mt-1">健康とは</div>
                    </div>
                    <p className="flex-1 text-sm text-[#4A4A4A] leading-relaxed">
                        「病気でない」がゴールではありません。本来の力を発揮できる状態へ——すべての土台になる、Mitoflow40の健康の考え方。
                    </p>
                    <span className="flex-shrink-0 inline-flex items-center gap-1 px-5 py-2 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        読む <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                </Link>

                {/* 生化学・栄養学を知ることの価値 */}
                <Link href="/nutrition-literacy"
                    className="group mb-12 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 rounded-2xl border border-black bg-white/70 p-5 md:p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all">
                    <div className="flex-shrink-0">
                        <span className="text-[10px] font-bold tracking-widest text-[#41C9B4]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>WHY IT MATTERS</span>
                        <div className="text-xl md:text-2xl font-bold text-[#1A1A1A] mt-1">学ぶと、何が変わる？</div>
                    </div>
                    <p className="flex-1 text-sm text-[#4A4A4A] leading-relaxed">
                        体の仕組みがわかると、健康情報に振り回されず、自分の体を自分で読み解ける。学ぶことが、これからの数十年を支える力になる理由。
                    </p>
                    <span className="flex-shrink-0 inline-flex items-center gap-1 px-5 py-2 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        読む <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                </Link>

                {/* 考え方と立ち位置 */}
                <div className="mt-12 mb-5 flex items-stretch gap-3">
                    <span className="w-1.5 rounded-full bg-[#41C9B4]" />
                    <div className="py-0.5">
                        <p className="text-3xl md:text-4xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>考え方と立ち位置</p>
                        <p className="text-[10px] tracking-[0.2em] font-bold text-[#41C9B4]/60 mt-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>OUR APPROACH</p>
                    </div>
                </div>

                {/* なぜ、未病予防か（ミッション） */}
                <Link href="/mission"
                    className="group mb-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 rounded-2xl border border-black bg-white/70 p-5 md:p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all">
                    <div className="flex-shrink-0">
                        <span className="text-[10px] font-bold tracking-widest text-[#41C9B4]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>OUR MISSION</span>
                        <div className="text-xl md:text-2xl font-bold text-[#1A1A1A] mt-1">なぜ、未病予防か</div>
                    </div>
                    <p className="flex-1 text-sm text-[#4A4A4A] leading-relaxed">
                        超高齢社会、医療費、健康寿命のギャップ——その一助になりうる「未病予防」の社会的意義と、Mitoflow40の役割。
                    </p>
                    <span className="flex-shrink-0 inline-flex items-center gap-1 px-5 py-2 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        読む <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                </Link>

                {/* 医療者の役割とMitoflow40の立ち位置 */}
                <Link href="/medical-roles"
                    className="group mb-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 rounded-2xl border border-black bg-white/70 p-5 md:p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all">
                    <div className="flex-shrink-0">
                        <span className="text-[10px] font-bold tracking-widest text-[#41C9B4]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>WHO DOES WHAT</span>
                        <div className="text-xl md:text-2xl font-bold text-[#1A1A1A] mt-1">医療者の役割と立ち位置</div>
                    </div>
                    <p className="flex-1 text-sm text-[#4A4A4A] leading-relaxed">
                        医師・看護師・薬剤師・管理栄養士は何ができて、何ができないのか。診断も治療もしないMitoflow40が「未病の手前」でどこに立つのかを整理します。
                    </p>
                    <span className="flex-shrink-0 inline-flex items-center gap-1 px-5 py-2 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        読む <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                </Link>

                {/* 統合医療とは（西洋医学＋補完療法の立ち位置） */}
                <Link href="/integrative-medicine"
                    className="group mb-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 rounded-2xl border border-black bg-white/70 p-5 md:p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all">
                    <div className="flex-shrink-0">
                        <span className="text-[10px] font-bold tracking-widest text-[#41C9B4]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>WEST &amp; BEYOND</span>
                        <div className="text-xl md:text-2xl font-bold text-[#1A1A1A] mt-1">統合医療とは</div>
                    </div>
                    <p className="flex-1 text-sm text-[#4A4A4A] leading-relaxed">
                        西洋医学（標準治療）を土台に、鍼灸・ヨガ・食事・サプリなどの補完療法をエビデンスで組み合わせる考え方。「代替だけに頼らない」原則と、その中でMitoflow40がどこに立つのかを中立に整理します。
                    </p>
                    <span className="flex-shrink-0 inline-flex items-center gap-1 px-5 py-2 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        読む <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                </Link>

                {/* 精密栄養学とは（思想の入口） */}
                <Link href="/precision-nutrition"
                    className="group mb-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 rounded-2xl border border-black bg-white/70 p-5 md:p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all">
                    <div className="flex-shrink-0">
                        <span className="text-[10px] font-bold tracking-widest text-[#41C9B4]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>THE APPROACH</span>
                        <div className="text-xl md:text-2xl font-bold text-[#1A1A1A] mt-1">精密栄養学とは</div>
                    </div>
                    <p className="flex-1 text-sm text-[#4A4A4A] leading-relaxed">
                        このライブラリ全体を貫く考え方。「みんなの平均」ではなく「あなたの最適」を探す——その読み解き方をまず知ることから。
                    </p>
                    <span className="flex-shrink-0 inline-flex items-center gap-1 px-5 py-2 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        読む <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                </Link>

                {/* 栄養学の歴史 */}
                <Link href="/nutrition-history"
                    className="group mb-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 rounded-2xl border border-black bg-white/70 p-5 md:p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all">
                    <div className="flex-shrink-0">
                        <span className="text-[10px] font-bold tracking-widest text-[#41C9B4]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>NUTRITION HISTORY</span>
                        <div className="text-xl md:text-2xl font-bold text-[#1A1A1A] mt-1">栄養学の歴史</div>
                    </div>
                    <p className="flex-1 text-sm text-[#4A4A4A] leading-relaxed">
                        カロリー→ビタミン→細胞へ。そしてGHQ・学校給食・粉食奨励という日本の戦後まで。「いまの常識」がどう作られたかを知ると、情報に振り回されにくくなる。
                    </p>
                    <span className="flex-shrink-0 inline-flex items-center gap-1 px-5 py-2 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        読む <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                </Link>

                {/* 身体の地図 */}
                <div id="map" className="mt-12 md:mt-16 mb-20 md:mb-24 scroll-mt-24">
                    <div className="mb-5 flex items-stretch gap-3">
                        <span className="w-1.5 rounded-full bg-[#41C9B4]" />
                        <div className="py-0.5">
                            <p className="text-3xl md:text-4xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>身体の地図</p>
                            <p className="text-[10px] tracking-[0.2em] font-bold text-[#41C9B4]/60 mt-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>HOW THEY CONNECT</p>
                        </div>
                    </div>
                    <p className="text-sm text-[#4A4A4A] leading-relaxed mb-5">
                        生まれ持った<strong>遺伝子</strong>という設計図があり、今の状態は<strong>血液検査</strong>で「現在地」として可視化できます。そして<strong>栄養素</strong>は、その差を埋めて体をつくり整えるための「材料」です。3つを行き来することで、自分の体への理解が立体的になります。
                    </p>

                    {/* 3つのセクションカード */}
                    <div className="space-y-4">
                    {sections.map((s) => (
                        <Link
                            key={s.href}
                            href={s.href}
                            className="group flex flex-col md:flex-row items-stretch overflow-hidden rounded-2xl border border-black hover:shadow-lg hover:-translate-y-0.5 transition-all"
                            style={{ background: s.color }}
                        >
                            <div className="flex-shrink-0 flex items-center justify-center p-6 md:w-[220px] relative overflow-hidden">
                                <img loading="lazy" decoding="async" src={s.illustration} alt="" className="pointer-events-none w-[160px] md:w-[180px] opacity-90 group-hover:scale-105 transition-transform" />
                            </div>
                            <div className="flex-1 p-6 md:py-8 md:pr-8">
                                <div className="flex items-baseline gap-3 mb-2">
                                    <span className="text-2xl md:text-3xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                        {s.label}
                                    </span>
                                    <span className="text-sm font-bold text-[#1A1A1A]/70">{s.ja}</span>
                                    <span className="text-xs px-2 py-0.5 rounded-full bg-white/70 text-[#1A1A1A]/70 font-bold">{s.role}</span>
                                </div>
                                <p className="text-sm text-[#1A1A1A]/80 leading-relaxed mb-4">{s.description}</p>
                                <div className="inline-flex w-fit items-center gap-2 px-5 py-2 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                    <span>{s.count} {s.unit}を見る</span>
                                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                    </div>
                </div>

                {/* 食べ物 */}
                <div id="food" className="mt-20 md:mt-24 scroll-mt-24">
                    <div className="mb-5 flex items-stretch gap-3">
                        <span className="w-1.5 rounded-full bg-[#41C9B4]" />
                        <div className="py-0.5">
                            <p className="text-3xl md:text-4xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>食べ物</p>
                            <p className="text-[10px] tracking-[0.2em] font-bold text-[#41C9B4]/60 mt-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>ON YOUR PLATE</p>
                        </div>
                    </div>
                    <p className="text-sm text-[#4A4A4A] leading-relaxed mb-5">
                        「材料」である栄養素を、実際に体へ運ぶのが毎日の<strong>食べ物</strong>です。身近な食材ひとつひとつで何が摂れるかを知ることが、知識を食卓につなげる最後のピースになります。
                    </p>

                    <div className="space-y-4">
                    {foodSections.map((s) => (
                        <Link
                            key={s.href}
                            href={s.href}
                            className="group flex flex-col md:flex-row items-stretch overflow-hidden rounded-2xl border border-black hover:shadow-lg hover:-translate-y-0.5 transition-all"
                            style={{ background: s.color }}
                        >
                            <div className="flex-shrink-0 flex items-center justify-center p-6 md:w-[220px] relative overflow-hidden">
                                <img loading="lazy" decoding="async" src={s.illustration} alt="" className="pointer-events-none w-[160px] md:w-[180px] opacity-90 group-hover:scale-105 transition-transform" />
                            </div>
                            <div className="flex-1 p-6 md:py-8 md:pr-8">
                                <div className="flex items-baseline gap-3 mb-2">
                                    <span className="text-2xl md:text-3xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                        {s.label}
                                    </span>
                                    <span className="text-sm font-bold text-[#1A1A1A]/70">{s.ja}</span>
                                    <span className="text-xs px-2 py-0.5 rounded-full bg-white/70 text-[#1A1A1A]/70 font-bold">{s.role}</span>
                                </div>
                                <p className="text-sm text-[#1A1A1A]/80 leading-relaxed mb-4">{s.description}</p>
                                <div className="inline-flex w-fit items-center gap-2 px-5 py-2 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                    <span>{s.count} {s.unit}を見る</span>
                                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                    </div>

                    {/* 小麦と健康 */}
                    <Link href="/wheat"
                        className="group mt-4 flex items-center gap-4 rounded-2xl border border-black p-5 md:p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all" style={{ background: '#F6E9CF' }}>
                        <div className="flex-1">
                            <div className="text-[10px] font-bold tracking-widest text-[#FF9855] mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>WHEAT</div>
                            <div className="text-lg md:text-xl font-bold text-[#1A1A1A] mb-1">小麦と健康</div>
                            <p className="text-sm text-[#1A1A1A]/80 leading-relaxed">「小麦は体に悪い」は本当？ 血糖・グルテン・精製・超加工に切り分けて、上手なつき合い方を中立に。</p>
                        </div>
                        <span className="flex-shrink-0 text-[#1A1A1A] font-bold group-hover:translate-x-1 transition-transform" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>→</span>
                    </Link>

                    {/* 白米・玄米 */}
                    <Link href="/rice"
                        className="group mt-4 flex items-center gap-4 rounded-2xl border border-black p-5 md:p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all" style={{ background: '#F3EEDC' }}>
                        <div className="flex-1">
                            <div className="text-[10px] font-bold tracking-widest text-[#FF9855] mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>RICE</div>
                            <div className="text-lg md:text-xl font-bold text-[#1A1A1A] mb-1">白米・玄米の真実</div>
                            <p className="text-sm text-[#1A1A1A]/80 leading-relaxed">「玄米は正義、白米は悪」は本当？ 血糖・栄養・フィチン酸・ヒ素まで、フェアに比べて自分に合う一杯を。</p>
                        </div>
                        <span className="flex-shrink-0 text-[#1A1A1A] font-bold group-hover:translate-x-1 transition-transform" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>→</span>
                    </Link>

                    {/* 食べない時間の力 */}
                    <Link href="/fasting"
                        className="group mt-4 flex items-center gap-4 rounded-2xl border border-black p-5 md:p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all" style={{ background: '#E6E0F2' }}>
                        <div className="flex-1">
                            <div className="text-[10px] font-bold tracking-widest text-[#FF9855] mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>FASTING</div>
                            <div className="text-lg md:text-xl font-bold text-[#1A1A1A] mb-1">食べない時間の力</div>
                            <p className="text-sm text-[#1A1A1A]/80 leading-relaxed">「何を食べるか」だけでなく「食べない時間をつくる」選択。断食・空腹の効果と、向く人・向かない人を安全第一で。</p>
                        </div>
                        <span className="flex-shrink-0 text-[#1A1A1A] font-bold group-hover:translate-x-1 transition-transform" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>→</span>
                    </Link>

                    {/* 気をつけたい食品 */}
                    <Link href="/caution-foods"
                        className="group mt-4 flex items-center gap-4 rounded-2xl border border-black p-5 md:p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all" style={{ background: '#FBE9D6' }}>
                        <div className="flex-1">
                            <div className="text-[10px] font-bold tracking-widest text-[#FF9855] mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>CAUTION FOODS</div>
                            <div className="text-lg md:text-xl font-bold text-[#1A1A1A] mb-1">気をつけたい食品</div>
                            <p className="text-sm text-[#1A1A1A]/80 leading-relaxed">「食べてはいけない」ではなく、頻度と量に気をつけたい8つを、減らし方・代わりとセットで。</p>
                        </div>
                        <span className="flex-shrink-0 text-[#1A1A1A] font-bold group-hover:translate-x-1 transition-transform" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>→</span>
                    </Link>

                    {/* カロリーの誤解 */}
                    <Link href="/calories"
                        className="group mt-4 flex items-center gap-4 rounded-2xl border border-black p-5 md:p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all" style={{ background: '#F4E3CB' }}>
                        <div className="flex-1">
                            <div className="text-[10px] font-bold tracking-widest text-[#FF9855] mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>CALORIES</div>
                            <div className="text-lg md:text-xl font-bold text-[#1A1A1A] mb-1">カロリーの誤解</div>
                            <p className="text-sm text-[#1A1A1A]/80 leading-relaxed">カロリーは「燃料の量」であって健康の指標ではない。なぜカロリーで考えるのか（歴史）、5つの誤解、そして本体であるATPの視点まで。</p>
                        </div>
                        <span className="flex-shrink-0 text-[#1A1A1A] font-bold group-hover:translate-x-1 transition-transform" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>→</span>
                    </Link>
                </div>

                {/* 内臓・臓器 */}
                <div id="organs" className="mt-20 md:mt-24 scroll-mt-24">
                    <div className="mb-5 flex items-stretch gap-3">
                        <span className="w-1.5 rounded-full bg-[#41C9B4]" />
                        <div className="py-0.5">
                            <p className="text-3xl md:text-4xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>内臓・臓器</p>
                            <p className="text-[10px] tracking-[0.2em] font-bold text-[#41C9B4]/60 mt-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>YOUR ORGANS</p>
                        </div>
                    </div>
                    <p className="text-sm text-[#4A4A4A] leading-relaxed mb-5">
                        遺伝子や栄養素が働く「現場」が、肝臓・腎臓・腸といった<strong>内臓</strong>です。それぞれが何をしていて、40代でどう変化するのかを知ると、血液検査の数値の意味もぐっと立体的になります。
                    </p>

                    <div className="space-y-4">
                    {organSections.map((s) => (
                        <Link
                            key={s.href}
                            href={s.href}
                            className="group flex flex-col md:flex-row items-stretch overflow-hidden rounded-2xl border border-black hover:shadow-lg hover:-translate-y-0.5 transition-all"
                            style={{ background: s.color }}
                        >
                            <div className="flex-shrink-0 flex items-center justify-center p-6 md:w-[220px] relative overflow-hidden">
                                <img loading="lazy" decoding="async" src={s.illustration} alt="" className="pointer-events-none w-[160px] md:w-[180px] opacity-90 group-hover:scale-105 transition-transform" />
                            </div>
                            <div className="flex-1 p-6 md:py-8 md:pr-8">
                                <div className="flex items-baseline gap-3 mb-2">
                                    <span className="text-2xl md:text-3xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                        {s.label}
                                    </span>
                                    <span className="text-sm font-bold text-[#1A1A1A]/70">{s.ja}</span>
                                    <span className="text-xs px-2 py-0.5 rounded-full bg-white/70 text-[#1A1A1A]/70 font-bold">{s.role}</span>
                                </div>
                                <p className="text-sm text-[#1A1A1A]/80 leading-relaxed mb-4">{s.description}</p>
                                <div className="inline-flex w-fit items-center gap-2 px-5 py-2 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                    <span>{s.count} {s.unit}を見る</span>
                                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                    </div>
                </div>

                {/* からだのしくみ */}
                <div id="mechanism" className="mt-20 md:mt-24 scroll-mt-24">
                    <div className="mb-5 flex items-stretch gap-3">
                        <span className="w-1.5 rounded-full bg-[#41C9B4]" />
                        <div className="py-0.5">
                            <p className="text-3xl md:text-4xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>身体の仕組み</p>
                            <p className="text-[10px] tracking-[0.2em] font-bold text-[#41C9B4]/60 mt-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>MECHANISM</p>
                        </div>
                    </div>
                    <p className="text-sm text-[#4A4A4A] leading-relaxed mb-5">
                        栄養素や生活習慣がなぜ効くのか——その答えは、細胞の中で起きている仕組みにあります。エネルギー産生から、腸と脳のつながり、細胞の再生まで。
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <Link href="/molecular-nutrition#biochemistry"
                            className="group block rounded-2xl border border-dashed border-[#1A1A1A]/40 p-5 hover:border-[#1A1A1A] hover:bg-white/40 transition-all">
                            <div className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/45 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                FOUNDATION ／ すべての土台
                            </div>
                            <div className="text-base md:text-lg font-bold text-[#1A1A1A] mb-1">生化学とは？</div>
                            <p className="text-sm text-[#1A1A1A]/70 leading-relaxed">これから挙げる仕組みは、すべて「体の中の化学反応＝生化学」の話。栄養がなぜ効くのか、その土台をまず一言で。
                                <span className="inline-block ml-1 font-bold text-[#1A1A1A] group-hover:translate-x-0.5 transition-transform">→</span>
                            </p>
                        </Link>
                        <Link href="/food-journey"
                            className="group block rounded-2xl border border-dashed border-[#1A1A1A]/40 p-5 hover:border-[#1A1A1A] hover:bg-white/40 transition-all">
                            <div className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/45 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                THE BIG PICTURE ／ 全体の地図
                            </div>
                            <div className="text-base md:text-lg font-bold text-[#1A1A1A] mb-1">食べてから、動くまで</div>
                            <p className="text-sm text-[#1A1A1A]/70 leading-relaxed">食べる→消化→吸収→運搬→代謝→利用→排出。体の中で起きていることを、インフォグラフィックで一枚に俯瞰。
                                <span className="inline-block ml-1 font-bold text-[#1A1A1A] group-hover:translate-x-0.5 transition-transform">→</span>
                            </p>
                        </Link>
                    </div>
                    <Link href="/mitochondria"
                        className="group relative block overflow-hidden rounded-2xl border border-black p-6 mb-4 hover:shadow-lg hover:-translate-y-0.5 transition-all" style={{ background: '#CFEAEC' }}>
                        <img loading="lazy" decoding="async" src="/images/for-you-illustration-bl.png" alt="" className="pointer-events-none absolute bottom-0 right-0 w-[140px] md:w-[180px] opacity-90 group-hover:scale-105 transition-transform hidden sm:block" />
                        <div className="relative" style={{ zIndex: 1 }}>
                            <div className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/50 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                START HERE ／ THE POWERHOUSE
                            </div>
                            <div className="text-xl md:text-2xl font-bold text-[#1A1A1A] mb-2">ミトコンドリアとは</div>
                            <p className="text-sm text-[#1A1A1A]/80 leading-relaxed mb-3 sm:max-w-[70%]">すべての出発点。細胞のエネルギー工場とは何か、なぜ40代で重要か、どう元気に保つか。</p>
                            <span className="inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                見る <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </span>
                        </div>
                    </Link>
                    <Link href="/energy"
                        className="group block rounded-2xl border border-black p-6 mb-4 hover:shadow-lg hover:-translate-y-0.5 transition-all" style={{ background: '#DCEFE4' }}>
                        <div className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/50 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            ENERGY &amp; METABOLISM
                        </div>
                        <div className="text-xl md:text-2xl font-bold text-[#1A1A1A] mb-2">エネルギーとは</div>
                        <p className="text-sm text-[#1A1A1A]/80 leading-relaxed mb-3 sm:max-w-[70%]">疲れにくさの正体は「エネルギーを作り続けられること」。作るしくみと、その材料になる栄養までを、やさしく束ねる入口。</p>
                        <span className="inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            見る <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </span>
                    </Link>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <Link href="/glycolysis"
                            className="group block rounded-2xl border border-black p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all" style={{ background: '#F4EFCE' }}>
                            <div className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/50 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                GLYCOLYSIS
                            </div>
                            <div className="text-lg font-bold text-[#1A1A1A] mb-2">解糖系</div>
                            <p className="text-sm text-[#1A1A1A]/80 leading-relaxed mb-3">ブドウ糖からエネルギーを取り出す最初のステップ。酸素いらずの速攻発電。</p>
                            <span className="inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                見る <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </span>
                        </Link>
                        <Link href="/tca-cycle"
                            className="group block rounded-2xl border border-black p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all" style={{ background: '#FFE9D2' }}>
                            <div className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/50 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                TCA CYCLE
                            </div>
                            <div className="text-lg font-bold text-[#1A1A1A] mb-2">TCA回路</div>
                            <p className="text-sm text-[#1A1A1A]/80 leading-relaxed mb-3">食べたものをエネルギーに変える、ミトコンドリアの中心エンジン。</p>
                            <span className="inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                見る <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </span>
                        </Link>
                        <Link href="/electron-transport-chain"
                            className="group block rounded-2xl border border-black p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all" style={{ background: '#D9E6F2' }}>
                            <div className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/50 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                ETC
                            </div>
                            <div className="text-lg font-bold text-[#1A1A1A] mb-2">電子伝達系</div>
                            <p className="text-sm text-[#1A1A1A]/80 leading-relaxed mb-3">酸素を使いATPの大半を生む最終工程。TCA回路とATPの架け橋。</p>
                            <span className="inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                見る <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </span>
                        </Link>
                        <Link href="/atp"
                            className="group block rounded-2xl border border-black p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all" style={{ background: '#D7F0E8' }}>
                            <div className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/50 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                ATP
                            </div>
                            <div className="text-lg font-bold text-[#1A1A1A] mb-2">ATP（エネルギー通貨）</div>
                            <p className="text-sm text-[#1A1A1A]/80 leading-relaxed mb-3">体のあらゆる活動を動かすエネルギー通貨。作られ方と支える栄養素。</p>
                            <span className="inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                見る <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </span>
                        </Link>
                        <Link href="/enzymes"
                            className="group block rounded-2xl border border-black p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all" style={{ background: '#D7F0E8' }}>
                            <div className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/50 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                ENZYMES
                            </div>
                            <div className="text-lg font-bold text-[#1A1A1A] mb-2">酵素</div>
                            <p className="text-sm text-[#1A1A1A]/80 leading-relaxed mb-3">体内反応を進める「触媒」。消化・代謝・補酵素の働きと、酵素ドリンクの誤解。</p>
                            <span className="inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                見る <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </span>
                        </Link>
                        <Link href="/histamine"
                            className="group block rounded-2xl border border-black p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all" style={{ background: '#F6E2DC' }}>
                            <div className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/50 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                HISTAMINE
                            </div>
                            <div className="text-lg font-bold text-[#1A1A1A] mb-2">ヒスタミン</div>
                            <p className="text-sm text-[#1A1A1A]/80 leading-relaxed mb-3">アレルギー・胃酸・脳の覚醒という3つの顔。分解酵素DAO/HNMTの個人差と不耐症を中立に。</p>
                            <span className="inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                見る <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </span>
                        </Link>
                        <Link href="/acid-alkaline"
                            className="group block rounded-2xl border border-black p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all" style={{ background: '#D9E6F2' }}>
                            <div className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/50 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                ACID & ALKALINE
                            </div>
                            <div className="text-lg font-bold text-[#1A1A1A] mb-2">酸性・アルカリ性（pH）</div>
                            <p className="text-sm text-[#1A1A1A]/80 leading-relaxed mb-3">血液のpHは体が厳密に管理。「アルカリ性食品で体質改善」の誤解を仕組みから解く。</p>
                            <span className="inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                見る <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </span>
                        </Link>
                        <Link href="/ketones"
                            className="group block rounded-2xl border border-black p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all" style={{ background: '#E6E0F2' }}>
                            <div className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/50 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                KETONES
                            </div>
                            <div className="text-lg font-bold text-[#1A1A1A] mb-2">ケトン体</div>
                            <p className="text-sm text-[#1A1A1A]/80 leading-relaxed mb-3">糖が足りないとき脂肪から作る第二の燃料。代謝の柔軟性の鍵。</p>
                            <span className="inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                見る <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </span>
                        </Link>
                        <Link href="/methylation"
                            className="group block rounded-2xl border border-black p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all" style={{ background: '#E6EFD9' }}>
                            <div className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/50 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                METHYLATION
                            </div>
                            <div className="text-lg font-bold text-[#1A1A1A] mb-2">メチレーション</div>
                            <p className="text-sm text-[#1A1A1A]/80 leading-relaxed mb-3">遺伝子・栄養素・血液検査が交わるハブ。解毒・気分・血管の土台。</p>
                            <span className="inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                見る <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </span>
                        </Link>
                        <Link href="/blood-sugar"
                            className="group block rounded-2xl border border-black p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all" style={{ background: '#FBEFD2' }}>
                            <div className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/50 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                BLOOD SUGAR
                            </div>
                            <div className="text-lg font-bold text-[#1A1A1A] mb-2">血糖コントロール</div>
                            <p className="text-sm text-[#1A1A1A]/80 leading-relaxed mb-3">食後の眠気・甘いもの渇望の正体「血糖の波」。整える食べ方。</p>
                            <span className="inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                見る <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </span>
                        </Link>
                        <Link href="/autonomic-nervous-system"
                            className="group block rounded-2xl border border-black p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all" style={{ background: '#DCE7F0' }}>
                            <div className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/50 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                ANS &amp; HRV
                            </div>
                            <div className="text-lg font-bold text-[#1A1A1A] mb-2">自律神経とHRV</div>
                            <p className="text-sm text-[#1A1A1A]/80 leading-relaxed mb-3">アクセルとブレーキのバランス。Apple Watchで測れるHRV。</p>
                            <span className="inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                見る <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </span>
                        </Link>
                        <Link href="/circadian-rhythm"
                            className="group block rounded-2xl border border-black p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all" style={{ background: '#E2E0F0' }}>
                            <div className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/50 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                CIRCADIAN RHYTHM
                            </div>
                            <div className="text-lg font-bold text-[#1A1A1A] mb-2">サーカディアンリズム</div>
                            <p className="text-sm text-[#1A1A1A]/80 leading-relaxed mb-3">約24時間の体内時計。睡眠・ホルモン・代謝を束ねるリズム。</p>
                            <span className="inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                見る <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </span>
                        </Link>
                        <Link href="/chrono-nutrition"
                            className="group block rounded-2xl border border-black p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all" style={{ background: '#F4ECDA' }}>
                            <div className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/50 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                CHRONO-NUTRITION
                            </div>
                            <div className="text-lg font-bold text-[#1A1A1A] mb-2">時間栄養学</div>
                            <p className="text-sm text-[#1A1A1A]/80 leading-relaxed mb-3">「いつ食べるか」で体は変わる。体内時計と栄養、時間制限食を中立に。</p>
                            <span className="inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                見る <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </span>
                        </Link>
                        <Link href="/gut-health"
                            className="group block rounded-2xl border border-black p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all" style={{ background: '#DCEFE4' }}>
                            <div className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/50 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                GUT HEALTH
                            </div>
                            <div className="text-lg font-bold text-[#1A1A1A] mb-2">腸内環境（腸活）</div>
                            <p className="text-sm text-[#1A1A1A]/80 leading-relaxed mb-3">免疫・気分・解毒の交差点。腸内細菌の多様性と、腸活の基本。</p>
                            <span className="inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                見る <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </span>
                        </Link>
                        <Link href="/microbiome"
                            className="group block rounded-2xl border border-black p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all" style={{ background: '#DCEFE4' }}>
                            <div className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/50 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                MICROBIOME
                            </div>
                            <div className="text-lg font-bold text-[#1A1A1A] mb-2">腸内フローラ・プレ/プロ</div>
                            <p className="text-sm text-[#1A1A1A]/80 leading-relaxed mb-3">善玉菌・悪玉菌のバランスと、プレ/プロ/シン/ポストバイオティクスの違い。</p>
                            <span className="inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                見る <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </span>
                        </Link>
                        <Link href="/gut-brain"
                            className="group block rounded-2xl border border-black p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all" style={{ background: '#DCEFE4' }}>
                            <div className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/50 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                GUT-BRAIN AXIS
                            </div>
                            <div className="text-lg font-bold text-[#1A1A1A] mb-2">脳腸相関</div>
                            <p className="text-sm text-[#1A1A1A]/80 leading-relaxed mb-3">腸と脳は会話している。お腹の調子と気分・集中・睡眠のつながり。</p>
                            <span className="inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                見る <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </span>
                        </Link>
                        <Link href="/digestion"
                            className="group block rounded-2xl border border-black p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all" style={{ background: '#DCEFE4' }}>
                            <div className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/50 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                DIGESTION & ABSORPTION
                            </div>
                            <div className="text-lg font-bold text-[#1A1A1A] mb-2">消化・吸収</div>
                            <p className="text-sm text-[#1A1A1A]/80 leading-relaxed mb-3">「食べた」と「吸収できた」は別の話。消化のリレーと酵素、吸収を高める習慣。</p>
                            <span className="inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                見る <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </span>
                        </Link>
                        <Link href="/autophagy"
                            className="group block rounded-2xl border border-black p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all" style={{ background: '#E7EEDA' }}>
                            <div className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/50 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                AUTOPHAGY
                            </div>
                            <div className="text-lg font-bold text-[#1A1A1A] mb-2">オートファジー</div>
                            <p className="text-sm text-[#1A1A1A]/80 leading-relaxed mb-3">細胞の自己リサイクル。ミトコンドリアの質を保つ仕組み。</p>
                            <span className="inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                見る <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </span>
                        </Link>
                    </div>
                </div>

                {/* 老化と不調の土台（酸化・糖化・炎症） */}
                <div id="aging" className="mt-20 md:mt-24 scroll-mt-24">
                    <div className="mb-5 flex items-stretch gap-3">
                        <span className="w-1.5 rounded-full bg-[#41C9B4]" />
                        <div className="py-0.5">
                            <p className="text-3xl md:text-4xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>老化と不調の土台</p>
                            <p className="text-[10px] tracking-[0.2em] font-bold text-[#41C9B4]/60 mt-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>AGING &amp; DISEASE</p>
                        </div>
                    </div>
                    <p className="text-sm text-[#4A4A4A] leading-relaxed mb-5">
                        体の中では今この瞬間も、「<strong>さびる（酸化）</strong>」「<strong>こげる（糖化）</strong>」「<strong>くすぶる（慢性炎症）</strong>」という3つのダメージが静かに進んでいます。これらは見た目の老化を進めるだけでなく、疲れやすさや肌の不調といった日々の不調から、生活習慣病まで、多くの<strong>体の不調の共通の根っこ</strong>です。やっかいなのは、3つが連動して互いを加速させること。けれど裏を返せば、<strong>毎日の食事・運動・睡眠で減らしていけるダメージ</strong>でもあります。「歳のせい」とあきらめる前に、まず仕組みから知っていきましょう。
                    </p>
                    <div className="space-y-4">
                        <Link href="/oxidative-stress"
                            className="group flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 rounded-2xl border border-black p-5 md:p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all" style={{ background: '#F3DEDE' }}>
                            <div className="flex-shrink-0">
                                <span className="text-[10px] font-bold tracking-widest text-[#41C9B4]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>OXIDATIVE STRESS</span>
                                <div className="text-xl md:text-2xl font-bold text-[#1A1A1A] mt-1">活性酸素（さびる）</div>
                            </div>
                            <p className="flex-1 text-sm text-[#4A4A4A] leading-relaxed">体がさびる酸化ストレスと、抗酸化のバランス。</p>
                            <span className="flex-shrink-0 inline-flex items-center gap-1 px-5 py-2 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                見る <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </span>
                        </Link>
                        <Link href="/glycation"
                            className="group flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 rounded-2xl border border-black p-5 md:p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all" style={{ background: '#F6E6CF' }}>
                            <div className="flex-shrink-0">
                                <span className="text-[10px] font-bold tracking-widest text-[#41C9B4]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>GLYCATION</span>
                                <div className="text-xl md:text-2xl font-bold text-[#1A1A1A] mt-1">糖化（こげる）</div>
                            </div>
                            <p className="flex-1 text-sm text-[#4A4A4A] leading-relaxed">余った糖が組織を劣化させるAGEs。血糖との関係。</p>
                            <span className="flex-shrink-0 inline-flex items-center gap-1 px-5 py-2 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                見る <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </span>
                        </Link>
                        <Link href="/inflammation"
                            className="group flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 rounded-2xl border border-black p-5 md:p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all" style={{ background: '#F6DCD0' }}>
                            <div className="flex-shrink-0">
                                <span className="text-[10px] font-bold tracking-widest text-[#41C9B4]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>INFLAMMATION</span>
                                <div className="text-xl md:text-2xl font-bold text-[#1A1A1A] mt-1">慢性炎症（くすぶる）</div>
                            </div>
                            <p className="flex-1 text-sm text-[#4A4A4A] leading-relaxed">自覚なくくすぶる弱い炎症。老化と万病の隠れた土台。</p>
                            <span className="flex-shrink-0 inline-flex items-center gap-1 px-5 py-2 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                見る <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </span>
                        </Link>
                    </div>
                </div>

                {/* 現代病ハブ群（3カラム） */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                    <Link href="/modern-diseases"
                        className="group block rounded-2xl border border-black p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all" style={{ background: '#F0E2D8' }}>
                        <div className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/50 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            MODERN DISEASES
                        </div>
                        <div className="text-lg font-bold text-[#1A1A1A] mb-2">現代病とは</div>
                        <p className="text-sm text-[#1A1A1A]/80 leading-relaxed mb-3">生活習慣病・慢性炎症・自律神経の乱れ・睡眠負債・座りすぎ——「体の進化」と「変わりすぎた環境」のズレを俯瞰し、対策テーマへつなぎます。</p>
                        <span className="inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            見る <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </span>
                    </Link>
                    <Link href="/diabetes"
                        className="group block rounded-2xl border border-black p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all" style={{ background: '#F7E2DC' }}>
                        <div className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/50 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            DIABETES
                        </div>
                        <div className="text-lg font-bold text-[#1A1A1A] mb-2">糖尿病とは</div>
                        <p className="text-sm text-[#1A1A1A]/80 leading-relaxed mb-3">現代病の代表格。1型・2型の違い、見逃しやすいサイン、HbA1c、合併症、そして「境界型」のうちにできること。</p>
                        <span className="inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            見る <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </span>
                    </Link>
                    <Link href="/fatty-liver"
                        className="group block rounded-2xl border border-black p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all" style={{ background: '#F3E2D2' }}>
                        <div className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/50 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            FATTY LIVER
                        </div>
                        <div className="text-lg font-bold text-[#1A1A1A] mb-2">脂肪肝とは</div>
                        <p className="text-sm text-[#1A1A1A]/80 leading-relaxed mb-3">お酒を飲まなくてもなる"沈黙の現代病"（MASLD）。糖・果糖・内臓脂肪が原因で、糖尿病や心臓病の入口にも。戻せる段階での対策を解説。</p>
                        <span className="inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            見る <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </span>
                    </Link>
                    <Link href="/sarcopenia"
                        className="group block rounded-2xl border border-black p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all" style={{ background: '#E7EEDA' }}>
                        <div className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/50 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            SARCOPENIA
                        </div>
                        <div className="text-lg font-bold text-[#1A1A1A] mb-2">サルコペニア・フレイル</div>
                        <p className="text-sm text-[#1A1A1A]/80 leading-relaxed mb-3">40代から始まる筋肉の減少。代謝・血糖・転倒・要介護とつながる「動ける体」の土台。運動とたんぱく質で守り・取り戻す3本柱。</p>
                        <span className="inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            見る <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </span>
                    </Link>
                    <Link href="/mental-health"
                        className="group block rounded-2xl border border-black p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all" style={{ background: '#E6E0F2' }}>
                        <div className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/50 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            MENTAL HEALTH
                        </div>
                        <div className="text-lg font-bold text-[#1A1A1A] mb-2">心の現代病</div>
                        <p className="text-sm text-[#1A1A1A]/80 leading-relaxed mb-3">うつ・不安・燃え尽きは、気合いの問題ではない。ストレス・睡眠・腸・栄養・炎症から「体」として心をとらえ、適切な助けにつなぐ視点。</p>
                        <span className="inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            見る <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </span>
                    </Link>
                    <Link href="/periodontal-disease"
                        className="group block rounded-2xl border border-black p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all" style={{ background: '#F7E2DC' }}>
                        <div className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/50 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            PERIODONTAL DISEASE
                        </div>
                        <div className="text-lg font-bold text-[#1A1A1A] mb-2">歯周病とは</div>
                        <p className="text-sm text-[#1A1A1A]/80 leading-relaxed mb-3">痛みなく静かに進む口の中の慢性炎症。糖尿病・心血管・腸内環境とつながる「全身への波及」を、口の外まで含めて捉え直します。</p>
                        <span className="inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            見る <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </span>
                    </Link>
                </div>

                {/* ホルモン */}
                <div id="hormones" className="mt-20 md:mt-24 scroll-mt-24">
                    <div className="mb-5 flex items-stretch gap-3">
                        <span className="w-1.5 rounded-full bg-[#41C9B4]" />
                        <div className="py-0.5">
                            <p className="text-3xl md:text-4xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>ホルモン</p>
                            <p className="text-[10px] tracking-[0.2em] font-bold text-[#41C9B4]/60 mt-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>HORMONES</p>
                        </div>
                    </div>
                    <p className="text-sm text-[#4A4A4A] leading-relaxed mb-5">
                        体じゅうに指令を届ける化学メッセンジャー。40代以降の変化と、血液検査とのつながり。
                    </p>
                    <Link href="/hormones"
                        className="group block rounded-2xl border border-black p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all" style={{ background: '#ECDCE6' }}>
                        <div className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/50 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            HORMONES
                        </div>
                        <div className="text-xl md:text-2xl font-bold text-[#1A1A1A] mb-2">ホルモンの種類（9種）</div>
                        <p className="text-sm text-[#1A1A1A]/80 leading-relaxed mb-3">テストステロン・エストロゲン・コルチゾール・インスリン・甲状腺ホルモンなど、主なホルモンを個別ページで解説。</p>
                        <span className="inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            見る <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </span>
                    </Link>
                </div>

                {/* 心とからだ */}
                <div id="mind" className="mt-20 md:mt-24 scroll-mt-24">
                    <div className="mb-5 flex items-stretch gap-3">
                        <span className="w-1.5 rounded-full bg-[#41C9B4]" />
                        <div className="py-0.5">
                            <p className="text-3xl md:text-4xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>心とからだ</p>
                            <p className="text-[10px] tracking-[0.2em] font-bold text-[#41C9B4]/60 mt-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>MIND &amp; BODY</p>
                        </div>
                    </div>
                    <p className="text-sm text-[#4A4A4A] leading-relaxed mb-5">
                        気分や不安は、「性格」や「気合い」の問題とは限りません。<strong>腸・栄養・睡眠・自律神経・血糖</strong>といった<strong>体の土台</strong>から、心を読み解きます。メンタルも“体から”整える、という視点です。
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                            { href: '/stress', en: 'STRESS', ja: 'ストレスとは', note: '敵ではなく信号。コルチゾールと自律神経のしくみ。', bg: '#EFEAF6' },
                            { href: '/mood-nutrition', en: 'MOOD & FOOD', ja: '気分と栄養', note: 'セロトニン・ドーパミンの“材料”は栄養という視点。', bg: '#EFEAF6' },
                            { href: '/anxiety', en: 'ANXIETY', ja: '不安と体', note: '血糖・腸・睡眠など、不安を揺さぶる体の要因。', bg: '#EFEAF6' },
                            { href: '/neuroinflammation', en: 'NEUROINFLAMMATION', ja: '神経炎症と心', note: 'IL-6など炎症性サイトカインが脳に及ぶとき。だるさ・うつ・ブレインフォグを中立に。', bg: '#EFEAF6' },
                            { href: '/migraine', en: 'MIGRAINE', ja: '片頭痛と体', note: '引き金・栄養（Mg・B2・CoQ10）・危険な頭痛の見分け方。', bg: '#EFEAF6' },
                            { href: '/mindfulness', en: 'BREATH', ja: 'マインドフルネス・呼吸', note: '呼吸という、自律神経への手動スイッチ。', bg: '#EFEAF6' },
                            { href: '/spirituality', en: 'MIND & SPIRIT', ja: 'スピリチュアリティと体', note: '祈り・瞑想・つながりを“心身相関”で読み解く。', bg: '#EFEAF6' },
                            { href: '/sound', en: 'SOUND', ja: '音と健康', note: 'α波・振動・音楽療法と、周波数ヒーリングの潮流を中立に。', bg: '#EFEAF6' },
                            { href: '/smell', en: 'SMELL', ja: '匂いと健康', note: '記憶・感情・脳とのつながりと、アロマの効果の見極め。', bg: '#EFEAF6' },
                        ].map((s) => (
                            <Link key={s.href} href={s.href}
                                className="group block rounded-2xl border border-black p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all" style={{ background: s.bg }}>
                                <div className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/50 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{s.en}</div>
                                <div className="text-lg font-bold text-[#1A1A1A] mb-2">{s.ja}</div>
                                <p className="text-sm text-[#1A1A1A]/80 leading-relaxed mb-3">{s.note}</p>
                                <span className="inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>見る <span className="group-hover:translate-x-1 transition-transform">→</span></span>
                            </Link>
                        ))}
                    </div>
                    <div className="mt-4 flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-bold tracking-wider text-[#1A1A1A]/40" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>あわせて</span>
                        {[
                            { href: '/gut-brain', label: '腸脳相関' },
                            { href: '/sleep', label: '睡眠' },
                            { href: '/autonomic-nervous-system', label: '自律神経' },
                            { href: '/nutrients/tryptophan', label: 'トリプトファン' },
                        ].map((l) => (
                            <Link key={l.href} href={l.href} className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">{l.label}</Link>
                        ))}
                    </div>
                </div>

                {/* 研究と社会のフロンティア */}
                <div id="frontier" className="mt-20 md:mt-24 scroll-mt-24">
                    <div className="mb-5 flex items-stretch gap-3">
                        <span className="w-1.5 rounded-full bg-[#41C9B4]" />
                        <div className="py-0.5">
                            <p className="text-3xl md:text-4xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>研究と社会のフロンティア</p>
                            <p className="text-[10px] tracking-[0.2em] font-bold text-[#41C9B4]/60 mt-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>FRONTIER</p>
                        </div>
                    </div>
                    <p className="text-sm text-[#4A4A4A] leading-relaxed mb-5">
                        賛否や法律が国によって大きく異なり、いま世界で研究・議論が進んでいるテーマです。<strong>すすめるためでも、否定するためでもなく</strong>、何が分かっていて何が分かっていないかを中立に整理します。<strong className="text-[#E8896B]">いずれも日本では法律で規制されています。</strong>
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Link href="/psychedelics-research"
                            className="group block rounded-2xl border border-black p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all" style={{ background: '#E7E0F2' }}>
                            <div className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/50 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>RESEARCH FRONTIER</div>
                            <div className="text-lg font-bold text-[#1A1A1A] mb-2">サイケデリック研究の潮流</div>
                            <p className="text-sm text-[#1A1A1A]/80 leading-relaxed mb-3">うつ・PTSDなどへの治療応用をめぐり、海外で進む研究の潮流を中立に。<span className="font-bold text-[#E8896B]">日本では違法。</span></p>
                            <span className="inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>見る <span className="group-hover:translate-x-1 transition-transform">→</span></span>
                        </Link>
                        <Link href="/cannabis"
                            className="group block rounded-2xl border border-black p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all" style={{ background: '#E7E0F2' }}>
                            <div className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/50 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>HISTORY &amp; POLICY</div>
                            <div className="text-lg font-bold text-[#1A1A1A] mb-2">大麻をめぐる歴史と世界の動き</div>
                            <p className="text-sm text-[#1A1A1A]/80 leading-relaxed mb-3">医療・嗜好をめぐる各国の制度の変化と歴史を中立に整理。<span className="font-bold text-[#E8896B]">日本では違法。</span></p>
                            <span className="inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>見る <span className="group-hover:translate-x-1 transition-transform">→</span></span>
                        </Link>
                        <Link href="/counterculture"
                            className="group block rounded-2xl border border-black p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all sm:col-span-2" style={{ background: '#E7E0F2' }}>
                            <div className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/50 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>HISTORY &amp; IDEAS</div>
                            <div className="text-lg font-bold text-[#1A1A1A] mb-2">対抗文化が生んだもの</div>
                            <p className="text-sm text-[#1A1A1A]/80 leading-relaxed mb-3">グレイトフル・デッド、フラワームーブメント、ホール・アース・カタログ、パソコン、ジョブズ、EFF、そして規制。「個人に道具を」という思想史を事実ベースで。</p>
                            <span className="inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>見る <span className="group-hover:translate-x-1 transition-transform">→</span></span>
                        </Link>
                    </div>
                </div>

                {/* 生活習慣 */}
                <div id="lifestyle" className="mt-20 md:mt-24 scroll-mt-24">
                    <div className="mb-5 flex items-stretch gap-3">
                        <span className="w-1.5 rounded-full bg-[#41C9B4]" />
                        <div className="py-0.5">
                            <p className="text-3xl md:text-4xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>生活習慣</p>
                            <p className="text-[10px] tracking-[0.2em] font-bold text-[#41C9B4]/60 mt-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>LIFESTYLE</p>
                        </div>
                    </div>
                    <p className="text-sm text-[#4A4A4A] leading-relaxed mb-5">
                        しくみを動かすのは、日々の習慣。もっとも効果が大きい「打ち手」をまとめました。
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <Link href="/sleep"
                            className="group block rounded-2xl border border-black p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all" style={{ background: '#DCE3F0' }}>
                            <div className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/50 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>SLEEP</div>
                            <div className="text-lg font-bold text-[#1A1A1A] mb-2">睡眠</div>
                            <p className="text-sm text-[#1A1A1A]/80 leading-relaxed mb-3">修復・再生の最強の回復時間。すべての土台。</p>
                            <span className="inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>見る <span className="group-hover:translate-x-1 transition-transform">→</span></span>
                        </Link>
                        <Link href="/sunlight"
                            className="group block rounded-2xl border border-black p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all" style={{ background: '#FBEFD2' }}>
                            <div className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/50 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>SUNLIGHT</div>
                            <div className="text-lg font-bold text-[#1A1A1A] mb-2">日光と健康</div>
                            <p className="text-sm text-[#1A1A1A]/80 leading-relaxed mb-3">体内時計・セロトニン・ビタミンDをつくる太陽の光と、紫外線との付き合い方。</p>
                            <span className="inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>見る <span className="group-hover:translate-x-1 transition-transform">→</span></span>
                        </Link>
                        <Link href="/water"
                            className="group block rounded-2xl border border-black p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all" style={{ background: '#DCE8F0' }}>
                            <div className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/50 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>WATER</div>
                            <div className="text-lg font-bold text-[#1A1A1A] mb-2">水と健康</div>
                            <p className="text-sm text-[#1A1A1A]/80 leading-relaxed mb-3">体の約60%は水。役割・必要量・脱水のサインと、水素水など「機能水」の見極めを中立に。</p>
                            <span className="inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>見る <span className="group-hover:translate-x-1 transition-transform">→</span></span>
                        </Link>
                        <Link href="/exercise"
                            className="group block rounded-2xl border border-black p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all" style={{ background: '#E1EFDD' }}>
                            <div className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/50 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>EXERCISE</div>
                            <div className="text-lg font-bold text-[#1A1A1A] mb-2">運動</div>
                            <p className="text-sm text-[#1A1A1A]/80 leading-relaxed mb-3">ミトコンドリアを増やす唯一の確実な方法。</p>
                            <span className="inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>見る <span className="group-hover:translate-x-1 transition-transform">→</span></span>
                        </Link>
                        <Link href="/stimulants"
                            className="group block rounded-2xl border border-black p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all" style={{ background: '#E7EFD8' }}>
                            <div className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/50 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>ON YOUR HABITS</div>
                            <div className="text-lg font-bold text-[#1A1A1A] mb-2">嗜好品と体</div>
                            <p className="text-sm text-[#1A1A1A]/80 leading-relaxed mb-3">アルコール・タバコ・カフェイン。体への影響を知って、自分で選ぶ。</p>
                            <span className="inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>見る <span className="group-hover:translate-x-1 transition-transform">→</span></span>
                        </Link>
                        <Link href="/caffeine"
                            className="group block rounded-2xl border border-black p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all" style={{ background: '#EDE6D3' }}>
                            <div className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/50 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>CAFFEINE</div>
                            <div className="text-lg font-bold text-[#1A1A1A] mb-2">カフェイン</div>
                            <p className="text-sm text-[#1A1A1A]/80 leading-relaxed mb-3">眠気が飛ぶ仕組み・半減期・代謝の個人差から、自分に合うコーヒーの飲み方を。</p>
                            <span className="inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>見る <span className="group-hover:translate-x-1 transition-transform">→</span></span>
                        </Link>
                        <Link href="/detox"
                            className="group block rounded-2xl border border-black p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all" style={{ background: '#E7EFD8' }}>
                            <div className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/50 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>DETOX</div>
                            <div className="text-lg font-bold text-[#1A1A1A] mb-2">解毒</div>
                            <p className="text-sm text-[#1A1A1A]/80 leading-relaxed mb-3">肝臓・腸・腎臓に備わる本来の解毒システム。</p>
                            <span className="inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>見る <span className="group-hover:translate-x-1 transition-transform">→</span></span>
                        </Link>
                        <Link href="/reduce-toxins"
                            className="group block rounded-2xl border border-black p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all" style={{ background: '#E7EFD8' }}>
                            <div className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/50 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>REDUCE EXPOSURE</div>
                            <div className="text-lg font-bold text-[#1A1A1A] mb-2">有害物質を減らす暮らし</div>
                            <p className="text-sm text-[#1A1A1A]/80 leading-relaxed mb-3">農薬・水銀・マイクロプラスチック。「出す」と対になる「入れない」の話。</p>
                            <span className="inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>見る <span className="group-hover:translate-x-1 transition-transform">→</span></span>
                        </Link>
                        <Link href="/mycotoxins"
                            className="group block rounded-2xl border border-black p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all" style={{ background: '#E7EFD8' }}>
                            <div className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/50 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>FOOD SAFETY</div>
                            <div className="text-lg font-bold text-[#1A1A1A] mb-2">カビ毒と食の安全</div>
                            <p className="text-sm text-[#1A1A1A]/80 leading-relaxed mb-3">カビが作る有害物質「マイコトキシン」。種類と、家庭でできる減らし方。</p>
                            <span className="inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>見る <span className="group-hover:translate-x-1 transition-transform">→</span></span>
                        </Link>
                        <Link href="/nutrient-density"
                            className="group block rounded-2xl border border-black p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all" style={{ background: '#E7EFD8' }}>
                            <div className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/50 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>NUTRIENT DENSITY</div>
                            <div className="text-lg font-bold text-[#1A1A1A] mb-2">食べ物の栄養価の変化</div>
                            <p className="text-sm text-[#1A1A1A]/80 leading-relaxed mb-3">野菜の栄養素は数十年で減少傾向。一方、UV照射きのこは栄養価が上昇。事実ベースで。</p>
                            <span className="inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>見る <span className="group-hover:translate-x-1 transition-transform">→</span></span>
                        </Link>
                        <Link href="/wearables"
                            className="group block rounded-2xl border border-black p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all" style={{ background: '#DCE8EC' }}>
                            <div className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/50 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>WEARABLES</div>
                            <div className="text-lg font-bold text-[#1A1A1A] mb-2">ウェアラブル活用術</div>
                            <p className="text-sm text-[#1A1A1A]/80 leading-relaxed mb-3">Apple Watchで自分の体を読む。HRV・睡眠・心肺機能の活かし方。</p>
                            <span className="inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>見る <span className="group-hover:translate-x-1 transition-transform">→</span></span>
                        </Link>
                        <Link href="/cgm"
                            className="group block rounded-2xl border border-black p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all" style={{ background: '#DCE8EC' }}>
                            <div className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/50 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>CGM</div>
                            <div className="text-lg font-bold text-[#1A1A1A] mb-2">血糖モニタリング</div>
                            <p className="text-sm text-[#1A1A1A]/80 leading-relaxed mb-3">フリースタイルリブレ等で「何が自分の血糖を上げるか」を可視化。自分実験の道具。</p>
                            <span className="inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>見る <span className="group-hover:translate-x-1 transition-transform">→</span></span>
                        </Link>
                        <Link href="/supplements"
                            className="group block rounded-2xl border border-black p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all" style={{ background: '#EDE6D3' }}>
                            <div className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/50 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>SUPPLEMENTS</div>
                            <div className="text-lg font-bold text-[#1A1A1A] mb-2">サプリメントの選び方</div>
                            <p className="text-sm text-[#1A1A1A]/80 leading-relaxed mb-3">形態・吸収・タイミングで効きが変わる。賢い選び方の地図。</p>
                            <span className="inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>見る <span className="group-hover:translate-x-1 transition-transform">→</span></span>
                        </Link>
                    </div>
                </div>

                {/* 症状から引く */}
                <div id="symptoms" className="mt-20 md:mt-24 scroll-mt-24">
                    <div className="mb-5 flex items-stretch gap-3">
                        <span className="w-1.5 rounded-full bg-[#41C9B4]" />
                        <div className="py-0.5">
                            <p className="text-3xl md:text-4xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>症状から引く</p>
                            <p className="text-[10px] tracking-[0.2em] font-bold text-[#41C9B4]/60 mt-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>FROM SYMPTOMS</p>
                        </div>
                    </div>
                    <p className="text-sm text-[#4A4A4A] leading-relaxed mb-5">
                        「疲れやすい」「頭がぼんやり」「冷える」——気になる<strong>不調</strong>から逆引きで、考えられる背景・確認したい血液検査・関わる栄養素・関連する体のしくみへたどれます。原因の「あたり」をつける入口に。
                    </p>
                    <Link href="/symptoms"
                        className="group block rounded-2xl border border-black p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all" style={{ background: '#F0E7E0' }}>
                        <div className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/50 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            FROM SYMPTOMS
                        </div>
                        <div className="text-xl md:text-2xl font-bold text-[#1A1A1A] mb-2">症状から引く（14の不調）</div>
                        <p className="text-sm text-[#1A1A1A]/80 leading-relaxed mb-3">疲れ・ブレインフォグ・冷え・動悸・めまい・むくみ・アレルギー・気分の落ち込みなどから、背景と打ち手を逆引き。</p>
                        <span className="inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            見る <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </span>
                    </Link>
                </div>

                {/* 思索（〇〇とは？） */}
                <div id="thoughts" className="mt-20 md:mt-24 scroll-mt-24">
                    <div className="mb-5 flex items-stretch gap-3">
                        <span className="w-1.5 rounded-full bg-[#41C9B4]" />
                        <div className="py-0.5">
                            <p className="text-3xl md:text-4xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>思索</p>
                            <p className="text-[10px] tracking-[0.2em] font-bold text-[#41C9B4]/60 mt-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>THOUGHTS</p>
                        </div>
                    </div>
                    <p className="text-sm text-[#4A4A4A] leading-relaxed mb-5">
                        運命、自由、老い、幸せ——答えの出ない<strong>問い</strong>を「体・健康・生き方」の側から考えるコラム。哲学のようでいて、結局は今日の暮らし方の話です。
                    </p>
                    <Link href="/thoughts"
                        className="group block rounded-2xl border border-black p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all" style={{ background: '#E7E0F2' }}>
                        <div className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/50 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            THOUGHTS
                        </div>
                        <div className="text-xl md:text-2xl font-bold text-[#1A1A1A] mb-2">〇〇とは？</div>
                        <p className="text-sm text-[#1A1A1A]/80 leading-relaxed mb-3">運命とは？自由とは？老いるとは？幸せとは？——体の側から問いを見つめるエッセイ。</p>
                        <span className="inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            読む <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </span>
                    </Link>
                </div>

                {/* 著書：健康とは、カウンターカルチャーである */}
                <div className="mt-20 md:mt-24">
                    <div className="mb-5 flex items-stretch gap-3">
                        <span className="w-1.5 rounded-full bg-[#C0392B]" />
                        <div className="py-0.5">
                            <p className="text-3xl md:text-4xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>学んで、感じたこと</p>
                            <p className="text-[10px] tracking-[0.2em] font-bold text-[#C0392B]/70 mt-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>MANIFESTO</p>
                        </div>
                    </div>
                    <Link href="/health-counterculture"
                        className="group block rounded-2xl border border-black overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all" style={{ background: '#EAE6DD' }}>
                        <div className="flex flex-col sm:flex-row items-center gap-5 md:gap-7 p-6 md:p-8">
                            <div className="flex-shrink-0 w-[130px] h-[185px] rounded-md border border-black/20 flex flex-col items-center justify-center text-center px-3 shadow-sm" style={{ background: '#C0392B' }}>
                                <span className="text-white font-bold leading-snug" style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: '14px' }}>健康とは、カウンターカルチャーである。</span>
                                <span className="mt-2 text-white/80 text-[10px]">小林 大介</span>
                            </div>
                            <div className="flex-1 text-center sm:text-left">
                                <div className="text-[10px] font-bold tracking-widest text-[#C0392B] mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>身体から始める静かな反抗</div>
                                <div className="text-xl md:text-2xl font-bold text-[#1A1A1A] mb-3">健康とは、カウンターカルチャーである。</div>
                                <p className="text-sm text-[#4A4A4A] leading-relaxed mb-4">
                                    生化学や栄養学を学んでいくうちに、たどり着いた一つの実感——健康とは、もう一度<strong>自分の身体の主権を取り戻す</strong>静かな反抗なのではないか。学びの先に感じたことを綴った一冊を、章ごとに紹介します。
                                </p>
                                <span className="inline-flex items-center gap-1 px-5 py-2 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                    読む <span className="group-hover:translate-x-1 transition-transform">→</span>
                                </span>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* 参照文献・書籍への導線 */}
                <div className="mt-20 md:mt-24 text-center">
                    <div className="flex flex-wrap justify-center gap-3">
                        <Link href="/references"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FF9855] text-sm font-bold text-[#1A1A1A] hover:opacity-90 transition">
                            解説の参照文献・出典を見る
                            <span>→</span>
                        </Link>
                        <Link href="/books"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-black text-sm font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white transition">
                            おすすめ書籍を見る
                            <span>→</span>
                        </Link>
                    </div>
                    <p className="text-xs text-[#4A4A4A]/70 mt-3">NIH・WHO・査読論文など、解説が依拠する一次情報をテーマ別にまとめています。</p>
                </div>

                {/* 進化していくLibrary */}
                <div className="mt-12 md:mt-16 rounded-2xl border border-black p-6 md:p-8 text-center" style={{ background: '#EFEAF6' }}>
                    <p className="text-[10px] font-bold tracking-widest text-[#41C9B4] mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>ALWAYS EVOLVING</p>
                    <h2 className="text-lg md:text-xl font-bold text-[#1A1A1A] mb-3">このライブラリは、完成品ではありません</h2>
                    <p className="text-sm text-[#4A4A4A] leading-loose max-w-[560px] mx-auto">
                        精密栄養学は、いまも世界で研究が進む<strong>発展途上の分野</strong>です。だからこのLibraryも、一度作って終わりではなく、新しい知見が見つかるたびに見直し、加筆し、ときに書き換えながら、<strong>常に進化し続けます</strong>。今日ここに書かれていることも、未来にはもっと深く、正確になっているはずです。
                    </p>
                </div>

                {/* セルフチェックへの導線 */}
                <div className="bg-white border border-black rounded-2xl p-6 md:p-8 text-center mt-12 md:mt-16">
                    <p className="text-xs tracking-widest font-bold mb-3 text-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        START HERE
                    </p>
                    <h2 className="text-lg md:text-xl font-bold mb-3 text-[#1A1A1A]">
                        まずは自分の状態を知るところから
                    </h2>
                    <p className="text-sm text-[#4A4A4A] leading-relaxed mb-5 max-w-[480px] mx-auto">
                        12問・約2分のセルフチェックで、あなたのミトコンドリア活性度を可視化できます。無料・登録不要。
                    </p>
                    <Link href="/check" className="inline-block px-8 py-3 rounded-full text-sm font-bold hover:opacity-90 transition"
                        style={{ fontFamily: "'Space Grotesk', sans-serif", background: '#1A1A1A', color: '#FFFFFF' }}>
                        無料セルフチェックを試す →
                    </Link>
                </div>
            </div>
        </div>
    );
}
