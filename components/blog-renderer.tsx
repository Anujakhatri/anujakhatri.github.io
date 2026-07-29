import type { PostBlock } from "@/lib/blog";

/**
 * Renders a post's typed blocks as long-form content. Uses the same CSS
 * variables and font stack as the rest of the site; no MDX, no parsing —
 * the data layer (lib/blog.ts) is the source of truth.
 *
 * If you later swap PostBlock.body for MDX (see the comment in lib/blog.ts),
 * this file becomes the natural place to wire up the MDX provider; the
 * element styles below carry over as MDX component overrides.
 */
export function BlogPostBody({ blocks }: { blocks: PostBlock[] }) {
  return (
    <div className="space-y-5 text-base leading-relaxed text-[var(--muted-fg)]">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "paragraph":
            return <p key={index}>{block.text}</p>;
          case "heading": {
            const level = block.level ?? 2;
            const className =
              "font-display pt-2 text-[var(--fg)] " +
              (level === 2
                ? "text-2xl font-bold tracking-tight md:text-3xl"
                : "text-xl font-semibold tracking-tight md:text-2xl");
            if (level === 2) {
              return (
                <h2 key={index} className={className}>
                  {block.text}
                </h2>
              );
            }
            return (
              <h3 key={index} className={className}>
                {block.text}
              </h3>
            );
          }
          case "code":
            return (
              <pre
                key={index}
                className="overflow-x-auto rounded-[var(--radius)] border border-[var(--border)] bg-[var(--muted)] px-4 py-3 text-sm text-[var(--fg)]"
              >
                <code className={block.language ? `language-${block.language}` : undefined}>
                  {block.text}
                </code>
              </pre>
            );
          case "list":
            return (
              <ul key={index} className="ml-5 list-disc space-y-1.5">
                {block.items?.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            );
        }
      })}
    </div>
  );
}