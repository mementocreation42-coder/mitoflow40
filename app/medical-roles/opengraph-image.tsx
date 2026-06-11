import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'WHO DOES WHAT', title: '医療者の役割とMitoflow40', subtitle: '誰が何を担い、私たちはどこに立つか', bg: '#CDEBE2' });
}
