"use client";

import { useEffect, useRef } from "react";
import OgpCard from "./OgpCard";
import ProductCard from "./ProductCard";
import { createRoot, type Root } from "react-dom/client";

const STANDALONE_URL_RE = /^https?:\/\/[^\s<>"]+$/;
const AMAZON_RE = /amazon\.co\.jp|amzn\.to|amzn\.asia/i;
const RAKUTEN_RE = /rakuten\.co\.jp|item\.rakuten/i;

export default function JournalContent({ html }: { html: string }) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!ref.current) return;
        const roots: Root[] = [];

        // ⓪ <div class="mf-product-card" data-...> を ProductCard に置換
        const productDivs = ref.current.querySelectorAll('div.mf-product-card');
        productDivs.forEach((d) => {
            const amazonUrl = d.getAttribute('data-amazon-url') || undefined;
            const rakutenUrl = d.getAttribute('data-rakuten-url') || undefined;
            if (!amazonUrl && !rakutenUrl) return;
            const title = d.getAttribute('data-title') || undefined;
            const image = d.getAttribute('data-image') || undefined;
            const price = d.getAttribute('data-price') || undefined;
            const brand = d.getAttribute('data-brand') || undefined;
            const wrapper = document.createElement('div');
            wrapper.className = 'not-prose';
            d.replaceWith(wrapper);
            const root = createRoot(wrapper);
            roots.push(root);
            root.render(
                <ProductCard
                    amazonUrl={amazonUrl}
                    rakutenUrl={rakutenUrl}
                    title={title}
                    image={image}
                    price={price}
                    brand={brand}
                />
            );
        });

        // ① 段落内に単独URLがある場合 → OGP / ProductCard
        const paragraphs = ref.current.querySelectorAll("p");
        paragraphs.forEach((p) => {
            const text = p.textContent?.trim() ?? "";
            if (!STANDALONE_URL_RE.test(text)) return;

            const url = text;
            const wrapper = document.createElement("div");
            wrapper.className = "not-prose";
            p.replaceWith(wrapper);
            const root = createRoot(wrapper);
            roots.push(root);

            if (AMAZON_RE.test(url)) {
                root.render(<ProductCard amazonUrl={url} />);
            } else if (RAKUTEN_RE.test(url)) {
                root.render(<ProductCard rakutenUrl={url} />);
            } else {
                root.render(<OgpCard url={url} />);
            }
        });

        // ② <a> 単独で Amazon/楽天リンクの場合も ProductCard へ
        const anchors = ref.current.querySelectorAll("a");
        anchors.forEach((a) => {
            const href = a.getAttribute("href") || "";
            if (!href.startsWith("http")) return;
            const text = a.textContent?.trim() ?? "";
            // テキストがURLそのものか空のときだけカード化（リンクテキストがある場合は通常リンク）
            if (text && text !== href) return;
            const isAmazon = AMAZON_RE.test(href);
            const isRakuten = RAKUTEN_RE.test(href);
            if (!isAmazon && !isRakuten) return;

            const wrapper = document.createElement("div");
            wrapper.className = "not-prose";
            // <a>の親が<p>で他に子が無いなら<p>ごと置換
            const parent = a.parentElement;
            if (parent && parent.tagName === "P" && parent.childNodes.length === 1) {
                parent.replaceWith(wrapper);
            } else {
                a.replaceWith(wrapper);
            }
            const root = createRoot(wrapper);
            roots.push(root);
            root.render(
                <ProductCard
                    amazonUrl={isAmazon ? href : undefined}
                    rakutenUrl={isRakuten ? href : undefined}
                />
            );
        });

        return () => {
            // 次回render前にunmountして警告を避ける
            roots.forEach((r) => {
                queueMicrotask(() => r.unmount());
            });
        };
    }, [html]);

    return (
        <div
            ref={ref}
            className="prose prose-slate mx-auto prose-headings:font-bold prose-headings:text-[#1A1A1A] prose-p:text-[#4A4A4A] prose-p:font-medium prose-p:leading-[1.75] prose-p:my-8 prose-li:font-medium prose-li:leading-[1.75] prose-blockquote:font-medium prose-a:text-[#41C9B4] prose-img:rounded-xl"
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
}
