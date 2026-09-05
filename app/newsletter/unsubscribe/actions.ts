'use server';

import { unsubscribeByToken } from '@/lib/newsletter';

// 解除ページの「解除する」ボタン（GET のリンク踏みだけでは解除しない＝メールスキャナの誤作動防止）
export async function unsubscribeAction(formData: FormData): Promise<{ ok: boolean; email?: string }> {
    const token = String(formData.get('t') || '');
    try {
        const email = await unsubscribeByToken(token);
        return email ? { ok: true, email } : { ok: false };
    } catch (e) {
        console.error('[newsletter/unsubscribe] failed:', e);
        return { ok: false };
    }
}
