import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'OXIDATIVE STRESS', title: '活性酸素（さびる）', subtitle: '酸化ストレスと抗酸化', bg: '#F3DEDE' });
}
