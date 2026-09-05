import Link from 'next/link';
import { listSentIssues, NEWSLETTER_NAME } from '@/lib/newsletter';
import { formatDateTime } from '@/lib/intake';

export const metadata = {
    title: `バックナンバー | ${NEWSLETTER_NAME} | Mitoflow40`,
    description: 'Mitoflow40 レターの過去の配信を読めます。40代からの精密栄養学・ミトコンドリア・血液検査の読み方を、不定期でお届けしています。',
    alternates: { canonical: 'https://mitoflow40.com/newsletter/archive' },
};
export const dynamic = 'force-dynamic';

export default async function ArchivePage() {
    const issues = await listSentIssues().catch(() => []);
    return (
        <div className="pt-40 pb-20 px-6 min-h-screen" style={{ background: '#FFB6B6' }}>
            <div className="max-w-[640px] mx-auto">
                <p className="text-xs tracking-widest font-bold mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#1A1A1A' }}>ARCHIVE</p>
                <h1 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{NEWSLETTER_NAME} バックナンバー</h1>
                <p className="text-sm text-[#4A4A4A] leading-relaxed mb-10">これまでに配信した号です。<Link href="/newsletter" className="underline">登録はこちら</Link>。</p>
                {issues.length === 0 ? (
                    <div className="rounded-2xl border border-black bg-white/70 p-8 text-center text-sm text-[#4A4A4A]">まだ配信した号はありません。最初の1通をお楽しみに。</div>
                ) : (
                    <ul className="space-y-3">
                        {issues.map((i) => (
                            <li key={i.id}>
                                <Link href={`/newsletter/archive/${i.id}`} className="block rounded-2xl border border-black bg-white/80 p-5 hover:-translate-y-0.5 hover:shadow-md transition-all">
                                    <p className="text-[11px] text-[#4A4A4A] mb-1">{i.sentAt ? formatDateTime(i.sentAt).slice(0, 10) : ''}</p>
                                    <h2 className="text-lg font-bold text-[#1A1A1A]">{i.subject}</h2>
                                    {i.preheader && <p className="text-sm text-[#4A4A4A] mt-1">{i.preheader}</p>}
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
