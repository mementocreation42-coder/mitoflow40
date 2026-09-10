import Link from 'next/link';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';
import { readingPaths } from '@/lib/paths';
import TextbookClient from '@/components/TextbookClient';

export const metadata = {
    title: '教科書 ｜ ライブラリを読む順番 | Mitoflow40',
    description: 'ライブラリは辞書として引けますが、順番に読むと教科書になります。「はじめての 7 枚」「血液検査を読めるようになる 11 枚」「40 代の疲れを解く 10 枚」「食事を整える 9 枚」。既存のページを、読む順に並べ直しました。',
    alternates: { canonical: 'https://mitoflow40.com/textbook' },
    openGraph: {
        siteName: 'Mitoflow40',
        locale: 'ja_JP',
        title: '教科書 ｜ ライブラリを読む順番 | Mitoflow40',
        description: 'ライブラリを、辞書ではなく教科書として読むための順番。',
        url: 'https://mitoflow40.com/textbook',
        type: 'article',
    },
};

export default function TextbookPage() {
    const total = readingPaths.reduce((a, p) => a + p.steps.length, 0);
    return (
        <div className="relative overflow-x-clip pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-24 md:pb-32 px-6 md:px-4 min-h-screen" style={{ background: '#ECE6F3' }}>
            <img loading="lazy" decoding="async" src="/images/for-you/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block"
                style={{ top: '0', right: '-40px', width: '260px', transform: 'scaleY(-1)' }} />

            <JsonLd data={medicalWebPage({ name: '教科書 ｜ ライブラリを読む順番', description: 'ライブラリを、辞書ではなく教科書として読むための順番。', path: '/textbook' })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: '教科書', path: '/textbook' }])} />

            <article className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '教科書' }]} />
                <header className="mb-10">
                    <p className="text-xs tracking-widest font-bold mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>TEXTBOOK</p>
                    <h1 className="text-4xl md:text-6xl font-bold text-[#41C9B4] leading-[1.2] tracking-tight mb-5">
                        辞書を、<br />教科書として読む。
                    </h1>
                    <p className="text-sm md:text-base text-[#4A4A4A] max-w-[640px] leading-relaxed">
                        ライブラリの 1 枚 1 枚は、どこから読んでも完結するように書いてあります。ただ、順番に読むと見えてくるものがあります。ここでは既存のページを書き換えず、<strong>読む順</strong>だけを決めました。4 つの章、あわせて {total} 枚。各ページの下に「前へ／次へ」が出て、読んだ枚数がこの端末に記録されます。章を読み切るとバッジが灯ります。
                    </p>
                </header>

                <TextbookClient />

                <section className="mb-10 rounded-2xl border border-[#1A1A1A] bg-white/70 p-5 md:p-6">
                    <h2 className="text-xl md:text-2xl font-bold text-[#1A1A1A] mb-2">読み終えたら</h2>
                    <p className="text-sm text-[#4A4A4A] leading-relaxed mb-4">
                        辞書に戻ってください。症状から引く、血液検査の項目を開く、食材を調べる。順番に読んだあとは、どの 1 枚を開いても同じ地図の上に置けるはずです。自分の検査票を読みたくなったら、解析へ。
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {[
                            { href: '/library', label: 'ライブラリ（辞書）' },
                            { href: '/symptoms', label: '症状から引く' },
                            { href: '/library/map', label: 'ライブラリマップ' },
                        ].map((l) => (
                            <Link key={l.href} href={l.href} className="px-4 py-2 rounded-full bg-white border border-[#1A1A1A] text-sm font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white transition-colors">{l.label} →</Link>
                        ))}
                    </div>
                </section>
            </article>
        </div>
    );
}
