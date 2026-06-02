import Link from 'next/link';
import { getNutrientBySlug } from '@/lib/nutrients';
import JsonLd, { medicalWebPage } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: 'ケトン体 | Mitoflow40',
    description: '脂肪から作られる「第二のエネルギー源」ケトン体を、作られる仕組み・役割・代謝の柔軟性との関係・関わる栄養素からわかりやすく解説。',
    alternates: { canonical: 'https://mitoflow40.com/ketones' },
    openGraph: {
        title: 'ケトン体 | Mitoflow40',
        description: '脂肪から作られる第二のエネルギー源「ケトン体」を、仕組み・役割・代謝の柔軟性から解説。',
        url: 'https://mitoflow40.com/ketones',
        type: 'article',
    },
};

// ケトン体の種類
const types = [
    { name: 'βヒドロキシ酪酸', en: 'β-Hydroxybutyrate', note: '血中で最も多い主役。脳・筋肉のエネルギー源に' },
    { name: 'アセト酢酸', en: 'Acetoacetate', note: 'ケトン体合成の出発点。βヒドロキシ酪酸へ変換される' },
    { name: 'アセトン', en: 'Acetone', note: '副産物。呼気から排出される（ケトン臭の正体）' },
];

// 作られる流れ
const flow = [
    { stage: '糖が不足する', note: '断食・低糖質・長時間の運動などで、ブドウ糖の供給が減る' },
    { stage: '脂肪を分解', note: '脂肪細胞から脂肪酸が放出され、肝臓へ運ばれる' },
    { stage: '肝臓でケトン体を生成', note: '脂肪酸からケトン体（βヒドロキシ酪酸など）が作られる' },
    { stage: '全身・脳のエネルギーに', note: '血流に乗って運ばれ、各組織でアセチルCoAに変換される', href: '/tca-cycle' },
];

// 関わる栄養素
const cofactors = [
    { slug: 'omega3', why: '良質な脂質は脂肪代謝の材料。ケトン体生成の土台' },
    { slug: 'magnesium', why: 'ケトン適応の初期に不足しやすく、こむら返り等の予防に' },
    { slug: 'thiamine', why: '糖・脂質代謝の入口を支え、エネルギー切り替えを助ける' },
    { slug: 'coq10', why: 'ケトン体由来のエネルギーも最終的に電子伝達系で使われる' },
];

export default function KetonesPage() {
    const nutrients = cofactors
        .map((c) => ({ ...c, n: getNutrientBySlug(c.slug) }))
        .filter((c) => c.n);

    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#E6E0F2' }}>
            {/* Decorative illustrations */}
            <img loading="lazy" decoding="async" src="/images/for-you-recovery.png" alt="" className="absolute pointer-events-none opacity-80 hidden md:block"
                style={{ top: '60px', right: '-50px', width: '260px' }} />
            <img loading="lazy" decoding="async" src="/images/experience_vitality_new.png" alt="" className="absolute pointer-events-none opacity-40"
                style={{ bottom: '-60px', left: '-70px', width: '320px', transform: 'scaleX(-1)' }} />

            <JsonLd data={medicalWebPage({ name: 'ケトン体とは', description: '脂肪から作られる第二のエネルギー源「ケトン体」を、仕組み・役割・代謝の柔軟性から解説。', path: '/ketones' })} />
            <article className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                {/* Hero */}
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '身体の仕組み', href: '/library#mechanism' }, { name: 'ケトン体' }]} />
                <header className="mb-12 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>
                        ALTERNATIVE FUEL
                    </p>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        KETONES
                        <span className="block text-base md:text-lg mt-2 text-[#1A1A1A]/70" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>ケトン体とは</span>
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-relaxed max-w-[560px] mx-auto">
                        糖が足りないとき、脂肪から作られる「第二のエネルギー源」。脳も使える、燃料切り替えの要です。
                    </p>
                </header>

                {/* とは */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">ケトン体とは</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        ケトン体は、糖（ブドウ糖）が不足したときに、肝臓が脂肪から作り出す代替エネルギー源です。断食中や低糖質のとき、長時間の運動時などに増えます。
                        {'\n\n'}
                        重要なのは、ケトン体が<strong>脳のエネルギー源になれる</strong>こと。脳は普段ブドウ糖を主な燃料にしますが、糖が乏しくなるとケトン体を使ってエネルギーを確保します。これにより、食べなくても脳と体が動き続けられます。
                        {'\n\n'}
                        近年は、単なる燃料を超えて、抗炎症や細胞のメンテナンス（オートファジー）を促すシグナル分子としての役割も注目されています。糖と脂肪を柔軟に切り替えて使える状態は「代謝の柔軟性」と呼ばれ、鍛えられたミトコンドリアの証でもあります。
                    </p>
                </section>

                {/* 作られる流れ */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#41C9B4] pl-3 leading-tight">ケトン体ができる流れ</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">
                        糖が足りなくなると、体は燃料を脂肪へ切り替えます。その過程で肝臓がケトン体を作ります。
                    </p>
                    <div className="bg-white/70 rounded-2xl p-5 md:p-6 border border-black">
                        <div className="space-y-2">
                            {flow.map((step, i) => (
                                <div key={step.stage}>
                                    <div className="flex items-center gap-4 p-4 rounded-xl" style={{ background: i === flow.length - 1 ? '#FFE9D2' : '#F3F0F9' }}>
                                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#9B7FD4] text-white text-sm font-bold flex items-center justify-center" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                            {i + 1}
                                        </span>
                                        <div className="flex-1">
                                            <span className="font-bold text-[#1A1A1A]">
                                                {step.href ? (
                                                    <Link href={step.href} className="underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                                        {step.stage}
                                                    </Link>
                                                ) : step.stage}
                                            </span>
                                            <p className="text-xs text-[#4A4A4A] mt-0.5">{step.note}</p>
                                        </div>
                                    </div>
                                    {i < flow.length - 1 && (
                                        <div className="text-center text-[#9B7FD4] text-xl leading-none py-1">↓</div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 種類 */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#41C9B4] pl-3 leading-tight">ケトン体の3つの種類</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">
                        「ケトン体」とは、次の3つの物質の総称です。
                    </p>
                    <div className="space-y-3">
                        {types.map((t) => (
                            <div key={t.en} className="bg-white/70 rounded-xl p-4 border border-[#1A1A1A]/15">
                                <div className="flex items-baseline gap-2 flex-wrap mb-1">
                                    <span className="font-bold text-[#1A1A1A]">{t.name}</span>
                                    <span className="text-xs text-[#1A1A1A]/40 font-mono">{t.en}</span>
                                </div>
                                <p className="text-sm text-[#4A4A4A] leading-snug">{t.note}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 代謝の柔軟性 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">「代謝の柔軟性」とのつながり</h2>
                    <p className="text-[#4A4A4A] leading-loose">
                        糖と脂肪（ケトン体）を、状況に応じてスムーズに切り替えて使える能力を<strong>「代謝の柔軟性」</strong>と呼びます。
                        糖質に頼りきった生活では、この切り替えが鈍り、食事の間隔が空くだけで集中力が落ちたり、強い空腹に襲われたりします。
                        間欠的な断食や運動で脂肪を使う回路を開いておくと、ケトン体をうまく使えるようになり、エネルギーが安定します。
                        これはセルフチェックの4軸のひとつ「代謝の柔軟性」が見ているポイントでもあります。
                    </p>
                </section>

                {/* 注意点 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">知っておきたいこと</h2>
                    <ul className="space-y-2 text-[#4A4A4A]">
                        <li className="flex gap-3"><span className="text-[#9B7FD4] flex-shrink-0">●</span><span>生理的なケトーシス（断食・低糖質）と、糖尿病でみられる危険な「ケトアシドーシス」は別物です。</span></li>
                        <li className="flex gap-3"><span className="text-[#9B7FD4] flex-shrink-0">●</span><span>切り替え初期は、だるさ・頭痛・こむら返り（いわゆるケトフルー）が出ることがあります。水分とミネラル補給が大切です。</span></li>
                        <li className="flex gap-3"><span className="text-[#9B7FD4] flex-shrink-0">●</span><span>持病のある方や服薬中の方は、極端な糖質制限の前に医療専門家に相談してください。</span></li>
                    </ul>
                </section>

                {/* 関わる栄養素 */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#41C9B4] pl-3 leading-tight">ケトン体に関わる栄養素</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">
                        脂肪を燃料に切り替えるとき、これらの栄養素が支えになります。
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {nutrients.map(({ slug, why, n }) => (
                            <Link
                                key={slug}
                                href={`/nutrients/${slug}`}
                                className="flex items-start gap-3 p-4 rounded-xl border border-[#1A1A1A]/20 hover:border-[#1A1A1A] hover:-translate-y-0.5 hover:shadow-sm transition-all bg-white/70"
                            >
                                <span className="flex-shrink-0 px-3 py-1 rounded-lg text-sm font-bold text-[#1A1A1A]" style={{ background: n!.color }}>
                                    {n!.name}
                                </span>
                                <span className="text-xs text-[#4A4A4A] leading-snug">{why}</span>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* Disclaimer */}
                <p className="text-xs text-[#4A4A4A]/60 leading-relaxed mb-12 p-4 bg-white/60 rounded-lg">
                    ※ 本ページは生化学・栄養の一般的な解説であり、診断・治療や特定の食事法を推奨するものではありません。
                </p>

                {/* Back links */}
                <div className="text-center flex flex-wrap justify-center gap-3">
                    <Link href="/library#mechanism" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">
                        身体の仕組み に戻る
                    </Link>
                    <Link href="/library" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">
                        ← Library に戻る
                    </Link>
                </div>
            </article>
        </div>
    );
}
