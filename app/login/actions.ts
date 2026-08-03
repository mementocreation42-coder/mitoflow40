'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ADMIN_AUTH_COOKIE, safeAdminRedirect } from '@/lib/admin-auth';

export async function login(prevState: { error: string }, formData: FormData) {
  const password = formData.get('password') as string;
  const from = safeAdminRedirect(formData.get('from'));
  const configuredPassword = process.env.ADMIN_PASSWORD
    || (process.env.NODE_ENV !== 'production' ? 'preview' : undefined);

  if (!configuredPassword) {
    return { error: '管理者パスワードが設定されていません' };
  }

  if (password === configuredPassword) {
    const cookieStore = await cookies();
    cookieStore.set(ADMIN_AUTH_COOKIE, 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
    });
    redirect(from);
  }

  return { error: 'パスワードが違います' };
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_AUTH_COOKIE);
  redirect('/login');
}
