'use client';

import { memo, useEffect, useState } from 'react';
import Image from 'next/image';
import {
  parseBlocks, CATEGORY_COLORS, DEFAULT_CATEGORY_COLOR, AMAZON_RE,
  type ContentBlock, type ProductData, type UploadedImage,
} from './postBody';
import styles from './PostEditor.module.css';

// 公開ページ（/journal/[id]）と同じ並びで記事を描く、エディタ用のリアルタイムプレビュー。
// 1 カラムのエディタの下に全幅で置かれる（以前は右カラムの固定ペインだった）。
// 編集用のボタンは持たない。入力はすべてフォーム側で行い、ここは「いま公開したらこう見える」だけを映す。

// ===== OGP カード（本番と同じ /api/ogp を使用）=====
interface OgpData { url: string; title: string; description: string | null; image: string | null; siteName: string; favicon: string }

// URL ごとの取得結果をモジュール内で使い回す。段落を足して並びが変わってもカードを取り直さない
const ogpCache = new Map<string, Promise<OgpData | null>>();
function loadOgp(url: string): Promise<OgpData | null> {
  let p = ogpCache.get(url);
  if (!p) {
    p = fetch(`/api/ogp?url=${encodeURIComponent(url)}`)
      .then((r) => r.json())
      .then((d) => (d.error ? null : (d as OgpData)))
      .catch(() => null)
      .then((d) => { if (!d) ogpCache.delete(url); return d; }); // 失敗は覚えない（次の表示で再試行）
    ogpCache.set(url, p);
  }
  return p;
}

function OgpCardPreview({ url }: { url: string }) {
  const [data, setData] = useState<OgpData | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let alive = true;
    loadOgp(url).then((d) => { if (!alive) return; if (d) setData(d); else setError(true); });
    return () => { alive = false; };
  }, [url]);

  if (error) return <a href={url} target="_blank" rel="noopener noreferrer" className={styles.cardFallback}>{url}</a>;
  if (!data) return <div className={styles.cardLoading} />;

  const hostname = new URL(url).hostname;
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={`${styles.linkCard} ${data.image ? '' : styles.linkCardNoImg}`}>
      {data.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={data.image} alt={data.title} />
      )}
      <div className={styles.linkBody}>
        <p className={styles.linkTitle}>{data.title}</p>
        {data.description && <p className={styles.linkDesc}>{data.description}</p>}
        <div className={styles.linkMeta}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={data.favicon} alt="" />
          <span>{hostname}</span>
        </div>
      </div>
    </a>
  );
}

// ===== 商品カード（Amazon／楽天）=====
type ProductMeta = { title: string; image: string; price: string; brand: string };
const productCache = new Map<string, Promise<ProductMeta | null>>();
function loadProduct(url: string): Promise<ProductMeta | null> {
  let p = productCache.get(url);
  if (!p) {
    p = fetch(`/api/product-metadata?url=${encodeURIComponent(url)}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d): ProductMeta => ({ title: d.title || '', image: d.image || '', price: d.price || '', brand: d.brand || '' }))
      .catch(() => null)
      .then((d) => { if (!d) productCache.delete(url); return d; });
    productCache.set(url, p);
  }
  return p;
}

function ProductCardView({ p, url }: { p: ProductData; url: string }) {
  const isAmazon = AMAZON_RE.test(url);
  return (
    <div className={styles.productCard}>
      <div className={styles.productImg}>
        {p.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={p.image} alt={p.title || ''} />
        ) : <span className={styles.productNoImg}>No Image</span>}
      </div>
      <div className={styles.productBody}>
        {p.brand && <span className={styles.productBrand}>{p.brand}</span>}
        <p className={styles.productTitle}>{p.title || url}</p>
        <div className={styles.productFoot}>
          {p.price && <span className={styles.productPrice}>{p.price}</span>}
          <span className={`${styles.productBtn} ${isAmazon ? styles.productBtnAmazon : styles.productBtnRakuten}`}>{isAmazon ? 'Amazonで探す' : '楽天で探す'}</span>
        </div>
      </div>
    </div>
  );
}

function ProductCardPreview({ url }: { url: string }) {
  const [data, setData] = useState<ProductMeta | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let alive = true;
    loadProduct(url).then((d) => { if (!alive) return; if (d) setData(d); else setFailed(true); });
    return () => { alive = false; };
  }, [url]);

  if (failed) return <a href={url} target="_blank" rel="noopener noreferrer" className={styles.cardFallback}>{url}</a>;
  if (!data) return <div className={styles.cardLoading} style={{ height: 140 }} />;
  return <ProductCardView p={data} url={url} />;
}

function AuthorCard() {
  return (
    <div className={styles.author}>
      <div className={styles.authorAvatar}>
        <Image src="/images/misc/profile.jpg" alt="Daisuke Kobayashi" width={56} height={56} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p className={styles.authorEn}>DAISUKE KOBAYASHI</p>
        <p className={styles.authorName}>小林大介</p>
        <p className={styles.authorBio}>ビデオグラファー / フォトグラファー / Webサービス構築。<br />40代からの健康戦略をパーソナルヘルスケアとして実践・発信中。</p>
      </div>
    </div>
  );
}

function formatDate(date: string): string {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return '----.--.--';
  return d.toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '.');
}

export interface LivePreviewProps {
  title: string;
  date: string;
  body: string;
  featuredImage: UploadedImage | null;
  selectedCats: number[];
  categories: { id: number; name: string }[];
  uploadedImages: UploadedImage[];
}

export default memo(function LivePreview({ title, date, body, featuredImage, selectedCats, categories, uploadedImages }: LivePreviewProps) {
  const blocks = parseBlocks(body, uploadedImages);
  const cats = categories.filter((c) => selectedCats.includes(c.id));

  // 外部取得を伴うカードは URL を key にして、並び順が変わっても作り直さない（同じ URL は連番で区別）
  const seen = new Map<string, number>();
  const keyFor = (block: ContentBlock, i: number): string => {
    if (block.type !== 'url' && block.type !== 'product') return String(i);
    const base = `${block.type}:${block.url}`;
    const n = (seen.get(base) ?? 0) + 1;
    seen.set(base, n);
    return n === 1 ? base : `${base}#${n}`;
  };

  const render = (block: ContentBlock, key: string) => {
    switch (block.type) {
      case 'paragraph': return <p key={key} dangerouslySetInnerHTML={{ __html: block.html }} />;
      case 'heading': {
        const Tag = `h${block.level}` as 'h2' | 'h3' | 'h4';
        return <Tag key={key} dangerouslySetInnerHTML={{ __html: block.html }} />;
      }
      case 'list': {
        const Tag = block.ordered ? 'ol' : 'ul';
        return <Tag key={key}>{block.items.map((it, j) => <li key={j} dangerouslySetInnerHTML={{ __html: it }} />)}</Tag>;
      }
      case 'quote': return <blockquote key={key} dangerouslySetInnerHTML={{ __html: block.html }} />;
      case 'html': return <div key={key} dangerouslySetInnerHTML={{ __html: block.html }} />;
      case 'image':
        return block.image
          // eslint-disable-next-line @next/next/no-img-element
          ? <img key={key} src={block.image.url} alt="" />
          : <div key={key} className={styles.missing}>[image:{block.index}] に対応する画像がありません（ドロップまたは「メディアから画像」で追加すると番号が付きます）</div>;
      case 'url': return <OgpCardPreview key={key} url={block.url} />;
      case 'product': return <ProductCardPreview key={key} url={block.url} />;
      case 'productCustom': return <ProductCardView key={key} p={block.product} url={block.product.amazonUrl || block.product.rakutenUrl || ''} />;
    }
  };

  return (
    <div className={styles.frame}>
      <div className={styles.bar}>
        <span className={styles.dot} style={{ background: '#ff5f57' }} />
        <span className={styles.dot} style={{ background: '#febc2e' }} />
        <span className={styles.dot} style={{ background: '#28c840' }} />
        <span className={styles.barUrl}>mitoflow40.com/journal/…</span>
        <span className={styles.barLive}>● LIVE</span>
      </div>

      <article className={styles.article}>
        {featuredImage ? (
          <div className={styles.hero}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={featuredImage.url} alt="" />
          </div>
        ) : (
          <div className={styles.heroEmpty}>アイキャッチ画像（未設定）</div>
        )}

        <div className={styles.date}>{formatDate(date)}</div>
        <h1 className={`${styles.title} ${title ? '' : styles.titleEmpty}`}>{title || 'タイトル未入力'}</h1>

        {cats.length > 0 && (
          <div className={styles.cats}>
            {cats.map((c) => <span key={c.id} className={styles.cat} style={CATEGORY_COLORS[c.id] ?? DEFAULT_CATEGORY_COLOR}>{c.name}</span>)}
          </div>
        )}

        <AuthorCard />

        <div className={styles.prose}>
          {blocks.length === 0 && <p className={styles.empty}>本文を入力するとここに表示されます</p>}
          {blocks.map((b, i) => render(b, keyFor(b, i)))}
        </div>
      </article>
    </div>
  );
});
