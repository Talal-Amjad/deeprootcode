import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { ButtonLink } from "@/components/ui/button";
import { mainNav, siteConfig } from "@/config/site";
import { MobileMenu } from "@/components/navigation/mobile-menu";
import { NavLinks } from "@/components/navigation/nav-links";
import { HeaderShell } from "./header-shell";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  return (
    <HeaderShell>
      <div className="container-page relative flex h-16 items-center justify-between gap-4 sm:h-[4.5rem]">
        <Link href="/" aria-label={`${siteConfig.name} — home`} className="rounded-md">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden xl:block">
          <NavLinks items={mainNav} />
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <div className="hidden sm:block">
            <ButtonLink href={siteConfig.cta.nav.href} arrow>
              {siteConfig.cta.nav.label}
            </ButtonLink>
          </div>
          <MobileMenu items={mainNav} />
        </div>
      </div>
    </HeaderShell>
  );
}
