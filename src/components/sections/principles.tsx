import { Icon } from "@/components/ui/icon";
import { Accent, SectionHeading } from "@/components/ui/section-heading";
import { Section } from "@/components/ui/section";
import { principles } from "@/data/content";

export function Principles() {
  return (
    <Section labelledBy="principles-title">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              id="principles-title"
              eyebrow="03 — How we work"
              title={
                <>
                  Principles over <Accent>promises.</Accent>
                </>
              }
              description="We'd rather show you how we think than tell you how good we are. These are the standards every project is held to."
            />
          </div>
        </div>

        <ul className="hairline-grid sm:grid-cols-2 lg:col-span-8">
          {principles.map((principle, index) => (
            <li
              key={principle.title}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${(index % 2) * 80}ms` }}
              className="group bg-surface p-7 transition-colors duration-300 hover:bg-bg"
            >
              {principle.icon && (
                <Icon
                  name={principle.icon}
                  className="size-5 text-fg-muted transition-colors duration-300 group-hover:text-accent-text"
                />
              )}
              <h3 className="mt-5 text-lg font-semibold text-fg">{principle.title}</h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-fg-muted">{principle.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
