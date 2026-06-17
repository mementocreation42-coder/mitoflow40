import Link from 'next/link';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: '小麦と健康 ｜ 血糖・グルテン・精製と、上手なつき合い方 | Mitoflow40',
    description: 'パン・パスタ・麺・お菓子——小麦は食卓の主役のひとつ。なぜ「小麦は体に悪い」と言われるのか、血糖の上がりやすさ、精製と全粒の違い、グルテン、現代小麦や残留農薬をめぐる議論を、確かなことと未確立のことを分けて中立に整理します。',
    alternates: { canonical: 'https://mitoflow40.com/wheat' },
    openGraph: {
        title: '小麦と健康 | Mitoflow40',
        description: '血糖・精製・グルテンの観点から、小麦との上手なつき合い方を中立に整理。',
        url: 'https://mitoflow40.com/wheat',
        type: 'article',
    },
};

export default function WheatPage() {
    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#F6E9CF' }}>
            <img loading="lazy" decoding="async" src="/images/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block"
                style={{ top: '0', right: '-40px', width: '260px', transform: 'scaleY(-1)' }} />
            <img loading="lazy" decoding="async" src="/images/24.png" alt="" className="absolute pointer-events-none"
                style={{ bottom: '-40px', left: '-40px', width: '260px' }} />

            <JsonLd data={medicalWebPage({ name: '小麦と健康', description: '血糖・精製・グルテンの観点から、小麦との上手なつき合い方を中立に整理。', path: '/wheat' })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: '食べ物', path: '/library#food' }, { name: '小麦と健康', path: '/wheat' }])} />

            <article className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '食べ物', href: '/library#food' }, { name: '小麦と健康' }]} />
                <header className="mb-12 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>WHEAT</p>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        WHEAT
                        <span className="block text-base md:text-lg mt-2 text-[#1A1A1A]/70" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>小麦と健康</span>
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-relaxed max-w-[560px] mx-auto">
                        パン・パスタ・麺・お菓子。小麦は食卓の主役のひとつです。「<strong>小麦は体に悪い</strong>」とよく言われますが、<strong>本当に問題なのは何なのか</strong>を、落ち着いて切り分けてみましょう。
                    </p>
                </header>

                {/* 何が問題視されるのか */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#FF9855] pl-3 leading-tight">「小麦が悪い」は、ざっくりしすぎ</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        小麦そのものが一律に「毒」なわけではありません。問題として語られるものは、実は<strong>いくつかの別々の話</strong>が混ざっています。大きく分けると——
                        {'\n\n'}
                        ①<strong>血糖の上がりやすさ</strong>（とくに精製された小麦製品）／②一部の人に関わる<strong>グルテン</strong>／③小麦食品の多くが<strong>超加工食品</strong>であること／④<strong>現代小麦や残留農薬</strong>をめぐる議論。これらを分けて見ると、「自分にとって何に気をつければいいか」が見えてきます。
                    </p>
                </section>

                {/* 血糖 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <div className="inline-block text-[10px] font-bold tracking-widest text-white bg-[#41C9B4] rounded-full px-3 py-1 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>EVIDENCE ／ 比較的確かなこと</div>
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 leading-tight">① 血糖：精製小麦は、糖質として速い</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        小麦の一番現実的な論点は、<strong>血糖</strong>です。白いパン・うどん・菓子パンなど<strong>精製された小麦製品は、消化が速く血糖を上げやすい</strong>（GIが高め）。食後の眠気・だるさ・甘いもの渇望といった「血糖の波」を起こしやすい食品です。
                        {'\n\n'}
                        これは小麦に限らず、白米や砂糖にも共通する「<strong>精製された糖質</strong>」の話。だからこそ、<strong>全粒粉（ふすま・胚芽を残したもの）</strong>を選ぶ、野菜やタンパク質と一緒に食べる、量を見直す、といった工夫が効きます。
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {[{ href: '/blood-sugar', label: '血糖コントロール' }, { href: '/glycation', label: '糖化' }, { href: '/caution-foods', label: '気をつけたい食品' }].map((l) => (
                            <Link key={l.href} href={l.href} className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">{l.label}</Link>
                        ))}
                    </div>
                </section>

                {/* グルテン */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#FF9855] pl-3 leading-tight">② グルテン：「合う人・合わない人」がいる</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        グルテンは、小麦・大麦・ライ麦に含まれるタンパク質。<strong>セリアック病やグルテン過敏の人にとっては、避けることが大切な医療</strong>です。一方で、<strong>そうでない人がグルテンフリーで健康になるという根拠は、いまのところ確立していません</strong>。
                        {'\n\n'}
                        「なんとなく良さそう」で全部抜くと、全粒穀物の食物繊維やビタミンが不足することも。グルテンの詳しい話は、専用の解説ページにまとめています。
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {[{ href: '/gut-troubles', label: 'グルテン・カゼイン等を詳しく' }, { href: '/gut-health', label: '腸内環境' }].map((l) => (
                            <Link key={l.href} href={l.href} className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">{l.label}</Link>
                        ))}
                    </div>
                    <p className="text-xs text-[#4A4A4A]/60 mt-3 leading-relaxed">※ グルテンで不調が疑われる場合、自己判断で完全に除去する前に医師へ。先に抜くと正確な検査ができなくなることがあります。</p>
                </section>

                {/* 超加工 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#FF9855] pl-3 leading-tight">③ 本当の主役は「超加工」かもしれない</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        見落とされがちですが、私たちが食べる小麦の多くは<strong>菓子パン・スナック・インスタント麺</strong>などの形をしています。これらは小麦そのものというより、<strong>砂糖・精製油・添加物がたっぷり入った「超加工食品」</strong>。
                        {'\n\n'}
                        「小麦をやめたら調子が良くなった」という体験の多くは、実は<strong>こうした超加工食品が食卓から減ったこと</strong>の効果かもしれません。同じ小麦でも、手作りのパンや全粒粉のパスタとは、体への意味がだいぶ違います。
                    </p>
                </section>

                {/* コンビニ食と現代病 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#FF9855] pl-3 leading-tight">コンビニの棚は、ほぼ「小麦と超加工」</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        コンビニやスーパーの棚を思い浮かべてみてください。<strong>菓子パン・サンドイッチ・おにぎり・カップ麺・パスタ・お菓子・揚げ物</strong>——その多くが<strong>小麦と精製された糖質</strong>でできていて、しかも砂糖・精製油・添加物を含む<strong>超加工食品</strong>です。手軽で安くておいしい——だからこそ、現代人の食卓の中心になりやすい。
                        {'\n\n'}
                        ここが現代病との接点です。超加工食品が多い食生活は、<strong>肥満・2型糖尿病・心臓病などのリスク上昇</strong>と関連することが、近年の大規模な研究で繰り返し報告されています。理由は、①<strong>血糖を上げやすい</strong>②<strong>カロリーの割に栄養（食物繊維・ビタミン・ミネラル）が乏しい</strong>③<strong>つい食べすぎてしまうよう設計されている</strong>④<strong>腸内環境を乱しやすい</strong>から。小麦そのものというより、<strong>「小麦を使った超加工食品ばかりになること」</strong>が問題なのです。
                    </p>
                    <div className="rounded-xl p-4 border border-[#1A1A1A]/15 bg-[#FBF1DD] mt-4">
                        <span className="text-[10px] font-bold tracking-widest text-[#FF9855] block mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>コンビニでも、選び方で変わる</span>
                        <p className="text-sm text-[#1A1A1A]/85 leading-relaxed">完全に避けるのは現実的ではありません。<strong>菓子パンより塩むすび＋ゆで卵／サラダチキン＋野菜／無糖の飲み物</strong>など、同じコンビニでも「タンパク質・食物繊維を足し、糖質と超加工を減らす」選び方なら、負担はぐっと軽くなります。</p>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {[{ href: '/modern-diseases', label: '現代病とは' }, { href: '/blood-sugar', label: '血糖コントロール' }, { href: '/caution-foods', label: '気をつけたい食品' }].map((l) => (
                            <Link key={l.href} href={l.href} className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">{l.label}</Link>
                        ))}
                    </div>
                </section>

                {/* 現代小麦・農薬（中立） */}
                <section className="mb-10 rounded-2xl p-6 md:p-8 border border-black" style={{ background: '#F3EFD6' }}>
                    <div className="inline-block text-[10px] font-bold tracking-widest text-[#1A1A1A] bg-[#FFD37A] rounded-full px-3 py-1 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>NEUTRAL ／ 議論のある領域</div>
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 leading-tight">④ 「現代小麦」「農薬」をめぐる議論</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        「昔の小麦と今の小麦は別物で、品種改良された<strong>現代小麦が不調の原因</strong>だ」という主張を、見聞きしたことがあるかもしれません。これは話題になりましたが、<strong>科学的には決着しておらず、断定できる段階ではありません</strong>。
                        {'\n\n'}
                        また、輸入小麦の<strong>収穫前除草剤（グリホサートなど）の残留</strong>を心配する声もあります。検出の報告はある一方、<strong>健康影響の評価は専門機関の間でも見解が分かれて</strong>います。過度に怖がる必要も、完全に無視するのも、どちらも極端です。
                        {'\n\n'}
                        気になる人は、<strong>国産小麦やオーガニックを選ぶ／全粒のものを選ぶ</strong>といった、無理のない選択から。「ゼロか100か」ではなく、納得できる範囲で選べば十分です。
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {[{ href: '/reduce-toxins', label: '有害物質を減らす暮らし' }, { href: '/mycotoxins', label: 'カビ毒と食の安全' }].map((l) => (
                            <Link key={l.href} href={l.href} className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">{l.label}</Link>
                        ))}
                    </div>
                </section>

                {/* つき合い方 */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#FF9855] pl-3 leading-tight">小麦との、上手なつき合い方</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">やめる必要はありません。「精製を減らし、加工を減らし、食べ方を工夫する」だけで、多くの問題はやわらぎます。</p>
                    <div className="space-y-3">
                        {[
                            { head: '精製より全粒を選ぶ', body: '白いパンより全粒粉。食物繊維・ビタミン・ミネラルが残り、血糖も上がりにくい。' },
                            { head: '超加工の小麦を減らす', body: '菓子パン・スナック・インスタント麺を「日常」から「ときどき」へ。これが一番効くことも多い。' },
                            { head: '食べ方を工夫する', body: '単品でなく、野菜・タンパク質・脂質と一緒に。血糖の波がなだらかになる。' },
                            { head: '主食を分散させる', body: '毎食パン・麺に偏らず、米・雑穀・いも類などとローテーション。栄養も腸内細菌も多様に。' },
                            { head: '体の声を聞く', body: '小麦で不調が続くなら、自己判断の前に医療機関へ。合うかどうかには個人差がある。' },
                        ].map((s) => (
                            <div key={s.head} className="flex items-start gap-4 bg-white/70 rounded-xl p-4 border border-[#1A1A1A]/15">
                                <div>
                                    <div className="font-bold text-[#1A1A1A] mb-0.5">{s.head}</div>
                                    <p className="text-sm text-[#4A4A4A] leading-snug">{s.body}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* もっと学ぶ */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#FF9855] pl-3 leading-tight">あわせて読む</h2>
                    <div className="flex flex-wrap gap-2">
                        {[
                            { href: '/rice', label: '白米・玄米の真実' },
                            { href: '/gut-troubles', label: 'グルテン・SIBO等' },
                            { href: '/blood-sugar', label: '血糖コントロール' },
                            { href: '/caution-foods', label: '気をつけたい食品' },
                            { href: '/foods', label: '食べ物' },
                            { href: '/gut-health', label: '腸内環境' },
                            { href: '/library', label: 'Library 全体' },
                        ].map((l) => (
                            <Link key={l.href} href={l.href} className="px-4 py-2 rounded-full bg-white border border-[#1A1A1A] text-sm font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white transition-colors">{l.label} →</Link>
                        ))}
                    </div>
                </section>

                <div className="text-center">
                    <Link href="/library" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">← Library に戻る</Link>
                </div>
            </article>
        </div>
    );
}
