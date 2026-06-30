import Link from 'next/link';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: '健康と和 ｜ 「和」という言葉から健康を読み解く | Mitoflow40',
    description: '日本語の「和」には、調和（バランス）・和食（食の知恵）・人との和（つながり）という、健康と深く響き合う意味が重なっています。さらに一説では「和」の語源は一人称「わ＝我々」。沖縄や東北に残る「わん」、柳田國男の方言周圏論、サピア＝ウォーフ仮説までを手がかりに、「足すより整える」健康のかたちを綴るエッセイです。',
    alternates: { canonical: 'https://mitoflow40.com/harmony' },
    openGraph: {
        title: '健康と和 ｜ Mitoflow40',
        description: '調和・和食・人との和。「和」という言葉から、足すより整える健康のかたちを考える。',
        url: 'https://mitoflow40.com/harmony',
        type: 'article',
    },
};

export default function HarmonyPage() {
    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#ECE5DA' }}>
            <img loading="lazy" decoding="async" src="/images/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block"
                style={{ top: '0', right: '-40px', width: '260px', transform: 'scaleY(-1)' }} />
            <img loading="lazy" decoding="async" src="/images/24.png" alt="" className="absolute pointer-events-none"
                style={{ bottom: '-40px', left: '-40px', width: '260px' }} />

            <JsonLd data={medicalWebPage({ name: '健康と和', description: '「和」という言葉の多義性（調和・和食・人との和）から、足すより整える健康のかたちを考えるエッセイ。', path: '/harmony' })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: '健康と和', path: '/harmony' }])} />

            <article className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '健康と和' }]} />
                <header className="mb-12 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>THE APPROACH</p>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        HEALTH &amp; HARMONY
                        <span className="block text-base md:text-lg mt-2 text-[#1A1A1A]/70" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>健康と和</span>
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-relaxed max-w-[600px] mx-auto">
                        「もっと足さなきゃ」という健康法に、少し疲れていませんか。日本語の<strong>「和」</strong>という一文字には、じつは健康のヒントが静かに詰まっています。
                    </p>
                </header>

                {/* 「和」という多義の言葉 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">「和」という、ふしぎな一文字</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        「和」という字は、ひとつの意味に収まりません。<strong>調和</strong>の和、<strong>和食</strong>の和、人との<strong>和</strong>。バランスであり、日本の食文化であり、人と人とのつながりでもある——そのどれもが、不思議なほど<strong>健康のあり方</strong>と重なります。
                        {'\n\n'}
                        現代の健康情報は、ともすれば「あれを足せ、これを摂れ」という<strong>足し算</strong>に偏りがちです。けれど「和」が教えてくれるのは、むしろ<strong>整えること・ちょうどよさ・つながりの中で生きること</strong>。このページは、その「和」を手がかりに、健康のかたちをゆっくり考えるエッセイです。
                    </p>
                </section>

                {/* 語源：わ＝我々 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">「わ」という音の、古い記憶</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        ここで「和」という字の足どりを、少しだけさかのぼってみます。言葉の研究には、こんな見立てがあります——<strong>「わ」という音は、もともと人が自分を指すときの一人称</strong>、すなわち「私」や「我々」を表す響きだった、と。古語にいまも残る「<strong>我（わ・われ）</strong>」は、その痕跡だといわれます。
                        {'\n\n'}
                        大陸の史書がこの国を「<strong>倭</strong>」と書きとめたのも、列島の人々が口々に「わ」と名乗る音を、漢字で写し取った結果だと見られています。のちの世になって人々は、「倭」という字にまとわりつく見下しの含みを嫌い、同じ「わ」の音に、字面のうつくしい「<strong>和</strong>」を選び直した——そう伝えられています。
                        {'\n\n'}
                        この見立てにしたがうなら、日本文化の背骨ともいえる「<strong>和＝調和</strong>」という観念は、出発点では「<strong>我々</strong>」という一人称だったことになります。そこに透けて見えるのは、ひとつの前提です。人は、世界からぽつんと切り出された一個の点としてではなく、はじめから<strong>「みんな（和＝輪）の一部」として姿を現す</strong>——そういう感覚。英語の「<strong>I</strong>」が、まわりから独立した揺るがぬ一点であるのとは、立ち上がり方そのものが違います。日本語の「私」は、生まれた時点ですでに<strong>「和の内側にある私」</strong>だったのかもしれません。
                    </p>
                </section>

                {/* 周縁に残る古い「わ」 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">辺境にこそ、古い言葉は生き延びる</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        この古い「わ」、じつは現役で使われている土地があります。<strong>沖縄</strong>です。うちなーぐちでは、「私」をいまも「<strong>わん</strong>」、あるいは「<strong>わー</strong>」と言う。本土で「わ」が「われ」へ、さらに「わたし」へと衣替えして、もとの姿を隠していったのに対し、南の島では古層の響きが千年あまり、ほとんど削れずに残りました。<strong>東北</strong>の言葉にも、同じ「わ」が一人称として息づいています。
                        {'\n\n'}
                        方言を「中央のなまり損ね」とみなすのは、おそらく逆さまです。むしろ、都で次々に更新され、捨てられていった古い言い方が、辺境にだけ取り残された——その<strong>地層</strong>なのです。この見方を全国規模で描き出したのが、民俗学者の<strong>柳田國男</strong>でした。『<strong>蝸牛考</strong>』に結実した「<strong>方言周圏論</strong>」は、各地で「カタツムリ」をどう呼ぶかを、丹念に集めた仕事です<sup className="text-[#FF9855] font-bold">[5]</sup>。
                    </p>
                    <div className="mt-5 rounded-xl p-4 border border-[#1A1A1A]/15" style={{ background: '#F4ECDA' }}>
                        <p className="text-sm text-[#4A4A4A] leading-relaxed">
                            <strong>デデムシ、マイマイ、カタツムリ、ツブリ、ナメクジ</strong>——これらは生まれた時代の異なる呼び名でした。京の都を中心に、新しいものほど内側、古いものほど外側へと、<strong>リング状に並んで</strong>いた。中心で新語が生まれるたび、前の世代の語は外へ外へとにじり出され、列島のいちばん端（東北・九州・沖縄）に、<strong>最古の言葉だけが沈殿していく</strong>。
                        </p>
                    </div>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line mt-5">
                        蝸牛が殻に渦を巻き足していくのに似て、言葉もまた、中心から縁へと幾重もの輪を描いて広がります。都で投じられた一語が島々の端に届くころには、肝心の都ではとうに別の言い方が幅を利かせている。だから「<strong>わん</strong>」が沖縄や東北に生きているのは、たまたまではなく、<strong>この理屈どおりの帰結</strong>なのです。
                    </p>
                </section>

                {/* 一人称の数 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">一人称の数だけ、文化が顔を出す</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        言葉は、その社会が何を握りしめてきたかを映す沈殿物でもあります。言語が世界の捉え方を左右する、という議論（<strong>言語相対論／サピア＝ウォーフ仮説</strong>）にならって、ためしにこんな数え方をしてみましょう。<strong>ある言語が「私」や「あなた」を、何通りの単語で呼び分けているか</strong>——ただ、それを勘定してみる<sup className="text-[#FF9855] font-bold">[6]</sup>。
                        {'\n\n'}
                        英語の一人称は「<strong>I</strong>」一語きり。目の前の相手が上司でも親友でも幼い子でも、「I」は表情ひとつ変えません。かたや日本語は、<strong>わたし・ぼく・おれ・わし・自分・小生……</strong>と、ずらりと居並ぶ。裏を返せば、日本語は「<strong>いま自分が、誰と、どんな間柄で口をきいているか</strong>」を、一人称ひとつの選択にまるごと託している、ということです。
                        {'\n\n'}
                        相手しだいで「私」の呼び名が伸び縮みする言語と、相手が変わっても「I」が一ミリも動かない言語。<strong>たった一人称の数を並べるだけ</strong>で、その文化が「個」というものをどう見ているかが、輪郭になって浮かびます。日本語の「私」は、つねに<strong>関係のなかで、その都度かたちを結び直す</strong>。これもやはり、「和の内側にある私」という、あの古い感覚のひとつづきなのでしょう。
                    </p>
                </section>

                {/* ① 調和としての和 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">① 調和としての和——足すより、整える</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        体は、驚くほど<strong>「ちょうどよさ」で動いています</strong>。自律神経のアクセルとブレーキ、腸内細菌の多様性、血糖の波、ホルモンの増減——どれも「多ければよい」のではなく、<strong>過剰でも不足でもない、釣り合いの中</strong>でいちばんよく働きます。健康とは、この<strong>動的なバランス（恒常性）</strong>が保たれている状態だ、と言いかえることもできます。
                        {'\n\n'}
                        日本には昔から「<strong>腹八分目</strong>」「<strong>過ぎたるは及ばざるが如し</strong>」という知恵があります。満たしきらず、少し余白を残す。じつは「食べすぎないこと」が代謝や老化にやさしい、という研究とも響き合います<sup className="text-[#FF9855] font-bold">[1]</sup>。サプリも運動も情報も、<strong>足し算の先に、引き算と調律がある</strong>——それが「和」の健康観です。
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {[{ href: '/autonomic-nervous-system', label: '自律神経のバランス' }, { href: '/gut-health', label: '腸内の多様性' }, { href: '/blood-sugar', label: '血糖の波' }].map((l) => (
                            <Link key={l.href} href={l.href} className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">{l.label}</Link>
                        ))}
                    </div>
                </section>

                {/* ② 和食という和 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">② 和食という和——「ふつうのごはん」の底力</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        「和食」は2013年、<strong>ユネスコの無形文化遺産</strong>に登録されました。評価されたのは特別な料理ではなく、<strong>旬を尊び、自然を敬い、栄養のバランスがとれている</strong>という、暮らしの食のあり方そのものです<sup className="text-[#FF9855] font-bold">[2]</sup>。
                        {'\n\n'}
                        <strong>一汁三菜</strong>という形は、自然と多様な食材とバランスを招き入れます。<strong>味噌・醤油・納豆・漬物</strong>といった発酵食品は、腸内細菌の世界を豊かにします。だしの<strong>うま味</strong>は、塩や脂に頼らずに満足感を生みます。そして「<strong>いただきます</strong>」という一言が、食べ物の背後にある命とつながりへの感謝を思い出させてくれます。
                        {'\n\n'}
                        流行の健康法を追いかける前に、まず<strong>足元の「ふつうのごはん」</strong>を整える。極端さではなく日常を土台にする——それも「和」の知恵です。
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {[{ href: '/foods', label: '食べ物' }, { href: '/rice', label: '米' }, { href: '/microbiome', label: '発酵と腸内フローラ' }, { href: '/chrono-nutrition', label: '時間栄養学' }].map((l) => (
                            <Link key={l.href} href={l.href} className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">{l.label}</Link>
                        ))}
                    </div>
                </section>

                {/* ③ 人との和 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">③ 人との和——健康は、ひとりでは完結しない</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        さきほどたどった「和の内側にある私」という感覚は、ここで健康の話と地続きになります。「和を以て貴しとなす」。日本の古い言葉は、人との<strong>つながり</strong>の大切さを説いてきました。これは精神論にとどまりません。多くの研究が、<strong>社会的なつながりの豊かさが、健康や寿命に関わる</strong>ことを示しています。孤独や孤立は、喫煙や肥満に匹敵するほどの健康リスクになりうる、という報告すらあります<sup className="text-[#FF9855] font-bold">[3]</sup>。
                        {'\n\n'}
                        誰かと<strong>食卓を囲む（共食）</strong>、安心して話せる相手がいる、地域や役割の中に居場所がある——こうした「人との和」は、栄養素や運動と同じくらい、健康の土台になります。どんなに体に良いものを食べても、<strong>孤立の中ではその力は十分に活きない</strong>のかもしれません。
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {[{ href: '/spirituality', label: 'つながりと心身相関' }, { href: '/mental-health', label: 'メンタルヘルス' }].map((l) => (
                            <Link key={l.href} href={l.href} className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">{l.label}</Link>
                        ))}
                    </div>
                </section>

                {/* 和は静けさ */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">和は、「静けさ」でもある</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        「和」には、<strong>間（ま）・余白・静けさ</strong>という顔もあります。詰め込まない時間、ひと呼吸おく余裕、季節の移ろいを感じる感覚。情報も予定も<strong>過剰</strong>になりがちな現代で、あえて<strong>立ち止まり、引いてみる</strong>こと——それ自体が、神経をゆるめ、体を回復に向かわせる静かな養生になります。
                        {'\n\n'}
                        これは、<strong>速く・多く・もっと</strong>を求め続ける流れへの、静かな対抗でもあります。Mitoflow40 が考える健康は、頑張って勝ち取るものというより、<strong>余白の中で取り戻していく</strong>もの。「和」は、その姿勢にそっと名前をつけてくれる言葉です。
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {[{ href: '/mindfulness', label: '呼吸・マインドフルネス' }, { href: '/health-counterculture', label: '健康とはカウンターカルチャー' }].map((l) => (
                            <Link key={l.href} href={l.href} className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">{l.label}</Link>
                        ))}
                    </div>
                </section>

                {/* まとめ */}
                <section className="mb-10 rounded-2xl p-6 md:p-8 border border-black" style={{ background: '#D7EAE2' }}>
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#FF9855] pl-3 leading-tight">「ちょうどよさ」を、自分の手に</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        調和・和食・人との和、そして静けさ。「和」が指し示すのは、どれも<strong>足し算の健康ではなく、ちょうどよさを取り戻す健康</strong>でした。
                        {'\n\n'}
                        そしてその「ちょうどよさ」は、人によって違います。だからこそ、自分にとっての和＝<strong>最適点</strong>を、データと体感の両方から探していく——それが、Mitoflow40 の<strong>精密栄養学</strong>という営みです。「和」という古い言葉と、最新の栄養科学は、じつは同じ方向を向いています。
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {[{ href: '/health-philosophy', label: '健康とは' }, { href: '/precision-nutrition', label: '精密栄養学とは' }, { href: '/mission', label: 'なぜ、未病予防か' }].map((l) => (
                            <Link key={l.href} href={l.href} className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">{l.label}</Link>
                        ))}
                    </div>
                </section>

                {/* 注釈 */}
                <p className="text-xs text-[#4A4A4A]/70 leading-relaxed mb-10 p-4 bg-white/60 rounded-lg border border-[#1A1A1A]/10">
                    ※ 本記事は、健康についての考え方を綴ったエッセイであり、診断・治療に代わるものではありません。体調に不安があるときは、医療機関にご相談ください。
                </p>

                {/* 参照 */}
                <section className="mb-10">
                    <h2 className="text-lg font-bold text-[#1A1A1A] mb-3 border-l-4 border-[#41C9B4] pl-3 leading-tight">参照</h2>
                    <ol className="bg-white/70 rounded-2xl p-5 md:p-6 border border-black space-y-2 text-sm list-none">
                        <li>
                            <span className="text-[#FF9855] font-bold mr-1">[1]</span>
                            <a href="https://doi.org/10.1196/annals.1396.037" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                Caloric restriction, the traditional Okinawan diet, and healthy aging（腹八分目・沖縄の食と健やかな老い）
                            </a>
                            <span className="text-[#1A1A1A]/50"> — Willcox et al., Ann. N.Y. Acad. Sci.（2007）</span>
                        </li>
                        <li>
                            <span className="text-[#FF9855] font-bold mr-1">[2]</span>
                            <a href="https://www.maff.go.jp/j/keikaku/syokubunka/ich/" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                「和食」がユネスコ無形文化遺産に登録（和食の特徴と意義）
                            </a>
                            <span className="text-[#1A1A1A]/50"> — 農林水産省</span>
                        </li>
                        <li>
                            <span className="text-[#FF9855] font-bold mr-1">[3]</span>
                            <a href="https://doi.org/10.1371/journal.pmed.1000316" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                Social Relationships and Mortality Risk（社会的つながりと死亡リスクのメタ分析）
                            </a>
                            <span className="text-[#1A1A1A]/50"> — Holt-Lunstad et al., PLoS Medicine（2010）</span>
                        </li>
                        <li>
                            <span className="text-[#FF9855] font-bold mr-1">[4]</span>
                            <a href="https://www.who.int/about/governance/constitution" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                Constitution of WHO（健康の定義：身体的・精神的・社会的に満たされた状態）
                            </a>
                            <span className="text-[#1A1A1A]/50"> — World Health Organization</span>
                        </li>
                        <li>
                            <span className="text-[#FF9855] font-bold mr-1">[5]</span>
                            <a href="https://ja.wikipedia.org/wiki/方言周圏論" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                方言周圏論（柳田國男『蝸牛考』『方言覚書』）
                            </a>
                            <span className="text-[#1A1A1A]/50"> — 周縁に古層が残るという考え方の古典</span>
                        </li>
                        <li>
                            <span className="text-[#FF9855] font-bold mr-1">[6]</span>
                            <a href="https://ja.wikipedia.org/wiki/言語相対論" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                言語相対論（サピア＝ウォーフ仮説）
                            </a>
                            <span className="text-[#1A1A1A]/50"> — 言語が世界の捉え方に影響するという議論</span>
                        </li>
                    </ol>
                </section>

                <div className="text-center">
                    <Link href="/library" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">← Library に戻る</Link>
                </div>
            </article>
        </div>
    );
}
