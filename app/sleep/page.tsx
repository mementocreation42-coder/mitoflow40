import Link from 'next/link';
import { getNutrientBySlug } from '@/lib/nutrients';
import JsonLd, { medicalWebPage } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: '睡眠 | Mitoflow40',
    description: '体と脳が修復・再生する時間「睡眠」を、深い睡眠とレムの役割・脳の老廃物洗浄・ホルモンとの関係・質を上げる習慣からわかりやすく解説。',
    alternates: { canonical: 'https://mitoflow40.com/sleep' },
    openGraph: {
        title: '睡眠 | Mitoflow40',
        description: '修復・再生の時間「睡眠」を、深い睡眠とレム・脳の洗浄・ホルモン・質を上げる習慣から解説。',
        url: 'https://mitoflow40.com/sleep',
        type: 'article',
    },
};

const stages = [
    { name: '深いノンレム睡眠', en: 'DEEP SLEEP', note: '成長ホルモンが分泌され、体の修復と免疫の回復が進む。前半に多い' },
    { name: 'レム睡眠', en: 'REM', note: '記憶の整理・定着と、感情のメンテナンス。後半に増える' },
    { name: '浅いノンレム睡眠', en: 'LIGHT SLEEP', note: '眠りの大部分を占め、深い睡眠とレムをつなぐ' },
];

const whySleep = [
    { title: '脳の老廃物を洗い流す', note: '睡眠中、脳は老廃物（アミロイドβなど）を排出する。認知機能の維持に直結' },
    { title: 'ミトコンドリアと体の修復', note: '成長ホルモンが組織を修復。ミトコンドリアの回復も睡眠中に進む', href: '/mitochondria' },
    { title: 'ホルモンの調整', note: '成長ホルモン・テストステロン・食欲ホルモンの分泌が整う', href: '/hormones' },
    { title: '自律神経の回復', note: '副交感神経が優位になり、心身がリセットされる', href: '/autonomic-nervous-system' },
];

const habits = [
    { head: '起床・就寝を一定に', body: '体内時計が安定し、眠りの質が上がる。休日もずらしすぎない。', href: '/circadian-rhythm' },
    { head: '朝の光を浴びる', body: '朝日でメラトニンのリズムが整い、夜の自然な眠気につながる。' },
    { head: '夜は光と刺激を減らす', body: 'スマホ・強い照明のブルーライトはメラトニンを抑える。寝る1時間前はオフ。' },
    { head: 'カフェイン・アルコールに注意', body: 'カフェインは午後早めまで。アルコールは寝つきは良くても深い睡眠を壊す。' },
    { head: '寝室を暗く・涼しく', body: '深部体温が下がると眠りが深まる。静かで暗い環境を整える。' },
];

const relNutrients = [
    { slug: 'magnesium', why: '神経を鎮め、深い睡眠を支える' },
    { slug: 'tryptophan', why: 'セロトニン→メラトニンの材料' },
    { slug: 'glycine', why: '深部体温を下げ、寝つきと質を高める' },
];

export default function SleepPage() {
    const nutrients = relNutrients.map((c) => ({ ...c, n: getNutrientBySlug(c.slug) })).filter((c) => c.n);

    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#DCE3F0' }}>
            <img loading="lazy" decoding="async" src="/images/for-you-recovery.png" alt="" className="absolute pointer-events-none opacity-80 hidden md:block"
                style={{ top: '60px', right: '-50px', width: '260px' }} />
            <img loading="lazy" decoding="async" src="/images/experience_vitality_new.png" alt="" className="absolute pointer-events-none opacity-40"
                style={{ bottom: '-60px', left: '-70px', width: '320px', transform: 'scaleX(-1)' }} />

            <JsonLd data={medicalWebPage({ name: '睡眠とは', description: '修復・再生の時間「睡眠」を、深い睡眠とレム・脳の洗浄・ホルモン・質を上げる習慣から解説。', path: '/sleep' })} />
            <article className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '生活習慣', href: '/library#lifestyle' }, { name: '睡眠' }]} />
                <header className="mb-12 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>
                        SLEEP
                    </p>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        SLEEP
                        <span className="block text-base md:text-lg mt-2 text-[#1A1A1A]/70" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>睡眠とは</span>
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-relaxed max-w-[560px] mx-auto">
                        体と脳が修復・再生する、最強の回復時間。エネルギーも気分も、すべての土台は睡眠にあります。
                    </p>
                </header>

                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">睡眠とは</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        睡眠は、ただ休んでいる時間ではありません。体と脳が、起きている間にはできない<strong>修復・再生・整理</strong>を集中的に行う、能動的なメンテナンスの時間です。
                        {'\n\n'}
                        眠りは「深いノンレム睡眠」と「レム睡眠」が約90分周期でくり返されます。前半は深い睡眠が多く体を修復し、後半はレムが増えて記憶と感情を整えます。だから<strong>"何時間寝たか"だけでなく、深い睡眠とレムをきちんと巡れたか</strong>が質を決めます。
                        {'\n\n'}
                        40代以降は深い睡眠が減りやすく、「寝ても疲れが取れない」と感じやすくなります。睡眠は、エネルギー・ホルモン・自律神経・脳の健康すべての土台。ここが崩れると、ほかの対策の効果も半減してしまいます。
                    </p>
                </section>

                {/* 睡眠の段階 */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#41C9B4] pl-3 leading-tight">睡眠の段階</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">
                        一晩のうちに、性質の違う眠りをくり返しています。
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {stages.map((s) => (
                            <div key={s.en} className="bg-white/70 rounded-xl p-5 border border-black">
                                <div className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/40 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{s.en}</div>
                                <div className="font-bold text-[#1A1A1A] mb-1">{s.name}</div>
                                <p className="text-xs text-[#4A4A4A] leading-snug">{s.note}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* なぜ重要 */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#41C9B4] pl-3 leading-tight">睡眠中に起きていること</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
                        {whySleep.map((w) => (
                            <div key={w.title} className="bg-white/70 rounded-xl p-5 border border-black">
                                <div className="font-bold text-[#1A1A1A] mb-1">
                                    {w.href ? (
                                        <Link href={w.href} className="underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">{w.title}</Link>
                                    ) : w.title}
                                </div>
                                <p className="text-xs text-[#4A4A4A] leading-snug">{w.note}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 質を上げる */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#41C9B4] pl-3 leading-tight">睡眠の質を上げる習慣</h2>
                    <div className="space-y-3 mt-5">
                        {habits.map((h, i) => (
                            <div key={h.head} className="flex items-start gap-4 bg-white/70 rounded-xl p-4 border border-[#1A1A1A]/15">
                                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#41C9B4] text-white text-sm font-bold flex items-center justify-center" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{i + 1}</span>
                                <div>
                                    <div className="font-bold text-[#1A1A1A] mb-0.5">
                                        {h.href ? (
                                            <Link href={h.href} className="underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">{h.head}</Link>
                                        ) : h.head}
                                    </div>
                                    <p className="text-sm text-[#4A4A4A] leading-snug">{h.body}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 栄養素 */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">睡眠を支える栄養素</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {nutrients.map(({ slug, why, n }) => (
                            <Link key={slug} href={`/nutrients/${slug}`}
                                className="flex items-start gap-3 p-3 rounded-xl border border-[#1A1A1A]/20 hover:border-[#1A1A1A] hover:-translate-y-0.5 hover:shadow-sm transition-all bg-white/70">
                                <span className="flex-shrink-0 px-3 py-1 rounded-lg text-sm font-bold text-[#1A1A1A]" style={{ background: n!.color }}>{n!.name}</span>
                                <span className="text-xs text-[#4A4A4A] leading-snug">{why}</span>
                            </Link>
                        ))}
                    </div>
                </section>

                <p className="text-xs text-[#4A4A4A]/60 leading-relaxed mb-12 p-4 bg-white/60 rounded-lg">
                    ※ 本ページは一般的な解説であり、診断・治療を目的とするものではありません。睡眠の悩みが続く場合は医療機関にご相談ください。
                </p>

                <div className="text-center flex flex-wrap justify-center gap-3">
                    <Link href="/library#lifestyle" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">
                        生活習慣 に戻る
                    </Link>
                    <Link href="/library" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">
                        ← Library に戻る
                    </Link>
                </div>
            </article>
        </div>
    );
}
