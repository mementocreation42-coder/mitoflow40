import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function JournalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header />
            <main className="pt-[60px] min-h-screen bg-white">
                {children}
            </main>
            <Footer />
        </>
    );
}
