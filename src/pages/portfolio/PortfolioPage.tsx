import { ShieldCheck } from "lucide-react";
import { Link } from "react-router";

// Presentation site (spec §28). Section bodies are placeholders for the group to
// fill with their own research, sketches, and screenshots (spec §35).
const sections = [
  { id: "problem", title: "The problem", todo: "PRES-02: what users struggle with and why warnings fail." },
  { id: "users", title: "Who we designed for", todo: "PRES-03: primary audience, needs, frustrations, accessibility." },
  { id: "research", title: "What we learned", todo: "PRES-04: strongest verified research findings." },
  { id: "existing", title: "Existing tools", todo: "PRES-05: current tool / what it does / what stays hard." },
  { id: "gap", title: "The gap", todo: "PRES-06: understanding + action, not only detection + warning." },
  { id: "principles", title: "Design principles", todo: "PRES-07: finding → design response traceability." },
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
