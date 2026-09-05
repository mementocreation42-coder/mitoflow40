import Link from 'next/link';
import AdminHeader from '@/components/admin/AdminHeader';
import { listIssues, listSubscribers, isNewsletterConfigured, getDeliveryStatus, NEWSLETTER_NAME } from '@/lib/newsletter';
import { formatDateTime } from '@/lib/intake';
import { createIssueAction } from './actions';
import styles from '../admin.module.css';

export const metadata = { title: { absolute: 'ニュースレター | Mitoflow40 Admin' }, robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

export default async function AdminNewsletterPage() {
    const cfg = isNewsletterConfigured();
    const issues = cfg.blob ? await listIssues().catch(() => []) : [];
    const subs = cfg.blob ? await listSubscribers().catch(() => []) : [];
    const active = subs.filter((s) => s.status === 'active').length;
    const pending = subs.filter((s) => s.status === 'pending').length;
    const unsub = subs.filter((s) => s.status === 'unsubscribed').length;
    const delivery = await getDeliveryStatus().catch((e) => ({ resend: false, segment: 'error' as const, detail: String(e) }));
    const drafts = issues.filter((i) => i.status === 'draft');
    const sent = issues.filter((i) => i.status === 'sent');

    return (
        <div className={styles.shell}>
            <AdminHeader active="newsletter" />

            <main className={styles.main} style={{ maxWidth: 820 }}>
                <p className={styles.eyebrow}>Newsletter</p>
                <div className={styles.titleRow}>
                    <h1 className={styles.title}>{NEWSLETTER_NAME}</h1>
                    <form action={createIssueAction}><button type="submit" className={styles.newButton} style={{ border: '1px solid #1a1a1a' }}>＋ 新しい号を書く</button></form>
                </div>
                <p className={styles.description}>
                    <Link href="/admin/newsletter/subscribers" style={link}>購読者 {active} 名 →</Link>（確認待ち {pending}・解除 {unsub}）・配信済み {sent.length} 号・下書き {drafts.length}
                    {' ・ '}<Link href="/newsletter" target="_blank" style={link}>登録ページ ↗</Link>
                    {' ・ '}<Link href="/newsletter/archive" target="_blank" style={link}>バックナンバー ↗</Link>
                </p>

                {/* 稼働状態：リスト収集は Blob だけで動く。配信接続（Resend Segment）は後から */}
                <div style={{ ...panel, marginTop: 16, display: 'grid', gap: 8, fontSize: 13 }}>
                    <StatusRow ok={cfg.blob} label="リスト収集" detail={cfg.blob ? '稼働中（登録フォーム → 台帳に記録）' : 'BLOB_READ_WRITE_TOKEN が未設定。登録を保存できません'} />
                    <StatusRow ok={cfg.resend} label="確認メール（ダブルオプトイン）" detail={cfg.resend ? '稼働中' : 'RESEND_API_KEY 未設定。いまは登録フォーム送信で即時登録（シングルオプトイン）'} warn={!cfg.resend} />
                    <StatusRow ok={delivery.segment === 'ok'} label="配信接続（Resend Segment / Broadcast）" detail={delivery.detail} warn={delivery.segment !== 'ok'} />
                    {!cfg.secret && <StatusRow ok={false} label="リンク署名鍵" detail="NEWSLETTER_SECRET（または INTAKE_LINK_SECRET）が未設定。確認・解除リンクが第三者に偽造されうる" />}
                    {delivery.segment !== 'ok' && (
                        <p style={{ margin: '4px 0 0', fontSize: 12, color: '#666' }}>
                            配信接続がつながったら、<Link href="/admin/newsletter/subscribers" style={link}>購読者</Link>の「Resend に一括同期」で、集めたリストをそのまま配信対象にできます。
                        </p>
                    )}
                </div>

                <section style={{ marginTop: 28 }}>
                    <h2 style={h2}>号の一覧</h2>
                    {issues.length === 0 ? (
                        <div style={panel}><p style={{ margin: 0, color: '#666' }}>まだ号がありません。「新しい号を書く」から始めてください。Markdown で書けます。</p></div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {issues.map((i) => (
                                <Link key={i.id} href={`/admin/newsletter/${i.id}`} style={rowStyle}>
                                    <div style={{ minWidth: 0 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3, flexWrap: 'wrap' }}>
                                            <span style={{ ...badge, fontWeight: 700, ...(i.status === 'sent' ? { background: '#e9f7ef', color: '#1e7d4f', borderColor: '#a3ddbf' } : { background: '#fff4e0', color: '#8a5a00', borderColor: '#e5c37a' }) }}>{i.status === 'sent' ? '配信済み' : '下書き'}</span>
                                            <span style={{ fontWeight: 700, fontSize: 15, color: '#1a1a1a' }}>{i.subject || '（件名なし）'}</span>
                                        </div>
                                        <div style={{ fontSize: 12, color: '#69716e' }}>
                                            <code style={{ fontSize: 11 }}>{i.id}</code>
                                            {i.status === 'sent' ? ` ・ ${i.sentAt ? formatDateTime(i.sentAt) : ''} に ${i.recipientCount ?? '?'} 名へ配信` : ` ・ 更新 ${formatDateTime(i.updatedAt)}`}
                                            {i.testSentAt && i.status !== 'sent' && ` ・ テスト送信済み`}
                                        </div>
                                    </div>
                                    <span style={{ fontSize: 12, color: '#777' }}>開く →</span>
                                </Link>
                            ))}
                        </div>
                    )}
                </section>

                <section style={{ ...panel, marginTop: 28 }}>
                    <h2 style={h2}>しくみ</h2>
                    <ol style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: '#555', lineHeight: 1.9 }}>
                        <li>登録フォーム → 確認メール → リンクを開いて登録完了（ダブルオプトイン）。確定前のアドレスは保存しない</li>
                        <li>号は Markdown で書き、プレビュー → 自分にテスト送信 → 一斉配信（Resend Broadcast）</li>
                        <li>解除リンクは各受信者ごとに自動で入る。解除は Resend 側で即時反映され、「購読者」ページの同期で台帳にも反映</li>
                        <li>配信済みの号は <Link href="/newsletter/archive" target="_blank" style={link}>バックナンバー</Link> に自動で公開される</li>
                    </ol>
                </section>
            </main>
        </div>
    );
}

function StatusRow({ ok, label, detail, warn }: { ok: boolean; label: string; detail: string; warn?: boolean }) {
    const style = ok
        ? { background: '#e9f7ef', color: '#1e7d4f', borderColor: '#a3ddbf' }
        : warn ? { background: '#fff4e0', color: '#8a5a00', borderColor: '#e5c37a' } : { background: '#fdeaea', color: '#c0392b', borderColor: '#e6b0aa' };
    return (
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <span style={{ ...badge, fontWeight: 700, whiteSpace: 'nowrap', ...style }}>{ok ? 'OK' : warn ? '未接続' : '未設定'}</span>
            <span><strong>{label}</strong><span style={{ color: '#666', marginLeft: 8, fontSize: 12 }}>{detail}</span></span>
        </div>
    );
}

const link: React.CSSProperties = { color: '#246E58', fontWeight: 700, textDecoration: 'none' };
const panel: React.CSSProperties = { padding: 20, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14 };
const h2: React.CSSProperties = { margin: '0 0 12px', fontSize: 15, fontWeight: 800 };
const rowStyle: React.CSSProperties = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 18, padding: '14px 18px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14 };
const badge: React.CSSProperties = { padding: '2px 7px', borderRadius: 999, color: '#59625f', background: '#f1f4f3', border: '1px solid #dde3e0', fontSize: 10 };
