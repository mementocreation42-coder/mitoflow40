import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingNav from "@/components/FloatingNav";

export default function JournalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header />
            <main className="min-h-screen bg-white">
                {children}
            </main>
            <Footer />
            <FloatingNav />
        </>
    );
}
