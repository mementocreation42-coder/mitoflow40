import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'COUNTERCULTURE', title: '対抗文化が生んだもの', subtitle: 'フラワームーブメントからパソコンまで', bg: '#ECE4F2' });
}
