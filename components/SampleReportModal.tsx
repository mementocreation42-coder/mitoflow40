'use client';

import { useCallback, useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

// 実物の解析サンプル（クライアント用レポート）。同一オリジンの相対パスにしておくと、開発環境でもそのまま iframe に入る
export const SAMPLE_REPORT_PATH = '/r/SbCtC5JII0uqihoUR4Bf44l';

type Props = {
    children: ReactNode;
    className?: string;
    style?: CSSProperties;
    href?: string;
};

// 「実物のサンプルを見る」ボタン。新しいタブではなく、その場でポップアップ（モーダル）に表示する。
// いまの画面の上に「ぽん」と出る（背景はぼかし、カードは角丸で中央に）。ESC・背景クリック・× で閉じる。モーダル内から新しいタブで開くこともできる。
export default function SampleReportModal({ children, className, style, href = SAMPLE_REPORT_PATH }: Props) {
    const [open, setOpen] = useState(false);
    const [loaded, setLoaded] = useState(false);

    const close = useCallback(() => setOpen(false), []);

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
        document.addEventListener('keydown', onKey);
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', onKey);
            document.body.style.overflow = prev;
        };
    }, [open, close]);

    return (
        <>
            <button type="button" onClick={() => { setLoaded(false); setOpen(true); }} className={className} style={style}>
                {children}
            </button>

            {/* body 直下に描く：親要素の transform や backdrop-filter の影響を受けず、必ず最前面・全画面になる */}
            {open && createPortal(
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-label="解析サンプル"
                    onClick={close}
                    className="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-10"
                    style={{ background: 'rgba(26,26,26,0.35)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', animation: 'mf-fade .18s ease-out' }}
                >
                    <style>{`@keyframes mf-fade{from{opacity:0}to{opacity:1}}@keyframes mf-pop{from{opacity:0;transform:translateY(14px) scale(.965)}to{opacity:1;transform:none}}`}</style>
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="relative w-full h-full max-w-[1100px] max-h-[92vh] flex flex-col rounded-2xl md:rounded-3xl overflow-hidden"
                        style={{ background: '#FFFFFF', border: '1px solid #1A1A1A', boxShadow: '0 30px 90px rgba(0,0,0,0.35)', animation: 'mf-pop .22s cubic-bezier(.2,.8,.2,1)' }}
                    >
                        <div className="flex items-center justify-between gap-3 px-4 py-2.5 border-b border-[#1A1A1A]/15" style={{ background: '#F7F4EF' }}>
                            <div className="min-w-0">
                                <div className="text-[10px] font-bold tracking-widest" style={{ color: '#FF9855', fontFamily: "'Space Grotesk', sans-serif" }}>SAMPLE REPORT</div>
                                <div className="text-xs md:text-sm font-bold text-[#1A1A1A] truncate">解析サンプル — 実際にお届けするレポートと同じ形式</div>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                                <a
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hidden sm:inline-block text-xs font-semibold px-3 py-1.5 rounded-full border border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-colors"
                                >
                                    新しいタブで開く ↗
                                </a>
                                <button
                                    type="button"
                                    onClick={close}
                                    aria-label="閉じる"
                                    className="w-9 h-9 rounded-full border border-[#1A1A1A] text-lg leading-none hover:bg-[#1A1A1A] hover:text-white transition-colors"
                                >
                                    ×
                                </button>
                            </div>
                        </div>
                        <div className="relative flex-1 min-h-0" style={{ background: '#FFFFFF' }}>
                            {!loaded && (
                                <div className="absolute inset-0 flex items-center justify-center text-sm text-[#4A4A4A]" aria-live="polite">
                                    レポートを読み込んでいます…
                                </div>
                            )}
                            <iframe
                                src={href}
                                title="解析サンプル"
                                onLoad={() => setLoaded(true)}
                                className="w-full h-full block"
                                style={{ border: 0, opacity: loaded ? 1 : 0, transition: 'opacity .2s' }}
                            />
                        </div>
                    </div>
                </div>,
                document.body,
            )}
        </>
    );
}
