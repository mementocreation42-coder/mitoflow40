import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'PERIODONTAL DISEASE', title: '歯周病とは', subtitle: '口の慢性炎症が全身に広がる理由', bg: '#F7E2DC' });
}
