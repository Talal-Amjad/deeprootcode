import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ink = "#ebece8";
const copper = "#f0a05a";
const muted = "#a2a7aa";

/** Default social sharing image, generated at build time. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#0a0c0d",
          backgroundImage:
            "linear-gradient(rgba(235,236,232,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(235,236,232,0.05) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          color: ink,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="64" height="64" viewBox="0 0 32 32" fill="none">
            <path
              d="M16 9v6m0 0c0 4.5-8 3.5-8 9m8-9v9.5m0-9.5c0 4.5 8 3.5 8 9"
              stroke={ink}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="16" cy="6" r="3.25" fill={copper} />
            <circle cx="8" cy="26.5" r="2.25" stroke={ink} strokeWidth="1.75" />
            <circle cx="16" cy="27" r="2.25" stroke={ink} strokeWidth="1.75" />
            <circle cx="24" cy="26.5" r="2.25" stroke={ink} strokeWidth="1.75" />
          </svg>
          <div style={{ display: "flex", fontSize: 36, fontWeight: 600, letterSpacing: "-0.03em" }}>
            Deep Root <span style={{ color: muted, marginLeft: 10, fontWeight: 500 }}>Code</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", fontSize: 76, fontWeight: 600, lineHeight: 1.04, letterSpacing: "-0.04em", maxWidth: 980 }}>
            Great Digital Products Start at the Root.
          </div>
          <div style={{ display: "flex", fontSize: 28, color: muted }}>
            Web & Mobile · AI Solutions · Automation · Research & Learning
          </div>
        </div>

        <div style={{ display: "flex", height: 6, width: 160, background: copper, borderRadius: 3 }} />
      </div>
    ),
    size,
  );
}
