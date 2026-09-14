import { Fragment } from 'react';
import Link from 'next/link';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: 'ライブラリマップ｜全体の構造をひと目で | Mitoflow40',
    description: 'Mitoflow40ライブラリの全体像を、インフォグラフィックでひと目に。身体の地図・食べ物・生活習慣・内臓・仕組み・老化と不調・ホルモン・心・フロンティア・症状・思索——11のセクションの構造と、それぞれの代表ページへの入口をまとめた、軽やかなライブラリマップです。',
    alternates: { canonical: 'https://mitoflow40.com/library/map' },
    openGraph: {
        siteName: 'Mitoflow40',
        locale: 'ja_JP',
        title: 'ライブラリマップ｜全体の構造をひと目で | Mitoflow40',
        description: 'ライブラリの全11セクションの構造を、インフォグラフィックでひと目に。代表ページへの入口つきライブラリマップ。',
        url: 'https://mitoflow40.com/library/map',
        type: 'website',
    },
};

type Sec = {
    n: string;
    en: string;
    ja: string;
    anchor: string;
    color: string;
    desc: string;
    pages: { href: string; label: string }[];
};

const sections: Sec[] = [
    {
        n: '', en: 'START HERE', ja: 'はじめに', anchor: '#intro', color: '#F1EDE4',
        desc: 'なぜ体を「細胞」から読むのか。健康哲学と、栄養学の考え方そのものから入る。',
        pages: [
            { href: '/health-philosophy', label: '健康哲学' },
            { href: '/nutrition-literacy', label: '学ぶと何が変わる？' },
            { href: '/precision-nutrition', label: '精密栄養学' },
            { href: '/molecular-nutrition', label: '分子栄養学' },
        ],
    },
    {
        n: '1', en: 'HOW THEY CONNECT', ja: '身体の地図', anchor: '#map', color: '#CFE8F0',
        desc: '設計図（遺伝子）・現在地（血液検査）・材料（栄養素）。3つを重ねて体を読む出発点。',
        pages: [
            { href: '/genes', label: '遺伝子' },
            { href: '/biomarkers', label: '血液検査' },
            { href: '/nutrients', label: '栄養素' },
        ],
    },
    {
        n: '2', en: 'ON YOUR PLATE', ja: '食べ物', anchor: '#food', color: '#FBE9D0',
        desc: '毎日の皿の上の話。身近な食材と、小麦・米・断食・カロリーなど迷いやすい食のテーマ。',
        pages: [
            { href: '/foods', label: '食べ物一覧' },
            { href: '/food-topics', label: '食のテーマ' },
            { href: '/rice', label: '米' },
            { href: '/wheat', label: '小麦' },
            { href: '/fasting', label: '断食' },
            { href: '/caution-foods', label: '気をつけたい食品' },
            { href: '/calories', label: 'カロリーの誤解' },
            { href: '/spices', label: 'スパイス' },
        ],
    },
    {
        n: '3', en: 'LIFESTYLE', ja: '生活習慣', anchor: '#lifestyle', color: '#E7EFD8',
        desc: '睡眠・光・水・運動の土台から、嗜好品・解毒・計測・サプリまで。知識を日々の暮らしに落とし込む。',
        pages: [
            { href: '/lifestyle', label: '生活習慣の入口' },
            { href: '/sleep', label: '睡眠' },
            { href: '/sunlight', label: '日光' },
            { href: '/water', label: '水' },
            { href: '/exercise', label: '運動' },
            { href: '/stimulants', label: '嗜好品' },
            { href: '/detox', label: '解毒' },
            { href: '/wearables', label: 'ウェアラブル' },
            { href: '/supplements', label: 'サプリメント' },
        ],
    },
    {
        n: '4', en: 'YOUR ORGANS', ja: '内臓・臓器', anchor: '#organs', color: '#F0E2D8',
        desc: '肝臓・腎臓・腸・心臓・脳など、主要な臓器の役割と、関わる検査・栄養。',
        pages: [
            { href: '/organs', label: '8臓器を見る' },
            { href: '/organs/liver', label: '肝臓' },
            { href: '/organs/gut', label: '腸' },
            { href: '/organs/brain', label: '脳' },
        ],
    },
    {
        n: '5', en: 'MECHANISM', ja: '身体の仕組み', anchor: '#mechanism', color: '#D7F0E8',
        desc: '細胞の中で起きていること。ミトコンドリアとエネルギーから、代謝・血糖・腸・酵素まで、土台の生化学。',
        pages: [
            { href: '/food-journey', label: '食べてから動くまで' },
            { href: '/mitochondria', label: 'ミトコンドリア' },
            { href: '/energy', label: 'エネルギー' },
            { href: '/cell-metabolism', label: '代謝と細胞のしくみ' },
            { href: '/blood-sugar', label: '血糖' },
            { href: '/insulin-resistance', label: 'インスリン抵抗性' },
            { href: '/gut-health', label: '腸内環境' },
        ],
    },
    {
        n: '6', en: 'AGING & DISEASE', ja: '老化と不調の土台', anchor: '#aging', color: '#F7E2DC',
        desc: 'さびる・こげる・くすぶる——共通の根と、そこから生まれる現代病たち。',
        pages: [
            { href: '/oxidative-stress', label: '酸化' },
            { href: '/glycation', label: '糖化' },
            { href: '/inflammation', label: '炎症' },
            { href: '/diseases', label: '現代病を読む' },
            { href: '/modern-diseases', label: '現代病とは' },
            { href: '/diabetes', label: '糖尿病' },
            { href: '/metabolic-syndrome', label: 'メタボリックシンドローム' },
            { href: '/hypertension', label: '高血圧' },
            { href: '/fatty-liver', label: '脂肪肝' },
            { href: '/mental-health', label: '心の現代病' },
        ],
    },
    {
        n: '7', en: 'HORMONES', ja: 'ホルモン', anchor: '#hormones', color: '#F3E0EC',
        desc: '体じゅうに指令を届ける化学メッセンジャー。9種のホルモンと40代の変化。',
        pages: [
            { href: '/hormones', label: 'ホルモンの種類' },
            { href: '/menopause', label: '更年期・更年期移行期' },
            { href: '/male-menopause', label: '男性更年期（LOH症候群）' },
        ],
    },
    {
        n: '8', en: 'MIND & BODY', ja: '心とからだ', anchor: '#mind', color: '#E6E0F2',
        desc: '気分や不安を「体の土台」から読み解く。腸・栄養・睡眠・自律神経・血糖。',
        pages: [
            { href: '/mind-body', label: '心とからだの入口' },
            { href: '/stress', label: 'ストレス' },
            { href: '/hsp', label: 'HSP' },
            { href: '/mood-nutrition', label: '気分と栄養' },
            { href: '/anxiety', label: '不安' },
            { href: '/mindfulness', label: '呼吸・マインドフルネス' },
            { href: '/spirituality', label: 'スピリチュアリティ' },
        ],
    },
    {
        n: '9', en: 'FRONTIER', ja: '研究と社会のフロンティア', anchor: '#frontier', color: '#E2EAF2',
        desc: '今まさに研究が進む領域。期待と注意の両方を、フラットに見渡す。',
        pages: [
            { href: '/psychedelics-research', label: 'サイケデリックス研究' },
            { href: '/cannabis', label: 'カンナビス' },
            { href: '/counterculture', label: 'カウンターカルチャー' },
        ],
    },
    {
        n: '10', en: 'FROM SYMPTOMS', ja: '症状から引く', anchor: '#symptoms', color: '#FDEAD0',
        desc: '「この不調はなぜ？」から逆引きする入口。体感（症状）からも、病態（不調・現代病）からも仕組みへたどる。',
        pages: [
            { href: '/symptoms', label: '症状から引く' },
            { href: '/conditions', label: '不調・現代病を読み解く' },
            { href: '/conditions/iron-deficiency', label: '鉄欠乏（隠れ貧血）' },
        ],
    },
    {
        n: '11', en: 'THOUGHTS', ja: '思索', anchor: '#thoughts', color: '#ECE6DA',
        desc: '「運命とは」「自由とは」「老いるとは」。健康を、問いから考えるエッセイ。',
        pages: [
            { href: '/thoughts', label: '思索の一覧' },
            { href: '/thoughts/aging', label: '老いるとは？' },
            { href: '/thoughts/tuning', label: '整えるとは？' },
            { href: '/thoughts/balance', label: 'バランスとは？' },
        ],
    },
    {
        n: '', en: 'APPROACH', ja: '考え方と立ち位置', anchor: '#approach', color: '#F1EDE4',
        desc: 'このライブラリがどこに立っているか。使命、中庸、医療との距離感、栄養学の歴史。',
        pages: [
            { href: '/mission', label: '使命' },
            { href: '/balance', label: 'バランス（中庸）' },
            { href: '/integrative-medicine', label: '統合医療' },
            { href: '/medical-roles', label: '医療の役割' },
            { href: '/nutrition-history', label: '栄養学の歴史' },
            { href: '/health-check-guide', label: '健康診断の読み方' },
        ],
    },
];

// ── インフォグラフィック部品 ─────────────────────────────
const byAnchor = Object.fromEntries(sections.map((s) => [s.anchor, s])) as Record<string, Sec>;

function Chips({ s, limit }: { s: Sec; limit?: number }) {
    return (
        <div className="mt-3 flex flex-wrap gap-1.5">
            {(limit ? s.pages.slice(0, limit) : s.pages).map((p) => (
                <Link key={p.href} href={p.href}
                    className="text-[11px] px-2.5 py-1 rounded-full bg-white border border-[#1A1A1A]/15 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">
                    {p.label}
                </Link>
            ))}
        </div>
    );
}

/** セクションの箱：番号・見出し・一言・入口チップ */
function Node({ s, children, className = '' }: { s: Sec; children?: React.ReactNode; className?: string }) {
    return (
        <div className={`rounded-2xl border border-black p-4 md:p-5 flex flex-col ${className}`} style={{ background: s.color }}>
            <div className="flex items-center gap-2.5">
                <a href={`/library${s.anchor}`}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-[#1A1A1A] bg-white border border-black shrink-0 hover:bg-[#1A1A1A] hover:text-white transition-colors"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{s.n || '・'}</a>
                <div className="min-w-0">
                    <div className="text-[9px] font-bold tracking-widest text-[#1A1A1A]/45 leading-none" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{s.en}</div>
                    <a href={`/library${s.anchor}`} className="text-base md:text-lg font-bold text-[#1A1A1A] leading-tight hover:underline decoration-2 underline-offset-2">{s.ja}</a>
                </div>
            </div>
            <p className="mt-2 text-xs text-[#1A1A1A]/75 leading-relaxed">{s.desc}</p>
            {children}
            <Chips s={s} />
        </div>
    );
}

/** 箱の中の「流れ」：A → B → C */
function Chain({ items, accent }: { items: { href: string; label: string }[]; accent: string }) {
    return (
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
            {items.map((it, i) => (
                <div key={it.href} className="flex items-center gap-1.5">
                    <Link href={it.href} className="text-xs font-bold text-[#1A1A1A] px-2.5 py-1 rounded-lg border border-black bg-white/80 hover:bg-white transition-colors whitespace-nowrap">{it.label}</Link>
                    {i < items.length - 1 && <span className="text-sm font-bold" style={{ color: accent }}>→</span>}
                </div>
            ))}
        </div>
    );
}

/** 縦の矢印と、その段の意味 */
function Arrow({ label }: { label: string }) {
    return (
        <div className="flex flex-col items-center py-1" aria-hidden="true">
            <span className="w-0.5 h-4 bg-[#1A1A1A]/40" />
            <span className="my-1 text-[11px] md:text-xs font-bold text-[#1A1A1A] bg-white border border-[#1A1A1A]/30 rounded-full px-3 py-1">{label}</span>
            <span className="w-0.5 h-4 bg-[#1A1A1A]/40" />
            <span className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-[#1A1A1A]/40" />
        </div>
    );
}

export default function LibraryMapPage() {
    const intro = byAnchor['#intro'], map = byAnchor['#map'], food = byAnchor['#food'], life = byAnchor['#lifestyle'];
    const organs = byAnchor['#organs'], mech = byAnchor['#mechanism'], aging = byAnchor['#aging'], horm = byAnchor['#hormones'];
    const mind = byAnchor['#mind'], frontier = byAnchor['#frontier'], symptoms = byAnchor['#symptoms'], thoughts = byAnchor['#thoughts'], approach = byAnchor['#approach'];
    const lens = [
        { href: '/genes', en: 'GENES', ja: '遺伝子', role: '設計図', note: '生まれ持った体質', color: '#D7F0E8' },
        { href: '/biomarkers', en: 'BIOMARKERS', ja: '血液検査', role: '現在地', note: '今の体の状態', color: '#DCE8F0' },
        { href: '/nutrients', en: 'NUTRIENTS', ja: '栄養素', role: '材料', note: '体をつくり、整える', color: '#FFE4D2' },
    ];
    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#FFF1DF' }}>
            <img loading="lazy" decoding="async" src="/images/for-you/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block mf-deco-flip"
                style={{ top: '-48px', right: '0', width: '260px' }} />
            <img loading="lazy" decoding="async" src="/images/misc/24.png" alt="" className="absolute pointer-events-none mf-deco mf-deco-delay"
                style={{ bottom: '8px', left: '8px', width: '260px' }} />

            <JsonLd data={medicalWebPage({ name: 'ライブラリマップ｜全体の構造をひと目で', description: 'ライブラリの全11セクションの構造を、インフォグラフィックでひと目に。代表ページへの入口つきライブラリマップ。', path: '/library/map' })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: 'ライブラリマップ', path: '/library/map' }])} />

            <article className="max-w-[920px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: 'ライブラリマップ' }]} />
                <header className="mb-8 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>LIBRARY MAP</p>
                    <h1 className="text-3xl md:text-5xl font-bold mt-4 mb-5 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        ライブラリマップ
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-loose max-w-[600px] mx-auto">
                        上から下へ、<strong>体の外側から内側へ</strong>。何を入れ、体の中で何が起き、崩れるとどうなるか。その流れに沿って、11のセクションを並べました。
                    </p>
                </header>

                {/* 凡例 */}
                <div className="mb-8 flex flex-wrap justify-center gap-1.5">
                    {sections.map((s) => (
                        <a key={s.anchor} href={`/library${s.anchor}`}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#1A1A1A]/15 text-xs font-bold text-[#1A1A1A] hover:border-[#1A1A1A] transition-colors"
                            style={{ background: s.color }}>
                            {s.n && <span className="opacity-60">{s.n}</span>}{s.ja}
                        </a>
                    ))}
                </div>

                {/* ── 0. はじめに ── */}
                <div>
                    <Node s={intro} />
                </div>

                <Arrow label="体を読むための、3つのレンズ" />

                {/* ── 1. 身体の地図：遺伝子 × 血液検査 × 栄養素 ── */}
                <div className="rounded-2xl border border-black p-4 md:p-5" style={{ background: map.color }}>
                    <div className="flex items-center gap-2.5 mb-3">
                        <a href="/library#map" className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-[#1A1A1A] bg-white border border-black shrink-0 hover:bg-[#1A1A1A] hover:text-white transition-colors" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>1</a>
                        <div>
                            <div className="text-[9px] font-bold tracking-widest text-[#1A1A1A]/45 leading-none" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{map.en}</div>
                            <a href="/library#map" className="text-base md:text-lg font-bold text-[#1A1A1A] leading-tight hover:underline decoration-2 underline-offset-2">{map.ja}</a>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr_auto_1fr] items-stretch gap-2">
                        {lens.map((l, i) => (
                            <Fragment key={l.href}>
                                <Link href={l.href} className="group rounded-xl border border-black p-4 text-center hover:shadow-lg hover:-translate-y-0.5 transition-all" style={{ background: l.color }}>
                                    <div className="text-[9px] font-bold tracking-widest text-[#1A1A1A]/45" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{l.en}</div>
                                    <div className="text-lg md:text-xl font-bold text-[#1A1A1A] leading-tight mt-0.5">{l.ja}</div>
                                    <div className="inline-block mt-1.5 text-[11px] font-bold px-2 py-0.5 rounded-full bg-white/80 border border-[#1A1A1A]/20 text-[#1A1A1A]">{l.role}</div>
                                    <div className="text-xs text-[#1A1A1A]/70 mt-1.5">{l.note}</div>
                                </Link>
                                {i < lens.length - 1 && <div className="hidden sm:flex items-center justify-center text-2xl font-bold text-[#1A1A1A]/60" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>×</div>}
                            </Fragment>
                        ))}
                    </div>
                    <p className="mt-3 text-xs text-[#1A1A1A]/75 leading-relaxed text-center">3つを重ねると、自分の体への理解が立体的になります。すべてのページは、このレンズで読みます。</p>
                </div>

                <Arrow label="何を入れて、どう動かすか（体の外側）" />

                {/* ── 2・3. 食べ物 / 生活習慣 ── */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Node s={food} />
                    <Node s={life} />
                </div>

                <Arrow label="体の中で起きていること（細胞の内側）" />

                {/* ── 5. 身体の仕組み（中心）＋ 4. 臓器 / 7. ホルモン ── */}
                <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr_1fr] gap-4 items-stretch">
                    <Node s={organs} className="order-2 md:order-1" />
                    <Node s={mech} className="order-1 md:order-2 md:ring-4 md:ring-[#41C9B4]/30">
                        <Chain accent="#2FB59F" items={[
                            { href: '/mitochondria', label: 'ミトコンドリア' },
                            { href: '/energy', label: 'エネルギー' },
                            { href: '/cell-metabolism', label: '代謝と細胞' },
                        ]} />
                    </Node>
                    <Node s={horm} className="order-3" />
                </div>

                <Arrow label="土台が崩れると（さびる・こげる・くすぶる）" />

                {/* ── 6. 老化と不調 → 現代病 ／ 8. 心とからだ ── */}
                <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-4">
                    <Node s={aging}>
                        <Chain accent="#E07A6A" items={[
                            { href: '/oxidative-stress', label: '酸化' },
                            { href: '/glycation', label: '糖化' },
                            { href: '/inflammation', label: '炎症' },
                            { href: '/diseases', label: '現代病' },
                        ]} />
                    </Node>
                    <Node s={mind} />
                </div>

                <Arrow label="不調から逆引きする" />

                {/* ── 10. 症状から引く ── */}
                <div>
                    <Node s={symptoms} />
                </div>

                {/* ── 視野を広げる ── */}
                <div className="mt-10 mb-4 flex items-center gap-3">
                    <span className="flex-1 h-px bg-[#1A1A1A]/20" />
                    <span className="text-xs font-bold tracking-widest text-[#1A1A1A]/60" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>視野を広げる</span>
                    <span className="flex-1 h-px bg-[#1A1A1A]/20" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Node s={frontier} />
                    <Node s={thoughts} />
                    <Node s={approach} />
                </div>

                <p className="text-xs text-[#1A1A1A]/55 mt-5 text-center leading-relaxed">
                    ※ 各セクションには、ここに挙げた以外にも多くのページがあります。チップは代表的な入口です。
                </p>

                <div className="text-center mt-10 flex flex-wrap justify-center gap-3">
                    <Link href="/library" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">ライブラリ全体を見る →</Link>
                    <Link href="/textbook" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">教科書で順に読む →</Link>
                </div>
            </article>
        </div>
    );
}
