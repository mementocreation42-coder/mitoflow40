import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostById, getCategories } from '@/lib/wp';
import PostEditor from '@/components/admin/PostEditor';
import styles from '../../../admin.module.css';

export const metadata = { title: { absolute: '投稿編集 | Mitoflow40 Admin' } };
export const dynamic = 'force-dynamic';

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const numericId = parseInt(id, 10);

  const [post, categories] = await Promise.all([getPostById(numericId), getCategories()]);
  if (!post) notFound();

  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]
    ? { url: post._embedded['wp:featuredmedia'][0].source_url, id: 0 }
    : null;

  const categoryIds = (post._embedded?.['wp:term']?.[0] ?? []).map((c) => c.id);

  const bodyRaw = post.content.rendered
    .replace(/<\/p>\s*<p>/gi, '\n\n').replace(/<p>/gi, '').replace(/<\/p>/gi, '\n\n')
    .replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')
    .trim();

  const excerptRaw = post.excerpt.rendered
    .replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').trim();

  const dateLocal = new Date(post.date).toISOString().slice(0, 16);

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
        <h1 style={{ fontSize: 15, fontWeight: 600, color: '#1a1a1a', margin: 0 }}>投稿を編集</h1>
      </header>

      <main style={{ width: '100%', padding: 4, boxSizing: 'border-box' }}>
        <PostEditor
          categories={categories}
          postId={numericId}
          defaultValues={{
            title: post.title.rendered.replace(/&amp;/g, '&'),
            excerpt: excerptRaw,
            body: bodyRaw,
            date: dateLocal,
            categoryIds,
            status: 'publish',
            featuredImage,
          }}
        />
      </main>
    </div>
  );
}
