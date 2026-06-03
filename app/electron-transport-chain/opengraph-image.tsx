import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'ETC', title: '電子伝達系', subtitle: 'ATPの大半を生む最終工程', bg: '#D9E6F2' });
}
