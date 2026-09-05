import Link from 'next/link';
import { verifyToken, NEWSLETTER_NAME } from '@/lib/newsletter';
import UnsubscribeForm from './UnsubscribeForm';

export const metadata = { title: `配信停止 | ${NEWSLETTER_NAME}`, robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

export default async function UnsubscribePage({ searchParams }: { searchParams: Promise<{ t?: string }> }) {
    const { t } = await searchParams;
    const payload = t ? verifyToken(t, 'unsub') : null;
    return (
        <div className="pt-40 pb-20 px-6 min-h-screen" style={{ background: '#DEEAF2' }}>
            <div className="max-w-[560px] mx-auto text-center bg-white/80 rounded-2xl p-8 md:p-12 border border-black">
                {payload && t ? (
                    <UnsubscribeForm token={t} email={payload.e} />
                ) : (
                    <>
                        <h1 className="text-2xl font-bold mb-4 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>このリンクは無効です</h1>
                        <p className="text-sm text-[#4A4A4A] leading-loose mb-6">お手数ですが、届いたメールの末尾にある「配信停止はこちら」からお試しいただくか、info@mitoflow40.com までご連絡ください。</p>
                        <Link href="/" className="inline-block px-6 py-3 rounded-full text-sm font-bold bg-[#1A1A1A] text-white">ホームへ</Link>
                    </>
                )}
            </div>
        </div>
    );
}
