import Link from 'next/link';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: '精密栄養学とは | Mitoflow40',
    description: '精密栄養学（プレシジョン・ニュートリション）とは何か。「平均」ではなく「あなた」に合わせる栄養学の考え方を、遺伝子・血液検査・栄養素の3つの視点、基準値と理想値の違い、40代での活かし方からわかりやすく解説します。',
    alternates: { canonical: 'https://mitoflow40.com/precision-nutrition' },
    openGraph: {
        title: '精密栄養学とは | Mitoflow40',
        description: '「平均」ではなく「あなた」に合わせる栄養学。遺伝子・血液検査・栄養素の3つの視点から、自分に最適な健康を読み解く考え方を解説。',
        url: 'https://mitoflow40.com/precision-nutrition',
        type: 'article',
    },
};

// 従来の栄養学との違い
const compare = [
    { axis: '基準', old: 'みんなの「平均」', molecular: '至適濃度（最適な量）', precision: 'あなた個人の「最適」' },
    { axis: '目安', old: '欠乏症を防ぐ最低ライン', molecular: '反応が最も良くなる濃度', precision: '本来の力を発揮できる理想域' },
    { axis: '視点', old: '食品・カロリー中心', molecular: '分子・細胞の生化学', precision: '遺伝子 × 血液検査 × 栄養素を統合' },
    { axis: '評価', old: '基準値の範囲内なら問題なし', molecular: '生化学が滞っていないか', precision: '範囲内でも「より良い位置」を探す' },
    { axis: 'ゴール', old: '病気でない状態', molecular: '細胞が最適に働く状態', precision: '疲れにくく、活力ある状態' },
];

export default function PrecisionNutritionPage() {
    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#CDEBE2' }}>
            <img loading="lazy" decoding="async" src="/images/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block"
                style={{ top: '0', right: '-40px', width: '260px', transform: 'scaleY(-1)' }} />
            <img loading="lazy" decoding="async" src="/images/24.png" alt="" className="absolute pointer-events-none"
                style={{ bottom: '-40px', left: '-40px', width: '260px' }} />

            <JsonLd data={medicalWebPage({ name: '精密栄養学とは', description: '「平均」ではなく「あなた」に合わせる栄養学。遺伝子・血液検査・栄養素の3つの視点から自分に最適な健康を読み解く考え方を解説。', path: '/precision-nutrition' })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: '精密栄養学とは', path: '/precision-nutrition' }])} />
            <article className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '精密栄養学とは' }]} />
                <header className="mb-12 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>
                        THE APPROACH
                    </p>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        PRECISION NUTRITION
                        <span className="block text-base md:text-lg mt-2 text-[#1A1A1A]/70" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>精密栄養学とは</span>
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-relaxed max-w-[600px] mx-auto">
                        「みんなの平均」ではなく、「あなた」に合わせて整える栄養学。Mitoflow40がすべての解説で大切にしている考え方です。
                    </p>
                </header>

                {/* とは */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">精密栄養学とは</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        精密栄養学（プレシジョン・ニュートリション）とは、<strong>一人ひとりの体質・状態・生活に合わせて、最適な栄養を考える栄養学</strong>です。
                        {'\n\n'}
                        この考え方は、<strong>アメリカの研究</strong>から本格的に広がりました。2015年に米国が掲げた「<a href="https://obamawhitehouse.archives.gov/the-press-office/2015/01/30/fact-sheet-president-obama-s-precision-medicine-initiative/" target="_blank" rel="noopener noreferrer" className="text-[#41C9B4] underline underline-offset-2 hover:opacity-70">プレシジョン・メディシン（精密医療）構想</a>」を皮切りに「平均ではなく個人に合わせる」という潮流が生まれ、2022年には米国国立衛生研究所（NIH）が5年間で1億7,000万ドルを投じる大規模な精密栄養研究プログラム「<a href="https://www.nih.gov/news-events/news-releases/nih-awards-170-million-precision-nutrition-study" target="_blank" rel="noopener noreferrer" className="text-[#41C9B4] underline underline-offset-2 hover:opacity-70">Nutrition for Precision Health</a>」を開始するなど、この考え方が栄養の分野にも広がっていったのです。
                        {'\n\n'}
                        同じものを食べても、エネルギーに変えやすい人とそうでない人がいます。同じビタミンでも、たくさん必要な人と少しで足りる人がいます。その違いを生むのが、生まれ持った<strong>遺伝子</strong>、今の体の<strong>状態</strong>、そして毎日の<strong>生活習慣</strong>です。
                        {'\n\n'}
                        これまでの栄養学が「みんなに共通する平均的な目安」を示してきたのに対し、精密栄養学は「<strong>あなたにとっての最適</strong>」を探します。万人向けの正解ではなく、自分専用の解き方を見つける——それが精密栄養学の出発点です。
                    </p>
                </section>

                {/* いまの研究状況 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">いまの研究の状況</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        精密栄養学は、いまも世界中で研究が進む<strong>発展途上の分野</strong>です。なかでも先頭を走るのが<strong>アメリカ</strong>で、NIH（米国国立衛生研究所）は1万人規模の参加者を対象に、食事・腸内細菌・血糖反応・遺伝子などのデータを集める大型研究「Nutrition for Precision Health」を進めています。同じ食事でも血糖の上がり方が人によって大きく違う——そうした「個人差」を科学的に裏づけるデータが、年々積み上がっています。
                        {'\n\n'}
                        一方で<strong>日本では、精密栄養学の研究・社会実装はまだ途上</strong>にあります。健康診断や栄養指導は「集団の基準値」を前提とした仕組みが中心で、遺伝子や詳細な血液データを個人の栄養最適化に活かす動きは、これからという段階です。分子栄養学（オーソモレキュラー）の素地はありながら、欧米に比べると研究基盤や臨床への応用で遅れている、というのが現状です。
                        {'\n\n'}
                        だからこそ、最新の知見をかみ砕いて伝え、自分の体を読み解く視点を届けることに意味があると、Mitoflow40は考えています。
                    </p>
                </section>

                {/* 分子栄養学からの地続き */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">分子栄養学からの地続き</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line mb-5">
                        精密栄養学は、突然あらわれた新しい考え方ではありません。その<strong>理論の土台</strong>には、20世紀後半に築かれた<strong>分子栄養学（オーソモレキュラー）</strong>があります。「栄養で細胞の生化学を最適化する」という分子栄養学の発想に、現代の<strong>遺伝子検査や血液検査などのデータ</strong>を組み合わせ、「あなた個人に最適化する」という形へ発展させたもの——それが精密栄養学です。
                        {'\n\n'}
                        つまり両者は対立するものではなく、<strong>地続き</strong>。分子栄養学が「なぜ栄養が効くのか」という原理を示し、精密栄養学が「ではあなたにとっての最適は何か」を探します。
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                        <div className="rounded-xl p-5 border border-[#1A1A1A]/15" style={{ background: '#EFEAF6' }}>
                            <div className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/50 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>MOLECULAR · 土台</div>
                            <div className="font-bold text-[#1A1A1A] mb-1">分子栄養学</div>
                            <p className="text-xs text-[#4A4A4A] leading-relaxed">「栄養で細胞の生化学を最適化する」という<strong>原理・理論</strong>。</p>
                        </div>
                        <div className="rounded-xl p-5 border border-[#1A1A1A]/15" style={{ background: '#E3F2EE' }}>
                            <div className="text-[10px] font-bold tracking-widest text-[#41C9B4] mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>PRECISION · 実践</div>
                            <div className="font-bold text-[#1A1A1A] mb-1">精密栄養学</div>
                            <p className="text-xs text-[#4A4A4A] leading-relaxed">その理論に<strong>個人のデータ</strong>を重ね、「あなたの最適」へ落とし込む。</p>
                        </div>
                    </div>
                    <Link href="/molecular-nutrition"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold hover:opacity-90 transition"
                        style={{ background: '#1A1A1A', color: '#FFFFFF' }}>
                        分子栄養学とは を読む
                        <span>→</span>
                    </Link>
                </section>

                {/* 従来との違い */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#41C9B4] pl-3 leading-tight">これまでの栄養学との違い</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">
                        どちらが正しいという話ではなく、見ている「ものさし」が違います。
                    </p>
                    <div className="overflow-x-auto rounded-2xl border border-black bg-white/70">
                        <div className="grid grid-cols-[64px_1fr_1fr_1fr] md:grid-cols-[100px_1fr_1fr_1fr] text-sm min-w-[520px]">
                            <div className="p-3 md:p-4 font-bold text-[#1A1A1A]/50 text-xs tracking-wider bg-white/60" style={{ fontFamily: "'Space Grotesk', sans-serif" }}></div>
                            <div className="p-3 md:p-4 font-bold text-[#1A1A1A]/60 text-xs md:text-sm bg-white/60 border-l border-[#1A1A1A]/10">これまでの栄養学</div>
                            <div className="p-3 md:p-4 font-bold text-[#1A1A1A]/70 text-xs md:text-sm bg-[#EFEAF6] border-l border-[#1A1A1A]/10">分子栄養学</div>
                            <div className="p-3 md:p-4 font-bold text-[#41C9B4] text-xs md:text-sm bg-[#41C9B4]/10 border-l border-[#1A1A1A]/10">精密栄養学</div>
                            {compare.map((row) => (
                                <div key={row.axis} className="contents">
                                    <div className="p-3 md:p-4 font-bold text-[#1A1A1A] text-xs md:text-sm border-t border-[#1A1A1A]/10">{row.axis}</div>
                                    <div className="p-3 md:p-4 text-[#4A4A4A] text-xs md:text-sm border-t border-l border-[#1A1A1A]/10">{row.old}</div>
                                    <div className="p-3 md:p-4 text-[#1A1A1A] text-xs md:text-sm border-t border-l border-[#1A1A1A]/10 bg-[#EFEAF6]/50">{row.molecular}</div>
                                    <div className="p-3 md:p-4 text-[#1A1A1A] text-xs md:text-sm border-t border-l border-[#1A1A1A]/10 bg-[#41C9B4]/5">{row.precision}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <p className="text-xs text-[#4A4A4A]/60 mt-3 leading-relaxed">
                        ※ 分子栄養学（理論の土台）から精密栄養学（個別最適化の実践）へと発展してきた流れで読むと分かりやすくなります。
                    </p>
                </section>

                {/* 基準値と理想値 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">「基準値」と「理想値」はちがう</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        健康診断の「基準値」は、多くの人を測ったときの<strong>平均的な範囲</strong>であり、「この範囲を外れたら病気が疑われる」という<strong>下限のライン</strong>です。つまり「基準値内＝最高に元気」とは限りません。
                        {'\n\n'}
                        精密栄養学では、基準値の中でも「<strong>もっとも調子よく過ごせる位置（理想値）</strong>」に注目します。たとえば同じ「正常範囲内」でも、上限ギリギリと真ん中とでは、体の感じ方が変わることがあります。病気を防ぐだけでなく、<strong>本来の力を引き出す</strong>——そこを目指すのが精密栄養学の視点です。
                    </p>
                    <div className="mt-5">
                        <Link href="/biomarkers"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold hover:opacity-90 transition"
                            style={{ background: '#FF9855', color: '#1A1A1A' }}>
                            血液検査50項目の理想値を見る
                            <span>→</span>
                        </Link>
                    </div>
                </section>

                {/* なぜ40代 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">なぜ40代に効くのか</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        20代・30代は、多少無理をしても若さで押し切れました。ところが40代に入ると、ミトコンドリアの量と質、ホルモン、代謝が少しずつ変化し、「これまでと同じ」が通用しなくなります。疲れの抜け方も、体型の変わり方も、人によって差が大きく開いていく時期です。
                        {'\n\n'}
                        だからこそ、「みんなの平均」より「自分の最適」が効いてきます。自分の設計図（遺伝子）のクセを知り、現在地（血液検査）を数値で捉え、足りない材料（栄養素）を食べ物で補う。この一連の読み解きが、40代以降の<strong>活力の分かれ道</strong>になります。
                    </p>
                </section>

                {/* 使い方 */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#41C9B4] pl-3 leading-tight">Mitoflow40での読み解き方</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">
                        精密栄養学の考え方を、4つのステップで実践できます。
                    </p>
                    <div className="space-y-3">
                        {[
                            { head: '① まずセルフチェックで現在地を知る', body: '12問・約2分で、今のミトコンドリア活性度をざっくり可視化。難しい検査の前に、まず体感から。', href: '/check' },
                            { head: '② 血液検査で数値の「現在地」を読む', body: '健診の数値を、基準値だけでなく精密栄養学の理想値から読み解く。', href: '/biomarkers' },
                            { head: '③ 足りない「材料」を栄養素・食べ物で補う', body: '何が不足しているかを栄養素で特定し、身近な食べ物に落とし込む。', href: '/foods' },
                            { head: '④ 体の「しくみ」を知って腑に落とす', body: 'なぜ効くのかをミトコンドリアや代謝のしくみから理解すると、続けられる。', href: '/mitochondria' },
                        ].map((s) => (
                            <Link key={s.head} href={s.href}
                                className="group flex items-start gap-4 bg-white/70 rounded-xl p-4 border border-[#1A1A1A]/15 hover:border-black hover:shadow-sm transition-all">
                                <div>
                                    <div className="font-bold text-[#1A1A1A] mb-0.5 group-hover:text-[#FF9855] transition-colors">{s.head}</div>
                                    <p className="text-sm text-[#4A4A4A] leading-snug">{s.body}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* 注意点 */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#41C9B4] pl-3 leading-tight">大切にしたい前提</h2>
                    <div className="bg-white/70 rounded-2xl p-6 border border-black">
                        <p className="text-sm text-[#4A4A4A] leading-relaxed">
                            精密栄養学は、医療を否定したり置き換えたりするものではありません。むしろ、医療や検査で得た数値を「より良い状態づくり」に活かすための<strong>読み解きの視点</strong>です。サプリや食事の大きな変更、検査値の判断は、必ず医師・管理栄養士などの専門家と一緒に進めてください。Mitoflow40の解説は、その対話をより豊かにするための一般的な情報提供です。
                        </p>
                    </div>
                </section>

                {/* もっと深く知る */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">もっと深く知る</h2>
                    <p className="text-sm text-[#4A4A4A] leading-relaxed mb-4">
                        3つの視点それぞれの入口と、体のしくみへ。
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {[
                            { href: '/genes', label: '遺伝子' },
                            { href: '/biomarkers', label: '血液検査' },
                            { href: '/nutrients', label: '栄養素' },
                            { href: '/foods', label: '食べ物' },
                            { href: '/molecular-nutrition', label: '分子栄養学とは' },
                            { href: '/mitochondria', label: 'ミトコンドリア' },
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
                        まずは自分の「現在地」から
                    </h2>
                    <p className="text-sm text-[#4A4A4A] leading-relaxed mb-5 max-w-[480px] mx-auto">
                        12問・約2分のセルフチェックで、あなたのミトコンドリア活性度を4つの軸から可視化します。精密栄養学の第一歩に。無料・登録不要。
                    </p>
                    <Link href="/check" className="inline-block px-8 py-3 rounded-full text-sm font-bold hover:opacity-90 transition"
                        style={{ fontFamily: "'Space Grotesk', sans-serif", background: '#1A1A1A', color: '#FFFFFF' }}>
                        無料セルフチェックを試す →
                    </Link>
                </div>

                {/* 参照 */}
                <section className="mb-10">
                    <h2 className="text-lg font-bold text-[#1A1A1A] mb-3 border-l-4 border-[#41C9B4] pl-3 leading-tight">このページの参照</h2>
                    <ul className="bg-white/70 rounded-2xl p-5 md:p-6 border border-black space-y-2 text-sm">
                        <li>
                            <a href="https://obamawhitehouse.archives.gov/the-press-office/2015/01/30/fact-sheet-president-obama-s-precision-medicine-initiative/" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                FACT SHEET: President Obama’s Precision Medicine Initiative
                            </a>
                            <span className="text-[#1A1A1A]/50"> — The White House（2015）</span>
                        </li>
                        <li>
                            <a href="https://www.nih.gov/news-events/news-releases/nih-awards-170-million-precision-nutrition-study" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                NIH awards $170 million for precision nutrition study
                            </a>
                            <span className="text-[#1A1A1A]/50"> — NIH（2022）</span>
                        </li>
                        <li>
                            <a href="https://www.cell.com/fulltext/S0092-8674(15)01481-6" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                Personalized Nutrition by Prediction of Glycemic Responses
                            </a>
                            <span className="text-[#1A1A1A]/50"> — Zeevi et al., Cell（2015）</span>
                        </li>
                    </ul>
                    <p className="text-xs text-[#4A4A4A]/70 mt-2">
                        全テーマの出典は{' '}
                        <Link href="/references" className="underline decoration-[#41C9B4] decoration-2 underline-offset-2 font-bold hover:text-[#41C9B4]">参照文献・出典ページ</Link>
                        {' '}にまとめています。
                    </p>
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
