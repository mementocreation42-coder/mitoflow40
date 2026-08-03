import Link from 'next/link';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: '40代の健康診断の読み方｜結果票を次の行動につなげる | Mitoflow40',
    description: '健康診断の結果を、A・B・要再検査だけで終わらせないための読み方。基準範囲と診断基準の違い、経年変化、血圧・血糖・脂質・肝臓・腎臓、再検査と精密検査を整理します。',
    alternates: { canonical: 'https://mitoflow40.com/health-check-guide' },
    openGraph: { siteName: 'Mitoflow40', locale: 'ja_JP', type: 'article', title: '40代の健康診断の読み方 | Mitoflow40', description: '結果票を点数表ではなく、経年変化と次の行動を決める地図として読む。', url: 'https://mitoflow40.com/health-check-guide' },
};

const groups = [
    { title: '血圧・血管', items: '診察室血圧、家庭血圧、喫煙歴、家族歴', href: '/hypertension', color: '#E2EAF2' },
    { title: '血糖・代謝', items: '空腹時血糖、HbA1c、腹囲、BMI', href: '/blood-sugar', color: '#F6E6CF' },
    { title: '脂質', items: 'LDL、HDL、中性脂肪、non-HDL', href: '/dyslipidemia', color: '#E7EFD8' },
    { title: '肝臓', items: 'AST、ALT、γ-GTP、腹囲、中性脂肪', href: '/organs/liver', color: '#F3E2D2' },
    { title: '腎臓・尿', items: 'クレアチニン、eGFR、尿たんぱく、尿糖', href: '/chronic-kidney-disease', color: '#DDE9E6' },
    { title: '血液・貧血', items: '赤血球、ヘモグロビン、ヘマトクリット', href: '/biomarkers', color: '#F3DEDE' },
];

const steps = [
    { n: '1', title: '判定欄を確認する', body: '異常なし、経過観察、要再検査、要精密検査、要治療など、健診機関の指示を最初に読む。名称や区分は施設で異なる。' },
    { n: '2', title: '今年の値を、過去と並べる', body: '基準範囲内でも毎年同じ方向へ動いていないかを見る。測定条件や薬の変更も一緒に記録する。' },
    { n: '3', title: '関連する数字をセットで見る', body: 'LDLだけ、ALTだけで結論を出さず、血圧・血糖・脂質・腹囲・腎機能などの重なりを見る。' },
    { n: '4', title: '期限を決めて次へ進む', body: '再検査や受診を「時間ができたら」にしない。結果票と過去データ、服薬・サプリ一覧を持参する。' },
];

export default function HealthCheckGuidePage() {
    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#FFF1DF' }}>
            <img loading="lazy" decoding="async" src="/images/for-you/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block" style={{ top: 0, right: '-40px', width: '260px', transform: 'scaleY(-1)' }} />
            <img loading="lazy" decoding="async" src="/images/misc/24.png" alt="" className="absolute pointer-events-none" style={{ bottom: '-40px', left: '-40px', width: '260px' }} />
            <JsonLd data={medicalWebPage({ name: '40代の健康診断の読み方', description: '結果票を点数表ではなく、経年変化と次の行動を決める地図として読む。', path: '/health-check-guide' })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: '身体の地図', path: '/library#map' }, { name: '健康診断の読み方', path: '/health-check-guide' }])} />

            <article className="max-w-[860px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '身体の地図', href: '/library#map' }, { name: '健康診断の読み方' }]} />
                <header className="mb-12 text-center"><p className="text-xs tracking-widest font-bold mb-2 text-[#D67845]">HEALTH CHECK GUIDE</p><h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#1A1A1A]">40代の健康診断の読み方</h1><p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-relaxed max-w-[630px] mx-auto">結果票は、健康の点数表ではありません。<strong>今の位置、去年からの方向、次にすること</strong>を確認するための地図です。</p></header>

                <div className="mb-10 rounded-2xl p-5 border border-[#D67845] bg-white/70"><p className="text-sm text-[#1A1A1A]/85 leading-relaxed"><strong className="text-[#D67845]">はじめに：</strong>健診は病気を確定する診断ではなく、リスクや異常の可能性を見つけるスクリーニングです。基準値は健診機関や測定法で異なることがあります。結果票の判定と医師の指示を優先してください。</p></div>

                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black"><h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#D67845] pl-3">最初に知っておきたい3つの違い</h2><div className="space-y-3">{[
                    ['基準範囲', '多くの人の測定値などをもとに定める範囲。範囲内なら将来の病気がゼロ、範囲外なら病気確定、という線ではない。'],
                    ['診断基準', '病気を診断するために学会などが定めた条件。症状、再検査、他の検査を含めて医師が判断する。'],
                    ['管理目標', '診断後に目指す値。年齢、持病、薬、副作用リスクなどによって一人ひとり異なる。'],
                ].map(([h, b]) => <div key={h} className="grid sm:grid-cols-[110px_1fr] gap-1 sm:gap-4 bg-white/60 rounded-xl p-4 border border-[#1A1A1A]/15"><div className="font-bold text-[#D67845]">{h}</div><p className="text-sm text-[#4A4A4A] leading-relaxed">{b}</p></div>)}</div></section>

                <section className="mb-10"><h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#D67845] pl-3">結果票を読む4ステップ</h2><div className="space-y-3 mt-5">{steps.map((s) => <div key={s.n} className="flex gap-4 bg-white/70 rounded-2xl p-5 border border-black"><span className="w-9 h-9 shrink-0 rounded-full bg-[#D67845] text-white flex items-center justify-center font-bold">{s.n}</span><div><h3 className="font-bold text-[#1A1A1A] mb-1">{s.title}</h3><p className="text-sm text-[#4A4A4A] leading-relaxed">{s.body}</p></div></div>)}</div></section>

                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black"><h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#D67845] pl-3">項目を臓器と仕組みにつなげる</h2><p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">一つの数字は一つの臓器だけを表すとは限りません。まずは大きなグループで眺め、個別ページで深掘りします。</p><div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{groups.map((g) => <Link key={g.title} href={g.href} className="group rounded-xl p-4 border border-black hover:-translate-y-0.5 hover:shadow-sm transition-all" style={{ background: g.color }}><div className="font-bold text-[#1A1A1A] mb-1">{g.title} →</div><p className="text-xs text-[#4A4A4A] leading-relaxed">{g.items}</p></Link>)}</div></section>

                <section className="mb-10 rounded-2xl p-6 md:p-8 border border-[#3C8276] bg-[#EDF7F4]"><h2 className="text-xl font-bold text-[#1A1A1A] mb-3">「要再検査」と「要精密検査」は目的が違う</h2><p className="text-sm text-[#4A4A4A] leading-loose"><strong>再検査</strong>は、一時的な変動か、異常が続いているかをもう一度確かめる検査。<strong>精密検査</strong>は、異常の原因や病気の有無を詳しく調べる検査です。どちらも病気が確定した意味ではありませんが、指定された期限や診療科を確認し、放置しないことが大切です。</p></section>

                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black"><h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#D67845] pl-3">健診と、がん検診は別に確認する</h2><p className="text-[#4A4A4A] leading-loose">特定健診や一般健康診断は、主に生活習慣病などを早く見つけるものです。国が推奨するがん検診には、対象年齢・検査方法・受診間隔が別にあります。人間ドックの<strong>腫瘍マーカーだけで、がんの有無を判断することはできません</strong>。結果票では「健康診断」と「がん検診」の欄を分けて確認します。</p><div className="mt-4"><a href="https://ganjoho.jp/public/pre_scr/screening/about_scr01.html" target="_blank" rel="noreferrer" className="text-sm font-bold underline decoration-[#D67845] decoration-2 underline-offset-2">国立がん研究センター：がん検診について →</a></div></section>

                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black"><h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#D67845] pl-3">相談時に持っていくもの</h2><ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">{['今回と過去数年の結果票', '家庭血圧など日常の記録', '服用中の薬・サプリ一覧', '症状と始まった時期', '家族の病歴', '再検査・精密検査の案内'].map((x) => <li key={x} className="flex gap-2 bg-white rounded-xl p-3 border border-[#1A1A1A]/15 text-sm"><span className="text-[#41C9B4] font-bold">✓</span>{x}</li>)}</ul></section>

                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black"><h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#D67845] pl-3">検査項目を詳しく見る</h2><div className="flex flex-wrap gap-2">{[{ href: '/biomarkers', label: '血液検査一覧' }, { href: '/metabolic-syndrome', label: 'メタボリックシンドローム' }, { href: '/chronic-kidney-disease', label: 'CKD' }, { href: '/fatty-liver', label: '脂肪肝' }, { href: '/library', label: 'Library 全体' }].map((l) => <Link key={l.href} href={l.href} className="px-4 py-2 rounded-full bg-white border border-black text-sm font-bold hover:bg-[#41C9B4] hover:text-white">{l.label} →</Link>)}</div></section>

                <section className="mb-10 text-xs text-[#4A4A4A]/70 leading-relaxed"><h2 className="font-bold text-[#1A1A1A] mb-2">主な参考情報</h2><ul className="list-disc pl-5 space-y-1"><li><a className="underline hover:text-[#D67845]" href="https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000194155_00004.html" target="_blank" rel="noreferrer">厚生労働省「標準的な健診・保健指導プログラム（令和6年度版）」</a></li><li><a className="underline hover:text-[#D67845]" href="https://kennet.mhlw.go.jp/information/information/metabolic/m-04-005.html" target="_blank" rel="noreferrer">厚生労働省「特定健康診査の検査項目」</a></li><li><a className="underline hover:text-[#D67845]" href="https://ganjoho.jp/public/dia_tre/inspection/marker.html" target="_blank" rel="noreferrer">国立がん研究センター「腫瘍マーカー検査とは」</a></li></ul></section>

                <div className="text-center"><Link href="/library#map" className="inline-block px-8 py-3 bg-white border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white">← 身体の地図に戻る</Link></div>
            </article>
        </div>
    );
}
