import Link from 'next/link';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: '慢性腎臓病（CKD）とは｜eGFR・クレアチニン・尿たんぱくの見方 | Mitoflow40',
    description: '慢性腎臓病（CKD）は腎機能低下や尿たんぱくなどが3か月以上続く状態。eGFR・クレアチニン・尿検査、高血圧・糖尿病との関係、受診と生活のポイントを解説します。',
    alternates: { canonical: 'https://mitoflow40.com/chronic-kidney-disease' },
    openGraph: { siteName: 'Mitoflow40', locale: 'ja_JP', type: 'article', title: '慢性腎臓病（CKD）とは | Mitoflow40', description: '沈黙しやすい腎臓の変化を、血液と尿の両方から読む。', url: 'https://mitoflow40.com/chronic-kidney-disease' },
};

const tests = [
    { name: 'クレアチニン', body: '筋肉の代謝で生じ、腎臓から排泄される老廃物。腎機能が下がると血液中で高くなる傾向があるが、筋肉量などの影響も受ける。', href: '/biomarkers/creatinine' },
    { name: 'eGFR', body: 'クレアチニン・年齢・性別から推算する、腎臓のろ過能力の目安。単位はmL/分/1.73m²。経年変化が重要。', href: '/biomarkers/egfr' },
    { name: '尿たんぱく・尿アルブミン', body: '本来は血液に残るたんぱく質が尿へ漏れていないかを見る。腎臓の傷みを早く捉える重要な手がかり。', href: '/organs/kidney' },
];

const causes = [
    { title: '高血圧', body: '腎臓の細い血管に高い圧がかかり続ける。腎機能低下がさらに血圧を上げる悪循環にもなる。', href: '/hypertension' },
    { title: '糖尿病', body: '高血糖が糸球体などを傷つける。尿アルブミンとeGFRの両方を追うことが大切。', href: '/diabetes' },
    { title: '糸球体腎炎・遺伝性疾患など', body: '生活習慣とは別の原因も多い。血尿、強い蛋白尿、家族歴などから原因を調べる。', href: '/organs/kidney' },
    { title: '薬剤・脱水・喫煙など', body: '一部の薬、サプリ、脱水などが腎臓へ負担をかけることがある。自己判断で薬を止めず医療者へ共有する。', href: '/water' },
];

export default function ChronicKidneyDiseasePage() {
    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#DDE9E6' }}>
            <img loading="lazy" decoding="async" src="/images/for-you/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block" style={{ top: 0, right: '-40px', width: '260px', transform: 'scaleY(-1)' }} />
            <img loading="lazy" decoding="async" src="/images/misc/24.png" alt="" className="absolute pointer-events-none" style={{ bottom: '-40px', left: '-40px', width: '260px' }} />

            <JsonLd data={medicalWebPage({ name: '慢性腎臓病（CKD）とは', description: '沈黙しやすい腎臓の変化を、eGFRと尿たんぱくの両方から読む。', path: '/chronic-kidney-disease' })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: '老化と不調の土台', path: '/library#aging' }, { name: '慢性腎臓病（CKD）', path: '/chronic-kidney-disease' }])} />

            <article className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '老化と不調の土台', href: '/library#aging' }, { name: '慢性腎臓病（CKD）' }]} />
                <header className="mb-12 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2 text-[#3C8276]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>CHRONIC KIDNEY DISEASE</p>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>CKD<span className="block text-base md:text-lg mt-2 text-[#1A1A1A]/70" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>慢性腎臓病とは</span></h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-relaxed max-w-[600px] mx-auto">腎臓は、悪くなるまで症状を出しにくい臓器です。だから<strong>血液だけでなく、尿からの小さなSOSも見る</strong>ことが早期発見につながります。</p>
                </header>

                <div className="mb-10 rounded-2xl p-5 border border-[#3C8276] bg-white/70"><p className="text-sm text-[#1A1A1A]/85 leading-relaxed"><strong className="text-[#3C8276]">はじめに：</strong>一度のeGFR低下や尿たんぱくだけではCKDと確定しません。一方、再検査を先延ばしにしないことも大切です。異常を指摘された場合は、医療機関で持続性と原因を確認してください。</p></div>

                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#3C8276] pl-3">CKDは、一つの病名ではなく状態の総称</h2>
                    <p className="text-[#4A4A4A] leading-loose">CKD（Chronic Kidney Disease）は、腎臓の障害を示す所見、または腎機能の低下が<strong>3か月を超えて続く状態</strong>です。代表的には、尿たんぱくなどの腎障害、またはeGFR 60未満が持続する場合が該当します。原因には糖尿病、高血圧、腎炎、遺伝性疾患などがあり、治療も原因によって異なります。</p>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#3C8276] pl-3">健診は「血液＋尿」で読む</h2>
                    <div className="space-y-3 mt-5">{tests.map((t) => <Link key={t.name} href={t.href} className="group block bg-white/70 rounded-xl p-5 border border-black hover:shadow-sm"><div className="font-bold text-[#1A1A1A] mb-1 group-hover:text-[#3C8276]">{t.name} →</div><p className="text-sm text-[#4A4A4A] leading-relaxed">{t.body}</p></Link>)}</div>
                    <p className="text-xs text-[#4A4A4A]/65 mt-4">尿たんぱくが多いほど、またeGFRが低いほど、腎不全や心血管疾患のリスクは高まります。両者を組み合わせて重症度を評価します。</p>
                </section>

                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#3C8276] pl-3">腎臓は、ろ過以外にも働いている</h2>
                    <p className="text-[#4A4A4A] leading-loose">腎臓は老廃物と余分な水分を尿にするほか、ナトリウム・カリウム・酸塩基のバランス、血圧、赤血球をつくるホルモン、骨に関わるビタミンDの活性化にも関与します。進行すると、むくみ、貧血、息切れ、かゆみ、食欲低下などが現れることがありますが、<strong>早期は無症状のことが多い</strong>のが特徴です。</p>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#3C8276] pl-3">原因と悪循環を探す</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">{causes.map((c) => <Link key={c.title} href={c.href} className="group bg-white/70 rounded-2xl p-5 border border-[#1A1A1A]/20 hover:border-black"><div className="font-bold text-[#1A1A1A] mb-1 group-hover:text-[#3C8276]">{c.title} →</div><p className="text-sm text-[#4A4A4A] leading-relaxed">{c.body}</p></Link>)}</div>
                </section>

                <section className="mb-10 rounded-2xl p-6 md:p-8 border border-[#D67845] bg-[#FFF4E9]">
                    <h2 className="text-xl font-bold text-[#1A1A1A] mb-3">自己流の「腎臓食」に注意</h2>
                    <p className="text-sm text-[#4A4A4A] leading-loose">塩分管理は多くの人で重要ですが、たんぱく質・カリウム・水分の調整は病期、尿たんぱく、血液検査、薬によって異なります。必要のない制限は低栄養や筋肉減少につながり得ます。サプリや鎮痛薬を含め、使用中のものを医師・薬剤師・管理栄養士へ共有してください。</p>
                </section>

                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#3C8276] pl-3">腎臓を守る基本</h2>
                    <div className="space-y-3">{[
                        ['再検査と定期フォロー', '単発値に一喜一憂せず、eGFRの傾きと尿たんぱくの持続を確認する。'],
                        ['血圧と血糖を整える', '原因と進行の両方に関わるため、目標は病状に応じて主治医と決める。'],
                        ['禁煙・適度な運動・体重管理', '心臓と血管を守る習慣は、腎臓を守ることにもつながる。'],
                        ['脱水と薬の重なりを避ける', '発熱・下痢・猛暑時などは注意。体調不良時の薬の扱いは事前に医療者へ確認する。'],
                    ].map(([h, b], i) => <div key={h} className="flex gap-3 bg-white/70 rounded-xl p-4 border border-[#1A1A1A]/15"><span className="w-7 h-7 shrink-0 rounded-full bg-[#3C8276] text-white flex items-center justify-center text-xs font-bold">{i + 1}</span><div><div className="font-bold text-[#1A1A1A] mb-1">{h}</div><p className="text-sm text-[#4A4A4A] leading-relaxed">{b}</p></div></div>)}</div>
                </section>

                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black"><h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#3C8276] pl-3">あわせて読む</h2><div className="flex flex-wrap gap-2">{[{ href: '/organs/kidney', label: '腎臓' }, { href: '/hypertension', label: '高血圧' }, { href: '/diabetes', label: '糖尿病' }, { href: '/metabolic-syndrome', label: 'メタボリックシンドローム' }, { href: '/biomarkers', label: '血液検査' }, { href: '/water', label: '水分' }].map((l) => <Link key={l.href} href={l.href} className="px-4 py-2 rounded-full bg-white border border-black text-sm font-bold hover:bg-[#41C9B4] hover:text-white">{l.label} →</Link>)}</div></section>

                <section className="mb-10 text-xs text-[#4A4A4A]/70 leading-relaxed"><h2 className="font-bold text-[#1A1A1A] mb-2">主な参考情報</h2><ul className="list-disc pl-5 space-y-1"><li><a className="underline hover:text-[#3C8276]" href="https://jsn.or.jp/general/kidneydisease/symptoms04.php" target="_blank" rel="noreferrer">日本腎臓学会「急性腎障害と慢性腎臓病」</a></li><li><a className="underline hover:text-[#3C8276]" href="https://jsn.or.jp/medic/guideline/pdf/guide/001-294.pdf" target="_blank" rel="noreferrer">日本腎臓学会「CKD診療ガイドライン2023」</a></li><li><a className="underline hover:text-[#3C8276]" href="https://www.mhlw.go.jp/stf/houdou_kouhou/kouhou_shuppan/magazine/202503_004.html" target="_blank" rel="noreferrer">厚生労働省「慢性腎臓病（CKD）ってなぁに？」</a></li></ul></section>

                <div className="text-center"><Link href="/library#aging" className="inline-block px-8 py-3 bg-white border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white">← 老化と不調の土台に戻る</Link></div>
            </article>
        </div>
    );
}
