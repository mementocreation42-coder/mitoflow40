import { NextResponse } from 'next/server';
import { getPostsPaginated } from '@/lib/wp';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const search = searchParams.get('search') || undefined;

    try {
        const data = await getPostsPaginated(page, 30, search);
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
    }
}
