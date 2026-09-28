import { Navigate } from "react-router";
import { AppHeader } from "../../components/AppHeader";
import { PrimaryButton } from "../../components/Button";
import { useScenarioParam } from "./useScenarioParam";

// S17 — Domain explanation. Puts who it claims to be next to where it actually goes.
export function DomainExplanationScreen() {
  const scenario = useScenarioParam();
  if (!scenario?.actualDomain) return <Navigate to="/prototype/home" replace />;

  return (
    <div className="screen">
      <AppHeader title="About this link" back={`/prototype/result/${scenario.id}`} />
      <div className="screen-content">
        <div className="compare">
          <div className="compare-row">
            <span className="field-label">It says it is from</span>
            <span className="compare-value">{scenario.claimedSender ?? "Unknown"}</span>
          </div>
          <div className="compare-row compare-row-warn">
            <span className="field-label">But the link goes to</span>
            <span className="compare-value mono">{scenario.actualDomain}</span>
          </div>
        </div>
        <p className="body-text">
          The website name is the part right before the first “/”. Scammers make names that look almost like a real
          company by adding words or changing letters.
        </p>
      </div>
      <div className="screen-footer">
        <PrimaryButton to={`/prototype/result/${scenario.id}/verify`}>How do I find the real website?</PrimaryButton>
      </div>
    </div>
  );
}
