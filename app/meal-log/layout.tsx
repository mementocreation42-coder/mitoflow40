import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
    title: "食事記録 | Mitoflow40",
    description: "毎日の食事をかんたんに記録して、CSV で書き出せるツール。記録はこの端末の中だけに保存され、送信されません。",
    alternates: { canonical: "https://mitoflow40.com/meal-log" },
    openGraph: {
        siteName: 'Mitoflow40',
        locale: 'ja_JP',
        title: "食事記録 | Mitoflow40",
        description: "毎日の食事をかんたんに記録して、CSV で書き出せるツール。",
        url: "https://mitoflow40.com/meal-log",
        type: "website",
    },
};

export default function MealLogLayout({ children }: { children: React.ReactNode }) {
    return (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Header />
            <main style={{ background: "#FAFAF7", flex: 1 }}>{children}</main>
            <Footer />
        </div>
    );
}
