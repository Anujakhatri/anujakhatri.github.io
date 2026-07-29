import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AnimatedSection } from "@/components/animated-section";
import { BlogPostBody } from "@/components/blog-renderer";
import { getPostBySlug, POSTS } from "@/lib/blog";
import { PROFILE } from "@/lib/site";

interface PostPageParams {
  slug: string;
}

export function generateStaticParams(): PostPageParams[] {
  return POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PostPageParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const title = `${post.title} — ${PROFILE.name}`;
  const url = `/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title,
      description: post.excerpt,
      url,
      siteName: `${PROFILE.name} Portfolio`,
      publishedTime: post.date,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<PostPageParams>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main
      id="main"
      className="min-h-screen bg-[var(--bg)] text-[var(--fg)]"
      aria-labelledby="post-title"
    >
      <article className="px-6 pt-24 pb-20 md:pt-32 md:pb-28">
        <div className="mx-auto max-w-3xl">
          <AnimatedSection delay={50}>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 rounded-[4px] text-sm font-semibold text-[var(--primary)] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
            >
              ← All posts
            </Link>
          </AnimatedSection>

          <AnimatedSection delay={150}>
            <header className="mt-6">
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[var(--muted-fg)]">
                <span className="rounded-full bg-[var(--muted)] px-2 py-1 text-[var(--primary)]">
                  {post.category}
                </span>
                <time dateTime={post.date}>{formattedDate}</time>
                <span aria-hidden="true">·</span>
                <span>{post.readMinutes} min read</span>
              </div>

              <h1
                id="post-title"
                className="mt-4 text-4xl font-extrabold tracking-tight text-[var(--fg)] md:text-5xl"
              >
                {post.title}
              </h1>

              <ul className="mt-4 flex flex-wrap gap-2" aria-label={`Tags for ${post.title}`}>
                {post.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-[var(--border)] px-2.5 py-1 text-xs font-semibold text-[var(--muted-fg)]"
                  >
                    #{tag}
                  </li>
                ))}
              </ul>
            </header>
          </AnimatedSection>

          <AnimatedSection delay={250}>
            <div className="mt-10">
              <BlogPostBody blocks={post.body} />
            </div>
          </AnimatedSection>
        </div>
      </article>
    </main>
  );
}