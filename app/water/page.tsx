import Link from 'next/link';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: '水と健康 ｜ 体の約60%は水・必要量・脱水・「機能水」を中立に | Mitoflow40',
    description: '水は体の約60%を占め、運搬・体温調節・老廃物の排出・反応の場として働く、もっとも基本の「材料」です。1日に必要な水分量と脱水のサイン、軽い脱水が認知や気分に及ぼす影響、硬水と軟水の違い、そして水素水・アルカリイオン水・「構造水」など機能水の主張を、根拠の確かさで分けて中立に整理します。',
    alternates: { canonical: 'https://mitoflow40.com/water' },
    openGraph: {
        title: '水と健康 | Mitoflow40',
        description: '体の約60%は水。役割・必要量・脱水のサインと、「機能水」の主張を根拠の確かさで分けて中立に整理。',
        url: 'https://mitoflow40.com/water',
        type: 'article',
    },
};

const roles = [
    { name: '溶媒（反応の場）', note: '体内のほとんどの化学反応は、水の中で進む。栄養素やミネラルを溶かし、運び、混ぜ合わせる“場”そのもの。' },
    { name: '運搬', note: '血液の大半は水。酸素・栄養・ホルモンを全身へ届け、二酸化炭素や老廃物を回収する。' },
    { name: '体温調節', note: '汗として蒸発するときに熱を奪い、体温を一定に保つ。水は熱をためやすく、急な変化から体を守る。' },
    { name: '老廃物の排出', note: '腎臓が血液をこし、不要なものを尿として外へ。便のやわらかさにも水分が関わる。' },
    { name: 'クッション・潤滑', note: '脳脊髄液は脳を、関節液は関節を守る。涙や唾液として粘膜も潤す。' },
];

export default function WaterPage() {
    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#DEEAF2' }}>
            <img loading="lazy" decoding="async" src="/images/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block"
                style={{ top: '0', right: '-40px', width: '260px', transform: 'scaleY(-1)' }} />
            <img loading="lazy" decoding="async" src="/images/24.png" alt="" className="absolute pointer-events-none"
                style={{ bottom: '-40px', left: '-40px', width: '260px' }} />

            <JsonLd data={medicalWebPage({ name: '水と健康', description: '体の約60%は水。役割・必要量・脱水のサインと、「機能水」の主張を根拠の確かさで分けて中立に整理。', path: '/water' })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: '生活習慣', path: '/library#lifestyle' }, { name: '水と健康', path: '/water' }])} />

            <article className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '生活習慣', href: '/library#lifestyle' }, { name: '水と健康' }]} />
                <header className="mb-12 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>WATER</p>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        WATER
                        <span className="block text-base md:text-lg mt-2 text-[#1A1A1A]/70" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>水と健康</span>
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-relaxed max-w-[560px] mx-auto">
                        体の約<strong>60%</strong>は水。もっとも身近で、もっとも基本の「材料」です。だからこそ「特別な水」の話も多い領域——<strong>確かなこと</strong>と<strong>まだ確かめられていないこと</strong>を、分けて見ていきます。
                    </p>
                </header>

                {/* 水とは何か */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#FF9855] pl-3 leading-tight">水は「溶媒であり、運び屋」</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        人の体は、成人でおよそ<strong>60%</strong>が水でできています（赤ちゃんはもっと多く、加齢とともに減っていきます）。これは「乾かないため」だけの水ではありません。<strong>体の中で起きるほとんどの反応は、水の中で進みます</strong>。
                        {'\n\n'}
                        栄養素を溶かして運び、熱を逃がし、老廃物を流し出す——水は、体という<strong>化学工場の“場”そのもの</strong>です。少し足りないだけでも、運搬や反応の効率が落ち、だるさや頭のはたらきに響いてきます。
                        {'\n\n'}
                        ちなみに栄養学では、糖質・脂質・タンパク質・ビタミン・ミネラルの「五大栄養素」に水を加えて、水を<strong>“第6の栄養素”</strong>と呼ぶこともあります。カロリーはありませんが、不足すれば命に関わる——「飲み物」であると同時に、れっきとした<strong>必須栄養素</strong>なのです。
                    </p>
                    <div className="bg-white/70 rounded-2xl border border-black overflow-hidden my-5">
                        {roles.map((r, i) => (
                            <div key={r.name} className={`px-5 py-4 ${i !== 0 ? 'border-t border-[#1A1A1A]/10' : ''}`}>
                                <div className="font-bold text-[#1A1A1A] mb-0.5">{r.name}</div>
                                <p className="text-sm text-[#4A4A4A] leading-snug">{r.note}</p>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {[{ href: '/organs/kidney', label: '腎臓' }, { href: '/detox', label: '解毒' }].map((l) => (
                            <Link key={l.href} href={l.href} className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">{l.label}</Link>
                        ))}
                    </div>
                </section>

                {/* エネルギー代謝と水（TCA回路・代謝水） */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#FF9855] pl-3 leading-tight">エネルギーを生む反応にも、水は関わる</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        水は「場」を提供するだけではありません。<strong>エネルギー（ATP）をつくる反応そのものに、水が直接参加</strong>しています。細胞のエネルギー工場・ミトコンドリアで回る<strong>TCA回路（クエン酸回路）</strong>では、いくつかの段階で水が使われます。たとえば<strong>フマル酸がリンゴ酸へと変わるとき、水が1分子加わります</strong>（フマラーゼという酵素のはたらき）。回路の入口でクエン酸が作られる反応でも、水が使われています。
                        {'\n\n'}
                        さらに面白いのは、エネルギー産生の最終段階——<strong>電子伝達系</strong>です。ここでは、運ばれてきた電子が<strong>酸素と結びついて、最後に「水」になります</strong>。つまり私たちは、ATPを作りながら<strong>水そのものを生み出している</strong>のです。
                    </p>
                    <div className="rounded-xl p-4 border border-[#1A1A1A]/15 bg-white/60 mt-5">
                        <div className="text-[10px] font-bold tracking-widest text-[#41C9B4] mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>METABOLIC WATER ／ 代謝水</div>
                        <p className="text-sm text-[#4A4A4A] leading-loose">
                            こうして体内で作られる水を<strong>「代謝水」</strong>と呼びます。成人で<strong>1日およそ250〜300mL</strong>。飲む水ほど多くはありませんが、脂肪をエネルギーに変えるときにも生まれ、砂漠のラクダや冬眠中の動物が水なしで耐えられる仕組みの一つでもあります。<strong>水は飲むだけのものではなく、エネルギーを作る過程で“使われ・生まれる”もの</strong>——だから脱水は、だるさやエネルギー不足の感覚にもつながります。
                        </p>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {[{ href: '/tca-cycle', label: 'TCA回路' }, { href: '/electron-transport-chain', label: '電子伝達系' }, { href: '/mitochondria', label: 'ミトコンドリア' }, { href: '/atp', label: 'ATP' }].map((l) => (
                            <Link key={l.href} href={l.href} className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">{l.label}</Link>
                        ))}
                    </div>
                </section>

                {/* 必要量と脱水 */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#FF9855] pl-3 leading-tight">どれくらい必要？「脱水」のサイン</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">「1日2リットル」は万人共通のルールではありません。必要量は<strong>体格・気温・運動量・食事</strong>で変わり、食べ物からも水分の<strong>2〜3割</strong>ほどを得ています。数字より、<strong>体のサイン</strong>を物差しに。</p>
                    <div className="bg-white/70 rounded-2xl border border-black p-5 md:p-6 mb-4">
                        <div className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/45 mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>HOW MUCH ／ ざっくりの目安</div>
                        <p className="text-[#4A4A4A] leading-loose">
                            ひとつの目安は、<strong>体重1kgあたり約30〜35mL</strong>の総水分量。たとえば<strong>体重60kgなら、1日およそ1.8〜2.1L</strong>です。ただしこれは<strong>食事に含まれる水分も込み</strong>の数字。食べ物から2〜3割ほど摂れるので、<strong>飲み水としては1.2〜1.5L前後</strong>が、多くの人にとっての出発点になります。
                        </p>
                        <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                            {[
                                { v: '約1.2〜1.5L', k: '飲み水から' },
                                { v: '約0.6〜1L', k: '食べ物から' },
                                { v: '約0.3L', k: '体が作る（代謝水）' },
                            ].map((x) => (
                                <div key={x.k} className="rounded-xl bg-white/70 border border-[#1A1A1A]/15 py-3 px-2">
                                    <div className="font-bold text-[#1A1A1A] text-sm md:text-base" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{x.v}</div>
                                    <div className="text-[11px] text-[#4A4A4A] mt-0.5 leading-tight">{x.k}</div>
                                </div>
                            ))}
                        </div>
                        <p className="text-xs text-[#4A4A4A]/70 mt-3 leading-relaxed">※ 気温・運動・発汗・体格で大きく変わります。数字は出発点として、最後は<strong>尿の色と体調</strong>で微調整を。腎臓・心臓の治療中などで水分制限がある方は、主治医の指示を優先してください。</p>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-3 mb-4">
                        <div className="bg-white/70 rounded-xl p-5 border border-[#1A1A1A]/15">
                            <div className="text-[10px] font-bold tracking-widest text-[#41C9B4] mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>CHECK ／ 足りている目安</div>
                            <ul className="text-sm text-[#4A4A4A] leading-relaxed space-y-1 list-disc pl-4">
                                <li>尿の色が<strong>薄い黄色</strong>（濃い黄色は不足のサイン）</li>
                                <li>のどが渇く前に、こまめに飲めている</li>
                                <li>めまい・頭痛・便秘が起きていない</li>
                            </ul>
                        </div>
                        <div className="bg-white/70 rounded-xl p-5 border border-[#1A1A1A]/15">
                            <div className="text-[10px] font-bold tracking-widest text-[#C0392B] mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>SIGNS ／ 脱水のサイン</div>
                            <ul className="text-sm text-[#4A4A4A] leading-relaxed space-y-1 list-disc pl-4">
                                <li>頭痛・だるさ・集中力の低下</li>
                                <li>立ちくらみ・動悸（巡りの低下）</li>
                                <li>便秘・尿が濃い・口の渇き</li>
                            </ul>
                        </div>
                    </div>
                    <p className="text-sm text-[#4A4A4A] leading-loose">
                        逆に、短時間に<strong>飲みすぎる</strong>のも禁物です。まれですが、急に大量の水を摂ると血液中のナトリウムが薄まり、<strong>低ナトリウム血症（水中毒）</strong>を起こすことがあります。「たくさん飲むほど健康」ではなく、<strong>こまめに・適量を</strong>が基本です。とくに高齢の方は渇きを感じにくく、知らないうちに脱水が進みやすいので意識的に。
                    </p>
                </section>

                {/* 実証されていること */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <div className="inline-block text-[10px] font-bold tracking-widest text-white bg-[#41C9B4] rounded-full px-3 py-1 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>EVIDENCE ／ 比較的確かなこと</div>
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 leading-tight">「ふつうの水分補給」の確かな効果</h2>
                    <div className="space-y-3">
                        {[
                            { head: '軽い脱水でも、頭と気分に響く', body: '体重の1〜2%程度のわずかな脱水でも、集中力・短期記憶・気分・疲労感に影響することが研究で示されている。「なんとなく不調」の一因に、水分不足が隠れていることは多い。' },
                            { head: '腎臓・尿路結石・便秘', body: '十分な水分は、尿を薄く保ち尿路結石のリスクを下げ、便をやわらかくして便秘の改善にも役立つ。腎臓が老廃物を流す“流量”を支える。' },
                            { head: '電解質とのバランス', body: '水だけでなく、ナトリウム・カリウムなどの電解質との比率が大切。大量の汗をかいたとき・暑い日・運動時は、塩分も一緒に補うと吸収・保持が安定する。' },
                            { head: '高齢者・こども・暑熱環境', body: 'のどの渇きを感じにくい高齢者、体が小さいこども、暑い環境では脱水・熱中症のリスクが上がる。先回りの水分補給が予防につながる。' },
                        ].map((s) => (
                            <div key={s.head} className="flex items-start gap-4 bg-white/70 rounded-xl p-4 border border-[#1A1A1A]/15">
                                <div>
                                    <div className="font-bold text-[#1A1A1A] mb-0.5">{s.head}</div>
                                    <p className="text-sm text-[#4A4A4A] leading-snug">{s.body}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 水の質：硬水・軟水 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#FF9855] pl-3 leading-tight">水の「質」：硬水・軟水・ミネラル</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        水に溶けている<strong>カルシウムやマグネシウムの量</strong>で、硬水・軟水が決まります。これらが多いと<strong>硬水</strong>、少ないと<strong>軟水</strong>。<strong>日本の水道水・国産の水の多くは軟水</strong>で、まろやかで飲みやすく、だしや料理にも向きます。硬水はミネラル補給になる一方、胃腸が敏感な人にはお腹がゆるくなることも。
                        {'\n\n'}
                        どちらが「絶対に正しい」というものではなく、<strong>好み・用途・体質</strong>で選べば十分です。水道水も日本では厳しく水質管理されており、気になる場合は浄水器で塩素やにおいを減らす、という選択肢もあります。「特別なミネラルウォーターでなければ不健康」ということはありません。
                    </p>
                </section>

                {/* 機能水（中立） */}
                <section className="mb-10 rounded-2xl p-6 md:p-8 border border-black" style={{ background: '#F3EFD6' }}>
                    <div className="inline-block text-[10px] font-bold tracking-widest text-[#1A1A1A] bg-[#FFD37A] rounded-full px-3 py-1 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>NEUTRAL ／ 根拠は未確立</div>
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 leading-tight">「機能水」をどう見るか</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        水は身近なだけに、<strong>「特別な力を持つ水」</strong>をうたう商品がたくさんあります。代表的なものを、いまの科学でどこまで言えるかで整理します。
                    </p>
                    <div className="space-y-3 mt-5">
                        {[
                            { head: '水素水', body: '「水素の抗酸化作用で体が整う」とうたわれるが、ヒトでの確かな効果はまだ確立していない。そもそも水素は水中から抜けやすく、開封後すぐ濃度が下がる。研究は途上で、過度な期待は禁物。' },
                            { head: 'アルカリイオン水（整水器）', body: '一部の整水器は「胃腸症状の改善」に限って家庭用医療機器として認められているが、「体質がアルカリ性になる」「万病に効く」といった主張は行き過ぎ。体のpHは厳密に一定に保たれ、飲み水で大きく変わるものではない。' },
                            { head: '「構造水・六角水・波動水」', body: '「水に特別な構造や記憶がある」とする主張には、確かな科学的裏づけがない。水の分子構造は常に高速で入れ替わっており、形を“記憶”し続けることはない、というのが現在の理解。' },
                        ].map((s) => (
                            <div key={s.head} className="bg-white/60 rounded-xl p-4 border border-[#1A1A1A]/15">
                                <div className="font-bold text-[#1A1A1A] mb-0.5">{s.head}</div>
                                <p className="text-sm text-[#4A4A4A] leading-snug">{s.body}</p>
                            </div>
                        ))}
                    </div>
                    <div className="rounded-xl p-4 border border-[#1A1A1A]/15 bg-white/60 mt-4">
                        <p className="text-sm text-[#1A1A1A]/85 leading-relaxed"><strong>Mitoflow40の立場：</strong>否定も盲信もせず、「おいしく感じる・続けやすいなら、その価値は尊重。ただし特別な治療効果は今のところ確認されていない」と中立に整理します。ふつうの水でほとんどの人は十分です。高額な水・機器には慎重に、そしてこれらを理由に<strong>必要な医療を遠ざけない</strong>こと。判断の主役は、いつもあなた自身です。</p>
                    </div>
                </section>

                {/* 暮らしへ */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#FF9855] pl-3 leading-tight">暮らしへの、やさしい取り入れ方</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">難しい理屈より、「こまめに・体のサインを見ながら」。小さな習慣で十分です。</p>
                    <div className="space-y-3">
                        {[
                            { head: '朝、コップ1杯から始める', body: '寝ている間に失った水分を、起きてまず1杯で補う。1日のリズムのスイッチにも。' },
                            { head: 'のどが渇く前に、こまめに', body: '一気飲みより、少しずつ。デスクや枕元に水を置いておくと自然に量が増える。' },
                            { head: '尿の色をセルフチェック', body: '薄い黄色なら足りている目安。濃いときは一杯足す——いちばん手軽なバロメーター。' },
                            { head: '汗・暑さ・運動時は電解質も', body: 'たくさん汗をかく日は、水だけでなく塩分（ナトリウム）も一緒に。吸収と保持が安定する。' },
                            { head: 'カフェイン・アルコールは「利尿」', body: 'コーヒーやお酒には水を出す作用がある。飲んだら、水も一杯添える習慣を。' },
                        ].map((s) => (
                            <div key={s.head} className="flex items-start gap-4 bg-white/70 rounded-xl p-4 border border-[#1A1A1A]/15">
                                <div>
                                    <div className="font-bold text-[#1A1A1A] mb-0.5">{s.head}</div>
                                    <p className="text-sm text-[#4A4A4A] leading-snug">{s.body}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* もっと学ぶ */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#FF9855] pl-3 leading-tight">あわせて読む</h2>
                    <div className="flex flex-wrap gap-2">
                        {[
                            { href: '/organs/kidney', label: '腎臓' },
                            { href: '/detox', label: '解毒' },
                            { href: '/reduce-toxins', label: '有害物質を減らす暮らし' },
                            { href: '/caffeine', label: 'カフェイン' },
                            { href: '/acid-alkaline', label: '酸・アルカリと体' },
                            { href: '/sunlight', label: '日光と健康' },
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
