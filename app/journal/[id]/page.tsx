import { getPostById, getRelatedPosts } from "@/lib/wp";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { notFound } from "next/navigation";
import JournalAuthor from "@/components/JournalAuthor";
import JournalContent from "@/components/JournalContent";
import JournalNewsletter from "@/components/JournalNewsletter";
import JournalStickyCategory from "@/components/JournalStickyCategory";
import { getCategories } from "@/lib/wp";

export const revalidate = 60;

export default async function JournalPost({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const postId = parseInt(id, 10);

    if (isNaN(postId)) {
        notFound();
    }

    const [post, allCategories] = await Promise.all([
        getPostById(postId),
        getCategories(),
    ]);

    if (!post) {
        notFound();
    }

    const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0];
    const categories = post._embedded?.['wp:term']?.[0] ?? [];

    return (
        <article className="max-w-[660px] mx-auto px-6 md:px-4 py-12 md:py-24">
            {/* Header */}
            <header className="mb-10 text-center">
                {featuredMedia && (
                    <div className="aspect-[16/9] relative w-full overflow-hidden rounded-2xl shadow-sm mb-8">
                        <Image
                            src={featuredMedia.source_url}
                            alt={featuredMedia.alt_text || post.title.rendered}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                )}
                <div className="text-sm text-[#4A4A4A]/70 mb-4 font-mono">
                    {format(new Date(post.date), 'yyyy.MM.dd')}
                </div>
                <h1
                    className="text-3xl md:text-4xl font-bold text-[#1A1A1A] leading-tight mb-6"
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                />
            </header>

            {/* Sticky Category */}
            <JournalStickyCategory categories={allCategories} activeIds={categories.map((c: any) => c.id)} />

            {/* Author */}
            <JournalAuthor />

            {/* Content */}
            <JournalContent html={post.content.rendered} />

            {/* Newsletter */}
            <JournalNewsletter />

            {/* Related Articles */}
            <div className="pt-12 border-t border-gray-200">
                <h2 className="text-2xl font-bold text-center mb-12" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    RELATED ARTICLES
                </h2>
                <div className="grid md:grid-cols-3 gap-8 mb-12">
                    {(await getRelatedPosts(postId, 3)).map((relatedPost) => {
                        const relatedImage = relatedPost._embedded?.['wp:featuredmedia']?.[0];
                        const relatedImageUrl = relatedImage?.source_url;

                        return (
                            <Link href={`/journal/${relatedPost.id}`} key={relatedPost.id} className="group block text-[#1A1A1A] visited:text-[#999999]">
                                <article className="h-full flex flex-col">
                                    <div className="aspect-[16/9] relative overflow-hidden rounded-xl mb-4 bg-gray-100">
                                        {relatedImageUrl ? (
                                            <Image
                                                src={relatedImageUrl}
                                                alt={relatedImage?.alt_text || relatedPost.title.rendered}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-[#4A4A4A]/30">
                                                No Image
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <time className="text-xs text-[#4A4A4A]/70 font-mono mb-2 block">
                                            {format(new Date(relatedPost.date), 'yyyy.MM.dd')}
                                        </time>
                                        <h3
                                            className="text-lg font-bold group-hover:text-[#41C9B4] group-active:text-[#41C9B4] transition-colors line-clamp-2"
                                            dangerouslySetInnerHTML={{ __html: relatedPost.title.rendered }}
                                        />
                                    </div>
                                </article>
                            </Link>
                        );
                    })}
                </div>
            </div>

            <div className="text-center">
                <Link
                    href="/journal"
                    className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-[#1A1A1A] rounded-full font-bold hover:bg-[#41C9B4] hover:text-white hover:border-[#1A1A1A] transition-colors"
                >
                    一覧に戻る
                </Link>
            </div>
        </article>
    );
}
