"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const CATEGORY_COLORS: Record<number, string> = {
    1:  "#E07B5A", // 食事・栄養 - orange
    5:  "#5BBF8A", // 運動 - green
    10: "#7B9DE0", // 生活習慣 - blue
    11: "#C97BAF", // サプリメント - pink
    12: "#E0C97B", // データ・効果検証 - yellow
};

const CATEGORY_ORDER = [1, 5, 10, 11, 12];

type Category = { id: number; name: string; slug: string; count: number };

function CapsuleButton({
    label,
    color,
    isActive,
    onClick,
}: {
    label: string;
    color: string;
    isActive: boolean;
    onClick: () => void;
}) {
    const [hovered, setHovered] = useState(false);
    const filled = isActive || hovered;

    return (
        <button
            onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="relative h-9 rounded-full overflow-hidden flex items-center justify-center text-xs font-bold whitespace-nowrap cursor-pointer"
            style={{
                padding: "0 20px",
                border: `2px solid ${filled ? color : "#D1D5DB"}`,
                transition: "border-color 0.2s",
            }}
        >
            {/* カラー背景（ホバー・アクティブで全体に広がる） */}
            <span
                className="absolute inset-0"
                style={{
                    background: color,
                    transform: filled ? "translateX(0%)" : "translateX(-50%)",
                    transition: "transform 0.25s ease",
                }}
                aria-hidden
            />
            {/* 右半分ホワイト（ホバーで縮む） */}
            <span
                className="absolute inset-y-0 right-0 bg-white"
                style={{
                    width: filled ? "0%" : "50%",
                    transition: "width 0.25s ease",
                }}
                aria-hidden
            />
            {/* テキスト */}
            <span
                className="relative z-10 text-xs font-bold transition-colors duration-200"
                style={{ color: filled ? "white" : "#1A1A1A" }}
            >
                {label}
            </span>
        </button>
    );
}

export default function JournalCategoryFilter({ categories }: { categories: Category[] }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const current = searchParams.get("category");

    const sorted = [...categories].sort(
        (a, b) => CATEGORY_ORDER.indexOf(a.id) - CATEGORY_ORDER.indexOf(b.id)
    );

    function handleClick(id: number | null) {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("page");
        if (id === null) {
            params.delete("category");
        } else {
            params.set("category", String(id));
        }
        router.push(`/journal?${params.toString()}`);
    }

    const allActive = !current;

    return (
        <div className="flex flex-wrap gap-3 justify-center mb-10">
            <CapsuleButton
                label="すべて"
                color="#41C9B4"
                isActive={allActive}
                onClick={() => handleClick(null)}
            />
            {sorted.map((cat) => (
                <CapsuleButton
                    key={cat.id}
                    label={cat.name}
                    color={CATEGORY_COLORS[cat.id] ?? "#41C9B4"}
                    isActive={current === String(cat.id)}
                    onClick={() => handleClick(cat.id)}
                />
            ))}
        </div>
    );
}
