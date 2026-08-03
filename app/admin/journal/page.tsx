import Link from 'next/link';
import { getPostsPaginated } from '@/lib/wp';
import { logout } from '@/app/login/actions';
import PostActions from '@/components/admin/PostActions';
import styles from '../admin.module.css';

export const metadata = { title: { absolute: 'ダッシュボード | Mitoflow40 Admin' }, robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

const CATEGORY_COLORS: Record<number, { background: string; borderColor: string; color: string }> = {
  1: { background: '#FAD9CE', borderColor: '#E9A58E', color: '#8C3E25' }, // 食事・栄養
  5: { background: '#D5F0DF', borderColor: '#95D4AC', color: '#246B42' }, // 運動
  10: { background: '#CDD8F5', borderColor: '#9FB2E2', color: '#36568F' }, // 生活習慣
  11: { background: '#ECCAE3', borderColor: '#D69AC3', color: '#7D3566' }, // サプリメント
  12: { background: '#F5EAC0', borderColor: '#DDC976', color: '#735F12' }, // データ・効果検証
};

const DEFAULT_CATEGORY_COLOR = { background: '#D7F7ED', borderColor: '#94DFC9', color: '#246E58' };

function cleanText(html: string) {
  const namedEntities: Record<string, string> = {
    amp: '&', nbsp: ' ', quot: '"', apos: "'", lt: '<', gt: '>',
    hellip: '…', ldquo: '“', rdquo: '”', lsquo: '‘', rsquo: '’', mdash: '—', ndash: '–',
  };

  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&#(x[\da-f]+|\d+);/gi, (_, value: string) =>
      String.fromCodePoint(value.toLowerCase().startsWith('x')
        ? Number.parseInt(value.slice(1), 16)
        : Number.parseInt(value, 10)))
    .replace(/&([a-z]+);/gi, (entity, name: string) => namedEntities[name.toLowerCase()] ?? entity)
    .trim();
}

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ page?: string; q?: string }> }) {
  const params = await searchParams;
  const requestedPage = Number.parseInt(params.page || '1', 10);
  const page = Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage : 1;
  const query = params.q?.trim() || '';
  const { posts, totalPages } = await getPostsPaginated(page, 20, query || undefined);
  const queryPart = query ? `&q=${encodeURIComponent(query)}` : '';

  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <Link href="/admin/journal" className={styles.brand} aria-label="管理ダッシュボードへ">
          <span className={styles.brandMark}>M</span>
          <span>
            <span className={styles.brandName}>Mitoflow40 Admin</span>
            <span className={styles.brandMeta}>Journal</span>
          </span>
        </Link>
        <div className={styles.headerActions}>
          <Link href="/admin/clients" className={styles.newButton} style={{ background: '#41C9B4', color: '#06231d' }}>クライアント一覧</Link>
          <form action={logout}><button type="submit" className={styles.logout}>ログアウト</button></form>
        </div>
      </header>

      <main className={styles.main} style={{ maxWidth: 680 }}>
        <div className={styles.titleRow}>
          <div>
            <p className={styles.eyebrow}>Content</p>
            <h1 className={styles.title}>記事を管理</h1>
            <p className={styles.description}>コンテンツの作成、編集、公開状況の確認ができます。</p>
          </div>
          <Link href="/admin/post" className={styles.newButton}>＋ 新しい記事</Link>
        </div>

        <div className={styles.toolbar}>
          <form className={styles.search} action="/admin/journal">
            <svg className={styles.searchIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>
            <input className={styles.searchInput} name="q" defaultValue={query} placeholder="タイトルや本文を検索" aria-label="記事を検索" />
            {query && <Link className={styles.clearSearch} href="/admin/journal" aria-label="検索を解除">×</Link>}
          </form>
          <span className={styles.resultMeta}>{query ? `「${query}」の検索結果` : `ページ ${page} / ${Math.max(totalPages, 1)}`}</span>
        </div>

        {posts.length > 0 ? (
          <div className={styles.list}>
            {posts.map((post) => {
              const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
              const categories = post._embedded?.['wp:term']?.[0] ?? [];
              const date = new Date(post.date).toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' });
              return (
                <article key={post.id} className={styles.post}>
                  {featuredImage ? (
                    // WordPress側の任意ドメイン画像を管理画面でそのまま表示する
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={featuredImage} alt="" className={styles.thumb} />
                  ) : (
                    <div className={styles.thumbPlaceholder} aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="m4 17 5-4 3 2 3-3 5 5"/></svg></div>
                  )}
                  <div className={styles.postContent}>
                    <div className={styles.meta}>
                      <span className={styles.date}>{date}</span>
                      {post.status === 'draft' && <span className={`${styles.badge} ${styles.draft}`}>下書き</span>}
                      {categories.slice(0, 3).map((cat) => (
                        <span
                          key={cat.id}
                          className={styles.badge}
                          style={CATEGORY_COLORS[cat.id] ?? DEFAULT_CATEGORY_COLOR}
                        >
                          {cat.name}
                        </span>
                      ))}
                    </div>
                    <h2 className={styles.postTitle}><Link href={`/journal/${post.id}`} target="_blank">{cleanText(post.title.rendered)}</Link></h2>
                    <div className={styles.excerpt}>{cleanText(post.excerpt?.rendered ?? '') || '抜粋はまだ設定されていません。'}</div>
                  </div>
                  <PostActions postId={post.id} classes={{ actions: styles.actions, edit: styles.edit, delete: styles.delete }} />
                </article>
              );
            })}
          </div>
        ) : (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>⌕</div>
            <h2 className={styles.emptyTitle}>{query ? '一致する記事がありません' : '記事がまだありません'}</h2>
            <p className={styles.emptyText}>{query ? 'キーワードを変えて、もう一度検索してください。' : '「新しい記事」から最初の記事を作成しましょう。'}</p>
          </div>
        )}

        {totalPages > 1 && (
          <nav className={styles.pagination} aria-label="ページ送り">
            {page > 1 && <Link href={`/admin/journal?page=${page - 1}${queryPart}`} className={styles.pageButton}>← 前へ</Link>}
            <span className={styles.pageCount}>{page} / {totalPages}</span>
            {page < totalPages && <Link href={`/admin/journal?page=${page + 1}${queryPart}`} className={styles.pageButton}>次へ →</Link>}
          </nav>
        )}
      </main>
    </div>
  );
}
