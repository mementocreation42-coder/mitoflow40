'use client';

import Link from 'next/link';
import { useMemo, useRef, useState } from 'react';
import { searchLibrary } from '@/lib/searchIndex';

export default function LibrarySearch() {
    const [query, setQuery] = useState('');
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const results = useMemo(() => searchLibrary(query), [query]);
    const showResults = open && query.trim().length > 0;

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!showResults) return;
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setActive((a) => Math.min(a + 1, results.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setActive((a) => Math.max(a - 1, 0));
        } else if (e.key === 'Escape') {
            setOpen(false);
        }
    };

    return (
        <div ref={containerRef} className="relative mx-auto my-12 max-w-[440px]">
            <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4A4A4A] pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.35-4.35" />
                    </svg>
                </span>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => { setQuery(e.target.value); setOpen(true); setActive(0); }}
                    onFocus={() => setOpen(true)}
                    onBlur={() => setTimeout(() => setOpen(false), 150)}
                    onKeyDown={handleKeyDown}
                    placeholder="栄養素・食べ物・症状・しくみを検索…"
                    aria-label="Libraryを検索"
                    className="w-full pl-11 pr-10 py-4 text-sm border border-black rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-[#41C9B4]/50 transition-all"
                />
                {query && (
                    <button
                        type="button"
                        onMouseDown={(e) => { e.preventDefault(); setQuery(''); setOpen(false); }}
                        aria-label="クリア"
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#4A4A4A] hover:text-[#1A1A1A] transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 6 6 18" /><path d="m6 6 12 12" />
                        </svg>
                    </button>
                )}
            </div>

            {showResults && (
                <div className="absolute z-20 mt-2 w-full rounded-2xl border border-black bg-white shadow-xl overflow-hidden">
                    {results.length === 0 ? (
                        <p className="px-4 py-5 text-sm text-[#4A4A4A] text-center">
                            「{query}」に一致する項目が見つかりませんでした。
                        </p>
                    ) : (
                        <ul className="max-h-[360px] overflow-y-auto py-1">
                            {results.map((r, i) => (
                                <li key={r.href}>
                                    <Link
                                        href={r.href}
                                        onMouseEnter={() => setActive(i)}
                                        className={`flex items-center gap-3 px-4 py-2.5 transition-colors ${i === active ? 'bg-[#41C9B4]/10' : ''}`}
                                    >
                                        <span className="flex-shrink-0 text-[10px] font-bold tracking-wider text-[#1A1A1A]/45 w-[64px]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                            {r.group}
                                        </span>
                                        <span className="flex-1 min-w-0">
                                            <span className="block text-sm font-bold text-[#1A1A1A] truncate">{r.title}</span>
                                            {r.sub && <span className="block text-xs text-[#4A4A4A] truncate">{r.sub}</span>}
                                        </span>
                                        <span className="flex-shrink-0 text-[#41C9B4]" aria-hidden>→</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
}
