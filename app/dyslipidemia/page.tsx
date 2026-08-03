import Link from 'next/link';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: '脂質異常症とは｜LDL・HDL・中性脂肪をまとめて読む | Mitoflow40',
    description: '脂質異常症をLDL・HDL・中性脂肪・non-HDLの役割から解説。診断基準、動脈硬化との関係、家族性高コレステロール血症、生活でできることを整理します。',
    alternates: { canonical: 'https://mitoflow40.com/dyslipidemia' },
    openGraph: {
        siteName: 'Mitoflow40', locale: 'ja_JP', type: 'article',
        title: '脂質異常症とは | Mitoflow40',
        description: 'LDL・HDL・中性脂肪・non-HDLを、善玉・悪玉だけでなく全体像から読む。',
        url: 'https://mitoflow40.com/dyslipidemia',
    },
};

const lipidRoles = [
    { name: 'LDLコレステロール', role: '肝臓から全身へコレステロールを届ける運搬役。多すぎる状態が続くと、動脈硬化の原因になりうる。', href: '/biomarkers/ldl' },
    { name: 'HDLコレステロール', role: '余分なコレステロールを回収して肝臓へ戻す役。低いことがリスクの手がかりになる。', href: '/biomarkers/hdl' },
    { name: '中性脂肪（TG）', role: 'すぐ使わないエネルギーを運び、蓄える形。食事・飲酒・内臓脂肪の影響を受けやすい。', href: '/biomarkers/triglycerides' },
    { name: 'non-HDLコレステロール', role: '総コレステロールからHDLを引いた値。動脈硬化に関わりうる粒子をまとめて見る。', href: '/biomarkers/non-hdl' },
];

const criteria = [
    { label: 'LDL-C', value: '140 mg/dL以上', note: '高LDLコレステロール血症' },
    { label: 'HDL-C', value: '40 mg/dL未満', note: '低HDLコレステロール血症' },
    { label: '中性脂肪', value: '空腹時150 / 随時175 mg/dL以上', note: '高トリグリセライド血症' },
    { label: 'non-HDL-C', value: '170 mg/dL以上', note: '高non-HDLコレステロール血症' },
];

const actions = [
    { head: '脂の「種類」を見る', body: '脂質をすべて避けず、肉の脂身やバターなど飽和脂肪酸に偏らないよう、魚・豆・ナッツなども組み合わせる。', href: '/foods' },
    { head: '甘い飲み物と飲酒を見直す', body: '中性脂肪は、余分なエネルギー、糖、アルコールの影響を受けやすい。まず液体から入る量を確認する。', href: '/stimulants' },
    { head: '筋肉を動かす', body: '有酸素運動と筋力トレーニングを続けることは、中性脂肪・HDL・インスリン感受性の改善に役立つ。', href: '/exercise' },
    { head: '血圧・血糖も一緒に見る', body: '脂質だけを単独で追わず、血圧、HbA1c、喫煙、腎機能、家族歴を含めて血管リスクを考える。', href: '/hypertension' },
];

export default function DyslipidemiaPage() {
    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#E7EFD8' }}>
            <img loading="lazy" decoding="async" src="/images/for-you/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block" style={{ top: 0, right: '-40px', width: '260px', transform: 'scaleY(-1)' }} />
            <img loading="lazy" decoding="async" src="/images/misc/24.png" alt="" className="absolute pointer-events-none" style={{ bottom: '-40px', left: '-40px', width: '260px' }} />

            <JsonLd data={medicalWebPage({ name: '脂質異常症とは', description: 'LDL・HDL・中性脂肪・non-HDLを、善玉・悪玉だけでなく全体像から読む。', path: '/dyslipidemia' })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: '老化と不調の土台', path: '/library#aging' }, { name: '脂質異常症', path: '/dyslipidemia' }])} />

            <article className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '老化と不調の土台', href: '/library#aging' }, { name: '脂質異常症' }]} />
                <header className="mb-12 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2 text-[#54865B]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>DYSLIPIDEMIA</p>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        BLOOD LIPIDS
                        <span className="block text-base md:text-lg mt-2 text-[#1A1A1A]/70" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>脂質異常症とは</span>
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-relaxed max-w-[600px] mx-auto">
                        コレステロールは、なくすべき油ではありません。細胞膜やホルモンをつくる大切な材料。問題は、<strong>血液中で運ぶ粒子の量とバランス</strong>です。
                    </p>
                </header>

                <div className="mb-10 rounded-2xl p-5 border border-[#54865B] bg-white/70">
                    <p className="text-sm text-[#1A1A1A]/85 leading-relaxed"><strong className="text-[#54865B]">はじめに：</strong>診断基準に当てはまることと、すぐ薬が必要なことは同じではありません。一方、生活だけで様子を見てよいとも限りません。既往歴や他のリスクを含め、医師と管理目標を決めるための入口として読んでください。</p>
                </div>

                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#54865B] pl-3">「高い」だけではない脂質の異常</h2>
                    <p className="text-[#4A4A4A] leading-loose">脂質異常症は、血液中の脂質が基準から外れた状態です。以前の「高脂血症」から名前が変わったのは、HDLのように<strong>低いことが問題になる指標</strong>もあるからです。総コレステロール一つではなく、運び方の違う指標を分けて読みます。</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
                        {lipidRoles.map((l) => (
                            <Link key={l.name} href={l.href} className="group rounded-xl p-4 bg-white/70 border border-[#1A1A1A]/15 hover:border-black transition-colors">
                                <div className="font-bold text-[#1A1A1A] mb-1 group-hover:text-[#54865B]">{l.name} →</div>
                                <p className="text-sm text-[#4A4A4A] leading-relaxed">{l.role}</p>
                            </Link>
                        ))}
                    </div>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#54865B] pl-3">健診で使われる診断基準</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">日本動脈硬化学会の基準です。境界域や個別の管理目標は、心血管リスクによって変わります。</p>
                    <div className="space-y-3">
                        {criteria.map((c) => (
                            <div key={c.label} className="grid grid-cols-[90px_1fr] sm:grid-cols-[110px_1fr_1fr] gap-2 items-center bg-white/70 rounded-xl p-4 border border-black">
                                <div className="font-bold text-[#54865B]">{c.label}</div>
                                <div className="font-bold text-[#1A1A1A]">{c.value}</div>
                                <div className="text-sm text-[#4A4A4A] col-start-2 sm:col-start-auto">{c.note}</div>
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-[#4A4A4A]/65 mt-4">※ 空腹時は基本的に10時間以上絶食（水や無糖のお茶は可）。中性脂肪は食事の影響を受けやすいため、採血条件も確認します。</p>
                </section>

                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#54865B] pl-3">なぜ、動脈硬化につながるのか</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        LDLを含む粒子が多い状態が長く続くと、粒子が血管壁に入り込み、炎症を伴いながら蓄積します。これがプラークとなり、血管が狭くなったり、破れて血栓ができたりすると、心筋梗塞や脳梗塞につながります。
                        {'\n\n'}
                        大切なのは、LDLだけで運命が決まるわけではないこと。高血圧、糖尿病、喫煙、慢性腎臓病、年齢、家族歴、すでに心血管疾患があるかによって、同じLDL値でも意味と目標は変わります。
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                        <Link href="/hypertension" className="text-xs px-3 py-1 rounded-full bg-white border border-black font-bold hover:bg-[#41C9B4] hover:text-white">高血圧</Link>
                        <Link href="/diabetes" className="text-xs px-3 py-1 rounded-full bg-white border border-black font-bold hover:bg-[#41C9B4] hover:text-white">糖尿病</Link>
                        <Link href="/inflammation" className="text-xs px-3 py-1 rounded-full bg-white border border-black font-bold hover:bg-[#41C9B4] hover:text-white">慢性炎症</Link>
                        <Link href="/oxidative-stress" className="text-xs px-3 py-1 rounded-full bg-white border border-black font-bold hover:bg-[#41C9B4] hover:text-white">酸化ストレス</Link>
                    </div>
                </section>

                <section className="mb-10 rounded-2xl p-6 md:p-8 border border-[#D67845] bg-[#FFF4E9]">
                    <h2 className="text-xl font-bold text-[#1A1A1A] mb-3">若くてもLDLが非常に高い、家族にも多い場合</h2>
                    <p className="text-sm text-[#4A4A4A] leading-loose">遺伝性の<strong>家族性高コレステロール血症（FH）</strong>が隠れていることがあります。若い頃からLDLが高い、家族に若年の心筋梗塞・狭心症がある、アキレス腱が厚いなどは医療機関へ伝えたい情報です。生活習慣だけの問題にせず、早めに相談してください。</p>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#54865B] pl-3">生活で整える4つの方向</h2>
                    <div className="space-y-3 mt-5">
                        {actions.map((a) => (
                            <Link key={a.head} href={a.href} className="group block bg-white/70 rounded-xl p-4 border border-[#1A1A1A]/15 hover:border-black hover:shadow-sm transition-all">
                                <div className="font-bold text-[#1A1A1A] mb-1 group-hover:text-[#54865B]">{a.head}</div>
                                <p className="text-sm text-[#4A4A4A] leading-relaxed">{a.body}</p>
                            </Link>
                        ))}
                    </div>
                    <p className="text-xs text-[#4A4A4A]/65 mt-4">治療中の薬は自己判断で中断しないでください。食事・運動を続けても薬が必要な人はおり、薬を使うことは失敗ではありません。</p>
                </section>

                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#54865B] pl-3">あわせて読む</h2>
                    <div className="flex flex-wrap gap-2">
                        {[
                            { href: '/biomarkers', label: '血液検査' }, { href: '/insulin-resistance', label: 'インスリン抵抗性' },
                            { href: '/metabolic-syndrome', label: 'メタボリックシンドローム' },
                            { href: '/fatty-liver', label: '脂肪肝' }, { href: '/foods', label: '食べ物' },
                            { href: '/exercise', label: '運動' }, { href: '/library', label: 'Library 全体' },
                        ].map((l) => <Link key={l.href} href={l.href} className="px-4 py-2 rounded-full bg-white border border-black text-sm font-bold hover:bg-[#41C9B4] hover:text-white">{l.label} →</Link>)}
                    </div>
                </section>

                <section className="mb-10 text-xs text-[#4A4A4A]/70 leading-relaxed">
                    <h2 className="font-bold text-[#1A1A1A] mb-2">主な参考情報</h2>
                    <ul className="list-disc pl-5 space-y-1">
                        <li><a className="underline hover:text-[#54865B]" href="https://www.j-athero.org/jp/jas_gl2022/" target="_blank" rel="noreferrer">日本動脈硬化学会「動脈硬化性疾患予防ガイドライン2022年版」</a></li>
                        <li><a className="underline hover:text-[#54865B]" href="https://kennet.mhlw.go.jp/information/information/metabolic/m-05-004" target="_blank" rel="noreferrer">厚生労働省「脂質異常症」</a></li>
                    </ul>
                </section>

                <div className="text-center"><Link href="/library#aging" className="inline-block px-8 py-3 bg-white border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white">← 老化と不調の土台に戻る</Link></div>
            </article>
        </div>
    );
}
