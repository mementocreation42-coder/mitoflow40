import Link from 'next/link';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: '酸性・アルカリ性とは｜体のpHと「アルカリ性食品」の誤解 | Mitoflow40',
    description: '酸性・アルカリ性（pH）とは何か。血液のpHは体が厳密に保っており、食べ物で体が酸性・アルカリ性に「傾く」ことは基本的にありません。アルカリ性食品・アルカリイオン水・酸性体質といった話のどこが本当で、どこが誤解なのかを、生化学に基づいて出典つきで整理します。',
    alternates: { canonical: 'https://mitoflow40.com/acid-alkaline' },
    openGraph: {
        title: '酸性・アルカリ性とは｜体のpHと「アルカリ性食品」の誤解 | Mitoflow40',
        description: '血液のpHは体が厳密に管理。食べ物で体は酸性・アルカリ性に傾かない。アルカリ性食品の誤解を生化学ベースで整理。',
        url: 'https://mitoflow40.com/acid-alkaline',
        type: 'article',
    },
};

// 体がpHを保つ3つの仕組み
const buffers = [
    {
        name: '血液の緩衝（バッファー）',
        en: 'BUFFER',
        body: '血液には、酸やアルカリが少し増えてもpHが急に動かないようにする「緩衝物質」（重炭酸イオンなど）が備わっています。いちばん速い、瞬時の調整役。',
    },
    {
        name: '肺（呼吸）',
        en: 'LUNGS',
        body: '二酸化炭素（CO₂）は水に溶けると酸性に働きます。体は呼吸の速さ・深さを変えてCO₂の量を調整し、数分単位でpHを整えます。',
    },
    {
        name: '腎臓（尿）',
        en: 'KIDNEYS',
        body: '余った酸やアルカリを尿として捨て、必要な重炭酸を回収します。いちばんゆっくりですが、強力で持続的な調整役。「尿のpH」が食事で変わるのは、まさにこの働きの結果です。',
    },
];

export default function AcidAlkalinePage() {
    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#D9E6F2' }}>
            <img loading="lazy" decoding="async" src="/images/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block"
                style={{ top: '0', right: '-40px', width: '260px', transform: 'scaleY(-1)' }} />
            <img loading="lazy" decoding="async" src="/images/24.png" alt="" className="absolute pointer-events-none"
                style={{ bottom: '-40px', left: '-40px', width: '260px' }} />

            <JsonLd data={medicalWebPage({ name: '酸性・アルカリ性とは｜体のpHと「アルカリ性食品」の誤解', description: '血液のpHは体が厳密に管理。食べ物で体は酸性・アルカリ性に傾かない。アルカリ性食品の誤解を生化学ベースで整理。', path: '/acid-alkaline' })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: '身体の仕組み', path: '/library#mechanism' }, { name: '酸性・アルカリ性とは', path: '/acid-alkaline' }])} />

            <article className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '身体の仕組み', href: '/library#mechanism' }, { name: '酸性・アルカリ性とは' }]} />
                <header className="mb-12 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>ACID &amp; ALKALINE</p>
                    <h1 className="text-3xl md:text-5xl font-bold mt-6 mb-8 md:mt-8 md:mb-10 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        酸性・アルカリ性とは
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-loose max-w-[640px] mx-auto text-left">
                        「アルカリ性食品で体質を改善」「酸性体質は病気のもと」——よく聞く話ですが、ここには大きな誤解があります。じつは<strong>血液の酸性・アルカリ性（pH）は、体がきわめて厳密に保っている</strong>もの。仕組みを知ると、何が本当で、何がマーケティングなのかが見えてきます。
                    </p>
                </header>

                {/* pHとは */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#FF9855] pl-3 leading-tight">pH（ペーハー）とは</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        pHとは、液体が<strong>酸性か・アルカリ性か</strong>を0〜14の数字で表したもの。7が中性で、それより小さいと酸性、大きいとアルカリ性です。レモンやお酢は酸性、重曹や石けん水はアルカリ性、というイメージです。
                        {'\n\n'}
                        ここで大事なのは、<strong>体の場所ごとに最適なpHが決まっている</strong>こと。たとえば<strong>胃の中は強い酸性（pH1〜2前後）</strong>で、食べ物を消化し、菌を殺すために、わざと酸性になっています。一方で<strong>血液は弱アルカリ性（pH7.35〜7.45）</strong>という、とても狭い範囲に保たれています。
                    </p>
                </section>

                {/* 血液pHは動かない */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#FF9855] pl-3 leading-tight">血液のpHは、食べ物では変わらない</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        ここが最大のポイントです。<strong>血液のpHは、食事によって酸性やアルカリ性に「傾く」ことは基本的にありません。</strong>体には、pHを一定に保つための強力な仕組みが何重にも備わっているからです。
                        {'\n\n'}
                        もし血液のpHが7.35〜7.45の範囲を大きく外れると、それは食べ物のせいではなく、<strong>重い病気のサイン</strong>（重症の腎臓病・肺の病気・糖尿病の急変など）です。健康な体では、何を食べても血液pHはこの範囲にきっちり戻されます。「酸性食品を食べたから血液が酸性になる」という考え方そのものが、成り立たないのです。
                    </p>
                </section>

                {/* 3つの仕組み */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#FF9855] pl-3 leading-tight">体がpHを守る3つの仕組み</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">速さの違う3つの調整役が、いつも血液pHを一定に保っています。</p>
                    <div className="space-y-3">
                        {buffers.map((b) => (
                            <div key={b.en} className="bg-white/70 rounded-2xl p-5 md:p-6 border border-black">
                                <div className="text-[10px] font-bold tracking-widest text-[#FF9855] mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{b.en}</div>
                                <h3 className="text-lg font-bold text-[#1A1A1A] mb-1">{b.name}</h3>
                                <p className="text-sm text-[#4A4A4A] leading-relaxed">{b.body}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* アルカリ性食品の誤解 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#FF9855] pl-3 leading-tight">「アルカリ性食品」「酸性体質」をどう見るか</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        「酸性食品・アルカリ性食品」という分類は、もともと<strong>食品を燃やしたあとに残る灰が酸性かアルカリ性か</strong>という、体内とは別の話から来ています。これが「体を酸性／アルカリ性にする」と拡大解釈され、広まりました。
                        {'\n\n'}
                        食事は、せいぜい<strong>尿のpHを多少変える</strong>程度。これは腎臓が余分な酸やアルカリを捨てている、<strong>体が正常に働いている証拠</strong>であって、「体質が変わった」わけではありません。「酸性体質」という医学的な体質区分も存在しません。
                        {'\n\n'}
                        同じく<strong>「アルカリ性食品でがんが治る／予防できる」という主張には、確かな科学的根拠はありません</strong>。アルカリイオン水も、胃に入れば強い胃酸ですぐ中和されます。煽る情報ほど、出典を確かめる価値があります。
                    </p>
                </section>

                {/* では野菜は無意味？ */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">では「野菜中心がいい」は嘘？──いいえ、理由が違うだけ</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        ややこしいのは、<strong>「野菜・果物を多く、肉や加工食品をほどほどに」という食事は、実際に体にいい</strong>ということ。アルカリ性食品を勧める人の結論は、しばしば正しい方向を向いています。
                        {'\n\n'}
                        ただし<strong>効く理由は「アルカリ性だから」ではありません</strong>。野菜・果物が良いのは、カリウム・マグネシウム・食物繊維・ポリフェノールが豊富で、塩分や過剰なたんぱく質が控えめだから。腎臓や骨への負担、血圧の面でも有利です。つまり<strong>正しい食事の理由を、正しい仕組みで理解する</strong>ことが、振り回されないコツです。
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                        <Link href="/foods" className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">食べ物</Link>
                        <Link href="/nutrients" className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">栄養素</Link>
                        <Link href="/nutrition-literacy" className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">学ぶと、何が変わる？</Link>
                    </div>
                </section>

                {/* まとめ */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">まとめ：pHは「整えるもの」ではなく「保たれているもの」</h2>
                    <p className="text-[#4A4A4A] leading-loose">
                        血液のpHは、あなたが意識しなくても、肺と腎臓と緩衝系が休まず一定に保ってくれています。だから<strong>「体をアルカリ性にしよう」とする必要はありません</strong>。やるべきは、その精巧な仕組みが働きやすいように、<strong>野菜を多めに、塩分ひかえめに、水分と睡眠を整える</strong>こと。結論は地味ですが、それが事実です。
                    </p>
                </section>

                {/* 免責 */}
                <p className="text-xs text-[#4A4A4A]/70 leading-relaxed mb-8 p-4 bg-white/60 rounded-lg border border-[#1A1A1A]/10">
                    ※ 本記事は一般的な生化学・栄養の情報であり、特定の商品や食事法を推奨・否定したり、診断・治療を目的とするものではありません。腎臓・呼吸器の病気や持病がある方の食事・水分管理については、医療機関にご相談ください。
                </p>

                {/* 参照 */}
                <section className="mb-10">
                    <h2 className="text-lg font-bold text-[#1A1A1A] mb-3 border-l-4 border-[#41C9B4] pl-3 leading-tight">このページの参照</h2>
                    <ul className="bg-white/70 rounded-2xl p-5 md:p-6 border border-black space-y-3 text-sm">
                        <li>
                            <a href="https://www.ncbi.nlm.nih.gov/books/NBK507807/" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                Physiology, Acid Base Balance（酸塩基平衡：肺・腎・緩衝系によるpH調節）
                            </a>
                            <span className="text-[#1A1A1A]/50"> — Hopkins E ら, NCBI Bookshelf (StatPearls)</span>
                        </li>
                        <li>
                            <a href="https://pubmed.ncbi.nlm.nih.gov/27752961/" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                The Alkaline Diet: Is There Evidence...（アルカリ食とがん予防説の検証）
                            </a>
                            <span className="text-[#1A1A1A]/50"> — Fenton TR ら, BMJ Open / 関連レビュー</span>
                        </li>
                        <li>
                            <a href="https://www.niddk.nih.gov/health-information/digestive-diseases/digestive-system-how-it-works" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                Your Digestive System & How It Works（胃の強酸性と消化）
                            </a>
                            <span className="text-[#1A1A1A]/50"> — NIDDK（米国国立衛生研究所）</span>
                        </li>
                    </ul>
                    <p className="text-xs text-[#4A4A4A]/70 mt-2">
                        全テーマの出典は{' '}
                        <Link href="/references" className="underline decoration-[#41C9B4] decoration-2 underline-offset-2 font-bold hover:text-[#41C9B4]">参照文献・出典ページ</Link>
                        {' '}にまとめています。
                    </p>
                </section>

                <div className="text-center flex flex-wrap justify-center gap-3">
                    <Link href="/foods" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">食べ物を見る</Link>
                    <Link href="/library" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">← Library に戻る</Link>
                </div>
            </article>
        </div>
    );
}
