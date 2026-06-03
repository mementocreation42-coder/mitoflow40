import { ImageResponse } from 'next/og';
import { getFoodBySlug, foods } from '@/lib/foods';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Mitoflow40';

export function generateStaticParams() {
    return foods.map((f) => ({ slug: f.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const f = getFoodBySlug(slug);
    const name = f?.name ?? 'FOODS';
    const en = f?.en ?? '';
    const tagline = f?.tagline ?? '';
    const bg = f?.color ?? '#FFF4E2';

    return new ImageResponse(
        (
            <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: bg, padding: '70px 80px', fontFamily: 'sans-serif' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 30, fontWeight: 700, color: '#1A1A1A' }}>
                    <div>Mitoflow40</div>
                    <div style={{ fontSize: 22, color: '#FF9855', letterSpacing: 4 }}>FOODS ／ 食べ物</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ fontSize: 92, fontWeight: 800, color: '#1A1A1A', lineHeight: 1.05 }}>{name}</div>
                    <div style={{ fontSize: 26, color: '#1A1A1A', opacity: 0.55, marginTop: 6 }}>{en}</div>
                    <div style={{ fontSize: 30, color: '#1A1A1A', opacity: 0.8, marginTop: 18 }}>{tagline}</div>
                </div>
            </div>
        ),
        { ...size }
    );
}
