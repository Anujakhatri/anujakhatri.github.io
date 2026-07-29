import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Required when output: "export" — keeps the route handler as a build-time
// generated static file rather than a runtime endpoint.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}