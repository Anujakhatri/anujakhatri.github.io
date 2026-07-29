import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { SkipLink } from "@/components/primitives";
import { ShowcaseTabs } from "@/components/showcase-tabs";

/**
 * Showcase shell — owned by every /showcase/* route. Provides the muted
 * background section, the heading + intro copy, and the tab strip. The
 * active panel comes from `children` (the leaf page) so each tab is a
 * real App Router route with its own URL, refresh, and sitemap entry.
 */
export default function ShowcaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      <SkipLink />
      <Navbar />

      <main id="main">
        <section
          aria-labelledby="showcase-title"
          className="bg-[var(--muted)] px-6 py-20 md:py-28"
        >
          <div className="mx-auto max-w-5xl">
            <h2
              id="showcase-title"
              className="text-3xl font-bold tracking-tight text-[var(--fg)] md:text-4xl"
            >
              Showcase
            </h2>
            <p className="mt-2 max-w-2xl text-[var(--muted-fg)]">
              Selected projects, certifications, and the tools.
              Pick a tab to switch.
            </p>

            <ShowcaseTabs />

            <div className="mt-10">{children}</div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
