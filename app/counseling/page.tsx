'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

// ===== 型 =====
type Scale = 1 | 2 | 3 | 4 | 5;
type SymptomLevel = 'always' | 'sometimes' | 'rarely' | 'never';

type FormData = {
    // 基本
    name: string;
    kana: string;
    email: string;
    age: string;
    gender: '男性' | '女性' | 'その他' | '';
    // 主訴・目的
    complaint: string;
    goal: string;
    pastConditions: string;
    medications: string;
    supplements: string;
    familyHistory: string;
    // 主観スコア（1-5）
    fatigue: Scale | null;
    energy: Scale | null;
    focus: Scale | null;
    mood: Scale | null;
    sleepQuality: Scale | null;
    // 3ヶ月前との比較
    threeMonthCompare: '良くなった' | '変わらない' | '悪くなった' | '';
    // 症状チェック
    symptoms: Partial<Record<string, SymptomLevel>>;
    // 食事
    water: string;
    appetite: string;
    mealCount: string;
    mealAmount: string;
    mealTime: string;
    fastFood: string;
    eatOut: string;
    avoidedFoods: string;
    sweets: string;
    drinks: string;
    alcohol: string;
    proteinSources: string; // 朝・昼・夕の主タンパク質源
    vegetableServings: string; // /日
    // 睡眠
    sleepHours: string;
    fallAsleep: string;
    wakeup: string;
    midnightWake: string;
    dinnerToBed: string;
    // 運動・ストレス
    walking: string;
    exerciseFreq: string;
    stressRelief: string;
    smoking: string;
    // 排便
    poopFreq: string;
    poopState: string;
    // 女性のみ
    menstrualCycle: string;
    pms: string;
    // 自由
    notes: string;
};

const SYMPTOMS = [
    '頭痛', '冷え', '浮腫み', '便秘', '下痢', '胸焼け', 'お腹の張り',
    '肩こり', '腰痛', '関節痛', '皮膚トラブル', '抜け毛',
    '集中力低下', '記憶力低下', 'イライラ', '不安感', '気分の落ち込み',
    'めまい', '動悸', '息切れ',
] as const;

const initialData: FormData = {
    name: '', kana: '', email: '', age: '', gender: '',
    complaint: '', goal: '', pastConditions: '', medications: '', supplements: '', familyHistory: '',
    fatigue: null, energy: null, focus: null, mood: null, sleepQuality: null,
    threeMonthCompare: '',
    symptoms: {},
    water: '', appetite: '', mealCount: '', mealAmount: '', mealTime: '',
    fastFood: '', eatOut: '', avoidedFoods: '', sweets: '', drinks: '', alcohol: '',
    proteinSources: '', vegetableServings: '',
    sleepHours: '', fallAsleep: '', wakeup: '', midnightWake: '', dinnerToBed: '',
    walking: '', exerciseFreq: '', stressRelief: '', smoking: '',
    poopFreq: '', poopState: '',
    menstrualCycle: '', pms: '',
    notes: '',
};

const SECTIONS = ['基本情報', '主訴・目的・体質', '体調スコア', '症状チェック', '食事', '睡眠', '運動・ストレス・排便', '自由記述・送信'] as const;

const LS_KEY = 'mitoflow40-counseling-draft-v1';

export default function CounselingPage() {
    const router = useRouter();
    const [step, setStep] = useState(0);
    const [data, setData] = useState<FormData>(initialData);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // 自動保存（localStorage）
    useEffect(() => {
        const saved = localStorage.getItem(LS_KEY);
        if (saved) {
            try { setData({ ...initialData, ...JSON.parse(saved) }); } catch {}
        }
    }, []);
    useEffect(() => {
        if (data.name || data.complaint) {
            localStorage.setItem(LS_KEY, JSON.stringify(data));
        }
    }, [data]);

    const progress = useMemo(() => Math.round(((step + 1) / SECTIONS.length) * 100), [step]);

    const update = <K extends keyof FormData>(key: K, value: FormData[K]) => {
        setData((d) => ({ ...d, [key]: value }));
    };
    const setSymptom = (s: string, lvl: SymptomLevel | undefined) => {
        setData((d) => {
            const next = { ...d.symptoms };
            if (lvl === undefined) delete next[s];
            else next[s] = lvl;
            return { ...d, symptoms: next };
        });
    };

    const submit = async () => {
        setSubmitting(true);
        setError(null);
        try {
            const res = await fetch('/api/counseling', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (!res.ok) throw new Error('送信に失敗しました。時間を置いて再度お試しください。');
            localStorage.removeItem(LS_KEY);
            router.push('/counseling/thanks');
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : '送信に失敗しました');
            setSubmitting(false);
        }
    };

    return (
        <div className="pt-28 pb-24 px-4 md:px-6">
            <div className="max-w-[760px] mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>
                        COUNSELING SHEET
                    </p>
                    <h1 className="text-2xl md:text-3xl font-bold mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        カウンセリングシート
                    </h1>
                    <p className="text-sm text-[#4A4A4A] leading-relaxed">
                        解析の精度を高めるために、体調・生活習慣をお聞かせください。10分ほどで終わります。
                        記入途中で閉じても、同じ端末で再アクセスすれば続きから入力できます。
                    </p>
                </div>

                {/* Progress */}
                <div className="mb-8">
                    <div className="flex justify-between text-xs text-[#4A4A4A] mb-2">
                        <span style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{step + 1} / {SECTIONS.length}　{SECTIONS[step]}</span>
                        <span style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{progress}%</span>
                    </div>
                    <div className="h-1.5 bg-[#EEE] rounded-full overflow-hidden">
                        <div className="h-full bg-[#FF9855] transition-all" style={{ width: `${progress}%` }} />
                    </div>
                </div>

                {/* Form */}
                <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#E5E5E5] shadow-sm">
                    {step === 0 && <SectionBasic data={data} update={update} />}
                    {step === 1 && <SectionComplaint data={data} update={update} />}
                    {step === 2 && <SectionScores data={data} update={update} />}
                    {step === 3 && <SectionSymptoms data={data} setSymptom={setSymptom} />}
                    {step === 4 && <SectionMeals data={data} update={update} />}
                    {step === 5 && <SectionSleep data={data} update={update} />}
                    {step === 6 && <SectionExercise data={data} update={update} />}
                    {step === 7 && <SectionNotes data={data} update={update} onSubmit={submit} submitting={submitting} error={error} />}
                </div>

                {/* Nav */}
                <div className="flex justify-between mt-6">
                    <button
                        type="button"
                        onClick={() => setStep((s) => Math.max(0, s - 1))}
                        disabled={step === 0}
                        className="px-5 py-2 rounded-full text-sm font-bold border border-[#1A1A1A] disabled:opacity-30"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                        ← 戻る
                    </button>
                    {step < SECTIONS.length - 1 && (
                        <button
                            type="button"
                            onClick={() => setStep((s) => Math.min(SECTIONS.length - 1, s + 1))}
                            className="px-6 py-2 rounded-full text-sm font-bold text-white bg-[#1A1A1A]"
                            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                            次へ →
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

// ===== Sections =====
type SectionProps = { data: FormData; update: <K extends keyof FormData>(k: K, v: FormData[K]) => void };

function Label({ children, required = false }: { children: React.ReactNode; required?: boolean }) {
    return (
        <label className="block text-sm font-bold mb-2 text-[#1A1A1A]">
            {children}{required && <span className="text-[#E54848] ml-1">*</span>}
        </label>
    );
}
function Input({ value, onChange, placeholder, type = 'text' }: { value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
    return (
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
            className="w-full px-4 py-2.5 rounded-lg border border-[#D5D5D5] focus:border-[#FF9855] focus:outline-none text-sm" />
    );
}
function Textarea({ value, onChange, placeholder, rows = 3 }: { value: string; onChange: (v: string) => void; placeholder?: string; rows?: number }) {
    return (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={rows}
            className="w-full px-4 py-2.5 rounded-lg border border-[#D5D5D5] focus:border-[#FF9855] focus:outline-none text-sm resize-y" />
    );
}
function Choices({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: string[] }) {
    return (
        <div className="flex flex-wrap gap-2">
            {options.map((opt) => (
                <button key={opt} type="button" onClick={() => onChange(opt)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition ${value === opt ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' : 'bg-white text-[#1A1A1A] border-[#D5D5D5] hover:border-[#1A1A1A]'}`}>
                    {opt}
                </button>
            ))}
        </div>
    );
}
function ScaleInput({ value, onChange, labels }: { value: Scale | null; onChange: (v: Scale) => void; labels: [string, string] }) {
    return (
        <div>
            <div className="flex justify-between text-xs text-[#4A4A4A] mb-2">
                <span>{labels[0]}</span><span>{labels[1]}</span>
            </div>
            <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((n) => (
                    <button key={n} type="button" onClick={() => onChange(n as Scale)}
                        className={`flex-1 py-3 rounded-lg border text-sm font-bold transition ${value === n ? 'bg-[#FF9855] text-white border-[#FF9855]' : 'bg-white text-[#1A1A1A] border-[#D5D5D5] hover:border-[#FF9855]'}`}>
                        {n}
                    </button>
                ))}
            </div>
        </div>
    );
}
function FieldGroup({ children }: { children: React.ReactNode }) {
    return <div className="space-y-5">{children}</div>;
}

// ----- Section components -----
function SectionBasic({ data, update }: SectionProps) {
    return (
        <FieldGroup>
            <div><Label required>お名前</Label><Input value={data.name} onChange={(v) => update('name', v)} placeholder="例: 田中 花子" /></div>
            <div><Label>カナ</Label><Input value={data.kana} onChange={(v) => update('kana', v)} placeholder="タナカ ハナコ" /></div>
            <div className="grid grid-cols-2 gap-4">
                <div><Label required>年齢</Label><Input value={data.age} onChange={(v) => update('age', v)} type="number" placeholder="45" /></div>
                <div><Label required>性別</Label><Choices value={data.gender} onChange={(v) => update('gender', v as FormData['gender'])} options={['男性', '女性', 'その他']} /></div>
            </div>
            <div><Label required>メールアドレス</Label><Input value={data.email} onChange={(v) => update('email', v)} type="email" placeholder="example@example.com" /></div>
        </FieldGroup>
    );
}
function SectionComplaint({ data, update }: SectionProps) {
    return (
        <FieldGroup>
            <div><Label required>主訴（今、一番なんとかしたい不調・気になること）</Label><Textarea value={data.complaint} onChange={(v) => update('complaint', v)} placeholder="例: 夕方の集中力低下、寝つきの悪さ" /></div>
            <div><Label>ゴール・目的（達成したい状態）</Label><Textarea value={data.goal} onChange={(v) => update('goal', v)} placeholder="例: 朝スッキリ起きられる体に、半年で体脂肪率-3%" /></div>
            <div><Label>既往歴・現在治療中の疾患</Label><Textarea value={data.pastConditions} onChange={(v) => update('pastConditions', v)} placeholder="例: 高血圧、花粉症" rows={2} /></div>
            <div><Label>服薬</Label><Textarea value={data.medications} onChange={(v) => update('medications', v)} placeholder="例: アムロジピン 5mg/日" rows={2} /></div>
            <div><Label>サプリメント（ブランド・用量）</Label><Textarea value={data.supplements} onChange={(v) => update('supplements', v)} placeholder="例: ビタミンD 4000IU、マグネシウム グリシン酸 300mg" rows={2} /></div>
            <div><Label>家族の既往歴</Label><Textarea value={data.familyHistory} onChange={(v) => update('familyHistory', v)} placeholder="例: 父=糖尿病、母=甲状腺機能低下" rows={2} /></div>
        </FieldGroup>
    );
}
function SectionScores({ data, update }: SectionProps) {
    return (
        <FieldGroup>
            <p className="text-sm text-[#4A4A4A] mb-2">この1ヶ月の平均的な状態を 1（最悪）〜 5（最高）でお答えください。</p>
            <div><Label>疲労感（5=ほとんど疲れない）</Label><ScaleInput value={data.fatigue} onChange={(v) => update('fatigue', v)} labels={['いつも疲れる', '疲れにくい']} /></div>
            <div><Label>気力・活力</Label><ScaleInput value={data.energy} onChange={(v) => update('energy', v)} labels={['出ない', '満タン']} /></div>
            <div><Label>集中力</Label><ScaleInput value={data.focus} onChange={(v) => update('focus', v)} labels={['続かない', '長時間集中']} /></div>
            <div><Label>気分の安定度</Label><ScaleInput value={data.mood} onChange={(v) => update('mood', v)} labels={['不安定', '安定']} /></div>
            <div><Label>睡眠の質（主観）</Label><ScaleInput value={data.sleepQuality} onChange={(v) => update('sleepQuality', v)} labels={['悪い', '良い']} /></div>
            <div><Label>3ヶ月前と比べて、体の調子は？</Label><Choices value={data.threeMonthCompare} onChange={(v) => update('threeMonthCompare', v as FormData['threeMonthCompare'])} options={['良くなった', '変わらない', '悪くなった']} /></div>
        </FieldGroup>
    );
}
function SectionSymptoms({ data, setSymptom }: { data: FormData; setSymptom: (s: string, lvl: SymptomLevel | undefined) => void }) {
    const LEVELS: { value: SymptomLevel; label: string; color: string }[] = [
        { value: 'always', label: 'いつも', color: '#FF9855' },
        { value: 'sometimes', label: '時々', color: '#E8C547' },
        { value: 'rarely', label: 'まれ', color: '#B2EBF2' },
    ];
    return (
        <FieldGroup>
            <p className="text-sm text-[#4A4A4A]">該当する症状の頻度を選んでください。何もなければ空欄でOK。</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {SYMPTOMS.map((s) => {
                    const cur = data.symptoms[s];
                    return (
                        <div key={s} className="flex items-center justify-between gap-2 p-3 rounded-lg border border-[#E5E5E5]">
                            <span className="text-sm">{s}</span>
                            <div className="flex gap-1">
                                {LEVELS.map((l) => (
                                    <button key={l.value} type="button" onClick={() => setSymptom(s, cur === l.value ? undefined : l.value)}
                                        className={`px-2 py-1 rounded-full text-[10px] font-bold border transition ${cur === l.value ? 'text-[#1A1A1A]' : 'text-[#4A4A4A] border-[#D5D5D5] bg-white'}`}
                                        style={cur === l.value ? { background: l.color, borderColor: l.color } : {}}>
                                        {l.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </FieldGroup>
    );
}
function SectionMeals({ data, update }: SectionProps) {
    return (
        <FieldGroup>
            <div><Label>水分摂取量/日</Label><Choices value={data.water} onChange={(v) => update('water', v)} options={['500mL以下', '500mL〜1L', '1L〜2L', '2L以上']} /></div>
            <div><Label>食欲</Label><Choices value={data.appetite} onChange={(v) => update('appetite', v)} options={['ある', 'ふつう', 'あまりない', '日によって違う']} /></div>
            <div className="grid grid-cols-2 gap-4">
                <div><Label>食事回数</Label><Choices value={data.mealCount} onChange={(v) => update('mealCount', v)} options={['1食', '2食', '3食', '3食+間食']} /></div>
                <div><Label>食事量</Label><Choices value={data.mealAmount} onChange={(v) => update('mealAmount', v)} options={['少ない', 'ふつう', '多い']} /></div>
            </div>
            <div><Label>1食にかける時間</Label><Choices value={data.mealTime} onChange={(v) => update('mealTime', v)} options={['15分未満', '15-30分', '30-60分', '1時間以上']} /></div>
            <div><Label>朝・昼・夕のタンパク質源</Label><Textarea value={data.proteinSources} onChange={(v) => update('proteinSources', v)} placeholder="例: 朝=卵2個、昼=鶏胸肉、夕=魚" rows={2} /></div>
            <div><Label>野菜の量 (servings/日 ≒ 握りこぶし1個分が1 serving)</Label><Choices value={data.vegetableServings} onChange={(v) => update('vegetableServings', v)} options={['0-1', '2-3', '4-5', '6以上']} /></div>
            <div><Label>ファーストフード頻度</Label><Choices value={data.fastFood} onChange={(v) => update('fastFood', v)} options={['月0', '月1-3', '週1-2', '週3以上']} /></div>
            <div><Label>外食・惣菜頻度</Label><Choices value={data.eatOut} onChange={(v) => update('eatOut', v)} options={['月0-1', '週1-2', '週3-4', 'ほぼ毎日']} /></div>
            <div><Label>控えている食事（あれば）</Label><Input value={data.avoidedFoods} onChange={(v) => update('avoidedFoods', v)} placeholder="例: グルテン、カゼイン、白砂糖" /></div>
            <div><Label>菓子類頻度</Label><Choices value={data.sweets} onChange={(v) => update('sweets', v)} options={['月0', '週1-2', '週3-4', 'ほぼ毎日']} /></div>
            <div><Label>飲料（よく飲むもの）</Label><Input value={data.drinks} onChange={(v) => update('drinks', v)} placeholder="例: コーヒー3杯、お茶、水" /></div>
            <div><Label>飲酒頻度</Label><Choices value={data.alcohol} onChange={(v) => update('alcohol', v)} options={['飲まない', '週1-2', '週3-4', 'ほぼ毎日']} /></div>
        </FieldGroup>
    );
}
function SectionSleep({ data, update }: SectionProps) {
    return (
        <FieldGroup>
            <div><Label>平均睡眠時間</Label><Choices value={data.sleepHours} onChange={(v) => update('sleepHours', v)} options={['5h以下', '5-6h', '6-7h', '7-8h', '8h以上']} /></div>
            <div><Label>寝つき</Label><Choices value={data.fallAsleep} onChange={(v) => update('fallAsleep', v)} options={['良い', 'ふつう', '悪い']} /></div>
            <div><Label>目覚め</Label><Choices value={data.wakeup} onChange={(v) => update('wakeup', v)} options={['スッキリ', 'ふつう', 'だるい']} /></div>
            <div><Label>夜中の覚醒</Label><Choices value={data.midnightWake} onChange={(v) => update('midnightWake', v)} options={['ない', '時々', '頻繁']} /></div>
            <div><Label>夕食から就寝までの時間</Label><Choices value={data.dinnerToBed} onChange={(v) => update('dinnerToBed', v)} options={['1時間未満', '1-2時間', '2-3時間', '3時間以上']} /></div>
        </FieldGroup>
    );
}
function SectionExercise({ data, update }: SectionProps) {
    return (
        <FieldGroup>
            <div><Label>歩行時間/日</Label><Choices value={data.walking} onChange={(v) => update('walking', v)} options={['30分未満', '30-60分', '60-90分', '90分以上']} /></div>
            <div><Label>運動頻度（30分以上の有酸素 or 筋トレ）</Label><Choices value={data.exerciseFreq} onChange={(v) => update('exerciseFreq', v)} options={['しない', '月1-3', '週1-2', '週3-4', 'ほぼ毎日']} /></div>
            <div><Label>ストレス解消法</Label><Input value={data.stressRelief} onChange={(v) => update('stressRelief', v)} placeholder="例: 入浴、瞑想、散歩" /></div>
            <div><Label>喫煙</Label><Input value={data.smoking} onChange={(v) => update('smoking', v)} placeholder="例: しない / 1日5本×10年" /></div>
            <hr className="border-[#E5E5E5]" />
            <div><Label>排便頻度</Label><Choices value={data.poopFreq} onChange={(v) => update('poopFreq', v)} options={['毎日1回', '毎日2回以上', '2日に1回', '3日に1回以下']} /></div>
            <div><Label>便の状態</Label><Choices value={data.poopState} onChange={(v) => update('poopState', v)} options={['バナナ状', '柔らかい', '硬い', '下痢気味', '日によって違う']} /></div>
            {data.gender === '女性' && (<>
                <hr className="border-[#E5E5E5]" />
                <div><Label>月経周期（日数）</Label><Input value={data.menstrualCycle} onChange={(v) => update('menstrualCycle', v)} placeholder="例: 28日、不規則" /></div>
                <div><Label>PMS（月経前症候群）症状</Label><Textarea value={data.pms} onChange={(v) => update('pms', v)} placeholder="例: イライラ、頭痛、むくみ" rows={2} /></div>
            </>)}
        </FieldGroup>
    );
}
function SectionNotes({ data, update, onSubmit, submitting, error }: SectionProps & { onSubmit: () => void; submitting: boolean; error: string | null }) {
    const canSubmit = data.name && data.email && data.gender && data.age && data.complaint;
    return (
        <FieldGroup>
            <div>
                <Label>その他、伝えておきたいこと（自由記述）</Label>
                <Textarea value={data.notes} onChange={(v) => update('notes', v)} placeholder="気になる症状、生活スタイルの背景、検査で特に注目してほしい点など" rows={5} />
            </div>
            <div className="text-xs text-[#4A4A4A] p-4 bg-[#FAFAF7] rounded-lg leading-relaxed">
                ご回答内容は、MitoFlow40 の解析・カウンセリング目的でのみ使用します。
                第三者への提供は行いません。詳細は <a href="/privacy" className="underline">プライバシーポリシー</a> をご覧ください。
            </div>
            {!canSubmit && (
                <div className="text-xs text-[#E54848]">必須項目（お名前・年齢・性別・メール・主訴）を入力してください。</div>
            )}
            {error && (
                <div className="text-xs text-[#E54848] p-3 bg-[#FFEBE8] rounded-lg">{error}</div>
            )}
            <button type="button" onClick={onSubmit} disabled={!canSubmit || submitting}
                className="w-full py-3 rounded-full text-base font-bold text-white bg-[#FF9855] hover:opacity-90 transition disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {submitting ? '送信中...' : '送信する'}
            </button>
        </FieldGroup>
    );
}
