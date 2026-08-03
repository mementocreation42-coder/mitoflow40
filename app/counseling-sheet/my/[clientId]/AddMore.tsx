'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// マイページ上の「情報を追加する」フォーム。
// 本人はすでに登録済みなので、氏名・メールは固定（サーバーから渡された値）。
// 新しい体調メモや、追加の血液検査・Apple Watch 画像だけを足せる。

const MAX_FILES = 12;
const MAX_FILE_MB = 15;

export default function AddMore({ name, email }: { name: string; email: string }) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [complaint, setComplaint] = useState('');
    const [notes, setNotes] = useState('');
    const [files, setFiles] = useState<File[]>([]);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const canSubmit = (complaint.trim() || notes.trim() || files.length > 0) && !submitting;

    function addFiles(list: FileList | null) {
        if (!list) return;
        const incoming = Array.from(list);
        const tooBig = incoming.find((f) => f.size > MAX_FILE_MB * 1024 * 1024);
        if (tooBig) {
            setError(`「${tooBig.name}」が大きすぎます（1ファイル${MAX_FILE_MB}MBまで）`);
            return;
        }
        setError(null);
        setFiles((prev) => [...prev, ...incoming].slice(0, MAX_FILES));
    }

    function removeFile(idx: number) {
        setFiles((prev) => prev.filter((_, i) => i !== idx));
    }

    async function submit() {
        if (!canSubmit) return;
        setSubmitting(true);
        setError(null);
        try {
            const fd = new FormData();
            fd.set('name', name);
            fd.set('email', email);
            fd.set('complaint', complaint);
            fd.set('notes', notes);
            fd.set('consent', 'true'); // 登録時に同意済み
            files.forEach((f) => fd.append('files', f));

            const res = await fetch('/api/intake', { method: 'POST', body: fd });
            const json = await res.json();
            if (!res.ok || !json.ok) throw new Error(json.error || '追加に失敗しました');

            // 同じマイページを再読み込みして履歴に反映
            setComplaint(''); setNotes(''); setFiles([]); setOpen(false);
            router.refresh();
        } catch (e) {
            setError(e instanceof Error ? e.message : '追加に失敗しました');
        } finally {
            setSubmitting(false);
        }
    }

    if (!open) {
        return (
            <button type="button" onClick={() => setOpen(true)}
                className="w-full py-3.5 rounded-full text-sm font-bold text-white bg-[#1A1A1A] transition"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                ＋ 情報を追加する
            </button>
        );
    }

    return (
        <div className="bg-white/70 rounded-2xl p-6 md:p-8 border border-black space-y-5">
            <h2 className="text-lg font-bold text-[#1A1A1A]">情報を追加する</h2>
            <div>
                <label className="block text-sm font-bold mb-2 text-[#1A1A1A]">いまの体調・気になっていること</label>
                <textarea value={complaint} onChange={(e) => setComplaint(e.target.value)} rows={3} placeholder="前回から変わったこと、新しい症状など"
                    className="w-full px-4 py-2.5 rounded-lg border border-[#D5D5D5] focus:border-[#FF9855] focus:outline-none text-sm resize-y bg-white" />
            </div>
            <div>
                <label className="block text-sm font-bold mb-2 text-[#1A1A1A]">追加のファイル（血液検査・Apple Watch など）</label>
                <label className="flex items-center justify-center gap-2 w-full py-5 rounded-xl border-2 border-dashed border-[#41C9B4] bg-white/60 cursor-pointer hover:bg-white transition text-sm font-bold text-[#1A1A1A]">
                    <span>＋ ファイルを選ぶ</span>
                    <input type="file" multiple accept=".pdf,image/png,image/jpeg,image/webp,image/heic,image/heif"
                        className="hidden" onChange={(e) => { addFiles(e.target.files); e.target.value = ''; }} />
                </label>
                {files.length > 0 && (
                    <ul className="mt-3 space-y-2">
                        {files.map((f, i) => (
                            <li key={i} className="flex items-center justify-between gap-3 text-xs bg-white rounded-lg border border-[#D5D5D5] px-3 py-2">
                                <span className="truncate flex-1 text-[#1A1A1A]">{f.name}</span>
                                <span className="text-[#4A4A4A] shrink-0">{(f.size / 1024 / 1024).toFixed(1)}MB</span>
                                <button type="button" onClick={() => removeFile(i)} className="text-[#E54848] font-bold shrink-0">削除</button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div>
                <label className="block text-sm font-bold mb-2 text-[#1A1A1A]">その他 メモ（任意）</label>
                <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} placeholder="服用中の薬・サプリの変化など"
                    className="w-full px-4 py-2.5 rounded-lg border border-[#D5D5D5] focus:border-[#FF9855] focus:outline-none text-sm resize-y bg-white" />
            </div>

            {error && <p className="text-sm text-[#E54848] font-bold">{error}</p>}

            <div className="flex gap-3">
                <button type="button" onClick={() => setOpen(false)} disabled={submitting}
                    className="px-5 py-2.5 rounded-full text-sm font-bold border border-[#1A1A1A] disabled:opacity-30">
                    キャンセル
                </button>
                <button type="button" onClick={submit} disabled={!canSubmit}
                    className="flex-1 py-2.5 rounded-full text-sm font-bold text-white bg-[#1A1A1A] disabled:opacity-30"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {submitting ? '追加中…' : 'この内容を追加する'}
                </button>
            </div>
        </div>
    );
}
