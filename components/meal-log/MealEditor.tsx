'use client';

import { useRef, useState } from 'react';
import Sheet from './Sheet';
import Photo from './Photo';
import { inputCls, labelCls, pillCls } from './styles';
import { MEAL_TYPES, type Meal } from '@/lib/meal-log';
import { deletePhotos, putPhoto, shrinkImage } from '@/lib/meal-photos';

const MAX_PHOTOS = 4;

export type Draft = Omit<Meal, 'id'> & { id?: string };

// 写真・時刻・自由記述・メモを書く（成分表の食品はこの外で追加する）
export default function MealEditor({ initial, savedPhotos, onSave, onDelete, onClose, onOpenPhoto }: {
    initial: Draft;
    savedPhotos: string[]; // 保存済みの写真（「やめる」で消してはいけないもの）
    onSave: (d: Draft) => void;
    onDelete?: () => void;
    onClose: () => void;
    onOpenPhoto: (url: string) => void;
}) {
    const [draft, setDraft] = useState<Draft>(initial);
    const [busy, setBusy] = useState(false);
    const fileRef = useRef<HTMLInputElement>(null);

    // 保存せずに閉じるとき、ここで追加した写真を消す
    const discard = () => {
        void deletePhotos(draft.photos.filter((p) => !savedPhotos.includes(p)));
        onClose();
    };

    const addPhotos = async (files: FileList | null) => {
        if (!files?.length) return;
        setBusy(true);
        try {
            const ids: string[] = [];
            for (const f of [...files].slice(0, MAX_PHOTOS - draft.photos.length)) ids.push(await putPhoto(await shrinkImage(f)));
            setDraft((d) => ({ ...d, photos: [...d.photos, ...ids] }));
        } catch {
            alert('写真を取り込めませんでした。別の写真でお試しください。');
        } finally {
            setBusy(false);
            if (fileRef.current) fileRef.current.value = '';
        }
    };

    const removePhoto = (id: string) => {
        // 保存済みの写真は「保存する」まで消さない（やめたら元に戻せるように）
        if (!savedPhotos.includes(id)) void deletePhotos([id]);
        setDraft((d) => ({ ...d, photos: d.photos.filter((p) => p !== id) }));
    };

    const empty = !draft.food.trim() && !draft.memo.trim() && !draft.photos.length && !draft.items.length;

    return (
        <Sheet title={draft.id ? '記録を編集' : '写真・メモで記録'} onClose={discard}>
            <form onSubmit={(e) => { e.preventDefault(); if (!empty) onSave({ ...draft, food: draft.food.trim(), memo: draft.memo.trim() }); }}>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className={labelCls} htmlFor="me-date">日付</label>
                        <input id="me-date" type="date" required className={inputCls} value={draft.date} onChange={(e) => setDraft({ ...draft, date: e.target.value })} />
                    </div>
                    <div>
                        <label className={labelCls} htmlFor="me-time">時刻</label>
                        <input id="me-time" type="time" className={inputCls} value={draft.time} onChange={(e) => setDraft({ ...draft, time: e.target.value })} />
                    </div>
                </div>

                <span className={`${labelCls} mt-4`}>区分</span>
                <div className="grid grid-cols-4 gap-2">
                    {MEAL_TYPES.map((t) => (
                        <button key={t} type="button" onClick={() => setDraft({ ...draft, type: t })} aria-pressed={draft.type === t}
                            className="rounded-lg border-2 border-[#1A1A1A] py-2 text-sm font-bold" style={{ background: draft.type === t ? '#FFB37B' : '#fff' }}>{t}</button>
                    ))}
                </div>

                <span className={`${labelCls} mt-4`}>写真（{MAX_PHOTOS} 枚まで）</span>
                <div className="flex flex-wrap gap-2">
                    {draft.photos.map((id) => (
                        <div key={id} className="relative">
                            <Photo id={id} className="w-20 h-20 rounded-lg border-2 border-[#1A1A1A]" onOpen={onOpenPhoto} />
                            <button type="button" onClick={() => removePhoto(id)} aria-label="この写真を外す"
                                className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white border-2 border-[#1A1A1A] text-xs font-bold leading-none">×</button>
                        </div>
                    ))}
                    {draft.photos.length < MAX_PHOTOS && (
                        <label className="w-20 h-20 rounded-lg border-2 border-dashed border-[#1A1A1A] bg-[#FAFAF7] flex flex-col items-center justify-center cursor-pointer text-[#4A4A4A] hover:bg-[#FBEBD5]">
                            <span className="text-2xl leading-none">＋</span>
                            <span className="text-[10px] font-bold mt-1">{busy ? '取り込み中' : '写真'}</span>
                            <input ref={fileRef} type="file" accept="image/*" multiple className="sr-only" onChange={(e) => addPhotos(e.target.files)} />
                        </label>
                    )}
                </div>

                <label className={`${labelCls} mt-4`} htmlFor="me-food">食べたもの（自由記述・任意）</label>
                <textarea id="me-food" rows={2} className={inputCls} value={draft.food}
                    placeholder="例：外食の定食。成分表にないものや、ざっくりした記録に" onChange={(e) => setDraft({ ...draft, food: e.target.value })} />

                <label className={`${labelCls} mt-4`} htmlFor="me-memo">メモ（任意）</label>
                <input id="me-memo" type="text" className={inputCls} value={draft.memo}
                    placeholder="例：腹八分目。食後に眠気なし" onChange={(e) => setDraft({ ...draft, memo: e.target.value })} />

                <button type="submit" disabled={busy || empty} className={`${pillCls} w-full mt-5 py-3 bg-[#FF9855]`}>保存する</button>
                {onDelete && (
                    <button type="button" onClick={onDelete} className="w-full mt-3 text-sm font-bold underline text-[#d03b3b]">この記録を削除（食品・写真ごと）</button>
                )}
            </form>
        </Sheet>
    );
}
