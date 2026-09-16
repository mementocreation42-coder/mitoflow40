import Link from 'next/link';
import MitoRun from '@/components/game/MitoRun';

export const metadata = {
    title: 'MITOFLOW ｜ ミトコンドリア、はしる（試作）',
    description: '血管の中をミトコンドリアが走る、1 タップのランゲーム。良い食べ物で ATP を保て。',
    robots: { index: false, follow: false },
};

export default function PlayPage() {
    return (
        <div className="min-h-[100dvh] flex flex-col" style={{ background: '#ECE6F3' }}>
            <div className="flex items-center justify-between px-4 py-2 max-w-[420px] w-full mx-auto">
                <Link href="/" className="text-base font-bold tracking-tight text-[#1A1A1A]" style={{ fontFamily: "'MuseoModerno', sans-serif" }}>Mitoflow40</Link>
                <span className="text-[10px] font-bold tracking-widest text-[#4A4A4A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>PROTOTYPE</span>
            </div>
            <div className="flex-1 flex items-start justify-center">
                <MitoRun />
            </div>
        </div>
    );
}
