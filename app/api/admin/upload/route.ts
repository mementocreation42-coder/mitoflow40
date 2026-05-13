import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { uploadMedia } from '@/lib/wp';

async function checkAuth() {
  const cookieStore = await cookies();
  return cookieStore.get('mito_admin_auth')?.value === 'true';
}

export async function POST(request: NextRequest) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('image') as File;
    if (!file || file.size === 0) {
      return NextResponse.json({ error: 'No file' }, { status: 400 });
    }
    const result = await uploadMedia(file, file.name);
    return NextResponse.json({ url: result.source_url, id: result.id });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
