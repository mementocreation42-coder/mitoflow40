import Image from 'next/image';
import Link from 'next/link';
import FadeOnScroll from './FadeOnScroll';
import CheckoutButton from './CheckoutButton';
import SampleReportModal from './SampleReportModal';
import { PLANS, formatJpy, intervalLabel, isPlanPurchasable } from '@/lib/products';
import { isStripeConfigured } from '@/lib/stripe';

// 料金セクション（トップページ・/plans 共通）。
// プラン内容・価格は lib/products.ts が唯一の定義。ここでは見た目だけを持つ。
export default function Pricing({ compact = false }: { compact?: boolean }) {
    const paymentsOn = isStripeConfigured();

    return (
        <section id="pricing" className={`relative ${compact ? 'py-12' : 'py-24 border-t border-[#1A1A1A]'} bg-[#4AF6C3] overflow-hidden`}>
            <div className="max-w-[800px] mx-auto px-4 relative z-10">
                {!compact && (
                    <FadeOnScroll>
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                PRICE
                            </h2>
                            <p className="text-[#4A4A4A]">料金プラン</p>
                        </div>
                    </FadeOnScroll>
                )}

                <FadeOnScroll delay={0.2}>
                    <div className="grid md:grid-cols-2 gap-8 max-w-[800px] mx-auto">
                        {PLANS.map((plan) => {
                            const purchasable = paymentsOn && isPlanPurchasable(plan);
                            return (
                                <div
                                    key={plan.id}
                                    className="rounded-2xl p-10 text-center bg-white/60 backdrop-blur-[2px] border border-[#1A1A1A] relative overflow-hidden flex flex-col"
                                >
                                    <div className="mb-6">
                                        <p className="text-[10px] tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>{plan.en}</p>
                                        <h3 className="text-xl font-bold text-[#1A1A1A] mb-4">{plan.name}</h3>
                                        <div className="text-4xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                            {plan.priceJpy > 0 ? formatJpy(plan.priceJpy) : '準備中'}
                                            {plan.priceJpy > 0 && (
                                                <span className="text-base font-normal opacity-80">{plan.kind === 'subscription' ? intervalLabel(plan) : '／回'}（税込）</span>
                                            )}
                                        </div>
                                        {plan.minMonths && (
                                            <p className="text-sm mt-2 text-[#1A1A1A]">ミニマム{plan.minMonths}ヶ月から（血液検査解析付き）</p>
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

                                    <div className="mt-auto relative z-10 flex flex-col items-center gap-3">
                                        <CheckoutButton
                                            planId={plan.id}
                                            disabled={!purchasable}
                                            label={purchasable ? (plan.kind === 'subscription' ? 'このプランで始める' : '申し込む') : 'オンライン申込は準備中'}
                                            className="inline-block px-7 py-3 rounded-full text-sm font-bold border border-[#1A1A1A] hover:opacity-90 transition"
                                            style={{ background: '#1A1A1A', color: '#FFFFFF', fontFamily: "'Space Grotesk', sans-serif" }}
                                        />
                                        {plan.sampleUrl && (
                                            <SampleReportModal
                                                href={plan.sampleUrl}
                                                className="inline-block px-6 py-2.5 bg-[#4DD0E1] text-[#1A1A1A] border border-[#1A1A1A] rounded-full text-xs font-semibold hover:bg-[#26C6DA] hover:text-white transition-colors cursor-pointer"
                                            >
                                                解析サンプルを見る
                                            </SampleReportModal>
                                        )}
                                    </div>

                                    {plan.highlight && (
                                        <Image
                                            src="/images/pricing/pricing-plan-illustration.png"
                                            alt=""
                                            width={150}
                                            height={150}
                                            className="absolute bottom-[-30px] right-[-30px] w-[120px] md:w-[150px] h-auto object-contain pointer-events-none opacity-90 z-0"
                                        />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </FadeOnScroll>

                <FadeOnScroll delay={0.25}>
                    <p className="mt-6 text-center text-xs text-[#1A1A1A]/70 leading-relaxed">
                        お支払いは Stripe の安全な決済画面で行われ、カード情報が当サイトに保存されることはありません。
                        <br className="hidden md:inline" />
                        <Link href="/legal" className="underline">特定商取引法に基づく表記</Link>
                        {' ・ '}
                        <Link href="/terms" className="underline">利用規約</Link>
                        {' ・ '}
                        <Link href="/plans#faq" className="underline">お支払いについて</Link>
                    </p>
                </FadeOnScroll>

                {!compact && (
                    <FadeOnScroll delay={0.3}>
                        <div className="mt-10 p-5 md:p-6 rounded-2xl border border-[#1A1A1A] bg-white/60 backdrop-blur-[2px] flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
                            <div>
                                <p className="text-xs font-bold tracking-widest mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>
                                    FREE · まず試したい方へ
                                </p>
                                <p className="text-sm md:text-base text-[#1A1A1A] font-bold">
                                    12問・約2分の無料ミトコンドリア・セルフチェック
                                </p>
                                <p className="text-xs text-[#4A4A4A] mt-1">
                                    登録不要・即時結果。自分のタイプとケアの方向性が分かります。
                                </p>
                            </div>
                            <Link href="/check"
                                className="flex-shrink-0 inline-block px-6 py-3 rounded-full font-bold text-sm hover:opacity-90 transition whitespace-nowrap"
                                style={{ background: '#1A1A1A', color: '#FFFFFF', fontFamily: "'Space Grotesk', sans-serif" }}>
                                無料解析を試す →
                            </Link>
                        </div>
                    </FadeOnScroll>
                )}
            </div>

            {/* Background Illustration */}
            <Image
                src="/images/pricing/pricing-illustration-bg.png"
                alt=""
                width={350}
                height={350}
                className="absolute bottom-[-50px] left-[-50px] w-[250px] md:w-[350px] h-auto object-contain pointer-events-none opacity-90 z-0"
            />
        </section>
    );
}
