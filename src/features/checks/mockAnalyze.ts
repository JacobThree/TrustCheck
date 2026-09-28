import { scenarios } from "../../data/scenarios";
import type { InputType, TrustCheckScenario } from "../../types/trustcheck";

// Mock analysis (spec §25): match input text to a fixture. No real detection.

export function mockAnalyze(type: InputType, content: string): TrustCheckScenario {
  const text = content.toLowerCase();

  switch (type) {
    case "message":
      if (text.includes("chase-secure-login") || text.includes("account has been locked")) {
        return scenarios.fakeBankText;
      }
      if (text.includes("gift card")) return scenarios.giftCardScam;
      if (text.includes("library")) return scenarios.benignMessage;
      return scenarios.uncertainMessage;
    case "link":
      if (text.includes("amaz0n")) return scenarios.lookalikeLink;
      return scenarios.unverifiableLink;
    case "qr":
      return scenarios.qrParkingScam;
    case "screenshot":
      return scenarios.screenshotDelivery;
  }
}

// Loose check for E-02. Accepts bare domains like "example.com/path".
export function looksLikeLink(value: string): boolean {
  return /^(https?:\/\/)?[\w-]+(\.[\w-]+)+(\/\S*)?$/i.test(value.trim());
}

// Pulls the host out of a link so S14 can show it prominently.
export function domainOf(value: string): string {
  return value.trim().replace(/^https?:\/\//i, "").split(/[/?#]/)[0];
}

export const exampleInputs: Record<InputType, string> = {
  message: scenarios.fakeBankText.inputPreview,
  link: scenarios.lookalikeLink.inputPreview,
  qr: scenarios.qrParkingScam.actualDomain,
  screenshot: scenarios.screenshotDelivery.inputPreview,
};
