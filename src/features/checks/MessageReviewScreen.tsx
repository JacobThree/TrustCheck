import { Navigate } from "react-router";
import { AppHeader } from "../../components/AppHeader";
import { PrimaryButton, SecondaryButton } from "../../components/Button";
import { usePrototypeState } from "../../app/PrototypeState";

// S08 — Message review
export function MessageReviewScreen() {
  const { draft } = usePrototypeState();
  if (draft?.type !== "message") return <Navigate to="/prototype/check/message" replace />;

  return (
    <div className="screen">
      <AppHeader title="Review" back="/prototype/check/message" />
      <div className="screen-content">
        <p className="body-text">TrustCheck will check this message:</p>
        <blockquote className="quote-box">{draft.content}</blockquote>
        <p className="body-text muted">Only the text above is checked.</p>
      </div>
      <div className="screen-footer button-stack">
        <PrimaryButton to="/prototype/analyzing">Check this message</PrimaryButton>
        <SecondaryButton to="/prototype/check/message">Edit message</SecondaryButton>
      </div>
    </div>
  );
}
