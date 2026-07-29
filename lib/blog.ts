// Blog content source.
//
// Content strategy: typed blocks, not MDX.
//   The rest of this project (lib/site.ts) keeps its content as typed
//   TypeScript arrays — that's the established pattern. Adding @next/mdx
//   (and the remark/rehype ecosystem to make it pretty) is real new
//   architecture for a "posts in data" feature, while a typed block
//   structure keeps content in one file with full type safety, zero new
//   deps, and full static-export compatibility.
//
//   If/when you outgrow blocks, swap `body` for an MDX pipeline:
//     1. `pnpm add @next/mdx gray-matter remark-gfm`
//     2. Add an mdx-components.tsx at the project root with the same
//        element overrides used in components/blog-renderer.tsx (so MDX
//        elements render identically).
//     3. Change `body` from PostBlock[] to `content: string` containing
//        compiled MDX and render it via the MDX provider.
//   The block renderer you'll use for an MDX swap is the same shape
//   (h2/h3/p/pre/ul/code) — the swap is local, not architectural.
//
// To add a new post:
//   1. Append an entry to POSTS below.
//   2. Slug must be unique, lowercase, hyphenated.
//   3. Body is an array of typed blocks; keep the prose honest.

export interface PostBlock {
  type: "paragraph" | "heading" | "code" | "list";
  text?: string;
  level?: 2 | 3; // for headings
  items?: string[]; // for lists
  language?: string; // for code blocks
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  date: string; // ISO 8601 — rendered via `date` field, sortable for sitemap
  readMinutes: number;
  body: PostBlock[];
}

export const POSTS: BlogPost[] = [
  {
    slug: "coming-soon",
    title: "Coming soon",
    excerpt:
      "A placeholder entry. Real posts — on backend architecture, FastAPI patterns, and production lessons — land here once they're written.",
    category: "Draft",
    tags: ["meta"],
    date: "2026-07-29",
    readMinutes: 1,
    body: [
      {
        type: "paragraph",
        text: "This is a stub entry so the blog listing and route have something to render. Replace it (or add new entries above this one) when you're ready to publish.",
      },
      {
        type: "heading",
        level: 2,
        text: "How posts are structured",
      },
      {
        type: "paragraph",
        text: "Each post is an entry in the POSTS array in lib/blog.ts. The body is an array of typed blocks (paragraph, heading, code, list). Add a block, write the text, and the post page renders it.",
      },
      {
        type: "heading",
        level: 2,
        text: "What I'll publish here",
      },
      {
        type: "list",
        items: [
          "Backend architecture notes from production Django + FastAPI systems.",
          "Auth patterns — JWT, RBAC, refresh-token rotation.",
          "PostgreSQL — query plans, indexing, what actually matters at scale.",
          "Occasional ML/LLM integration writeups when there's something to say.",
        ],
      },
    ],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return POSTS.find((p) => p.slug === slug);
}
