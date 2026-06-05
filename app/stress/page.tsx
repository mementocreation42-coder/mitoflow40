import Link from 'next/link';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: 'ストレスとは ｜ 敵ではなく、体からの信号 | Mitoflow40',
    description: 'ストレスは悪者ではなく、体を守るための信号。コルチゾールと自律神経のしくみ、慢性ストレスが血糖・睡眠・腸に与える影響、40代の整え方を、精密栄養学の視点でやさしく解説します。',
    alternates: { canonical: 'https://mitoflow40.com/stress' },
    openGraph: {
        title: 'ストレスとは ｜ Mitoflow40',
        description: 'ストレスは敵ではなく信号。コルチゾール・自律神経のしくみと、体から整える方法。',
        url: 'https://mitoflow40.com/stress',
        type: 'article',
    },
};

export default function StressPage() {
    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#E6E1EC' }}>
            <img loading="lazy" decoding="async" src="/images/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block"
                style={{ top: '0', right: '-40px', width: '260px', transform: 'scaleY(-1)' }} />
            <img loading="lazy" decoding="async" src="/images/24.png" alt="" className="absolute pointer-events-none"
                style={{ bottom: '-40px', left: '-40px', width: '260px' }} />

            <JsonLd data={medicalWebPage({ name: 'ストレスとは', description: 'ストレスは敵ではなく信号。コルチゾール・自律神経のしくみと、体から整える方法。', path: '/stress' })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: '心とからだ', path: '/library#mind' }, { name: 'ストレス', path: '/stress' }])} />

            <article className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '心とからだ', href: '/library#mind' }, { name: 'ストレス' }]} />
                <header className="mb-12 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>MIND &amp; BODY</p>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        STRESS
                        <span className="block text-base md:text-lg mt-2 text-[#1A1A1A]/70" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>ストレスとは</span>
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-relaxed max-w-[560px] mx-auto">
                        ストレスは「敵」ではなく、体を守るための<strong>信号</strong>。問題なのは、それが鳴り続けてしまうことです。
                    </p>
                </header>

                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">ストレスは、本来は味方</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        ストレスと聞くと悪いものに思えますが、本来は<strong>危機に対応するための体の反応</strong>です。プレッシャーがかかると、副腎から<strong>コルチゾール</strong>などのホルモンが出て、心拍や血糖を上げ、「戦う・逃げる」準備を整えます。締め切り前に集中できるのも、この働きのおかげです。
                        {'\n\n'}
                        つまり、短く一時的なストレスは、むしろパフォーマンスを高める味方。問題は、それが<strong>慢性的に続く</strong>ときです。
                    </p>
                </section>

                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">慢性ストレスが、体をむしばむ</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        ストレスが鳴りやまないと、<strong>自律神経</strong>はアクセル（交感神経）を踏みっぱなしになります。コルチゾールも出続け、<strong>血糖の乱れ・睡眠の質の低下・腸の不調・免疫の低下</strong>といった形で、全身に波及します。気分の問題に見えて、その下では体がすり減っているのです。
                        {'\n\n'}
                        40代は、仕事の責任、家庭や介護、体力の変化が重なり、慢性ストレスをためやすい時期。「気の持ちよう」で片づけず、体への負担として捉え直すことが、立て直しの第一歩です。
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                        {[{ href: '/autonomic-nervous-system', label: '自律神経' }, { href: '/blood-sugar', label: '血糖' }, { href: '/hormones', label: 'ホルモン' }].map((l) => (
                            <Link key={l.href} href={l.href} className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">{l.label}</Link>
                        ))}
                    </div>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#41C9B4] pl-3 leading-tight">体から、ブレーキをかける</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">考え方を変えるのは難しくても、体からなら「休息モード（副交感神経）」に切り替えられます。</p>
                    <div className="space-y-3">
                        {[
                            { head: 'ゆっくり吐く呼吸', body: '長く吐く息は、副交感神経のスイッチ。数分の深呼吸で、緊張がゆるみやすい。', href: '/mindfulness' },
                            { head: '睡眠を最優先に', body: '睡眠不足はコルチゾールを増やし、ストレス耐性を下げる。整える土台。', href: '/sleep' },
                            { head: '消耗する栄養を補う', body: 'ストレス時はマグネシウム・ビタミンB群・ビタミンCが消耗しやすい。食事で補給を。', href: '/nutrients' },
                            { head: '軽く体を動かす', body: 'ウォーキングなどの軽い運動は、ストレスホルモンを発散し、気分を整える。', href: '/exercise' },
                        ].map((s) => (
                            <Link key={s.head} href={s.href} className="group flex items-start gap-4 bg-white/70 rounded-xl p-4 border border-[#1A1A1A]/15 hover:border-black hover:shadow-sm transition-all">
                                <div>
                                    <div className="font-bold text-[#1A1A1A] mb-0.5 group-hover:text-[#FF9855] transition-colors">{s.head}</div>
                                    <p className="text-sm text-[#4A4A4A] leading-snug">{s.body}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                <p className="text-xs text-[#4A4A4A]/70 leading-relaxed mb-10 p-4 bg-white/60 rounded-lg border border-[#1A1A1A]/10">
                    ※ 強いストレスや気分の落ち込みが続く、眠れない、つらいと感じるときは、我慢せず医療機関や公的な相談窓口にご相談ください。本記事は一般的な健康情報であり、治療に代わるものではありません。
                </p>

                <div className="text-center">
                    <Link href="/library" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">← Library に戻る</Link>
                </div>
            </article>
        </div>
    );
}
