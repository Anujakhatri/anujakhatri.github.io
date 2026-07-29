import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/primitives";
import { PROFILE } from "@/lib/site";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const ibmPlex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

const title = `${PROFILE.name} — ${PROFILE.title}`;
const description =
  "Portfolio of Anuja Khatri — Full Stack Developer building production-grade REST APIs, role-based access control systems, and data processing pipelines using Django REST Framework, FastAPI, PostgreSQL, Docker, and CI/CD.";

export const metadata: Metadata = {
  metadataBase: new URL("https://anujakhatri.dev"),
  title: {
    default: title,
    template: `%s — ${PROFILE.name}`,
  },
  description,
  applicationName: `${PROFILE.name} Portfolio`,
  keywords: [
    "Anuja Khatri",
    "Full Stack Developer",
    "Django REST Framework",
    "FastAPI",
    "PostgreSQL",
    "JWT",
    "RBAC",
    "Docker",
    "Backend Developer",
    "Kathmandu Nepal",
  ],
  authors: [{ name: PROFILE.name, url: PROFILE.github }],
  creator: PROFILE.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    title,
    description,
    url: "/",
    siteName: `${PROFILE.name} Portfolio`,
    images: [
      {
        url: "/profile.png",
        width: 1200,
        height: 630,
        alt: `${PROFILE.name} — ${PROFILE.title}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/profile.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      // Default to dark; ThemeProvider reads any stored override on mount and
      // toggles the .dark class accordingly. SSR + first paint match so no
      // hydration flash.
      className={`${spaceGrotesk.variable} ${ibmPlex.variable} ${jetbrainsMono.variable} dark`}
      // Opt into native smooth scrolling via the data attribute instead of
      // a CSS rule. Next.js App Router warns when `scroll-behavior: smooth`
      // is set in CSS on <html> because it can suppress the router's
      // scroll-restoration on navigation; the data attribute is the
      // framework-recommended opt-in and applies the same behavior without
      // the warning.
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}