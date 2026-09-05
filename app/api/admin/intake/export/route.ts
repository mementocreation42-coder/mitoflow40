import { NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import { listClients, getClientReport } from '@/lib/intake';

// 全クライアント（カウンセリング票・問診・ファイルURL・解析レポート紐付け）を
// 1つのJSONにまとめてダウンロードするバックアップ用エンドポイント。
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

async function isAdmin(): Promise<boolean> {
    if (process.env.NODE_ENV !== 'production') return true; // ローカルはバイパス（admin layout と同じ）
    return isAdminAuthenticated();
}

export async function GET() {
    if (!(await isAdmin())) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const clients = await listClients();
    const withReports = await Promise.all(
        clients.map(async (c) => ({ ...c, report: await getClientReport(c.clientId) }))
    );

    const payload = {
        exportedAt: new Date().toISOString(),
        clientCount: withReports.length,
        clients: withReports,
    };

    const date = new Date().toISOString().slice(0, 10);
    return new NextResponse(JSON.stringify(payload, null, 2), {
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Content-Disposition': `attachment; filename="mitoflow40-clients-${date}.json"`,
        },
    });
}
