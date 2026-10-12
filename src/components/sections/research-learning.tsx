import { ShieldCheck } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Accent, SectionHeading } from "@/components/ui/section-heading";
import { Section } from "@/components/ui/section";
import { siteConfig } from "@/config/site";
import { integrityStatement, researchOfferings } from "@/data/content";

const groups = [
  { audience: "research" as const, title: "For researchers", note: "Master's, PhD and applied research" },
  { audience: "learning" as const, title: "For students & learners", note: "Projects, mentoring and sessions" },
];

export function ResearchLearning() {
  return (
    <Section id="research" labelledBy="research-title" className="relative overflow-hidden border-t border-border">
      <div aria-hidden="true" className="bg-grid mask-fade-b pointer-events-none absolute inset-0 opacity-60" />

      <div className="relative grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="flex flex-col gap-8 lg:col-span-5">
          <SectionHeading
            id="research-title"
            eyebrow="06 — Research & Learning"
            title={
              <>
                Where engineering meets <Accent>discovery.</Accent>
              </>
            }
            description="Beyond client projects, we collaborate with researchers on technical implementation and help students and developers grow through hands-on mentoring."
          />

          <div data-reveal className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={siteConfig.cta.research.href} arrow>
              {siteConfig.cta.research.label}
            </ButtonLink>
            <ButtonLink href={siteConfig.cta.learning.href} variant="secondary">
              {siteConfig.cta.learning.label}
            </ButtonLink>
          </div>

          <div data-reveal className="flex gap-3 rounded-xl border border-signal/25 bg-signal-soft p-5">
            <ShieldCheck aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-signal" />
            <div>
              <p className="text-sm font-semibold text-fg">Academic integrity, always</p>
              <p className="mt-1 text-sm leading-relaxed text-fg-muted">{integrityStatement}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:col-span-7">
          {groups.map((group) => (
            <div key={group.audience}>
              <div data-reveal className="border-b border-border pb-4">
                <h3 className="text-lg font-semibold text-fg">{group.title}</h3>
                <p className="mt-0.5 font-mono text-xs text-fg-subtle">{group.note}</p>
              </div>
              <ul className="mt-2">
                {researchOfferings
                  .filter((offering) => offering.audience === group.audience)
                  .map((offering, index) => (
                    <li
                      key={offering.id}
                      data-reveal
                      style={{ ["--reveal-delay" as string]: `${index * 60}ms` }}
                      className="group flex gap-4 border-b border-border py-5"
                    >
                      {offering.icon && (
                        <Icon
                          name={offering.icon}
                          className="mt-0.5 size-5 shrink-0 text-fg-subtle transition-colors group-hover:text-accent-text"
                        />
                      )}
                      <div>
                        <h4 className="font-medium text-fg">{offering.title}</h4>
                        <p className="mt-1 text-sm leading-relaxed text-fg-muted">{offering.description}</p>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
