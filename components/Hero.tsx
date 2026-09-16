import Image from 'next/image';
import GameLauncher from './game/GameLauncher';
import FadeOnScroll from './FadeOnScroll';
import HeroMotion from './HeroMotion';

export default function Hero() {
    return (
        <section id="hero" className="relative min-h-[90vh] flex items-center overflow-hidden">
            {/* Background Image */}
            <Image
                src="/images/hero/hero-bg-new.png"
                alt=""
                fill
                className="object-cover object-center z-0 mf-hero-bg"
                priority
                unoptimized
            />

            {/* Content */}
            <div className="max-w-[800px] w-full mx-auto px-4 py-20 relative z-10">
                <div className="text-right">
                    <h1
                        className="text-5xl md:text-7xl font-bold leading-tight mb-6"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                        <FadeOnScroll delay={0.1}>
                            <span className="block">STRATEGY FOR</span>
                        </FadeOnScroll>
                        <FadeOnScroll delay={0.2}>
                            <span className="block">YOUR HEALTH</span>
                        </FadeOnScroll>
                        <FadeOnScroll delay={0.3}>
                            <span className="block">AFTER 40</span>
                        </FadeOnScroll>
                    </h1>
                    <div className="mb-64 md:mb-0">
                        <FadeOnScroll delay={0.5}>
                            <p
                                className="text-lg md:text-xl text-[#333333] leading-relaxed font-bold relative z-20 mb-4"
                                style={{
                                    writingMode: 'horizontal-tb',
                                    maxWidth: '500px',
                                    marginLeft: 'auto'
                                }}
                            >
                                40代からはじめる健康戦略。<br />
                                ミトコンドリアから、人生をフローさせる。
                            </p>
                        </FadeOnScroll>
                        <FadeOnScroll delay={0.7}>
                            <GameLauncher
                                className="relative z-20 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-[#1A1A1A] text-xs font-bold text-[#1A1A1A] hover:bg-[#FF9855] transition-colors"
                                style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                <span className="text-[10px] tracking-widest">PLAY</span>
                                <span className="font-bold" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>走れミトス</span>
                                <span aria-hidden="true">▶</span>
                            </GameLauncher>
                        </FadeOnScroll>
                    </div>
                </div>
            </div>

            {/* Hero Illustration - Bottom Left（部品ごとに漂う透過動画。静止画は poster と fallback） */}
            <HeroMotion />
        </section>
    );
}
