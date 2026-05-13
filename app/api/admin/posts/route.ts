import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { createWPPost } from '@/lib/wp';

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
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const excerpt = formData.get('excerpt') as string || '';
    const date = formData.get('date') as string;
    const postStatus = (formData.get('postStatus') as string) === 'draft' ? 'draft' : 'publish';
    const categoryIds = formData.getAll('categoryIds').map((v) => parseInt(v as string, 10)).filter(Boolean);
    const featuredImageId = parseInt(formData.get('featuredImageId') as string || '0', 10);

    const post = await createWPPost({
      title,
      content,
      excerpt,
      date,
      status: postStatus,
      categories: categoryIds,
      featured_media: featuredImageId || 0,
    });

    revalidatePath('/', 'layout');
    return NextResponse.json({ success: true, post });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
