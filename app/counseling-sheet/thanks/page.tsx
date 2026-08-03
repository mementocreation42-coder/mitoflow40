import Link from 'next/link';

export const metadata = {
    title: 'カウンセリング票を受け付けました | Mitoflow40',
    robots: { index: false, follow: false },
};

export default function IntakeThanksPage() {
    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen" style={{ background: '#DEEAF2' }}>
            <div className="max-w-[560px] mx-auto text-center bg-white/70 rounded-2xl p-8 md:p-12 border border-black">
                <p className="text-xs tracking-widest font-bold mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>RECEIVED</p>
                <h1 className="text-2xl md:text-3xl font-bold mb-4 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    カウンセリング票を受け付けました
                </h1>
                <p className="text-sm md:text-base text-[#4A4A4A] leading-loose mb-8">
                    ご記入ありがとうございます。内容を確認のうえ、担当者からご連絡します。<br />
                    同じメールアドレスから、いつでも情報を追加できます。
                </p>
                <Link href="/" className="inline-block px-6 py-3 rounded-full text-sm font-bold bg-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#fff' }}>
                    ホームへ戻る
                </Link>
            </div>
        </div>
    );
}
