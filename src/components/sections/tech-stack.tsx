import { Icon } from "@/components/ui/icon";
import { Accent, SectionHeading } from "@/components/ui/section-heading";
import { Section } from "@/components/ui/section";
import { technologyCategories } from "@/data/technologies";

export function TechStack() {
  return (
    <Section id="technologies" labelledBy="tech-title" className="border-t border-border bg-surface/40">
      <SectionHeading
        id="tech-title"
        eyebrow="04 — Technologies"
        title={
          <>
            The right tools, <Accent>chosen deliberately.</Accent>
          </>
        }
        description="We work across a broad, proven stack and pick technologies for each project based on its needs, your team and long-term maintenance — not novelty."
      />

      <div className="hairline-grid mt-14 md:grid-cols-2 lg:grid-cols-3">
        {technologyCategories.map((category, index) => (
          <section
            key={category.id}
            id={`tech-${category.id}`}
            aria-labelledby={`tech-${category.id}-title`}
            data-reveal
            style={{ ["--reveal-delay" as string]: `${(index % 3) * 70}ms` }}
            className="group flex flex-col bg-surface p-7 transition-colors duration-300 hover:bg-bg"
          >
            <div className="flex items-center gap-3">
              <span className="inline-flex size-9 items-center justify-center rounded-lg border border-border text-fg-muted transition-colors duration-300 group-hover:border-accent/40 group-hover:text-accent-text">
                <Icon name={category.icon} className="size-[1.1rem]" />
              </span>
              <h3 id={`tech-${category.id}-title`} className="text-lg font-semibold text-fg">
                {category.title}
              </h3>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-fg-muted">{category.description}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {category.items.map((item) => (
                <li
                  key={item}
                  className="rounded-md border border-border bg-bg px-2.5 py-1 font-mono text-xs text-fg transition-[border-color,color,transform] duration-200 hover:-translate-y-px hover:border-accent/50 hover:text-accent-text"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </Section>
  );
}
