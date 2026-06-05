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
                        設計図を読み、<br />現在地を知り、<br />材料で整える。
                    </h1>
                    <p className="text-sm md:text-base text-[#4A4A4A] max-w-[600px] leading-relaxed">
                        遺伝子・血液検査・栄養素をつなげて、自分の体を読み解く知識ライブラリ。
                    </p>
                </div>

                {/* 横断検索 */}
                <LibrarySearch />

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

                {/* 精密栄養学とは（思想の入口） */}
                <Link href="/precision-nutrition"
                    className="group mb-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 rounded-2xl border border-black bg-white/70 p-5 md:p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all">
                    <div className="flex-shrink-0">
                        <span className="text-[10px] font-bold tracking-widest text-[#41C9B4]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>START HERE ／ THE APPROACH</span>
                        <div className="text-xl md:text-2xl font-bold text-[#1A1A1A] mt-1">精密栄養学とは</div>
                    </div>
                    <p className="flex-1 text-sm text-[#4A4A4A] leading-relaxed">
                        このライブラリ全体を貫く考え方。「みんなの平均」ではなく「あなたの最適」を探す——その読み解き方をまず知ることから。
                    </p>
                    <span className="flex-shrink-0 inline-flex items-center gap-1 px-5 py-2 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        読む <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                </Link>

                {/* なぜ、未病予防か（ミッション） */}
                <Link href="/mission"
                    className="group mb-12 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 rounded-2xl border border-black bg-white/70 p-5 md:p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all">
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

                {/* 身体の地図 */}
                <div id="map" className="mb-20 md:mb-24 scroll-mt-24">
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
                    <Link href="/molecular-nutrition#biochemistry"
                        className="group block rounded-2xl border border-dashed border-[#1A1A1A]/40 p-5 mb-4 hover:border-[#1A1A1A] hover:bg-white/40 transition-all">
                        <div className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/45 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            FOUNDATION ／ すべての土台
                        </div>
                        <div className="text-base md:text-lg font-bold text-[#1A1A1A] mb-1">生化学とは？</div>
                        <p className="text-sm text-[#1A1A1A]/70 leading-relaxed">これから挙げる仕組みは、すべて「体の中の化学反応＝生化学」の話。栄養がなぜ効くのか、その土台をまず一言で。
                            <span className="inline-block ml-1 font-bold text-[#1A1A1A] group-hover:translate-x-0.5 transition-transform">→</span>
                        </p>
                    </Link>
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

                {/* 老化の2大ルート */}
                <div id="aging" className="mt-20 md:mt-24 scroll-mt-24">
                    <div className="mb-5 flex items-stretch gap-3">
                        <span className="w-1.5 rounded-full bg-[#41C9B4]" />
                        <div className="py-0.5">
                            <p className="text-3xl md:text-4xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>老化</p>
                            <p className="text-[10px] tracking-[0.2em] font-bold text-[#41C9B4]/60 mt-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>AGING</p>
                        </div>
                    </div>
                    <p className="text-sm text-[#4A4A4A] leading-relaxed mb-5">
                        体の老化は、大きく「さびる（酸化）」「こげる（糖化）」「くすぶる（慢性炎症）」の3つの道で進みます。どれも連動し、互いを加速させます。
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <Link href="/oxidative-stress"
                            className="group block rounded-2xl border border-black p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all" style={{ background: '#F3DEDE' }}>
                            <div className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/50 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                OXIDATIVE STRESS
                            </div>
                            <div className="text-lg font-bold text-[#1A1A1A] mb-2">活性酸素（さびる）</div>
                            <p className="text-sm text-[#1A1A1A]/80 leading-relaxed mb-3">体がさびる酸化ストレスと、抗酸化のバランス。</p>
                            <span className="inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                見る <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </span>
                        </Link>
                        <Link href="/glycation"
                            className="group block rounded-2xl border border-black p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all" style={{ background: '#F6E6CF' }}>
                            <div className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/50 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                GLYCATION
                            </div>
                            <div className="text-lg font-bold text-[#1A1A1A] mb-2">糖化（こげる）</div>
                            <p className="text-sm text-[#1A1A1A]/80 leading-relaxed mb-3">余った糖が組織を劣化させるAGEs。血糖との関係。</p>
                            <span className="inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                見る <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </span>
                        </Link>
                        <Link href="/inflammation"
                            className="group block rounded-2xl border border-black p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all" style={{ background: '#F6DCD0' }}>
                            <div className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/50 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                INFLAMMATION
                            </div>
                            <div className="text-lg font-bold text-[#1A1A1A] mb-2">慢性炎症（くすぶる）</div>
                            <p className="text-sm text-[#1A1A1A]/80 leading-relaxed mb-3">自覚なくくすぶる弱い炎症。老化と万病の隠れた土台。</p>
                            <span className="inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                見る <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </span>
                        </Link>
                    </div>
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
                            { href: '/mindfulness', en: 'BREATH', ja: 'マインドフルネス・呼吸', note: '呼吸という、自律神経への手動スイッチ。', bg: '#EFEAF6' },
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
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <Link href="/psychedelics-research"
                            className="group flex items-center gap-3 rounded-xl border border-dashed border-[#1A1A1A]/40 p-4 hover:border-[#1A1A1A] hover:bg-white/40 transition-all">
                            <div className="flex-1">
                                <div className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/45 mb-0.5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>RESEARCH FRONTIER</div>
                                <div className="text-sm font-bold text-[#1A1A1A]">サイケデリック研究の潮流<span className="font-normal text-[#1A1A1A]/60">（中立・日本では違法）</span></div>
                            </div>
                            <span className="flex-shrink-0 text-[#1A1A1A] font-bold group-hover:translate-x-1 transition-transform">→</span>
                        </Link>
                        <Link href="/cannabis"
                            className="group flex items-center gap-3 rounded-xl border border-dashed border-[#1A1A1A]/40 p-4 hover:border-[#1A1A1A] hover:bg-white/40 transition-all">
                            <div className="flex-1">
                                <div className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/45 mb-0.5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>HISTORY &amp; POLICY</div>
                                <div className="text-sm font-bold text-[#1A1A1A]">大麻をめぐる歴史と世界の動き<span className="font-normal text-[#1A1A1A]/60">（中立・日本では違法）</span></div>
                            </div>
                            <span className="flex-shrink-0 text-[#1A1A1A] font-bold group-hover:translate-x-1 transition-transform">→</span>
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
                        <Link href="/wearables"
                            className="group block rounded-2xl border border-black p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all" style={{ background: '#DCE8EC' }}>
                            <div className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/50 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>WEARABLES</div>
                            <div className="text-lg font-bold text-[#1A1A1A] mb-2">ウェアラブル活用術</div>
                            <p className="text-sm text-[#1A1A1A]/80 leading-relaxed mb-3">Apple Watchで自分の体を読む。HRV・睡眠・心肺機能の活かし方。</p>
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
                        <div className="text-xl md:text-2xl font-bold text-[#1A1A1A] mb-2">症状から引く（10の不調）</div>
                        <p className="text-sm text-[#1A1A1A]/80 leading-relaxed mb-3">疲れ・ブレインフォグ・冷え・むくみ・気分の落ち込みなどから、背景と打ち手を逆引き。</p>
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

                {/* 参照文献への導線 */}
                <div className="mt-20 md:mt-24 text-center">
                    <Link href="/references"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FF9855] text-sm font-bold text-[#1A1A1A] hover:opacity-90 transition">
                        解説の参照文献・出典を見る
                        <span>→</span>
                    </Link>
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
