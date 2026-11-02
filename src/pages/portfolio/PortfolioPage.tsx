import { ShieldCheck } from "lucide-react";
import { Link } from "react-router";

// Presentation site (spec §28). Section bodies are placeholders for the group to
// fill with their own research, sketches, and screenshots (spec §35).
const sections = [
  {
    id: "problem",
    title: "The Problem",
    points: [
      "Many people receive suspicious text messages, emails, QR codes, and links every day.",
      "However, they don't know how to tell whether or not the content is legitimate or not."
      "Most existing security tools show things such as certificates, domain names, URL structure, threat scores. These signals are difficult for non-expert users to interpret. ",
      "TrustCheck will help bridge this gap through translating technical language into plaintext language and produce actionable guidance ."
    ]
  },

  {
    id: "users",
    title: "Who We Designed For",
    points: [
      "We mainly designed this for adults and older adults who may not feel confident with online security.",
      "Users Need:",
      "*
    ]
  },

  {
    id: "research",
    title: "What We Learned",
    points: [
      "Many people do not understand technical security language.",
      "Long warnings are often ignored because they are hard to read.",
      "People respond better to clear recommendations than complicated explanations.",
      "QR codes can be risky because the actual destination may be hidden until the code is opened.",
      "People often trust automated security tools more than they should."
    ]
  },

  {
    id: "existing",
    title: "Existing Tools",
    points: [
      "Browser security warnings can detect suspicious websites, but they often do not explain the problem clearly.",
      "Antivirus software can identify threats, but the messages are usually filled with technical language.",
      "Email spam filters catch many phishing messages, but users still see suspicious content and may not understand how risky it is.",
      "QR scanners open links quickly, but they usually do not explain the risk before the user opens the destination.",
      "Security awareness resources teach general concepts, but they do not help people in the moment when they need quick advice."
    ]
  },

  {
    id: "gap",
    title: "The Gap",
    points: [
      "Traditional approach:",
      "• Detect suspicious content",
      "• Show a warning",
      "• Leave the final decision to the user",
      "TrustCheck approach:",
      "• Detect suspicious content",
      "• Explain the warning signs in simple language",
      "• Show why those signs matter",
      "• Recommend the safest next step",
      "• Teach users how to verify the information on their own"
    ]
  },

  {
    id: "principles",
    title: "Design Principles",
    points: [
      "Recognition over recall:",
      "• Users are shown clear labels, examples, and options instead of having to remember cybersecurity terms.",
      "Progressive disclosure:",
      "• The most important information appears first, while more detailed information is available only when needed.",
      "Reduced cognitive load:",
      "• Information is kept short, simple, and easy to act on so users do not feel overwhelmed.",
      "Visual feedback:",
      "• When checking a suspicious link, QR code, or message, the interface shows what TrustCheck is analyzing and how confident it is."
    ]
  },

  {
    id: "process",
    title: "Design Process",
    points: [
      "We used a design process that included:",
      "• ",
      "• ",
      "• ",
      "• "
    ]
  },

  {
  id: "workflows",
  title: "Workflows",
  points: [
    "We organized the main user flows around the tasks people want to complete.",
    "This includes checking:",
    `"User sees something suspicious
↓
Open TrustCheck
↓
Choose content type
↓
Paste / scan / upload content
↓
Review what will be checked
↓
TrustCheck analyzes
↓
Result category
↓
Why TrustCheck is concerned
↓
Recommended next action
↓
Optional: verify, learn, save, or report."`
  ]
},
  {
    id: "limitations",
    title: "Limitations",
    points: [
      "TrustCheck may sometimes produce false alarms or miss real threats.",
      "Some users may trust the system too much and rely on it without thinking critically.",
      "Privacy is an important concern, especially when checking links or messages.",
      "Some analysis may be simulated, which means the results may not fully reflect real-world situations."
    ]
  }
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
