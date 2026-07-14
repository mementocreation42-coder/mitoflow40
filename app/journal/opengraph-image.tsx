import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'JOURNAL', title: 'ジャーナル', subtitle: '読みもの・お知らせ', bg: '#FFF1DF' });
}
