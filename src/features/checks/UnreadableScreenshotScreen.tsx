import { ImageOff } from "lucide-react";
import { AppHeader } from "../../components/AppHeader";
import { PrimaryButton, SecondaryButton } from "../../components/Button";
import { errorCopy } from "../../data/copy";

// E-03 — Unreadable screenshot
export function UnreadableScreenshotScreen() {
  return (
    <div className="screen">
      <AppHeader title="Check a Screenshot" back="/prototype/check/screenshot" />
      <div className="screen-content">
        <ImageOff aria-hidden size={48} className="error-icon" />
        <h1 className="screen-title">We could not read this picture</h1>
        <p className="body-text" role="alert">
          {errorCopy.unreadableScreenshot}
        </p>
        <h2 className="section-title">For a clearer picture</h2>
        <ul className="bullet-list">
          <li>Make sure the words are sharp, not blurry.</li>
          <li>Include the whole message.</li>
          <li>Avoid glare or shadows on the screen.</li>
        </ul>
      </div>
      <div className="screen-footer button-stack">
        <PrimaryButton to="/prototype/check/screenshot">Try a different picture</PrimaryButton>
        <SecondaryButton to="/prototype/check/message">Paste the message instead</SecondaryButton>
      </div>
    </div>
  );
}
