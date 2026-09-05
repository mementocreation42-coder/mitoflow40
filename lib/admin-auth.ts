import { cookies } from 'next/headers';
import { createHmac, timingSafeEqual } from 'node:crypto';

export const ADMIN_AUTH_COOKIE = 'mito_admin_auth';

function adminPassword(): string | undefined {
  return process.env.ADMIN_PASSWORD || (process.env.NODE_ENV !== 'production' ? 'preview' : undefined);
}

// Cookie に入れるセッショントークン。
// 以前は固定文字列 'true' で、パスワードを知らなくても Cookie を自作すれば管理画面に入れた。
// ADMIN_PASSWORD（＋INTAKE_LINK_SECRET）から HMAC で導出した推測不能な値に変更。
// パスワードか秘密鍵を変えると全セッションが失効する（望ましい挙動）。
export function adminSessionToken(): string | null {
  const pw = adminPassword();
  if (!pw) return null;
  return createHmac('sha256', `${pw}\u0000${process.env.INTAKE_LINK_SECRET ?? ''}`)
    .update('mito-admin-session-v1')
    .digest('hex');
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const expected = adminSessionToken();
  if (!expected) return false;
  const got = (await cookies()).get(ADMIN_AUTH_COOKIE)?.value ?? '';
  const a = Buffer.from(got);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export function safeAdminRedirect(value: FormDataEntryValue | null): string {
  if (typeof value !== 'string') return '/admin';
  return value.startsWith('/admin') && !value.startsWith('//') ? value : '/admin';
}
