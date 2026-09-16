'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

// ── MITOFLOW ／ 走れミトス（試作） ──────────────────────────
// 血管の中をミトコンドリアの「ミトス」が走る 1 タップのランゲーム。教えない。手触りで覚える。
//   ・良い食べ物 → ATP が増えて加速
//   ・甘いもの   → 一瞬だけ速くなり、そのあと「血糖の波」でヨロヨロ
//   ・コーヒー   → しばらく速いが、切れると眠くてジャンプが弱い
//   ・活性酸素   → ぶつかると ATP が減る
// ATP が尽きたらゲームオーバー。スコアは距離＋食べたもの。

const W = 390;
const H = 640;
const GROUND = H * 0.78;
const PLAYER_X = 96;
const GRAVITY = 2100;
const JUMP_V = -760;

type ItemKind = 'good' | 'sweet' | 'coffee' | 'fat' | 'berry' | 'radical';
type Item = { kind: ItemKind; emoji: string; x: number; y: number; r: number; dead?: boolean; vy?: number };
type Particle = { x: number; y: number; vx: number; vy: number; life: number; color: string; text?: string };
type Cell = { x: number; y: number; s: number; img: number; rot: number; vr: number; speed: number };

const GOOD = ['🥚', '🐟', '🥦', '🍙', '🍅', '🥬'];
const SWEET = ['🍩', '🥤', '🍰'];
const FAT = ['🥑', '🥜', '🫒', '🥥'];
const MAX_MITO = 6;
const GOAL_M = 1500;   // ここまで走ると、コンドロスが見えてくる（?goal=数値 で変えられる。動作確認用）
const goalM = () => { try { const q = new URLSearchParams(window.location.search).get('goal'); const n = q ? Number(q) : NaN; return Number.isFinite(n) && n > 0 ? n : GOAL_M; } catch { return GOAL_M; } };
const KONDROS_TIP = { text: 'ミトスとコンドロスが出会って、ミトコンドリア。細胞の中で ATP を作る工場になった。', href: '/mitochondria', label: 'ミトコンドリアとは' };
const maxAtp = (mito: number) => 100 + (mito - 1) * 10;
const TIPS: { text: string; href: string; label: string }[] = [
    { text: '甘いもののあとに来るヨロヨロ、あれが「血糖の波」。', href: '/blood-sugar', label: '血糖の波のしくみ' },
    { text: 'コーヒーは眠気を隠すだけ。エネルギーは作らない。', href: '/caffeine', label: 'カフェインとの付き合い方' },
    { text: '活性酸素は「さびる」のもと。抗酸化の食べ物で守れる。', href: '/oxidative-stress', label: '酸化ストレスとは' },
    { text: '卵・鮭・納豆。ATP の材料は、いつもの食卓にある。', href: '/foods', label: '食べ物の一覧' },
    { text: 'ミトコンドリアを増やす確実な方法は、動くこと。', href: '/exercise', label: '運動とミトコンドリア' },
    { text: '午後の眠気、年齢のせいじゃないかもしれない。', href: '/symptoms/post-meal-sleepiness', label: '食後の眠気の背景' },
    { text: 'ケトン体は、糖が来ない時間に脂肪から作る第二の燃料。', href: '/ketones', label: 'ケトン体とは' },
    { text: '夜のコーヒーは残る。半減期はおよそ 5 時間。', href: '/circadian-rhythm', label: '体内時計のしくみ' },
    { text: 'ブルーベリーの色は抗酸化の色。さびから守る。', href: '/oxidative-stress', label: '抗酸化のしくみ' },
];

export default function MitoRun() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [phase, setPhase] = useState<'start' | 'playing' | 'over' | 'clear'>('start');
    const [score, setScore] = useState(0);
    const [best, setBest] = useState(0);
    const [tip, setTip] = useState(TIPS[0]);
    const [shared, setShared] = useState<'idle' | 'done'>('idle');

    // ゲームの状態は ref に置いて、描画ループから直接触る
    const g = useRef({
        running: false,
        t: 0,
        scroll: 0,
        speed: 260,
        atp: 100,
        score: 0,
        py: GROUND,
        vy: 0,
        jumps: 0,
        squash: 0,
        items: [] as Item[],
        particles: [] as Particle[],
        cells: [] as Cell[],
        spawnIn: 0.8,
        rush: 0,      // 甘いもの：加速中
        wave: 0,      // 血糖の波：ヨロヨロ中
        caffeine: 0,  // コーヒー：加速中
        sleepy: 0,    // 眠気：ジャンプが弱い
        hurt: 0,      // 無敵時間
        keto: 0,      // ケトン体モード（脂肪を燃やす）
        sugar: 0,     // 糖の負荷 0〜1（高いとケトン体に入れない）
        shield: 0,    // 抗酸化バリア
        jumpCount: 0, // 運動量：ジャンプの回数でミトコンドリアが増える
        mito: 1,      // ミトコンドリアの数（ATP の上限）
        night: false, // 夜（カフェインが残りやすい）
        kondros: null as { x: number; y: number } | null, // 相棒。ゴール距離を超えると前方に現れる
        merge: 0,     // 合体の演出タイマー
        met: false,   // コンドロスに触れた
        shake: 0,
        last: 0,
        raf: 0,
    });
    const imgs = useRef<{ mito?: HTMLImageElement; kondros?: HTMLImageElement; cells: HTMLImageElement[] }>({ cells: [] });
    const audio = useRef<AudioContext | null>(null);

    // ── 音（素材なし。WebAudio で鳴らす） ──
    const beep = useCallback((f1: number, f2: number, dur: number, type: OscillatorType = 'sine', vol = 0.08) => {
        const ac = audio.current;
        if (!ac) return;
        const o = ac.createOscillator();
        const gn = ac.createGain();
        o.type = type;
        o.frequency.setValueAtTime(f1, ac.currentTime);
        o.frequency.exponentialRampToValueAtTime(f2, ac.currentTime + dur);
        gn.gain.setValueAtTime(vol, ac.currentTime);
        gn.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + dur);
        o.connect(gn).connect(ac.destination);
        o.start();
        o.stop(ac.currentTime + dur);
    }, []);

    useEffect(() => {
        try { setBest(Number(localStorage.getItem('mf:run:best') || 0)); } catch { /* noop */ }
        const load = (src: string) => new Promise<HTMLImageElement>((res) => { const i = new Image(); i.onload = () => res(i); i.onerror = () => res(i); i.src = src; });
        Promise.all([load('/game/mito.png'), load('/game/kondros.png'), load('/game/cell0.png'), load('/game/cell1.png'), load('/game/cell2.png'), load('/game/cell3.png')]).then(([m, k, ...c]) => {
            imgs.current = { mito: m, kondros: k, cells: c };
        });
    }, []);

    const burst = (x: number, y: number, color: string, n = 10, text?: string) => {
        const s = g.current;
        for (let i = 0; i < n; i++) {
            const a = Math.random() * Math.PI * 2, sp = 120 + Math.random() * 220;
            s.particles.push({ x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 80, life: 0.5 + Math.random() * 0.3, color });
        }
        if (text) s.particles.push({ x, y: y - 10, vx: 0, vy: -90, life: 0.9, color, text });
    };

    const reset = () => {
        const s = g.current;
        Object.assign(s, { t: 0, scroll: 0, speed: 260, atp: 100, score: 0, py: GROUND, vy: 0, jumps: 0, squash: 0, items: [], particles: [], spawnIn: 0.8, rush: 0, wave: 0, caffeine: 0, sleepy: 0, hurt: 0, keto: 0, sugar: 0, shield: 0, jumpCount: 0, mito: 1, night: false, kondros: null, merge: 0, met: false, shake: 0 });
        s.cells = Array.from({ length: 7 }, (_, i) => ({ x: Math.random() * W, y: 40 + Math.random() * (GROUND - 80), s: 0.35 + Math.random() * 0.35, img: i % 4, rot: Math.random() * 6, vr: (Math.random() - 0.5) * 0.4, speed: 0.15 + Math.random() * 0.25 }));
    };

    const jump = useCallback(() => {
        const s = g.current;
        if (!s.running) return;
        if (s.jumps >= 2) return;
        const k = s.sleepy > 0 ? 0.62 : s.wave > 0 ? 0.8 : 1;
        s.vy = JUMP_V * k * (s.jumps === 1 ? 0.85 : 1);
        s.jumps += 1;
        s.squash = 1;
        s.jumpCount += 1;
        if (s.jumpCount % 12 === 0 && s.mito < MAX_MITO) {
            s.mito += 1;
            s.atp = Math.min(maxAtp(s.mito), s.atp + 20);
            burst(PLAYER_X, s.py - 40, '#41C9B4', 18, `ミトコンドリアが増えた! ×${s.mito}`);
            beep(520, 1040, 0.35, 'sine', 0.07);
        }
        beep(s.jumps === 1 ? 420 : 520, 760, 0.12, 'triangle');
    }, [beep]);

    const gameOver = useCallback(() => {
        const s = g.current;
        s.running = false;
        const final = Math.round(s.score);
        setScore(final);
        setTip(TIPS[Math.floor(Math.random() * TIPS.length)]);
        setShared('idle');
        try {
            const b = Number(localStorage.getItem('mf:run:best') || 0);
            if (final > b) { localStorage.setItem('mf:run:best', String(final)); setBest(final); } else setBest(b);
        } catch { /* noop */ }
        beep(300, 80, 0.5, 'sawtooth', 0.06);
        setPhase('over');
    }, [beep]);

    const clear = useCallback(() => {
        const s = g.current;
        s.running = false;
        s.score += 1000;
        const final = Math.round(s.score);
        setScore(final);
        setTip(KONDROS_TIP);
        setShared('idle');
        try {
            const b = Number(localStorage.getItem('mf:run:best') || 0);
            if (final > b) { localStorage.setItem('mf:run:best', String(final)); setBest(final); } else setBest(b);
        } catch { /* noop */ }
        beep(523, 1046, 0.5, 'sine', 0.08);
        setTimeout(() => beep(659, 1318, 0.5, 'sine', 0.07), 180);
        setTimeout(() => beep(784, 1568, 0.7, 'sine', 0.07), 360);
        setPhase('clear');
    }, [beep]);

    const start = useCallback(() => {
        if (!audio.current) {
            try { audio.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)(); } catch { /* noop */ }
        }
        audio.current?.resume();
        reset();
        g.current.running = true;
        g.current.last = performance.now();
        setPhase('playing');
        setScore(0);
    }, []);

    // ── メインループ ──
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = W * dpr; canvas.height = H * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        const update = (dt: number) => {
            const s = g.current;
            s.t += dt;
            // 合体の演出：ふたりが中央で回りながら近づき、ひとつになる
            if (s.merge > 0) {
                s.merge -= dt;
                if (Math.random() < 0.5) burst(W / 2 + (Math.random() - 0.5) * 120, GROUND - 60 + (Math.random() - 0.5) * 80, Math.random() < 0.5 ? '#41C9B4' : '#FF9855', 2);
                for (const pt of s.particles) { pt.x += pt.vx * dt; pt.y += pt.vy * dt; pt.vy += 500 * dt; pt.life -= dt; }
                s.particles = s.particles.filter((pt) => pt.life > 0);
                if (s.merge <= 0) clear();
                return;
            }
            // 状態タイマー
            const wasRush = s.rush > 0;
            s.rush = Math.max(0, s.rush - dt); s.wave = Math.max(0, s.wave - dt); s.caffeine = Math.max(0, s.caffeine - dt); s.sleepy = Math.max(0, s.sleepy - dt); s.hurt = Math.max(0, s.hurt - dt); s.shake = Math.max(0, s.shake - dt);
            const wasKeto = s.keto > 0;
            s.keto = Math.max(0, s.keto - dt); s.shield = Math.max(0, s.shield - dt);
            if (wasKeto && s.keto === 0) burst(PLAYER_X, s.py - 30, '#2FB59F', 6, 'ケトン体、おわり');
            s.sugar = Math.max(0, s.sugar - dt * 0.09);
            const dist = s.scroll / 10;
            const wasNight = s.night;
            s.night = s.t > 40 && (s.t % 60) > 40;
            if (!wasNight && s.night) burst(W / 2, 90, '#5B86B8', 0, '夜。カフェインが残りやすい');

            if (wasRush && s.rush === 0) { s.wave = 2.2; s.atp = Math.max(1, s.atp - 10); burst(PLAYER_X, s.py - 30, '#8B78C9', 8, '血糖の波…'); beep(400, 120, 0.4, 'sine', 0.06); }
            // 速度：時間で少しずつ上がる ＋ 状態の補正
            const base = 260 + Math.min(220, s.t * 6);
            let mult = 1;
            if (s.rush > 0) mult *= 1.55; else if (s.wave > 0) mult *= 0.6;
            if (s.caffeine > 0) mult *= 1.3; else if (s.sleepy > 0) mult *= 0.85;
            if (s.keto > 0) mult *= 1.08;
            s.speed = base * mult;
            s.scroll += s.speed * dt;
            s.score += (s.speed * dt) / 12 * (s.rush > 0 ? 2 : 1) * (s.keto > 0 ? 1.5 : 1);
            // ATP は減り続ける（ケトン体モードは半分、カフェインは少し早い）
            s.atp -= dt * (s.caffeine > 0 ? 7.5 : 6) * (s.keto > 0 ? 0.5 : 1);
            if (s.atp <= 0) { s.atp = 0; gameOver(); return; }
            // プレイヤー
            s.vy += GRAVITY * dt; s.py += s.vy * dt;
            if (s.py >= GROUND) { if (s.jumps > 0 && s.vy > 400) s.squash = 0.8; s.py = GROUND; s.vy = 0; s.jumps = 0; }
            s.squash = Math.max(0, s.squash - dt * 4);
            // 生成
            if (!s.kondros && dist >= goalM()) { s.kondros = { x: W + 80, y: GROUND }; s.items = s.items.filter((it) => it.kind !== 'radical'); burst(W / 2, 120, '#FF9855', 12, 'コンドロスが見えた!'); beep(600, 900, 0.3, 'sine', 0.07); }
            if (s.kondros) {
                s.kondros.x -= s.speed * dt * 0.45;
                const dx = s.kondros.x - PLAYER_X, dy = (s.kondros.y - 34) - (s.py - 34);
                if (!s.met && dx * dx + dy * dy < 70 * 70) { s.met = true; s.merge = 2.0; s.shake = 0; burst(PLAYER_X + dx / 2, s.py - 40, '#41C9B4', 24, 'ミトス ＋ コンドロス'); beep(440, 880, 0.4, 'triangle', 0.08); return; }
            }
            s.spawnIn -= dt;
            if (s.spawnIn <= 0 && !s.kondros) {
                const r = Math.random();
                const air = Math.random() < 0.45;
                const y = air ? GROUND - 120 - Math.random() * 90 : GROUND - 22;
                const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];
                if (r < 0.32) s.items.push({ kind: 'good', emoji: pick(GOOD), x: W + 40, y, r: 20 });
                else if (r < 0.48) s.items.push({ kind: 'sweet', emoji: pick(SWEET), x: W + 40, y, r: 20 });
                else if (r < 0.56) s.items.push({ kind: 'coffee', emoji: '☕', x: W + 40, y, r: 20 });
                else if (r < 0.72) s.items.push({ kind: 'fat', emoji: pick(FAT), x: W + 40, y, r: 20 });
                else if (r < 0.80) s.items.push({ kind: 'berry', emoji: '🫐', x: W + 40, y, r: 20 });
                else s.items.push({ kind: 'radical', emoji: '', x: W + 40, y: GROUND - 20 - (Math.random() < 0.3 ? 110 : 0), r: 18, vy: 0 });
                s.spawnIn = 0.55 + Math.random() * 0.7 - Math.min(0.25, s.t * 0.004);
            }
            // アイテムの移動と当たり
            const px = PLAYER_X, py = s.py - 34;
            for (const it of s.items) {
                it.x -= s.speed * dt;
                if (it.kind === 'radical') it.y += Math.sin(s.t * 6 + it.x * 0.02) * 0.6;
                if (it.dead) continue;
                const dx = it.x - px, dy = it.y - py;
                if (dx * dx + dy * dy < (it.r + 26) * (it.r + 26)) {
                    it.dead = true;
                    const cap = maxAtp(s.mito);
                    if (it.kind === 'good') { s.atp = Math.min(cap, s.atp + 16); s.score += 100; burst(it.x, it.y, '#41C9B4', 12, '+ATP'); beep(660, 990, 0.14, 'sine'); }
                    else if (it.kind === 'sweet') { s.atp = Math.min(cap, s.atp + 6); s.score += 60; s.rush = 1.6; s.sugar = Math.min(1, s.sugar + 0.6); if (s.keto > 0) { s.keto = 0; burst(PLAYER_X, s.py - 30, '#2FB59F', 6, '糖が入ってケトン体が切れた'); } burst(it.x, it.y, '#FF9855', 12, 'ダッシュ!'); beep(500, 1200, 0.2, 'square', 0.05); }
                    else if (it.kind === 'coffee') { s.score += 40; s.caffeine = 3; s.sleepy = 0; const atNight = s.night; burst(it.x, it.y, '#A0764B', 10, atNight ? '夜のカフェイン…' : 'カフェイン'); beep(700, 1000, 0.15, 'triangle'); setTimeout(() => { const q = g.current; if (q.running && q.caffeine <= 0.05) { q.sleepy = atNight ? 3.6 : 1.8; burst(PLAYER_X, q.py - 30, '#5B86B8', 6, atNight ? '眠い……（夜は残る）' : '眠い…'); } }, 3000); }
                    else if (it.kind === 'fat') { if (s.sugar < 0.2) { s.keto = Math.max(s.keto, 6); s.score += 80; burst(it.x, it.y, '#2FB59F', 14, 'ケトン体モード!'); beep(440, 880, 0.3, 'sine', 0.07); } else { s.atp = Math.min(cap, s.atp + 8); s.score += 50; burst(it.x, it.y, '#7DAE4A', 8, '脂質だけ（糖が多い）'); beep(600, 800, 0.12, 'sine'); } }
                    else if (it.kind === 'berry') { s.shield = 5; s.score += 60; burst(it.x, it.y, '#5B86B8', 12, '抗酸化バリア'); beep(700, 1100, 0.18, 'sine'); }
                    else if (s.shield > 0) { burst(it.x, it.y, '#5B86B8', 14, '抗酸化でガード!'); beep(900, 1300, 0.15, 'sine'); }
                    else { if (s.hurt <= 0) { s.atp -= 28; s.hurt = 1; s.shake = 0.35; burst(it.x, it.y, '#E07A6A', 14, 'さびる!'); beep(180, 60, 0.3, 'sawtooth', 0.08); if (s.atp <= 0) { s.atp = 0; gameOver(); return; } } else it.dead = false; }
                }
            }
            s.items = s.items.filter((it) => it.x > -60 && !it.dead);
            // 粒子と背景の細胞
            for (const p of s.particles) { p.x += p.vx * dt; p.y += p.vy * dt; p.vy += 500 * dt; p.life -= dt; }
            s.particles = s.particles.filter((p) => p.life > 0);
            for (const c of s.cells) { c.x -= s.speed * c.speed * dt; c.rot += c.vr * dt; if (c.x < -120) { c.x = W + 120; c.y = 40 + Math.random() * (GROUND - 80); } }
        };

        const draw = () => {
            const s = g.current;
            const shake = s.shake > 0 ? (Math.random() - 0.5) * 10 : 0;
            ctx.save();
            ctx.translate(shake, s.shake > 0 ? (Math.random() - 0.5) * 8 : 0);
            // 背景：血管
            const grad = ctx.createLinearGradient(0, 0, 0, H);
            grad.addColorStop(0, '#F7D9DE'); grad.addColorStop(0.7, '#F3C9D2'); grad.addColorStop(1, '#E9B6C3');
            ctx.fillStyle = grad; ctx.fillRect(-20, -20, W + 40, H + 40);
            // 流れの線
            ctx.strokeStyle = 'rgba(255,255,255,0.35)'; ctx.lineWidth = 2;
            for (let i = 0; i < 6; i++) { const y = 60 + i * 90; const off = (s.scroll * (0.3 + i * 0.08)) % 140; ctx.beginPath(); for (let x = -140 + (140 - off); x < W + 140; x += 140) { ctx.moveTo(x, y); ctx.lineTo(x + 70, y); } ctx.stroke(); }
            // 漂う細胞
            for (const c of s.cells) { const im = imgs.current.cells[c.img]; if (!im?.width) continue; ctx.save(); ctx.globalAlpha = 0.45; ctx.translate(c.x, c.y); ctx.rotate(c.rot); ctx.drawImage(im, -im.width * c.s / 2, -im.height * c.s / 2, im.width * c.s, im.height * c.s); ctx.restore(); }
            // 地面（血管の壁）
            ctx.fillStyle = '#D89AAE'; ctx.fillRect(-20, GROUND, W + 40, H - GROUND);
            ctx.fillStyle = '#C98AA0'; for (let x = -((s.scroll * 1) % 60); x < W + 60; x += 60) { ctx.beginPath(); ctx.ellipse(x, GROUND + 6, 26, 8, 0, 0, Math.PI * 2); ctx.fill(); }
            // 状態の空気感
            if (s.night) { ctx.fillStyle = 'rgba(20,24,70,0.28)'; ctx.fillRect(-20, -20, W + 40, H + 40); ctx.fillStyle = 'rgba(255,255,255,0.85)'; ctx.beginPath(); ctx.arc(W - 60, 80, 16, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = 'rgba(20,24,70,0.9)'; ctx.beginPath(); ctx.arc(W - 52, 74, 14, 0, Math.PI * 2); ctx.fill(); }
            if (s.wave > 0) { ctx.fillStyle = 'rgba(139,120,201,0.12)'; ctx.fillRect(-20, -20, W + 40, H + 40); }
            if (s.sleepy > 0) { ctx.fillStyle = 'rgba(30,30,60,0.18)'; ctx.fillRect(-20, -20, W + 40, H + 40); }
            if (s.rush > 0) { ctx.strokeStyle = 'rgba(255,152,85,0.5)'; ctx.lineWidth = 3; for (let i = 0; i < 8; i++) { const y = 30 + Math.random() * (GROUND - 40); ctx.beginPath(); ctx.moveTo(W - Math.random() * W, y); ctx.lineTo(W - Math.random() * W - 60, y); ctx.stroke(); } }
            // アイテム
            for (const it of s.items) {
                if (it.kind === 'radical') {
                    ctx.save(); ctx.translate(it.x, it.y); ctx.rotate(s.t * 4);
                    ctx.fillStyle = '#E07A6A'; ctx.beginPath();
                    for (let i = 0; i < 12; i++) { const a = (i / 12) * Math.PI * 2; const rr = i % 2 ? it.r : it.r + 8; ctx.lineTo(Math.cos(a) * rr, Math.sin(a) * rr); }
                    ctx.closePath(); ctx.fill();
                    ctx.fillStyle = '#1A1A1A'; ctx.beginPath(); ctx.arc(-5, -3, 2.5, 0, 7); ctx.arc(5, -3, 2.5, 0, 7); ctx.fill();
                    ctx.restore();
                } else {
                    ctx.font = '30px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                    const bob = Math.sin(s.t * 5 + it.x * 0.05) * 3;
                    ctx.fillText(it.emoji, it.x, it.y + bob);
                }
            }
            // プレイヤー
            const m = imgs.current.mito;
            const wob = s.wave > 0 ? Math.sin(s.t * 18) * 0.25 : 0;
            if (s.merge > 0) { /* 合体中は下で描く */ }
            const sq = s.squash;
            if (s.keto > 0) { const gl = ctx.createRadialGradient(PLAYER_X, s.py - 34, 10, PLAYER_X, s.py - 34, 80); gl.addColorStop(0, 'rgba(47,181,159,0.45)'); gl.addColorStop(1, 'rgba(47,181,159,0)'); ctx.fillStyle = gl; ctx.beginPath(); ctx.arc(PLAYER_X, s.py - 34, 80, 0, Math.PI * 2); ctx.fill(); }
            if (s.shield > 0) { ctx.strokeStyle = `rgba(91,134,184,${0.4 + 0.4 * Math.abs(Math.sin(s.t * 6))})`; ctx.lineWidth = 3; ctx.setLineDash([8, 6]); ctx.beginPath(); ctx.arc(PLAYER_X, s.py - 34, 62, s.t * 2, s.t * 2 + Math.PI * 2); ctx.stroke(); ctx.setLineDash([]); }
            ctx.save();
            if (s.merge > 0) ctx.globalAlpha = 0;
            ctx.translate(PLAYER_X, s.py);
            ctx.rotate(wob + Math.max(-0.35, Math.min(0.35, s.vy / 2400)));
            ctx.scale(1 + sq * 0.18, 1 - sq * 0.22);
            if (s.hurt > 0 && Math.floor(s.t * 20) % 2 === 0) ctx.globalAlpha = 0.45;
            if (m?.width) { const w = 96, h = (m.height / m.width) * 96; ctx.drawImage(m, -w / 2, -h, w, h); }
            else { ctx.fillStyle = '#E07A6A'; ctx.beginPath(); ctx.ellipse(0, -30, 44, 30, 0, 0, Math.PI * 2); ctx.fill(); }
            ctx.restore();
            // コンドロス（相棒）
            const k = imgs.current.kondros;
            if (s.kondros && s.merge <= 0 && k?.width) {
                const bob = Math.sin(s.t * 7) * 6;
                const w = 92, h = (k.height / k.width) * 92;
                ctx.save(); ctx.translate(s.kondros.x, s.kondros.y + bob); ctx.rotate(Math.sin(s.t * 3) * 0.08); ctx.drawImage(k, -w / 2, -h, w, h); ctx.restore();
                ctx.fillStyle = '#1A1A1A'; ctx.font = 'bold 12px "Noto Sans JP", sans-serif'; ctx.textAlign = 'center'; ctx.fillText('コンドロス', s.kondros.x, s.kondros.y - h - 10);
            }
            if (s.merge > 0 && m?.width && k?.width) {
                const p = 1 - s.merge / 2.0; // 0→1
                const cx = W / 2, cy = GROUND - 40;
                const gap = (1 - Math.min(1, p * 1.4)) * 110;
                const spin = p * Math.PI * 4;
                const scale = 1 + Math.sin(p * Math.PI) * 0.25;
                ctx.save(); ctx.translate(cx, cy); ctx.rotate(spin); ctx.scale(scale, scale);
                const w1 = 96, h1 = (m.height / m.width) * 96; ctx.drawImage(m, -gap - w1 / 2, -h1 / 2, w1, h1);
                const w2 = 92, h2 = (k.height / k.width) * 92; ctx.drawImage(k, gap - w2 / 2, -h2 / 2, w2, h2);
                ctx.restore();
                if (p > 0.85) { ctx.fillStyle = `rgba(255,255,255,${(p - 0.85) / 0.15 * 0.9})`; ctx.fillRect(-20, -20, W + 40, H + 40); }
            }
            // 粒子
            for (const p of s.particles) {
                ctx.globalAlpha = Math.max(0, Math.min(1, p.life * 2));
                if (p.text) { ctx.fillStyle = p.color; ctx.font = 'bold 14px "Noto Sans JP", sans-serif'; ctx.textAlign = 'center'; ctx.fillText(p.text, p.x, p.y); }
                else { ctx.fillStyle = p.color; ctx.beginPath(); ctx.arc(p.x, p.y, 4, 0, Math.PI * 2); ctx.fill(); }
                ctx.globalAlpha = 1;
            }
            ctx.restore();
            // HUD
            ctx.fillStyle = 'rgba(255,255,255,0.85)'; ctx.fillRect(16, 16, 200, 14);
            ctx.strokeStyle = '#1A1A1A'; ctx.lineWidth = 1.5; ctx.strokeRect(16, 16, 200, 14);
            ctx.fillStyle = s.atp > 35 ? (s.keto > 0 ? '#2FB59F' : '#41C9B4') : '#E07A6A'; ctx.fillRect(18, 18, Math.max(0, 196 * (s.atp / maxAtp(s.mito))), 10);
            ctx.fillStyle = '#1A1A1A'; ctx.font = 'bold 11px "Space Grotesk", sans-serif'; ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic'; ctx.fillText(`ATP ${Math.round(s.atp)}/${maxAtp(s.mito)}`, 16, 44);
            // ミトコンドリアの数と状態
            ctx.font = 'bold 10px "Space Grotesk", sans-serif'; ctx.fillStyle = '#1A1A1A'; ctx.fillText(`MITO ×${s.mito}`, 16, 60);
            const labels = [s.keto > 0 && 'ケトン体モード', s.shield > 0 && '抗酸化バリア', s.rush > 0 && 'ダッシュ', s.wave > 0 && '血糖の波', s.caffeine > 0 && 'カフェイン', s.sleepy > 0 && '眠い', s.night && '夜'].filter(Boolean) as string[];
            ctx.font = 'bold 10px "Noto Sans JP", sans-serif'; ctx.fillStyle = '#1A1A1A'; ctx.fillText(labels.join(' · '), 16, 74);
            ctx.font = 'bold 22px "Space Grotesk", sans-serif'; ctx.textAlign = 'right'; ctx.fillText(String(Math.round(s.score)), W - 16, 32);
            ctx.font = 'bold 10px "Space Grotesk", sans-serif'; ctx.fillText('SCORE', W - 16, 44);
            const left = Math.max(0, Math.round(goalM() - s.scroll / 10));
            ctx.font = 'bold 10px "Noto Sans JP", sans-serif'; ctx.fillStyle = left === 0 ? '#FF9855' : '#1A1A1A'; ctx.fillText(left === 0 ? 'コンドロスはすぐそこ' : `コンドロスまで ${left}m`, W - 16, 60);
        };

        const loop = (now: number) => {
            const s = g.current;
            const dt = Math.min(0.033, (now - s.last) / 1000 || 0);
            s.last = now;
            if (s.running) update(dt);
            draw();
            s.raf = requestAnimationFrame(loop);
        };
        reset();
        g.current.last = performance.now();
        g.current.raf = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(g.current.raf);
    }, [gameOver, clear, beep]);

    // 入力
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => { if (e.code === 'Space' || e.code === 'ArrowUp') { e.preventDefault(); if (g.current.running) jump(); } };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [jump]);

    const share = async () => {
        const text = `走れミトス（MITOFLOW）${phase === 'clear' ? '\nミトコンドリア、誕生！' : ''}\nSCORE ${score}（BEST ${best}）\n${tip.text}`;
        const url = typeof window !== 'undefined' ? `${window.location.origin}/play` : 'https://mitoflow40.com/play';
        try {
            if (navigator.share) await navigator.share({ title: 'MITOFLOW', text, url });
            else { await navigator.clipboard.writeText(`${text}\n${url}`); }
            setShared('done');
        } catch { /* キャンセル */ }
    };

    return (
        <div className="relative mx-auto w-full max-w-[420px] select-none" style={{ aspectRatio: `${W} / ${H}`, maxHeight: '100dvh' }}>
            <canvas ref={canvasRef} className="block w-full h-full rounded-none sm:rounded-3xl sm:border-2 sm:border-[#1A1A1A]"
                style={{ touchAction: 'none' }}
                onPointerDown={(e) => { e.preventDefault(); if (phase === 'playing') jump(); }} />

            {phase === 'start' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-[#1A1A1A]/35 sm:rounded-3xl" onPointerDown={start}>
                    <div className="bg-white rounded-2xl border-2 border-[#1A1A1A] p-6 max-w-[300px] shadow-xl">
                        <p className="text-[10px] tracking-[0.3em] font-bold text-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>MITOFLOW</p>
                        <h1 className="text-3xl font-bold text-[#1A1A1A] mt-1 mb-2">走れミトス</h1>
                        <p className="text-xs text-[#4A4A4A] leading-relaxed mb-4">タップでジャンプ（2 回まで）。<br />🥚🐟🥦 で ATP を保て。🍩🥤 は速いけど、あとがつらい。<br />🥑🥜 は糖を断っていればケトン体モード。<br />🫐 は抗酸化のバリア。<br />☕ は切れると眠い。夜はもっと残る。<br />跳び続けるとミトコンドリアが増える。<br />遠くにいるコンドロスと出会えたら、ミトコンドリアになれる。</p>
                        <button className="w-full py-3 rounded-full bg-[#FF9855] border-2 border-[#1A1A1A] font-bold text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>START</button>
                        {best > 0 && <p className="text-[11px] text-[#4A4A4A] mt-3">BEST {best}</p>}
                    </div>
                </div>
            )}

            {phase === 'clear' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-[#1A1A1A]/45 sm:rounded-3xl">
                    <div className="bg-white rounded-2xl border-2 border-[#1A1A1A] p-6 w-full max-w-[300px] shadow-xl">
                        <p className="text-[10px] tracking-[0.3em] font-bold text-[#41C9B4]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>ミトス ＋ コンドロス</p>
                        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-1 leading-tight">ミトコンドリア、<br />誕生！</h2>
                        <div className="text-4xl font-bold text-[#1A1A1A] mt-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{score}</div>
                        <p className="text-[11px] text-[#4A4A4A] mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>+1000 BONUS · BEST {best}</p>
                        <a href={tip.href} className="block text-left text-xs text-[#1A1A1A] leading-relaxed bg-[#E6F7F3] border border-[#41C9B4] rounded-xl p-3 mb-4 hover:bg-[#D2F0EA] transition-colors">
                            <span className="block text-[9px] tracking-widest font-bold text-[#2FB59F] mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>HINT</span>
                            {tip.text}
                            <span className="block mt-1.5 text-[11px] font-bold underline underline-offset-2">{tip.label} →</span>
                        </a>
                        <button onPointerDown={(e) => { e.stopPropagation(); start(); }} className="w-full py-3 rounded-full bg-[#41C9B4] border-2 border-[#1A1A1A] font-bold text-[#1A1A1A] mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>もう一回</button>
                        <button onClick={share} className="w-full py-2.5 rounded-full bg-white border-2 border-[#1A1A1A] font-bold text-[#1A1A1A] text-sm">{shared === 'done' ? 'シェアしました' : 'スコアをシェア'}</button>
                    </div>
                </div>
            )}
            {phase === 'over' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-[#1A1A1A]/45 sm:rounded-3xl">
                    <div className="bg-white rounded-2xl border-2 border-[#1A1A1A] p-6 w-full max-w-[300px] shadow-xl">
                        <p className="text-[10px] tracking-[0.3em] font-bold text-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>ATP が尽きた</p>
                        <div className="text-5xl font-bold text-[#1A1A1A] mt-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{score}</div>
                        <p className="text-[11px] text-[#4A4A4A] mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>BEST {best}</p>
                        <a href={tip.href} className="block text-left text-xs text-[#1A1A1A] leading-relaxed bg-[#FFF6E5] border border-[#FF9855] rounded-xl p-3 mb-4 hover:bg-[#FFE4D2] transition-colors">
                            <span className="block text-[9px] tracking-widest font-bold text-[#FF9855] mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>HINT</span>
                            {tip.text}
                            <span className="block mt-1.5 text-[11px] font-bold underline underline-offset-2">{tip.label} →</span>
                        </a>
                        <button onPointerDown={(e) => { e.stopPropagation(); start(); }} className="w-full py-3 rounded-full bg-[#FF9855] border-2 border-[#1A1A1A] font-bold text-[#1A1A1A] mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>もう一回</button>
                        <button onClick={share} className="w-full py-2.5 rounded-full bg-white border-2 border-[#1A1A1A] font-bold text-[#1A1A1A] text-sm">{shared === 'done' ? 'シェアしました' : 'スコアをシェア'}</button>
                    </div>
                </div>
            )}
        </div>
    );
}
