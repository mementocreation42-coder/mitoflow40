import Image from 'next/image';
import FadeOnScroll from './FadeOnScroll';

export default function Hero() {
    return (
        <section id="hero" className="relative min-h-[90vh] flex items-center overflow-hidden">
            {/* Background Image */}
            <Image
                src="/images/hero-bg-new.png"
                alt=""
                fill
                className="object-cover object-center z-0"
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
                    <FadeOnScroll delay={0.5}>
                        <p
                            className="text-lg md:text-xl text-[#333333] leading-relaxed font-bold relative z-20 mb-64 md:mb-0"
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
                </div>
            </div>

            {/* Hero Illustration - Bottom Left */}
            <div className="absolute bottom-0 left-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] z-0 pointer-events-none">
                <Image
                    src="/images/hero-illustration-bl.png"
                    alt="Hero Illustration"
                    fill
                    className="object-contain object-bottom"
                />
            </div>
        </section>
    );
}
