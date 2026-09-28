import { Navigate } from "react-router";
import { AppHeader } from "../../components/AppHeader";
import { PrimaryButton } from "../../components/Button";
import { NextStepCard } from "../../components/NextStepCard";
import { useScenarioParam } from "./useScenarioParam";

// S18 — Verify official site
export function VerifyOfficialSiteScreen() {
  const scenario = useScenarioParam();
  if (!scenario) return <Navigate to="/prototype/home" replace />;
  const company = scenario.claimedSender ?? "the company";

  return (
    <div className="screen">
      <AppHeader title="Find the real website" back />
      <div className="screen-content">
        <NextStepCard
          title={`Go to ${company} yourself`}
          steps={[
            `Open the ${company} app if you have it.`,
            `Or type ${company}'s website address yourself. Do not copy it from the message.`,
            "Sign in there and check for any messages or alerts.",
          ]}
        />
        <p className="body-text muted">
          If there is a real problem, you will see it in your account. If there is nothing there, the message was
          likely not real.
        </p>
      </div>
      <div className="screen-footer">
        <PrimaryButton to="/prototype/home">Back to Home</PrimaryButton>
      </div>
    </div>
  );
}
