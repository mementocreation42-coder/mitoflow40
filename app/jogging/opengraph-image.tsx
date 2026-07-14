import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'JOGGING', title: 'ジョギングと体', subtitle: '効果・「膝に悪い」の真偽・走る量', bg: '#E3EFE9' });
}
