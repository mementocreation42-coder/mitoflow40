// for-kids 配下の共通の下地。白背景より目にやさしい、やわらかいクリーム色を敷く。
export default function ForKidsLayout({ children }: { children: React.ReactNode }) {
    return <div className="min-h-screen bg-[#DCEEF7]">{children}</div>;
}
