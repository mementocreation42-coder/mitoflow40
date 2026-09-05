import Link from 'next/link';
import { getCategories } from '@/lib/wp';
import PostEditor from '@/components/admin/PostEditor';
import styles from '../admin.module.css';

export const metadata = { title: { absolute: '新規投稿 | Mitoflow40 Admin' }, robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

export default async function NewPostPage() {
  const categories = await getCategories();

  return (
    <div className={styles.editorPage}>
      <header className={styles.editorHeader} style={{
        position: 'sticky', top: 0, zIndex: 50,
        backdropFilter: 'blur(12px)', padding: '0 8px',
        display: 'flex', alignItems: 'center', height: 56, gap: 16,
      }}>
        <Link href="/admin/posts" style={{ color: '#666', textDecoration: 'none', fontSize: 13 }}>
          ← ダッシュボード
        </Link>
        <h1 style={{ fontSize: 15, fontWeight: 600, color: '#1a1a1a', margin: 0 }}>新規投稿</h1>
      </header>

      <main style={{ width: '100%', padding: 4, boxSizing: 'border-box' }}>
        <PostEditor categories={categories} />
      </main>
    </div>
  );
}
