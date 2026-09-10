'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ADMIN_AUTH_COOKIE, adminSessionToken } from '@/lib/admin-auth';

export async function login(prevState: { error: string }, formData: FormData) {
  const password = formData.get('password') as string;
  const configuredPassword = process.env.ADMIN_PASSWORD
    || (process.env.NODE_ENV !== 'production' ? 'preview' : undefined);

  if (!configuredPassword) {
    return { error: '管理者パスワードが設定されていません' };
  }

  if (password === configuredPassword) {
    const token = adminSessionToken();
    if (!token) return { error: '管理者パスワードが設定されていません' };
    const cookieStore = await cookies();
    cookieStore.set(ADMIN_AUTH_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 90, // 90 日。再デプロイでは失効しない（トークンはパスワードと秘密鍵から導出）
      path: '/',
    });
    redirect('/admin'); // 常にダッシュボードから
  }

  return { error: 'パスワードが違います' };
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_AUTH_COOKIE);
  redirect('/login');
}
