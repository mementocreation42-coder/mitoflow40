import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'KNOWLEDGE LIBRARY', title: 'Library', subtitle: '設計図を読み、現在地を知り、材料で整える', bg: '#EDE7F6' });
}
