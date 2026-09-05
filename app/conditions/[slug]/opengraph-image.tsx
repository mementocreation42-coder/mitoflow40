import { ImageResponse } from 'next/og';
import { getConditionBySlug, conditions } from '@/lib/conditions';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Mitoflow40';

export function generateStaticParams() {
    return conditions.map((c) => ({ slug: c.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const c = getConditionBySlug(slug);
    const name = c?.name ?? 'CONDITIONS';
    const en = c?.en ?? '';
    const tagline = c?.tagline ?? '';
    const bg = c?.color ?? '#FCE3D4';

    return new ImageResponse(
        (
            <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: bg, padding: '70px 80px', fontFamily: 'sans-serif' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 30, fontWeight: 700, color: '#1A1A1A' }}>
                    <div>Mitoflow40</div>
                    <div style={{ fontSize: 22, color: '#FF9855', letterSpacing: 4 }}>CONDITIONS ／ 不調・現代病</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ fontSize: 24, color: '#1A1A1A', opacity: 0.55, marginBottom: 8, letterSpacing: 2 }}>{en}</div>
                    <div style={{ fontSize: 68, fontWeight: 800, color: '#1A1A1A', lineHeight: 1.1 }}>{name}</div>
                    <div style={{ fontSize: 30, color: '#1A1A1A', opacity: 0.8, marginTop: 18 }}>{tagline}</div>
                </div>
            </div>
        ),
        { ...size }
    );
}
