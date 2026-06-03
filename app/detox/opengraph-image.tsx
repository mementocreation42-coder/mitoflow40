import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'DETOX', title: '解毒（デトックス）', subtitle: '体に備わる解毒システム', bg: '#E7EFD8' });
}
