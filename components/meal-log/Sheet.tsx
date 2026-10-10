'use client';

import { useEffect } from 'react';

// 画面下からせり上がるパネル（PC では中央のダイアログ）
export default function Sheet({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', onKey);
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
    }, [onClose]);
    return (
        <div className="fixed inset-0 z-[90] flex items-end md:items-center justify-center bg-[#1A1A1A]/50" onClick={onClose}>
            <div role="dialog" aria-modal="true" aria-label={title} onClick={(e) => e.stopPropagation()}
                className="w-full md:max-w-[560px] max-h-[92dvh] flex flex-col rounded-t-2xl md:rounded-2xl border-2 border-[#1A1A1A] bg-white">
                <div className="flex items-center justify-between px-4 py-3 border-b-2 border-[#1A1A1A]">
                    <h2 className="text-base font-bold text-[#1A1A1A]">{title}</h2>
                    <button type="button" onClick={onClose} aria-label="閉じる"
                        className="w-9 h-9 rounded-full border-2 border-[#1A1A1A] font-bold hover:bg-[#FBEBD5]">×</button>
                </div>
                <div className="overflow-y-auto p-4">{children}</div>
            </div>
        </div>
    );
}
