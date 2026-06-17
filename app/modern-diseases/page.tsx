import Link from 'next/link';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: '現代病とは ｜ なぜ便利な暮らしが人を病気にするのか | Mitoflow40',
    description: '生活習慣病、慢性炎症、自律神経の乱れ、睡眠負債、デジタル疲労、座りすぎ、孤独——現代病の多くは「体の進化」と「変わりすぎた環境」のミスマッチから生まれます。現代の暮らしが体に何をしているのかを俯瞰し、対策につながる各テーマへ案内します。',
    alternates: { canonical: 'https://mitoflow40.com/modern-diseases' },
    openGraph: {
        title: '現代病とは | Mitoflow40',
        description: '体の進化と、変わりすぎた環境のミスマッチ。現代病の正体を俯瞰し、対策へつなぐ。',
        url: 'https://mitoflow40.com/modern-diseases',
        type: 'article',
    },
};

const mismatches = [
    { old: '飢えと闘う体', now: '飽食・超加工食品', result: '肥満・2型糖尿病・血糖の乱高下', href: '/blood-sugar' },
    { old: 'よく動く体', now: '座りっぱなしの生活', result: '代謝低下・筋力低下・血流の停滞', href: '/exercise' },
    { old: '太陽と眠るリズム', now: '夜更かし・人工の光', result: '睡眠負債・体内時計の乱れ', href: '/circadian-rhythm' },
    { old: '一時的なストレス', now: '終わらない慢性ストレス', result: '自律神経の乱れ・心身の消耗', href: '/stress' },
    { old: 'きれいな空気・水', now: '化学物質・有害物質', result: '解毒の負担・慢性炎症', href: '/reduce-toxins' },
    { old: '群れで暮らす社会性', now: '孤立・つながりの希薄化', result: '孤独感・メンタルへの影響', href: '/spirituality' },
];

const groups = [
    {
        title: '代謝の現代病',
        note: '食べすぎ・動かなさすぎが招く、エネルギー代謝のつまずき。',
        items: [
            { href: '/blood-sugar', label: '血糖の乱高下' },
            { href: '/glycation', label: '糖化（こげる）' },
            { href: '/oxidative-stress', label: '酸化ストレス（さびる）' },
            { href: '/inflammation', label: '慢性炎症（くすぶる）' },
        ],
    },
    {
        title: '神経・心の現代病',
        note: '終わらないストレスと刺激過多が、自律神経と心をすり減らす。',
        items: [
            { href: '/stress', label: 'ストレス' },
            { href: '/autonomic-nervous-system', label: '自律神経の乱れ' },
            { href: '/anxiety', label: '不安と体' },
            { href: '/mood-nutrition', label: '気分と栄養' },
        ],
    },
    {
        title: 'リズムの現代病',
        note: '夜更かし・光・不規則が、体内時計と回復を狂わせる。',
        items: [
            { href: '/sleep', label: '睡眠負債' },
            { href: '/circadian-rhythm', label: '体内時計の乱れ' },
            { href: '/sunlight', label: '日光不足' },
        ],
    },
    {
        title: '環境・腸の現代病',
        note: '加工食品・化学物質・抗菌しすぎが、腸と解毒に負担をかける。',
        items: [
            { href: '/gut-health', label: '腸内環境の乱れ' },
            { href: '/gut-troubles', label: 'リーキーガット等' },
            { href: '/reduce-toxins', label: '有害物質を減らす' },
            { href: '/wheat', label: '小麦・超加工食品' },
            { href: '/caution-foods', label: '気をつけたい食品' },
        ],
    },
];

export default function ModernDiseasesPage() {
    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#F0E2D8' }}>
            <img loading="lazy" decoding="async" src="/images/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block"
                style={{ top: '0', right: '-40px', width: '260px', transform: 'scaleY(-1)' }} />
            <img loading="lazy" decoding="async" src="/images/24.png" alt="" className="absolute pointer-events-none"
                style={{ bottom: '-40px', left: '-40px', width: '260px' }} />

            <JsonLd data={medicalWebPage({ name: '現代病とは', description: '体の進化と、変わりすぎた環境のミスマッチ。現代病の正体を俯瞰し、対策へつなぐ。', path: '/modern-diseases' })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: '身体の仕組み', path: '/library#mechanism' }, { name: '現代病', path: '/modern-diseases' }])} />

            <article className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '身体の仕組み', href: '/library#mechanism' }, { name: '現代病' }]} />
                <header className="mb-12 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>MODERN DISEASES</p>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        MODERN DISEASES
                        <span className="block text-base md:text-lg mt-2 text-[#1A1A1A]/70" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>現代病とは</span>
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-relaxed max-w-[560px] mx-auto">
                        私たちの体は、何百万年もかけて「昔の環境」に適応してきました。現代病の多くは、<strong>体の進化</strong>と、ここ百年で<strong>変わりすぎた環境</strong>との「ズレ」から生まれます。
                    </p>
                </header>

                {/* 現代病とは */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#FF9855] pl-3 leading-tight">現代病は「ミスマッチ病」</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        がん・心臓病・糖尿病・うつ——こうした不調の多くは、ひとつの病原菌が原因ではありません。むしろ、<strong>飽食・運動不足・夜更かし・慢性ストレス・化学物質・孤立</strong>といった、現代の暮らし方が積み重なって生まれます。
                        {'\n\n'}
                        ポイントは、私たちの体が今も<strong>「飢えと闘い、よく動き、太陽とともに眠る」時代の設計のまま</strong>だということ。環境だけが急速に変わり、体が追いつけていない——この<strong>進化と環境のミスマッチ</strong>こそが、現代病の共通の根っこです。だから対策も「ひとつの特効薬」ではなく、<strong>暮らしを少しずつ体に合わせ直すこと</strong>になります。
                    </p>
                </section>

                {/* ミスマッチ一覧 */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#FF9855] pl-3 leading-tight">体の「設計」と、現代の「環境」のズレ</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">かつては生存に有利だった体の仕組みが、現代の環境では裏目に出てしまう。代表的なズレを並べてみます。</p>
                    <div className="space-y-3">
                        {mismatches.map((m) => (
                            <Link key={m.old} href={m.href} className="group block bg-white/70 rounded-2xl p-5 border border-black hover:shadow-lg hover:-translate-y-0.5 transition-all">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                                    <span className="text-sm font-bold text-[#1A1A1A]/70 sm:w-[150px] flex-shrink-0">{m.old}</span>
                                    <span className="hidden sm:inline text-[#FF9855] font-bold">→</span>
                                    <span className="text-sm font-bold text-[#1A1A1A] flex-1">{m.now}</span>
                                </div>
                                <p className="text-xs text-[#4A4A4A] leading-relaxed mt-2">招きやすい不調：<strong>{m.result}</strong><span className="text-[#41C9B4] font-bold ml-2 group-hover:translate-x-0.5 inline-block transition-transform">詳しく →</span></p>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* テーマ別 */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#FF9855] pl-3 leading-tight">テーマ別に深掘りする</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">現代病を4つの切り口に分けました。気になるところから読み進めてください。</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {groups.map((g) => (
                            <div key={g.title} className="bg-white/70 rounded-2xl p-5 border border-black">
                                <div className="font-bold text-[#1A1A1A] mb-1">{g.title}</div>
                                <p className="text-xs text-[#4A4A4A] leading-relaxed mb-3">{g.note}</p>
                                <div className="flex flex-wrap gap-2">
                                    {g.items.map((it) => (
                                        <Link key={it.href} href={it.href} className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">{it.label}</Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 具体的な現代病 */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#FF9855] pl-3 leading-tight">具体的には、こんな病気・不調</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">「現代病」と呼ばれるものを、身近な病名で見てみましょう。どれも、暮らしや環境の変化と深く結びついています。</p>

                    {/* 花粉症・アレルギーを大きく */}
                    <div className="bg-white/70 rounded-2xl p-6 border border-black mb-4">
                        <div className="text-[10px] font-bold tracking-widest text-[#41C9B4] mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>ALLERGY ／ アレルギーの時代</div>
                        <div className="font-bold text-[#1A1A1A] mb-2 text-lg">花粉症・アレルギー</div>
                        <p className="text-sm text-[#4A4A4A] leading-loose whitespace-pre-line">
                            花粉症は、まさに現代に急増した病気です。背景には、戦後に植えられたスギ林の増加など環境の変化に加え、「<strong>衛生仮説</strong>」と呼ばれる考え方があります。これは、<strong>清潔になりすぎた環境で、幼い頃に多様な菌に触れる機会が減り、免疫が“暴走しやすく”なった</strong>のではないか、という見方です。
                            {'\n\n'}
                            花粉症・アトピー・食物アレルギー・ぜんそくは、いずれも<strong>免疫の過剰反応</strong>という共通点を持ちます。腸内環境や慢性炎症とも関わりが深く、まさに「現代病」を象徴する不調群です。
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                            {[{ href: '/gut-health', label: '腸内環境' }, { href: '/inflammation', label: '慢性炎症' }, { href: '/reduce-toxins', label: '有害物質を減らす' }].map((l) => (
                                <Link key={l.href} href={l.href} className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">{l.label}</Link>
                            ))}
                        </div>
                    </div>

                    {/* 病名グリッド */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                            { name: '2型糖尿病・肥満（メタボ）', note: '食べすぎ・運動不足・血糖の乱れが土台。代謝の現代病の代表格。', href: '/diabetes' },
                            { name: '高血圧・脂質異常症', note: '食事・運動・ストレス・肥満が積み重なって進む、自覚の乏しい不調。', href: '/inflammation' },
                            { name: 'うつ・適応障害', note: '慢性ストレス・睡眠不足・孤立・栄養の偏りなど、心も“体から”影響を受ける。', href: '/anxiety' },
                            { name: '過敏性腸症候群（IBS）', note: 'お腹の不調と脳・ストレスの強い結びつき。脳腸相関の代表例。', href: '/gut-troubles' },
                            { name: '逆流性食道炎・胃の不調', note: '食習慣・肥満・ストレスなどが関わる、増えている消化器の不調。', href: '/digestion' },
                            { name: '睡眠障害・睡眠時無呼吸', note: '夜更かし・光・肥満などが背景。あらゆる現代病の土台を崩す。', href: '/sleep' },
                            { name: '片頭痛・慢性的な頭痛', note: 'ストレス・睡眠・血糖・自律神経など、複数の要因が絡む。', href: '/autonomic-nervous-system' },
                            { name: '自己免疫疾患', note: '免疫が自分を攻撃する病気。腸内環境や炎症との関連が研究されている。', href: '/inflammation' },
                            { name: 'ドライアイ・眼精疲労', note: '長時間の画面・まばたき減少による、デジタル時代ならではの不調。', href: '/wearables' },
                            { name: '生活習慣型の認知機能低下', note: '血糖・血管・睡眠・運動と深く関わり、「第3の糖尿病」とも。', href: '/blood-sugar' },
                        ].map((d) => (
                            <Link key={d.name} href={d.href} className="group bg-white/70 rounded-xl p-4 border border-[#1A1A1A]/15 hover:border-black hover:shadow-sm transition-all">
                                <div className="font-bold text-[#1A1A1A] text-sm mb-0.5 group-hover:text-[#FF9855] transition-colors">{d.name}</div>
                                <p className="text-xs text-[#4A4A4A] leading-relaxed">{d.note}</p>
                            </Link>
                        ))}
                    </div>
                    <p className="text-xs text-[#4A4A4A]/60 mt-4 leading-relaxed">※ ここでの分類は、暮らしとの関わりを理解するためのものです。診断・治療は医療機関で。気になる症状は早めに相談してください。</p>
                </section>

                {/* 共通の打ち手 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#FF9855] pl-3 leading-tight">バラバラに見えて、打ち手は共通している</h2>
                    <p className="text-[#4A4A4A] leading-loose mb-5">
                        現代病は名前こそ違っても、根っこが同じなので、効く対策も大きく重なります。新しい何かを足す前に、まずは<strong>「体が想定している暮らし」に近づける</strong>こと。これが、あらゆる現代病に効く土台です。
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                            { head: 'よく動く', body: '座りっぱなしを断つ。こまめに立つ・歩くだけでも代謝と血流が変わる。', href: '/exercise' },
                            { head: '光とリズムを整える', body: '朝に光を浴び、夜は暗く。体内時計が整うと睡眠・代謝・気分が連動して整う。', href: '/circadian-rhythm' },
                            { head: '食べ方を整える', body: '超加工食品を減らし、血糖の波をなだらかに。腸を支える食物繊維と発酵食品を。', href: '/blood-sugar' },
                            { head: '休む・つながる', body: '慢性ストレスを抜く時間と、人とのつながりを意識的に。心の現代病の土台になる。', href: '/stress' },
                        ].map((s) => (
                            <Link key={s.head} href={s.href} className="group bg-white/70 rounded-xl p-4 border border-[#1A1A1A]/15 hover:border-black hover:shadow-sm transition-all">
                                <div className="font-bold text-[#1A1A1A] mb-0.5 group-hover:text-[#FF9855] transition-colors">{s.head}</div>
                                <p className="text-sm text-[#4A4A4A] leading-snug">{s.body}</p>
                            </Link>
                        ))}
                    </div>
                    <p className="text-xs text-[#4A4A4A]/60 mt-4 leading-relaxed">※ すでに症状や持病がある場合は、自己判断せず医療機関に相談を。ここでの内容は、未病の段階で暮らしを整えるための知識です。</p>
                </section>

                {/* もっと学ぶ */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#FF9855] pl-3 leading-tight">あわせて読む</h2>
                    <div className="flex flex-wrap gap-2">
                        {[
                            { href: '/health-philosophy', label: '健康とは' },
                            { href: '/mission', label: 'なぜ未病予防か' },
                            { href: '/symptoms', label: '症状から引く' },
                            { href: '/inflammation', label: '慢性炎症' },
                            { href: '/mitochondria', label: 'ミトコンドリア' },
                            { href: '/library', label: 'Library 全体' },
                        ].map((l) => (
                            <Link key={l.href} href={l.href} className="px-4 py-2 rounded-full bg-white border border-[#1A1A1A] text-sm font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white transition-colors">{l.label} →</Link>
                        ))}
                    </div>
                </section>

                <div className="text-center">
                    <Link href="/library" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">← Library に戻る</Link>
                </div>
            </article>
        </div>
    );
}
