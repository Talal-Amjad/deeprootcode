import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { FinalCta } from "@/components/sections/final-cta";
import { Process } from "@/components/sections/process";
import { ArrowLink, ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Accent } from "@/components/ui/section-heading";
import { Container } from "@/components/ui/container";
import { services } from "@/data/services";
import { pageMetadata } from "@/lib/metadata";
import { pad } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Services",
  description:
    "Web development, AI & machine learning, automation, mobile apps, backend APIs, research & development, academic projects and technical training.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title={
          <>
            Everything you need to build, <Accent>from the root up.</Accent>
          </>
        }
        description="From a first prototype to a production platform, from a research experiment to a one-to-one learning session — choose the kind of help you need."
      />

      <nav aria-label="Services on this page" className="border-b border-border bg-surface/60">
        <Container>
          <ul className="flex gap-2 overflow-x-auto py-4 [scrollbar-width:none]">
            {services.map((service) => (
              <li key={service.slug} className="shrink-0">
                <Link
                  href={`#${service.slug}`}
                  className="inline-flex h-9 items-center gap-2 rounded-full border border-border bg-surface px-3.5 text-sm text-fg-muted transition-colors hover:border-border-strong hover:text-fg"
                >
                  <Icon name={service.icon} className="size-4" />
                  {service.shortTitle}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </nav>

      <Container>
        {services.map((service, index) => (
          <section
            key={service.slug}
            id={service.slug}
            aria-labelledby={`${service.slug}-title`}
            className="grid gap-10 border-b border-border py-16 last:border-b-0 sm:py-20 lg:grid-cols-12 lg:gap-16"
          >
            <div data-reveal className="lg:col-span-5">
              <div className="flex flex-col gap-5 lg:sticky lg:top-28">
                <div className="flex items-center gap-4">
                  <span className="inline-flex size-12 items-center justify-center rounded-xl border border-border bg-surface text-accent-text">
                    <Icon name={service.icon} className="size-6" />
                  </span>
                  <span className="font-mono text-xs text-fg-subtle">{pad(index + 1)} / {pad(services.length)}</span>
                </div>
                <h2 id={`${service.slug}-title`} className="text-3xl font-semibold text-fg sm:text-4xl">
                  {service.title}
                </h2>
                <p className="text-lg leading-relaxed text-fg-muted">{service.summary}</p>
                <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                  <ButtonLink href={`/contact?service=${service.slug}`} arrow>
                    {service.ctaLabel}
                  </ButtonLink>
                  <ButtonLink href={`/services/${service.slug}`} variant="secondary">
                    Service details
                  </ButtonLink>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-10 lg:col-span-7">
              <p data-reveal className="text-base leading-relaxed text-fg sm:text-lg">
                {service.overview}
              </p>

              <div data-reveal>
                <h3 className="eyebrow mb-4">Typical problems we solve</h3>
                <ul className="flex flex-col gap-3">
                  {service.problems.map((problem) => (
                    <li key={problem} className="flex gap-3 text-[0.95rem] leading-relaxed text-fg-muted">
                      <span aria-hidden="true" className="mt-2.5 h-px w-4 shrink-0 bg-accent" />
                      {problem}
                    </li>
                  ))}
                </ul>
              </div>

              <div data-reveal>
                <h3 className="eyebrow mb-4">What we can deliver</h3>
                <ul className="hairline-grid rounded-xl sm:grid-cols-2">
                  {service.capabilities.map((capability) => (
                    <li key={capability} className="bg-surface px-4 py-3.5 text-sm text-fg">
                      {capability}
                    </li>
                  ))}
                </ul>
              </div>

              <div data-reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h3 className="eyebrow mb-3">Relevant technologies</h3>
                  <ul className="flex flex-wrap gap-2">
                    {service.technologies.map((tech) => (
                      <li key={tech} className="rounded-md border border-border bg-bg px-2.5 py-1 font-mono text-xs text-fg">
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
                <ArrowLink href={`/services/${service.slug}`} className="shrink-0">
                  Our approach
                </ArrowLink>
              </div>
            </div>
          </section>
        ))}
      </Container>

      <div className="border-t border-border bg-surface/40">
        <Process eyebrow="Our development approach" />
      </div>

      <FinalCta />
    </>
  );
}
