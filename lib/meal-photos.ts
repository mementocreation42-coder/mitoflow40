'use client';

// 食事の写真（端末内・IndexedDB）。localStorage には入りきらないので別に持つ。送信しない。
const DB = 'mf-meal-log';
const STORE = 'photos';

function open(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
        const req = indexedDB.open(DB, 1);
        req.onupgradeneeded = () => req.result.createObjectStore(STORE);
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
    });
}

async function tx<T>(mode: IDBTransactionMode, run: (s: IDBObjectStore) => IDBRequest<T>): Promise<T> {
    const db = await open();
    return new Promise((resolve, reject) => {
        const t = db.transaction(STORE, mode);
        const req = run(t.objectStore(STORE));
        t.oncomplete = () => { db.close(); resolve(req.result); };
        t.onerror = () => { db.close(); reject(t.error); };
    });
}

export function getPhoto(id: string): Promise<Blob | undefined> {
    return tx('readonly', (s) => s.get(id) as IDBRequest<Blob | undefined>);
}

export async function putPhoto(blob: Blob): Promise<string> {
    const id = `p${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
    await tx('readwrite', (s) => s.put(blob, id));
    return id;
}

export async function deletePhotos(ids: string[]): Promise<void> {
    for (const id of ids) await tx('readwrite', (s) => s.delete(id));
}

// 長辺 1280px の JPEG に縮小（スマホの写真 3〜5MB → 200KB 前後）
export async function shrinkImage(file: File, max = 1280, quality = 0.8): Promise<Blob> {
    const bmp = await createImageBitmap(file, { imageOrientation: 'from-image' });
    const scale = Math.min(1, max / Math.max(bmp.width, bmp.height));
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(bmp.width * scale);
    canvas.height = Math.round(bmp.height * scale);
    canvas.getContext('2d')!.drawImage(bmp, 0, 0, canvas.width, canvas.height);
    bmp.close();
    return new Promise((resolve, reject) =>
        canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('画像を変換できませんでした'))), 'image/jpeg', quality));
}
