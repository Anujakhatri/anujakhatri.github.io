import { SkipLink } from "@/components/primitives";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Footer } from "@/components/footer";

export default function Page() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      <SkipLink />
      <Navbar />

      <main id="main">
        <Hero />
      </main>

      <Footer />
    </div>
  );
}
