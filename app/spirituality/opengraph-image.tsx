import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'MIND & SPIRIT', title: 'スピリチュアリティと体', subtitle: '祈り・瞑想・つながりの“心身相関”', bg: '#ECE5F4' });
}
