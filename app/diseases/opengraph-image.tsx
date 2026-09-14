import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'MODERN DISEASES', title: '現代病を読む', subtitle: '糖尿病・メタボ・高血圧・脂肪肝・脂質異常症・サルコペニア・CKD・心・歯周病', bg: '#F7E2DC' });
}
