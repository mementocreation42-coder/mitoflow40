import { ImageResponse } from 'next/og';
import { getGeneBySlug, genes } from '@/lib/genes';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Mitoflow40';

export function generateStaticParams() {
    return genes.map((g) => ({ slug: g.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const g = getGeneBySlug(slug);
    const symbol = g?.symbol ?? 'GENES';
    const name = g?.name ?? '';
    const tagline = g?.tagline ?? '';
    const bg = g?.color ?? '#DCF1EA';

    return new ImageResponse(
        (
            <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: bg, padding: '70px 80px', fontFamily: 'sans-serif' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 30, fontWeight: 700, color: '#1A1A1A' }}>
                    <div>Mitoflow40</div>
                    <div style={{ fontSize: 22, color: '#FF9855', letterSpacing: 4 }}>GENES ／ 遺伝子</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ fontSize: 96, fontWeight: 800, color: '#1A1A1A', lineHeight: 1.05 }}>{symbol}</div>
                    <div style={{ fontSize: 26, color: '#1A1A1A', opacity: 0.55, marginTop: 6 }}>{name}</div>
                    <div style={{ fontSize: 30, color: '#1A1A1A', opacity: 0.8, marginTop: 18 }}>{tagline}</div>
                </div>
            </div>
        ),
        { ...size }
    );
}
