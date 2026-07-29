// Certificates data source.
//
// Each entry pairs a PDF (served from public/certificates/) with a
// pre-generated PNG thumbnail (in public/certificates/thumbnails/). The
// thumbnail is rendered once at build-prep time via `npm run build:thumbs`
// (scripts/generate-cert-thumbnails.mjs) — the static site just serves
// both files as-is, no runtime PDF parsing.
//
// Required fields:
//   - id: stable unique key
//   - title: certificate name (e.g. "AWS Certified Cloud Practitioner")
//   - issuer: awarding org (e.g. "GeeksforGeeks")
//   - date: ISO 8601 (YYYY-MM-DD) — used for the displayed date and sort
//   - pdfUrl: path to the PDF, opened in a new tab on click
//   - thumbnailUrl: path to the page-1 PNG, shown as the card preview
//   - altText: short description of the thumbnail (used as img alt + link
//     aria-label, so screen readers announce the same thing twice)
//   - description?: one-line blurb
//   - tags?: topic tags (e.g. "AWS", "Security")

export interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  pdfUrl: string;
  thumbnailUrl: string;
  altText: string;
  description?: string;
  tags?: string[];
}

// Most recent first — newest at the top of the grid.
export const CERTIFICATES: Certificate[] = [
  {
    id: 1,
    title: "ICT Research and Innovation",
    issuer: "Nepal Engineering Council",
    date: "2026-05-31",
    pdfUrl: "/certificates/Anuja_ICT_Research_and_Innovation_Certificate.pdf",
    thumbnailUrl: "/certificates/thumbnails/ict-research-and-innovation-thumb.png",
    altText: "ICT Research and Innovation certificate preview",
    tags: ["ICT", "Research"],
  },
  {
    id: 2,
    title: "Web Development Internship",
    issuer: "Nobel Learning PBC",
    date: "2025-10-29",
    pdfUrl: "/certificates/Anuja_Nobel_Learning_PBC.pdf",
    thumbnailUrl: "/certificates/thumbnails/nobel-learning-pbc-thumb.png",
    altText: "Nobel Learning PBC web development internship certificate preview",
    description:
      "Completed a web development internship building production client work.",
    tags: ["Web Development", "Internship"],
  },
  {
    id: 3,
    title: "Generative AI (Gen AI) Course",
    issuer: "GeeksforGeeks",
    date: "2025-10-13",
    pdfUrl: "/certificates/Anuja_Gen_AI_Course.pdf",
    thumbnailUrl: "/certificates/thumbnails/gen-ai-course-thumb.png",
    altText: "GeeksforGeeks Generative AI course certificate preview",
    tags: ["Gen AI", "LLM"],
  },
  {
    id: 4,
    title: "Python Certificate",
    issuer: "GeeksforGeeks",
    date: "2025-10-09",
    pdfUrl: "/certificates/Anuja_Python_Certificate.pdf",
    thumbnailUrl: "/certificates/thumbnails/python-thumb.png",
    altText: "GeeksforGeeks Python certificate preview",
    tags: ["Python"],
  },
  {
    id: 5,
    title: "Active Contributor",
    issuer: "Leapfrog",
    date: "2025-09-16",
    pdfUrl: "/certificates/Anuja_Active_Participants.pdf",
    thumbnailUrl: "/certificates/thumbnails/active-participants-thumb.png",
    altText: "Leapfrog Active Contributor certificate preview",
    description:
      "Recognised for active contribution during the 60-Day Engineering Challenge.",
    tags: ["Engineering", "Contribution"],
  },
];