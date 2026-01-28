import Image from 'next/image';

const forYouItems = [
    {
        image: '/images/for-you-recovery.png',
        alt: 'Recovery',
        text: '40代に入ってから急に、以前のような回復力を感じられなくなった。',
    },
    {
        image: '/images/for-you-wellness.png',
        alt: 'Unexplained Discomfort',
        text: '健康診断では問題ないのに、なんとなく不調・違和感を日々感じている。',
    },
    {
        image: '/images/for-you-business.png',
        alt: 'Business Performance',
        text: '仕事のパフォーマンスを維持・向上させたいビジネスパーソン。',
    },
    {
        image: '/images/for-you-science.png',
        alt: 'Science Approach',
        text: '流行りのダイエットや健康法に振り回されず、本質的なアプローチを求めている。',
    },
];

export default function ForYou() {
    return (
        <section id="for-you" className="relative py-24 bg-[#E8C547] border-t border-[#1A1A1A] overflow-hidden">
            <div className="max-w-[800px] mx-auto px-4 relative z-10">
                <div className="text-center mb-12">
                    <h2 className="font-[family-name:var(--font-main)] text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-2">
                        FOR YOU
                    </h2>
                    <p className="text-[#4A4A4A]">こんな人に最適</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 justify-center">
                    {forYouItems.map((item, index) => (
                        <div
                            key={index}
                            className="bg-[#FFF9C4] border border-[#555555] rounded-xl overflow-hidden flex flex-col"
                        >
                            <div className="w-full h-[200px] overflow-hidden border-b border-[#555555]">
                                <Image
                                    src={item.image}
                                    alt={item.alt}
                                    width={400}
                                    height={200}
                                    className="w-full h-full object-cover object-top"
                                />
                            </div>
                            <div className="p-6 bg-[#FFF9C4] flex-grow text-[#1A1A1A]">
                                <p>{item.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Background Illustration */}
            <Image
                src="/images/for-you-illustration-bg.png"
                alt=""
                width={400}
                height={400}
                className="absolute top-[-50px] right-[-50px] w-[300px] md:w-[400px] h-auto object-contain pointer-events-none opacity-80 z-0"
            />
        </section>
    );
}
