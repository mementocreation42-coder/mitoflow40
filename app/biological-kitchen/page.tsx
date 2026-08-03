import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';

// 非公開の構想ページ。検索・サイトマップ・ナビには載せない（URLを知る人だけの壁打ち用）。
export const metadata = {
    title: 'Biological Kitchen（構想）｜ 料理を生化学として捉え直す | Mitoflow40',
    description: '血液データに合わせたパーソナルな料理へ——その前段階として、料理を「味と栄養素」ではなく「体の中で起きる生化学反応」として捉え直す取り組みの構想メモ。',
    robots: { index: false, follow: false },
};

// 到達したい最終形へ向けた3つの段階
const phases = [
    {
        tag: 'PHASE 0',
        title: 'コンセプトを言葉にする',
        state: 'いま',
        body: '「料理を生化学として捉え直す」とはどういうことかを、自分の言葉で定義する段階。レシピでも店でもなく、まず“見方”をつくる。このページ自体がPhase 0。',
    },
    {
        tag: 'PHASE 1',
        title: '生化学のレシピ',
        state: 'つぎ',
        body: 'ひと皿を「口に入れてから、細胞でエネルギーになるまで」で語り直す。食材の組み合わせや調理を、消化・吸収・血糖の動き・ミトコンドリアでの代謝から設計する。まだ“万人向け”。',
    },
    {
        tag: 'PHASE 2',
        title: '血液データに合わせた一皿',
        state: '北極星',
        body: '血液検査と生活ログから、その人のいまの体に合わせて料理を組む。同じ食材でも、誰の・どんな状態の体で起きる反応かで、最適な一皿は変わる——という前提に立つ、パーソナルな食事。',
    },
];

const questions = [
    '「生化学として捉え直す」を、どこまで踏み込んで見せるか（反応式まで見せる／体感の言葉に翻訳する）',
    'パーソナル化の入口をどこに置くか（血糖・炎症・鉄・肝機能…最初に効く指標はどれか）',
    '実態はコンテンツか、体験（ワークショップ）か、最終的に厨房を持つのか',
    '「効く食事」と語りすぎない——医療でも商品でもない立ち位置をどう保つか',
];

export default function BiologicalKitchenPage() {
    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#EAE2F0' }}>
            <img loading="lazy" decoding="async" src="/images/for-you/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block"
                style={{ top: '0', right: '-40px', width: '260px', transform: 'scaleY(-1)' }} />
            <img loading="lazy" decoding="async" src="/images/misc/24.png" alt="" className="absolute pointer-events-none"
                style={{ bottom: '-40px', left: '-40px', width: '260px' }} />

            <div className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'HOME', href: '/' }, { name: 'BIOLOGICAL KITCHEN' }]} />

                {/* 非公開バッジ */}
                <div className="flex justify-center mb-4">
                    <span className="text-[10px] font-bold tracking-widest px-3 py-1 rounded-full bg-[#1A1A1A] text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        構想メモ ／ 非公開・検討中
                    </span>
                </div>

                <header className="mb-12 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>BIOLOGICAL KITCHEN</p>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        BIOLOGICAL KITCHEN
                        <span className="block text-base md:text-lg mt-2 text-[#1A1A1A]/70" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>料理を、生化学として捉え直す</span>
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-relaxed max-w-[600px] mx-auto">
                        最終的にやりたいのは、<strong>血液データに合わせたパーソナルな料理</strong>。その手前で、料理を<strong>「味と栄養素」から「体の中で起きる反応」へ</strong>と捉え直す——そのための、まだ形になる前の構想メモです。
                    </p>
                </header>

                {/* 北極星 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <div className="text-[10px] font-bold tracking-widest text-[#41C9B4] mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>NORTH STAR ／ 最終的に目指すもの</div>
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#FF9855] pl-3 leading-tight">血液データに合わせた、あなたのための一皿</h2>
                    <p className="text-[#4A4A4A] leading-loose">
                        同じ食材でも、それが<strong>誰の、どんな状態の体に入るか</strong>で、中で起きることは変わります。血糖が乱れやすい人、鉄が足りない人、肝臓が疲れている人——その人の<strong>いまの体</strong>を血液検査と生活ログから読み、それに合わせて料理を組み立てる。それが最終的に届けたい姿です。
                        {'\n\n'}
                        ただしそこは<strong>いきなりは行けない</strong>。まず「料理を生化学として見る」土台を、自分の中にも、伝え方にも作る必要があります。だからこのプロジェクトは、北極星から逆算した<strong>手前の一歩</strong>から始めます。
                    </p>
                </section>

                {/* 前段階：料理を生化学として */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#FF9855] pl-3 leading-tight">レシピを、反応の順番で読み直す</h2>
                    <p className="text-[#4A4A4A] leading-loose">
                        料理はこれまで、ほとんど<strong>「味」と「栄養素の量」</strong>で語られてきました。おいしいか、タンパク質が何g入っているか。でも体にとっての本体は、食材そのものではなく、<strong>それが体の中で引き起こす一連の反応</strong>です。
                        {'\n\n'}
                        噛んで、消化されて、吸収されて、血糖が動いて、細胞に運ばれて、ミトコンドリアで<strong>ATP（エネルギー）</strong>になる。この順番のどこで、何が起きるか——「バイオロジカルキッチン」は、ひと皿をその<strong>反応のプロセス</strong>として捉え直す試みです。何kcalかより、<strong>その料理が体の中でどう働くか</strong>を主役にする。
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                        {[{ href: '/food-journey', label: '食べてから動くまで' }, { href: '/atp', label: 'ATP' }, { href: '/calories', label: 'カロリーの誤解' }, { href: '/precision-nutrition', label: '精密栄養学' }].map((l) => (
                            <Link key={l.href} href={l.href} className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">{l.label}</Link>
                        ))}
                    </div>
                </section>

                {/* フェーズ */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#FF9855] pl-3 leading-tight">北極星への三段階</h2>
                    <div className="space-y-4">
                        {phases.map((p) => (
                            <div key={p.tag} className="bg-white/70 rounded-2xl p-6 md:p-7 border border-black">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-[10px] font-bold tracking-widest text-[#41C9B4]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{p.tag}</span>
                                    <span className="text-[10px] font-bold tracking-widest px-2 py-0.5 rounded-full bg-[#FF9855]/15 text-[#FF9855]">{p.state}</span>
                                </div>
                                <h3 className="text-lg md:text-xl font-bold text-[#1A1A1A] mb-2 leading-snug">{p.title}</h3>
                                <p className="text-sm text-[#4A4A4A] leading-loose">{p.body}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 問い */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#FF9855] pl-3 leading-tight">これから決めること</h2>
                    <ul className="space-y-3">
                        {questions.map((q, i) => (
                            <li key={i} className="flex gap-3 text-[#4A4A4A] leading-loose">
                                <span className="font-bold text-[#FF9855] shrink-0" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Q{i + 1}</span>
                                <span>{q}</span>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* 立ち位置（締めの定型） */}
                <section className="mb-4 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#FF9855] pl-3 leading-tight">立ち位置</h2>
                    <p className="text-[#4A4A4A] leading-loose">
                        これは<strong>治療でも、特別な食事療法でもありません</strong>。必要な医療を遠ざけるものでもなく、「これさえ食べれば」と煽るものでもない。料理を<strong>体の中の反応から見る</strong>という一つの視点を差し出し、判断の主役はあくまで<strong>食べる本人</strong>——という前提を、最初から崩さずにいたいと思っています。
                    </p>
                    <p className="text-xs text-[#1A1A1A]/40 mt-5">※ このページは公開ナビ・検索には載せていない内部構想メモです。</p>
                </section>
            </div>
        </div>
    );
}
