import Image from 'next/image';

const benefits = [
    {
        image: '/images/experience_vitality_new.png',
        alt: 'Vitality',
        text: '朝目覚めた瞬間からエネルギーが満ち溢れる感覚。日中の倦怠感を払拭し、アクティブな毎日へ。',
    },
    {
        image: '/images/experience_focus_new.png',
        alt: 'Focus',
        text: '霧が晴れたようなクリアな思考。集中力が持続し、クリエイティブな作業もスムーズに。',
    },
    {
        image: '/images/experience_sleep_new.png',
        alt: 'Sleep',
        text: '深く質の高い睡眠がもたらす、朝の爽快感。夜はぐっすり、朝まで途切れない休息を。',
    },
];

export default function Benefits() {
    return (
        <section id="benefits" className="py-24 bg-[#FFB6B6] border-t border-[#1A1A1A]">
            <div className="max-w-[800px] mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="font-[family-name:var(--font-main)] text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-2">
                        EXPERIENCE
                    </h2>
                    <p className="text-[#4A4A4A]">得られる体験</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 justify-center">
                    {benefits.map((benefit, index) => (
                        <div
                            key={index}
                            className="bg-white/30 border border-[#555555] rounded-xl overflow-hidden transition-transform hover:-translate-y-1"
                        >
                            <div className="w-full h-60 overflow-hidden bg-transparent border-b border-[#555555]">
                                <Image
                                    src={benefit.image}
                                    alt={benefit.alt}
                                    width={400}
                                    height={240}
                                    className="w-full h-full object-cover object-top"
                                />
                            </div>
                            <div className="p-6 text-[#1A1A1A]">
                                <p>{benefit.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
