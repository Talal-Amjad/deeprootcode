import { LogoMark } from "@/components/brand/logo";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <section className="relative -mt-16 overflow-hidden pt-16 sm:-mt-[4.5rem] sm:pt-[4.5rem]">
      <div aria-hidden="true" className="bg-grid mask-fade-b pointer-events-none absolute inset-0" />
      <Container className="relative flex flex-col items-center py-28 text-center sm:py-36">
        <LogoMark className="size-14 text-fg-subtle" />
        <p className="eyebrow mt-8">Error 404</p>
        <h1 className="mt-4 text-4xl font-semibold text-fg sm:text-5xl">This branch doesn&apos;t exist.</h1>
        <p className="mt-4 max-w-md text-lg leading-relaxed text-fg-muted">
          The page you&apos;re looking for may have moved or never existed. Let&apos;s get you back to solid ground.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/" arrow>
            Back to home
          </ButtonLink>
          <ButtonLink href="/contact" variant="secondary">
            Contact us
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
