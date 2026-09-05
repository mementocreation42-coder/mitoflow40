import { redirect } from 'next/navigation';

// 旧URL。記事管理は /admin/posts に移った（ヘッダーの表記から "Journal" を外したため）
export default function LegacyJournalRedirect() {
    redirect('/admin/posts');
}
