import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingNav from "@/components/FloatingNav";

export default function SampleLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Header />
            <main style={{ background: "#B2EBF2", flex: 1, display: "flex", flexDirection: "column" }}>
                {children}
            </main>
            <Footer />
            <FloatingNav />
        </div>
    );
}
