"use client";

import { useState, useEffect } from "react";

interface ProductCardProps {
  amazonUrl?: string;
  rakutenUrl?: string;
  title?: string;
  image?: string;
  price?: string;
  brand?: string;
  description?: string;
}

const AMAZON_TAG = "enigamid-22";
const RAKUTEN_TAG = "10e021c5.0d5d8fee.10e021c6.4a09ea17";

function formatAmazonUrl(url?: string) {
  if (!url) return "";
  try {
    const u = new URL(url.startsWith("http") ? url : `https://${url}`);
    if (u.searchParams.has("tag")) return u.toString();
    u.searchParams.set("tag", AMAZON_TAG);
    return u.toString();
  } catch {
    if (url.includes("tag=")) return url;
    const sep = url.includes("?") ? "&" : "?";
    return `${url}${sep}tag=${AMAZON_TAG}`;
  }
}

function formatRakutenUrl(url?: string) {
  if (!url) return "";
  try {
    const u = new URL(url.startsWith("http") ? url : `https://${url}`);
    if (u.searchParams.has("afid")) return u.toString();
    u.searchParams.set("afid", RAKUTEN_TAG);
    return u.toString();
  } catch {
    return url;
  }
}

export default function ProductCard({
  amazonUrl,
  rakutenUrl,
  title: initialTitle,
  image: initialImage,
  price: initialPrice,
  brand: initialBrand,
  description,
}: ProductCardProps) {
  const [loading, setLoading] = useState(!initialTitle && !!(amazonUrl || rakutenUrl));
  const [meta, setMeta] = useState({
    title: initialTitle || "",
    image: initialImage || "",
    price: initialPrice || "",
    brand: initialBrand || "",
  });

  useEffect(() => {
    if (initialTitle || !(amazonUrl || rakutenUrl)) return;
    const target = amazonUrl || rakutenUrl!;
    setLoading(true);
    fetch(`/api/product-metadata?url=${encodeURIComponent(target)}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => setMeta({
        title: d.title || "",
        image: d.image || "",
        price: d.price || "",
        brand: d.brand || "",
      }))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [initialTitle, amazonUrl, rakutenUrl]);

  const aAmazon = formatAmazonUrl(amazonUrl);
  const aRakuten = formatRakutenUrl(rakutenUrl);

  if (loading) {
    return (
      <div className="not-prose my-8 flex flex-col md:flex-row border border-gray-200 rounded-2xl overflow-hidden bg-white animate-pulse">
        <div className="md:w-[200px] aspect-square bg-gray-100" />
        <div className="flex-1 p-6 space-y-3">
          <div className="h-3 w-20 bg-gray-100 rounded" />
          <div className="h-5 w-3/4 bg-gray-100 rounded" />
          <div className="h-5 w-1/2 bg-gray-100 rounded" />
          <div className="h-8 w-32 bg-gray-100 rounded mt-4" />
        </div>
      </div>
    );
  }

  const { title, image, price, brand } = meta;

  return (
    <div className="not-prose my-8">
      <div className="flex flex-col md:flex-row border border-gray-200 rounded-2xl overflow-hidden bg-white hover:border-[#41C9B4] transition-colors">
        <div className="md:w-[200px] flex-shrink-0 bg-white p-5 flex items-center justify-center">
          <div className="w-full aspect-square relative flex items-center justify-center">
            {image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={image}
                alt={title || "Product"}
                className="max-w-full max-h-full object-contain"
              />
            ) : (
              <div className="text-gray-300 text-sm">No Image</div>
            )}
          </div>
        </div>

        <div className="flex-1 p-5 md:p-6 flex flex-col gap-1 min-w-0">
          {brand && (
            <span className="text-[11px] uppercase tracking-[0.15em] text-[#41C9B4] font-medium mb-1">
              {brand}
            </span>
          )}
          <h3 className="text-base md:text-lg font-bold text-[#1A1A1A] leading-snug line-clamp-2 m-0">
            {title}
          </h3>
          {description && (
            <p className="text-sm text-[#4A4A4A]/70 leading-relaxed mt-2 line-clamp-2">
              {description}
            </p>
          )}

          <div className="mt-auto pt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            {price && (
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-bold text-[#1A1A1A]">{price}</span>
                <span className="text-[10px] text-[#4A4A4A]/60">（税込）</span>
              </div>
            )}

            <div className="flex gap-2 flex-wrap">
              {amazonUrl && (
                <a
                  href={aAmazon}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="px-4 py-2 rounded-md text-xs font-bold bg-[#ff9900] text-black hover:bg-[#ffb84d] transition no-underline inline-flex items-center gap-1.5"
                >
                  <span>Amazon</span>
                  <span>で探す</span>
                </a>
              )}
              {rakutenUrl && (
                <a
                  href={aRakuten}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="px-4 py-2 rounded-md text-xs font-bold bg-[#bf0000] text-white hover:bg-[#e60000] transition no-underline inline-flex items-center gap-1.5"
                >
                  <span className="bg-white text-[#bf0000] w-4 h-4 inline-flex items-center justify-center rounded-full text-[10px] font-black leading-none">R</span>
                  <span>楽天で探す</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
