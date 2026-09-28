import { Navigate, useParams } from "react-router";
import { AppHeader } from "../../components/AppHeader";
import { PrimaryButton } from "../../components/Button";
import { useScenarioParam } from "./useScenarioParam";

// S11 — Finding detail. Explains one warning sign.
export function FindingDetailScreen() {
  const scenario = useScenarioParam();
  const { findingId } = useParams();
  const finding = scenario?.findings.find((f) => f.id === findingId);
  if (!scenario || !finding) return <Navigate to="/prototype/home" replace />;

  return (
    <div className="screen">
      <AppHeader title="Warning sign" back />
      <div className="screen-content">
        <h2 className="screen-title">{finding.title}</h2>
        {finding.evidenceSnippet && (
          <>
            <p className="field-label">What we found</p>
            <p className="quote-box">
              <mark className="highlight">{finding.evidenceSnippet}</mark>
            </p>
          </>
        )}
        <p className="field-label">Why this matters</p>
        <p className="body-text">{finding.plainLanguageReason}</p>
        {finding.recommendedAction && (
          <>
            <p className="field-label">What to do</p>
            <p className="body-text strong">{finding.recommendedAction}</p>
          </>
        )}
      </div>
      <div className="screen-footer">
        <PrimaryButton to={`/prototype/result/${scenario.id}/next-steps`}>What should I do?</PrimaryButton>
      </div>
    </div>
  );
}
