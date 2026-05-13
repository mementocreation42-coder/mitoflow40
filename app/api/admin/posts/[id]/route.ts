import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { updateWPPost, deleteWPPost } from '@/lib/wp';

async function checkAuth() {
  const cookieStore = await cookies();
  return cookieStore.get('mito_admin_auth')?.value === 'true';
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  try {
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const excerpt = formData.get('excerpt') as string || '';
    const date = formData.get('date') as string;
    const postStatus = (formData.get('postStatus') as string) === 'draft' ? 'draft' : 'publish';
    const categoryIds = formData.getAll('categoryIds').map((v) => parseInt(v as string, 10)).filter(Boolean);
    const featuredImageId = parseInt(formData.get('featuredImageId') as string || '0', 10);

    const updateData: Parameters<typeof updateWPPost>[1] = {
      title, content, excerpt, date, status: postStatus, categories: categoryIds,
    };
    if (featuredImageId) updateData.featured_media = featuredImageId;

    const post = await updateWPPost(parseInt(id, 10), updateData);

    revalidatePath('/', 'layout');
    return NextResponse.json({ success: true, post });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  try {
    await deleteWPPost(parseInt(id, 10));
    revalidatePath('/', 'layout');
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
