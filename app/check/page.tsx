'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

// ===== 質問定義 =====
export type Axis = 'energy' | 'mental' | 'recovery' | 'flex';
// invert: true の場合「あてはまる=活性度低い」のサイン。スコアは 6 - 回答 で反転。
type Question = { id: string; axis: Axis; text: string; labelLow: string; labelHigh: string; invert?: boolean };

const QUESTIONS: Question[] = [
    // Energy
    { id: 'e1', axis: 'energy', text: '朝、目覚めて10分以内に体が動き出せる', labelLow: 'なかなか動けない', labelHigh: 'すぐ動ける' },
    { id: 'e2', axis: 'energy', text: '午前中、コーヒーやエナジードリンクがないと頭が回らない', labelLow: '頼らない', labelHigh: '毎日頼る', invert: true },
    { id: 'e3', axis: 'energy', text: '何もしていない午後、体に「重さ」を感じない', labelLow: 'いつも重い', labelHigh: '感じない' },
    // Mental Clarity
    { id: 'm1', axis: 'mental', text: '集中したい仕事を90分続けられる', labelLow: '続かない', labelHigh: '続く' },
    { id: 'm2', axis: 'mental', text: '名前や言葉が「のど元まで出かかる」もどかしさが、週に何度かある', labelLow: 'ほぼない', labelHigh: '頻繁にある', invert: true },
    { id: 'm3', axis: 'mental', text: '夜遅い時間でも頭が冴えて寝つけないことがある', labelLow: 'ない', labelHigh: 'よくある', invert: true },
    // Recovery
    { id: 'r1', axis: 'recovery', text: '軽い運動の翌日、筋肉痛や疲労がほとんど残らない', labelLow: 'いつも残る', labelHigh: '残らない' },
    { id: 'r2', axis: 'recovery', text: '風邪をひくと長引く、または最近よく体調を崩す', labelLow: 'ない', labelHigh: 'よくある', invert: true },
    { id: 'r3', axis: 'recovery', text: '寝ても疲れが取れた感覚がない朝が多い', labelLow: 'ほぼない', labelHigh: '頻繁', invert: true },
    // Metabolic Flexibility
    { id: 'f1', axis: 'flex', text: '食事を1食抜いても、頭と体が動き続ける', labelLow: 'すぐフラつく', labelHigh: '平気' },
    { id: 'f2', axis: 'flex', text: '甘いもの・パン・米への強い渇望が、週に何度かある', labelLow: 'ない', labelHigh: 'よくある', invert: true },
    { id: 'f3', axis: 'flex', text: '冷たい環境でも体の芯から冷えにくい', labelLow: 'すぐ冷える', labelHigh: '冷えにくい' },
];

export const AXIS_META: Record<Axis, { label: string; en: string; color: string; description: string }> = {
    energy: { label: 'エネルギー', en: 'ENERGY', color: '#FF9855', description: 'ミトコンドリアが日々のATP（エネルギー通貨）を十分に作れているか。' },
    mental: { label: '脳のクリアさ', en: 'MENTAL CLARITY', color: '#6CCFF6', description: '脳はATPを最も大量に消費する臓器。ミトコンドリアの状態が思考の冴えに直結。' },
    recovery: { label: '回復力', en: 'RECOVERY', color: '#4AF6C3', description: '細胞修復・抗酸化・免疫の働きはミトコンドリアの予備能力に依存。' },
    flex: { label: '代謝の柔軟性', en: 'METABOLIC FLEXIBILITY', color: '#E8C547', description: '糖と脂質を切り替えて使える能力。鍛えられたミトコンドリアの証。' },
};

// ===== コンポーネント =====
type Profile = { age: string; gender: 'male' | 'female' | 'other' | ''; height: string; weight: string };

export default function CheckPage() {
    const [profile, setProfile] = useState<Profile>({ age: '', gender: '', height: '', weight: '' });
    const [answers, setAnswers] = useState<Record<string, number>>({});
    const [submitted, setSubmitted] = useState(false);

    const setAns = (id: string, v: number) => setAnswers((a) => ({ ...a, [id]: v }));

    const profileReady = profile.age && profile.gender;
    const allAnswered = QUESTIONS.every((q) => answers[q.id]);
    const answeredCount = Object.keys(answers).length;
    const progress = Math.round((answeredCount / QUESTIONS.length) * 100);

    const bmi = useMemo(() => {
        const h = parseFloat(profile.height);
        const w = parseFloat(profile.weight);
        if (h > 0 && w > 0) return (w / Math.pow(h / 100, 2)).toFixed(1);
        return null;
    }, [profile.height, profile.weight]);

    const scores = useMemo(() => {
        const byAxis: Record<Axis, number[]> = { energy: [], mental: [], recovery: [], flex: [] };
        QUESTIONS.forEach((q) => {
            const raw = answers[q.id];
            if (!raw) return;
            // invert: 6-回答 でスコア反転（高得点=活性度高い、で統一）
            const adjusted = q.invert ? 6 - raw : raw;
            byAxis[q.axis].push(adjusted);
        });
        const axisScores: Record<Axis, number> = { energy: 0, mental: 0, recovery: 0, flex: 0 };
        (Object.keys(byAxis) as Axis[]).forEach((k) => {
            const arr = byAxis[k];
            axisScores[k] = arr.length ? Math.round((arr.reduce((a, b) => a + b, 0) / arr.length) * 20) : 0;
        });
        const total = Math.round((axisScores.energy + axisScores.mental + axisScores.recovery + axisScores.flex) / 4);
        // 個別フラグ
        const caffeineFlag = (answers['e2'] || 0) >= 4; // カフェイン依存
        const nightOwlFlag = (answers['m3'] || 0) >= 4; // 夜更かし傾向
        const ageNum = parseFloat(profile.age) || 0;
        const bmiNum = bmi ? parseFloat(bmi) : 0;
        const ageDecade: 'young' | 'mid' | 'mature' | 'senior' =
            ageNum < 35 ? 'young' : ageNum < 50 ? 'mid' : ageNum < 65 ? 'mature' : 'senior';
        const bmiBand: 'low' | 'normal' | 'over' | 'high' | 'unknown' =
            bmiNum === 0 ? 'unknown' : bmiNum < 18.5 ? 'low' : bmiNum < 25 ? 'normal' : bmiNum < 30 ? 'over' : 'high';
        const profileFlags = { age: ageNum, gender: profile.gender, bmi: bmiNum, ageDecade, bmiBand };
        const archetype = detectArchetype(axisScores, total, { caffeineFlag, nightOwlFlag, ...profileFlags });
        const context = buildContextLine(axisScores, profileFlags);
        return { axisScores, total, archetype, flags: { caffeineFlag, nightOwlFlag, ...profileFlags }, context };
    }, [answers, profile, bmi]);

    const submit = () => {
        if (!allAnswered) return;
        setSubmitted(true);
    };
    const reset = () => {
        setAnswers({});
        setSubmitted(false);
        if (typeof window !== 'undefined') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    if (submitted) return <Result scores={scores} onReset={reset} />;

    return (
        <div className="pt-28 pb-24 px-4 md:px-6 relative overflow-hidden" style={{ background: '#B2EBF2' }}>
            {/* Decorative illustrations */}
            <img loading="lazy" decoding="async" src="/images/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90"
                style={{ top: '0', right: '-60px', width: '360px', transform: 'scaleY(-1)' }} />
            <img loading="lazy" decoding="async" src="/images/experience_vitality_new.png" alt="" className="absolute pointer-events-none opacity-85 hidden md:block"
                style={{ bottom: '60px', left: '-60px', width: '280px', transform: 'rotate(-8deg)' }} />
            <img loading="lazy" decoding="async" src="/images/about-illustration-bg.png" alt="" className="absolute pointer-events-none opacity-90"
                style={{ bottom: '-80px', right: '-100px', width: '480px' }} />
            <div className="max-w-[760px] mx-auto relative" style={{ zIndex: 1 }}>
                {/* Hero */}
                <div className="mb-8">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>
                        MITOCHONDRIA SELF-CHECK
                    </p>
                    <h1 className="text-4xl md:text-6xl font-bold mb-5 leading-[1.15]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        あなたの<br />
                        <span style={{ color: '#FF9855' }}>ミトコンドリア</span>、<br />
                        元気ですか？
                    </h1>

                    {/* ミトコンドリアとは */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 md:p-6 mb-6 border border-[#1A1A1A]/10">
                        <p className="text-sm text-[#1A1A1A] leading-relaxed mb-3">
                            <strong>ミトコンドリアとは</strong>、私たちの細胞ひとつひとつに住む <strong>「エネルギーの発電所」</strong>。
                            食べたものと吸った酸素から、生きるためのエネルギー（ATP）を作り出しています。<br />
                            元気がない・疲れやすい・頭がモヤモヤする…そんなサインは、ミトコンドリアが消耗しているシグナルかもしれません。
                        </p>
                        <p className="text-sm text-[#4A4A4A] leading-relaxed pt-3 border-t border-[#1A1A1A]/10">
                            12問・約2分で、あなたのミトコンドリア活性度を 4つの軸（エネルギー / 脳のクリアさ / 回復力 / 代謝の柔軟性）から可視化します。
                            無料・登録不要・即時結果。
                        </p>
                    </div>
                </div>

                {/* Profile */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 md:p-6 mb-6 border border-[#1A1A1A]/10">
                    <p className="text-xs font-bold tracking-wider mb-3" style={{ color: '#FF9855', fontFamily: "'Space Grotesk', sans-serif" }}>
                        ABOUT YOU ／ あなたについて
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div>
                            <label className="block text-xs font-bold mb-1.5 text-[#1A1A1A]">年齢 <span className="text-[#E54848]">*</span></label>
                            <input type="number" value={profile.age} onChange={(e) => setProfile({ ...profile, age: e.target.value })} placeholder="45"
                                className="w-full px-3 py-2 border border-[#D5D5D5] rounded-lg text-sm focus:outline-none focus:border-[#FF9855] bg-white" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold mb-1.5 text-[#1A1A1A]">性別 <span className="text-[#E54848]">*</span></label>
                            <div className="flex gap-1">
                                {[{ k: 'male', l: '男' }, { k: 'female', l: '女' }, { k: 'other', l: '他' }].map((g) => (
                                    <button key={g.k} type="button" onClick={() => setProfile({ ...profile, gender: g.k as Profile['gender'] })}
                                        className={`flex-1 py-2 rounded-lg text-xs font-bold border transition ${profile.gender === g.k ? 'bg-[#FF9855] text-white border-[#FF9855]' : 'bg-white text-[#1A1A1A] border-[#D5D5D5]'}`}>
                                        {g.l}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold mb-1.5 text-[#1A1A1A]/70">身長 <span className="text-[#999] font-normal">cm</span></label>
                            <input type="number" value={profile.height} onChange={(e) => setProfile({ ...profile, height: e.target.value })} placeholder="170"
                                className="w-full px-3 py-2 border border-[#D5D5D5] rounded-lg text-sm focus:outline-none focus:border-[#FF9855] bg-white" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold mb-1.5 text-[#1A1A1A]/70">体重 <span className="text-[#999] font-normal">kg</span></label>
                            <input type="number" value={profile.weight} onChange={(e) => setProfile({ ...profile, weight: e.target.value })} placeholder="60"
                                className="w-full px-3 py-2 border border-[#D5D5D5] rounded-lg text-sm focus:outline-none focus:border-[#FF9855] bg-white" />
                        </div>
                    </div>
                    {bmi && (
                        <p className="text-xs text-[#4A4A4A] mt-3">
                            BMI: <strong style={{ color: '#FF9855' }}>{bmi}</strong>
                            <span className="ml-2 text-[#999]">（目安 18.5-24.9 で標準範囲）</span>
                        </p>
                    )}
                </div>

                {/* Progress */}
                <div className="mb-6 sticky top-20 z-10 py-2" style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(4px)', borderRadius: 12, padding: '8px 14px' }}>
                    <div className="flex justify-between text-xs text-[#4A4A4A] mb-1.5">
                        <span style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{answeredCount} / {QUESTIONS.length}</span>
                        <span style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{progress}%</span>
                    </div>
                    <div className="h-1.5 bg-[#EEE] rounded-full overflow-hidden">
                        <div className="h-full bg-[#FF9855] transition-all" style={{ width: `${progress}%` }} />
                    </div>
                </div>

                {/* Questions */}
                <div className="space-y-4">
                    {QUESTIONS.map((q, i) => (
                        <QuestionCard key={q.id} q={q} index={i} value={answers[q.id]} onChange={(v) => setAns(q.id, v)} bgColor={CARD_COLORS[i % CARD_COLORS.length]} />
                    ))}
                </div>

                {/* Submit */}
                <div className="mt-10 text-center">
                    <button type="button" disabled={!allAnswered || !profileReady} onClick={submit}
                        className="px-10 py-4 rounded-full text-base font-bold text-white bg-[#FF9855] hover:opacity-90 transition disabled:opacity-30 disabled:cursor-not-allowed"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        結果を見る →
                    </button>
                    {!profileReady && (
                        <p className="text-xs text-[#E54848] mt-3">年齢・性別の入力が必要です</p>
                    )}
                    {profileReady && !allAnswered && (
                        <p className="text-xs text-[#4A4A4A] mt-3">残り {QUESTIONS.length - answeredCount} 問</p>
                    )}
                    <p className="text-[11px] text-[#4A4A4A] mt-5 max-w-[520px] mx-auto leading-relaxed px-4">
                        ※ 回答内容は匿名でサービス改善・統計目的にのみ記録されます。氏名・連絡先など個人を特定する情報は保存されません。詳しくは <a href="/privacy" className="underline">プライバシーポリシー</a> をご覧ください。
                    </p>
                </div>
            </div>
        </div>
    );
}

const CARD_COLORS = ['#FFE3D0', '#D5F5EC', '#D9EFFB', '#FFF1B8', '#F4DCEF', '#FFD9D9'];

function QuestionCard({ q, index, value, onChange, bgColor }: { q: Question; index: number; value?: number; onChange: (v: number) => void; bgColor: string }) {
    return (
        <div className="p-5 rounded-2xl border border-[#1A1A1A]" style={{ background: bgColor }}>
            <div className="flex items-start gap-3 mb-4">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#1A1A1A] text-white text-xs font-bold flex items-center justify-center" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {String(index + 1).padStart(2, '0')}
                </span>
                <p className="text-sm md:text-base font-medium text-[#1A1A1A] flex-1 leading-relaxed">{q.text}</p>
            </div>
            <div>
                <div className="flex justify-between text-[10px] text-[#4A4A4A] mb-2 px-1">
                    <span>{q.labelLow}</span>
                    <span>{q.labelHigh}</span>
                </div>
                <div className="flex gap-1.5 md:gap-2">
                    {[1, 2, 3, 4, 5].map((n) => (
                        <button key={n} type="button" onClick={() => onChange(n)}
                            className={`flex-1 py-3 rounded-lg border text-sm font-bold transition ${value === n ? 'bg-[#FF9855] text-white border-[#FF9855]' : 'bg-white text-[#1A1A1A] border-[#D5D5D5] hover:border-[#FF9855]'}`}
                            style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            {n}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

// ===== Archetype =====
export type Archetype = {
    id: string;
    emoji: string;
    name: string;
    en: string;
    catch: string;
    description: string;
    color: string;
    actions: string[];
};

export const ARCHETYPES: Record<string, Archetype> = {
    // === Group A: 高エネルギー型 ===
    peak: {
        id: 'peak', emoji: '🌅', name: '絶好調ピーク', en: 'PEAK STATE',
        catch: 'このまま行こう。ただし油断は禁物。',
        description: '4軸すべてが高水準。ミトコンドリアが活発に機能している印象です。今の生活パターンが当たっているサイン。',
        color: '#4AF6C3',
        actions: ['今のリズムを「再現可能な形」で言語化', '3ヶ月後に再チェックして変化を早期察知', '余力があるうちに精密検査で先回り'],
    },
    sprinter: {
        id: 'sprinter', emoji: '🚀', name: '全力疾走型', en: 'SPRINTER',
        catch: 'エネルギーは出るが、燃料切替が追いつかない。',
        description: 'エネルギー出力は高い一方、代謝の柔軟性に余白あり。糖中心の燃焼で短距離型な印象。脂質代謝の経路を開けば持久力も上がる可能性。',
        color: '#FFB37B',
        actions: ['良質な脂質（オリーブ油・魚・ナッツ）を増やす', '朝食を少し遅らせて空腹時間を作る', '空腹状態での散歩で脂質燃焼を促す'],
    },
    overdrive: {
        id: 'overdrive', emoji: '🔥', name: 'アクセル踏みっぱなし', en: 'OVERDRIVE',
        catch: '元気そうに見えて、燃え尽き予備軍。',
        description: 'エネルギーは出るが、回復と燃料切替が追いついていないパターン。火力で押し切っているけど裏でミトコンドリアが消耗している可能性。',
        color: '#FF9855',
        actions: ['週1日「全休日」を作る', 'カフェインは1日2杯まで＆15時以降ゼロ', 'マグネシウム・B群サプリで回復経路を支える'],
    },
    // === Group B: 知性型 ===
    sparkle: {
        id: 'sparkle', emoji: '💡', name: 'ひらめき型', en: 'SPARKLE MIND',
        catch: '脳が冴えてエネルギーも回ってる。',
        description: '脳のクリアさが高く、エネルギーと回復もある程度キープできている型。思考が活発に動いているけど消耗バランスは取れているサイン。',
        color: '#6CCFF6',
        actions: ['アウトプットの時間と入力の時間を分ける', '日中の散歩で頭をリセット', '夕方以降は強い刺激を控える'],
    },
    overheat: {
        id: 'overheat', emoji: '🧠', name: '思考オーバーヒート', en: 'OVERHEAT',
        catch: '頭は冴えてるけど、休まらない。',
        description: '脳のクリアさは高いのに、回復が追いついていない型。思考が止まらず、夜も頭が動き続けている可能性。',
        color: '#FFB37B',
        actions: ['就寝1時間前にスクリーンを切る', '日中に「何もしない15分」を入れる', 'L-テアニン・グリシン等で副交感に切り替え'],
    },
    night_creator: {
        id: 'night_creator', emoji: '🌙', name: '夜更かしクリエイター', en: 'NIGHT CREATOR',
        catch: '夜に冴える、朝に弱い。',
        description: '夜遅くに頭が冴え、朝はだるい型。創造的だが、ミトコンドリアの概日リズムが後ろにずれている可能性。サーカディアン整備で出力が伸びる余地大。',
        color: '#E5D0E3',
        actions: ['朝の太陽光を10分浴びる', '夜のブルーライトを22時以降カット', '夕食を就寝3時間前までに'],
    },
    // === Group C: 回復力型 ===
    recovered: {
        id: 'recovered', emoji: '🛌', name: '完全回復型', en: 'FULLY RECOVERED',
        catch: '睡眠と修復で日々リセット。',
        description: '回復力が際立って高い型。睡眠と修復で日々リフレッシュできていて、ベース体力が整っている。攻めの活動量を増やせば実力が一段上がる可能性。',
        color: '#4AF6C3',
        actions: ['筋トレを週2回追加', 'タンパク質量を体重×1.2g/日に', '新しいチャレンジで「適度な負荷」を入れる'],
    },
    endurance: {
        id: 'endurance', emoji: '🚂', name: '持久ランナー', en: 'ENDURANCE',
        catch: '派手さはないが、長距離型。',
        description: '回復力と代謝の柔軟性が高く、消耗しにくい安定型。糖と脂質の両方を効率よく使えていて、急なストレスにも崩れにくい体質。',
        color: '#4AF6C3',
        actions: ['週2-3回の筋トレで出力上限を上げる', 'タンパク質を朝に20g以上', 'HIITで燃焼能力をさらに鍛える'],
    },
    self_healing: {
        id: 'self_healing', emoji: '🌱', name: '自然治癒型', en: 'SELF HEALING',
        catch: '修復力は強いけど、活発さに欠ける。',
        description: '回復だけ突出して高く、エネルギーや脳のクリアさは控えめな型。「休んでいる時間が長い」状態が予測される。少しずつ出力を増やしてみる余地あり。',
        color: '#B2EBF2',
        actions: ['朝の運動を5分から始める', '日中の人との接点を意識的に増やす', '達成感のある小さなタスクを毎日1つ'],
    },
    // === Group D: 代謝柔軟型 ===
    all_fuel: {
        id: 'all_fuel', emoji: '🔄', name: '万能燃焼型', en: 'ALL-FUEL BURNER',
        catch: '糖でも脂質でも、何でも燃やせる。',
        description: '代謝の柔軟性が高く、エネルギーも回っている型。糖・脂質・ケトン体まで使い分けられるミトコンドリア最適化の理想形に近い。',
        color: '#4AF6C3',
        actions: ['週1-2回の16時間断食でさらに柔軟性UP', 'HIITとロング有酸素を組み合わせる', '冷水浴・サウナで代謝の幅を広げる'],
    },
    silent_metabolism: {
        id: 'silent_metabolism', emoji: '⚙️', name: '静かな代謝', en: 'SILENT METABOLISM',
        catch: '燃料は切り替わるけど、絶対量が足りない。',
        description: '代謝の柔軟性は高いのに、出力エネルギーは弱い型。少食・粗食で体は適応しているが、燃料の絶対量が少ない可能性。',
        color: '#B2EBF2',
        actions: ['食事量（特にタンパク質と脂質）を1.2倍に', '朝の太陽光浴 + 軽い運動で起動', 'B群・コエンザイムQ10で発電効率UP'],
    },
    fasting_master: {
        id: 'fasting_master', emoji: '🌾', name: 'ファスティング適性', en: 'FASTING ADAPTED',
        catch: '空腹に強く、回復も早い。',
        description: '代謝の柔軟性と回復力が高い型。空腹時にも脳と体が動き、修復もスムーズ。長寿系遺伝子（サーチュイン）が活発な可能性。',
        color: '#4AF6C3',
        actions: ['週1-2回 16-18時間の間欠的断食を試す', 'ポリフェノール食材（ベリー・緑茶・カカオ）追加', 'ストレス管理で長期維持を意識'],
    },
    // === Group E: バランス型 ===
    balanced: {
        id: 'balanced', emoji: '⚖️', name: '均整型', en: 'BALANCED',
        catch: '突出も欠落もない、安定基礎型。',
        description: '4軸どれも中〜高位で偏差が小さい安定型。日常を着実にこなしている印象。ここから一段伸ばすなら「強みを伸ばす」「弱みを潰す」のどちらかが効果的。',
        color: '#E8C547',
        actions: ['一番高い軸を「強み」として深掘り', '一番低い軸を30日チャレンジで底上げ', '血液検査で隠れたボトルネック発見'],
    },
    sleeping_gem: {
        id: 'sleeping_gem', emoji: '💎', name: '眠れる宝石', en: 'SLEEPING GEM',
        catch: '実力はあるけど、磨き不足。',
        description: '中位で安定している型。基礎は整っているけれど、ピンポイントで底上げすれば一気に化ける可能性。何を伸ばすかで未来が変わる。',
        color: '#E8C547',
        actions: ['弱い軸を30日チャレンジで集中ケア', '血液検査で隠れたボトルネック可視化', '3ヶ月後再チェックで変化を実感'],
    },
    feather_steady: {
        id: 'feather_steady', emoji: '🪶', name: '軽やかな安定', en: 'FEATHER STEADY',
        catch: '無理せず長く続けられるリズム。',
        description: '4軸が中の上で揃ったしなやかな型。派手な高揚はないが、消耗も少なく持続可能なリズム。長期戦に向く体質。',
        color: '#B2EBF2',
        actions: ['今のリズムを記録して再現性を高める', '「楽しい」と思える運動を週3', '自分の良い変化を月1回振り返る'],
    },
    // === Group F: 省エネ型 ===
    conservation: {
        id: 'conservation', emoji: '🧊', name: '省エネモード', en: 'CONSERVATION',
        catch: '不調はないけど、火力を絞ってる。',
        description: '全体的に中の下で、活動量も控えめな型。大きな不調は出ていないが、ミトコンドリアが省エネ運転で日常をこなしている可能性。',
        color: '#E5D0E3',
        actions: ['朝の光 + 10分散歩でスイッチを入れる', '食事を3食しっかり（朝抜きをやめる）', 'サウナ・冷水浴で代謝を刺激'],
    },
    minimalist: {
        id: 'minimalist', emoji: '🍃', name: 'ミニマリスト型', en: 'MINIMALIST',
        catch: '少ない出力で生き抜く適応戦略。',
        description: 'エネルギーも脳のクリアさも控えめだが、回復力はあるので大きく崩れない型。「足りないものに気づきにくい」状態の可能性。',
        color: '#E5D0E3',
        actions: ['朝のタンパク質を1品増やす', '日中に体を温める時間を作る', '小さな運動から再起動'],
    },
    hermit: {
        id: 'hermit', emoji: '🏔', name: '仙人モード', en: 'HERMIT MODE',
        catch: '少食・静謐で整っている。',
        description: 'エネルギー量は控えめだが、代謝の柔軟性が高く独自のバランスで整っている型。少食・粗食でも崩れない適応力あり。ただし、もう一段の活力を求めるなら出力上げの余地。',
        color: '#B2EBF2',
        actions: ['週1回の高負荷運動でミトコンドリア新生を刺激', '朝1品タンパク質を意識して追加', '日光を浴びる時間を倍に'],
    },
    // === Group G: 警告型 ===
    silent_warning: {
        id: 'silent_warning', emoji: '🌫️', name: '沈黙の警告', en: 'SILENT WARNING',
        catch: '不調を「感じなくなっている」可能性。',
        description: '4軸すべてが低水準。気になることが特に無くても、低空飛行に体が慣れてしまっている状態が予測される。',
        color: '#FF9855',
        actions: ['まず睡眠時間を1時間延ばす', 'コーヒー・甘い物を3日だけやめてみる', '血液検査で隠れた不足を確認'],
    },
    storm_brewing: {
        id: 'storm_brewing', emoji: '⛈', name: '嵐の前', en: 'STORM BREWING',
        catch: '回復が追いつかず、火種がくすぶる。',
        description: 'エネルギーも回復力も低下している型。まだ大きな不調は出ていないが、放置すれば本格的な不調に移行する可能性。早めの介入が効く。',
        color: '#FF9855',
        actions: ['睡眠時間と質を最優先で改善', '糖質・カフェインの依存度を確認', 'ストレス源を1つ手放す決断'],
    },
    low_battery: {
        id: 'low_battery', emoji: '🚧', name: '充電不足型', en: 'LOW BATTERY',
        catch: '燃料切替できても、充電が足りない。',
        description: 'エネルギーと回復が低く、ぎりぎりで回している印象。「充電を待つ時間」が足りていない可能性。まずは入力（食・睡眠）を増やすこと。',
        color: '#FFB37B',
        actions: ['食事量を増やす（特にタンパク質）', '21時以降はスマホを置く', '週末に「予定なしの1日」を作る'],
    },
    // === Group H: 特殊パターン ===
    caffeine_runner: {
        id: 'caffeine_runner', emoji: '☕', name: 'カフェイン頼み', en: 'CAFFEINE RUNNER',
        catch: 'コーヒーで動いてる、燃料じゃない。',
        description: 'カフェインで頭と体を起動している型。実際のミトコンドリアの出力は表向きの活発さほどではない可能性。離脱期間で本当のベースラインが見える。',
        color: '#FFB37B',
        actions: ['3日間のカフェインフリーで素の体調を観察', '朝食にタンパク質20gでドーパミン生成を補強', '15時以降のカフェインを完全カット'],
    },
    stoic_exhaust: {
        id: 'stoic_exhaust', emoji: '🪨', name: 'ストイック疲労', en: 'STOIC FATIGUE',
        catch: '頑張り続けて、限界がもうすぐ。',
        description: 'エネルギーも知性も高く出力できているが、回復が著しく低く、カフェイン依存もある型。意思の力で持たせている可能性が高く、ここからの崩れが急。',
        color: '#FF9855',
        actions: ['今すぐ「全部やめる日」を1日入れる', 'ステップを下げる勇気を持つ', '回復に投資（睡眠・サウナ・整体）'],
    },
    night_owl: {
        id: 'night_owl', emoji: '🌗', name: '朝弱・夜強', en: 'NIGHT OWL',
        catch: '夜は冴える、朝は重い。',
        description: '朝が動かず、夜遅くまで頭が冴えている型。サーカディアンリズムが後ろにずれている可能性。朝の光・夕食タイミングの整備で大きく変わる。',
        color: '#E5D0E3',
        actions: ['起床30分以内に外光を浴びる', '夕食を就寝3時間前までに完了', '寝室を暗く涼しく整える'],
    },
};

export type ProfileFlags = {
    age: number;
    gender: 'male' | 'female' | 'other' | '';
    bmi: number;
    ageDecade: 'young' | 'mid' | 'mature' | 'senior';
    bmiBand: 'low' | 'normal' | 'over' | 'high' | 'unknown';
};

function buildContextLine(s: Record<Axis, number>, p: ProfileFlags): string {
    const parts: string[] = [];
    // 年代 × ベースライン
    if (p.ageDecade === 'young' && s.energy <= 50) parts.push('20-30代でエネルギー50以下は早めの対策が効きます。');
    if (p.ageDecade === 'mature' && s.energy >= 70) parts.push('40-50代でこの活性度は同世代比で上位レベル。');
    if (p.ageDecade === 'senior' && s.recovery >= 70) parts.push('60代以上で回復力70超は希少な高水準。');
    if (p.ageDecade === 'mature' && p.bmiBand === 'low' && s.energy <= 50) parts.push('40代以降の低BMI×低エネルギーは栄養不足の可能性。');

    // BMI による補足
    if (p.bmiBand === 'low' && s.energy <= 55) parts.push('BMIが標準を下回り、エネルギー出力も低めなので「燃料不足」が予測されます。');
    if (p.bmiBand === 'high' && s.flex <= 55) parts.push('BMIが高めで代謝柔軟性も低い組み合わせは、糖質代謝の見直しが効きます。');
    if (p.bmiBand === 'over' && s.flex <= 55) parts.push('BMIやや高め＋代謝柔軟性低めは、断食やHIITで改善余地あり。');

    // 性別ベースライン
    if (p.gender === 'female' && s.recovery <= 50) parts.push('女性で回復力50以下の場合、鉄欠乏（フェリチン低値）の可能性を確認したい所見です。');

    return parts.length > 0 ? parts.join(' ') : '';
}

function EmailResultCard({ archetypeName, archetypeCatch, total, axisScores, personalAnalysis, personalActions }: {
    archetypeName: string; archetypeCatch: string; total: number; axisScores: Record<Axis, number>;
    personalAnalysis?: string; personalActions?: string[];
}) {
    const [email, setEmail] = useState('');
    const [newsletter, setNewsletter] = useState(false);
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [error, setError] = useState<string | null>(null);

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        setStatus('loading');
        setError(null);
        try {
            const res = await fetch('/api/check/email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email, newsletter,
                    archetypeName, archetypeCatch, total, axisScores,
                    personalAnalysis, personalActions,
                }),
            });
            if (!res.ok) throw new Error('failed');
            setStatus('success');
        } catch {
            setStatus('error');
            setError('送信に失敗しました。時間を置いて再度お試しください。');
        }
    };

    if (status === 'success') {
        return (
            <div className="bg-white border border-[#1A1A1A] rounded-2xl p-6 mb-6 text-center">
                <div className="text-2xl mb-2">✓</div>
                <p className="text-sm font-bold text-[#1A1A1A] mb-1">結果をメールでお送りしました</p>
                <p className="text-xs text-[#4A4A4A]">届かない場合は迷惑メールフォルダもご確認ください。</p>
            </div>
        );
    }

    return (
        <form onSubmit={submit} className="border-2 border-[#FF9855] rounded-2xl p-6 mb-6" style={{ background: '#FFF1DF' }}>
            <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>
                EMAIL · 結果をメールで受け取る
            </p>
            <h3 className="text-2xl md:text-3xl font-bold mb-3 leading-snug text-[#1A1A1A]">
                あとから<br />じっくり読み返したい方へ
            </h3>
            <p className="text-xs text-[#4A4A4A] leading-relaxed mb-4">
                Archetypeとスコア、AI解析、3つのアクションをメールでお届けします。
            </p>

            <div className="space-y-3">
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com"
                    className="w-full px-4 py-2.5 rounded-lg border border-[#D5D5D5] focus:outline-none focus:border-[#FF9855] text-sm" />

                <label className="flex items-start gap-2 cursor-pointer text-xs text-[#1A1A1A] leading-relaxed">
                    <input type="checkbox" checked={newsletter} onChange={(e) => setNewsletter(e.target.checked)}
                        className="mt-0.5 w-4 h-4 accent-[#FF9855] flex-shrink-0" />
                    <span>
                        <strong>SAL Letter（不定期ニュースレター）も登録する</strong>
                        <span className="block text-[11px] text-[#4A4A4A]">40代からの健康実践・AI・クリエイティブを横断するレター。いつでも解除可。</span>
                    </span>
                </label>

                {error && <p className="text-xs text-[#E54848]">{error}</p>}

                <button type="submit" disabled={status === 'loading' || !email}
                    className="w-full py-3 rounded-full text-sm font-bold hover:opacity-90 transition disabled:opacity-40"
                    style={{ fontFamily: "'Space Grotesk', sans-serif", background: '#1A1A1A', color: '#FFFFFF' }}>
                    {status === 'loading' ? '送信中...' : '結果をメールで受け取る →'}
                </button>
                <p className="text-[11px] text-[#4A4A4A] leading-relaxed">
                    ※ メールアドレスは結果送信目的のみで使用します（チェックボックスを付けた場合のみニュースレターにも使用）。
                </p>
            </div>
        </form>
    );
}

function detectArchetype(s: Record<Axis, number>, total: number, flags: { caffeineFlag: boolean; nightOwlFlag: boolean } & ProfileFlags): Archetype {
    const { energy: E, mental: M, recovery: R, flex: F } = s;

    // ===== 特殊パターン (優先度高) =====
    // ストイック疲労 (E高 + M高 + R低 + caffeine flag)
    if (flags.caffeineFlag && E >= 60 && M >= 60 && R <= 45) return ARCHETYPES.stoic_exhaust;
    // 朝弱・夜強 (nightOwlFlag + E低)
    if (flags.nightOwlFlag && E <= 50) return ARCHETYPES.night_owl;
    // カフェイン頼み (caffeineFlag + 全体的に虚像感)
    if (flags.caffeineFlag && E >= 55 && total <= 65) return ARCHETYPES.caffeine_runner;

    // ===== 警告型 =====
    if (E <= 40 && M <= 40 && R <= 40 && F <= 40) return ARCHETYPES.silent_warning;
    if (E <= 45 && R <= 45 && total <= 50) return ARCHETYPES.storm_brewing;
    if (E <= 50 && R <= 50 && F >= 50) return ARCHETYPES.low_battery;

    // ===== ピーク・全力疾走系 =====
    if (E >= 75 && M >= 75 && R >= 75 && F >= 75) return ARCHETYPES.peak;
    if (E >= 70 && R <= 50 && F <= 55) return ARCHETYPES.overdrive;
    if (E >= 70 && F <= 55 && R >= 55) return ARCHETYPES.sprinter;

    // ===== 知性型 =====
    if (M >= 70 && R <= 50) return ARCHETYPES.overheat;
    if (M >= 70 && flags.nightOwlFlag) return ARCHETYPES.night_creator;
    if (M >= 70 && E >= 60 && R >= 55) return ARCHETYPES.sparkle;

    // ===== 代謝柔軟系 =====
    if (F >= 70 && R >= 70 && E >= 55) return ARCHETYPES.fasting_master;
    if (F >= 70 && E >= 60 && M >= 55) return ARCHETYPES.all_fuel;
    if (F >= 65 && E <= 50) return ARCHETYPES.silent_metabolism;
    if (F >= 65 && E <= 55 && M <= 55) return ARCHETYPES.hermit;

    // ===== 回復力型 =====
    if (R >= 75 && M >= 60) return ARCHETYPES.recovered;
    if (R >= 70 && F >= 70) return ARCHETYPES.endurance;
    if (R >= 70 && E <= 50 && M <= 55) return ARCHETYPES.self_healing;

    // ===== 省エネ型 =====
    if (total <= 55 && E <= 55 && R >= 50) return ARCHETYPES.minimalist;
    if (total <= 55 && E <= 55) return ARCHETYPES.conservation;

    // ===== バランス型 (default tier) =====
    const max = Math.max(E, M, R, F);
    const min = Math.min(E, M, R, F);
    const range = max - min;
    if (range <= 12 && total >= 60) return ARCHETYPES.feather_steady;
    if (range <= 15 && total >= 55) return ARCHETYPES.balanced;
    return ARCHETYPES.sleeping_gem;
}

// ===== Result =====
export function Result({ scores, onReset }: { scores: { axisScores: Record<Axis, number>; total: number; archetype: Archetype; flags: { caffeineFlag: boolean; nightOwlFlag: boolean } & ProfileFlags; context: string }; onReset: () => void }) {
    const { axisScores, total, archetype, flags, context } = scores;
    const profileChip = [
        flags.age ? `${flags.age}歳` : null,
        flags.gender === 'male' ? '男性' : flags.gender === 'female' ? '女性' : flags.gender === 'other' ? 'その他' : null,
        flags.bmi ? `BMI ${flags.bmi.toFixed(1)}` : null,
    ].filter(Boolean).join(' · ');

    // AI解析（任意・失敗時はテンプレで継続）
    type AiResult = { personal_analysis: string; personal_actions: string[]; next_question: string };
    const [ai, setAi] = useState<AiResult | null>(null);
    const [aiState, setAiState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    // 結果表示時は必ずページ最上部から見せる
    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.scrollTo({ top: 0, behavior: 'auto' });
        }
    }, []);

    useEffect(() => {
        let cancelled = false;
        const run = async () => {
            setAiState('loading');
            try {
                const res = await fetch('/api/check', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        profile: { age: flags.age, gender: flags.gender, bmi: flags.bmi },
                        axisScores, total,
                        archetypeName: archetype.name,
                        archetypeCatch: archetype.catch,
                        flags: { caffeineFlag: flags.caffeineFlag, nightOwlFlag: flags.nightOwlFlag },
                    }),
                });
                if (!res.ok) throw new Error('failed');
                const json = await res.json();
                if (!cancelled && json.ok) {
                    setAi(json.data);
                    setAiState('success');
                } else if (!cancelled) setAiState('error');
            } catch {
                if (!cancelled) setAiState('error');
            }
        };
        run();
        return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // 弱い軸 / 強い軸
    const sortedAxes = (['energy', 'mental', 'recovery', 'flex'] as Axis[]).sort((a, b) => axisScores[a] - axisScores[b]);
    const weakest = sortedAxes[0];
    const strongest = sortedAxes[3];

    // レーダーチャート用：4軸を正方形配置（top=energy, right=mental, bottom=recovery, left=flex）
    const axesForRadar: { axis: Axis; angle: number }[] = [
        { axis: 'energy', angle: -90 },
        { axis: 'mental', angle: 0 },
        { axis: 'recovery', angle: 90 },
        { axis: 'flex', angle: 180 },
    ];
    const radius = 80;
    const points = axesForRadar.map(({ axis, angle }) => {
        const r = (axisScores[axis] / 100) * radius;
        const rad = (angle * Math.PI) / 180;
        const x = 100 + r * Math.cos(rad);
        const y = 100 + r * Math.sin(rad);
        return `${x},${y}`;
    }).join(' ');

    return (
        <div className="pt-28 pb-24 px-4 md:px-6 relative overflow-hidden" style={{ background: '#B2EBF2' }}>
            <img loading="lazy" decoding="async" src="/images/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90"
                style={{ top: '0', right: '-60px', width: '360px', transform: 'scaleY(-1)' }} />
            <img loading="lazy" decoding="async" src="/images/experience_vitality_new.png" alt="" className="absolute pointer-events-none opacity-85 hidden md:block"
                style={{ bottom: '60px', left: '-60px', width: '280px', transform: 'rotate(-8deg)' }} />
            <img loading="lazy" decoding="async" src="/images/about-illustration-bg.png" alt="" className="absolute pointer-events-none opacity-90"
                style={{ bottom: '-80px', right: '-100px', width: '480px' }} />
            <div className="max-w-[760px] mx-auto relative" style={{ zIndex: 1 }}>
                {/* Header */}
                <div className="mb-8 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>
                        YOUR RESULT
                    </p>
                    <h1 className="text-2xl md:text-3xl font-bold mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        ミトコンドリア活性度
                    </h1>
                    <p className="text-xs text-[#4A4A4A] max-w-[480px] mx-auto leading-relaxed">
                        ※ この結果は12問の自覚症状から読み取れる<strong>「可能性レベルの仮説」</strong>です。確定ではなく、断定でもありません。
                    </p>
                </div>

                {/* Archetype Card */}
                <div className="bg-white rounded-2xl border-2 border-[#1A1A1A] p-6 md:p-10 mb-8 text-center" style={{ background: archetype.color + '20' }}>
                    {profileChip && (
                        <div className="inline-block text-[10px] tracking-wider font-bold px-3 py-1 mb-3 rounded-full bg-white border border-[#1A1A1A]/20"
                            style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#1A1A1A' }}>
                            {profileChip}
                        </div>
                    )}
                    <div className="text-xs tracking-widest font-bold mb-3 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        YOUR TYPE
                    </div>
                    <div className="text-5xl md:text-6xl mb-3">{archetype.emoji}</div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        {archetype.name}
                    </h2>
                    <p className="text-[10px] tracking-widest font-bold mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#4A4A4A' }}>
                        {archetype.en}
                    </p>
                    <p className="text-sm md:text-base font-bold text-[#1A1A1A] mb-4">{archetype.catch}</p>
                    <p className="text-sm text-[#1A1A1A] leading-relaxed max-w-[520px] mx-auto text-left md:text-center mb-4">{archetype.description}</p>
                    {context && (
                        <div className="text-sm text-[#1A1A1A] leading-relaxed max-w-[520px] mx-auto text-left p-4 rounded-xl mt-3"
                            style={{ background: 'rgba(255,255,255,0.7)' }}>
                            <span className="text-[10px] font-bold tracking-wider mr-2" style={{ color: '#FF9855', fontFamily: "'Space Grotesk', sans-serif" }}>FOR YOU</span>
                            {context}
                        </div>
                    )}
                    <div className="mt-5 inline-flex items-baseline gap-1">
                        <span className="text-xs text-[#4A4A4A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>TOTAL</span>
                        <span className="text-3xl font-bold ml-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{total}</span>
                        <span className="text-sm text-[#4A4A4A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>/ 100</span>
                    </div>
                </div>

                {/* 4軸スコア */}
                <div className="bg-white rounded-2xl border border-[#E5E5E5] p-6 md:p-8 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                        {/* Radar */}
                        <div>
                            <svg viewBox="-30 -10 260 230" className="w-full max-w-[300px] mx-auto">
                                {/* grid */}
                                {[20, 40, 60, 80].map((r) => (
                                    <polygon key={r}
                                        points={axesForRadar.map(({ angle }) => {
                                            const rad = (angle * Math.PI) / 180;
                                            return `${100 + (r / 100) * radius * Math.cos(rad)},${100 + (r / 100) * radius * Math.sin(rad)}`;
                                        }).join(' ')}
                                        fill="none" stroke="#E5E5E5" strokeWidth="1" />
                                ))}
                                <polygon
                                    points={axesForRadar.map(({ angle }) => `${100 + radius * Math.cos((angle * Math.PI) / 180)},${100 + radius * Math.sin((angle * Math.PI) / 180)}`).join(' ')}
                                    fill="none" stroke="#CCC" strokeWidth="1.5" />
                                {/* axes lines */}
                                {axesForRadar.map(({ angle }, i) => (
                                    <line key={i} x1="100" y1="100"
                                        x2={100 + radius * Math.cos((angle * Math.PI) / 180)}
                                        y2={100 + radius * Math.sin((angle * Math.PI) / 180)}
                                        stroke="#E5E5E5" strokeWidth="1" />
                                ))}
                                {/* data */}
                                <polygon points={points} fill="#FF9855" fillOpacity="0.35" stroke="#FF9855" strokeWidth="2" />
                                {/* labels */}
                                {axesForRadar.map(({ axis, angle }, i) => {
                                    const rad = (angle * Math.PI) / 180;
                                    const lx = 100 + (radius + 18) * Math.cos(rad);
                                    const ly = 100 + (radius + 18) * Math.sin(rad);
                                    return (
                                        <text key={i} x={lx} y={ly} textAnchor="middle" dominantBaseline="middle"
                                            fontFamily="'Space Grotesk', sans-serif" fontSize="9" fontWeight="700">
                                            {AXIS_META[axis].en.split(' ')[0]}
                                        </text>
                                    );
                                })}
                            </svg>
                        </div>
                        {/* Scores list */}
                        <div className="space-y-3">
                            {(['energy', 'mental', 'recovery', 'flex'] as Axis[]).map((a) => (
                                <div key={a}>
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                            {AXIS_META[a].en}
                                            <span className="ml-2 text-[#4A4A4A] font-normal" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>{AXIS_META[a].label}</span>
                                        </span>
                                        <span className="font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{axisScores[a]}</span>
                                    </div>
                                    <div className="h-2 bg-[#F0F0F0] rounded-full overflow-hidden">
                                        <div className="h-full transition-all" style={{ width: `${axisScores[a]}%`, background: AXIS_META[a].color }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 強い軸・弱い軸 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <div className="bg-white p-5 rounded-2xl border border-[#E5E5E5]">
                        <div className="text-xs font-bold tracking-wider mb-2" style={{ color: AXIS_META[strongest].color, fontFamily: "'Space Grotesk', sans-serif" }}>
                            STRONGEST · 強み
                        </div>
                        <div className="text-base font-bold mb-2">{AXIS_META[strongest].label}（{axisScores[strongest]}）</div>
                        <p className="text-xs text-[#4A4A4A] leading-relaxed">{AXIS_META[strongest].description}</p>
                    </div>
                    <div className="bg-white p-5 rounded-2xl border border-[#E5E5E5]">
                        <div className="text-xs font-bold tracking-wider mb-2" style={{ color: '#FF9855', fontFamily: "'Space Grotesk', sans-serif" }}>
                            FOCUS · ケアしたい
                        </div>
                        <div className="text-base font-bold mb-2">{AXIS_META[weakest].label}（{axisScores[weakest]}）</div>
                        <p className="text-xs text-[#4A4A4A] leading-relaxed">{AXIS_META[weakest].description}</p>
                    </div>
                </div>

                {/* AI個別解析 */}
                {aiState === 'loading' && (
                    <div className="bg-white border border-[#1A1A1A] rounded-2xl p-6 mb-8 text-center">
                        <div className="text-xs font-bold tracking-wider mb-2 text-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            AI PERSONAL ANALYSIS
                        </div>
                        <p className="text-sm text-[#4A4A4A]">あなたの回答パターンを読み解いています...</p>
                        <div className="inline-block mt-3 w-6 h-6 border-2 border-[#FF9855] border-t-transparent rounded-full animate-spin" />
                    </div>
                )}
                {ai && (
                    <div className="bg-white border-2 border-[#1A1A1A] rounded-2xl p-6 mb-8">
                        <div className="text-xs font-bold tracking-wider mb-3 text-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            AI PERSONAL ANALYSIS · あなただけの読み取り
                        </div>
                        <p className="text-sm text-[#1A1A1A] leading-relaxed mb-5 whitespace-pre-wrap">{ai.personal_analysis}</p>

                        <div className="bg-[#FFF6E5] border border-[#FF9855] rounded-xl p-4 mb-4">
                            <div className="text-xs font-bold tracking-wider mb-2 text-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                FOR YOU · 3つの一歩
                            </div>
                            <ul className="space-y-2 text-sm text-[#1A1A1A] leading-relaxed">
                                {ai.personal_actions.map((h, i) => (
                                    <li key={i} className="flex gap-2"><span style={{ color: '#FF9855', fontWeight: 700 }}>0{i + 1}.</span><span>{h}</span></li>
                                ))}
                            </ul>
                        </div>

                        <div className="border-l-4 border-[#1A1A1A] pl-4 py-1 text-sm text-[#1A1A1A] italic leading-relaxed">
                            {ai.next_question}
                        </div>
                    </div>
                )}
                {aiState === 'error' && (
                    <div className="bg-[#FFF6E5] border border-[#FF9855] rounded-2xl p-6 mb-8">
                        <div className="text-xs font-bold tracking-wider mb-3 text-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            NEXT ACTIONS · {archetype.name}のための一歩
                        </div>
                        <ul className="space-y-2 text-sm text-[#1A1A1A] leading-relaxed">
                            {archetype.actions.map((h, i) => (
                                <li key={i} className="flex gap-2"><span style={{ color: '#FF9855', fontWeight: 700 }}>0{i + 1}.</span><span>{h}</span></li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Email + Newsletter opt-in */}
                <EmailResultCard
                    archetypeName={archetype.name}
                    archetypeCatch={archetype.catch}
                    total={total}
                    axisScores={axisScores}
                    personalAnalysis={ai?.personal_analysis}
                    personalActions={ai?.personal_actions}
                />

                {/* CTA */}
                <div className="border-2 border-[#1A1A1A] rounded-2xl p-6 md:p-8 text-center mb-6" style={{ background: '#D5F5EC' }}>
                    <p className="text-xs tracking-widest font-bold mb-3 text-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        DEEPER ANALYSIS
                    </p>
                    <h3 className="text-lg md:text-xl font-bold mb-3">
                        血液データの解析で<br />もっと深く読み解きませんか？
                    </h3>
                    <p className="text-sm text-[#4A4A4A] leading-relaxed mb-5 max-w-[480px] mx-auto">
                        このセルフチェックは「自覚症状」の可視化です。Mitoflow40の解析サービスでは、血液検査の客観データとApple Watchなどの生活ログを統合して、より深い仮説を導きます。
                    </p>
                    <Link href="/sample" className="inline-block px-6 py-3 rounded-full text-sm font-bold hover:opacity-90 transition"
                        style={{ fontFamily: "'Space Grotesk', sans-serif", background: '#1A1A1A', color: '#FFFFFF' }}>
                        解析サンプルを見る →
                    </Link>
                </div>


                {/* Reset */}
                <div className="text-center">
                    <button type="button" onClick={onReset} className="text-xs text-[#4A4A4A] underline">
                        もう一度チェックする
                    </button>
                </div>
            </div>
        </div>
    );
}

