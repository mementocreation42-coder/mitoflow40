'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';

export default function JournalSearch() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();
    const [query, setQuery] = useState(searchParams.get('search') || '');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        startTransition(() => {
            if (query.trim()) {
                router.push(`/journal?search=${encodeURIComponent(query.trim())}`);
            } else {
                router.push('/journal');
            }
        });
    };

    return (
        <form onSubmit={handleSubmit} className="mx-auto mb-12" style={{ width: '100%', maxWidth: '420px' }}>
            <div className="relative">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="記事を検索..."
                    className="w-full px-4 py-2 pr-10 text-sm border border-[#1A1A1A]/30 rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-[#41C9B4]/50 focus:border-[#41C9B4] transition-all"
                />
                <button
                    type="submit"
                    disabled={isPending}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-[#4A4A4A] hover:text-[#1A1A1A] transition-colors disabled:opacity-50"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.35-4.35" />
                    </svg>
                </button>
            </div>
        </form>
    );
}
