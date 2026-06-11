import Link from 'next/link';

// 会員限定コンテンツのソフトゲート。
// active=true（ゲート対象 かつ 未ログイン）のとき、子要素の代わりに
// 「この続きは会員限定」の案内カードを表示する。
// active=false のときは子要素をそのまま描画する。
export default function MemberGate({
    active,
    children,
    label = 'この続きは会員限定です',
}: {
    active: boolean;
    children: React.ReactNode;
    label?: string;
}) {
    if (!active) return <>{children}</>;

    return (
        <div className="relative my-10">
            {/* 上端だけ少し中身を覗かせるティーザー（ぼかし） */}
            <div className="pointer-events-none select-none overflow-hidden" style={{ maxHeight: 120, maskImage: 'linear-gradient(to bottom, black, transparent)', WebkitMaskImage: 'linear-gradient(to bottom, black, transparent)' }} aria-hidden>
                <div className="blur-[6px] opacity-60">{children}</div>
            </div>

            {/* 案内カード */}
            <div className="mt-4 rounded-2xl border border-black bg-white/90 p-6 md:p-8 text-center">
                <div className="text-2xl mb-2" aria-hidden>🔒</div>
                <p className="text-xs tracking-widest font-bold mb-2 text-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    MEMBERS ONLY
                </p>
                <h3 className="text-lg md:text-xl font-bold text-[#1A1A1A] mb-2">{label}</h3>
                <p className="text-sm text-[#4A4A4A] leading-relaxed mb-5 max-w-[420px] mx-auto">
                    精密栄養学視点の<strong>理想値</strong>・関わる<strong>栄養素</strong>と<strong>遺伝子</strong>・<strong>整え方</strong>は、無料の会員登録でご覧いただけます。
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                    <Link href="/login" className="inline-block px-7 py-3 rounded-full text-sm font-bold hover:opacity-90 transition"
                        style={{ fontFamily: "'Space Grotesk', sans-serif", background: '#1A1A1A', color: '#FFFFFF' }}>
                        無料登録して続きを読む →
                    </Link>
                    <Link href="/login" className="inline-block px-7 py-3 rounded-full text-sm font-bold bg-white text-[#1A1A1A] border border-black hover:bg-[#41C9B4] hover:text-white transition-colors">
                        ログイン
                    </Link>
                </div>
            </div>
        </div>
    );
}
