import Link from 'next/link';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: 'メタボリックシンドロームとは｜腹囲・血圧・血糖・脂質のつながり | Mitoflow40',
    description: 'メタボリックシンドロームは内臓脂肪を土台に、血圧・血糖・脂質の異常が重なる状態。日本の診断基準、インスリン抵抗性との関係、健診の読み方、改善の方向を解説します。',
    alternates: { canonical: 'https://mitoflow40.com/metabolic-syndrome' },
    openGraph: { siteName: 'Mitoflow40', locale: 'ja_JP', type: 'article', title: 'メタボリックシンドロームとは | Mitoflow40', description: '腹囲・血圧・血糖・脂質を、別々の数字ではなく一つの代謝の地図として読む。', url: 'https://mitoflow40.com/metabolic-syndrome' },
};

const criteria = [
    { label: '脂質', value: '中性脂肪 150mg/dL以上 かつ／または HDL 40mg/dL未満', href: '/dyslipidemia' },
    { label: '血圧', value: '収縮期 130mmHg以上 かつ／または 拡張期 85mmHg以上', href: '/hypertension' },
    { label: '血糖', value: '空腹時血糖 110mg/dL以上', href: '/blood-sugar' },
];

const actions = [
    { head: '腹囲と体重を同じ条件で記録する', body: '数字は評価ではなく変化を見る道具。急な減量より、食事と活動量の小さな調整を続ける。' },
    { head: '食後に動き、座る時間を切る', body: '筋肉を使うとブドウ糖の受け皿が働く。運動時間だけでなく、長時間座り続けないことも意識する。' },
    { head: '液体の糖と飲酒量から見直す', body: '甘い飲み物と過度の飲酒は、中性脂肪・脂肪肝・血圧に影響を重ねやすい。' },
    { head: '睡眠といびきを軽視しない', body: '睡眠不足や睡眠時無呼吸が隠れていると、体重・血圧・血糖を整えにくくなることがある。' },
];

export default function MetabolicSyndromePage() {
    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#F0E2D8' }}>
            <img loading="lazy" decoding="async" src="/images/for-you/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block" style={{ top: 0, right: '-40px', width: '260px', transform: 'scaleY(-1)' }} />
            <img loading="lazy" decoding="async" src="/images/misc/24.png" alt="" className="absolute pointer-events-none" style={{ bottom: '-40px', left: '-40px', width: '260px' }} />

            <JsonLd data={medicalWebPage({ name: 'メタボリックシンドロームとは', description: '腹囲・血圧・血糖・脂質を、一つの代謝の地図として読む。', path: '/metabolic-syndrome' })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: '老化と不調の土台', path: '/library#aging' }, { name: 'メタボリックシンドローム', path: '/metabolic-syndrome' }])} />

            <article className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '老化と不調の土台', href: '/library#aging' }, { name: 'メタボリックシンドローム' }]} />
                <header className="mb-12 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2 text-[#B76B47]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>METABOLIC SYNDROME</p>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        METABOLIC MAP
                        <span className="block text-base md:text-lg mt-2 text-[#1A1A1A]/70" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>メタボリックシンドロームとは</span>
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-relaxed max-w-[610px] mx-auto">腹囲、血圧、血糖、脂質。健診では別々の欄に並ぶ数字ですが、体の中では<strong>内臓脂肪とインスリン抵抗性を介してつながっています。</strong></p>
                </header>

                <div className="mb-10 rounded-2xl p-5 border border-[#B76B47] bg-white/70">
                    <p className="text-sm text-[#1A1A1A]/85 leading-relaxed"><strong className="text-[#B76B47]">はじめに：</strong>「メタボ」は体型をからかう言葉ではありません。複数の小さな異常が重なることで、心筋梗塞や脳卒中などのリスクが高まる状態を早めに見つける医学的な概念です。</p>
                </div>

                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#B76B47] pl-3">中心にあるのは、内臓脂肪</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">内臓脂肪は単なるエネルギー倉庫ではなく、全身へさまざまな物質を送る組織です。過剰になると炎症やインスリンの効きにくさに関わり、血糖・中性脂肪・血圧が同時に乱れやすくなります。
                        {'\n\n'}だからメタボリックシンドロームは、病名を寄せ集めたものではなく、<strong>一つの代謝の乱れが複数の数字に現れた状態</strong>と捉えると理解しやすくなります。</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                        <Link href="/insulin-resistance" className="text-xs px-3 py-1 rounded-full bg-white border border-black font-bold hover:bg-[#41C9B4] hover:text-white">インスリン抵抗性</Link>
                        <Link href="/inflammation" className="text-xs px-3 py-1 rounded-full bg-white border border-black font-bold hover:bg-[#41C9B4] hover:text-white">慢性炎症</Link>
                        <Link href="/fatty-liver" className="text-xs px-3 py-1 rounded-full bg-white border border-black font-bold hover:bg-[#41C9B4] hover:text-white">脂肪肝</Link>
                    </div>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#B76B47] pl-3">日本の診断基準</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">まず腹囲が必須項目です。そのうえで、3項目のうち2項目以上が基準に当てはまる場合に診断されます。</p>
                    <div className="rounded-2xl bg-[#B76B47] text-white p-5 md:p-6 mb-3 text-center border border-black">
                        <div className="text-xs font-bold tracking-widest mb-1">必須：へその高さの腹囲</div>
                        <div className="text-xl md:text-2xl font-bold">男性 85cm以上 ／ 女性 90cm以上</div>
                        <div className="text-xs mt-2 text-white/80">内臓脂肪面積100cm²以上に相当する目安</div>
                    </div>
                    <div className="space-y-3">
                        {criteria.map((c) => (
                            <Link key={c.label} href={c.href} className="group grid grid-cols-[64px_1fr] gap-3 items-center bg-white/70 rounded-xl p-4 border border-black hover:shadow-sm">
                                <div className="font-bold text-[#B76B47]">{c.label}</div>
                                <div className="text-sm font-medium text-[#1A1A1A] group-hover:underline">{c.value} →</div>
                            </Link>
                        ))}
                    </div>
                    <p className="text-xs text-[#4A4A4A]/65 mt-4">※ 薬で治療中の場合も該当項目に含めます。海外の基準や特定保健指導の階層化とは異なる点があります。</p>
                </section>

                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#B76B47] pl-3">「該当しない＝安心」ではない</h2>
                    <p className="text-[#4A4A4A] leading-loose">腹囲が基準未満でも、高血圧・高血糖・脂質異常症はそれぞれ治療や管理が必要なことがあります。反対に診断基準へ該当しても、それだけで薬の種類や治療目標が決まるわけではありません。<strong>基準は白黒をつける線ではなく、重なったリスクに気づく入口</strong>です。</p>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#B76B47] pl-3">ほどくときも、まとめて整える</h2>
                    <div className="space-y-3 mt-5">
                        {actions.map((a, i) => <div key={a.head} className="flex gap-4 bg-white/70 rounded-xl p-4 border border-[#1A1A1A]/15"><span className="w-7 h-7 shrink-0 rounded-full bg-[#B76B47] text-white flex items-center justify-center text-xs font-bold">{i + 1}</span><div><div className="font-bold text-[#1A1A1A] mb-1">{a.head}</div><p className="text-sm text-[#4A4A4A] leading-relaxed">{a.body}</p></div></div>)}
                    </div>
                    <p className="text-xs text-[#4A4A4A]/65 mt-4">特定健診は40〜74歳が対象です。特定保健指導の案内が届いた場合は、生活を一緒に整理する機会として活用できます。</p>
                </section>

                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#B76B47] pl-3">この地図を詳しく見る</h2>
                    <div className="flex flex-wrap gap-2">
                        {[{ href: '/hypertension', label: '高血圧' }, { href: '/insulin-resistance', label: 'インスリン抵抗性' }, { href: '/dyslipidemia', label: '脂質異常症' }, { href: '/diabetes', label: '糖尿病' }, { href: '/fatty-liver', label: '脂肪肝' }, { href: '/exercise', label: '運動' }].map((l) => <Link key={l.href} href={l.href} className="px-4 py-2 rounded-full bg-white border border-black text-sm font-bold hover:bg-[#41C9B4] hover:text-white">{l.label} →</Link>)}
                    </div>
                </section>

                <section className="mb-10 text-xs text-[#4A4A4A]/70 leading-relaxed"><h2 className="font-bold text-[#1A1A1A] mb-2">主な参考情報</h2><ul className="list-disc pl-5 space-y-1"><li><a className="underline hover:text-[#B76B47]" href="https://kennet.mhlw.go.jp/information/information/metabolic/m-01-003.html" target="_blank" rel="noreferrer">厚生労働省「メタボリックシンドロームの診断基準」</a></li><li><a className="underline hover:text-[#B76B47]" href="https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000161103.html" target="_blank" rel="noreferrer">厚生労働省「特定健診・特定保健指導」</a></li><li><a className="underline hover:text-[#B76B47]" href="https://www.jasso.or.jp/contents/wod/" target="_blank" rel="noreferrer">日本肥満学会「肥満・肥満症・メタボリックシンドローム」</a></li></ul></section>

                <div className="text-center"><Link href="/library#aging" className="inline-block px-8 py-3 bg-white border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white">← 老化と不調の土台に戻る</Link></div>
            </article>
        </div>
    );
}
