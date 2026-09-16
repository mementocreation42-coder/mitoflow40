import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'MITOFLOW ／ ミトコンドリア、はしる';

export default function Image() {
    return ogImage({ eyebrow: 'MITOFLOW ／ GAME', title: 'ミトコンドリア、はしる', subtitle: 'タップでジャンプ。良い食べ物で ATP を保て。', bg: '#F7D9DE', image: 'pricing/pricing-plan-illustration.png', imageSide: 'right' });
}
