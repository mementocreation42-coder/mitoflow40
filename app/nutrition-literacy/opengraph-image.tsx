import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'WHY IT MATTERS', title: '学ぶと、何が変わる？', subtitle: '生化学・栄養学を知る価値', bg: '#EAF1E0' });
}
