import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Static export so the site can be deployed to GitHub Pages (or any
  // static host) with no Node runtime. No API routes, no server actions,
  // no request-time data — every page is pre-rendered.
  output: "export",
  // Pin the workspace root so Turbopack doesn't infer /Users (which has
  // unrelated lockfiles) as the project root.
  turbopack: {
    root: path.resolve(__dirname),
  },
  // `trailingSlash: true` produces /blog/coming-soon/index.html which
  // works cleanly on most static hosts (including GitHub Pages). Flip to
  // false if you ever serve behind a router that prefers /blog/[slug].
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;