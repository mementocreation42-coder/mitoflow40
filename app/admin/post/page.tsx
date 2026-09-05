import { getCategories } from '@/lib/wp';
import PostEditor from '@/components/admin/PostEditor';
import styles from '../admin.module.css';

export const metadata = { title: { absolute: '新規投稿 | Mitoflow40 Admin' }, robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

export default async function NewPostPage() {
  const categories = await getCategories();

  return (
    <div className={styles.editorPage}>
      <PostEditor heading="新規投稿" categories={categories} />
    </div>
  );
}
