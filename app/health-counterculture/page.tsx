import Link from 'next/link';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: '健康とは、カウンターカルチャーである。｜身体から始める静かな反抗 | Mitoflow40',
    description: 'Mitoflow40の背景にある一冊『健康とは、カウンターカルチャーである。――身体から始める静かな反抗』（小林大介）の考え方を紹介します。健康を制度や市場に明け渡すのではなく、自分の身体の主権を取り戻す——食べない・休む・感じるという、もっとも静かで根源的な反抗について。',
    alternates: { canonical: 'https://mitoflow40.com/health-counterculture' },
    openGraph: {
        title: '健康とは、カウンターカルチャーである。｜身体から始める静かな反抗',
        description: '健康を制度や市場に明け渡さず、自分の身体の主権を取り戻す。Mitoflow40の背景にある一冊の思想。',
        url: 'https://mitoflow40.com/health-counterculture',
        type: 'article',
    },
};

// ▼ Amazon商品ページのURLをここに差し替えてください
const AMAZON_URL = 'https://www.amazon.co.jp/dp/B0F49YXMZT';

// 各章のエッセンス
const chapters = [
    {
        no: '序章',
        title: 'あなたの身体は、誰のものか？',
        body: '「あなたの健康のために。」——テレビから、薬局から、役所から、まるで呪文のように聞こえてくる。でも、その健康は誰の視点で語られているのだろう。いつしか私たちは、自分の身体の声ではなく、外からの指示に従う健康を「正解」と思わされてきた。本書は、その主権を取り戻すための提案である。',
        quote: '自分の身体に耳をすますこと。食べるものを選ぶこと。感じることを大切にすること。それは現代社会に対する、もっとも穏やかでもっとも根源的な反抗だ。',
    },
    {
        no: '第1章',
        title: 'カウンターカルチャーとは、「主流から降りる」こと',
        body: 'ビート、ヒッピー、パンク。1960〜70年代の若者たちは、用意されたレール（学校・就職・結婚・マイホーム）から「体ごと降りる」生き方を選んだ。日本でも寺山修司の「書を捨てよ、町へ出よう」、全共闘、中津川フォークジャンボリーやはっぴいえんど——制度に反対するのではなく、制度に依存せずに生きるという思想があった。それは「反対の文化」ではなく、もうひとつの文化（オルタナティブ）だ。',
        quote: 'カウンターカルチャーとは、騒がしいものではない。内側から始まる小さな違和感を、言葉にし、形にし、生き方にまで落とし込む運動だ。その最前線は——いま、あなたの身体にある。',
    },
    {
        no: '第2章',
        title: '健康は、いつから「管理されるもの」になったのか',
        body: 'かつて健康は、暮らしの中で育てる知恵だった。だが近代以降、血圧・血糖・体温が数値化され、「正常／異常」で身体が分類されるようになる。「24時間戦えますか？」——働ける身体こそ健康とされ、個人の身体は産業と国家のコンディション維持にすり替えられた。世界のヘルスケア市場は10兆ドルを超える。そこでは皮肉にも、本当の健康はむしろ都合が悪い。',
        quote: '標準化は便利だ。でも、便利さが感覚を鈍らせるとき、その構造は支配へと変わる。しかもこの支配は、「あなたのために」と語りかけてくる、もっとも優しいかたちの支配だ。',
    },
    {
        no: '第3章',
        title: '身体への帰還——食べない、休む、感じる',
        body: '足すことが正義の時代に、あえて「引く」。16時間断食はオートファジー（細胞の大掃除）を起動し、ノイズを削ぎ落として身体の声を聞く余白をつくる。休むことに「リカバリー」や「セルフケア」という名前をつけないと堂々と休めない社会で、ただ「何もしたくないから何もしない」を取り戻す。感じることは、数値で測れない身体のリアルに主語を戻す行為だ。',
        quote: '断食とは、消費社会への静かなカウンターである。足すではなく、引くことで立ち上がる再構築のプロセス。静かで、でも確実な、生命の内燃機関である。',
    },
    {
        no: '第4章',
        title: 'セルフケアはDIYである——精密栄養と自由意志',
        body: 'DIY＝Do It Yourself。パンクが「自分たちの手で」音楽をつくったように、健康も自分の手で手入れする。分子栄養学から精密栄養学へ——血液検査・遺伝子・腸内環境のデータが個人に降りてきた。だが大切なのは、データに依存することではなく、データと自分の感覚を接続すること。「理解し、観察し、試し、調整する」ループを、自分の手の中に持つこと。',
        quote: '「主治医は自分」。医者任せではなく、日常的なケアと判断の主体を「私自身」が持つ。この感覚を取り戻すことは、実はとてもパンクで、カウンターなことだ。',
    },
    {
        no: '第5章',
        title: '身体を変えると、世界が変わる',
        body: '栄養が偏ると、思考が偏る。セロトニンもドーパミンも、身体が原料から合成する「ものづくり」の産物だ。原料がなければ、前向きさも冷静さも育たない。その中心にいるのがミトコンドリア——20億年前、酸素という猛毒をエネルギーに変えて生き延びた、共生という名のカウンターカルチャー的選択の末裔。とくに40代は、代謝が切り替わる「ミトコンドリアの再設計期」だ。',
        quote: 'ミトコンドリアを、メンテナンスの対象ではなく、共に生きるパートナーとして捉え直す。この視点を、私は「ミトフロー」と名付けた。',
    },
    {
        no: '終章',
        title: '健康とは、“生き方”である',
        body: '健康とは、何かを「足す」ことでも、「治す」ことでも、「証明する」ことでもない。日々の選択に、自分の在り方がにじむこと。何を食べ、いつ眠り、誰と過ごし、何に耳を傾けるか——そのすべてに、あなたの健康は息づいている。それは完成ではなく、営みだ。',
        quote: 'あなたの身体は、あなたのものですか？ その問いに、自分の声で「はい」と答えられるようになったとき——あなたはきっと、もう誰のものでもないあなたの人生を歩きはじめている。',
    },
];

export default function HealthCounterculturePage() {
    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#EAE6DD' }}>
            <JsonLd data={medicalWebPage({ name: '健康とは、カウンターカルチャーである。', description: '健康を制度や市場に明け渡さず、自分の身体の主権を取り戻す。Mitoflow40の背景にある一冊の思想。', path: '/health-counterculture' })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: '健康とは、カウンターカルチャーである。', path: '/health-counterculture' }])} />

            <article className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '健康とは、カウンターカルチャーである。' }]} />
                <header className="mb-10 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>
                        MANIFESTO ／ 著書より
                    </p>
                    <h1 className="text-3xl md:text-5xl font-bold mt-4 mb-4 text-[#1A1A1A] leading-tight" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>
                        健康とは、<br className="hidden md:block" />カウンターカルチャーである。
                    </h1>
                    <p className="text-sm md:text-base font-bold text-[#1A1A1A]/60 mb-6" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>
                        ——身体から始める静かな反抗
                    </p>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-loose max-w-[640px] mx-auto text-left">
                        これは、Mitoflow40の背景にある一冊の本の考え方です。健康を、制度や市場や誰かの「正解」に明け渡すのではなく、もう一度<strong>自分の身体の主権を取り戻す</strong>こと。それは、激しい革命ではなく、いちばん静かで、いちばん個人的な反抗です。
                    </p>
                </header>

                {/* ヒーロー引用 */}
                <section className="mb-12 rounded-2xl p-8 md:p-10 border border-black text-center" style={{ background: '#C0392B' }}>
                    <p className="text-2xl md:text-3xl font-bold text-white leading-relaxed" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>
                        「あなたの身体は、<br />あなたのものですか？」
                    </p>
                </section>

                {/* 導入 */}
                <section className="mb-12 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        「私の身体なんだから、私のもの」——言葉ではそう言える。でも、日々を振り返ってみてほしい。食べるものは誰が決めている？ 体調の異変を感じたとき、まず向かうのはどこ？ 何をもって「健康」とし、何をもって「異常」と判断しているか。その答えを、いつの間にか他人や制度に明け渡していないだろうか。
                        {'\n\n'}
                        現代医療の恩恵は計り知れない。それを否定するのではない。ただ、<strong>数値が出なければ健康、診断がつかなければ正常</strong>と言われ続けるなかで、私たちは「まだ病気じゃないだけの身体」を、自分の健康だと思い込まされてきた。本書は、それを取り戻すための、静かな提案である。
                    </p>
                </section>

                {/* 章ごとのエッセンス */}
                <div className="space-y-8 mb-12">
                    {chapters.map((c) => (
                        <section key={c.no} className="bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                            <div className="text-[10px] font-bold tracking-widest text-[#FF9855] mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{c.no}</div>
                            <h2 className="text-xl md:text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">{c.title}</h2>
                            <p className="text-[#4A4A4A] leading-loose mb-5">{c.body}</p>
                            <blockquote className="border-l-2 border-[#1A1A1A]/30 pl-4 text-[#1A1A1A] font-medium italic leading-relaxed">
                                {c.quote}
                            </blockquote>
                        </section>
                    ))}
                </div>

                {/* 注意 */}
                <section className="mb-12 rounded-2xl p-5 md:p-6 border" style={{ background: '#F4ECDA', borderColor: '#C99A3B' }}>
                    <p className="text-sm text-[#1A1A1A] leading-relaxed">
                        ※ 本ページは一冊の本の<strong>思想・生き方の提案</strong>を紹介するもので、特定の治療法を勧める医療アドバイスではありません。断食やサプリメントなどの実践は、体質・持病・服薬によって向き不向きがあります。不調があるときや持病のある方は、<strong>自己判断せず、まず医療機関にご相談ください</strong>。「自分でケアする」と「医療を上手に使う」は、対立するものではありません。
                    </p>
                </section>

                {/* Mitoflow40との接続 */}
                <section className="mb-12 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#FF9855] pl-3 leading-tight">学んだ先に、たどり着いた考え方</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        Mitoflow40がやろうとしているのは、まさにこの本の実践です。健康の知識を専門家や権威だけのものにせず、遺伝子・血液検査・栄養という「道具」と「知識」を一人ひとりに手渡し、<strong>自分の体を自分で読み解けるようにする</strong>。それは、半世紀前の若者がカタログや音楽でやろうとしたことの、健康版でもあります。
                        {'\n\n'}
                        ただし、これは「自己責任」を押しつける話ではありません。むしろ逆で、日々の選択を自分の手の中に取り戻す、<strong>ささやかで確かな自由</strong>の話です。極端ではなく、過不足のない「中庸」を大切に。
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                        <Link href="/health-philosophy" className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">健康とは</Link>
                        <Link href="/precision-nutrition" className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">精密栄養学とは</Link>
                        <Link href="/fasting" className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">食べない時間の力</Link>
                        <Link href="/autophagy" className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">オートファジー</Link>
                        <Link href="/mitochondria" className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">ミトコンドリア</Link>
                        <Link href="/counterculture" className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">対抗文化が生んだもの</Link>
                    </div>
                </section>

                {/* 結びの引用 */}
                <section className="mb-12 rounded-2xl p-8 md:p-10 border border-black text-center" style={{ background: '#41C9B4' }}>
                    <p className="text-xl md:text-2xl font-bold text-[#1A1A1A] leading-relaxed mb-3" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>
                        健康とは状態ではない。<br />「生き方そのもの」なのだ。
                    </p>
                    <p className="text-sm font-bold text-[#1A1A1A]/70" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        Choose health, but don&rsquo;t let them choose it for you.
                    </p>
                </section>

                {/* 著者・書誌 ＋ Amazon */}
                <section className="mb-10 rounded-2xl border border-black bg-white/70 p-6 md:p-8">
                    <div className="text-[10px] font-bold tracking-widest text-[#FF9855] mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>BOOK ／ 著者・書誌</div>
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 md:gap-6">
                        <a href={AMAZON_URL} target="_blank" rel="noopener noreferrer"
                            className="group flex-shrink-0 w-[120px] h-[170px] rounded-md border border-black/20 flex flex-col items-center justify-center text-center px-3 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all" style={{ background: '#C0392B' }}>
                            <span className="text-white font-bold leading-snug" style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: '13px' }}>健康とは、カウンターカルチャーである。</span>
                            <span className="mt-2 text-white/80 text-[10px]">小林 大介</span>
                        </a>
                        <div className="flex-1 text-center sm:text-left">
                            <h2 className="text-lg md:text-xl font-bold text-[#1A1A1A] mb-1 leading-snug">健康とは、カウンターカルチャーである。<span className="text-sm text-[#1A1A1A]/60">――身体から始める静かな反抗</span></h2>
                            <p className="text-xs text-[#4A4A4A]/80 leading-relaxed mb-3">
                                著・小林 大介（DAISUKE KOBAYASHI）／ 発行：Hyperbeat Books ／ 2025年4月10日
                            </p>
                            <p className="text-sm text-[#4A4A4A] leading-relaxed mb-4">
                                1980年、愛知県一宮市生まれ。オーストラリア生活を経て2014年に徳島県へ定住。ビデオグラファー、フォトグラファー、ライターとしてのクリエイティブ活動のかたわら、精密栄養学を学び、ミトコンドリアに着目したセルフケア「ミトフロー」を提唱。映画・音楽・漫画などのサブカルチャーから多大な影響を受けている。釣り好きで、山の猟師でもある。
                            </p>
                            <a href={AMAZON_URL} target="_blank" rel="noopener noreferrer"
                                className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold text-white" style={{ background: '#FF9900', fontFamily: "'Space Grotesk', sans-serif" }}>
                                Amazonで見る <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </a>
                        </div>
                    </div>
                </section>

                <div className="text-center">
                    <Link href="/library" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">
                        ← Library に戻る
                    </Link>
                </div>
            </article>
        </div>
    );
}
