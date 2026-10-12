import { ButtonLink } from "@/components/ui/button";
import { Accent, SectionHeading } from "@/components/ui/section-heading";
import { Section } from "@/components/ui/section";
import { ServiceCard } from "@/components/services/service-card";
import { services } from "@/data/services";
import { cn } from "@/lib/utils";

/** Bento layout on large screens: wide tiles open and close the grid, compact tiles fill the middle row. */
const wideIndexes = new Set([0, 1, 6, 7]);

export function ServicesOverview() {
  return (
    <Section id="services" labelledBy="services-title">
      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <SectionHeading
          id="services-title"
          eyebrow="01 — Services"
          title={
            <>
              End-to-end engineering, <Accent>one foundation.</Accent>
            </>
          }
          description="Hire us to build a product, automate a process, collaborate on research or learn a technology. Every engagement rests on the same engineering standards."
        />
        <ButtonLink href="/services" variant="secondary" arrow className="self-start md:self-auto">
          All services
        </ButtonLink>
      </div>

      <div className="hairline-grid mt-14 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service, index) => (
          <ServiceCard
            key={service.slug}
            service={service}
            index={index}
            featured={wideIndexes.has(index)}
            className={cn(wideIndexes.has(index) && "lg:col-span-2")}
          />
        ))}
      </div>
    </Section>
  );
}
