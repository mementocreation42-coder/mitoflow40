import Link from 'next/link';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: '酵素とは｜体を動かす「触媒」の正体と、酵素ドリンクの誤解 | Mitoflow40',
    description: '酵素とは、体内の化学反応を進める「触媒」。消化酵素と代謝酵素の働き、補酵素としてのビタミン・ミネラルの役割、そして「酵素ドリンク」「生酵素サプリ」をめぐる誤解を、生化学に基づいて出典つきでやさしく整理します。',
    alternates: { canonical: 'https://mitoflow40.com/enzymes' },
    openGraph: {
        title: '酵素とは｜体を動かす「触媒」の正体と、酵素ドリンクの誤解 | Mitoflow40',
        description: '酵素＝体内反応の触媒。消化酵素・代謝酵素・補酵素の働きと、酵素ドリンクの誤解を生化学ベースで整理。',
        url: 'https://mitoflow40.com/enzymes',
        type: 'article',
    },
};

// 酵素の主なタイプ
const types = [
    {
        name: '消化酵素',
        en: 'DIGESTIVE',
        body: '食べたものを、吸収できる小さな単位に分解する酵素。アミラーゼ（糖質）、プロテアーゼ（たんぱく質）、リパーゼ（脂質）など。唾液・胃・すい臓・腸で分泌されます。',
    },
    {
        name: '代謝酵素',
        en: 'METABOLIC',
        body: 'エネルギー産生・解毒・修復・合成など、体内のあらゆる反応を担う酵素。数千種類あり、ミトコンドリアでのエネルギー生産も、たくさんの酵素のリレーで成り立っています。',
    },
    {
        name: '補酵素（コエンザイム）',
        en: 'COENZYME',
        body: '酵素が働くのを助ける「相棒」。多くのビタミンB群やミネラル、CoQ10、NADなどがこれにあたります。酵素本体（たんぱく質）があっても、補酵素が足りないと反応は進みにくくなります。',
    },
];

export default function EnzymesPage() {
    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#DCEFE4' }}>
            <img loading="lazy" decoding="async" src="/images/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block"
                style={{ top: '0', right: '-40px', width: '260px', transform: 'scaleY(-1)' }} />
            <img loading="lazy" decoding="async" src="/images/24.png" alt="" className="absolute pointer-events-none"
                style={{ bottom: '-40px', left: '-40px', width: '260px' }} />

            <JsonLd data={medicalWebPage({ name: '酵素とは｜体を動かす「触媒」の正体と、酵素ドリンクの誤解', description: '酵素＝体内反応の触媒。消化酵素・代謝酵素・補酵素の働きと、酵素ドリンクの誤解を生化学ベースで整理。', path: '/enzymes' })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: '身体の仕組み', path: '/library#mechanism' }, { name: '酵素とは', path: '/enzymes' }])} />

            <article className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '身体の仕組み', href: '/library#mechanism' }, { name: '酵素とは' }]} />
                <header className="mb-12 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>ENZYMES</p>
                    <h1 className="text-3xl md:text-5xl font-bold mt-6 mb-8 md:mt-8 md:mb-10 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        酵素とは
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-loose max-w-[640px] mx-auto text-left">
                        「酵素」は健康の世界でよく聞く言葉ですが、その正体は意外と知られていません。じつは酵素とは、<strong>体内の化学反応を進める"触媒"</strong>のこと。仕組みを知ると、「酵素ドリンクで酵素を補う」といった話のどこが本当で、どこが誇張なのかが、自分で見分けられるようになります。
                    </p>
                </header>

                {/* とは */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#FF9855] pl-3 leading-tight">酵素＝体の中の「触媒」</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        酵素とは、主に<strong>たんぱく質でできた触媒</strong>です。触媒とは、自分は変化せずに、化学反応を何万倍ものスピードで進める仲立ち役のこと。私たちの体の中では、消化・エネルギー産生・解毒・修復など、<strong>何千もの反応が酵素によって支えられています</strong>。酵素がなければ、これらの反応は体温では遅すぎて、生命を保てません。
                        {'\n\n'}
                        大切なのは、<strong>体内の酵素は、遺伝子の設計図をもとに、必要に応じて体自身が作り出している</strong>ということ。「外から酵素を飲んで足す」発想とは、そもそも仕組みが違うのです。
                    </p>
                </section>

                {/* 種類 */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#FF9855] pl-3 leading-tight">酵素の主なタイプ</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">役割で分けると、ぐっと整理しやすくなります。</p>
                    <div className="space-y-3">
                        {types.map((t) => (
                            <div key={t.en} className="bg-white/70 rounded-2xl p-5 md:p-6 border border-black">
                                <div className="text-[10px] font-bold tracking-widest text-[#FF9855] mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{t.en}</div>
                                <h3 className="text-lg font-bold text-[#1A1A1A] mb-1">{t.name}</h3>
                                <p className="text-sm text-[#4A4A4A] leading-relaxed">{t.body}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 補酵素＝栄養素 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">酵素を活かすのは、じつは栄養素</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        ここが、栄養学的にいちばん大事なポイントです。酵素本体（たんぱく質）があっても、<strong>補酵素となるビタミン・ミネラルが足りないと、酵素はうまく働けません</strong>。たとえばビタミンB群はエネルギー産生の酵素を、マグネシウムや亜鉛は数百もの酵素反応を支えています。
                        {'\n\n'}
                        つまり「酵素を増やしたい」と思ったとき、現実的に効くのは<strong>酵素ドリンクを飲むことではなく、酵素の相棒になる栄養素を満たすこと</strong>。さらに、酵素は<strong>体温やpH（酸性・アルカリ性）</strong>にも左右されます。冷えすぎ・睡眠不足・極端な食事は、酵素が働く環境そのものを乱します。
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                        <Link href="/nutrients" className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">栄養素（補酵素）</Link>
                        <Link href="/energy" className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">エネルギー産生</Link>
                        <Link href="/digestion" className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">消化・吸収</Link>
                    </div>
                </section>

                {/* 酵素ドリンクの誤解 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#FF9855] pl-3 leading-tight">「酵素ドリンク」「生酵素」をどう見るか</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        まず押さえておきたいのは、<strong>口から飲んだ酵素の多くは、胃酸とたんぱく質分解酵素によって分解される</strong>ということです。酵素はたんぱく質なので、ほかの食べたたんぱく質と同じように、アミノ酸へと消化されます。<strong>飲んだ酵素が、そのまま体内の代謝酵素として働く、ということは基本的に起こりません。</strong>
                        {'\n\n'}
                        「体内の酵素は一生で使える量が決まっていて、減ると老化する」といった説（いわゆる酵素栄養学）も、よく語られますが、<strong>確かな科学的根拠は乏しい</strong>とされています。体は必要に応じて酵素を作り続けています。
                        {'\n\n'}
                        では酵素ドリンクが無意味かというと、そう単純でもありません。多くは野菜や果物を<strong>発酵</strong>させたもので、その価値は「酵素」そのものより、<strong>発酵で生まれた成分や、原料由来のビタミン・ポリフェノール</strong>にあると考えるのが自然です。糖分が多い製品もあるので、「酵素を補う健康飲料」ではなく「発酵飲料の一種」として、中身を見て選ぶのが現実的です。
                    </p>
                </section>

                {/* 例外・正しく使われる場面 */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#41C9B4] pl-3 leading-tight">酵素が「効く」場面もある</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">誤解を解いたうえで、酵素が実際に役立つ場面も知っておきましょう。</p>
                    <div className="space-y-3">
                        {[
                            { head: '消化酵素薬（医療）', body: 'すい臓の働きが弱い人などに、消化を助ける酵素薬が医療で処方される。これは目的と使い方が明確な、確立した使い方。' },
                            { head: '食物に含まれる酵素の局所作用', body: 'パイナップルのブロメライン、パパイヤのパパインなどは、肉をやわらかくするなど"その場"での働きがある。体内の代謝酵素になるわけではない。' },
                            { head: '発酵食品の価値', body: '味噌・納豆・ぬか漬けなどの価値は、酵素そのものより、微生物と発酵で生まれた成分・菌の働きにある。腸内環境の面からも有用。' },
                        ].map((s) => (
                            <div key={s.head} className="bg-white/70 rounded-xl p-4 border border-[#1A1A1A]/15">
                                <div className="font-bold text-[#1A1A1A] mb-0.5">{s.head}</div>
                                <p className="text-sm text-[#4A4A4A] leading-snug">{s.body}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* まとめ */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">まとめ：酵素は「補う」より「働ける体に整える」</h2>
                    <p className="text-[#4A4A4A] leading-loose">
                        酵素は体が自分で作る触媒であり、外から飲んで直接足すものではありません。だからこそ、<strong>補酵素となる栄養素を満たし、体温・睡眠・腸の状態を整える</strong>ことが、結果として「酵素がよく働く体」をつくります。マーケティングの言葉に振り回されず、仕組みから判断する——それが、このテーマでいちばん役に立つ視点です。
                    </p>
                </section>

                {/* 免責 */}
                <p className="text-xs text-[#4A4A4A]/70 leading-relaxed mb-8 p-4 bg-white/60 rounded-lg border border-[#1A1A1A]/10">
                    ※ 本記事は一般的な生化学・栄養の情報であり、特定の商品を推奨・否定したり、診断・治療を目的とするものではありません。消化器の不調が続く場合や、酵素薬の使用については、医療機関にご相談ください。
                </p>

                {/* 参照 */}
                <section className="mb-10">
                    <h2 className="text-lg font-bold text-[#1A1A1A] mb-3 border-l-4 border-[#41C9B4] pl-3 leading-tight">このページの参照</h2>
                    <ul className="bg-white/70 rounded-2xl p-5 md:p-6 border border-black space-y-3 text-sm">
                        <li>
                            <a href="https://www.ncbi.nlm.nih.gov/books/NBK9921/" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                Biochemistry — Enzymes: Basic Concepts and Kinetics（酵素＝触媒の基礎）
                            </a>
                            <span className="text-[#1A1A1A]/50"> — Berg JM ら, NCBI Bookshelf</span>
                        </li>
                        <li>
                            <a href="https://www.niddk.nih.gov/health-information/digestive-diseases/digestive-system-how-it-works" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                Your Digestive System & How It Works（消化酵素の役割）
                            </a>
                            <span className="text-[#1A1A1A]/50"> — NIDDK（米国国立衛生研究所）</span>
                        </li>
                        <li>
                            <a href="https://ods.od.nih.gov/factsheets/list-all/" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                Dietary Supplement Fact Sheets（ビタミン・ミネラルの補酵素としての役割）
                            </a>
                            <span className="text-[#1A1A1A]/50"> — NIH Office of Dietary Supplements</span>
                        </li>
                    </ul>
                    <p className="text-xs text-[#4A4A4A]/70 mt-2">
                        全テーマの出典は{' '}
                        <Link href="/references" className="underline decoration-[#41C9B4] decoration-2 underline-offset-2 font-bold hover:text-[#41C9B4]">参照文献・出典ページ</Link>
                        {' '}にまとめています。
                    </p>
                </section>

                <div className="text-center flex flex-wrap justify-center gap-3">
                    <Link href="/nutrients" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">栄養素を見る</Link>
                    <Link href="/library" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">← Library に戻る</Link>
                </div>
            </article>
        </div>
    );
}
