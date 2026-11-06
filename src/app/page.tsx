import { About } from "@/components/About";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Intro } from "@/components/Intro";
import { Portfolio } from "@/components/Portfolio";
import { Process } from "@/components/Process";
import { QuoteModal } from "@/components/QuoteModal";
import { works } from "@/data/works";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Intro />
        <Portfolio works={works} />
        <Process />
        <About />
      </main>
      <Footer />
      <QuoteModal />
    </>
  );
}
