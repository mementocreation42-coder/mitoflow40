import Link from 'next/link';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: '心とからだ ｜ 気分・不安・ストレスを「体の土台」から読み解く | Mitoflow40',
    description: '気分や不安は「性格」や「気合い」の問題とは限りません。ストレス・HSP・気分と栄養・不安・神経炎症・片頭痛・呼吸・スピリチュアリティ・音・匂い・運動まで、心を体の側から読み解く入口です。',
    alternates: { canonical: 'https://mitoflow40.com/mind-body' },
    openGraph: {
        siteName: 'Mitoflow40',
        locale: 'ja_JP',
        title: '心とからだ | Mitoflow40',
        description: '気分・不安・ストレスを「体の土台」から読み解く',
        url: 'https://mitoflow40.com/mind-body',
        type: 'article',
    },
};

const topics = [
    { href: '/stress', en: 'STRESS', ja: 'ストレスとは', color: '#EFEAF6', body: '敵ではなく信号。コルチゾールと自律神経のしくみ。' },
    { href: '/hsp', en: 'HSP', ja: 'HSP・繊細さん', color: '#EFEAF6', body: '感覚処理感受性と遺伝子（COMT・5-HTTLPR他）。“気質”と“体の状態”を切り分ける。' },
    { href: '/mood-nutrition', en: 'MOOD & FOOD', ja: '気分と栄養', color: '#EFEAF6', body: 'セロトニン・ドーパミンの“材料”は栄養という視点。' },
    { href: '/anxiety', en: 'ANXIETY', ja: '不安と体', color: '#EFEAF6', body: '血糖・腸・睡眠など、不安を揺さぶる体の要因。' },
    { href: '/neuroinflammation', en: 'NEUROINFLAMMATION', ja: '神経炎症と心', color: '#EFEAF6', body: 'IL-6など炎症性サイトカインが脳に及ぶとき。だるさ・うつ・ブレインフォグを中立に。' },
    { href: '/migraine', en: 'MIGRAINE', ja: '片頭痛と体', color: '#EFEAF6', body: '引き金・栄養（Mg・B2・CoQ10）・危険な頭痛の見分け方。' },
    { href: '/mindfulness', en: 'BREATH', ja: 'マインドフルネス・呼吸', color: '#EFEAF6', body: '呼吸という、自律神経への手動スイッチ。' },
    { href: '/spirituality', en: 'MIND & SPIRIT', ja: 'スピリチュアリティと体', color: '#EFEAF6', body: '祈り・瞑想・つながりを“心身相関”で読み解く。' },
    { href: '/sound', en: 'SOUND', ja: '音と健康', color: '#EFEAF6', body: 'α波・振動・音楽療法と、周波数ヒーリングの潮流を中立に。' },
    { href: '/smell', en: 'SMELL', ja: '匂いと健康', color: '#EFEAF6', body: '記憶・感情・脳とのつながりと、アロマの効果の見極め。' },
    { href: '/gym-boom', en: 'GYM BOOM', ja: 'ジムの乱立を読む', color: '#EFEAF6', body: 'なぜジムは増える？運動を「買う」時代の構造と、毎日の代謝の視点を中立に。' },
    { href: '/jogging', en: 'JOGGING', ja: 'ジョギングと体', color: '#EFEAF6', body: '効果・「膝に悪い」の真偽・どれだけ走ればいいかの用量反応を中立に。' },
    { href: '/electrotherapy', en: 'ELECTROTHERAPY', ja: '電気療法とミトコンドリア', color: '#EFEAF6', body: '整体・接骨院の「電気」。低周波・EMS・微弱電流の違いと、ATPの主張の出どころを中立に。' },
];

export default function HubPage() {
    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#EFEAF6' }}>
            <img loading="lazy" decoding="async" src="/images/for-you/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block mf-deco-flip"
                style={{ top: '-48px', right: '0', width: '260px' }} />
            <img loading="lazy" decoding="async" src="/images/misc/24.png" alt="" className="absolute pointer-events-none"
                style={{ bottom: '8px', left: '8px', width: '260px' }} />

            <JsonLd data={medicalWebPage({ name: '心とからだ', description: '気分・不安・ストレスを「体の土台」から読み解く', path: '/mind-body' })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: '心とからだ', path: '/mind-body' }])} />

            <div className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '心とからだ' }]} />
                <header className="mb-10 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>MIND & BODY</p>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        MIND & BODY
                        <span className="block text-base md:text-lg mt-2 text-[#1A1A1A]/70" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>心とからだ</span>
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-relaxed max-w-[560px] mx-auto">
                        気分や不安は、「性格」や「気合い」の問題とは限りません。<strong>腸・栄養・睡眠・自律神経・血糖</strong>といった体の状態が、心の側に現れます。13のテーマを、しくみから順に。
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
                    <h2 className="text-xl font-bold text-[#1A1A1A] mb-3 border-l-4 border-[#FF9855] pl-3 leading-tight">あわせて読む</h2>
                    <p className="text-[#4A4A4A] leading-loose">
                        心の話は、<strong>腸脳相関</strong>・<strong>睡眠</strong>・<strong>自律神経</strong>・<strong>トリプトファン</strong>と地続きです。うつ・不安・燃え尽きを病気として読むときは「心の現代病」へ。つらさが強いときは、ページを読む前に専門家へ相談してください。
                    </p>
                </div>
            </div>
        </div>
    );
}
