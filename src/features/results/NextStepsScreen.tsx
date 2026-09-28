import { Navigate } from "react-router";
import { AppHeader } from "../../components/AppHeader";
import { PrimaryButton, SecondaryButton } from "../../components/Button";
import { NextStepCard } from "../../components/NextStepCard";
import { trustDisclaimer } from "../../data/copy";
import { useScenarioParam } from "./useScenarioParam";

// S12 — Next steps. Verification always uses an independently found source (SEC-03, SEC-04).
const verifyTips = [
  "Open the company's official app.",
  "Type the website address yourself.",
  "Call the number on the back of your card or on your bill.",
  "Contact the person using a number you already know.",
];

export function NextStepsScreen() {
  const scenario = useScenarioParam();
  if (!scenario) return <Navigate to="/prototype/home" replace />;

  return (
    <div className="screen">
      <AppHeader title="What should I do?" back={`/prototype/result/${scenario.id}`} />
      <div className="screen-content">
        <NextStepCard steps={scenario.nextSteps} title="Do this now" />
        <h2 className="section-title">How to check it yourself</h2>
        <ul className="bullet-list">
          {verifyTips.map((tip) => (
            <li key={tip}>{tip}</li>
          ))}
        </ul>
        <p className="body-text muted">Do not use phone numbers or links from the message itself.</p>
        <p className="disclaimer">{trustDisclaimer}</p>
      </div>
      <div className="screen-footer button-stack">
        <PrimaryButton to="/prototype/home">Back to Home</PrimaryButton>
        <SecondaryButton to="/prototype/learn">Learn about scams like this</SecondaryButton>
      </div>
    </div>
  );
}
