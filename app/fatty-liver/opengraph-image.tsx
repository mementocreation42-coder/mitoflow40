import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'FATTY LIVER / MASLD', title: '脂肪肝（MASLD）', subtitle: '飲まなくてもなる、沈黙の現代病', bg: '#F3E2D2' });
}
