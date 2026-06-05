import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'FOOD SAFETY', title: 'カビ毒と食の安全', subtitle: 'マイコトキシンの基本と減らし方', bg: '#CDEBE2' });
}
