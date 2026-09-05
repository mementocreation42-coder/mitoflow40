import Link from 'next/link';
import { PLANS, formatJpy } from '@/lib/products';

// ライブラリ → 解析プランへの導線。病態・検査項目・症状ページの末尾に置く。
// 文言は「読んで終わり」から「自分の数値で確かめる」への橋渡し。押し売りにしない。
export default function AnalysisCta({ variant = 'biomarker' }: { variant?: 'biomarker' | 'condition' | 'symptom' }) {
    const analysis = PLANS.find((p) => p.id === 'analysis');
    const headline = {
        biomarker: 'この数値、自分の場合はどう読む？',
        condition: '自分の血液データで、この状態を確かめる',
        symptom: 'この不調の背景を、血液データから探る',
    }[variant];
    const body = {
        biomarker: '基準値は「多くの人がこの範囲」を示すだけで、あなたにとっての最適は別にあります。手元の検査結果を入れて位置を確かめるか、他の項目と合わせて読み解く解析に進めます。',
        condition: '病態の説明は一般論です。あなたの検査結果・問診・生活ログを合わせて読むと、「当てはまるのか、別の背景なのか」が見えてきます。',
        symptom: '症状から背景を絞り込むには、血液検査の数値が最短の手がかりです。手元の結果を入れて位置を確かめるか、まとめて読み解く解析に進めます。',
    }[variant];

    return (
        <section className="mb-12 rounded-2xl border-2 border-[#1A1A1A] p-6 md:p-8" style={{ background: '#D5F5EC' }}>
            <p className="text-[10px] tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>YOUR DATA</p>
            <h2 className="text-lg md:text-xl font-bold text-[#1A1A1A] mb-2">{headline}</h2>
            <p className="text-sm text-[#4A4A4A] leading-relaxed mb-5">{body}</p>
            <div className="flex flex-wrap gap-3">
                <Link href="/biomarkers/reader" className="inline-block px-5 py-2.5 rounded-full text-sm font-bold border border-[#1A1A1A] bg-white text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-colors" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    検査値リーダーで確かめる（無料）
                </Link>
                <Link href="/plans" className="inline-block px-5 py-2.5 rounded-full text-sm font-bold bg-[#1A1A1A] text-white hover:opacity-90 transition" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    解析プランを見る{analysis && analysis.priceJpy > 0 ? `（${formatJpy(analysis.priceJpy)}〜）` : ''} →
                </Link>
            </div>
        </section>
    );
}
