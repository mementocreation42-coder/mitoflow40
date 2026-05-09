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
            className="relative rounded-full overflow-hidden flex items-center justify-center font-bold whitespace-nowrap"
            style={{
                height: "clamp(28px, 7vw, 36px)",
                fontSize: "clamp(9px, 2.2vw, 12px)",
                padding: "0 clamp(10px, 3vw, 20px)",
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
        <div className="sticky top-0 z-30 mb-10 -mx-6 md:-mx-4 flex justify-center">
            <div
                className="flex flex-wrap gap-2 justify-center px-6 py-3 w-full md:my-4"
                style={{ maxWidth: "420px" }}
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
