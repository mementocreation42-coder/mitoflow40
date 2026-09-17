'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

// ── MITOFLOW ／ のぼれミトス（ゆっくり版・縦スクロール） ──────────────────
// 血管の中をミトスがふわふわ上っていく。指で左右に動かして、ごはん（良い食べ物）を集める。
// 速くならない。落ちない。ぶつかっても「いたっ」で済む。子どもと一緒に遊べるテンポ。
//   ・🥚🐟🥦🍙  ごはん → ATP が増える、キラキラ
//   ・💧        あわ   → ATP が少し増える、ポン
//   ・🍩🍭      あまいもの → ぐるぐる目が回る（少しの間、動きが逆に）
//   ・トゲトゲ  活性酸素 → いたっ（ATP が少し減る）
// ATP が空になったら「ひとやすみ」。ずっと上ると、コンドロスに会える。

const W = 390;
const H = 640;
const PLAYER_Y = H * 0.72;
const GOAL_M = 600;
const goalM = () => { try { const q = new URLSearchParams(window.location.search).get('goal'); const n = q ? Number(q) : NaN; return Number.isFinite(n) && n > 0 ? n : GOAL_M; } catch { return GOAL_M; } };

type ItemKind = 'food' | 'bubble' | 'sweet' | 'radical';
type Item = { kind: ItemKind; emoji: string; x: number; y: number; r: number; dead?: boolean; drift: number };
type Particle = { x: number; y: number; vx: number; vy: number; life: number; color: string; text?: string };
type Cell = { x: number; y: number; s: number; img: number; rot: number; vr: number; speed: number };

const FOOD = ['🥚', '🐟', '🥦', '🍙', '🍅', '🍌', '🫐', '🥕'];
const SWEET = ['🍩', '🍭', '🍰'];
const TIPS: { text: string; href: string; label: string }[] = [
    { text: 'たまごや さかなは、ミトスの ごはん。からだの「でんち」をつくる。', href: '/foods', label: 'たべものをみる' },
    { text: 'あまいものを たべすぎると、ぐるぐる。すこしなら だいじょうぶ。', href: '/blood-sugar', label: 'どうして ぐるぐる？' },
    { text: 'トゲトゲは「さびる」のもと。いろのこい やさいが まもってくれる。', href: '/oxidative-stress', label: 'さびるって なに？' },
    { text: 'ミトスは、からだの なかで うごく「でんきの こうじょう」。', href: '/mitochondria', label: 'ミトコンドリアとは' },
    { text: 'はしったり あそんだりすると、ミトスが ふえる。', href: '/exercise', label: 'うんどうと ミトコンドリア' },
];
const KONDROS_TIP = { text: 'ミトスと コンドロスが であって、ミトコンドリア。からだの でんきを つくる こうじょうに なった。', href: '/mitochondria', label: 'ミトコンドリアとは' };

export default function MitoClimb() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [phase, setPhase] = useState<'start' | 'playing' | 'over' | 'clear'>('start');
    const [score, setScore] = useState(0);
    const [best, setBest] = useState(0);
    const [tip, setTip] = useState(TIPS[0]);
    const [shared, setShared] = useState<'idle' | 'done'>('idle');

    const g = useRef({
        running: false, t: 0, climb: 0, speed: 90, atp: 100, eaten: 0,
        px: W / 2, targetX: W / 2, dizzy: 0, hurt: 0, shake: 0,
        items: [] as Item[], particles: [] as Particle[], cells: [] as Cell[], spawnIn: 0.6,
        kondros: null as { x: number; y: number } | null, merge: 0, met: false,
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
        try { setBest(Number(localStorage.getItem('mf:climb:best') || 0)); } catch { /* noop */ }
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
        Object.assign(s, { t: 0, climb: 0, speed: 90, atp: 100, eaten: 0, px: W / 2, targetX: W / 2, dizzy: 0, hurt: 0, shake: 0, items: [], particles: [], spawnIn: 0.6, kondros: null, merge: 0, met: false });
        s.cells = Array.from({ length: 6 }, (_, i) => ({ x: Math.random() * W, y: Math.random() * H, s: 0.3 + Math.random() * 0.35, img: i % 4, rot: Math.random() * 6, vr: (Math.random() - 0.5) * 0.3, speed: 0.2 + Math.random() * 0.3 }));
    };

    const finish = useCallback((kind: 'over' | 'clear') => {
        const s = g.current;
        s.running = false;
        if (kind === 'clear') s.eaten += 20;
        const final = s.eaten;
        setScore(final);
        setTip(kind === 'clear' ? KONDROS_TIP : TIPS[Math.floor(Math.random() * TIPS.length)]);
        setShared('idle');
        try { const b = Number(localStorage.getItem('mf:climb:best') || 0); if (final > b) { localStorage.setItem('mf:climb:best', String(final)); setBest(final); } else setBest(b); } catch { /* noop */ }
        if (kind === 'clear') { beep(523, 1046, 0.5); setTimeout(() => beep(659, 1318, 0.5), 180); setTimeout(() => beep(784, 1568, 0.7), 360); }
        else beep(400, 200, 0.5, 'sine', 0.05);
        setPhase(kind);
    }, [beep]);

    const start = useCallback(() => {
        if (!audio.current) { try { audio.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)(); } catch { /* noop */ } }
        audio.current?.resume();
        reset();
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
            s.speed = 90 + Math.min(50, s.t * 1.2);
            s.climb += s.speed * dt;
            s.atp -= dt * 2.5;
            if (s.atp <= 0) { s.atp = 0; finish('over'); return; }
            // 左右の移動（ぐるぐる中は逆向き）
            const tx = s.dizzy > 0 ? W - s.targetX : s.targetX;
            s.px += (tx - s.px) * Math.min(1, dt * 6);
            // コンドロス
            const dist = s.climb / 10;
            if (!s.kondros && dist >= goalM()) { s.kondros = { x: W / 2, y: -80 }; s.items = s.items.filter((it) => it.kind !== 'radical'); burst(W / 2, 100, '#FF9855', 12, 'コンドロスが みえた!'); beep(600, 900, 0.3); }
            if (s.kondros) {
                s.kondros.y += s.speed * dt * 0.6;
                s.kondros.x += (s.px - s.kondros.x) * Math.min(1, dt * 0.8);
                const dx = s.kondros.x - s.px, dy = s.kondros.y - (PLAYER_Y - 30);
                if (!s.met && dx * dx + dy * dy < 70 * 70) { s.met = true; s.merge = 2.2; burst(s.px, PLAYER_Y - 60, '#41C9B4', 24, 'ミトス ＋ コンドロス'); beep(440, 880, 0.4, 'triangle'); return; }
            }
            // 生成
            s.spawnIn -= dt;
            if (s.spawnIn <= 0 && !s.kondros) {
                const r = Math.random(); const x = 40 + Math.random() * (W - 80);
                const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];
                if (r < 0.58) s.items.push({ kind: 'food', emoji: pick(FOOD), x, y: -30, r: 22, drift: (Math.random() - 0.5) * 30 });
                else if (r < 0.72) s.items.push({ kind: 'bubble', emoji: '💧', x, y: -30, r: 18, drift: (Math.random() - 0.5) * 40 });
                else if (r < 0.84) s.items.push({ kind: 'sweet', emoji: pick(SWEET), x, y: -30, r: 22, drift: (Math.random() - 0.5) * 30 });
                else s.items.push({ kind: 'radical', emoji: '', x, y: -30, r: 18, drift: (Math.random() - 0.5) * 50 });
                s.spawnIn = 0.7 + Math.random() * 0.6;
            }
            // アイテム
            for (const it of s.items) {
                it.y += s.speed * dt; it.x += it.drift * dt + Math.sin(s.t * 2 + it.y * 0.02) * 0.4;
                if (it.dead) continue;
                const dx = it.x - s.px, dy = it.y - (PLAYER_Y - 30);
                if (dx * dx + dy * dy < (it.r + 30) * (it.r + 30)) {
                    it.dead = true;
                    if (it.kind === 'food') { s.atp = Math.min(100, s.atp + 12); s.eaten += 1; burst(it.x, it.y, '#41C9B4', 12, 'おいしい'); beep(660, 990, 0.14); }
                    else if (it.kind === 'bubble') { s.atp = Math.min(100, s.atp + 5); s.eaten += 1; burst(it.x, it.y, '#5B86B8', 8, 'ポン'); beep(900, 1300, 0.1); }
                    else if (it.kind === 'sweet') { s.eaten += 1; s.dizzy = 1.6; burst(it.x, it.y, '#FF9855', 10, 'ぐるぐる〜'); beep(500, 300, 0.4, 'sine', 0.05); }
                    else { if (s.hurt <= 0) { s.atp = Math.max(0, s.atp - 15); s.hurt = 1; s.shake = 0.3; burst(it.x, it.y, '#E07A6A', 12, 'いたっ'); beep(200, 90, 0.25, 'sawtooth', 0.06); if (s.atp <= 0) { finish('over'); return; } } else it.dead = false; }
                }
            }
            s.items = s.items.filter((it) => it.y < H + 60 && !it.dead);
            for (const p of s.particles) { p.x += p.vx * dt; p.y += p.vy * dt; p.vy += 200 * dt; p.life -= dt; }
            s.particles = s.particles.filter((p) => p.life > 0);
            for (const c of s.cells) { c.y += s.speed * c.speed * dt; c.rot += c.vr * dt; if (c.y > H + 100) { c.y = -100; c.x = Math.random() * W; } }
        };

        const draw = () => {
            const s = g.current;
            ctx.save();
            if (s.shake > 0) ctx.translate((Math.random() - 0.5) * 8, (Math.random() - 0.5) * 8);
            const grad = ctx.createLinearGradient(0, 0, 0, H);
            grad.addColorStop(0, '#FBE3E7'); grad.addColorStop(1, '#EFC1CD');
            ctx.fillStyle = grad; ctx.fillRect(-20, -20, W + 40, H + 40);
            // 血管の壁（左右）と流れ
            ctx.fillStyle = '#D89AAE'; ctx.fillRect(-20, -20, 22, H + 40); ctx.fillRect(W - 2, -20, 22, H + 40);
            ctx.strokeStyle = 'rgba(255,255,255,0.35)'; ctx.lineWidth = 2;
            for (let i = 0; i < 5; i++) { const x = 50 + i * 72; const off = (s.climb * (0.3 + i * 0.08)) % 140; ctx.beginPath(); for (let y = -140 + off; y < H + 140; y += 140) { ctx.moveTo(x, y); ctx.lineTo(x, y + 60); } ctx.stroke(); }
            for (const c of s.cells) { const im = imgs.current.cells[c.img]; if (!im?.width) continue; ctx.save(); ctx.globalAlpha = 0.4; ctx.translate(c.x, c.y); ctx.rotate(c.rot); ctx.drawImage(im, -im.width * c.s / 2, -im.height * c.s / 2, im.width * c.s, im.height * c.s); ctx.restore(); }
            if (s.dizzy > 0) { ctx.fillStyle = 'rgba(255,152,85,0.12)'; ctx.fillRect(-20, -20, W + 40, H + 40); }
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
                ctx.fillStyle = '#1A1A1A'; ctx.font = 'bold 12px "Noto Sans JP", sans-serif'; ctx.textAlign = 'center'; ctx.fillText('コンドロス', s.kondros.x, s.kondros.y - h / 2 - 10);
            }
            // ミトス（ムニムニ）
            if (s.merge <= 0) {
                const breath = Math.sin(s.t * 5) * 0.06 + Math.sin(s.t * 1.7) * 0.03;
                const bob = Math.sin(s.t * 2.2) * 6;
                const lean = Math.max(-0.3, Math.min(0.3, (s.targetX - s.px) / 400)) + (s.dizzy > 0 ? Math.sin(s.t * 14) * 0.3 : 0);
                ctx.save(); ctx.translate(s.px, PLAYER_Y + bob); ctx.rotate(lean);
                ctx.scale(1 + breath, 1 - breath);
                if (s.hurt > 0 && Math.floor(s.t * 20) % 2 === 0) ctx.globalAlpha = 0.45;
                if (m?.width) { const w = 100, h = (m.height / m.width) * 100; ctx.drawImage(m, -w / 2, -h / 2 - 30, w, h); }
                ctx.restore();
                if (s.dizzy > 0) { ctx.font = '22px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif'; ctx.textAlign = 'center'; ctx.fillText('💫', s.px + Math.cos(s.t * 8) * 40, PLAYER_Y - 70 + Math.sin(s.t * 8) * 12); }
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
                if (p.text) { ctx.fillStyle = p.color; ctx.font = 'bold 15px "Noto Sans JP", sans-serif'; ctx.textAlign = 'center'; ctx.fillText(p.text, p.x, p.y); }
                else { ctx.fillStyle = p.color; ctx.beginPath(); ctx.arc(p.x, p.y, 4, 0, Math.PI * 2); ctx.fill(); }
                ctx.globalAlpha = 1;
            }
            ctx.restore();
            // HUD
            ctx.fillStyle = 'rgba(255,255,255,0.85)'; ctx.fillRect(16, 16, 200, 14); ctx.strokeStyle = '#1A1A1A'; ctx.lineWidth = 1.5; ctx.strokeRect(16, 16, 200, 14);
            ctx.fillStyle = s.atp > 35 ? '#41C9B4' : '#E07A6A'; ctx.fillRect(18, 18, Math.max(0, 196 * (s.atp / 100)), 10);
            ctx.fillStyle = '#1A1A1A'; ctx.font = 'bold 11px "Space Grotesk", sans-serif'; ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic'; ctx.fillText(`ATP ${Math.round(s.atp)}`, 16, 44);
            ctx.font = 'bold 22px "Space Grotesk", sans-serif'; ctx.textAlign = 'right'; ctx.fillText(String(s.eaten), W - 16, 32);
            ctx.font = 'bold 10px "Noto Sans JP", sans-serif'; ctx.fillText('たべた', W - 16, 44);
            const left = Math.max(0, Math.round(goalM() - s.climb / 10));
            ctx.fillStyle = left === 0 ? '#FF9855' : '#1A1A1A'; ctx.fillText(left === 0 ? 'コンドロスは すぐそこ' : `コンドロスまで ${left}m`, W - 16, 60);
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

    const share = async () => {
        const text = `のぼれミトス（MITOFLOW）${phase === 'clear' ? '\nミトコンドリア、たんじょう！' : ''}\nたべた ${score}（BEST ${best}）\n${tip.text}`;
        const url = typeof window !== 'undefined' ? `${window.location.origin}/play/slow` : 'https://mitoflow40.com/play/slow';
        try { if (navigator.share) await navigator.share({ title: 'MITOFLOW', text, url }); else await navigator.clipboard.writeText(`${text}\n${url}`); setShared('done'); } catch { /* キャンセル */ }
    };

    const card = (eyebrow: string, title: React.ReactNode, color: string) => (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-[#1A1A1A]/45 sm:rounded-3xl">
            <div className="bg-white rounded-2xl border-2 border-[#1A1A1A] p-6 w-full max-w-[300px] shadow-xl">
                <p className="text-[10px] tracking-[0.3em] font-bold" style={{ color, fontFamily: "'Space Grotesk', sans-serif" }}>{eyebrow}</p>
                {title}
                <div className="text-4xl font-bold text-[#1A1A1A] mt-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{score}</div>
                <p className="text-[11px] text-[#4A4A4A] mb-3">たべた かず · BEST {best}</p>
                <a href={tip.href} className="block text-left text-xs text-[#1A1A1A] leading-relaxed border rounded-xl p-3 mb-4 transition-colors" style={{ background: phase === 'clear' ? '#E6F7F3' : '#FFF6E5', borderColor: color }}>
                    <span className="block text-[9px] tracking-widest font-bold mb-1" style={{ color, fontFamily: "'Space Grotesk', sans-serif" }}>HINT</span>
                    {tip.text}
                    <span className="block mt-1.5 text-[11px] font-bold underline underline-offset-2">{tip.label} →</span>
                </a>
                <button onPointerDown={(e) => { e.stopPropagation(); start(); }} className="w-full py-3 rounded-full border-2 border-[#1A1A1A] font-bold text-[#1A1A1A] mb-2" style={{ background: color, fontFamily: "'Space Grotesk', sans-serif" }}>もういちど</button>
                <button onClick={share} className="w-full py-2.5 rounded-full bg-white border-2 border-[#1A1A1A] font-bold text-[#1A1A1A] text-sm">{shared === 'done' ? 'シェアしました' : 'スコアをシェア'}</button>
            </div>
        </div>
    );

    return (
        <div className="relative mx-auto w-full max-w-[420px] select-none" style={{ aspectRatio: `${W} / ${H}`, maxHeight: '100dvh' }}>
            <canvas ref={canvasRef} className="block w-full h-full rounded-none sm:rounded-3xl sm:border-2 sm:border-[#1A1A1A]" style={{ touchAction: 'none' }}
                onPointerDown={(e) => { e.preventDefault(); if (phase === 'playing') pointTo(e.clientX); }}
                onPointerMove={(e) => { if (phase === 'playing' && (e.buttons > 0 || e.pointerType === 'touch')) pointTo(e.clientX); }} />

            {phase === 'start' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-[#1A1A1A]/35 sm:rounded-3xl" onPointerDown={start}>
                    <div className="bg-white rounded-2xl border-2 border-[#1A1A1A] p-6 max-w-[300px] shadow-xl">
                        <p className="text-[10px] tracking-[0.3em] font-bold text-[#41C9B4]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>MITOFLOW · ゆっくり</p>
                        <h1 className="text-3xl font-bold text-[#1A1A1A] mt-1 mb-2">のぼれミトス</h1>
                        <p className="text-xs text-[#4A4A4A] leading-relaxed mb-4">ゆびで さわった ほうへ、ミトスが うごく。<br />🥚🐟🥦 の ごはんを あつめよう。<br />🍩🍭 は ぐるぐる。トゲトゲは いたっ。<br />ずっと のぼると、コンドロスに あえる。</p>
                        <button className="w-full py-3 rounded-full bg-[#41C9B4] border-2 border-[#1A1A1A] font-bold text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>START</button>
                        {best > 0 && <p className="text-[11px] text-[#4A4A4A] mt-3">BEST {best}</p>}
                        <a href="/play" className="block text-[11px] text-[#4A4A4A] underline mt-3" onPointerDown={(e) => e.stopPropagation()}>はしる版（走れミトス）はこちら →</a>
                    </div>
                </div>
            )}
            {phase === 'clear' && card('ミトス ＋ コンドロス', <h2 className="text-2xl font-bold text-[#1A1A1A] mt-1 leading-tight">ミトコンドリア、<br />たんじょう！</h2>, '#41C9B4')}
            {phase === 'over' && card('ひとやすみ', <h2 className="text-2xl font-bold text-[#1A1A1A] mt-1 leading-tight">ATP が なくなった</h2>, '#FF9855')}
        </div>
    );
}
