import Link from 'next/link';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: '時間栄養学（クロノニュートリション）とは ｜ いつ食べるかで変わる体 | Mitoflow40',
    description: 'クロノニュートリション（時間栄養学）は、「何を食べるか」だけでなく「いつ食べるか」で体への効き方が変わる、という体内時計と栄養を結びつけた分野です。脳と内臓それぞれの時計、朝と夜で違う代謝、朝食による時計のリセット、時間制限食（TRE）、夜遅い食事のコスト、そして朝型・夜型の個人差までを、出典つきで中立に解説します。',
    alternates: { canonical: 'https://mitoflow40.com/chrono-nutrition' },
    openGraph: {
        title: '時間栄養学（クロノニュートリション）とは ｜ Mitoflow40',
        description: '「いつ食べるか」で体は変わる。体内時計・朝と夜の代謝差・時間制限食・個人差を中立に。',
        url: 'https://mitoflow40.com/chrono-nutrition',
        type: 'article',
    },
};

export default function ChronoNutritionPage() {
    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#F4ECDA' }}>
            <img loading="lazy" decoding="async" src="/images/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block"
                style={{ top: '0', right: '-40px', width: '260px', transform: 'scaleY(-1)' }} />
            <img loading="lazy" decoding="async" src="/images/24.png" alt="" className="absolute pointer-events-none"
                style={{ bottom: '-40px', left: '-40px', width: '260px' }} />

            <JsonLd data={medicalWebPage({ name: '時間栄養学（クロノニュートリション）とは', description: '「いつ食べるか」で体への効き方が変わる時間栄養学を、体内時計・代謝・時間制限食・個人差から中立に整理する。', path: '/chrono-nutrition' })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: '身体の仕組み', path: '/library#mechanism' }, { name: '時間栄養学とは', path: '/chrono-nutrition' }])} />

            <article className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '身体の仕組み', href: '/library#mechanism' }, { name: '時間栄養学とは' }]} />
                <header className="mb-10 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>MECHANISM</p>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        CHRONO-NUTRITION
                        <span className="block text-base md:text-lg mt-2 text-[#1A1A1A]/70" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>時間栄養学（クロノニュートリション）</span>
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-relaxed max-w-[600px] mx-auto">
                        同じものを食べても、<strong>朝に食べるか、夜に食べるか</strong>で、体への効き方は変わります。「<strong>何を</strong>食べるか」に「<strong>いつ</strong>食べるか」を足す——それが時間栄養学です。
                    </p>
                </header>

                {/* 時間栄養学とは */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">「いつ食べるか」という、もうひとつの軸</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        私たちの体には、約24時間のリズムを刻む<strong>体内時計（サーカディアンリズム）</strong>が備わっています。眠気・体温・ホルモン・血圧——そして<strong>消化や代謝</strong>も、このリズムに沿って一日のうちで変化しています<sup className="text-[#FF9855] font-bold">[1]</sup>。
                        {'\n\n'}
                        <strong>クロノニュートリション（時間栄養学）</strong>は、この体内時計と栄養を結びつけた研究分野です。「カロリーや栄養素が同じでも、<strong>食べる時間帯によって体の反応が違う</strong>」——その仕組みと活かし方を考えます。「夜遅い食事は太りやすい」という昔ながらの実感に、科学的な裏づけを与えるものでもあります。
                    </p>
                    <div className="mt-4">
                        <Link href="/circadian-rhythm" className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">→ サーカディアンリズムをおさらいする</Link>
                    </div>
                </section>

                {/* 時計は脳だけじゃない */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">時計は、脳だけじゃない——胃も腸も肝臓も</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        体内時計は、脳の中の<strong>親時計</strong>（視交叉上核）がまとめ役ですが、じつは<strong>胃・腸・肝臓・脂肪といった臓器にも、それぞれの「末梢時計」</strong>があります。ここが時間栄養学のキモです<sup className="text-[#FF9855] font-bold">[4]</sup>。
                    </p>
                    <div className="mt-5 space-y-3">
                        {[
                            { head: '脳の親時計を合わせるのは「光」', body: '朝の光が目に入ると、脳の親時計がリセットされ、一日が始まる。' },
                            { head: '内臓の末梢時計を合わせるのは「食事」', body: '光が脳の時計を合わせるのに対し、内臓の時計は「いつ食べたか」で合う。つまり食事のタイミングは、消化・代謝の時計を動かすスイッチ。' },
                        ].map((s) => (
                            <div key={s.head} className="bg-white/60 rounded-xl p-4 border border-[#1A1A1A]/15">
                                <div className="font-bold text-[#1A1A1A] mb-0.5">{s.head}</div>
                                <p className="text-sm text-[#4A4A4A] leading-snug">{s.body}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-[#4A4A4A] leading-loose mt-5">
                        だから、<strong>光の朝（脳）と食事の朝（内臓）がズレる</strong>と——たとえば朝食を抜き、夜遅くにたくさん食べると——脳と内臓の時計が食い違い、代謝が乱れやすくなる、と考えられています。時差ぼけの「食事版」のようなものです。
                    </p>
                </section>

                {/* 朝と夜で違う */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">同じ糖質でも、朝と夜で「血糖の上がり方」が違う</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        体は朝〜日中に「食べて動く」設計になっていて、<strong>インスリンの効き（インスリン感受性）は朝のほうが高い</strong>傾向があります。逆に<strong>夜は耐糖能が下がり</strong>、同じ量の糖質でも<strong>血糖が上がりやすく、脂肪としてたくわえられやすい</strong>方向に傾きます<sup className="text-[#FF9855] font-bold">[2]</sup>。
                        {'\n\n'}
                        「夜のドカ食い」が太りやすく、血糖や糖化の面でも不利なのは、量だけでなく<strong>時間帯</strong>の問題でもあるわけです。大きな食事はできるだけ<strong>日中に寄せる</strong>のが、体内時計にやさしい食べ方といえます。
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {[{ href: '/blood-sugar', label: '血糖コントロール' }, { href: '/glycation', label: '糖化（AGEs）' }, { href: '/cgm', label: '血糖モニタリング' }].map((l) => (
                            <Link key={l.href} href={l.href} className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">{l.label}</Link>
                        ))}
                    </div>
                </section>

                {/* 朝のスイッチ */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">朝食は、その日の体内時計の「スタートボタン」</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        一晩の絶食のあとにとる<strong>最初の食事（＝朝食）</strong>は、内臓の末梢時計をリセットし、一日の代謝リズムを始動させる合図になります。とくに<strong>朝のタンパク質</strong>は、時計を整え、その日の血糖や満腹感の土台をつくると考えられています。
                        {'\n\n'}
                        「朝の光を浴びる」「朝にしっかりタンパク質をとる」——この2つがそろうと、<strong>脳と内臓の時計が同じ方向にそろい</strong>、一日が整いやすくなります。朝食を抜くこと自体が悪いとは一概に言えませんが、<strong>朝に何も入れず、夜に偏る</strong>パターンは、時間栄養学の視点では不利になりがちです。
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {[{ href: '/nutrients/protein', label: 'タンパク質' }, { href: '/sunlight', label: '日光と健康' }, { href: '/digestion', label: '消化・吸収' }].map((l) => (
                            <Link key={l.href} href={l.href} className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">{l.label}</Link>
                        ))}
                    </div>
                </section>

                {/* 食べる窓（TRE） */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">食べる「窓」を意識する——時間制限食（TRE）</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        時間栄養学の代表的な実践が、<strong>食べる時間帯を一定の「窓」に収める</strong>という考え方です。これを<strong>時間制限食（TRE：Time-Restricted Eating）</strong>と呼びます。よく聞く「16時間断食（16:8）」も、この一種です。
                        {'\n\n'}
                        研究では、<strong>食事の窓を早めに寄せる（朝〜夕方に食べ、夜は空ける）</strong>やり方で、インスリン感受性や血圧などの指標が改善したという報告があります<sup className="text-[#FF9855] font-bold">[3]</sup>。ポイントは「何時間断つか」よりも、<strong>夜の遅い時間に食べない・毎日の食事の時間をそろえる</strong>こと。むずかしく考えず、まずは<strong>「夕食を少し早める」「夜食をやめる」</strong>だけでも、体内時計に沿った一歩になります。
                    </p>
                    <div className="mt-4">
                        <Link href="/fasting" className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">→ ファスティング（断食）を中立に見る</Link>
                    </div>
                </section>

                {/* 夜遅い食事のコスト */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">「寝る直前の食事」が割に合わない理由</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        就寝の直前に食べると、本来は休むはずの内臓が消化のために働き続け、<strong>睡眠の質が下がったり、胃酸の逆流が起きやすく</strong>なります。さらに、夜は血糖が上がりやすい時間帯——<strong>睡眠・血糖・代謝</strong>の三方向で不利になりやすいのです。
                        {'\n\n'}
                        目安として、<strong>就寝の2〜3時間前までに食事を終える</strong>と、寝ている間に体が休息と修復に専念できます。「遅い夕食」が避けられない日は、<strong>量を軽く・消化のよいもの</strong>にするだけでも違います。
                    </p>
                    <div className="mt-4">
                        <Link href="/sleep" className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">→ 睡眠を整える</Link>
                    </div>
                </section>

                {/* クロノタイプ（個人差） */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">「正解の時間」は、人によって違う</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        ここで大切なのが、<strong>朝型・夜型（クロノタイプ）の個人差</strong>です。体内時計のリズムは人によって少しずつ違い、「全員が朝7時に朝食」を守ればよい、という単純な話ではありません。夜型の人が無理に極端な早朝型に合わせると、かえって不調になることもあります。
                        {'\n\n'}
                        だからこそ時間栄養学は、Mitoflow40 が大切にする<strong>「みんなの平均より、あなたの最適」</strong>という精密栄養学の考え方とよく噛み合います。大枠（夜遅く食べない・時間をそろえる・朝に光とタンパク質）を押さえたうえで、<strong>自分の生活リズムと体感に合わせて微調整する</strong>のが、いちばん続けやすい形です。
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {[{ href: '/precision-nutrition', label: '精密栄養学とは' }, { href: '/wearables', label: 'ウェアラブル活用' }].map((l) => (
                            <Link key={l.href} href={l.href} className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">{l.label}</Link>
                        ))}
                    </div>
                </section>

                {/* 小さな一歩 */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#41C9B4] pl-3 leading-tight">今日からできる、小さな一歩</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">時間栄養学は、<strong>食べる量や中身を変えなくても始められる</strong>のが魅力です。まずはひとつ、無理のないものから。</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                            { head: '朝、光を浴びてタンパク質', body: 'カーテンを開け、朝食に卵・納豆・ヨーグルトなどを一品。脳と内臓の時計を同時にスタート。' },
                            { head: '大きな食事は日中に寄せる', body: '夕食を主役にしすぎず、昼をしっかり。夜は控えめに。' },
                            { head: '夕食を少し早める', body: '就寝の2〜3時間前までに。まずは「夜食をやめる」だけでも。' },
                            { head: '食事の時間をそろえる', body: '毎日バラバラにせず、だいたい同じ時間に。時計が安定する。' },
                        ].map((s) => (
                            <div key={s.head} className="bg-white/70 rounded-xl p-4 border border-[#1A1A1A]/15">
                                <div className="font-bold text-[#1A1A1A] mb-0.5">{s.head}</div>
                                <p className="text-sm text-[#4A4A4A] leading-snug">{s.body}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 注意 */}
                <section className="mb-10 rounded-2xl p-6 md:p-7 border-2" style={{ background: '#FBE3DC', borderColor: '#C0392B' }}>
                    <h2 className="text-lg md:text-xl font-bold mb-3" style={{ color: '#C0392B' }}>⚠ 「断食」を自己流で始める前に</h2>
                    <p className="text-sm text-[#1A1A1A] mb-3 leading-relaxed">時間制限食や長時間の絶食は、<strong>誰にでも安全なわけではありません</strong>。次に当てはまる方は、自己判断で始めず、必ず主治医に相談してください。</p>
                    <ul className="space-y-2 text-sm text-[#1A1A1A] leading-relaxed">
                        {[
                            '糖尿病などで血糖を下げる薬・インスリンを使っている（低血糖の危険）',
                            '妊娠中・授乳中、成長期の子ども',
                            '摂食障害の経験がある、極端な食事に傾きやすい',
                            '持病があり食事や服薬の管理が必要な方',
                        ].map((t) => (
                            <li key={t} className="flex gap-2"><span style={{ color: '#C0392B' }} className="font-bold flex-shrink-0">●</span><span>{t}</span></li>
                        ))}
                    </ul>
                </section>

                {/* 免責 */}
                <p className="text-xs text-[#4A4A4A]/70 leading-relaxed mb-10 p-4 bg-white/60 rounded-lg border" style={{ borderColor: '#C0392B33', background: '#FBE3DC55' }}>
                    ※ 本記事は一般的・教育的な情報であり、診断・治療に代わるものではありません。時間栄養学・時間制限食は研究が進んでいる分野ですが、効果や安全性には個人差があり、すべての人に当てはまるものではありません。持病・服薬・妊娠などがある場合は、食事の時間や量を大きく変える前に医療機関にご相談ください。
                </p>

                {/* 参照 */}
                <section className="mb-10">
                    <h2 className="text-lg font-bold text-[#1A1A1A] mb-3 border-l-4 border-[#41C9B4] pl-3 leading-tight">参照</h2>
                    <ol className="bg-white/70 rounded-2xl p-5 md:p-6 border border-black space-y-2 text-sm list-none">
                        <li>
                            <span className="text-[#FF9855] font-bold mr-1">[1]</span>
                            <a href="https://www.nigms.nih.gov/education/fact-sheets/Pages/circadian-rhythms.aspx" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                Circadian Rhythms（体内時計の基礎）
                            </a>
                            <span className="text-[#1A1A1A]/50"> — NIGMS（米国国立衛生研究所／NIH）</span>
                        </li>
                        <li>
                            <span className="text-[#FF9855] font-bold mr-1">[2]</span>
                            <a href="https://doi.org/10.1016/j.arr.2016.12.006" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                Circadian rhythms, time-restricted feeding, and healthy aging（体内時計・時間制限食と代謝）
                            </a>
                            <span className="text-[#1A1A1A]/50"> — Manoogian &amp; Panda, Ageing Research Reviews（2017）</span>
                        </li>
                        <li>
                            <span className="text-[#FF9855] font-bold mr-1">[3]</span>
                            <a href="https://doi.org/10.1016/j.cmet.2018.04.010" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                Early Time-Restricted Feeding Improves Insulin Sensitivity...（早めの時間制限食の臨床研究）
                            </a>
                            <span className="text-[#1A1A1A]/50"> — Sutton et al., Cell Metabolism（2018）</span>
                        </li>
                        <li>
                            <span className="text-[#FF9855] font-bold mr-1">[4]</span>
                            <a href="https://doi.org/10.1111/jnc.15246" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                Chrono-nutrition: molecular and neuronal mechanisms to timed feeding（時間栄養学の総説）
                            </a>
                            <span className="text-[#1A1A1A]/50"> — Flanagan et al., Journal of Neurochemistry（2021）</span>
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
