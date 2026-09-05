'use server';

import { isAdminAuthenticated } from '@/lib/admin-auth';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { setClientReport, removeClientReport, setClientMeta, deleteClient, deleteSubmission } from '@/lib/intake';
import { relinkOrder } from '@/lib/orders';
import { unsubscribeEmail } from '@/lib/newsletter';

async function assertAdmin() {
    // admin layout と同じ判定：本番はログイン必須、ローカルはバイパス
    if (process.env.NODE_ENV === 'production' && !(await isAdminAuthenticated())) {
        throw new Error('unauthorized');
    }
}

// クライアントに解析レポート（/r/<token>）を紐付ける
export async function saveClientReport(formData: FormData) {
    await assertAdmin();
    const clientId = String(formData.get('clientId') || '');
    const token = String(formData.get('token') || '');
    const label = String(formData.get('label') || '').trim();
    const analystToken = String(formData.get('analystToken') || '').trim();
    await setClientReport(clientId, token, { label: label || undefined, analystToken: analystToken || undefined });
    revalidatePath(`/admin/clients/client/${clientId}`);
    revalidatePath(`/counseling-sheet/my/${clientId}`);
}

// レポート履歴から1件外す（貼り間違いなど。/r/<token> 自体は消えない）
export async function removeClientReportAction(formData: FormData) {
    await assertAdmin();
    const clientId = String(formData.get('clientId') || '');
    const token = String(formData.get('token') || '');
    await removeClientReport(clientId, token);
    revalidatePath(`/admin/clients/client/${clientId}`);
    revalidatePath(`/counseling-sheet/my/${clientId}`);
}

// 注文を別の顧客へ付け替える（決済のメールとシートのメールが違って別人になったとき）
export async function relinkOrderAction(formData: FormData) {
    await assertAdmin();
    const fromClientId = String(formData.get('fromClientId') || '');
    const toClientId = String(formData.get('toClientId') || '');
    const orderIds = formData.getAll('orderId').map(String).filter(Boolean);
    if (!toClientId || orderIds.length === 0) throw new Error('付け替え先と注文を選んでください');
    for (const orderId of orderIds) await relinkOrder(fromClientId, orderId, toClientId);
    revalidatePath(`/admin/clients/client/${fromClientId}`);
    revalidatePath(`/admin/clients/client/${toClientId}`);
    revalidatePath('/admin/clients');
    revalidatePath('/admin/orders');
    revalidatePath(`/counseling-sheet/my/${toClientId}`);
    redirect(`/admin/clients/client/${toClientId}`);
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

// 顧客詳細からニュースレターを解除（本人の要望など）
export async function unsubscribeNewsletterForClient(formData: FormData) {
    await assertAdmin();
    const clientId = String(formData.get('clientId') || '');
    const email = String(formData.get('email') || '');
    if (email) await unsubscribeEmail(email);
    revalidatePath(`/admin/clients/client/${clientId}`);
    revalidatePath('/admin/newsletter/subscribers');
}
