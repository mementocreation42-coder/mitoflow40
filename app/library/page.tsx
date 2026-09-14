import Link from 'next/link';
import type { CSSProperties } from 'react';
import LibrarySearch from '@/components/LibrarySearch';
import TextbookResume from '@/components/TextbookResume';
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
        siteName: 'Mitoflow40',
        locale: 'ja_JP',
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
        illustration: '/images/about/about-illustration-bg.png',
        description: '生まれ持った体質の「設計図」。MTHFRやCOMTなど、栄養の使い方やストレス耐性を左右する主要遺伝子を解説します。',
        short: '体質の「設計図」。MTHFRやCOMTなど主要遺伝子を解説。',
    },
    {
        href: '/biomarkers',
        label: 'BIOMARKERS',
        ja: '血液検査',
        role: '現在地',
        count: biomarkers.length,
        unit: '項目',
        color: '#DEEDF7',
        illustration: '/images/misc/24.png',
        description: '今の体の「現在地」。血液検査50項目を精密栄養学の視点で読み解き、基準値だけでなく理想値から状態を捉えます。',
        short: '体の「現在地」。血液検査50項目を理想値から読む。',
    },
    {
        href: '/nutrients',
        label: 'NUTRIENTS',
        ja: '栄養素',
        role: '材料',
        count: nutrients.length,
        unit: '栄養素',
        color: '#FCE3D4',
        illustration: '/images/misc/2.png',
        description: '体をつくり、整える「材料」。タンパク質・ビタミン・ミネラルなど、体を支えるための栄養素を働き・食品・摂り方から解説します。',
        short: '体をつくる「材料」。栄養素を働き・食品・摂り方から解説。',
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
        illustration: '/images/misc/25.png',
        description: '「材料」を実際に運ぶ食卓。卵・鮭・納豆など身近な食材で何が摂れるか、40代向けの食べ方・組み合わせから解説します。',
        short: '「材料」を運ぶ食卓。身近な食材で何が摂れるかを解説。',
    },
    {
        href: '/food-topics',
        label: 'FOOD TOPICS',
        ja: '食のテーマ',
        role: '論点',
        count: 6,
        unit: 'テーマ',
        color: '#FBE9D0',
        illustration: '/images/for-you/for-you-science.png',
        description: '「小麦は悪い？」「玄米が正義？」「食べない時間は効く？」「カロリーは健康の指標？」。食卓でよく迷うテーマを、良い・悪いで決めつけずに切り分けて読めるようにしました。',
        short: '小麦・玄米・断食・カロリー。迷いやすい食のテーマを切り分けて読む。',
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
        illustration: '/images/misc/13.png',
        description: '肝臓・腎臓・腸・心臓・脳など、主要な内臓の役割。40代での変化と、関わる血液検査・栄養素をあわせて読み解きます。',
        short: '肝臓・腎臓・腸・心臓・脳の役割と、40代での変化。',
    },
];

type HubSection = { href: string; label: string; ja: string; role: string; count: number; unit: string; color: string; illustration: string; description: string; short?: string };

function HubCard({ s }: { s: HubSection }) {
    return (
        <Link
            href={s.href}
            className="group relative flex flex-row items-stretch overflow-hidden rounded-2xl border border-black hover:shadow-lg hover:-translate-y-0.5 transition-all"
            style={{ background: s.color }}
        >
            <div className="hidden md:flex flex-shrink-0 items-center justify-center p-4 w-[190px] relative overflow-hidden">
                <img loading="lazy" decoding="async" src={s.illustration} alt="" className="pointer-events-none w-[140px] opacity-90 transition-transform" />
            </div>
            <img loading="lazy" decoding="async" src={s.illustration} alt="" className="md:hidden pointer-events-none absolute right-2 bottom-1 w-[120px] opacity-25" />
            <div className="relative flex-1 p-4 md:p-6 md:pl-2 md:pr-8">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                    <span className="text-xl md:text-3xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        {s.label}
                    </span>
                    <span className="text-sm font-bold text-[#1A1A1A]/70">{s.ja}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-white/70 text-[#1A1A1A]/70 font-bold">{s.role}</span>
                </div>
                <p className="text-[13px] leading-[1.6] md:text-sm md:leading-relaxed text-[#1A1A1A]/80 mb-3 md:mb-4"><span className="md:hidden">{s.short ?? s.description}</span><span className="hidden md:inline">{s.description}</span></p>
                <div className="inline-flex w-fit items-center gap-2 px-5 py-1.5 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    <span>{s.count} {s.unit}を見る</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
            </div>
        </Link>
    );
}

const TOC = [
    { href: '#map', n: '01', label: '身体の地図', bg: '#CFE8F0', accent: '#3AA7C9' },
    { href: '#food', n: '02', label: '食べ物', bg: '#FBE9D0', accent: '#E39A2E' },
    { href: '#lifestyle', n: '03', label: '生活習慣', bg: '#E7EFD8', accent: '#7DAE4A' },
    { href: '#organs', n: '04', label: '内臓・臓器', bg: '#F0E2D8', accent: '#C98A5E' },
    { href: '#mechanism', n: '05', label: '身体の仕組み', bg: '#D7F0E8', accent: '#2FB59F' },
    { href: '#hormones', n: '06', label: 'ホルモン', bg: '#F3E0EC', accent: '#C96BA3' },
    { href: '#aging', n: '07', label: '老化と不調', bg: '#F7E2DC', accent: '#E07A6A' },
    { href: '#mind', n: '08', label: '心とからだ', bg: '#E6E0F2', accent: '#8B78C9' },
    { href: '#symptoms', n: '09', label: '症状から引く', bg: '#FDEAD0', accent: '#EE9A3C' },
    { href: '#frontier', n: '10', label: 'フロンティア', bg: '#E2EAF2', accent: '#5B86B8' },
    { href: '#thoughts', n: '11', label: '思索', bg: '#ECE6DA', accent: '#A08F6A' },
    { href: '#approach', n: '', label: '考え方と立ち位置', bg: '#F1EDE4', accent: '#7A7A7A' },
];

export default function LibraryIndex() {
    return (
        <div className="relative overflow-x-clip pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen" style={{ background: '#ECE6F3' }}>
            {/* Decorative illustrations */}
            <img loading="lazy" decoding="async" src="/images/for-you/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block mf-deco-flip"
                style={{ top: '-48px', right: '0', width: '260px' }} />
            <img loading="lazy" decoding="async" src="/images/misc/24.png" alt="" className="absolute pointer-events-none mf-deco mf-deco-delay"
                style={{ bottom: '8px', left: '8px', width: '260px' }} />

            <div className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                {/* Hero */}
                <div className="mb-8 md:mb-12">
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

                {/* 横断検索 ＋ ライブラリマップへの導線 */}
                <div className="my-5 md:my-12 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 [&>div]:!my-0 [&>div]:!mx-0 [&>div]:w-full sm:[&>div]:w-auto">
                    <LibrarySearch />
                    <div className="flex w-full sm:w-auto gap-2 sm:gap-3 sm:contents">
                    <Link href="/library/map"
                        className="shrink-0 flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-4 rounded-full bg-white border border-black text-[13px] sm:text-sm font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors whitespace-nowrap">
                        🗺️ <span className="sm:hidden">マップ</span><span className="hidden sm:inline">ライブラリマップ</span>
                    </Link>
                    <Link href="/textbook"
                        className="shrink-0 flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-4 rounded-full bg-white border border-black text-[13px] sm:text-sm font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors whitespace-nowrap">
                        📖 <span className="sm:hidden">教科書</span><span className="hidden sm:inline">教科書（読む順）</span>
                    </Link>
                    </div>
                </div>

                {/* 目次（sticky） */}
                <nav aria-label="ライブラリの目次" className="static md:sticky top-[60px] z-20 py-2 mb-6 md:mb-8">
                    <div className="grid grid-cols-3 gap-1.5 md:flex md:flex-wrap md:justify-center md:gap-2.5">
                        {TOC.map((t) => (
                            <a key={t.href} href={t.href}
                                className="group inline-flex items-center justify-center md:justify-start gap-1 md:gap-2 px-2 md:px-4 py-1 md:py-2 rounded-full border text-[11px] md:text-[15px] font-bold text-[#1A1A1A] whitespace-nowrap shadow-sm bg-[var(--chip-bg)] hover:bg-[var(--chip)] hover:text-white transition-colors"
                                style={{ borderColor: t.accent, ['--chip-bg' as string]: t.bg, ['--chip' as string]: t.accent } as CSSProperties}>
                                {t.n && <span className="text-[var(--chip)] group-hover:text-white transition-colors" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{t.n}</span>}
                                {t.label}
                            </a>
                        ))}
                    </div>
                </nav>

                {/* 教科書の続き（読み進みがある人だけ） */}
                <TextbookResume />

                {/* はじめに */}
                <div id="intro" className="mt-8 md:mt-12 mb-3 md:mb-5 flex items-stretch gap-3 scroll-mt-24 md:scroll-mt-60">
                    <span className="w-1.5 rounded-full bg-[#41C9B4]" />
                    <div className="py-0.5">
                        <h2 className="text-2xl md:text-4xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>はじめに</h2>
                        <p className="text-[10px] tracking-[0.2em] font-bold text-[#41C9B4]/60 mt-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>START HERE</p>
                    </div>
                </div>

                {/* 健康とは（思想の最上流） */}
                <Link href="/health-philosophy"
                    className="group mb-3 md:mb-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5 rounded-2xl border border-black bg-white/70 p-4 md:p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all">
                    <div className="flex-shrink-0">
                        <span className="text-[10px] font-bold tracking-widest text-[#41C9B4]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>THE APPROACH</span>
                        <div className="text-xl md:text-2xl font-bold text-[#1A1A1A] mt-1">健康とは</div>
                    </div>
                    <p className="flex-1 text-[13px] leading-[1.6] md:text-sm md:leading-relaxed text-[#4A4A4A]"><span className="md:hidden">「病気でない」がゴールではない。本来の力を発揮できる状態へ。</span><span className="hidden md:inline">「病気でない」がゴールではありません。本来の力を発揮できる状態へ——すべての土台になる、Mitoflow40の健康の考え方。</span></p>
                    <span className="flex-shrink-0 inline-flex items-center gap-1 px-5 py-1.5 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        読む <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                </Link>

                {/* 精密栄養学とは（思想の入口） */}
                <Link href="/precision-nutrition"
                    className="group mb-3 md:mb-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5 rounded-2xl border border-black bg-white/70 p-4 md:p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all">
                    <div className="flex-shrink-0">
                        <span className="text-[10px] font-bold tracking-widest text-[#41C9B4]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>THE APPROACH</span>
                        <div className="text-xl md:text-2xl font-bold text-[#1A1A1A] mt-1">精密栄養学とは</div>
                    </div>
                    <p className="flex-1 text-[13px] leading-[1.6] md:text-sm md:leading-relaxed text-[#4A4A4A]"><span className="md:hidden">「みんなの平均」ではなく「あなたの最適」を探す読み解き方。</span><span className="hidden md:inline">このライブラリ全体を貫く考え方。「みんなの平均」ではなく「あなたの最適」を探す——その読み解き方をまず知ることから。</span></p>
                    <span className="flex-shrink-0 inline-flex items-center gap-1 px-5 py-1.5 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        読む <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                </Link>

                {/* 生化学・栄養学を知ることの価値 */}
                <Link href="/nutrition-literacy"
                    className="group mb-8 md:mb-12 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5 rounded-2xl border border-black bg-white/70 p-4 md:p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all">
                    <div className="flex-shrink-0">
                        <span className="text-[10px] font-bold tracking-widest text-[#41C9B4]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>WHY IT MATTERS</span>
                        <div className="text-xl md:text-2xl font-bold text-[#1A1A1A] mt-1">学ぶと、何が変わる？</div>
                    </div>
                    <p className="flex-1 text-[13px] leading-[1.6] md:text-sm md:leading-relaxed text-[#4A4A4A]"><span className="md:hidden">仕組みがわかれば、情報に振り回されず自分の体を読める。</span><span className="hidden md:inline">体の仕組みがわかると、健康情報に振り回されず、自分の体を自分で読み解ける。学ぶことが、これからの数十年を支える力になる理由。</span></p>
                    <span className="flex-shrink-0 inline-flex items-center gap-1 px-5 py-1.5 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        読む <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                </Link>

                {/* 身体の地図 */}
                <div id="map" className="mt-10 md:mt-16 mb-12 md:mb-24 scroll-mt-24 md:scroll-mt-60">
                    <div className="mb-3 md:mb-5 flex items-stretch gap-3">
                        <span className="w-1.5 rounded-full" style={{ background: '#3AA7C9' }} />
                        <div className="py-0.5">
                            <h2 className="text-2xl md:text-4xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}><span className="text-base md:text-lg font-bold mr-3 align-middle" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#3AA7C9' }}>01</span>身体の地図</h2>
                            <p className="text-[10px] tracking-[0.2em] font-bold mt-1" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#3AA7C9', opacity: 0.7 }}>HOW THEY CONNECT</p>
                        </div>
                    </div>
                    <p className="text-[13px] leading-[1.6] md:text-sm md:leading-relaxed text-[#4A4A4A] mb-4 md:mb-5"><span className="md:hidden">設計図（遺伝子）・現在地（血液検査）・材料（栄養素）。3つを行き来して体を読む。</span><span className="hidden md:inline">生まれ持った<strong>遺伝子</strong>という設計図があり、今の状態は<strong>血液検査</strong>で「現在地」として可視化できます。そして<strong>栄養素</strong>は、その差を埋めて体をつくり整えるための「材料」です。3つを行き来することで、自分の体への理解が立体的になります。</span></p>

                    {/* 3つのセクションカード */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
                    {sections.map((s) => (
                        <Link
                            key={s.href}
                            href={s.href}
                            className="group relative flex flex-col overflow-hidden rounded-2xl border border-black hover:shadow-lg hover:-translate-y-0.5 transition-all"
                            style={{ background: s.color }}
                        >
                            <div className="hidden sm:flex items-center justify-center pt-5 px-4">
                                <img loading="lazy" decoding="async" src={s.illustration} alt="" className="pointer-events-none w-[120px] md:w-[130px] opacity-90 transition-transform" />
                            </div>
                            <img loading="lazy" decoding="async" src={s.illustration} alt="" className="sm:hidden pointer-events-none absolute right-2 top-2 w-[110px] opacity-25" />
                            <div className="relative flex-1 flex flex-col p-4 sm:p-5">
                                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 mb-2">
                                    <span className="text-2xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                        {s.label}
                                    </span>
                                    <span className="text-sm font-bold text-[#1A1A1A]/70">{s.ja}</span>
                                    <span className="text-xs px-2 py-0.5 rounded-full bg-white/70 text-[#1A1A1A]/70 font-bold">{s.role}</span>
                                </div>
                                <p className="flex-1 text-[13px] leading-[1.6] md:text-sm md:leading-relaxed text-[#1A1A1A]/80 mb-3 sm:mb-4"><span className="md:hidden">{s.short ?? s.description}</span><span className="hidden md:inline">{s.description}</span></p>
                                <div className="inline-flex w-fit items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                    <span>{s.count} {s.unit}を見る</span>
                                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                    </div>
                </div>

                {/* 食べ物 */}
                <div id="food" className="mt-10 md:mt-24 scroll-mt-24 md:scroll-mt-60">
                    <div className="mb-3 md:mb-5 flex items-stretch gap-3">
                        <span className="w-1.5 rounded-full" style={{ background: '#E39A2E' }} />
                        <div className="py-0.5">
                            <h2 className="text-2xl md:text-4xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}><span className="text-base md:text-lg font-bold mr-3 align-middle" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#E39A2E' }}>02</span>食べ物</h2>
                            <p className="text-[10px] tracking-[0.2em] font-bold mt-1" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#E39A2E', opacity: 0.7 }}>ON YOUR PLATE</p>
                        </div>
                    </div>
                    <p className="text-[13px] leading-[1.6] md:text-sm md:leading-relaxed text-[#4A4A4A] mb-4 md:mb-5"><span className="md:hidden">栄養素を実際に体へ運ぶのは毎日の食べ物。食材ごとに何が摂れるかを知る。</span><span className="hidden md:inline">「材料」である栄養素を、実際に体へ運ぶのが毎日の<strong>食べ物</strong>です。身近な食材ひとつひとつで何が摂れるかを知ることが、知識を食卓につなげる最後のピースになります。</span></p>

                    <div className="space-y-3 md:space-y-4">
                    {foodSections.map((s) => <HubCard key={s.href} s={s} />)}
                    </div>

                </div>

                {/* 生活習慣 */}
                <div id="lifestyle" className="mt-10 md:mt-24 scroll-mt-24 md:scroll-mt-60">
                    <div className="mb-3 md:mb-5 flex items-stretch gap-3">
                        <span className="w-1.5 rounded-full" style={{ background: '#7DAE4A' }} />
                        <div className="py-0.5">
                            <h2 className="text-2xl md:text-4xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}><span className="text-base md:text-lg font-bold mr-3 align-middle" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#7DAE4A' }}>03</span>生活習慣</h2>
                            <p className="text-[10px] tracking-[0.2em] font-bold mt-1" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#7DAE4A', opacity: 0.7 }}>LIFESTYLE</p>
                        </div>
                    </div>
                    <p className="text-[13px] leading-[1.6] md:text-sm md:leading-relaxed text-[#4A4A4A] mb-4 md:mb-5 line-clamp-3 md:line-clamp-none">
                        しくみを動かすのは、日々の習慣。もっとも効果が大きい「打ち手」をまとめました。
                    </p>
                    <div className="space-y-3 md:space-y-4">
                        <HubCard s={{
                            href: '/lifestyle', label: 'LIFESTYLE', ja: '生活習慣', role: '打ち手', count: 13, unit: 'テーマ', color: '#E7EFD8',
                            illustration: '/images/flow/flow-illustration-practice.png',
                            description: '睡眠・日光・水・運動の土台から、嗜好品や有害物質を減らす暮らし、ウェアラブルや血糖モニターで測る道具、サプリメントの選び方まで。もっとも効果が大きい打ち手を順に。',
                            short: '睡眠・光・水・運動から、嗜好品・解毒・計測・サプリまで。効果の大きい打ち手を順に。',
                        }} />
                    </div>
                </div>

                {/* 内臓・臓器 */}
                <div id="organs" className="mt-10 md:mt-24 scroll-mt-24 md:scroll-mt-60">
                    <div className="mb-3 md:mb-5 flex items-stretch gap-3">
                        <span className="w-1.5 rounded-full" style={{ background: '#C98A5E' }} />
                        <div className="py-0.5">
                            <h2 className="text-2xl md:text-4xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}><span className="text-base md:text-lg font-bold mr-3 align-middle" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#C98A5E' }}>04</span>内臓・臓器</h2>
                            <p className="text-[10px] tracking-[0.2em] font-bold mt-1" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#C98A5E', opacity: 0.7 }}>YOUR ORGANS</p>
                        </div>
                    </div>
                    <p className="text-[13px] leading-[1.6] md:text-sm md:leading-relaxed text-[#4A4A4A] mb-4 md:mb-5"><span className="md:hidden">遺伝子や栄養素が働く「現場」が内臓。役割と40代の変化を知る。</span><span className="hidden md:inline">遺伝子や栄養素が働く「現場」が、肝臓・腎臓・腸といった<strong>内臓</strong>です。それぞれが何をしていて、40代でどう変化するのかを知ると、血液検査の数値の意味もぐっと立体的になります。</span></p>

                    <div className="space-y-3 md:space-y-4">
                    {organSections.map((s) => <HubCard key={s.href} s={s} />)}
                    </div>
                </div>

                {/* からだのしくみ */}
                <div id="mechanism" className="mt-10 md:mt-24 scroll-mt-24 md:scroll-mt-60">
                    <div className="mb-3 md:mb-5 flex items-stretch gap-3">
                        <span className="w-1.5 rounded-full" style={{ background: '#2FB59F' }} />
                        <div className="py-0.5">
                            <h2 className="text-2xl md:text-4xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}><span className="text-base md:text-lg font-bold mr-3 align-middle" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#2FB59F' }}>05</span>身体の仕組み</h2>
                            <p className="text-[10px] tracking-[0.2em] font-bold mt-1" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#2FB59F', opacity: 0.7 }}>MECHANISM</p>
                        </div>
                    </div>
                    <p className="text-[13px] leading-[1.6] md:text-sm md:leading-relaxed text-[#4A4A4A] mb-4 md:mb-5"><span className="md:hidden">栄養や習慣がなぜ効くのか。答えは細胞の中の仕組みにある。</span><span className="hidden md:inline">栄養素や生活習慣がなぜ効くのか——その答えは、細胞の中で起きている仕組みにあります。エネルギー産生から、腸と脳のつながり、細胞の再生まで。</span></p>
                    <h3 className="flex items-center gap-2 text-lg md:text-xl font-bold text-[#1A1A1A] mt-5 md:mt-6 mb-3 md:mb-4">
                        <span className="inline-block w-5 h-0.5 rounded-full bg-[#41C9B4]" />
                        はじめに
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-4">
                        <Link href="/molecular-nutrition#biochemistry"
                            className="group block rounded-2xl border border-dashed border-[#1A1A1A]/40 p-4 md:p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all">
                            <div className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/45 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                FOUNDATION ／ すべての土台
                            </div>
                            <div className="text-base md:text-lg font-bold text-[#1A1A1A] mb-1">生化学とは？</div>
                            <p className="text-[13px] leading-[1.6] md:text-sm md:leading-relaxed text-[#1A1A1A]/70"><span className="md:hidden">栄養がなぜ効くのか、その土台を一言で。</span><span className="hidden md:inline">これから挙げる仕組みは、すべて「体の中の化学反応＝生化学」の話。栄養がなぜ効くのか、その土台をまず一言で。</span>
                                <span className="inline-block ml-1 font-bold text-[#1A1A1A] group-hover:translate-x-0.5 transition-transform">→</span></p>
                        </Link>
                        <Link href="/food-journey"
                            className="group block rounded-2xl border border-dashed border-[#1A1A1A]/40 p-4 md:p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all">
                            <div className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/45 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                THE BIG PICTURE ／ 全体の地図
                            </div>
                            <div className="text-base md:text-lg font-bold text-[#1A1A1A] mb-1">食べてから、動くまで</div>
                            <p className="text-[13px] leading-[1.6] md:text-sm md:leading-relaxed text-[#1A1A1A]/70"><span className="md:hidden">食べる→消化→吸収→代謝→排出を一枚で俯瞰。</span><span className="hidden md:inline">食べる→消化→吸収→運搬→代謝→利用→排出。体の中で起きていることを、インフォグラフィックで一枚に俯瞰。</span>
                                <span className="inline-block ml-1 font-bold text-[#1A1A1A] group-hover:translate-x-0.5 transition-transform">→</span></p>
                        </Link>
                    </div>
                    <h3 className="flex items-center gap-2 text-lg md:text-xl font-bold text-[#1A1A1A] mt-6 md:mt-8 mb-3 md:mb-4">
                        <span className="inline-block w-5 h-0.5 rounded-full bg-[#41C9B4]" />
                        エネルギーの出発点
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-4">
                        <Link href="/mitochondria"
                            className="group relative block overflow-hidden rounded-2xl border border-black p-4 md:p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all" style={{ background: '#CFEAEC' }}>
                            <img loading="lazy" decoding="async" src="/images/for-you/for-you-illustration-bl.png" alt="" className="pointer-events-none absolute bottom-0 right-0 w-[120px] md:w-[140px] opacity-90 transition-transform hidden sm:block" />
                            <div className="relative" style={{ zIndex: 1 }}>
                                <div className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/50 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                    START HERE ／ THE POWERHOUSE
                                </div>
                                <div className="text-xl md:text-2xl font-bold text-[#1A1A1A] mb-1">ミトコンドリアとは</div>
                                <p className="text-[13px] leading-[1.6] md:text-sm md:leading-relaxed text-[#1A1A1A]/80 mb-3 sm:max-w-[80%] line-clamp-3 sm:line-clamp-none">すべての出発点。細胞のエネルギー工場とは何か、なぜ40代で重要か、どう元気に保つか。</p>
                                <span className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                    見る <span className="group-hover:translate-x-1 transition-transform">→</span>
                                </span>
                            </div>
                        </Link>
                        <Link href="/energy"
                            className="group block rounded-2xl border border-black p-4 md:p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all" style={{ background: '#DCEFE4' }}>
                            <div className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/50 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                ENERGY &amp; METABOLISM
                            </div>
                            <div className="text-xl md:text-2xl font-bold text-[#1A1A1A] mb-1">エネルギーとは</div>
                            <p className="text-[13px] leading-[1.6] md:text-sm md:leading-relaxed text-[#1A1A1A]/80 mb-2 line-clamp-3 sm:line-clamp-none"><span className="md:hidden">疲れにくさの正体は「エネルギーを作り続けられること」。</span><span className="hidden md:inline">疲れにくさの正体は「エネルギーを作り続けられること」。作るしくみと、その材料になる栄養までを、やさしく束ねる入口。</span></p>
                            <span className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                見る <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </span>
                        </Link>
                    </div>
                    <h3 className="flex items-center gap-2 text-lg md:text-xl font-bold text-[#1A1A1A] mt-6 md:mt-8 mb-3 md:mb-4">
                        <span className="inline-block w-5 h-0.5 rounded-full bg-[#41C9B4]" />
                        代謝と細胞のしくみ
                    </h3>
                    <div className="space-y-3 md:space-y-4">
                        <HubCard s={{
                            href: '/cell-metabolism', label: 'CELL & METABOLISM', ja: '代謝と細胞のしくみ', role: '生化学', count: 19, unit: 'しくみ', color: '#D7F0E8',
                            illustration: '/images/pricing/pricing-plan-illustration.png',
                            description: '解糖系→TCA回路→電子伝達系→ATPというエネルギーの工程から、酵素・ケトン体・メチレーション、血糖と自律神経と体内時計、腸と消化、オートファジーまで。栄養や習慣が「なぜ効くのか」の答え。',
                            short: '解糖系からATP、血糖・体内時計・腸・オートファジーまで。「なぜ効くのか」の答え。',
                        }} />
                    </div>
                </div>

                {/* ホルモン */}
                <div id="hormones" className="mt-10 md:mt-24 scroll-mt-24 md:scroll-mt-60">
                    <div className="mb-3 md:mb-5 flex items-stretch gap-3">
                        <span className="w-1.5 rounded-full" style={{ background: '#C96BA3' }} />
                        <div className="py-0.5">
                            <h2 className="text-2xl md:text-4xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}><span className="text-base md:text-lg font-bold mr-3 align-middle" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#C96BA3' }}>06</span>ホルモン</h2>
                            <p className="text-[10px] tracking-[0.2em] font-bold mt-1" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#C96BA3', opacity: 0.7 }}>HORMONES</p>
                        </div>
                    </div>
                    <p className="text-[13px] leading-[1.6] md:text-sm md:leading-relaxed text-[#4A4A4A] mb-4 md:mb-5 line-clamp-3 md:line-clamp-none">
                        体じゅうに指令を届ける化学メッセンジャー。40代以降の変化と、血液検査とのつながり。
                    </p>
                    <Link href="/hormones"
                        className="group block rounded-2xl border border-black p-4 md:p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all" style={{ background: '#ECDCE6' }}>
                        <div className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/50 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            HORMONES
                        </div>
                        <div className="text-xl md:text-2xl font-bold text-[#1A1A1A] mb-1">ホルモンの種類（9種）</div>
                        <p className="text-[13px] leading-[1.6] md:text-sm md:leading-relaxed text-[#1A1A1A]/80 mb-2 line-clamp-3 sm:line-clamp-none"><span className="md:hidden">テストステロン・エストロゲン・コルチゾールなど9種を個別に解説。</span><span className="hidden md:inline">テストステロン・エストロゲン・コルチゾール・インスリン・甲状腺ホルモンなど、主なホルモンを個別ページで解説。</span></p>
                        <span className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            見る <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </span>
                    </Link>
                    <Link href="/menopause"
                        className="group block rounded-2xl border border-black p-4 md:p-5 mt-3 md:mt-4 hover:shadow-lg hover:-translate-y-0.5 transition-all" style={{ background: '#F3E0EC' }}>
                        <div className="text-[10px] font-bold tracking-widest text-[#A65D92] mb-1">MENOPAUSAL TRANSITION</div>
                        <div className="text-lg font-bold text-[#1A1A1A] mb-1">更年期・更年期移行期</div>
                        <p className="text-[13px] leading-[1.6] md:text-sm md:leading-relaxed text-[#1A1A1A]/80 mb-2 line-clamp-3 sm:line-clamp-none">ほてりだけでなく、睡眠・気分・骨・筋肉・血管まで。新しいホルモン環境へ移る時間を知る。</p>
                        <span className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#FF9855]">見る <span className="group-hover:translate-x-1 transition-transform">→</span></span>
                    </Link>
                    <Link href="/male-menopause"
                        className="group block rounded-2xl border border-black p-4 md:p-5 mt-3 md:mt-4 hover:shadow-lg hover:-translate-y-0.5 transition-all" style={{ background: '#E2EAF2' }}>
                        <div className="text-[10px] font-bold tracking-widest text-[#557A9D] mb-1">MALE MENOPAUSE</div>
                        <div className="text-lg font-bold text-[#1A1A1A] mb-1">男性更年期（LOH症候群）</div>
                        <p className="text-[13px] leading-[1.6] md:text-sm md:leading-relaxed text-[#1A1A1A]/80 mb-2 line-clamp-3 sm:line-clamp-none">疲れ・意欲・睡眠・筋力・性機能の変化を、テストステロンと全身の両面から読む。</p>
                        <span className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#FF9855]">見る <span className="group-hover:translate-x-1 transition-transform">→</span></span>
                    </Link>
                </div>

                {/* 老化と不調の土台（酸化・糖化・炎症） */}
                <div id="aging" className="mt-10 md:mt-24 scroll-mt-24 md:scroll-mt-60">
                    <div className="mb-3 md:mb-5 flex items-stretch gap-3">
                        <span className="w-1.5 rounded-full" style={{ background: '#E07A6A' }} />
                        <div className="py-0.5">
                            <h2 className="text-2xl md:text-4xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}><span className="text-base md:text-lg font-bold mr-3 align-middle" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#E07A6A' }}>07</span>老化と不調の土台</h2>
                            <p className="text-[10px] tracking-[0.2em] font-bold mt-1" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#E07A6A', opacity: 0.7 }}>AGING &amp; DISEASE</p>
                        </div>
                    </div>
                    <p className="text-[13px] leading-[1.6] md:text-sm md:leading-relaxed text-[#4A4A4A] mb-4 md:mb-5"><span className="md:hidden">さびる（酸化）・こげる（糖化）・くすぶる（炎症）。老化と不調の共通の土台。</span><span className="hidden md:inline">体の中では今この瞬間も、「<strong>さびる（酸化）</strong>」「<strong>こげる（糖化）</strong>」「<strong>くすぶる（慢性炎症）</strong>」という3つのダメージが静かに進んでいます。これらは見た目の老化を進めるだけでなく、疲れやすさや肌の不調といった日々の不調から、生活習慣病まで、多くの<strong>体の不調の共通の根っこ</strong>です。やっかいなのは、3つが連動して互いを加速させること。けれど裏を返せば、<strong>毎日の食事・運動・睡眠で減らしていけるダメージ</strong>でもあります。「歳のせい」とあきらめる前に、まず仕組みから知っていきましょう。</span></p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
                        <Link href="/oxidative-stress"
                            className="group flex flex-col gap-3 rounded-2xl border border-black p-4 md:p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all" style={{ background: '#F3DEDE' }}>
                            <div className="flex-shrink-0">
                                <span className="text-[10px] font-bold tracking-widest text-[#41C9B4]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>OXIDATIVE STRESS</span>
                                <div className="text-lg font-bold text-[#1A1A1A] mt-1">活性酸素（さびる）</div>
                            </div>
                            <p className="flex-1 text-[13px] leading-[1.6] md:text-sm md:leading-relaxed text-[#1A1A1A]/80">体がさびる酸化ストレスと、抗酸化のバランス。</p>
                            <span className="inline-flex w-fit items-center gap-1 px-4 py-1.5 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                見る <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </span>
                        </Link>
                        <Link href="/glycation"
                            className="group flex flex-col gap-3 rounded-2xl border border-black p-4 md:p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all" style={{ background: '#F6E6CF' }}>
                            <div className="flex-shrink-0">
                                <span className="text-[10px] font-bold tracking-widest text-[#41C9B4]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>GLYCATION</span>
                                <div className="text-lg font-bold text-[#1A1A1A] mt-1">糖化（こげる）</div>
                            </div>
                            <p className="flex-1 text-[13px] leading-[1.6] md:text-sm md:leading-relaxed text-[#1A1A1A]/80">余った糖が組織を劣化させるAGEs。血糖との関係。</p>
                            <span className="inline-flex w-fit items-center gap-1 px-4 py-1.5 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                見る <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </span>
                        </Link>
                        <Link href="/inflammation"
                            className="group flex flex-col gap-3 rounded-2xl border border-black p-4 md:p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all" style={{ background: '#F6DCD0' }}>
                            <div className="flex-shrink-0">
                                <span className="text-[10px] font-bold tracking-widest text-[#41C9B4]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>INFLAMMATION</span>
                                <div className="text-lg font-bold text-[#1A1A1A] mt-1">慢性炎症（くすぶる）</div>
                            </div>
                            <p className="flex-1 text-[13px] leading-[1.6] md:text-sm md:leading-relaxed text-[#1A1A1A]/80">自覚なくくすぶる弱い炎症。老化と万病の隠れた土台。</p>
                            <span className="inline-flex w-fit items-center gap-1 px-4 py-1.5 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                見る <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </span>
                        </Link>
                    </div>
                </div>

                {/* 現代病（入口カード） */}
                <div className="space-y-3 md:space-y-4 mt-6 md:mt-8">
                    <HubCard s={{
                        href: '/diseases', label: 'MODERN DISEASES', ja: '現代病を読む', role: '各論', count: 10, unit: 'テーマ', color: '#F7E2DC',
                        illustration: '/images/for-you/for-you-recovery.png',
                        description: '現代病とは何かという俯瞰から、糖尿病・メタボ・高血圧・脂肪肝・脂質異常症・サルコペニア・慢性腎臓病・心の現代病・歯周病まで。バラバラに見える病気を「体の設計と環境のズレ」として読む。',
                        short: '糖尿病・メタボ・高血圧・脂肪肝など。現代病を「体の設計と環境のズレ」として読む。',
                    }} />
                </div>

                {/* 心とからだ */}
                <div id="mind" className="mt-10 md:mt-24 scroll-mt-24 md:scroll-mt-60">
                    <div className="mb-3 md:mb-5 flex items-stretch gap-3">
                        <span className="w-1.5 rounded-full" style={{ background: '#8B78C9' }} />
                        <div className="py-0.5">
                            <h2 className="text-2xl md:text-4xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}><span className="text-base md:text-lg font-bold mr-3 align-middle" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#8B78C9' }}>08</span>心とからだ</h2>
                            <p className="text-[10px] tracking-[0.2em] font-bold mt-1" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#8B78C9', opacity: 0.7 }}>MIND &amp; BODY</p>
                        </div>
                    </div>
                    <p className="text-[13px] leading-[1.6] md:text-sm md:leading-relaxed text-[#4A4A4A] mb-4 md:mb-5"><span className="md:hidden">気分や不安を、腸・栄養・睡眠・自律神経・血糖という体の側から読む。</span><span className="hidden md:inline">気分や不安は、「性格」や「気合い」の問題とは限りません。<strong>腸・栄養・睡眠・自律神経・血糖</strong>といった<strong>体の土台</strong>から、心を読み解きます。メンタルも“体から”整える、という視点です。</span></p>
                    <div className="space-y-3 md:space-y-4">
                        <HubCard s={{
                            href: '/mind-body', label: 'MIND & BODY', ja: '心とからだ', role: '心身相関', count: 13, unit: 'テーマ', color: '#EFEAF6',
                            illustration: '/images/experience/experience_sleep_new.png',
                            description: 'ストレス・HSP・気分と栄養・不安・神経炎症・片頭痛・呼吸・スピリチュアリティ・音・匂い・運動の潮流まで。心の側に現れることを、腸・栄養・睡眠・自律神経・血糖という体の側から読み解く。',
                            short: 'ストレス・HSP・不安・片頭痛など。心の側に出ることを体の側から読む。',
                        }} />
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

                {/* 症状から引く */}
                <div id="symptoms" className="mt-10 md:mt-24 scroll-mt-24 md:scroll-mt-60">
                    <div className="mb-3 md:mb-5 flex items-stretch gap-3">
                        <span className="w-1.5 rounded-full" style={{ background: '#EE9A3C' }} />
                        <div className="py-0.5">
                            <h2 className="text-2xl md:text-4xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}><span className="text-base md:text-lg font-bold mr-3 align-middle" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#EE9A3C' }}>09</span>症状から引く</h2>
                            <p className="text-[10px] tracking-[0.2em] font-bold mt-1" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#EE9A3C', opacity: 0.7 }}>FROM SYMPTOMS</p>
                        </div>
                    </div>
                    <p className="text-[13px] leading-[1.6] md:text-sm md:leading-relaxed text-[#4A4A4A] mb-4 md:mb-5"><span className="md:hidden">気になる不調から、背景・血液検査・栄養素・しくみへ逆引き。</span><span className="hidden md:inline">「疲れやすい」「頭がぼんやり」「冷える」——気になる<strong>不調</strong>から逆引きで、考えられる背景・確認したい血液検査・関わる栄養素・関連する体のしくみへたどれます。原因の「あたり」をつける入口に。</span></p>
                    <Link href="/symptoms"
                        className="group block rounded-2xl border border-black p-4 md:p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all" style={{ background: '#F0E7E0' }}>
                        <div className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/50 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            FROM SYMPTOMS
                        </div>
                        <div className="text-xl md:text-2xl font-bold text-[#1A1A1A] mb-1">症状から引く（14の不調）</div>
                        <p className="text-[13px] leading-[1.6] md:text-sm md:leading-relaxed text-[#1A1A1A]/80 mb-2 line-clamp-3 sm:line-clamp-none"><span className="md:hidden">疲れ・ブレインフォグ・冷え・むくみなどから背景と打ち手を逆引き。</span><span className="hidden md:inline">疲れ・ブレインフォグ・冷え・動悸・めまい・むくみ・アレルギー・気分の落ち込みなどから、背景と打ち手を逆引き。</span></p>
                        <span className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            見る <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </span>
                    </Link>
                </div>

                {/* 不調・現代病（病態から読む） */}
                <div id="conditions" className="mt-10 md:mt-12 scroll-mt-24">
                    <Link href="/conditions"
                        className="group block rounded-2xl border border-black p-4 md:p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all" style={{ background: '#FCE3D4' }}>
                        <div className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/50 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            CONDITIONS
                        </div>
                        <div className="text-xl md:text-2xl font-bold text-[#1A1A1A] mb-1">不調・現代病を読み解く</div>
                        <p className="text-[13px] leading-[1.6] md:text-sm md:leading-relaxed text-[#1A1A1A]/80 mb-2 line-clamp-3 sm:line-clamp-none"><span className="md:hidden">鉄欠乏・インスリン抵抗性・脂肪肝・更年期など、病態の側から1枚ずつ。</span><span className="hidden md:inline">症状の裏にある<strong>病態</strong>の側から。鉄欠乏（隠れ貧血）・インスリン抵抗性・脂肪肝・更年期……定義・歴史・細胞レベルのしくみ・確認したい血液検査・受診の目安まで、1枚ずつ丁寧に。</span></p>
                        <span className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            見る <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </span>
                    </Link>
                </div>

                {/* 研究と社会のフロンティア */}
                <div id="frontier" className="mt-10 md:mt-24 scroll-mt-24 md:scroll-mt-60">
                    <div className="mb-3 md:mb-5 flex items-stretch gap-3">
                        <span className="w-1.5 rounded-full" style={{ background: '#5B86B8' }} />
                        <div className="py-0.5">
                            <h2 className="text-2xl md:text-4xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}><span className="text-base md:text-lg font-bold mr-3 align-middle" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#5B86B8' }}>10</span>研究と社会のフロンティア</h2>
                            <p className="text-[10px] tracking-[0.2em] font-bold mt-1" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#5B86B8', opacity: 0.7 }}>FRONTIER</p>
                        </div>
                    </div>
                    <p className="text-[13px] leading-[1.6] md:text-sm md:leading-relaxed text-[#4A4A4A] mb-4 md:mb-5"><span className="md:hidden">世界で研究・議論が進むテーマを、すすめず否定せず中立に整理。日本では法律で規制。</span><span className="hidden md:inline">賛否や法律が国によって大きく異なり、いま世界で研究・議論が進んでいるテーマです。<strong>すすめるためでも、否定するためでもなく</strong>、何が分かっていて何が分かっていないかを中立に整理します。<strong className="text-[#E8896B]">いずれも日本では法律で規制されています。</strong></span></p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                        <Link href="/psychedelics-research"
                            className="group block rounded-2xl border border-black p-4 md:p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all" style={{ background: '#E7E0F2' }}>
                            <div className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/50 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>RESEARCH FRONTIER</div>
                            <div className="text-lg font-bold text-[#1A1A1A] mb-1">サイケデリック研究の潮流</div>
                            <p className="text-[13px] leading-[1.6] md:text-sm md:leading-relaxed text-[#1A1A1A]/80 mb-2 line-clamp-3 sm:line-clamp-none">うつ・PTSDなどへの治療応用をめぐり、海外で進む研究の潮流を中立に。<span className="font-bold text-[#E8896B]">日本では違法。</span></p>
                            <span className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>見る <span className="group-hover:translate-x-1 transition-transform">→</span></span>
                        </Link>
                        <Link href="/cannabis"
                            className="group block rounded-2xl border border-black p-4 md:p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all" style={{ background: '#E7E0F2' }}>
                            <div className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/50 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>HISTORY &amp; POLICY</div>
                            <div className="text-lg font-bold text-[#1A1A1A] mb-1">大麻をめぐる歴史と世界の動き</div>
                            <p className="text-[13px] leading-[1.6] md:text-sm md:leading-relaxed text-[#1A1A1A]/80 mb-2 line-clamp-3 sm:line-clamp-none">医療・嗜好をめぐる各国の制度の変化と歴史を中立に整理。<span className="font-bold text-[#E8896B]">日本では違法。</span></p>
                            <span className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>見る <span className="group-hover:translate-x-1 transition-transform">→</span></span>
                        </Link>
                        <Link href="/counterculture"
                            className="group block rounded-2xl border border-black p-4 md:p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all sm:col-span-2" style={{ background: '#E7E0F2' }}>
                            <div className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/50 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>HISTORY &amp; IDEAS</div>
                            <div className="text-lg font-bold text-[#1A1A1A] mb-1">対抗文化が生んだもの</div>
                            <p className="text-[13px] leading-[1.6] md:text-sm md:leading-relaxed text-[#1A1A1A]/80 mb-2 line-clamp-3 sm:line-clamp-none"><span className="md:hidden">「個人に道具を」という思想史を、事実ベースでたどる。</span><span className="hidden md:inline">グレイトフル・デッド、フラワームーブメント、ホール・アース・カタログ、パソコン、ジョブズ、EFF、そして規制。「個人に道具を」という思想史を事実ベースで。</span></p>
                            <span className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>見る <span className="group-hover:translate-x-1 transition-transform">→</span></span>
                        </Link>
                    </div>
                </div>

                {/* 思索（〇〇とは？） */}
                <div id="thoughts" className="mt-10 md:mt-24 scroll-mt-24 md:scroll-mt-60">
                    <div className="mb-3 md:mb-5 flex items-stretch gap-3">
                        <span className="w-1.5 rounded-full" style={{ background: '#A08F6A' }} />
                        <div className="py-0.5">
                            <h2 className="text-2xl md:text-4xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}><span className="text-base md:text-lg font-bold mr-3 align-middle" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#A08F6A' }}>11</span>思索</h2>
                            <p className="text-[10px] tracking-[0.2em] font-bold mt-1" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#A08F6A', opacity: 0.7 }}>THOUGHTS</p>
                        </div>
                    </div>
                    <p className="text-[13px] leading-[1.6] md:text-sm md:leading-relaxed text-[#4A4A4A] mb-4 md:mb-5"><span className="md:hidden">運命、自由、老い、幸せ。答えの出ない問いを体と暮らしの側から考える。</span><span className="hidden md:inline">運命、自由、老い、幸せ——答えの出ない<strong>問い</strong>を「体・健康・生き方」の側から考えるコラム。哲学のようでいて、結局は今日の暮らし方の話です。</span></p>
                    <Link href="/thoughts"
                        className="group block rounded-2xl border border-black p-4 md:p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all" style={{ background: '#E7E0F2' }}>
                        <div className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/50 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            THOUGHTS
                        </div>
                        <div className="text-xl md:text-2xl font-bold text-[#1A1A1A] mb-1">〇〇とは？</div>
                        <p className="text-[13px] leading-[1.6] md:text-sm md:leading-relaxed text-[#1A1A1A]/80 mb-2 line-clamp-3 sm:line-clamp-none">運命とは？自由とは？老いるとは？幸せとは？——体の側から問いを見つめるエッセイ。</p>
                        <span className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            読む <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </span>
                    </Link>
                </div>

                {/* 考え方と立ち位置 */}
                <div id="approach" className="mt-10 md:mt-24 mb-5 flex items-stretch gap-3 scroll-mt-24 md:scroll-mt-60">
                    <span className="w-1.5 rounded-full" style={{ background: '#7A7A7A' }} />
                    <div className="py-0.5">
                        <h2 className="text-2xl md:text-4xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>考え方と立ち位置</h2>
                        <p className="text-[10px] tracking-[0.2em] font-bold mt-1" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#7A7A7A', opacity: 0.7 }}>OUR APPROACH</p>
                    </div>
                </div>

                {/* メッセージ帯：足すよりも引く ＋ バランス（2カラム） */}
                <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* 足すよりも引く */}
                    <div className="rounded-2xl border border-black p-5 md:p-6 relative overflow-hidden" style={{ background: '#1A1A1A' }}>
                        <span className="absolute -top-6 -left-2 text-[120px] md:text-[150px] leading-none font-bold pointer-events-none select-none" style={{ fontFamily: "'Space Grotesk', sans-serif", color: 'rgba(65,201,180,0.12)' }}>−</span>
                        <p className="relative text-[10px] tracking-[0.25em] font-bold text-[#41C9B4] mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>LESS, NOT MORE</p>
                        <p className="relative text-2xl md:text-3xl font-bold text-white leading-snug mb-4" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>
                            足すよりも、引く。
                        </p>
                        <p className="relative text-sm md:text-base text-white/75 leading-relaxed"><span className="md:hidden">足すより引く。食べすぎ・座りすぎ・夜ふかし・嗜好品を引いた体は、回復力を取り戻す。</span><span className="hidden md:inline">健康は、サプリや「体にいいもの」を足し続けることではありません。むしろ、いらないものを<strong className="text-white">引いていく</strong>こと——食べすぎ・座りすぎ・夜ふかし・嗜好品・有害物質。引き算で整えた体は、もともと備わった回復力を取り戻していきます。このライブラリが大切にしている、いちばん基本の姿勢です。</span></p>
                    </div>
                    {/* バランス（中庸） */}
                    <Link href="/balance" className="group rounded-2xl border border-black p-5 md:p-6 relative overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all block" style={{ background: '#EAE6DD' }}>
                        <span className="absolute -top-4 -right-2 text-[110px] md:text-[140px] leading-none font-bold pointer-events-none select-none" style={{ fontFamily: "'Space Grotesk', sans-serif", color: 'rgba(65,201,180,0.16)' }}>≈</span>
                        <p className="relative text-[10px] tracking-[0.25em] font-bold text-[#41C9B4] mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>THE MIDDLE WAY</p>
                        <p className="relative text-2xl md:text-3xl font-bold text-[#1A1A1A] leading-snug mb-4" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>
                            引きすぎず、<br className="hidden md:block" />ちょうどよく。
                        </p>
                        <p className="relative text-sm md:text-base text-[#4A4A4A] leading-relaxed mb-4"><span className="md:hidden">引き算にも「底」がある。少なすぎず多すぎない中庸に、体はいちばん応える。</span><span className="hidden md:inline">でも、引き算にも「底」があります。動かなさすぎ・食べなさすぎもまた不調のもと。運動も栄養も刺激も、少なすぎず多すぎない<strong className="text-[#1A1A1A]">「ちょうどよさ（中庸）」</strong>に、体はいちばん応えます。U字とホルミシスから、バランスという健康の core を考えます。</span></p>
                        <span className="relative inline-flex items-center gap-1 px-5 py-1.5 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            読む <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </span>
                    </Link>
                </div>

                {/* なぜ、未病予防か（ミッション） */}
                <Link href="/mission"
                    className="group mb-3 md:mb-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5 rounded-2xl border border-black bg-white/70 p-4 md:p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all">
                    <div className="flex-shrink-0">
                        <span className="text-[10px] font-bold tracking-widest text-[#41C9B4]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>OUR MISSION</span>
                        <div className="text-xl md:text-2xl font-bold text-[#1A1A1A] mt-1">なぜ、未病予防か</div>
                    </div>
                    <p className="flex-1 text-[13px] leading-[1.6] md:text-sm md:leading-relaxed text-[#4A4A4A]"><span className="md:hidden">未病予防の社会的意義と、Mitoflow40の役割。</span><span className="hidden md:inline">超高齢社会、医療費、健康寿命のギャップ——その一助になりうる「未病予防」の社会的意義と、Mitoflow40の役割。</span></p>
                    <span className="flex-shrink-0 inline-flex items-center gap-1 px-5 py-1.5 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        読む <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                </Link>

                {/* 医療者の役割とMitoflow40の立ち位置 */}
                <Link href="/medical-roles"
                    className="group mb-3 md:mb-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5 rounded-2xl border border-black bg-white/70 p-4 md:p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all">
                    <div className="flex-shrink-0">
                        <span className="text-[10px] font-bold tracking-widest text-[#41C9B4]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>WHO DOES WHAT</span>
                        <div className="text-xl md:text-2xl font-bold text-[#1A1A1A] mt-1">医療者の役割と立ち位置</div>
                    </div>
                    <p className="flex-1 text-[13px] leading-[1.6] md:text-sm md:leading-relaxed text-[#4A4A4A]"><span className="md:hidden">医療者に何ができて、何ができないか。Mitoflow40が「未病の手前」で立つ場所。</span><span className="hidden md:inline">医師・看護師・薬剤師・管理栄養士は何ができて、何ができないのか。診断も治療もしないMitoflow40が「未病の手前」でどこに立つのかを整理します。</span></p>
                    <span className="flex-shrink-0 inline-flex items-center gap-1 px-5 py-1.5 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        読む <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                </Link>

                {/* 統合医療とは（西洋医学＋補完療法の立ち位置） */}
                <Link href="/integrative-medicine"
                    className="group mb-3 md:mb-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5 rounded-2xl border border-black bg-white/70 p-4 md:p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all">
                    <div className="flex-shrink-0">
                        <span className="text-[10px] font-bold tracking-widest text-[#41C9B4]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>WEST &amp; BEYOND</span>
                        <div className="text-xl md:text-2xl font-bold text-[#1A1A1A] mt-1">統合医療とは</div>
                    </div>
                    <p className="flex-1 text-[13px] leading-[1.6] md:text-sm md:leading-relaxed text-[#4A4A4A]"><span className="md:hidden">西洋医学を土台に補完療法を組み合わせる考え方と、Mitoflow40の立ち位置。</span><span className="hidden md:inline">西洋医学（標準治療）を土台に、鍼灸・ヨガ・食事・サプリなどの補完療法をエビデンスで組み合わせる考え方。「代替だけに頼らない」原則と、その中でMitoflow40がどこに立つのかを中立に整理します。</span></p>
                    <span className="flex-shrink-0 inline-flex items-center gap-1 px-5 py-1.5 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        読む <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                </Link>

                {/* 栄養学の歴史 */}
                <Link href="/nutrition-history"
                    className="group mb-3 md:mb-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5 rounded-2xl border border-black bg-white/70 p-4 md:p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all">
                    <div className="flex-shrink-0">
                        <span className="text-[10px] font-bold tracking-widest text-[#41C9B4]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>NUTRITION HISTORY</span>
                        <div className="text-xl md:text-2xl font-bold text-[#1A1A1A] mt-1">栄養学の歴史</div>
                    </div>
                    <p className="flex-1 text-[13px] leading-[1.6] md:text-sm md:leading-relaxed text-[#4A4A4A]"><span className="md:hidden">カロリー→ビタミン→細胞へ。「いまの常識」がどう作られたか。</span><span className="hidden md:inline">カロリー→ビタミン→細胞へ。そしてGHQ・学校給食・粉食奨励という日本の戦後まで。「いまの常識」がどう作られたかを知ると、情報に振り回されにくくなる。</span></p>
                    <span className="flex-shrink-0 inline-flex items-center gap-1 px-5 py-1.5 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        読む <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                </Link>

                {/* 40代の健康診断の読み方 */}
                <Link href="/health-check-guide"
                    className="group block rounded-2xl border border-black p-5 md:p-6 mt-2 hover:shadow-lg hover:-translate-y-0.5 transition-all" style={{ background: '#FFF1DF' }}>
                    <div className="text-[10px] font-bold tracking-widest text-[#D67845] mb-1">HEALTH CHECK GUIDE</div>
                    <div className="text-xl md:text-2xl font-bold text-[#1A1A1A] mb-1">40代の健康診断の読み方</div>
                    <p className="text-[13px] leading-[1.6] md:text-sm md:leading-relaxed text-[#1A1A1A]/80 mb-2 line-clamp-3 sm:line-clamp-none">A・B判定だけで終わらせず、経年変化と関連項目をつなぎ、再検査・受診まで行動に変える。</p>
                    <span className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#FF9855]">見る <span className="group-hover:translate-x-1 transition-transform">→</span></span>
                </Link>


                {/* 著書：健康とは、カウンターカルチャーである */}
                <div className="mt-20 md:mt-24">
                    <div className="mb-3 md:mb-5 flex items-stretch gap-3">
                        <span className="w-1.5 rounded-full bg-[#C0392B]" />
                        <div className="py-0.5">
                            <h2 className="text-2xl md:text-4xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>学んで、感じたこと</h2>
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
                                <p className="text-[13px] leading-[1.6] md:text-sm md:leading-relaxed text-[#4A4A4A] mb-4"><span className="md:hidden">健康とは、身体の主権を取り戻す静かな反抗。学びの先に感じたことを一冊に。</span><span className="hidden md:inline">生化学や栄養学を学んでいくうちに、たどり着いた一つの実感——健康とは、もう一度<strong>自分の身体の主権を取り戻す</strong>静かな反抗なのではないか。学びの先に感じたことを綴った一冊を、章ごとに紹介します。</span></p>
                                <span className="inline-flex items-center gap-1 px-5 py-1.5 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
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
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FF9855] border border-[#FF9855] text-sm font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:border-[#41C9B4] hover:text-white transition-colors">
                            解説の参照文献・出典を見る
                            <span>→</span>
                        </Link>
                        <Link href="/books"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-black text-sm font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">
                            おすすめ書籍を見る
                            <span>→</span>
                        </Link>
                    </div>
                    <p className="text-xs text-[#4A4A4A]/70 mt-3">NIH・WHO・査読論文など、解説が依拠する一次情報をテーマ別にまとめています。</p>
                </div>

                {/* 進化していくLibrary */}
                <div className="mt-12 md:mt-16 rounded-2xl border border-black p-5 md:p-6 text-center" style={{ background: '#EFEAF6' }}>
                    <p className="text-[10px] font-bold tracking-widest text-[#41C9B4] mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>ALWAYS EVOLVING</p>
                    <h2 className="text-lg md:text-xl font-bold text-[#1A1A1A] mb-3">このライブラリは、完成品ではありません</h2>
                    <p className="text-sm text-[#4A4A4A] leading-loose max-w-[560px] mx-auto"><span className="md:hidden">精密栄養学は発展途上。このLibraryも見直し、加筆しながら進化し続けます。</span><span className="hidden md:inline">精密栄養学は、いまも世界で研究が進む<strong>発展途上の分野</strong>です。だからこのLibraryも、一度作って終わりではなく、新しい知見が見つかるたびに見直し、加筆し、ときに書き換えながら、<strong>常に進化し続けます</strong>。今日ここに書かれていることも、未来にはもっと深く、正確になっているはずです。</span></p>
                </div>

                {/* セルフチェックへの導線 */}
                <div className="bg-white border border-black rounded-2xl p-6 md:p-8 text-center mt-12 md:mt-16">
                    <p className="text-xs tracking-widest font-bold mb-3 text-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        START HERE
                    </p>
                    <h2 className="text-lg md:text-xl font-bold mb-3 text-[#1A1A1A]">
                        まずは自分の状態を知るところから
                    </h2>
                    <p className="text-[13px] leading-[1.6] md:text-sm md:leading-relaxed text-[#4A4A4A] mb-5 max-w-[480px] mx-auto">
                        12問・約2分のセルフチェックで、あなたのミトコンドリア活性度を可視化できます。無料・登録不要。
                    </p>
                    <Link href="/check" className="inline-block px-8 py-3 rounded-full text-sm font-bold bg-[#1A1A1A] border border-[#1A1A1A] text-white hover:bg-[#41C9B4] hover:border-[#41C9B4] hover:text-white transition-colors"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        無料セルフチェックを試す →
                    </Link>
                </div>
            </div>
        </div>
    );
}
