'use client';

import { useState } from 'react';
import Sheet from './Sheet';
import { inputCls, labelCls, pillCls } from './styles';
import { AGE_GROUPS, eer, type Activity, type Profile } from '@/lib/nutrition';

const ACTIVITY: { v: Activity; label: string; sub: string }[] = [
    { v: 'low', label: '低い', sub: '座っていることがほとんど' },
    { v: 'normal', label: 'ふつう', sub: '座り仕事が中心で、通勤・家事・軽い運動あり' },
    { v: 'high', label: '高い', sub: '立ち仕事・移動が多い、運動の習慣がある' },
];

// 目標値を決めるための設定（性別・年齢・身体活動レベル）
export default function ProfileSheet({ profile, onSave, onClose }: { profile: Profile; onSave: (p: Profile) => void; onClose: () => void }) {
    const [p, setP] = useState<Profile>(profile);
    const [kcal, setKcal] = useState(profile.kcal ? String(profile.kcal) : '');
    const showMenses = p.sex === 'female' && ['18〜29', '30〜49', '50〜64'].includes(p.age);
    const choice = (on: boolean) => ({ background: on ? '#FFB37B' : '#fff' });

    const save = () => {
        const n = Number(kcal);
        onSave({ ...p, kcal: kcal && Number.isFinite(n) && n >= 800 && n <= 6000 ? Math.round(n) : null });
        onClose();
    };

    return (
        <Sheet title="目標の設定" onClose={onClose}>
            <p className="text-xs text-[#666]">「日本人の食事摂取基準（2025年版）」から、あなたの 1 日の目標を決めます。設定はこの端末にだけ保存されます。</p>

            <span className={`${labelCls} mt-4`}>性別</span>
            <div className="grid grid-cols-2 gap-2">
                {(['female', 'male'] as const).map((s) => (
                    <button key={s} type="button" onClick={() => setP({ ...p, sex: s })} aria-pressed={p.sex === s}
                        className="rounded-lg border-2 border-[#1A1A1A] py-2 text-sm font-bold" style={choice(p.sex === s)}>{s === 'female' ? '女性' : '男性'}</button>
                ))}
            </div>

            <span className={`${labelCls} mt-4`}>年齢</span>
            <div className="grid grid-cols-5 gap-1.5">
                {AGE_GROUPS.map((a) => (
                    <button key={a} type="button" onClick={() => setP({ ...p, age: a })} aria-pressed={p.age === a}
                        className="rounded-lg border-2 border-[#1A1A1A] py-2 text-xs font-bold" style={choice(p.age === a)}>{a}</button>
                ))}
            </div>

            {showMenses && (
                <>
                    <span className={`${labelCls} mt-4`}>月経（鉄の目標が変わります）</span>
                    <div className="grid grid-cols-2 gap-2">
                        {[true, false].map((m) => (
                            <button key={String(m)} type="button" onClick={() => setP({ ...p, menstruation: m })} aria-pressed={p.menstruation === m}
                                className="rounded-lg border-2 border-[#1A1A1A] py-2 text-sm font-bold" style={choice(p.menstruation === m)}>{m ? 'あり' : 'なし'}</button>
                        ))}
                    </div>
                </>
            )}

            <span className={`${labelCls} mt-4`}>ふだんの活動量</span>
            <div className="space-y-2">
                {ACTIVITY.map((a) => (
                    <button key={a.v} type="button" onClick={() => setP({ ...p, activity: a.v })} aria-pressed={p.activity === a.v}
                        className="w-full text-left rounded-lg border-2 border-[#1A1A1A] px-3 py-2" style={choice(p.activity === a.v)}>
                        <span className="text-sm font-bold">{a.label}</span><span className="text-xs text-[#4A4A4A] ml-2">{a.sub}</span>
                    </button>
                ))}
            </div>

            <label className={`${labelCls} mt-4`} htmlFor="pf-kcal">エネルギーの目標（kcal・空欄なら推定エネルギー必要量 {eer(p).toLocaleString()} kcal）</label>
            <input id="pf-kcal" type="number" inputMode="numeric" min={800} max={6000} className={`${inputCls} max-w-[160px]`}
                value={kcal} placeholder={String(eer(p))} onChange={(e) => setKcal(e.target.value)} />
            <p className="text-[11px] text-[#666] mt-1">減量・増量中などで自分の目標がある場合に入れてください。</p>

            <button type="button" onClick={save} className={`${pillCls} w-full mt-5 py-3 bg-[#FF9855]`}>保存する</button>
        </Sheet>
    );
}
