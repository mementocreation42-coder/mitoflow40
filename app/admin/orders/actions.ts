'use server';

import { isAdminAuthenticated } from '@/lib/admin-auth';
import { revalidatePath } from 'next/cache';
import { syncStripeProducts } from '@/lib/stripe-sync';

async function assertAdmin() {
    if (process.env.NODE_ENV === 'production' && !(await isAdminAuthenticated())) {
        throw new Error('unauthorized');
    }
}

// lib/products.ts の定義を Stripe に反映（未登録の Price を作成）
export async function syncProductsAction() {
    await assertAdmin();
    await syncStripeProducts();
    revalidatePath('/admin/orders');
}
