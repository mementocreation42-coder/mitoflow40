"use client";

import { useEffect, useRef } from "react";
import OgpCard from "./OgpCard";
import { createRoot } from "react-dom/client";

// URLのみの段落をOGPカードに置換する
const STANDALONE_URL_RE = /^https?:\/\/[^\s<>"]+$/;

export default function JournalContent({ html }: { html: string }) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!ref.current) return;
        const paragraphs = ref.current.querySelectorAll("p");
        paragraphs.forEach((p) => {
            const text = p.textContent?.trim() ?? "";
            if (!STANDALONE_URL_RE.test(text)) return;

            const url = text;
            const wrapper = document.createElement("div");
            wrapper.className = "not-prose";
            p.replaceWith(wrapper);
            const root = createRoot(wrapper);
            root.render(<OgpCard url={url} />);
        });
    }, [html]);

    return (
        <div
            ref={ref}
            className="prose prose-lg prose-slate mx-auto prose-headings:font-bold prose-headings:text-[#1A1A1A] prose-p:text-[#4A4A4A] prose-p:font-medium prose-p:leading-[1.75] prose-p:my-8 prose-li:font-medium prose-li:leading-[1.75] prose-blockquote:font-medium prose-a:text-[#41C9B4] prose-img:rounded-xl"
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
}
