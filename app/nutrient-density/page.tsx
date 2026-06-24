import Link from 'next/link';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: '食べ物の栄養価は変わってきている｜下がる野菜と、上がるきのこ | Mitoflow40',
    description: '昔と同じ野菜を食べても、栄養素は減っているかもしれない——多収化を狙った品種改良・土壌の劣化・大気CO₂の上昇による「希釈効果」を、出典つきで解説。一方でUV照射によりビタミンDが増えるきのこのように、むしろ栄養価が高まった食品もある。事実ベースで、40代の食選びの視点をまとめます。',
    alternates: { canonical: 'https://mitoflow40.com/nutrient-density' },
    openGraph: {
        title: '食べ物の栄養価は変わってきている｜下がる野菜と、上がるきのこ | Mitoflow40',
        description: '野菜の栄養素は数十年で減少傾向。一方UV照射きのこはビタミンDが増える。事実ベースで食の栄養価の変化を解説。',
        url: 'https://mitoflow40.com/nutrient-density',
        type: 'article',
    },
};

// 栄養価が下がってきた主な理由
const causes = [
    {
        head: '多収化を狙った品種改良',
        body: 'より多く・大きく・速く育つ品種が選ばれてきました。けれど収量が上がるほど、同じ重さあたりの栄養が薄まる「希釈効果（dilution effect）」が起こりやすい。たくさん採れる品種ほど、ミネラルやたんぱく質の濃度は下がる傾向が報告されています。',
    },
    {
        head: '土壌の劣化',
        body: '連作や化学肥料中心の農法が続くと、土の中の微量ミネラルや微生物の多様性が失われていきます。土が痩せれば、そこで育つ作物が吸い上げられる栄養も減ります。',
    },
    {
        head: '大気CO₂の上昇',
        body: '二酸化炭素が増えると植物の成長は速くなりますが、その分たんぱく質・亜鉛・鉄などの濃度が下がることが、実験的にも確かめられています。穀物や葉物で特に影響が指摘されています。',
    },
    {
        head: '収穫から食卓までの時間',
        body: '長距離輸送や長期保存のあいだに、ビタミンC など壊れやすい栄養素は徐々に失われます。「新鮮さ」そのものが栄養価の一部です。',
    },
];

export default function NutrientDensityPage() {
    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#EAF1E0' }}>
            <img loading="lazy" decoding="async" src="/images/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block"
                style={{ top: '0', right: '-40px', width: '260px', transform: 'scaleY(-1)' }} />
            <img loading="lazy" decoding="async" src="/images/24.png" alt="" className="absolute pointer-events-none"
                style={{ bottom: '-40px', left: '-40px', width: '260px' }} />

            <JsonLd data={medicalWebPage({ name: '食べ物の栄養価は変わってきている｜下がる野菜と、上がるきのこ', description: '野菜の栄養素は数十年で減少傾向。一方UV照射きのこはビタミンDが増える。事実ベースで食の栄養価の変化を解説。', path: '/nutrient-density' })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: '生活習慣', path: '/library#lifestyle' }, { name: '食べ物の栄養価の変化', path: '/nutrient-density' }])} />

            <article className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '生活習慣', href: '/library#lifestyle' }, { name: '食べ物の栄養価の変化' }]} />
                <header className="mb-12 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>NUTRIENT DENSITY</p>
                    <h1 className="text-3xl md:text-5xl font-bold mt-6 mb-8 md:mt-8 md:mb-10 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        食べ物の栄養価は<br className="md:hidden" />変わってきている
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-loose max-w-[640px] mx-auto text-left">
                        昔と同じ野菜を、同じ量だけ食べても、とれる栄養は減っているかもしれない——これは感覚ではなく、数十年分のデータが示している事実です。一方で、<strong>育て方しだいでむしろ栄養価が高まった食品</strong>もあります。煽らず、事実ベースで「いま何が起きているか」を整理します。
                    </p>
                </header>

                {/* 起きていること */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#FF9855] pl-3 leading-tight">野菜の栄養素は、数十年で減ってきた</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        アメリカの代表的な研究では、43種類の野菜・果物について<strong>1950年と1999年の栄養価を比較</strong>したところ、たんぱく質・カルシウム・リン・鉄・ビタミンB2・ビタミンC など複数の栄養素で<strong>有意な減少</strong>が見られました（Davis ら, 2004）。
                        {'\n\n'}
                        イギリスでも、1930年代と1980年代の食品成分表を比べた研究で、野菜・果物のミネラル含有量が低下していたと報告されています。減少の幅は栄養素や作物によりますが、「同じ名前の食材でも、昔より中身が薄くなっている」という方向性は、複数の国・複数のデータで一致しています。
                        {'\n\n'}
                        ここで大切なのは、これを<strong>「遺伝子組み換えが悪い」という単純な話に閉じない</strong>ことです。原因はもっと広く、農業のあり方全体に関わっています。
                    </p>
                </section>

                {/* なぜ減るのか */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#FF9855] pl-3 leading-tight">なぜ、減ってきたのか</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">原因は一つではなく、いくつかの流れが重なっています。</p>
                    <div className="space-y-3">
                        {causes.map((c) => (
                            <div key={c.head} className="bg-white/70 rounded-2xl p-5 md:p-6 border border-black">
                                <h3 className="text-lg font-bold text-[#1A1A1A] mb-1">{c.head}</h3>
                                <p className="text-sm text-[#4A4A4A] leading-relaxed">{c.body}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 品種改良・GMOの位置づけ */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#FF9855] pl-3 leading-tight">品種改良・遺伝子組み換えをどう見るか</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        栄養価の低下の大きな一因は、<strong>「収量を最優先にした育種」</strong>です。これは古くからの交配による品種改良も、近年の遺伝子組み換え（GMO）も含む、農業全体の方向性の話です。たくさん・速く・大きく育つことを選び続けた結果として、<strong>同じ重さあたりの栄養が薄まる</strong>——これが希釈効果です。
                        {'\n\n'}
                        つまり問題の本質は<strong>「GMOかどうか」そのものより、「何を目的に育種してきたか」</strong>にあります。実際、栄養強化を目的に育種された作物（鉄分や亜鉛、ビタミンAを高めた品種など）もあり、技術は栄養を「下げる」方向にも「上げる」方向にも使えます。
                        {'\n\n'}
                        だからこそ、レッテルで判断するのではなく、<strong>「その食べ物に、いま実際どれだけ栄養が入っているか」</strong>という視点が役に立ちます。
                    </p>
                </section>

                {/* F1種 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#FF9855] pl-3 leading-tight">F1種とは何か（GMOとは別物）</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        いまスーパーに並ぶ野菜の多くは<strong>F1種（一代交配種）</strong>から育ったものです。F1とは、性質の異なる親どうしを掛け合わせた<strong>「雑種第一代」</strong>のこと。一代目だけ、生育がそろい・大きく・病気に強い性質（雑種強勢／ヘテロシス）が強く出ます。
                        {'\n\n'}
                        ここで誤解されやすいのですが、<strong>F1種は遺伝子組み換え（GMO）ではありません</strong>。F1は、昔ながらの「交配（掛け合わせ）」を計画的に行う、古くからある育種技術です。食べても問題はなく、危険なものではありません。
                        {'\n\n'}
                        F1の特徴は、<strong>採れた種をまいても、同じ野菜にはならない</strong>こと。二代目（F2）では性質がバラバラに分かれてしまうため、農家は毎年あらたに種を買うことになります。これは「種が自殺する」といった話ではなく、雑種の性質が一代しか安定しない、という遺伝の自然な現象です。</p>
                    <div className="mt-4 rounded-xl bg-[#FFF1DF] border border-[#1A1A1A]/15 p-4">
                        <p className="text-sm text-[#4A4A4A] leading-relaxed">
                            <strong className="text-[#1A1A1A]">栄養価との関係：</strong>F1化そのものが栄養を下げるわけではありません。問題になりやすいのは、F1が<strong>「収量・見た目・そろい・日もち」を優先して選ばれてきた</strong>こと。つまりここでも本質は、前の節と同じく<strong>「何を目的に育種してきたか」</strong>です。栄養を高める方向でF1を育種することも、原理的には可能です。
                        </p>
                    </div>
                    <div className="mt-3 rounded-xl bg-white border border-[#1A1A1A]/15 p-4">
                        <p className="text-sm text-[#4A4A4A] leading-relaxed">
                            <strong className="text-[#1A1A1A]">「雄性不稔」と健康の俗説について：</strong>F1の効率的な生産のため、花粉を作れない性質（雄性不稔／CMS。多くは植物の<em>ミトコンドリア</em>由来）を利用することがあります。これを「食べる人のミトコンドリアや生殖に影響する」と結びつける説が一部にありますが、<strong>科学的な裏づけはありません</strong>。植物のミトコンドリアの性質が、食べた人の体に遺伝・伝播することは確認されていません。心配を煽る情報には、出典があるかを確かめる姿勢が役立ちます。
                        </p>
                    </div>
                </section>

                {/* きのこ：上がった例 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">むしろ栄養価が「上がった」食品もある — きのこ</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        下がる話ばかりではありません。代表が<strong>きのこ</strong>です。きのこには、紫外線（UV）を浴びると<strong>ビタミンDを自分で作り出す</strong>性質があります。人間の皮膚が日光でビタミンDを作るのと、よく似た仕組みです。
                        {'\n\n'}
                        この性質を活かし、いまでは収穫前後に<strong>UV照射でビタミンDを大幅に増やしたきのこ</strong>が流通しています。研究では、UVを当てたきのこのビタミンD量が、当てないものに比べて<strong>何倍にも増える</strong>ことが確認されており、これは天日干しでも起こります。生のしいたけを<strong>30分〜1時間ほど傘の裏を上にして天日に当てる</strong>だけでも、ビタミンDは増えます。
                        {'\n\n'}
                        つまり「昔のきのこより、いまのきのこ（や干したきのこ）のほうが栄養価が高い」ことが、育て方・扱い方しだいで現実に起きているのです。ビタミンDは日本人に不足しがちな栄養素なので、これは数少ない朗報のひとつです。
                    </p>
                </section>

                {/* 冷凍・加熱 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">「冷凍」「加熱」でも、栄養価は変わる</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        意外に思われますが、<strong>冷凍野菜のほうが、店頭の"生鮮"より栄養豊富なことがあります</strong>。冷凍は栄養を魔法のように「増やす」わけではありません。ポイントは<strong>タイミング</strong>です。冷凍用の野菜は、栄養がピークの<strong>収穫直後にすぐ凍結</strong>されるため、その時点の栄養がほぼ保たれます。
                        {'\n\n'}
                        一方、「生鮮」として売られる野菜は、収穫から店頭・冷蔵庫を経るあいだに、ビタミンCや葉酸など壊れやすい栄養素が少しずつ失われていきます。<strong>数日たった生野菜より、収穫直後に凍らせた冷凍野菜のほうが、ビタミンCなどが高く残っていた</strong>という研究報告があります（冷凍前の湯通しでわずかに失われる分を差し引いても、です）。
                        {'\n\n'}
                        また、<strong>加熱でむしろ"使いやすく"なる栄養素</strong>もあります。トマトのリコピンや、にんじんのβカロテンは、加熱や油と合わせることで体に吸収されやすくなります。「生がいちばん栄養がある」とは限らない、という良い例です。</p>
                    <div className="mt-4 rounded-xl bg-[#FFF1DF] border border-[#1A1A1A]/15 p-4">
                        <p className="text-sm text-[#4A4A4A] leading-relaxed">
                            <strong className="text-[#1A1A1A]">つまり：</strong>「冷凍＝栄養が落ちる」「生＝最強」という思い込みは、必ずしも正しくありません。栄養価は<strong>鮮度・保存法・調理法</strong>で動きます。忙しい日に冷凍野菜を使うことは、栄養面でも十分に賢い選択です。
                        </p>
                    </div>
                </section>

                {/* どうすればいいか */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#41C9B4] pl-3 leading-tight">では、どう食べればいいか</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">完璧を目指す必要はありません。「中身の濃いものを、新鮮なうちに、種類多く」が基本です。</p>
                    <div className="space-y-3">
                        {[
                            { head: '量より「種類」と「鮮度」', body: '同じ野菜でも栄養が薄まっている前提なら、いろいろな食材を、できるだけ新鮮なうちに食べることが効いてくる。旬・地場のものは輸送時間が短く有利。' },
                            { head: 'きのこは日に当てる・干す', body: '生しいたけや舞茸を調理前に少し天日に当てるだけでビタミンDが増える。干ししいたけ・干しきくらげも手軽な供給源。' },
                            { head: '「下がる前提」で多めの基準を', body: '昔の成分表のイメージより実際は薄いかもしれない、と考えると、野菜・きのこ・海藻はやや多めを意識するくらいでちょうどいい。' },
                            { head: '冷凍野菜を上手に使う', body: '収穫直後に凍らせた冷凍野菜は栄養が保たれやすく、数日たった生鮮より高いことも。忙しい日の罪悪感のない選択肢。' },
                            { head: '足りないものは賢く補う', body: '食事を土台にしつつ、不足しやすい栄養素（ビタミンD・鉄・亜鉛など）は、自分の体の状態を見ながらサプリで補う選択肢もある。' },
                        ].map((s) => (
                            <div key={s.head} className="bg-white/70 rounded-xl p-4 border border-[#1A1A1A]/15">
                                <div className="font-bold text-[#1A1A1A] mb-0.5">{s.head}</div>
                                <p className="text-sm text-[#4A4A4A] leading-snug">{s.body}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* つながり */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">「何を食べるか」を、自分で読み解く</h2>
                    <p className="text-[#4A4A4A] leading-loose">
                        栄養価は固定された数字ではなく、品種・土・気候・流通・調理で変わる<strong>動くもの</strong>です。だからこそ、ラベルや昔ながらの常識に頼りきるより、仕組みを知って自分で選ぶ力が役に立ちます。
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                        <Link href="/nutrients" className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">栄養素</Link>
                        <Link href="/foods" className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">食べ物</Link>
                        <Link href="/nutrition-literacy" className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">学ぶと、何が変わる？</Link>
                        <Link href="/supplements" className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">サプリメント</Link>
                    </div>
                </section>

                {/* 免責 */}
                <p className="text-xs text-[#4A4A4A]/70 leading-relaxed mb-8 p-4 bg-white/60 rounded-lg border border-[#1A1A1A]/10">
                    ※ 本記事は一般的な栄養・食の情報であり、特定の食品や農法を断罪したり、診断・治療を目的とするものではありません。栄養価の減少幅は栄養素・作物・研究により幅があります。栄養素の補給について不安がある場合は、医療機関や管理栄養士にご相談ください。
                </p>

                {/* 参照 */}
                <section className="mb-10">
                    <h2 className="text-lg font-bold text-[#1A1A1A] mb-3 border-l-4 border-[#41C9B4] pl-3 leading-tight">このページの参照</h2>
                    <ul className="bg-white/70 rounded-2xl p-5 md:p-6 border border-black space-y-3 text-sm">
                        <li>
                            <a href="https://pubmed.ncbi.nlm.nih.gov/15637215/" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                Changes in USDA Food Composition Data for 43 Garden Crops, 1950 to 1999（野菜43種の栄養価の経年低下）
                            </a>
                            <span className="text-[#1A1A1A]/50"> — Davis DR ら, J Am Coll Nutr, 2004</span>
                        </li>
                        <li>
                            <a href="https://www.nature.com/articles/nature13179" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                Increasing CO₂ threatens human nutrition（CO₂上昇が穀物のたんぱく質・亜鉛・鉄を低下させる）
                            </a>
                            <span className="text-[#1A1A1A]/50"> — Myers SS ら, Nature, 2014</span>
                        </li>
                        <li>
                            <a href="https://pubmed.ncbi.nlm.nih.gov/26243607/" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                Nutritional comparison of fresh, frozen, and canned fruits and vegetables（生鮮・冷凍・缶詰の栄養比較）
                            </a>
                            <span className="text-[#1A1A1A]/50"> — Bouzari A ら, J Agric Food Chem, 2015</span>
                        </li>
                        <li>
                            <a href="https://ods.od.nih.gov/factsheets/VitaminD-HealthProfessional/" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                Vitamin D — Fact Sheet（UV照射きのこによるビタミンD供給を含む）
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
                    <Link href="/foods" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">食べ物を見る</Link>
                    <Link href="/library" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">← Library に戻る</Link>
                </div>
            </article>
        </div>
    );
}
