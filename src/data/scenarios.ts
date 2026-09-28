import type { TrustCheckScenario } from "../types/trustcheck";

// Deterministic fixtures for mock analysis (spec §21, D-01 to D-06),
// plus the extra scenarios the required paths in §20 need.

export const scenarios = {
  // D-01 — Fake bank text (P-01)
  fakeBankText: {
    id: "fake-bank-text",
    inputType: "message",
    inputPreview:
      "CHASE ALERT: Your account has been locked. Verify now at chase-secure-login.example.",
    risk: "high-risk",
    summary: "Do not tap the link or reply. Contact your bank using its official app.",
    claimedSender: "Chase",
    actualDomain: "chase-secure-login.example",
    findings: [
      {
        id: "urgent-pressure",
        title: "The message pushes you to act fast",
        plainLanguageReason:
          "It says your account is locked and you must act now. Scammers use pressure so you do not stop to think.",
        severity: "high",
        evidenceSnippet: "Your account has been locked. Verify now",
        recommendedAction: "Slow down. A real bank will not lock you out over a text message.",
      },
      {
        id: "suspicious-link",
        title: "The link does not match the company name",
        plainLanguageReason:
          "The message says it is from Chase, but the link goes to “chase-secure-login.example”. That is not Chase's website.",
        severity: "high",
        evidenceSnippet: "chase-secure-login.example",
        recommendedAction: "Do not open this link. Open the Chase app or type the bank's website yourself.",
      },
      {
        id: "verify-request",
        title: "It asks you to “verify” your account",
        plainLanguageReason:
          "Asking you to verify your account is a common way to get you to type your password on a fake page.",
        severity: "caution",
        evidenceSnippet: "Verify now",
      },
    ],
    nextSteps: [
      "Do not tap the link in this message.",
      "Open your banking app directly, or call the number on the back of your card.",
      "Delete the message once you have checked with your bank.",
    ],
  },

  // D-02 — Legitimate-looking but uncertain message
  uncertainMessage: {
    id: "uncertain-message",
    inputType: "message",
    inputPreview:
      "Hi, this is Dr. Patel's office. Please confirm your appointment on Tuesday by replying YES.",
    risk: "caution",
    summary: "This might be real, but we cannot confirm who sent it.",
    findings: [
      {
        id: "unknown-sender",
        title: "We cannot confirm who sent this",
        plainLanguageReason:
          "The message looks ordinary, but anyone can say they are a doctor's office.",
        severity: "caution",
      },
      {
        id: "no-link-or-money",
        title: "It does not ask for money or passwords",
        plainLanguageReason: "That is a good sign, but it does not prove the message is real.",
        severity: "info",
      },
    ],
    nextSteps: [
      "If you have an appointment, replying YES is usually low risk.",
      "If you are unsure, call the office using a number you already have.",
      "Do not share personal details by text.",
    ],
  },

  // D-03 — Obvious gift-card scam
  giftCardScam: {
    id: "gift-card-scam",
    inputType: "message",
    inputPreview:
      "Grandma it's me, I'm in trouble and need help. Please buy $500 in Apple gift cards and send me the codes. Don't tell Mom.",
    risk: "high-risk",
    summary: "Do not buy gift cards or send codes. Call your family member on a number you know.",
    findings: [
      {
        id: "gift-cards",
        title: "It asks for payment with gift cards",
        plainLanguageReason:
          "Real people and real companies almost never ask to be paid in gift cards. Once you share the codes, the money is gone.",
        severity: "high",
        evidenceSnippet: "buy $500 in Apple gift cards",
      },
      {
        id: "secrecy",
        title: "It asks you to keep it secret",
        plainLanguageReason: "Scammers ask for secrecy so no one can warn you.",
        severity: "high",
        evidenceSnippet: "Don't tell Mom",
      },
      {
        id: "impersonation",
        title: "The sender says they are family but does not say who",
        plainLanguageReason: "Scammers pretend to be a relative in trouble to make you act quickly.",
        severity: "caution",
        evidenceSnippet: "Grandma it's me",
      },
    ],
    nextSteps: [
      "Do not buy gift cards or send any codes.",
      "Call your family member using a number you already have.",
      "Talk to someone you trust before sending any money.",
    ],
  },

  // D-04 — QR payment scam (P-03)
  qrParkingScam: {
    id: "qr-parking-scam",
    inputType: "qr",
    inputPreview: "QR code on a parking meter sticker",
    risk: "high-risk",
    summary: "Do not pay through this QR code. Use the official parking app or the meter itself.",
    claimedSender: "City Parking",
    actualDomain: "quick-park-pay.example",
    findings: [
      {
        id: "unofficial-site",
        title: "The QR code goes to an unfamiliar payment site",
        plainLanguageReason:
          "The code leads to “quick-park-pay.example”, which is not the city's parking website.",
        severity: "high",
        evidenceSnippet: "quick-park-pay.example",
      },
      {
        id: "sticker",
        title: "QR stickers can be placed over real ones",
        plainLanguageReason:
          "Scammers stick their own QR codes on meters and signs to collect card details.",
        severity: "caution",
      },
    ],
    nextSteps: [
      "Do not enter card details on this site.",
      "Pay using the meter, or the parking app you already trust.",
      "Tell the parking office about the sticker if you can.",
    ],
  },

  // D-05 — Benign example
  benignMessage: {
    id: "benign-message",
    inputType: "message",
    inputPreview: "Your library book “The Night Garden” is due back on Friday. No reply needed.",
    risk: "lower-concern",
    summary: "We did not find obvious warning signs.",
    findings: [
      {
        id: "no-requests",
        title: "It does not ask you to do anything risky",
        plainLanguageReason: "There is no link, no payment request, and no request for personal details.",
        severity: "info",
      },
    ],
    nextSteps: [
      "No action is needed.",
      "If a follow-up message asks for money or passwords, check it again.",
    ],
  },

  // D-06 — Unable to verify
  unverifiableLink: {
    id: "unverifiable-link",
    inputType: "link",
    inputPreview: "bit.ly/3xYz9Q",
    risk: "unknown",
    summary: "We could not see where this link goes, so we cannot tell you if it is safe.",
    actualDomain: "bit.ly",
    findings: [
      {
        id: "shortened-link",
        title: "This is a shortened link",
        plainLanguageReason:
          "Shortened links hide the real address. We could not find out where this one leads.",
        severity: "caution",
        evidenceSnippet: "bit.ly/3xYz9Q",
      },
    ],
    nextSteps: [
      "Only open this link if you trust the person who sent it.",
      "If it came from a company, go to their official website yourself instead.",
    ],
  },

  // P-02 — Lookalike link, Needs Caution
  lookalikeLink: {
    id: "lookalike-link",
    inputType: "link",
    inputPreview: "https://amaz0n-orders.example/track?id=48213",
    risk: "caution",
    summary: "Pause before opening this link. The address looks like Amazon but is spelled differently.",
    claimedSender: "Amazon",
    actualDomain: "amaz0n-orders.example",
    findings: [
      {
        id: "misspelling",
        title: "The company name is misspelled",
        plainLanguageReason:
          "The link uses a zero instead of the letter “o” in Amazon. Scammers make addresses that look almost right.",
        severity: "caution",
        evidenceSnippet: "amaz0n",
      },
      {
        id: "unfamiliar-site",
        title: "This is not Amazon's usual website",
        plainLanguageReason: "Amazon's orders are on amazon.com or in the Amazon app.",
        severity: "caution",
        evidenceSnippet: "amaz0n-orders.example",
      },
    ],
    nextSteps: [
      "Do not sign in through this link.",
      "Open the Amazon app or type amazon.com yourself to check your orders.",
    ],
  },

  // P-04 — Screenshot
  screenshotDelivery: {
    id: "screenshot-delivery",
    inputType: "screenshot",
    inputPreview: "Screenshot of a text about a missed package delivery",
    risk: "high-risk",
    summary: "Do not pay the fee or tap the link. Check your delivery in the official carrier app.",
    claimedSender: "USPS",
    actualDomain: "usps-redelivery-fee.example",
    highlights: ["$1.99 redelivery fee", "usps-redelivery-fee.example", "within 12 hours"],
    findings: [
      {
        id: "small-fee",
        title: "It asks for a small fee to deliver a package",
        plainLanguageReason:
          "A small fee is used to get your card number. The real Postal Service does not text you for fees.",
        severity: "high",
        evidenceSnippet: "$1.99 redelivery fee",
      },
      {
        id: "lookalike-link",
        title: "The link is not the Postal Service's website",
        plainLanguageReason: "The link goes to “usps-redelivery-fee.example”, not usps.com.",
        severity: "high",
        evidenceSnippet: "usps-redelivery-fee.example",
      },
      {
        id: "deadline",
        title: "It gives you a short deadline",
        plainLanguageReason: "A deadline is meant to rush you.",
        severity: "caution",
        evidenceSnippet: "within 12 hours",
      },
    ],
    nextSteps: [
      "Do not tap the link or enter card details.",
      "Track your package by typing usps.com yourself or using the official app.",
    ],
  },
} satisfies Record<string, TrustCheckScenario>;

export const allScenarios: TrustCheckScenario[] = Object.values(scenarios);

export function getScenario(id: string | undefined): TrustCheckScenario | undefined {
  return allScenarios.find((s) => s.id === id);
}
