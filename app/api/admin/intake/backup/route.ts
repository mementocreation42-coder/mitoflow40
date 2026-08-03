import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { backupAllToBlob } from '@/lib/intake';

// 全カウンセリング票データを1つのJSONにスナップショットして Blob(intake/_backups/) に保存。
// 呼び出し元：
//  - Vercel Cron（Authorization: Bearer <CRON_SECRET>）による定期自動バックアップ
//  - 管理者（ログイン済みcookie）による手動実行
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

async function authorized(req: NextRequest): Promise<boolean> {
    // Cron からの呼び出し
    const secret = process.env.CRON_SECRET;
    if (secret && req.headers.get('authorization') === `Bearer ${secret}`) return true;
    // ローカル開発はバイパス
    if (process.env.NODE_ENV !== 'production') return true;
    // 管理者ログイン
    const c = await cookies();
    return c.get('mito_admin_auth')?.value === 'true';
}

export async function GET(req: NextRequest) {
    if (!(await authorized(req))) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    try {
        const result = await backupAllToBlob();
        return NextResponse.json({ ok: true, ...result });
    } catch (e) {
        console.error('[intake] backup failed:', e);
        return NextResponse.json({ ok: false, error: 'backup failed' }, { status: 500 });
    }
}
