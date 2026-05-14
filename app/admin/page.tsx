import Link from 'next/link';
import { getPostsPaginated } from '@/lib/wp';
import { logout } from '@/app/login/actions';
import PostActions from '@/components/admin/PostActions';

export const metadata = { title: { absolute: 'ダッシュボード | Mitoflow40 Admin' }, robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const page = parseInt(pageParam || '1', 10);
  const { posts, totalPages } = await getPostsPaginated(page, 20);

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fff', fontFamily: 'sans-serif' }}>
      {/* ヘッダー */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(10,10,10,0.9)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #1a1a1a', padding: '0 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link href="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 700, fontSize: 15 }}>
            Mitoflow40
          </Link>
          <span style={{
            fontSize: 11, padding: '2px 8px', background: '#22c55e20', color: '#22c55e',
            borderRadius: 4, border: '1px solid #22c55e40', letterSpacing: '0.05em',
          }}>
            Admin
          </span>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Link href="/admin/post" style={{
            padding: '8px 16px', background: '#22c55e', color: '#000',
            borderRadius: 8, textDecoration: 'none', fontSize: 13, fontWeight: 600,
          }}>
            + 新規投稿
          </Link>
          <form action={logout}>
            <button type="submit" style={{
              padding: '8px 14px', background: 'transparent', color: '#666',
              border: '1px solid #2a2a2a', borderRadius: 8, cursor: 'pointer', fontSize: 13,
            }}>
              ログアウト
            </button>
          </form>
        </div>
      </header>

      {/* コンテンツ */}
      <main style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px' }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 24, color: '#fff' }}>投稿一覧</h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {posts.map((post) => {
            const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
            const categories = post._embedded?.['wp:term']?.[0] ?? [];
            const date = new Date(post.date).toLocaleDateString('ja-JP', {
              year: 'numeric', month: '2-digit', day: '2-digit',
            });

            return (
              <div key={post.id} style={{
                background: '#141414', border: '1px solid #1e1e1e', borderRadius: 10,
                padding: '16px 20px', display: 'flex', gap: 16, alignItems: 'flex-start',
              }}>
                {featuredImage && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={featuredImage}
                    alt=""
                    style={{ width: 72, height: 72, objectFit: 'cover', borderRadius: 6, flexShrink: 0 }}
                  />
                )}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6 }}>
                    <span style={{ fontSize: 12, color: '#555' }}>{date}</span>
                    {post.status === 'draft' && (
                      <span style={{
                        fontSize: 11, padding: '2px 8px', background: '#2a1e00',
                        border: '1px solid #4a3a00', borderRadius: 20, color: '#f59e0b',
                      }}>
                        下書き
                      </span>
                    )}
                    {categories.map((cat) => (
                      <span key={cat.id} style={{
                        fontSize: 11, padding: '2px 8px', background: '#1e1e1e',
                        border: '1px solid #2a2a2a', borderRadius: 20, color: '#888',
                      }}>
                        {cat.name}
                      </span>
                    ))}
                  </div>
                  <h2 style={{ fontSize: 15, fontWeight: 600, marginBottom: 4, color: '#e5e5e5' }}>
                    <Link
                      href={`/journal/${post.id}`}
                      target="_blank"
                      style={{ color: 'inherit', textDecoration: 'none' }}
                    >
                      {post.title.rendered}
                    </Link>
                  </h2>
                  <p style={{
                    fontSize: 13, color: '#555', lineHeight: 1.5,
                    display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                  }}
                    dangerouslySetInnerHTML={{ __html: post.excerpt?.rendered ?? '' }}
                  />
                </div>
                <PostActions postId={post.id} />
              </div>
            );
          })}
        </div>

        {/* ページネーション */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 32, alignItems: 'center' }}>
            {page > 1 && (
              <Link href={`/admin?page=${page - 1}`} style={{
                padding: '8px 16px', background: '#1e1e1e', color: '#fff',
                borderRadius: 8, textDecoration: 'none', fontSize: 13,
              }}>
                ← 前
              </Link>
            )}
            <span style={{ fontSize: 13, color: '#555' }}>{page} / {totalPages}</span>
            {page < totalPages && (
              <Link href={`/admin?page=${page + 1}`} style={{
                padding: '8px 16px', background: '#1e1e1e', color: '#fff',
                borderRadius: 8, textDecoration: 'none', fontSize: 13,
              }}>
                次 →
              </Link>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
