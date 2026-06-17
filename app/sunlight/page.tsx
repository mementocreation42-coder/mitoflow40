import Link from 'next/link';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: '日光と健康 ｜ 体内時計・ビタミンD・紫外線とのつき合い方 | Mitoflow40',
    description: '太陽の光は、体内時計を整え、セロトニンやビタミンDをつくる強力なスイッチ。一方で紫外線は浴びすぎれば老化や肌の負担にもなります。朝の光・ビタミンD・紫外線のメリットとデメリット、賢い日光浴のコツを精密栄養学の視点でやさしく解説します。',
    alternates: { canonical: 'https://mitoflow40.com/sunlight' },
    openGraph: {
        title: '日光と健康 | Mitoflow40',
        description: '体内時計・セロトニン・ビタミンDをつくる太陽の光と、紫外線との上手なつき合い方。',
        url: 'https://mitoflow40.com/sunlight',
        type: 'article',
    },
};

const benefits = [
    { en: 'BODY CLOCK', title: '体内時計を整える', note: '朝の光が体内時計をリセットし、夜のメラトニン分泌のタイミングを決める。睡眠の土台。', href: '/circadian-rhythm' },
    { en: 'SEROTONIN', title: 'セロトニンを増やす', note: '日中の光は「幸せホルモン」セロトニンを高め、気分の安定や前向きさにつながる。', href: '/mood-nutrition' },
    { en: 'VITAMIN D', title: 'ビタミンDをつくる', note: '皮膚が紫外線(UVB)を受けてビタミンDを合成。骨・免疫・気分に関わる大切な栄養素。', href: '/nutrients' },
    { en: 'METABOLISM', title: '代謝・血圧の調整', note: '光は自律神経やホルモンにも作用し、覚醒・代謝・血圧のリズムづくりを助ける。', href: '/autonomic-nervous-system' },
];

const risks = [
    { title: '酸化ストレス・光老化', note: '紫外線は活性酸素を発生させ、シワ・たるみ・シミなど「光老化」を進める。' },
    { title: '肌・目への負担', note: '浴びすぎは日焼け（炎症）やDNA損傷、長期的には皮膚や目のトラブルのリスクに。' },
    { title: '時間帯と強さ', note: '日差しが最も強いのは正午前後。同じ時間でも夏と冬、緯度で紫外線量は大きく違う。' },
];

export default function SunlightPage() {
    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#FBEFD2' }}>
            <img loading="lazy" decoding="async" src="/images/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block"
                style={{ top: '0', right: '-40px', width: '260px', transform: 'scaleY(-1)' }} />
            <img loading="lazy" decoding="async" src="/images/24.png" alt="" className="absolute pointer-events-none"
                style={{ bottom: '-40px', left: '-40px', width: '260px' }} />

            <JsonLd data={medicalWebPage({ name: '日光と健康', description: '体内時計・セロトニン・ビタミンDをつくる太陽の光と、紫外線との上手なつき合い方。', path: '/sunlight' })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: '生活習慣', path: '/library#lifestyle' }, { name: '日光と健康', path: '/sunlight' }])} />

            <article className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '生活習慣', href: '/library#lifestyle' }, { name: '日光と健康' }]} />
                <header className="mb-12 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>SUNLIGHT</p>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        SUNLIGHT
                        <span className="block text-base md:text-lg mt-2 text-[#1A1A1A]/70" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>日光と健康</span>
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-relaxed max-w-[560px] mx-auto">
                        太陽の光は、<strong>体内時計・気分・ビタミンD</strong>をつくる無料の薬。でも浴びすぎは負担にもなります。鍵は「<strong>避ける</strong>」でも「<strong>浴び放題</strong>」でもなく、<strong>賢く付き合う</strong>こと。
                    </p>
                </header>

                {/* 光は最強のスイッチ */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#FF9855] pl-3 leading-tight">光は、体を動かす最強のスイッチ</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        私たちの体は、何百万年も<strong>太陽のリズム</strong>とともに進化してきました。だから「いつ・どれだけ光を浴びるか」は、食事や運動に並ぶ、健康の大きな土台です。
                        {'\n\n'}
                        とくに大事なのが<strong>朝の光</strong>。朝、目から強い光が入ると、脳の体内時計がリセットされ、「今が一日の始まり」と全身に号令が出ます。これが、夜の自然な眠気（メラトニン）や、日中の集中・気分を決めていきます。室内の照明では足りず、<strong>屋外の明るさ</strong>が必要なのがポイントです。
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {[{ href: '/circadian-rhythm', label: '体内時計' }, { href: '/sleep', label: '睡眠' }].map((l) => (
                            <Link key={l.href} href={l.href} className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">{l.label}</Link>
                        ))}
                    </div>
                </section>

                {/* 日光の恵み */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#FF9855] pl-3 leading-tight">日光がくれる、4つの恵み</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">太陽の光が体にしていることは、想像以上にたくさんあります。</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {benefits.map((b) => (
                            <Link key={b.en} href={b.href} className="group bg-white/70 rounded-2xl p-5 border border-black hover:shadow-lg hover:-translate-y-0.5 transition-all">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-[10px] font-bold tracking-widest text-[#41C9B4]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{b.en}</span>
                                    <span className="text-[#41C9B4] group-hover:translate-x-0.5 transition-transform" aria-hidden>→</span>
                                </div>
                                <div className="font-bold text-[#1A1A1A] mb-1">{b.title}</div>
                                <p className="text-xs text-[#4A4A4A] leading-relaxed">{b.note}</p>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* ビタミンD */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#FF9855] pl-3 leading-tight">日光でつくる「ビタミンD」</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        ビタミンDは「ビタミン」と呼ばれますが、働きはむしろ<strong>ホルモンに近い</strong>栄養素。骨を丈夫にするだけでなく、<strong>免疫・気分・筋力</strong>にも関わります。そしてユニークなのは、<strong>日光（UVB）を浴びると皮膚で自分でつくれる</strong>こと。
                        {'\n\n'}
                        ただし、日焼け止め・窓ガラス・冬の弱い日差し・室内中心の生活では、十分につくれないことも少なくありません。現代人は不足しがちな栄養素のひとつです。<strong>適度な日光＋食事（鮭・きのこ・卵など）＋必要に応じてサプリ</strong>で補うのが現実的です。
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {[{ href: '/nutrients', label: '栄養素' }, { href: '/foods', label: '食べ物' }, { href: '/supplements', label: 'サプリの選び方' }].map((l) => (
                            <Link key={l.href} href={l.href} className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">{l.label}</Link>
                        ))}
                    </div>
                </section>

                {/* 紫外線のリスク */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#FF9855] pl-3 leading-tight">浴びすぎの「もう一つの顔」</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">同じ太陽でも、強い紫外線を浴びすぎれば、体にとっては負担になります。恵みと負担は、量とタイミングで切り替わります。</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {risks.map((r) => (
                            <div key={r.title} className="bg-white/70 rounded-2xl p-5 border border-black">
                                <div className="font-bold text-[#1A1A1A] mb-1 text-sm">{r.title}</div>
                                <p className="text-xs text-[#4A4A4A] leading-relaxed">{r.note}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {[{ href: '/oxidative-stress', label: '酸化ストレス' }, { href: '/glycation', label: '糖化' }].map((l) => (
                            <Link key={l.href} href={l.href} className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">{l.label}</Link>
                        ))}
                    </div>
                </section>

                {/* 国・文化による違い */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#FF9855] pl-3 leading-tight">国や文化で、こんなに違う</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line mb-6">
                        「日光とどう付き合うか」は、住む国の<strong>緯度・日照時間</strong>や、その土地の<strong>文化</strong>で大きく変わります。だから「海外の常識」がそのまま日本に当てはまるとは限りません。代表的な違いを見てみましょう。
                    </p>
                    <div className="space-y-4">
                        <div className="rounded-xl p-5 border border-[#1A1A1A]/15 bg-[#EAF1F7]">
                            <div className="text-[10px] font-bold tracking-widest text-[#41C9B4] mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>NORDIC ／ 北欧など高緯度</div>
                            <div className="font-bold text-[#1A1A1A] mb-1">日照が少ない国の「冬」</div>
                            <p className="text-sm text-[#4A4A4A] leading-relaxed">北欧やカナダなど高緯度の国では、冬は日照時間が極端に短く、太陽がほとんど昇らない地域もあります。そのため<strong>ビタミンD不足</strong>が起きやすく、食品への添加（強化食品）やサプリが一般的。<strong>冬季うつ（季節性のうつ）</strong>への対策として、強い光を浴びる<strong>光療法（ライトボックス）</strong>が広く使われています。日光が「足りない」前提で社会が設計されているのが特徴です。</p>
                        </div>
                        <div className="rounded-xl p-5 border border-[#1A1A1A]/15 bg-[#FBEFE0]">
                            <div className="text-[10px] font-bold tracking-widest text-[#41C9B4] mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>SUNNY ／ 地中海・豪州など低緯度</div>
                            <div className="font-bold text-[#1A1A1A] mb-1">日差しが強い国の「守り方」</div>
                            <p className="text-sm text-[#4A4A4A] leading-relaxed">オーストラリアなど紫外線が非常に強い国では、皮膚がんの予防が大きな課題。「Slip(着る)・Slop(塗る)・Slap(帽子)」のような<strong>日焼け対策の標語</strong>が国民的に浸透しています。一方、地中海沿岸では昼の強い時間を避けて休む<strong>シエスタ</strong>など、強い日差しと折り合う暮らし方が文化に根づいています。</p>
                        </div>
                        <div className="rounded-xl p-5 border border-[#1A1A1A]/15 bg-[#F0EAF6]">
                            <div className="text-[10px] font-bold tracking-widest text-[#41C9B4] mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>JAPAN ／ 日本・東アジア</div>
                            <div className="font-bold text-[#1A1A1A] mb-1">「美白」と日傘の文化</div>
                            <p className="text-sm text-[#4A4A4A] leading-relaxed">日本を含む東アジアでは「色白＝美しい」という美意識が長く、<strong>日傘・日焼け止め・UVカット</strong>が日常的。これは美容や光老化対策として優れる一方で、<strong>日光を避けすぎてビタミンDが不足</strong>しやすい側面もあります。「徹底的に避ける」文化のなかで、いかに必要な分の光を確保するかが、日本ならではのテーマです。</p>
                        </div>
                    </div>
                    <p className="text-sm text-[#4A4A4A] leading-loose mt-6">
                        欧米の健康情報は「日光は浴びすぎ注意」というトーンが強いこともありますが、それは<strong>日差しが強い・日光浴の文化がある</strong>国を前提にした話。日傘文化で<strong>むしろ不足しがちな日本</strong>では、「適度に浴びることも大切」という視点が、同じくらい重要になります。
                    </p>
                </section>

                {/* 賢いつき合い方 */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#FF9855] pl-3 leading-tight">賢い、日光とのつき合い方</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">「朝はしっかり、日中は守りながら」が基本の考え方。難しく考えず、まずは朝の習慣から。</p>
                    <div className="space-y-3">
                        {[
                            { head: '朝、起きたら外の光を浴びる', body: '起床後できるだけ早く、15〜30分ほど屋外の明るさを。曇りでも室内よりずっと明るい。体内時計が整い、夜の眠りも深くなる。' },
                            { head: '日中の散歩を習慣に', body: '昼休みのひと歩きで、光・運動・気分転換を一度に。セロトニンも増えて午後の集中が変わる。' },
                            { head: 'ビタミンDは「短時間の素肌」で', body: '季節・地域で必要量は変わるが、手や腕に短時間の日光を。長時間の無防備な日焼けは不要。' },
                            { head: '強い時間帯は守る', body: '紫外線が強い正午前後や夏は、日焼け止め・帽子・日陰を活用。「浴びる」と「守る」は両立できる。' },
                            { head: '夜は逆に、光を減らす', body: '夜の強い光やスマホはメラトニンを抑え、眠りを妨げる。夜は暗めに——これも光の使い方の一部。' },
                        ].map((s) => (
                            <div key={s.head} className="flex items-start gap-4 bg-white/70 rounded-xl p-4 border border-[#1A1A1A]/15">
                                <div>
                                    <div className="font-bold text-[#1A1A1A] mb-0.5">{s.head}</div>
                                    <p className="text-sm text-[#4A4A4A] leading-snug">{s.body}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-[#4A4A4A]/60 mt-4 leading-relaxed">
                        ※ 必要な日光量や紫外線への感受性は、肌質・年齢・地域・季節で大きく異なります。肌や持病に不安がある方は、専門家に相談しながら自分に合う量を見つけてください。
                    </p>
                </section>

                {/* もっと学ぶ */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#FF9855] pl-3 leading-tight">あわせて読む</h2>
                    <div className="flex flex-wrap gap-2">
                        {[
                            { href: '/circadian-rhythm', label: '体内時計' },
                            { href: '/sleep', label: '睡眠' },
                            { href: '/mood-nutrition', label: '気分と栄養' },
                            { href: '/oxidative-stress', label: '酸化ストレス' },
                            { href: '/nutrients', label: '栄養素（ビタミンD）' },
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
