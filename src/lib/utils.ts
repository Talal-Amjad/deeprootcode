/** Join class names, skipping falsy values. */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

/** Two-digit index label used by section eyebrows: 1 → "01". */
export function pad(index: number): string {
  return String(index).padStart(2, "0");
}
