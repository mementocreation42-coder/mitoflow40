import Link from 'next/link';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: '不安と体 ｜ 性格ではなく、体のサインかもしれない | Mitoflow40',
    description: '理由のない不安や動悸の裏に、血糖の乱高下・腸内環境・睡眠不足・カフェイン・栄養不足など「体の要因」が隠れていることがあります。不安を性格の問題にせず、体から見直す視点を解説します。',
    alternates: { canonical: 'https://mitoflow40.com/anxiety' },
    openGraph: {
        title: '不安と体 ｜ Mitoflow40',
        description: '不安は性格ではなく、体のサインのことも。血糖・腸・睡眠から見直す視点。',
        url: 'https://mitoflow40.com/anxiety',
        type: 'article',
    },
};

export default function AnxietyPage() {
    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#E6E1EC' }}>
            <img loading="lazy" decoding="async" src="/images/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block"
                style={{ top: '0', right: '-40px', width: '260px', transform: 'scaleY(-1)' }} />
            <img loading="lazy" decoding="async" src="/images/24.png" alt="" className="absolute pointer-events-none"
                style={{ bottom: '-40px', left: '-40px', width: '260px' }} />

            <JsonLd data={medicalWebPage({ name: '不安と体', description: '不安は性格ではなく、体のサインのことも。血糖・腸・睡眠から見直す視点。', path: '/anxiety' })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: '心とからだ', path: '/library#mind' }, { name: '不安と体', path: '/anxiety' }])} />

            <article className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '心とからだ', href: '/library#mind' }, { name: '不安と体' }]} />
                <header className="mb-12 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>MIND &amp; BODY</p>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        ANXIETY
                        <span className="block text-base md:text-lg mt-2 text-[#1A1A1A]/70" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>不安と体</span>
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-relaxed max-w-[560px] mx-auto">
                        理由のない不安や動悸。それは「性格」ではなく、<strong>体からのサイン</strong>のことがあります。
                    </p>
                </header>

                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">不安は、体からも生まれる</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        不安というと、心や気持ちの問題だと思われがちです。けれど、ドキドキする、落ち着かない、わけもなく心配になる——こうした感覚は、<strong>体の状態</strong>によって引き起こされたり、強められたりすることがあります。
                        {'\n\n'}
                        「自分の心が弱いせいだ」と責める前に、体の側に揺さぶる要因がないかを点検してみる。それだけで、抱え込まずにすむことがあります。
                    </p>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#41C9B4] pl-3 leading-tight">気分を揺さぶる、体の要因</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">心当たりがあれば、まずここから整えてみる価値があります。</p>
                    <div className="space-y-3">
                        {[
                            { head: '血糖の乱高下', body: '甘いものや空腹で血糖が急降下すると、体は危機と判断し、動悸や不安・イライラを起こすことがある。', href: '/blood-sugar' },
                            { head: '腸内環境の乱れ', body: '腸は気分と双方向につながっている。腸の不調が、不安の感じやすさに影響することがある。', href: '/gut-brain' },
                            { head: '睡眠不足', body: '眠りが浅いと、感情のブレーキが効きにくくなり、不安が増幅されやすい。', href: '/sleep' },
                            { head: 'カフェイン・栄養不足', body: 'カフェインの摂りすぎや、マグネシウム・鉄・ビタミンB群の不足も、不安感に関わることがある。', href: '/nutrients/magnesium' },
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

                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">まず整えたい、土台</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        血糖の波を小さくする（よく噛む・タンパク質と食べる・甘い飲み物を控える）、カフェインを見直す、睡眠と腸を整える、ゆっくり吐く呼吸でブレーキをかける——こうした<strong>体の土台</strong>を整えるだけで、不安の感じやすさがやわらぐことは少なくありません。
                        {'\n\n'}
                        もちろん、これですべてが解決するわけではありません。けれど「打つ手がある」と分かること自体が、不安を小さくしてくれます。
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                        {[{ href: '/blood-sugar', label: '血糖' }, { href: '/mindfulness', label: '呼吸・マインドフルネス' }, { href: '/autonomic-nervous-system', label: '自律神経' }].map((l) => (
                            <Link key={l.href} href={l.href} className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">{l.label}</Link>
                        ))}
                    </div>
                </section>

                <p className="text-xs text-[#4A4A4A]/70 leading-relaxed mb-10 p-4 bg-white/60 rounded-lg border" style={{ borderColor: '#C0392B33', background: '#FBE3DC55' }}>
                    ※ 強い不安・パニック発作・眠れない・日常生活に支障が出るなどの場合は、体の要因にとどまらない可能性があります。我慢せず、必ず医療機関や公的な相談窓口にご相談ください。本記事は治療に代わるものではありません。
                </p>

                <div className="text-center">
                    <Link href="/library" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">← Library に戻る</Link>
                </div>
            </article>
        </div>
    );
}
