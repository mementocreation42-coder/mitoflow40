import { ImageResponse } from 'next/og';

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = 'image/png';

// コンセプト/生活習慣/老化ページ共通のOG画像テンプレート
export function ogImage({ eyebrow, title, subtitle, bg }: { eyebrow: string; title: string; subtitle?: string; bg: string }) {
    return new ImageResponse(
        (
            <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: bg, padding: '70px 80px', fontFamily: 'sans-serif' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 30, fontWeight: 700, color: '#1A1A1A' }}>
                    <div>Mitoflow40</div>
                    <div style={{ fontSize: 22, color: '#41C9B4', letterSpacing: 4 }}>{eyebrow}</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ fontSize: 80, fontWeight: 800, color: '#1A1A1A', lineHeight: 1.15 }}>{title}</div>
                    {subtitle ? <div style={{ fontSize: 30, color: '#1A1A1A', opacity: 0.7, marginTop: 16 }}>{subtitle}</div> : null}
                </div>
                <div style={{ fontSize: 22, color: '#1A1A1A', opacity: 0.5 }}>40代からの健康戦略 ／ KNOWLEDGE LIBRARY</div>
            </div>
        ),
        { ...ogSize }
    );
}
