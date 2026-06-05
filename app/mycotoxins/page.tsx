import Link from 'next/link';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: 'カビ毒（マイコトキシン）と食の安全 | Mitoflow40',
    description: 'カビ毒（マイコトキシン）とは、カビが作る有害物質。アフラトキシンやオクラトキシンAなどの種類、加熱で分解されにくい性質、家庭でできる減らし方を、神経質になりすぎず、出典つきでやさしく解説します。',
    alternates: { canonical: 'https://mitoflow40.com/mycotoxins' },
    openGraph: {
        title: 'カビ毒（マイコトキシン）と食の安全 | Mitoflow40',
        description: 'カビが作る有害物質「カビ毒」。種類・性質・家庭での減らし方を、煽らずやさしく解説。',
        url: 'https://mitoflow40.com/mycotoxins',
        type: 'article',
    },
};

const kinds = [
    { name: 'アフラトキシン', en: 'AFLATOXIN', found: 'ピーナッツ・ナッツ類・トウモロコシ・穀物・香辛料など', note: 'カビ毒の中でもとくに有害。IARC（国際がん研究機関）が最も確かなランク（グループ1）に分類する発がん性物質で、主に肝臓に負担をかけます。高温多湿で増えやすい。' },
    { name: 'オクラトキシンA', en: 'OCHRATOXIN A', found: 'コーヒー・穀物・ドライフルーツ・ワインなど', note: '主に腎臓に影響するとされるカビ毒。保存中に増えやすく、コーヒー豆や乾物で注意される。' },
    { name: 'その他', en: 'OTHERS', found: 'りんご加工品（パツリン）・麦（デオキシニバレノール）など', note: '穀物や果物の加工品にも、それぞれ特有のカビ毒が知られています。種類は数百にのぼります。' },
];

export default function MycotoxinsPage() {
    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#CDEBE2' }}>
            <img loading="lazy" decoding="async" src="/images/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block"
                style={{ top: '0', right: '-40px', width: '260px', transform: 'scaleY(-1)' }} />
            <img loading="lazy" decoding="async" src="/images/24.png" alt="" className="absolute pointer-events-none"
                style={{ bottom: '-40px', left: '-40px', width: '260px' }} />

            <JsonLd data={medicalWebPage({ name: 'カビ毒（マイコトキシン）と食の安全', description: 'カビが作る有害物質「カビ毒」。種類・性質・家庭での減らし方を、煽らずやさしく解説。', path: '/mycotoxins' })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: '身体の仕組み', path: '/library#mechanism' }, { name: 'カビ毒と食の安全', path: '/mycotoxins' }])} />

            <article className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '身体の仕組み', href: '/library#mechanism' }, { name: 'カビ毒と食の安全' }]} />
                <header className="mb-12 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>FOOD SAFETY</p>
                    <h1 className="text-3xl md:text-5xl font-bold mt-6 mb-8 md:mt-8 md:mb-10 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        カビ毒と食の安全
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-loose max-w-[620px] mx-auto text-left">
                        目に見えるカビは取り除けても、カビが作り出した「<strong>毒</strong>」は食品の中に残っていることがあります。神経質になりすぎず、でも知っておきたい——カビ毒（マイコトキシン）の基本と、家庭でできる対策をまとめます。
                    </p>
                </header>

                {/* とは */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#FF9855] pl-3 leading-tight">カビ毒（マイコトキシン）とは</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        カビ毒とは、その名のとおり<strong>カビ（真菌）が作り出す有害な物質</strong>のことです。穀物・ナッツ・コーヒー・乾物などが、栽培中や保存中にカビに侵されると、こうした毒が作られることがあります。
                        {'\n\n'}
                        やっかいなのは、<strong>毒そのものは目に見えない</strong>こと。そして<strong>ふつうの加熱調理では分解されにくい</strong>ことです。「カビた部分だけ取り除けば大丈夫」と思いがちですが、毒は見えない範囲まで広がっていることがあり、加熱しても残ります。
                    </p>
                </section>

                {/* 主な種類 */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#FF9855] pl-3 leading-tight">主なカビ毒</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">代表的なものを知っておくと、どんな食品の保存に気をつければいいかが見えてきます。</p>
                    <div className="space-y-3">
                        {kinds.map((k) => (
                            <div key={k.en} className="bg-white/70 rounded-2xl p-5 md:p-6 border border-black">
                                <div className="text-[10px] font-bold tracking-widest text-[#FF9855] mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{k.en}</div>
                                <h3 className="text-lg font-bold text-[#1A1A1A] mb-1">{k.name}</h3>
                                <div className="text-xs font-bold text-[#41C9B4] mb-2">多い食品：{k.found}</div>
                                <p className="text-sm text-[#4A4A4A] leading-relaxed">{k.note}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 体への影響 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#FF9855] pl-3 leading-tight">体への影響</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        大量にとれば急性の中毒（とくに肝臓の障害）を起こすことがありますが、日常で問題になりやすいのは、むしろ<strong>ごく微量を長期間とり続ける</strong>こと。アフラトキシンは肝臓に、オクラトキシンAは腎臓に負担をかけるとされ、長期的な健康リスクが指摘されています。
                        {'\n\n'}
                        とはいえ、過度に怖がる必要はありません。日本をはじめ各国には<strong>食品中のカビ毒の基準値</strong>があり、流通する食品は検査・管理されています。リスクの多くは、むしろ<strong>家庭での保存</strong>や、傷んだものを「もったいない」と食べてしまうところにあります。
                    </p>
                </section>

                {/* 減らし方 */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#41C9B4] pl-3 leading-tight">家庭でできる、減らし方</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">特別なことは不要。「湿気を避けて、新しいうちに、迷ったら捨てる」が基本です。</p>
                    <div className="space-y-3">
                        {[
                            { head: '湿気を避けて保存する', body: 'カビは高温多湿で増える。ナッツ・穀物・粉類・乾物は密閉し、開封後は冷蔵・冷凍も活用。シンク下など湿気の多い場所は避ける。' },
                            { head: '新しいうちに使い切る', body: '買いだめしすぎず、ナッツやコーヒー、粉類は早めに消費。古くなったものほどリスクが上がる。' },
                            { head: 'カビたら、惜しまず捨てる', body: '一部にカビが見えたら、その食品は基本的に処分を。「カビた部分だけ取る」では毒が残ることがある（かたいチーズの一部など例外もあるが、迷ったら捨てる）。' },
                            { head: '信頼できる品質のものを選ぶ', body: 'ナッツやドライフルーツ、コーヒーなどは、保管状態のよい新鮮なものを。安すぎる・古そうなものは避ける。' },
                        ].map((s) => (
                            <div key={s.head} className="bg-white/70 rounded-xl p-4 border border-[#1A1A1A]/15">
                                <div className="font-bold text-[#1A1A1A] mb-0.5">{s.head}</div>
                                <p className="text-sm text-[#4A4A4A] leading-snug">{s.body}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 連携 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">「入れない」と「出す」で考える</h2>
                    <p className="text-[#4A4A4A] leading-loose">
                        カビ毒も、ほかの有害物質と同じく、<strong>入れる量を減らし（保存と選び方）、入ってきたものを処理して出す（肝臓・腎臓の解毒）</strong>という両輪で捉えるのが現実的です。完璧を目指すより、日々の小さな習慣で負担を減らしていきましょう。
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                        <Link href="/reduce-toxins" className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">有害物質を減らす暮らし</Link>
                        <Link href="/detox" className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">デトックス</Link>
                        <Link href="/foods/almond" className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">ナッツ</Link>
                    </div>
                </section>

                {/* 免責 */}
                <p className="text-xs text-[#4A4A4A]/70 leading-relaxed mb-8 p-4 bg-white/60 rounded-lg border border-[#1A1A1A]/10">
                    ※ 本記事は一般的な食品衛生の情報であり、特定の食品の危険性を煽ったり、診断・治療を目的とするものではありません。体調不良が続く場合や食中毒が疑われる場合は、医療機関にご相談ください。
                </p>

                {/* 参照 */}
                <section className="mb-10">
                    <h2 className="text-lg font-bold text-[#1A1A1A] mb-3 border-l-4 border-[#41C9B4] pl-3 leading-tight">このページの参照</h2>
                    <ul className="bg-white/70 rounded-2xl p-5 md:p-6 border border-black space-y-2 text-sm">
                        <li>
                            <a href="https://www.who.int/news-room/fact-sheets/detail/mycotoxins" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                Mycotoxins — Fact sheet（カビ毒の種類と健康影響）
                            </a>
                            <span className="text-[#1A1A1A]/50"> — WHO（世界保健機関）</span>
                        </li>
                    </ul>
                    <p className="text-xs text-[#4A4A4A]/70 mt-2">
                        全テーマの出典は{' '}
                        <Link href="/references" className="underline decoration-[#41C9B4] decoration-2 underline-offset-2 font-bold hover:text-[#41C9B4]">参照文献・出典ページ</Link>
                        {' '}にまとめています。
                    </p>
                </section>

                <div className="text-center flex flex-wrap justify-center gap-3">
                    <Link href="/reduce-toxins" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">有害物質を減らす暮らしへ</Link>
                    <Link href="/library" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">← Library に戻る</Link>
                </div>
            </article>
        </div>
    );
}
