import Link from 'next/link';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: '匂いと健康 ｜ 記憶・感情・脳とのつながりと、アロマの見極め | Mitoflow40',
    description: '嗅覚は、視床を介さず感情と記憶の脳に直接つながる特別な感覚。匂いが気分や自律神経に作用する仕組み、嗅覚の低下が認知症やパーキンソン病の早期サインになりうること、嗅覚トレーニング、そしてアロマテラピーの「実証されていること／未確立のこと」を中立に整理します。',
    alternates: { canonical: 'https://mitoflow40.com/smell' },
    openGraph: {
        title: '匂いと健康 | Mitoflow40',
        description: '匂いが気分・記憶・脳に届く仕組みと、アロマの効果を根拠の確かさで分けて中立に整理。',
        url: 'https://mitoflow40.com/smell',
        type: 'article',
    },
};

const facts = [
    { en: 'DIRECT LINE', title: '感情と記憶に直結', note: '嗅覚は唯一、視床を経由せず大脳辺縁系（扁桃体・海馬）へ直接届く。匂いが理屈より先に感情と記憶を呼び起こす理由。' },
    { en: 'PROUST', title: 'プルースト効果', note: 'ある匂いで、忘れていた昔の記憶や感情がふいに鮮やかによみがえる現象。香りと記憶の強い結びつき。' },
    { en: '1 TRILLION', title: '嗅ぎ分けは桁違い', note: 'ヒトは理論上、約1兆種もの匂いを区別できる可能性があるとの研究も。「人間の嗅覚は鈍い」は近年見直されている。' },
    { en: 'GENES', title: '感じ方は人それぞれ', note: '嗅覚受容体の遺伝子は約400種。パクチーが石鹸臭く感じる等、匂いの感じ方には大きな個人差がある。' },
];

const evidence = [
    { head: '嗅覚低下は、脳からのサインのことも', body: '嗅覚の衰えは、アルツハイマー型認知症やパーキンソン病の「早期サイン」になりうると複数の研究が示す。加齢でも落ちるが、急な変化は要注意。' },
    { head: '感染・神経の手がかり', body: 'COVID-19で広く知られたとおり、匂いの異常は感染症や神経の状態を映す重要なサイン。風邪以外で続く異常は受診の目安。' },
    { head: '香りの気分・覚醒への作用', body: 'ラベンダーでリラックス傾向、ペパーミントで覚醒・注意力アップなど、香りが自律神経や気分に働く例は一部実証されている。' },
    { head: '嗅覚トレーニング', body: '複数の香りを毎日かいで嗅覚を鍛える「嗅覚リハビリ」は、嗅覚障害の回復法としてエビデンスがある数少ない手段。' },
];

export default function SmellPage() {
    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#F0E6DA' }}>
            <img loading="lazy" decoding="async" src="/images/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block"
                style={{ top: '0', right: '-40px', width: '260px', transform: 'scaleY(-1)' }} />
            <img loading="lazy" decoding="async" src="/images/24.png" alt="" className="absolute pointer-events-none"
                style={{ bottom: '-40px', left: '-40px', width: '260px' }} />

            <JsonLd data={medicalWebPage({ name: '匂いと健康', description: '匂いが気分・記憶・脳に届く仕組みと、アロマの効果を根拠の確かさで分けて中立に整理。', path: '/smell' })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: '心とからだ', path: '/library#mind' }, { name: '匂いと健康', path: '/smell' }])} />

            <article className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '心とからだ', href: '/library#mind' }, { name: '匂いと健康' }]} />
                <header className="mb-12 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>SMELL</p>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        SMELL
                        <span className="block text-base md:text-lg mt-2 text-[#1A1A1A]/70" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>匂いと健康</span>
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-relaxed max-w-[560px] mx-auto">
                        ふとした香りで、昔の記憶がよみがえる——嗅覚は、<strong>感情と記憶の脳に直接つながる</strong>特別な感覚です。匂いには、気分や健康と結びついた確かな事実があります。
                    </p>
                </header>

                {/* 仕組み */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#FF9855] pl-3 leading-tight">匂いは「感情の脳」に直結している</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        ほかの感覚（視覚・聴覚など）は、いったん脳の中継地点「<strong>視床</strong>」を通ってから処理されます。ところが<strong>嗅覚だけは視床を経由せず、感情をつかさどる扁桃体や、記憶をつかさどる海馬へ“直接”届きます</strong>。
                        {'\n\n'}
                        だから匂いは、言葉や理屈より先に、<strong>感情と記憶をいきなり呼び起こす</strong>のです。ある香りで懐かしい場面がふいによみがえる「プルースト効果」も、この近道がつくり出しています。匂いが気分や自律神経に効くのは、気のせいではなく、脳のつくりそのものに理由があります。
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {[{ href: '/autonomic-nervous-system', label: '自律神経' }, { href: '/stress', label: 'ストレス' }, { href: '/mood-nutrition', label: '気分と栄養' }].map((l) => (
                            <Link key={l.href} href={l.href} className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">{l.label}</Link>
                        ))}
                    </div>
                </section>

                {/* おもしろい事実 */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#FF9855] pl-3 leading-tight">匂いをめぐる、4つの事実</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">嗅覚は、思っているよりずっと高性能で、そして人それぞれです。</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {facts.map((f) => (
                            <div key={f.en} className="bg-white/70 rounded-2xl p-5 border border-black">
                                <span className="text-[10px] font-bold tracking-widest text-[#41C9B4] block mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{f.en}</span>
                                <div className="font-bold text-[#1A1A1A] mb-1">{f.title}</div>
                                <p className="text-xs text-[#4A4A4A] leading-relaxed">{f.note}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 実証されていること */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <div className="inline-block text-[10px] font-bold tracking-widest text-white bg-[#41C9B4] rounded-full px-3 py-1 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>EVIDENCE ／ 比較的確かなこと</div>
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 leading-tight">匂いは、健康の「サイン」でもある</h2>
                    <div className="space-y-3">
                        {evidence.map((s) => (
                            <div key={s.head} className="flex items-start gap-4 bg-white/70 rounded-xl p-4 border border-[#1A1A1A]/15">
                                <div>
                                    <div className="font-bold text-[#1A1A1A] mb-0.5">{s.head}</div>
                                    <p className="text-sm text-[#4A4A4A] leading-snug">{s.body}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-[#4A4A4A]/60 mt-4 leading-relaxed">※ 嗅覚の急な低下や、続く異常（においが分からない・変なにおいがする）は、自己判断せず医療機関へ。早期発見の手がかりになります。</p>
                </section>

                {/* アロマ・中立 */}
                <section className="mb-10 rounded-2xl p-6 md:p-8 border border-black" style={{ background: '#F3EFD6' }}>
                    <div className="inline-block text-[10px] font-bold tracking-widest text-[#1A1A1A] bg-[#FFD37A] rounded-full px-3 py-1 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>NEUTRAL ／ 線引きが大切</div>
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 leading-tight">アロマテラピーの、どこまでが確か？</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        香りでリラックスしたり、気分が切り替わったりする体験は、多くの人が実感しますし、研究でも支持される部分があります。<strong>「心地よさ」や「気分・睡眠の補助」</strong>としてのアロマは、無理のない範囲で取り入れて構いません。
                        {'\n\n'}
                        一方で、「<strong>特定の精油が病気を治す・がんに効く</strong>」といった主張になると、科学的な裏づけは<strong>限定的、あるいは確認されていません</strong>。精油は天然でも作用の強い成分を含み、原液の使用・誤った内服・肌への直接塗布などで<strong>かぶれや健康被害</strong>が起きることもあります。ペットや乳幼児、妊娠中には注意が必要なものもあります。
                        {'\n\n'}
                        大切なのは、<strong>「リラックスの手段」と「医療的な治療」を混同しないこと</strong>。そして、香りを理由に<strong>必要な医療を遠ざけないこと</strong>です。
                    </p>
                    <div className="rounded-xl p-4 border border-[#1A1A1A]/15 bg-white/60 mt-4">
                        <p className="text-sm text-[#1A1A1A]/85 leading-relaxed"><strong>Mitoflow40の立場：</strong>香りの心地よさは尊重しつつ、「治す」という主張とは距離を取り、安全な楽しみ方を大切にします。</p>
                    </div>
                </section>

                {/* 暮らしへ */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#FF9855] pl-3 leading-tight">暮らしへの、やさしい取り入れ方</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">難しく考えず、「自分が心地よい香り」を物差しに。記憶と感情に効く、手軽なスイッチです。</p>
                    <div className="space-y-3">
                        {[
                            { head: '好きな香りで気分を切り替える', body: '朝はすっきり系（柑橘・ミント）、夜は落ち着く系（ラベンダー等）。香りで自律神経のモードを切り替える。' },
                            { head: '「いい記憶」と香りを結びつける', body: 'リラックスできた時間に同じ香りを使うと、その香りが“安心のスイッチ”になっていく。' },
                            { head: '精油は薄めて・正しく使う', body: '原液を直接肌につけない、内服しない、換気する。子ども・ペット・妊娠中は事前に注意点を確認。' },
                            { head: '嗅覚の変化に気を配る', body: '「最近においを感じにくい」と思ったら、放置せずメモを。脳や神経の早期サインのことがある。' },
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
                            { href: '/sound', label: '音と健康' },
                            { href: '/autonomic-nervous-system', label: '自律神経' },
                            { href: '/stress', label: 'ストレス' },
                            { href: '/mindfulness', label: 'マインドフルネス・呼吸' },
                            { href: '/sleep', label: '睡眠' },
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
