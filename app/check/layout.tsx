import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
    title: "ミトコンドリア・セルフチェック | Mitoflow40",
    description: "12問・2分で完了するミトコンドリア活性度の簡易セルフチェック。エネルギー・脳のクリアさ・回復力・代謝の柔軟性 4軸で可視化します。",
    alternates: { canonical: "https://mitoflow40.com/check" },
    openGraph: {
        title: "ミトコンドリア・セルフチェック | Mitoflow40",
        description: "12問・2分でわかる、あなたのミトコンドリア活性度。",
        url: "https://mitoflow40.com/check",
        type: "website",
    },
};

export default function CheckLayout({ children }: { children: React.ReactNode }) {
    return (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Header />
            <main style={{ background: "#FAFAF7", flex: 1 }}>{children}</main>
            <Footer />
        </div>
    );
}
