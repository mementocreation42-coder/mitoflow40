import Link from 'next/link';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: 'なぜ、未病予防か ｜ Mitoflow40がめざすこと',
    description: '超高齢社会、医療費の増大、健康寿命と平均寿命のギャップ——その解決の一助になりうるのが「未病予防」です。一人ひとりが病気の手前で整えることの社会的意義と、Mitoflow40の役割を考えます。',
    alternates: { canonical: 'https://mitoflow40.com/mission' },
    openGraph: {
        title: 'なぜ、未病予防か ｜ Mitoflow40がめざすこと',
        description: '超高齢社会・医療費・健康寿命のギャップ。その一助になりうる「未病予防」の社会的意義とMitoflow40の役割。',
        url: 'https://mitoflow40.com/mission',
        type: 'article',
    },
};

export default function MissionPage() {
    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#CDEBE2' }}>
            <img loading="lazy" decoding="async" src="/images/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block"
                style={{ top: '0', right: '-40px', width: '260px', transform: 'scaleY(-1)' }} />
            <img loading="lazy" decoding="async" src="/images/24.png" alt="" className="absolute pointer-events-none"
                style={{ bottom: '-40px', left: '-40px', width: '260px' }} />

            <JsonLd data={medicalWebPage({ name: 'なぜ、未病予防か', description: '超高齢社会・医療費・健康寿命のギャップの一助になりうる「未病予防」の社会的意義とMitoflow40の役割。', path: '/mission' })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: 'なぜ、未病予防か', path: '/mission' }])} />

            <article className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: 'なぜ、未病予防か' }]} />
                <header className="mb-12 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>
                        OUR MISSION
                    </p>
                    <h1 className="text-3xl md:text-5xl font-bold mt-6 mb-8 md:mt-8 md:mb-10 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        なぜ、未病予防か
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-loose max-w-[620px] mx-auto text-left">
                        Mitoflow40が「未病予防」を掲げるのは、それが一人の体調だけでなく、これからの社会にとっても大切なテーマだと考えるからです。少し大きな視点から、その理由をお話しします。
                    </p>
                </header>

                {/* 背景 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#FF9855] pl-3 leading-tight">いま、社会で起きていること</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        日本は、世界でも有数の<strong>超高齢社会</strong>を迎えています。65歳以上が総人口に占める割合（高齢化率）は<strong>29.3％</strong>に達し、およそ3人に1人が高齢者です<sup className="text-[#FF9855] font-bold">[1]</sup>。長生きできること自体は、医療の進歩がもたらした大きな恵みです。一方で、社会保障や医療費の負担は増え続けています。国民医療費は<strong>年間46兆円</strong>を超え、過去最高を更新し続けています<sup className="text-[#FF9855] font-bold">[2]</sup>。
                        {'\n\n'}
                        さらに見過ごせないのが、<strong>平均寿命と健康寿命のギャップ</strong>です。日常生活に制限なく過ごせる「健康寿命」と「平均寿命」の差は、<strong>男性で約8.5年、女性で約11.6年</strong>あります<sup className="text-[#FF9855] font-bold">[3]</sup>。これは、人生の最後の約10年前後を、なんらかの不調や介護とともに過ごす人が多いことを意味します。長さだけでなく、その<strong>中身（元気でいられる年数）</strong>が問われる時代になっています。
                    </p>
                </section>

                {/* 自助・備え */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#FF9855] pl-3 leading-tight">「自分の健康は、自分で育てる」という備え</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        社会保険料や年金をめぐる環境も、年々きびしさを増しています。負担は上がる一方で、「将来、同じだけの支えを受けられるのだろうか」と不安を感じる人も少なくありません。
                        {'\n\n'}
                        これは、制度や国を責める話ではありません。ただ、これからの時代は、<strong>すべてを制度に委ねるのではなく、自分でできる備えを持っておく</strong>という姿勢が、いっそう大切になっていくのは確かです。
                        {'\n\n'}
                        そして数ある備えの中でも、<strong>健康はもっとも基本的な「資産」</strong>です。元気に動ける体があれば、医療や介護のお世話になる時期を遠ざけられ、働き方や暮らし方の選択肢も広がります。お金の備えと同じように、<strong>健康も「育てておく」もの</strong>——未病予防は、その一番の自助だと考えています。
                    </p>
                </section>

                {/* 課題 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#FF9855] pl-3 leading-tight">医療だけでは、埋めきれない領域</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        日本の医療は世界トップクラスで、病気の診断・治療はとても頼りになります。けれどその仕組みは、基本的に「<strong>病気を見つけて治す</strong>」ことを中心に組み立てられています。限られた時間の中では、まだ病気ではない「未病」や、一人ひとりの予防・栄養最適化までは、どうしても手が回りにくいのが実情です。
                        {'\n\n'}
                        つまり、「病気になる前の領域」には、まだ大きな余白が残されています。ここにアプローチできれば、つらい不調や重症化を減らし、結果として<strong>医療への負担をやわらげる一助になりうる</strong>——そう考えています。
                    </p>
                    <div className="mt-5">
                        <Link href="/health-philosophy"
                            className="inline-flex items-center gap-1 text-sm font-bold text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                            「健康とは」も読む →
                        </Link>
                    </div>
                </section>

                {/* 可能性 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#FF9855] pl-3 leading-tight">「未病予防」が持つ可能性</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        もし、一人ひとりが自分の体を知り、<strong>病気の手前（未病）のうちに整える</strong>習慣を持てたら——。小さな不調を早めにケアし、生活習慣病の芽を遠ざけられれば、元気でいられる年数（健康寿命）はもっと延ばせるかもしれません。
                        {'\n\n'}
                        それは個人にとっては「<strong>長く、自分らしく動ける人生</strong>」につながり、社会にとっては「<strong>医療費の増大という課題をやわらげる一助</strong>」になりうる。一人の小さな「整える」が積み重なることには、それだけの可能性があると、私たちは信じています。
                        {'\n\n'}
                        もちろん、未病予防は医療を置き換えるものではありません。病気の治療は医療の役割。未病予防は、その負担を増やさないための、<strong>もう一つの入口</strong>です。両輪がそろってはじめて、これからの健康は支えられます。
                    </p>
                </section>

                {/* だからMitoflow40 */}
                <section className="mb-10 rounded-2xl p-6 md:p-8 border border-black" style={{ background: '#1A1A1A' }}>
                    <h2 className="text-lg font-bold text-white mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>だから、Mitoflow40</h2>
                    <p className="text-white/90 leading-loose whitespace-pre-line">
                        未病予防の第一歩は、自分の体を「知る」ことから。けれど、精密栄養学や体のしくみの知識は、まだ専門的で、一般には届きにくいのが現状です。
                        {'\n\n'}
                        Mitoflow40は、その知識をかみ砕いて、誰もが自分の体を読み解けるように届けます。一人でも多くの人が、未病のうちに整える視点を持つこと——それが、個人の活力と、これからの社会の健康を支える、小さくて確かな一歩になると信じています。
                        {'\n\n'}
                        精密栄養学も、未病予防も、まだ広く知られているとは言えません。けれどこれは、<strong>これからの時代に必要とされる、新しい取り組み</strong>だと考えています。完成された正解を配るのではなく、最新の知見を取り入れながら、皆さんと一緒に育てていく——Mitoflow40は、その<strong>未来に向けた実験的な一歩</strong>でありたいと思っています。
                    </p>
                </section>

                {/* 参照（出典） */}
                <section className="mb-8">
                    <h2 className="text-lg font-bold text-[#1A1A1A] mb-3 border-l-4 border-[#41C9B4] pl-3 leading-tight">数字の出典</h2>
                    <ol className="bg-white/70 rounded-2xl p-5 md:p-6 border border-black space-y-2 text-sm list-none">
                        <li>
                            <span className="text-[#FF9855] font-bold mr-1">[1]</span>
                            <a href="https://www8.cao.go.jp/kourei/whitepaper/w-2025/html/zenbun/s1_1_1.html" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                令和7年版 高齢社会白書（高齢化率29.3％・令和6年10月1日現在）
                            </a>
                            <span className="text-[#1A1A1A]/50"> — 内閣府</span>
                        </li>
                        <li>
                            <span className="text-[#FF9855] font-bold mr-1">[2]</span>
                            <a href="https://www.mhlw.go.jp/toukei/saikin/hw/k-iryohi/22/index.html" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                令和4（2022）年度 国民医療費の概況（46兆6,967億円・過去最高）
                            </a>
                            <span className="text-[#1A1A1A]/50"> — 厚生労働省</span>
                        </li>
                        <li>
                            <span className="text-[#FF9855] font-bold mr-1">[3]</span>
                            <a href="https://kennet.mhlw.go.jp/information/information/hale/h-01-002.html" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                平均寿命と健康寿命（差：男性8.49年・女性11.63年／令和4年）
                            </a>
                            <span className="text-[#1A1A1A]/50"> — 厚生労働省 e-ヘルスネット</span>
                        </li>
                    </ol>
                </section>

                {/* 注意 */}
                <p className="text-xs text-[#4A4A4A]/70 leading-relaxed mb-10 p-4 bg-white/60 rounded-lg border border-[#1A1A1A]/10">
                    ※ 本ページは、未病予防の社会的な意義についての考え方（ビジョン）を述べたものです。医療費や健康寿命への効果を保証するものではなく、特定の治療・予防の効果を断定するものでもありません。気になる症状や治療の判断は、必ず医療専門家にご相談ください。
                </p>

                {/* 導線 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">はじめの一歩</h2>
                    <p className="text-sm text-[#4A4A4A] leading-relaxed mb-4">
                        未病予防は、難しいことではありません。まず「自分の現在地」を知ることから。
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {[
                            { href: '/check', label: 'セルフチェック' },
                            { href: '/health-philosophy', label: '健康とは' },
                            { href: '/precision-nutrition', label: '精密栄養学とは' },
                            { href: '/library', label: 'Library 全体' },
                        ].map((l) => (
                            <Link key={l.href} href={l.href}
                                className="px-4 py-2 rounded-full bg-white border border-[#1A1A1A] text-sm font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white transition-colors">
                                {l.label} →
                            </Link>
                        ))}
                    </div>
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
