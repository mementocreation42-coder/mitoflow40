import Link from 'next/link';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: '医療者の役割とMitoflow40の立ち位置 | Mitoflow40',
    description: '医師・看護師・薬剤師・管理栄養士・保健師など、医療従事者それぞれの役割・できること・できないことを整理。そのうえで、診断や治療は行わず「未病のうちに整える」を支えるMitoflow40の立ち位置をやさしく解説します。',
    alternates: { canonical: 'https://mitoflow40.com/medical-roles' },
    openGraph: {
        title: '医療者の役割とMitoflow40の立ち位置 | Mitoflow40',
        description: '誰が何を担い、何ができて何ができないのか。医療者の役割を整理し、Mitoflow40がどこに立つのかを明らかにします。',
        url: 'https://mitoflow40.com/medical-roles',
        type: 'article',
    },
};

// 医療従事者の役割マップ
type Role = {
    name: string;
    en: string;
    color: string;
    summary: string;
    can: string[];
    cannot: string[];
    license?: '国家資格' | '民間資格';
};

const roles: Role[] = [
    {
        name: '医師',
        en: 'DOCTOR',
        color: '#F6DAD4',
        summary: '病気の診断・治療の最終責任を負う、医療の中心。',
        can: ['病名を「診断」する', '薬の処方・注射・手術などの医行為', '検査の指示と結果の医学的判断', '診断書・処方箋の発行'],
        cannot: ['一人ですべての生活習慣まで伴走するのは時間的に困難', '診療は基本的に「病気がある人」が対象'],
    },
    {
        name: '看護師',
        en: 'NURSE',
        color: '#FBE9D6',
        summary: '医師の指示のもと、療養上の世話と診療の補助を担う。',
        can: ['採血・点滴・注射など診療の補助（医師の指示下）', '療養上の世話・ケア・観察', '患者・家族への療養指導'],
        cannot: ['病名の「診断」', '薬の「処方」', '医師の指示なしの医行為'],
    },
    {
        name: '薬剤師',
        en: 'PHARMACIST',
        color: '#E4E9D2',
        summary: '薬の専門家。調剤と、薬の安全な使い方を支える。',
        can: ['処方箋にもとづく調剤', '飲み合わせ・副作用のチェックと説明', '市販薬・サプリの相談対応'],
        cannot: ['病名の「診断」', '処方箋なしの医療用医薬品の交付'],
    },
    {
        name: '管理栄養士・栄養士',
        en: 'DIETITIAN',
        color: '#D7EAE2',
        summary: '食事・栄養の専門家。病態や目的に応じた食事を設計する。',
        can: ['栄養状態の評価と食事計画の作成', '疾患に応じた栄養指導（医師の指示下での栄養食事指導）', '健康な人への食生活アドバイス'],
        cannot: ['病名の「診断」', '薬の「処方」', '治療としての医行為'],
    },
    {
        name: '保健師',
        en: 'PUBLIC HEALTH NURSE',
        color: '#CDE3EE',
        summary: '地域・職域で、集団と個人の「予防」と健康づくりを担う。',
        can: ['健診後の保健指導・特定保健指導', '生活習慣病の予防支援', '地域・企業の健康づくり'],
        cannot: ['病名の「診断」', '薬の「処方」', '治療行為'],
    },
    {
        name: '理学療法士など（PT/OT/ST）',
        en: 'THERAPISTS',
        color: '#E6DCEA',
        summary: 'リハビリの専門家。動き・生活・嚥下などの機能回復を支える。',
        can: ['医師の指示下でのリハビリ（運動・作業・言語/嚥下）', '機能評価と訓練プログラムの作成'],
        cannot: ['病名の「診断」', '薬の「処方」', '医師の指示によらない単独の医行為'],
    },
    {
        name: '臨床検査技師',
        en: 'LAB TECHNOLOGIST',
        color: '#D9E7D2',
        summary: '検査の専門家。血液・尿・心電図などを正確に測り、診断を支える。',
        can: ['採血・各種検体検査・生理機能検査（心電図・超音波など）', '検査データの精度管理', '検査結果の作成（医師の指示下）'],
        cannot: ['検査結果から病名を「診断」すること', '薬の「処方」', '治療としての医行為'],
    },
    {
        name: '公認心理師・臨床心理士',
        en: 'PSYCHOLOGIST',
        color: '#E3DCEA',
        summary: '心の専門家。心理面のアセスメントとカウンセリングを担う。',
        can: ['心理状態のアセスメント（心理検査など）', 'カウンセリング・心理的支援', '関係者への助言・連携'],
        cannot: ['精神疾患の医学的「診断」', '薬の「処方」', '医行為'],
    },
    {
        name: '歯科医師',
        en: 'DENTIST',
        color: '#F1DEC9',
        summary: '口腔の専門医。歯・口の診断と治療を担う、もう一人の「医師」。',
        can: ['歯・口腔の「診断」と治療', '歯科領域の薬の処方・麻酔・手術', '口腔ケアの指導'],
        cannot: ['歯科以外の全身疾患の診断・治療（専門外は医師へ）'],
    },
    {
        name: 'はり師・きゅう師（鍼灸師）',
        en: 'ACUPUNCTURIST',
        color: '#F3DDD9',
        license: '国家資格',
        summary: '東洋医学にもとづき、はり・きゅうで体のバランスを整える。',
        can: ['はり・きゅうによる施術', '東洋医学の考え方にもとづく体調へのアプローチ', '肩こり・腰痛などへの施術（医師の同意が必要な場合あり）'],
        cannot: ['病名の「診断」', '薬の「処方」', '西洋医学的な治療の代替を約束すること'],
    },
    {
        name: 'あん摩マッサージ指圧師',
        en: 'MASSAGE THERAPIST',
        color: '#EDE3D4',
        license: '国家資格',
        summary: 'あん摩・マッサージ・指圧で、筋肉や血流の状態を整える手技の専門家。',
        can: ['あん摩・マッサージ・指圧の施術', 'こり・血行・疲労へのケア', '医療機関と連携した施術'],
        cannot: ['病名の「診断」', '薬の「処方」', '骨折・脱臼などの治療（柔道整復師・医師の領域）'],
    },
    {
        name: '柔道整復師',
        en: 'JUDO THERAPIST',
        color: '#E2E8D6',
        license: '国家資格',
        summary: '骨・関節・筋のケガ（打撲・捻挫・脱臼・骨折）を手技で施術する専門家。',
        can: ['打撲・捻挫・挫傷の施術', '脱臼・骨折の応急手当', '接骨院・整骨院での施術'],
        cannot: ['病名の「診断」（レントゲン等による医学的診断）', '薬の「処方」・手術', '内科的な病気の治療'],
    },
    {
        name: '整体師・カイロプラクターなど',
        en: 'BODYWORK (NON-LICENSED)',
        color: '#E6DCEA',
        license: '民間資格',
        summary: '体の歪みや姿勢へのアプローチを掲げる民間療法。国家資格ではない点に注意。',
        can: ['リラクゼーション・ボディケア（民間の範囲）', '姿勢・生活習慣に関する一般的なアドバイス'],
        cannot: ['病名の「診断」', '薬の「処方」', '医行為・国家資格者だけに許された施術（はり・きゅう・骨折治療など）'],
    },
];

export default function MedicalRolesPage() {
    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#CDEBE2' }}>
            <img loading="lazy" decoding="async" src="/images/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block"
                style={{ top: '0', right: '-40px', width: '260px', transform: 'scaleY(-1)' }} />
            <img loading="lazy" decoding="async" src="/images/24.png" alt="" className="absolute pointer-events-none"
                style={{ bottom: '-40px', left: '-40px', width: '260px' }} />

            <JsonLd data={medicalWebPage({ name: '医療者の役割とMitoflow40の立ち位置', description: '医療従事者それぞれの役割・できること・できないことを整理し、診断や治療は行わず「未病のうちに整える」を支えるMitoflow40の立ち位置を解説します。', path: '/medical-roles' })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: '医療者の役割とMitoflow40の立ち位置', path: '/medical-roles' }])} />

            <article className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '医療者の役割とMitoflow40の立ち位置' }]} />
                <header className="mb-12 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>
                        WHO DOES WHAT
                    </p>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        ROLES IN HEALTH CARE
                        <span className="block text-base md:text-lg mt-2 text-[#1A1A1A]/70" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>医療者の役割と、Mitoflow40の立ち位置</span>
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-relaxed max-w-[620px] mx-auto">
                        誰が何を担い、何ができて、何ができないのか。医療者の役割を整理したうえで、Mitoflow40がどこに立つのかをはっきりさせます。
                    </p>
                </header>

                {/* なぜ役割を知ることが大切か */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">「誰に頼ればいいか」がわかると、迷わない</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        体の不調を感じたとき、私たちはまず「どこに相談すればいいんだろう」と迷います。医療には、医師・看護師・薬剤師・管理栄養士・保健師——たくさんの専門職が関わっていて、それぞれ<strong>できること・できないこと（役割の線引き）</strong>が法律で決まっています。
                        {'\n\n'}
                        この線引きを知っておくと、いざというときに「これは病院へ」「これは食事や生活の見直しから」と、自分で判断の入口を選べるようになります。Mitoflow40がどこに立っているのかも、この地図の中で見るといちばんわかりやすくなります。
                    </p>
                </section>

                {/* 役割マップ */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#41C9B4] pl-3 leading-tight">医療者の役割マップ</h2>
                    <p className="text-sm text-[#4A4A4A] mb-3 leading-relaxed">
                        主な医療職、そして東洋医学・手技療法の担い手まで、「担うこと」と「できること・できないこと」を整理しました。共通するのは、<strong>「診断」と「処方」は医師にしかできない</strong>という大原則です。
                    </p>
                    <p className="text-xs text-[#4A4A4A] mb-5 leading-relaxed bg-white/60 border border-black/10 rounded-xl p-3">
                        <strong className="text-[#2E9E89]">国家資格</strong>（鍼灸師・あん摩マッサージ指圧師・柔道整復師など）は法律で定められた施術ができますが、<strong className="text-[#C76B53]">民間資格</strong>（整体師・カイロプラクターなど）は国家資格ではなく、業務範囲も国によって定められていません。同じ「体を整える」でも、この線引きは知っておくと安心です。
                    </p>
                    <div className="space-y-4">
                        {roles.map((r) => (
                            <div key={r.en} className="rounded-2xl p-5 md:p-6 border border-black" style={{ background: r.color }}>
                                <div className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/50 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{r.en}</div>
                                <div className="flex items-center flex-wrap gap-2 mb-1">
                                    <span className="text-xl font-bold text-[#1A1A1A]">{r.name}</span>
                                    {r.license && (
                                        <span
                                            className="text-[10px] font-bold px-2 py-0.5 rounded-full border"
                                            style={r.license === '国家資格'
                                                ? { color: '#2E9E89', borderColor: '#2E9E89', background: 'rgba(65,201,180,0.12)' }
                                                : { color: '#C76B53', borderColor: '#E08A6E', background: 'rgba(224,138,110,0.12)' }}
                                        >
                                            {r.license}
                                        </span>
                                    )}
                                </div>
                                <p className="text-sm text-[#4A4A4A] leading-relaxed mb-4">{r.summary}</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div className="rounded-xl bg-white/70 border border-black/10 p-4">
                                        <div className="text-xs font-bold text-[#2E9E89] mb-2">できること</div>
                                        <ul className="space-y-1.5">
                                            {r.can.map((c, i) => (
                                                <li key={i} className="text-xs text-[#4A4A4A] leading-relaxed flex gap-1.5">
                                                    <span className="text-[#41C9B4] font-bold">○</span><span>{c}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="rounded-xl bg-white/70 border border-black/10 p-4">
                                        <div className="text-xs font-bold text-[#C76B53] mb-2">できないこと</div>
                                        <ul className="space-y-1.5">
                                            {r.cannot.map((c, i) => (
                                                <li key={i} className="text-xs text-[#4A4A4A] leading-relaxed flex gap-1.5">
                                                    <span className="text-[#E08A6E] font-bold">×</span><span>{c}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-[#4A4A4A]/60 mt-3 leading-relaxed">
                        ※ 「できること・できないこと」は代表的な例をやさしくまとめたものです。実際の業務範囲は各資格の法令や勤務先の体制により異なります。
                    </p>
                </section>

                {/* 大原則：診断と治療 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">大原則：「診断」と「治療」は医療の領域</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        どの職種にも共通する、いちばん大切なルールがあります。それは、<strong>病名をつける「診断」と、薬の「処方」・手術などの「治療」は、医師だけが行える</strong>ということです。看護師も薬剤師も管理栄養士も、高い専門性を持ちながら、この一線は越えません。
                        {'\n\n'}
                        これは制限ではなく、<strong>安全のための仕組み</strong>です。責任の所在をはっきりさせ、それぞれが得意分野に集中することで、医療全体の質が保たれています。
                        {'\n\n'}
                        だからこそ、症状がはっきりしている・つらい・長く続く——そんなときは、まず<strong>医療機関の受診が最優先</strong>です。
                    </p>
                </section>

                {/* 国家資格という線引き */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">「国家資格」という、守られた一線</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        医師・看護師・薬剤師・管理栄養士——ここまで挙げてきた職種は、いずれも<strong>国家資格</strong>です。長い教育と試験を経て、法律によって「この行為はこの資格を持つ人だけ」と定められています。とりわけ「<strong>診断</strong>」と「<strong>処方・治療</strong>」は医師の独占業務で、資格のない人がこれを行えば<strong>法律に触れます</strong>。
                        {'\n\n'}
                        この線引きは、人の命と体を守るための<strong>大切な仕組み</strong>です。同時に、その境界の手前には「健康に関する情報発信・教育・生活サポート」という、<strong>資格がなくても担える広い領域</strong>も存在します。ここをめぐっては、「どこまでが教育で、どこからが医療行為か」が曖昧になりやすく、健康サービスと医療のあいだに<strong>緊張が生まれやすい</strong>のも事実です。
                        {'\n\n'}
                        だからこそMitoflow40は、この一線を<strong>あいまいにせず、はっきり尊重します</strong>。私たちが行うのは、あくまで一般的な健康・栄養の<strong>教育と情報提供</strong>。診断も、治療も、個別の医療判断もしません。資格を持つ人の領域には踏み込まない——そう線を引くことが、結果として読者の安全を守り、医療への敬意にもなると考えています。
                    </p>
                </section>

                {/* 役割分担の構造 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">医療が「手の回りきらない」領域がある</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        医療は、限られた時間のなかで多くの患者さんを診る必要があります。だからこそ「<strong>病気を見つけ、治す</strong>」ことに集中せざるを得ず、一人ひとりの食事・睡眠・運動・ストレスといった毎日の習慣にじっくり伴走するのは、<strong>構造的に難しい</strong>のが実情です。
                        {'\n\n'}
                        これは、医師も看護師も管理栄養士も同じです。どんなに高い専門性を持っていても、<strong>限られた診療時間</strong>のなかで、しかも「未病・予防」という領域は学校教育や日々の業務の中心ではないことも多く、<strong>時間と、扱える知識の範囲という制約</strong>のなかでは、一人の生活の細部まで踏み込みきれない場面があります。これは個々人の力量の問題ではなく、<strong>その環境では届きにくい</strong>というだけのことです。
                        {'\n\n'}
                        言いかえれば、それぞれの専門職が役割を分け合い、得意分野に集中することで医療の質が保たれている——その<strong>役割分担の裏返し</strong>として、どうしても生まれる「すき間」があるのです。
                    </p>

                    <div className="mt-5 rounded-xl bg-[#FBF3EA] border border-black/10 p-5">
                        <div className="text-xs font-bold text-[#C76B53] mb-3">現代医療が抱える、構造的な制約</div>
                        <ul className="space-y-2.5">
                            {[
                                ['時間の制約', '一人にかけられる診療時間は限られ、生活の背景まで丁寧に聞き取るのは難しい。'],
                                ['知識の制約', '医学は日進月歩。栄養・予防・最新研究まで一人がすべてを追い続けるのは現実的に困難。'],
                                ['技術・検査の制約', '検査でとらえられるのは体のごく一部。数値に表れない「未病」のサインは見えにくい。'],
                                ['仕組みの制約', '保険診療は「病気の治療」が基本。予防や健康増進は制度の中心に置かれにくい。'],
                            ].map(([t, d], i) => (
                                <li key={i} className="flex gap-2.5 text-sm text-[#4A4A4A] leading-relaxed">
                                    <span className="text-[#E08A6E] font-bold flex-shrink-0">―</span>
                                    <span><strong className="text-[#1A1A1A]">{t}</strong>：{d}</span>
                                </li>
                            ))}
                        </ul>
                        <p className="text-xs text-[#4A4A4A]/60 mt-3 leading-relaxed">
                            ※ これらは医療を否定するものではなく、誰が担っても避けにくい「環境の限界」です。だからこそ、医療の外からそれを補う役割に意味があります。
                        </p>
                    </div>

                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line mt-5">
                        <strong>「病気を治す医療」と「健康を育てる営み」は、車の両輪</strong>。どちらが上でも下でもなく、両方そろってはじめて、長く元気でいられる毎日に近づきます。この「手が回りきらない部分」を、時間をかけて医療の外から支えること——そこにMitoflow40の役割があります。
                    </p>
                </section>

                {/* Mitoflowの立ち位置 */}
                <section className="mb-10 rounded-2xl p-6 md:p-8 border border-black" style={{ background: '#D7EAE2' }}>
                    <p className="text-xs tracking-widest font-bold mb-2 text-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>OUR POSITION</p>
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 leading-tight">Mitoflow40は、どこに立つのか</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        Mitoflow40は、医療機関ではありません。<strong>診断もしないし、治療もしません</strong>。病気の人を治すのは、あくまで医師をはじめとする医療者の役割です。
                        {'\n\n'}
                        私たちが立っているのは、その<strong>手前</strong>——「まだ病気ではないけれど、なんとなく不調」という<Link href="/health-philosophy" className="underline decoration-[#41C9B4] decoration-2 underline-offset-2 font-bold hover:text-[#41C9B4]">未病・グレーゾーン</Link>の領域です。検査では「異常なし」でも、本来の力を発揮しきれていない。そんな人が、<strong>自分の体を読み解き、食事・睡眠・運動・ストレスを整えていく</strong>——その学びと実践を支えるのがMitoflow40の役割です。
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
                        <div className="rounded-xl bg-white/70 border border-black/10 p-4">
                            <div className="text-xs font-bold text-[#2E9E89] mb-2">Mitoflow40がすること</div>
                            <ul className="space-y-1.5">
                                {[
                                    '体の仕組み・栄養学をやさしく伝える',
                                    '血液検査の「理想値」の読み解き方を共有',
                                    'セルフチェックで現在地を可視化',
                                    '生活習慣を整えるヒントを届ける',
                                ].map((c, i) => (
                                    <li key={i} className="text-xs text-[#4A4A4A] leading-relaxed flex gap-1.5">
                                        <span className="text-[#41C9B4] font-bold">○</span><span>{c}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="rounded-xl bg-white/70 border border-black/10 p-4">
                            <div className="text-xs font-bold text-[#C76B53] mb-2">Mitoflow40がしないこと</div>
                            <ul className="space-y-1.5">
                                {[
                                    '病名の「診断」',
                                    '薬の「処方」や医行為',
                                    '病気の「治療」',
                                    '医療機関の受診を妨げること',
                                ].map((c, i) => (
                                    <li key={i} className="text-xs text-[#4A4A4A] leading-relaxed flex gap-1.5">
                                        <span className="text-[#E08A6E] font-bold">×</span><span>{c}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line mt-5">
                        私たちは、医療と<strong>競合する存在ではなく、補い合う存在</strong>でありたいと考えています。病気になってから医療が立て直す。その前に、なる手前で整える。両方がそろってはじめて、「<Link href="/health-philosophy" className="underline decoration-[#41C9B4] decoration-2 underline-offset-2 font-bold hover:text-[#41C9B4]">長く元気でいられる</Link>」に近づけます。
                    </p>
                </section>

                {/* 受診の目安 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">こんなときは、まず医療機関へ</h2>
                    <p className="text-sm text-[#4A4A4A] leading-relaxed mb-4">
                        次のような場合は、生活習慣の見直しよりも先に、医療機関の受診を最優先してください。
                    </p>
                    <ul className="space-y-2">
                        {[
                            '強い痛み・息苦しさ・高熱など、急な症状があるとき',
                            '症状が長く続く、だんだん悪くなっているとき',
                            '健診で「要精査・要治療」と指摘されたとき',
                            '持病があり、薬を服用しているとき（自己判断で中断しない）',
                            '気分の落ち込みが続き、日常生活がつらいとき',
                        ].map((c, i) => (
                            <li key={i} className="text-sm text-[#4A4A4A] leading-relaxed flex gap-2">
                                <span className="text-[#FF9855] font-bold">!</span><span>{c}</span>
                            </li>
                        ))}
                    </ul>
                    <p className="text-xs text-[#4A4A4A]/60 mt-4 leading-relaxed">
                        Mitoflow40が発信する情報は、一般的な健康・栄養に関する教育目的のものであり、医師の診断・治療に代わるものではありません。
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
                        12問・約2分のセルフチェックで、あなたのミトコンドリア活性度を4つの軸から可視化します。「未病のうちに整える」第一歩に。無料・登録不要。
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
