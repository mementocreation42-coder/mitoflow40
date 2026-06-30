import Link from 'next/link';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: '神経炎症とは ｜ IL-6・サイトカインが脳と心に及ぶとき | Mitoflow40',
    description: '原因のはっきりしないだるさ・意欲の低下・ブレインフォグ——その裏に「炎症」があるかもしれません。IL-6やTNF-αといった炎症性サイトカインが脳に信号を送り、ミクログリアを介して起こる「神経炎症（ニューロインフレメーション）」。病気のときのだるさ（sickness behavior）から、慢性炎症とうつ・気分の関係、炎症の源（内臓脂肪・腸・睡眠・ストレス）、hs-CRPでの可視化までを、出典つきで中立に解説します。',
    alternates: { canonical: 'https://mitoflow40.com/neuroinflammation' },
    openGraph: {
        title: '神経炎症とは ｜ Mitoflow40',
        description: 'IL-6などの炎症性サイトカインが脳と心に及ぶ「神経炎症」。だるさ・うつ・ブレインフォグとの関係を中立に。',
        url: 'https://mitoflow40.com/neuroinflammation',
        type: 'article',
    },
};

export default function NeuroinflammationPage() {
    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#E9E3EF' }}>
            <img loading="lazy" decoding="async" src="/images/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block"
                style={{ top: '0', right: '-40px', width: '260px', transform: 'scaleY(-1)' }} />
            <img loading="lazy" decoding="async" src="/images/24.png" alt="" className="absolute pointer-events-none"
                style={{ bottom: '-40px', left: '-40px', width: '260px' }} />

            <JsonLd data={medicalWebPage({ name: '神経炎症とは', description: 'IL-6などの炎症性サイトカインが脳と心に及ぶ「神経炎症」を、だるさ・うつ・ブレインフォグとの関係から中立に整理する。', path: '/neuroinflammation' })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: '心とからだ', path: '/library#mind' }, { name: '神経炎症とは', path: '/neuroinflammation' }])} />

            <article className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '心とからだ', href: '/library#mind' }, { name: '神経炎症とは' }]} />
                <header className="mb-10 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>MIND &amp; BODY</p>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        NEUROINFLAMMATION
                        <span className="block text-base md:text-lg mt-2 text-[#1A1A1A]/70" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>神経炎症と心</span>
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-relaxed max-w-[600px] mx-auto">
                        原因のはっきりしない<strong>だるさ・意欲の低下・ブレインフォグ</strong>。その裏に、<strong>体の「炎症」</strong>が隠れていることがあります。炎症は、じつは<strong>脳と心にも届く</strong>のです。
                    </p>
                </header>

                {/* 最重要：こころの不調は治療を（先頭） */}
                <section className="mb-10 rounded-2xl p-6 md:p-7 border-2" style={{ background: '#FBE3DC', borderColor: '#C0392B' }}>
                    <h2 className="text-lg md:text-xl font-bold mb-3" style={{ color: '#C0392B' }}>⚠ 大切な前提：こころの不調は「炎症ケア」より先に</h2>
                    <p className="text-sm text-[#1A1A1A] mb-3 leading-relaxed">このページは「炎症と心の関係」を説明するものです。でも、<strong>うつや強い気分の落ち込みは、サプリや食事の炎症ケアで自己対処すべきものではありません</strong>。次のようなときは、ためらわず専門家・医療機関（精神科・心療内科）へ。</p>
                    <ul className="space-y-2 text-sm text-[#1A1A1A] leading-relaxed">
                        {[
                            '気分の落ち込み・意欲のなさが2週間以上続く',
                            '眠れない／眠りすぎる、食欲が大きく変わる、何も楽しめない',
                            '「消えてしまいたい」「自分を傷つけたい」という気持ちがある',
                        ].map((t) => (
                            <li key={t} className="flex gap-2"><span style={{ color: '#C0392B' }} className="font-bold flex-shrink-0">●</span><span>{t}</span></li>
                        ))}
                    </ul>
                    <p className="text-sm text-[#1A1A1A] mt-3 leading-relaxed">
                        つらい気持ちが強いときは、<strong>「いのちの電話」やお住まいの地域の相談窓口</strong>もあります。ひとりで抱えないでください<sup className="text-[#FF9855] font-bold">[4]</sup>。
                    </p>
                </section>

                {/* 炎症は本来「守り」 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">炎症は本来、体を「守る」しくみ</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        ケガや感染のとき、患部が<strong>赤く腫れて熱をもつ</strong>——これが炎症です。免疫が敵と戦い、傷を修復するための、<strong>本来は大切な「守りの反応」</strong>。短期間で役目を終えて引いていくぶんには、むしろ必要なものです。
                        {'\n\n'}
                        問題になるのは、はっきりした原因がないのに<strong>弱い炎症がだらだらと続く「慢性炎症」</strong>です。自覚症状が乏しいまま体の中でくすぶり、老化や生活習慣病の土台になることが知られています。そして近年わかってきたのが、その炎症が<strong>「脳と心」にも影響する</strong>ということです。
                    </p>
                    <div className="mt-4">
                        <Link href="/inflammation" className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">→ 慢性炎症（くすぶる）をもっと知る</Link>
                    </div>
                </section>

                {/* サイトカインという連絡係 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">「サイトカイン」という、炎症の連絡係</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        炎症のとき、免疫細胞は<strong>サイトカイン</strong>という小さなタンパク質を出して、「いま炎症が起きている」という情報を全身に伝えます。いわば<strong>体内の連絡係</strong>です。代表的なのが、次の<strong>炎症性サイトカイン</strong>です。
                    </p>
                    <div className="mt-5 space-y-3">
                        {[
                            { head: 'IL-6（インターロイキン6）', body: '炎症の代表選手のひとつ。慢性炎症やストレスで増え、気分・意欲との関連が研究されている。' },
                            { head: 'TNF-α（腫瘍壊死因子）', body: '強い炎症シグナルを担うサイトカイン。過剰だと全身のだるさや代謝の乱れにつながる。' },
                            { head: 'IL-1β（インターロイキン1β）', body: '発熱やだるさ（病気のときの感覚）を引き起こす、強力な炎症の引き金。' },
                        ].map((s) => (
                            <div key={s.head} className="bg-white/60 rounded-xl p-4 border border-[#1A1A1A]/15">
                                <div className="font-bold text-[#1A1A1A] mb-0.5">{s.head}</div>
                                <p className="text-sm text-[#4A4A4A] leading-snug">{s.body}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-[#4A4A4A] leading-loose mt-5">
                        これらサイトカインが働いた「足あと」として、肝臓は<strong>CRP（C反応性タンパク）</strong>を作ります。だから血液検査の<strong>高感度CRP（hs-CRP）</strong>を見ると、自覚のない<strong>くすぶる炎症の温度</strong>をある程度はかることができます<sup className="text-[#FF9855] font-bold">[3]</sup>。
                    </p>
                    <div className="mt-4">
                        <Link href="/biomarkers/hscrp" className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">→ 高感度CRP（hs-CRP）を見る</Link>
                    </div>
                </section>

                {/* 炎症が脳に伝わる道 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">炎症は、どうやって「脳」に届くのか</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        脳は<strong>血液脳関門</strong>という関所で守られていますが、それでも体の炎症はいくつかの道で脳に伝わります。サイトカインが直接・間接に脳へ信号を送り、<strong>迷走神経</strong>という「腸や内臓と脳をつなぐ神経」も炎症の知らせを脳へ運びます。
                    </p>
                    <p className="text-[#4A4A4A] leading-loose mt-4">
                        その知らせを受けて活性化するのが、脳の中の免疫細胞<strong>ミクログリア</strong>です。ミクログリアは普段、脳の見回りや手入れをしていますが、炎症の信号が続くと<strong>脳の中でも炎症的な状態</strong>になります。これが<strong>神経炎症（ニューロインフレメーション）</strong>です。短期なら適応的ですが、慢性化すると神経の働きや気分に影響しうる、と考えられています。
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {[{ href: '/gut-brain', label: '脳腸相関' }, { href: '/autonomic-nervous-system', label: '自律神経（迷走神経）' }].map((l) => (
                            <Link key={l.href} href={l.href} className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">{l.label}</Link>
                        ))}
                    </div>
                </section>

                {/* sickness behavior */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">「風邪のときのあのだるさ」が、ヒント</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        熱が出たとき、<strong>横になりたい・何もやる気が出ない・食欲がない・人と関わりたくない</strong>——そんな経験はだれにでもあります。これは気のせいではなく、サイトカインが脳に働きかけて起こす<strong>「病気のときの行動（sickness behavior）」</strong>という、れっきとした反応です<sup className="text-[#FF9855] font-bold">[1]</sup>。
                        {'\n\n'}
                        本来は、<strong>体を休めて治癒に専念させるための、賢い省エネモード</strong>です。問題は、慢性炎症によって<strong>この「だるさ・意欲低下」モードが、弱いまま長く続いてしまう</strong>場合。気分の落ち込みや「やる気が出ない」状態と、見分けがつきにくくなります。
                    </p>
                </section>

                {/* 慢性炎症とうつ・ブレインフォグ */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">炎症と、気分・ブレインフォグの関係</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        研究では、<strong>うつの人の一部で、IL-6やCRPといった炎症の指標が高い</strong>傾向が報告されています。また、炎症性サイトカインを薬として投与すると、一部の人にうつ症状が現れることも知られています。ここから、「<strong>炎症が、ある種のうつや気分の落ち込みに関わっているのではないか</strong>」という考え方（炎症仮説）が注目されています<sup className="text-[#FF9855] font-bold">[2]</sup>。
                        {'\n\n'}
                        背景のひとつとして、炎症が起きると、心の安定に関わる<strong>セロトニンの材料（トリプトファン）が別の経路に回されやすくなる</strong>ことなどが研究されています。集中力が落ちる「ブレインフォグ」や、原因不明の疲労感の一因としても、神経炎症が議論されています。
                        {'\n\n'}
                        ただし大切なのは、<strong>「うつ＝すべて炎症が原因」ではない</strong>ということです。これは関係のひとつであって、炎症を抑えればうつが治る、という単純な話ではありません。あくまで<strong>「体と心はつながっている」</strong>という視点として受け取ってください。
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {[{ href: '/mental-health', label: 'メンタルヘルス' }, { href: '/mood-nutrition', label: '気分と栄養' }, { href: '/anxiety', label: '不安と体' }].map((l) => (
                            <Link key={l.href} href={l.href} className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">{l.label}</Link>
                        ))}
                    </div>
                </section>

                {/* 炎症はどこから来るのか */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#41C9B4] pl-3 leading-tight">その炎症は、どこから来る？</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">慢性炎症の火種は、特別な病気でなく<strong>日々の暮らしの中</strong>にあることが多いものです。だからこそ、ここは整えられる余地があります。</p>
                    <div className="space-y-3">
                        {[
                            { head: '内臓脂肪', body: '脂肪組織、とくに内臓脂肪は、それ自体が炎症性サイトカインを出す。お腹まわりは「静かな炎症の発生源」になりうる。', href: '/blood-sugar' },
                            { head: '腸の状態', body: '腸内環境の乱れや腸のバリア低下で、細菌由来の刺激物（LPSなど）が体内に漏れ、低レベルの炎症を生むと考えられている。', href: '/gut-health' },
                            { head: '睡眠不足', body: '睡眠が足りないと炎症マーカーが上がりやすい。回復と炎症の鎮静は、眠っている間に進む。', href: '/sleep' },
                            { head: '慢性ストレス', body: '長引くストレスは自律神経やホルモンを介して炎症を高める方向に働く。', href: '/stress' },
                            { head: '食事と運動', body: '超加工食品・糖と脂の偏りは炎症に傾け、適度な運動とオメガ3・野菜・ポリフェノールは鎮める方向に働く。', href: '/exercise' },
                        ].map((s) => (
                            <Link key={s.head} href={s.href} className="group flex items-start gap-4 bg-white/70 rounded-xl p-4 border border-[#1A1A1A]/15 hover:border-black hover:shadow-sm transition-all">
                                <div>
                                    <div className="font-bold text-[#1A1A1A] mb-0.5 group-hover:text-[#FF9855] transition-colors">{s.head}</div>
                                    <p className="text-sm text-[#4A4A4A] leading-snug">{s.body}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* 測る・整える */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">測って、土台から整える</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        うれしいことに、慢性炎症は<strong>生活習慣に素直に反応</strong>します。まずは<strong>hs-CRP</strong>などで現在地を知り、<strong>睡眠・運動・食事・腸・ストレス</strong>という土台を整えていく——それが、体だけでなく<strong>脳と心の余裕</strong>を取り戻す近道になりえます。
                    </p>
                    <div className="mt-5 space-y-3">
                        {[
                            { href: '/nutrients/omega3', label: 'オメガ3脂肪酸', note: '炎症を鎮める方向に働く必須脂肪酸。脳の細胞膜の材料でもある。青魚に多い。' },
                        ].map((n) => (
                            <Link key={n.href} href={n.href} className="group flex items-start gap-4 bg-white/60 rounded-xl p-4 border border-[#1A1A1A]/15 hover:border-black hover:shadow-sm transition-all">
                                <div>
                                    <div className="font-bold text-[#1A1A1A] mb-0.5 group-hover:text-[#FF9855] transition-colors">{n.label}</div>
                                    <p className="text-sm text-[#4A4A4A] leading-snug">{n.note}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {[{ href: '/sleep', label: '睡眠' }, { href: '/exercise', label: '運動' }, { href: '/microbiome', label: '腸内フローラ' }, { href: '/mitochondria', label: 'ミトコンドリア' }].map((l) => (
                            <Link key={l.href} href={l.href} className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">{l.label}</Link>
                        ))}
                    </div>
                </section>

                {/* 免責 */}
                <p className="text-xs text-[#4A4A4A]/70 leading-relaxed mb-10 p-4 bg-white/60 rounded-lg border" style={{ borderColor: '#C0392B33', background: '#FBE3DC55' }}>
                    ※ 本記事は一般的・教育的な情報であり、診断・治療に代わるものではありません。炎症とうつ・脳の関係は研究の途上にあり、「炎症を抑えれば心の不調が治る」という意味ではありません。気分の落ち込みやつらさが続くときは、自己判断のサプリや除去ではなく、必ず医療機関・専門の相談窓口にご相談ください。
                </p>

                {/* 参照 */}
                <section className="mb-10">
                    <h2 className="text-lg font-bold text-[#1A1A1A] mb-3 border-l-4 border-[#41C9B4] pl-3 leading-tight">参照</h2>
                    <ol className="bg-white/70 rounded-2xl p-5 md:p-6 border border-black space-y-2 text-sm list-none">
                        <li>
                            <span className="text-[#FF9855] font-bold mr-1">[1]</span>
                            <a href="https://www.nature.com/articles/nrn2297" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                From inflammation to sickness and depression（炎症・病気行動・うつのつながり）
                            </a>
                            <span className="text-[#1A1A1A]/50"> — Dantzer et al., Nature Reviews Neuroscience（2008）</span>
                        </li>
                        <li>
                            <span className="text-[#FF9855] font-bold mr-1">[2]</span>
                            <a href="https://www.nature.com/articles/nri.2015.5" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                The role of inflammation in depression（うつにおける炎症の役割）
                            </a>
                            <span className="text-[#1A1A1A]/50"> — Miller &amp; Raison, Nature Reviews Immunology（2016）</span>
                        </li>
                        <li>
                            <span className="text-[#FF9855] font-bold mr-1">[3]</span>
                            <a href="https://medlineplus.gov/lab-tests/c-reactive-protein-crp-test/" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                C-Reactive Protein (CRP) Test（CRP検査と炎症の見方）
                            </a>
                            <span className="text-[#1A1A1A]/50"> — MedlinePlus（米国国立医学図書館）</span>
                        </li>
                        <li>
                            <span className="text-[#FF9855] font-bold mr-1">[4]</span>
                            <a href="https://www.msdmanuals.com/home/mental-health-disorders/mood-disorders/depression" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                Depression（うつ病の基礎と受診の目安）
                            </a>
                            <span className="text-[#1A1A1A]/50"> — MSD Manual 家庭版</span>
                        </li>
                    </ol>
                </section>

                <div className="text-center">
                    <Link href="/library" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">← Library に戻る</Link>
                </div>
            </article>
        </div>
    );
}
