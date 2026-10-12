import { Info } from "lucide-react";
import { ProjectCard } from "@/components/projects/project-card";
import { ButtonLink } from "@/components/ui/button";
import { Accent, SectionHeading } from "@/components/ui/section-heading";
import { Section } from "@/components/ui/section";
import { siteConfig } from "@/config/site";
import { featuredProjects } from "@/data/projects";

export function FeaturedProjects() {
  if (featuredProjects.length === 0) return null;
  const [lead, ...rest] = featuredProjects;
  const hasSamples = featuredProjects.some((project) => project.isSample);

  return (
    <Section id="work" labelledBy="work-title" className="border-t border-border bg-surface/40">
      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <SectionHeading
          id="work-title"
          eyebrow="02 — Selected work"
          title={
            <>
              Work that grows from <Accent>solid ground.</Accent>
            </>
          }
          description="A look at the kinds of products, automations and research tools we design and build."
        />
        <ButtonLink href={siteConfig.cta.secondary.href} variant="secondary" arrow className="self-start md:self-auto">
          View all projects
        </ButtonLink>
      </div>

      {hasSamples && (
        <p className="mt-8 flex items-start gap-2 text-sm text-fg-muted" data-reveal>
          <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-signal" />
          Projects marked &ldquo;Sample project&rdquo; are illustrative examples of our capabilities, not completed
          client engagements.
        </p>
      )}

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <ProjectCard project={lead} layout="wide" className="md:col-span-2" />
        {rest.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index + 1} />
        ))}
      </div>
    </Section>
  );
}
