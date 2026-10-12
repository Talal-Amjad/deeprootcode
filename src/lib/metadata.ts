import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

/** Page-level metadata with canonical URL and matching Open Graph / Twitter fields. */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  // Default share image; routes with their own opengraph-image file override it automatically.
  const images = [{ url: "/opengraph-image", width: 1200, height: 630, alt: `${siteConfig.name}: ${title}` }];
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title: `${title} | ${siteConfig.name}`,
      description,
      url: path,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.name}`,
      description,
      images,
    },
  };
}
