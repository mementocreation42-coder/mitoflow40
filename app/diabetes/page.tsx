import Link from 'next/link';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: '糖尿病とは ｜ 種類・サイン・予防と、境界型のうちにできること | Mitoflow40',
    description: '糖尿病は、血糖を下げるインスリンの働きが不足し、慢性的に血糖が高くなる病気。1型・2型・妊娠糖尿病の違い、自覚しにくい初期サイン、HbA1cなどの指標、合併症、そして「境界型（予備群）」のうちにできる生活の工夫を、精密栄養学の視点で中立に整理します。診断・治療は医療機関で。',
    alternates: { canonical: 'https://mitoflow40.com/diabetes' },
    openGraph: {
        title: '糖尿病とは | Mitoflow40',
        description: '糖尿病の種類・サイン・指標・合併症と、境界型のうちにできること。診断・治療は医療機関で。',
        url: 'https://mitoflow40.com/diabetes',
        type: 'article',
    },
};

const types = [
    { name: '1型糖尿病', note: '自己免疫などでインスリンを作る膵臓の細胞が壊れ、インスリンがほとんど出なくなる。生活習慣が原因ではなく、インスリン注射による治療が必要。子ども〜若年でも発症する。' },
    { name: '2型糖尿病', note: '最も多いタイプ（日本の糖尿病の約9割）。インスリンが効きにくくなる（インスリン抵抗性）＋分泌の低下が進む。遺伝的な体質に、肥満・運動不足・加齢などが重なって発症する。' },
    { name: '妊娠糖尿病', note: '妊娠中に血糖が高くなる状態。母子の健康のため管理が必要で、出産後に戻ることが多いが、将来の2型糖尿病リスクは高まる。' },
];

const signs = [
    'のどが渇く・水をよく飲む',
    '尿の回数・量が増える',
    '体重が理由なく減る',
    '疲れやすい・だるい',
    '傷が治りにくい・感染しやすい',
    '視界がぼやける',
];

export default function DiabetesPage() {
    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#F7E2DC' }}>
            <img loading="lazy" decoding="async" src="/images/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block"
                style={{ top: '0', right: '-40px', width: '260px', transform: 'scaleY(-1)' }} />
            <img loading="lazy" decoding="async" src="/images/24.png" alt="" className="absolute pointer-events-none"
                style={{ bottom: '-40px', left: '-40px', width: '260px' }} />

            <JsonLd data={medicalWebPage({ name: '糖尿病とは', description: '糖尿病の種類・サイン・指標・合併症と、境界型のうちにできること。診断・治療は医療機関で。', path: '/diabetes' })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: '身体の仕組み', path: '/library#mechanism' }, { name: '糖尿病', path: '/diabetes' }])} />

            <article className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '身体の仕組み', href: '/library#mechanism' }, { name: '糖尿病' }]} />
                <header className="mb-12 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>DIABETES</p>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        DIABETES
                        <span className="block text-base md:text-lg mt-2 text-[#1A1A1A]/70" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>糖尿病とは</span>
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-relaxed max-w-[560px] mx-auto">
                        糖尿病は「血糖が高い」だけの病気ではありません。<strong>静かに進み、全身の血管をむしばむ</strong>からこそ、正しく知り、<strong>境界型のうちに気づくこと</strong>が何より大切です。
                    </p>
                </header>

                {/* 冒頭の立場 */}
                <div className="mb-10 rounded-2xl p-5 border border-[#E8896B] bg-white/70">
                    <p className="text-sm text-[#1A1A1A]/85 leading-relaxed">
                        <strong className="text-[#E8896B]">はじめに：</strong>このページは病気を正しく知るための<strong>教育的な解説</strong>で、診断・治療を行うものではありません。糖尿病は医療機関での診断・治療が必要な病気です。健診で指摘された方、症状が気になる方は、必ず医師にご相談ください。Mitoflow40が扱うのは、その<strong>手前（未病・予防）の段階</strong>です。
                    </p>
                </div>

                {/* 糖尿病とは */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#FF9855] pl-3 leading-tight">糖尿病とは、どんな病気か</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        食事でとった糖（ブドウ糖）は、血液にのって全身の細胞へ運ばれ、エネルギーになります。このとき、糖を細胞に取り込ませる“鍵”の役割をするのが、膵臓から出るホルモン<strong>インスリン</strong>です。
                        {'\n\n'}
                        糖尿病は、この<strong>インスリンが足りない、または効きにくくなり、血液中に糖があふれた状態が続く</strong>病気です。高い血糖そのものより怖いのは、それが長く続くことで<strong>全身の血管が静かに傷んでいく</strong>こと。初期は自覚症状がほとんどないため、「気づいたときには進んでいた」となりやすいのが特徴です。
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {[{ href: '/blood-sugar', label: '血糖コントロール' }, { href: '/hormones', label: 'インスリン（ホルモン）' }, { href: '/glycation', label: '糖化' }].map((l) => (
                            <Link key={l.href} href={l.href} className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">{l.label}</Link>
                        ))}
                    </div>
                </section>

                {/* 種類 */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#FF9855] pl-3 leading-tight">主な種類</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">「糖尿病」とひとくくりにされがちですが、原因はタイプで大きく異なります。とくに1型と2型は別の病気と考えた方が正確です。</p>
                    <div className="space-y-3">
                        {types.map((t) => (
                            <div key={t.name} className="bg-white/70 rounded-2xl p-5 border border-black">
                                <div className="font-bold text-[#1A1A1A] mb-1">{t.name}</div>
                                <p className="text-sm text-[#4A4A4A] leading-relaxed">{t.note}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-[#4A4A4A]/60 mt-4 leading-relaxed">※ 「生活習慣病」として語られるのは主に2型です。1型は生活習慣が原因ではなく、誤解で本人が責められないことが大切です。</p>
                </section>

                {/* サイン */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#FF9855] pl-3 leading-tight">見逃しやすい、初期のサイン</h2>
                    <p className="text-[#4A4A4A] leading-loose mb-4">初期は無症状のことも多いですが、進むと次のようなサインが出ることがあります。当てはまるものが続くなら、医療機関で相談を。</p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {signs.map((s) => (
                            <li key={s} className="flex gap-3 text-sm text-[#1A1A1A]/85 leading-relaxed bg-white/60 rounded-xl p-3 border border-[#1A1A1A]/15">
                                <span className="text-[#FF9855] flex-shrink-0 font-bold">●</span><span>{s}</span>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* 指標 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#FF9855] pl-3 leading-tight">健診で見るべき数字</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        血糖の状態は、健診の血液検査で確認できます。とくに大切なのが<strong>HbA1c（ヘモグロビンエーワンシー）</strong>。これは過去1〜2か月の血糖の平均を映す指標で、その日の食事に左右されにくいのが特徴です。あわせて<strong>空腹時血糖</strong>も重要な手がかりになります。
                        {'\n\n'}
                        基準を少し超えた「<strong>境界型（糖尿病予備群）</strong>」の段階で気づければ、生活の工夫で進行を抑えられる可能性が高まります。数値の意味は、Mitoflow40の血液検査ページでも解説しています。
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {[{ href: '/biomarkers', label: '血液検査（HbA1c等）' }, { href: '/cgm', label: '血糖モニタリング' }].map((l) => (
                            <Link key={l.href} href={l.href} className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">{l.label}</Link>
                        ))}
                    </div>
                    <p className="text-xs text-[#4A4A4A]/60 mt-3 leading-relaxed">※ 診断は、複数の検査と医師の判断によって行われます。ここでの数値の話は参考情報で、自己診断の根拠にはしないでください。</p>
                </section>

                {/* 合併症 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#FF9855] pl-3 leading-tight">本当に怖いのは「合併症」</h2>
                    <p className="text-[#4A4A4A] leading-loose">
                        糖尿病が問題なのは、高血糖が続くことで<strong>全身の細い血管・太い血管が傷む</strong>から。代表的なのが「<strong>三大合併症</strong>」——<strong>網膜症（目）・腎症（腎臓）・神経障害（手足）</strong>です。さらに、心筋梗塞や脳卒中といった大血管の病気、感染症、認知症などのリスクも高まります。
                        だからこそ、症状がなくても<strong>早く見つけて、血管が傷む前に手を打つ</strong>ことに、大きな意味があります。
                    </p>
                </section>

                {/* 予防・できること */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#FF9855] pl-3 leading-tight">境界型のうちに、できること</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">2型糖尿病や境界型は、生活の工夫が大きな意味を持つ数少ない領域です（治療中の方は、必ず主治医の指示を優先してください）。</p>
                    <div className="space-y-3">
                        {[
                            { head: '血糖の波をなだらかに', body: '精製した糖質に偏らない、食べ順を工夫する、よく噛む。血糖の乱高下を抑える食べ方を。', href: '/blood-sugar' },
                            { head: '食後に体を動かす', body: '食後の軽い散歩は、血糖の山を下げる即効性のある一手。', href: '/exercise' },
                            { head: '内臓脂肪・体重を整える', body: '2型ではインスリンの効きと体重が深く関わる。少しの減量でも改善することがある。', href: '/modern-diseases' },
                            { head: '睡眠とストレスを整える', body: '寝不足や慢性ストレスは血糖を上げやすい。生活全体が血糖に効く。', href: '/sleep' },
                        ].map((s) => (
                            <Link key={s.head} href={s.href} className="group flex items-start gap-4 bg-white/70 rounded-xl p-4 border border-[#1A1A1A]/15 hover:border-black hover:shadow-sm transition-all">
                                <div>
                                    <div className="font-bold text-[#1A1A1A] mb-0.5 group-hover:text-[#FF9855] transition-colors">{s.head}</div>
                                    <p className="text-sm text-[#4A4A4A] leading-snug">{s.body}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                    <p className="text-xs text-[#4A4A4A]/60 mt-4 leading-relaxed">※ すでに糖尿病と診断されている方の食事・運動・薬は、自己判断で変えず、必ず主治医や管理栄養士と相談してください。</p>
                </section>

                {/* もっと学ぶ */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#FF9855] pl-3 leading-tight">あわせて読む</h2>
                    <div className="flex flex-wrap gap-2">
                        {[
                            { href: '/blood-sugar', label: '血糖コントロール' },
                            { href: '/glycation', label: '糖化' },
                            { href: '/cgm', label: '血糖モニタリング' },
                            { href: '/modern-diseases', label: '現代病とは' },
                            { href: '/biomarkers', label: '血液検査' },
                            { href: '/library', label: 'Library 全体' },
                        ].map((l) => (
                            <Link key={l.href} href={l.href} className="px-4 py-2 rounded-full bg-white border border-[#1A1A1A] text-sm font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white transition-colors">{l.label} →</Link>
                        ))}
                    </div>
                </section>

                <div className="text-center">
                    <Link href="/library" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">← Library に戻る</Link>
                </div>
            </article>
        </div>
    );
}
