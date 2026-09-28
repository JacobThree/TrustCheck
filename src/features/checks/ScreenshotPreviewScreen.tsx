import { Navigate } from "react-router";
import { AppHeader } from "../../components/AppHeader";
import { PrimaryButton, SecondaryButton } from "../../components/Button";
import { usePrototypeState } from "../../app/PrototypeState";
import { MockScreenshot } from "./MockScreenshot";

// S25 — Screenshot preview
export function ScreenshotPreviewScreen() {
  const { draft } = usePrototypeState();
  if (draft?.type !== "screenshot") return <Navigate to="/prototype/check/screenshot" replace />;

  return (
    <div className="screen">
      <AppHeader title="Is this the right picture?" back="/prototype/check/screenshot" />
      <div className="screen-content">
        <MockScreenshot />
        <p className="body-text muted">TrustCheck will read the words in this picture.</p>
      </div>
      <div className="screen-footer button-stack">
        <PrimaryButton to="/prototype/analyzing">Check this picture</PrimaryButton>
        <SecondaryButton to="/prototype/check/screenshot">Choose a different picture</SecondaryButton>
      </div>
    </div>
  );
}
