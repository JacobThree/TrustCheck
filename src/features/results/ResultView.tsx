import { ChevronRight, Volume2 } from "lucide-react";
import { Link } from "react-router";
import { AppHeader } from "../../components/AppHeader";
import { PrimaryButton, SecondaryButton } from "../../components/Button";
import { FindingCard } from "../../components/FindingCard";
import { RiskBadge } from "../../components/RiskBadge";
import { usePrototypeState } from "../../app/PrototypeState";
import { riskCopy, trustDisclaimer } from "../../data/copy";
import type { TrustCheckScenario } from "../../types/trustcheck";

// Shared result layout (spec §13). Order follows UX-05: the risk state and what
// to do come first, explanations come after.
const extraExplanation = {
  message: null,
  link: { label: "See how this link is different", path: "domain" },
  qr: { label: "Why QR codes can hide where they go", path: "qr-explained" },
  screenshot: { label: "See what we marked in your picture", path: "highlights" },
} as const;

export function ResultView({ scenario, back }: { scenario: TrustCheckScenario; back: string }) {
  const { settings } = usePrototypeState();
  const risk = riskCopy[scenario.risk];
  const base = `/prototype/result/${scenario.id}`;
  const extra = extraExplanation[scenario.inputType];

  function readAloud() {
    const text = [risk.label, risk.headline, scenario.summary, ...scenario.nextSteps].join(". ");
    speechSynthesis.cancel();
    speechSynthesis.speak(new SpeechSynthesisUtterance(text));
  }

  return (
    <div className="screen">
      <AppHeader title="Result" back={back} />
      <div className="screen-content">
        <section className={`result-summary risk-surface-${scenario.risk}`} aria-labelledby="result-headline">
          <RiskBadge risk={scenario.risk} large />
          <h2 id="result-headline" className="result-headline">
            {risk.headline}
          </h2>
          <p className="body-text">{scenario.summary}</p>
          <p className="body-text muted">{risk.secondary}</p>
        </section>

        <PrimaryButton to={`${base}/next-steps`}>What should I do?</PrimaryButton>

        {settings.readAloud && (
          <SecondaryButton onClick={readAloud}>
            <Volume2 aria-hidden size={20} /> Read this aloud
          </SecondaryButton>
        )}

        <h2 className="section-title">
          {scenario.risk === "lower-concern" ? "What we noticed" : "Why TrustCheck is concerned"}
        </h2>
        <div className="stack">
          {scenario.findings.slice(0, 5).map((f) => (
            <FindingCard key={f.id} finding={f} to={`${base}/finding/${f.id}`} />
          ))}
        </div>

        {extra && (
          <Link to={`${base}/${extra.path}`} className="text-link">
            {extra.label}
            <ChevronRight aria-hidden size={18} />
          </Link>
        )}

        <p className="disclaimer">{trustDisclaimer}</p>
      </div>
      <div className="screen-footer">
        <SecondaryButton to="/prototype/home">Done</SecondaryButton>
      </div>
    </div>
  );
}
