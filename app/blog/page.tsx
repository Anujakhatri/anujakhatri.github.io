import type { Metadata } from "next";
import { AnimatedSection } from "@/components/animated-section";
import { BlogCard } from "@/components/blog-card";
import { POSTS } from "@/lib/blog";
import { PROFILE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog",
  description: `Notes and writeups from ${PROFILE.name} — backend architecture, FastAPI patterns, JWT/RBAC, PostgreSQL, and the occasional LLM integration post.`,
  alternates: { canonical: "/blog" },
  openGraph: {
    title: `${PROFILE.name} — Blog`,
    description: `Notes and writeups from ${PROFILE.name} on backend architecture, FastAPI patterns, JWT/RBAC, PostgreSQL, and LLM integrations.`,
    url: "/blog",
    siteName: `${PROFILE.name} Portfolio`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${PROFILE.name} — Blog`,
    description: `Notes and writeups from ${PROFILE.name} on backend architecture, FastAPI, JWT/RBAC, PostgreSQL, and LLM integrations.`,
  },
};

export default function BlogIndexPage() {
  return (
    <main
      id="main"
      className="min-h-screen bg-[var(--bg)] text-[var(--fg)]"
      aria-labelledby="blog-title"
    >
      <section className="px-6 pt-24 pb-20 md:pt-32 md:pb-28">
        <div className="mx-auto max-w-5xl">
          <AnimatedSection delay={50}>
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--muted)] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--muted-fg)]">
              <span
                className="h-2 w-2 rounded-full bg-[var(--accent)]"
                aria-hidden="true"
              />
              Notes &amp; writeups
            </span>
          </AnimatedSection>

          <AnimatedSection delay={150}>
            <h1
              id="blog-title"
              className="mt-6 text-5xl font-extrabold tracking-tight text-[var(--fg)] md:text-6xl"
            >
              Blog
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={250}>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-[var(--muted-fg)] md:text-xl">
              Backend architecture, FastAPI/Django patterns, JWT and RBAC,
              PostgreSQL performance, and the occasional LLM-integration
              writeup.
            </p>
          </AnimatedSection>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {POSTS.map((post, index) => (
              <AnimatedSection key={post.slug} delay={300 + index * 120}>
                <BlogCard post={post} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}