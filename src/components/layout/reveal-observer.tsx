"use client";

import { useEffect } from "react";

/**
 * Single observer for scroll-reveal animations.
 * Any element with `data-reveal` fades in when it enters the viewport; `--reveal-delay` staggers it.
 * Server components only need the attribute — no client wrapper per element.
 * CSS (globals.css) hides elements only when JS is running and motion is allowed.
 */
export function RevealObserver() {
  useEffect(() => {
    const observed = new WeakSet<Element>();

    const intersection = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-visible", "");
            intersection.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    const scan = () => {
      document.querySelectorAll("[data-reveal]:not([data-visible])").forEach((element) => {
        if (observed.has(element)) return;
        observed.add(element);
        intersection.observe(element);
      });
    };

    scan();
    // Pick up content rendered later (client navigation, filtered lists).
    const mutations = new MutationObserver(scan);
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      intersection.disconnect();
      mutations.disconnect();
    };
  }, []);

  return null;
}
