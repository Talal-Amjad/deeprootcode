import { notFound } from "next/navigation";
import { ExternalLink, Info } from "lucide-react";
import { SocialIcon } from "@/components/ui/social-icons";
import { ProjectCard } from "@/components/projects/project-card";
import { ProjectVisual } from "@/components/projects/project-visual";
import { BackLink } from "@/components/layout/page-header";
import { FinalCta } from "@/components/sections/final-cta";
import { Badge, SampleBadge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { getProject, projects } from "@/data/projects";
import { pageMetadata } from "@/lib/metadata";
import { pad } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return pageMetadata({
    title: project.isSample ? `${project.title} (Sample)` : project.title,
    description: project.summary,
    path: `/projects/${project.slug}`,
  });
}

function DetailList({ title, items }: { title: string; items: string[] }) {
  return (
    <div data-reveal>
      <h2 className="eyebrow mb-4">{title}</h2>
      <ul className="flex flex-col gap-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 leading-relaxed text-fg">
            <span aria-hidden="true" className="mt-3 h-px w-4 shrink-0 bg-accent" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const related = projects.filter((p) => p.slug !== project.slug && p.category === project.category).slice(0, 2);
  const more = related.length ? related : projects.filter((p) => p.slug !== project.slug).slice(0, 2);

  return (
    <>
      <section className="relative -mt-16 overflow-hidden border-b border-border pt-16 sm:-mt-[4.5rem] sm:pt-[4.5rem]">
        <div aria-hidden="true" className="bg-grid mask-fade-b pointer-events-none absolute inset-0" />
        <Container className="relative pt-14 pb-14 sm:pt-20">
          <BackLink href="/projects" label="All projects" />
          <div className="flex flex-wrap items-center gap-2" data-reveal>
            <span className="eyebrow">{project.category}</span>
            {project.isSample && <SampleBadge />}
          </div>
          <h1 data-reveal className="mt-5 max-w-4xl text-4xl leading-[1.05] font-semibold text-fg sm:text-5xl lg:text-6xl">
            {project.title}
          </h1>
          <p data-reveal className="mt-6 max-w-2xl text-lg leading-relaxed text-fg-muted">
            {project.summary}
          </p>

          {(project.liveUrl || project.sourceUrl) && (
            <div data-reveal className="mt-8 flex flex-col gap-3 sm:flex-row">
              {project.liveUrl && (
                <ButtonLink href={project.liveUrl} external>
                  Live demo <ExternalLink aria-hidden="true" className="size-4" />
                </ButtonLink>
              )}
              {project.sourceUrl && (
                <ButtonLink href={project.sourceUrl} external variant="secondary">
                  <SocialIcon name="github" className="size-4" /> Source code
                </ButtonLink>
              )}
            </div>
          )}

          {project.isSample && (
            <p data-reveal className="mt-8 flex max-w-2xl items-start gap-2 text-sm leading-relaxed text-fg-muted">
              <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-signal" />
              This is an illustrative sample project describing how we would approach this type of problem. It is not a
              completed client engagement.
            </p>
          )}
        </Container>
      </section>

      <Container className="pt-12 sm:pt-16">
        <div data-reveal className="overflow-hidden rounded-2xl border border-border shadow-md">
          <ProjectVisual project={project} className="aspect-[400/260] w-full" sizes="(min-width: 1216px) 1152px, 100vw" priority />
        </div>
      </Container>

      <Section className="pt-16 sm:pt-20">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <aside className="lg:col-span-4">
            <div className="flex flex-col gap-8 rounded-2xl border border-border bg-surface p-7 lg:sticky lg:top-28">
              <div>
                <h2 className="eyebrow mb-2">Category</h2>
                <p className="text-fg">{project.category}</p>
              </div>
              <div>
                <h2 className="eyebrow mb-3">Technologies</h2>
                <ul className="flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <li key={tech}>
                      <Badge>{tech}</Badge>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="eyebrow mb-2">Status</h2>
                <p className="text-fg">{project.isSample ? "Illustrative sample" : "Delivered project"}</p>
              </div>
              <ButtonLink href="/contact" arrow className="w-full">
                Discuss a similar project
              </ButtonLink>
            </div>
          </aside>

          <div className="flex flex-col gap-14 lg:col-span-8">
            <DetailList title="Objectives" items={project.objectives} />
            <DetailList title="Challenges" items={project.challenges} />

            <div data-reveal>
              <h2 className="eyebrow mb-4">Solution</h2>
              <p className="text-xl leading-relaxed text-fg">{project.solution}</p>
            </div>

            <div data-reveal>
              <h2 className="eyebrow mb-4">Implementation</h2>
              <ol className="hairline-grid">
                {project.implementation.map((step, index) => (
                  <li key={step} className="flex gap-5 bg-surface p-5 sm:p-6">
                    <span className="font-mono text-xs leading-6 text-accent-text">{pad(index + 1)}</span>
                    <p className="leading-relaxed text-fg">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </Section>

      {more.length > 0 && (
        <Section labelledBy="more-title" className="border-t border-border bg-surface/40">
          <h2 id="more-title" className="text-2xl font-semibold text-fg sm:text-3xl">
            More projects
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {more.map((p, index) => (
              <ProjectCard key={p.slug} project={p} index={index} />
            ))}
          </div>
        </Section>
      )}

      <FinalCta />
    </>
  );
}
