import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = '歩けミトス ／ MITOFLOW';

export default function Image() {
    return ogImage({ eyebrow: 'MITOFLOW ／ ゆっくり', title: '歩けミトス', subtitle: '子どもと遊べる、ゆっくりな ミトスのゲーム。', bg: '#FBE3E7', image: 'pricing/pricing-plan-illustration.png', imageSide: 'right', titleSize: 88 });
}
