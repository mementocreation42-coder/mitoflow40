import Link from 'next/link';
import { notFound } from 'next/navigation';
import AdminHeader from '@/components/admin/AdminHeader';
import { getIssue, listSubscribers, renderIssueHtml, unsubscribeUrl } from '@/lib/newsletter';
import { formatDateTime } from '@/lib/intake';
import { saveIssueAction, sendTestAction, sendIssueAction } from '../actions';
import SendConfirm from './SendConfirm';
import styles from '../../admin.module.css';

export const metadata = { title: { absolute: '号の編集 | Mitoflow40 Admin' }, robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

export default async function AdminIssuePage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ test?: string; sent?: string; error?: string }> }) {
    const { id } = await params;
    const { test, sent, error } = await searchParams;
    const issue = await getIssue(id);
    if (!issue) notFound();
    const active = (await listSubscribers().catch(() => [])).filter((s) => s.status === 'active').length;
    const previewHtml = renderIssueHtml(issue, { unsubscribeUrl: unsubscribeUrl('preview@example.com') });
    const locked = issue.status === 'sent';
    const testTo = process.env.CONTACT_EMAIL || process.env.INTAKE_NOTIFY_EMAIL || '';

    return (
        <div className={styles.shell}>
            <AdminHeader active="newsletter" back={{ href: '/admin/newsletter', label: '号の一覧' }} />

            <main className={styles.main} style={{ maxWidth: 1040 }}>
                <p className={styles.eyebrow}>{locked ? 'Sent issue' : 'Draft'}</p>
                <div className={styles.titleRow}>
                    <h1 className={styles.title}>{issue.subject || '（件名なし）'}</h1>
                    <span className={styles.resultMeta}><code>{issue.id}</code></span>
                </div>
                {locked ? (
                    <p className={styles.description}>
                        {issue.sentAt ? formatDateTime(issue.sentAt) : ''} に {issue.recipientCount ?? '?'} 名へ配信済み。
                        {' '}<Link href={`/newsletter/archive/${issue.id}`} target="_blank" style={link}>公開ページ ↗</Link>
                        {issue.broadcastId && <> ・ <a href="https://resend.com/broadcasts" target="_blank" rel="noopener noreferrer" style={link}>Resend で開封・クリックを見る ↗</a></>}
                    </p>
                ) : (
                    <p className={styles.description}>Markdown で本文を書き、保存 → プレビュー → テスト送信 → 配信の順で。配信すると編集できなくなります。</p>
                )}
                {test === 'sent' && <div style={{ ...notice, background: '#e9f7ef', borderColor: '#a3ddbf', color: '#1e7d4f' }}>テスト送信しました（{testTo || '指定のアドレス'}）。受信箱で見た目と解除リンクを確認してください。</div>}
                {sent === '1' && <div style={{ ...notice, background: '#e9f7ef', borderColor: '#a3ddbf', color: '#1e7d4f' }}>配信を開始しました。Resend 側で数分以内に送信されます。</div>}
                {error && <div style={{ ...notice, background: '#fdeaea', borderColor: '#e6b0aa', color: '#8C3E25' }}>送信できませんでした：{error}</div>}

                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: 20, marginTop: 20 }}>
                    {/* 編集 */}
                    <form id="issue-form" action={saveIssueAction} style={{ ...panel, display: 'flex', flexDirection: 'column', gap: 12 }}>
                        <input type="hidden" name="id" value={issue.id} />
                        <label style={label}>件名
                            <input name="subject" defaultValue={issue.subject} disabled={locked} placeholder="例：フェリチンが「基準値内」でも疲れる理由" style={input} />
                        </label>
                        <label style={label}>プレビュー文（受信箱で件名の下に出る1行）
                            <input name="preheader" defaultValue={issue.preheader} disabled={locked} placeholder="例：貧血になる前に、細胞のエネルギー工場が止まる話" style={input} />
                        </label>
                        <label style={label}>本文（Markdown）
                            <textarea name="markdown" defaultValue={issue.markdown} disabled={locked} rows={26} placeholder={'## 見出し\n\n本文。**太字**、[リンク](https://mitoflow40.com/conditions/iron-deficiency)、画像 ![alt](https://...)。\n\n> 引用'} style={{ ...input, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: 13, lineHeight: 1.7, resize: 'vertical' }} />
                        </label>
                        {!locked && (
                            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                                <button type="submit" className={styles.newButton} style={{ border: '1px solid #1a1a1a' }}>保存してプレビュー更新</button>
                                <span style={{ fontSize: 11, color: '#999' }}>更新 {formatDateTime(issue.updatedAt)}</span>
                            </div>
                        )}
                    </form>

                    {/* プレビュー */}
                    <div style={{ ...panel, padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', fontSize: 12, color: '#666', display: 'flex', justifyContent: 'space-between' }}>
                            <span>プレビュー（保存した内容）</span>
                            <span>解除リンク付き・600px</span>
                        </div>
                        <iframe title="preview" srcDoc={previewHtml} sandbox="" style={{ width: '100%', flex: 1, minHeight: 640, border: 0, background: '#F4F4F1' }} />
                    </div>
                </div>

                {!locked && (
                    <section style={{ ...panel, marginTop: 20 }}>
                        <CopyDraftScript />
                        <h2 style={h2}>送信</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 16 }}>
                            <form action={sendTestAction} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                <input type="hidden" name="id" value={issue.id} />
                                <p style={{ margin: 0, fontSize: 13, fontWeight: 700 }}>1. 自分にテスト送信</p>
                                <p style={{ margin: 0, fontSize: 12, color: '#666' }}>編集中の内容を保存してから送ります。件名に [テスト] が付きます。</p>
                                <input name="testTo" defaultValue={testTo} placeholder="you@example.com" style={input} />
                                <HiddenCopyOfDraft />
                                <button type="submit" className={styles.newButton} style={{ border: '1px solid #1a1a1a', background: '#fff', alignSelf: 'flex-start' }}>テスト送信</button>
                            </form>
                            <form action={sendIssueAction} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                <input type="hidden" name="id" value={issue.id} />
                                <p style={{ margin: 0, fontSize: 13, fontWeight: 700 }}>2. 購読者 {active} 名へ配信</p>
                                <p style={{ margin: 0, fontSize: 12, color: '#666' }}>取り消せません。テスト送信で確認してから。確認欄に <code>SEND</code> と入力。</p>
                                <HiddenCopyOfDraft />
                                <SendConfirm count={active} disabled={active === 0 || !issue.subject || !issue.markdown.trim() || !issue.testSentAt} hint={!issue.testSentAt ? '先にテスト送信をしてください' : undefined} />
                            </form>
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
}

// テスト送信・配信フォームからも編集中の内容を拾えるよう、同名フィールドを JS で複製する
function HiddenCopyOfDraft() {
    return (
        <>
            <input type="hidden" name="subject" data-copy-from="subject" />
            <input type="hidden" name="preheader" data-copy-from="preheader" />
            <input type="hidden" name="markdown" data-copy-from="markdown" />
        </>
    );
}

function CopyDraftScript() {
    return (
        <script dangerouslySetInnerHTML={{ __html: `
            document.addEventListener('submit', function (e) {
                var f = e.target; if (!(f instanceof HTMLFormElement)) return;
                var src = document.getElementById('issue-form'); if (!src || f === src) return;
                f.querySelectorAll('[data-copy-from]').forEach(function (h) {
                    var el = src.elements.namedItem(h.getAttribute('data-copy-from'));
                    if (el && 'value' in el) h.value = el.value;
                });
            }, true);
        ` }} />
    );
}

const link: React.CSSProperties = { color: '#246E58', fontWeight: 700, textDecoration: 'none' };
const panel: React.CSSProperties = { padding: 20, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14 };
const h2: React.CSSProperties = { margin: '0 0 12px', fontSize: 15, fontWeight: 800 };
const label: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: 6, fontSize: 12, fontWeight: 700, color: '#444' };
const input: React.CSSProperties = { width: '100%', padding: '10px 12px', border: '1px solid var(--border)', borderRadius: 10, fontSize: 14, boxSizing: 'border-box', background: '#fff', fontWeight: 400, color: '#1a1a1a' };
const notice: React.CSSProperties = { marginTop: 14, padding: '10px 14px', borderRadius: 12, border: '1px solid', fontSize: 13, fontWeight: 700 };
