import { notFound } from 'next/navigation';
import { getPostById, getCategories } from '@/lib/wp';
import PostEditor from '@/components/admin/PostEditor';
import { htmlToBody, decodeEntities } from '@/components/admin/postBody';
import styles from '../../../admin.module.css';

export const metadata = { title: { absolute: '投稿編集 | Mitoflow40 Admin' }, robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const numericId = parseInt(id, 10);
  if (!Number.isFinite(numericId)) notFound();

  const [post, categories] = await Promise.all([getPostById(numericId), getCategories()]);
  if (!post) notFound();

  const media = post._embedded?.['wp:featuredmedia']?.[0];
  const featuredImage = media ? { url: media.source_url, id: post.featured_media ?? 0 } : null;
  const categoryIds = (post._embedded?.['wp:term']?.[0] ?? []).map((c) => c.id);

  // 公開済み HTML → 本文の書式（見出し・画像・商品カードを保ったまま開く）
  const { body, images } = htmlToBody(post.content.rendered);
  const excerpt = decodeEntities(post.excerpt.rendered.replace(/<[^>]+>/g, '')).trim();

  return (
    <div className={styles.editorPage}>
      <PostEditor
        heading="投稿を編集"
        categories={categories}
        postId={numericId}
        defaultValues={{
          title: decodeEntities(post.title.rendered),
          excerpt,
          body,
          uploadedImages: images,
          // WordPress の date はサイトのローカル時刻（JST）。そのまま datetime-local の値にする
          date: post.date.slice(0, 16),
          categoryIds,
          status: post.status === 'draft' ? 'draft' : 'publish',
          featuredImage,
        }}
      />
    </div>
  );
}
