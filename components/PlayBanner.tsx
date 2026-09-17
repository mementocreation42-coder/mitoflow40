import GameLauncher from './game/GameLauncher';

// トップページの「走れミトス」バナー。PC ではポップアップ、スマホでは /play へ。
export default function PlayBanner() {
    return (
        <section id="play" className="relative border-t border-[#1A1A1A] overflow-hidden" style={{ background: '#F7D9DE' }}>
            <div className="max-w-[800px] mx-auto px-4 py-6 md:py-8 flex items-center gap-4 md:gap-8">
                {/* 主役 */}
                <img src="/game/mito.png" alt="" className="w-[84px] md:w-[130px] shrink-0 drop-shadow-md mf-deco" style={{ animationDuration: '6s' }} />

                {/* コピー */}
                <div className="flex-1 min-w-0">
                    <p className="text-[10px] tracking-[0.3em] font-bold text-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>MITOFLOW · GAME</p>
                    <h2 className="text-2xl md:text-4xl font-bold text-[#1A1A1A] leading-tight mt-1">走れミトス</h2>
                    <p className="text-xs md:text-sm text-[#4A4A4A] leading-relaxed mt-1.5">
                        30 秒で遊べる、ミトコンドリアのランゲーム。良い食べ物で ATP を保って、コンドロスに会いに行こう。
                    </p>
                </div>

                {/* ボタン */}
                <GameLauncher
                    className="shrink-0 inline-flex flex-col items-center justify-center w-[88px] h-[88px] md:w-[110px] md:h-[110px] rounded-full bg-[#FF9855] border-2 border-[#1A1A1A] text-[#1A1A1A] shadow-[0_6px_0_#1A1A1A] hover:translate-y-0.5 hover:shadow-[0_4px_0_#1A1A1A] active:translate-y-1.5 active:shadow-none transition-all"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    <span className="text-2xl md:text-3xl leading-none" aria-hidden="true">▶</span>
                    <span className="text-[11px] md:text-xs font-bold tracking-[0.2em] mt-1">PLAY</span>
                </GameLauncher>
            </div>
        </section>
    );
}
