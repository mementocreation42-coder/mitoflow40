import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'のぼれミトス ／ MITOFLOW';

export default function Image() {
    return ogImage({ eyebrow: 'MITOFLOW ／ ゆっくり', title: 'のぼれミトス', subtitle: '子どもと遊べる、ゆっくりな ミトスのゲーム。', bg: '#FBE3E7', image: 'pricing/pricing-plan-illustration.png', imageSide: 'right', titleSize: 88 });
}
