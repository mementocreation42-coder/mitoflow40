import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'CAFFEINE', title: 'カフェインと上手につき合う', subtitle: '量・タイミング・代謝の個人差', bg: '#EFE7D6' });
}
