import Link from 'next/link';
import { getNutrientBySlug } from '@/lib/nutrients';
import { getGeneBySlug } from '@/lib/genes';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: 'HSP（繊細さん）と体・遺伝子 | Mitoflow40',
    description: 'HSP（Highly Sensitive Person／繊細さん）を、心理概念の歴史・感覚処理感受性(SPS)・遺伝子（COMT・MAOA・DAO・5-HTTLPR・BDNF）・自律神経とATPの視点から精密栄養学で読み解く。気質と“今の体の状態”を切り分ける。',
    alternates: { canonical: 'https://mitoflow40.com/hsp' },
    openGraph: {
        siteName: 'Mitoflow40',
        locale: 'ja_JP',
        title: 'HSP（繊細さん）と体・遺伝子 | Mitoflow40',
        description: 'HSPを、歴史・感覚処理感受性・遺伝子・自律神経とATPの視点から中立に整理。気質と“状態”を切り分ける。',
        url: 'https://mitoflow40.com/hsp',
        type: 'article',
    },
};

// HSPの4つの柱（DOES）
const does = [
    { key: 'D', en: 'DEPTH OF PROCESSING', title: '深く処理する', note: '物事を無意識に深く考え、関連づける。決断に時間がかかりやすい。' },
    { key: 'O', en: 'OVERSTIMULATION', title: '過剰に刺激を受ける', note: '音・光・匂い・人混みで、人より早く「容量オーバー」になる。' },
    { key: 'E', en: 'EMOTIONAL / EMPATHY', title: '感情反応・共感が強い', note: 'ミラーニューロン活動が高く、他者の気分をもらいやすい。' },
    { key: 'S', en: 'SENSING THE SUBTLE', title: '些細な刺激を察知する', note: '空気の変化や細部に気づく。長所にも消耗の元にもなる。' },
];

// 「気質」と「状態」の切り分け
const traitVsState = [
    { surface: '音・光・人混みで消耗する', body: '自律神経の過反応（交感優位・HRV低下）', href: '/autonomic-nervous-system' },
    { surface: 'ストレスからの回復が遅い', body: 'HPA軸・コルチゾール応答の乱れ、副腎の消耗', href: '/stress' },
    { surface: '気分の起伏・過集中と消耗', body: '血糖の乱高下、ATP不足で神経が“省エネできない”', href: '/blood-sugar' },
    { surface: '食後の紅潮・頭痛・不調', body: 'ヒスタミン過剰（DAOの処理能力を超える）', href: '/genes/dao' },
];

// 暮らしで整える
const habits = [
    { head: '刺激の“予算”を設計する', body: '刺激は敵ではなく容量の問題。休憩・静かな時間・一人時間を先にスケジュールへ組み込む。' },
    { head: 'ゆっくりした呼吸', body: '1分6回ほどの深い呼吸で副交感神経を手動でオン。過覚醒を鎮める最速のスイッチ。', href: '/mindfulness' },
    { head: '血糖を揺らさない', body: '空腹・糖質スパイクは不安と過敏を増幅する。たんぱく質・食物繊維を先に。', href: '/blood-sugar' },
    { head: 'マグネシウム', body: '神経の興奮を鎮め、リラックス側を支える“静けさのミネラル”。', href: '/nutrients/magnesium' },
    { head: '睡眠と朝の光', body: '感受性が高いほど睡眠負債の影響は大きい。就寝・起床を一定に、朝は光を浴びる。', href: '/sleep' },
];

const relNutrients = [
    { slug: 'magnesium', why: '神経の興奮を鎮め、過覚醒を和らげる' },
    { slug: 'b6', why: 'GABA・セロトニンなど“落ち着き”の神経伝達物質の合成に必須' },
    { slug: 'omega3', why: '自律神経のバランス・HRV・神経炎症に好影響' },
    { slug: 'tryptophan', why: 'セロトニン→メラトニンの材料。安定と睡眠の土台' },
];
const relGenes = [
    { slug: 'comt', why: 'ドーパミン・アドレナリンの分解速度を決める。“worrier/warrior”の分岐点' },
    { slug: 'maoa', why: 'モノアミンの分解を介して気分・覚醒・刺激耐性に影響' },
    { slug: 'dao', why: 'ヒスタミンの分解酵素。食品・環境への身体的な“過敏さ”の鍵' },
];

export default function HSPPage() {
    const nutrients = relNutrients.map((c) => ({ ...c, n: getNutrientBySlug(c.slug) })).filter((c) => c.n);
    const genes = relGenes.map((c) => ({ ...c, g: getGeneBySlug(c.slug) })).filter((c) => c.g);

    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#EFEAF6' }}>
            <img loading="lazy" decoding="async" src="/images/for-you/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block"
                style={{ top: '0', right: '-40px', width: '260px', transform: 'scaleY(-1)' }} />
            <img loading="lazy" decoding="async" src="/images/misc/24.png" alt="" className="absolute pointer-events-none"
                style={{ bottom: '-40px', left: '-40px', width: '260px' }} />

            <JsonLd data={medicalWebPage({ name: 'HSP（繊細さん）と体・遺伝子', description: 'HSPを、歴史・感覚処理感受性・遺伝子・自律神経とATPの視点から中立に整理。', path: '/hsp' })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: '心とからだ', path: '/library#mind' }, { name: 'HSP（繊細さん）', path: '/hsp' }])} />
            <article className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '心とからだ', href: '/library#mind' }, { name: 'HSP（繊細さん）' }]} />
                <header className="mb-12 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>
                        HIGHLY SENSITIVE PERSON
                    </p>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        HSP &amp; the Body
                        <span className="block text-base md:text-lg mt-2 text-[#1A1A1A]/70" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>HSP（繊細さん）を、遺伝子と体から読み解く</span>
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-relaxed max-w-[600px] mx-auto">
                        「敏感さ」は性格の話で終わりません。HSPは診断名ではなく“気質”の呼び名。そして敏感さの一部は、生まれつきの気質ではなく<strong>今の体の状態</strong>で説明できます。気質と状態を切り分けます。
                    </p>
                </header>

                {/* とは */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">HSP（繊細さん）とは</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        HSP（Highly Sensitive Person）は、心理学者<strong>エレイン・アーロン</strong>が1996年に提唱した概念で、その中核にある特性を<strong>感覚処理感受性（SPS：Sensory Processing Sensitivity）</strong>と呼びます。刺激を深く処理し、強く反応しやすい神経系の“設定”のことです。
                        {'\n\n'}
                        重要なのは、<strong>HSPは病気でも障害でも診断名でもない</strong>ということ。人口のおよそ15〜20%に見られる、生物界に広く存在する<strong>気質のバリエーション</strong>とされます（同じ傾向はハエから霊長類まで確認されています）。「敏感な個体」と「鈍感な個体」が一定割合で共存するのは、環境が変わったときに生き残る集団の戦略だと考えられています。
                        {'\n\n'}
                        日本では2018年の書籍『「気がつきすぎて疲れる」が驚くほどなくなる “繊細さん”の本』（武田友紀）を機に<strong>「繊細さん」</strong>として一気に広まりました。ただ、言葉が広まる過程で「敏感＝生まれつき変えられない性質」という受け取られ方も強まりました。ここを、生理学から問い直します。
                    </p>
                </section>

                {/* DOES */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#41C9B4] pl-3 leading-tight">4つの柱「DOES」</h2>
                    <p className="text-sm text-[#4A4A4A] leading-relaxed mb-4">アーロンはHSPの特徴を、頭文字をとって「DOES」の4つで整理しました。1つでも欠ければHSPとは言えない、とされます。</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {does.map((d) => (
                            <div key={d.key} className="bg-white/70 rounded-xl p-5 border border-black">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#41C9B4] text-white text-sm font-bold flex items-center justify-center" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{d.key}</span>
                                    <span className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/40" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{d.en}</span>
                                </div>
                                <div className="font-bold text-[#1A1A1A] mb-1">{d.title}</div>
                                <p className="text-xs text-[#4A4A4A] leading-snug">{d.note}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* EVIDENCE：感受性は本当にある */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <div className="inline-block text-[10px] font-bold tracking-widest text-white bg-[#41C9B4] rounded-full px-3 py-1 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>EVIDENCE ／ 比較的確かなこと</div>
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 leading-tight">感受性は“実在する”、そして遺伝する</h2>
                    <p className="text-[#4A4A4A] leading-loose">
                        SPS（感覚処理感受性）は、質問紙だけの主観ではありません。<strong>fMRI研究</strong>では、感受性の高い人ほど、共感・気づき・深い情報処理に関わる脳領域（島皮質・前帯状皮質・ミラーニューロン系）の活動が強いことが繰り返し報告されています。
                        {'\n\n'}
                        双子研究から、この感受性の<strong>遺伝率はおよそ半分（約47%）</strong>と推定されています。つまり半分は生まれつき、残り半分は環境・経験で形づくられる——<strong>気質は土台であって、運命ではない</strong>ということです。ここがMitoflow40の立ち位置の核になります。
                    </p>
                </section>

                {/* 遺伝子 深掘り */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#41C9B4] pl-3 leading-tight">敏感さに関わる遺伝子</h2>
                    <p className="text-sm text-[#4A4A4A] leading-relaxed mb-5">
                        感受性は「1つの遺伝子」では決まりません。神経伝達物質を<strong>作る・運ぶ・分解する</strong>複数の遺伝子の“合わせ技”です。代表的なものを見ていきます。
                    </p>

                    <div className="space-y-4">
                        {/* COMT */}
                        <div className="bg-white/70 rounded-xl p-5 border border-black">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="px-3 py-1 rounded-lg text-sm font-bold text-[#1A1A1A] bg-[#EAD9F5]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>COMT</span>
                                <span className="text-sm font-bold text-[#1A1A1A]">worrier（心配性）か warrior（戦士）か</span>
                            </div>
                            <p className="text-sm text-[#4A4A4A] leading-loose">
                                COMTは、ドーパミンやアドレナリンなどの<strong>カテコールアミンを分解する酵素</strong>。Val158Metという多型で分解速度が変わります。<strong>Met/Met型（遅い分解＝worrier）</strong>は前頭前野のドーパミンが高く保たれ、集中力・記憶に有利な反面、ストレス下で不安・過覚醒に振れやすい。<strong>Val/Val型（速い分解＝warrior）</strong>はストレス耐性が高い一方、平常時の認知パフォーマンスはやや不利、とされます。HSPの「刺激で消耗しやすい」感覚と、最も結びつきやすい遺伝子です。
                            </p>
                            <Link href="/genes/comt" className="inline-block mt-2 text-xs font-bold text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">COMTの詳細 →</Link>
                        </div>

                        {/* 5-HTTLPR */}
                        <div className="bg-white/70 rounded-xl p-5 border border-black">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="px-3 py-1 rounded-lg text-sm font-bold text-[#1A1A1A] bg-[#EAD9F5]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>5-HTTLPR</span>
                                <span className="text-sm font-bold text-[#1A1A1A]">セロトニン運搬遺伝子と「感受性＝両刃の剣」</span>
                            </div>
                            <p className="text-sm text-[#4A4A4A] leading-loose">
                                セロトニントランスポーター遺伝子（SLC6A4）のプロモーター領域にある多型。<strong>short（S）型</strong>はかつて「うつになりやすい脆弱性遺伝子」と呼ばれました。しかし研究が進むと像が変わります——S型の人は<strong>悪い環境ではより落ち込みやすいが、良い環境ではより強く恩恵を受ける</strong>。ネガティブにもポジティブにも“反応しやすい”のです（後述の差次感受性）。
                            </p>
                        </div>

                        {/* BDNF */}
                        <div className="bg-white/70 rounded-xl p-5 border border-black">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="px-3 py-1 rounded-lg text-sm font-bold text-[#1A1A1A] bg-[#EAD9F5]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>BDNF</span>
                                <span className="text-sm font-bold text-[#1A1A1A]">脳の可塑性と環境への感じやすさ</span>
                            </div>
                            <p className="text-sm text-[#4A4A4A] leading-loose">
                                脳由来神経栄養因子。神経の成長・可塑性を支えます。<strong>Val66Met</strong>多型はストレス応答や気分の安定性に関わり、SPSや環境感受性との関連が報告されています。運動・睡眠・栄養でBDNFを高められる点は、「気質は土台、状態は動かせる」を裏づける好例です。
                            </p>
                        </div>

                        {/* MAOA / DAO 補足 */}
                        <div className="bg-white/70 rounded-xl p-5 border border-black">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="px-3 py-1 rounded-lg text-sm font-bold text-[#1A1A1A] bg-[#EAD9F5]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>MAOA / DAO</span>
                                <span className="text-sm font-bold text-[#1A1A1A]">“分解が追いつかない”敏感さ</span>
                            </div>
                            <p className="text-sm text-[#4A4A4A] leading-loose">
                                <strong>MAOA</strong>はモノアミン（セロトニン・ドーパミン・ノルアドレナリン）を分解する酵素。働きが弱いと神経伝達物質が過剰に残り、覚醒・気分の振れに関わります。<strong>DAO</strong>は<strong>ヒスタミンの分解酵素</strong>——ここが弱いと、発酵food・赤ワイン・熟成チーズなどで頭痛・紅潮・不安といった“身体的な過敏さ”が出やすくなります。「メンタルの敏感さ」だと思っていたものが、実はヒスタミン処理の問題だった、というケースは少なくありません。
                            </p>
                            <div className="flex gap-3 mt-2">
                                <Link href="/genes/maoa" className="text-xs font-bold text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">MAOA →</Link>
                                <Link href="/genes/dao" className="text-xs font-bold text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">DAO →</Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* NEUTRAL：差次感受性 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <div className="inline-block text-[10px] font-bold tracking-widest text-[#1A1A1A] bg-[#FFD37A] rounded-full px-3 py-1 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>NEUTRAL ／ 解釈は発展途上</div>
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 leading-tight">「弱さ」ではなく「反応しやすさ」——差次感受性</h2>
                    <p className="text-[#4A4A4A] leading-loose">
                        近年の有力な考え方が<strong>差次感受性（Differential Susceptibility）</strong>です。感受性の高い遺伝的タイプは、単に「傷つきやすい」のではなく、<strong>環境の良し悪しの両方を、人より強く受け取る</strong>。逆境では最も打撃を受けるが、支援的な環境では最も伸びる——同じ人が、環境しだいで最悪にも最良にもなりうる、という見方です（打たれ強い“タンポポ”と、環境しだいで最も美しく咲く“蘭（らん）”のたとえで語られます）。
                        {'\n\n'}
                        これはまだ<strong>解釈が確定した理論ではなく</strong>、遺伝子×環境研究には再現性の議論も残ります。ただ、実務的な含意は明確です。HSPにとって最優先は「敏感さを鈍らせること」ではなく、<strong>反応する“環境と体の状態”を整えること</strong>。同じ感受性が、消耗の源にも、強みにもなります。
                    </p>
                </section>

                {/* 気質 vs 状態 */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#41C9B4] pl-3 leading-tight">その敏感さは「気質」か「状態」か</h2>
                    <p className="text-sm text-[#4A4A4A] leading-relaxed mb-5">
                        Mitoflow40の視点はここです。「繊細だから疲れる」の何割かは、<strong>エネルギー（ATP）を作って使う力が落ち、神経が“過敏モード”に傾いている状態</strong>で説明できます。気質は変えられなくても、<strong>状態は整えられます</strong>。左の“表面”を、右の“体の本体”に翻訳してみてください。
                    </p>
                    <div className="space-y-3">
                        {traitVsState.map((t) => (
                            <Link key={t.surface} href={t.href}
                                className="flex items-center gap-3 bg-white/70 rounded-xl p-4 border border-[#1A1A1A]/15 hover:border-[#1A1A1A] hover:-translate-y-0.5 hover:shadow-sm transition-all">
                                <span className="flex-1 text-sm font-bold text-[#1A1A1A] leading-snug">{t.surface}</span>
                                <span className="text-[#FF9855] font-bold flex-shrink-0">→</span>
                                <span className="flex-1 text-xs text-[#4A4A4A] leading-snug">{t.body}</span>
                            </Link>
                        ))}
                    </div>
                    <p className="text-xs text-[#4A4A4A]/70 leading-relaxed mt-4 px-1">
                        HRV（心拍変動）はこの“状態”を数値で映す指標。Apple Watchなどで測れば、睡眠・飲酒・ストレスが自分の神経系にどう響いたかが見えてきます。
                    </p>
                </section>

                {/* 暮らしで整える */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#41C9B4] pl-3 leading-tight">暮らしで整える</h2>
                    <div className="space-y-3 mt-5">
                        {habits.map((h, i) => (
                            <div key={h.head} className="flex items-start gap-4 bg-white/70 rounded-xl p-4 border border-[#1A1A1A]/15">
                                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#41C9B4] text-white text-sm font-bold flex items-center justify-center" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{i + 1}</span>
                                <div>
                                    <div className="font-bold text-[#1A1A1A] mb-0.5">
                                        {h.href ? (
                                            <Link href={h.href} className="underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">{h.head}</Link>
                                        ) : h.head}
                                    </div>
                                    <p className="text-sm text-[#4A4A4A] leading-snug">{h.body}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 関わる栄養素・遺伝子 */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">HSPに関わる栄養素・遺伝子</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {nutrients.map(({ slug, why, n }) => (
                            <Link key={slug} href={`/nutrients/${slug}`}
                                className="flex items-start gap-3 p-3 rounded-xl border border-[#1A1A1A]/20 hover:border-[#1A1A1A] hover:-translate-y-0.5 hover:shadow-sm transition-all bg-white/70">
                                <span className="flex-shrink-0 px-3 py-1 rounded-lg text-sm font-bold text-[#1A1A1A]" style={{ background: n!.color }}>{n!.name}</span>
                                <span className="text-xs text-[#4A4A4A] leading-snug">{why}</span>
                            </Link>
                        ))}
                        {genes.map(({ slug, why, g }) => (
                            <Link key={slug} href={`/genes/${slug}`}
                                className="flex items-start gap-3 p-3 rounded-xl border border-[#1A1A1A]/20 hover:border-[#1A1A1A] hover:-translate-y-0.5 hover:shadow-sm transition-all bg-white/70">
                                <span className="flex-shrink-0 px-3 py-1 rounded-lg text-sm font-bold text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif", background: g!.color }}>{g!.symbol}</span>
                                <span className="text-xs text-[#4A4A4A] leading-snug">{why}</span>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* 立場 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">Mitoflow40の立場</h2>
                    <p className="text-[#4A4A4A] leading-loose">
                        HSPは、自分を理解する<strong>便利なレンズ</strong>です。一方で、生きづらさのすべてを「繊細だから」で片づけると、整えられるはずの<strong>体の状態</strong>を見落とします。うつ・不安障害・発達特性・甲状腺や貧血・自律神経の乱れなどは、HSPと似た体感を生みますが、<strong>対処法はまったく違います</strong>。
                        {'\n\n'}
                        つらさが日常生活に支障をきたすなら、<strong>必要な医療を遠ざけないでください</strong>。「繊細さん向け」を謳う<strong>高額な講座やサプリには慎重に</strong>。そして、あなたの敏感さをどう扱うかを決める<strong>主役は、あなた自身</strong>です。遺伝子も検査も、その判断を助ける材料にすぎません。
                    </p>
                </section>

                <p className="text-xs text-[#4A4A4A]/60 leading-relaxed mb-12 p-4 bg-white/60 rounded-lg">
                    ※ 本ページは一般的な解説であり、診断・治療を目的とするものではありません。HSPは医学的診断名ではありません。遺伝子多型と気質・行動の関連は確率的な傾向であり、単一の遺伝子が個人を決めるものではありません。
                </p>

                <div className="text-center flex flex-wrap justify-center gap-3">
                    <Link href="/library#mind" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">
                        心とからだ に戻る
                    </Link>
                    <Link href="/library" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">
                        ← Library に戻る
                    </Link>
                </div>
            </article>
        </div>
    );
}
