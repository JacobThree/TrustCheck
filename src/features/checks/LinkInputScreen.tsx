import { useState } from "react";
import { useNavigate } from "react-router";
import { AppHeader } from "../../components/AppHeader";
import { PrimaryButton, SecondaryButton } from "../../components/Button";
import { usePrototypeState } from "../../app/PrototypeState";
import { errorCopy } from "../../data/copy";
import { exampleInputs, looksLikeLink } from "./mockAnalyze";

// S13 — Link input
export function LinkInputScreen() {
  const { draft, setDraft } = usePrototypeState();
  const navigate = useNavigate();
  const [link, setLink] = useState(draft?.type === "link" ? draft.content : "");
  const [error, setError] = useState("");

  function next() {
    if (!link.trim()) return setError(errorCopy.empty); // E-01
    if (!looksLikeLink(link)) return setError(errorCopy.invalidLink); // E-02
    setDraft({ type: "link", content: link.trim() });
    navigate("/prototype/check/link/review");
  }

  return (
    <div className="screen">
      <AppHeader title="Check a Link" back="/prototype/home" />
      <div className="screen-content">
        <label htmlFor="link" className="field-label">
          Paste the link
        </label>
        <p className="body-text muted">A link is a website address, like www.example.com.</p>
        <input
          id="link"
          className="field"
          inputMode="url"
          autoCapitalize="off"
          autoCorrect="off"
          value={link}
          onChange={(e) => {
            setLink(e.target.value);
            setError("");
          }}
          aria-invalid={!!error}
          aria-describedby={error ? "link-error" : undefined}
        />
        {error && (
          <p id="link-error" className="field-error" role="alert">
            {error}
          </p>
        )}
        <SecondaryButton onClick={() => setLink(exampleInputs.link)}>Use an example</SecondaryButton>
      </div>
      <div className="screen-footer">
        <PrimaryButton onClick={next}>Continue</PrimaryButton>
      </div>
    </div>
  );
}
