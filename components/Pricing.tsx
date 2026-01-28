import Image from 'next/image';
import Link from 'next/link';
import FadeOnScroll from './FadeOnScroll';

const pricingPlans = [
    {
        title: 'ミトフロープラン',
        price: '¥9,900',
        period: '/月（税込）',
        description: 'ミニマム3ヶ月から（血液検査解析付き）',
        features: [
            '月1-2回のセッション',
            '血液検査解析から考えられる健康戦略を立案',
            '状況に応じた柔軟な対応',
        ],
        featured: true,
    },
    {
        title: '血液検査解析プラン',
        price: '¥19,800',
        period: '/回（税込）',
        features: [
            '血液検査解析から考えられる健康戦略を立案',
            '最適な戦略アドバイスデータを共有',
            '一回のセッション',
        ],
        featured: false,
        hasButton: true,
        buttonText: '解析サンプル',
        buttonLink: 'https://elegant-gingersnap-97643e.netlify.app/',
    },
];

export default function Pricing() {
    return (
        <section id="pricing" className="relative py-24 bg-[#4AF6C3] border-t border-[#1A1A1A] overflow-hidden">
            <div className="max-w-[800px] mx-auto px-4 relative z-10">
                <FadeOnScroll>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            PRICE
                        </h2>
                        <p className="text-[#4A4A4A]">料金プラン</p>
                    </div>
                </FadeOnScroll>

                <FadeOnScroll delay={0.2}>
                    <div className="grid md:grid-cols-2 gap-8 max-w-[800px] mx-auto">
                        {pricingPlans.map((plan, index) => (
                            <div
                                key={index}
                                className={`border-2 border-[#1A1A1A] rounded-xl p-10 text-center ${plan.featured ? 'bg-[#7FFFD4]/50' : 'bg-[#7FFFD4]/30'
                                    }`}
                            >
                                <div className="mb-6">
                                    <h3 className="text-xl font-bold text-[#1A1A1A] mb-4">{plan.title}</h3>
                                    <div className="text-4xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                        {plan.price}
                                        <span className="text-base font-normal opacity-80">{plan.period}</span>
                                    </div>
                                    {plan.description && (
                                        <p className="text-sm mt-2 text-[#1A1A1A]">{plan.description}</p>
                                    )}
                                </div>

                                <ul className="text-left my-8 space-y-3">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-start text-[#1A1A1A]">
                                            <span className="mr-2 flex-shrink-0">→</span>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                {plan.hasButton && (
                                    <div className="mt-8">
                                        <Link
                                            href={plan.buttonLink || '#'}
                                            target="_blank"
                                            className="inline-block px-6 py-3 bg-[#4DD0E1] text-[#1A1A1A] border border-[#1A1A1A] rounded-full text-sm font-semibold hover:bg-[#26C6DA] hover:text-white transition-colors"
                                        >
                                            {plan.buttonText}
                                        </Link>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </FadeOnScroll>
            </div>

            {/* Background Illustration */}
            <Image
                src="/images/pricing-illustration-bg.png"
                alt=""
                width={350}
                height={350}
                className="absolute bottom-[-50px] left-[-50px] w-[250px] md:w-[350px] h-auto object-contain pointer-events-none opacity-90 z-0"
            />
        </section>
    );
}
