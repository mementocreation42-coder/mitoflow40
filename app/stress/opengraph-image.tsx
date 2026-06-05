import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'MIND & BODY', title: 'ストレスとは', subtitle: '敵ではなく、体からの信号', bg: '#E6E1EC' });
}
