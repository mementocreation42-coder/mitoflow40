import Link from "next/link";

// クライアントポータル専用のガワ（/counseling-sheet・/checkout 共通）。
// マーケティングサイトの Header（LIBRARY/JOURNAL 等のナビ）や Footer とは切り離し、
// 「自分の情報を扱う私的な場所」であることが伝わる最小構成にする。
export default function PortalShell({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen">
            {/* ポータル専用ヘッダー：ナビは置かないが、ロゴからは本サイトへ戻れるようにする */}
            <header className="w-full bg-white/90 backdrop-blur-sm border-b border-[#1A1A1A]/15">
                <div className="max-w-[820px] mx-auto px-6 md:px-4 h-[60px] flex items-center justify-between">
                    <Link href="/" aria-label="Mitoflow40 トップへ"
                        className="text-xl font-bold tracking-tight text-[#1A1A1A] hover:opacity-70 transition-opacity"
                        style={{ fontFamily: "'MuseoModerno', sans-serif" }}>
                        Mitoflow40
                    </Link>
                    <span className="text-[10px] tracking-widest font-bold px-3 py-1 rounded-full bg-[#D7F7ED] text-[#246E58] border border-[#B8E4D7]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        CLIENT PORTAL
                    </span>
                </div>
            </header>

            <main className="flex-1">
                {children}
            </main>

            {/* ポータル専用フッター：最小限（サイト回遊リンクは置かない） */}
            <footer className="border-t border-[#1A1A1A]/10 bg-white/70">
                <div className="max-w-[820px] mx-auto px-6 md:px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#1A1A1A]/50">
                    <span>Mitoflow40 クライアントポータル</span>
                    <div className="flex items-center gap-4">
                        <Link href="/legal" className="hover:text-[#1A1A1A] transition-colors">特定商取引法に基づく表記</Link>
                        <Link href="/privacy" className="hover:text-[#1A1A1A] transition-colors">プライバシーポリシー</Link>
                        <span>© {new Date().getFullYear()} Mitoflow40</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
