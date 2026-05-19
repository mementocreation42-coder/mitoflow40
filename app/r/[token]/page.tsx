import fs from 'node:fs/promises';
import path from 'node:path';
import { notFound } from 'next/navigation';

// レポートHTMLの保存先:
// - 本番: Vercel Blob（reports/<token>.html, public access）
// - ローカル開発: public/reports/<token>.html
//
// 本番デプロイ時は環境変数 NEXT_PUBLIC_BLOB_BASE_URL を設定:
//   例) https://<store-hash>.public.blob.vercel-storage.com

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata() {
  return {
    title: 'MitoFlow40 — Blood Analysis Report',
    robots: { index: false, follow: false },
    description: 'MitoFlow40 解析レポート',
    openGraph: { title: 'MitoFlow40 Report' },
  };
}

async function fetchReportHtml(token: string): Promise<string | null> {
  // 1) Vercel Blob を優先
  const blobBase = process.env.NEXT_PUBLIC_BLOB_BASE_URL;
  if (blobBase) {
    try {
      const res = await fetch(`${blobBase.replace(/\/$/, '')}/reports/${token}.html`, {
        cache: 'no-store',
      });
      if (res.ok) return await res.text();
    } catch {
      // フォールスルー
    }
  }
  // 2) ローカルファイル（開発用）
  try {
    const filePath = path.join(process.cwd(), 'public', 'reports', `${token}.html`);
    return await fs.readFile(filePath, 'utf-8');
  } catch {
    return null;
  }
}

export default async function ReportPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  // トークン形式チェック
  if (!/^[a-zA-Z0-9_-]{8,64}$/.test(token)) {
    notFound();
  }

  const html = await fetchReportHtml(token);
  if (!html) notFound();

  return (
    <div
      style={{ width: '100%', minHeight: '100vh' }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
