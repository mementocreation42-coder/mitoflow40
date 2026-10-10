'use client';

import { useEffect, useState } from 'react';
import { getPhoto } from '@/lib/meal-photos';

// IndexedDB の写真を表示する。クリックで大きく開く。
export default function Photo({ id, className, onOpen }: { id: string; className: string; onOpen?: (url: string) => void }) {
    const [url, setUrl] = useState<string | null>(null);
    useEffect(() => {
        let u: string | null = null;
        let alive = true;
        getPhoto(id).then((b) => { if (b && alive) { u = URL.createObjectURL(b); setUrl(u); } }).catch(() => {});
        return () => { alive = false; if (u) URL.revokeObjectURL(u); };
    }, [id]);
    if (!url) return <div className={`${className} bg-[#F2F2F2]`} />;
    return (
        <button type="button" onClick={() => onOpen?.(url)} className="block p-0" aria-label="写真を大きく見る">
            {/* eslint-disable-next-line @next/next/no-img-element -- 端末内の写真（blob URL）なので next/image は使えない */}
            <img src={url} alt="" className={`${className} object-cover`} />
        </button>
    );
}
