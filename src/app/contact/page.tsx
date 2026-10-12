import { Mail } from "lucide-react";
import { ContactForm } from "@/components/forms/contact-form";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";
import { Accent } from "@/components/ui/section-heading";
import { SocialIcon, socialLabels } from "@/components/ui/social-icons";
import { configuredSocialLinks, siteConfig } from "@/config/site";
import { services } from "@/data/services";
import { pageMetadata } from "@/lib/metadata";
import { pad } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Tell us about your project, research or learning goals. Deep Root Code will reply with questions, ideas and a suggested next step.",
  path: "/contact",
});

const nextSteps = [
  { title: "We read your message", description: "Every enquiry is read by a developer, not routed to a sales script." },
  {
    title: "We ask the right questions",
    description: "If anything is unclear, we follow up to understand your goals, constraints and timeline.",
  },
  {
    title: "We suggest a path forward",
    description: "You receive a recommended approach and next step — whether that's a call, a proposal or a session.",
  },
];

const briefTips = [
  "What you want to build, improve or learn",
  "Who it's for and the problem it solves",
  "Anything that already exists (code, designs, data)",
  "Deadlines, budget range or other constraints",
];

export default function ContactPage() {
  const serviceBySlug = Object.fromEntries(services.map((s) => [s.slug, s.contactCategory]));
  const socials = configuredSocialLinks();

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={
          <>
            Let&apos;s talk about what <Accent>you&apos;re building.</Accent>
          </>
        }
        description="Describe your project, research or learning goals in your own words. The more context you share, the more useful our first reply will be."
      />

      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div id="contact-form" className="scroll-mt-28 lg:col-span-7" data-reveal>
            <h2 className="sr-only">Contact form</h2>
            <ContactForm serviceBySlug={serviceBySlug} />
          </div>

          <aside className="flex flex-col gap-10 lg:col-span-5" aria-label="Contact information">
            <div data-reveal>
              <h2 className="eyebrow mb-4">A good brief includes</h2>
              <ul className="flex flex-col gap-2.5">
                {briefTips.map((tip) => (
                  <li key={tip} className="flex gap-3 text-fg-muted">
                    <span aria-hidden="true" className="mt-3 h-px w-4 shrink-0 bg-accent" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            <div data-reveal>
              <h2 className="eyebrow mb-4">What happens next</h2>
              <ol className="hairline-grid">
                {nextSteps.map((step, index) => (
                  <li key={step.title} className="flex gap-4 bg-surface p-5">
                    <span className="font-mono text-xs leading-6 text-accent-text">{pad(index + 1)}</span>
                    <div>
                      <h3 className="font-medium text-fg">{step.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-fg-muted">{step.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {(siteConfig.contactEmail || socials.length > 0) && (
              <div data-reveal className="flex flex-col gap-4">
                <h2 className="eyebrow">Other ways to reach us</h2>
                {siteConfig.contactEmail && (
                  <a
                    href={`mailto:${siteConfig.contactEmail}`}
                    className="inline-flex w-fit items-center gap-2.5 font-mono text-fg hover:text-accent-text"
                  >
                    <Mail aria-hidden="true" className="size-4" />
                    {siteConfig.contactEmail}
                  </a>
                )}
                {socials.length > 0 && (
                  <ul className="flex flex-wrap gap-2">
                    {socials.map(({ key, href }) => (
                      <li key={key}>
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex h-10 items-center gap-2 rounded-full border border-border px-4 text-sm text-fg-muted transition-colors hover:border-border-strong hover:text-fg"
                        >
                          <SocialIcon name={key} className="size-4" />
                          {socialLabels[key]}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </aside>
        </div>
      </Container>
    </>
  );
}
