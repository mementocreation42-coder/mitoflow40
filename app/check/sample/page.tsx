'use client';

import { Result, ARCHETYPES, type Axis } from '../page';

// セルフチェックの結果サンプル。デモ用に固定スコア＋archetypeで表示。
// AI解析は API 呼び出し（archetype 「思考オーバーヒート」相当）

export default function CheckSamplePage() {
    const axisScores: Record<Axis, number> = {
        energy: 62,
        mental: 78,
        recovery: 42,
        flex: 55,
    };
    const total = Math.round((axisScores.energy + axisScores.mental + axisScores.recovery + axisScores.flex) / 4);
    const archetype = ARCHETYPES.overheat;
    const flags = {
        caffeineFlag: true,
        nightOwlFlag: true,
        age: 42,
        gender: 'male' as const,
        bmi: 22.4,
        ageDecade: 'mid' as const,
        bmiBand: 'normal' as const,
    };
    const context = '40-50代でこの活性度は同世代比で上位レベル。 BMIやや高め＋代謝柔軟性低めは、断食やHIITで改善余地あり。';

    return (
        <>
            <div className="pt-28 pb-3 px-4 md:px-6 text-center" style={{ background: '#B2EBF2' }}>
                <div className="inline-block px-4 py-2 rounded-full text-xs font-bold tracking-widest"
                    style={{ background: '#1A1A1A', color: '#FFFFFF', fontFamily: "'Space Grotesk', sans-serif" }}>
                    SAMPLE RESULT · 結果ページのサンプル
                </div>
                <p className="text-xs text-[#1A1A1A]/70 mt-3">これは実際の回答ではなく、結果ページの見本です。</p>
            </div>
            <Result scores={{ axisScores, total, archetype, flags, context }} onReset={() => { window.location.href = '/check'; }} />
        </>
    );
}
