import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'GLYCATION', title: '糖化（こげる）', subtitle: '余った糖が組織を劣化させるAGEs', bg: '#F6E6CF' });
}
