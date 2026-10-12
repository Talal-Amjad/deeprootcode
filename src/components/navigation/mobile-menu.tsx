"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { ArrowRight, Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { buttonClasses } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/types";
import { isActivePath } from "./nav-links";

const noopSubscribe = () => () => {};

export function MobileMenu({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  const isClient = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close when the route changes (link click, back/forward).
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const trigger = triggerRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel?.querySelector<HTMLElement>("a, button")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab" || !panel) return;
      const focusable = panel.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    // Close if the viewport grows to the desktop layout.
    const desktop = window.matchMedia("(min-width: 80rem)");
    const onResize = () => desktop.matches && setOpen(false);

    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onResize);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onResize);
      trigger?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label="Open menu"
        className="inline-flex size-10 items-center justify-center rounded-full border border-border text-fg transition-colors hover:border-border-strong xl:hidden"
      >
        <Menu aria-hidden="true" className="size-[1.15rem]" />
      </button>

      {isClient &&
        open &&
        createPortal(
          <div
            ref={panelRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-bg xl:hidden"
          >
            <div aria-hidden="true" className="bg-grid mask-fade-b pointer-events-none absolute inset-0 opacity-70" />
            <div className="container-page relative flex h-16 shrink-0 items-center justify-between">
              <Link href="/" aria-label={`${siteConfig.name} — home`} onClick={() => setOpen(false)}>
                <Logo />
              </Link>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="inline-flex size-10 items-center justify-center rounded-full border border-border text-fg hover:border-border-strong"
              >
                <X aria-hidden="true" className="size-[1.15rem]" />
              </button>
            </div>

            <nav aria-label="Mobile" className="container-page relative flex flex-1 flex-col pt-6 pb-10">
              <ul className="flex flex-col">
                {items.map((item, index) => {
                  const active = isActivePath(pathname, item.href);
                  return (
                    <li
                      key={item.href}
                      className="motion-safe:animate-[fade-in_400ms_ease-out_both]"
                      style={{ animationDelay: `${index * 35}ms` }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "flex items-center justify-between border-b border-border py-4 text-2xl font-medium tracking-tight transition-colors",
                          active ? "text-accent-text" : "text-fg hover:text-accent-text",
                        )}
                      >
                        {item.label}
                        <span aria-hidden="true" className="font-mono text-xs text-fg-subtle">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-auto flex flex-col gap-4 pt-10">
                <Link
                  href={siteConfig.cta.primary.href}
                  onClick={() => setOpen(false)}
                  className={buttonClasses({ size: "lg", className: "w-full" })}
                >
                  {siteConfig.cta.primary.label}
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
                {siteConfig.contactEmail && (
                  <a
                    href={`mailto:${siteConfig.contactEmail}`}
                    className="text-center font-mono text-sm text-fg-muted hover:text-fg"
                  >
                    {siteConfig.contactEmail}
                  </a>
                )}
              </div>
            </nav>
          </div>,
          document.body,
        )}
    </>
  );
}
