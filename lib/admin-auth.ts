import { cookies } from 'next/headers';

export const ADMIN_AUTH_COOKIE = 'mito_admin_auth';

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get(ADMIN_AUTH_COOKIE)?.value === 'true';
}

export function safeAdminRedirect(value: FormDataEntryValue | null): string {
  if (typeof value !== 'string') return '/admin';
  return value.startsWith('/admin') && !value.startsWith('//') ? value : '/admin';
}
