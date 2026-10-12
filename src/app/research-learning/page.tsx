import { ShieldCheck } from "lucide-react";
import { ContactForm } from "@/components/forms/contact-form";
import { PageHeader } from "@/components/layout/page-header";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Section } from "@/components/ui/section";
import { Accent, SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/config/site";
import { integrityStatement, researchOfferings } from "@/data/content";
import { pageMetadata } from "@/lib/metadata";
import { pad } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Research & Learning",
  description:
    "Research implementation, AI/ML prototyping, Master's and PhD technical collaboration, project mentoring, one-to-one learning sessions and code reviews.",
  path: "/research-learning",
});

const groups = [
  {
    audience: "research" as const,
    id: "research",
    eyebrow: "For researchers",
    title: (
      <>
        Engineering support for <Accent>serious research.</Accent>
      </>
    ),
    description:
      "You bring the research questions and domain expertise. We help with the technical implementation — reliable code, reproducible experiments and tools that let you focus on the science.",
  },
  {
    audience: "learning" as const,
    id: "learning",
    eyebrow: "For students & learners",
    title: (
      <>
        Learn by building, with <Accent>a guide beside you.</Accent>
      </>
    ),
    description:
      "Whether you are working on a university project, changing careers or levelling up at work, we tailor sessions to your goals and help you understand — not just finish — the work.",
  },
];

const commitments = [
  {
    title: "You stay the author",
    description: "Your research questions, analysis, conclusions and written work remain yours.",
  },
  {
    title: "Understanding over output",
    description: "We explain the code we write or review so you can describe, defend and extend it.",
  },
  {
    title: "Transparent collaboration",
    description: "We support appropriate disclosure and work within your institution's guidelines.",
  },
  {
    title: "Honest results",
    description: "Experiments are implemented faithfully — we never fabricate data or adjust results to fit.",
  },
];

export default function ResearchLearningPage() {
  return (
    <>
      <PageHeader
        eyebrow="Research & Learning"
        title={
          <>
            Where research and learning <Accent>take root.</Accent>
          </>
        }
        description="Technical collaboration for researchers and hands-on mentoring for students and developers — grounded in real engineering and academic integrity."
      >
        <ButtonLink href="#inquiry" size="lg" arrow>
          {siteConfig.cta.research.label}
        </ButtonLink>
        <ButtonLink href="#inquiry" size="lg" variant="secondary">
          {siteConfig.cta.learning.label}
        </ButtonLink>
      </PageHeader>

      {groups.map((group, groupIndex) => (
        <Section
          key={group.id}
          id={group.id}
          labelledBy={`${group.id}-title`}
          className={groupIndex === 1 ? "border-t border-border bg-surface/40" : undefined}
        >
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-28">
                <SectionHeading
                  id={`${group.id}-title`}
                  eyebrow={group.eyebrow}
                  title={group.title}
                  description={group.description}
                />
              </div>
            </div>
            <ul className="hairline-grid sm:grid-cols-2 lg:col-span-7">
              {researchOfferings
                .filter((offering) => offering.audience === group.audience)
                .map((offering, index) => (
                  <li
                    key={offering.id}
                    id={offering.id}
                    data-reveal
                    style={{ ["--reveal-delay" as string]: `${(index % 2) * 70}ms` }}
                    className="group flex flex-col bg-surface p-7 transition-colors hover:bg-bg"
                  >
                    <div className="flex items-center justify-between">
                      {offering.icon && (
                        <Icon
                          name={offering.icon}
                          className="size-6 text-fg-muted transition-colors group-hover:text-accent-text"
                        />
                      )}
                      <span className="font-mono text-xs text-fg-subtle">{pad(index + 1)}</span>
                    </div>
                    <h3 className="mt-6 text-lg font-semibold text-fg">{offering.title}</h3>
                    <p className="mt-2 text-[0.95rem] leading-relaxed text-fg-muted">{offering.description}</p>
                  </li>
                ))}
            </ul>
          </div>
        </Section>
      ))}

      <Section labelledBy="integrity-title" className="border-t border-border">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              id="integrity-title"
              eyebrow="Academic integrity"
              title={
                <>
                  Collaboration with <Accent>clear boundaries.</Accent>
                </>
              }
            />
            <div data-reveal className="mt-8 flex gap-3 rounded-xl border border-signal/25 bg-signal-soft p-5">
              <ShieldCheck aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-signal" />
              <p className="text-sm leading-relaxed text-fg-muted">{integrityStatement}</p>
            </div>
          </div>
          <ul className="grid gap-6 sm:grid-cols-2 lg:col-span-7">
            {commitments.map((item, index) => (
              <li
                key={item.title}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${(index % 2) * 70}ms` }}
                className="border-t border-border-strong pt-5"
              >
                <h3 className="font-semibold text-fg">{item.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-fg-muted">{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section id="inquiry" labelledBy="inquiry-title" className="scroll-mt-16 border-t border-border bg-surface/40">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              id="inquiry-title"
              eyebrow="Start a conversation"
              title={
                <>
                  Tell us about your research or <Accent>learning goals.</Accent>
                </>
              }
              description="Share your topic, where you are now and where you'd like support. We'll reply with questions and a suggested way to work together."
            />
          </div>
          <div data-reveal className="lg:col-span-7">
            <ContactForm variant="research" />
          </div>
        </div>
      </Section>
    </>
  );
}
