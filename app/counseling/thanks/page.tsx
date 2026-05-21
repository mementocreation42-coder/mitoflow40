import Link from 'next/link';

export const metadata = {
    title: '送信完了 | Mitoflow40',
    robots: { index: false, follow: false },
};

export default function ThanksPage() {
    return (
        <div className="pt-32 pb-32 px-6 text-center">
            <div className="max-w-[520px] mx-auto">
                <p className="text-xs tracking-widest font-bold mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>
                    SUBMITTED
                </p>
                <h1 className="text-3xl font-bold mb-5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    ありがとうございました
                </h1>
                <p className="text-sm text-[#4A4A4A] leading-relaxed mb-8">
                    カウンセリングシートを受け付けました。<br />
                    血液検査の結果と合わせて、解析レポートを作成いたします。<br />
                    準備が整い次第、ご登録のメールアドレスにレポートのURLをお送りします。
                </p>
                <Link href="/" className="inline-block px-6 py-3 rounded-full text-sm font-bold text-white bg-[#1A1A1A] hover:opacity-90 transition"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    トップへ戻る
                </Link>
            </div>
        </div>
    );
}
