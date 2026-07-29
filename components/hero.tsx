import Image from "next/image";
import { AnimatedSection } from "./animated-section";
import { TypewriterText } from "./typewriter";
import { DownloadIcon, GitHubIcon, MailIcon } from "@/lib/icons";
import { PROFILE } from "@/lib/site";

/**
 * Unified landing section — the old "hero" and "about" blocks merged into
 * one continuous flow.
 *
 * Layout (single two-column row, no separate full-width section):
 *   left  = badge + heading + tagline + CTAs + tech-stack pills
 *           (pills constrained to the left column's width; they wrap
 *           naturally inside it)
 *   right = portrait image, with the two descriptive paragraphs
 *           nested underneath at the SAME width as the image so they
 *           read as one aligned vertical block.
 *
 * Vertical balance: the left column is centered against the height of
 * the image+paragraph block via md:items-center, so the badge/heading/
 * CTAs/pills sit roughly at the visual midline of the right column.
 *
 * Mobile/tablet: the grid collapses to a single column and everything
 * stacks. The image and paragraph wrappers share the SAME shape
 * (mx-auto + w-full + max-w-sm, with md:max-w-none to fill the grid
 * cell at md+), so they always align as one centered block on any
 * viewport. Previously the paragraph wrapper was missing mx-auto,
 * which made it flush-left on tablet while the image above it was
 * centered — this fix matches them up.
 */
export function Hero() {
  return (
    <section
      id="about"
      aria-labelledby="hero-title"
      className="relative overflow-hidden px-6 pt-24 pb-20 md:pt-32 md:pb-24"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-60"
        aria-hidden="true"
      >
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-[var(--accent)] opacity-10 blur-3xl motion-reduce:hidden" />
        <div className="absolute top-1/2 right-0 h-96 w-96 rounded-full bg-[var(--primary)] opacity-10 blur-3xl motion-reduce:hidden" />
      </div>

      <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-[1.4fr_1fr] md:items-center md:gap-16">
        {/* ── Left column: badge + heading + tagline + CTAs + pills ── */}
        <div className="flex flex-col gap-6">
          <AnimatedSection delay={50}>
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--muted)] px-3 py-1 font-mono text-[0.7rem] font-medium uppercase tracking-wider text-[var(--muted-fg)]">
              <span
                className="h-2 w-2 rounded-full bg-[var(--accent)]"
                aria-hidden="true"
              />
              Available for opportunities
            </span>
          </AnimatedSection>

          <AnimatedSection delay={150}>
            <h1
              id="hero-title"
              className="text-5xl font-bold tracking-tight text-[var(--fg)] md:text-6xl lg:text-7xl"
            >
              <span className="block text-[var(--muted-fg)]">Hi, I&rsquo;m</span>
              <span className="block text-[var(--primary)]">{PROFILE.name}</span>
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={250}>
            <p className="max-w-2xl text-lg leading-relaxed text-[var(--fg)] md:text-xl">
              <TypewriterText
                phrases={["Full Stack Developer", "Backend Developer"]}
                typeSpeed={50}
                eraseSpeed={30}
                pauseMs={1700}
              />
            </p>
          </AnimatedSection>

          <AnimatedSection delay={400}>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${PROFILE.email}`}
                className="inline-flex items-center gap-2 rounded-[var(--radius)] bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-[var(--primary-fg)] shadow-sm transition hover:bg-[var(--accent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2"
              >
                <MailIcon />
                Get in touch
              </a>
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)] px-5 py-3 text-sm font-semibold text-[var(--fg)] transition hover:border-[var(--primary)] hover:text-[var(--primary)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2"
              >
                <GitHubIcon />
                GitHub
              </a>
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)] px-5 py-3 text-sm font-semibold text-[var(--fg)] transition hover:border-[var(--primary)] hover:text-[var(--primary)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2"
              >
                LinkedIn
              </a>
              <a
                href="/resume.pdf"
                download
                aria-label={`Download ${PROFILE.name}'s resume as PDF`}
                className="inline-flex items-center gap-2 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)] px-5 py-3 text-sm font-semibold text-[var(--fg)] transition hover:border-[var(--primary)] hover:text-[var(--primary)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2"
              >
                <DownloadIcon />
                Resume
              </a>
            </div>
          </AnimatedSection>

          {/* Pills live inside the left column so they share its width
              and stop before reaching the right column. mt-2 keeps them
              breathing-roomed under the CTAs without a hard gap. */}
          <AnimatedSection delay={475}>
            <ul
              aria-label="Core technologies"
              className="mt-2 flex flex-wrap gap-2"
            >
              {[
                "Python",
                "Django REST Framework",
                "FastAPI",
                "JWT auth",
                "PostgreSQL",
                "Docker",
                "GitHub Actions CI/CD",
                "XGBoost / Random Forest",
                "LLM API integration",
              ].map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-[var(--border)] bg-[var(--card)] px-3 py-1 text-xs font-medium text-[var(--muted-fg)]"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </AnimatedSection>
        </div>

        {/* ── Right column: portrait + paragraphs (one block) ──
             The image and paragraphs share the SAME wrapper shape
             (mx-auto + w-full + max-w-sm, md:max-w-none) so they
             always align as one centered block on any viewport. The
             mx-auto actually centers the wrapper on tablet where the
             grid is wider than max-w-sm. */}
        <AnimatedSection delay={200} className="flex flex-col">
          <div className="relative mx-auto w-full max-w-sm md:max-w-none">
            <div
              className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] opacity-20 blur-lg"
              aria-hidden="true"
            />
            <Image
              src="/profile.png"
              alt={`Portrait of ${PROFILE.name}`}
              width={480}
              height={600}
              priority
              sizes="(min-width: 768px) 40vw, 80vw"
              className="relative w-full rounded-[var(--radius)] object-cover shadow-lg"
            />
          </div>

          <div className="mx-auto mt-6 w-full max-w-sm md:mt-8 md:max-w-none">
            <div className="space-y-4 text-sm leading-[1.7] text-justify hyphens-auto text-[var(--muted-fg)] md:text-base">
              <p>
                Experienced designing multi-role authentication
                architectures, PostgreSQL-backed data models with performance
                optimization, and containerized applications.
              </p>
              <p>
                Has applied machine learning to backend systems, including
                training classification models and integrating LLM APIs for
                AI-powered features.
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}