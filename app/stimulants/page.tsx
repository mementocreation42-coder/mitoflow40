import Link from 'next/link';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: '嗜好品と体 ｜ アルコール・タバコ・カフェイン | Mitoflow40',
    description: 'お酒・タバコ・カフェインは人生の楽しみでもあり、体に負担もかける嗜好品。「やめなさい」ではなく、体への影響を正しく知って自分で選ぶ——アルコール・タバコ・カフェインとの付き合い方を、出典つきでやさしく解説します。',
    alternates: { canonical: 'https://mitoflow40.com/stimulants' },
    openGraph: {
        title: '嗜好品と体 ｜ Mitoflow40',
        description: 'アルコール・タバコ・カフェイン。体への影響を知って、自分で選ぶための視点。',
        url: 'https://mitoflow40.com/stimulants',
        type: 'article',
    },
};

export default function StimulantsPage() {
    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#CDEBE2' }}>
            <img loading="lazy" decoding="async" src="/images/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block"
                style={{ top: '0', right: '-40px', width: '260px', transform: 'scaleY(-1)' }} />
            <img loading="lazy" decoding="async" src="/images/24.png" alt="" className="absolute pointer-events-none"
                style={{ bottom: '-40px', left: '-40px', width: '260px' }} />

            <JsonLd data={medicalWebPage({ name: '嗜好品と体', description: 'アルコール・タバコ・カフェイン。体への影響を知って、自分で選ぶための視点。', path: '/stimulants' })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: '生活習慣', path: '/library#lifestyle' }, { name: '嗜好品と体', path: '/stimulants' }])} />

            <article className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '生活習慣', href: '/library#lifestyle' }, { name: '嗜好品と体' }]} />
                <header className="mb-12 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>ON YOUR HABITS</p>
                    <h1 className="text-3xl md:text-5xl font-bold mt-6 mb-8 md:mt-8 md:mb-10 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        嗜好品と体
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-loose max-w-[620px] mx-auto text-left">
                        お酒もタバコもコーヒーも、人生の楽しみであり、息抜きでもあります。このページは「やめなさい」と言うためのものではありません。ただ、<strong>体に何が起きているかを正しく知った上で、自分で選べる</strong>ように——そのための情報です。
                    </p>
                </header>

                {/* アルコール */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#FF9855] pl-3 leading-tight">アルコール</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        適量のお酒は心をほぐし、食事や人付き合いを豊かにしてくれます。一方で、近年の科学はやや厳しい見方を示しています。WHO（世界保健機関）は2023年、「<strong>健康にとって安全な飲酒量は存在しない</strong>」との見解を出しました<sup className="text-[#FF9855] font-bold">[1]</sup>。アルコールは、IARC（国際がん研究機関）が最も確かなランク（グループ1）に分類する発がん性物質でもあります。
                        {'\n\n'}
                        体の中では、アルコールの分解にビタミンB群などの栄養が消費され、<strong>睡眠の質の低下・肝臓への負担・血糖や中性脂肪の乱れ</strong>を招きます。「寝つきが良くなる」と感じても、実は夜中に目が覚めやすく、深い睡眠は減っています。
                    </p>
                    <div className="rounded-xl p-4 border border-[#1A1A1A]/15 bg-[#E3F2EE] mt-4">
                        <span className="text-[10px] font-bold tracking-widest text-[#41C9B4] block mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>飲むなら、負担を減らす</span>
                        <p className="text-sm text-[#1A1A1A]/85 leading-relaxed">休肝日をつくる／量をあらかじめ決める／水を挟む／空腹で飲まず、タンパク質や野菜と一緒に。完全にやめなくても、「減らす」だけで体の負担はやわらぎます。</p>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                        {[{ href: '/detox', label: 'デトックス（肝臓）' }, { href: '/sleep', label: '睡眠' }, { href: '/blood-sugar', label: '血糖' }].map((l) => (
                            <Link key={l.href} href={l.href} className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">{l.label}</Link>
                        ))}
                    </div>
                </section>

                {/* タバコ */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#FF9855] pl-3 leading-tight">タバコ</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        正直にお伝えすると、タバコについては「ほどほどなら大丈夫」という線引きが、ほとんどありません。喫煙は、がん・心臓病・呼吸器の病気など、数多くの健康被害とはっきり結びついており、WHOも世界の主要な死亡原因のひとつとしています<sup className="text-[#FF9855] font-bold">[2]</sup>。
                        {'\n\n'}
                        体の側から見ると、タバコの煙は大量の<strong>活性酸素</strong>を発生させ、酸化ストレスを一気に高めます。血管を傷つけ、肌の老化（糖化・酸化）を進め、ビタミンCなどの抗酸化栄養を激しく消耗させます。本人だけでなく、<strong>受動喫煙</strong>として周囲の人にも影響します。
                        {'\n\n'}
                        とはいえ、依存性が強く、「やめたいのにやめられない」のは意志の弱さではありません。やめたいと思ったら、<strong>禁煙外来</strong>など専門家のサポートを利用すると、ぐっと成功しやすくなります。一人で抱えなくて大丈夫です。
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {[{ href: '/oxidative-stress', label: '酸化ストレス' }, { href: '/glycation', label: '糖化' }].map((l) => (
                            <Link key={l.href} href={l.href} className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">{l.label}</Link>
                        ))}
                    </div>
                </section>

                {/* カフェイン */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#FF9855] pl-3 leading-tight">カフェイン</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        コーヒーや緑茶のカフェインは、適量なら集中力や気分を後押しし、抗酸化成分も含むなど、必ずしも悪者ではありません。問題になるのは<strong>量とタイミング</strong>です。
                        {'\n\n'}
                        摂りすぎると、<strong>不安・動悸・睡眠の質の低下</strong>を招きます。とくにカフェインは体に長く残るため、午後遅く〜夜の摂取は、自覚がなくても夜の睡眠を浅くします。「夕方のコーヒー」が、翌朝のだるさの原因になっていることも。
                    </p>
                    <div className="rounded-xl p-4 border border-[#1A1A1A]/15 bg-[#E3F2EE] mt-4">
                        <span className="text-[10px] font-bold tracking-widest text-[#41C9B4] block mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>付き合い方</span>
                        <p className="text-sm text-[#1A1A1A]/85 leading-relaxed">午後（おおむね14時以降）は控えめに／エナジードリンクの常用を避ける／不安や不眠が気になる人は、まずカフェインを見直してみる。</p>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                        {[{ href: '/sleep', label: '睡眠' }, { href: '/anxiety', label: '不安と体' }].map((l) => (
                            <Link key={l.href} href={l.href} className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">{l.label}</Link>
                        ))}
                    </div>
                </section>

                {/* 着地 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">ゼロか100か、ではなく</h2>
                    <p className="text-[#4A4A4A] leading-loose">
                        嗜好品は、心の満足という大切な役割も担っています。すべてを断つことが、必ずしも幸せとは限りません。大切なのは、<strong>体に何が起きているかを知った上で、自分にとってのちょうどいい付き合い方を選ぶ</strong>こと。知らずに流されるのと、知って選ぶのとでは、同じ一杯でも意味が変わります。タバコのように「減らす・やめる」がはっきり体のためになるものは、無理なく一歩ずつ。それで十分です。
                    </p>
                </section>

                {/* 免責 */}
                <p className="text-xs text-[#4A4A4A]/70 leading-relaxed mb-8 p-4 bg-white/60 rounded-lg border border-[#1A1A1A]/10">
                    ※ 本記事は一般的な健康情報です。お酒・タバコの依存でお悩みの方、やめたい方は、医療機関や禁煙外来、公的な相談窓口にご相談ください。持病・服薬中の方は、嗜好品との付き合い方について主治医にご確認ください。
                </p>

                {/* 参照 */}
                <section className="mb-10">
                    <h2 className="text-lg font-bold text-[#1A1A1A] mb-3 border-l-4 border-[#41C9B4] pl-3 leading-tight">このページの参照</h2>
                    <ul className="bg-white/70 rounded-2xl p-5 md:p-6 border border-black space-y-2 text-sm">
                        <li>
                            <span className="text-[#FF9855] font-bold mr-1">[1]</span>
                            <a href="https://www.who.int/europe/news/item/04-01-2023-no-level-of-alcohol-consumption-is-safe-for-our-health" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                No level of alcohol consumption is safe for our health（2023）
                            </a>
                            <span className="text-[#1A1A1A]/50"> — WHO（世界保健機関）</span>
                        </li>
                        <li>
                            <span className="text-[#FF9855] font-bold mr-1">[2]</span>
                            <a href="https://www.who.int/news-room/fact-sheets/detail/tobacco" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                Tobacco — Fact sheet
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

                <div className="text-center">
                    <Link href="/library" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">← Library に戻る</Link>
                </div>
            </article>
        </div>
    );
}
