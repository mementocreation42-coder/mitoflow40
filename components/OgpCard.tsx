"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface OgpData {
    url: string;
    title: string;
    description: string | null;
    image: string | null;
    siteName: string;
    favicon: string;
}

export default function OgpCard({ url }: { url: string }) {
    const [data, setData] = useState<OgpData | null>(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch(`/api/ogp?url=${encodeURIComponent(url)}`)
            .then((r) => r.json())
            .then((d) => {
                if (d.error) setError(true);
                else setData(d);
            })
            .catch(() => setError(true));
    }, [url]);

    if (error) return null;
    if (!data) {
        return (
            <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="block border border-gray-200 rounded-xl overflow-hidden hover:border-[#41C9B4] transition-colors my-6 animate-pulse bg-gray-50 h-24"
            />
        );
    }

    const hostname = new URL(url).hostname;

    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex border border-gray-200 rounded-xl overflow-hidden hover:border-[#41C9B4] transition-colors my-6 no-underline bg-white group"
        >
            {data.image && (
                <div className="relative w-[120px] md:w-[200px] flex-shrink-0 bg-gray-100">
                    <Image
                        src={data.image}
                        alt={data.title}
                        fill
                        className="object-cover"
                        unoptimized
                    />
                </div>
            )}
            <div className="flex flex-col justify-center px-4 py-3 min-w-0 flex-1">
                <p className="text-sm font-bold text-[#1A1A1A] line-clamp-2 group-hover:text-[#41C9B4] transition-colors mb-1">
                    {data.title}
                </p>
                {data.description && (
                    <p className="text-xs text-[#4A4A4A]/70 line-clamp-2 mb-2">
                        {data.description}
                    </p>
                )}
                <div className="flex items-center gap-1.5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={data.favicon} alt="" width={14} height={14} className="opacity-60" />
                    <span className="text-xs text-[#4A4A4A]/60 truncate">{hostname}</span>
                </div>
            </div>
        </a>
    );
}
