import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { listMedia } from '@/lib/wp';

async function checkAuth() {
  const cookieStore = await cookies();
  return cookieStore.get('mito_admin_auth')?.value === 'true';
}

export async function GET(request: NextRequest) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get('page') || '1', 10);
  const search = url.searchParams.get('search') || undefined;
  const perPage = parseInt(url.searchParams.get('per_page') || '24', 10);

  try {
    const result = await listMedia({ page, perPage, search });
    return NextResponse.json(result);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
