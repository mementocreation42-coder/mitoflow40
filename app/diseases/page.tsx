import Link from 'next/link';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: '現代病を読む ｜ 糖尿病・メタボ・高血圧・脂肪肝・脂質異常症・サルコペニア・CKD・心・歯周病 | Mitoflow40',
    description: '現代病とは何かという俯瞰から、糖尿病・メタボリックシンドローム・高血圧・脂肪肝・脂質異常症・サルコペニア・慢性腎臓病・心の現代病・歯周病まで。バラバラに見える病気を「体の設計と環境のズレ」として読む入口です。',
    alternates: { canonical: 'https://mitoflow40.com/diseases' },
    openGraph: {
        siteName: 'Mitoflow40',
        locale: 'ja_JP',
        title: '現代病を読む | Mitoflow40',
        description: '糖尿病・メタボ・高血圧・脂肪肝・脂質異常症・サルコペニア・CKD・心・歯周病',
        url: 'https://mitoflow40.com/diseases',
        type: 'article',
    },
};

const topics = [
    { href: '/modern-diseases', en: 'MODERN DISEASES', ja: '現代病とは', color: '#F0E2D8', body: '生活習慣病・慢性炎症・自律神経の乱れ・睡眠負債・座りすぎ——「体の進化」と「変わりすぎた環境」のズレを俯瞰し、対策テーマへつなぎます。' },
    { href: '/diabetes', en: 'DIABETES', ja: '糖尿病とは', color: '#F7E2DC', body: '現代病の代表格。1型・2型の違い、見逃しやすいサイン、HbA1c、合併症、そして「境界型」のうちにできること。' },
    { href: '/metabolic-syndrome', en: 'METABOLIC SYNDROME', ja: 'メタボリックシンドローム', color: '#F0E2D8', body: '腹囲・血圧・血糖・脂質を、別々の数字ではなく内臓脂肪からつながる一枚の代謝地図として読む。' },
    { href: '/hypertension', en: 'HYPERTENSION', ja: '高血圧とは', color: '#E2EAF2', body: '症状がなくても血管・心臓・脳・腎臓に積み重なる負担。数字の意味、家庭血圧の測り方、受診の目安、生活で整える方向を解説。' },
    { href: '/fatty-liver', en: 'FATTY LIVER', ja: '脂肪肝とは', color: '#F3E2D2', body: 'お酒を飲まなくてもなる“沈黙の現代病”（MASLD）。糖・果糖・内臓脂肪が原因で、糖尿病や心臓病の入口にも。戻せる段階での対策を解説。' },
    { href: '/dyslipidemia', en: 'DYSLIPIDEMIA', ja: '脂質異常症とは', color: '#E7EFD8', body: 'LDL・HDL・中性脂肪・non-HDLを、善玉・悪玉だけでなく血管リスクの全体像から読む。' },
    { href: '/sarcopenia', en: 'SARCOPENIA', ja: 'サルコペニア・フレイル', color: '#E7EEDA', body: '40代から始まる筋肉の減少。代謝・血糖・転倒・要介護とつながる「動ける体」の土台。運動とたんぱく質で守り・取り戻す3本柱。' },
    { href: '/chronic-kidney-disease', en: 'CHRONIC KIDNEY DISEASE', ja: '慢性腎臓病（CKD）', color: '#DDE9E6', body: '症状が出にくい腎臓の変化を、eGFR・クレアチニン・尿たんぱくの両面から読む。' },
    { href: '/mental-health', en: 'MENTAL HEALTH', ja: '心の現代病', color: '#E6E0F2', body: 'うつ・不安・燃え尽きは、気合いの問題ではない。ストレス・睡眠・腸・栄養・炎症から「体」として心をとらえ、適切な助けにつなぐ視点。' },
    { href: '/periodontal-disease', en: 'PERIODONTAL DISEASE', ja: '歯周病とは', color: '#F7E2DC', body: '痛みなく静かに進む口の中の慢性炎症。糖尿病・心血管・腸内環境とつながる「全身への波及」を、口の外まで含めて捉え直します。' },
];

export default function HubPage() {
    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#F7E2DC' }}>
            <img loading="lazy" decoding="async" src="/images/for-you/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block mf-deco-flip"
                style={{ top: '-48px', right: '0', width: '260px' }} />
            <img loading="lazy" decoding="async" src="/images/misc/24.png" alt="" className="absolute pointer-events-none"
                style={{ bottom: '8px', left: '8px', width: '260px' }} />

            <JsonLd data={medicalWebPage({ name: '現代病を読む', description: '糖尿病・メタボ・高血圧・脂肪肝・脂質異常症・サルコペニア・CKD・心・歯周病', path: '/diseases' })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: '老化と不調の土台', path: '/library#aging' }, { name: '現代病を読む', path: '/diseases' }])} />

            <div className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '老化と不調の土台', href: '/library#aging' }, { name: '現代病を読む' }]} />
                <header className="mb-10 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>MODERN DISEASES</p>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        MODERN DISEASES
                        <span className="block text-base md:text-lg mt-2 text-[#1A1A1A]/70" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>現代病を読む</span>
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-relaxed max-w-[560px] mx-auto">
                        生活習慣病・慢性炎症・自律神経の乱れ。バラバラに見える病気は、<strong>体の設計と、変わりすぎた環境のズレ</strong>という共通の根を持っています。まず「現代病とは」で全体像を、続けて9の各論を。
                    </p>
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {topics.map((t, i) => (
                        <Link key={t.href} href={t.href}
                            className="group flex flex-col rounded-2xl border border-black p-5 md:p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all"
                            style={{ background: t.color }}>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/50" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{t.en}</span>
                                <span className="text-xs font-bold text-[#1A1A1A]/40" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{String(i + 1).padStart(2, '0')}</span>
                            </div>
                            <div className="text-xl font-bold text-[#1A1A1A] mb-1">{t.ja}</div>
                            <p className="text-sm text-[#1A1A1A]/75 leading-relaxed mb-4 flex-1">{t.body}</p>
                            <span className="inline-flex w-fit items-center gap-1 px-4 py-1.5 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>読む <span className="group-hover:translate-x-1 transition-transform">→</span></span>
                        </Link>
                    ))}
                </div>

                <div className="mt-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-xl font-bold text-[#1A1A1A] mb-3 border-l-4 border-[#FF9855] pl-3 leading-tight">共通の打ち手</h2>
                    <p className="text-[#4A4A4A] leading-loose">
                        病名は違っても、酸化・糖化・炎症という<strong>土台</strong>は共通です。血糖の波を小さくする、内臓脂肪を減らす、筋肉を守る、眠る。ひとつの打ち手が、複数の病気にまとめて効きます。検査値の読み方は<strong>検査値</strong>のページへ。
                    </p>
                </div>
            </div>
        </div>
    );
}
