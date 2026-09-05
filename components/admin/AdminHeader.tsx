import Link from 'next/link';
import { headers } from 'next/headers';
import { logout } from '@/app/login/actions';
import DaVinciLink from './DaVinciLink';
import { INBOX_ORIGIN } from './inbox';
import styles from '@/app/admin/admin.module.css';

// 管理画面の共通ヘッダー（2段）。
//   上段：M（ダッシュボード）＋ グループ切替 [クライアント管理 | 記事管理] ＋ サイトを見る／ログアウト
//   下段：いまのグループの項目
//     クライアント管理 … クライアント／注文・契約／ニュースレター／DaVinci24 ↗（解析者の Mac のローカル受付）
//     記事管理         … 記事一覧／新規記事
export type AdminNavKey = 'dashboard' | 'clients' | 'orders' | 'newsletter' | 'posts' | 'newpost';
type GroupKey = 'client' | 'article';

const GROUPS: { key: GroupKey; label: string; href: string; items: { key: AdminNavKey; href: string; label: string }[] }[] = [
    {
        key: 'client', label: 'クライアント管理', href: '/admin/clients',
        items: [
            { key: 'clients', href: '/admin/clients', label: 'クライアント' },
            { key: 'orders', href: '/admin/orders', label: '注文・契約' },
            { key: 'newsletter', href: '/admin/newsletter', label: 'ニュースレター' },
        ],
    },
    {
        key: 'article', label: '記事管理', href: '/admin/posts',
        items: [
            { key: 'posts', href: '/admin/posts', label: '記事一覧' },
            { key: 'newpost', href: '/admin/post', label: '新規記事' },
        ],
    },
];

function groupOf(active?: AdminNavKey): GroupKey {
    return active === 'posts' || active === 'newpost' ? 'article' : 'client';
}

// いま表示している管理画面の origin（受付側が「戻り先」に使う）
export async function adminOrigin(): Promise<string> {
    const h = await headers();
    const host = h.get('x-forwarded-host') || h.get('host') || 'mitoflow40.com';
    const proto = h.get('x-forwarded-proto') || (/^(localhost|127\.0\.0\.1)(:\d+)?$/.test(host) ? 'http' : 'https');
    return `${proto}://${host}`;
}

// 受付（DaVinci24 Inbox）の URL。?admin= で管理画面の origin を渡すと、受付のヘッダーがそこへ戻るリンクになる
export async function inboxUrl(): Promise<string> {
    return `${INBOX_ORIGIN}/?admin=${encodeURIComponent(await adminOrigin())}`;
}

export default async function AdminHeader({ active, back }: { active?: AdminNavKey; back?: { href: string; label: string } }) {
    const inbox = await inboxUrl();
    const group = groupOf(active);
    const current = GROUPS.find((g) => g.key === group)!;
    const onDashboard = active === 'dashboard';
    return (
        <div className={styles.headerWrap}>
            <header className={styles.header}>
                <div className={styles.headerLeft}>
                    <Link href="/admin" className={`${styles.brandMark} ${onDashboard ? styles.brandMarkActive : ''}`} aria-label="ダッシュボードへ" title="ダッシュボード">M</Link>
                    <nav className={styles.nav} aria-label="管理グループ">
                        {GROUPS.map((g) => (
                            <Link key={g.key} href={g.href} className={`${styles.groupTab} ${g.key === group && !onDashboard ? styles.groupActive : ''}`} aria-current={g.key === group && !onDashboard ? 'page' : undefined}>
                                {g.label}
                            </Link>
                        ))}
                    </nav>
                </div>
                <div className={styles.headerActions}>
                    {back && <Link href={back.href} className={styles.logout}>← {back.label}</Link>}
                    <a href="/" target="_blank" rel="noopener noreferrer" className={styles.siteLink} title="公開サイトのトップを別タブで開く">サイトを見る ↗</a>
                    <form action={logout}><button type="submit" className={styles.logout}>ログアウト</button></form>
                </div>
            </header>
            <nav className={styles.subbar} aria-label={current.label}>
                <span className={styles.subLabel}>{current.label}</span>
                {current.items.map((n) => (
                    <Link key={n.key} href={n.href} className={`${styles.navItem} ${active === n.key ? styles.navActive : ''}`} aria-current={active === n.key ? 'page' : undefined}>
                        {n.label}
                    </Link>
                ))}
                {group === 'client' && (
                    <DaVinciLink href={inbox} className={styles.navItem} title="解析者の Mac で動くローカル受付（node scripts/inbox.mjs）">
                        DaVinci24 <span className={styles.navExt}>↗</span>
                    </DaVinciLink>
                )}
            </nav>
        </div>
    );
}
