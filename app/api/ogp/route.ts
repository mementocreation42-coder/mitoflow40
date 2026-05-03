import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const url = request.nextUrl.searchParams.get("url");
    if (!url) {
        return NextResponse.json({ error: "url is required" }, { status: 400 });
    }

    try {
        const res = await fetch(url, {
            headers: { "User-Agent": "Mozilla/5.0 (compatible; Mitoflow40Bot/1.0)" },
            next: { revalidate: 3600 },
        });
        const html = await res.text();

        const getMeta = (property: string) => {
            const match =
                html.match(new RegExp(`<meta[^>]+property=["']${property}["'][^>]+content=["']([^"']+)["']`, "i")) ||
                html.match(new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+property=["']${property}["']`, "i"));
            return match?.[1] || null;
        };

        const getMetaName = (name: string) => {
            const match =
                html.match(new RegExp(`<meta[^>]+name=["']${name}["'][^>]+content=["']([^"']+)["']`, "i")) ||
                html.match(new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+name=["']${name}["']`, "i"));
            return match?.[1] || null;
        };

        const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);

        const origin = new URL(url).origin;
        const hostname = new URL(url).hostname;

        const image = getMeta("og:image");
        const resolvedImage = image
            ? image.startsWith("http")
                ? image
                : `${origin}${image}`
            : null;

        return NextResponse.json({
            url,
            title: getMeta("og:title") || getMetaName("title") || titleMatch?.[1] || hostname,
            description: getMeta("og:description") || getMetaName("description") || null,
            image: resolvedImage,
            siteName: getMeta("og:site_name") || hostname,
            favicon: `https://www.google.com/s2/favicons?domain=${hostname}&sz=32`,
        });
    } catch {
        return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
    }
}
