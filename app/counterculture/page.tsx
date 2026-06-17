import Link from 'next/link';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: '対抗文化が生んだもの｜フラワームーブメントからパソコンまで | Mitoflow40',
    description: 'アシッド・テストとグレイトフル・デッド、フラワームーブメント、ホール・アース・カタログ、パーソナルコンピュータの誕生、スティーブ・ジョブズ、電子フロンティア財団、そして規制——「個人に道具を」という思想がどう技術と研究を動かしたかを、事実と出典をもとに中立に整理します。違法薬物の使用を推奨するものではありません。',
    alternates: { canonical: 'https://mitoflow40.com/counterculture' },
    robots: { index: true, follow: true },
    openGraph: {
        title: '対抗文化が生んだもの｜フラワームーブメントからパソコンまで | Mitoflow40',
        description: 'グレイトフル・デッド・フラワームーブメント・ホール・アース・カタログ・コンピュータ・ジョブズ・EFF・規制。「個人に道具を」の思想史を事実ベースで。',
        url: 'https://mitoflow40.com/counterculture',
        type: 'article',
    },
};

const timeline = [
    { era: '1965〜66年', head: 'アシッド・テストとグレイトフル・デッド', body: '作家ケン・キージーと仲間「メリー・プランクスターズ」が、西海岸で「アシッド・テスト」と呼ばれるパーティを開きました（LSDがカリフォルニアで違法化されるのは1966年10月）。そのハウスバンドを務めたのが、結成まもないグレイトフル・デッドです。' },
    { era: '1966〜67年', head: 'フラワームーブメント', body: 'ベトナム戦争への反発と価値観の問い直しの中で、対抗文化（カウンターカルチャー）が広がります。詩人アレン・ギンズバーグが広めた「フラワー・パワー」、1967年の「サマー・オブ・ラブ」が象徴です。海を越えてイギリスのロックもこれに呼応し、ビートルズの「All You Need Is Love」が時代の讃歌になりました。「権威ではなく、一人ひとりが自分の人生を選びとる」という空気が生まれました。' },
    { era: '1968年', head: 'ホール・アース・カタログ', body: 'その思想を一冊にしたのが、スチュアート・ブランド創刊の『Whole Earth Catalog』。副題は "access to tools"（道具へのアクセス）。組織や専門家を介さず、個人が自分の暮らしを自分の手でつくるための道具・本・知識を一覧にした、紙の検索エンジンでした。' },
    { era: '1968〜75年', head: 'カウンターカルチャーがコンピュータへ', body: '巨大組織のものだったコンピュータを「個人の道具」に変える動きが、対抗文化と結びついて起こります。1968年のエンゲルバートのデモ、1975年の「ホームブリュー・コンピュータ・クラブ」——パーソナルコンピュータは、この空気の中から生まれました。' },
    { era: '1970年代〜', head: '規制と、二つに分かれた流れ', body: '広まった幻覚剤は健康被害と社会問題を招き、アメリカは1970年の規制法でこれらを最も厳しい分類に指定、国連条約も続きます。対抗文化のエネルギーは、「テクノロジー」として花開く流れと、「規制され、長く眠る」流れに分かれていきました。' },
];

export default function CounterculturePage() {
    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#ECE4F2' }}>
            <JsonLd data={medicalWebPage({ name: '対抗文化が生んだもの', description: 'グレイトフル・デッド・フラワームーブメント・ホール・アース・カタログ・コンピュータ・ジョブズ・EFF・規制を、事実と出典をもとに中立に整理。', path: '/counterculture' })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: '対抗文化が生んだもの', path: '/counterculture' }])} />

            <article className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '対抗文化が生んだもの' }]} />
                <header className="mb-8 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>
                        FRONTIER ／ 思想と技術の社会史
                    </p>
                    <h1 className="text-3xl md:text-5xl font-bold mt-4 mb-6 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        対抗文化が生んだもの
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-loose max-w-[640px] mx-auto text-left">
                        グレイトフル・デッドとアシッド・テスト、ビートルズやストーンズ、フラワームーブメント、ホール・アース・カタログ、パーソナルコンピュータ、スティーブ・ジョブズ、そしてTEDやロング・ナウへ——。一見ばらばらに見えるこれらの出来事は、「<strong>個人に、自分をつくる道具を</strong>」という一本の糸でつながっています。事実と出典をもとに、その流れを中立に整理します。
                    </p>
                </header>

                {/* はじめの注意 */}
                <section className="mb-10 rounded-2xl p-5 md:p-6 border" style={{ background: '#F4ECDA', borderColor: '#C99A3B' }}>
                    <p className="text-sm text-[#1A1A1A] leading-relaxed">
                        ⚠ 本ページは<strong>歴史・思想の教育目的</strong>のもので、いかなる薬物の使用も勧めるものではありません。文中で触れる幻覚剤などは<strong className="text-[#C0392B]">日本では違法</strong>であり、所持・使用は犯罪です。「過去にそういう文化があった／海外でこう動いている」ことと、「使ってよい」ことは、まったく別の話です。
                    </p>
                </section>

                {/* 全体の流れ（タイムライン） */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">大きな流れ</h2>
                    <div className="space-y-3">
                        {timeline.map((t) => (
                            <div key={t.era} className="rounded-xl p-4 border border-[#1A1A1A]/15 bg-white/50">
                                <div className="text-[10px] font-bold tracking-widest text-[#41C9B4] mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{t.era}</div>
                                <div className="font-bold text-[#1A1A1A] mb-1">{t.head}</div>
                                <p className="text-sm text-[#4A4A4A] leading-relaxed">{t.body}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 音楽とアシッド・テスト */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">音楽が運んだ思想——グレイトフル・デッド</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        この時代の空気を、もっとも広く運んだのが音楽でした。作家ケン・キージー（『カッコーの巣の上で』の著者）と仲間の「メリー・プランクスターズ」は、1965〜66年に西海岸で「<strong>アシッド・テスト</strong>」と呼ばれる実験的なパーティを開きます。その模様は、トム・ウルフのノンフィクション『The Electric Kool-Aid Acid Test』（1968）に記録されました<sup className="text-[#FF9855] font-bold">[4]</sup>。
                        {'\n\n'}
                        そのハウスバンドを務めたのが、結成まもない<strong>グレイトフル・デッド</strong>でした。即興を軸にした長い演奏と、「デッドヘッズ」と呼ばれる熱心なファンとの独特の共同体で知られます。彼らはやがて、<strong>観客がライブを録音すること（テーピング）を公認し、会場に専用エリアまで設けました</strong>。「コピーは自由に共有してよい」という発想は、のちのオープンでフリーな文化を先取りするものでした<sup className="text-[#FF9855] font-bold">[4]</sup>。
                        {'\n\n'}
                        そして決定的なつながりがあります。デッドの作詞家<strong>ジョン・ペリー・バーロウ</strong>は、1990年に<strong>電子フロンティア財団（EFF）</strong>を共同設立し、1996年に「<strong>サイバースペース独立宣言</strong>」を発表しました<sup className="text-[#FF9855] font-bold">[5]</sup>。インターネット上の自由と権利を守る運動の草分けです。対抗文化の合言葉だった「個人の自由」は、デッドの歌詞から、そのままネットの自由を守る思想へと受け継がれていきました。
                    </p>
                </section>

                {/* イギリスからの呼応 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">海を越えた呼応——ビートルズとストーンズ</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        西海岸の動きは、海を越えてイギリスのロックと響き合いました。<strong>ビートルズ</strong>は1967年、世界初の衛星生中継番組『Our World』で「<strong>All You Need Is Love</strong>」を演奏。推定で数億人が見たとされ、サマー・オブ・ラブの讃歌になりました。同年の『Sgt. Pepper&rsquo;s Lonely Hearts Club Band』は、時代を象徴するサイケデリックな名盤です<sup className="text-[#FF9855] font-bold">[11]</sup>。
                        {'\n\n'}
                        彼らは1968年、インド・リシケシュで<strong>マハリシ・マヘーシュ・ヨーギー</strong>のもと超越瞑想（TM）を学びます。ジョージ・ハリスンはシタールとインド思想を西洋に紹介しました。この「東洋への関心」は、のちのスティーブ・ジョブズのインド放浪とも、まっすぐにつながっていきます。
                        {'\n\n'}
                        <strong>ローリング・ストーンズ</strong>も、1967年の「We Love You」やサイケデリックなアルバム『Their Satanic Majesties Request』で、この流れに呼応しました<sup className="text-[#FF9855] font-bold">[12]</sup>。
                        {'\n\n'}
                        ただし、光だけの時代ではありません。1969年12月、ストーンズが出演した<strong>オルタモントの無料コンサート</strong>では観客が死亡する事件が起き、「60年代の夢の終わり」とも語られます。陶酔の季節には、確かに影もありました——この両面を見ておくことが大切です。
                    </p>
                </section>

                {/* ホール・アース・カタログ */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">「道具へのアクセス」という発明</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        『Whole Earth Catalog』が新しかったのは、商品の通販ではなく<strong>「自分の暮らしを自分の手でつくるための道具と知識」</strong>を、専門家を介さず一覧にしたことでした。農具から電卓、シンセサイザー、哲学書まで——「これがあれば、自分にもできる」を集めたのです<sup className="text-[#FF9855] font-bold">[1]</sup>。
                        {'\n\n'}
                        創刊者スチュアート・ブランドは、その前年（1966年）に「<strong>なぜ私たちはまだ地球全体の写真を見ていないのか？</strong>」というバッジを配る運動を起こした人物でもあります。やがてNASAが撮影した青い地球の写真は、カタログの表紙になり、環境運動の象徴にもなりました<sup className="text-[#FF9855] font-bold">[2]</sup>。
                        {'\n\n'}
                        この雑誌は当時の若者に大きな影響を与え、1972年には全米図書賞を受賞。最終号（1974年）の裏表紙の言葉が、のちに有名になります——<strong>"Stay Hungry. Stay Foolish."（ハングリーであれ、愚かであれ）</strong>。ブランドはのちに、1984年のハッカーズ会議で「<strong>情報は自由になりたがる（Information wants to be free）</strong>」とも語り、オープンな情報文化の象徴的な言葉を残しました<sup className="text-[#FF9855] font-bold">[2]</sup>。
                    </p>
                </section>

                {/* コンピュータへ */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">対抗文化が、コンピュータを「個人の道具」にした</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        1960年代まで、コンピュータは政府や大企業のための巨大な機械で、対抗文化の若者からはむしろ「管理社会の象徴」と見られていました。それを<strong>「個人が自分を拡張するための道具」</strong>へと読みかえたのが、西海岸の研究者と愛好家たちです。
                        {'\n\n'}
                        1968年、ダグラス・エンゲルバートは、マウス・ウィンドウ・ハイパーテキストなどを世界で初めて公開しました（のちに「すべてのデモの母」と呼ばれます）<sup className="text-[#FF9855] font-bold">[6]</sup>。スチュアート・ブランド自身もこのデモに関わり、対抗文化と計算機科学を橋渡しした人物として知られます<sup className="text-[#FF9855] font-bold">[3]</sup>。1975年にシリコンバレーで始まった「ホームブリュー・コンピュータ・クラブ」では、自作コンピュータを持ち寄る文化が育ち、ここからアップルをはじめ多くの企業が生まれました。
                        {'\n\n'}
                        象徴的な人物が、元ハーバード大学の心理学者<strong>ティモシー・リアリー</strong>です。1960年代に「ターン・オン、チューン・イン、ドロップアウト」を掲げて幻覚剤を広め、社会に大きな波紋を呼びました。その彼が晩年にはコンピュータに可能性を見出し、「<strong>パソコンは90年代のLSDだ</strong>」と語ります<sup className="text-[#FF9855] font-bold">[7]</sup>。「意識を拡張する道具」という見立てを、薬から計算機へとずらした言葉でした。
                        {'\n\n'}
                        ブランドの活動も、紙からネットへと続きます。1985年、彼は「<strong>The WELL（Whole Earth ’Lectronic Link）</strong>」という、最初期のオンライン・コミュニティの一つを立ち上げました<sup className="text-[#FF9855] font-bold">[8]</sup>。『Whole Earth Catalog』の "access to tools" は、形を変えて<strong>「access to computing（計算する力へのアクセス）」</strong>、さらに「access to network（つながる力へのアクセス）」になった——いまのパソコンやインターネットの根っこには、この思想が流れています。
                    </p>
                </section>

                {/* スティーブ・ジョブズ */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">スティーブ・ジョブズという結び目</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        これらの流れが一人の人物の中で交わったのが、スティーブ・ジョブズです。彼は若い頃、1974年にインドを放浪して禅仏教に深く傾倒し、生涯その実践を続けました。また、自身の公式伝記の中で、若い頃のLSD体験を「人生で最も重要なことの一つだった」と語っています<sup className="text-[#FF9855] font-bold">[9]</sup>。
                        {'\n\n'}
                        ここで大切なのは、これを<strong>美談や使用の勧めとして語らない</strong>ことです。彼の創造性が「薬のおかげ」だと単純化するのは事実に反しますし、同じ時代に多くの人が依存や健康被害で苦しんだ事実も忘れてはなりません。確かなのは、<strong>「既存の枠を疑い、世界を別の角度から見ようとする対抗文化の姿勢」が、彼のものづくりに深く影響していた</strong>ということです。
                        {'\n\n'}
                        2005年、スタンフォード大学の卒業式。ジョブズはスピーチを、子どもの頃に愛読した『Whole Earth Catalog』最終号の裏表紙の言葉で締めくくりました——<strong>"Stay Hungry. Stay Foolish."</strong><sup className="text-[#FF9855] font-bold">[10]</sup>。対抗文化の合言葉が、半世紀をまたいで世界中の若者に手渡された瞬間でした。
                    </p>
                </section>

                {/* 規制と、いまの研究 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">規制が分けた、二つの未来</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        対抗文化のエネルギーは、すべてが技術へ向かったわけではありません。もう一方では、薬物の社会問題化を受けて<strong>厳しい規制</strong>が敷かれました。アメリカは1970年の規制物質法で幻覚剤を最も厳しい分類（スケジュールI）に指定し、1971年の国連条約もこれに続きます。その結果、1950〜60年代に進んでいた精神医学の研究は、数十年にわたってほぼ止まりました。
                        {'\n\n'}
                        つまり同じ時代の流れが、<strong>「パーソナルコンピュータ」という形で社会を変えた部分</strong>と、<strong>「規制され、長く眠った」部分</strong>に分かれたのです。そして2000年代以降、後者についても、厳格な倫理基準のもとで臨床研究が再開されつつあります。その現在地は、別ページで中立にまとめています。
                    </p>
                    <Link href="/psychedelics-research"
                        className="inline-flex items-center gap-2 px-6 py-3 mt-4 rounded-full text-sm font-bold hover:opacity-90 transition"
                        style={{ background: '#FF9855', color: '#1A1A1A' }}>
                        サイケデリック研究の潮流
                        <span>→</span>
                    </Link>
                </section>

                {/* アイデアを分かち合う */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">アイデアを分かち合う——TED、イーノ、ロング・ナウ</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        「個人に道具を、知識を分かち合う」という発想は、その後さまざまな<strong>“場”</strong>として制度化されていきました。
                        {'\n\n'}
                        1984年、リチャード・ソウル・ワーマンらが「<strong>Technology, Entertainment, Design</strong>」を掲げて<strong>TED</strong>を創設します。第1回ではアップルのMacintoshやソニーのCDが披露されました。当初は一度きりのイベントでしたが、のちに「<strong>広める価値のあるアイデア（ideas worth spreading）</strong>」を掲げ、2006年からは講演を無料でネット公開。知識を囲い込まず分かち合うその姿勢は、ホール・アース的な精神の現代版といえます<sup className="text-[#FF9855] font-bold">[13]</sup>。
                        {'\n\n'}
                        音楽の側では、<strong>ブライアン・イーノ</strong>が「<strong>アンビエント・ミュージック</strong>」を提唱し（『Music for Airports』1978）、作り手の意図を超えて変化し続ける「ジェネレーティブ・ミュージック」を追求しました。創造の行き詰まりを破るカード「オブリーク・ストラテジーズ」でも知られます<sup className="text-[#FF9855] font-bold">[14]</sup>。
                        {'\n\n'}
                        そのイーノは1996年、<strong>スチュアート・ブランドらとともに「ロング・ナウ協会」を共同設立</strong>しました。「いま」をもっと長い時間軸でとらえ直す運動で、1万年動き続ける時計を構想しています。イーノは「<strong>The Long Now</strong>」という名前そのものを考案し、その理念を音楽にもしました<sup className="text-[#FF9855] font-bold">[15]</sup>。半世紀前のカタログの精神は、こうして<strong>「もっと長い未来」</strong>へと手渡されています。
                    </p>
                </section>

                {/* Mitoflow40との接続 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">なぜ、この話をここで</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        Mitoflow40がこの歴史に触れるのは、その根っこにある思想——<strong>"access to tools"（個人に、自分をつくる道具を）</strong>——が、私たちのライブラリの考え方とそのまま重なるからです。
                        {'\n\n'}
                        健康の情報を、専門家や権威だけのものにしない。遺伝子・血液検査・栄養という<strong>「道具」と「知識」を一人ひとりに手渡し、自分の体を自分で読み解けるようにする</strong>。半世紀前の若者が紙のカタログでやろうとしたことを、私たちは健康の領域でやろうとしています。
                        {'\n\n'}
                        ただし学ぶべき教訓もセットです。当時の熱狂は、無管理な使用による健康被害という大きな代償も伴いました。だからこそ私たちは、<strong>合法で、安全で、検証された土台</strong>——食事・睡眠・運動・栄養——から整えることを大切にしています。
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                        <Link href="/nutrition-literacy" className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">学ぶと、何が変わる？</Link>
                        <Link href="/precision-nutrition" className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">精密栄養学とは</Link>
                        <Link href="/mission" className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">なぜ、未病予防か</Link>
                    </div>
                </section>

                {/* 免責 */}
                <p className="text-xs text-[#4A4A4A]/70 leading-relaxed mb-8 p-4 bg-white/60 rounded-lg border border-[#1A1A1A]/10">
                    ※ 本記事は思想・技術の歴史に関する一般的・教育的な情報であり、いかなる薬物の使用も推奨・勧誘するものではありません。日本国内での所持・使用は違法です。
                </p>

                {/* 参照 */}
                <section className="mb-10">
                    <h2 className="text-lg font-bold text-[#1A1A1A] mb-3 border-l-4 border-[#41C9B4] pl-3 leading-tight">参照</h2>
                    <ol className="bg-white/70 rounded-2xl p-5 md:p-6 border border-black space-y-2 text-sm list-none">
                        <li>
                            <span className="text-[#FF9855] font-bold mr-1">[1]</span>
                            <a href="https://www.wholeearth.info/" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                Whole Earth Index（『Whole Earth Catalog』全号アーカイブ）
                            </a>
                            <span className="text-[#1A1A1A]/50"> — Whole Earth / Stewart Brand</span>
                        </li>
                        <li>
                            <span className="text-[#FF9855] font-bold mr-1">[2]</span>
                            <a href="https://longnow.org/people/board/stewart-brand/" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                Stewart Brand（地球写真キャンペーン・「Information wants to be free」などの来歴）
                            </a>
                            <span className="text-[#1A1A1A]/50"> — The Long Now Foundation</span>
                        </li>
                        <li>
                            <span className="text-[#FF9855] font-bold mr-1">[3]</span>
                            <a href="https://press.uchicago.edu/ucp/books/book/chicago/F/bo3773600.html" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                From Counterculture to Cyberculture（対抗文化とコンピュータ文化のつながりを論じた研究書）
                            </a>
                            <span className="text-[#1A1A1A]/50"> — Fred Turner, University of Chicago Press（2006）</span>
                        </li>
                        <li>
                            <span className="text-[#FF9855] font-bold mr-1">[4]</span>
                            <a href="https://www.britannica.com/topic/the-Grateful-Dead" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                the Grateful Dead（結成・アシッド・テスト・テーピング文化など）
                            </a>
                            <span className="text-[#1A1A1A]/50"> — Encyclopædia Britannica</span>
                        </li>
                        <li>
                            <span className="text-[#FF9855] font-bold mr-1">[5]</span>
                            <a href="https://www.eff.org/cyberspace-independence" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                A Declaration of the Independence of Cyberspace（John Perry Barlow・1996）
                            </a>
                            <span className="text-[#1A1A1A]/50"> — Electronic Frontier Foundation（バーロウが共同設立）</span>
                        </li>
                        <li>
                            <span className="text-[#FF9855] font-bold mr-1">[6]</span>
                            <a href="https://dougengelbart.org/content/view/209/" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                The Demo（1968年「すべてのデモの母」の記録）
                            </a>
                            <span className="text-[#1A1A1A]/50"> — Doug Engelbart Institute</span>
                        </li>
                        <li>
                            <span className="text-[#FF9855] font-bold mr-1">[7]</span>
                            <span className="text-[#1A1A1A]">
                                John Markoff『What the Dormouse Said: How the Sixties Counterculture Shaped the Personal Computer Industry』（2005）— ティモシー・リアリーらと初期PC産業のつながりを論じた書。
                            </span>
                        </li>
                        <li>
                            <span className="text-[#FF9855] font-bold mr-1">[8]</span>
                            <a href="https://www.well.com/" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                The WELL（Whole Earth ’Lectronic Link・1985〜）
                            </a>
                            <span className="text-[#1A1A1A]/50"> — well.com</span>
                        </li>
                        <li>
                            <span className="text-[#FF9855] font-bold mr-1">[9]</span>
                            <span className="text-[#1A1A1A]">
                                Walter Isaacson『Steve Jobs』（2011）— ジョブズ自身のLSD体験・インド放浪に関する発言が記録された公式伝記。
                            </span>
                        </li>
                        <li>
                            <span className="text-[#FF9855] font-bold mr-1">[10]</span>
                            <a href="https://news.stanford.edu/2005/06/12/youve-got-find-love-jobs-says/" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                &lsquo;You&rsquo;ve got to find what you love,&rsquo; Jobs says（2005年スタンフォード大卒業式スピーチ全文）
                            </a>
                            <span className="text-[#1A1A1A]/50"> — Stanford News</span>
                        </li>
                        <li>
                            <span className="text-[#FF9855] font-bold mr-1">[11]</span>
                            <a href="https://www.britannica.com/topic/the-Beatles" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                the Beatles（&ldquo;All You Need Is Love&rdquo;・Sgt. Pepper&rsquo;s・インドでの瞑想修行など）
                            </a>
                            <span className="text-[#1A1A1A]/50"> — Encyclopædia Britannica</span>
                        </li>
                        <li>
                            <span className="text-[#FF9855] font-bold mr-1">[12]</span>
                            <a href="https://www.britannica.com/topic/the-Rolling-Stones" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                the Rolling Stones（&ldquo;We Love You&rdquo;・Satanic Majesties・オルタモントなど）
                            </a>
                            <span className="text-[#1A1A1A]/50"> — Encyclopædia Britannica</span>
                        </li>
                        <li>
                            <span className="text-[#FF9855] font-bold mr-1">[13]</span>
                            <a href="https://www.ted.com/about/our-organization/history-of-ted" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                History of TED（1984年の創設・&ldquo;ideas worth spreading&rdquo;）
                            </a>
                            <span className="text-[#1A1A1A]/50"> — TED</span>
                        </li>
                        <li>
                            <span className="text-[#FF9855] font-bold mr-1">[14]</span>
                            <a href="https://www.britannica.com/biography/Brian-Eno" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                Brian Eno（アンビエント／ジェネレーティブ・ミュージックの先駆者）
                            </a>
                            <span className="text-[#1A1A1A]/50"> — Encyclopædia Britannica</span>
                        </li>
                        <li>
                            <span className="text-[#FF9855] font-bold mr-1">[15]</span>
                            <a href="https://longnow.org/about/" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                About The Long Now Foundation（ブランド・イーノらが共同設立、「The Long Now」の理念）
                            </a>
                            <span className="text-[#1A1A1A]/50"> — The Long Now Foundation</span>
                        </li>
                    </ol>
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
