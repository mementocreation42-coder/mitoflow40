import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'LIBRARY MAP', title: 'ライブラリマップ', subtitle: '全体の構造を、ひと目で', bg: '#FFF1DF' });
}
