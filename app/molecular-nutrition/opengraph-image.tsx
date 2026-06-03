import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'THE FOUNDATION', title: '分子栄養学とは', subtitle: '栄養で細胞の生化学を最適化する', bg: '#E6DEF4' });
}
