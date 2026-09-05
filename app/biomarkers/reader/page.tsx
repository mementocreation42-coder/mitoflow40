import { biomarkers } from '@/lib/biomarkers';
import JsonLd, { breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';
import ReaderClient, { type ReaderItem } from './ReaderClient';

export const metadata = {
    title: '検査値リーダー｜血液検査の数値を基準値・理想値と照らす | Mitoflow40',
    description: '健康診断・血液検査の数値を入力すると、基準値と「理想値」の両方と照らして位置を確認できる無料ツール。フェリチン・HbA1c・LDL・ALT・TSH など52項目対応。結果はブラウザ内にだけ保存され、送信されません。',
    alternates: { canonical: 'https://mitoflow40.com/biomarkers/reader' },
    robots: { index: true, follow: true },
    openGraph: {
        siteName: 'Mitoflow40',
        locale: 'ja_JP',
        title: '検査値リーダー｜血液検査の数値を基準値・理想値と照らす | Mitoflow40',
        description: '血液検査の数値を入れて、基準値・理想値との位置を確かめる無料ツール。52項目対応、登録不要。',
        url: 'https://mitoflow40.com/biomarkers/reader',
        type: 'website',
    },
};

export default function ReaderPage() {
    // クライアントへは判定に必要な項目だけ渡す（本文 role は重いので落とす）
    const items: ReaderItem[] = biomarkers.map((b) => ({
        slug: b.slug, name: b.name, en: b.en, category: b.category, color: b.color, tagline: b.tagline,
        standardRange: b.standardRange, optimalRange: b.optimalRange, highSigns: b.highSigns, lowSigns: b.lowSigns, tip: b.tips[0],
    }));

    return (
        <div className="relative overflow-hidden pt-[calc(60px+3rem)] md:pt-[calc(60px+5rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen" style={{ background: '#DEEDF7' }}>
            <img loading="lazy" decoding="async" src="/images/for-you/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block"
                style={{ top: '0', right: '-40px', width: '260px', transform: 'scaleY(-1)' }} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: '血液検査', path: '/biomarkers' }, { name: '検査値リーダー', path: '/biomarkers/reader' }])} />
            <div className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '血液検査', href: '/biomarkers' }, { name: '検査値リーダー' }]} />
                <div className="text-center mb-10">
                    <p className="text-xs tracking-widest font-bold mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>TOOL</p>
                    <h1 className="text-3xl md:text-5xl font-bold text-[#1A1A1A] mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>検査値リーダー</h1>
                    <p className="text-[#4A4A4A] max-w-[620px] mx-auto leading-relaxed text-sm md:text-base">
                        健康診断の結果票にある数値を入れると、<strong>基準値</strong>（多くの人がこの範囲）と、Mitoflow40 が考える<strong>理想値</strong>（細胞がエネルギーを作りやすい範囲）の両方と照らして位置を確かめられます。
                        結果はこの端末のブラウザにだけ保存され、サーバーには送られません。
                    </p>
                </div>
                <ReaderClient items={items} />
            </div>
        </div>
    );
}
