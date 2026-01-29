import { getPostsPaginated } from "@/lib/wp";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import JournalSearch from "@/components/JournalSearch";
import { Suspense } from "react";

export const revalidate = 60;

// Helper function to generate post URL using ID
function getPostUrl(post: { id: number }) {
    return `/journal/${post.id}`;
}

export default async function JournalIndex({
    searchParams,
}: {
    searchParams: Promise<{ page?: string; search?: string }>;
}) {
    const { page: pageParam, search } = await searchParams;
    const currentPage = parseInt(pageParam || "1", 10);
    const { posts, totalPages } = await getPostsPaginated(currentPage, 30, search);

    return (
        <div className="max-w-[1000px] mx-auto px-4 py-12 md:py-24">
            <div className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    HYPERPAST JOURNAL
                </h1>
                <p className="text-[#4A4A4A]">日々の気づきと実践の記録</p>
            </div>

            {/* Search Box */}
            <Suspense fallback={<div className="h-12 mb-12" />}>
                <JournalSearch />
            </Suspense>

            {/* Search Result Info */}
            {search && (
                <div className="text-center mb-8">
                    <p className="text-[#4A4A4A]">
                        「<span className="font-bold text-[#1A1A1A]">{search}</span>」の検索結果: {posts.length}件
                    </p>
                    <Link href="/journal" className="text-sm text-[#41C9B4] hover:underline mt-2 inline-block">
                        検索をクリア
                    </Link>
                </div>
            )}

            {posts.length === 0 ? (
                <div className="text-center py-16">
                    <p className="text-[#4A4A4A] text-lg">記事が見つかりませんでした</p>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => {
                        const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0];
                        const imageUrl = featuredMedia?.source_url;

                        return (
                            <Link href={getPostUrl(post)} key={post.id} className="group block text-[#1A1A1A] visited:text-[#999999]">
                                <article className="h-full flex flex-col">
                                    <div className="aspect-[16/9] relative overflow-hidden rounded-xl mb-4 bg-gray-100">
                                        {imageUrl ? (
                                            <Image
                                                src={imageUrl}
                                                alt={featuredMedia?.alt_text || post.title.rendered}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100">
                                                No Image
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-sm text-[#4A4A4A]/70 mb-2 font-mono">
                                            {format(new Date(post.date), 'yyyy.MM.dd')}
                                        </div>
                                        <h2
                                            className="text-xl font-bold group-hover:text-[#41C9B4] group-active:text-[#41C9B4] transition-colors line-clamp-2 leading-tight"
                                            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                                        />
                                        <div
                                            className="mt-3 text-sm text-[#4A4A4A] line-clamp-3 leading-relaxed opacity-80"
                                            dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                                        />
                                    </div>
                                </article>
                            </Link>
                        );
                    })}
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="mt-16 flex justify-center items-center gap-6">
                    {currentPage > 1 && (
                        <Link
                            href={`/journal${search ? `?search=${encodeURIComponent(search)}` : ''}`}
                            className="px-6 py-3 bg-white text-[#1A1A1A] border border-[#1A1A1A] rounded-full font-bold hover:bg-[#41C9B4] hover:text-white hover:border-[#1A1A1A] transition-colors"
                        >
                            ← 最初へ
                        </Link>
                    )}

                    <span className="text-[#4A4A4A] font-mono text-lg">
                        {currentPage} / {totalPages}
                    </span>

                    {currentPage < totalPages && (
                        <Link
                            href={`/journal?page=${currentPage + 1}${search ? `&search=${encodeURIComponent(search)}` : ''}`}
                            className="px-6 py-3 bg-white text-[#1A1A1A] border border-[#1A1A1A] rounded-full font-bold hover:bg-[#41C9B4] hover:text-white hover:border-[#1A1A1A] transition-colors"
                        >
                            次へ →
                        </Link>
                    )}
                </div>
            )}
        </div>
    );
}
