import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'DIABETES', title: '糖尿病とは', subtitle: '種類・サイン・予防と、境界型のうちにできること', bg: '#F7E2DC' });
}
