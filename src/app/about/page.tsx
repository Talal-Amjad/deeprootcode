import { PageHeader } from "@/components/layout/page-header";
import { FinalCta } from "@/components/sections/final-cta";
import { RootNetwork } from "@/components/sections/root-network";
import { Icon } from "@/components/ui/icon";
import { Section } from "@/components/ui/section";
import { Accent, SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/config/site";
import { clientTypes, coreValues } from "@/data/content";
import { pageMetadata } from "@/lib/metadata";
import { pad } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "About",
  description:
    "Deep Root Code builds practical, maintainable software on strong engineering foundations — for businesses, startups, researchers and learners.",
  path: "/about",
});

const engineeringApproach = [
  {
    title: "Foundations first",
    description:
      "Data models, architecture and infrastructure decide how easily software can change. We give them the attention they deserve early, when it's cheapest.",
  },
  {
    title: "Simple before clever",
    description:
      "We prefer clear, conventional solutions that any capable developer can pick up. Complexity is added only when a real requirement demands it.",
  },
  {
    title: "Quality is built in",
    description:
      "Code review, automated tests, accessibility and security are part of everyday work — not a phase at the end.",
  },
  {
    title: "Ownership stays with you",
    description:
      "Clean repositories, documentation and handover sessions mean you are never locked in to us to keep your product running.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title={
          <>
            We build technology on <Accent>strong foundations.</Accent>
          </>
        }
        description={`${siteConfig.name} is a software development agency for people with ideas worth building properly — and for those who want to learn how.`}
      />

      {/* Who we are */}
      <Section labelledBy="who-title">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeading id="who-title" eyebrow="Who we are" title="Engineers who care about what's underneath." />
            <div data-reveal className="mt-8 flex flex-col gap-5 text-lg leading-relaxed text-fg-muted">
              <p>
                {siteConfig.name} turns ideas into reliable, scalable and useful digital products. We design and build
                web and mobile applications, AI-powered tools, automations and research prototypes — and we teach the
                skills behind them.
              </p>
              <p>
                Our name reflects how we work. Healthy systems grow from deep roots: a clear understanding of the
                problem, sound architecture and code that is easy to reason about. Get those right and everything built
                on top becomes faster, safer and easier to change.
              </p>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="relative mx-auto aspect-[56/50] w-full max-w-md rounded-2xl border border-border bg-surface p-6">
              <RootNetwork className="h-full w-full" />
            </div>
          </div>
        </div>
      </Section>

      {/* Mission & vision */}
      <Section labelledBy="mission-title" className="border-y border-border bg-surface/40">
        <h2 id="mission-title" className="sr-only">
          Mission and vision
        </h2>
        <div className="hairline-grid md:grid-cols-2">
          {[
            {
              label: "Our mission",
              text: "To help businesses, founders, researchers and learners turn ideas into practical, well-engineered digital solutions — and to leave every client more capable than when we started.",
            },
            {
              label: "Our vision",
              text: "A world where good engineering is accessible to every ambitious idea, regardless of team size — where software is built to last, and knowledge is shared rather than guarded.",
            },
          ].map((item) => (
            <div key={item.label} data-reveal className="bg-surface p-8 sm:p-12">
              <p className="eyebrow flex items-center gap-2">
                <span aria-hidden="true" className="inline-block h-px w-6 bg-accent" />
                {item.label}
              </p>
              <p className="mt-6 text-2xl leading-snug font-medium tracking-tight text-fg sm:text-[1.7rem]">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Engineering approach */}
      <Section labelledBy="approach-title">
        <SectionHeading
          id="approach-title"
          eyebrow="Our approach"
          title={
            <>
              How we think about <Accent>software engineering.</Accent>
            </>
          }
        />
        <ol className="mt-14 grid gap-x-12 gap-y-10 md:grid-cols-2">
          {engineeringApproach.map((item, index) => (
            <li
              key={item.title}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${(index % 2) * 80}ms` }}
              className="grid grid-cols-[3rem_1fr] border-t border-border pt-6"
            >
              <span className="font-mono text-sm text-accent-text">{pad(index + 1)}</span>
              <div>
                <h3 className="text-xl font-semibold text-fg">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-fg-muted">{item.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* Learning & innovation */}
      <Section labelledBy="learning-title" className="border-t border-border bg-surface/40">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              id="learning-title"
              eyebrow="Learning & innovation"
              title={
                <>
                  Always learning, <Accent>deliberately.</Accent>
                </>
              }
            />
          </div>
          <div data-reveal className="flex flex-col gap-5 text-lg leading-relaxed text-fg-muted lg:col-span-7">
            <p>
              Technology changes quickly, especially in AI. We set aside time to study new tools, read research and
              build experiments — so our recommendations are grounded in hands-on experience, not headlines.
            </p>
            <p>
              We are equally selective about what we adopt. A new framework or model earns its place in a client
              project only when it makes the result simpler, faster or more reliable.
            </p>
            <p>
              Teaching is part of that commitment. Explaining our work to students, researchers and client teams keeps
              our own understanding sharp and makes the people we work with more independent.
            </p>
          </div>
        </div>
      </Section>

      {/* Who we work with */}
      <Section labelledBy="clients-title">
        <SectionHeading
          id="clients-title"
          eyebrow="Who we work with"
          title="Clients and collaborators"
          description="Different goals, the same standard of care. Hire us to build, collaborate on research, get technical guidance or learn a technology."
        />
        <ul className="hairline-grid mt-14 sm:grid-cols-2 lg:grid-cols-4">
          {clientTypes.map((client, index) => (
            <li
              key={client.title}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${index * 70}ms` }}
              className="group bg-surface p-7 transition-colors hover:bg-bg"
            >
              {client.icon && (
                <Icon
                  name={client.icon}
                  className="size-6 text-fg-muted transition-colors group-hover:text-accent-text"
                />
              )}
              <h3 className="mt-6 text-lg font-semibold text-fg">{client.title}</h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-fg-muted">{client.description}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Values */}
      <Section labelledBy="values-title" className="border-t border-border bg-surface/40">
        <SectionHeading id="values-title" eyebrow="Core values" title="What we hold ourselves to" />
        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {coreValues.map((value, index) => (
            <li
              key={value.title}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${index * 70}ms` }}
              className="rounded-2xl border border-border bg-surface p-7"
            >
              {value.icon && (
                <span className="inline-flex size-10 items-center justify-center rounded-lg bg-accent-soft text-accent-text">
                  <Icon name={value.icon} className="size-5" />
                </span>
              )}
              <h3 className="mt-5 text-lg font-semibold text-fg">{value.title}</h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-fg-muted">{value.description}</p>
            </li>
          ))}
        </ul>
      </Section>

      <FinalCta />
    </>
  );
}
