import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getIssue, markdownToHtml, NEWSLETTER_NAME } from '@/lib/newsletter';
import { formatDateTime } from '@/lib/intake';
import NewsletterForm from '@/components/NewsletterForm';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const issue = await getIssue(id);
    if (!issue || issue.status !== 'sent') return { title: `バックナンバー | ${NEWSLETTER_NAME}` };
    return {
        title: `${issue.subject} | ${NEWSLETTER_NAME} | Mitoflow40`,
        description: issue.preheader || `${NEWSLETTER_NAME}の配信「${issue.subject}」`,
        alternates: { canonical: `https://mitoflow40.com/newsletter/archive/${id}` },
    };
}

export default async function IssuePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const issue = await getIssue(id);
    if (!issue || issue.status !== 'sent') notFound();
    const html = markdownToHtml(issue.markdown);

    return (
        <div className="pt-40 pb-20 px-6 min-h-screen" style={{ background: '#FFB6B6' }}>
            <article className="max-w-[640px] mx-auto">
                <Link href="/newsletter/archive" className="text-xs font-bold text-[#1A1A1A] underline">← バックナンバー</Link>
                <div className="mt-6 rounded-2xl border border-black bg-white/90 p-6 md:p-10">
                    <p className="text-[11px] text-[#4A4A4A] mb-2">{NEWSLETTER_NAME} ・ {issue.sentAt ? formatDateTime(issue.sentAt).slice(0, 10) : ''}</p>
                    <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A1A] leading-tight mb-6">{issue.subject}</h1>
                    <div className="prose prose-sm md:prose-base max-w-none text-[#2A2A2A]" dangerouslySetInnerHTML={{ __html: html }} />
                </div>
                <div className="mt-8 rounded-2xl border border-black bg-[#1A1A1A] p-6 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#4AF6C3' }}>SUBSCRIBE</p>
                    <p className="text-sm text-white/80 mb-4">次の号をメールで受け取る</p>
                    <NewsletterForm source="journal" dark />
                </div>
            </article>
        </div>
    );
}
