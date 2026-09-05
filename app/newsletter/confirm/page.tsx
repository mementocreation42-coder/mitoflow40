import Link from 'next/link';
import { confirmSubscription, NEWSLETTER_NAME } from '@/lib/newsletter';

// 確認メールのリンク先。トークンを検証して登録を確定する。
export const metadata = { title: `登録の確認 | ${NEWSLETTER_NAME}`, robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

const font = { fontFamily: "'Space Grotesk', sans-serif" } as const;

export default async function ConfirmPage({ searchParams }: { searchParams: Promise<{ t?: string }> }) {
    const { t } = await searchParams;
    let result: { email: string; already: boolean } | null = null;
    let failed = false;
    if (t) {
        try {
            result = await confirmSubscription(t);
        } catch (e) {
            console.error('[newsletter/confirm] failed:', e);
            failed = true;
        }
    }

    return (
        <div className="pt-40 pb-20 px-6 min-h-screen" style={{ background: '#DEEAF2' }}>
            <div className="max-w-[560px] mx-auto text-center bg-white/80 rounded-2xl p-8 md:p-12 border border-black">
                {result ? (
                    <>
                        <p className="text-xs tracking-widest font-bold mb-3" style={{ ...font, color: '#FF9855' }}>{result.already ? 'ALREADY SUBSCRIBED' : 'SUBSCRIBED'}</p>
                        <h1 className="text-2xl md:text-3xl font-bold mb-4 text-[#1A1A1A]" style={font}>
                            {result.already ? 'すでに登録済みです' : '登録が完了しました'}
                        </h1>
                        <p className="text-sm text-[#4A4A4A] leading-loose mb-8">
                            {result.email} 宛に、{NEWSLETTER_NAME}を不定期でお届けします。<br />
                            配信停止はメール末尾のリンクからいつでもできます。
                        </p>
                        <div className="flex flex-wrap justify-center gap-3">
                            <Link href="/newsletter/archive" className="inline-block px-6 py-3 rounded-full text-sm font-bold bg-[#1A1A1A] text-white" style={font}>過去の号を読む</Link>
                            <Link href="/library" className="inline-block px-6 py-3 rounded-full text-sm font-bold border border-[#1A1A1A] text-[#1A1A1A] bg-white" style={font}>ライブラリへ</Link>
                        </div>
                    </>
                ) : (
                    <>
                        <p className="text-xs tracking-widest font-bold mb-3" style={{ ...font, color: '#C0392B' }}>LINK EXPIRED</p>
                        <h1 className="text-2xl md:text-3xl font-bold mb-4 text-[#1A1A1A]" style={font}>
                            {failed ? '登録を完了できませんでした' : 'このリンクは無効か、期限切れです'}
                        </h1>
                        <p className="text-sm text-[#4A4A4A] leading-loose mb-8">
                            確認リンクは72時間で失効します。お手数ですが、もう一度登録フォームからお申し込みください。
                        </p>
                        <Link href="/newsletter" className="inline-block px-6 py-3 rounded-full text-sm font-bold bg-[#1A1A1A] text-white" style={font}>登録フォームへ</Link>
                    </>
                )}
            </div>
        </div>
    );
}
