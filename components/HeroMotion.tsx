'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

// トップのヒーローのイラスト。人物とミトコンドリアを部品ごとに分けて「無重力で漂う」9 秒ループの透過動画にしたもの。
// Safari は HEVC（アルファ付き mp4）、それ以外は VP9（アルファ付き webm）。動きを減らす設定の人と再生できない環境には静止画。
const POSTER = '/images/hero/hero-illustration-bl.png';

export default function HeroMotion() {
    const [src, setSrc] = useState<string | null>(null);

    useEffect(() => {
        // 描画後に判定（同期の setState を避ける）
        const id = requestAnimationFrame(() => {
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
            const ua = navigator.userAgent;
            const isSafari = /safari/i.test(ua) && !/chrome|chromium|crios|android|edg/i.test(ua);
            const v = document.createElement('video');
            if (isSafari && v.canPlayType('video/mp4; codecs="hvc1"')) setSrc('/videos/hero-illustration.mp4');
            else if (v.canPlayType('video/webm; codecs="vp9"')) setSrc('/videos/hero-illustration.webm');
        });
        return () => cancelAnimationFrame(id);
    }, []);

    return (
        <div className="absolute -bottom-2 left-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] z-0 pointer-events-none">
            {src ? (
                <video
                    key={src}
                    className="absolute inset-0 w-full h-full object-contain object-bottom"
                    src={src}
                    poster={POSTER}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    aria-hidden
                />
            ) : (
                <Image src={POSTER} alt="Hero Illustration" fill className="object-contain object-bottom" />
            )}
        </div>
    );
}
