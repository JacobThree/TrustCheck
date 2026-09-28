import { Fragment } from "react";

// Stand-in for an uploaded image in the prototype. When `highlights` is set,
// matching phrases are marked for S28.
const text =
  "USPS: Your package could not be delivered. Pay the $1.99 redelivery fee within 12 hours at usps-redelivery-fee.example to reschedule.";

export function MockScreenshot({ highlights = [] }: { highlights?: string[] }) {
  const pattern = highlights.length
    ? new RegExp(`(${highlights.map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`)
    : null;
  const parts = pattern ? text.split(pattern) : [text];

  return (
    <figure className="mock-screenshot" aria-label="Screenshot of a text message">
      <div className="mock-screenshot-sender">+1 (555) 013-2291</div>
      <div className="mock-screenshot-bubble">
        {parts.map((part, i) =>
          highlights.includes(part) ? (
            <mark key={i} className="highlight">
              {part}
            </mark>
          ) : (
            <Fragment key={i}>{part}</Fragment>
          ),
        )}
      </div>
    </figure>
  );
}
