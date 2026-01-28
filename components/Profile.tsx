import Image from 'next/image';
import FadeOnScroll from './FadeOnScroll';

export default function Profile() {
    return (
        <section id="profile" className="py-24 bg-[#A07DB8] border-t border-[#1A1A1A]">
            <div className="max-w-[800px] mx-auto px-4">
                <FadeOnScroll>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            PROFILE
                        </h2>
                        <p className="text-[#1A1A1A]/80">プロフィール</p>
                    </div>
                </FadeOnScroll>

                <FadeOnScroll delay={0.2}>
                    <div className="grid md:grid-cols-[300px_1fr] gap-12 items-start">
                        <div className="w-full aspect-square rounded-xl overflow-hidden">
                            <Image
                                src="/images/profile.jpg"
                                alt="Daisuke Kobayashi"
                                width={300}
                                height={300}
                                className="w-full h-full object-cover object-top"
                            />
                        </div>

                        <div>
                            <span className="block text-sm tracking-widest mb-1 text-[#1A1A1A]/70">
                                DAISUKE KOBAYASHI
                            </span>
                            <h3 className="text-2xl font-bold text-[#1A1A1A] mb-2" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>
                                小林大介
                            </h3>
                            <p className="text-[#1A1A1A]/80 text-sm leading-relaxed mb-6">
                                1980年生まれ 愛知県一宮市出身徳島県在住<br />
                                ビデオグラファー / フォトグラファー / Webサービス構築 / ライター / 作家
                            </p>
                            <p className="text-[#1A1A1A] leading-relaxed">
                                40歳を迎えてから感じた、疲れや気力の低下をきっかけに、「年齢のせいか？それとも別の理由か？」という問いが芽生え、健康への関心が高まる。2025年2月より精密栄養学を軸に学び、実践を通じて劇的に体の変化を体感。持続的なエネルギー生成と体質改善へとつなげることに成功。今もなお実践中。クリエイターの感性と実践者の視点を活かし、40代からの健康戦略としてパーソナルヘルスケアをスタート。
                            </p>
                        </div>
                    </div>
                </FadeOnScroll>
            </div>
        </section>
    );
}
