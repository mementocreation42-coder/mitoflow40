import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'GUT & BRAIN', title: '脳腸相関', subtitle: '腸と脳は会話している', bg: '#DCEFE4' });
}
