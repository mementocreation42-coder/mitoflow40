import Link from 'next/link';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: '代謝と細胞のしくみ ｜ 解糖系からオートファジーまで、細胞の中の生化学 | Mitoflow40',
    description: '解糖系・TCA回路・電子伝達系・ATP・酵素・ケトン体・メチレーション・血糖・自律神経・体内時計・腸・消化・オートファジー。栄養や習慣が「なぜ効くのか」を、細胞の中のしくみから読み解く入口です。',
    alternates: { canonical: 'https://mitoflow40.com/cell-metabolism' },
    openGraph: {
        siteName: 'Mitoflow40',
        locale: 'ja_JP',
        title: '代謝と細胞のしくみ | Mitoflow40',
        description: '解糖系からオートファジーまで、細胞の中の生化学',
        url: 'https://mitoflow40.com/cell-metabolism',
        type: 'article',
    },
};

const topics = [
    { href: '/glycolysis', en: 'GLYCOLYSIS', ja: '解糖系', color: '#F4EFCE', body: 'ブドウ糖からエネルギーを取り出す最初のステップ。酸素いらずの速攻発電。' },
    { href: '/tca-cycle', en: 'TCA CYCLE', ja: 'TCA回路', color: '#FFE9D2', body: '食べたものをエネルギーに変える、ミトコンドリアの中心エンジン。' },
    { href: '/electron-transport-chain', en: 'ETC', ja: '電子伝達系', color: '#D9E6F2', body: '酸素を使いATPの大半を生む最終工程。TCA回路とATPの架け橋。' },
    { href: '/atp', en: 'ATP', ja: 'ATP（エネルギー通貨）', color: '#D7F0E8', body: '体のあらゆる活動を動かすエネルギー通貨。作られ方と支える栄養素。' },
    { href: '/enzymes', en: 'ENZYMES', ja: '酵素', color: '#D7F0E8', body: '体内反応を進める「触媒」。消化・代謝・補酵素の働きと、酵素ドリンクの誤解。' },
    { href: '/histamine', en: 'HISTAMINE', ja: 'ヒスタミン', color: '#F6E2DC', body: 'アレルギー・胃酸・脳の覚醒という3つの顔。分解酵素DAO/HNMTの個人差と不耐症を中立に。' },
    { href: '/acid-alkaline', en: 'ACID & ALKALINE', ja: '酸性・アルカリ性（pH）', color: '#D9E6F2', body: '血液のpHは体が厳密に管理。「アルカリ性食品で体質改善」の誤解を仕組みから解く。' },
    { href: '/ketones', en: 'KETONES', ja: 'ケトン体', color: '#E6E0F2', body: '糖が足りないとき脂肪から作る第二の燃料。代謝の柔軟性の鍵。' },
    { href: '/methylation', en: 'METHYLATION', ja: 'メチレーション', color: '#E6EFD9', body: '遺伝子・栄養素・血液検査が交わるハブ。解毒・気分・血管の土台。' },
    { href: '/blood-sugar', en: 'BLOOD SUGAR', ja: '血糖コントロール', color: '#FBEFD2', body: '食後の眠気・甘いもの渇望の正体「血糖の波」。整える食べ方。' },
    { href: '/insulin-resistance', en: 'INSULIN RESISTANCE', ja: 'インスリン抵抗性', color: '#F6E6CF', body: '血糖が上がる前から始まる代謝の変化。筋肉・脂肪・肝臓と膵臓の負担をつなげて理解する。' },
    { href: '/autonomic-nervous-system', en: 'ANS & HRV', ja: '自律神経とHRV', color: '#DCE7F0', body: 'アクセルとブレーキのバランス。Apple Watchで測れるHRV。' },
    { href: '/circadian-rhythm', en: 'CIRCADIAN RHYTHM', ja: 'サーカディアンリズム', color: '#E2E0F0', body: '約24時間の体内時計。睡眠・ホルモン・代謝を束ねるリズム。' },
    { href: '/chrono-nutrition', en: 'CHRONO-NUTRITION', ja: '時間栄養学', color: '#F4ECDA', body: '「いつ食べるか」で体は変わる。体内時計と栄養、時間制限食を中立に。' },
    { href: '/gut-health', en: 'GUT HEALTH', ja: '腸内環境（腸活）', color: '#DCEFE4', body: '免疫・気分・解毒の交差点。腸内細菌の多様性と、腸活の基本。' },
    { href: '/microbiome', en: 'MICROBIOME', ja: '腸内フローラ・プレ/プロ', color: '#DCEFE4', body: '善玉菌・悪玉菌のバランスと、プレ/プロ/シン/ポストバイオティクスの違い。' },
    { href: '/gut-brain', en: 'GUT-BRAIN AXIS', ja: '脳腸相関', color: '#DCEFE4', body: '腸と脳は会話している。お腹の調子と気分・集中・睡眠のつながり。' },
    { href: '/digestion', en: 'DIGESTION & ABSORPTION', ja: '消化・吸収', color: '#DCEFE4', body: '「食べた」と「吸収できた」は別の話。消化のリレーと酵素、吸収を高める習慣。' },
    { href: '/autophagy', en: 'AUTOPHAGY', ja: 'オートファジー', color: '#E7EEDA', body: '細胞の自己リサイクル。ミトコンドリアの質を保つ仕組み。' },
];

export default function HubPage() {
    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#D7F0E8' }}>
            <img loading="lazy" decoding="async" src="/images/for-you/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block mf-deco-flip"
                style={{ top: '-48px', right: '0', width: '260px' }} />
            <img loading="lazy" decoding="async" src="/images/misc/24.png" alt="" className="absolute pointer-events-none"
                style={{ bottom: '8px', left: '8px', width: '260px' }} />

            <JsonLd data={medicalWebPage({ name: '代謝と細胞のしくみ', description: '解糖系からオートファジーまで、細胞の中の生化学', path: '/cell-metabolism' })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: '身体の仕組み', path: '/library#mechanism' }, { name: '代謝と細胞のしくみ', path: '/cell-metabolism' }])} />

            <div className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '身体の仕組み', href: '/library#mechanism' }, { name: '代謝と細胞のしくみ' }]} />
                <header className="mb-10 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>CELL & METABOLISM</p>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        CELL & METABOLISM
                        <span className="block text-base md:text-lg mt-2 text-[#1A1A1A]/70" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>代謝と細胞のしくみ</span>
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-relaxed max-w-[560px] mx-auto">
                        栄養素や生活習慣がなぜ効くのか。その答えは細胞の中にあります。<strong>エネルギーを作る工程</strong>から、<strong>血糖と自律神経のリズム</strong>、<strong>腸と消化</strong>、<strong>細胞の再生</strong>まで、19のしくみを順に。
                    </p>
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {topics.map((t, i) => (
                        <Link key={t.href} href={t.href}
                            className="group flex flex-col rounded-2xl border border-black p-5 md:p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all"
                            style={{ background: t.color }}>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/50" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{t.en}</span>
                                <span className="text-xs font-bold text-[#1A1A1A]/40" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{String(i + 1).padStart(2, '0')}</span>
                            </div>
                            <div className="text-xl font-bold text-[#1A1A1A] mb-1">{t.ja}</div>
                            <p className="text-sm text-[#1A1A1A]/75 leading-relaxed mb-4 flex-1">{t.body}</p>
                            <span className="inline-flex w-fit items-center gap-1 px-4 py-1.5 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>読む <span className="group-hover:translate-x-1 transition-transform">→</span></span>
                        </Link>
                    ))}
                </div>

                <div className="mt-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-xl font-bold text-[#1A1A1A] mb-3 border-l-4 border-[#FF9855] pl-3 leading-tight">読む順番</h2>
                    <p className="text-[#4A4A4A] leading-loose">
                        最初の4つ（解糖系→TCA回路→電子伝達系→ATP）は<strong>ひと続きの工程</strong>です。ここを押さえると、ケトン体や血糖、酵素の話がつながります。先に全体像がほしいときは「ミトコンドリアとは」と「エネルギーとは」から。
                    </p>
                </div>
            </div>
        </div>
    );
}
