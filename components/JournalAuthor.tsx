import Image from "next/image";
import Link from "next/link";

export default function JournalAuthor() {
    return (
        <div className="flex items-center gap-4 px-5 py-5 rounded-2xl bg-gray-200 mb-10">
            <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-[#41C9B4]">
                <Image
                    src="/images/profile.jpg"
                    alt="Daisuke Kobayashi"
                    width={56}
                    height={56}
                    className="w-full h-full object-cover object-top"
                />
            </div>
            <div className="min-w-0 flex-1">
                <p className="text-xs tracking-widest text-[#4A4A4A]/60 mb-0.5">DAISUKE KOBAYASHI</p>
                <p className="text-sm font-bold text-[#1A1A1A]">小林大介</p>
                <p className="text-xs text-[#4A4A4A]/70 leading-relaxed mt-1 line-clamp-2">
                    ビデオグラファー / フォトグラファー / Webサービス構築。<br />40代からの健康戦略をパーソナルヘルスケアとして実践・発信中。
                </p>
            </div>
            <div className="flex-shrink-0 pl-4 border-l border-[#4A4A4A]/30 self-stretch flex items-center">
                <Link href="/#profile" className="text-xs font-bold tracking-widest text-[#4A4A4A] hover:text-[#41C9B4] transition-colors">
                    Profile
                </Link>
            </div>
        </div>
    );
}
