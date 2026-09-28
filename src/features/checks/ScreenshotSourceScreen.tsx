import { Camera, ImageUp, Sparkles } from "lucide-react";
import { useNavigate } from "react-router";
import { AppHeader } from "../../components/AppHeader";
import { usePrototypeState } from "../../app/PrototypeState";
import { exampleInputs } from "./mockAnalyze";

// S24 — Screenshot source. All three options use the sample image in the prototype.
const sources = [
  { label: "Take a photo", Icon: Camera },
  { label: "Upload a screenshot", Icon: ImageUp },
  { label: "Use an example", Icon: Sparkles },
];

export function ScreenshotSourceScreen() {
  const { setDraft } = usePrototypeState();
  const navigate = useNavigate();

  function choose() {
    setDraft({ type: "screenshot", content: exampleInputs.screenshot });
    navigate("/prototype/check/screenshot/preview");
  }

  return (
    <div className="screen">
      <AppHeader title="Check a Screenshot" back="/prototype/home" />
      <div className="screen-content">
        <p className="body-text">Where is the picture?</p>
        <div className="stack">
          {sources.map(({ label, Icon }) => (
            <button key={label} type="button" className="card card-link" onClick={choose}>
              <span className="input-type-icon">
                <Icon aria-hidden size={28} />
              </span>
              <span className="card-title">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
