'use server';

import { isAdminAuthenticated } from '@/lib/admin-auth';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import {
    getIssue, saveIssue, newIssueId, sendTestIssue, sendIssue, syncFromResend, unsubscribeEmail, resendConfirmation, pushActiveToResend, type Issue,
} from '@/lib/newsletter';

async function assertAdmin() {
    if (process.env.NODE_ENV === 'production' && !(await isAdminAuthenticated())) {
        throw new Error('unauthorized');
    }
}

export async function createIssueAction() {
    await assertAdmin();
    const now = new Date().toISOString();
    const issue: Issue = { id: newIssueId(), subject: '', preheader: '', markdown: '', status: 'draft', createdAt: now, updatedAt: now };
    await saveIssue(issue);
    redirect(`/admin/newsletter/${issue.id}`);
}

async function readDraft(formData: FormData): Promise<Issue> {
    const id = String(formData.get('id') || '');
    const existing = await getIssue(id);
    if (!existing) throw new Error('issue not found');
    if (existing.status === 'sent') return existing; // 配信済みは編集不可
    return {
        ...existing,
        subject: String(formData.get('subject') || '').trim().slice(0, 200),
        preheader: String(formData.get('preheader') || '').trim().slice(0, 200),
        markdown: String(formData.get('markdown') || '').slice(0, 200000),
        updatedAt: new Date().toISOString(),
    };
}

export async function saveIssueAction(formData: FormData) {
    await assertAdmin();
    const issue = await readDraft(formData);
    await saveIssue(issue);
    revalidatePath(`/admin/newsletter/${issue.id}`);
    revalidatePath('/admin/newsletter');
}

function errParam(e: unknown): string {
    return encodeURIComponent(String((e as Error)?.message || e).slice(0, 300));
}

export async function sendTestAction(formData: FormData) {
    await assertAdmin();
    const issue = await readDraft(formData);
    let query: string;
    try {
        await saveIssue(issue);
        const to = String(formData.get('testTo') || process.env.CONTACT_EMAIL || '').trim();
        if (!to) throw new Error('テスト送信先が未設定です');
        await sendTestIssue(issue, to);
        query = 'test=sent';
    } catch (e) {
        console.error('[newsletter] test send failed:', e);
        query = `error=${errParam(e)}`;
    }
    revalidatePath(`/admin/newsletter/${issue.id}`);
    redirect(`/admin/newsletter/${issue.id}?${query}`);
}

export async function sendIssueAction(formData: FormData) {
    await assertAdmin();
    const issue = await readDraft(formData);
    let query: string;
    try {
        if (!issue.subject || !issue.markdown.trim()) throw new Error('件名と本文を入力してください');
        if (String(formData.get('confirm')) !== 'SEND') throw new Error('確認欄に SEND と入力してください');
        await saveIssue(issue);
        await sendIssue(issue);
        query = 'sent=1';
    } catch (e) {
        console.error('[newsletter] send failed:', e);
        query = `error=${errParam(e)}`;
    }
    revalidatePath(`/admin/newsletter/${issue.id}`);
    revalidatePath('/admin/newsletter');
    revalidatePath('/newsletter/archive');
    redirect(`/admin/newsletter/${issue.id}?${query}`);
}

export async function syncSubscribersAction() {
    await assertAdmin();
    await syncFromResend();
    revalidatePath('/admin/newsletter/subscribers');
    revalidatePath('/admin/newsletter');
}

export async function unsubscribeAdminAction(formData: FormData) {
    await assertAdmin();
    const email = String(formData.get('email') || '');
    if (email) await unsubscribeEmail(email);
    revalidatePath('/admin/newsletter/subscribers');
}

// 確認待ち（pending）の購読者に確認メールを再送
export async function resendConfirmationAction(formData: FormData) {
    await assertAdmin();
    const email = String(formData.get('email') || '');
    try {
        if (email) await resendConfirmation(email);
    } catch (e) {
        console.error('[newsletter] resend confirmation failed:', e);
    }
    revalidatePath('/admin/newsletter/subscribers');
}

// 配信接続後：有効な購読者を Resend に一括同期
export async function pushToResendAction() {
    await assertAdmin();
    let query = '';
    try {
        const r = await pushActiveToResend();
        query = `?pushed=${r.pushed}&failed=${r.failed}`;
    } catch (e) {
        query = `?error=${encodeURIComponent(String((e as Error)?.message || e).slice(0, 200))}`;
    }
    revalidatePath('/admin/newsletter/subscribers');
    redirect(`/admin/newsletter/subscribers${query}`);
}
