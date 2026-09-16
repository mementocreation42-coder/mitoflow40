'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

// ── MITOFLOW ／ ミトコンドリア、はしる（試作） ──────────────────────────
// 血管の中をミトコンドリアが走る 1 タップのランゲーム。教えない。手触りで覚える。
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

type ItemKind = 'good' | 'sweet' | 'coffee' | 'radical';
type Item = { kind: ItemKind; emoji: string; x: number; y: number; r: number; dead?: boolean; vy?: number };
type Particle = { x: number; y: number; vx: number; vy: number; life: number; color: string; text?: string };
type Cell = { x: number; y: number; s: number; img: number; rot: number; vr: number; speed: number };

const GOOD = ['🥚', '🐟', '🥦', '🍙', '🥑', '🫐'];
const SWEET = ['🍩', '🥤', '🍰'];
const TIPS = [
    '甘いもののあとに来るヨロヨロ、あれが「血糖の波」。',
    'コーヒーは眠気を隠すだけ。エネルギーは作らない。',
    '活性酸素は「さびる」のもと。抗酸化の食べ物で守れる。',
    '卵・鮭・納豆。ATP の材料は、いつもの食卓にある。',
    'ミトコンドリアを増やす確実な方法は、動くこと。',
    '午後の眠気、年齢のせいじゃないかもしれない。',
];

export default function MitoRun() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [phase, setPhase] = useState<'start' | 'playing' | 'over'>('start');
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
        shake: 0,
        last: 0,
        raf: 0,
    });
    const imgs = useRef<{ mito?: HTMLImageElement; cells: HTMLImageElement[] }>({ cells: [] });
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
        Promise.all([load('/game/mito.png'), load('/game/cell0.png'), load('/game/cell1.png'), load('/game/cell2.png'), load('/game/cell3.png')]).then(([m, ...c]) => {
            imgs.current = { mito: m, cells: c };
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
        Object.assign(s, { t: 0, scroll: 0, speed: 260, atp: 100, score: 0, py: GROUND, vy: 0, jumps: 0, squash: 0, items: [], particles: [], spawnIn: 0.8, rush: 0, wave: 0, caffeine: 0, sleepy: 0, hurt: 0, shake: 0 });
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
            // 状態タイマー
            const wasRush = s.rush > 0;
            s.rush = Math.max(0, s.rush - dt); s.wave = Math.max(0, s.wave - dt); s.caffeine = Math.max(0, s.caffeine - dt); s.sleepy = Math.max(0, s.sleepy - dt); s.hurt = Math.max(0, s.hurt - dt); s.shake = Math.max(0, s.shake - dt);
            if (wasRush && s.rush === 0) { s.wave = 2.2; s.atp = Math.max(1, s.atp - 10); burst(PLAYER_X, s.py - 30, '#8B78C9', 8, '血糖の波…'); beep(400, 120, 0.4, 'sine', 0.06); }
            // 速度：時間で少しずつ上がる ＋ 状態の補正
            const base = 260 + Math.min(220, s.t * 6);
            let mult = 1;
            if (s.rush > 0) mult *= 1.55; else if (s.wave > 0) mult *= 0.6;
            if (s.caffeine > 0) mult *= 1.3; else if (s.sleepy > 0) mult *= 0.85;
            s.speed = base * mult;
            s.scroll += s.speed * dt;
            s.score += (s.speed * dt) / 12 * (s.rush > 0 ? 2 : 1);
            // ATP は減り続ける
            s.atp -= dt * (s.caffeine > 0 ? 7.5 : 6);
            if (s.atp <= 0) { s.atp = 0; gameOver(); return; }
            // プレイヤー
            s.vy += GRAVITY * dt; s.py += s.vy * dt;
            if (s.py >= GROUND) { if (s.jumps > 0 && s.vy > 400) s.squash = 0.8; s.py = GROUND; s.vy = 0; s.jumps = 0; }
            s.squash = Math.max(0, s.squash - dt * 4);
            // 生成
            s.spawnIn -= dt;
            if (s.spawnIn <= 0) {
                const r = Math.random();
                const air = Math.random() < 0.45;
                const y = air ? GROUND - 120 - Math.random() * 90 : GROUND - 22;
                if (r < 0.42) s.items.push({ kind: 'good', emoji: GOOD[Math.floor(Math.random() * GOOD.length)], x: W + 40, y, r: 20 });
                else if (r < 0.60) s.items.push({ kind: 'sweet', emoji: SWEET[Math.floor(Math.random() * SWEET.length)], x: W + 40, y, r: 20 });
                else if (r < 0.70) s.items.push({ kind: 'coffee', emoji: '☕', x: W + 40, y, r: 20 });
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
                    if (it.kind === 'good') { s.atp = Math.min(100, s.atp + 16); s.score += 100; burst(it.x, it.y, '#41C9B4', 12, '+ATP'); beep(660, 990, 0.14, 'sine'); }
                    else if (it.kind === 'sweet') { s.atp = Math.min(100, s.atp + 6); s.score += 60; s.rush = 1.6; burst(it.x, it.y, '#FF9855', 12, 'ダッシュ!'); beep(500, 1200, 0.2, 'square', 0.05); }
                    else if (it.kind === 'coffee') { s.score += 40; s.caffeine = 3; s.sleepy = 0; burst(it.x, it.y, '#A0764B', 10, 'カフェイン'); beep(700, 1000, 0.15, 'triangle'); setTimeout(() => { const q = g.current; if (q.running && q.caffeine <= 0.05) { q.sleepy = 1.8; burst(PLAYER_X, q.py - 30, '#5B86B8', 6, '眠い…'); } }, 3000); }
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
            const sq = s.squash;
            ctx.save();
            ctx.translate(PLAYER_X, s.py);
            ctx.rotate(wob + Math.max(-0.35, Math.min(0.35, s.vy / 2400)));
            ctx.scale(1 + sq * 0.18, 1 - sq * 0.22);
            if (s.hurt > 0 && Math.floor(s.t * 20) % 2 === 0) ctx.globalAlpha = 0.45;
            if (m?.width) { const w = 96, h = (m.height / m.width) * 96; ctx.drawImage(m, -w / 2, -h, w, h); }
            else { ctx.fillStyle = '#E07A6A'; ctx.beginPath(); ctx.ellipse(0, -30, 44, 30, 0, 0, Math.PI * 2); ctx.fill(); }
            ctx.restore();
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
            ctx.fillStyle = s.atp > 35 ? '#41C9B4' : '#E07A6A'; ctx.fillRect(18, 18, Math.max(0, 196 * (s.atp / 100)), 10);
            ctx.fillStyle = '#1A1A1A'; ctx.font = 'bold 11px "Space Grotesk", sans-serif'; ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic'; ctx.fillText('ATP', 16, 44);
            ctx.font = 'bold 22px "Space Grotesk", sans-serif'; ctx.textAlign = 'right'; ctx.fillText(String(Math.round(s.score)), W - 16, 32);
            ctx.font = 'bold 10px "Space Grotesk", sans-serif'; ctx.fillText('SCORE', W - 16, 44);
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
    }, [gameOver, beep]);

    // 入力
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => { if (e.code === 'Space' || e.code === 'ArrowUp') { e.preventDefault(); if (g.current.running) jump(); } };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [jump]);

    const share = async () => {
        const text = `MITOFLOW ／ ミトコンドリア、はしる\nSCORE ${score}（BEST ${best}）\n${tip}`;
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
                        <h1 className="text-2xl font-bold text-[#1A1A1A] mt-1 mb-2">ミトコンドリア、<br />はしる</h1>
                        <p className="text-xs text-[#4A4A4A] leading-relaxed mb-4">タップでジャンプ（2 回まで）。<br />🥚🐟🥦 で ATP を保て。<br />🍩🥤 は速いけど、あとがつらい。<br />☕ は切れると眠い。<br />トゲトゲ（活性酸素）にはぶつかるな。</p>
                        <button className="w-full py-3 rounded-full bg-[#FF9855] border-2 border-[#1A1A1A] font-bold text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>START</button>
                        {best > 0 && <p className="text-[11px] text-[#4A4A4A] mt-3">BEST {best}</p>}
                    </div>
                </div>
            )}

            {phase === 'over' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-[#1A1A1A]/45 sm:rounded-3xl">
                    <div className="bg-white rounded-2xl border-2 border-[#1A1A1A] p-6 w-full max-w-[300px] shadow-xl">
                        <p className="text-[10px] tracking-[0.3em] font-bold text-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>ATP が尽きた</p>
                        <div className="text-5xl font-bold text-[#1A1A1A] mt-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{score}</div>
                        <p className="text-[11px] text-[#4A4A4A] mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>BEST {best}</p>
                        <p className="text-xs text-[#1A1A1A] leading-relaxed bg-[#FFF6E5] border border-[#FF9855] rounded-xl p-3 mb-4">{tip}</p>
                        <button onPointerDown={(e) => { e.stopPropagation(); start(); }} className="w-full py-3 rounded-full bg-[#FF9855] border-2 border-[#1A1A1A] font-bold text-[#1A1A1A] mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>もう一回</button>
                        <button onClick={share} className="w-full py-2.5 rounded-full bg-white border-2 border-[#1A1A1A] font-bold text-[#1A1A1A] text-sm">{shared === 'done' ? 'シェアしました' : 'スコアをシェア'}</button>
                        <a href="/library" className="block text-[11px] text-[#4A4A4A] underline mt-3">なぜ？はライブラリで →</a>
                    </div>
                </div>
            )}
        </div>
    );
}
