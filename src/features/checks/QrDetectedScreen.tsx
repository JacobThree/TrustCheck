import { useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { AppHeader } from "../../components/AppHeader";
import { PrimaryButton, SecondaryButton } from "../../components/Button";
import { ConfirmationSheet } from "../../components/ConfirmationSheet";
import { usePrototypeState } from "../../app/PrototypeState";

// S20 — QR detected. Reveals the hidden destination before anything opens.
export function QrDetectedScreen() {
  const { draft } = usePrototypeState();
  const navigate = useNavigate();
  const [confirming, setConfirming] = useState(false);
  if (draft?.type !== "qr") return <Navigate to="/prototype/check/qr" replace />;

  return (
    <div className="screen">
      <AppHeader title="QR code found" back="/prototype/check/qr" />
      <div className="screen-content">
        <p className="body-text">This QR code wants to open the website:</p>
        <p className="domain-callout">{draft.content}</p>
        <p className="body-text muted">Nothing has been opened yet.</p>
      </div>
      <div className="screen-footer button-stack">
        <PrimaryButton to="/prototype/analyzing">Check this website first</PrimaryButton>
        <SecondaryButton onClick={() => setConfirming(true)}>Open without checking</SecondaryButton>
      </div>
      <ConfirmationSheet
        open={confirming}
        title="Open without checking?"
        message="QR codes can lead to fake payment pages. We suggest checking the website first."
        cancelLabel="Check it first"
        confirmLabel="Open anyway"
        onCancel={() => {
          setConfirming(false);
          navigate("/prototype/analyzing");
        }}
        onConfirm={() => {
          setConfirming(false);
          navigate("/prototype/home");
        }}
      />
    </div>
  );
}
