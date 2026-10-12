import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Home-screen icon for iOS, generated from the logo mark. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0c0d",
        }}
      >
        <svg width="120" height="120" viewBox="0 0 32 32" fill="none">
          <path
            d="M16 9v6m0 0c0 4.5-8 3.5-8 9m8-9v9.5m0-9.5c0 4.5 8 3.5 8 9"
            stroke="#ebece8"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="16" cy="6" r="3.25" fill="#f0a05a" />
          <circle cx="8" cy="26.5" r="2.25" stroke="#ebece8" strokeWidth="1.75" />
          <circle cx="16" cy="27" r="2.25" stroke="#ebece8" strokeWidth="1.75" />
          <circle cx="24" cy="26.5" r="2.25" stroke="#ebece8" strokeWidth="1.75" />
        </svg>
      </div>
    ),
    size,
  );
}
