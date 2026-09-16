import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = '走れミトス ／ MITOFLOW';

export default function Image() {
    return ogImage({ eyebrow: 'MITOFLOW ／ GAME', title: '走れミトス', subtitle: 'タップでジャンプ。良い食べ物で ATP を保て。', bg: '#F7D9DE', image: 'pricing/pricing-plan-illustration.png', imageSide: 'right', titleSize: 88 });
}
