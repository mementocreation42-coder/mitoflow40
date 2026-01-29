import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Benefits from "@/components/Benefits";
import ForYou from "@/components/ForYou";
import Pricing from "@/components/Pricing";
import Flow from "@/components/Flow";
import FAQ from "@/components/FAQ";
import Profile from "@/components/Profile";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="pt-[60px]">
        <Hero />
        <About />
        <Benefits />
        <ForYou />
        <Pricing />
        <Flow />
        <FAQ />
        <Profile />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
