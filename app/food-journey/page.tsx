import Link from 'next/link';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: '食べてから、動くまで｜体の中で起きていること（消化・吸収・代謝の全体像） | Mitoflow40',
    description: '食事から始まり、消化・吸収・運搬・代謝・利用・排出へ——私たちの体が「食べたもの」をどうエネルギーや材料に変え、活動しているのかを、生化学ベースでインフォグラフィックとともに客観的に俯瞰します。三大栄養素が体内でたどる道のりを一枚の地図に。',
    alternates: { canonical: 'https://mitoflow40.com/food-journey' },
    openGraph: {
        title: '食べてから、動くまで｜体の中で起きていること | Mitoflow40',
        description: '消化・吸収・運搬・代謝・利用・排出。食べたものが活動になるまでの全体像を、生化学ベースの地図で俯瞰。',
        url: 'https://mitoflow40.com/food-journey',
        type: 'article',
    },
};

// 食べてから活動するまでの7ステージ
const stages = [
    {
        en: 'INTAKE',
        name: '食べる（摂取）',
        color: '#FF9855',
        body: '口から入るのは、おもに三大栄養素（糖質・たんぱく質・脂質）と、その働きを支えるビタミン・ミネラル・水。ここがすべての出発点です。',
        detail: 'まだ大きな分子のまま。このままでは体は使えません。',
    },
    {
        en: 'DIGESTION',
        name: '消化',
        color: '#F0B429',
        body: '口・胃・小腸を通るあいだに、消化酵素が大きな分子をハサミのように小さく切り分けます。糖質→ブドウ糖、たんぱく質→アミノ酸、脂質→脂肪酸＋グリセロール。',
        detail: '胃は強い酸性で殺菌と分解。主役は小腸とすい臓の酵素。',
        link: { href: '/digestion', label: '消化・吸収を深く' },
    },
    {
        en: 'ABSORPTION',
        name: '吸収',
        color: '#41C9B4',
        body: '小さくなった栄養素は、小腸の壁にびっしり生えた絨毛（じゅうもう）から体の中へ。糖・アミノ酸は血液へ、脂質はリンパを経て血液へ入ります。',
        detail: '「食べた」と「吸収できた」は別の話。腸の状態がここを左右します。',
        link: { href: '/gut-health', label: '腸内環境' },
    },
    {
        en: 'TRANSPORT',
        name: '運搬・分配',
        color: '#2BB3C0',
        body: '吸収された栄養素は、まず肝臓という"中継基地"へ。肝臓が貯める・作りかえる・送り出すを調整し、血流に乗って全身37兆個の細胞へ届けられます。',
        detail: '血糖やコレステロールの調整も、この段階で肝臓が担います。',
        link: { href: '/organs/liver', label: '肝臓の働き' },
    },
    {
        en: 'METABOLISM',
        name: '代謝（エネルギーを生む）',
        color: '#41C9B4',
        body: '細胞に届いた栄養素は、ミトコンドリアで燃やされ、エネルギー通貨ATPになります。解糖系 → TCA回路 → 電子伝達系という3段リレー。これが「代謝」の中心です。',
        detail: '同時に、壊す（異化）と作る（同化）が絶えず進んでいます。',
        link: { href: '/energy', label: 'エネルギー産生' },
    },
    {
        en: 'USE',
        name: '利用（活動する）',
        color: '#FF9855',
        body: 'できたATPで、私たちは動き・考え・体温を保ち・体を作りかえます。筋肉の収縮、脳の情報処理、ホルモンや酵素の合成、傷の修復——すべてATPが動かしています。',
        detail: 'ここが「活動している」という実感の正体です。',
        link: { href: '/atp', label: 'ATPとは' },
    },
    {
        en: 'ELIMINATION',
        name: '排出',
        color: '#9CA3AF',
        body: '使い終わった後に出る不要物は、外へ。二酸化炭素は肺から息で、水溶性の老廃物は腎臓から尿で、消化しきれなかったものは便で排出されます。',
        detail: '「入れる」と同じくらい「出す」が回って、はじめて巡ります。',
        link: { href: '/detox', label: 'デトックス（解毒・排出）' },
    },
];

// 各段階でつまずくと起きる不調・病気
const troubles = [
    {
        stage: '食べる',
        en: 'INTAKE',
        color: '#FF9855',
        cause: '超加工食品中心・栄養の偏り・食べ過ぎ／早食い・極端な食事制限',
        result: '必要な栄養素の不足、血糖の乱高下、肥満や"隠れ栄養失調"。ここで入る材料の質が、あとに続くすべての段階を左右します。',
        signs: ['甘いものがやめられない', '食後すぐ眠い・だるい', '食べているのに痩せない／力が出ない'],
        step: 'まず「何を減らすか」より「たんぱく質・野菜を先に」。血糖の波をゆるめる食べ方から。',
        links: [{ href: '/blood-sugar', label: '血糖コントロール' }, { href: '/foods', label: '食べ物' }],
    },
    {
        stage: '消化',
        en: 'DIGESTION',
        color: '#F0B429',
        cause: '胃酸・消化酵素の不足、早食い・噛まない、ストレスや加齢による消化力の低下',
        result: '胃もたれ・膨満感・ガス。分解しきれない食べ物は吸収されないだけでなく、腸内で異常発酵し、腸にも負担をかけます。',
        signs: ['食後に胃が重い・張る', 'げっぷ・おなら・ガスが多い', '便に未消化のものが混じる'],
        step: 'よく噛む・食事中の水分とりすぎを避ける・リラックスして食べる。消化は"副交感神経の仕事"。',
        links: [{ href: '/digestion', label: '消化・吸収' }, { href: '/enzymes', label: '酵素' }],
    },
    {
        stage: '吸収',
        en: 'ABSORPTION',
        color: '#41C9B4',
        cause: '腸内環境（腸内細菌）の乱れ、腸粘膜の炎症やバリア低下（いわゆる腸もれ）、菌の多様性の低下',
        result: '「食べているのに足りない」栄養不足。腸の炎症は全身に波及し、肌・気分・免疫・アレルギーなど、一見無関係な不調の火種にもなります。',
        signs: ['便秘・下痢を繰り返す', '肌荒れ・原因不明の不調', '食後の不快感・特定の食材で調子を崩す'],
        step: '食物繊維・発酵食品で菌を育て、腸を荒らすもの（過剰な糖・アルコール・刺激物）を減らす。',
        links: [{ href: '/gut-health', label: '腸内環境' }, { href: '/microbiome', label: '腸内フローラ' }],
    },
    {
        stage: '運搬',
        en: 'TRANSPORT',
        color: '#2BB3C0',
        cause: '肝機能の低下（脂肪肝など）、脂質異常、血流・血管の障害、貧血（運ぶ赤血球の問題）',
        result: '脂肪肝、コレステロール・中性脂肪の乱れ、動脈硬化。栄養や酸素が細胞まで届きにくくなり、全身の"燃料切れ"が起こります。',
        signs: ['健診で肝臓・脂質の数値が気になる', '手足の冷え・めぐりの悪さ', '立ちくらみ・息切れ（貧血傾向）'],
        step: '肝臓をいたわる（アルコール・果糖・食べ過ぎを控える）、鉄や血流を意識する。',
        links: [{ href: '/organs/liver', label: '肝臓' }, { href: '/biomarkers', label: '血液検査の見方' }],
    },
    {
        stage: '代謝',
        en: 'METABOLISM',
        color: '#41C9B4',
        cause: 'ミトコンドリア機能の低下、補酵素（ビタミンB群・鉄・マグネシウムなど）の不足、インスリン抵抗性',
        result: '慢性疲労、代謝の硬直（糖しか使えない体）、高血糖。エネルギーを作る中心がつまずくため、影響がいちばん大きく、全身に及ぶ段階です。',
        signs: ['寝ても疲れがとれない', '午後にガクッとエネルギーが落ちる', '体が冷える・代謝が落ちた感じ'],
        step: '材料（補酵素となる栄養素）を満たし、ミトコンドリアを刺激する（運動・空腹の時間・睡眠）。',
        links: [{ href: '/mitochondria', label: 'ミトコンドリア' }, { href: '/energy', label: 'エネルギー産生' }],
    },
    {
        stage: '利用',
        en: 'USE',
        color: '#FF9855',
        cause: '運動不足（使わない）／酷使と回復不足（使いすぎ）、慢性ストレス、過剰な活性酸素',
        result: '筋肉の減少（サルコペニア）、酸化ストレスによる細胞・血管のダメージ、回復力の低下。「使う」と「休む」のバランスが崩れた状態。',
        signs: ['筋力・スタミナの低下', '疲れが抜けず回復が遅い', '気力がわかない・睡眠の質が落ちた'],
        step: '動かす日と休む日のメリハリ。抗酸化（色の濃い野菜）と、回復の土台になる睡眠を確保。',
        links: [{ href: '/exercise', label: '運動' }, { href: '/oxidative-stress', label: '酸化ストレス' }],
    },
    {
        stage: '排出',
        en: 'ELIMINATION',
        color: '#9CA3AF',
        cause: '解毒・排泄の滞り（便秘・腎機能の低下・発汗不足・水分不足）',
        result: '老廃物の停滞、むくみ、肌の不調。「入れる」ばかりで「出す」が回らないと、体内の巡りが悪くなり、ほかの段階の負担も増えます。',
        signs: ['便秘がち・お腹が張る', 'むくみやすい', '肌のくすみ・吹き出物'],
        step: '水分・食物繊維・適度な運動・汗をかく習慣。「出す」リズムを整える。',
        links: [{ href: '/detox', label: 'デトックス' }, { href: '/reduce-toxins', label: '有害物質を減らす' }],
    },
];

// 三大栄養素が体内でたどる道
const macros = [
    {
        name: '糖質',
        en: 'CARBS',
        color: '#FBEFD2',
        bar: '#F0B429',
        digest: 'ブドウ糖',
        fate: 'すぐ使えるエネルギー源。解糖系→TCA→ATPへ。余れば肝臓・筋肉にグリコーゲンとして貯蔵、さらに余れば脂肪に。',
    },
    {
        name: 'たんぱく質',
        en: 'PROTEIN',
        color: '#FFE3E0',
        bar: '#F08C8C',
        digest: 'アミノ酸',
        fate: 'おもに「体づくり」の材料。筋肉・酵素・ホルモン・免疫物質に。エネルギーが足りなければ燃料にもなる。',
    },
    {
        name: '脂質',
        en: 'FAT',
        color: '#DDEBF7',
        bar: '#5BA4D6',
        digest: '脂肪酸＋グリセロール',
        fate: '強力なエネルギー源（β酸化→TCA）。細胞膜やホルモンの材料にも。貯蔵にも適した、量の多い燃料タンク。',
    },
];

export default function FoodJourneyPage() {
    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#EAF1E0' }}>
            <img loading="lazy" decoding="async" src="/images/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block"
                style={{ top: '0', right: '-40px', width: '260px', transform: 'scaleY(-1)' }} />
            <img loading="lazy" decoding="async" src="/images/24.png" alt="" className="absolute pointer-events-none"
                style={{ bottom: '-40px', left: '-40px', width: '260px' }} />

            <JsonLd data={medicalWebPage({ name: '食べてから、動くまで｜体の中で起きていること', description: '消化・吸収・運搬・代謝・利用・排出。食べたものが活動になるまでの全体像を、生化学ベースの地図で俯瞰。', path: '/food-journey' })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: '身体の仕組み', path: '/library#mechanism' }, { name: '食べてから、動くまで', path: '/food-journey' }])} />

            <article className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '身体の仕組み', href: '/library#mechanism' }, { name: '食べてから、動くまで' }]} />
                <header className="mb-12 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>THE BIG PICTURE</p>
                    <h1 className="text-3xl md:text-5xl font-bold mt-6 mb-8 md:mt-8 md:mb-10 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        食べてから、動くまで
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-loose max-w-[640px] mx-auto text-left">
                        一口の食事は、体の中でいくつもの段階を経て、あなたの「活動」になります。<strong>食べる → 消化 → 吸収 → 運搬 → 代謝 → 利用 → 排出</strong>。この一本の流れを生化学ベースで俯瞰すると、バラバラに見えていた健康の話が、ひとつの地図の上につながります。
                    </p>
                </header>

                {/* メイン・インフォグラフィック：7ステージのタイムライン */}
                <section className="mb-12">
                    <div className="bg-white/70 rounded-2xl p-5 md:p-8 border border-black">
                        <div className="text-center mb-7">
                            <div className="text-[10px] font-bold tracking-widest text-[#FF9855] mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>THE JOURNEY</div>
                            <h2 className="text-xl md:text-2xl font-bold text-[#1A1A1A]">体の中で起きていること</h2>
                        </div>

                        <ol className="relative">
                            {/* 縦のレール */}
                            <span className="absolute left-[19px] md:left-[23px] top-2 bottom-2 w-[2px] bg-[#1A1A1A]/15" aria-hidden />
                            {stages.map((s, i) => (
                                <li key={s.en} className="relative flex gap-4 md:gap-5 pb-6 last:pb-0">
                                    {/* 番号ノード */}
                                    <div className="relative shrink-0">
                                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold text-white border-2 border-white shadow"
                                            style={{ background: s.color, fontFamily: "'Space Grotesk', sans-serif" }}>
                                            {i + 1}
                                        </div>
                                    </div>
                                    {/* 中身 */}
                                    <div className="flex-1 pb-1">
                                        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0 mb-1">
                                            <span className="text-[10px] font-bold tracking-widest" style={{ fontFamily: "'Space Grotesk', sans-serif", color: s.color }}>{s.en}</span>
                                            <h3 className="text-base md:text-lg font-bold text-[#1A1A1A]">{s.name}</h3>
                                        </div>
                                        <p className="text-sm text-[#4A4A4A] leading-relaxed">{s.body}</p>
                                        <p className="text-xs text-[#1A1A1A]/55 mt-1 leading-relaxed">{s.detail}</p>
                                        {s.link && (
                                            <Link href={s.link.href}
                                                className="inline-block mt-2 text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">
                                                {s.link.label} →
                                            </Link>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </div>
                </section>

                {/* 三大栄養素が体内でたどる道 */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#FF9855] pl-3 leading-tight">三大栄養素は、何になるのか</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">同じ「食べ物」でも、糖質・たんぱく質・脂質では、体内でたどる道も役割も違います。</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {macros.map((m) => (
                            <div key={m.en} className="rounded-2xl border border-black overflow-hidden flex flex-col" style={{ background: m.color }}>
                                <div className="px-5 pt-5 pb-3">
                                    <div className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/50 mb-0.5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{m.en}</div>
                                    <div className="text-lg font-bold text-[#1A1A1A]">{m.name}</div>
                                </div>
                                {/* 変換フロー */}
                                <div className="px-5">
                                    <div className="flex items-center gap-2 text-xs font-bold text-[#1A1A1A]/70">
                                        <span>消化で</span>
                                        <span className="flex-1 h-[2px] rounded" style={{ background: m.bar }} />
                                        <span>▶</span>
                                    </div>
                                    <div className="mt-1 inline-block rounded-lg px-3 py-1.5 bg-white border border-[#1A1A1A]/15 text-sm font-bold text-[#1A1A1A]">
                                        {m.digest}
                                    </div>
                                </div>
                                <div className="px-5 pt-3 pb-5 mt-1">
                                    <div className="text-[11px] font-bold text-[#1A1A1A]/45 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>→ 細胞での運命</div>
                                    <p className="text-sm text-[#4A4A4A] leading-snug">{m.fate}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-[#1A1A1A]/55 mt-3 leading-relaxed">
                        ※ 3つの道は最終的にミトコンドリアの<Link href="/tca-cycle" className="underline decoration-[#41C9B4] decoration-2 underline-offset-2 font-bold hover:text-[#41C9B4]">TCA回路</Link>で合流し、エネルギー（ATP）へとつながります。
                    </p>
                </section>

                {/* 客観的に見る意味 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">流れで見ると、不調の場所が見える</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        この一連の流れを地図として持っておくと、自分の不調を<strong>「どの段階の問題か」</strong>で捉え直せます。
                        {'\n\n'}
                        食べても元気が出ないとき、原因は<strong>消化</strong>（うまく分解できていない）かもしれないし、<strong>吸収</strong>（腸の状態）、<strong>運搬</strong>（血流・肝臓）、あるいは<strong>代謝</strong>（ミトコンドリアや補酵素となる栄養素の不足）かもしれません。同じ「疲れ」でも、つまずいている段階が違えば、打ち手も変わります。
                        {'\n\n'}
                        だからこそ、症状を点で追うより、<strong>流れ全体を客観的に眺める視点</strong>が役に立つのです。
                    </p>
                </section>

                {/* どこでつまずくと、何が起きるか */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#FF9855] pl-3 leading-tight">どこでつまずくと、何が起きるか</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">不調や病気は、多くの場合この流れの<strong>どこかの段階の停滞</strong>から始まります。段階ごとに、よくある「つまずき」「起こりうること」、気づきの手がかりになる「体感サイン」、そして「整える一歩」を並べます。<span className="text-[#1A1A1A]/55">自分はどこでつまずいていそうか、当てはめながら読んでみてください。</span></p>
                    <div className="space-y-4">
                        {troubles.map((t, i) => (
                            <div key={t.stage} className="rounded-2xl border border-black overflow-hidden bg-white/70">
                                {/* ヘッダー帯 */}
                                <div className="flex items-center gap-3 px-4 md:px-5 py-3" style={{ background: `${t.color}22` }}>
                                    <div className="w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center font-bold text-white border-2 border-white shadow shrink-0"
                                        style={{ background: t.color, fontFamily: "'Space Grotesk', sans-serif" }}>
                                        {i + 1}
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-bold tracking-widest leading-none" style={{ fontFamily: "'Space Grotesk', sans-serif", color: t.color }}>{t.en}</div>
                                        <div className="text-base md:text-lg font-bold text-[#1A1A1A] leading-tight">{t.stage}</div>
                                    </div>
                                </div>
                                {/* 本文 */}
                                <div className="px-4 md:px-5 py-4 space-y-2.5">
                                    <p className="text-sm text-[#1A1A1A]/85 leading-relaxed">
                                        <span className="font-bold" style={{ color: t.color }}>つまずき：</span>{t.cause}
                                    </p>
                                    <p className="text-sm text-[#4A4A4A] leading-relaxed">
                                        <span className="font-bold text-[#1A1A1A]/70">起こりうること：</span>{t.result}
                                    </p>
                                    {/* 体感サイン */}
                                    <div className="rounded-xl bg-[#FFF1DF]/70 border border-[#1A1A1A]/10 p-3">
                                        <div className="text-[11px] font-bold text-[#1A1A1A]/55 mb-1.5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>こんなサインが出やすい</div>
                                        <div className="flex flex-wrap gap-1.5">
                                            {t.signs.map((sg) => (
                                                <span key={sg} className="text-xs px-2.5 py-1 rounded-full bg-white border border-[#1A1A1A]/15 text-[#4A4A4A]">{sg}</span>
                                            ))}
                                        </div>
                                    </div>
                                    {/* 整える一歩 */}
                                    <div className="flex items-start gap-2 pt-0.5">
                                        <span className="shrink-0 mt-0.5 text-xs font-bold px-2 py-0.5 rounded-full text-white" style={{ background: '#41C9B4', fontFamily: "'Space Grotesk', sans-serif" }}>STEP</span>
                                        <p className="text-sm text-[#1A1A1A] font-medium leading-relaxed">{t.step}</p>
                                    </div>
                                    <div className="flex flex-wrap gap-2 pt-0.5">
                                        {t.links.map((l) => (
                                            <Link key={l.href} href={l.href}
                                                className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">
                                                {l.label} →
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-[#1A1A1A]/55 mt-4 leading-relaxed">
                        ※ サインは目安であり、原因の特定や診断ではありません。複数の段階が同時に関わることも多く、気になる症状が続く場合は医療機関にご相談ください。
                    </p>
                </section>

                {/* 共通の根：酸化・糖化・炎症 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">多くの不調は、3つの共通の根につながる</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        段階ごとのつまずきは、ばらばらに見えて、じつは<strong>共通の出口</strong>を持っています。それが「<strong>さびる（酸化）</strong>」「<strong>こげる（糖化）</strong>」「<strong>くすぶる（慢性炎症）</strong>」の3つ。どの段階の停滞も、最終的にこのダメージを増やし、互いを加速させます。
                        {'\n\n'}
                        現代病——生活習慣病・慢性疲労・血管の老化などの多くは、ここに根を持っています。逆に言えば、<strong>流れのどこかを整えることは、この共通の根を減らすこと</strong>でもあります。だから「一つの特効薬」より、<strong>流れ全体をなだらかに保つ</strong>視点が効いてくるのです。
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                        <Link href="/oxidative-stress" className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">酸化（酸化ストレス）</Link>
                        <Link href="/glycation" className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">糖化</Link>
                        <Link href="/inflammation" className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">慢性炎症</Link>
                        <Link href="/modern-diseases" className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">現代病とは</Link>
                        <Link href="/blood-sugar" className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">血糖コントロール</Link>
                    </div>
                </section>

                {/* 各段階を深く */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 text-center">各段階を、もっと深く</h2>
                    <div className="flex flex-wrap justify-center gap-2">
                        {[
                            { href: '/molecular-nutrition#biochemistry', label: '生化学とは' },
                            { href: '/digestion', label: '消化・吸収' },
                            { href: '/mitochondria', label: 'ミトコンドリア' },
                            { href: '/energy', label: 'エネルギー' },
                            { href: '/glycolysis', label: '解糖系' },
                            { href: '/tca-cycle', label: 'TCA回路' },
                            { href: '/electron-transport-chain', label: '電子伝達系' },
                            { href: '/atp', label: 'ATP' },
                            { href: '/enzymes', label: '酵素' },
                            { href: '/nutrients', label: '栄養素（補酵素）' },
                        ].map((l) => (
                            <Link key={l.href} href={l.href}
                                className="px-4 py-2 rounded-full bg-white border border-[#1A1A1A] text-sm font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white transition-colors">
                                {l.label} →
                            </Link>
                        ))}
                    </div>
                </section>

                {/* 免責 */}
                <p className="text-xs text-[#4A4A4A]/70 leading-relaxed mb-8 p-4 bg-white/60 rounded-lg border border-[#1A1A1A]/10">
                    ※ 本記事は体の仕組みを大づかみに理解するための一般的な解説であり、個々の反応を簡略化しています。診断・治療を目的とするものではありません。気になる不調が続く場合は医療機関にご相談ください。
                </p>

                {/* 参照 */}
                <section className="mb-10">
                    <h2 className="text-lg font-bold text-[#1A1A1A] mb-3 border-l-4 border-[#41C9B4] pl-3 leading-tight">このページの参照</h2>
                    <ul className="bg-white/70 rounded-2xl p-5 md:p-6 border border-black space-y-3 text-sm">
                        <li>
                            <a href="https://www.niddk.nih.gov/health-information/digestive-diseases/digestive-system-how-it-works" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                Your Digestive System & How It Works（消化・吸収の流れ）
                            </a>
                            <span className="text-[#1A1A1A]/50"> — NIDDK（米国国立衛生研究所）</span>
                        </li>
                        <li>
                            <a href="https://www.ncbi.nlm.nih.gov/books/NBK21154/" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                Molecular Cell Biology — How Cells Obtain Energy from Food（細胞が食べ物からエネルギーを得る仕組み）
                            </a>
                            <span className="text-[#1A1A1A]/50"> — Lodish H ら, NCBI Bookshelf</span>
                        </li>
                    </ul>
                    <p className="text-xs text-[#4A4A4A]/70 mt-2">
                        全テーマの出典は{' '}
                        <Link href="/references" className="underline decoration-[#41C9B4] decoration-2 underline-offset-2 font-bold hover:text-[#41C9B4]">参照文献・出典ページ</Link>
                        {' '}にまとめています。
                    </p>
                </section>

                <div className="text-center flex flex-wrap justify-center gap-3">
                    <Link href="/energy" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">エネルギー産生へ</Link>
                    <Link href="/library" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">← Library に戻る</Link>
                </div>
            </article>
        </div>
    );
}
