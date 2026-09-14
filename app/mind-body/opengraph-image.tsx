import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'MIND & BODY', title: '心とからだ', subtitle: '気分・不安・ストレスを「体の土台」から読み解く', bg: '#EFEAF6' });
}
