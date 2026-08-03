import Link from 'next/link';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: 'インスリン抵抗性とは｜血糖が上がる前に起きていること | Mitoflow40',
    description: 'インスリン抵抗性とは、筋肉・脂肪・肝臓がインスリンに反応しにくくなる状態。血糖が正常でも進む仕組み、内臓脂肪・脂肪肝との関係、検査、改善の方向を解説します。',
    alternates: { canonical: 'https://mitoflow40.com/insulin-resistance' },
    openGraph: {
        siteName: 'Mitoflow40',
        locale: 'ja_JP',
        title: 'インスリン抵抗性とは | Mitoflow40',
        description: '血糖が上がる前から始まる代謝の変化。仕組み・検査・生活でできることを解説。',
        url: 'https://mitoflow40.com/insulin-resistance',
        type: 'article',
    },
};

const stages = [
    { n: '1', title: 'インスリンが効きにくくなる', body: '筋肉・脂肪・肝臓の細胞が、同じ量のインスリンに十分反応しにくくなる。' },
    { n: '2', title: '膵臓が量を増やして補う', body: '血糖を保つため、膵臓がより多くのインスリンを分泌する。血糖が正常でも負担は始まっている。' },
    { n: '3', title: '補いきれず血糖が上がる', body: '長く続いて分泌が追いつかなくなると、糖尿病予備群や2型糖尿病へ進むことがある。' },
];

const relatedSigns = [
    { title: '腹囲・内臓脂肪が増えた', note: '内臓脂肪から出る炎症性物質などが、インスリンの働きを妨げる方向に関わる。' },
    { title: '中性脂肪が高く、HDLが低い', note: '糖と脂質の代謝が同時に乱れている手がかり。LDLだけでは見えにくい。' },
    { title: '血圧も上がってきた', note: '血糖・脂質・血圧の変化は、メタボリックシンドロームとして重なりやすい。' },
    { title: '脂肪肝を指摘された', note: 'MASLD（代謝異常関連脂肪性肝疾患）は、インスリン抵抗性と深く結びつく。' },
];

const actions = [
    { head: '筋肉を使う', body: '筋肉はブドウ糖の大きな受け皿。歩行や筋力トレーニングを続けると、インスリンへの反応改善が期待できる。', href: '/exercise' },
    { head: '甘い飲み物・精製度の高い食品を減らす', body: '糖質を一律に禁止せず、液体の糖や食べすぎやすい食品から優先して見直す。食物繊維やたんぱく質も組み合わせる。', href: '/blood-sugar' },
    { head: '内臓脂肪を少しずつ減らす', body: '体重だけでなく腹囲の変化にも注目。急激な減量より、栄養を保ちながら続けられる方法を選ぶ。', href: '/fatty-liver' },
    { head: '睡眠と生活リズムを整える', body: '睡眠不足や不規則な生活は、食欲・活動量・糖代謝に影響する。まず起床時刻をそろえるところから。', href: '/sleep' },
];

export default function InsulinResistancePage() {
    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#F6E6CF' }}>
            <img loading="lazy" decoding="async" src="/images/for-you/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block"
                style={{ top: '0', right: '-40px', width: '260px', transform: 'scaleY(-1)' }} />
            <img loading="lazy" decoding="async" src="/images/misc/24.png" alt="" className="absolute pointer-events-none"
                style={{ bottom: '-40px', left: '-40px', width: '260px' }} />

            <JsonLd data={medicalWebPage({ name: 'インスリン抵抗性とは', description: '血糖が上がる前から始まる代謝の変化。仕組み・検査・生活でできることを解説。', path: '/insulin-resistance' })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: '身体の仕組み', path: '/library#mechanism' }, { name: 'インスリン抵抗性', path: '/insulin-resistance' }])} />

            <article className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '身体の仕組み', href: '/library#mechanism' }, { name: 'インスリン抵抗性' }]} />
                <header className="mb-12 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2 text-[#D67845]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>INSULIN RESISTANCE</p>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        INSULIN RESISTANCE
                        <span className="block text-base md:text-lg mt-2 text-[#1A1A1A]/70" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>インスリン抵抗性とは</span>
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-relaxed max-w-[600px] mx-auto">
                        健診の血糖が正常でも、膵臓が多くのインスリンを出して<strong>ぎりぎり正常に保っている時期</strong>があります。血糖が上がる前の、水面下の変化です。
                    </p>
                </header>

                <div className="mb-10 rounded-2xl p-5 border border-[#D67845] bg-white/70">
                    <p className="text-sm text-[#1A1A1A]/85 leading-relaxed">
                        <strong className="text-[#D67845]">はじめに：</strong>インスリン抵抗性は、それ自体を一つの検査だけで自己診断するものではありません。血糖、HbA1c、脂質、体格、病歴などを医療者が総合して評価します。このページは一般的な理解のための情報です。
                    </p>
                </div>

                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#D67845] pl-3 leading-tight">細胞が、インスリンに反応しにくい状態</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        食事から入ったブドウ糖は血液で全身へ運ばれます。膵臓から分泌される<strong>インスリン</strong>は、筋肉・脂肪・肝臓などに働きかけ、ブドウ糖を使ったり蓄えたりできるようにするホルモンです。
                        {'\n\n'}
                        インスリン抵抗性とは、これらの組織がインスリンに十分反応しにくくなった状態。同じ血糖を処理するために、より多くのインスリンが必要になります。「インスリンがない」のではなく、<strong>出ているのに効率よく働けない</strong>ことが問題です。
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                        <Link href="/hormones/insulin" className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">インスリン</Link>
                        <Link href="/organs/pancreas" className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">膵臓</Link>
                        <Link href="/blood-sugar" className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">血糖コントロール</Link>
                    </div>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#D67845] pl-3 leading-tight">血糖値だけでは見えない時間</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">変化は、ある日突然ではなく、補い合いながら進みます。</p>
                    <div className="space-y-3">
                        {stages.map((s) => (
                            <div key={s.n} className="flex gap-4 bg-white/70 rounded-2xl p-5 border border-black">
                                <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-white bg-[#D67845] shrink-0">{s.n}</div>
                                <div>
                                    <h3 className="font-bold text-[#1A1A1A] mb-1">{s.title}</h3>
                                    <p className="text-sm text-[#4A4A4A] leading-relaxed">{s.body}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-[#4A4A4A]/65 mt-4 leading-relaxed">すべての人が同じ順序や速度で進むわけではなく、インスリン抵抗性があっても糖尿病にならない人もいます。</p>
                </section>

                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#D67845] pl-3 leading-tight">原因は「糖質だけ」ではない</h2>
                    <p className="text-[#4A4A4A] leading-loose">
                        体質や家族歴に加え、内臓脂肪、運動不足、加齢、睡眠不足など複数の要因が関わります。脂肪組織や肝臓の炎症、筋肉量の低下も、インスリンの働きに影響します。特定の薬やホルモンの病気が関わる場合もあります。
                        <br /><br />
                        したがって、原因を「甘いものを食べた本人の責任」に単純化するのは正確ではありません。食事は大切な一部ですが、<strong>筋肉・脂肪・肝臓・睡眠を含む全身の代謝</strong>として捉えます。
                    </p>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#D67845] pl-3 leading-tight">単独の症状より、組み合わせを見る</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">多くの場合、はっきりした自覚症状はありません。次の変化が重なるときは、健診結果をまとめて確認する価値があります。</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {relatedSigns.map((s) => (
                            <div key={s.title} className="bg-white/70 rounded-2xl p-5 border border-[#1A1A1A]/20">
                                <div className="font-bold text-[#1A1A1A] mb-1">{s.title}</div>
                                <p className="text-sm text-[#4A4A4A] leading-relaxed">{s.note}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#D67845] pl-3 leading-tight">検査は「血糖＋周辺」を見る</h2>
                    <p className="text-[#4A4A4A] leading-loose mb-5">
                        糖尿病・糖尿病予備群の判定では、空腹時血糖、HbA1c、必要に応じて75g経口ブドウ糖負荷試験などが使われます。インスリン抵抗性の参考として、空腹時血糖と空腹時インスリンから計算する<strong>HOMA-IR</strong>があります。
                        <br /><br />
                        日本糖尿病学会のガイドラインでは、HOMA-IRは簡便な指標の一つで、1.6以下を正常、2.5以上をインスリン抵抗性ありとする目安が示されています。ただし、血糖が非常に高い場合やインスリン治療中など、適切に評価できない場面があります。数値だけで診断せず、医師に解釈を確認してください。
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {[
                            { href: '/biomarkers/fasting-glucose', label: '空腹時血糖' },
                            { href: '/biomarkers/hba1c', label: 'HbA1c' },
                            { href: '/biomarkers/fasting-insulin', label: '空腹時インスリン' },
                            { href: '/biomarkers/homa-ir', label: 'HOMA-IR' },
                            { href: '/biomarkers/triglycerides', label: '中性脂肪' },
                        ].map((l) => (
                            <Link key={l.href} href={l.href} className="px-4 py-2 rounded-full bg-white border border-[#1A1A1A] text-sm font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white transition-colors">{l.label} →</Link>
                        ))}
                    </div>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#D67845] pl-3 leading-tight">感受性を取り戻す方向</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">インスリン抵抗性や糖尿病予備群は、生活の変化で改善する可能性があります。治療中の方は、薬や食事を自己判断で変えず主治医と相談してください。</p>
                    <div className="space-y-3">
                        {actions.map((a) => (
                            <Link key={a.head} href={a.href} className="group block bg-white/70 rounded-xl p-4 border border-[#1A1A1A]/15 hover:border-black hover:shadow-sm transition-all">
                                <div className="font-bold text-[#1A1A1A] mb-1 group-hover:text-[#D67845] transition-colors">{a.head}</div>
                                <p className="text-sm text-[#4A4A4A] leading-relaxed">{a.body}</p>
                            </Link>
                        ))}
                    </div>
                </section>

                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#D67845] pl-3 leading-tight">あわせて読む</h2>
                    <div className="flex flex-wrap gap-2">
                        {[
                            { href: '/diabetes', label: '糖尿病' },
                            { href: '/blood-sugar', label: '血糖コントロール' },
                            { href: '/fatty-liver', label: '脂肪肝' },
                            { href: '/hypertension', label: '高血圧' },
                            { href: '/dyslipidemia', label: '脂質異常症' },
                            { href: '/sarcopenia', label: '筋肉と代謝' },
                            { href: '/library', label: 'Library 全体' },
                        ].map((l) => (
                            <Link key={l.href} href={l.href} className="px-4 py-2 rounded-full bg-white border border-[#1A1A1A] text-sm font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white transition-colors">{l.label} →</Link>
                        ))}
                    </div>
                </section>

                <section className="mb-10 text-xs text-[#4A4A4A]/70 leading-relaxed">
                    <h2 className="font-bold text-[#1A1A1A] mb-2">主な参考情報</h2>
                    <ul className="list-disc pl-5 space-y-1">
                        <li><a className="underline hover:text-[#D67845]" href="https://www.jds.or.jp/uploads/files/publications/gl2024/01.pdf" target="_blank" rel="noreferrer">日本糖尿病学会「糖尿病診療ガイドライン2024」</a></li>
                        <li><a className="underline hover:text-[#D67845]" href="https://www.niddk.nih.gov/health-information/diabetes/overview/what-is-diabetes/prediabetes-insulin-resistance" target="_blank" rel="noreferrer">NIDDK「Insulin Resistance &amp; Prediabetes」</a></li>
                        <li><a className="underline hover:text-[#D67845]" href="https://kennet.mhlw.go.jp/information/information/metabolic/m-01-003.html" target="_blank" rel="noreferrer">厚生労働省「メタボリックシンドロームの診断基準」</a></li>
                    </ul>
                </section>

                <div className="text-center">
                    <Link href="/library#mechanism" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">← 身体の仕組みに戻る</Link>
                </div>
            </article>
        </div>
    );
}
