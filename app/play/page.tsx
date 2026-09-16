import Link from 'next/link';
import MitoRun from '@/components/game/MitoRun';
import { PhoneFrame } from '@/components/game/GameLauncher';

export const metadata = {
    title: '走れミトス ｜ MITOFLOW | Mitoflow40',
    description: '血管の中をミトコンドリアの「ミトス」が走る、1 タップのランゲーム。良い食べ物で ATP を保て。甘いものは速いけど、あとがつらい。',
    alternates: { canonical: 'https://mitoflow40.com/play' },
    openGraph: {
        siteName: 'Mitoflow40',
        locale: 'ja_JP',
        title: '走れミトス ｜ MITOFLOW',
        description: '血管の中をミトコンドリアの「ミトス」が走る、1 タップのランゲーム。',
        url: 'https://mitoflow40.com/play',
        type: 'website',
    },
};

export default function PlayPage() {
    return (
        <div className="min-h-[100dvh] flex flex-col relative overflow-hidden" style={{ background: '#ECE6F3' }}>
            {/* スマホ：そのまま全幅 */}
            <div className="md:hidden flex flex-col flex-1">
                <div className="flex items-center justify-between px-4 py-2 w-full">
                    <Link href="/" className="text-base font-bold tracking-tight text-[#1A1A1A]" style={{ fontFamily: "'MuseoModerno', sans-serif" }}>Mitoflow40</Link>
                    <span className="text-[10px] font-bold tracking-widest text-[#4A4A4A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>GAME · BETA</span>
                </div>
                <div className="flex-1 flex items-start justify-center">
                    <MitoRun />
                </div>
            </div>

            {/* PC：サイトの上にポップアップで開いたのと同じ見え方（スマホ型の枠） */}
            <div className="hidden md:flex flex-1 items-center justify-center relative">
                <img loading="lazy" decoding="async" src="/images/for-you/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 mf-deco-flip"
                    style={{ top: '-48px', right: '0', width: '260px' }} />
                <img loading="lazy" decoding="async" src="/images/misc/24.png" alt="" className="absolute pointer-events-none"
                    style={{ bottom: '8px', left: '8px', width: '260px' }} />
                <div className="absolute inset-0 bg-[#1A1A1A]/50 backdrop-blur-sm" />
                <div className="relative">
                    <PhoneFrame>
                        <MitoRun />
                    </PhoneFrame>
                    <Link href="/" aria-label="閉じる"
                        className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-white border-2 border-[#1A1A1A] font-bold text-[#1A1A1A] shadow-lg hover:bg-[#FF9855] transition-colors flex items-center justify-center">×</Link>
                    <p className="absolute -bottom-8 left-0 right-0 text-center text-[11px] font-bold text-white/80" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>SPACE / CLICK でジャンプ</p>
                </div>
            </div>
        </div>
    );
}
