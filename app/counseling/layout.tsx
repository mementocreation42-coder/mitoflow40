import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
    title: "カウンセリングシート | Mitoflow40",
    description: "MitoFlow40 解析サービスのカウンセリングシート。",
    alternates: { canonical: "https://mitoflow40.com/counseling" },
    robots: { index: false, follow: false },
};

export default function CounselingLayout({ children }: { children: React.ReactNode }) {
    return (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Header />
            <main style={{ background: "#FAFAF7", flex: 1 }}>{children}</main>
            <Footer />
        </div>
    );
}
