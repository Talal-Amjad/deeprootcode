import { ButtonLink } from "@/components/ui/button";
import { Accent } from "@/components/ui/section-heading";
import { siteConfig } from "@/config/site";
import { RootNetwork } from "./root-network";

/** Precise corner ticks that frame the visual like a technical drawing. */
function CornerTicks() {
  const base = "absolute size-3 border-fg-subtle/60";
  return (
    <>
      <span aria-hidden="true" className={`${base} top-0 left-0 border-t border-l`} />
      <span aria-hidden="true" className={`${base} top-0 right-0 border-t border-r`} />
      <span aria-hidden="true" className={`${base} bottom-0 left-0 border-b border-l`} />
      <span aria-hidden="true" className={`${base} right-0 bottom-0 border-r border-b`} />
    </>
  );
}

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative -mt-16 overflow-hidden pt-16 sm:-mt-[4.5rem] sm:pt-[4.5rem]">
      <div aria-hidden="true" className="bg-grid mask-fade-b pointer-events-none absolute inset-0" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[-20%] right-[-10%] h-[36rem] w-[36rem] rounded-full bg-accent/10 blur-3xl dark:bg-accent/[0.07]"
      />

      <div className="container-page relative grid items-center gap-12 pt-14 pb-20 sm:pt-20 lg:grid-cols-12 lg:gap-8 lg:pt-24 lg:pb-28">
        <div className="flex flex-col items-start lg:col-span-6">
          <p
            data-reveal
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3 py-1 font-mono text-xs text-fg-muted backdrop-blur"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full rounded-full bg-signal opacity-60 motion-safe:animate-ping" />
              <span className="relative inline-flex size-2 rounded-full bg-signal" />
            </span>
            Software Development Agency · AI · Automation
          </p>

          <h1
            id="hero-title"
            data-reveal
            style={{ ["--reveal-delay" as string]: "60ms" }}
            className="text-[2.6rem] leading-[1.02] font-semibold tracking-[-0.035em] text-fg sm:text-6xl lg:text-[4.1rem] xl:text-[4.5rem]"
          >
            Great Digital Products Start at the <Accent>Root.</Accent>
          </h1>

          <p
            data-reveal
            style={{ ["--reveal-delay" as string]: "120ms" }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-fg-muted"
          >
            We build modern web and mobile applications, AI-powered solutions, and intelligent automations that help
            businesses turn ambitious ideas into reality.
          </p>

          <div
            data-reveal
            style={{ ["--reveal-delay" as string]: "180ms" }}
            className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
          >
            <ButtonLink href={siteConfig.cta.primary.href} size="lg" arrow>
              {siteConfig.cta.primary.label}
            </ButtonLink>
            <ButtonLink href={siteConfig.cta.secondary.href} size="lg" variant="secondary">
              {siteConfig.cta.secondary.label}
            </ButtonLink>
          </div>
        </div>

        <div className="relative lg:col-span-6">
          <div className="relative mx-auto aspect-[56/50] w-full max-w-[34rem] p-4 sm:p-6">
            <CornerTicks />
            <RootNetwork className="h-full w-full" />
          </div>

          <div
            aria-hidden="true"
            className="absolute top-2 left-0 hidden rounded-xl border border-border bg-surface/90 px-4 py-3 font-mono text-[0.72rem] leading-5 shadow-md backdrop-blur sm:block lg:-left-4"
          >
            <span className="text-fg-subtle">{"// grow from a solid base"}</span>
            <br />
            <span className="text-signal">const</span> <span className="text-fg">product</span>{" "}
            <span className="text-fg-subtle">=</span> <span className="text-accent-text">root</span>
            <span className="text-fg-subtle">.</span>
            <span className="text-fg">branch</span>
            <span className="text-fg-subtle">([</span>
            <span className="text-accent-text">&quot;web&quot;</span>
            <span className="text-fg-subtle">, </span>
            <span className="text-accent-text">&quot;ai&quot;</span>
            <span className="text-fg-subtle">, </span>
            <span className="text-accent-text">&quot;api&quot;</span>
            <span className="text-fg-subtle">]);</span>
          </div>
        </div>
      </div>
    </section>
  );
}
