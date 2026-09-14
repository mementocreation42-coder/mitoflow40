import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'CELL & METABOLISM', title: '代謝と細胞のしくみ', subtitle: '解糖系からオートファジーまで、細胞の中の生化学', bg: '#D7F0E8' });
}
