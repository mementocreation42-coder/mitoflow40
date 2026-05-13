import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const auth = cookieStore.get('mito_admin_auth');

  if (!auth || auth.value !== 'true') {
    const headersList = await headers();
    const pathname = headersList.get('x-invoke-path') || '/admin';
    redirect(`/login?from=${encodeURIComponent(pathname)}`);
  }

  return (
    <>
      <style>{`
        .admin-root, .admin-root * {
          font-family: "Noto Sans JP", "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif !important;
          letter-spacing: 0.02em;
        }
        .admin-root h1, .admin-root h2, .admin-root h3,
        .admin-root h4, .admin-root h5, .admin-root h6 {
          text-transform: none !important;
          font-weight: 700;
        }
      `}</style>
      <div className="admin-root">{children}</div>
    </>
  );
}
