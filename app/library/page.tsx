import Link from 'next/link';
import { genes } from '@/lib/genes';
import { nutrients } from '@/lib/nutrients';
import { biomarkers } from '@/lib/biomarkers';

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
        illustration: '/images/for-you-science.png',
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
        illustration: '/images/experience_vitality_new.png',
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
        illustration: '/images/for-you-wellness.png',
        description: '体をつくり、整える「材料」。タンパク質・ビタミン・ミネラルなど、体を支えるための栄養素を働き・食品・摂り方から解説します。',
    },
];

export default function LibraryIndex() {
    return (
        <div className="relative overflow-hidden pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen" style={{ background: '#ECE6F3' }}>
            {/* Decorative illustrations */}
            <img src="/images/about-illustration-bg.png" alt="" className="absolute pointer-events-none opacity-70"
                style={{ top: '40px', right: '-90px', width: '380px' }} />
            <img src="/images/experience_vitality_new.png" alt="" className="absolute pointer-events-none opacity-70 hidden md:block"
                style={{ bottom: '-50px', left: '-60px', width: '260px', transform: 'rotate(-6deg)' }} />

            <div className="max-w-[920px] mx-auto relative" style={{ zIndex: 1 }}>
                {/* Hero */}
                <div className="text-center mb-12">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>
                        KNOWLEDGE LIBRARY
                    </p>
                    <h1 className="text-4xl md:text-6xl font-bold mb-5 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        LIBRARY
                    </h1>
                    <p className="text-[#4A4A4A] max-w-[620px] mx-auto leading-relaxed">
                        自分の体を読み解く、3つの視点。<br className="hidden md:block" />
                        <strong>遺伝子（設計図）</strong>・<strong>血液検査（現在地）</strong>・<strong>栄養素（材料）</strong>をつなげて理解する知識ライブラリです。
                    </p>
                </div>

                {/* 関係性の説明 */}
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 md:p-8 mb-12 border border-black">
                    <p className="text-xl md:text-2xl font-bold tracking-wide mb-4 text-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        HOW THEY CONNECT ／ 3つはつながっている
                    </p>
                    <div className="flex flex-col md:flex-row items-stretch gap-3 md:gap-2">
                        {sections.map((s, i) => (
                            <div key={s.href} className="flex items-center gap-3 md:gap-2 flex-1">
                                <div className="flex-1 rounded-xl p-4 text-center border border-black" style={{ background: s.color }}>
                                    <div className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/50 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                        {s.label}
                                    </div>
                                    <div className="text-base font-bold text-[#1A1A1A]">{s.ja}</div>
                                    <div className="text-xs text-[#1A1A1A]/60 mt-0.5">{s.role}</div>
                                </div>
                                {i < sections.length - 1 && (
                                    <span className="text-[#1A1A1A]/30 font-bold rotate-90 md:rotate-0">→</span>
                                )}
                            </div>
                        ))}
                    </div>
                    <p className="text-sm text-[#4A4A4A] leading-relaxed mt-5">
                        生まれ持った<strong>遺伝子</strong>という設計図があり、今の状態は<strong>血液検査</strong>で「現在地」として可視化できます。そして<strong>栄養素</strong>は、その差を埋めて体をつくり整えるための「材料」です。3つを行き来することで、自分の体への理解が立体的になります。
                    </p>

                    {/* 3つのセクションカード */}
                    <div className="space-y-4 mt-6 pt-6 border-t border-[#1A1A1A]/10">
                    {sections.map((s) => (
                        <Link
                            key={s.href}
                            href={s.href}
                            className="group flex flex-col md:flex-row items-stretch overflow-hidden rounded-2xl border border-black hover:shadow-lg hover:-translate-y-0.5 transition-all"
                            style={{ background: s.color }}
                        >
                            <div className="flex-shrink-0 flex items-center justify-center p-6 md:w-[220px] relative overflow-hidden">
                                <img src={s.illustration} alt="" className="pointer-events-none w-[160px] md:w-[180px] opacity-90 group-hover:scale-105 transition-transform" />
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
                                <div className="flex items-center gap-2 text-sm font-bold text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                    <span>{s.count} {s.unit}を見る</span>
                                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                    </div>
                </div>

                {/* からだのしくみ */}
                <div className="mt-12">
                    <p className="text-xl md:text-2xl font-bold tracking-wide mb-4 text-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        MECHANISM ／ からだのしくみ
                    </p>
                    <p className="text-sm text-[#4A4A4A] leading-relaxed mb-5">
                        栄養素や生活習慣がなぜ効くのか——その答えは、細胞の中で起きている仕組みにあります。エネルギー産生から、腸と脳のつながり、細胞の再生まで。
                    </p>
                    <Link href="/mitochondria"
                        className="group block rounded-2xl border border-black p-6 mb-4 hover:shadow-lg hover:-translate-y-0.5 transition-all" style={{ background: '#CFEAEC' }}>
                        <div className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/50 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            START HERE ／ THE POWERHOUSE
                        </div>
                        <div className="text-xl md:text-2xl font-bold text-[#1A1A1A] mb-2">ミトコンドリアとは</div>
                        <p className="text-sm text-[#1A1A1A]/80 leading-relaxed mb-3">すべての出発点。細胞のエネルギー工場とは何か、なぜ40代で重要か、どう元気に保つか。</p>
                        <span className="inline-flex items-center gap-1 text-sm font-bold text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            見る <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </span>
                    </Link>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <Link href="/tca-cycle"
                            className="group block rounded-2xl border border-black p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all" style={{ background: '#FFE9D2' }}>
                            <div className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/50 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                TCA CYCLE
                            </div>
                            <div className="text-lg font-bold text-[#1A1A1A] mb-2">TCA回路</div>
                            <p className="text-sm text-[#1A1A1A]/80 leading-relaxed mb-3">食べたものをエネルギーに変える、ミトコンドリアの中心エンジン。</p>
                            <span className="inline-flex items-center gap-1 text-sm font-bold text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
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
                            <span className="inline-flex items-center gap-1 text-sm font-bold text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
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
                            <span className="inline-flex items-center gap-1 text-sm font-bold text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
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
                            <span className="inline-flex items-center gap-1 text-sm font-bold text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
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
                            <span className="inline-flex items-center gap-1 text-sm font-bold text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                見る <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </span>
                        </Link>
                    </div>
                </div>

                {/* 老化の2大ルート */}
                <div className="mt-12">
                    <p className="text-xl md:text-2xl font-bold tracking-wide mb-4 text-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        AGING ／ 老化の3大ルート
                    </p>
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
                            <span className="inline-flex items-center gap-1 text-sm font-bold text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
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
                            <span className="inline-flex items-center gap-1 text-sm font-bold text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
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
                            <span className="inline-flex items-center gap-1 text-sm font-bold text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                見る <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </span>
                        </Link>
                    </div>
                </div>

                {/* ホルモン */}
                <div className="mt-12">
                    <p className="text-xl md:text-2xl font-bold tracking-wide mb-4 text-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        HORMONES ／ ホルモン
                    </p>
                    <p className="text-sm text-[#4A4A4A] leading-relaxed mb-5">
                        体じゅうに指令を届ける化学メッセンジャー。40代以降の変化と、血液検査とのつながり。
                    </p>
                    <Link href="/hormones"
                        className="group block rounded-2xl border border-black p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all" style={{ background: '#ECDCE6' }}>
                        <div className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/50 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            HORMONES
                        </div>
                        <div className="text-xl md:text-2xl font-bold text-[#1A1A1A] mb-2">ホルモンの種類</div>
                        <p className="text-sm text-[#1A1A1A]/80 leading-relaxed mb-3">性ホルモン・ストレス・代謝・甲状腺・睡眠まで、主なホルモンの役割と対応する血液検査。</p>
                        <span className="inline-flex items-center gap-1 text-sm font-bold text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            見る <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </span>
                    </Link>
                </div>

                {/* セルフチェックへの導線 */}
                <div className="bg-white border border-black rounded-2xl p-6 md:p-8 text-center mt-12">
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
