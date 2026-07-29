import Link from "next/link";
import type { BlogPost } from "@/lib/blog";

/**
 * Single post preview card used on the blog listing. Stays visually consistent
 * with Projects/TechStack cards: same radius, same border, same hover lift,
 * same tokenized colors.
 */
export function BlogCard({ post }: { post: BlogPost }) {
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <article className="group flex h-full flex-col rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)] shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <Link
        href={`/blog/${post.slug}`}
        className="flex h-full flex-col p-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2"
        aria-label={`Read “${post.title}”`}
      >
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[var(--muted-fg)]">
          <span className="rounded-full bg-[var(--muted)] px-2 py-1 text-[var(--primary)]">
            {post.category}
          </span>
          <time dateTime={post.date}>{formattedDate}</time>
          <span aria-hidden="true">·</span>
          <span>{post.readMinutes} min read</span>
        </div>

        <h3 className="mt-3 text-lg font-semibold text-[var(--fg)] transition group-hover:text-[var(--primary)]">
          {post.title}
        </h3>

        <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--muted-fg)]">
          {post.excerpt}
        </p>

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
      </Link>
    </article>
  );
}