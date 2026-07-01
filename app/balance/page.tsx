import Link from 'next/link';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: 'バランス（中庸）｜ 体は「ちょうどよさ」でできている | Mitoflow40',
    description: '「足すより引く」の先にあるのは、引きすぎない「ちょうどよさ」。運動・タンパク質・水・日光・ストレス——体にまつわる多くのことは、少なすぎても多すぎても良くない「U字」の関係にあります。アリストテレスの中庸からホルミシス（適度な負荷が体を強くする）まで、健康の core にある「バランス」を中立に考えるエッセイ。',
    alternates: { canonical: 'https://mitoflow40.com/balance' },
    openGraph: {
        title: 'バランス（中庸）｜ Mitoflow40',
        description: '体は「ちょうどよさ」でできている。U字とホルミシスから、バランスという健康の core を考える。',
        url: 'https://mitoflow40.com/balance',
        type: 'article',
    },
};

export default function BalancePage() {
    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#EAE6DD' }}>
            <img loading="lazy" decoding="async" src="/images/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block"
                style={{ top: '0', right: '-40px', width: '260px', transform: 'scaleY(-1)' }} />
            <img loading="lazy" decoding="async" src="/images/24.png" alt="" className="absolute pointer-events-none"
                style={{ bottom: '-40px', left: '-40px', width: '260px' }} />

            <JsonLd data={medicalWebPage({ name: 'バランス（中庸）', description: '体は「ちょうどよさ」でできている。U字とホルミシスから、バランスという健康の core を考えるエッセイ。', path: '/balance' })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: '思索', path: '/library#thoughts' }, { name: 'バランス（中庸）', path: '/balance' }])} />

            <article className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '思索', href: '/library#thoughts' }, { name: 'バランス（中庸）' }]} />
                <header className="mb-10 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>THE MIDDLE WAY</p>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        BALANCE
                        <span className="block text-base md:text-lg mt-2 text-[#1A1A1A]/70" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>バランス（中庸）</span>
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-relaxed max-w-[600px] mx-auto">
                        「足すより引く」。でも、引きすぎもまた不足です。体にまつわる多くのことは、<strong>少なすぎても多すぎても良くない</strong>——健康の core にある「ちょうどよさ」を考えます。
                    </p>
                </header>

                {/* 足す・引くの先 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">「足す・引く」の先にある「ちょうどよさ」</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        このライブラリは<strong>「足すより、引く」</strong>を基本の姿勢にしています。サプリや「体にいいもの」を足し続けるより、食べすぎ・座りすぎ・夜ふかしを引いていくほうが、体はもとの力を取り戻す——それは今も変わりません。
                        {'\n\n'}
                        ただ、引き算にも<strong>「底」</strong>があります。食べなさすぎ、動かなさすぎ、削りすぎもまた体を弱らせます。だから本当のゴールは「ゼロ」でも「最大」でもなく、<strong>そのあいだの「ちょうどよさ」</strong>——昔の言葉で言えば<strong>「中庸（ちゅうよう）」</strong>です。
                    </p>
                </section>

                {/* 歴史：中庸の思想 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">歴史——「ちょうどよさ」を、人類はずっと探してきた</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        「バランスが大事」は新しい健康トレンドではありません。<strong>洋の東西を問わず、古くから語られてきた知恵</strong>です。
                    </p>
                    <div className="mt-5 space-y-3">
                        {[
                            { head: 'アリストテレスの「中庸」', body: '勇気は「臆病」と「無謀」の中間にある——古代ギリシャの哲学者は、徳とは両極端の真ん中（メソテース）にあると説いた。過剰でも不足でもない点に善さがある、という考え方。' },
                            { head: '東洋の「中庸」と「過ぎたるは…」', body: '儒教の古典『中庸』は、偏らない中正の道を説く。孔子の「過ぎたるは猶（なお）及ばざるが如し」も、やりすぎは足りないのと同じくらい良くない、という同じ知恵。' },
                            { head: 'パラケルススの「量が毒を決める」', body: '16世紀の医師は「すべての物は毒であり、毒でないものはない。量だけが毒かどうかを決める」と言った。水さえ飲みすぎれば害になる。何を、ではなく「どれだけ」が問われる。' },
                        ].map((s) => (
                            <div key={s.head} className="bg-white/60 rounded-xl p-4 border border-[#1A1A1A]/15">
                                <div className="font-bold text-[#1A1A1A] mb-0.5">{s.head}</div>
                                <p className="text-sm text-[#4A4A4A] leading-snug">{s.body}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 自然の摂理 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">昇れば、沈む——自然の摂理としてのバランス</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        そもそもバランスは、人間が決めたルールではありません。<strong>自然そのものの成り立ち</strong>です。東から昇った太陽が西に沈むように、世界は「片方へ行っては、戻る」ことでできています。
                    </p>
                    <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {[
                            ['昇る', '沈む'],
                            ['満ちる', '欠ける'],
                            ['吸う', '吐く'],
                            ['昼', '夜'],
                            ['緊張', '弛緩'],
                            ['夏', '冬'],
                        ].map(([a, b]) => (
                            <div key={a} className="flex items-center justify-center gap-2 bg-white/60 rounded-xl py-3 border border-[#1A1A1A]/15">
                                <span className="text-sm font-bold text-[#1A1A1A]">{a}</span>
                                <span className="text-[#41C9B4] font-bold">⇄</span>
                                <span className="text-sm font-bold text-[#1A1A1A]">{b}</span>
                            </div>
                        ))}
                    </div>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line mt-5">
                        どれも「片方だけ」では成り立ちません。<strong>振れて、戻る。その往復が世界を回している</strong>。そして人の体も、この自然の一部です。心拍も、呼吸も、血糖も、ホルモンも、<strong>上がっては下がる波</strong>でできています（恒常性・リズム）。
                        {'\n\n'}
                        だとすれば、健康とは<strong>一点に留まろうとすること</strong>ではなく、<strong>揺れながら釣り合うこと</strong>——つまり、この摂理に沿うことです。一方へ振り切る「極端」は、昇ったまま沈まないよう抗うようなもの。<strong>自然に逆らうから、続かないし、無理がくる</strong>。バランスとは、頑張って作るものというより、<strong>もともとの流れに、体を預け直すこと</strong>なのかもしれません。
                    </p>
                </section>

                {/* U字 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">体は「U字」でできている</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        現代の研究を見ても、体にまつわる多くのことは<strong>「U字」の関係</strong>にあります。横軸に「量」、縦軸に「リスク」をとると、<strong>少なすぎるところと多すぎるところでリスクが上がり、真ん中がいちばん低い</strong>——そんな谷型のカーブが、あちこちに現れます。
                    </p>

                    {/* U字カーブSVG */}
                    <figure className="mt-6">
                        <svg viewBox="0 0 720 320" className="w-full h-auto" role="img" aria-label="量とリスクのU字曲線。少なすぎても多すぎてもリスクが上がり、ほどよい真ん中がもっとも低い。">
                            {/* axes */}
                            <line x1="80" y1="40" x2="80" y2="260" stroke="#1A1A1A" strokeWidth="1.5" />
                            <line x1="80" y1="260" x2="680" y2="260" stroke="#1A1A1A" strokeWidth="1.5" />
                            {/* U curve */}
                            <path d="M110,70 C 230,300 490,300 650,70" fill="none" stroke="#41C9B4" strokeWidth="4" strokeLinecap="round" />
                            {/* sweet spot marker */}
                            <line x1="380" y1="235" x2="380" y2="260" stroke="#FF9855" strokeWidth="2" strokeDasharray="3 3" />
                            <circle cx="380" cy="235" r="7" fill="#FF9855" stroke="#1A1A1A" strokeWidth="1.5" />
                            <text x="380" y="220" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1A1A1A" fontFamily="'Noto Sans JP', sans-serif">ちょうどよい</text>
                            {/* labels */}
                            <text x="120" y="90" fontSize="13" fontWeight="700" fill="#C0392B" fontFamily="'Noto Sans JP', sans-serif">少なすぎ</text>
                            <text x="600" y="90" textAnchor="end" fontSize="13" fontWeight="700" fill="#C0392B" fontFamily="'Noto Sans JP', sans-serif">多すぎ</text>
                            {/* axis titles */}
                            <text x="380" y="288" textAnchor="middle" fontSize="13" fill="#1A1A1A" fillOpacity="0.6" fontFamily="'Noto Sans JP', sans-serif">量（運動・栄養・刺激…）→</text>
                            <text x="40" y="150" textAnchor="middle" fontSize="13" fill="#1A1A1A" fillOpacity="0.6" fontFamily="'Noto Sans JP', sans-serif" transform="rotate(-90 40 150)">リスク →</text>
                        </svg>
                        <figcaption className="text-xs text-[#4A4A4A]/60 mt-1 text-center">概念図：多くの健康指標に見られる「U字（Jカーブ）」の関係。</figcaption>
                    </figure>

                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line mt-5">
                        このライブラリでも、同じU字を何度も見てきました。
                    </p>
                    <div className="mt-4 space-y-3">
                        {[
                            { head: '運動', body: '動かなさすぎは万病のもと。でも競技レベルでやりこむと故障・免疫低下のリスクも。', href: '/jogging' },
                            { head: 'タンパク質', body: '不足は筋肉も酵素も作れない。でも過剰分は肝臓・腎臓の後始末を増やすだけで筋肉にならない。', href: '/gym-boom' },
                            { head: '水・日光・ストレス', body: '水も飲みすぎれば低ナトリウム血症に。日光もゼロでは不調、浴びすぎれば害。ストレスも「適度」が体を強くする。', href: '/stress' },
                        ].map((s) => (
                            <Link key={s.head} href={s.href} className="group flex items-start gap-4 bg-white/60 rounded-xl p-4 border border-[#1A1A1A]/15 hover:border-black hover:shadow-sm transition-all">
                                <div>
                                    <div className="font-bold text-[#1A1A1A] mb-0.5 group-hover:text-[#FF9855] transition-colors">{s.head}</div>
                                    <p className="text-sm text-[#4A4A4A] leading-snug">{s.body}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* ホルミシス */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">なぜ「適度」が効くのか——ホルミシス</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        面白いのは、体にとって<strong>「適度な負荷」はむしろ体を強くする</strong>ということです。これを<strong>ホルミシス</strong>と呼びます<sup className="text-[#FF9855] font-bold">[1]</sup>。運動で筋肉に軽いダメージがかかると、それに応えて筋肉は前より強くなる。適度な空腹、適度な寒さ・暑さ、植物が持つ微量の刺激物質——こうした<strong>「小さなストレス」が、体の適応力・回復力のスイッチを入れる</strong>のです。
                        {'\n\n'}
                        ただし、これは<strong>「適度」だからこそ</strong>。同じ刺激も、度を越えれば単なる損傷になります。運動もやりすぎれば故障し、空腹も過ぎれば飢餓になる。<strong>薬と毒を分けるのは「量」だ</strong>という、パラケルススの言葉がそのまま生理学になっている。バランスとは、この<strong>「効く量」と「害になる量」の境目</strong>を探すことでもあります。
                    </p>
                </section>

                {/* 二択の罠・やじろべえ */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">「二択」の罠と、やじろべえ</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        私たちはつい、<strong>「Aか、Bか」の二択</strong>で考えてしまいます。糖質は敵か味方か。肉は善か悪か。運動はする人かしない人か——。わかりやすいので飛びつきたくなりますが、体の答えはたいてい<strong>そのあいだ（between）</strong>にあります。<strong>どちらかの極を選んだ時点で、もうU字の端に立っている</strong>のです。
                    </p>

                    {/* やじろべえ SVG */}
                    <figure className="mt-6 mb-2">
                        <svg viewBox="0 0 360 220" className="w-full max-w-[320px] mx-auto h-auto" role="img" aria-label="やじろべえの図。中心の支点から左右に腕が伸び、両端の重りが下がることで全体が釣り合っている。">
                            {/* base / pivot */}
                            <polygon points="180,150 168,182 192,182" fill="#1A1A1A" />
                            <line x1="150" y1="182" x2="210" y2="182" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" />
                            {/* body pole (slightly tilted) */}
                            <g transform="rotate(-6 180 150)">
                                <line x1="180" y1="150" x2="180" y2="92" stroke="#1A1A1A" strokeWidth="4" strokeLinecap="round" />
                                <circle cx="180" cy="84" r="12" fill="#FF9855" stroke="#1A1A1A" strokeWidth="2.5" />
                                {/* arms curving down to weights */}
                                <path d="M180,104 C 130,104 96,120 78,150" fill="none" stroke="#41C9B4" strokeWidth="4" strokeLinecap="round" />
                                <path d="M180,104 C 230,104 264,120 282,150" fill="none" stroke="#41C9B4" strokeWidth="4" strokeLinecap="round" />
                                <circle cx="74" cy="156" r="13" fill="#EAE6DD" stroke="#1A1A1A" strokeWidth="2.5" />
                                <circle cx="286" cy="156" r="13" fill="#EAE6DD" stroke="#1A1A1A" strokeWidth="2.5" />
                            </g>
                        </svg>
                        <figcaption className="text-xs text-[#4A4A4A]/60 mt-1 text-center">やじろべえは「止まっている」のではなく、左右に揺れながら釣り合っている。</figcaption>
                    </figure>

                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        バランスは、<strong>やじろべえ</strong>に似ています。やじろべえは、どちらか片方に重りを寄せれば倒れます。そして面白いことに、<strong>ピタリと静止しているわけではありません</strong>。左右に小さく揺れながら、全体として釣り合っている。<strong>バランスとは「固定」ではなく「動きながら取り続けるもの」</strong>——揺れてもいい、寄りすぎなければいい、というのが本質です。
                    </p>
                </section>

                {/* 健康志向の顔をした極端 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">「健康のため」の顔をした、ただの極端</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        いちばん見えにくいのが、<strong>「健康にいい」と信じてやっている極端</strong>です。たとえば——<strong>毎日、玄米しか食べない</strong>。糖質を完全にゼロにする。水を1日4リットル飲む。サプリを山ほど盛る。体にいいものを「徹底する」ほど正しい、という思い込み。
                        {'\n\n'}
                        でも、玄米が体にいいことと、<strong>「玄米だけを毎日」</strong>が体にいいことは、別の話です。玄米には消化の負担やミネラルの吸収を妨げる成分もあり、そればかりに偏れば栄養は痩せていきます。<strong>それは健康思考ではなく、健康の顔をした極端</strong>——U字の、もう片方の端です。「体に悪いものの摂りすぎ」は警戒されやすいのに、「体にいいものの偏り」は正義の顔をしているぶん、気づきにくい。
                    </p>
                    <div className="mt-5 rounded-xl p-5 border-l-4" style={{ background: '#EFE7DF', borderColor: '#FF9855' }}>
                        <p className="text-[#1A1A1A] font-bold leading-relaxed">
                            一つの食品・一つの方法を「正解」にした瞬間、中庸から遠ざかる。<br />
                            <span className="text-[#4A4A4A] font-medium text-sm">——釣り合いを作るのは、徹底ではなく、多様性と振れ幅のほうです。</span>
                        </p>
                    </div>
                </section>

                {/* 毎日同じも極端 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">「毎日、同じ」も、ひとつの極端</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        「習慣を作ろう」「毎日続けよう」——これも一般には良いこととされます。でも、ここにも落とし穴があります。<strong>毎日まったく同じ</strong>は、言いかえれば<strong>「振れ幅がゼロ」</strong>。それもまた、やじろべえが片側で固まってしまった状態——<strong>一様さという極端</strong>です。
                        {'\n\n'}
                        同じ食事、同じ運動、同じ強度をずっと繰り返すと、体はそれに<strong>慣れて</strong>、刺激に応えなくなっていきます（適応の頭打ち）。ホルミシスで見たように、体を強くするのは「一定」ではなく<strong>適度なゆらぎ・変化</strong>です。季節でとれる物が変わる、運動に強い日と軽い日をつくる、たまに何もしない日を挟む——その<strong>振れ幅こそが釣り合い</strong>をつくります。
                    </p>
                    <div className="mt-5 rounded-xl p-5 border border-[#1A1A1A]/15" style={{ background: '#F3EFE7' }}>
                        <p className="text-sm text-[#1A1A1A] font-bold mb-1">整えるものと、崩していいものを分ける</p>
                        <p className="text-sm text-[#4A4A4A] leading-relaxed">
                            一定に保ちたいのは<strong>「時間のリズム」</strong>——寝る・起きる・食べる時刻です（体内時計はこれで整う）。一方、あえて<strong>ゆらしていい</strong>のは<strong>「内容」</strong>——食べるもの、運動の強度、刺激の種類。<strong>リズムは規則的に、中身は多彩に</strong>。ルーティンの目的は「安心」ではなく、体が応え続けることにあります。
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                            {[{ href: '/circadian-rhythm', label: '体内時計' }, { href: '/chrono-nutrition', label: '時間栄養学' }].map((l) => (
                                <Link key={l.href} href={l.href} className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">{l.label}</Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 体に聞く */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">食べ物も同じ——「体に聞く」という本質</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        食べ物でも、同じことが起きます。<strong>毎朝きまって同じ健康食品</strong>——青汁、プロテイン、ヨーグルト、決まったサプリ——を口に入れる。それ自体は、じつは<strong>健康になっていることではありません。ただ「習慣になっている」だけ</strong>です。
                        {'\n\n'}
                        「体にいいから」で始めても、続けるうちに<strong>目的が抜け落ち、「やること」だけが残ります</strong>。惰性で口に運ぶそれは、もう中庸ではありません。大切なのは、何を摂るかを固定することではなく——<strong>毎日、体に聞くこと</strong>です。
                    </p>
                    <div className="mt-5 rounded-xl p-5 border-l-4" style={{ background: '#EFE7DF', borderColor: '#FF9855' }}>
                        <p className="text-[#1A1A1A] font-bold leading-relaxed mb-1">今日の自分は、それを求めているか。</p>
                        <p className="text-sm text-[#4A4A4A] leading-relaxed">
                            お腹は空いているか、胃は重くないか。何が足りない感じがするか。同じものを機械的に入れるのではなく、その日の体と対話して<strong>選び直す</strong>。この「聞いて、選ぶ」の繰り返しこそ、やじろべえの揺れ——<strong>動きながら取り続けるバランス</strong>です。
                        </p>
                    </div>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line mt-5">
                        ただし、体の声も万能ではありません。「甘いものが欲しい」の裏に、習慣や依存、ストレスが隠れていることもあります。だから<strong>体感だけに委ねず、知識や記録と両輪で</strong>。それでも出発点は、パッケージの「体にいい」ではなく、<strong>自分の体の実感</strong>に置く——ここが、健康を他人まかせにしないための芯になります。
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                        {[{ href: '/mindfulness', label: 'マインドフルネス' }, { href: '/digestion', label: '消化' }, { href: '/chrono-nutrition', label: '時間栄養学' }].map((l) => (
                            <Link key={l.href} href={l.href} className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">{l.label}</Link>
                        ))}
                    </div>
                </section>

                {/* どう見つけるか */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">自分の「ちょうどよさ」を見つける</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        やっかいなのは、<strong>U字の底の位置が人によって違う</strong>ことです。年齢・体質・生活・持病によって、「ちょうどよい量」はずれます。だから健康は、誰かの正解をコピーすることではなく、<strong>自分の谷を、自分で探し当てる作業</strong>になります。
                    </p>
                    <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                            { head: '極端に飛びつかない', body: '「これさえやれば」「完全に断つ」——極端は分かりやすいが、たいていU字の端。ブームより、ほどほどの継続。' },
                            { head: '自分を観察する', body: '同じ量でも、体調・季節・年齢で最適は動く。数値や体感を記録して、自分の反応を見る。' },
                            { head: '「ゆらぎ」を許す', body: '体は一定を保つために、たえず微調整している（恒常性）。毎日きっちり同じでなくていい。ぶれても戻ればいい。' },
                            { head: '足すも引くも、手段', body: '足すこと・引くことは目的ではなく、ちょうどよさに近づく手段。今の自分に足りないほうへ動かす。' },
                        ].map((s) => (
                            <div key={s.head} className="bg-white/60 rounded-xl p-4 border border-[#1A1A1A]/15">
                                <div className="font-bold text-[#1A1A1A] mb-0.5">{s.head}</div>
                                <p className="text-sm text-[#4A4A4A] leading-snug">{s.body}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 rounded-xl p-5 border-l-4" style={{ background: '#EFE7DF', borderColor: '#FF9855' }}>
                        <p className="text-[#1A1A1A] font-bold leading-relaxed">
                            足すより、引く。引きすぎず、ちょうどよく。<br />
                            <span className="text-[#4A4A4A] font-medium text-sm">——健康とは、最大でも最小でもなく、自分の「谷」を探し続けること。</span>
                        </p>
                    </div>
                    <div className="mt-5 flex flex-wrap gap-2">
                        {[{ href: '/harmony', label: '健康と和' }, { href: '/gym-boom', label: 'ジムの乱立' }, { href: '/jogging', label: 'ジョギング' }, { href: '/fasting', label: '断食' }, { href: '/stress', label: 'ストレス' }].map((l) => (
                            <Link key={l.href} href={l.href} className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">{l.label}</Link>
                        ))}
                    </div>
                </section>

                {/* 体から、世界へ */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">体から、世界へ——バランスが取れれば</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        ここまで体の話をしてきましたが、同じ摂理は<strong>体の外にも及ぶ</strong>のかもしれません。偏り（アンバランス）は、体のなかでは<strong>病</strong>になり、人と人のあいだでは<strong>争い</strong>になります。片方が満ちて片方が渇く、足りるを知らずに奪い合う、行き過ぎても戻れない——その<strong>不均衡</strong>こそ、対立や戦争の根にあるものではないでしょうか。
                        {'\n\n'}
                        だとすれば、<strong>本当にバランスが取れていれば、戦争も起きないはず</strong>です。足るを知り、分かち合い、行き過ぎたら戻る。理想論に聞こえるかもしれません。でも、<strong>体のなかで起きていることと、世界で起きていることは、同じ「振れすぎ・戻れなさ」の問題</strong>なのかもしれない——そう考えると、自分の体の釣り合いを取り戻すことは、小さくても、その摂理を思い出す<strong>一歩</strong>になります。
                        {'\n\n'}
                        健康は、自分だけの問題にとどまりません。<strong>自分の体の主権を取り戻す</strong>という静かな営みは、めぐりめぐって、世界の釣り合いにもつながっている——バランスという言葉には、それくらいの射程があると、私たちは考えています。
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                        {[{ href: '/health-counterculture', label: '健康とはカウンターカルチャー' }, { href: '/harmony', label: '健康と和' }].map((l) => (
                            <Link key={l.href} href={l.href} className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">{l.label}</Link>
                        ))}
                    </div>
                </section>

                {/* Mitoflow40が本当に伝えたいこと */}
                <section className="mb-10 rounded-2xl border border-black p-7 md:p-10 relative overflow-hidden" style={{ background: '#1A1A1A' }}>
                    <span className="absolute -top-8 -right-3 text-[130px] md:text-[170px] leading-none font-bold pointer-events-none select-none" style={{ fontFamily: "'Space Grotesk', sans-serif", color: 'rgba(65,201,180,0.12)' }}>≈</span>
                    <p className="relative text-[10px] tracking-[0.25em] font-bold text-[#41C9B4] mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>WHAT WE REALLY MEAN</p>
                    <p className="relative text-2xl md:text-3xl font-bold text-white leading-snug mb-4" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>
                        Mitoflow40がいちばん伝えたいのは、<br className="hidden md:block" />実は、ここです。
                    </p>
                    <p className="relative text-sm md:text-base text-white/80 leading-loose whitespace-pre-line max-w-[680px]">
                        私たちは血液データを読み解き、栄養を語ります。でも、本当に一番伝えたいのは、<strong className="text-white">検査の数値でも、特定の栄養素でもありません</strong>。それは、<strong className="text-white">自分の体に聞き、ちょうどよさを自分で取り続ける力</strong>——このページで話してきた「バランス」そのものです。
                        {'\n\n'}
                        血液データは<strong className="text-white">地図</strong>、栄養は<strong className="text-white">道具</strong>にすぎません。使う目的は、他人の正解に体を合わせることではなく、<strong className="text-white">自分のやじろべえの中心を見つけること</strong>。検査も知識も、最後は<strong className="text-white">「自分の体の主権を取り戻す」</strong>ために使う。だからこのページは、すべての入口であり、いつでも立ち返る場所なのです。
                    </p>
                </section>

                {/* 参照 */}
                <section className="mb-10">
                    <h2 className="text-lg font-bold text-[#1A1A1A] mb-3 border-l-4 border-[#41C9B4] pl-3 leading-tight">参照</h2>
                    <ol className="bg-white/70 rounded-2xl p-5 md:p-6 border border-black space-y-2 text-sm list-none">
                        <li>
                            <span className="text-[#FF9855] font-bold mr-1">[1]</span>
                            <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2248601/" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                Hormesis defined（適度な負荷が生体の適応・回復力を高める「ホルミシス」の総説）
                            </a>
                            <span className="text-[#1A1A1A]/50"> — Mattson MP, Ageing Research Reviews, 2008</span>
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
