import { LogoMark } from "@/components/brand/logo";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Crumb } from "@/lib/seo";
import { Breadcrumbs } from "./breadcrumbs";

/** Header used by every interior page: grid backdrop, breadcrumbs, h1, intro and optional actions. */
export function PageHeader({
  eyebrow,
  title,
  description,
  breadcrumbs,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Trail after "Home"; the last entry is the current page. */
  breadcrumbs: Crumb[];
  children?: React.ReactNode;
}) {
  return (
    <section className="relative -mt-16 overflow-hidden border-b border-border pt-16 sm:-mt-[4.5rem] sm:pt-[4.5rem]">
      <div aria-hidden="true" className="bg-grid mask-fade-b pointer-events-none absolute inset-0" />
      <LogoMark className="pointer-events-none absolute top-24 -right-16 hidden size-[26rem] text-fg opacity-[0.05] lg:block" />

      <Container className="relative pt-10 pb-16 sm:pt-14 sm:pb-20">
        <Breadcrumbs crumbs={breadcrumbs} />
        <SectionHeading as="h1" eyebrow={eyebrow} title={title} description={description} className="max-w-3xl">
          {children && <div className="mt-4 flex flex-col gap-3 sm:flex-row">{children}</div>}
        </SectionHeading>
      </Container>
    </section>
  );
}
