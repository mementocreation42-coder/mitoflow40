import Link from 'next/link';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: '食のテーマ ｜ 小麦・米・断食・カロリー・気をつけたい食品・スパイス | Mitoflow40',
    description: '「小麦は悪い？」「玄米が正義？」「食べない時間は効く？」「カロリーは健康の指標？」。食卓でよく迷う6つのテーマを、断定せずに切り分けて整理した読みものの入口です。',
    alternates: { canonical: 'https://mitoflow40.com/food-topics' },
    openGraph: {
        siteName: 'Mitoflow40',
        locale: 'ja_JP',
        title: '食のテーマ | Mitoflow40',
        description: '食卓でよく迷う6つのテーマを、断定せずに切り分けて整理。',
        url: 'https://mitoflow40.com/food-topics',
        type: 'article',
    },
};

const topics = [
    { href: '/wheat', en: 'WHEAT', ja: '小麦と健康', color: '#F6E9CF', q: '「小麦は体に悪い」は本当？', body: '血糖・グルテン・精製・超加工に切り分けて、上手なつき合い方を中立に。' },
    { href: '/rice', en: 'RICE', ja: '白米・玄米の真実', color: '#F3EEDC', q: '「玄米は正義、白米は悪」は本当？', body: '血糖・栄養・フィチン酸・ヒ素まで、フェアに比べて自分に合う一杯を。' },
    { href: '/fasting', en: 'FASTING', ja: '食べない時間の力', color: '#E6E0F2', q: '「食べない時間をつくる」という選択', body: '断食・空腹の効果と、向く人・向かない人を安全第一で。' },
    { href: '/caution-foods', en: 'CAUTION FOODS', ja: '気をつけたい食品', color: '#CDEBE2', q: '「食べてはいけない」ではなく', body: '頻度と量に気をつけたい8つを、減らし方・代わりとセットで。' },
    { href: '/calories', en: 'CALORIES', ja: 'カロリーの誤解', color: '#FBEBD5', q: 'カロリーは「燃料の量」であって健康の指標ではない', body: 'なぜカロリーで考えるのか（歴史）、5つの誤解、そして本体であるATPの視点まで。' },
    { href: '/spices', en: 'SPICES', ja: 'スパイスの歴史と現在', color: '#FBE3D0', q: 'スパイスはかつて薬だった', body: '効能の期待と、確かめられていること・まだ言えないことを分けて、台所での使い方に。' },
];

export default function FoodTopicsPage() {
    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#FBE9D0' }}>
            <img loading="lazy" decoding="async" src="/images/for-you/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block mf-deco-flip"
                style={{ top: '-48px', right: '0', width: '260px' }} />
            <img loading="lazy" decoding="async" src="/images/misc/24.png" alt="" className="absolute pointer-events-none mf-deco mf-deco-delay"
                style={{ bottom: '8px', left: '8px', width: '260px' }} />

            <JsonLd data={medicalWebPage({ name: '食のテーマ', description: '食卓でよく迷う6つのテーマを、断定せずに切り分けて整理。', path: '/food-topics' })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: '食べ物', path: '/library#food' }, { name: '食のテーマ', path: '/food-topics' }])} />

            <div className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '食べ物', href: '/library#food' }, { name: '食のテーマ' }]} />
                <header className="mb-10 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>FOOD TOPICS</p>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        FOOD TOPICS
                        <span className="block text-base md:text-lg mt-2 text-[#1A1A1A]/70" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>食のテーマ</span>
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-relaxed max-w-[560px] mx-auto">
                        食卓でよく迷う<strong>{topics.length}つのテーマ</strong>。「良い・悪い」で決めつけず、<strong>何が問題で、何がそうでないか</strong>を切り分けて読めるようにしました。
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
                            <p className="text-sm font-bold text-[#1A1A1A]/80 mb-1">{t.q}</p>
                            <p className="text-sm text-[#1A1A1A]/75 leading-relaxed mb-4 flex-1">{t.body}</p>
                            <span className="inline-flex w-fit items-center gap-1 px-4 py-1.5 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>読む <span className="group-hover:translate-x-1 transition-transform">→</span></span>
                        </Link>
                    ))}
                </div>

                <div className="mt-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-xl font-bold text-[#1A1A1A] mb-3 border-l-4 border-[#FF9855] pl-3 leading-tight">読み方のコツ</h2>
                    <p className="text-[#4A4A4A] leading-loose">
                        どのテーマも「一律に良い・悪い」とは書いていません。<strong>血糖・栄養・加工度・量と頻度</strong>のどこに話があるのかを分けて読むと、自分の食卓で何を変えればいいかが見えてきます。個別の食材は <Link href="/foods" className="underline font-bold">食べ物一覧</Link>、材料そのものは <Link href="/nutrients" className="underline font-bold">栄養素</Link> へ。
                    </p>
                </div>
            </div>
        </div>
    );
}
