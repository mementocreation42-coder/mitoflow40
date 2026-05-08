import JournalSearch from "@/components/JournalSearch";
import JournalList from "@/components/JournalList";
import JournalCategoryFilter from "@/components/JournalCategoryFilter";
import { Suspense } from "react";
import { getCategories } from "@/lib/wp";

export const revalidate = 60;

export default async function JournalIndex() {
    const categories = await getCategories();

    return (
        <div className="max-w-[800px] mx-auto px-6 md:px-4 py-12 md:py-24">
            <div className="text-center mb-8">
                <h1 className="inline-block text-left font-bold mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    <span className="block text-sm md:text-base tracking-widest mb-1 text-[#4A4A4A]">HYPER  Health</span>
                    <span className="block text-4xl md:text-5xl leading-none text-[#1A1A1A]">JOURNAL</span>
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
    );
}
