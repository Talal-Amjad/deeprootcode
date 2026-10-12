import { configuredSocialLinks, siteConfig } from "@/config/site";

/**
 * JSON-LD builders. Only facts from site config and page content are used —
 * no ratings, reviews, addresses or other details that can't be verified.
 */

const ORG_ID = `${siteConfig.url}/#organization`;
const SITE_ID = `${siteConfig.url}/#website`;

export function absoluteUrl(path: string): string {
  return `${siteConfig.url}${path === "/" ? "" : path}`;
}

export function organizationSchema(knowsAbout: string[]) {
  const sameAs = configuredSocialLinks().map((link) => link.href);
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: absoluteUrl("/icon.svg"),
    description: siteConfig.description,
    slogan: siteConfig.tagline,
    knowsAbout,
    ...(siteConfig.contactEmail ? { email: siteConfig.contactEmail } : {}),
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": SITE_ID,
    name: siteConfig.name,
    alternateName: "DeepRootCode",
    url: siteConfig.url,
    publisher: { "@id": ORG_ID },
    inLanguage: "en",
  };
}

export type Crumb = { name: string; path: string };

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

export function serviceSchema(service: { title: string; summary: string; slug: string; capabilities: string[] }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    serviceType: service.title,
    description: service.summary,
    url: absoluteUrl(`/services/${service.slug}`),
    provider: { "@id": ORG_ID },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: service.title,
      itemListElement: service.capabilities.map((capability) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: capability },
      })),
    },
  };
}

export type Faq = { question: string; answer: string };

export function faqSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}
