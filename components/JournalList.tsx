'use client';

import useSWR from 'swr';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { useSearchParams } from 'next/navigation';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function JournalList() {
    const searchParams = useSearchParams();
    const page = searchParams.get('page') || '1';
    const search = searchParams.get('search') || '';

    const { data, error, isLoading, isValidating } = useSWR(
        `/api/journal?page=${page}&search=${encodeURIComponent(search)}`,
        fetcher,
        {
            keepPreviousData: true,
        }
    );

    if (error) return <div className="text-center py-16 text-red-500">読み込みに失敗しました</div>;

    if (isLoading && !data) {
        return (
            <div>
                {/* Skeleton Loader */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="h-full flex flex-col">
                            <div className="aspect-[16/9] bg-gray-200 rounded-xl mb-4 animate-pulse" />
                            <div className="flex-1">
                                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-2" />
                                <div className="h-6 w-full bg-gray-200 rounded animate-pulse mb-3" />
                                <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    const { posts, totalPages, currentPage } = data;

    if (posts.length === 0) {
        return (
            <div className="text-center py-16">
                <p className="text-[#4A4A4A] text-lg">記事が見つかりませんでした</p>
            </div>
        );
    }

    return (
        <div className={`transition-opacity duration-300 ${isValidating ? 'opacity-50' : 'opacity-100'}`}>
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

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post: any) => {
                    const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0];
                    const imageUrl = featuredMedia?.source_url;

                    return (
                        <Link href={`/journal/${post.id}`} key={post.id} className="group block text-[#1A1A1A] visited:text-[#999999]">
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

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="mt-16 flex justify-center items-center gap-6">
                    {currentPage > 1 && (
                        <Link
                            href={`/journal?page=${currentPage - 1}${search ? `&search=${encodeURIComponent(search)}` : ''}`}
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
