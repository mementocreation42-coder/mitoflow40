import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'GYM BOOM', title: 'ジムの乱立を読む', subtitle: '運動を「買う」時代を中立に', bg: '#E7E0F2' });
}
