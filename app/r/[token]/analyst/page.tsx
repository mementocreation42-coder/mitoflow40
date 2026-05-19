import { notFound } from 'next/navigation';

// 解析者用レポート（Markdown を変換した HTML）
// 保存先: Vercel Blob の reports/<token>-analyst.html
// ローカル fallback はなし（解析者用は本番運用前提）

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata() {
  return {
    title: 'MitoFlow40 — Analyst Report',
    robots: { index: false, follow: false },
    description: '解析者用詳細レポート',
  };
}

export default async function AnalystReportPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  if (!/^[a-zA-Z0-9_-]{8,64}$/.test(token)) notFound();

  const blobBase = process.env.NEXT_PUBLIC_BLOB_BASE_URL;
  if (!blobBase) notFound();

  const res = await fetch(`${blobBase.replace(/\/$/, '')}/reports/${token}-analyst.html`, {
    cache: 'no-store',
  });
  if (!res.ok) notFound();
  const html = await res.text();

  return (
    <div
      style={{ width: '100%', minHeight: '100vh' }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
