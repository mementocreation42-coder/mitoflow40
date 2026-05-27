import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = '解析サンプル | Mitoflow40';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
    return new ImageResponse(
        (
            <div style={{
                width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
                background: '#B2EBF2', padding: 80, position: 'relative',
                fontFamily: 'sans-serif',
            }}>
                <div style={{ fontSize: 28, letterSpacing: 6, color: '#FF9855', fontWeight: 700, marginBottom: 16, display: 'flex' }}>
                    MITOFLOW40 / ANALYSIS SAMPLE
                </div>
                <div style={{ fontSize: 88, fontWeight: 900, color: '#1A1A1A', lineHeight: 1.15, display: 'flex', flexDirection: 'column' }}>
                    <span>あなたに届く、</span>
                    <span style={{ color: '#FF9855' }}>解析レポートの</span>
                    <span>フォーマット。</span>
                </div>
                <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div style={{ fontSize: 22, color: '#1A1A1A', display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontWeight: 700 }}>血液 × カウンセリング × Apple Watch</span>
                        <span style={{ fontSize: 18, color: '#4A4A4A', marginTop: 4 }}>3ソース三角測量で読み解く</span>
                    </div>
                    <div style={{ fontSize: 22, fontWeight: 700, color: '#1A1A1A', display: 'flex' }}>
                        mitoflow40.com/sample
                    </div>
                </div>
            </div>
        ),
        size,
    );
}
