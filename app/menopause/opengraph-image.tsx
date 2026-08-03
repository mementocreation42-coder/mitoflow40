import { ogImage, ogSize, ogContentType } from '@/lib/og';
export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';
export default function Image() { return ogImage({ eyebrow: 'MENOPAUSAL TRANSITION', title: '更年期・更年期移行期', subtitle: 'ホルモンの揺らぎと40代の心身', bg: '#F3E0EC' }); }
