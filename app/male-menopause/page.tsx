import Link from 'next/link';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: '男性更年期（LOH症候群）とは｜テストステロンと40代の不調 | Mitoflow40',
    description: '男性更年期と呼ばれるLOH症候群について、テストステロンの変化、心・体・性機能の症状、検査、受診先、治療と生活改善を解説します。',
    alternates: { canonical: 'https://mitoflow40.com/male-menopause' },
    openGraph: { siteName: 'Mitoflow40', locale: 'ja_JP', type: 'article', title: '男性更年期（LOH症候群）とは | Mitoflow40', description: '疲れ、意欲低下、眠り、筋力、性機能の変化を「年齢のせい」で終わらせない。', url: 'https://mitoflow40.com/male-menopause' },
};

const symptomGroups = [
    { title: 'こころ・認知', examples: '意欲低下、気分の落ち込み、イライラ、不安、集中しにくい' },
    { title: 'からだ', examples: '疲れやすい、ほてり・発汗、筋力低下、関節や筋肉の痛み' },
    { title: '睡眠・活力', examples: '眠りが浅い、朝から疲れる、活動量が減る、仕事がつらい' },
    { title: '性機能', examples: '性欲低下、朝立ちの減少、勃起機能の低下' },
];

const steps = [
    { n: '1', title: '症状と生活を確認', body: 'いつから何が困るのか、睡眠、ストレス、飲酒、薬、性機能の変化まで整理します。質問票は入口であり、診断そのものではありません。' },
    { n: '2', title: '似た病気を除外', body: 'うつ病、甲状腺疾患、貧血、糖尿病、睡眠時無呼吸、薬の影響などでも似た症状が出ます。必要な診察・検査を選びます。' },
    { n: '3', title: '採血を総合して判断', body: 'テストステロンには日内変動があり、一般に午前の採血が検討されます。症状と検査値の両方を見て、必要なら再検します。' },
];

export default function MaleMenopausePage() {
    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#E2EAF2' }}>
            <img loading="lazy" decoding="async" src="/images/for-you/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block" style={{ top: 0, right: '-40px', width: '260px', transform: 'scaleY(-1)' }} />
            <img loading="lazy" decoding="async" src="/images/misc/24.png" alt="" className="absolute pointer-events-none" style={{ bottom: '-40px', left: '-40px', width: '260px' }} />
            <JsonLd data={medicalWebPage({ name: '男性更年期（LOH症候群）とは', description: 'テストステロンの変化と40代以降の心身を、症状・検査・治療から理解する。', path: '/male-menopause' })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: 'ホルモン', path: '/library#hormones' }, { name: '男性更年期', path: '/male-menopause' }])} />
            <article className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: 'ホルモン', href: '/library#hormones' }, { name: '男性更年期' }]} />
                <header className="mb-12 text-center"><p className="text-xs tracking-widest font-bold mb-2 text-[#557A9D]">LATE-ONSET HYPOGONADISM</p><h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#1A1A1A]">MALE MENOPAUSE<span className="block text-base md:text-lg mt-2 text-[#1A1A1A]/70">男性更年期（LOH症候群）とは</span></h1><p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-relaxed max-w-[640px] mx-auto">「以前のように動けない」は、気合いの問題とは限りません。症状とホルモン値を手がかりに、<strong>治療できる原因がないかを確かめる</strong>ことから始まります。</p></header>
                <div className="mb-10 rounded-2xl p-5 border border-[#557A9D] bg-white/70"><p className="text-sm text-[#1A1A1A]/85 leading-relaxed"><strong className="text-[#557A9D]">大切な違い：</strong>女性の閉経のように、全員に明確な転換点があるわけではありません。男性のテストステロンは一般にゆるやかに変化し、症状の背景にはストレスや病気、薬、生活習慣も重なります。</p></div>
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black"><h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#557A9D] pl-3">LOH症候群とは</h2><p className="text-[#4A4A4A] leading-loose">LOH（Late-Onset Hypogonadism）は、加齢に伴う男性ホルモンの低下に、特徴的な症状を伴う状態です。ただし「男性更年期」という広い呼び方の不調が、すべてテストステロン低下で説明できるわけではありません。<br /><br />年齢だけ、症状だけ、あるいは採血1回の数字だけで決めず、<strong>症状・検査値・ほかの原因を総合して判断</strong>します。</p><div className="mt-4 flex flex-wrap gap-2"><Link href="/hormones/testosterone" className="text-xs px-3 py-1 rounded-full bg-white border border-black font-bold hover:bg-[#41C9B4] hover:text-white">テストステロン</Link><Link href="/stress" className="text-xs px-3 py-1 rounded-full bg-white border border-black font-bold hover:bg-[#41C9B4] hover:text-white">ストレス</Link></div></section>
                <section className="mb-10"><h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#557A9D] pl-3">現れ方は一つではない</h2><p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">性機能だけでなく、心・睡眠・筋肉にも症状が現れます。ゆっくり変わるため、本人も周囲も気づきにくいことがあります。</p><div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{symptomGroups.map((s) => <div key={s.title} className="bg-white/70 rounded-2xl p-5 border border-[#1A1A1A]/20"><div className="font-bold text-[#1A1A1A] mb-1">{s.title}</div><p className="text-sm text-[#4A4A4A] leading-relaxed">{s.examples}</p></div>)}</div></section>
                <section className="mb-10 rounded-2xl p-6 md:p-8 border border-[#D67845] bg-[#FFF4E9]"><h2 className="text-xl font-bold text-[#1A1A1A] mb-3">急いで医療につなぐサイン</h2><p className="text-sm text-[#4A4A4A] leading-loose">胸の痛みや強い息苦しさ、突然の激しい頭痛・麻痺、希死念慮がある場合は早急に医療へ。強い気分の落ち込み、急な体重変化、激しいいびきと日中の眠気、症状が仕事や家庭生活に影響している場合も「更年期だろう」と自己判断せず、かかりつけ医や泌尿器科へ相談してください。</p></section>
                <section className="mb-10"><h2 className="text-2xl font-bold text-[#1A1A1A] mb-5 border-l-4 border-[#557A9D] pl-3">診断は、数字だけで決めない</h2><div className="space-y-3">{steps.map((s) => <div key={s.n} className="flex gap-4 bg-white/70 rounded-xl p-5 border border-black"><span className="w-8 h-8 shrink-0 rounded-full bg-[#557A9D] text-white font-bold flex items-center justify-center">{s.n}</span><div><div className="font-bold text-[#1A1A1A] mb-1">{s.title}</div><p className="text-sm text-[#4A4A4A] leading-relaxed">{s.body}</p></div></div>)}</div></section>
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black"><h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#557A9D] pl-3">治療は原因と希望に合わせる</h2><p className="text-[#4A4A4A] leading-loose">睡眠、運動、体重、飲酒、ストレス、基礎疾患や薬を見直し、背景にある病気を治療します。症状と検査から適応がある場合は、医師の管理下でテストステロン補充療法が検討されます。<br /><br />補充療法は万能な若返り治療ではありません。前立腺や血液などを治療前に評価し、治療中も効果と副作用を確認します。妊娠を希望する場合は精子形成に影響し得るため、必ず事前に伝えてください。自己入手したホルモン製剤は使わないでください。</p></section>
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black"><h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#557A9D] pl-3">相談前のメモ</h2><ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">{['症状が始まった時期と変化', '睡眠・いびき・日中の眠気', '気分と仕事への影響', '性欲・朝立ち・勃起の変化', '服薬・サプリ・既往歴', '今後の妊娠希望'].map((x) => <li key={x} className="flex gap-2 bg-white rounded-xl p-3 border border-[#1A1A1A]/15 text-sm"><span className="text-[#557A9D] font-bold">✓</span>{x}</li>)}</ul></section>
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black"><h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#557A9D] pl-3">あわせて読む</h2><div className="flex flex-wrap gap-2">{[{ href: '/hormones', label: 'ホルモン一覧' }, { href: '/hormones/testosterone', label: 'テストステロン' }, { href: '/sleep', label: '睡眠' }, { href: '/exercise', label: '運動' }, { href: '/mental-health', label: '心の現代病' }, { href: '/health-check-guide', label: '健康診断' }].map((l) => <Link key={l.href} href={l.href} className="px-4 py-2 rounded-full bg-white border border-black text-sm font-bold hover:bg-[#41C9B4] hover:text-white">{l.label} →</Link>)}</div></section>
                <section className="mb-10 text-xs text-[#4A4A4A]/70 leading-relaxed"><h2 className="font-bold text-[#1A1A1A] mb-2">主な参考情報</h2><ul className="list-disc pl-5 space-y-1"><li><a className="underline hover:text-[#557A9D]" href="https://www.urol.or.jp/lib/files/other/guideline/30_loh_syndrome.pdf" target="_blank" rel="noreferrer">日本泌尿器科学会・日本Men&apos;s Health医学会「LOH症候群診療の手引き」</a></li><li><a className="underline hover:text-[#557A9D]" href="https://www.mhlw.go.jp/content/000969166.pdf" target="_blank" rel="noreferrer">厚生労働省「更年期症状・障害に関する意識調査」</a></li></ul></section>
                <div className="text-center"><Link href="/library#hormones" className="inline-block px-8 py-3 bg-white border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white">← ホルモンに戻る</Link></div>
            </article>
        </div>
    );
}
