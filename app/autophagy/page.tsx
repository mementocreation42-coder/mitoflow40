import Link from 'next/link';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: 'オートファジー | Mitoflow40',
    description: '細胞が自分の中の老廃物を分解・再利用する「オートファジー」を、仕組み・スイッチが入る条件・ミトコンドリアとの関係（ミトファジー）・整える習慣からわかりやすく解説。',
    alternates: { canonical: 'https://mitoflow40.com/autophagy' },
    openGraph: {
        title: 'オートファジー | Mitoflow40',
        description: '細胞の自己掃除・再生システム「オートファジー」を、仕組み・スイッチ・ミトコンドリアとの関係から解説。',
        url: 'https://mitoflow40.com/autophagy',
        type: 'article',
    },
};

const switches = [
    { title: '空腹・断食', en: 'FASTING', note: '最も強力なスイッチ。糖が枯れると細胞は自己リサイクルを始める', href: '/ketones' },
    { title: '運動', en: 'EXERCISE', note: '適度な負荷が細胞のストレス応答を刺激し、掃除を促す' },
    { title: '睡眠', en: 'SLEEP', note: '特に脳では、睡眠中に老廃物の除去が進む' },
    { title: '特定の栄養', en: 'NUTRIENTS', note: 'スペルミジン（納豆・きのこ・チーズ）やポリフェノールが後押し' },
];

export default function AutophagyPage() {
    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#E7EEDA' }}>
            <img loading="lazy" decoding="async" src="/images/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block"
                style={{ top: '0', right: '-40px', width: '260px', transform: 'scaleY(-1)' }} />
            <img loading="lazy" decoding="async" src="/images/24.png" alt="" className="absolute pointer-events-none"
                style={{ bottom: '-40px', left: '-40px', width: '260px' }} />

            <JsonLd data={medicalWebPage({ name: 'オートファジーとは', description: '細胞の自己リサイクル「オートファジー」を、仕組み・スイッチ・ミトコンドリアとの関係から解説。', path: '/autophagy' })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: '身体の仕組み', path: '/library#mechanism' }, { name: 'オートファジー', path: '/autophagy' }])} />
            <article className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '身体の仕組み', href: '/library#mechanism' }, { name: 'オートファジー' }]} />
                <header className="mb-12 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>
                        CELLULAR RECYCLING
                    </p>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        AUTOPHAGY
                        <span className="block text-base md:text-lg mt-2 text-[#1A1A1A]/70" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>オートファジーとは</span>
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-relaxed max-w-[560px] mx-auto">
                        細胞が自分の中の"古くなった部品"を分解し、作り直す「自己リサイクル」の仕組みです。
                    </p>
                </header>

                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">オートファジーとは</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        オートファジー（自食作用）は、細胞が自分の中の不要になったタンパク質や、傷ついた細胞内の部品を分解し、材料として再利用する仕組みです。2016年に大隅良典博士がこの研究でノーベル賞を受賞し、一気に注目されました。
                        {'\n\n'}
                        いわば細胞内の「掃除とリサイクル」。古い部品を片付けることで細胞は新しく保たれ、品質が維持されます。この働きは加齢とともに低下しやすく、衰えると老廃物が溜まり、老化や神経変性、慢性炎症との関連が指摘されています。
                        {'\n\n'}
                        逆に、オートファジーを適度に働かせることは、細胞の若々しさを保ち、エネルギーを生み出すミトコンドリアの質を維持することにつながります。
                    </p>
                </section>

                {/* ミトファジー */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">ミトコンドリアとの関係：ミトファジー</h2>
                    <p className="text-[#4A4A4A] leading-loose">
                        オートファジーの中でも、傷ついたミトコンドリアを狙って片付ける働きを<strong>「ミトファジー」</strong>と呼びます。
                        ミトコンドリアはエネルギーを作る一方で、使い込まれると活性酸素を漏らし、細胞を傷つける"お荷物"になります。
                        ミトファジーはそうした不良ミトコンドリアを除去し、新しく質の良いものに入れ替えます。
                        40代以降にエネルギーが落ちる一因はミトコンドリアの質の低下。ミトファジーを促すことは、活力を保つうえで本質的なアプローチです。
                    </p>
                </section>

                {/* もう一つの掃除システム：ユビキチン・プロテアソーム */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">もう一つの掃除システム：ユビキチン・プロテアソーム</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        細胞のゴミ処理には、実は2つの経路があります。オートファジーが「大きなゴミ」——傷んだ小器官やタンパク質の塊をまとめて分解するのに対し、もう一方の<strong>ユビキチン・プロテアソーム系（UPS）</strong>は、<strong>不要・損傷した個々のタンパク質をピンポイントで処理</strong>します。
                        {'\n\n'}
                        仕組みはこうです。役目を終えたタンパク質に「<strong>ユビキチン</strong>」という小さな目印が付けられ、それが「これは分解してOK」というゴミ出しのタグになります。タグの付いたタンパク質は、<strong>プロテアソーム</strong>という筒状の"シュレッダー"に送られ、細かく分解されてアミノ酸として再利用されます。
                        {'\n\n'}
                        この品質管理（プロテオスタシス）が衰えると、異常なタンパク質が溜まり、神経変性や老化と関わると考えられています。オートファジーとUPS——2つの掃除システムが協力して、細胞を新しく保っています。これを支えるのは、結局のところ<strong>十分なタンパク質・抗酸化・運動・睡眠</strong>といった土台です。
                    </p>
                </section>

                {/* スイッチ */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#41C9B4] pl-3 leading-tight">スイッチが入る条件</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">
                        オートファジーは、細胞が「軽い飢餓・ストレス」を感じたときに活性化します。
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {switches.map((s, i) => (
                            <div key={s.en} className="bg-white/70 rounded-xl p-5 border border-black">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="w-7 h-7 rounded-full bg-[#41C9B4] text-white text-xs font-bold flex items-center justify-center" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{i + 1}</span>
                                    <span className="font-bold text-[#1A1A1A]">
                                        {s.href ? (
                                            <Link href={s.href} className="underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">{s.title}</Link>
                                        ) : s.title}
                                    </span>
                                    <span className="text-[10px] text-[#1A1A1A]/40 font-mono ml-auto">{s.en}</span>
                                </div>
                                <p className="text-xs text-[#4A4A4A] leading-snug">{s.note}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 注意 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">バランスが大切</h2>
                    <ul className="space-y-2 text-[#4A4A4A]">
                        <li className="flex gap-3"><span className="text-[#41C9B4] flex-shrink-0">●</span><span>「掃除（オートファジー）」と「合成（タンパク質を作る）」は両方必要。断食一辺倒ではなく、しっかり食べる時間とのメリハリが大切です。</span></li>
                        <li className="flex gap-3"><span className="text-[#41C9B4] flex-shrink-0">●</span><span>極端な断食は筋肉の分解を招くことも。とくに40代以降はタンパク質の確保とセットで考えます。</span></li>
                        <li className="flex gap-3"><span className="text-[#41C9B4] flex-shrink-0">●</span><span>持病のある方や服薬中の方は、断食を始める前に医療専門家にご相談ください。</span></li>
                    </ul>
                </section>

                <p className="text-xs text-[#4A4A4A]/60 leading-relaxed mb-12 p-4 bg-white/60 rounded-lg">
                    ※ 本ページは一般的な解説であり、診断・治療や特定の食事法を推奨するものではありません。
                </p>

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
