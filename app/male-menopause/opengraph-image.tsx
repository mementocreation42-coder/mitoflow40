import { ogImage, ogSize, ogContentType } from '@/lib/og';
export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';
export default function Image() { return ogImage({ eyebrow: 'LATE-ONSET HYPOGONADISM', title: '男性更年期・LOH症候群', subtitle: 'テストステロンと40代の心身', bg: '#E2EAF2' }); }
