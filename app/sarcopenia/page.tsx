import Link from 'next/link';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: 'サルコペニア・フレイルとは｜40代から始まる筋肉の減少 | Mitoflow40',
    description: 'サルコペニアとは、加齢にともなう筋肉量・筋力の減少。じつは40代からじわじわ始まります。なぜ減るのか、放っておくと何が起きるか（代謝低下・血糖の悪化・転倒・フレイル）、そして運動とたんぱく質でどう防ぐかを、生化学ベースで出典つきに解説します。',
    alternates: { canonical: 'https://mitoflow40.com/sarcopenia' },
    openGraph: {
        title: 'サルコペニア・フレイルとは｜40代から始まる筋肉の減少 | Mitoflow40',
        description: '加齢で筋肉が減るサルコペニア。40代から始まる理由、代謝・血糖への影響、運動とたんぱく質での防ぎ方を解説。',
        url: 'https://mitoflow40.com/sarcopenia',
        type: 'article',
    },
};

const why = [
    { head: '使わない（不活動）', body: '筋肉は「使わなければ減る」。座りっぱなしの生活や運動不足が、減少を加速させる最大の要因。' },
    { head: 'たんぱく質・栄養の不足', body: '筋肉の材料はたんぱく質。食が細くなったり偏ったりすると、作り直しが追いつかなくなる。' },
    { head: '加齢による作りにくさ', body: '同じ量を食べても、年齢とともに筋肉を作る反応が鈍くなる（同化抵抗性）。だから意識的な補いが要る。' },
    { head: '慢性炎症・ホルモン変化', body: 'くすぶる炎症や、性ホルモン・成長ホルモンの低下も、筋肉の分解に傾ける。' },
];

export default function SarcopeniaPage() {
    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#E7EEDA' }}>
            <img loading="lazy" decoding="async" src="/images/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block"
                style={{ top: '0', right: '-40px', width: '260px', transform: 'scaleY(-1)' }} />
            <img loading="lazy" decoding="async" src="/images/24.png" alt="" className="absolute pointer-events-none"
                style={{ bottom: '-40px', left: '-40px', width: '260px' }} />

            <JsonLd data={medicalWebPage({ name: 'サルコペニア・フレイルとは', description: '加齢で筋肉が減るサルコペニア。40代から始まる理由、代謝・血糖への影響、運動とたんぱく質での防ぎ方を解説。', path: '/sarcopenia' })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: '老化と不調の土台', path: '/library#aging' }, { name: 'サルコペニア・フレイル', path: '/sarcopenia' }])} />

            <article className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '老化と不調の土台', href: '/library#aging' }, { name: 'サルコペニア・フレイル' }]} />
                <header className="mb-12 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>SARCOPENIA / FRAILTY</p>
                    <h1 className="text-3xl md:text-5xl font-bold mt-6 mb-8 md:mt-8 md:mb-10 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        サルコペニア・フレイル
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-loose max-w-[640px] mx-auto text-left">
                        筋肉の減少は「高齢者の話」と思われがちですが、じつは<strong>40代からじわじわ始まっています</strong>。筋肉は動くためだけでなく、<strong>代謝・血糖・体温・若々しさ</strong>を支える臓器。ここを守ることは、40代以降の健康投資のなかでも、いちばん効率のいいものの一つです。
                    </p>
                </header>

                {/* とは */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#FF9855] pl-3 leading-tight">サルコペニアとフレイル</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        <strong>サルコペニア</strong>とは、加齢にともなって<strong>筋肉量と筋力が減っていく状態</strong>のこと。筋肉は何もしなければ、<strong>30代以降、年に約1%ずつ</strong>減っていくとされ、40代はその下り坂が実感としてあらわれ始める時期です。
                        {'\n\n'}
                        <strong>フレイル</strong>は、筋力低下に加えて、疲れやすさ・活動量や体重の低下などが重なり、<strong>心身が弱って要介護の手前にある状態</strong>。サルコペニアはフレイルの中心的な原因です。どちらも「年だから仕方ない」ではなく、<strong>対策で進行を遅らせ、改善も期待できる</strong>のが重要なポイントです。
                    </p>
                </section>

                {/* なぜ減る */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#FF9855] pl-3 leading-tight">なぜ、筋肉は減るのか</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">原因が重なるほど、減少は加速します。逆に言えば、打ち手も複数あるということ。</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {why.map((w) => (
                            <div key={w.head} className="bg-white/70 rounded-2xl p-5 border border-black">
                                <h3 className="text-base font-bold text-[#1A1A1A] mb-1">{w.head}</h3>
                                <p className="text-sm text-[#4A4A4A] leading-relaxed">{w.body}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* なぜ怖い */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#FF9855] pl-3 leading-tight">筋肉が減ると、代謝も血糖も崩れる</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        筋肉は、ただ体を動かす器官ではありません。<strong>食べた糖のいちばん大きな受け皿</strong>でもあります。筋肉が減ると、行き場を失った糖が血液にあふれやすくなり、<strong>血糖の悪化やインスリン抵抗性</strong>につながります。サルコペニアと糖尿病が悪循環をつくるのはこのためです。
                        {'\n\n'}
                        さらに筋肉は基礎代謝の大きな部分を担うため、減ると<strong>太りやすく・冷えやすく</strong>なります。そして転倒・骨折のリスクが上がり、それが<strong>フレイル→要介護</strong>への入口に。<strong>「動ける体」を保つことが、将来の自立と健康寿命を左右します。</strong>
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                        <Link href="/blood-sugar" className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">血糖コントロール</Link>
                        <Link href="/food-journey" className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">利用の段階（食べてから動くまで）</Link>
                    </div>
                </section>

                {/* 防ぐ */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#41C9B4] pl-3 leading-tight">守る・取り戻す3本柱</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">筋肉は、何歳からでも反応します。「運動」と「材料」と「土台」をそろえるのがコツです。</p>
                    <div className="space-y-3">
                        {[
                            { head: '① 筋肉に負荷をかける（レジスタンス運動）', body: 'スクワットや自重トレなど、筋肉に抵抗をかける運動が最も効く。週2回程度でも、減少を止め・増やす方向に働く。' },
                            { head: '② たんぱく質を十分に', body: '材料が足りないと作れない。毎食にたんぱく質を分けてとるのが効率的。年齢とともに、やや多めの意識を。' },
                            { head: '③ ビタミンD・土台の栄養', body: 'ビタミンDは筋肉の働きにも関わる。日光・きのこ・魚などで補い、全体の栄養と睡眠で回復を支える。' },
                        ].map((s) => (
                            <div key={s.head} className="bg-white/70 rounded-xl p-4 border border-[#1A1A1A]/15">
                                <div className="font-bold text-[#1A1A1A] mb-0.5">{s.head}</div>
                                <p className="text-sm text-[#4A4A4A] leading-snug">{s.body}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-5 flex flex-wrap gap-2">
                        <Link href="/exercise" className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">運動</Link>
                        <Link href="/nutrients" className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">栄養素（たんぱく質・ビタミンD）</Link>
                        <Link href="/nutrient-density" className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">きのことビタミンD</Link>
                    </div>
                </section>

                {/* 免責 */}
                <p className="text-xs text-[#4A4A4A]/70 leading-relaxed mb-8 p-4 bg-white/60 rounded-lg border border-[#1A1A1A]/10">
                    ※ 本記事は一般的な健康情報であり、診断・治療を目的とするものではありません。持病がある方の運動・食事の変更や、急な体重・筋力の低下が気になる場合は、医療機関にご相談ください。
                </p>

                {/* 参照 */}
                <section className="mb-10">
                    <h2 className="text-lg font-bold text-[#1A1A1A] mb-3 border-l-4 border-[#41C9B4] pl-3 leading-tight">このページの参照</h2>
                    <ul className="bg-white/70 rounded-2xl p-5 md:p-6 border border-black space-y-3 text-sm">
                        <li>
                            <a href="https://www.who.int/news-room/fact-sheets/detail/ageing-and-health" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                Ageing and health（加齢にともなう機能低下とフレイル）
                            </a>
                            <span className="text-[#1A1A1A]/50"> — WHO（世界保健機関）</span>
                        </li>
                        <li>
                            <a href="https://pubmed.ncbi.nlm.nih.gov/30312372/" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                Sarcopenia: revised European consensus on definition and diagnosis（サルコペニアの定義と診断）
                            </a>
                            <span className="text-[#1A1A1A]/50"> — Cruz-Jentoft AJ ら, Age and Ageing (EWGSOP2), 2019</span>
                        </li>
                    </ul>
                    <p className="text-xs text-[#4A4A4A]/70 mt-2">
                        全テーマの出典は{' '}
                        <Link href="/references" className="underline decoration-[#41C9B4] decoration-2 underline-offset-2 font-bold hover:text-[#41C9B4]">参照文献・出典ページ</Link>
                        {' '}にまとめています。
                    </p>
                </section>

                <div className="text-center flex flex-wrap justify-center gap-3">
                    <Link href="/exercise" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">運動を見る</Link>
                    <Link href="/library" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">← Library に戻る</Link>
                </div>
            </article>
        </div>
    );
}
