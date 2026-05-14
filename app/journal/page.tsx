import type { Metadata } from 'next';
import JournalSearch from "@/components/JournalSearch";
import JournalList from "@/components/JournalList";
import JournalCategoryFilter from "@/components/JournalCategoryFilter";
import { Suspense } from "react";
import { getCategories } from "@/lib/wp";

export const revalidate = 60;

export const metadata: Metadata = {
    title: 'JoUrNaL | Mitoflow40',
    description: '40代からの健康実践・ミトコンドリア最適化・精密栄養学など、最先端の健康情報と実践の記録。',
    alternates: { canonical: 'https://mitoflow40.com/journal' },
    openGraph: {
        title: 'JoUrNaL | Mitoflow40',
        description: '40代からの健康実践・ミトコンドリア最適化・精密栄養学など、最先端の健康情報と実践の記録。',
        url: 'https://mitoflow40.com/journal',
        type: 'website',
    },
};

const CATEGORY_BG: Record<number, string> = {
    1:  "#FAD9CE",
    10: "#CDD8F5",
    11: "#ECCAE3",
    12: "#F5EAC0",
    13: "#C0EDD8",
};

export default async function JournalIndex({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
    const { category } = await searchParams;
    const allCategories = await getCategories();
    const categories = allCategories.filter(c => c.slug !== 'journal' && c.name !== 'Journal');

    const categoryId = category ? parseInt(category, 10) : null;
    const bgColor = categoryId && CATEGORY_BG[categoryId] ? CATEGORY_BG[categoryId] : "#FAC8D2";

    return (
        <div className="min-h-screen" style={bgColor ? { background: bgColor } : undefined}>
        <div className="max-w-[800px] mx-auto px-6 md:px-4 py-12 md:py-24">
            <div className="text-center mb-8">
                <h1 className="inline-block text-left font-bold mb-4 relative">
                    <span
                        style={{
                            fontFamily: "var(--font-handwrite), monospace",
                            fontSize: "clamp(9px, 2vw, 12px)",
                            color: "#111",
                            letterSpacing: "0.25em",
                            transform: "rotate(-8deg)",
                            display: "inline-block",
                            background: "#fff",
                            padding: "2px 6px",
                            position: "absolute",
                            top: "-18px",
                            left: "-12px",
                            whiteSpace: "nowrap",
                        }}
                    >HYPER Health</span>
                    <span
                        className="block leading-none"
                        style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: "clamp(32px, 9vw, 52px)",
                            color: "#111",
                            letterSpacing: "0.02em",
                            background: "#FFE600",
                            display: "inline-block",
                            padding: "0 10px 4px",
                            transform: "rotate(-1deg)",
                            boxShadow: "4px 4px 0 #111",
                            textTransform: "none",
                        }}
                    >JoUrNaL</span>
                </h1>
                <p className="text-[#4A4A4A]">最先端の健康情報と実践と記録</p>
            </div>

            {/* Search Box */}
            <Suspense fallback={<div className="h-12 mb-12" />}>
                <JournalSearch />
            </Suspense>

            {/* Category Filter */}
            <Suspense fallback={<div className="h-10 mb-10" />}>
                <JournalCategoryFilter categories={categories} />
            </Suspense>

            {/* Post List (Client Side) */}
            <Suspense fallback={<div className="h-96" />}>
                <JournalList />
            </Suspense>
        </div>
        </div>
    );
}
