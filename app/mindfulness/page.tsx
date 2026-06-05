import Link from 'next/link';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: 'マインドフルネス・呼吸 ｜ 自律神経を整えるスイッチ | Mitoflow40',
    description: '呼吸は、自律神経に意識的に働きかけられる数少ないスイッチ。ゆっくり吐く呼吸とマインドフルネスで「休息モード（副交感神経）」を取り戻す——合法・安全な“整える”実践を、やさしく解説します。',
    alternates: { canonical: 'https://mitoflow40.com/mindfulness' },
    openGraph: {
        title: 'マインドフルネス・呼吸 ｜ Mitoflow40',
        description: '呼吸は自律神経のスイッチ。休息モードを取り戻す、安全な整える実践。',
        url: 'https://mitoflow40.com/mindfulness',
        type: 'article',
    },
};

export default function MindfulnessPage() {
    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#E6E1EC' }}>
            <img loading="lazy" decoding="async" src="/images/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block"
                style={{ top: '0', right: '-40px', width: '260px', transform: 'scaleY(-1)' }} />
            <img loading="lazy" decoding="async" src="/images/24.png" alt="" className="absolute pointer-events-none"
                style={{ bottom: '-40px', left: '-40px', width: '260px' }} />

            <JsonLd data={medicalWebPage({ name: 'マインドフルネス・呼吸', description: '呼吸は自律神経のスイッチ。休息モードを取り戻す、安全な整える実践。', path: '/mindfulness' })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: '心とからだ', path: '/library#mind' }, { name: 'マインドフルネス・呼吸', path: '/mindfulness' }])} />

            <article className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '心とからだ', href: '/library#mind' }, { name: 'マインドフルネス・呼吸' }]} />
                <header className="mb-12 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>MIND &amp; BODY</p>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        BREATH
                        <span className="block text-base md:text-lg mt-2 text-[#1A1A1A]/70" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>マインドフルネス・呼吸</span>
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-relaxed max-w-[560px] mx-auto">
                        心を直接コントロールするのは難しい。でも<strong>呼吸</strong>を通してなら、体の側から落ち着きを取り戻せます。
                    </p>
                </header>

                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">呼吸は、自律神経のスイッチ</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        心拍や消化と同じく、自律神経は<strong>自分の意志では直接動かせません</strong>。ところが、その中で唯一、意識的に働きかけられるのが<strong>呼吸</strong>です。呼吸は、自律神経への“手動スイッチ”のような存在なのです。
                        {'\n\n'}
                        ポイントは「<strong>吐く息</strong>」。ゆっくり長く吐くと、休息モードを担う<strong>副交感神経</strong>が優位になり、心拍が落ち着き、緊張がゆるみます。緊張すると呼吸が浅く速くなるのは、その逆が起きているからです。
                    </p>
                </section>

                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">かんたんな呼吸の整え方</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line mb-4">
                        難しく考える必要はありません。たとえば、こんなやり方があります。
                    </p>
                    <div className="rounded-xl p-5 border border-[#1A1A1A]/15 bg-[#E3F2EE]">
                        <ul className="space-y-2 text-sm text-[#1A1A1A]/85 leading-relaxed">
                            <li>① 鼻から<strong>4秒</strong>かけて、お腹をふくらませながら息を吸う</li>
                            <li>② <strong>6〜8秒</strong>かけて、口からゆっくり長く吐ききる</li>
                            <li>③ これを<strong>数回〜数分</strong>くり返すだけ</li>
                        </ul>
                    </div>
                    <p className="text-xs text-[#4A4A4A]/70 mt-4 leading-relaxed">
                        ※ 数字はあくまで目安です。「吸う時間より、吐く時間を長く」だけ意識すれば十分。気持ちよく続けられる長さで。
                    </p>
                </section>

                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">マインドフルネスという「今に戻る」練習</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        マインドフルネスとは、<strong>「今、ここ」に注意を向ける</strong>こと。過去の後悔や未来の不安に心が引っぱられているとき、呼吸や体の感覚に意識を戻す——それだけのシンプルな練習です。特別な道具も信仰もいりません。
                        {'\n\n'}
                        ストレス低減への効果は研究でも注目されており、医療や教育の場でも取り入れられています。1日数分、呼吸に意識を向ける時間を持つだけでも、心の“ざわつき”との距離が取りやすくなります。合法的で、副作用もなく、いつでもどこでもできる——もっとも手軽な「整える」実践です。
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                        {[{ href: '/autonomic-nervous-system', label: '自律神経' }, { href: '/stress', label: 'ストレス' }, { href: '/sleep', label: '睡眠' }].map((l) => (
                            <Link key={l.href} href={l.href} className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">{l.label}</Link>
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
