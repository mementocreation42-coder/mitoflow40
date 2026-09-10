import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { updateWPPost, deleteWPPost } from '@/lib/wp';
import { isAdminAuthenticated } from '@/lib/admin-auth';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdminAuthenticated())) {
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
    // featuredImageId が送られてきたときだけ更新する。'0' はアイキャッチを外す指示。
    // 送られてこなければ（既存のアイキャッチを触っていない）WordPress 側の設定をそのまま残す。
    const rawFeatured = formData.get('featuredImageId');

    const updateData: Parameters<typeof updateWPPost>[1] = {
      title, content, excerpt, date, status: postStatus, categories: categoryIds,
    };
    if (typeof rawFeatured === 'string') updateData.featured_media = parseInt(rawFeatured, 10) || 0;

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
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  try {
    const result = await deleteWPPost(parseInt(id, 10));
    revalidatePath('/', 'layout');
    return NextResponse.json({ success: true, how: result.how });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
