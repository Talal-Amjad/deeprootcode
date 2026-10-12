import type { NavItem } from "@/types";

/**
 * Central brand & site configuration.
 * Edit this file to update company details, links and CTA labels.
 * Values that depend on the deployment come from environment variables (see .env.example).
 */

function normaliseUrl(url: string | undefined): string {
  const fallback = "http://localhost:3000";
  return (url && url.trim() ? url.trim() : fallback).replace(/\/+$/, "");
}

export const siteConfig = {
  name: "Deep Root Code",
  shortName: "DeepRoot",
  tagline: "Building Digital Solutions from the Root Up.",
  description:
    "Deep Root Code is a software development agency building web and mobile applications, AI-powered products, automations and research prototypes for businesses, startups, researchers and students.",

  url: normaliseUrl(process.env.NEXT_PUBLIC_SITE_URL),

  /**
   * Public contact email. Empty until NEXT_PUBLIC_CONTACT_EMAIL is set,
   * in which case the site hides email links and points people to the contact form.
   */
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() ?? "",

  /**
   * Social profiles. Leave a value empty to hide that link.
   * Example: github: "https://github.com/your-org"
   */
  social: {
    github: "",
    linkedin: "",
    x: "",
  },

  /** Brand colours — mirrored as CSS variables in src/app/globals.css. */
  brandColors: {
    copper: "#a8501a",
    copperLight: "#f0a05a",
    signal: "#0f6e66",
    signalLight: "#5fd3c1",
    ink: "#14161a",
    graphite: "#0a0c0d",
    paper: "#f6f4ef",
  },

  cta: {
    primary: { label: "Start a Project", href: "/contact" },
    secondary: { label: "Explore Our Work", href: "/projects" },
    nav: { label: "Let's Talk", href: "/contact" },
    research: { label: "Discuss Your Research", href: "/research-learning#inquiry" },
    learning: { label: "Book a Learning Session", href: "/research-learning#inquiry" },
  },

  /** Placeholders for the legal pages — replace before launch. */
  legal: {
    entityName: "[Registered company name]",
    jurisdiction: "[Country / State]",
    lastUpdated: "[Date]",
  },
} as const;

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Technologies", href: "/#technologies" },
  { label: "Research & Learning", href: "/research-learning" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const legalNav: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

export type SocialKey = keyof typeof siteConfig.social;

export function configuredSocialLinks(): { key: SocialKey; href: string }[] {
  return (Object.entries(siteConfig.social) as [SocialKey, string][])
    .filter(([, href]) => href.trim() !== "")
    .map(([key, href]) => ({ key, href }));
}
