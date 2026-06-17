import Link from 'next/link';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: '気になる腸のキーワード ｜ グルテン・カゼイン・リーキーガット・SIBO | Mitoflow40',
    description: 'グルテンフリー、カゼイン（乳タンパク質）、リーキーガット、SIBO——腸まわりでよく耳にする言葉を、「医学的に確立していること」と「まだ仮説の段階のこと」を分けて中立に解説します。自己判断せず、気になる症状は医療機関への相談を。',
    alternates: { canonical: 'https://mitoflow40.com/gut-troubles' },
    openGraph: {
        title: '気になる腸のキーワード ｜ Mitoflow40',
        description: 'グルテンフリー・リーキーガット・SIBO を、確立した事実と仮説を分けて中立に解説。',
        url: 'https://mitoflow40.com/gut-troubles',
        type: 'article',
    },
};

export default function GutTroublesPage() {
    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#CDEBE2' }}>
            <img loading="lazy" decoding="async" src="/images/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block"
                style={{ top: '0', right: '-40px', width: '260px', transform: 'scaleY(-1)' }} />
            <img loading="lazy" decoding="async" src="/images/24.png" alt="" className="absolute pointer-events-none"
                style={{ bottom: '-40px', left: '-40px', width: '260px' }} />

            <JsonLd data={medicalWebPage({ name: '気になる腸のキーワード', description: 'グルテンフリー・リーキーガット・SIBO を、確立した事実と仮説を分けて中立に解説。', path: '/gut-troubles' })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: '身体の仕組み', path: '/library#mechanism' }, { name: '気になる腸のキーワード', path: '/gut-troubles' }])} />

            <article className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '身体の仕組み', href: '/library#mechanism' }, { name: '気になる腸のキーワード' }]} />
                <header className="mb-12 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>GUT KEYWORDS</p>
                    <h1 className="text-3xl md:text-5xl font-bold mt-6 mb-8 md:mt-8 md:mb-10 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        気になる腸のキーワード
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-loose max-w-[620px] mx-auto text-left">
                        グルテンフリー、リーキーガット、SIBO——腸の話題でよく耳にする言葉です。情報があふれて不安になりがちですが、<strong>「医学的に確立していること」と「まだ仮説の段階のこと」を分けて</strong>知れば、振り回されずにすみます。
                    </p>
                </header>

                {/* グルテンフリー */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#FF9855] pl-3 leading-tight">グルテンフリー</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        グルテンは、小麦・大麦・ライ麦などに含まれるタンパク質です。グルテンフリーとは、これを避ける食事のこと。
                        {'\n\n'}
                        <strong>必要な人にとっては、欠かせない医療です。</strong>「セリアック病」という自己免疫の病気の人や、グルテンで不調が出る「グルテン過敏（不耐）」の人は、グルテンを除くことが治療や体調管理に直結します。
                        {'\n\n'}
                        一方で、<strong>そうした体質でない一般の人に、グルテンフリーが健康に良いという科学的根拠は、いまのところ確立していません。</strong>流行で安易に小麦を抜くと、全粒穀物の食物繊維やビタミンが不足し、かえって栄養が偏ることもあります。「なんとなく良さそう」で全面的に避けるより、自分の体に合うかを見ていく姿勢が大切です。
                    </p>
                    <p className="text-[11px] text-[#4A4A4A]/60 mt-3 leading-relaxed">
                        ※ グルテンで不調が疑われる場合、自己判断で完全に除去する前に医師にご相談を。先に抜いてしまうと、セリアック病などの正確な検査ができなくなることがあります。
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                        <Link href="/wheat" className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">小麦と健康（血糖・精製も）</Link>
                    </div>
                </section>

                {/* カゼイン */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#FF9855] pl-3 leading-tight">カゼイン（乳タンパク質）</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        カゼインは、牛乳に含まれるタンパク質の主成分（約8割）です。グルテンと並んで「合わない人がいる食物タンパク質」として話題になります。
                        {'\n\n'}
                        まず整理したいのが、よく混同される「<strong>乳糖不耐</strong>」との違いです。乳糖不耐は牛乳の<strong>糖（ラクトース）</strong>を分解できずにお腹がゆるくなるもので、<strong>タンパク質であるカゼインの話とは別</strong>です。一方、カゼインなど乳タンパク質に対する「<strong>牛乳アレルギー</strong>」は、医学的に確立した反応で、該当する人は除去が必要です。
                        {'\n\n'}
                        近年は、カゼインの型の違い（<strong>A1／A2</strong>）や、グルテンフリーと組み合わせた「カゼインフリー」食が話題になることもあります。ただし、これらが一般の人の健康や特定の症状に有効だという科学的根拠は、<strong>いまのところ十分ではありません</strong>。乳製品は手軽なタンパク質・カルシウム源でもあるため、なんとなく避けるより、自分の体に合うかを見ていくのが現実的です。
                    </p>
                    <p className="text-[11px] text-[#4A4A4A]/60 mt-3 leading-relaxed">
                        ※ 乳製品で明らかな不調（腹痛・下痢・湿疹など）が出る場合は、自己判断で続けず、医師にご相談ください。アレルギーかどうかは検査で確認できます。
                    </p>
                </section>

                {/* リーキーガット */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#FF9855] pl-3 leading-tight">リーキーガット（腸もれ）</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        腸の内側の壁は、たった一層の細胞が、すき間なく手をつなぐようにして並んでできています。この「手のつなぎ目」を<strong>タイトジャンクション（密着結合）</strong>と呼び、栄養という小さなものだけを通し、未消化の大きな分子や有害物質、細菌はブロックする——という、精巧なふるいの役割を果たしています。
                        {'\n\n'}
                        この結びつきがゆるみ、本来通さないはずのものが漏れ出やすくなる状態が「<strong>リーキーガット（腸もれ）</strong>」です。何がゆるめるのかは研究途上ですが、<strong>慢性的なストレス、アルコールや超加工食品の摂りすぎ、一部の薬（痛み止めなど）、腸内環境の乱れ</strong>などが関わると考えられています。「ゾヌリン」というタンパク質が、つなぎ目の開閉に関わるという説も注目されています。
                        {'\n\n'}
                        腸の透過性が上がること自体は、セリアック病などで実際に観察され、測定もできる<strong>確かな現象</strong>です。問題とされるのは、本来は腸の中にとどまるべき<strong>未消化のタンパク質や、細菌の成分（内毒素＝LPSなど）が、腸の壁を越えて血液中に漏れ出してしまう</strong>こと。すると、それらは全身をめぐりながら免疫を刺激し、<strong>慢性的な炎症</strong>を通じて、疲労・肌の不調・アレルギーのような症状につながるのではないか——という仮説が研究されています。
                        {'\n\n'}
                        さらに近年は、こうして乱れた免疫が、<strong>自己免疫疾患</strong>（免疫が誤って自分自身の組織を攻撃してしまう病気）の発症や悪化にも関わるのではないか、という視点からの研究も進められています。実際、セリアック病や一部の自己免疫疾患では、腸の透過性との関連が指摘されています。ただし、これも<strong>「腸もれが自己免疫疾患を引き起こす」と断定できる段階ではありません</strong>。あくまで、腸と免疫の深いつながりを示す、研究途上のテーマとして捉えるのが正確です。
                        {'\n\n'}
                        ただし注意したいのは、<strong>「リーキーガット症候群」という独立した病気が医学的に確立しているわけではない</strong>ということ。症状とされるものは幅広く具体性に欠け、因果関係もはっきり証明されていません。「不調はすべて腸もれが原因」とうたって高額な検査やサプリをすすめる情報には、慎重になってください。
                        {'\n\n'}
                        過度に怖がる必要はありません。確かなのは、<strong>腸の壁を支えるのも、結局は日々の食事と生活</strong>だということ。食物繊維・発酵食品で腸内環境を整え、睡眠とストレスをケアし、アルコールや超加工食品を控える——腸活の基本が、そのまま壁のケアにもなります。
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                        {[{ href: '/gut-health', label: '腸内環境（腸活）' }, { href: '/inflammation', label: '炎症' }, { href: '/stress', label: 'ストレス' }].map((l) => (
                            <Link key={l.href} href={l.href} className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">{l.label}</Link>
                        ))}
                    </div>
                </section>

                {/* SIBO */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#FF9855] pl-3 leading-tight">SIBO（小腸内細菌増殖症）</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        腸内細菌の大半は<strong>大腸</strong>にすみ、その手前の<strong>小腸</strong>は本来、菌が比較的少なく保たれています。これは、小腸の<strong>ぜん動運動（中身を先へ送る動き）</strong>、<strong>胃酸</strong>、小腸と大腸の境にある<strong>弁</strong>などが、菌の増えすぎや逆流を防いでいるからです。
                        {'\n\n'}
                        こうした仕組みが弱まると、小腸で細菌が異常に増えてしまうことがあります。これが「<strong>SIBO（小腸内細菌増殖症）</strong>」です。増えた菌が、本来大腸でするはずの発酵を小腸で起こすため、<strong>食後のお腹の張り・ガス・げっぷ・下痢や便秘</strong>、ときに栄養の吸収低下といった症状につながるとされます。胃酸を抑える薬の長期使用、腸の動きの低下、過去の腹部手術、糖尿病などが、背景になることがあります。
                        {'\n\n'}
                        ここが大事な点ですが、SIBOはリーキーガットと違い、<strong>医学的に認識された病態</strong>です。診断には<strong>呼気検査</strong>などが用いられ、治療では医師の管理のもとで<strong>抗菌薬</strong>や、発酵しやすい糖質を一時的に減らす<strong>食事療法（低FODMAPなど）</strong>が行われます。過敏性腸症候群（IBS）との関連も研究されています。
                        {'\n\n'}
                        だからこそ、<strong>自己診断と自己流の食事制限は禁物</strong>です。「自分はSIBOかも」と思い込んで、低FODMAPなどの厳しい制限を自己流で長く続けると、栄養が偏ったり、腸内環境の多様性をかえって損なったり、本当の原因を見逃したりすることがあります。お腹の張りやガスが続いてつらい場合は、ネットの情報で判断せず、<strong>消化器内科などの医療機関で相談する</strong>のが、結局いちばんの近道です。
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                        {[{ href: '/digestion', label: '消化・吸収' }, { href: '/gut-health', label: '腸内環境' }, { href: '/symptoms', label: '症状から引く' }].map((l) => (
                            <Link key={l.href} href={l.href} className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">{l.label}</Link>
                        ))}
                    </div>
                </section>

                {/* 共通の着地 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">3つに共通する、向き合い方</h2>
                    <p className="text-[#4A4A4A] leading-loose">
                        どのキーワードにも共通するのは、<strong>「自分で決めつけない」「腸の土台を整える」「気になる症状は医療機関へ」</strong>の3つです。流行や不安に振り回されるより、まずは食物繊維・発酵食品・睡眠・ストレスケアといった<strong>腸内環境の基本</strong>を整えること。そのうえで、つらい症状があれば専門家に頼る。これが、遠回りに見えていちばん確実です。
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                        {[{ href: '/gut-health', label: '腸内環境（腸活）' }, { href: '/digestion', label: '消化・吸収' }, { href: '/gut-brain', label: '腸脳相関' }, { href: '/caution-foods', label: '気をつけたい食品' }].map((l) => (
                            <Link key={l.href} href={l.href} className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">{l.label}</Link>
                        ))}
                    </div>
                </section>

                {/* 免責 */}
                <p className="text-xs text-[#4A4A4A]/70 leading-relaxed mb-10 p-4 bg-white/60 rounded-lg border border-[#1A1A1A]/10">
                    ※ 本記事は一般的・教育的な情報であり、特定の食事法を推奨したり、診断・治療を目的とするものではありません。腹痛・下痢・便秘・体重減少などの症状が続く場合は、自己判断せず医療機関にご相談ください。
                </p>

                <div className="text-center flex flex-wrap justify-center gap-3">
                    <Link href="/gut-health" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">腸内環境（腸活）へ</Link>
                    <Link href="/library" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">← Library に戻る</Link>
                </div>
            </article>
        </div>
    );
}
