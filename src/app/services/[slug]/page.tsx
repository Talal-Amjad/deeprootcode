import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { FinalCta } from "@/components/sections/final-cta";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { getService, services } from "@/data/services";
import { pageMetadata } from "@/lib/metadata";
import { pad } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMetadata({ title: service.title, description: service.summary, path: `/services/${service.slug}` });
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <PageHeader
        eyebrow={`Service · ${service.shortTitle}`}
        title={service.title}
        description={service.summary}
        back={{ href: "/services", label: "All services" }}
      >
        <ButtonLink href={`/contact?service=${service.slug}`} size="lg" arrow>
          {service.ctaLabel}
        </ButtonLink>
      </PageHeader>

      <Section labelledBy="overview-title">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 id="overview-title" className="eyebrow mb-4">
              Overview
            </h2>
            <p data-reveal className="text-xl leading-relaxed text-fg sm:text-2xl sm:leading-relaxed">
              {service.overview}
            </p>
          </div>

          <div className="lg:col-span-7">
            <h2 className="eyebrow mb-4">Typical problems we solve</h2>
            <ul className="hairline-grid sm:grid-cols-2">
              {service.problems.map((problem, index) => (
                <li
                  key={problem}
                  data-reveal
                  style={{ ["--reveal-delay" as string]: `${(index % 2) * 70}ms` }}
                  className="bg-surface p-6"
                >
                  <span className="font-mono text-xs text-accent-text">{pad(index + 1)}</span>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-fg">{problem}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section labelledBy="deliver-title" className="border-y border-border bg-surface/40">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading id="deliver-title" eyebrow="Deliverables" title="What we can deliver" />
            <ul className="mt-8 flex flex-col">
              {service.deliverables.map((item) => (
                <li key={item} data-reveal className="flex gap-3 border-b border-border py-4 text-fg">
                  <Check aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-signal" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <SectionHeading eyebrow="Stack" title="Relevant technologies" />
            <ul className="mt-8 flex flex-wrap gap-2">
              {service.technologies.map((tech) => (
                <li
                  key={tech}
                  data-reveal
                  className="rounded-md border border-border bg-bg px-3 py-1.5 font-mono text-sm text-fg"
                >
                  {tech}
                </li>
              ))}
            </ul>
            <p data-reveal className="mt-6 text-sm leading-relaxed text-fg-muted">
              We recommend a stack after understanding your requirements, team and existing systems — this list shows
              typical choices, not a fixed menu.
            </p>
          </div>
        </div>
      </Section>

      <Section labelledBy="approach-title">
        <SectionHeading id="approach-title" eyebrow="Approach" title="How we approach this work" />
        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {service.approach.map((step, index) => (
            <li
              key={step.title}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${index * 80}ms` }}
              className="rounded-2xl border border-border bg-surface p-7"
            >
              <span className="font-mono text-xs text-accent-text">{pad(index + 1)}</span>
              <h3 className="mt-3 text-lg font-semibold text-fg">{step.title}</h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-fg-muted">{step.description}</p>
            </li>
          ))}
        </ol>
      </Section>

      <FinalCta
        title={`Ready to talk about ${service.title.toLowerCase()}?`}
        description="Share a few details about your goals and constraints. We'll reply with questions, ideas and a suggested next step."
      />

      <nav aria-labelledby="other-services-title" className="border-t border-border bg-surface/40">
        <div className="container-page py-14">
          <h2 id="other-services-title" className="eyebrow mb-6">
            Other services
          </h2>
          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((other) => (
              <li key={other.slug}>
                <Link
                  href={`/services/${other.slug}`}
                  className="group flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3 text-sm text-fg transition-colors hover:border-border-strong"
                >
                  <Icon
                    name={other.icon}
                    className="size-4 text-fg-subtle transition-colors group-hover:text-accent-text"
                  />
                  {other.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
}
