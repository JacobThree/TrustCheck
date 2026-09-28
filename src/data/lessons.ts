import type { Lesson } from "../types/trustcheck";

// Learn topics from spec §14 FR-07. Keep each short and example-driven.

export const lessons: Lesson[] = [
  {
    id: "suspicious-links",
    title: "Suspicious links",
    summary: "Links can look like a real company but go somewhere else.",
    example: "A text says it is from Amazon but the link is “amaz0n-orders.example”.",
    warningSigns: [
      "The company name is misspelled.",
      "Extra words are added, like “-secure” or “-login”.",
      "The link is shortened, so you cannot see where it goes.",
    ],
    whatToDo: ["Do not tap the link.", "Open the company's app or type its website yourself."],
  },
  {
    id: "urgent-payments",
    title: "Urgent payment requests",
    summary: "Pressure to pay right away is a common warning sign.",
    example: "“Your power will be shut off in 1 hour unless you pay now.”",
    warningSigns: ["A short deadline.", "Threats of penalties.", "Unusual ways to pay."],
    whatToDo: ["Pause.", "Call the company using a number from your bill or their official website."],
  },
  {
    id: "qr-scams",
    title: "QR code scams",
    summary: "You cannot see where a QR code goes until you scan it.",
    example: "A sticker on a parking meter leads to a fake payment page.",
    warningSigns: [
      "The QR code is a sticker placed over something else.",
      "The website address is not the business you expected.",
      "It asks for card details right away.",
    ],
    whatToDo: ["Check where the code leads before you pay.", "Use the official app or pay at the machine."],
  },
  {
    id: "fake-login-pages",
    title: "Fake login pages",
    summary: "Scam sites copy real sign-in pages to steal your password.",
    example: "An email says “Verify your account” and opens a page that looks like your bank.",
    warningSigns: ["You got there from a message link.", "The address is not the company's real website."],
    whatToDo: ["Never sign in from a message link.", "Open the app or website yourself."],
  },
  {
    id: "impersonation",
    title: "Impersonation",
    summary: "Scammers pretend to be people or organizations you trust.",
    example: "“Grandma it's me, I lost my phone and need money.”",
    warningSigns: ["The sender does not use their name.", "They ask for secrecy.", "They need money fast."],
    whatToDo: ["Call the person on a number you already know.", "Talk to someone you trust first."],
  },
  {
    id: "verify-a-company",
    title: "How to verify a company",
    summary: "Contact the company using information you find yourself.",
    example: "Instead of calling the number in a text, call the number on the back of your card.",
    warningSigns: ["Contact details only appear in the message itself."],
    whatToDo: [
      "Use the official app.",
      "Type the website address yourself.",
      "Use the phone number on your card, bill, or statement.",
    ],
  },
];

export function getLesson(id: string | undefined): Lesson | undefined {
  return lessons.find((l) => l.id === id);
}
