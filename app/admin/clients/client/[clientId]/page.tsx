import Link from 'next/link';
import { notFound } from 'next/navigation';
import AdminHeader from '@/components/admin/AdminHeader';
import { getCustomer, listCustomers, buildTimeline, statusOf, isCustomer } from '@/lib/customers';
import { formatDateTime, questionnaireEntries, CLIENT_STATUSES, FILE_KIND_LABEL } from '@/lib/intake';
import { ORDER_STATUS_LABEL } from '@/lib/orders';
import { formatJpy } from '@/lib/products';
import { isStripeTestMode, SITE_URL } from '@/lib/stripe';
import { saveClientReport, removeClientReportAction, relinkOrderAction, saveClientMeta, deleteClientAction, deleteSubmissionAction, unsubscribeNewsletterForClient } from '../../actions';
import styles from '../../../admin.module.css';

export const metadata = { title: { absolute: 'クライアント詳細 | Mitoflow40 Admin' }, robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

function isImage(type: string): boolean {
    return type.startsWith('image/');
}

const KIND_COLOR: Record<string, string> = { order: '#8C3E25', intake: '#246E58', report: '#1e7d4f', newsletter: '#2c5aa0', check: '#8a5a00', status: '#666' };

export default async function AdminClientDetailPage({ params }: { params: Promise<{ clientId: string }> }) {
    const { clientId } = await params;
    const c = await getCustomer(clientId);
    if (!c) notFound();
    const client = c.intake;
    const timeline = buildTimeline(c);
    // 注文の付け替え候補：決済だけで票が未提出の顧客の注文（同じ名前を先頭に）／付け替え先：票を出している顧客
    const all = await listCustomers().catch(() => []);
    const norm = (x: string) => x.replace(/[\s　]/g, '');
    const orphanOrders = all.filter((x) => !x.intake && x.orders.length > 0 && x.clientId !== c.clientId)
        .flatMap((x) => x.orders.map((o) => ({ o, from: x })))
        .sort((a, b) => Number(norm(b.o.name || '') === norm(c.name)) - Number(norm(a.o.name || '') === norm(c.name)) || b.o.createdAt.localeCompare(a.o.createdAt));
    const relinkTargets = all.filter((x) => x.intake && x.clientId !== c.clientId);
    const dashboardBase = isStripeTestMode() ? 'https://dashboard.stripe.com/test' : 'https://dashboard.stripe.com';
    const myUrl = `${SITE_URL}/counseling-sheet/my/${c.clientId}`;

    // 手動の案内メール（決済 → あなたからのご案内）の下書き
    const guideMail = `mailto:${c.email}?subject=${encodeURIComponent('【Mitoflow40】お申し込みありがとうございます／カウンセリング票のご案内')}&body=${encodeURIComponent(
        `${c.name} 様\n\nMitoflow40 の小林です。お申し込みありがとうございます。\n\n解析にあたり、下記からカウンセリング票（問診・血液検査の結果・Apple Watch などの記録）をご記入ください。\nお支払いと同じメールアドレス（${c.email}）でご記入いただくと、自動で紐付きます。\n\n${SITE_URL}/counseling-sheet\n\nご記入後、内容を確認して解析を進めます。ご不明点はこのメールにご返信ください。\n\n小林大介 / Mitoflow40`,
    )}`;

    return (
        <div className={styles.shell}>
            <AdminHeader active="clients" back={{ href: '/admin/clients', label: 'クライアント一覧' }} />

            <main className={styles.main} style={{ maxWidth: 860 }}>
                <p className={styles.eyebrow}>Client</p>
                <div className={styles.titleRow}>
                    <div>
                        <h1 className={styles.title}>{c.name}</h1>
                        <p className={styles.description}>
                            <a href={`mailto:${c.email}`} style={link}>{c.email}</a>
                            {(c.gender || c.age) && <> ・ {[c.gender, c.age && `${c.age}歳`].filter(Boolean).join(' ')}</>}
                            {' ・ '}初回 {formatDateTime(c.firstSeenAt)} ・ 最終 {formatDateTime(c.lastActivityAt)}
                        </p>
                    </div>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                        <a href={guideMail} className={styles.newButton} style={{ border: '1px solid #1a1a1a', textDecoration: 'none' }}>✉ 案内メールを書く</a>
                    </div>
                </div>

                {/* 概要バッジ */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 14 }}>
                    <Badge tone={statusOf(c) === '完了' ? 'ok' : statusOf(c) === '未対応' ? 'bad' : 'warn'}>{statusOf(c)}</Badge>
                    {c.paidPlan ? <Badge tone="orange">¥ {c.paidPlan}{c.activeSubscription ? '（契約中）' : ''}</Badge> : <Badge>決済なし</Badge>}
                    {client ? <Badge>票 {client.submissionCount} ・ 添付 {client.fileCount}</Badge> : <Badge tone="bad">カウンセリング票 未提出</Badge>}
                    {c.report ? <Badge tone="ok">レポート紐付け済</Badge> : <Badge>レポートなし</Badge>}
                    {c.newsletter ? <Badge tone={c.newsletter.status === 'active' ? 'blue' : 'plain'}>レター {c.newsletter.status === 'active' ? '購読中' : c.newsletter.status === 'pending' ? '確認待ち' : '解除'}</Badge> : <Badge>レター未登録</Badge>}
                    {c.checks.length > 0 && <Badge tone="warn">セルフチェック {c.checks.length} 回</Badge>}
                    <span style={{ ...badge, fontFamily: 'ui-monospace, Menlo, monospace' }}>ID {c.clientId}</span>
                </div>

                {/* マイページ */}
                <div style={{ marginTop: 14, padding: '10px 14px', background: '#F5FCFA', border: '1px solid #B8E4D7', borderRadius: 12, fontSize: 12, color: '#246E58' }}>
                    本人用マイページ：<a href={myUrl} target="_blank" rel="noopener noreferrer" style={{ ...link, wordBreak: 'break-all' }}>{myUrl}</a>
                    <span style={{ color: '#69716e' }}>（決済状況・提出内容・解析結果が本人に見えるページ。{client ? '登録内容の追記もここから' : '票が未提出でも決済状況は表示されます'}）</span>
                </div>

                {!client && isCustomer(c) && (
                    <div style={{ ...panel, marginTop: 16, background: '#fff4e0', borderColor: '#e5c37a' }}>
                        <h2 style={{ ...h2, color: '#8a5a00' }}>次の一手：案内メール</h2>
                        <p style={{ margin: '6px 0 0', fontSize: 13, color: '#6b4a00', lineHeight: 1.7 }}>
                            決済はありますが、カウンセリング票がまだ届いていません。右上の「案内メールを書く」で、カウンセリング票のリンク入りのメール下書きが開きます。
                        </p>
                    </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: 16, marginTop: 16 }}>
                    {/* タイムライン */}
                    <section style={panel}>
                        <h2 style={h2}>タイムライン</h2>
                        {timeline.length === 0 ? <p style={muted}>記録はまだありません。</p> : (
                            <ol style={{ listStyle: 'none', margin: '10px 0 0', padding: 0, display: 'grid', gap: 10 }}>
                                {timeline.slice(0, 20).map((e, i) => (
                                    <li key={i} style={{ display: 'grid', gridTemplateColumns: '10px 1fr', gap: 10 }}>
                                        <span style={{ width: 10, height: 10, borderRadius: 5, marginTop: 4, background: KIND_COLOR[e.kind] }} />
                                        <div style={{ fontSize: 12 }}>
                                            <div style={{ color: '#777', fontSize: 11, fontVariantNumeric: 'tabular-nums' }}>{formatDateTime(e.at)}</div>
                                            <div style={{ fontWeight: 700, color: '#1a1a1a' }}>{e.href ? <Link href={e.href} style={{ color: '#1a1a1a' }}>{e.title}</Link> : e.title}</div>
                                            {e.detail && <div style={{ color: '#555' }}>{e.detail}</div>}
                                        </div>
                                    </li>
                                ))}
                            </ol>
                        )}
                    </section>

                    <div style={{ display: 'grid', gap: 16, alignContent: 'start' }}>
                        {/* ご契約・決済 */}
                        <section style={panel}>
                            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12 }}>
                                <h2 style={h2}>ご契約・決済</h2>
                                <Link href="/admin/orders" style={{ ...link, fontSize: 12 }}>注文一覧 →</Link>
                            </div>
                            {c.orders.length === 0 ? (
                                <p style={muted}>オンライン決済の記録はありません（銀行振込・対面などはメモに残してください）。</p>
                            ) : null}
                            {c.orders.length > 0 && (
                                <ul style={{ margin: '8px 0 0', padding: 0, listStyle: 'none', display: 'grid', gap: 8 }}>
                                    {c.orders.map((o) => {
                                        const good = o.status === 'paid' || o.status === 'active';
                                        const warn = o.status === 'pending' || o.status === 'past_due';
                                        const stripeUrl = o.stripeSubscriptionId ? `${dashboardBase}/subscriptions/${o.stripeSubscriptionId}` : o.stripePaymentIntentId ? `${dashboardBase}/payments/${o.stripePaymentIntentId}` : `${dashboardBase}/payments`;
                                        return (
                                            <li key={o.orderId} style={{ padding: '10px 12px', border: '1px solid var(--border)', borderRadius: 12, background: '#fff', fontSize: 13 }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                                                    <span style={{ ...badge, fontWeight: 700, ...(good ? { background: '#e9f7ef', color: '#1e7d4f', borderColor: '#a3ddbf' } : warn ? { background: '#fff4e0', color: '#8a5a00', borderColor: '#e5c37a' } : { background: '#f0f0f0', color: '#666', borderColor: '#d5d5d5' }) }}>{ORDER_STATUS_LABEL[o.status]}</span>
                                                    <strong>{o.planName}</strong>
                                                    <span style={{ color: '#777' }}>{formatJpy(o.amountJpy)}{o.kind === 'subscription' ? '／月' : ''}{!o.livemode && ' ・ TEST'}</span>
                                                </div>
                                                <div style={{ color: '#777', fontSize: 11, marginTop: 4, display: 'flex', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap' }}>
                                                    <span>{formatDateTime(o.createdAt)}{o.kind === 'subscription' && o.currentPeriodEnd && (o.status === 'active' || o.status === 'past_due') ? ` ・ ${o.cancelAtPeriodEnd ? '終了予定' : '次回更新'} ${formatDateTime(o.currentPeriodEnd).slice(0, 10)}` : ''}</span>
                                                    <a href={stripeUrl} target="_blank" rel="noopener noreferrer" style={{ ...link, fontSize: 11 }}>Stripe ↗</a>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}

                            {/* 付け替え：票がある顧客 → 決済だけの人の注文を取り込む */}
                            {client && orphanOrders.length > 0 && (
                                <details style={{ marginTop: 12 }}>
                                    <summary style={{ cursor: 'pointer', fontSize: 12, fontWeight: 700, color: '#8C3E25' }}>別のメールで決済した注文を紐付ける（候補 {orphanOrders.length}）</summary>
                                    <p style={{ ...muted, fontSize: 12 }}>決済だけで票が未提出の注文です。決済のメールとシートのメールが違うと別人として並ぶので、同じ人ならここで紐付けます。</p>
                                    <ul style={{ margin: '8px 0 0', padding: 0, listStyle: 'none', display: 'grid', gap: 6 }}>
                                        {orphanOrders.slice(0, 8).map(({ o, from }) => (
                                            <li key={o.orderId} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, padding: '8px 10px', border: '1px solid var(--border)', borderRadius: 10, background: '#fff', fontSize: 12 }}>
                                                <span style={{ minWidth: 0 }}>
                                                    <strong>{o.name || '（名前なし）'}</strong>{norm(o.name || '') === norm(c.name) && <span style={{ ...badge, marginLeft: 6, background: '#e9f7ef', color: '#1e7d4f', borderColor: '#a3ddbf' }}>同じ名前</span>}
                                                    <br /><span style={{ color: '#777' }}>{o.email} ・ {o.planName} {formatJpy(o.amountJpy)} ・ {formatDateTime(o.createdAt).slice(0, 10)}</span>
                                                </span>
                                                <form action={relinkOrderAction}>
                                                    <input type="hidden" name="fromClientId" value={from.clientId} />
                                                    <input type="hidden" name="toClientId" value={c.clientId} />
                                                    <input type="hidden" name="orderId" value={o.orderId} />
                                                    <button type="submit" style={{ ...toolBtn, cursor: 'pointer', whiteSpace: 'nowrap', fontWeight: 700 }}>この顧客に紐付ける</button>
                                                </form>
                                            </li>
                                        ))}
                                    </ul>
                                </details>
                            )}

                            {/* 付け替え：決済だけの顧客 → 票を出している既存クライアントへ */}
                            {!client && c.orders.length > 0 && relinkTargets.length > 0 && (
                                <details style={{ marginTop: 12 }} open>
                                    <summary style={{ cursor: 'pointer', fontSize: 12, fontWeight: 700, color: '#8C3E25' }}>この決済を既存のクライアントに付け替える</summary>
                                    <p style={{ ...muted, fontSize: 12 }}>票は別のメールで提出されている、という場合はこちら。付け替えるとこの顧客ページは消え、注文は選んだクライアントに移ります。</p>
                                    <form action={relinkOrderAction} style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', marginTop: 8 }}>
                                        <input type="hidden" name="fromClientId" value={c.clientId} />
                                        {c.orders.map((o) => <input key={o.orderId} type="hidden" name="orderId" value={o.orderId} />)}
                                        <select name="toClientId" required defaultValue="" style={{ flex: 1, minWidth: 240, height: 36, padding: '0 10px', border: '1px solid var(--border)', borderRadius: 999, fontSize: 13, background: '#fff' }}>
                                            <option value="" disabled>付け替え先のクライアントを選ぶ</option>
                                            {relinkTargets.map((x) => <option key={x.clientId} value={x.clientId}>{x.name}（{x.email}）{norm(x.name) === norm(c.name) ? ' — 同じ名前' : ''}</option>)}
                                        </select>
                                        <button type="submit" className={styles.newButton} style={{ border: '1px solid #1a1a1a' }}>注文 {c.orders.length} 件を付け替える</button>
                                    </form>
                                </details>
                            )}
                        </section>

                        {/* ニュースレター */}
                        <section style={panel}>
                            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12 }}>
                                <h2 style={h2}>ニュースレター</h2>
                                <Link href="/admin/newsletter/subscribers" style={{ ...link, fontSize: 12 }}>購読者一覧 →</Link>
                            </div>
                            {!c.newsletter ? <p style={muted}>未登録。</p> : (
                                <div style={{ fontSize: 13, marginTop: 6 }}>
                                    <div>
                                        状態：<strong>{c.newsletter.status === 'active' ? '購読中' : c.newsletter.status === 'pending' ? '確認待ち（確認メール未クリック）' : '解除済み'}</strong>
                                        {c.newsletter.optIn && <span style={{ color: '#777' }}>（{c.newsletter.optIn === 'double' ? 'ダブルオプトイン' : 'フォーム送信で登録'}）</span>}
                                    </div>
                                    <div style={{ color: '#777', fontSize: 12, marginTop: 4 }}>
                                        経路 {c.newsletter.source} ・ 登録 {formatDateTime(c.newsletter.subscribedAt)}
                                        {c.newsletter.unsubscribedAt && ` ・ 解除 ${formatDateTime(c.newsletter.unsubscribedAt)}`}
                                    </div>
                                    {c.newsletter.status !== 'unsubscribed' && (
                                        <form action={unsubscribeNewsletterForClient} style={{ marginTop: 8 }}>
                                            <input type="hidden" name="clientId" value={c.clientId} />
                                            <input type="hidden" name="email" value={c.email} />
                                            <button type="submit" style={{ ...toolBtn, cursor: 'pointer' }}>配信を解除する</button>
                                        </form>
                                    )}
                                </div>
                            )}
                        </section>

                        {/* セルフチェック */}
                        <section style={panel}>
                            <h2 style={h2}>セルフチェック（/check）</h2>
                            {c.checks.length === 0 ? <p style={muted}>結果の記録はありません。</p> : (
                                <ul style={{ margin: '8px 0 0', padding: 0, listStyle: 'none', display: 'grid', gap: 8 }}>
                                    {c.checks.map((k) => (
                                        <li key={k.createdAt} style={{ padding: '10px 12px', border: '1px solid var(--border)', borderRadius: 12, background: '#fff', fontSize: 13 }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap' }}>
                                                <strong>{k.archetypeName}</strong>
                                                <span style={{ color: '#777', fontSize: 11 }}>{formatDateTime(k.createdAt)}</span>
                                            </div>
                                            <div style={{ color: '#555', fontSize: 12, marginTop: 2 }}>{k.archetypeCatch}</div>
                                            <div style={{ color: '#1a1a1a', fontSize: 12, marginTop: 6, fontVariantNumeric: 'tabular-nums' }}>
                                                総合 <strong>{k.total}</strong>／100 ・ エネルギー {k.axisScores.energy} ・ 脳 {k.axisScores.mental} ・ 回復 {k.axisScores.recovery} ・ 代謝 {k.axisScores.flex}
                                            </div>
                                            {k.personalActions && k.personalActions.length > 0 && (
                                                <details style={{ marginTop: 6 }}>
                                                    <summary style={{ cursor: 'pointer', fontSize: 12, color: '#246E58', fontWeight: 700 }}>AI 個別解析・アクション</summary>
                                                    {k.personalAnalysis && <p style={{ ...pre, fontSize: 12, marginTop: 6 }}>{k.personalAnalysis}</p>}
                                                    <ol style={{ margin: '6px 0 0', paddingLeft: 18, fontSize: 12 }}>{k.personalActions.map((a, i) => <li key={i}>{a}</li>)}</ol>
                                                </details>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </section>
                    </div>
                </div>

                {/* 解析レポート（履歴） */}
                <section style={{ ...panel, marginTop: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12 }}>
                        <h2 style={h2}>解析レポート{c.reports.length > 0 && <span style={{ fontWeight: 400, color: '#777', fontSize: 13, marginLeft: 8 }}>{c.reports.length} 件・新しい順</span>}</h2>
                        <span style={{ fontSize: 11, color: '#777' }}>マイページには全件が並びます</span>
                    </div>
                    {c.reports.length === 0 ? (
                        <p style={muted}>まだ紐付けられていません。DaVinci24 経由で公開すると自動で追加されます（INTAKE_LINK_SECRET が揃っている場合）。手動なら下の欄に /r/… のトークンを貼ってください。</p>
                    ) : (
                        <ul style={{ margin: '10px 0 0', padding: 0, listStyle: 'none', display: 'grid', gap: 8 }}>
                            {c.reports.map((r, i) => (
                                <li key={r.token} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, padding: '10px 12px', border: '1px solid var(--border)', borderRadius: 12, background: '#fff', fontSize: 13 }}>
                                    <div style={{ minWidth: 0 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                                            {i === 0 && <span style={{ ...badge, background: '#e9f7ef', color: '#1e7d4f', borderColor: '#a3ddbf', fontWeight: 700 }}>最新</span>}
                                            <strong>{r.label || `${formatDateTime(r.addedAt).slice(0, 10)} の解析`}</strong>
                                        </div>
                                        <div style={{ fontSize: 12, marginTop: 3 }}>
                                            <a href={`/r/${r.token}`} target="_blank" rel="noopener noreferrer" style={link}>クライアント用 /r/{r.token} ↗</a>
                                            {r.analystToken && <> ・ <a href={`/r/${r.analystToken}/analyst`} target="_blank" rel="noopener noreferrer" style={link}>解析者用 ↗</a></>}
                                            <span style={{ color: '#777' }}> ・ {formatDateTime(r.addedAt)}</span>
                                        </div>
                                    </div>
                                    <form action={removeClientReportAction}>
                                        <input type="hidden" name="clientId" value={c.clientId} />
                                        <input type="hidden" name="token" value={r.token} />
                                        <button type="submit" title="履歴から外す（レポート自体は消えません）" style={{ background: 'none', border: 'none', color: '#c0392b', fontSize: 12, cursor: 'pointer', whiteSpace: 'nowrap' }}>外す</button>
                                    </form>
                                </li>
                            ))}
                        </ul>
                    )}
                    <form action={saveClientReport} style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr) auto', gap: 8, marginTop: 12 }}>
                        <input type="hidden" name="clientId" value={c.clientId} />
                        <input name="token" placeholder="クライアント用トークン or URL（例: /r/SbCtC5JII0uqihoUR4Bf44l）"
                            style={{ height: 40, padding: '0 14px', border: '1px solid var(--border)', borderRadius: 999, fontSize: 13 }} />
                        <input name="label" placeholder="ラベル（例: 2026-09 血液解析）"
                            style={{ height: 40, padding: '0 14px', border: '1px solid var(--border)', borderRadius: 999, fontSize: 13 }} />
                        <button type="submit" className={styles.newButton} style={{ border: '1px solid #1a1a1a' }}>追加</button>
                        <input name="analystToken" placeholder="解析者用トークン（任意・クライアントには表示されない）"
                            style={{ gridColumn: '1 / -1', height: 36, padding: '0 14px', border: '1px solid var(--border)', borderRadius: 999, fontSize: 12 }} />
                    </form>
                </section>

                {/* 対応ステータス＋担当メモ */}
                <section style={{ ...panel, marginTop: 16 }}>
                    <h2 style={h2}>対応ステータス・メモ</h2>
                    <form action={saveClientMeta} style={{ marginTop: 10 }}>
                        <input type="hidden" name="clientId" value={c.clientId} />
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
                            {CLIENT_STATUSES.map((st) => {
                                const active = statusOf(c) === st;
                                return (
                                    <label key={st} style={{ cursor: 'pointer' }}>
                                        <input type="radio" name="status" value={st} defaultChecked={active} style={{ display: 'none' }} />
                                        <span style={{ display: 'inline-block', padding: '5px 12px', borderRadius: 999, fontSize: 12, fontWeight: 700, border: '1px solid', ...(active ? { background: '#1a1a1a', color: '#fff', borderColor: '#1a1a1a' } : { background: '#fff', color: '#555', borderColor: 'var(--border)' }) }}>{st}</span>
                                    </label>
                                );
                            })}
                        </div>
                        <textarea name="memo" defaultValue={c.meta?.memo ?? ''} rows={3} placeholder="施術者用メモ（クライアントには表示されません）。銀行振込・対面での支払い、電話での相談内容などもここに"
                            style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--border)', borderRadius: 12, fontSize: 13, boxSizing: 'border-box', resize: 'vertical' }} />
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 10 }}>
                            <button type="submit" className={styles.newButton} style={{ border: '1px solid #1a1a1a' }}>保存</button>
                            {c.meta && <span style={{ fontSize: 11, color: '#999' }}>{formatDateTime(c.meta.updatedAt)} 更新</span>}
                        </div>
                    </form>
                </section>

                {/* カウンセリング票（新しい順） */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 28 }}>
                    {!client && (
                        <section style={panel}>
                            <h2 style={h2}>カウンセリング票</h2>
                            <p style={muted}>まだ提出がありません。本人が <a href={`${SITE_URL}/counseling-sheet`} target="_blank" rel="noopener noreferrer" style={link}>/counseling-sheet</a> を同じメールアドレスで送ると、ここに問診と添付が並びます。</p>
                        </section>
                    )}
                    {client?.submissions.map((s, idx) => (
                        <section key={s.submissionId} style={panel}>
                            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12, marginBottom: 14 }}>
                                <h2 style={h2}>
                                    {idx === 0 ? '最新のカウンセリング票' : `カウンセリング票 ${client.submissionCount - idx}`}
                                    {(s.age || s.gender) && <span style={{ fontWeight: 400, color: '#777', fontSize: 13, marginLeft: 8 }}>{[s.age && `${s.age}歳`, s.gender].filter(Boolean).join(' ・ ')}</span>}
                                </h2>
                                <span style={{ fontSize: 12, color: '#777', whiteSpace: 'nowrap' }}>{formatDateTime(s.submittedAt)}</span>
                            </div>

                            <div style={block}>
                                <span style={blockLabel}>気になっていること・目的</span>
                                <p style={pre}>{s.complaint || '（記載なし）'}</p>
                            </div>
                            {s.notes && (
                                <div style={block}>
                                    <span style={blockLabel}>その他</span>
                                    <p style={pre}>{s.notes}</p>
                                </div>
                            )}

                            {questionnaireEntries(s.questionnaire).length > 0 && (
                                <div style={block}>
                                    <span style={blockLabel}>問診</span>
                                    <dl style={{ margin: '4px 0 0', fontSize: 13 }}>
                                        {questionnaireEntries(s.questionnaire).map((e, i) => (
                                            <div key={e.label} style={{ display: 'grid', gridTemplateColumns: '190px 1fr', gap: 16, padding: '8px 0', borderTop: i === 0 ? 'none' : '1px solid var(--border)' }}>
                                                <dt style={{ color: '#777', wordBreak: 'break-word' }}>{e.label}</dt>
                                                <dd style={{ margin: 0, color: '#1a1a1a' }}>{e.value}</dd>
                                            </div>
                                        ))}
                                    </dl>
                                </div>
                            )}

                            <div style={block}>
                                <span style={blockLabel}>添付ファイル（{s.files?.length ?? 0}）</span>
                                {(!s.files || s.files.length === 0) ? (
                                    <p style={{ margin: '4px 0 0', color: '#777', fontSize: 13 }}>ファイルはありません。</p>
                                ) : (
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 12, marginTop: 6 }}>
                                        {s.files.map((f, i) => (
                                            <a key={i} href={f.url} target="_blank" rel="noopener noreferrer" style={fileCard}>
                                                {isImage(f.type) ? (
                                                    // eslint-disable-next-line @next/next/no-img-element
                                                    <img src={f.url} alt={f.name} style={{ width: '100%', height: 104, objectFit: 'cover', borderRadius: 8, background: '#eff5f2' }} />
                                                ) : (
                                                    <div style={{ height: 104, display: 'grid', placeItems: 'center', borderRadius: 8, background: '#eff5f2', color: '#8a9691', fontWeight: 700, fontSize: 13 }}>
                                                        {(f.name.split('.').pop() || 'FILE').toUpperCase()}
                                                    </div>
                                                )}
                                                <div style={{ marginTop: 7, fontSize: 10, fontWeight: 700, color: f.kind === 'blood' ? '#8C3E25' : f.kind === 'device' ? '#2c5aa0' : '#777' }}>{FILE_KIND_LABEL[f.kind ?? 'other']}</div>
                                                <div style={{ marginTop: 2, fontSize: 12, color: '#1a1a1a', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.name}</div>
                                                <div style={{ fontSize: 11, color: '#777' }}>{(f.size / 1024 / 1024).toFixed(1)}MB</div>
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                                <Link href={`/admin/clients/${s.submissionId}`} style={{ ...link, fontSize: 12 }}>この票の詳細 →</Link>
                                {client.submissions.length > 1 && (
                                    <form action={deleteSubmissionAction}>
                                        <input type="hidden" name="clientId" value={c.clientId} />
                                        <input type="hidden" name="submissionId" value={s.submissionId} />
                                        <button type="submit" style={{ background: 'none', border: 'none', color: '#c0392b', fontSize: 12, cursor: 'pointer' }}>この票を削除</button>
                                    </form>
                                )}
                            </div>
                        </section>
                    ))}
                </div>

                {/* 危険操作：削除（本人の削除要求など） */}
                {client && (
                    <section style={{ ...panel, marginTop: 28, borderColor: '#e6b0aa', background: '#fdf3f2' }}>
                        <h2 style={{ ...h2, color: '#c0392b' }}>カウンセリング票を削除</h2>
                        <p style={{ margin: '6px 0 12px', fontSize: 13, color: '#7b4a45' }}>
                            このクライアントの<strong>全カウンセリング票・添付ファイル・メモ・解析レポート紐付け</strong>を完全に削除します（本人の削除要求への対応用）。<strong>元に戻せません。</strong>
                            決済記録（Stripe）とニュースレターの登録は残ります——必要なら Stripe ダッシュボードと購読者一覧で個別に対応してください。
                        </p>
                        <form action={deleteClientAction}>
                            <input type="hidden" name="clientId" value={c.clientId} />
                            <button type="submit" style={{ padding: '9px 16px', background: '#c0392b', color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
                                {c.name} の票を完全に削除する
                            </button>
                        </form>
                    </section>
                )}
            </main>
        </div>
    );
}

function Badge({ children, tone = 'plain' }: { children: React.ReactNode; tone?: 'plain' | 'ok' | 'warn' | 'bad' | 'orange' | 'blue' }) {
    const tones: Record<string, React.CSSProperties> = {
        plain: {},
        ok: { background: '#e9f7ef', color: '#1e7d4f', borderColor: '#a3ddbf' },
        warn: { background: '#fff4e0', color: '#8a5a00', borderColor: '#e5c37a' },
        bad: { background: '#fdeaea', color: '#c0392b', borderColor: '#e6b0aa' },
        orange: { background: '#FFF1E6', color: '#8C3E25', borderColor: '#F5C9A6' },
        blue: { background: '#DEEDF7', color: '#2c5aa0', borderColor: '#a9c3e8' },
    };
    return <span style={{ ...badge, fontWeight: 700, fontSize: 11, padding: '3px 9px', ...tones[tone] }}>{children}</span>;
}

const panel: React.CSSProperties = { padding: '18px 22px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14 };
const block: React.CSSProperties = { padding: '10px 0', borderTop: '1px solid var(--border)' };
const blockLabel: React.CSSProperties = { display: 'block', color: '#777', fontSize: 12, marginBottom: 4 };
const h2: React.CSSProperties = { margin: 0, fontSize: 15, fontWeight: 700, color: '#1a1a1a' };
const pre: React.CSSProperties = { margin: 0, fontSize: 14, color: '#333', lineHeight: 1.8, whiteSpace: 'pre-wrap' };
const muted: React.CSSProperties = { margin: '8px 0 0', fontSize: 13, color: '#777', lineHeight: 1.7 };
const link: React.CSSProperties = { color: '#246E58', fontWeight: 700 };
const badge: React.CSSProperties = { padding: '2px 7px', borderRadius: 999, color: '#59625f', background: '#f1f4f3', border: '1px solid #dde3e0', fontSize: 10 };
const toolBtn: React.CSSProperties = { padding: '6px 12px', background: '#fff', border: '1px solid var(--border)', borderRadius: 999, fontSize: 12, color: '#555' };
const fileCard: React.CSSProperties = { display: 'block', padding: 10, background: '#fff', border: '1px solid var(--border)', borderRadius: 12 };
