import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'HISTAMINE', title: 'ヒスタミンとは', subtitle: 'アレルギー・胃酸・脳・分解酵素を中立に', bg: '#F6E2DC' });
}
