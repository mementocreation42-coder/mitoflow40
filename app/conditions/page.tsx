import Link from 'next/link';
import { conditions, getConditionsByCategory } from '@/lib/conditions';
import { staticPages } from '@/lib/pages';
import JsonLd, { breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: 'CONDITIONS | 不調・現代病を読み解く | Mitoflow40',
    description: '鉄欠乏・インスリン抵抗性・脂肪肝・脂質異常症・高血圧・更年期など、40代から増える不調と現代病を「病態」の側から解説。定義・歴史・細胞レベルのしくみ・確認したい血液検査・暮らしの打ち手・受診の目安まで。',
    alternates: { canonical: 'https://mitoflow40.com/conditions' },
    openGraph: {
        siteName: 'Mitoflow40',
        locale: 'ja_JP',
        title: 'CONDITIONS | 不調・現代病を読み解く | Mitoflow40',
        description: '40代から増える不調と現代病を、細胞とATPの側から読み解く病態の索引。',
        url: 'https://mitoflow40.com/conditions',
        type: 'website',
    },
};

// まだデータ駆動化していない、直書きの病態ページ。ここから辿れるようにしておき、
// 1枚ずつ conditions に巻き取っていく（巻き取ったらこのリストから外す）。
const LEGACY_CONDITION_PATHS: { path: string; category: string }[] = [
    { path: '/insulin-resistance', category: '血糖・脂質・血圧' },
    { path: '/diabetes', category: '血糖・脂質・血圧' },
    { path: '/dyslipidemia', category: '血糖・脂質・血圧' },
    { path: '/hypertension', category: '血糖・脂質・血圧' },
    { path: '/metabolic-syndrome', category: '血糖・脂質・血圧' },
    { path: '/fatty-liver', category: '内臓' },
    { path: '/chronic-kidney-disease', category: '内臓' },
    { path: '/gut-troubles', category: '内臓' },
    { path: '/periodontal-disease', category: '炎症・免疫' },
    { path: '/histamine', category: '炎症・免疫' },
    { path: '/neuroinflammation', category: '神経・こころ' },
    { path: '/migraine', category: '神経・こころ' },
    { path: '/menopause', category: 'ホルモン' },
    { path: '/male-menopause', category: 'ホルモン' },
    { path: '/sarcopenia', category: '栄養・代謝' },
];

const CATEGORY_ORDER = ['栄養・代謝', '血糖・脂質・血圧', '内臓', 'ホルモン', '炎症・免疫', '神経・こころ'];

export default function ConditionsIndex() {
    const byCat = getConditionsByCategory();
    const legacy = LEGACY_CONDITION_PATHS
        .map((l) => ({ ...l, page: staticPages.find((p) => p.path === l.path) }))
        .filter((l) => l.page?.search);
    const categories = CATEGORY_ORDER.filter((cat) => byCat.some((b) => b.category === cat) || legacy.some((l) => l.category === cat));

    return (
        <div className="relative overflow-hidden pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen" style={{ background: '#FCE3D4' }}>
            <img loading="lazy" decoding="async" src="/images/for-you/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block"
                style={{ top: '0', right: '-40px', width: '260px', transform: 'scaleY(-1)' }} />
            <img loading="lazy" decoding="async" src="/images/misc/24.png" alt="" className="absolute pointer-events-none"
                style={{ bottom: '-40px', left: '-40px', width: '260px' }} />

            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: '不調・現代病', path: '/conditions' }])} />
            <div className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '不調・現代病' }]} />
                <div className="text-center mb-12">
                    <h1 className="inline-block text-left font-bold mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        <span className="block text-4xl md:text-5xl leading-none text-[#1A1A1A]">CONDITIONS</span>
                        <span className="block text-center text-base md:text-lg mt-2 text-[#1A1A1A]/70" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>不調・現代病を読み解く</span>
                    </h1>
                    <p className="text-[#4A4A4A] mt-4 max-w-[620px] mx-auto leading-relaxed">
                        「症状から引く」が体感の入口なら、ここは<strong>病態</strong>の入口。それぞれの状態を、定義・歴史・細胞レベルのしくみ・確認したい血液検査・暮らしの打ち手・受診の目安の順に読み解きます。1枚ずつ、丁寧に増やしていきます。
                    </p>
                </div>

                <div className="space-y-12">
                    {categories.map((cat) => {
                        const items = byCat.find((b) => b.category === cat)?.items ?? [];
                        const legacyItems = legacy.filter((l) => l.category === cat);
                        return (
                            <section key={cat}>
                                <h2 className="text-xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">{cat}</h2>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {items.map((c) => (
                                        <Link key={c.slug} href={`/conditions/${c.slug}`}
                                            className="group block p-5 rounded-2xl border border-[#1A1A1A] hover:shadow-md hover:-translate-y-0.5 transition-all bg-white/70">
                                            <div className="flex items-baseline gap-2 mb-1">
                                                <h3 className="text-lg font-bold text-[#1A1A1A]">{c.name}</h3>
                                                <span className="text-xs text-[#1A1A1A]/50 font-mono">{c.en}</span>
                                            </div>
                                            <p className="text-sm text-[#1A1A1A]/70 leading-snug">{c.tagline}</p>
                                        </Link>
                                    ))}
                                    {legacyItems.map((l) => (
                                        <Link key={l.path} href={l.path}
                                            className="group block p-5 rounded-2xl border border-[#1A1A1A]/40 hover:border-[#1A1A1A] hover:shadow-md hover:-translate-y-0.5 transition-all bg-white/40">
                                            <h3 className="text-lg font-bold text-[#1A1A1A] mb-1">{l.page!.search!.title}</h3>
                                            <p className="text-sm text-[#1A1A1A]/70 leading-snug">{l.page!.search!.sub}</p>
                                        </Link>
                                    ))}
                                </div>
                            </section>
                        );
                    })}
                </div>

                <div className="mt-12 rounded-2xl border border-[#1A1A1A] bg-white/70 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div>
                        <p className="text-[10px] tracking-widest font-bold mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>FROM SYMPTOMS</p>
                        <p className="text-sm text-[#1A1A1A]">病名より先に「体感」から探したい方は、症状から引く索引へ。</p>
                    </div>
                    <Link href="/symptoms" className="shrink-0 px-5 py-2.5 rounded-full text-sm font-bold bg-[#1A1A1A] text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>症状から引く →</Link>
                </div>

                <p className="text-xs text-[#4A4A4A]/60 text-center mt-12 leading-relaxed">
                    ※ 本ページは一般的な情報提供であり、診断・治療を目的とするものではありません。症状が続く・強い場合は、自己判断せず医療機関にご相談ください。
                    {conditions.length > 0 && ` ／ データ駆動ページ ${conditions.length} 件`}
                </p>
            </div>
        </div>
    );
}
