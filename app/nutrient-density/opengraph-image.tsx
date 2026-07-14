import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'NUTRIENT DENSITY', title: '栄養価は変わってきている', subtitle: '下がる野菜と、上がるきのこ', bg: '#EAF1E0' });
}
