import { NextRequest, NextResponse } from 'next/server';

// App Router のサーバーコンポーネントからは現在のパスを取得できないため、
// ここでヘッダーに載せて渡す。app/admin/layout.tsx がログイン後の戻り先に使う。
// （かつて使われていた x-invoke-path は App Router では付与されない）
export function middleware(request: NextRequest) {
    const headers = new Headers(request.headers);
    headers.set('x-pathname', request.nextUrl.pathname);
    return NextResponse.next({ request: { headers } });
}

export const config = {
    matcher: '/admin/:path*',
};
