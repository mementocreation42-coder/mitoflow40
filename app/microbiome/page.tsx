import Link from 'next/link';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: '腸内フローラとプレ・プロバイオティクス ｜ 善玉菌の育て方 | Mitoflow40',
    description: '腸内フローラ（腸内細菌叢）とは何か。善玉菌・悪玉菌・日和見菌のバランス、プロバイオティクス（菌そのもの）・プレバイオティクス（菌のエサ）・シンバイオティクス・ポストバイオティクスの違い、短鎖脂肪酸の役割までを精密栄養学の視点でやさしく解説します。',
    alternates: { canonical: 'https://mitoflow40.com/microbiome' },
    openGraph: {
        title: '腸内フローラとプレ・プロバイオティクス | Mitoflow40',
        description: 'プロ・プレ・シン・ポストバイオティクスの違いと、善玉菌を育てる食べ方をやさしく解説。',
        url: 'https://mitoflow40.com/microbiome',
        type: 'article',
    },
};

const balance = [
    { en: 'GOOD', title: '善玉菌', ratio: '理想 約2割', note: 'ビフィズス菌・乳酸菌など。消化を助け、短鎖脂肪酸を作り、悪玉菌の増殖を抑える。', color: '#41C9B4' },
    { en: 'BAD', title: '悪玉菌', ratio: '理想 約1割', note: 'ウェルシュ菌・大腸菌の一部など。増えすぎると腐敗物質や有害ガスを生む。ゼロにする必要はない。', color: '#E8896B' },
    { en: 'NEUTRAL', title: '日和見菌', ratio: '約7割', note: '多数派。優勢な側に味方する。善玉が優位な環境を保つことが、この多数派を味方につける鍵。', color: '#C8A24A' },
];

const biotics = [
    {
        en: 'PROBIOTICS',
        ja: 'プロバイオティクス',
        tag: '菌そのもの',
        body: '体に良い働きをする生きた菌そのものを、口から取り入れること。ヨーグルト・納豆・味噌・キムチ・ぬか漬けなどの発酵食品や、菌が入ったサプリメントが該当します。',
        ex: '納豆・ヨーグルト・味噌・キムチ・ぬか漬け',
        color: '#DCF1EA',
    },
    {
        en: 'PREBIOTICS',
        ja: 'プレバイオティクス',
        tag: '菌のエサ',
        body: '善玉菌のエサになる成分。主に食物繊維とオリゴ糖です。菌を「入れる」だけでなく、もともといる善玉菌を「育てる」発想。届けるエサ次第で、育つ菌が変わります。',
        ex: '水溶性食物繊維・オリゴ糖・イヌリン（玉ねぎ・ごぼう・バナナ・海藻）',
        color: '#FCE3D4',
    },
    {
        en: 'SYNBIOTICS',
        ja: 'シンバイオティクス',
        tag: '菌＋エサ',
        body: 'プロバイオティクス（菌）とプレバイオティクス（エサ）を一緒にとる考え方。「納豆＋玉ねぎ」「ヨーグルト＋バナナ」のように、菌と、その菌が好むエサをセットで届けます。',
        ex: 'ヨーグルト＋バナナ／納豆＋ねぎ／味噌汁＋海藻',
        color: '#FFEFD6',
    },
    {
        en: 'POSTBIOTICS',
        ja: 'ポストバイオティクス',
        tag: '菌が作る物質',
        body: '善玉菌がエサを発酵して作り出す有用な代謝物。代表が短鎖脂肪酸です。近年は「最終的に体に効くのは菌の作る物質」という視点から、もっとも注目されている領域です。',
        ex: '短鎖脂肪酸（酪酸・酢酸・プロピオン酸）',
        color: '#DEEDF7',
    },
];

const scfa = [
    { name: '酪酸（らくさん）', note: '大腸の粘膜細胞の主なエネルギー源。腸のバリアを守り、炎症を抑える働きで特に注目される。' },
    { name: '酢酸（さくさん）', note: '腸内を弱酸性に保ち、悪玉菌の増殖を抑える。全身のエネルギー代謝にも関わる。' },
    { name: 'プロピオン酸', note: '肝臓に運ばれ、糖や脂質の代謝に関与。食欲や血糖の調整にも関わるとされる。' },
];

export default function MicrobiomePage() {
    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#CDEBE2' }}>
            <img loading="lazy" decoding="async" src="/images/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block"
                style={{ top: '0', right: '-40px', width: '260px', transform: 'scaleY(-1)' }} />
            <img loading="lazy" decoding="async" src="/images/24.png" alt="" className="absolute pointer-events-none"
                style={{ bottom: '-40px', left: '-40px', width: '260px' }} />

            <JsonLd data={medicalWebPage({ name: '腸内フローラとプレ・プロバイオティクス', description: 'プロ・プレ・シン・ポストバイオティクスの違いと、善玉菌を育てる食べ方をやさしく解説。', path: '/microbiome' })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: '身体の仕組み', path: '/library#mechanism' }, { name: '腸内フローラ', path: '/microbiome' }])} />

            <article className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '身体の仕組み', href: '/library#mechanism' }, { name: '腸内フローラ' }]} />
                <header className="mb-12 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>MICROBIOME</p>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        GUT FLORA
                        <span className="block text-base md:text-lg mt-2 text-[#1A1A1A]/70" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>腸内フローラとプレ・プロバイオティクス</span>
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-relaxed max-w-[560px] mx-auto">
                        「菌を入れる」だけが腸活ではありません。<strong>育てる・組み合わせる・作らせる</strong>——プレ／プロ／シン／ポストバイオティクスの違いを、ここで整理します。
                    </p>
                </header>

                {/* 腸内フローラとは */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">腸内フローラ（腸内細菌叢）とは</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        私たちの腸には<strong>約1,000種・100兆個</strong>ともいわれる細菌がすみ着いています。顕微鏡で見ると、種類ごとに群れて生息する様子が「お花畑（flora）」のように見えることから、<strong>腸内フローラ</strong>と呼ばれます。その全体を学術的には<strong>腸内細菌叢（マイクロバイオーム）</strong>と言います。
                        {'\n\n'}
                        大切なのは、特定の「良い菌」を増やすこと以上に、<strong>多様な菌がバランスよく共存していること</strong>。畑の土と同じで、多様で豊かな腸内環境ほど、ちょっとした食事の乱れやストレスにも揺らぎにくくなります。
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                        {[{ href: '/gut-health', label: '腸内環境の基本' }, { href: '/gut-brain', label: '腸脳相関' }].map((l) => (
                            <Link key={l.href} href={l.href} className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">{l.label}</Link>
                        ))}
                    </div>
                </section>

                {/* 善玉・悪玉・日和見 */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#41C9B4] pl-3 leading-tight">善玉・悪玉・日和見のバランス</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">「善玉2：悪玉1：日和見7」がよく理想とされる比率。ポイントは、多数派の日和見菌をどちらに味方させるか、です。</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {balance.map((b) => (
                            <div key={b.en} className="bg-white/70 rounded-2xl p-5 border border-black">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-[10px] font-bold tracking-widest" style={{ fontFamily: "'Space Grotesk', sans-serif", color: b.color }}>{b.en}</span>
                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-[#1A1A1A]/70">{b.ratio}</span>
                                </div>
                                <div className="font-bold text-[#1A1A1A] mb-1">{b.title}</div>
                                <p className="text-xs text-[#4A4A4A] leading-relaxed">{b.note}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* バイオティクス4種 */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#41C9B4] pl-3 leading-tight">「○○バイオティクス」を整理する</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">似た言葉が並びますが、役割はそれぞれ違います。「菌そのもの・菌のエサ・その両方・菌が作る物質」の4段階で覚えると、すっきりします。</p>
                    <div className="space-y-3">
                        {biotics.map((b) => (
                            <div key={b.en} className="rounded-2xl p-5 md:p-6 border border-black" style={{ background: b.color }}>
                                <div className="flex items-baseline gap-3 mb-2 flex-wrap">
                                    <span className="text-lg md:text-xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{b.en}</span>
                                    <span className="text-sm font-bold text-[#1A1A1A]/70">{b.ja}</span>
                                    <span className="text-xs px-2 py-0.5 rounded-full bg-white/70 text-[#1A1A1A]/70 font-bold">{b.tag}</span>
                                </div>
                                <p className="text-sm text-[#1A1A1A]/80 leading-relaxed mb-2">{b.body}</p>
                                <p className="text-xs text-[#1A1A1A]/60 leading-relaxed"><span className="font-bold">例：</span>{b.ex}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 短鎖脂肪酸 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">主役は「短鎖脂肪酸」</h2>
                    <p className="text-[#4A4A4A] leading-loose mb-5">
                        善玉菌が食物繊維を発酵させて作り出すのが<strong>短鎖脂肪酸</strong>。これこそ、腸活で本当に手に入れたい「成果物」です。腸の壁を守り、炎症を抑え、全身の代謝にまで影響します。つまり、<strong>食物繊維（プレ）を届け、菌（プロ）に作らせ、短鎖脂肪酸（ポスト）を受け取る</strong>——これが一連の流れです。
                    </p>
                    <div className="space-y-3">
                        {scfa.map((s) => (
                            <div key={s.name} className="flex items-start gap-4 bg-white/70 rounded-xl p-4 border border-[#1A1A1A]/15">
                                <div>
                                    <div className="font-bold text-[#1A1A1A] mb-0.5">{s.name}</div>
                                    <p className="text-sm text-[#4A4A4A] leading-snug">{s.note}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 実践 */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#41C9B4] pl-3 leading-tight">今日からできる、育て方</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">難しく考えず、「菌」と「エサ」をセットで、毎日少しずつ。続けることが何よりの近道です。</p>
                    <div className="space-y-3">
                        {[
                            { head: '発酵食品を毎日ひと品（プロ）', body: '納豆・ヨーグルト・味噌・キムチ・ぬか漬けから、まずは1つを習慣に。菌は定着しにくいので、毎日続けることが大切。', href: '/foods' },
                            { head: '食物繊維とオリゴ糖を意識（プレ）', body: '玉ねぎ・ごぼう・海藻・きのこ・豆・全粒穀物・バナナ。水溶性食物繊維は善玉菌の好物。', href: '/nutrients/fiber' },
                            { head: 'セットで食べる（シン）', body: '「ヨーグルト＋バナナ」「納豆＋ねぎ」「味噌汁＋わかめ」。菌とエサを一緒に届けると効率的。', href: '/foods' },
                            { head: '多様性を増やす', body: '同じものに偏らず、いろいろな植物性食品を。「週に30種の植物」を目安にすると菌の多様性が広がる。', href: '/foods' },
                            { head: '邪魔を減らす', body: '超加工食品・過剰な糖やアルコールは腸内環境を乱しやすい。睡眠・運動・ストレスケアも腸に直結する。', href: '/caution-foods' },
                        ].map((s) => (
                            <Link key={s.head} href={s.href} className="group flex items-start gap-4 bg-white/70 rounded-xl p-4 border border-[#1A1A1A]/15 hover:border-black hover:shadow-sm transition-all">
                                <div>
                                    <div className="font-bold text-[#1A1A1A] mb-0.5 group-hover:text-[#FF9855] transition-colors">{s.head}</div>
                                    <p className="text-sm text-[#4A4A4A] leading-snug">{s.body}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                    <p className="text-xs text-[#4A4A4A]/60 mt-4 leading-relaxed">
                        ※ どんな菌や食品が合うかには大きな個人差があります。お通じや体調の変化を見ながら、自分に合うものを見つけていくのが、精密栄養学的な腸活です。
                    </p>
                </section>

                {/* もっと学ぶ */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">あわせて読む</h2>
                    <div className="flex flex-wrap gap-2">
                        {[
                            { href: '/gut-health', label: '腸内環境の基本' },
                            { href: '/gut-troubles', label: 'グルテン・SIBO等' },
                            { href: '/gut-brain', label: '腸脳相関' },
                            { href: '/digestion', label: '消化・吸収' },
                            { href: '/nutrients/fiber', label: '食物繊維' },
                            { href: '/foods', label: '食べ物' },
                            { href: '/library', label: 'Library 全体' },
                        ].map((l) => (
                            <Link key={l.href} href={l.href} className="px-4 py-2 rounded-full bg-white border border-[#1A1A1A] text-sm font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white transition-colors">{l.label} →</Link>
                        ))}
                    </div>
                </section>

                <div className="text-center">
                    <Link href="/library" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">← Library に戻る</Link>
                </div>
            </article>
        </div>
    );
}
