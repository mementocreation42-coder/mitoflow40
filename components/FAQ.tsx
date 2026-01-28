'use client';

import { useState } from 'react';

const faqItems = [
    {
        question: 'Q. どんな人が対象ですか？',
        answer:
            'A. 40代以降の方で、疲れやすさ、集中力の低下、睡眠の質の悪化など、加齢に伴う不調を感じている方が対象です。特に、健康診断では問題がないのに「なんとなく調子が悪い」と感じている方に最適です。',
    },
    {
        question: 'Q. 医療行為ですか？',
        answer:
            'A. いいえ、MitoFlow40は医療行為ではありません。健康戦略のアドバイスとサポートを提供するサービスです。診断や治療を行うものではなく、ライフスタイルの最適化をお手伝いします。',
    },
    {
        question: 'Q. どのくらいで効果を感じられますか？',
        answer:
            'A. 個人差はありますが、多くの方が2〜4週間程度で体調の変化を感じ始めます。持続的な効果を得るためには、3ヶ月以上の継続をおすすめしています。',
    },
    {
        question: 'Q. 特別な道具やサプリメントが必要ですか？',
        answer:
            'A. 特別な道具は必要ありませんが、サプリメントは足りない栄養素の補助として、スタート時は必須と考えています。まずは今の生活の中でできること（食事、休息、時間の使い方など）を整えつつ、補うためのサプリを各自ご購入いただくことをおすすめしております。',
    },
    {
        question: 'Q. 子どもにも適用できますか？',
        answer:
            'A. はい、ミトフロー40はフワッとした健康知識ではなく、生化学に基づいて設計しております。ですので、ご自身が実践されたことを学んでいただき、例えばお子さんの"食育"として機能させることも可能です。',
    },
    {
        question: 'Q. 栄養学についての学びを得られる制度はありますか？',
        answer:
            'A. いいえ、学びを得られる制度はございませんが、実践から多くを学んでいただくことは可能です。是非学ぶ姿勢で挑んでいただけたら、より健康的なカラダとなると感じています。',
    },
    {
        question: 'Q. 支払い方法は何がありますか？',
        answer:
            'A. 銀行振込、またはPayPalでのお支払いが可能です。詳細はお問い合わせ時にご案内いたします。',
    },
    {
        question: 'Q. 自己免疫疾患を抱えていますが、可能でしょうか？',
        answer:
            'A. はい、自己免疫疾患をお持ちの方でもご利用いただけます。ただし、現在の投薬内容や治療方針によっては注意が必要な場合がありますので、主治医の判断を確認してからのご利用をおすすめしています。事前に服用中のお薬や体調について簡単に共有いただければ、主治医の判断を最優先とし、サポートいたします。',
    },
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleItem = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" className="py-24 bg-[#E5D0E3] border-t border-[#1A1A1A]">
            <div className="max-w-[1000px] mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="font-[family-name:var(--font-main)] text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-2">
                        FAQ
                    </h2>
                    <p className="text-[#4A4A4A]">よくある質問</p>
                </div>

                <div className="max-w-[800px] mx-auto space-y-4">
                    {faqItems.map((item, index) => (
                        <div
                            key={index}
                            className="border border-[#1A1A1A] rounded-lg overflow-hidden bg-white"
                        >
                            <button
                                className="w-full flex justify-between items-center p-4 text-left font-semibold text-[#1A1A1A] hover:bg-gray-50 transition-colors"
                                onClick={() => toggleItem(index)}
                            >
                                <span>{item.question}</span>
                                <span className="text-xl ml-4 flex-shrink-0">
                                    {openIndex === index ? '-' : '+'}
                                </span>
                            </button>
                            <div
                                className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96' : 'max-h-0'
                                    }`}
                            >
                                <div className="p-4 pt-0 text-[#4A4A4A] border-t border-gray-200">
                                    {item.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
