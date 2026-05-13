'use client';

import { useEffect, useRef, useState, memo } from 'react';

// ===== OGPカード（本番と同じ /api/ogp を使用） =====
interface OgpData { url: string; title: string; description: string | null; image: string | null; siteName: string; favicon: string }

function OgpCardPreview({ url }: { url: string }) {
  const [data, setData] = useState<OgpData | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`/api/ogp?url=${encodeURIComponent(url)}`)
      .then((r) => r.json())
      .then((d) => { if (d.error) setError(true); else setData(d); })
      .catch(() => setError(true));
  }, [url]);

  if (error) return (
    <a href={url} target="_blank" rel="noopener noreferrer" style={{
      display: 'block', padding: '12px 16px', border: '1px solid #e5e5e5', borderRadius: 12,
      color: '#41C9B4', fontSize: 13, wordBreak: 'break-all', margin: '16px 0',
    }}>{url}</a>
  );

  if (!data) return (
    <div style={{
      height: 96, border: '1px solid #e5e5e5', borderRadius: 12, margin: '16px 0',
      background: '#f9f9f9', animation: 'pulse 1.5s ease-in-out infinite',
    }} />
  );

  const hostname = new URL(url).hostname;

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" style={{
      display: 'grid',
      gridTemplateColumns: data.image ? '140px 1fr' : '1fr',
      border: '1px solid #e5e5e5', borderRadius: 12, overflow: 'hidden',
      textDecoration: 'none', margin: '-16px 0 20px', background: '#fff',
      transition: 'border-color 0.2s', minHeight: 110,
    }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#41C9B4')}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#e5e5e5')}
    >
      {data.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={data.image}
          alt={data.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', margin: 0, borderRadius: 0 }}
        />
      )}
      <div style={{ padding: '14px 16px', minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 4 }}>
        <p style={{ fontSize: 14, fontWeight: 700, color: '#1A1A1A', margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {data.title}
        </p>
        {data.description && (
          <p style={{ fontSize: 12, color: 'rgba(74,74,74,0.65)', margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {data.description}
          </p>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 2 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={data.favicon} alt="" width={13} height={13} style={{ opacity: 0.5, flexShrink: 0 }} />
          <span style={{ fontSize: 11, color: 'rgba(74,74,74,0.55)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{hostname}</span>
        </div>
      </div>
    </a>
  );
}

// ===== AuthorCard =====
function AuthorCard() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 16,
      padding: '20px', borderRadius: 16, background: '#b8f0e0', marginBottom: 32,
    }}>
      <div style={{ width: 56, height: 56, borderRadius: '50%', overflow: 'hidden', flexShrink: 0, border: '2px solid #41C9B4' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/profile.jpg" alt="Daisuke Kobayashi" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 11, letterSpacing: '0.1em', color: 'rgba(74,74,74,0.6)', marginBottom: 2 }}>DAISUKE KOBAYASHI</p>
        <p style={{ fontSize: 14, fontWeight: 700, color: '#1A1A1A', marginBottom: 4 }}>小林大介</p>
        <p style={{ fontSize: 12, color: 'rgba(74,74,74,0.7)', lineHeight: 1.6 }}>
          ビデオグラファー / フォトグラファー / Webサービス構築。<br />40代からの健康戦略をパーソナルヘルスケアとして実践・発信中。
        </p>
      </div>
    </div>
  );
}

// ===== 本文レンダラー（URLをカードに変換） =====
const STANDALONE_URL = /^https?:\/\/[^\s<>"]+$/;

interface ContentBlock {
  type: 'html' | 'url' | 'image';
  content: string;
  imageUrl?: string;
}

function parseBlocks(body: string, uploadedImages: { url: string; id: number }[]): ContentBlock[] {
  const paras = body.split(/\n{2,}/);
  const blocks: ContentBlock[] = [];

  for (const para of paras) {
    const t = para.trim();
    if (!t) continue;

    // [image:N]
    if (/^\[image:(\d+)\]$/.test(t)) {
      const n = parseInt(t.match(/\d+/)![0], 10);
      const img = uploadedImages[n];
      if (img) blocks.push({ type: 'image', content: t, imageUrl: img.url });
      continue;
    }

    // standalone URL
    if (STANDALONE_URL.test(t)) {
      blocks.push({ type: 'url', content: t });
      continue;
    }

    // HTML block
    if (/^<(h[2-6]|ul|ol|blockquote|figure|table)/i.test(t)) {
      blocks.push({ type: 'html', content: t });
      continue;
    }

    // paragraph
    blocks.push({ type: 'html', content: `<p>${t.replace(/\n/g, '<br>')}</p>` });
  }

  return blocks;
}

// ===== prose CSS（本番と同様） =====
const PROSE_CSS = `
  .preview-prose { font-family: "Noto Sans JP", "Hiragino Sans", sans-serif; color: #4A4A4A; font-size: 16px; line-height: 1.9; }
  .preview-prose h2 { font-size: 22px; font-weight: 700; color: #1A1A1A; margin: 40px 0 14px; padding-bottom: 10px; border-bottom: 2px solid #e5e5e5; font-family: "Space Grotesk", "Noto Sans JP", sans-serif; }
  .preview-prose h3 { font-size: 18px; font-weight: 700; color: #1A1A1A; margin: 32px 0 10px; }
  .preview-prose p { margin: 0 0 20px; }
  .preview-prose ul { list-style: disc; padding-left: 24px; margin: 16px 0; }
  .preview-prose ol { list-style: decimal; padding-left: 24px; margin: 16px 0; }
  .preview-prose li { margin-bottom: 8px; line-height: 1.8; }
  .preview-prose blockquote { border-left: 3px solid #41C9B4; padding: 12px 20px; margin: 24px 0; background: #f0fdf9; color: #4A4A4A; border-radius: 0 8px 8px 0; font-style: italic; }
  .preview-prose strong { font-weight: 700; color: #1A1A1A; }
  .preview-prose em { font-style: italic; }
  .preview-prose a { color: #41C9B4; text-decoration: underline; }
  .preview-prose img { border-radius: 12px; max-width: 100%; display: block; margin: 20px 0; }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
`;

// ===== メインプレビューコンポーネント =====
interface LivePreviewProps {
  title: string;
  date: string;
  body: string;
  excerpt: string;
  featuredImage: { url: string; id: number } | null;
  selectedCats: number[];
  categories: { id: number; name: string }[];
  uploadedImages: { url: string; id: number }[];
}

export default memo(function LivePreview({
  title, date, body, featuredImage, selectedCats, categories, uploadedImages,
}: LivePreviewProps) {
  const blocks = parseBlocks(body, uploadedImages);

  return (
    <div style={{
      background: '#fff', borderRadius: 12, overflow: 'hidden',
      border: '1px solid #e5e5e5', position: 'sticky', top: 112,
    }}>
      {/* ブラウザバー */}
      <div style={{
        padding: '10px 16px', background: '#f8f8f8', borderBottom: '1px solid #e5e5e5',
        display: 'flex', alignItems: 'center', gap: 6,
      }}>
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57', display: 'inline-block' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e', display: 'inline-block' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840', display: 'inline-block' }} />
        <span style={{ fontSize: 11, color: '#bbb', marginLeft: 8 }}>mitoflow40.com/journal/…</span>
        <span style={{ marginLeft: 'auto', fontSize: 11, color: '#41C9B4', fontWeight: 600 }}>● LIVE</span>
      </div>

      {/* スクロールエリア */}
      <div style={{ maxHeight: 'calc(100vh - 180px)', overflowY: 'auto', padding: '0 0 40px' }}>
        <style>{PROSE_CSS}</style>

        <article style={{ maxWidth: 660, margin: '0 auto', padding: '40px 24px' }}>
          {/* アイキャッチ */}
          {featuredImage && (
            <div style={{ aspectRatio: '16/9', position: 'relative', width: '100%', overflow: 'hidden', borderRadius: 16, marginBottom: 32 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={featuredImage.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          )}

          {/* 日付 */}
          <div style={{ fontSize: 13, color: 'rgba(74,74,74,0.7)', marginBottom: 16, fontFamily: 'monospace' }}>
            {new Date(date).toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '.')}
          </div>

          {/* タイトル */}
          <h1 style={{
            fontSize: 28, fontWeight: 700, color: '#1A1A1A', lineHeight: 1.4,
            marginBottom: 32, fontFamily: '"Noto Sans JP", sans-serif',
          }}>
            {title || <span style={{ color: '#ccc' }}>タイトル未入力</span>}
          </h1>

          {/* カテゴリ */}
          {selectedCats.length > 0 && (
            <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
              {selectedCats.map((id) => {
                const cat = categories.find((c) => c.id === id);
                return cat ? (
                  <span key={id} style={{
                    fontSize: 12, padding: '4px 12px', background: '#f0fdf9',
                    border: '1px solid #41C9B4', borderRadius: 20, color: '#41C9B4',
                  }}>{cat.name}</span>
                ) : null;
              })}
            </div>
          )}

          {/* 著者カード */}
          <AuthorCard />

          {/* 本文ブロック */}
          <div className="preview-prose">
            {blocks.length === 0 && (
              <p style={{ color: '#ccc' }}>本文を入力するとここに表示されます</p>
            )}
            {blocks.map((block, i) => {
              if (block.type === 'image') {
                return (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={i} src={block.imageUrl} alt="" style={{ borderRadius: 12, maxWidth: '100%', display: 'block', margin: '20px 0' }} />
                );
              }
              if (block.type === 'url') {
                return <OgpCardPreview key={i} url={block.content} />;
              }
              return <div key={i} dangerouslySetInnerHTML={{ __html: block.content }} />;
            })}
          </div>
        </article>
      </div>
    </div>
  );
});
