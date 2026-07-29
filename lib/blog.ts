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
        text: "This is a stub entry so the blog listing and route have something to render. Will update this soon.",
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
