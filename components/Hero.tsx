import Image from 'next/image';

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
            <div className="max-w-[1000px] w-full mx-auto px-4 py-20 relative z-10">
                <div className="text-right">
                    <h1
                        className="text-5xl md:text-7xl font-bold leading-tight mb-6"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                        <span className="block">STRATEGY FOR</span>
                        <span className="block">YOUR HEALTH</span>
                        <span className="block">AFTER 40</span>
                    </h1>
                    <p
                        className="text-lg md:text-xl text-[#333333] leading-relaxed"
                        style={{
                            writingMode: 'horizontal-tb',
                            maxWidth: '500px',
                            marginLeft: 'auto'
                        }}
                    >
                        40代からはじめる健康戦略。<br />
                        ミトコンドリアから、人生をフローさせる。
                    </p>
                </div>
            </div>

            {/* Hero Illustration - Bottom Left */}
            <div className="absolute bottom-0 left-0 w-[350px] md:w-[550px] h-[350px] md:h-[550px] z-10 pointer-events-none">
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
