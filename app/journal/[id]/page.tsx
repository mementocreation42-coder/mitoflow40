import { getPostById, getRelatedPosts } from "@/lib/wp";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import JournalAuthor from "@/components/JournalAuthor";
import JournalContent from "@/components/JournalContent";
import JournalNewsletter from "@/components/JournalNewsletter";
import JournalStickyCategory from "@/components/JournalStickyCategory";
import { getCategories } from "@/lib/wp";

export const revalidate = 60;

const SITE_URL = "https://mitoflow40.com";
const SITE_NAME = "Mitoflow40";

// HTML/エンティティを取り除き、指定文字数で切り詰めるユーティリティ
function stripHtml(html: string, maxLength = 160): string {
    const text = html
        .replace(/<[^>]+>/g, "")
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'")
        .replace(/&nbsp;/g, " ")
        .replace(/\s+/g, " ")
        .trim();
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength - 1) + "…";
}

export async function generateMetadata(
    { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
    const { id } = await params;
    const postId = parseInt(id, 10);
    if (isNaN(postId)) return {};

    const post = await getPostById(postId);
    if (!post) return {};

    const title = stripHtml(post.title.rendered, 70);
    const description = stripHtml(post.excerpt.rendered || post.content.rendered, 160);
    const featuredMedia = post._embedded?.["wp:featuredmedia"]?.[0];
    const ogImage = featuredMedia?.source_url;
    const canonical = `${SITE_URL}/journal/${post.id}`;
    const categories = post._embedded?.["wp:term"]?.[0] ?? [];

    return {
        title: { absolute: `${title} | ${SITE_NAME}` },
        description,
        keywords: [
            ...categories.map((c) => c.name),
            "Mitoflow40", "40代", "健康", "ミトコンドリア", "ヘルスケア",
        ],
        alternates: { canonical },
        openGraph: {
            title,
            description,
            url: canonical,
            siteName: SITE_NAME,
            type: "article",
            locale: "ja_JP",
            publishedTime: post.date,
            images: ogImage
                ? [{ url: ogImage, width: 1200, height: 630, alt: featuredMedia.alt_text || title }]
                : undefined,
            authors: ["小林大介"],
            tags: categories.map((c) => c.name),
        },
        twitter: {
            card: ogImage ? "summary_large_image" : "summary",
            title,
            description,
            images: ogImage ? [ogImage] : undefined,
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                "max-image-preview": "large",
                "max-snippet": -1,
            },
        },
    };
}

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

    const CATEGORY_BG: Record<number, string> = {
        1:  "#FAD9CE", // 食事・栄養 - orange
        10: "#CDD8F5", // 生活習慣 - blue
        11: "#ECCAE3", // サプリメント - purple
        12: "#F5EAC0", // データ・効果検証 - yellow
        13: "#C0EDD8", // 運動 - green
    };
    const primaryCat = (categories as any[]).find((c: any) => c.slug !== 'journal' && c.name !== 'Journal');
    const bgColor = primaryCat ? (CATEGORY_BG[primaryCat.id] ?? '#B8F5E8') : '#B8F5E8';

    // JSON-LD 構造化データ（Article schema）
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: stripHtml(post.title.rendered, 110),
        description: stripHtml(post.excerpt.rendered || post.content.rendered, 200),
        image: featuredMedia ? [featuredMedia.source_url] : undefined,
        datePublished: post.date,
        dateModified: post.date,
        author: {
            "@type": "Person",
            name: "小林大介",
            url: `${SITE_URL}/#profile`,
        },
        publisher: {
            "@type": "Organization",
            name: SITE_NAME,
            logo: {
                "@type": "ImageObject",
                url: `${SITE_URL}/icon.png`,
            },
        },
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${SITE_URL}/journal/${post.id}`,
        },
        articleSection: categories.map((c) => c.name).join(", "),
    };

    return (
        <div className="min-h-screen" style={{ background: bgColor }}>
        <article className="max-w-[660px] mx-auto px-6 md:px-4 py-12 md:py-24">
            {/* 構造化データ */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Header */}
            <header className="mb-10 text-center">
                {featuredMedia && (
                    <div className="aspect-[16/9] relative w-full overflow-hidden rounded-2xl shadow-sm mb-8">
                        <Image
                            src={featuredMedia.source_url}
                            alt={featuredMedia.alt_text || stripHtml(post.title.rendered, 100)}
                            fill
                            sizes="(max-width: 660px) 100vw, 660px"
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
            <JournalStickyCategory categories={allCategories.filter(c => c.slug !== 'journal')} activeIds={categories.map((c: any) => c.id)} />

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
                                                sizes="(max-width: 768px) 100vw, 220px"
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
        </div>
    );
}
