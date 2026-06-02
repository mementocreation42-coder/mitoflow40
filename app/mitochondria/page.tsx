import Link from 'next/link';
import { getNutrientBySlug } from '@/lib/nutrients';
import JsonLd, { medicalWebPage } from '@/components/JsonLd';

export const metadata = {
    title: 'ミトコンドリアとは | Mitoflow40',
    description: '細胞のエネルギー工場「ミトコンドリア」とは何か。構造・役割・エネルギー産生の流れ・40代で重要な理由・弱るサイン・量と質を保つ方法を、仕組みと栄養素のページにつなげて徹底解説。',
    alternates: { canonical: 'https://mitoflow40.com/mitochondria' },
    openGraph: {
        title: 'ミトコンドリアとは | Mitoflow40',
        description: '細胞のエネルギー工場「ミトコンドリア」を、構造・役割・40代での重要性・元気に保つ方法から徹底解説。',
        url: 'https://mitoflow40.com/mitochondria',
        type: 'article',
    },
};

// 構造
const structure = [
    { part: '外膜', en: 'OUTER MEMBRANE', note: 'ミトコンドリア全体を包む膜。物質の出入りの最初の窓口' },
    { part: '内膜', en: 'INNER MEMBRANE', note: 'エネルギー産生の主役・電子伝達系が並ぶ膜。ひだ状に折りたたまれている' },
    { part: 'クリステ', en: 'CRISTAE', note: '内膜の"ひだ"。表面積を増やし、ATP産生の効率を高める' },
    { part: 'マトリックス', en: 'MATRIX', note: '内膜の内側の空間。TCA回路やミトコンドリアDNAが存在する' },
];

// エネルギー産生の流れ
const energyFlow = [
    { stage: '解糖系', place: '細胞質', note: 'ブドウ糖を分解し、少量のATPとピルビン酸を生む' },
    { stage: 'TCA回路', place: 'マトリックス', note: '燃料を分解し、電子の運び屋(NADH・FADH2)を生む', href: '/tca-cycle' },
    { stage: '電子伝達系', place: '内膜', note: '酸素を使い、大量のATPを産生する最終工程' },
    { stage: 'ATP', place: '', note: '全身のエネルギー通貨として使われる', href: '/atp' },
];

// 役割
const roles = [
    { title: 'エネルギー(ATP)を作る', note: '酸素と栄養から、生命活動の通貨ATPを産生する最大の仕事', href: '/atp' },
    { title: '代謝の切り替え', note: '糖・脂質・ケトン体など、状況に応じて燃料を使い分ける', href: '/ketones' },
    { title: '細胞の生死を管理', note: '役目を終えた細胞を計画的に処理（アポトーシス）する司令塔' },
    { title: 'カルシウムの調整', note: '細胞内のカルシウム濃度を緩衝し、神経や筋肉の働きを支える' },
    { title: '熱を生み出す', note: '体温の維持にも関与。褐色脂肪で活発に働く' },
    { title: '活性酸素を出す', note: 'エネルギー産生の副産物。シグナルにもなるが、多すぎると細胞を傷つける諸刃の剣' },
];

// 弱っているサイン
const weakSigns = [
    '朝起きても疲れが抜けない・日中の強いだるさ',
    '運動後の回復が遅い・スタミナの低下',
    '頭がモヤモヤする・集中が続かない',
    '寒がりになった・冷えやすい',
    'カフェインや甘いものに頼りがち',
];

// 元気に保つ習慣
const supports = [
    { head: '運動（ミトコンドリア新生）', body: '有酸素運動やHIITは、ミトコンドリアを新しく増やす「ミトコンドリア新生」を促す最も確実な方法。少しきつい運動が刺激になります。' },
    { head: '栄養', body: 'CoQ10・ビタミンB群・マグネシウム・鉄など、エネルギー産生の材料と補酵素を満たす。タンパク質も土台です。' },
    { head: '断食・空腹の時間', body: '軽い飢餓は、傷んだミトコンドリアを片付ける「ミトファジー」を促し、質を保つ。', href: '/autophagy' },
    { head: '質の良い睡眠', body: '修復と再生の時間。睡眠不足はミトコンドリア機能を直接低下させます。' },
    { head: '寒さ・サウナ（ホルミシス）', body: '適度な温冷刺激は、ミトコンドリアを鍛える"ちょうど良いストレス"になります。' },
];

const relNutrients = ['coq10', 'magnesium', 'niacin', 'iron', 'b2', 'thiamine'];

export default function MitochondriaPage() {
    const nutrients = relNutrients.map((s) => getNutrientBySlug(s)).filter((n): n is NonNullable<typeof n> => Boolean(n));

    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#CFEAEC' }}>
            <img src="/images/experience_vitality_new.png" alt="" className="absolute pointer-events-none opacity-80 hidden md:block"
                style={{ top: '60px', right: '-50px', width: '260px' }} />
            <img src="/images/for-you-science.png" alt="" className="absolute pointer-events-none opacity-40"
                style={{ bottom: '-60px', left: '-70px', width: '320px', transform: 'scaleX(-1)' }} />

            <JsonLd data={medicalWebPage({ name: 'ミトコンドリアとは', description: 'ミトコンドリアの役割・構造・40代で重要な理由・元気に保つ方法を解説。', path: '/mitochondria' })} />
            <article className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <header className="mb-12 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>
                        THE POWERHOUSE
                    </p>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        MITOCHONDRIA
                        <span className="block text-base md:text-lg mt-2 text-[#1A1A1A]/70" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>ミトコンドリアとは</span>
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-relaxed max-w-[560px] mx-auto">
                        私たちの細胞ひとつひとつに住む「エネルギーの発電所」。Mitoflow40のすべての出発点です。
                    </p>
                </header>

                {/* とは */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4">ミトコンドリアとは</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        ミトコンドリアは、私たちの細胞の中にある小さな器官（細胞小器官）です。食べたものと吸った酸素から、生きるためのエネルギー「ATP」を作り出す——いわば<strong>細胞の発電所</strong>です。
                        {'\n\n'}
                        その数は1つの細胞に数百〜数千個。とりわけ心臓・脳・筋肉・肝臓など、エネルギーを大量に使う臓器に多く集まっています。全身では数百兆個にのぼり、体重のおよそ1割を占めるとも言われます。私たちが「元気でいられる」かどうかは、このミトコンドリアがどれだけ良質なエネルギーを作れるかにかかっています。
                        {'\n\n'}
                        おもしろいのは、ミトコンドリアが核とは別に<strong>独自のDNA</strong>を持つこと。これは母親から受け継がれます（母系遺伝）。もともと別の微生物が太古に私たちの祖先の細胞へ共生し、そのまま住み着いたなごりだと考えられています。つまり私たちは、太古の共生関係の上に生きているのです。
                    </p>
                </section>

                {/* 構造 */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2">ミトコンドリアの構造</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">
                        二重の膜を持つのが特徴で、内側の膜の構造がエネルギー産生の効率を決めています。
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {structure.map((s) => (
                            <div key={s.en} className="bg-white/70 rounded-xl p-5 border border-black">
                                <div className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/40 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{s.en}</div>
                                <div className="font-bold text-[#1A1A1A] mb-1">{s.part}</div>
                                <p className="text-xs text-[#4A4A4A] leading-snug">{s.note}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* エネルギー産生の流れ */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2">エネルギーを作る流れ</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">
                        食べたものは、3つの工程を経てATPになります。大半はミトコンドリアの中で作られます。
                    </p>
                    <div className="bg-white/70 rounded-2xl p-5 md:p-6 border border-black">
                        <div className="space-y-2">
                            {energyFlow.map((step, i) => (
                                <div key={step.stage}>
                                    <div className="flex items-center gap-4 p-4 rounded-xl" style={{ background: i === energyFlow.length - 1 ? '#FFE9D2' : '#EAF6F6' }}>
                                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#41C9B4] text-white text-sm font-bold flex items-center justify-center" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                            {i + 1}
                                        </span>
                                        <div className="flex-1">
                                            <div className="flex items-baseline gap-2 flex-wrap">
                                                <span className="font-bold text-[#1A1A1A]">
                                                    {step.href ? (
                                                        <Link href={step.href} className="underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">{step.stage}</Link>
                                                    ) : step.stage}
                                                </span>
                                                {step.place && <span className="text-[10px] px-2 py-0.5 rounded-full bg-white text-[#1A1A1A]/60 font-bold">{step.place}</span>}
                                            </div>
                                            <p className="text-xs text-[#4A4A4A] mt-0.5">{step.note}</p>
                                        </div>
                                    </div>
                                    {i < energyFlow.length - 1 && (
                                        <div className="text-center text-[#FF9855] text-xl leading-none py-1">↓</div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 役割 */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2">ミトコンドリアの主な役割</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">
                        エネルギー産生が最大の仕事ですが、それだけではありません。
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {roles.map((r) => (
                            <div key={r.title} className="bg-white/70 rounded-xl p-5 border border-black">
                                <div className="font-bold text-[#1A1A1A] mb-1">
                                    {r.href ? (
                                        <Link href={r.href} className="underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">{r.title}</Link>
                                    ) : r.title}
                                </div>
                                <p className="text-xs text-[#4A4A4A] leading-snug">{r.note}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* なぜ40代 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4">なぜ40代で重要なのか</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        ミトコンドリアの量と質は、加齢とともに低下しやすくなります。発電所が減り、性能も落ちると、作れるエネルギーが減る——これが、40代以降に感じやすい「疲れやすい」「回復が遅い」「頭がモヤモヤする」の根っこにあります。
                        {'\n\n'}
                        さらに、傷ついたミトコンドリアが片付けられずに溜まると、活性酸素が増え、細胞の老化や慢性炎症を後押しします。エネルギー低下と老化は、ミトコンドリアという一点でつながっているのです。
                        {'\n\n'}
                        逆に言えば、ミトコンドリアは<strong>生活習慣で増やし、鍛え、入れ替えることができる</strong>器官です。運動で新しく増やし（新生）、断食や睡眠で古いものを片付ける（ミトファジー）。この「増やす×入れ替える」の両輪が、40代からの活力を取り戻す鍵になります。
                    </p>
                </section>

                {/* 弱っているサイン */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2">ミトコンドリアが弱っているサイン</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">
                        次のようなサインは、エネルギー産生がうまくいっていない可能性を示します。
                    </p>
                    <div className="bg-white/70 rounded-2xl p-6 border border-black">
                        <ul className="space-y-2">
                            {weakSigns.map((s, i) => (
                                <li key={i} className="flex gap-3 text-[#4A4A4A]">
                                    <span className="text-[#FF9855] flex-shrink-0">●</span>
                                    <span>{s}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* 元気に保つ */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2">ミトコンドリアを元気に保つ習慣</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">
                        ミトコンドリアは働きかけに応えてくれます。「増やす」と「入れ替える」を意識しましょう。
                    </p>
                    <div className="space-y-3">
                        {supports.map((s, i) => (
                            <div key={s.head} className="flex items-start gap-4 bg-white/70 rounded-xl p-4 border border-[#1A1A1A]/15">
                                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#41C9B4] text-white text-sm font-bold flex items-center justify-center" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                    {i + 1}
                                </span>
                                <div>
                                    <div className="font-bold text-[#1A1A1A] mb-0.5">
                                        {s.href ? (
                                            <Link href={s.href} className="underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">{s.head}</Link>
                                        ) : s.head}
                                    </div>
                                    <p className="text-sm text-[#4A4A4A] leading-snug">{s.body}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* もっと深く知る */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4">もっと深く知る</h2>
                    <p className="text-sm text-[#4A4A4A] leading-relaxed mb-4">
                        ミトコンドリアにまつわる仕組みを、ステップごとに読み解けます。
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {[
                            { href: '/tca-cycle', label: 'TCA回路' },
                            { href: '/atp', label: 'ATP' },
                            { href: '/ketones', label: 'ケトン体' },
                            { href: '/autophagy', label: 'オートファジー' },
                            { href: '/gut-brain', label: '脳腸相関' },
                        ].map((l) => (
                            <Link key={l.href} href={l.href}
                                className="px-4 py-2 rounded-full bg-white border border-[#1A1A1A] text-sm font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white transition-colors">
                                {l.label} →
                            </Link>
                        ))}
                    </div>
                    {nutrients.length > 0 && (
                        <div className="mt-5 pt-5 border-t border-[#1A1A1A]/10">
                            <p className="text-xs font-bold text-[#1A1A1A]/60 mb-2">エネルギー産生を支える栄養素</p>
                            <div className="flex flex-wrap gap-2">
                                {nutrients.map((n) => (
                                    <Link key={n.slug} href={`/nutrients/${n.slug}`}
                                        className="px-3 py-1.5 rounded-lg text-sm font-bold text-[#1A1A1A] border border-[#1A1A1A]/20 hover:border-[#1A1A1A] transition-colors" style={{ background: n.color }}>
                                        {n.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </section>

                {/* セルフチェックCTA */}
                <div className="bg-white border border-black rounded-2xl p-6 md:p-8 text-center mb-12">
                    <p className="text-xs tracking-widest font-bold mb-3 text-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        SELF CHECK
                    </p>
                    <h2 className="text-lg md:text-xl font-bold mb-3 text-[#1A1A1A]">
                        あなたのミトコンドリア、元気ですか？
                    </h2>
                    <p className="text-sm text-[#4A4A4A] leading-relaxed mb-5 max-w-[480px] mx-auto">
                        12問・約2分のセルフチェックで、あなたのミトコンドリア活性度を4つの軸から可視化します。無料・登録不要。
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
