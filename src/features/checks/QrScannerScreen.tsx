import { useNavigate } from "react-router";
import { AppHeader } from "../../components/AppHeader";
import { PrimaryButton } from "../../components/Button";
import { usePrototypeState } from "../../app/PrototypeState";
import { exampleInputs } from "./mockAnalyze";

// S19 — QR scanner (simulated camera; spec FR-03)
export function QrScannerScreen() {
  const { setDraft } = usePrototypeState();
  const navigate = useNavigate();

  function simulateScan() {
    setDraft({ type: "qr", content: exampleInputs.qr });
    navigate("/prototype/check/qr/detected");
  }

  return (
    <div className="screen screen-dark">
      <AppHeader title="Scan a QR Code" back="/prototype/home" />
      <div className="screen-content">
        <div className="camera-view" role="img" aria-label="Camera view. Point it at the QR code.">
          <div className="scan-window" />
        </div>
        <p className="body-text center">Point your camera at the QR code. We will show you where it goes before anything opens.</p>
      </div>
      <div className="screen-footer">
        <PrimaryButton onClick={simulateScan}>Simulate a scan</PrimaryButton>
      </div>
    </div>
  );
}
