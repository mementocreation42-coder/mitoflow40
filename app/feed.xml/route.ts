import { featuredImageUrl, getLatestPosts } from "@/lib/wp";

// サイトの RSS（中身は Journal の新着）。RSS リーダー（SAL Reader など）でフォローできるようにする
export const revalidate = 3600;

const SITE_URL = "https://mitoflow40.com";
const TITLE = "Mitoflow40";
const DESCRIPTION = "40代からの健康実践・ミトコンドリア最適化・精密栄養学など、最先端の健康情報と実践の記録。";

// WordPress の date はタイムゾーンなしの日本時間。Vercel（UTC）でそのまま読むと 9 時間ずれる
const jst = (d: string) => new Date(/(?:[zZ]|[+-]\d{2}:?\d{2})$/.test(d) ? d : `${d}+09:00`);

// 本文を RSS に入れる（CDATA の終わり記号が本文に出てきても壊れないように分ける）
const cdata = (html: string) => `<![CDATA[${html.replace(/]]>/g, ']]]]><![CDATA[>')}]]>`;

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// WordPress の HTML 断片をプレーンテキストにする
const plain = (html: string) =>
  html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, c) => String.fromCodePoint(Number(c)))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&(amp|lt|gt|quot|hellip|#039);/g, (_, n) => ({ amp: "&", lt: "<", gt: ">", quot: '"', hellip: "…", "#039": "'" })[n as string] ?? "")
    .replace(/\s+/g, " ")
    .replace(/\s*\[…\]$/, "…")
    .trim();

export async function GET() {
  const posts = await getLatestPosts(30);
  const items = posts.map((post) => {
    const url = `${SITE_URL}/journal/${post.id}`;
    const image = featuredImageUrl(post, ["medium_large", "large", "medium"]);
    return [
      "    <item>",
      `      <title>${esc(plain(post.title.rendered))}</title>`,
      `      <link>${url}</link>`,
      `      <guid isPermaLink="true">${url}</guid>`,
      `      <pubDate>${jst(post.date).toUTCString()}</pubDate>`,
      `      <description>${esc(plain(post.excerpt?.rendered ?? ""))}</description>`,
      post.content?.rendered ? `      <content:encoded>${cdata(post.content.rendered)}</content:encoded>` : "",
      image ? `      <media:thumbnail url="${esc(encodeURI(image))}"/>` : "",
      "    </item>",
    ]
      .filter(Boolean)
      .join("\n");
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${esc(TITLE)}</title>
    <link>${SITE_URL}/</link>
    <description>${esc(DESCRIPTION)}</description>
    <language>ja</language>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
${items.join("\n")}
  </channel>
</rss>
`;
  return new Response(xml, {
    headers: {
      "content-type": "application/rss+xml; charset=utf-8",
      "cache-control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
