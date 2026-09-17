'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

// ── MITOFLOW ／ 歩けミトス（ゆっくり版・縦スクロール・5 コース） ──────────────────
// からだの中をミトスがふわふわ歩いていく。指で左右に動かして、ごはん（良い食べ物）を集める。
// コースは 5 つ。血管 → 胃と腸 → 肝臓 → 脳 → 細胞の中。進むほど速く、トゲトゲが増え、ATP の減りも早い。
// コース 1〜4 はゴールの旗まで。コース 5 の最後でコンドロスに出会い、ミトコンドリアになる。
//   ・ごはん → ATP、あわ → 少し ATP、あまいもの → ぐるぐる（左右が逆）、トゲトゲ → いたっ
//   ・🥩 おおきくなる、🫐 バリア、🌶️ からい、🧊 つめたい、☀️ ぽかぽか、🌙 ねむい、👟 なかま、🪨 たべられない
// 進み具合は端末に保存：mf:climb:unlocked（開いているコース）、mf:climb:best:<id>、mf:climb:done

const W = 390;
const H = 640;
const PLAYER_Y = H * 0.85;   // ミトスの中心。画面の下のほうに置いて、上から来るものを見やすく

type ItemKind = 'food' | 'bubble' | 'sweet' | 'radical' | 'protein' | 'shield' | 'spicy' | 'ice' | 'sun' | 'sleep' | 'buddy' | 'junk';
type Item = { kind: ItemKind; emoji: string; x: number; y: number; r: number; dead?: boolean; drift: number };
type Particle = { x: number; y: number; vx: number; vy: number; life: number; color: string; text?: string };
type Cell = { x: number; y: number; s: number; img: number; rot: number; vr: number; speed: number };

type Course = {
    id: number; name: string; kanji: string; goal: number;
    base: number; ramp: number; cap: number;   // 歩く速さ：はじめ・1 秒あたりの伸び・上限
    drain: number;                             // ATP の減り（毎秒）
    gap: [number, number];                     // 次のものが出るまでの間隔：最小＋ばらつき
    w: { food: number; bubble: number; sweet: number; radical: number; special: number }; // 出る割合
    specials: ItemKind[];                      // このコースに出る「特別なもの」
    dizzy: number; hit: number;                // ぐるぐるの長さ、トゲトゲの痛さ
    bg: [string, string]; wall: string;        // 景色
};

const COURSES: Course[] = [
    { id: 1, name: 'けっかん', kanji: '血管', goal: 600, base: 85, ramp: 0.8, cap: 110, drain: 2.2, gap: [0.75, 0.6],
        w: { food: 64, bubble: 14, sweet: 8, radical: 5, special: 9 }, specials: ['protein', 'shield', 'sun', 'buddy'],
        dizzy: 1.4, hit: 12, bg: ['#FBE3E7', '#EFC1CD'], wall: '#D89AAE' },
    { id: 2, name: 'い と ちょう', kanji: '胃と腸', goal: 800, base: 95, ramp: 1.2, cap: 135, drain: 2.7, gap: [0.68, 0.55],
        w: { food: 58, bubble: 10, sweet: 13, radical: 8, special: 11 }, specials: ['protein', 'shield', 'sun', 'buddy', 'junk', 'junk', 'ice'],
        dizzy: 1.7, hit: 14, bg: ['#FDEBD3', '#F4C9A0'], wall: '#D9A071' },
    { id: 3, name: 'かんぞう', kanji: '肝臓', goal: 1000, base: 105, ramp: 1.5, cap: 155, drain: 3.1, gap: [0.6, 0.5],
        w: { food: 53, bubble: 9, sweet: 14, radical: 12, special: 12 }, specials: ['protein', 'shield', 'sun', 'buddy', 'junk', 'ice', 'spicy', 'spicy'],
        dizzy: 2.0, hit: 16, bg: ['#F8DED2', '#E0A892'], wall: '#B5735F' },
    { id: 4, name: 'のう', kanji: '脳', goal: 1200, base: 115, ramp: 1.8, cap: 175, drain: 3.5, gap: [0.55, 0.45],
        w: { food: 49, bubble: 8, sweet: 16, radical: 15, special: 12 }, specials: ['protein', 'shield', 'sun', 'buddy', 'ice', 'spicy', 'sleep', 'sleep', 'sleep'],
        dizzy: 2.3, hit: 18, bg: ['#ECE6F6', '#C6B8E2'], wall: '#9A86C9' },
    { id: 5, name: 'さいぼうの なか', kanji: '細胞の中', goal: 1500, base: 125, ramp: 2.0, cap: 195, drain: 3.9, gap: [0.5, 0.42],
        w: { food: 46, bubble: 7, sweet: 16, radical: 19, special: 12 }, specials: ['protein', 'shield', 'sun', 'buddy', 'junk', 'ice', 'spicy', 'sleep'],
        dizzy: 2.5, hit: 20, bg: ['#DDF3EC', '#ABDDCD'], wall: '#5FB59F' },
];

/** ?goal=数値 でゴールまでの距離を短くできる（動作確認用） */
const goalM = (def: number) => { try { const q = new URLSearchParams(window.location.search).get('goal'); const n = q ? Number(q) : NaN; return Number.isFinite(n) && n > 0 ? n : def; } catch { return def; } };

const FOOD = ['🥚', '🐟', '🥦', '🍙', '🍅', '🍌', '🥕', '🍠', '🥬', '🍄', '🫘', '🧀', '🍤', '🥜', '🍎', '🌽', '🥑', '🍊', '🥒', '🦑', '🥛'];
const PROTEIN = ['🥩', '🍖', '🍗', '🍳'];   // たんぱく質 → おおきくなる
const SHIELD = ['🫐', '🍇', '🍓'];         // 色のこい くだもの → バリア
const JUNK = ['🪨', '🧦', '🧱'];           // たべられない → ペッ
const SWEET = ['🍩', '🍭', '🍰', '🍫', '🧁', '🥤', '🍬'];
const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];
const emojiFor = (kind: ItemKind): string => {
    switch (kind) {
        case 'food': return pick(FOOD);
        case 'bubble': return '💧';
        case 'sweet': return pick(SWEET);
        case 'protein': return pick(PROTEIN);
        case 'shield': return pick(SHIELD);
        case 'junk': return pick(JUNK);
        case 'spicy': return '🌶️';
        case 'ice': return '🧊';
        case 'sun': return '☀️';
        case 'sleep': return '🌙';
        case 'buddy': return '👟';
        default: return '';
    }
};

type Tip = { text: string; href: string; label: string };
const TIPS: Tip[] = [
    { text: 'たまごや さかなは、ミトスの ごはん。からだの「でんち」をつくる。', href: '/foods', label: 'たべものをみる' },
    { text: 'あまいものを たべすぎると、ぐるぐる。すこしなら だいじょうぶ。', href: '/blood-sugar', label: 'どうして ぐるぐる？' },
    { text: 'トゲトゲは「さびる」のもと。いろのこい やさいが まもってくれる。', href: '/oxidative-stress', label: 'さびるって なに？' },
    { text: 'ミトスは、からだの なかで うごく「でんきの こうじょう」。', href: '/mitochondria', label: 'ミトコンドリアとは' },
    { text: 'はしったり あそんだりすると、ミトスが ふえる。', href: '/exercise', label: 'うんどうと ミトコンドリア' },
    { text: 'おにくや たまごの たんぱくしつは、からだを つくる ざいりょう。', href: '/nutrients/protein', label: 'たんぱくしつって なに？' },
    { text: 'おひさまの ひかりで、からだの なかに ビタミンDが できる。', href: '/sunlight', label: 'おひさまと からだ' },
    { text: 'よく ねむると、ミトスも げんきに なる。', href: '/sleep', label: 'ねむりの はなし' },
    { text: 'たべものじゃ ないものは、ペッ。からだに いれない。', href: '/reduce-toxins', label: 'いれない くふう' },
    { text: 'ほんとうの ミトコンドリアは、さいぼうの なかに いる。けっかんを たびするのは ゲームの なかだけ。', href: '/mitochondria', label: 'ミトコンドリアとは' },
    { text: 'あかい けっきゅうには、ミトコンドリアが ひとつも いない。しろい けっきゅうには いる。', href: '/mitochondria', label: 'ミトコンドリアとは' },
];
/** コースをぬけたときの ひとこと（そのコースの からだの ばしょ） */
const COURSE_TIPS: Record<number, Tip> = {
    1: { text: 'けっかんは、ごはんと くうきを はこぶ みち。ほんとうの ミトコンドリアは、ここを ながれる さいぼうの なかに いる。', href: '/food-journey', label: 'たべてから うごくまで' },
    2: { text: 'い と ちょうは、たべものを こまかくして からだに とりこむ ところ。', href: '/digestion', label: 'しょうか と きゅうしゅう' },
    3: { text: 'かんぞうは、からだの おそうじ こうじょう。いらないものを かたづける。', href: '/organs/liver', label: 'かんぞうの はなし' },
    4: { text: 'のうは、からだで いちばん でんきを つかう。だから ミトスが たくさん いる。', href: '/organs/brain', label: 'のうの はなし' },
};
// 語源はギリシャ語の mitos（糸）＋ chondrion（粒）。1898 年にカール・ベンダが名付けた
const KONDROS_TIP: Tip = { text: 'ミトスは「いと」、コンドロスは「つぶ」という いみ。ふたつ あわせて ミトコンドリア。さいぼうの なかで、からだの でんきを つくる。', href: '/mitochondria', label: 'ミトコンドリアとは' };

export default function MitoClimb() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [phase, setPhase] = useState<'start' | 'playing' | 'over' | 'clear'>('start');
    const [score, setScore] = useState(0);
    const [courseIdx, setCourseIdx] = useState(0);
    const [unlocked, setUnlocked] = useState(1);   // 選べるコース（?course= で一時的に広げられる）
    const [progress, setProgress] = useState(1);   // 実際に進んだところ（⭐ の判定に使う）
    const [done, setDone] = useState(false);
    const [bests, setBests] = useState<Record<number, number>>({});
    const [tip, setTip] = useState<Tip>(TIPS[0]);
    const [shared, setShared] = useState<'idle' | 'done'>('idle');

    const g = useRef({
        running: false, course: 0, t: 0, climb: 0, speed: 90, atp: 100, eaten: 0,
        px: W / 2, targetX: W / 2, dizzy: 0, hurt: 0, shake: 0,
        big: 0, shield: 0, spicy: 0, ice: 0, sun: 0, sleepy: 0, buddy: 0, // 状態のタイマー（秒）
        items: [] as Item[], particles: [] as Particle[], cells: [] as Cell[], spawnIn: 0.6,
        gate: null as { y: number } | null,                          // コース 1〜4 のゴールの旗
        kondros: null as { x: number; y: number } | null, merge: 0, met: false, // コース 5 のゴール
        last: 0, raf: 0,
    });
    const imgs = useRef<{ mito?: HTMLImageElement; kondros?: HTMLImageElement; cells: HTMLImageElement[] }>({ cells: [] });
    const audio = useRef<AudioContext | null>(null);

    const beep = useCallback((f1: number, f2: number, dur: number, type: OscillatorType = 'sine', vol = 0.07) => {
        const ac = audio.current; if (!ac) return;
        const o = ac.createOscillator(); const gn = ac.createGain();
        o.type = type; o.frequency.setValueAtTime(f1, ac.currentTime); o.frequency.exponentialRampToValueAtTime(f2, ac.currentTime + dur);
        gn.gain.setValueAtTime(vol, ac.currentTime); gn.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + dur);
        o.connect(gn).connect(ac.destination); o.start(); o.stop(ac.currentTime + dur);
    }, []);

    useEffect(() => {
        try {
            let u = Math.min(5, Math.max(1, Number(localStorage.getItem('mf:climb:unlocked') || 1)));
            setProgress(u);
            // ?course=3 で そのコースまで開ける（動作確認用。保存はしない）
            const q = Number(new URLSearchParams(window.location.search).get('course') || 0);
            if (q >= 1 && q <= 5) { u = Math.max(u, q); setCourseIdx(q - 1); g.current.course = q - 1; }
            setUnlocked(u);
            setDone(localStorage.getItem('mf:climb:done') === '1');
            const b: Record<number, number> = {};
            for (const c of COURSES) b[c.id] = Number(localStorage.getItem(`mf:climb:best:${c.id}`) || 0);
            setBests(b);
        } catch { /* noop */ }
        const load = (src: string) => new Promise<HTMLImageElement>((res) => { const i = new Image(); i.onload = () => res(i); i.onerror = () => res(i); i.src = src; });
        Promise.all([load('/game/mito.png'), load('/game/kondros.png'), load('/game/cell0.png'), load('/game/cell1.png'), load('/game/cell2.png'), load('/game/cell3.png')]).then(([m, k, ...c]) => { imgs.current = { mito: m, kondros: k, cells: c }; });
    }, []);

    const burst = (x: number, y: number, color: string, n = 10, text?: string) => {
        const s = g.current;
        for (let i = 0; i < n; i++) { const a = Math.random() * Math.PI * 2, sp = 60 + Math.random() * 140; s.particles.push({ x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 40, life: 0.6 + Math.random() * 0.4, color }); }
        if (text) s.particles.push({ x, y: y - 10, vx: 0, vy: -60, life: 1.1, color, text });
    };

    const reset = () => {
        const s = g.current;
        Object.assign(s, { t: 0, climb: 0, speed: 90, atp: 100, eaten: 0, px: W / 2, targetX: W / 2, dizzy: 0, hurt: 0, shake: 0, big: 0, shield: 0, spicy: 0, ice: 0, sun: 0, sleepy: 0, buddy: 0, items: [], particles: [], spawnIn: 0.6, gate: null, kondros: null, merge: 0, met: false });
        s.cells = Array.from({ length: 6 }, (_, i) => ({ x: Math.random() * W, y: Math.random() * H, s: 0.3 + Math.random() * 0.35, img: i % 4, rot: Math.random() * 6, vr: (Math.random() - 0.5) * 0.3, speed: 0.2 + Math.random() * 0.3 }));
    };

    const finish = useCallback((kind: 'over' | 'clear') => {
        const s = g.current;
        const C = COURSES[s.course];
        s.running = false;
        if (kind === 'clear') s.eaten += C.id === 5 ? 20 : 10; // ゴールの ごほうび
        const final = s.eaten;
        setScore(final);
        setTip(kind === 'clear' ? (C.id === 5 ? KONDROS_TIP : COURSE_TIPS[C.id]) : TIPS[Math.floor(Math.random() * TIPS.length)]);
        setShared('idle');
        try {
            const key = `mf:climb:best:${C.id}`;
            const nb = Math.max(Number(localStorage.getItem(key) || 0), final);
            localStorage.setItem(key, String(nb));
            setBests((prev) => ({ ...prev, [C.id]: nb }));
            if (kind === 'clear' && C.id < 5) {
                const u = Math.max(Number(localStorage.getItem('mf:climb:unlocked') || 1), C.id + 1);
                localStorage.setItem('mf:climb:unlocked', String(u));
                setUnlocked((v) => Math.max(v, u));
                setProgress((v) => Math.max(v, u));
            }
            if (kind === 'clear' && C.id === 5) { localStorage.setItem('mf:climb:done', '1'); setDone(true); }
        } catch { if (kind === 'clear' && C.id < 5) setUnlocked((v) => Math.max(v, C.id + 1)); }
        if (kind === 'clear') { beep(523, 1046, 0.5); setTimeout(() => beep(659, 1318, 0.5), 180); setTimeout(() => beep(784, 1568, 0.7), 360); }
        else beep(400, 200, 0.5, 'sine', 0.05);
        setPhase(kind);
    }, [beep]);

    const start = useCallback((idx?: number) => {
        if (!audio.current) { try { audio.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)(); } catch { /* noop */ } }
        audio.current?.resume();
        const i = Math.max(0, Math.min(COURSES.length - 1, idx ?? g.current.course));
        g.current.course = i; setCourseIdx(i);
        reset();
        burst(W / 2, 190, '#1A1A1A', 0, i === COURSES.length - 1 ? 'ここが ミトスの すみか' : `コース ${COURSES[i].id}「${COURSES[i].name}」`);
        g.current.running = true; g.current.last = performance.now();
        setPhase('playing'); setScore(0);
    }, []);

    // 指の位置 → 目標の x
    const pointTo = useCallback((clientX: number) => {
        const c = canvasRef.current; if (!c) return;
        const r = c.getBoundingClientRect();
        g.current.targetX = Math.max(40, Math.min(W - 40, ((clientX - r.left) / r.width) * W));
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current; if (!canvas) return;
        const ctx = canvas.getContext('2d'); if (!ctx) return;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = W * dpr; canvas.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        const update = (dt: number) => {
            const s = g.current;
            const C = COURSES[s.course];
            s.t += dt;
            if (s.merge > 0) {
                s.merge -= dt;
                if (Math.random() < 0.5) burst(W / 2 + (Math.random() - 0.5) * 120, H * 0.45 + (Math.random() - 0.5) * 80, Math.random() < 0.5 ? '#41C9B4' : '#FF9855', 2);
                for (const pt of s.particles) { pt.x += pt.vx * dt; pt.y += pt.vy * dt; pt.life -= dt; }
                s.particles = s.particles.filter((pt) => pt.life > 0);
                if (s.merge <= 0) finish('clear');
                return;
            }
            s.dizzy = Math.max(0, s.dizzy - dt); s.hurt = Math.max(0, s.hurt - dt); s.shake = Math.max(0, s.shake - dt);
            for (const key of ['big', 'shield', 'spicy', 'ice', 'sun', 'sleepy', 'buddy'] as const) s[key] = Math.max(0, s[key] - dt);
            s.speed = (C.base + Math.min(C.cap - C.base, s.t * C.ramp)) * (s.spicy > 0 ? 1.8 : 1) * (s.ice > 0 ? 0.45 : 1);
            s.climb += s.speed * dt;
            s.atp -= dt * C.drain * (s.ice > 0 ? 0.5 : 1);
            if (s.sun > 0) s.atp = Math.min(100, s.atp + dt * 4); // ぽかぽか：じわじわ回復
            if (s.atp <= 0) { s.atp = 0; finish('over'); return; }
            // 左右の移動（ぐるぐる中は逆向き、ねむいと にぶい）
            const tx = s.dizzy > 0 ? W - s.targetX : s.targetX;
            s.px += (tx - s.px) * Math.min(1, dt * (s.sleepy > 0 ? 1.5 : 6));
            // ゴール：コース 1〜4 は旗、コース 5 はコンドロス
            const dist = s.climb / 10;
            const goal = goalM(C.goal);
            if (C.id === 5) {
                if (!s.kondros && dist >= goal) { s.kondros = { x: W / 2, y: -80 }; s.items = s.items.filter((it) => it.kind !== 'radical'); burst(W / 2, 100, '#FF9855', 12, 'コンドロスが みえた!'); beep(600, 900, 0.3); }
                if (s.kondros) {
                    s.kondros.y += s.speed * dt * 0.6;
                    s.kondros.x += (s.px - s.kondros.x) * Math.min(1, dt * 0.8);
                    const dx = s.kondros.x - s.px, dy = s.kondros.y - PLAYER_Y;
                    if (!s.met && dx * dx + dy * dy < 70 * 70) { s.met = true; s.merge = 2.2; burst(s.px, PLAYER_Y - 50, '#41C9B4', 24, 'ミトス ＋ コンドロス'); beep(440, 880, 0.4, 'triangle'); return; }
                }
            } else {
                if (!s.gate && dist >= goal) { s.gate = { y: -40 }; s.items = s.items.filter((it) => it.kind !== 'radical'); burst(W / 2, 100, '#FF9855', 12, 'ゴールが みえた!'); beep(600, 900, 0.3); }
                if (s.gate) {
                    s.gate.y += s.speed * dt;
                    if (s.gate.y >= PLAYER_Y - 20) { burst(s.px, PLAYER_Y - 50, '#41C9B4', 28, 'ゴール!'); finish('clear'); return; }
                }
            }
            // 生成（ゴールが見えたら止める）
            s.spawnIn -= dt;
            if (s.spawnIn <= 0 && !s.kondros && !s.gate) {
                const x = 40 + Math.random() * (W - 80);
                const w = C.w; let r = Math.random() * (w.food + w.bubble + w.sweet + w.radical + w.special);
                let kind: ItemKind;
                if ((r -= w.food) < 0) kind = 'food';
                else if ((r -= w.bubble) < 0) kind = 'bubble';
                else if ((r -= w.sweet) < 0) kind = 'sweet';
                else if ((r -= w.radical) < 0) kind = 'radical';
                else kind = C.specials[Math.floor(Math.random() * C.specials.length)];
                s.items.push({ kind, emoji: emojiFor(kind), x, y: -30, r: kind === 'radical' || kind === 'bubble' ? 18 : 22, drift: (Math.random() - 0.5) * (kind === 'radical' ? 40 + C.id * 12 : 40) });
                s.spawnIn = C.gap[0] + Math.random() * C.gap[1] - Math.min(0.12, s.t * 0.002);
            }
            // アイテム
            for (const it of s.items) {
                it.y += s.speed * dt; it.x += it.drift * dt + Math.sin(s.t * 2 + it.y * 0.02) * 0.4;
                if (it.dead) continue;
                const dx = it.x - s.px, dy = it.y - PLAYER_Y;
                const reach = 30 + (s.big > 0 ? 12 : 0) + (s.buddy > 0 ? 34 : 0); // おおきい・なかまがいると届く範囲が広い
                if (dx * dx + dy * dy < (it.r + reach) * (it.r + reach)) {
                    it.dead = true;
                    if (it.kind === 'food') { s.atp = Math.min(100, s.atp + 11); s.eaten += 1; burst(it.x, it.y, '#41C9B4', 12, 'おいしい'); beep(660, 990, 0.14); }
                    else if (it.kind === 'bubble') { s.atp = Math.min(100, s.atp + 5); s.eaten += 1; burst(it.x, it.y, '#5B86B8', 8, 'ポン'); beep(900, 1300, 0.1); }
                    else if (it.kind === 'sweet') { s.eaten += 1; s.dizzy = C.dizzy; burst(it.x, it.y, '#FF9855', 10, 'ぐるぐる〜'); beep(500, 300, 0.4, 'sine', 0.05); }
                    else if (it.kind === 'protein') { s.big = 6; s.eaten += 1; s.atp = Math.min(100, s.atp + 8); burst(it.x, it.y, '#E07A6A', 14, 'おおきく なった!'); beep(300, 600, 0.3, 'triangle'); }
                    else if (it.kind === 'shield') { s.shield = 5; s.eaten += 1; s.atp = Math.min(100, s.atp + 6); burst(it.x, it.y, '#5B86B8', 12, 'バリア!'); beep(700, 1100, 0.2); }
                    else if (it.kind === 'spicy') { s.spicy = 1.5; s.eaten += 1; s.shake = 0.4; burst(it.x, it.y, '#E03A2A', 16, 'からい!!'); beep(800, 1600, 0.25, 'square', 0.05); }
                    else if (it.kind === 'ice') { s.ice = 2.5; s.eaten += 1; burst(it.x, it.y, '#7FD3F0', 12, 'つめたい〜'); beep(1200, 600, 0.35); }
                    else if (it.kind === 'sun') { s.sun = 6; s.eaten += 1; burst(it.x, it.y, '#F5C242', 14, 'ぽかぽか'); beep(500, 800, 0.3); }
                    else if (it.kind === 'sleep') { s.sleepy = 2.5; burst(it.x, it.y, '#5B86B8', 8, 'ねむい…'); beep(400, 150, 0.5, 'sine', 0.05); }
                    else if (it.kind === 'buddy') { s.buddy = 8; s.eaten += 1; burst(it.x, it.y, '#41C9B4', 18, 'ミトスが ふえた!'); beep(520, 1040, 0.35); }
                    else if (it.kind === 'junk') { s.eaten = Math.max(0, s.eaten - 1); burst(it.x, it.y, '#8B8B8B', 8, 'ペッ たべられない'); beep(250, 120, 0.2, 'square', 0.04); }
                    else if (s.shield > 0) { burst(it.x, it.y, '#5B86B8', 14, 'はじいた!'); beep(900, 1300, 0.15); }
                    else { if (s.hurt <= 0) { s.atp = Math.max(0, s.atp - C.hit); s.hurt = 1; s.shake = 0.3; burst(it.x, it.y, '#E07A6A', 12, 'いたっ'); beep(200, 90, 0.25, 'sawtooth', 0.06); if (s.atp <= 0) { finish('over'); return; } } else it.dead = false; }
                }
            }
            s.items = s.items.filter((it) => it.y < H + 60 && !it.dead);
            for (const p of s.particles) { p.x += p.vx * dt; p.y += p.vy * dt; p.vy += 200 * dt; p.life -= dt; }
            s.particles = s.particles.filter((p) => p.life > 0);
            for (const c of s.cells) { c.y += s.speed * c.speed * dt; c.rot += c.vr * dt; if (c.y > H + 100) { c.y = -100; c.x = Math.random() * W; } }
        };

        const draw = () => {
            const s = g.current;
            const C = COURSES[s.course];
            ctx.save();
            if (s.shake > 0) ctx.translate((Math.random() - 0.5) * 8, (Math.random() - 0.5) * 8);
            const grad = ctx.createLinearGradient(0, 0, 0, H);
            grad.addColorStop(0, C.bg[0]); grad.addColorStop(1, C.bg[1]);
            ctx.fillStyle = grad; ctx.fillRect(-20, -20, W + 40, H + 40);
            // 壁（左右）と流れ
            ctx.fillStyle = C.wall; ctx.fillRect(-20, -20, 22, H + 40); ctx.fillRect(W - 2, -20, 22, H + 40);
            ctx.strokeStyle = 'rgba(255,255,255,0.35)'; ctx.lineWidth = 2;
            for (let i = 0; i < 5; i++) { const x = 50 + i * 72; const off = (s.climb * (0.3 + i * 0.08)) % 140; ctx.beginPath(); for (let y = -140 + off; y < H + 140; y += 140) { ctx.moveTo(x, y); ctx.lineTo(x, y + 60); } ctx.stroke(); }
            for (const c of s.cells) { const im = imgs.current.cells[c.img]; if (!im?.width) continue; ctx.save(); ctx.globalAlpha = 0.4; ctx.translate(c.x, c.y); ctx.rotate(c.rot); ctx.drawImage(im, -im.width * c.s / 2, -im.height * c.s / 2, im.width * c.s, im.height * c.s); ctx.restore(); }
            if (s.dizzy > 0) { ctx.fillStyle = 'rgba(255,152,85,0.12)'; ctx.fillRect(-20, -20, W + 40, H + 40); }
            if (s.spicy > 0) { ctx.fillStyle = 'rgba(224,58,42,0.14)'; ctx.fillRect(-20, -20, W + 40, H + 40); }
            if (s.ice > 0) { ctx.fillStyle = 'rgba(127,211,240,0.22)'; ctx.fillRect(-20, -20, W + 40, H + 40); }
            if (s.sun > 0) { const gl = ctx.createRadialGradient(W - 60, 60, 10, W - 60, 60, 260); gl.addColorStop(0, 'rgba(245,194,66,0.45)'); gl.addColorStop(1, 'rgba(245,194,66,0)'); ctx.fillStyle = gl; ctx.fillRect(-20, -20, W + 40, H + 40); }
            if (s.sleepy > 0) { ctx.fillStyle = 'rgba(20,24,70,0.22)'; ctx.fillRect(-20, -20, W + 40, H + 40); }
            // ゴールの旗（市松もよう）
            if (s.gate) {
                const y = s.gate.y, sz = 15;
                for (let i = 0; i < Math.ceil(W / sz); i++) for (let j = 0; j < 2; j++) { ctx.fillStyle = (i + j) % 2 ? '#1A1A1A' : '#FFFFFF'; ctx.fillRect(i * sz, y - sz + j * sz, sz, sz); }
                ctx.fillStyle = '#1A1A1A'; ctx.font = 'bold 20px "Noto Sans JP", sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic'; ctx.fillText('ゴール', W / 2, y - sz - 10);
            }
            // アイテム
            for (const it of s.items) {
                if (it.kind === 'radical') {
                    ctx.save(); ctx.translate(it.x, it.y); ctx.rotate(s.t * 2);
                    ctx.fillStyle = '#E07A6A'; ctx.beginPath();
                    for (let i = 0; i < 12; i++) { const a = (i / 12) * Math.PI * 2; const rr = i % 2 ? it.r : it.r + 7; ctx.lineTo(Math.cos(a) * rr, Math.sin(a) * rr); }
                    ctx.closePath(); ctx.fill();
                    ctx.fillStyle = '#1A1A1A'; ctx.beginPath(); ctx.arc(-5, -2, 2.5, 0, 7); ctx.arc(5, -2, 2.5, 0, 7); ctx.fill();
                    ctx.restore();
                } else {
                    ctx.font = `${it.kind === 'bubble' ? 26 : 32}px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                    ctx.fillText(it.emoji, it.x, it.y + Math.sin(s.t * 3 + it.x * 0.05) * 3);
                }
            }
            // コンドロス
            const k = imgs.current.kondros; const m = imgs.current.mito;
            if (s.kondros && s.merge <= 0 && k?.width) {
                const w = 92, h = (k.height / k.width) * 92;
                ctx.save(); ctx.translate(s.kondros.x, s.kondros.y); ctx.rotate(Math.sin(s.t * 2) * 0.1); ctx.drawImage(k, -w / 2, -h / 2, w, h); ctx.restore();
                ctx.fillStyle = '#1A1A1A'; ctx.font = 'bold 12px "Noto Sans JP", sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic'; ctx.fillText('コンドロス', s.kondros.x, s.kondros.y - h / 2 - 10);
            }
            // ミトス（ムニムニ）
            if (s.merge <= 0) {
                const breath = Math.sin(s.t * 5) * 0.06 + Math.sin(s.t * 1.7) * 0.03;
                const bob = Math.sin(s.t * 2.2) * 6;
                const lean = Math.max(-0.3, Math.min(0.3, (s.targetX - s.px) / 400)) + (s.dizzy > 0 ? Math.sin(s.t * 14) * 0.3 : 0);
                if (s.shield > 0) { ctx.strokeStyle = `rgba(91,134,184,${0.4 + 0.4 * Math.abs(Math.sin(s.t * 6))})`; ctx.lineWidth = 3; ctx.setLineDash([8, 6]); ctx.beginPath(); ctx.arc(s.px, PLAYER_Y, 68, s.t * 2, s.t * 2 + Math.PI * 2); ctx.stroke(); ctx.setLineDash([]); }
                const grow = s.big > 0 ? 1 + 0.35 * Math.min(1, s.big * 3) * Math.min(1, (6 - s.big) * 3 + 0.001) : 1; // ふくらんで、しぼむ
                ctx.save(); ctx.translate(s.px, PLAYER_Y + bob); ctx.rotate(lean);
                ctx.scale((1 + breath) * grow, (1 - breath) * grow);
                if (s.hurt > 0 && Math.floor(s.t * 20) % 2 === 0) ctx.globalAlpha = 0.45;
                if (m?.width) { const w = 100, h = (m.height / m.width) * 100; ctx.drawImage(m, -w / 2, -h / 2, w, h); }
                ctx.restore();
                if (s.dizzy > 0) { ctx.font = '22px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif'; ctx.textAlign = 'center'; ctx.fillText('💫', s.px + Math.cos(s.t * 8) * 40, PLAYER_Y - 60 + Math.sin(s.t * 8) * 12); }
                if (s.sleepy > 0) { ctx.font = '20px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif'; ctx.textAlign = 'center'; ctx.fillText('💤', s.px + 44, PLAYER_Y - 50 - (s.t * 20 % 16)); }
                if (s.buddy > 0 && m?.width) { // なかまのミトスが まわりを ぐるぐる
                    for (let i = 0; i < 2; i++) { const a = s.t * 2.2 + i * Math.PI; const bx = s.px + Math.cos(a) * 62, by = PLAYER_Y + Math.sin(a) * 26 - 10; const w = 44, h = (m.height / m.width) * 44; ctx.save(); ctx.translate(bx, by); ctx.rotate(Math.sin(s.t * 4 + i) * 0.2); ctx.drawImage(m, -w / 2, -h / 2, w, h); ctx.restore(); }
                }
            } else if (m?.width && k?.width) {
                const p = 1 - s.merge / 2.2; const cx = W / 2, cy = H * 0.45; const gap = (1 - Math.min(1, p * 1.4)) * 110; const spin = p * Math.PI * 4; const scale = 1 + Math.sin(p * Math.PI) * 0.25;
                ctx.save(); ctx.translate(cx, cy); ctx.rotate(spin); ctx.scale(scale, scale);
                const w1 = 100, h1 = (m.height / m.width) * 100; ctx.drawImage(m, -gap - w1 / 2, -h1 / 2, w1, h1);
                const w2 = 92, h2 = (k.height / k.width) * 92; ctx.drawImage(k, gap - w2 / 2, -h2 / 2, w2, h2);
                ctx.restore();
                if (p > 0.85) { ctx.fillStyle = `rgba(255,255,255,${(p - 0.85) / 0.15 * 0.9})`; ctx.fillRect(-20, -20, W + 40, H + 40); }
            }
            for (const p of s.particles) {
                ctx.globalAlpha = Math.max(0, Math.min(1, p.life * 2));
                if (p.text) { ctx.fillStyle = p.color; ctx.font = 'bold 15px "Noto Sans JP","Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif'; ctx.textAlign = 'center'; ctx.fillText(p.text, p.x, p.y); }
                else { ctx.fillStyle = p.color; ctx.beginPath(); ctx.arc(p.x, p.y, 4, 0, Math.PI * 2); ctx.fill(); }
                ctx.globalAlpha = 1;
            }
            ctx.restore();
            // HUD
            ctx.fillStyle = 'rgba(255,255,255,0.85)'; ctx.fillRect(16, 16, 200, 14); ctx.strokeStyle = '#1A1A1A'; ctx.lineWidth = 1.5; ctx.strokeRect(16, 16, 200, 14);
            ctx.fillStyle = s.atp > 35 ? '#41C9B4' : '#E07A6A'; ctx.fillRect(18, 18, Math.max(0, 196 * (s.atp / 100)), 10);
            ctx.fillStyle = '#1A1A1A'; ctx.font = 'bold 11px "Space Grotesk", sans-serif'; ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic'; ctx.fillText(`ATP ${Math.round(s.atp)}`, 16, 44);
            ctx.font = 'bold 10px "Noto Sans JP", sans-serif'; ctx.fillText(`コース ${C.id} · ${C.name}`, 60, 44);
            const labels = [s.big > 0 && 'おおきい', s.shield > 0 && 'バリア', s.buddy > 0 && 'なかま', s.spicy > 0 && 'からい', s.ice > 0 && 'つめたい', s.sun > 0 && 'ぽかぽか', s.sleepy > 0 && 'ねむい', s.dizzy > 0 && 'ぐるぐる'].filter(Boolean) as string[];
            ctx.fillText(labels.join(' · '), 16, 58);
            ctx.font = 'bold 22px "Space Grotesk", sans-serif'; ctx.textAlign = 'right'; ctx.fillText(String(s.eaten), W - 16, 32);
            ctx.font = 'bold 10px "Noto Sans JP", sans-serif'; ctx.fillText('たべた', W - 16, 44);
            const left = Math.max(0, Math.round(goalM(C.goal) - s.climb / 10));
            const target = C.id === 5 ? 'コンドロス' : 'ゴール';
            ctx.fillStyle = left === 0 ? '#FF9855' : '#1A1A1A'; ctx.fillText(left === 0 ? `${target}は すぐそこ` : `${target}まで ${left}m`, W - 16, 60);
        };

        const loop = (now: number) => { const s = g.current; const dt = Math.min(0.033, (now - s.last) / 1000 || 0); s.last = now; if (s.running) update(dt); draw(); s.raf = requestAnimationFrame(loop); };
        reset(); g.current.last = performance.now(); g.current.raf = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(g.current.raf);
    }, [finish, beep]);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (!g.current.running) return;
            if (e.code === 'ArrowLeft') { e.preventDefault(); g.current.targetX = Math.max(40, g.current.targetX - 60); }
            if (e.code === 'ArrowRight') { e.preventDefault(); g.current.targetX = Math.min(W - 40, g.current.targetX + 60); }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, []);

    const C = COURSES[courseIdx];
    const next = COURSES[courseIdx + 1];
    const best = bests[C.id] || 0;
    const finale = phase === 'clear' && C.id === 5;

    const share = async () => {
        const head = finale ? 'ミトコンドリア、たんじょう！' : phase === 'clear' ? `コース ${C.id}「${C.name}」クリア！` : `コース ${C.id}「${C.name}」`;
        const text = `歩けミトス（MITOFLOW）\n${head}\nたべた ${score}（BEST ${best}）\n${tip.text}`;
        const url = typeof window !== 'undefined' ? `${window.location.origin}/play/slow` : 'https://mitoflow40.com/play/slow';
        try { if (navigator.share) await navigator.share({ title: 'MITOFLOW', text, url }); else await navigator.clipboard.writeText(`${text}\n${url}`); setShared('done'); } catch { /* キャンセル */ }
    };

    const resultCard = (eyebrow: string, title: React.ReactNode, color: string) => (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-5 bg-[#1A1A1A]/45 sm:rounded-3xl">
            <div className="bg-white rounded-2xl border-2 border-[#1A1A1A] p-5 w-full max-w-[300px] shadow-xl">
                <p className="text-[10px] tracking-[0.2em] font-bold" style={{ color, fontFamily: "'Space Grotesk', sans-serif" }}>{eyebrow}</p>
                {title}
                <div className="text-4xl font-bold text-[#1A1A1A] mt-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{score}</div>
                <p className="text-[11px] text-[#4A4A4A] mb-3">たべた かず · BEST {best}</p>
                <a href={tip.href} className="block text-left text-xs text-[#1A1A1A] leading-relaxed border rounded-xl p-3 mb-3 transition-colors" style={{ background: phase === 'clear' ? '#E6F7F3' : '#FFF6E5', borderColor: color }}>
                    <span className="block text-[9px] tracking-widest font-bold mb-1" style={{ color, fontFamily: "'Space Grotesk', sans-serif" }}>HINT</span>
                    {tip.text}
                    <span className="block mt-1.5 text-[11px] font-bold underline underline-offset-2">{tip.label} →</span>
                </a>
                {phase === 'clear' && next ? (
                    <button onPointerDown={(e) => { e.stopPropagation(); start(courseIdx + 1); }} className="w-full py-3 rounded-full border-2 border-[#1A1A1A] font-bold text-[#1A1A1A] mb-2 text-sm" style={{ background: color }}>つぎは コース {next.id}「{next.name}」▶</button>
                ) : null}
                <button onPointerDown={(e) => { e.stopPropagation(); start(courseIdx); }} className={`w-full rounded-full border-2 border-[#1A1A1A] font-bold text-[#1A1A1A] mb-2 ${phase === 'clear' && next ? 'py-2 text-sm bg-white' : 'py-3'}`} style={phase === 'clear' && next ? undefined : { background: color }}>もういちど</button>
                <div className="flex gap-2">
                    <button onPointerDown={(e) => { e.stopPropagation(); setPhase('start'); }} className="flex-1 py-2 rounded-full bg-white border-2 border-[#1A1A1A] font-bold text-[#1A1A1A] text-xs">コースを えらぶ</button>
                    <button onClick={share} className="flex-1 py-2 rounded-full bg-white border-2 border-[#1A1A1A] font-bold text-[#1A1A1A] text-xs">{shared === 'done' ? 'シェアしました' : 'シェア'}</button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="relative mx-auto w-full max-w-[420px] select-none" style={{ aspectRatio: `${W} / ${H}`, maxHeight: '100dvh' }}>
            <canvas ref={canvasRef} className="block w-full h-full rounded-none sm:rounded-3xl sm:border-2 sm:border-[#1A1A1A]" style={{ touchAction: 'none' }}
                onPointerDown={(e) => { e.preventDefault(); if (phase === 'playing') pointTo(e.clientX); }}
                onPointerMove={(e) => { if (phase === 'playing' && (e.buttons > 0 || e.pointerType === 'touch')) pointTo(e.clientX); }} />

            {phase === 'start' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 bg-[#1A1A1A]/35 sm:rounded-3xl">
                    <div className="bg-white rounded-2xl border-2 border-[#1A1A1A] p-4 w-full max-w-[310px] shadow-xl">
                        <p className="text-[10px] tracking-[0.3em] font-bold text-[#41C9B4]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>MITOFLOW · ゆっくり</p>
                        <h1 className="text-2xl font-bold text-[#1A1A1A] mt-0.5 mb-1">歩けミトス</h1>
                        <p className="text-[11px] text-[#4A4A4A] leading-relaxed mb-3">ミトスは、すみかの さいぼうを さがして たびの とちゅう。<br />ゆびで さわった ほうへ うごく。🥚🐟🥦 を あつめて、トゲトゲを よけよう。<br />5 コースめの「さいぼうの なか」で、コンドロスが まっている。</p>
                        <div className="space-y-1.5">
                            {COURSES.map((c, i) => {
                                const locked = c.id > unlocked;
                                const cleared = c.id < progress || (c.id === 5 && done);
                                return (
                                    <button key={c.id} disabled={locked}
                                        onPointerDown={(e) => { e.stopPropagation(); if (!locked) start(i); }}
                                        className={`w-full flex items-center gap-2.5 rounded-xl border-2 px-2.5 py-1.5 text-left transition-transform ${locked ? 'border-[#1A1A1A]/20 opacity-60' : 'border-[#1A1A1A] active:translate-y-0.5'}`}
                                        style={{ background: locked ? '#F1F1F1' : c.bg[0] }}>
                                        <span className="w-7 h-7 shrink-0 rounded-full bg-white border border-[#1A1A1A] flex items-center justify-center text-xs font-bold text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{c.id}</span>
                                        <span className="flex-1 min-w-0">
                                            <span className="block text-sm font-bold text-[#1A1A1A] leading-tight">{c.name}</span>
                                            <span className="block text-[10px] text-[#4A4A4A] leading-tight">{c.kanji} · {c.goal}m{bests[c.id] ? ` · BEST ${bests[c.id]}` : ''}</span>
                                        </span>
                                        <span className="text-sm shrink-0" aria-hidden="true">{locked ? '🔒' : cleared ? '⭐' : '▶'}</span>
                                    </button>
                                );
                            })}
                        </div>
                        <a href="/play" className="block text-[11px] text-[#4A4A4A] underline mt-3">はしる版（走れミトス）はこちら →</a>
                    </div>
                </div>
            )}
            {phase === 'clear' && (finale
                ? resultCard('ミトス ＋ コンドロス', <h2 className="text-2xl font-bold text-[#1A1A1A] mt-1 leading-tight">ミトコンドリア、<br />たんじょう！</h2>, '#41C9B4')
                : resultCard(`コース ${C.id} クリア！`, <h2 className="text-xl font-bold text-[#1A1A1A] mt-1 leading-tight">「{C.name}」を ぬけた！</h2>, '#41C9B4'))}
            {phase === 'over' && resultCard(`コース ${C.id} · ${C.name}`, <h2 className="text-xl font-bold text-[#1A1A1A] mt-1 leading-tight">ひとやすみ<span className="block text-xs font-normal text-[#4A4A4A] mt-1">ATP が なくなった</span></h2>, '#FF9855')}
        </div>
    );
}
