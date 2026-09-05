import { NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import {
    listSubmissionsWithMeta,
    getClientReport,
    clientIdFromEmail,
    questionnaireColumns,
    formatDateTime,
} from '@/lib/intake';

// 全カウンセリング票を1行1票の表（CSV）で書き出す。クライアント管理・分析用。
// Excel / Google スプレッドシート / Notion にそのまま取り込める。
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

async function isAdmin(): Promise<boolean> {
    if (process.env.NODE_ENV !== 'production') return true;
    return isAdminAuthenticated();
}

// CSVセルのエスケープ（カンマ・引用符・改行を含むと "" で囲む）
function cell(v: unknown): string {
    const s = v == null ? '' : String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export async function GET() {
    if (!(await isAdmin())) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const subs = await listSubmissionsWithMeta(); // 全票・新しい順（フラット）
    const qCols = questionnaireColumns();

    // クライアント（メール）ごとの解析レポート紐付けをまとめて解決
    const reportCache = new Map<string, string>();
    for (const s of subs) {
        const cid = clientIdFromEmail(s.email);
        if (!reportCache.has(cid)) {
            const r = await getClientReport(cid);
            reportCache.set(cid, r?.token ?? '');
        }
    }

    const header = [
        '送信日時', '氏名', 'メール', '年齢', '性別', '主訴',
        ...qCols.map((c) => c.label),
        '自由記述', '添付数', '添付URL', '解析レポート', '受付ID',
    ];

    const rows = subs.map((s) => {
        const q = s.questionnaire || {};
        const token = reportCache.get(clientIdFromEmail(s.email)) || '';
        return [
            formatDateTime(s.submittedAt),
            s.name, s.email, s.age || '', s.gender || '', s.complaint || '',
            ...qCols.map((c) => q[c.key] || ''),
            s.notes || '',
            String(s.files?.length ?? 0),
            (s.files || []).map((f) => f.url).join(' '),
            token ? `https://mitoflow40.com/r/${token}` : '',
            s.submissionId,
        ];
    });

    const csv = [header, ...rows].map((r) => r.map(cell).join(',')).join('\r\n');
    // Excel が UTF-8 を正しく開けるよう BOM を付ける
    const body = '﻿' + csv;

    const date = new Date().toISOString().slice(0, 10);
    return new NextResponse(body, {
        headers: {
            'Content-Type': 'text/csv; charset=utf-8',
            'Content-Disposition': `attachment; filename="mitoflow40-counseling-sheets-${date}.csv"`,
        },
    });
}
