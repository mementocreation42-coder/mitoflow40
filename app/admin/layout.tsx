import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { isAdminAuthenticated } from '@/lib/admin-auth';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!(await isAdminAuthenticated())) {
    const headersList = await headers();
    const pathname = headersList.get('x-pathname') || '/admin';
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
