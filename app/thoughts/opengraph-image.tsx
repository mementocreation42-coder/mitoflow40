import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'THOUGHTS', title: '思索', subtitle: '「〇〇とは？」を、体から考える', bg: '#CDEBE2' });
}
