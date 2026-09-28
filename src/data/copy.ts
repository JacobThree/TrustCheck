import type { RiskLevel } from "../types/trustcheck";

// Risk communication model (spec §10) and error states (spec §22).
// Keep all user-facing risk wording here so it stays consistent (UX-06).

export const riskCopy: Record<RiskLevel, { label: string; headline: string; secondary: string }> = {
  "lower-concern": {
    label: "Lower Concern",
    headline: "We did not find obvious warning signs.",
    secondary:
      "That does not guarantee this is safe. If the request involves money, passwords, or personal information, verify it another way.",
  },
  caution: {
    label: "Needs Caution",
    headline: "We found some warning signs.",
    secondary: "Pause before clicking, replying, paying, or entering information.",
  },
  "high-risk": {
    label: "High Risk",
    headline: "This looks strongly suspicious.",
    secondary: "Do not click the link, send money, or enter personal information.",
  },
  unknown: {
    label: "Unable to Verify",
    headline: "We could not verify this.",
    secondary: "Do not assume it is safe. Check with the sender or company another way.",
  },
};

export const errorCopy = {
  empty: "Add something for TrustCheck to check.",
  invalidLink: "We could not recognize this as a link. Check the address and try again.",
  unreadableScreenshot:
    "We could not read enough of this image. Try a clearer screenshot or paste the message instead.",
  analysisUnavailable: "We could not complete the check right now. Do not assume the content is safe.",
} as const;

export const trustDisclaimer =
  "TrustCheck can miss scams. For sensitive requests, verify through an official source.";
