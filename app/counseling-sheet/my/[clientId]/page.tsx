import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getClient, getClientReport, formatDateTime, questionnaireEntries } from '@/lib/intake';
import AddMore from './AddMore';

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
    const client = await getClient(clientId);
    if (!client) notFound();
    const report = await getClientReport(clientId);

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
                        {client.name || 'あなた'} さんのカウンセリング票
                    </h1>
                    <p className="text-sm text-[#1A1A1A]/70 font-medium">
                        {client.email} ・ カウンセリング票 {client.submissionCount} 件 ・ 最終更新 {formatDateTime(client.latestAt)}
                    </p>
                </header>

                {/* 解析結果 */}
                <section className="mb-8">
                    {report ? (
                        <Link href={`/r/${report.token}`} target="_blank" rel="noopener noreferrer"
                            className="block rounded-2xl border border-black bg-[#1A1A1A] p-6 md:p-7 hover:opacity-95 transition">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-[10px] tracking-widest font-bold mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#4AF6C3' }}>ANALYSIS REPORT</p>
                                    <h2 className="text-lg md:text-xl font-bold text-white">解析結果ができました</h2>
                                    <p className="text-xs text-white/60 mt-1">血液・生活データを統合した、あなた専用のレポート</p>
                                </div>
                                <span className="shrink-0 px-4 py-2 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#4AF6C3]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>見る →</span>
                            </div>
                        </Link>
                    ) : (
                        <div className="rounded-2xl border border-dashed border-[#1A1A1A]/30 bg-white/50 p-6 text-center">
                            <p className="text-[10px] tracking-widest font-bold mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>ANALYSIS REPORT</p>
                            <p className="text-sm font-bold text-[#1A1A1A]">解析結果は準備中です</p>
                            <p className="text-xs text-[#1A1A1A]/60 mt-1">登録いただいた情報をもとに解析を進めています。完成するとここに表示されます。</p>
                        </div>
                    )}
                </section>

                {/* 追加ボタン／フォーム */}
                <div className="mb-8">
                    <AddMore name={client.name} email={client.email} />
                </div>

                {/* 登録履歴 */}
                <div className="space-y-4">
                    {client.submissions.map((s, idx) => (
                        <section key={s.submissionId} className="bg-white/70 rounded-2xl p-6 md:p-7 border border-black">
                            <div className="flex items-baseline justify-between gap-3 mb-3">
                                <h2 className="text-base font-bold text-[#1A1A1A]">
                                    {idx === 0 ? '最新のカウンセリング票' : `カウンセリング票 ${client.submissionCount - idx}`}
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
                                            <div className="mt-1.5 text-[11px] text-[#1A1A1A] truncate">{f.name}</div>
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
