import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'HOW TO CHOOSE', title: 'サプリメントの選び方', subtitle: '形態・吸収・タイミング', bg: '#EDE6D3' });
}
