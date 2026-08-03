import Link from 'next/link';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: 'ブラック・ジャックを読む ｜ 無免許医という問いから、医療と資格を考える | Mitoflow40',
    description: '医師免許を持つ漫画家・手塚治虫が、免許を持たない天才外科医を描いた。医師法17条から見れば成立しないはずの設定は、なぜ50年読まれ続けるのか。免許が守るもの、医療の値段、治せなさ——ブラック・ジャックという作品を、健康と医療を考える入口として読み解きます。',
    alternates: { canonical: 'https://mitoflow40.com/black-jack' },
    openGraph: {
        siteName: 'Mitoflow40',
        locale: 'ja_JP',
        title: 'ブラック・ジャックを読む ｜ Mitoflow40',
        description: '無免許医という設定は何を問うているのか。免許・お金・治せなさを、作品から考える。',
        url: 'https://mitoflow40.com/black-jack',
        type: 'article',
    },
};

export default function BlackJackPage() {
    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#ECE6DA' }}>
            <img loading="lazy" decoding="async" src="/images/for-you/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block"
                style={{ top: '0', right: '-40px', width: '260px', transform: 'scaleY(-1)' }} />
            <img loading="lazy" decoding="async" src="/images/misc/24.png" alt="" className="absolute pointer-events-none"
                style={{ bottom: '-40px', left: '-40px', width: '260px' }} />

            <JsonLd data={medicalWebPage({ name: 'ブラック・ジャックを読む', description: '無免許医という設定は何を問うているのか。免許・お金・治せなさを、作品から考える。', path: '/black-jack' })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: '思索', path: '/library#thoughts' }, { name: 'ブラック・ジャックを読む', path: '/black-jack' }])} />

            <article className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '思索', href: '/library#thoughts' }, { name: 'ブラック・ジャックを読む' }]} />
                <header className="mb-10 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>THOUGHTS</p>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        BLACK JACK
                        <span className="block text-base md:text-lg mt-2 text-[#1A1A1A]/70" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>無免許医という問い</span>
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-relaxed max-w-[620px] mx-auto">
                        <strong>医師免許を持つ漫画家が、免許を持たない天才外科医を描いた。</strong>現実の法律から見れば、彼は一話目から違法です。それなのに50年読まれ続けているのはなぜか——この矛盾を入口に、免許・お金・そして「治せなさ」について考えます。
                    </p>
                </header>

                {/* なぜこのページ */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">なぜ、細胞と栄養のライブラリに漫画のページがあるのか</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        このライブラリには<Link href="/medical-roles" className="underline decoration-[#41C9B4] decoration-2 underline-offset-2 font-bold hover:text-[#41C9B4]">「医療者の役割」</Link>というページがあります。誰が何を担い、国家資格という一線がどこに引かれているか——制度を<strong>内側から</strong>整理したページです。
                        {'\n\n'}
                        ブラック・ジャックは、その<strong>ちょうど裏返し</strong>にいます。彼はその線の外側に立ち、しかも線の内側にいる誰よりも腕が立つ。この「ありえない設定」は、制度を外側から照らす<strong>思考実験の装置</strong>として、驚くほどよくできています。
                        {'\n\n'}
                        制度を尊重することと、制度が何をこぼしているかを考えることは、矛盾しません。<strong>むしろ後者を考えられる人だけが、前者を本当に尊重できる</strong>——このページは、その練習です。
                    </p>
                    <p className="text-xs text-[#4A4A4A]/70 mt-4 leading-relaxed p-3 rounded-lg" style={{ background: '#EFE7DF', border: '1px solid #1A1A1A22' }}>
                        ※ 作品の展開に触れます。未読の方はご注意ください。また、このページは作品のテーマを論じるもので、原作のセリフや絵の引用・再現は行いません。
                    </p>
                </section>

                {/* 事実の確認 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">まず事実を——作品と、作者の経歴</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        この作品を語るとき、いちばん面白い事実は<strong>作者自身の経歴</strong>にあります。手塚治虫は「医師免許を持っていた」という逸話がよく知られていますが、それは正確です。
                    </p>

                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {[
                            { num: '1953', unit: '年', note: '医師国家試験に合格し、医師免許を取得' },
                            { num: '1961', unit: '年', note: '医学博士の学位を取得（研究テーマは異型精子の膜構造）' },
                            { num: '242', unit: '話', note: '『ブラック・ジャック』の総話数（1973〜1983年）' },
                        ].map((s) => (
                            <div key={s.note} className="bg-white/60 rounded-xl p-4 border border-[#1A1A1A]/15 text-center">
                                <div className="text-3xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{s.num}<span className="text-base font-bold text-[#1A1A1A]/60 ml-0.5">{s.unit}</span></div>
                                <p className="text-xs text-[#4A4A4A] leading-snug mt-1">{s.note}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 space-y-3">
                        {[
                            { head: '作者は、戦時中の医学教育を受けた世代', body: '1945年に大阪帝国大学附属医学専門部へ。これは戦争の長期化で軍医を養成するために設けられた、戦時下の臨時の課程だった。' },
                            { head: '免許は取ったが、臨床医にはならなかった', body: 'インターンを経て国家試験に合格し免許を得たものの、進んだのは漫画家の道。「医師になれた人が、ならなかった」という選択が、作品の背景にある。' },
                            { head: '連載は1973年11月から', body: '『週刊少年チャンピオン』で開始。1978年まで毎週、その後1983年まで不定期に続き、全242話。当初は短期連載の予定だったと伝えられる。' },
                            { head: '主人公は、無免許の天才外科医', body: '本名・間黒男（はざま くろお）。法外な報酬を要求する一方、医師免許を持たないまま、他の医師が匙を投げた患者を手術していく。' },
                        ].map((s) => (
                            <div key={s.head} className="bg-white/60 rounded-xl p-4 border border-[#1A1A1A]/15">
                                <div className="font-bold text-[#1A1A1A] mb-0.5">{s.head}</div>
                                <p className="text-sm text-[#4A4A4A] leading-snug">{s.body}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line mt-5">
                        つまりこの作品は、<strong>医療の世界を知り、そこに入る資格を持ちながら、外に出た人が描いた医療漫画</strong>です。内側の重さも、外側の自由も、両方わかっている人の手つき——それが作品の説得力の正体だと思います。
                    </p>
                </section>

                {/* 法律的にどうなのか */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">現実には、彼は一話目から違法である</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        身も蓋もない確認から始めます。日本の法律において、<strong>医師法第17条</strong>はこう定めています——<strong>医師でなければ、医業をなしてはならない</strong><sup className="text-[#FF9855] font-bold">[3]</sup>。
                        {'\n\n'}
                        ここでいう「医業」とは、医師の医学的判断と技術をもってしなければ人体に危害を及ぼすおそれのある行為（＝医行為）を、<strong>反復継続する意思をもって行うこと</strong>とされています。手術は当然これにあたります。違反した場合、<strong>3年以下の懲役もしくは100万円以下の罰金、またはその併科</strong>と定められています<sup className="text-[#FF9855] font-bold">[3][4]</sup>。
                    </p>
                    <div className="mt-5 rounded-xl p-5 border-2" style={{ background: '#F7E2DC', borderColor: '#1A1A1A' }}>
                        <div className="font-bold text-[#1A1A1A] mb-2">確認しておきたいこと</div>
                        <p className="text-sm text-[#4A4A4A] leading-relaxed">
                            ブラック・ジャックの行いは、<strong>現実の日本では犯罪です</strong>。これは作品への批判ではなく、前提の確認です。作者はそれを承知のうえで、あえて成立しない設定を選んでいる。だからこの作品は、<strong>「無免許でもいいじゃないか」という主張ではありません</strong>。むしろ逆で——<strong>なぜ免許制が必要なのかを、その外側から考えさせるため</strong>の装置です。
                        </p>
                    </div>
                </section>

                {/* 免許が守るもの */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">免許は「腕」を保証していない。では何を保証しているのか</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        ここが、この作品がいちばん鋭く突いている点だと思います。<strong>医師免許は「この人は名医です」という保証ではありません。</strong>免許が保証しているのは、<strong>最低ラインを下回っていないこと</strong>だけです。
                        {'\n\n'}
                        なぜそんな仕組みが要るのか。答えは<strong>情報の非対称性</strong>にあります。患者は、目の前の医師の腕を、手術を受ける前に自分で判断できません。専門知識がないから医師にかかるのに、その医師の良し悪しを判断するにはまさにその専門知識が要る——この構造から、患者は原理的に逃れられない。
                    </p>

                    {/* 4象限 */}
                    <figure className="mt-6">
                        <svg viewBox="0 0 640 400" className="w-full h-auto" role="img" aria-label="腕の有無と免許の有無による4象限。免許あり腕ありが理想、免許あり腕がまだが制度が拾う範囲、免許なし腕ありがブラック・ジャックという例外、免許なし腕なしが免許制が防いでいる本当の危険。">
                            <rect x="90" y="40" width="250" height="150" rx="8" fill="#D7F0E8" stroke="#1A1A1A" strokeWidth="1.5" />
                            <rect x="340" y="40" width="250" height="150" rx="8" fill="#FBE9D0" stroke="#1A1A1A" strokeWidth="1.5" />
                            <rect x="90" y="190" width="250" height="150" rx="8" fill="#E7E0F2" stroke="#1A1A1A" strokeWidth="1.5" />
                            <rect x="340" y="190" width="250" height="150" rx="8" fill="#F7E2DC" stroke="#1A1A1A" strokeWidth="1.5" />

                            {[
                                { x: 215, y: 100, t1: '免許あり・腕もある', t2: '理想。制度も実力も揃う', bold: false },
                                { x: 465, y: 100, t1: '免許あり・腕はこれから', t2: '制度が最低ラインで拾う範囲', bold: false },
                                { x: 215, y: 250, t1: 'ブラック・ジャック', t2: '免許なし・腕は超一流。現実には', t3: 'ほぼ存在しない例外', bold: true },
                                { x: 465, y: 250, t1: '免許なし・腕もない', t2: '免許制が本当に防いでいるのは', t3: 'これ', bold: false },
                            ].map((c) => (
                                <g key={c.t1}>
                                    <text x={c.x} y={c.y} textAnchor="middle" fontSize={c.bold ? '18' : '16'} fontWeight="700" fill="#1A1A1A" fontFamily="'Noto Sans JP', sans-serif">{c.t1}</text>
                                    <text x={c.x} y={c.y + 26} textAnchor="middle" fontSize="13" fill="#1A1A1A" fillOpacity="0.7" fontFamily="'Noto Sans JP', sans-serif">{c.t2}</text>
                                    {c.t3 && <text x={c.x} y={c.y + 46} textAnchor="middle" fontSize="13" fill="#1A1A1A" fillOpacity="0.7" fontFamily="'Noto Sans JP', sans-serif">{c.t3}</text>}
                                </g>
                            ))}

                            <text x="215" y="28" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1A1A1A" fillOpacity="0.5" fontFamily="'Noto Sans JP', sans-serif">← 腕がある</text>
                            <text x="465" y="28" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1A1A1A" fillOpacity="0.5" fontFamily="'Noto Sans JP', sans-serif">腕はこれから →</text>
                            <text x="70" y="120" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1A1A1A" fillOpacity="0.5" fontFamily="'Noto Sans JP', sans-serif" transform="rotate(-90 70 120)">免許あり</text>
                            <text x="70" y="270" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1A1A1A" fillOpacity="0.5" fontFamily="'Noto Sans JP', sans-serif" transform="rotate(-90 70 270)">免許なし</text>

                            <text x="340" y="375" textAnchor="middle" fontSize="13" fill="#1A1A1A" fillOpacity="0.55" fontFamily="'Noto Sans JP', sans-serif">免許制は「左下」を捨てる代わりに、「右下」を確実に締め出している</text>
                        </svg>
                    </figure>

                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line mt-5">
                        図にすると、免許制が何をしているかがはっきりします。<strong>ブラック・ジャックは左下の象限にいます</strong>。免許はないが腕は超一流——そんな例外を、免許制は救えません。
                        {'\n\n'}
                        でも、ここで立ち止まって考えたい。<strong>もし「腕さえあれば免許はいらない」を認めたら、何が起きるか。</strong>左下を通すために門を開ければ、そこから入ってくるのは圧倒的に<strong>右下——腕もなく免許もない人たち</strong>です。そして患者には、入ってきたのがどちらなのかを見分ける手段がない。
                        {'\n\n'}
                        つまり免許制とは、<strong>「まれな天才を取りこぼす」というコストを支払って、「多数の危険を締め出す」ことを選んだ仕組み</strong>です。ブラック・ジャックという人物は、その<strong>支払われたコストの擬人化</strong>なのだと思います。作品が痛快であると同時にどこか物悲しいのは、彼が制度の勝利ではなく、制度が諦めたものの側に立っているからでしょう。
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                        {[{ href: '/medical-roles', label: '医療者の役割' }, { href: '/electrotherapy', label: '電気療法と資格' }, { href: '/nutrition-literacy', label: '情報の読み方' }].map((l) => (
                            <Link key={l.href} href={l.href} className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">{l.label}</Link>
                        ))}
                    </div>
                </section>

                {/* お金 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">法外な報酬——「医療の値段は誰が決めるのか」</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        彼のもうひとつの特徴は、<strong>途方もない金額を請求すること</strong>です。読者はここで居心地の悪さを感じます。命を救う行為に、なぜ値札をつけるのか、と。
                        {'\n\n'}
                        でも、この居心地の悪さこそが仕掛けです。<strong>医療には、もともと値段がついています。</strong>日本ではそれが公定価格（診療報酬）として制度の中に隠されているから、私たちが普段それを意識しないだけで。窓口で払う3割の裏側には、必ず10割の価格表がある。
                        {'\n\n'}
                        ブラック・ジャックは制度の外にいるので、その価格を<strong>自分で決めるしかない</strong>。彼の請求書は、隠されていた値札を目の前に突きつけてくる装置です。
                    </p>
                    <div className="mt-5 space-y-3">
                        {[
                            { head: '保険が効く医療＝制度が「これは全員で支える」と決めたもの', body: '有効性・安全性の評価に加え、費用対効果や社会的な合意を経て、公的保険の対象が決まる。「保険が効く」は、効果があることの証明であると同時に、制度上の判断でもある。' },
                            { head: '保険が効かない＝効果がない、ではない', body: '美容目的、一部の先進的な治療、予防的な介入などは保険の外にある。制度の設計思想が「病気の治療」を中心に置いているためで、効果の有無だけで決まっているわけではない。' },
                            { head: '同時に、保険が効かない＝最先端でもない', body: 'ここが逆方向の誤解。「自由診療だから最先端」という説明は成り立たない。保険外には、評価が定まっていないものも、評価が定まらないまま売られているものも混在している。' },
                        ].map((s) => (
                            <div key={s.head} className="bg-white/60 rounded-xl p-4 border border-[#1A1A1A]/15">
                                <div className="font-bold text-[#1A1A1A] mb-0.5">{s.head}</div>
                                <p className="text-sm text-[#4A4A4A] leading-snug">{s.body}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line mt-5">
                        現代の私たちが自由診療や高額な健康サービスに向き合うとき、必要なのは<strong>「保険外か否か」ではなく「何を根拠に、いくらで、誰が責任を負うのか」を見る目</strong>です。彼が毎回、請求額と引き換えに<strong>結果に対する全責任</strong>を引き受けていることは、見落とされがちですが重要な点だと思います。
                    </p>
                </section>

                {/* 治せなさ */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">この作品の芯は、「治す話」ではなく「治せない話」</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        天才外科医の物語でありながら、この作品が読者の記憶に長く残す話は、たいてい<strong>手術が成功しなかった回、あるいは成功しても救われなかった回</strong>です。これは偶然ではなく、作品の設計だと思います。
                        {'\n\n'}
                        象徴的なのが、恩師・本間丈太郎をめぐるエピソードです。少年時代の主人公を救い、医師の道へ導いた人物が、最期に残すのは医学への確信ではなく<strong>「人間が生命をあやつることの傲慢さ」への問い</strong>でした。技術の頂点に立つ人物を主人公に据えながら、作者はその頂点から<strong>技術の限界</strong>を見せている。
                        {'\n\n'}
                        天才を主人公にした物語の多くは、天才が勝つことで読者を満足させます。この作品は逆です。<strong>天才が負ける場面を、繰り返し、丁寧に描く。</strong>そしてその負けは、腕が足りなかったからではない——もっと手前の、人間が生き物である以上どうにもならない何かに突き当たっている。
                    </p>
                </section>

                {/* 生と死 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">生と死——線を引いているのは、医学ではない</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        この作品が50年古びない理由を考えると、ひとつの答えに行き着きます。<strong>医学は変わったが、問いは変わっていない</strong>からです。
                        {'\n\n'}
                        連載が始まった1973年には、まだ日本になかったものがたくさんあります。臓器移植法も、脳死という法的な死の定義も、ゲノム医療も、人生会議（ACP）という言葉もありませんでした。技術も制度も、この50年で大きく動いた。それでも、作品が投げかけた問いは<strong>ひとつも解決していません</strong>。
                    </p>

                    {/* 年表 */}
                    <figure className="mt-6">
                        <svg viewBox="0 0 720 230" className="w-full h-auto" role="img" aria-label="1973年の連載開始から、1997年の臓器移植法施行、2010年の改正法施行、2018年の人生会議までの年表。制度は動いたが問いは残ったことを示す。">
                            <line x1="50" y1="120" x2="690" y2="120" stroke="#1A1A1A" strokeWidth="2" />
                            {[
                                { x: 95, year: '1973', label: '連載開始', sub: '死の定義は心臓死のみ', color: '#FF9855' },
                                { x: 285, year: '1997', label: '臓器移植法 施行', sub: '脳死下の提供が可能に', color: '#41C9B4' },
                                { x: 470, year: '2010', label: '改正法 施行', sub: '家族の承諾で提供可能に', color: '#41C9B4' },
                                { x: 645, year: '2018', label: '「人生会議」', sub: '本人の意思を前もって話す', color: '#41C9B4' },
                            ].map((p, i) => (
                                <g key={p.year}>
                                    <circle cx={p.x} cy="120" r="9" fill={p.color} stroke="#1A1A1A" strokeWidth="1.5" />
                                    <text x={p.x} y={i % 2 === 0 ? 78 : 165} textAnchor="middle" fontSize="17" fontWeight="700" fill="#1A1A1A" fontFamily="'Space Grotesk', sans-serif">{p.year}</text>
                                    <text x={p.x} y={i % 2 === 0 ? 96 : 183} textAnchor="middle" fontSize="13" fontWeight="700" fill="#1A1A1A" fillOpacity="0.8" fontFamily="'Noto Sans JP', sans-serif">{p.label}</text>
                                    <text x={p.x} y={i % 2 === 0 ? 112 : 199} textAnchor="middle" fontSize="11" fill="#1A1A1A" fillOpacity="0.55" fontFamily="'Noto Sans JP', sans-serif">{p.sub}</text>
                                </g>
                            ))}
                            <text x="370" y="28" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1A1A1A" fillOpacity="0.6" fontFamily="'Noto Sans JP', sans-serif">制度は動き続けた。それでも「どこからが死か」は決着していない</text>
                        </svg>
                    </figure>

                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line mt-5">
                        この年表が教えてくれるのは、たぶんいちばん受け入れにくい事実です。<strong>「どこからが死か」は、医学が発見したものではなく、社会が決めたもの</strong>だということ。
                        {'\n\n'}
                        1997年の臓器移植法で、日本は「脳死」を一定の条件下で人の死として扱えるようにしました<sup className="text-[#FF9855] font-bold">[6]</sup>。2010年施行の改正法では、本人が生前に拒否していなければ<strong>家族の承諾で提供できる</strong>ようになり、15歳未満からの提供も可能になりました<sup className="text-[#FF9855] font-bold">[6][7]</sup>。<strong>死の線が、法律によって引き直された</strong>のです。
                        {'\n\n'}
                        これは技術の進歩の話であると同時に、もっと落ち着かない話でもあります。心臓が動いていて、体は温かい。それでも死である——そう決めたのは、顕微鏡でも検査値でもなく、<strong>私たちの社会です</strong>。
                        {'\n\n'}
                        ブラック・ジャックが繰り返し描いてきたのは、まさにこの領域でした。<strong>生きているとはどういう状態か。死んだとは誰が決めるのか。</strong>医学が答えを出せる問いのように見えて、実は出せない——その境界線の上に、彼はいつも立っています。
                    </p>

                    <div className="mt-6 space-y-3">
                        {[
                            { head: '死は「点」ではなく「過程」である', body: '心臓が止まる、呼吸が止まる、脳の機能が失われる、細胞が死ぬ——これらは同時に起きない。どこかに線を引かなければ実務が動かないから引いているだけで、生物としての死はもともと連続的な過程。' },
                            { head: '技術が進むほど、線は曖昧になる', body: '人工呼吸器も、体外循環も、集中治療も、かつてなら死んでいた状態を「維持できる」ようにした。救命の技術が増えるほど、「生きている」と「生かされている」の区別は難しくなる。' },
                            { head: 'だから問いは、医学の外に出ていく', body: '「生かせるか」は医学が答えられる。「生かすべきか」は答えられない。ここから先は本人の価値観、家族の思い、社会の合意の領域——作品が繰り返し立ち止まってきた場所。' },
                        ].map((s) => (
                            <div key={s.head} className="bg-white/60 rounded-xl p-4 border border-[#1A1A1A]/15">
                                <div className="font-bold text-[#1A1A1A] mb-0.5">{s.head}</div>
                                <p className="text-sm text-[#4A4A4A] leading-snug">{s.body}</p>
                            </div>
                        ))}
                    </div>

                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line mt-5">
                        ここで、ドクター・キリコという医師の位置がはっきりしてきます。安楽死を請け負う彼は、しばしば主人公の「対極」と説明されますが、私はむしろ<strong>合わせ鏡</strong>だと思います。二人とも制度の外に立ち、二人とも<strong>患者本人の意思に直接応えようとする</strong>。違うのは応える方向だけで、「本人が望むことに応える」という一点では完全に一致している。
                        {'\n\n'}
                        だから作中で二人が対立するとき、勝負がついたようには見えません。作者はどちらかに軍配を上げていない——というより、<strong>上げられないことを描いている</strong>のだと思います。
                        {'\n\n'}
                        なお現実の日本では、<strong>積極的安楽死は法制度として認められていません</strong>。裁判例のなかで極めて厳格な要件が論じられたことはありますが、法律が許容しているわけではない。一方で、本人の意思を前もって家族や医療者と話し合っておく<strong>ACP（人生会議）</strong>という取り組みは、国も推進しています<sup className="text-[#FF9855] font-bold">[8]</sup>。50年かけて社会が出した答えは、「誰かが決める」ではなく<strong>「本人が、元気なうちから決めておく」</strong>という方向でした。
                    </p>
                </section>

                {/* おこがましさ */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">人を助けることの、おこがましさ</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        そしてこの作品のいちばん深いところに、<strong>「人を助けるとは、そもそもおこがましいことなのではないか」</strong>という疑いがあります。
                        {'\n\n'}
                        これは謙遜でも自虐でもありません。作品は、そのおこがましさを<strong>いくつもの角度から具体的に</strong>突いてきます。
                    </p>

                    <div className="mt-6 space-y-3">
                        {[
                            { n: '①', head: 'それは、誰の望みなのか', body: '救命は常に善である——という前提を、この作品は何度も疑います。本人が望んでいない救命、生きて残されたことでかえって苦しむ人、助かった先に地獄が待っている人。「助けたい」は救う側の願いであって、救われる側の願いとは限らない。ここを混同した瞬間、善意は暴力に近づく。' },
                            { n: '②', head: '助けた結果に、最後まで責任は取れるか', body: 'ピノコという存在は、この問いの結晶です。彼女は「救命」の結果ではなく、主人公が踏み込んだ先で生まれた。助けるという行為が、その人のその後の人生ぜんぶを引き受ける覚悟とセットでなければ成立しないことを、彼女の存在そのものが示しています。手術は数時間で終わるが、生きるのは一生。' },
                            { n: '③', head: '医学は「生かす」を増やしたが、「生かしていいか」は増やしていない', body: '技術が進むほど、答えられない問いのほうが増えていく。かつては選択肢がなかったから悩まずに済んだことに、いま私たちは悩まなければならない。進歩とは、しばしば「新しい迷い」を生むことでもある。' },
                            { n: '④', head: '救う側は、いつも安全な場所にいる', body: '手術台の上にいるのは患者で、メスを持つ側ではない。リスクを引き受けるのは、助けられる側です。この非対称に無自覚なまま「助けてやっている」と思った瞬間が、いちばん危うい。' },
                        ].map((s) => (
                            <div key={s.head} className="bg-white/60 rounded-xl p-4 border border-[#1A1A1A]/15">
                                <div className="flex gap-2">
                                    <span className="font-bold text-[#FF9855] flex-shrink-0">{s.n}</span>
                                    <div>
                                        <div className="font-bold text-[#1A1A1A] mb-0.5">{s.head}</div>
                                        <p className="text-sm text-[#4A4A4A] leading-snug">{s.body}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <h3 className="text-lg font-bold text-[#1A1A1A] mt-8 mb-3">そして、いちばん静かな理由——治しているのは、医者ではない</h3>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        ここからは、このライブラリらしい角度から。<strong>「おこがましさ」には、感傷ではなく生物学的な裏づけがあります。</strong>
                        {'\n\n'}
                        外科医がやっていることを、身も蓋もなく言えば——<strong>切って、取り除いて、繋いで、縫う</strong>。それだけです。縫い合わせた組織をくっつけるのは医師ではありません。<strong>患者自身の細胞</strong>です。傷の縁で線維芽細胞が動き、コラーゲンが編まれ、毛細血管が伸び、免疫細胞が後片付けをする。そのすべてを動かしているのは、患者自身のミトコンドリアが作ったATPです。
                        {'\n\n'}
                        <strong>医療にできるのは、条件を整えることまで。</strong>治るという現象そのものは、いつも患者の体のなかで起きています。だから同じ手術を同じ腕で受けても、栄養状態が悪ければ傷は治りにくく、血糖が高ければ感染しやすく、低栄養なら縫合部は保たない。名医の腕は、<strong>患者の治る力を上回れない</strong>のです。
                    </p>

                    <div className="mt-5 rounded-xl p-5 border-l-4" style={{ background: '#EFE7DF', borderColor: '#FF9855' }}>
                        <p className="text-[#1A1A1A] leading-relaxed">
                            16世紀の外科医アンブロワーズ・パレは、こう言い残したと伝えられています——<strong>「我包帯す、神これを癒し賜う」</strong>。
                            <span className="block text-sm text-[#4A4A4A] mt-2">戦場で、煮えた油を注ぐ当時の常識をやめ、穏やかな軟膏に切り替えた人の言葉です<sup className="text-[#FF9855] font-bold">[9]</sup>。「神」を「体そのもの」と読み替えれば、これは500年前の宗教的な謙遜ではなく、<strong>いまも正確な生理学の記述</strong>です。</span>
                        </p>
                    </div>

                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line mt-5">
                        つまり、本間丈太郎が最期に残した問い——人間が生命をあやつるなどという傲慢——は、精神論ではありませんでした。<strong>事実の指摘だった</strong>のだと思います。医師は生命を操作していない。生命を動かしているのは体のほうで、医師はその条件を整えているだけです。
                        {'\n\n'}
                        そして、この理解は医療を貶めません。<strong>むしろ逆です。</strong>「自分が治しているのではない」と知っている人ほど、患者の体を丁寧に扱う。栄養を気にし、術後の回復環境を整え、余計なことをしない。<strong>謙虚さは感傷ではなく、正確さの別名</strong>なのです。
                    </p>

                    <div className="mt-6 rounded-xl p-5 border-l-4" style={{ background: '#EFE7DF', borderColor: '#41C9B4' }}>
                        <p className="text-[#1A1A1A] font-bold leading-relaxed">
                            技術の頂点に立つ人物が、いちばん深く「治せなさ」を知っている。<br />
                            <span className="text-[#4A4A4A] font-medium text-sm">——腕が上がるほど、治しているのが自分ではないことがよく見える。これは50年前の漫画の話ではなく、今の医療がそのまま抱えているテーマです。</span>
                        </p>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                        {[{ href: '/mitochondria', label: 'ミトコンドリア' }, { href: '/atp', label: 'ATP' }, { href: '/inflammation', label: '炎症と修復' }, { href: '/organs', label: '臓器' }, { href: '/health-philosophy', label: '健康とは' }].map((l) => (
                            <Link key={l.href} href={l.href} className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">{l.label}</Link>
                        ))}
                    </div>
                </section>

                {/* 現代から読み直す */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">2020年代から読み直すと、問いはむしろ増えている</h2>
                    <div className="space-y-3">
                        {[
                            { head: '① 情報の非対称性は、本当に縮んだのか', body: '患者が検索し、論文にもアクセスできる時代になった。非対称性は確かに縮んだ——が、同時に「調べられるようになったからこそ、間違った確信を持てるようになった」という新しい問題も生まれた。判断材料が増えることと、判断力が上がることは同じではない。' },
                            { head: '② 「標準治療」は、二流の治療ではない', body: '「標準」という言葉のせいで誤解されやすいが、標準治療とは現時点で最も根拠のある治療のこと。作品の影響もあって「制度の外に本当の答えがある」という物語は魅力的に映るが、現実には順序が逆であることのほうが多い。' },
                            { head: '③ 患者の自己決定は、どこまで自分のものか', body: '主人公は常に患者本人の意思に応えようとする。現代の医療も、インフォームド・コンセントや意思決定支援という形でそこへ向かっている。ただし十分な情報と時間がなければ、「自己決定」は名ばかりになる。ここは今も未解決の課題。' },
                        ].map((s) => (
                            <div key={s.head} className="bg-white/60 rounded-xl p-4 border border-[#1A1A1A]/15">
                                <div className="font-bold text-[#1A1A1A] mb-0.5">{s.head}</div>
                                <p className="text-sm text-[#4A4A4A] leading-snug">{s.body}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Mitoflowの視点 */}
                <section className="mb-10 rounded-2xl p-6 md:p-8 border border-black" style={{ background: '#D7EAE2' }}>
                    <p className="text-xs tracking-widest font-bold mb-2 text-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>OUR VIEW</p>
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 leading-tight">では、Mitoflow40はどう考えるか</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        ここまで、免許・お金・生と死・おこがましさと見てきました。最後に、<strong>その刃を自分に向けます</strong>。そして正直に言うと、ここから先に<strong>きれいな答えはありません</strong>。
                        {'\n\n'}
                        まず、逃げ道を一つ塞いでおきます。「私たちは判断材料を並べるだけで、決めるのは読者です」——こう書けば、いちばん安全に着地できます。でも<strong>それは嘘です。</strong>
                        {'\n\n'}
                        私は<strong>説いています。</strong>「加工食品を減らしたほうがいい」「夜更かしは代謝を壊す」「その健康法には根拠がない」——強い言葉で書いているし、伝わってほしいと思って書いている。中立な資料の提示なんかではありません。<strong>説得です。</strong>そしてそれは、前章で私が批判したばかりの「助けてやる」と、同じ構造をしています。
                    </p>

                    <div className="mt-5 rounded-xl p-5 border-2 bg-white/70" style={{ borderColor: '#1A1A1A' }}>
                        <p className="text-[#1A1A1A] leading-relaxed">
                            <strong>おこがましさを論じたページの筆者が、いちばんおこがましい。</strong>
                            <span className="block text-sm text-[#4A4A4A] mt-2">しかも医師と違って、私は結果に責任を負いません。手術なら失敗が目に見えますが、健康情報は、間違っていても誰かの10年をゆっくり損なうだけで、証拠が残らない。<strong>責任を負わない立場から人の生き方に口を出している</strong>——これがこのライブラリの、消えない後ろめたさです。</span>
                        </p>
                    </div>

                    <h3 className="text-lg font-bold text-[#1A1A1A] mt-8 mb-3">それでも、黙らない理由</h3>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        では黙るべきか。<strong>そうは思いません。</strong>
                        {'\n\n'}
                        黙っていることは中立ではないからです。私が黙っても、健康の話が世の中から消えるわけではない。消えるのは<strong>根拠を確かめようとする声のほうだけ</strong>で、あとには「飲むだけで痩せる」「これでがんが消える」が残ります。おこがましさを恐れて口をつぐむのは、謙虚さではなく、<strong>ただ自分が傷つかない場所に逃げている</strong>だけだと思う。
                        {'\n\n'}
                        それに——目の前で誰かが少しずつ弱っていくのを見ながら、「決めるのはご本人ですから」と言うのは、私にはできませんでした。<strong>それができないから、この仕事をしています。</strong>
                    </p>

                    <h3 className="text-lg font-bold text-[#1A1A1A] mt-8 mb-3">でも、それで問題は消えない</h3>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        ここが本題です。<strong>「黙らない理由がある」ことと、「説くことが正当化される」ことは、まったく別です。</strong>理由があっても、おこがましさは1ミリも減らない。
                        {'\n\n'}
                        だから正直に、いま抱えている悩みのほうを書きます。答えが出ていないものだけを、出ていない形で。
                    </p>

                    <div className="mt-6 space-y-3">
                        {[
                            {
                                head: '確信がないと届かない。でも確信を持った瞬間に、証拠を超えている',
                                body: '「〜かもしれません」と正確に書くほど、人の心は動きません。動かすには言い切る必要がある。でも言い切った瞬間、私は自分が持っている根拠より強いことを言っている。伝わることと、正確であることが、しばしば逆を向く。この矛盾を、私はまだ解けていません。',
                            },
                            {
                                head: '健康を説くことは、その人の生き方を否定することがある',
                                body: '晩酌が唯一の楽しみな人に「酒を減らせ」と言うことは、その人の一日から灯りを一つ消すことでもある。夜中のラーメンも、甘いものも、誰かの支えです。私は「体にいいこと」を語っているつもりで、実は「あなたの生き方は間違っている」と言っているのではないか——書きながら、何度も手が止まります。',
                            },
                            {
                                head: '相手が変わらないとき、それは自由なのか、私の敗北なのか',
                                body: '伝えても変わらない人がいます。「それがその人の選択だ」と思うようにしている。でも本当にそう思えているのか、それとも自分の無力さに理屈をつけているだけなのか、正直わかりません。相手の自由を尊重することと、諦めることの区別が、実務のなかではつかない。',
                            },
                            {
                                head: '「よかれと思って」がいちばん危ないと知りながら、よかれと思ってやっている',
                                body: '善意は暴力に近づく——このページでそう書いた私が、まさに善意で書いています。この自己矛盾には出口がない。せいぜいできるのは、自分が善意の側にいることを忘れないでいることくらいです。',
                            },
                            {
                                head: 'いま正しいと思っていることが、10年後には変わっているかもしれない',
                                body: 'これは想像ではなく、歴史がそう教えています。脂質は悪者にされ、卵は制限され、その多くが後に見直された。私がいま自信を持って書いていることのいくつかは、たぶん間違っている。どれが間違いかだけが、わからない。',
                                links: [{ href: '/nutrition-history', label: '栄養学の歴史' }],
                            },
                        ].map((s) => (
                            <div key={s.head} className="bg-white/70 rounded-xl p-5 border border-[#1A1A1A]/15">
                                <div className="flex gap-3">
                                    <span className="font-bold text-[#FF9855] flex-shrink-0 text-lg leading-none mt-1">?</span>
                                    <div>
                                        <div className="font-bold text-[#1A1A1A] mb-1">{s.head}</div>
                                        <p className="text-sm text-[#4A4A4A] leading-relaxed">{s.body}</p>
                                        {s.links && (
                                            <div className="mt-3 flex flex-wrap gap-2">
                                                {s.links.map((l) => (
                                                    <Link key={l.href} href={l.href} className="text-[11px] px-2.5 py-0.5 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">{l.label}</Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line mt-5">
                        こう並べたうえで、それでも私は明日も書きます。<strong>矛盾したまま続ける、というのが現時点での結論です。</strong>解決したふりをするより、そのほうが誠実だと思うので。
                    </p>

                    {/* 健康寿命 */}
                    <h3 className="text-lg font-bold text-[#1A1A1A] mt-8 mb-3">「死なないこと」でないなら、何を目指すのか</h3>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        ここは感覚論にしたくないので、数字で示します。日本人の<strong>平均寿命と健康寿命の差</strong>——つまり<strong>「生きてはいるが、日常生活に制限がある期間」</strong>は、2022年時点で<strong>男性8.49年、女性11.63年</strong>です<sup className="text-[#FF9855] font-bold">[10]</sup>。
                    </p>

                    <figure className="mt-5">
                        <svg viewBox="0 0 720 240" className="w-full h-auto" role="img" aria-label="日本人の平均寿命と健康寿命。男性は健康寿命72.57年、平均寿命81.05年で差は8.49年。女性は健康寿命75.45年、平均寿命87.09年で差は11.63年。">
                            {[
                                { y: 50, label: '男性', healthy: 72.57, total: 81.05, gap: '8.49年' },
                                { y: 140, label: '女性', healthy: 75.45, total: 87.09, gap: '11.63年' },
                            ].map((r) => {
                                const scale = 560 / 90;
                                const hw = r.healthy * scale;
                                const tw = r.total * scale;
                                return (
                                    <g key={r.label}>
                                        <text x="42" y={r.y + 34} textAnchor="middle" fontSize="15" fontWeight="700" fill="#1A1A1A" fontFamily="'Noto Sans JP', sans-serif">{r.label}</text>
                                        <rect x="70" y={r.y} width={hw} height="46" rx="6" fill="#41C9B4" stroke="#1A1A1A" strokeWidth="1.5" />
                                        <rect x={70 + hw} y={r.y} width={tw - hw} height="46" rx="6" fill="#F0B49A" stroke="#1A1A1A" strokeWidth="1.5" />
                                        <text x={70 + hw / 2} y={r.y + 30} textAnchor="middle" fontSize="15" fontWeight="700" fill="#1A1A1A" fontFamily="'Space Grotesk', sans-serif">{r.healthy}</text>
                                        <text x={70 + hw + (tw - hw) / 2} y={r.y + 29} textAnchor="middle" fontSize="13" fontWeight="700" fill="#1A1A1A" fontFamily="'Space Grotesk', sans-serif">{r.gap}</text>
                                        <text x={tw + 78} y={r.y + 30} fontSize="14" fontWeight="700" fill="#1A1A1A" fillOpacity="0.7" fontFamily="'Space Grotesk', sans-serif">{r.total}</text>
                                    </g>
                                );
                            })}
                            <g>
                                <rect x="70" y="212" width="14" height="14" rx="3" fill="#41C9B4" stroke="#1A1A1A" strokeWidth="1.2" />
                                <text x="92" y="224" fontSize="13" fill="#1A1A1A" fillOpacity="0.75" fontFamily="'Noto Sans JP', sans-serif">健康寿命（制限なく過ごせる期間）</text>
                                <rect x="330" y="212" width="14" height="14" rx="3" fill="#F0B49A" stroke="#1A1A1A" strokeWidth="1.2" />
                                <text x="352" y="224" fontSize="13" fill="#1A1A1A" fillOpacity="0.75" fontFamily="'Noto Sans JP', sans-serif">日常生活に制限のある期間</text>
                            </g>
                            <text x="70" y="26" fontSize="13" fill="#1A1A1A" fillOpacity="0.55" fontFamily="'Noto Sans JP', sans-serif">2022年（令和4年）・単位：年</text>
                        </svg>
                        <figcaption className="text-xs text-[#4A4A4A]/60 mt-1 text-center">出典：厚生労働省（令和4年の健康寿命）。平均寿命は男性81.05年・女性87.09年。</figcaption>
                    </figure>

                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line mt-5">
                        オレンジの部分——<strong>男性で約8年半、女性で約12年</strong>。これが、いま日本人が平均して過ごしている「生きてはいるが、思うように動けない時間」です。
                        {'\n\n'}
                        私たちが目指すのは、右端（寿命）を伸ばすことではありません。<strong>緑を右に押して、オレンジを縮めること</strong>です。同じ85年でも、中身はまったく違う。<strong>死は避けられなくても、この配分は変えられる</strong>——ここが、健康を語る意味が残っている唯一の場所だと考えています。
                        {'\n\n'}
                        そして興味深いことに、この配分を決めているのは天才的な医療技術ではありません。<strong>血糖、炎症、筋肉量、睡眠、そして細胞のエネルギー産生</strong>——このライブラリが延々と扱ってきた、地味なものばかりです。
                    </p>

                    {/* 締め */}
                    <h3 className="text-lg font-bold text-[#1A1A1A] mt-8 mb-3">ブラック・ジャックが来ない場所に、私たちは立っている</h3>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        最後に、いちばん単純な事実を。
                        {'\n\n'}
                        彼が登場するのは、<strong>いつも「手遅れの一歩手前」</strong>です。事故、破裂、腫瘍、瀕死。物語の起点は常に、体がもう限界を越えた瞬間にあります。彼は「治す医療」の極北にいる人物であり、<strong>だからこそ彼の物語には「その手前の何年か」がまったく描かれない</strong>。
                        {'\n\n'}
                        でも現実の体では、その描かれない何年かのほうが圧倒的に長い。血糖が少しずつ上がり、炎症がくすぶり、睡眠が削られ、ミトコンドリアが静かに数を減らしていく——<strong>誰も手術しに来てくれない、長い長い時間</strong>。上のグラフのオレンジは、たいていこの時間の果てに生まれます。
                        {'\n\n'}
                        そして重要なのは、<strong>その時間には天才が要らない</strong>ということです。必要なのは超人的な技術ではなく、食べるもの、寝る時間、動く量。<strong>代われる人がいない代わりに、誰にでもできる。</strong>
                        {'\n\n'}
                        天才が要らないというのは、救いのある話です。<strong>ただし、それで私のおこがましさが消えるわけではありません。</strong>
                        {'\n\n'}
                        「私は治さない、材料を渡すだけだ」——そう言えれば楽になれる。でもさっき書いたとおり、それは嘘です。私は説くし、変わってほしいと思っているし、変わらなければ落胆する。<strong>そこまで含めて、おこがましい。</strong>
                        {'\n\n'}
                        だから最後に残るのは、立派な結論ではなく、<strong>ひとつの用心</strong>だけです。
                    </p>

                    <div className="mt-6 rounded-xl p-5 border-l-4 bg-white/70" style={{ borderColor: '#FF9855' }}>
                        <p className="text-[#1A1A1A] font-bold leading-relaxed">
                            この後ろめたさが消えたときが、いちばん危ない。
                        </p>
                        <p className="text-sm text-[#4A4A4A] leading-relaxed mt-2">
                            自分の言っていることが完全に正しいと思えたとき、相手が変わらないのを相手のせいだと思えたとき、書きながら手が止まらなくなったとき——そのときはもう、<strong>他人の人生を自分の正しさで上書きしている</strong>のだと思います。本間丈太郎が最期に問うたのは、たぶんそういう瞬間のことでした。
                        </p>
                        <p className="text-sm text-[#4A4A4A] leading-relaxed mt-3">
                            悩みが解けたから書くのではなく、<strong>解けないまま書く</strong>。いまのところ、私が自分に課せる歯止めはそれだけです。
                        </p>
                    </div>

                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line mt-6">
                        彼の物語が始まるより、ずっと前の時間を生きること。ドラマにはならないけれど、それが健康というものの正体なのだと思います。<strong>そして、そこには天才も、私も、本当は要らない。</strong>——それでも書いてしまうという矛盾を抱えたまま、このライブラリは続きます。
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                        {[{ href: '/health-philosophy', label: '健康とは' }, { href: '/medical-roles', label: '医療者の役割' }, { href: '/modern-diseases', label: '現代病' }, { href: '/mitochondria', label: 'ミトコンドリア' }, { href: '/sarcopenia', label: 'サルコペニア' }, { href: '/health-counterculture', label: '健康とはカウンターカルチャー' }].map((l) => (
                            <Link key={l.href} href={l.href} className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">{l.label}</Link>
                        ))}
                    </div>
                </section>

                {/* 参照 */}
                <section className="mb-10">
                    <h2 className="text-lg font-bold text-[#1A1A1A] mb-3 border-l-4 border-[#41C9B4] pl-3 leading-tight">参照</h2>
                    <ol className="bg-white/70 rounded-2xl p-5 md:p-6 border border-black space-y-2 text-sm list-none">
                        {[
                            { n: 1, url: 'https://tezukaosamu.net/jp/manga/438.html', title: '『ブラック・ジャック』作品データ（連載時期・掲載誌）', src: '手塚治虫オフィシャルサイト（手塚プロダクション）' },
                            { n: 2, url: 'https://tezukaosamu.net/jp/mushi/entry/26454.html', title: '『ブラック・ジャック』再入門 第1回：アンチヒーローB・Jはこうして誕生した（成立の経緯）', src: '虫ん坊／手塚治虫オフィシャルサイト' },
                            { n: 3, url: 'https://hourei.net/law/323AC0000000201', title: '医師法（第17条：医業の禁止／第31条：罰則）', src: '法令データ' },
                            { n: 4, url: 'https://www.pref.hiroshima.lg.jp/uploaded/attachment/252191.pdf', title: '医行為について（関連通知）——「医業」の定義に関する行政解釈', src: '広島県' },
                            { n: 5, url: 'https://www.mhlw.go.jp/stf/shingi/shingi-chuo_128154.html', title: '中央社会保険医療協議会（診療報酬という「公定価格」が決まる場）', src: '厚生労働省' },
                            { n: 6, url: 'https://www.jotnw.or.jp/explanation/01/04/', title: '臓器移植法について（1997年施行、2010年施行の改正内容）', src: '日本臓器移植ネットワーク' },
                            { n: 7, url: 'https://www.med.or.jp/doctor/rinri/i_rinri/g13.html', title: '医の倫理の基礎知識：臓器移植改正法の施行後の状況と課題', src: '日本医師会' },
                            { n: 8, url: 'https://www.mhlw.go.jp/stf/newpage_02783.html', title: '「人生会議」（ACP）について——本人の意思を前もって話し合う取り組み', src: '厚生労働省' },
                            { n: 9, url: 'https://ja.wikipedia.org/wiki/%E3%82%A2%E3%83%B3%E3%83%96%E3%83%AD%E3%83%AF%E3%83%BC%E3%82%BA%E3%83%BB%E3%83%91%E3%83%AC', title: 'アンブロワーズ・パレ（1510-1590）——戦場での治療法の転換と、伝えられる言葉', src: '参考：人物の概要' },
                            { n: 10, url: 'https://kennet.mhlw.go.jp/information/information/hale/h-01-002.html', title: '平均寿命と健康寿命（令和4年：健康寿命 男性72.57年・女性75.45年）', src: '厚生労働省 e-ヘルスネット／健康日本21' },
                        ].map((r) => (
                            <li key={r.n}>
                                <span className="text-[#FF9855] font-bold mr-1">[{r.n}]</span>
                                <a href={r.url} target="_blank" rel="noopener noreferrer"
                                    className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                    {r.title}
                                </a>
                                <span className="text-[#1A1A1A]/50"> — {r.src}</span>
                            </li>
                        ))}
                    </ol>
                    <p className="text-xs text-[#4A4A4A]/60 mt-3 leading-relaxed">
                        ※ 『ブラック・ジャック』は手塚プロダクションの著作物です。このページは作品のテーマについての論評であり、原作の文章・画像の転載は行っていません。作品をお読みになる際は、正規の出版物・配信サービスをご利用ください。
                    </p>
                </section>

                <div className="text-center">
                    <Link href="/library" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">← Library に戻る</Link>
                </div>
            </article>
        </div>
    );
}
