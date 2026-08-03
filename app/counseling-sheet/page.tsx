'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { QUESTIONNAIRE_SECTIONS, SYMPTOMS, SYMPTOM_LEVELS, type QField, type QSection } from '@/lib/intake';

// クライアントがカウンセリング票（問診＋血液検査＋Apple Watch）を記入する多段フォーム。noindex。

type Gender = '男性' | '女性' | 'その他' | '';

const MAX_FILES = 12;
const MAX_FILE_MB = 15;

export default function IntakePage() {
    const router = useRouter();

    // 基本
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState<Gender>('');
    const [complaint, setComplaint] = useState('');
    const [notes, setNotes] = useState('');
    const [files, setFiles] = useState<File[]>([]);
    const [consent, setConsent] = useState(false);

    // 問診回答（key→値）と症状チェック（symptom→頻度）
    const [q, setQ] = useState<Record<string, string>>({});
    const [symptoms, setSymptoms] = useState<Record<string, string>>({});
    const setAnswer = (key: string, value: string) => setQ((prev) => ({ ...prev, [key]: value }));
    const setSymptom = (s: string, level: string) =>
        setSymptoms((prev) => {
            const next = { ...prev };
            if (!level || next[s] === level) delete next[s];
            else next[s] = level;
            return next;
        });

    const [hp, setHp] = useState(''); // ハニーポット（bot対策・人間は触れない）
    const [step, setStep] = useState(0);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // 性別で女性専用セクションの表示を切り替え、ステップ一覧を組み立てる
    const visibleSections = useMemo<QSection[]>(
        () => QUESTIONNAIRE_SECTIONS.filter((s) => !s.femaleOnly || gender === '女性'),
        [gender]
    );
    const steps = useMemo(() => ['基本情報', ...visibleSections.map((s) => s.title), 'ファイル・確認'], [visibleSections]);
    const clamped = Math.min(step, steps.length - 1);
    const title = steps[clamped];
    const isLast = clamped === steps.length - 1;
    const currentSection = visibleSections.find((s) => s.title === title);

    const canSubmit = name.trim() && email.trim() && consent && !submitting;

    function addFiles(list: FileList | null) {
        if (!list) return;
        const incoming = Array.from(list);
        const tooBig = incoming.find((f) => f.size > MAX_FILE_MB * 1024 * 1024);
        if (tooBig) { setError(`「${tooBig.name}」が大きすぎます（1ファイル${MAX_FILE_MB}MBまで）`); return; }
        setError(null);
        setFiles((prev) => [...prev, ...incoming].slice(0, MAX_FILES));
    }
    function removeFile(idx: number) { setFiles((prev) => prev.filter((_, i) => i !== idx)); }

    // 症状チェックを1本の文字列にまとめる（例: 頭痛（時々）・便秘（いつも））
    function symptomsToString(): string {
        const levelLabel: Record<string, string> = Object.fromEntries(SYMPTOM_LEVELS.map((l) => [l.value, l.label]));
        return SYMPTOMS.filter((s) => symptoms[s]).map((s) => `${s}（${levelLabel[symptoms[s]]}）`).join('・');
    }

    async function submit() {
        if (!canSubmit) return;
        setSubmitting(true);
        setError(null);
        try {
            const fd = new FormData();
            fd.set('name', name);
            fd.set('email', email);
            fd.set('age', age);
            fd.set('gender', gender);
            fd.set('complaint', complaint);
            fd.set('notes', notes);
            fd.set('consent', consent ? 'true' : 'false');
            fd.set('website', hp); // ハニーポット
            Object.entries(q).forEach(([k, v]) => { if (v) fd.set(k, v); });
            const symStr = symptomsToString();
            if (symStr) fd.set('symptoms', symStr);
            files.forEach((f) => fd.append('files', f));

            const res = await fetch('/api/intake', { method: 'POST', body: fd });
            const json = await res.json();
            if (!res.ok || !json.ok) throw new Error(json.error || '送信に失敗しました');
            router.push(json.clientId ? `/counseling-sheet/my/${json.clientId}?new=1` : '/counseling-sheet/thanks');
        } catch (e) {
            setError(e instanceof Error ? e.message : '送信に失敗しました');
            setSubmitting(false);
        }
    }

    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#DEEAF2' }}>
            {/* ハニーポット：画面外・スクリーンリーダー非表示。人間は入力しない。 */}
            <input type="text" name="website" value={hp} onChange={(e) => setHp(e.target.value)}
                tabIndex={-1} autoComplete="off" aria-hidden="true"
                style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }} />

            <div className="max-w-[680px] mx-auto relative" style={{ zIndex: 1 }}>
                <header className="mb-6 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>COUNSELING SHEET</p>
                    <h1 className="text-2xl md:text-4xl font-bold mb-3 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        カウンセリング票
                    </h1>
                    <p className="text-sm text-[#1A1A1A] font-medium leading-relaxed">
                        カウンセリングの前に、問診・血液検査・Apple Watch の記録をご記入ください。解析とカウンセリングの土台になります。
                    </p>
                </header>

                {/* ステップインジケーター */}
                <div className="flex items-center justify-center flex-wrap gap-1.5 mb-2">
                    {steps.map((s, i) => (
                        <span key={s} className={`text-[11px] font-bold px-2.5 py-1 rounded-full transition ${i === clamped ? 'bg-[#1A1A1A] text-white' : i < clamped ? 'bg-[#41C9B4] text-white' : 'bg-white/70 text-[#1A1A1A]/50 border border-[#1A1A1A]/15'}`}>
                            {i + 1}
                        </span>
                    ))}
                </div>
                <p className="text-center text-xs text-[#1A1A1A]/60 mb-6">{clamped + 1} / {steps.length}　{title}</p>

                <div className="bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-lg font-bold text-[#1A1A1A] mb-5 border-l-4 border-[#FF9855] pl-3">{title}</h2>

                    {/* 基本情報 */}
                    {title === '基本情報' && (
                        <div className="space-y-5">
                            <div><Label required>お名前</Label><Input value={name} onChange={setName} placeholder="例: 田中 花子" /></div>
                            <div><Label>カナ</Label><Input value={q.kana || ''} onChange={(v) => setAnswer('kana', v)} placeholder="タナカ ハナコ" /></div>
                            <div><Label required>メールアドレス</Label><Input value={email} onChange={setEmail} type="email" placeholder="example@example.com" /></div>
                            <div className="grid grid-cols-2 gap-4">
                                <div><Label>年齢</Label><Input value={age} onChange={setAge} type="number" placeholder="45" /></div>
                                <div><Label>性別</Label><Choice value={gender} onChange={(v) => setGender(v as Gender)} options={['男性', '女性', 'その他']} /></div>
                            </div>
                            <div><Label>主訴（今、一番なんとかしたい不調・気になること）</Label><Textarea value={complaint} onChange={setComplaint} placeholder="例: 夕方の集中力低下、寝つきの悪さ" /></div>
                        </div>
                    )}

                    {/* 問診セクション（症状チェック or 通常フィールド） */}
                    {currentSection && (
                        <div className="space-y-5">
                            {currentSection.note && <p className="text-sm text-[#4A4A4A] leading-relaxed">{currentSection.note}</p>}

                            {currentSection.symptoms ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {SYMPTOMS.map((s) => (
                                        <div key={s} className="flex items-center justify-between gap-2 p-3 rounded-lg border border-[#E5E5E5] bg-white">
                                            <span className="text-sm">{s}</span>
                                            <div className="flex gap-1">
                                                {SYMPTOM_LEVELS.map((l) => {
                                                    const active = symptoms[s] === l.value;
                                                    return (
                                                        <button key={l.value} type="button" onClick={() => setSymptom(s, l.value)}
                                                            className={`px-2 py-1 rounded-full text-[10px] font-bold border transition ${active ? 'text-[#1A1A1A]' : 'text-[#4A4A4A] border-[#D5D5D5] bg-white'}`}
                                                            style={active ? { background: l.color, borderColor: l.color } : {}}>
                                                            {l.label}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                currentSection.fields.map((f) => (
                                    <div key={f.key}>
                                        <Label>{f.label}</Label>
                                        <Field field={f} value={q[f.key] || ''} onChange={(v) => setAnswer(f.key, v)} />
                                    </div>
                                ))
                            )}
                        </div>
                    )}

                    {/* ファイル・確認 */}
                    {title === 'ファイル・確認' && (
                        <div className="space-y-6">
                            <div>
                                <Label>血液検査の結果 ・ Apple Watch の記録</Label>
                                <p className="text-xs text-[#4A4A4A] mb-3 leading-relaxed">PDF または 写真（PNG/JPG/HEIC）。最大 {MAX_FILES} 件・1ファイル {MAX_FILE_MB}MB まで。</p>
                                <label className="flex items-center justify-center gap-2 w-full py-6 rounded-xl border-2 border-dashed border-[#41C9B4] bg-white/60 cursor-pointer hover:bg-white transition text-sm font-bold text-[#1A1A1A]">
                                    <span>＋ ファイルを選ぶ</span>
                                    <input type="file" multiple accept=".pdf,image/png,image/jpeg,image/webp,image/heic,image/heif"
                                        className="hidden" onChange={(e) => { addFiles(e.target.files); e.target.value = ''; }} />
                                </label>
                                {files.length > 0 && (
                                    <ul className="mt-3 space-y-2">
                                        {files.map((f, i) => (
                                            <li key={i} className="flex items-center justify-between gap-3 text-xs bg-white rounded-lg border border-[#D5D5D5] px-3 py-2">
                                                <span className="truncate flex-1 text-[#1A1A1A]">{f.name}</span>
                                                <span className="text-[#4A4A4A] shrink-0">{(f.size / 1024 / 1024).toFixed(1)}MB</span>
                                                <button type="button" onClick={() => removeFile(i)} className="text-[#E54848] font-bold shrink-0">削除</button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <div><Label>その他、伝えておきたいこと（自由記述）</Label><Textarea value={notes} onChange={setNotes} rows={4} placeholder="気になる症状、生活の背景、検査で特に見てほしい点など" /></div>

                            <label className="flex items-start gap-3 text-sm text-[#1A1A1A] cursor-pointer bg-white/60 rounded-xl border border-[#D5D5D5] p-4">
                                <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 w-4 h-4 accent-[#41C9B4]" />
                                <span className="leading-relaxed">
                                    ご記入いただく情報が健康に関する個人情報であることを理解し、<Link href="/privacy" className="underline font-bold" target="_blank">プライバシーポリシー</Link>に基づき、解析・カウンセリングの目的で利用・保管されることに同意します。
                                </span>
                            </label>

                            {error && <p className="text-sm text-[#E54848] font-bold">{error}</p>}

                            <button type="button" onClick={submit} disabled={!canSubmit}
                                className="w-full py-3.5 rounded-full text-sm font-bold text-white bg-[#1A1A1A] disabled:opacity-30 transition"
                                style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                {submitting ? '送信中…' : 'カウンセリング票を送信する'}
                            </button>
                            <p className="text-[11px] text-[#1A1A1A]/50 text-center leading-relaxed">通信は暗号化され、内容は担当者のみが確認します。第三者には共有されません。</p>
                        </div>
                    )}
                </div>

                {/* ナビ */}
                <div className="flex justify-between mt-5">
                    <button type="button" onClick={() => setStep(Math.max(0, clamped - 1))} disabled={clamped === 0}
                        className="px-5 py-2.5 rounded-full text-sm font-bold border border-[#1A1A1A] bg-white disabled:opacity-30"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}>← 戻る</button>
                    {!isLast && (
                        <button type="button" onClick={() => setStep(Math.min(steps.length - 1, clamped + 1))}
                            className="px-6 py-2.5 rounded-full text-sm font-bold text-white bg-[#1A1A1A]"
                            style={{ fontFamily: "'Space Grotesk', sans-serif" }}>次へ →</button>
                    )}
                </div>
                {!isLast && <p className="text-[11px] text-[#1A1A1A]/40 text-center mt-3">問診は任意項目です。空欄のまま進めても送信できます。</p>}
            </div>
        </div>
    );
}

// ===== 小さなUI部品 =====
function Field({ field, value, onChange }: { field: QField; value: string; onChange: (v: string) => void }) {
    if (field.type === 'scale') return <Scale value={value} onChange={onChange} low={field.low || ''} high={field.high || ''} />;
    if (field.type === 'choice') return <Choice value={value} onChange={onChange} options={field.options || []} />;
    if (field.type === 'textarea') return <Textarea value={value} onChange={onChange} placeholder={field.placeholder} rows={field.rows} />;
    return <Input value={value} onChange={onChange} placeholder={field.placeholder} />;
}
function Label({ children, required = false }: { children: React.ReactNode; required?: boolean }) {
    return <label className="block text-sm font-bold mb-2 text-[#1A1A1A]">{children}{required && <span className="text-[#E54848] ml-1">*</span>}</label>;
}
function Input({ value, onChange, placeholder, type = 'text' }: { value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
    return <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className="w-full px-4 py-2.5 rounded-lg border border-[#D5D5D5] focus:border-[#FF9855] focus:outline-none text-sm bg-white" />;
}
function Textarea({ value, onChange, placeholder, rows = 3 }: { value: string; onChange: (v: string) => void; placeholder?: string; rows?: number }) {
    return <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={rows}
        className="w-full px-4 py-2.5 rounded-lg border border-[#D5D5D5] focus:border-[#FF9855] focus:outline-none text-sm resize-y bg-white" />;
}
function Choice({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: string[] }) {
    return (
        <div className="flex flex-wrap gap-2">
            {options.map((opt) => (
                <button key={opt} type="button" onClick={() => onChange(value === opt ? '' : opt)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition ${value === opt ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' : 'bg-white text-[#1A1A1A] border-[#D5D5D5] hover:border-[#1A1A1A]'}`}>
                    {opt}
                </button>
            ))}
        </div>
    );
}
function Scale({ value, onChange, low, high }: { value: string; onChange: (v: string) => void; low: string; high: string }) {
    return (
        <div>
            <div className="flex justify-between text-xs text-[#4A4A4A] mb-2"><span>{low}</span><span>{high}</span></div>
            <div className="flex gap-2">
                {['1', '2', '3', '4', '5'].map((n) => (
                    <button key={n} type="button" onClick={() => onChange(value === n ? '' : n)}
                        className={`flex-1 py-2.5 rounded-lg border text-sm font-bold transition ${value === n ? 'bg-[#FF9855] text-white border-[#FF9855]' : 'bg-white text-[#1A1A1A] border-[#D5D5D5] hover:border-[#FF9855]'}`}>
                        {n}
                    </button>
                ))}
            </div>
        </div>
    );
}
