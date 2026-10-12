import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { RevealObserver } from "@/components/layout/reveal-observer";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/config/site";
import { services } from "@/data/services";
import { technologyCategories } from "@/data/technologies";
import { organizationSchema, websiteSchema } from "@/lib/seo";
import "./globals.css";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic", // only used for <Accent> words
  variable: "--font-instrument-serif",
  display: "swap",
});

const homeTitle = `${siteConfig.name} | Software Development & AI Agency`;
const homeDescription =
  "Software development agency building custom web and mobile apps, AI and LLM solutions, business automation and research prototypes for startups and businesses.";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: homeTitle, template: `%s | ${siteConfig.name}` },
  description: homeDescription,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "technology",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: homeTitle,
    description: homeDescription,
    url: "/",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description: homeDescription,
  },
  // Search engine ownership verification — set the env vars, no code changes needed.
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : undefined,
  },
  formatDetection: { email: false, telephone: false, address: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f4ef" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0c0d" },
  ],
};

/**
 * Runs before first paint: applies the saved theme (or the OS preference) and flags JS support,
 * which prevents a flash of the wrong theme and lets reveal animations degrade gracefully.
 */
const themeScript = `(function(){try{var d=document.documentElement,s=localStorage.getItem("theme"),t=s==="dark"||s==="light"?s:(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");d.dataset.theme=t;d.style.colorScheme=t}catch(e){document.documentElement.dataset.theme="light"}document.documentElement.classList.add("js")})();`;

/** Site-wide structured data, limited to facts from config and content — no ratings or invented details. */
const knowsAbout = [
  ...services.map((service) => service.title),
  ...new Set(technologyCategories.flatMap((category) => category.items)),
];

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <JsonLd data={[organizationSchema(knowsAbout), websiteSchema()]} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only z-[70] rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-fg focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <RevealObserver />
      </body>
    </html>
  );
}
