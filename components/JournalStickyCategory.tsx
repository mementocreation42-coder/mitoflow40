'use client';

import Link from 'next/link';
import { useState } from 'react';

const CATEGORY_COLORS: Record<number, string> = {
    1:  "#E07B5A",
    5:  "#5BBF8A",
    10: "#7B9DE0",
    11: "#C97BAF",
    12: "#E0C97B",
};

const CATEGORY_ORDER = [1, 5, 10, 11, 12];

type Cat = { id: number; name: string; slug: string; count: number };

function CapsuleLink({ label, color, isActive, href }: { label: string; color: string; isActive: boolean; href: string }) {
    const [hovered, setHovered] = useState(false);
    const filled = isActive || hovered;

    return (
        <Link
            href={href}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="relative h-9 rounded-full overflow-hidden flex items-center justify-center font-bold whitespace-nowrap"
            style={{
                fontSize: "clamp(10px, 2.5vw, 12px)",
                padding: "0 20px",
                border: `2px solid ${filled ? color : "#D1D5DB"}`,
                transition: "border-color 0.2s",
            }}
        >
            <span
                className="absolute inset-0"
                style={{
                    background: color,
                    transform: filled ? "translateX(0%)" : "translateX(-50%)",
                    transition: "transform 0.25s ease",
                }}
                aria-hidden
            />
            <span
                className="absolute inset-y-0 right-0 bg-white"
                style={{
                    width: filled ? "0%" : "50%",
                    transition: "width 0.25s ease",
                }}
                aria-hidden
            />
            <span
                className="relative z-10 font-bold transition-colors duration-200"
                style={{ color: filled ? "white" : "#1A1A1A", fontSize: "inherit" }}
            >
                {label}
            </span>
        </Link>
    );
}

export default function JournalStickyCategory({
    categories,
    activeIds = [],
}: {
    categories: Cat[];
    activeIds?: number[];
}) {
    if (!categories.length) return null;

    const sorted = [...categories].sort(
        (a, b) => CATEGORY_ORDER.indexOf(a.id) - CATEGORY_ORDER.indexOf(b.id)
    );

    return (
        <div className="sticky top-0 z-30 flex justify-center py-3 -mx-6 px-6 md:-mx-4 md:px-4 mb-8">
            <div
                className="flex flex-wrap gap-2 px-4 py-3 rounded-full"
                style={{
                    background: 'rgba(255,255,255,0.88)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.10), 0 1px 0 rgba(255,255,255,0.8) inset',
                    border: '1px solid rgba(0,0,0,0.07)',
                }}
            >
                {sorted.map((cat) => (
                    <CapsuleLink
                        key={cat.id}
                        label={cat.name}
                        color={CATEGORY_COLORS[cat.id] ?? '#41C9B4'}
                        isActive={activeIds.includes(cat.id)}
                        href={`/journal?category=${cat.id}`}
                    />
                ))}
            </div>
        </div>
    );
}
