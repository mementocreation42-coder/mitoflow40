import Link from 'next/link';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: '更年期・更年期移行期とは｜ホルモンの揺らぎと40代の心身 | Mitoflow40',
    description: '更年期は閉経前後の約10年間。エストロゲンの揺らぎによるほてり・睡眠・気分・関節・月経の変化、受診の目安、HRTなどの治療、骨と血管の健康を解説します。',
    alternates: { canonical: 'https://mitoflow40.com/menopause' },
    openGraph: { siteName: 'Mitoflow40', locale: 'ja_JP', type: 'article', title: '更年期・更年期移行期とは | Mitoflow40', description: 'ホルモンの揺らぎを、症状だけでなく骨・筋肉・血管までつなげて理解する。', url: 'https://mitoflow40.com/menopause' },
};

const symptomGroups = [
    { title: '血管運動症状', examples: 'ほてり、のぼせ、発汗、寝汗、動悸' },
    { title: '睡眠・こころ', examples: '寝つきにくい、途中で目覚める、気分の落ち込み、イライラ、不安' },
    { title: 'からだ・認知', examples: '疲労、肩こり、関節痛、頭痛、めまい、集中しにくい' },
    { title: '泌尿生殖器', examples: '腟の乾燥、性交痛、頻尿、尿もれ、繰り返す尿路症状' },
];

const care = [
    { title: '生活と環境の調整', body: '睡眠、運動、食事、飲酒・喫煙、室温や服装を整える。職場や家族へ症状を共有することも支援になる。' },
    { title: 'ホルモン補充療法（HRT）', body: '特にほてり・のぼせ・発汗などに有効。子宮の有無、既往歴、投与経路などを確認し、利益とリスクを個別に検討する。' },
    { title: '非ホルモン治療', body: '症状に応じて漢方薬や一部の抗うつ薬、睡眠への治療、カウンセリングなどを検討する。' },
    { title: '局所の治療', body: '腟の乾燥や性交痛、尿路症状には保湿・潤滑剤や局所治療など選択肢がある。婦人科で相談できる。' },
];

export default function MenopausePage() {
    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#F3E0EC' }}>
            <img loading="lazy" decoding="async" src="/images/for-you/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block" style={{ top: 0, right: '-40px', width: '260px', transform: 'scaleY(-1)' }} />
            <img loading="lazy" decoding="async" src="/images/misc/24.png" alt="" className="absolute pointer-events-none" style={{ bottom: '-40px', left: '-40px', width: '260px' }} />
            <JsonLd data={medicalWebPage({ name: '更年期・更年期移行期とは', description: 'ホルモンの揺らぎを、症状だけでなく骨・筋肉・血管までつなげて理解する。', path: '/menopause' })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: 'ホルモン', path: '/library#hormones' }, { name: '更年期', path: '/menopause' }])} />

            <article className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: 'ホルモン', href: '/library#hormones' }, { name: '更年期' }]} />
                <header className="mb-12 text-center"><p className="text-xs tracking-widest font-bold mb-2 text-[#A65D92]">MENOPAUSAL TRANSITION</p><h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#1A1A1A]">MENOPAUSE<span className="block text-base md:text-lg mt-2 text-[#1A1A1A]/70">更年期・更年期移行期とは</span></h1><p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-relaxed max-w-[620px] mx-auto">更年期は「女性ホルモンがなくなる日」ではありません。揺れながら変化する数年間を経て、体が<strong>新しいホルモン環境へ移行する時間</strong>です。</p></header>

                <div className="mb-10 rounded-2xl p-5 border border-[#A65D92] bg-white/70"><p className="text-sm text-[#1A1A1A]/85 leading-relaxed"><strong className="text-[#A65D92]">はじめに：</strong>更年期は病気ではありませんが、日常生活に支障が出る状態は「更年期障害」として治療できます。症状を我慢する必要も、すべてを年齢のせいにする必要もありません。</p></div>

                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black"><h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#A65D92] pl-3">閉経をはさんだ、前後約10年間</h2><p className="text-[#4A4A4A] leading-loose">日本では、閉経の前後約5年ずつを更年期と呼び、一般には45〜55歳頃が目安です。閉経は、最後の月経から12か月以上月経がないことで振り返って判断します。時期や症状には大きな個人差があります。<br /><br />この移行期には卵巣機能が低下し、エストロゲンの分泌が安定しなくなります。単純に少しずつ減るのではなく、<strong>大きく揺れながら低下する</strong>ことが、多様な症状の一因になります。</p><div className="mt-4 flex flex-wrap gap-2"><Link href="/hormones/estrogen" className="text-xs px-3 py-1 rounded-full bg-white border border-black font-bold hover:bg-[#41C9B4] hover:text-white">エストロゲン</Link><Link href="/circadian-rhythm" className="text-xs px-3 py-1 rounded-full bg-white border border-black font-bold hover:bg-[#41C9B4] hover:text-white">体内時計</Link></div></section>

                <section className="mb-10"><h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#A65D92] pl-3">症状は人によって違う</h2><p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">ホルモンの変化に、体質、仕事、介護、家族関係、睡眠などが重なります。症状が少ない人も、強く出る人もいます。</p><div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{symptomGroups.map((s) => <div key={s.title} className="bg-white/70 rounded-2xl p-5 border border-[#1A1A1A]/20"><div className="font-bold text-[#1A1A1A] mb-1">{s.title}</div><p className="text-sm text-[#4A4A4A] leading-relaxed">{s.examples}</p></div>)}</div><div className="mt-4 flex flex-wrap gap-2"><Link href="/symptoms/hot-flashes" className="text-xs px-3 py-1 rounded-full bg-white border border-black font-bold hover:bg-[#41C9B4] hover:text-white">ほてり・のぼせ</Link><Link href="/sleep" className="text-xs px-3 py-1 rounded-full bg-white border border-black font-bold hover:bg-[#41C9B4] hover:text-white">睡眠</Link><Link href="/mood-nutrition" className="text-xs px-3 py-1 rounded-full bg-white border border-black font-bold hover:bg-[#41C9B4] hover:text-white">気分と栄養</Link></div></section>

                <section className="mb-10 rounded-2xl p-6 md:p-8 border border-[#D67845] bg-[#FFF4E9]"><h2 className="text-xl font-bold text-[#1A1A1A] mb-3">「更年期だろう」で済ませないサイン</h2><p className="text-sm text-[#4A4A4A] leading-loose">大量・長期の出血、閉経後の出血、強い胸痛や息苦しさ、突然の激しい頭痛、希死念慮などは早急に医療へつないでください。また、甲状腺疾患、貧血、うつ、睡眠時無呼吸などが似た症状を起こすことがあります。症状が続く、生活や仕事に支障がある場合は婦人科やかかりつけ医へ相談を。</p></section>

                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black"><h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#A65D92] pl-3">症状の先にある、骨・筋肉・血管</h2><p className="text-[#4A4A4A] leading-loose">エストロゲンの低下に伴い、骨密度、脂質、血圧、体脂肪の分布なども変化します。体重が同じでも筋肉が減り、内臓脂肪が増えやすくなることがあります。更年期は、つらい症状への対応と同時に、<strong>これからの骨・筋肉・心血管の土台を見直す節目</strong>でもあります。</p><div className="mt-4 flex flex-wrap gap-2"><Link href="/sarcopenia" className="text-xs px-3 py-1 rounded-full bg-white border border-black font-bold hover:bg-[#41C9B4] hover:text-white">筋肉</Link><Link href="/dyslipidemia" className="text-xs px-3 py-1 rounded-full bg-white border border-black font-bold hover:bg-[#41C9B4] hover:text-white">脂質</Link><Link href="/hypertension" className="text-xs px-3 py-1 rounded-full bg-white border border-black font-bold hover:bg-[#41C9B4] hover:text-white">血圧</Link></div></section>

                <section className="mb-10"><h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#A65D92] pl-3">治療には選択肢がある</h2><div className="space-y-3 mt-5">{care.map((c) => <div key={c.title} className="bg-white/70 rounded-xl p-5 border border-black"><div className="font-bold text-[#1A1A1A] mb-1">{c.title}</div><p className="text-sm text-[#4A4A4A] leading-relaxed">{c.body}</p></div>)}</div><p className="text-xs text-[#4A4A4A]/65 mt-4">HRTは全員に適するわけではありません。乳がん・血栓症などの既往、子宮の有無、症状、開始時期、本人の希望を確認し、医師と選択します。市販サプリだけで受診を遅らせないでください。</p></section>

                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black"><h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#A65D92] pl-3">相談前にメモしておくこと</h2><ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">{['最後の月経と周期の変化', '困っている症状と頻度', '睡眠・気分・仕事への影響', '服薬・サプリ・既往歴', '家族の乳がん・血栓症歴', '健診・がん検診の結果'].map((x) => <li key={x} className="flex gap-2 bg-white rounded-xl p-3 border border-[#1A1A1A]/15 text-sm"><span className="text-[#A65D92] font-bold">✓</span>{x}</li>)}</ul></section>

                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black"><h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#A65D92] pl-3">あわせて読む</h2><div className="flex flex-wrap gap-2">{[{ href: '/hormones', label: 'ホルモン一覧' }, { href: '/hormones/estrogen', label: 'エストロゲン' }, { href: '/health-check-guide', label: '健康診断' }, { href: '/exercise', label: '運動' }, { href: '/nutrients/vitamin-d', label: 'ビタミンD' }, { href: '/library', label: 'Library 全体' }].map((l) => <Link key={l.href} href={l.href} className="px-4 py-2 rounded-full bg-white border border-black text-sm font-bold hover:bg-[#41C9B4] hover:text-white">{l.label} →</Link>)}</div></section>

                <section className="mb-10 text-xs text-[#4A4A4A]/70 leading-relaxed"><h2 className="font-bold text-[#1A1A1A] mb-2">主な参考情報</h2><ul className="list-disc pl-5 space-y-1"><li><a className="underline hover:text-[#A65D92]" href="https://www.jsog.or.jp/citizen/5717/" target="_blank" rel="noreferrer">日本産科婦人科学会「更年期障害」</a></li><li><a className="underline hover:text-[#A65D92]" href="https://www.bosei-navi.mhlw.go.jp/health/menopause.html" target="_blank" rel="noreferrer">厚生労働省「更年期」</a></li><li><a className="underline hover:text-[#A65D92]" href="https://www.nia.nih.gov/health/menopause/what-menopause" target="_blank" rel="noreferrer">National Institute on Aging「What Is Menopause?」</a></li></ul></section>

                <div className="text-center"><Link href="/library#hormones" className="inline-block px-8 py-3 bg-white border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white">← ホルモンに戻る</Link></div>
            </article>
        </div>
    );
}
