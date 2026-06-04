import Link from 'next/link';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: '分子栄養学とは | Mitoflow40',
    description: '分子栄養学（オーソモレキュラー）とは何か。ライナス・ポーリングが提唱した「至適濃度」の考え方、生化学的個体差、酵素と補酵素の関係、精密栄養学との違いを、40代の健康最適化の視点でわかりやすく解説します。',
    alternates: { canonical: 'https://mitoflow40.com/molecular-nutrition' },
    openGraph: {
        title: '分子栄養学とは | Mitoflow40',
        description: '細胞・分子レベルで体を最適化する「分子栄養学（オーソモレキュラー）」。至適濃度・生化学的個体差・酵素と補酵素の考え方を解説。',
        url: 'https://mitoflow40.com/molecular-nutrition',
        type: 'article',
    },
};

// 中心となる考え方
const ideas = [
    {
        head: '至適濃度（オプティマム）',
        body: '欠乏症を防ぐ「最低限の量」ではなく、体の反応がもっとも良くなる「ちょうど良い濃度」を目指す。同じ栄養素でも、不足を防ぐ量と力を引き出す量はちがう、という考え方です。',
    },
    {
        head: '生化学的個体差',
        body: '必要な栄養素の量には個人差があり、人によって何倍も違うことがある。「平均的な必要量」が誰にでも当てはまるわけではない、という前提に立ちます。',
    },
    {
        head: '酵素と補酵素',
        body: '体内の化学反応は酵素が担い、その多くがビタミンやミネラル（補酵素）を必要とする。材料が足りないと反応が滞る——だから栄養が代謝を左右します。',
    },
    {
        head: '律速段階を満たす',
        body: '一連の代謝の中で、いちばん遅い「ボトルネック」が全体の速さを決める。そこに関わる栄養素を満たすことが、効率よく体を整える鍵になります。',
    },
];

export default function MolecularNutritionPage() {
    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#E6DEF4' }}>
            <img loading="lazy" decoding="async" src="/images/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block"
                style={{ top: '0', right: '-40px', width: '260px', transform: 'scaleY(-1)' }} />
            <img loading="lazy" decoding="async" src="/images/24.png" alt="" className="absolute pointer-events-none"
                style={{ bottom: '-40px', left: '-40px', width: '260px' }} />

            <JsonLd data={medicalWebPage({ name: '分子栄養学とは', description: '細胞・分子レベルで体を最適化する分子栄養学（オーソモレキュラー）。至適濃度・生化学的個体差・酵素と補酵素の考え方を解説。', path: '/molecular-nutrition' })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: '分子栄養学とは', path: '/molecular-nutrition' }])} />
            <article className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '分子栄養学とは' }]} />
                <header className="mb-12 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>
                        THE FOUNDATION
                    </p>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        MOLECULAR NUTRITION
                        <span className="block text-base md:text-lg mt-2 text-[#1A1A1A]/70" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>分子栄養学とは</span>
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-relaxed max-w-[600px] mx-auto">
                        体を「分子・細胞のレベル」でとらえ、栄養で生化学を最適化する。精密栄養学の土台になっている考え方です。
                    </p>
                </header>

                {/* とは */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">分子栄養学とは</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        分子栄養学とは、<strong>体の中で起きている化学反応（生化学）を、分子・細胞のレベルで理解し、栄養で最適化しようとする学問</strong>です。「オーソモレキュラー（orthomolecular）」とも呼ばれ、これは「正しい（ortho）分子（molecular）」という意味です。
                        {'\n\n'}
                        提唱したのは、ノーベル賞を2度受賞した化学者<strong>ライナス・ポーリング</strong>。「体に本来あるべき分子（栄養素）を、最適な濃度で満たすことで健康を保つ」という考え方を1960年代に示しました。日本では物理学者の<strong>三石巌</strong>らによって広められ、サプリメントや食事による体質改善の理論的な背景になっています。
                        {'\n\n'}
                        ポイントは、薬で症状を抑えるのではなく、<strong>体が本来持っている力を、栄養という材料で支える</strong>という発想です。細胞ひとつひとつの代謝がうまく回るように材料をそろえる——それが分子栄養学の出発点です。
                    </p>
                </section>

                {/* 生化学とは */}
                <section id="biochemistry" className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black scroll-mt-24">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">そもそも「生化学」とは？</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        分子栄養学の土台にあるのが<strong>生化学（せいかがく）</strong>です。むずかしそうな言葉ですが、中身はシンプル。<strong>体の中で絶え間なく起きている「化学反応」のこと</strong>——いわゆる「代謝」です。食べたものをエネルギーに変える、古い細胞を作り替える、ホルモンや神経伝達物質を合成する。生きているとは、この無数の化学反応が休みなく進み続けている状態のことです。
                        {'\n\n'}
                        その一つひとつの反応を進める“職人”が<strong>酵素</strong>で、酵素が働くのを助ける“道具”が<strong>補酵素</strong>です。そして、その補酵素の正体こそが、<strong>ビタミンやミネラル</strong>。つまり——栄養が足りないと、酵素が十分に働けず、化学反応（代謝）が滞ります。これが、「材料（栄養）が不足すると不調になる」しくみの正体です。
                        {'\n\n'}
                        「なぜ栄養が体に効くのか」という問いの答えは、ここにあります。栄養は、体の生化学という巨大な工場を、滞りなく動かすための<strong>材料であり、潤滑油</strong>なのです。
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                        {[
                            { href: '/energy', label: 'エネルギー' },
                            { href: '/methylation', label: 'メチレーション' },
                            { href: '/nutrients', label: '栄養素（補酵素）' },
                            { href: '/mitochondria', label: 'ミトコンドリア' },
                        ].map((l) => (
                            <Link key={l.href} href={l.href}
                                className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">
                                {l.label}
                            </Link>
                        ))}
                    </div>
                </section>

                {/* 中心となる考え方 */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#41C9B4] pl-3 leading-tight">中心となる4つの考え方</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">
                        分子栄養学は、いくつかのシンプルな前提の上に成り立っています。
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {ideas.map((it, i) => (
                            <div key={it.head} className="bg-white/70 rounded-xl p-5 border border-black">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#41C9B4] text-white text-xs font-bold flex items-center justify-center" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                        {i + 1}
                                    </span>
                                    <div className="font-bold text-[#1A1A1A]">{it.head}</div>
                                </div>
                                <p className="text-xs text-[#4A4A4A] leading-relaxed">{it.body}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 精密栄養学との関係 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">精密栄養学との関係</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line mb-5">
                        分子栄養学と精密栄養学は、対立するものではなく<strong>地続き</strong>です。分子栄養学が「栄養で生化学を最適化する」という<strong>理論の土台</strong>を築き、精密栄養学はそこに<strong>遺伝子検査や血液検査などのデータ</strong>を組み合わせ、「あなた個人に最適化する」という形へ発展させたもの——という関係でとらえると分かりやすいです。
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="rounded-xl p-5 border border-[#1A1A1A]/15" style={{ background: '#EFEAF6' }}>
                            <div className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/50 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>MOLECULAR</div>
                            <div className="font-bold text-[#1A1A1A] mb-1">分子栄養学</div>
                            <p className="text-xs text-[#4A4A4A] leading-relaxed">「栄養で細胞の生化学を最適化する」という<strong>考え方・理論</strong>。土台となる原理。</p>
                        </div>
                        <div className="rounded-xl p-5 border border-[#1A1A1A]/15" style={{ background: '#E3F2EE' }}>
                            <div className="text-[10px] font-bold tracking-widest text-[#41C9B4] mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>PRECISION</div>
                            <div className="font-bold text-[#1A1A1A] mb-1">精密栄養学</div>
                            <p className="text-xs text-[#4A4A4A] leading-relaxed">その理論に<strong>個人のデータ</strong>を重ね、「あなたの最適」へ落とし込む<strong>実践</strong>。</p>
                        </div>
                    </div>
                    <div className="mt-5">
                        <Link href="/precision-nutrition"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold hover:opacity-90 transition"
                            style={{ background: '#FF9855', color: '#1A1A1A' }}>
                            精密栄養学とは を読む
                            <span>→</span>
                        </Link>
                    </div>
                </section>

                {/* 40代での意味 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">なぜ40代で意味を持つのか</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        40代になると、エネルギーを作るミトコンドリアの働きや、代謝を担う酵素の効率が少しずつ落ちてきます。酵素の働きが鈍れば、それを助ける補酵素（ビタミン・ミネラル）の重要性はむしろ高まります。<strong>同じ食事でも、若い頃ほど効率よく回らなくなる</strong>——ここに分子栄養学の視点が効いてきます。
                        {'\n\n'}
                        「足りない材料を、ちょうど良い濃度で満たす」。この発想で、エネルギー産生・解毒・メチレーションといった代謝のボトルネックをひとつずつ解消していくことが、40代以降のコンディションづくりにつながります。
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                        {[
                            { href: '/mitochondria', label: 'ミトコンドリア' },
                            { href: '/methylation', label: 'メチレーション' },
                            { href: '/detox', label: '解毒' },
                        ].map((l) => (
                            <Link key={l.href} href={l.href}
                                className="px-4 py-2 rounded-full bg-white border border-[#1A1A1A] text-sm font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white transition-colors">
                                {l.label} →
                            </Link>
                        ))}
                    </div>
                </section>

                {/* 注意点 */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#41C9B4] pl-3 leading-tight">大切にしたい前提</h2>
                    <div className="bg-white/70 rounded-2xl p-6 border border-black">
                        <p className="text-sm text-[#4A4A4A] leading-relaxed">
                            分子栄養学にもとづく高用量のサプリメントなどは、自己判断で行うと過剰摂取や相互作用のリスクがあります。とくに持病のある方・服薬中の方は、必ず医師や管理栄養士に相談してください。Mitoflow40の解説は、考え方を知るための一般的な情報提供であり、特定のサプリや治療を推奨するものではありません。
                        </p>
                    </div>
                </section>

                {/* もっと深く知る */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">もっと深く知る</h2>
                    <p className="text-sm text-[#4A4A4A] leading-relaxed mb-4">
                        理論を、自分の体に当てはめて読み解いていきましょう。
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {[
                            { href: '/precision-nutrition', label: '精密栄養学とは' },
                            { href: '/nutrients', label: '栄養素' },
                            { href: '/foods', label: '食べ物' },
                            { href: '/biomarkers', label: '血液検査' },
                            { href: '/genes', label: '遺伝子' },
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
                        あなたの代謝、ちゃんと回っていますか？
                    </h2>
                    <p className="text-sm text-[#4A4A4A] leading-relaxed mb-5 max-w-[480px] mx-auto">
                        12問・約2分のセルフチェックで、あなたのミトコンドリア活性度を4つの軸から可視化します。無料・登録不要。
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
