import { Icon } from "@/components/ui/icon";
import { Accent, SectionHeading } from "@/components/ui/section-heading";
import { Section } from "@/components/ui/section";
import { processSteps } from "@/data/content";
import { pad } from "@/lib/utils";

/** Connected timeline: vertical on small screens, a single horizontal track on large screens. */
export function Process({ eyebrow = "05 — Process" }: { eyebrow?: string }) {
  return (
    <Section id="process" labelledBy="process-title">
      <SectionHeading
        id="process-title"
        eyebrow={eyebrow}
        title={
          <>
            A clear path from idea to <Accent>impact.</Accent>
          </>
        }
        description="Six stages, each with a clear outcome. You always know where the project stands and what comes next."
      />

      <div className="relative mt-16">
        {/* connecting track */}
        <span
          aria-hidden="true"
          className="absolute top-2 bottom-2 left-[1.1875rem] w-px bg-linear-to-b from-accent via-border-strong to-border lg:top-[1.1875rem] lg:right-8 lg:bottom-auto lg:left-8 lg:h-px lg:w-auto lg:bg-linear-to-r"
        />
        <ol className="relative grid gap-10 lg:grid-cols-6 lg:gap-6">
          {processSteps.map((step, index) => (
            <li
              key={step.title}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${index * 80}ms` }}
              className="group relative grid grid-cols-[2.5rem_1fr] gap-x-5 lg:block"
            >
              <span className="relative z-10 inline-flex size-10 items-center justify-center rounded-full border border-border-strong bg-bg text-fg-muted transition-colors duration-300 group-hover:border-accent group-hover:text-accent-text">
                {step.icon && <Icon name={step.icon} className="size-4" />}
              </span>
              <div className="lg:mt-6">
                <p className="font-mono text-xs text-accent-text">{pad(index + 1)}</p>
                <h3 className="mt-1 text-lg font-semibold text-fg">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
