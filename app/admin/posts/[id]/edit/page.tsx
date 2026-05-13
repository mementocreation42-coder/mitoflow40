import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostById, getCategories } from '@/lib/wp';
import PostEditor from '@/components/admin/PostEditor';

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
        <h1 style={{ fontSize: 15, fontWeight: 600, color: '#fff', margin: 0 }}>投稿を編集</h1>
      </header>

      <main style={{ maxWidth: 1400, margin: '0 auto', padding: '32px 32px' }}>
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
