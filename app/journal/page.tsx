import Link from "next/link";
import JournalSearch from "@/components/JournalSearch";
import JournalList from "@/components/JournalList";
import { Suspense } from "react";

export const revalidate = 3600;

export default function JournalIndex() {
    return (
        <div className="max-w-[1000px] mx-auto px-6 md:px-4 py-12 md:py-24">
            <div className="text-center mb-8">
                <h1 className="inline-block text-left font-bold mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    <span className="block text-sm md:text-base tracking-widest mb-1 text-[#4A4A4A]">HYPERPAST</span>
                    <span className="block text-4xl md:text-5xl leading-none text-[#1A1A1A]">JOURNAL</span>
                </h1>
                <p className="text-[#4A4A4A]">日々の気づきと実践の記録</p>
            </div>

            {/* Search Box */}
            <Suspense fallback={<div className="h-12 mb-12" />}>
                <JournalSearch />
            </Suspense>

            {/* Post List (Client Side) */}
            <Suspense fallback={<div className="h-96" />}>
                <JournalList />
            </Suspense>
        </div>
    );
}
