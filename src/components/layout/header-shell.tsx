"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Sticky header behaviour: transparent at the top, solid once scrolled,
 * tucked away while scrolling down and revealed on any upward scroll.
 */
export function HeaderShell({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      const focusInside = headerRef.current?.contains(document.activeElement) ?? false;
      setScrolled(y > 8);
      if (y <= 480 || y < lastY - 4) setHidden(false);
      else if (y > lastY + 4 && !focusInside) setHidden(true);
      lastY = y;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      ref={headerRef}
      onFocusCapture={() => setHidden(false)}
      className={cn(
        "sticky top-0 z-50 transition-transform duration-300 ease-out",
        hidden && "-translate-y-full",
      )}
    >
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 border-b transition-[background-color,border-color] duration-300",
          scrolled ? "border-border bg-bg/80 backdrop-blur-md" : "border-transparent bg-transparent",
        )}
      />
      {children}
    </header>
  );
}
