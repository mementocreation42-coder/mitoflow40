import { NextResponse } from 'next/server';
import { getPostsPaginated } from '@/lib/wp';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const search = searchParams.get('search') || undefined;
    const categoryId = searchParams.get('category') ? parseInt(searchParams.get('category')!, 10) : undefined;

    try {
        const data = await getPostsPaginated(page, 12, search, categoryId);
        return NextResponse.json(data, {
            headers: {
                'Cache-Control': 'no-store',
            },
        });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
    }
}
