import Link from 'next/link';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: '健康とは | Mitoflow40',
    description: '「健康とは何か」を体の視点から問い直す。病気でないことはゴールではない——WHOの健康定義・健康寿命・基準値と理想値の違いから、40代の健康の考え方をやさしく解説します。',
    alternates: { canonical: 'https://mitoflow40.com/health-philosophy' },
    openGraph: {
        title: '健康とは | Mitoflow40',
        description: '病気でない状態がゴールではなく、自分本来の力を発揮できる状態へ。Mitoflow40が考える「健康とは何か」。',
        url: 'https://mitoflow40.com/health-philosophy',
        type: 'article',
    },
};

// 「病気でない」と「健康」のあいだ
const spectrum = [
    { label: '病気', en: 'DISEASE', note: '検査値が基準を外れ、治療が必要な状態。', color: '#F6DAD4' },
    { label: '未病・不調', en: 'GREY ZONE', note: '基準値内なのに、疲れ・不眠・気分の波などの不調がある状態。', color: '#FBE9D6' },
    { label: '本来の活力', en: 'OPTIMAL', note: '数値も体感も整い、自分本来の力を発揮できる状態。', color: '#D7EAE2' },
];

export default function HealthPhilosophyPage() {
    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#CDEBE2' }}>
            <img loading="lazy" decoding="async" src="/images/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block"
                style={{ top: '0', right: '-40px', width: '260px', transform: 'scaleY(-1)' }} />
            <img loading="lazy" decoding="async" src="/images/24.png" alt="" className="absolute pointer-events-none"
                style={{ bottom: '-40px', left: '-40px', width: '260px' }} />

            <JsonLd data={medicalWebPage({ name: '健康とは', description: '病気でない状態がゴールではなく、自分本来の力を発揮できる状態へ。Mitoflow40が考える「健康とは何か」。', path: '/health-philosophy' })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: '健康とは', path: '/health-philosophy' }])} />

            <article className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '健康とは' }]} />
                <header className="mb-12 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>
                        THE APPROACH
                    </p>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        WHAT IS HEALTH?
                        <span className="block text-base md:text-lg mt-2 text-[#1A1A1A]/70" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>健康とは</span>
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-relaxed max-w-[600px] mx-auto">
                        病気でないこと——それは健康の出発点であって、ゴールではありません。Mitoflow40が考える健康とは何か。
                    </p>
                </header>

                {/* 病気でない＝健康ではない */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">「病気でない」＝「健康」ではない</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        健康と聞くと、多くの人がまず「病気でない状態」を思い浮かべます。けれど、健診で「異常なし」と言われても、なんとなく疲れが抜けない、よく眠れない、気分が晴れない——そんな経験はないでしょうか。
                        {'\n\n'}
                        世界保健機関（WHO）は、その憲章で健康を「<strong>病気でない、虚弱でないということではなく、身体的・精神的・社会的に完全に満たされた状態</strong>」と定義しています。つまり、健康とは「マイナスがゼロになった状態」ではなく、「<strong>本来の力をのびのびと発揮できる、より良い状態</strong>」を指す前向きな概念なのです。
                        {'\n\n'}
                        Mitoflow40も、この考え方を出発点にしています。病気を防ぐことはもちろん大切。その上で、「ただ生きている」から「活き活きと過ごせる」へ——その差にこそ目を向けたいと考えています。
                    </p>
                </section>

                {/* スペクトラム */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#41C9B4] pl-3 leading-tight">健康は「ある・なし」ではなくグラデーション</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">
                        健康と病気は、白か黒かではありません。その間には広い「グレーゾーン（未病・不調）」が広がっています。
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {spectrum.map((s) => (
                            <div key={s.en} className="rounded-2xl p-5 border border-black" style={{ background: s.color }}>
                                <div className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/50 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{s.en}</div>
                                <div className="font-bold text-[#1A1A1A] mb-2">{s.label}</div>
                                <p className="text-xs text-[#4A4A4A] leading-relaxed">{s.note}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-[#4A4A4A]/60 mt-3 leading-relaxed">
                        ※ 多くの人が過ごす「グレーゾーン」を、少しでも右（本来の活力）へ動かしていく——それがMitoflow40の目指す方向です。
                    </p>
                </section>

                {/* 未病のうちに整える */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">「未病」のうちに整える</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        東洋医学には、古くから「<strong>未病</strong>」という考え方があります。まだ病気ではないけれど、放っておけば病気に向かいかねない——いわば、健康と病気のあいだの「<strong>グレーゾーン</strong>」を指す言葉です。疲れやすい、眠りが浅い、気分が晴れない、なんとなく不調。検査では異常が出ないこうしたサインこそ、体からの早めの便りです。
                        {'\n\n'}
                        病気になってから立て直すのは、時間も負担も大きくなります。けれど未病の段階なら、食事・睡眠・運動・ストレスといった毎日の選択で、流れを良い方向へ戻していける余地が大きく残されています。<strong>病気になってから治すのではなく、なる前に整える</strong>——この「<strong>未病予防</strong>」こそ、Mitoflow40が最も大切にしているスタンスです。
                        {'\n\n'}
                        40代は、まさに未病のサインが増え始める時期。その小さな変化を見逃さず、早めに手を打つことが、10年後・20年後の自分への何よりの投資になります。
                    </p>
                </section>

                {/* 基準値と理想値 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">「基準値内」で安心しない</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        健康診断の「基準値」は、多くの人を測ったときの<strong>平均的な範囲</strong>であり、「ここを外れたら病気が疑われる」という<strong>下限のライン</strong>です。つまり、基準値の内側はとても幅が広く、「ぎりぎり正常」と「絶好調」が同じ“異常なし”にまとめられてしまいます。
                        {'\n\n'}
                        Mitoflow40が大切にするのは、基準値の中でも「<strong>もっとも調子よく過ごせる位置（理想値）</strong>」に近づくという視点です。同じ正常範囲でも、体の感じ方は変わります。病気を防ぐだけでなく、本来の力を引き出す——その読み解き方を、精密栄養学の考え方とともにお届けしています。
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                        <Link href="/biomarkers"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold hover:opacity-90 transition"
                            style={{ background: '#FF9855', color: '#1A1A1A' }}>
                            血液検査の理想値を見る
                            <span>→</span>
                        </Link>
                    </div>
                </section>

                {/* 健康寿命 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">「長く生きる」より「長く元気でいる」</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        いま注目されているのが、<strong>寿命（ライフスパン）</strong>と<strong>健康寿命（ヘルススパン）</strong>の違いです。寿命は「何年生きるか」、健康寿命は「<strong>心身ともに元気で、自立して過ごせる年数</strong>」を指します。
                        {'\n\n'}
                        医療の進歩で寿命は延びましたが、その分「不調や介護とともに過ごす期間」も延びがちです。だからこそ、ただ長生きするのではなく、<strong>元気でいられる年数を延ばし、不調の期間をできるだけ短く（うしろ倒しに）する</strong>という考え方が大切になります。
                        {'\n\n'}
                        40代は、この健康寿命の分かれ道。いまの過ごし方が、20年後・30年後の「動ける自分」を左右します。
                    </p>
                </section>

                {/* 医療の前提と限界 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">医療にできること、手が回りにくいこと</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        日本の医療は、世界でもトップクラスの水準にあります。誰もが安心して受診でき、病気の診断や治療は非常に頼りになる——これは大きな財産です。一方で、その仕組みには<strong>得意な領域と、構造上どうしても手が回りにくい領域</strong>があることも知っておきたいところです。
                        {'\n\n'}
                        日本の保険診療は、基本的に「<strong>病気を見つけて治す</strong>」ことを中心に組み立てられています。限られた診療時間の中で多くの患者さんを診る必要があり、<strong>まだ病気ではない「不調」や、一人ひとりの栄養最適化・予防</strong>までは、どうしても手が回りにくいのが実情です。健康診断の基準値も、あくまで「病気の有無」を見分けるためのものさしであって、「あなたが一番調子よく過ごせる理想の状態」を示すものではありません。
                        {'\n\n'}
                        さらに、栄養を治療に積極的に活かす「分子栄養学」や「精密栄養学」の知見は、欧米に比べて研究基盤や臨床への応用が遅れており、保険診療の枠の中で受けられる機会はまだ多くありません。つまり、<strong>「異常なし」と言われた後の“より良くする”部分は、医療だけではカバーしきれない</strong>という構造があるのです。
                        {'\n\n'}
                        これは、医療や医師を否定する話ではありません。むしろ逆で、<strong>医療が得意なことは医療に頼り、その上で「自分の体を整える視点」は自分でも持っておく</strong>——その両輪が、これからの健康づくりには欠かせないと考えています。だからこそMitoflow40は、専門家との対話をより豊かにするための知識を、わかりやすく届けることを大切にしています。
                    </p>
                </section>

                {/* なぜ自分に合わせるのか */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">健康に「みんな共通の正解」はない</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        同じものを食べても、エネルギーに変えやすい人とそうでない人がいます。同じ栄養素でも、たくさん必要な人と少しで足りる人がいます。その違いを生むのが、生まれ持った<strong>遺伝子</strong>、今の体の<strong>状態</strong>、そして毎日の<strong>生活習慣</strong>です。
                        {'\n\n'}
                        身のまわりを見渡しても、健康に気をつかっているのに<strong>若くして病気になる人</strong>もいれば、お酒やタバコ、荒れた食事を繰り返しても<strong>元気に長生きする人</strong>もいます。一見すると不公平にも思えるこの差も、その人の遺伝子のクセ、これまでに積み重なった体の状態、そして環境やストレスの違いが複雑に絡み合った結果です。「これさえやれば誰でも健康」という魔法のような正解は、どこにも存在しません。
                        {'\n\n'}
                        とはいえ、すべてが遺伝で決まっているわけでもありません。生まれ持った設計図は変えられなくても、それをどう活かすか——どんな食事をし、どう眠り、どう動くか——で、体の状態は大きく変わります。だからこそ大切なのは、誰かの正解をそのまま真似ることではなく、<strong>自分の体を知り、自分にとっての最適を見つけること</strong>。Mitoflow40はこの考え方を「精密栄養学」と呼び、すべての解説の土台にしています。
                        {'\n\n'}
                        そしてその第一歩は、人と比べて落ち込むことでも、自分を責めることでもありません。疲れやすさも、苦手なことも、変えられない体質も含めて、<strong>まずは「これが今の自分」とありのままを受け入れること</strong>。そのスタンスがあってはじめて、自分に合ったやり方を、無理なく、長く続けていけると考えています。健康とは、誰かになることではなく、<strong>自分らしく生きるための土台</strong>なのです。
                    </p>
                    <div className="mt-5">
                        <Link href="/precision-nutrition"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold hover:opacity-90 transition"
                            style={{ background: '#1A1A1A', color: '#FFFFFF' }}>
                            精密栄養学とは を読む
                            <span>→</span>
                        </Link>
                    </div>
                </section>

                {/* 大切にしたい前提 */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#41C9B4] pl-3 leading-tight">大切にしたい前提</h2>
                    <div className="bg-white/70 rounded-2xl p-6 border border-black">
                        <p className="text-sm text-[#4A4A4A] leading-relaxed">
                            ここでお伝えする「健康とは」は、医療を否定したり、特定の食事法や健康法を推奨したりするものではありません。むしろ、医療や検査で得た数値を「より良い状態づくり」に活かすための<strong>考え方の土台</strong>です。気になる症状や検査値、サプリ・食事の大きな変更は、必ず医師・管理栄養士などの専門家にご相談ください。Mitoflow40の解説は、その対話をより豊かにするための一般的な情報提供です。
                        </p>
                    </div>
                </section>

                {/* もっと深く知る */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">ここから読み進める</h2>
                    <p className="text-sm text-[#4A4A4A] leading-relaxed mb-4">
                        「健康とは何か」を出発点に、自分の体を読み解く旅へ。
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {[
                            { href: '/precision-nutrition', label: '精密栄養学とは' },
                            { href: '/molecular-nutrition', label: '分子栄養学とは' },
                            { href: '/biomarkers', label: '血液検査（理想値）' },
                            { href: '/mitochondria', label: 'ミトコンドリア' },
                            { href: '/check', label: 'セルフチェック' },
                            { href: '/library', label: 'Library 全体' },
                        ].map((l) => (
                            <Link key={l.href} href={l.href}
                                className="px-4 py-2 rounded-full bg-white border border-[#1A1A1A] text-sm font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white transition-colors">
                                {l.label} →
                            </Link>
                        ))}
                    </div>
                </section>

                {/* 参照 */}
                <section className="mb-10">
                    <h2 className="text-lg font-bold text-[#1A1A1A] mb-3 border-l-4 border-[#41C9B4] pl-3 leading-tight">このページの参照</h2>
                    <ul className="bg-white/70 rounded-2xl p-5 md:p-6 border border-black space-y-2 text-sm">
                        <li>
                            <a href="https://www.who.int/about/governance/constitution" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                Constitution of the World Health Organization（健康の定義）
                            </a>
                            <span className="text-[#1A1A1A]/50"> — WHO（世界保健機関）</span>
                        </li>
                    </ul>
                    <p className="text-xs text-[#4A4A4A]/70 mt-2">
                        全テーマの出典は{' '}
                        <Link href="/references" className="underline decoration-[#41C9B4] decoration-2 underline-offset-2 font-bold hover:text-[#41C9B4]">参照文献・出典ページ</Link>
                        {' '}にまとめています。
                    </p>
                </section>

                {/* セルフチェックCTA */}
                <div className="bg-white border border-black rounded-2xl p-6 md:p-8 text-center mb-12">
                    <p className="text-xs tracking-widest font-bold mb-3 text-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        SELF CHECK
                    </p>
                    <h2 className="text-lg md:text-xl font-bold mb-3 text-[#1A1A1A]">
                        まずは自分の「現在地」から
                    </h2>
                    <p className="text-sm text-[#4A4A4A] leading-relaxed mb-5 max-w-[480px] mx-auto">
                        12問・約2分のセルフチェックで、あなたのミトコンドリア活性度を4つの軸から可視化します。「自分にとっての健康」を考える第一歩に。無料・登録不要。
                    </p>
                    <Link href="/check" className="inline-block px-8 py-3 rounded-full text-sm font-bold hover:opacity-90 transition"
                        style={{ fontFamily: "'Space Grotesk', sans-serif", background: '#1A1A1A', color: '#FFFFFF' }}>
                        無料セルフチェックを試す →
                    </Link>
                </div>

                <div className="text-center">
                    <Link href="/library" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">
                        ← Library に戻る
                    </Link>
                </div>
            </article>
        </div>
    );
}
