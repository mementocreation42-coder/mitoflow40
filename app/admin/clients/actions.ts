'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { setClientReport, setClientMeta, deleteClient, deleteSubmission } from '@/lib/intake';

async function assertAdmin() {
    // admin layout と同じ判定：本番はログイン必須、ローカルはバイパス
    if (process.env.NODE_ENV === 'production') {
        const c = await cookies();
        if (c.get('mito_admin_auth')?.value !== 'true') throw new Error('unauthorized');
    }
}

// クライアントに解析レポート（/r/<token>）を紐付ける
export async function saveClientReport(formData: FormData) {
    await assertAdmin();
    const clientId = String(formData.get('clientId') || '');
    const token = String(formData.get('token') || '');
    await setClientReport(clientId, token);
    revalidatePath(`/admin/clients/client/${clientId}`);
}

// 対応ステータス＋担当メモを保存
export async function saveClientMeta(formData: FormData) {
    await assertAdmin();
    const clientId = String(formData.get('clientId') || '');
    const status = String(formData.get('status') || '未対応');
    const memo = String(formData.get('memo') || '');
    await setClientMeta(clientId, status, memo);
    revalidatePath(`/admin/clients/client/${clientId}`);
    revalidatePath('/admin/clients');
}

// クライアントを丸ごと削除（本人の削除要求など）→ 一覧へ戻る
export async function deleteClientAction(formData: FormData) {
    await assertAdmin();
    const clientId = String(formData.get('clientId') || '');
    await deleteClient(clientId);
    revalidatePath('/admin/clients');
    redirect('/admin/clients');
}

// 単一のカウンセリング票を削除
export async function deleteSubmissionAction(formData: FormData) {
    await assertAdmin();
    const clientId = String(formData.get('clientId') || '');
    const submissionId = String(formData.get('submissionId') || '');
    await deleteSubmission(submissionId);
    revalidatePath(`/admin/clients/client/${clientId}`);
    revalidatePath('/admin/clients');
}
