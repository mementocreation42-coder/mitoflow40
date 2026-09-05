import Link from 'next/link';
import type { RelatedGroup } from '@/lib/related';

// 自動生成の「次に読む」ブロック。lib/related.ts の逆引き結果を描画する。
// グループが空なら何も出さない（ページごとの手書き関連セクションと共存できる）。
export default function RelatedBlock({ groups, eyebrow = 'NEXT TO READ' }: { groups: RelatedGroup[]; eyebrow?: string }) {
    const nonEmpty = groups.filter((g) => g.cards.length > 0);
    if (nonEmpty.length === 0) return null;
    return (
        <section className="mb-12">
            <div className="text-[10px] tracking-widest text-[#1A1A1A]/50 font-bold mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{eyebrow}</div>
            <h2 className="text-2xl font-bold text-[#1A1A1A] mb-5 border-l-4 border-[#41C9B4] pl-3 leading-tight">次に読む</h2>
            <div className="space-y-6">
                {nonEmpty.map((g) => (
                    <div key={g.key}>
                        <p className="text-sm font-bold text-[#1A1A1A]/70 mb-2">{g.title}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {g.cards.map((c) => (
                                <Link key={c.href} href={c.href}
                                    className="flex items-center gap-3 p-3 rounded-xl border border-[#1A1A1A]/20 hover:border-[#1A1A1A] hover:-translate-y-0.5 hover:shadow-sm transition-all bg-white/70">
                                    <span className="flex-shrink-0 px-3 py-1 rounded-lg text-sm font-bold text-[#1A1A1A]" style={{ background: c.color ?? '#F2F2F2' }}>{c.label}</span>
                                    {c.sub && <span className="text-xs text-[#4A4A4A] leading-snug line-clamp-2">{c.sub}</span>}
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
