import Image from 'next/image';
import FadeOnScroll from './FadeOnScroll';

export default function About() {
    return (
        <section id="about" className="relative py-24 bg-[#4AABDE] border-t border-[#1A1A1A] overflow-hidden">
            <div className="max-w-[800px] mx-auto px-4 relative z-10">
                <FadeOnScroll>
                    <div className="text-center mb-12">
                        <h2 className="font-[family-name:var(--font-main)] text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-2">
                            ABOUT
                        </h2>
                        <p className="text-[#1A1A1A]/80">Mitoflow40とは</p>
                    </div>
                </FadeOnScroll>

                <FadeOnScroll delay={0.2}>
                    <div className="grid gap-8">
                        <h3
                            className="text-2xl md:text-4xl font-bold leading-tight text-[#1A1A1A]"
                            style={{ fontFamily: "'Noto Sans JP', sans-serif" }}
                        >
                            40代。<br />
                            それはカラダの本当の声が<br />
                            無視できなくなる年齢。
                        </h3>

                        <div className="space-y-6 text-[#1A1A1A] bg-white/30 backdrop-blur-sm p-6 rounded-2xl border border-[#1A1A1A]">
                            <p>
                                私たちの体には、エネルギーを生み出す「ミトコンドリア」が存在します。しかし、40代を境にその機能は低下し、疲労や活力不足の原因となります。
                            </p>
                            <p>
                                Mitoflow40は、ミトコンドリアを起点に「食事・運動・習慣・サプリ」の4本柱でカラダの流れを整える健康戦略です。一過性の対策ではなく、今の自分を正しく整える知恵と技術で、暮らしを再設計する。流れが整えば、人生は再び劇的な変化を遂げ始めます。
                            </p>
                            <p>
                                言いかえれば、Mitoflow40は「病気になってから治す」のではなく、その手前の“未病”のうちに整える——<strong>未病予防への取り組み</strong>です。病気を防ぐだけでなく、本来の活力を引き出すことを目指します。
                            </p>
                        </div>
                    </div>
                </FadeOnScroll>

                <FadeOnScroll delay={0.3}>
                    <div className="mt-16 grid gap-8">
                        <h3
                            className="text-2xl md:text-4xl font-bold leading-tight text-[#1A1A1A]"
                            style={{ fontFamily: "'Noto Sans JP', sans-serif" }}
                        >
                            ミトコンドリア・ラブ
                        </h3>

                        <div className="space-y-6 text-[#1A1A1A] bg-white/30 backdrop-blur-sm p-6 rounded-2xl border border-[#1A1A1A]">
                            <p>
                                栄養学を学んでいくうちに、私がいちばん心を動かされたのが「ミトコンドリア」という存在でした。エネルギーを生む小さな器官——そう習っただけでは、この感動は伝わりません。
                            </p>
                            <p>
                                もともとミトコンドリアは、私たちの祖先の細胞とは<strong>別の生きもの</strong>でした。太古の昔、外からやってきた微生物が細胞の中に棲みつき、追い出されるのではなく、互いに支え合う<strong>共生</strong>の関係を選んだ。その出会いが、酸素をエネルギーに変える力を手に入れる転機となり、いまの複雑な生命への扉を開いたと考えられています。
                            </p>
                            <p>
                                しかも彼らは、いまも<strong>独自のDNA</strong>を持ち続けています。数十億年前の“同居のはじまり”の記憶を、私たちは一つひとつの細胞の中に抱えて生きているのです。その重さは、細胞のおよそ<strong>1割</strong>を占めるとも言われます。
                            </p>
                            <p>
                                そしてもう一つ、心を打たれた事実があります。ミトコンドリアは、父からではなく<strong>母から受け継がれる</strong>ということ。あなたの細胞で今日も働くこの器官は、母から、その母から——命がつながってきた<strong>母系の贈り物</strong>なのです。
                            </p>
                            <p>
                                自分の体の中に、かつて他者だった存在が、そして母から受け継いだ存在が息づいている。その事実を知ったとき、健康とは「自分を管理すること」ではなく、<strong>共に生きる相手をいたわること</strong>——受け取った贈り物を<strong>大切に守り育てること</strong>なのだと気づかされました。Mitoflow40の出発点には、この小さな同居人への敬意——ミトコンドリア・ラブがあります。
                            </p>
                        </div>
                    </div>
                </FadeOnScroll>
            </div>

            {/* Background Illustration */}
            <Image
                src="/images/about/about-illustration-bg.png"
                alt=""
                width={450}
                height={450}
                className="absolute bottom-[-50px] right-[-50px] w-[350px] md:w-[450px] h-auto object-contain pointer-events-none opacity-90 z-0"
            />
        </section>
    );
}
