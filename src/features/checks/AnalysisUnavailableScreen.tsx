import { CloudOff } from "lucide-react";
import { AppHeader } from "../../components/AppHeader";
import { PrimaryButton, SecondaryButton } from "../../components/Button";
import { NextStepCard } from "../../components/NextStepCard";
import { usePrototypeState } from "../../app/PrototypeState";
import { errorCopy } from "../../data/copy";

// E-04 — Analysis unavailable. A failed check must never read as "safe".
export function AnalysisUnavailableScreen() {
  const { draft } = usePrototypeState();
  return (
    <div className="screen">
      <AppHeader title="Check not finished" back="/prototype/home" />
      <div className="screen-content">
        <CloudOff aria-hidden size={48} className="error-icon" />
        <h1 className="screen-title">We could not finish the check</h1>
        <p className="result-summary risk-surface-unknown body-text strong" role="alert">
          {errorCopy.analysisUnavailable}
        </p>
        <NextStepCard
          title="Until you can check it"
          steps={[
            "Do not tap links or reply.",
            "Do not send money or personal information.",
            "Contact the company or person using a number you already know.",
          ]}
        />
      </div>
      <div className="screen-footer button-stack">
        {draft && <PrimaryButton to="/prototype/analyzing">Try again</PrimaryButton>}
        <SecondaryButton to="/prototype/home">Back to Home</SecondaryButton>
      </div>
    </div>
  );
}
