import { ImageResponse } from 'next/og';
import { readFileSync } from 'fs';
import { join } from 'path';

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = 'image/png';

// public/images 配下の画像を data URI として読み込む（ImageResponse はローカルパス不可のため）
function loadImage(file: string): string | null {
    try {
        const buf = readFileSync(join(process.cwd(), 'public', 'images', file));
        return `data:image/png;base64,${buf.toString('base64')}`;
    } catch {
        return null;
    }
}

// コンセプト/生活習慣/老化ページ共通のOG画像テンプレート
export function ogImage({ eyebrow, title, subtitle, bg, image = 'for-you-illustration-bl.png', imageSide = 'left' }: { eyebrow: string; title: string; subtitle?: string; bg: string; image?: string; imageSide?: 'left' | 'right' }) {
    const imgSrc = image ? loadImage(image) : null;
    const onLeft = imgSrc != null && imageSide === 'left';
    const onRight = imgSrc != null && imageSide === 'right';
    // 画像がある側と反対にテキストを寄せる
    const alignItems = onLeft ? 'flex-end' : 'flex-start';
    const textAlign = onLeft ? 'right' : 'left';
    return new ImageResponse(
        (
            <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: bg, padding: '70px 80px', fontFamily: 'sans-serif', overflow: 'hidden' }}>
                {imgSrc ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={imgSrc}
                        alt=""
                        width={470}
                        height={424}
                        style={{ position: 'absolute', bottom: -30, [onLeft ? 'left' : 'right']: -50, opacity: 0.95, objectFit: 'contain' }}
                    />
                ) : null}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 30, fontWeight: 700, color: '#1A1A1A' }}>
                    <div>Mitoflow40</div>
                    <div style={{ fontSize: 22, color: '#41C9B4', letterSpacing: 4 }}>{eyebrow}</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems, textAlign, maxWidth: imgSrc ? 760 : '100%', marginLeft: onLeft ? 'auto' : 0 }}>
                    <div style={{ fontSize: 80, fontWeight: 800, color: '#1A1A1A', lineHeight: 1.15 }}>{title}</div>
                    {subtitle ? <div style={{ fontSize: 30, color: '#1A1A1A', opacity: 0.7, marginTop: 16 }}>{subtitle}</div> : null}
                </div>
                <div style={{ display: 'flex', justifyContent: onLeft ? 'flex-end' : 'flex-start', fontSize: 22, color: '#1A1A1A', opacity: 0.5 }}>40代からの健康戦略 ／ KNOWLEDGE LIBRARY</div>
            </div>
        ),
        { ...ogSize }
    );
}
