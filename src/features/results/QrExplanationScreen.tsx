import { Navigate } from "react-router";
import { AppHeader } from "../../components/AppHeader";
import { PrimaryButton } from "../../components/Button";
import { useScenarioParam } from "./useScenarioParam";

// S23 — QR explanation
export function QrExplanationScreen() {
  const scenario = useScenarioParam();
  if (!scenario) return <Navigate to="/prototype/home" replace />;

  return (
    <div className="screen">
      <AppHeader title="About QR codes" back={`/prototype/result/${scenario.id}`} />
      <div className="screen-content">
        <h2 className="screen-title">You cannot see where a QR code goes by looking at it.</h2>
        <p className="body-text">
          A QR code is a website address turned into a picture. Anyone can print one and stick it on top of a real
          sign or parking meter.
        </p>
        <p className="body-text">That is why TrustCheck shows you the website first, before anything opens.</p>
        {scenario.actualDomain && (
          <>
            <p className="field-label">This code went to</p>
            <p className="domain-callout">{scenario.actualDomain}</p>
          </>
        )}
      </div>
      <div className="screen-footer">
        <PrimaryButton to={`/prototype/result/${scenario.id}/next-steps`}>What should I do?</PrimaryButton>
      </div>
    </div>
  );
}
