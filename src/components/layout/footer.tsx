import Link from "next/link";
import { Mail } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { SocialIcon, socialLabels } from "@/components/ui/social-icons";
import { configuredSocialLinks, legalNav, mainNav, siteConfig } from "@/config/site";
import { services } from "@/data/services";
import { technologyCategories } from "@/data/technologies";

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h2 className="eyebrow mb-4">{title}</h2>
      <ul className="flex flex-col gap-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-sm text-fg-muted transition-colors hover:text-fg">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const socials = configuredSocialLinks();
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border bg-surface">
      <div className="container-page grid gap-12 py-16 md:grid-cols-12 md:gap-8">
        <div className="flex flex-col gap-5 md:col-span-4">
          <Link href="/" aria-label={`${siteConfig.name} — home`} className="w-fit rounded-md">
            <Logo />
          </Link>
          <p className="max-w-xs text-sm leading-relaxed text-fg-muted">
            {siteConfig.tagline} We build web and mobile applications, AI solutions, automations and research
            prototypes — and help people learn to build them too.
          </p>

          {siteConfig.contactEmail ? (
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="inline-flex w-fit items-center gap-2 font-mono text-sm text-fg hover:text-accent-text"
            >
              <Mail aria-hidden="true" className="size-4" />
              {siteConfig.contactEmail}
            </a>
          ) : (
            <Link href="/contact" className="inline-flex w-fit items-center gap-2 text-sm text-fg hover:text-accent-text">
              <Mail aria-hidden="true" className="size-4" />
              Send us a message
            </Link>
          )}

          {socials.length > 0 && (
            <ul className="flex gap-2" aria-label="Social media">
              {socials.map(({ key, href }) => (
                <li key={key}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={socialLabels[key]}
                    className="inline-flex size-10 items-center justify-center rounded-full border border-border text-fg-muted transition-colors hover:border-border-strong hover:text-fg"
                  >
                    <SocialIcon name={key} className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:col-span-8">
          <FooterColumn title="Navigate" links={mainNav} />
          <FooterColumn
            title="Services"
            links={services.map((s) => ({ label: s.shortTitle, href: `/services/${s.slug}` }))}
          />
          <FooterColumn
            title="Capabilities"
            links={technologyCategories.map((c) => ({ label: c.title, href: `/#tech-${c.id}` }))}
          />
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-page flex flex-col gap-3 py-6 text-xs text-fg-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {legalNav.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-fg">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
