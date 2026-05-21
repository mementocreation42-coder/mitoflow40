import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingNav from "@/components/FloatingNav";

export default function LegalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Header />
            <main style={{ background: "#FAFAF7", flex: 1 }}>
                <article
                    className="prose prose-sm md:prose-base max-w-[760px] mx-auto px-6 md:px-8 pt-32 pb-24"
                    style={{
                        color: "#1A1A1A",
                        lineHeight: 1.9,
                    }}
                >
                    {children}
                </article>
            </main>
            <Footer />
            <FloatingNav />
        </div>
    );
}
