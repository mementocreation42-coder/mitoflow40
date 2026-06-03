import Link from 'next/link';
import { getNutrientBySlug } from '@/lib/nutrients';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: 'サプリメントの選び方（形態・吸収・タイミング） | Mitoflow40',
    description: 'サプリメントは「形態・吸収・タイミング」で効きが変わります。マグネシウム・鉄・ビタミンB・D・オメガ3などの選び方、吸収を高めるコツ、飲むタイミング、注意点を精密栄養学の視点でわかりやすく解説します。',
    alternates: { canonical: 'https://mitoflow40.com/supplements' },
    openGraph: {
        title: 'サプリメントの選び方（形態・吸収・タイミング） | Mitoflow40',
        description: '形態・吸収・タイミングで効きが変わる。主要サプリの選び方とコツ、注意点を解説。',
        url: 'https://mitoflow40.com/supplements',
        type: 'article',
    },
};

// 形態で選ぶ
const forms = [
    { slug: 'magnesium', point: 'グリシン酸・クエン酸塩は吸収が良くお腹にやさしい。酸化マグネシウムは吸収が低めで便通向け。' },
    { slug: 'iron', point: 'ヘム鉄やキレート鉄（ビスグリシン酸）は吸収が良く胃に優しい。お茶・コーヒーと同時は避ける。' },
    { slug: 'b12', point: '活性型のメチルコバラミンが利用されやすい。メチレーションが苦手な人にも届きやすい。' },
    { slug: 'folate', point: '合成葉酸より、活性型の5-MTHF（メチル葉酸）が体で使いやすい。MTHFRが気になる人はとくに。' },
    { slug: 'vitamin-d', point: 'D2よりD3が効率的。脂溶性なので脂質と一緒に。K2と組み合わせる製品も多い。' },
    { slug: 'omega3', point: 'EPA・DHAの含有量で選ぶ。酸化しやすいので鮮度・製造日・第三者検査を確認。' },
    { slug: 'zinc', point: 'ピコリン酸・グリシン酸亜鉛は吸収が良い。長期の高用量は銅とのバランスに注意。' },
];

// タイミング
const timing = [
    { when: '朝', what: 'ビタミンB群・ビタミンD・鉄', why: '日中のエネルギー代謝を支える。Bは覚醒寄りなので朝向き。' },
    { when: '食後', what: '脂溶性ビタミン（A・D・E・K）・オメガ3・CoQ10', why: '脂質と一緒だと吸収が高まる。胃の負担も減る。' },
    { when: '夜', what: 'マグネシウム・グリシン', why: '神経を鎮め、深い睡眠を後押しする。' },
    { when: '空腹時', what: 'アミノ酸・一部の鉄', why: '他の成分と競合せず吸収されやすい（胃が弱い人は無理せず食後に）。' },
];

const absorption = [
    { head: '脂溶性は「脂質」と一緒に', body: 'ビタミンD・E・K、オメガ3、CoQ10は、食事の脂と一緒に摂ると吸収が大きく上がります。' },
    { head: '鉄は「ビタミンC」と、「お茶」は避ける', body: 'ビタミンCは鉄の吸収を高め、お茶・コーヒーのタンニンは妨げます。時間をずらすのがコツ。' },
    { head: 'ミネラル同士の「競合」に注意', body: '亜鉛と銅、カルシウムと鉄・マグネシウムなどは互いに吸収を邪魔し合うため、時間を分けると効率的。' },
    { head: 'マグネシウムは「分割」して', body: '一度に大量だとお腹がゆるくなりがち。朝晩などに分けると吸収もよく、負担も減ります。' },
];

const cautions = [
    '「足りないものを、ちょうど良い量で補う」が原則。多ければ良いわけではなく、過剰摂取はかえって害になることも。',
    '脂溶性ビタミン（A・D・E・K）や鉄・亜鉛は、とりすぎると蓄積・過剰のリスクがある。',
    '持病のある方・服薬中の方は、薬との相互作用に注意。必ず医師・薬剤師に相談を。',
    '品質を見極める。第三者検査・GMP認証・含有量の明記・添加物の少なさをチェック。',
    'まずは血液検査で「自分に何が足りないか」を知ってから。当てずっぽうの多剤併用は避ける。',
];

export default function SupplementsPage() {
    const formItems = forms.map((f) => ({ ...f, n: getNutrientBySlug(f.slug) })).filter((f) => f.n);

    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#EDE6D3' }}>
            <img loading="lazy" decoding="async" src="/images/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block"
                style={{ top: '0', right: '-40px', width: '260px', transform: 'scaleY(-1)' }} />
            <img loading="lazy" decoding="async" src="/images/24.png" alt="" className="absolute pointer-events-none"
                style={{ bottom: '-40px', left: '-40px', width: '260px' }} />

            <JsonLd data={medicalWebPage({ name: 'サプリメントの選び方（形態・吸収・タイミング）', description: '形態・吸収・タイミングで効きが変わる。主要サプリの選び方とコツ、注意点を解説。', path: '/supplements' })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: '生活習慣', path: '/library#lifestyle' }, { name: 'サプリメントの選び方', path: '/supplements' }])} />
            <article className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '生活習慣', href: '/library#lifestyle' }, { name: 'サプリメントの選び方' }]} />
                <header className="mb-12 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>
                        HOW TO CHOOSE
                    </p>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        SUPPLEMENTS
                        <span className="block text-base md:text-lg mt-2 text-[#1A1A1A]/70" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>サプリメントの選び方</span>
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-relaxed max-w-[580px] mx-auto">
                        同じ栄養素でも、「形態・吸収・タイミング」で効きは大きく変わります。賢く選ぶための地図。
                    </p>
                </header>

                {/* 前提 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">まず大前提</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        サプリメントは「サプリ（supplement＝補うもの）」。<strong>食事という土台があってこそ</strong>意味を持ちます。まずは食べ物で整え、それでも足りない部分を、効率よく補うのがサプリの役割です。
                        {'\n\n'}
                        そして大切なのが、精密栄養学の原則——「<strong>足りないものを、ちょうど良い量で</strong>」。多ければ良いわけではありません。血液検査で自分に何が足りないかを知り、必要なものを、効きやすい形・吸収しやすい飲み方・適切なタイミングで摂る。この3点を押さえるだけで、同じサプリでも結果が変わります。
                    </p>
                </section>

                {/* ① 形態 */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#41C9B4] pl-3 leading-tight">① 形態で選ぶ</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">
                        同じ「マグネシウム」でも、結びついている形によって吸収率や体への作用が違います。代表的な栄養素の選び方です。
                    </p>
                    <div className="space-y-3">
                        {formItems.map((f) => (
                            <div key={f.slug} className="flex items-start gap-3 bg-white/70 rounded-xl p-4 border border-[#1A1A1A]/15">
                                <Link href={`/nutrients/${f.slug}`}
                                    className="flex-shrink-0 px-3 py-1 rounded-lg text-sm font-bold text-[#1A1A1A] hover:opacity-80 transition" style={{ background: f.n!.color }}>
                                    {f.n!.name}
                                </Link>
                                <p className="text-sm text-[#4A4A4A] leading-snug">{f.point}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ② 吸収 */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#41C9B4] pl-3 leading-tight">② 吸収を高めるコツ</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
                        {absorption.map((a) => (
                            <div key={a.head} className="bg-white/70 rounded-xl p-5 border border-black">
                                <div className="font-bold text-[#1A1A1A] mb-1">{a.head}</div>
                                <p className="text-xs text-[#4A4A4A] leading-relaxed">{a.body}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ③ タイミング */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#41C9B4] pl-3 leading-tight">③ タイミングで選ぶ</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">
                        いつ飲むかで、吸収や働きが変わります。基本の組み合わせはこちら。
                    </p>
                    <div className="bg-white/70 rounded-2xl p-5 md:p-6 border border-black space-y-3">
                        {timing.map((t) => (
                            <div key={t.when} className="flex items-start gap-4 p-3 rounded-xl" style={{ background: '#F7F3E6' }}>
                                <span className="flex-shrink-0 px-3 py-1 rounded-full bg-[#41C9B4] text-white text-xs font-bold" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>{t.when}</span>
                                <div>
                                    <div className="font-bold text-sm text-[#1A1A1A]">{t.what}</div>
                                    <p className="text-xs text-[#4A4A4A] mt-0.5 leading-snug">{t.why}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 注意点 */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#41C9B4] pl-3 leading-tight">選ぶ前に知っておきたい注意点</h2>
                    <div className="bg-white/70 rounded-2xl p-6 border border-black mt-5">
                        <ul className="space-y-3">
                            {cautions.map((c, i) => (
                                <li key={i} className="flex gap-3 text-[#4A4A4A]">
                                    <span className="text-[#FF9855] flex-shrink-0 font-bold">!</span>
                                    <span className="text-sm leading-relaxed">{c}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* 関連 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">あわせて読みたい</h2>
                    <p className="text-sm text-[#4A4A4A] leading-relaxed mb-4">「何を・どれだけ」を知るために、栄養素・食べ物・血液検査もあわせてどうぞ。</p>
                    <div className="flex flex-wrap gap-2">
                        {[
                            { href: '/nutrients', label: '栄養素' },
                            { href: '/foods', label: '食べ物' },
                            { href: '/biomarkers', label: '血液検査' },
                            { href: '/precision-nutrition', label: '精密栄養学とは' },
                            { href: '/molecular-nutrition', label: '分子栄養学とは' },
                        ].map((l) => (
                            <Link key={l.href} href={l.href}
                                className="px-4 py-2 rounded-full bg-white border border-[#1A1A1A] text-sm font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white transition-colors">
                                {l.label} →
                            </Link>
                        ))}
                    </div>
                </section>

                <p className="text-xs text-[#4A4A4A]/60 leading-relaxed mb-12 p-4 bg-white/60 rounded-lg">
                    ※ 本ページは一般的な情報提供であり、特定のサプリメントの推奨や、診断・治療を目的とするものではありません。持病・アレルギー・服薬中の方は、利用前に必ず医師・薬剤師にご相談ください。
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
