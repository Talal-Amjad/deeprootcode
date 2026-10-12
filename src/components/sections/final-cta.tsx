import { ButtonLink } from "@/components/ui/button";
import { Accent } from "@/components/ui/section-heading";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";

/** Decorative branching lines that echo the hero network. */
function RootLines() {
  const paths = [
    "M600 0 C600 80 420 90 380 200 S300 320 240 400",
    "M600 0 C600 90 600 160 600 240 S560 340 520 400",
    "M600 0 C600 80 780 90 820 200 S900 320 960 400",
    "M380 200 C360 260 300 280 200 300",
    "M820 200 C840 260 900 280 1000 300",
    "M600 240 C620 300 680 330 700 400",
  ];
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1200 400"
      preserveAspectRatio="xMidYMin slice"
      className="pointer-events-none absolute inset-0 h-full w-full"
      fill="none"
    >
      {paths.map((d) => (
        <path key={d} d={d} stroke="var(--fg)" strokeOpacity="0.09" strokeWidth="1.2" />
      ))}
      {[
        [380, 200],
        [820, 200],
        [600, 240],
        [200, 300],
        [1000, 300],
      ].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="4" fill="var(--accent)" fillOpacity="0.5" />
      ))}
    </svg>
  );
}

export function FinalCta({
  title = (
    <>
      Have an Idea? Let&apos;s Build It from the <Accent>Root.</Accent>
    </>
  ),
  description = "Tell us what you're planning. We'll help you explore the right approach and turn your idea into a practical digital solution.",
}: {
  title?: React.ReactNode;
  description?: string;
}) {
  return (
    <section aria-labelledby="cta-title" className="py-20 sm:py-28">
      <Container>
        <div
          data-reveal
          className="relative overflow-hidden rounded-3xl border border-border bg-surface px-6 py-16 text-center shadow-md sm:px-12 sm:py-24"
        >
          <RootLines />
          <div className="relative mx-auto flex max-w-2xl flex-col items-center">
            <h2 id="cta-title" className="text-3xl leading-[1.1] font-semibold text-fg sm:text-5xl">
              {title}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-fg-muted sm:text-lg">{description}</p>
            <div className="mt-9 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
              <ButtonLink href={siteConfig.cta.primary.href} size="lg" arrow>
                {siteConfig.cta.primary.label}
              </ButtonLink>
              <ButtonLink href="/contact#contact-form" size="lg" variant="secondary">
                Contact Us
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
