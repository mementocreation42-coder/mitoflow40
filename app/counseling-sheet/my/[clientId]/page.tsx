import { notFound } from 'next/navigation';
import Link from 'next/link';
import { formatDateTime, questionnaireEntries, FILE_KIND_LABEL } from '@/lib/intake';
import { getCustomer } from '@/lib/customers';
import { ORDER_STATUS_LABEL } from '@/lib/orders';
import { getPlan, formatJpy, isPlanPurchasable, PLANS } from '@/lib/products';
import { isStripeConfigured } from '@/lib/stripe';
import AddMore from './AddMore';
import ManageBillingButton from '@/components/ManageBillingButton';
import CheckoutButton from '@/components/CheckoutButton';

// クライアント本人のマイページ。clientId（メールのHMAC）を知っている人だけが開ける。
// 登録内容の見返し＋情報の追記ができる。noindex。
export const metadata = {
    title: 'マイページ | Mitoflow40',
    robots: { index: false, follow: false },
};
export const dynamic = 'force-dynamic';

function isImage(type: string): boolean {
    return type.startsWith('image/');
}

export default async function ClientMyPage({
    params,
    searchParams,
}: {
    params: Promise<{ clientId: string }>;
    searchParams: Promise<{ new?: string }>;
}) {
    const { clientId } = await params;
    const { new: isNew } = await searchParams;
    // 顧客レコード（票・決済・レポートを同じ clientId で束ねたもの）。票が未提出でも決済があればページは出す
    const customer = await getCustomer(clientId);
    if (!customer || (!customer.intake && customer.orders.length === 0)) notFound();
    const client = customer.intake;
    const report = customer.report;
    const reports = customer.reports; // 新しい順。継続の方は複数並ぶ
    const orders = customer.orders;
    const hasBilling = orders.some((o) => o.stripeCustomerId);
    const paymentsOn = isStripeConfigured();

    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#DEEAF2' }}>
            <div className="max-w-[680px] mx-auto relative" style={{ zIndex: 1 }}>
                {/* 登録直後の完了バナー */}
                {isNew && (
                    <div className="mb-6 rounded-2xl border border-black bg-[#D7F7ED] px-5 py-4 text-center">
                        <p className="text-xs tracking-widest font-bold mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#246E58' }}>RECEIVED</p>
                        <p className="text-sm font-bold text-[#1A1A1A]">カウンセリング票を受け付けました。このページはあなた専用です。</p>
                        <p className="text-xs text-[#246E58] mt-1">ブックマークしておくと、いつでも情報を追加できます。</p>
                    </div>
                )}

                <header className="mb-8 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>MY PAGE</p>
                    <h1 className="text-2xl md:text-4xl font-bold mb-2 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        {customer.name || 'あなた'} さんのマイページ
                    </h1>
                    <p className="text-sm text-[#1A1A1A]/70 font-medium">
                        {customer.email} ・ カウンセリング票 {client?.submissionCount ?? 0} 件 ・ 最終更新 {formatDateTime(customer.lastActivityAt)}
                    </p>
                </header>

                {/* 解析結果 */}
                <section className="mb-8">
                    {report ? (
                        <Link href={`/r/${report.token}`} target="_blank" rel="noopener noreferrer"
                            className="block rounded-2xl border border-black bg-[#1A1A1A] p-6 md:p-7 hover:opacity-95 transition">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-[10px] tracking-widest font-bold mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#4AF6C3' }}>ANALYSIS REPORT{reports.length > 1 ? ' · LATEST' : ''}</p>
                                    <h2 className="text-lg md:text-xl font-bold text-white">{reports[0]?.label || '解析結果ができました'}</h2>
                                    <p className="text-xs text-white/60 mt-1">血液・生活データを統合した、あなた専用のレポート{reports[0] ? ` ・ ${formatDateTime(reports[0].addedAt).slice(0, 10)}` : ''}</p>
                                </div>
                                <span className="shrink-0 px-4 py-2 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#4AF6C3]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>見る →</span>
                            </div>
                        </Link>
                    ) : null}
                    {reports.length > 1 && (
                        <div className="mt-3 rounded-2xl border border-black bg-white/70 p-4">
                            <p className="text-[10px] tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>PAST REPORTS · これまでの解析</p>
                            <ul className="divide-y divide-[#1A1A1A]/10">
                                {reports.slice(1).map((r) => (
                                    <li key={r.token} className="py-2 flex items-center justify-between gap-3">
                                        <span className="text-sm text-[#1A1A1A]">{r.label || `${formatDateTime(r.addedAt).slice(0, 10)} の解析`}<span className="text-xs text-[#4A4A4A] ml-2">{formatDateTime(r.addedAt).slice(0, 10)}</span></span>
                                        <Link href={`/r/${r.token}`} target="_blank" rel="noopener noreferrer" className="shrink-0 text-xs font-bold underline text-[#1A1A1A]">開く →</Link>
                                    </li>
                                ))}
                            </ul>
                            <p className="text-[11px] text-[#4A4A4A] mt-2">前回との変化を見比べるときに。数値の推移は最新のレポートにも反映されています。</p>
                        </div>
                    )}
                    {!report && (
                        <div className="rounded-2xl border border-dashed border-[#1A1A1A]/30 bg-white/50 p-6 text-center">
                            <p className="text-[10px] tracking-widest font-bold mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>ANALYSIS REPORT</p>
                            <p className="text-sm font-bold text-[#1A1A1A]">解析結果は準備中です</p>
                            <p className="text-xs text-[#1A1A1A]/60 mt-1">登録いただいた情報をもとに解析を進めています。完成するとここに表示されます。</p>
                        </div>
                    )}
                </section>

                {/* ご契約・お支払い */}
                <section className="mb-8 bg-white/70 rounded-2xl p-6 md:p-7 border border-black">
                    <div className="flex items-baseline justify-between gap-3 mb-3">
                        <div>
                            <p className="text-[10px] tracking-widest font-bold mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>PLAN & BILLING</p>
                            <h2 className="text-base font-bold text-[#1A1A1A]">ご契約・お支払い</h2>
                        </div>
                        {hasBilling && <ManageBillingButton clientId={clientId} />}
                    </div>
                    {orders.length === 0 ? (
                        <div>
                            <p className="text-sm text-[#4A4A4A] leading-relaxed mb-4">
                                まだお申し込みはありません。解析や継続セッションをご希望の方は、以下からお申し込みいただけます（お支払いは Stripe の安全な画面で行われます）。
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3">
                                {PLANS.map((p) => (
                                    <div key={p.id} className="flex-1 rounded-xl border border-[#1A1A1A]/15 bg-white p-4">
                                        <p className="text-sm font-bold text-[#1A1A1A]">{p.name}</p>
                                        <p className="text-xs text-[#4A4A4A] mb-3">{p.priceJpy > 0 ? `${formatJpy(p.priceJpy)}${p.kind === 'subscription' ? '／月' : '／回'}（税込）` : '準備中'}</p>
                                        <CheckoutButton planId={p.id} clientId={clientId} disabled={!(paymentsOn && isPlanPurchasable(p))}
                                            label={paymentsOn && isPlanPurchasable(p) ? '申し込む' : '準備中'}
                                            className="inline-block px-5 py-2 rounded-full text-xs font-bold bg-[#1A1A1A] text-white"
                                            style={{ fontFamily: "'Space Grotesk', sans-serif" }} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <ul className="divide-y divide-[#1A1A1A]/10">
                            {orders.map((o) => {
                                const plan = getPlan(o.planId);
                                const good = o.status === 'paid' || o.status === 'active';
                                const warn = o.status === 'pending' || o.status === 'past_due';
                                return (
                                    <li key={o.orderId} className="py-3 flex items-start justify-between gap-4">
                                        <div className="min-w-0">
                                            <p className="text-sm font-bold text-[#1A1A1A]">{plan?.name ?? o.planName}</p>
                                            <p className="text-xs text-[#4A4A4A]">
                                                {formatJpy(o.amountJpy)}{o.kind === 'subscription' ? '／月' : ''} ・ {formatDateTime(o.createdAt)}
                                                {o.kind === 'subscription' && o.currentPeriodEnd && (o.status === 'active' || o.status === 'past_due') && (
                                                    <> ・ {o.cancelAtPeriodEnd ? '終了予定' : '次回更新'} {formatDateTime(o.currentPeriodEnd).slice(0, 10)}</>
                                                )}
                                            </p>
                                        </div>
                                        <span className="shrink-0 px-2.5 py-1 rounded-full text-[11px] font-bold border"
                                            style={good ? { background: '#D7F7ED', color: '#246E58', borderColor: '#94DFC9' } : warn ? { background: '#FFF4E0', color: '#8A5A00', borderColor: '#E5C37A' } : { background: '#F0F0F0', color: '#666', borderColor: '#D5D5D5' }}>
                                            {ORDER_STATUS_LABEL[o.status]}
                                        </span>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </section>

                {/* 追加ボタン／フォーム（票がある人）／ 未提出なら記入への導線 */}
                <div className="mb-8">
                    {client ? (
                        <AddMore name={client.name} email={client.email} />
                    ) : (
                        <div className="rounded-2xl border border-black bg-[#FFF4E0] p-6">
                            <p className="text-[10px] tracking-widest font-bold mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#8a5a00' }}>NEXT STEP</p>
                            <h2 className="text-base font-bold text-[#1A1A1A] mb-2">カウンセリング票がまだ届いていません</h2>
                            <p className="text-sm text-[#4A4A4A] leading-relaxed mb-4">解析には問診と血液検査の結果が必要です。<strong>{customer.email}</strong> でご記入いただくと、このページに自動で紐付きます。</p>
                            <Link href="/counseling-sheet" className="inline-block px-6 py-3 rounded-full text-sm font-bold bg-[#1A1A1A] text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>カウンセリング票を記入する →</Link>
                        </div>
                    )}
                </div>

                {/* 登録履歴 */}
                <div className="space-y-4">
                    {(client?.submissions ?? []).map((s, idx) => (
                        <section key={s.submissionId} className="bg-white/70 rounded-2xl p-6 md:p-7 border border-black">
                            <div className="flex items-baseline justify-between gap-3 mb-3">
                                <h2 className="text-base font-bold text-[#1A1A1A]">
                                    {idx === 0 ? '最新のカウンセリング票' : `カウンセリング票 ${(client?.submissionCount ?? 0) - idx}`}
                                </h2>
                                <span className="text-xs text-[#1A1A1A]/50 whitespace-nowrap">{formatDateTime(s.submittedAt)}</span>
                            </div>

                            {s.complaint && (
                                <div className="mb-3">
                                    <div className="text-[11px] font-bold text-[#1A1A1A]/50 mb-1">いま気になっていること・目的</div>
                                    <p className="text-sm text-[#333] leading-relaxed whitespace-pre-wrap">{s.complaint}</p>
                                </div>
                            )}
                            {s.notes && (
                                <div className="mb-3">
                                    <div className="text-[11px] font-bold text-[#1A1A1A]/50 mb-1">その他メモ</div>
                                    <p className="text-sm text-[#333] leading-relaxed whitespace-pre-wrap">{s.notes}</p>
                                </div>
                            )}

                            {questionnaireEntries(s.questionnaire).length > 0 && (
                                <div className="mb-3">
                                    <div className="text-[11px] font-bold text-[#1A1A1A]/50 mb-1">問診</div>
                                    <dl className="text-sm">
                                        {questionnaireEntries(s.questionnaire).map((e, i) => (
                                            <div key={e.label} className={`grid grid-cols-[150px_1fr] gap-4 py-2 ${i === 0 ? '' : 'border-t border-[#1A1A1A]/10'}`}>
                                                <dt className="text-[#1A1A1A]/50 break-words">{e.label}</dt>
                                                <dd className="m-0 text-[#333]">{e.value}</dd>
                                            </div>
                                        ))}
                                    </dl>
                                </div>
                            )}

                            {s.files && s.files.length > 0 && (
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3">
                                    {s.files.map((f, i) => (
                                        <a key={i} href={f.url} target="_blank" rel="noopener noreferrer" className="block p-2 bg-white rounded-xl border border-[#D5D5D5]">
                                            {isImage(f.type) ? (
                                                // eslint-disable-next-line @next/next/no-img-element
                                                <img src={f.url} alt={f.name} className="w-full h-24 object-cover rounded-lg bg-[#eff5f2]" />
                                            ) : (
                                                <div className="h-24 grid place-items-center rounded-lg bg-[#eff5f2] text-[#8a9691] font-bold text-xs">
                                                    {(f.name.split('.').pop() || 'FILE').toUpperCase()}
                                                </div>
                                            )}
                                            <div className="mt-1.5 text-[10px] font-bold text-[#4A4A4A]">{FILE_KIND_LABEL[f.kind ?? 'other']}</div>
                                            <div className="text-[11px] text-[#1A1A1A] truncate">{f.name}</div>
                                        </a>
                                    ))}
                                </div>
                            )}
                        </section>
                    ))}
                </div>

                <p className="text-[11px] text-[#1A1A1A]/50 text-center leading-relaxed mt-8">
                    このページのURLはあなた専用です。第三者に共有しないでください。
                </p>
            </div>
        </div>
    );
}
