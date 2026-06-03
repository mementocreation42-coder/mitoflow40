import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'INFLAMMATION', title: '慢性炎症（くすぶる）', subtitle: '老化と万病の隠れた土台', bg: '#F6DCD0' });
}
