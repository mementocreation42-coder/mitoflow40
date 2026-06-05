import Link from 'next/link';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: '気分と栄養 ｜ 心の材料は、食べ物 | Mitoflow40',
    description: '気分を左右するセロトニンやドーパミンは、栄養を材料に作られます。トリプトファン・チロシン、B6・鉄・葉酸・マグネシウムなどの補酵素、腸との関係から、「気分は体から」を精密栄養学の視点で解説します。',
    alternates: { canonical: 'https://mitoflow40.com/mood-nutrition' },
    openGraph: {
        title: '気分と栄養 ｜ Mitoflow40',
        description: 'セロトニン・ドーパミンの材料は栄養。気分の土台を食べ物から整える視点。',
        url: 'https://mitoflow40.com/mood-nutrition',
        type: 'article',
    },
};

export default function MoodNutritionPage() {
    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#E6E1EC' }}>
            <img loading="lazy" decoding="async" src="/images/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block"
                style={{ top: '0', right: '-40px', width: '260px', transform: 'scaleY(-1)' }} />
            <img loading="lazy" decoding="async" src="/images/24.png" alt="" className="absolute pointer-events-none"
                style={{ bottom: '-40px', left: '-40px', width: '260px' }} />

            <JsonLd data={medicalWebPage({ name: '気分と栄養', description: 'セロトニン・ドーパミンの材料は栄養。気分の土台を食べ物から整える視点。', path: '/mood-nutrition' })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: '心とからだ', path: '/library#mind' }, { name: '気分と栄養', path: '/mood-nutrition' }])} />

            <article className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '心とからだ', href: '/library#mind' }, { name: '気分と栄養' }]} />
                <header className="mb-12 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>MIND &amp; BODY</p>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        MOOD &amp; FOOD
                        <span className="block text-base md:text-lg mt-2 text-[#1A1A1A]/70" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>気分と栄養</span>
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-relaxed max-w-[560px] mx-auto">
                        前向きになれないのは、心が弱いからではないかもしれません。気分には、<strong>材料（栄養）</strong>が要ります。
                    </p>
                </header>

                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">気分は、脳内の「物質」で動く</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        私たちの気分や意欲は、脳の中を行き交う<strong>神経伝達物質</strong>に大きく左右されます。安心感をもたらす<strong>セロトニン</strong>、意欲や快感の<strong>ドーパミン</strong>、心を落ち着ける<strong>GABA</strong>——これらのバランスが、その日の気分の土台になります。
                        {'\n\n'}
                        ここで大切なのは、これらの物質が<strong>栄養を材料にして体内で作られる</strong>ということ。材料が足りなければ、十分に作れません。気分の不調が「心がけ」だけの問題ではない理由が、ここにあります。
                    </p>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#41C9B4] pl-3 leading-tight">心の物質と、その材料</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">どれもタンパク質（アミノ酸）を出発点に、ビタミン・ミネラルを補酵素にして作られます。</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {[
                            { n: 'セロトニン', m: 'トリプトファン（＋B6・鉄・葉酸）', note: '安心感・睡眠の土台。多くが腸で作られる。', href: '/nutrients/tryptophan' },
                            { n: 'ドーパミン', m: 'チロシン（＋鉄・B6・葉酸）', note: '意欲・集中・快感に関わる。', href: '/nutrients' },
                            { n: 'GABA', m: 'グルタミン酸（＋B6・マグネシウム）', note: '興奮を鎮め、リラックスを促す。', href: '/nutrients/magnesium' },
                        ].map((x) => (
                            <Link key={x.n} href={x.href} className="group bg-white/70 rounded-2xl p-5 border border-black hover:shadow-lg hover:-translate-y-0.5 transition-all">
                                <div className="font-bold text-[#1A1A1A] mb-1">{x.n}</div>
                                <div className="text-[11px] font-bold text-[#41C9B4] mb-2">材料：{x.m}</div>
                                <p className="text-xs text-[#4A4A4A] leading-relaxed">{x.note}</p>
                            </Link>
                        ))}
                    </div>
                </section>

                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">腸が、気分を支えている</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        「幸せホルモン」と呼ばれるセロトニンは、その大半が<strong>腸</strong>で作られています。腸内環境が乱れると、材料の供給や合成に影響し、気分にも波及します。だから、気分を整えるうえで<strong>腸を整える</strong>ことは、遠回りに見えて近道です。
                        {'\n\n'}
                        40代は、消化・吸収の力が落ちやすく、忙しさから食事も偏りがち。気分が晴れないときこそ、まず<strong>タンパク質・鉄・ビタミンB群</strong>が足りているか、腸の調子はどうかを見直してみる価値があります。
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                        {[{ href: '/gut-brain', label: '腸脳相関' }, { href: '/digestion', label: '消化・吸収' }, { href: '/nutrients', label: '栄養素' }, { href: '/foods', label: '食べ物' }].map((l) => (
                            <Link key={l.href} href={l.href} className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">{l.label}</Link>
                        ))}
                    </div>
                </section>

                <p className="text-xs text-[#4A4A4A]/70 leading-relaxed mb-10 p-4 bg-white/60 rounded-lg border border-[#1A1A1A]/10">
                    ※ 栄養は気分の土台を支えますが、うつ症状など心の不調は栄養だけで解決するものではありません。つらい状態が続くときは、医療機関や相談窓口にご相談ください。
                </p>

                <div className="text-center">
                    <Link href="/library" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">← Library に戻る</Link>
                </div>
            </article>
        </div>
    );
}
