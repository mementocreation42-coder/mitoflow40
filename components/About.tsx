import Image from 'next/image';

export default function About() {
    return (
        <section id="about" className="relative py-24 bg-[#4AABDE] border-t border-[#1A1A1A] overflow-hidden">
            <div className="max-w-[800px] mx-auto px-4 relative z-10">
                <div className="text-center mb-12">
                    <h2 className="font-[family-name:var(--font-main)] text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-2">
                        ABOUT
                    </h2>
                    <p className="text-[#1A1A1A]/80">Mitoflow40とは</p>
                </div>

                <div className="grid gap-8">
                    <h3
                        className="text-2xl md:text-4xl font-bold leading-tight text-[#1A1A1A]"
                        style={{ fontFamily: "'Noto Sans JP', sans-serif" }}
                    >
                        40代。<br />
                        それはカラダの本当の声が<br />
                        無視できなくなる年齢。
                    </h3>

                    <div className="space-y-6 text-[#1A1A1A] bg-white/30 backdrop-blur-sm p-6 rounded-xl">
                        <p>
                            私たちの体には、エネルギーを生み出す「ミトコンドリア」が存在します。しかし、40代を境にその機能は低下し、疲労や活力不足の原因となります。
                        </p>
                        <p>
                            Mitoflow40は、ミトコンドリアを起点に「食事・運動・習慣・サプリ」の4本柱でカラダの流れを整える健康戦略です。一過性の対策ではなく、今の自分を正しく整える知恵と技術で、暮らしを再設計する。流れが整えば、人生は再び劇的な変化を遂げ始めます。
                        </p>
                    </div>
                </div>
            </div>

            {/* Background Illustration */}
            <Image
                src="/images/about-illustration-bg.png"
                alt=""
                width={450}
                height={450}
                className="absolute bottom-[-50px] right-[-50px] w-[350px] md:w-[450px] h-auto object-contain pointer-events-none opacity-90 z-0"
            />
        </section>
    );
}
