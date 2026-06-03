import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'KETONES', title: 'ケトン体', subtitle: '脂肪から作る第二の燃料', bg: '#E6E0F2' });
}
