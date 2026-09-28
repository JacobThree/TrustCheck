import { useState } from "react";
import { useNavigate } from "react-router";
import { AppHeader } from "../../components/AppHeader";
import { PrimaryButton, SecondaryButton } from "../../components/Button";
import { usePrototypeState } from "../../app/PrototypeState";
import { errorCopy } from "../../data/copy";
import { exampleInputs } from "./mockAnalyze";

// S07 — Message input
export function MessageInputScreen() {
  const { draft, setDraft } = usePrototypeState();
  const navigate = useNavigate();
  const [text, setText] = useState(draft?.type === "message" ? draft.content : "");
  const [error, setError] = useState("");

  function next() {
    if (!text.trim()) return setError(errorCopy.empty); // E-01
    setDraft({ type: "message", content: text.trim() });
    navigate("/prototype/check/message/review");
  }

  return (
    <div className="screen">
      <AppHeader title="Check a Message" back="/prototype/home" />
      <div className="screen-content">
        <label htmlFor="message" className="field-label">
          Paste or type the message
        </label>
        <textarea
          id="message"
          className="field textarea"
          rows={7}
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setError("");
          }}
          aria-invalid={!!error}
          aria-describedby={error ? "message-error" : undefined}
          placeholder="Tip: press and hold in the message, choose Copy, then press and hold here and choose Paste."
        />
        {error && (
          <p id="message-error" className="field-error" role="alert">
            {error}
          </p>
        )}
        <SecondaryButton onClick={() => setText(exampleInputs.message)}>Use an example</SecondaryButton>
      </div>
      <div className="screen-footer">
        <PrimaryButton onClick={next}>Continue</PrimaryButton>
      </div>
    </div>
  );
}
