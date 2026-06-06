import Link from 'next/link';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: '学ぶと、何が変わる？｜生化学・栄養学を知る価値 | Mitoflow40',
    description: 'なぜ生化学や栄養学を学ぶ価値があるのか。体の仕組みがわかると、健康情報に振り回されず、自分の体調を読み解き、一生使える判断軸が手に入る——40代からの健康最適化の視点で、知ることの意味をわかりやすく解説します。',
    alternates: { canonical: 'https://mitoflow40.com/nutrition-literacy' },
    openGraph: {
        title: '学ぶと、何が変わる？｜生化学・栄養学を知る価値 | Mitoflow40',
        description: '体の仕組みを知ると、健康情報に振り回されず、自分の体を読み解ける。生化学・栄養学を学ぶ意味を解説。',
        url: 'https://mitoflow40.com/nutrition-literacy',
        type: 'article',
    },
};

// 知ることで手に入る具体的な価値
const values = [
    {
        head: '情報に振り回されなくなる',
        body: '「○○が体にいい」という話があふれる時代。土台となる仕組みを知っていれば、流行や極端な情報に飛びつかず、自分にとって本当に必要かを落ち着いて判断できます。',
    },
    {
        head: '体調を「翻訳」できる',
        body: '疲れ・だるさ・気分の落ち込みには、たいてい体内で起きている理由があります。仕組みがわかると、漠然とした不調を「何が足りていないか」の言葉に翻訳できるようになります。',
    },
    {
        head: '選択の精度が上がる',
        body: '何を食べ、何を控え、どう休むか。日々の小さな選択も、理由がわかると納得して選べます。やみくもな我慢ではなく、意味のある習慣に変わります。',
    },
    {
        head: '一生モノの地図になる',
        body: '体の基本設計は、20代も60代も大きくは変わりません。一度身につけた仕組みの理解は、これから先の数十年、年齢や体調が変わっても使い続けられる“地図”になります。',
    },
    {
        head: '医療を上手に使える',
        body: '仕組みを知っていると、医師や専門家の説明が腑に落ち、的確な質問ができます。すべてを自分で抱え込むのではなく、専門家と協力して判断する土台になります。',
    },
    {
        head: '大切な人にも活かせる',
        body: '学んだ知識は自分だけのものではありません。家族やパートナー、年老いた親の食事や体調を気づかうとき、確かな視点があなたを支えてくれます。',
    },
];

export default function NutritionLiteracyPage() {
    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#EAF1E0' }}>
            <img loading="lazy" decoding="async" src="/images/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block"
                style={{ top: '0', right: '-40px', width: '260px', transform: 'scaleY(-1)' }} />
            <img loading="lazy" decoding="async" src="/images/24.png" alt="" className="absolute pointer-events-none"
                style={{ bottom: '-40px', left: '-40px', width: '260px' }} />

            <JsonLd data={medicalWebPage({ name: '学ぶと、何が変わる？｜生化学・栄養学を知る価値', description: '体の仕組みを知ると、健康情報に振り回されず、自分の体を読み解ける。生化学・栄養学を学ぶ意味を解説。', path: '/nutrition-literacy' })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: '学ぶと、何が変わる？', path: '/nutrition-literacy' }])} />
            <article className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '学ぶと、何が変わる？' }]} />
                <header className="mb-12 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>
                        WHY IT MATTERS
                    </p>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        NUTRITION LITERACY
                        <span className="block text-2xl md:text-3xl mt-3 text-[#1A1A1A]" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>学ぶと、何が変わる？</span>
                        <span className="block text-sm md:text-base mt-2 text-[#1A1A1A]/60" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>生化学・栄養学を知る価値</span>
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-relaxed max-w-[600px] mx-auto">
                        体の仕組みがわかると、健康情報に振り回されず、自分の体を自分で読み解けるようになる。知ることは、これからの数十年を支える力になります。
                    </p>
                </header>

                {/* なぜ知るのか */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">なぜ「知ること」に価値があるのか</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        健康のためにできることは、世の中にあふれています。けれど、<strong>「なぜそれが体にいいのか」を知らないまま続ける健康法</strong>は、長続きしにくく、流行が変わるたびに揺らいでしまいます。
                        {'\n\n'}
                        生化学とは、<strong>体の中で絶え間なく起きている化学反応（代謝）</strong>のこと。栄養学は、その反応を支える<strong>材料（栄養）</strong>の学問です。この二つを少し知るだけで、バラバラに見えていた健康情報が一本の線でつながり、<strong>「だからこうするといい」という理由</strong>が見えてきます。
                        {'\n\n'}
                        知識は、誰かに健康を“預ける”状態から、<strong>自分の体を自分で読み解く</strong>状態へとあなたを導きます。それは、これから先の人生を通じて使える、もっとも確かな投資のひとつです。
                    </p>
                </section>

                {/* なんとなく→理由がわかる */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">「なんとなく健康」から「理由がわかる健康」へ</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        「野菜をとろう」「よく寝よう」——正しいけれど、理由がわからないと続きません。けれど、<strong>なぜ疲れが抜けないのか、なぜ甘いものを食べると眠くなるのか</strong>が仕組みでわかると、行動の意味が腑に落ちます。
                        {'\n\n'}
                        たとえば、エネルギーが作られる場所（ミトコンドリア）や、その材料になるビタミン・ミネラルの役割を知れば、「疲れやすさ」は気合いの問題ではなく<strong>材料が足りていないサイン</strong>かもしれない、と捉え直せます。理由がわかれば、我慢ではなく納得で選べるようになります。
                    </p>
                </section>

                {/* 40代という分岐点 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">40代こそ、学びはじめどき</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        40代は、若い頃と同じ生活でも体が変わりはじめる時期。筋肉が落ちやすくなり、回復に時間がかかり、健診の数値が気になりだす——多くの人が「体の説明書がほしい」と感じはじめる頃です。
                        {'\n\n'}
                        この時期に仕組みを学ぶ価値は大きいものです。なぜなら、<strong>これから先の数十年をどう過ごすかの土台</strong>になるから。早すぎず遅すぎず、自分の体の変化を実感しながら学べる——だからこそ、知識がいちばん身につき、いちばん役に立つタイミングなのです。
                    </p>
                </section>

                {/* 知ることで手に入るもの */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-5 text-center">知ることで、手に入るもの</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        {values.map((v) => (
                            <div key={v.head} className="bg-white/70 rounded-2xl p-5 md:p-6 border border-black">
                                <h3 className="text-base md:text-lg font-bold text-[#1A1A1A] mb-2">{v.head}</h3>
                                <p className="text-sm text-[#4A4A4A] leading-relaxed">{v.body}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* このLibraryの使い方 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">このLibraryは、そのための場所</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        とはいえ、専門書を一から読むのは大変です。このLibraryは、<strong>生化学・栄養学のエッセンスを、40代の日常の言葉でつなぎ直す</strong>ために作りました。むずかしい用語はかみくだき、「自分の体の話」として読めるようにしています。
                        {'\n\n'}
                        食べ物・栄養素・血液検査・遺伝子・体のしくみ——どこから読んでも、少しずつ点が線になっていきます。完璧に覚える必要はありません。<strong>気になったときに調べ、自分の体に当てはめてみる</strong>。その積み重ねが、いつのまにかあなたの“健康の地図”になります。
                    </p>
                </section>

                {/* もっと深く知る */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">まずはここから</h2>
                    <p className="text-sm text-[#4A4A4A] leading-relaxed mb-4">
                        知ることの入口に、おすすめのページをいくつか。
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {[
                            { href: '/molecular-nutrition', label: '分子栄養学とは' },
                            { href: '/precision-nutrition', label: '精密栄養学とは' },
                            { href: '/energy', label: 'エネルギーとは' },
                            { href: '/nutrients', label: '栄養素' },
                            { href: '/foods', label: '食べ物' },
                            { href: '/library', label: 'Library 全体' },
                        ].map((l) => (
                            <Link key={l.href} href={l.href}
                                className="px-4 py-2 rounded-full bg-white border border-[#1A1A1A] text-sm font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white transition-colors">
                                {l.label} →
                            </Link>
                        ))}
                    </div>
                </section>

                {/* セルフチェックCTA */}
                <div className="bg-white border border-black rounded-2xl p-6 md:p-8 text-center mb-12">
                    <p className="text-xs tracking-widest font-bold mb-3 text-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        SELF CHECK
                    </p>
                    <h2 className="text-lg md:text-xl font-bold mb-3 text-[#1A1A1A]">
                        まずは、自分の体の現在地から
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
