import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function DiseasesLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            <main className="min-h-screen">
                {children}
            </main>
            <Footer />
        </>
    );
}
