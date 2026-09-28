import { Navigate } from "react-router";
import { AppHeader } from "../../components/AppHeader";
import { PrimaryButton, SecondaryButton } from "../../components/Button";
import { usePrototypeState } from "../../app/PrototypeState";
import { domainOf } from "./mockAnalyze";

// S14 — Link review. The website name is shown prominently before analysis.
export function LinkReviewScreen() {
  const { draft } = usePrototypeState();
  if (draft?.type !== "link") return <Navigate to="/prototype/check/link" replace />;

  return (
    <div className="screen">
      <AppHeader title="Review" back="/prototype/check/link" />
      <div className="screen-content">
        <p className="body-text">This link goes to the website:</p>
        <p className="domain-callout">{domainOf(draft.content)}</p>
        <p className="body-text muted">Full link:</p>
        <p className="quote-box mono">{draft.content}</p>
      </div>
      <div className="screen-footer button-stack">
        <PrimaryButton to="/prototype/analyzing">Check this link</PrimaryButton>
        <SecondaryButton to="/prototype/check/link">Edit link</SecondaryButton>
      </div>
    </div>
  );
}
