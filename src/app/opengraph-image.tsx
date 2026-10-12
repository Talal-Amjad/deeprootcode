import { siteConfig } from "@/config/site";
import { ogSize, renderOgImage } from "@/lib/og";

export const alt = `${siteConfig.name}: ${siteConfig.tagline}`;
export const size = ogSize;
export const contentType = "image/png";

/** Default social sharing image, generated at build time. */
export default function OpengraphImage() {
  return renderOgImage({
    title: "Great Digital Products Start at the Root.",
    subtitle: "Web & Mobile · AI Solutions · Automation · Research & Learning",
  });
}
