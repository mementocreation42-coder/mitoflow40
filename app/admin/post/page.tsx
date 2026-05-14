import Link from 'next/link';
import { getCategories } from '@/lib/wp';
import PostEditor from '@/components/admin/PostEditor';

export const metadata = { title: { absolute: '新規投稿 | Mitoflow40 Admin' }, robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

export default async function NewPostPage() {
  const categories = await getCategories();

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fff', fontFamily: 'sans-serif' }}>
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(10,10,10,0.9)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #1a1a1a', padding: '0 24px',
        display: 'flex', alignItems: 'center', height: 56, gap: 16,
      }}>
        <Link href="/admin" style={{ color: '#555', textDecoration: 'none', fontSize: 13 }}>
          ← ダッシュボード
        </Link>
        <h1 style={{ fontSize: 15, fontWeight: 600, color: '#fff', margin: 0 }}>新規投稿</h1>
      </header>

      <main style={{ maxWidth: 1400, margin: '0 auto', padding: '32px 32px' }}>
        <PostEditor categories={categories} />
      </main>
    </div>
  );
}
