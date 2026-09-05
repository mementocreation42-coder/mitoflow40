import { NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import { listSubscribers } from '@/lib/newsletter';

// 購読者の CSV エクスポート（管理者のみ）
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
    if (process.env.NODE_ENV === 'production' && !(await isAdminAuthenticated())) {
        return NextResponse.json({ ok: false }, { status: 401 });
    }
    const subs = await listSubscribers();
    const esc = (v: string) => `"${String(v ?? '').replace(/"/g, '""')}"`;
    const rows = [['email', 'status', 'source', 'subscribedAt', 'unsubscribedAt'].join(',')]
        .concat(subs.map((s) => [s.email, s.status, s.source, s.subscribedAt, s.unsubscribedAt ?? ''].map(esc).join(',')));
    const csv = '﻿' + rows.join('\r\n');
    return new NextResponse(csv, {
        headers: {
            'Content-Type': 'text/csv; charset=utf-8',
            'Content-Disposition': `attachment; filename="mitoflow40-newsletter-${new Date().toISOString().slice(0, 10)}.csv"`,
        },
    });
}
