import Link from 'next/link';
import FadeOnScroll from './FadeOnScroll';

const steps = [
    {
        number: '01',
        title: 'ご連絡・ご相談',
        description:
            'まずはお気軽にご連絡ください。健康に関する悩みや気になることを簡単で大丈夫ですのでお伝えください。',
    },
    {
        number: '02',
        title: 'データ提出',
        description:
            '血液検査のデータの提出や、こちらからお送りするカウンセリングシートをご記入いただきます。提出が済みましたら、解析を進めていきます。',
    },
    {
        number: '03',
        title: 'セッション',
        description:
            'カウンセリングシートや血液検査を解析した結果から、考えられる健康対策アドバイスをお伝えしていきます。合わせて解析サンプルもお渡しいたします。',
        hasButton: true,
        buttonText: '解析サンプル',
        buttonLink: 'https://elegant-gingersnap-97643e.netlify.app/',
    },
    {
        number: '04',
        title: 'アドバイスの実践',
        description:
            '見えてきた健康対策を実践していただきます。難しいこともあるかもしれませんが、できることからはじめていただきます。',
    },
    {
        number: '05',
        title: 'フィードバック（二回目のセッション）',
        description:
            'まずは2-3週間ほど実践してみてください。その後、感想や体感の変化を共有してもらいながら、必要に応じて調整していきます。',
    },
    {
        number: '06',
        title: 'セッション・実践の繰り返し',
        description:
            '翌月以降はセッションと実践の繰り返しになります。身体から返ってくる違いを楽しみましょう！',
    },
];

export default function Flow() {
    return (
        <section id="flow" className="py-24 bg-[#FFB37B] border-t border-[#1A1A1A]">
            <div className="max-w-[800px] mx-auto px-4">
                <FadeOnScroll>
                    <div className="text-center mb-12">
                        <h2 className="font-[family-name:var(--font-main)] text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-2">
                            FLOW
                        </h2>
                        <p className="text-[#4A4A4A]">ご利用の流れ</p>
                    </div>
                </FadeOnScroll>

                <div className="space-y-0">
                    {steps.map((step, index) => (
                        <FadeOnScroll key={index} delay={index * 0.1}>
                            <div
                                className="flex gap-8 py-8 border-b border-[#1A1A1A] last:border-b-0 items-start"
                            >
                                <div className="font-[family-name:var(--font-main)] text-5xl font-bold text-black/20 flex-shrink-0">
                                    {step.number}
                                </div>
                                <div className="flex-grow">
                                    <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">{step.title}</h3>
                                    <p className="text-[#4A4A4A]">{step.description}</p>
                                    {step.hasButton && (
                                        <Link
                                            href={step.buttonLink || '#'}
                                            target="_blank"
                                            className="inline-block mt-4 px-6 py-3 bg-[#FF9855] text-[#1A1A1A] border border-[#1A1A1A] rounded-full text-sm font-semibold hover:bg-[#FF8030] hover:text-white transition-colors"
                                        >
                                            {step.buttonText}
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </FadeOnScroll>
                    ))}
                </div>
            </div>
        </section>
    );
}
