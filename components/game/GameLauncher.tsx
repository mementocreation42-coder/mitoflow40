'use client';

import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import MitoRun from './MitoRun';

// 「走れミトス」の入口。ポップアップは body 直下にポータルで描く（ヒーローの transform の中だと fixed が効かないため）。
// PC ではその場にポップアップ（スマホ型の枠）で開き、スマホでは /play に移動して全画面で遊ぶ。
export default function GameLauncher({ children, className, style }: { children: ReactNode; className?: string; style?: React.CSSProperties }) {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const launch = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        if (window.matchMedia('(min-width: 768px)').matches) setOpen(true);
        else router.push('/play');
    }, [router]);

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
        window.addEventListener('keydown', onKey);
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
    }, [open]);

    return (
        <>
            <a href="/play" onClick={launch} className={className} style={style}>{children}</a>
            {open && createPortal(
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1A1A1A]/60 backdrop-blur-sm p-4" onClick={() => setOpen(false)} role="dialog" aria-modal="true" aria-label="走れミトス">
                    <div className="relative" onClick={(e) => e.stopPropagation()}>
                        <PhoneFrame>
                            <MitoRun />
                        </PhoneFrame>
                        <button onClick={() => setOpen(false)} aria-label="閉じる"
                            className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-white border-2 border-[#1A1A1A] font-bold text-[#1A1A1A] shadow-lg hover:bg-[#FF9855] transition-colors">×</button>
                        <p className="absolute -bottom-8 left-0 right-0 text-center text-[11px] font-bold text-white/80" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>SPACE / CLICK でジャンプ · ESC で閉じる</p>
                    </div>
                </div>,
                document.body,
            )}
        </>
    );
}

/** スマホ型の枠。中身は 390×640 の比率で、画面の高さに収まるように縮む */
export function PhoneFrame({ children }: { children: ReactNode }) {
    return (
        <div className="rounded-[36px] border-[6px] border-[#1A1A1A] bg-[#1A1A1A] shadow-2xl overflow-hidden" style={{ width: 'min(400px, calc((100dvh - 96px) * 390 / 640))' }}>
            <div className="rounded-[30px] overflow-hidden bg-[#F7D9DE] [&>div]:max-w-none [&_canvas]:!rounded-none [&_canvas]:!border-0">
                {children}
            </div>
        </div>
    );
}
