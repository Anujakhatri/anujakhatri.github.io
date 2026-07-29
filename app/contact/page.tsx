import type { Metadata } from "next";
import { Contact } from "@/components/contact";
import { PROFILE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${PROFILE.name} — project inquiries, role conversations, or ideas. Email, GitHub, and LinkedIn all open in one click.`,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `${PROFILE.name} — Contact`,
    description: `Get in touch with ${PROFILE.name} — project inquiries, role conversations, or ideas.`,
    url: "/contact",
    siteName: `${PROFILE.name} Portfolio`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${PROFILE.name} — Contact`,
    description: `Get in touch with ${PROFILE.name} — project inquiries, role conversations, or ideas.`,
  },
};

export default function ContactPage() {
  return <Contact />;
}