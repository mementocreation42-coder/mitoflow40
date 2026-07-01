import Link from 'next/link';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: 'ジムの乱立を読む ｜ なぜ増える？運動を「買う」時代を中立に | Mitoflow40',
    description: '街角に24時間ジムが増え続けている。「健康志向の高まり」だけでは説明しきれない、ビジネスモデルとしての構造、運動を生活から切り離して「買う」近代の発明、そして毎日の代謝（NEAT・ミトコンドリア）の視点まで——ジムの乱立という現象を、否定でも礼賛でもなく中立に読み解きます。',
    alternates: { canonical: 'https://mitoflow40.com/gym-boom' },
    openGraph: {
        title: 'ジムの乱立を読む ｜ Mitoflow40',
        description: 'なぜジムは増えるのか。運動を「買う」時代の構造と、毎日の代謝の視点を中立に。',
        url: 'https://mitoflow40.com/gym-boom',
        type: 'article',
    },
};

export default function GymBoomPage() {
    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#E7E0F2' }}>
            <img loading="lazy" decoding="async" src="/images/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block"
                style={{ top: '0', right: '-40px', width: '260px', transform: 'scaleY(-1)' }} />
            <img loading="lazy" decoding="async" src="/images/24.png" alt="" className="absolute pointer-events-none"
                style={{ bottom: '-40px', left: '-40px', width: '260px' }} />

            <JsonLd data={medicalWebPage({ name: 'ジムの乱立を読む', description: 'なぜジムは増えるのか。運動を「買う」時代の構造と、毎日の代謝の視点を中立に。', path: '/gym-boom' })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: '心とからだ', path: '/library#mind' }, { name: 'ジムの乱立を読む', path: '/gym-boom' }])} />

            <article className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '心とからだ', href: '/library#mind' }, { name: 'ジムの乱立を読む' }]} />
                <header className="mb-10 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>MIND &amp; BODY</p>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        GYM BOOM
                        <span className="block text-base md:text-lg mt-2 text-[#1A1A1A]/70" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>ジムの乱立を読む</span>
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-relaxed max-w-[600px] mx-auto">
                        街角に、24時間ジムが増え続けている。「健康志向が高まったから」——本当に、それだけだろうか。否定でも礼賛でもなく、<strong>この現象が何を映しているのか</strong>を読み解きます。
                    </p>
                </header>

                {/* 現象 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">まず、何が起きているか</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        ここ数年、<strong>低価格・無人・24時間</strong>を売りにしたフィットネスジムが、コンビニのように街に増えました。月数千円のサブスク型、マシンだけのコンパクトな店舗、スタッフのいない時間帯——参入のハードルが下がり、出店ラッシュが続いています。
                        {'\n\n'}
                        この光景を「国民の健康意識が高まった証拠」と読むのは自然です。でも、それなら一つの問いが残ります。<strong>ジムがこれだけ増えて、私たちは本当に前より動くようになったのでしょうか。</strong>世界的には、いまも<strong>成人の約4人に1人が「運動が足りない」状態</strong>にあるとWHOは報告しています<sup className="text-[#FF9855] font-bold">[1]</sup>。ジムの数と、体の活動量は、必ずしも同じ向きに動いていません。
                    </p>
                </section>

                {/* 数字で見る乱立 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">数字で見る——10年で2.3倍</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        「増えている」という実感を、数字で確かめてみます。帝国データバンクの調査によると、フィットネス大手15社の店舗数は<strong>この10年で約3,000店から6,500店前後へ、2.3倍に急増</strong>しました<sup className="text-[#FF9855] font-bold">[5]</sup>。とくにコロナ禍の落ち込み（2020年度末 4,387店）以降の伸びが急で、低価格・無人ジムの出店がこれを押し上げています。
                    </p>

                    {/* 棒グラフ：大手15社の店舗数 */}
                    <figure className="mt-6">
                        <svg viewBox="0 0 720 350" className="w-full h-auto" role="img" aria-label="大手フィットネス15社の店舗数推移。2014年度末 約3,000店、2020年度末 4,387店、2024年度末 約6,500店。">
                            {/* baseline */}
                            <line x1="70" y1="280" x2="690" y2="280" stroke="#1A1A1A" strokeWidth="1.5" />
                            {/* gridlines */}
                            {[2000, 4000, 6000].map((v) => {
                                const y = 280 - (v / 6500) * 220;
                                return (
                                    <g key={v}>
                                        <line x1="70" y1={y} x2="690" y2={y} stroke="#1A1A1A" strokeOpacity="0.12" strokeWidth="1" strokeDasharray="4 4" />
                                        <text x="62" y={y + 4} textAnchor="end" fontSize="13" fill="#1A1A1A" fillOpacity="0.45" fontFamily="'Space Grotesk', sans-serif">{(v / 1000).toLocaleString()}k</text>
                                    </g>
                                );
                            })}
                            {/* bars */}
                            {[
                                { year: '2014年度末', value: 3000, approx: true, color: '#9BDDD2', cx: 180 },
                                { year: '2020年度末', value: 4387, approx: false, color: '#41C9B4', cx: 380 },
                                { year: '2024年度末', value: 6500, approx: true, color: '#FF9855', cx: 580 },
                            ].map((b) => {
                                const h = (b.value / 6500) * 220;
                                const y = 280 - h;
                                return (
                                    <g key={b.year}>
                                        <rect x={b.cx - 60} y={y} width="120" height={h} rx="6" fill={b.color} stroke="#1A1A1A" strokeWidth="1.5" />
                                        <text x={b.cx} y={y - 12} textAnchor="middle" fontSize="22" fontWeight="700" fill="#1A1A1A" fontFamily="'Space Grotesk', sans-serif">{b.approx ? '約' : ''}{b.value.toLocaleString()}</text>
                                        <text x={b.cx} y={302} textAnchor="middle" fontSize="14" fontWeight="700" fill="#1A1A1A" fontFamily="'Noto Sans JP', sans-serif">{b.year}</text>
                                    </g>
                                );
                            })}
                            {/* unit */}
                            <text x="70" y="34" fontSize="13" fill="#1A1A1A" fillOpacity="0.55" fontFamily="'Noto Sans JP', sans-serif">大手15社の店舗数（店）</text>
                        </svg>
                        <figcaption className="text-xs text-[#4A4A4A]/60 mt-1 text-center">出典：帝国データバンク「フィットネスクラブ・スポーツジム」業界動向調査（2024年度）。2014年度末は「約3,000店・2.3倍」からの概算。</figcaption>
                    </figure>

                    {/* 補足スタッツ */}
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {[
                            { num: '12,543', unit: '施設', note: '全国のフィットネス施設数（2024年8月）' },
                            { num: '34.7', unit: '%', note: 'うち24時間型が4,348施設で最多' },
                            { num: '1,862', unit: '店', note: 'chocoZAP単独の店舗数（会員111万人／2026年3月）' },
                        ].map((s) => (
                            <div key={s.note} className="bg-white/60 rounded-xl p-4 border border-[#1A1A1A]/15 text-center">
                                <div className="text-3xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{s.num}<span className="text-base font-bold text-[#1A1A1A]/60 ml-0.5">{s.unit}</span></div>
                                <p className="text-xs text-[#4A4A4A] leading-snug mt-1">{s.note}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line mt-5">
                        市場規模で見ても、2024年度は<strong>約7,100億円</strong>と過去最高を更新する見通しです<sup className="text-[#FF9855] font-bold">[5]</sup>。店舗も、お金も、たしかに増えている。問題は次章——<strong>この伸びの正体が「健康」なのか「ビジネスモデル」なのか</strong>です。
                    </p>
                </section>

                {/* なぜ増えた：ビジネス構造 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">なぜ「今」これほど増えたのか</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        乱立の背景には、健康志向だけでなく<strong>ビジネスとして成立しやすくなった事情</strong>があります。
                    </p>
                    <div className="mt-5 space-y-3">
                        {[
                            { head: '① 無人運営でコストが下がった', body: 'スマホ解錠・セルフ入退館・監視カメラで、スタッフを最小化。空いた商業ビルの床（テナント）を、低コストで埋められるようになった。' },
                            { head: '② サブスク経済との相性', body: '「月額課金で気軽に始められる」モデルは、定額サービスに慣れた消費者と噛み合った。入会の心理的ハードルが大きく下がった。' },
                            { head: '③ 「行かない会員」が収益を支える', body: 'ジムの経営は、毎日来る会員ばかりだと席が足りない。実際は、入会しても次第に通わなくなる人が一定数いることを前提に成り立つ。' },
                        ].map((s) => (
                            <div key={s.head} className="bg-white/60 rounded-xl p-4 border border-[#1A1A1A]/15">
                                <div className="font-bold text-[#1A1A1A] mb-0.5">{s.head}</div>
                                <p className="text-sm text-[#4A4A4A] leading-snug">{s.body}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line mt-5">
                        ③は少し皮肉な逆説を含みます。多くの定額ジムは、会員の一部が<strong>「払っているけれど来ない」</strong>ことで黒字になります。つまりビジネスとして見れば、私たちはしばしば<strong>運動そのものより「いつでも行ける安心」に課金している</strong>。ジムの乱立は、健康志向の勝利というより、<strong>このモデルの勝利</strong>として読めます。
                    </p>
                    <p className="text-xs text-[#4A4A4A]/70 mt-4 leading-relaxed p-3 rounded-lg" style={{ background: '#EFE7DF', border: '1px solid #1A1A1A22' }}>
                        ※ これは業界の一般的な収益構造の話で、特定の事業者を批判するものではありません。ジムに通って人生が変わる人がいるのも事実です。
                    </p>
                </section>

                {/* 歴史から問い直す */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">歴史から問い直す——運動はもともと「買う」ものではなかった</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        少し引いて考えてみます。人類の歴史の大半で、<strong>運動はわざわざ「する」ものではありませんでした</strong>。歩く、運ぶ、耕す、薪を割る、井戸まで水を汲みに行く——身体活動は、生きること・働くことのなかに自然に埋め込まれていました。
                        {'\n\n'}
                        それを変えたのが近代です。<strong>機械と自動車が「労働としての運動」を肩代わりし</strong>、エレベーターやデスクワークが日常から動きを抜き取りました。すると今度は、抜け落ちた運動を<strong>専用の空間でわざわざ取り戻す</strong>必要が生まれた——これが「ジム」という発明の正体です。
                        {'\n\n'}
                        つまりジムの乱立は、見方を変えれば<strong>「生活から運動が消えた量」を、お金で埋め戻している</strong>現象とも言えます。便利さと引き換えに失った身体活動を、サブスクで買い直している。<strong>ジムが増えるほど、私たちの暮らしから運動が消えた証拠</strong>なのかもしれません。
                    </p>
                </section>

                {/* 細胞・ATPの視点 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">細胞から見ると——ジムが「売れないもの」がある</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        体の側、とくに<strong>ミトコンドリア（エネルギーをつくる細胞内の器官）</strong>の視点で見ると、大切なことが見えてきます。健康な代謝を支えるのは、週に1〜2回の激しいトレーニングだけではありません。むしろ土台になるのは、<strong>一日のあいだの細切れの動き</strong>です。
                    </p>
                    <div className="mt-5 space-y-3">
                        {[
                            { head: 'NEAT（非運動性活動）という土台', body: '立つ・歩く・家事をする・そわそわ動く——「運動」と呼ばないこうした活動の総量（NEAT）が、一日の消費エネルギーを大きく左右することが知られています。座りっぱなしの人と、よく動く人では、ここに大差がつきます。', ref: '2' },
                            { head: '「座りすぎ」は運動と別の問題', body: '週末にジムでしっかり運動しても、平日ずっと座っていれば帳消しにはなりにくい。長時間の座位そのものが代謝に悪い影響を与えるため、WHOも「座る時間を減らし、こまめに動く」ことを推奨しています。', ref: '3' },
                            { head: 'ミトコンドリアは「日々の刺激」で育つ', body: 'こまめな歩行や軽い運動の積み重ねは、ミトコンドリアの数や働きを保つことにつながります。派手な単発より、毎日の小さな動きの継続が効いてきます。', ref: '4' },
                        ].map((s) => (
                            <div key={s.head} className="bg-white/60 rounded-xl p-4 border border-[#1A1A1A]/15">
                                <div className="font-bold text-[#1A1A1A] mb-0.5">{s.head}<sup className="text-[#FF9855] font-bold ml-0.5">[{s.ref}]</sup></div>
                                <p className="text-sm text-[#4A4A4A] leading-snug">{s.body}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line mt-5">
                        ここにジムの限界があります。ジムは<strong>「派手な刺激（マシン・高強度・専用空間）」は売れますが、「毎日の代謝の土台（NEAT）」は売れません</strong>。土台は、通勤や買い物や家事——つまり<strong>あなたの生活のなかにしか存在しない</strong>からです。月会費を払うことと、細胞が動くことは、別のことなのです。
                    </p>
                </section>

                {/* もうひとつの乱用：プロテイン */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">もうひとつの乱用——プロテインは「多いほどいい」？</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        ジム文化と一緒に広がったのが、<strong>粉末プロテインやアミノ酸（BCAA・EAA）の市場</strong>です。タンパク質は筋肉にも酵素にもホルモンにも欠かせない大切な栄養素——ですが、「多く摂るほど効く」わけではありません。ここにも、ジムと同じ<strong>「足りないものをお金で上塗りする」</strong>構図が見えます。
                    </p>
                    <div className="mt-5 space-y-3">
                        {[
                            { head: '筋肉合成には「天井」がある', body: '1回の食事で筋肉づくりに使えるタンパク質量には上限があるとされ、それを超えた分は筋肉に「上乗せ」されにくい。大量に飲んでも、増えた分が全部筋肉になるわけではない。' },
                            { head: '余ったアミノ酸は「貯められない」', body: 'タンパク質は脂肪のように体に貯蔵できない。使われない分は、まず窒素（アミノ基）を外す処理（脱アミノ）が必要になる。' },
                            { head: 'その処理を担うのが肝臓と腎臓', body: '外した窒素は有害なアンモニアになり、肝臓が「尿素」に変えて無害化し、腎臓から尿として捨てる。摂りすぎた分だけ、この後始末の仕事が増える。', ref: null },
                        ].map((s) => (
                            <div key={s.head} className="bg-white/60 rounded-xl p-4 border border-[#1A1A1A]/15">
                                <div className="font-bold text-[#1A1A1A] mb-0.5">{s.head}</div>
                                <p className="text-sm text-[#4A4A4A] leading-snug">{s.body}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line mt-5">
                        ——とはいえ、ここは<strong>冷静になる必要があります</strong>。「高タンパク食が腎臓や肝臓を壊す」とよく言われますが、<strong>健康な成人では、それを裏づける確かな証拠はありません</strong>。体重1kgあたり1.6g程度まで、短期的には推奨量の約2倍まで摂っても、腎・肝の指標に悪影響は出なかったとする研究が複数あります<sup className="text-[#FF9855] font-bold">[6][7]</sup>。
                        {'\n\n'}
                        問題になるのは<strong>事情が別の人</strong>です。<strong>すでに腎臓・肝臓に病気のある人</strong>では、高タンパクが負担になりうるため、医療機関での管理が必要です<sup className="text-[#FF9855] font-bold">[6]</sup>。つまり「誰にとっても危険」ではなく、<strong>土台（食事）を見ずに粉で上塗りする使い方</strong>と、<strong>既往のある人の自己判断</strong>が、本当のリスクなのです。
                    </p>
                    <p className="text-xs text-[#4A4A4A]/70 mt-4 leading-relaxed p-3 rounded-lg" style={{ background: '#EFE7DF', border: '1px solid #1A1A1A22' }}>
                        ※ 粉末は「手軽さゆえに過剰になりやすい」のが盲点です。製品によっては甘味料・添加物が多いものもあります。まずは<strong>肉・魚・卵・大豆など食事のタンパク質</strong>を土台にし、足りない分を補う位置づけに。持病・服薬・妊娠中の方は医師・薬剤師にご相談ください。
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                        {[{ href: '/fatty-liver', label: '脂肪肝' }, { href: '/organs', label: '臓器' }, { href: '/digestion', label: '消化' }, { href: '/enzymes', label: '酵素' }, { href: '/molecular-nutrition', label: '分子栄養学' }].map((l) => (
                            <Link key={l.href} href={l.href} className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">{l.label}</Link>
                        ))}
                    </div>
                </section>

                {/* どう付き合うか */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">では、どう付き合うか</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        誤解しないでほしいのですが、これは<strong>「ジムは無駄だ」という話ではありません</strong>。ジムは、筋トレ環境がない人にとって優れた道具であり、習慣のきっかけにもなります。問題は、ジムを<strong>「契約すれば健康になれる解」</strong>だと思い込むことです。ジムは道具であって、解ではありません。
                    </p>
                    <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                            { head: 'まず「生活の運動」を取り戻す', body: '一駅歩く、階段を使う、立って作業する、こまめに歩く。土台のNEATは無料で、毎日積める。' },
                            { head: 'ジムは「土台の上乗せ」と位置づける', body: '生活の運動という土台があってこそ、ジムの筋トレ・高強度が活きる。順番を逆にしない。' },
                            { head: '「行ける安心」より「行く設計」', body: '月会費を払う前に、いつ・どう通うかを具体的に決める。決められないなら、まず生活の運動から。' },
                            { head: '通わない月は、やめる勇気', body: '幽霊会員はジムの収益。自分の体には1円も返ってこない。使っていないなら一度手放す。' },
                        ].map((s) => (
                            <div key={s.head} className="bg-white/60 rounded-xl p-4 border border-[#1A1A1A]/15">
                                <div className="font-bold text-[#1A1A1A] mb-0.5">{s.head}</div>
                                <p className="text-sm text-[#4A4A4A] leading-snug">{s.body}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 rounded-xl p-5 border-l-4" style={{ background: '#EFE7DF', borderColor: '#FF9855' }}>
                        <p className="text-[#1A1A1A] font-bold leading-relaxed">
                            ジムが増えるほど、私たちの生活から運動が消えた証拠かもしれない。<br />
                            <span className="text-[#4A4A4A] font-medium text-sm">——だとすれば、本当の入口は契約ではなく、今日どう体を動かすか、にある。</span>
                        </p>
                    </div>
                    <div className="mt-5 flex flex-wrap gap-2">
                        {[{ href: '/exercise', label: '運動' }, { href: '/mitochondria', label: 'ミトコンドリア' }, { href: '/energy', label: 'エネルギー代謝' }, { href: '/sarcopenia', label: 'サルコペニア' }, { href: '/health-counterculture', label: '健康とはカウンターカルチャー' }].map((l) => (
                            <Link key={l.href} href={l.href} className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">{l.label}</Link>
                        ))}
                    </div>
                </section>

                {/* 参照 */}
                <section className="mb-10">
                    <h2 className="text-lg font-bold text-[#1A1A1A] mb-3 border-l-4 border-[#41C9B4] pl-3 leading-tight">参照</h2>
                    <ol className="bg-white/70 rounded-2xl p-5 md:p-6 border border-black space-y-2 text-sm list-none">
                        <li>
                            <span className="text-[#FF9855] font-bold mr-1">[1]</span>
                            <a href="https://www.who.int/news-room/fact-sheets/detail/physical-activity" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                Physical activity（成人の不活動の実態・推奨される活動量）
                            </a>
                            <span className="text-[#1A1A1A]/50"> — World Health Organization</span>
                        </li>
                        <li>
                            <span className="text-[#FF9855] font-bold mr-1">[2]</span>
                            <a href="https://pubmed.ncbi.nlm.nih.gov/12468415/" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                Non-exercise activity thermogenesis (NEAT)（日常の活動が消費エネルギーに与える影響）
                            </a>
                            <span className="text-[#1A1A1A]/50"> — Levine JA, Best Pract Res Clin Endocrinol Metab</span>
                        </li>
                        <li>
                            <span className="text-[#FF9855] font-bold mr-1">[3]</span>
                            <a href="https://www.who.int/publications/i/item/9789240015128" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                WHO guidelines on physical activity and sedentary behaviour（座位時間と健康）
                            </a>
                            <span className="text-[#1A1A1A]/50"> — World Health Organization, 2020</span>
                        </li>
                        <li>
                            <span className="text-[#FF9855] font-bold mr-1">[4]</span>
                            <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3970844/" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                Exercise and mitochondrial biogenesis（運動とミトコンドリアの新生）
                            </a>
                            <span className="text-[#1A1A1A]/50"> — PMC / 査読論文</span>
                        </li>
                        <li>
                            <span className="text-[#FF9855] font-bold mr-1">[5]</span>
                            <a href="https://www.tdb.co.jp/report/industry/250516_fitness24fy/" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                「フィットネスクラブ・スポーツジム」業界動向調査（2024年度）（店舗数・市場規模・施設構成）
                            </a>
                            <span className="text-[#1A1A1A]/50"> — 帝国データバンク（TDB）</span>
                        </li>
                        <li>
                            <span className="text-[#FF9855] font-bold mr-1">[6]</span>
                            <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC6054213/" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                A Systematic Review of Renal Health in Healthy Individuals Associated with Protein Intake above the RDA（健康な人の高タンパク食と腎機能）
                            </a>
                            <span className="text-[#1A1A1A]/50"> — PMC / 系統的レビュー</span>
                        </li>
                        <li>
                            <span className="text-[#FF9855] font-bold mr-1">[7]</span>
                            <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10388821/" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                High-protein diets and markers of liver and kidney function in resistance-trained males（高タンパク食と肝・腎指標）
                            </a>
                            <span className="text-[#1A1A1A]/50"> — PMC / 査読論文</span>
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
