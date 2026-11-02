import { ShieldCheck } from "lucide-react";
import { Link } from "react-router";

// Presentation site (spec §28). Section bodies are placeholders for the group to
// fill with their own research, sketches, and screenshots (spec §35).
const sections = [
  {
    id: "problem",
    title: "The problem",
    points: [
      "Many people receive suspicious text messages, emails, QR codes, and website links everyday but struggle to determine whether or not they are legitimate.",
      "Exisiting secueity tools often present domain names, certificates, or warnings which requires technical knowledge to interpret and may cause users to ignore such warnings.",
      "TrustCheck addresses this gap by translating technical risk indicators into plaintext language and actionable guidance.",
    ],
  },
  {
    id: "users",
    title: "Who we designed for",
    points: [
      "We designed mainly for adults and older adults who have less cyberecurity literacy.",
      {
        label: "What they need",
        items: [
          "Understand security risks without technical knowledge.",
          "Receive clear explanations in everyday language.",
          "Know what action to take next.",
          "Quickly verify whether the content is trustworthy.",
        ],
      },
      {
        label: "Common Frustrations",
        items: [
          "Security warnings are often to vague or confusing.",
          "Technical terms create uncertainty.",
          "Users may feel overwhelmed  when making security decisions.",
        ],
      },
      {
        label: "Accessibility Considerations",
        items: [
          "Large readable text.",
          "High contrast interface options.",
          "Clear navigation and touch targets.",
          "Reduced cognitive load withough simple workflows",
          "Read aloud support for those who need auditory assistance.",
        ],
      },
    ],
  },
  {
    id: "research",
    title: "What we learned",
    points: [
      "Non-users often struggle to understand technical security language.",
      "Users are more likely to ignore long, information dense warnings.",
      "People respond better to clear recommendations than technical explanations.",
      "QR codes can be difficult to evaluate because they can conceal destinations until opened.",
      "Users frequently overestimate the accuracy of automated security systems.",
    ],
  },
  {
    id: "existing",
    title: "Existing tools",
    points: [
      "Browser security warnings: Detects suspicious websites. Often provides minimal explanation",
      "Antivirus software: identifies known threats and uses technical language unfamiliar to many users.",
      "Email spam filters block many phishing messages but users still receive suspicious content and may not understand risks.",
      "QR scanners open destinations quickly but usually do not explain destination risks before opening.",
      "Security Awareness resources: teach security concepts but do not make information available when users need immediate guidance.",
    ],
  },
  {
    id: "gap",
    title: "The gap",
    points: [
      {
        label: "Traditional approach",
        items: [
          "detect suspicious content.",
          "Display a warning.",
          "Leaves the decision to the user.",
        ],
      },
      {
        label: "TrustCheck Approach",
        items: [
          "Detect suspicious content.",
          "Explains warning signs in plain language.",
          "Explain why those signs matter.",
          "Recommend a safe next step action.",
          "Teacher users how to verify information independently.",
        ],
      },
    ],
  },
  {
    id: "principles",
    title: "Design principles",
    points: [
      "Recognition over Recall: Users are shown clear options, examples, and labels without having to remember cybersecurity terms.",
      "Progressive Disclosure: Most significant information is presented first and detailed explanations are provided later only if needed.",
      "Reduced Cognitive load: Information is simplified into short explanations and clear recommendations in order to prevent overwhelming the user.",
      "Provides Visual Feedback: When checking a suspicious link, QR code, or message, the interface provides feedback on the state of how TrustCheck analyzes it.",
    ],
  },
  { id: "process", title: "Design process", todo: "PRES-08: sketches, low-fi wireframes, revisions, high-fi." },
  { id: "workflows", title: "Workflows", todo: "PRES-09: main flows, grouped by task." },
  { id: "limitations", title: "Limitations", todo: "PRES-11: false positives/negatives, over-trust, privacy, simulated analysis." },
];
export function PortfolioPage() {
  return (
    <div className="portfolio">
      <header className="portfolio-hero">
        <ShieldCheck aria-hidden size={48} className="brand-icon" />
        <h1>TrustCheck</h1>
        <p className="portfolio-lede">
          A mobile assistant that helps people understand why something may be suspicious and what to do next.
        </p>
        <Link to="/prototype" className="button button-primary portfolio-cta">
          Launch Prototype
        </Link>
      </header>
      <nav className="portfolio-nav" aria-label="Sections">
        {sections.map((s) => (
          <a key={s.id} href={`#${s.id}`}>
            {s.title}
          </a>
        ))}
      </nav>
      <main>
        {sections.map((s) => (
          <section key={s.id} id={s.id} className="portfolio-section">
            <h2>{s.title}</h2>
            <p className="placeholder">TODO — {s.todo}</p>
          </section>
        ))}
        <section id="prototype" className="portfolio-section">
          <h2>Try the prototype</h2>
          <p>Four checking workflows, history, lessons, and accessibility settings — all with example data.</p>
          <Link to="/prototype" className="button button-primary portfolio-cta">
            Launch Prototype
          </Link>
        </section>
      </main>
    </div>
  );
}
