import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'ミトコンドリア・セルフチェック | Mitoflow40';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
    return new ImageResponse(
        (
            <div style={{
                width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
                background: 'linear-gradient(135deg, #B2EBF2 0%, #FFE3D0 100%)', padding: 80, position: 'relative',
                fontFamily: 'sans-serif',
            }}>
                <div style={{ fontSize: 28, letterSpacing: 6, color: '#FF9855', fontWeight: 700, marginBottom: 16, display: 'flex' }}>
                    MITOCHONDRIA SELF-CHECK
                </div>
                <div style={{ fontSize: 96, fontWeight: 900, color: '#1A1A1A', lineHeight: 1.1, display: 'flex', flexDirection: 'column' }}>
                    <span>あなたの</span>
                    <span><span style={{ color: '#FF9855' }}>ミトコンドリア</span>、</span>
                    <span>元気ですか？</span>
                </div>
                <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div style={{ fontSize: 24, color: '#1A1A1A', display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontWeight: 700 }}>12問・約2分・無料</span>
                        <span style={{ fontSize: 18, color: '#4A4A4A', marginTop: 4 }}>4軸であなたの活性度を可視化</span>
                    </div>
                    <div style={{ fontSize: 22, fontWeight: 700, color: '#1A1A1A', display: 'flex' }}>
                        mitoflow40.com/check
                    </div>
                </div>
            </div>
        ),
        size,
    );
}
