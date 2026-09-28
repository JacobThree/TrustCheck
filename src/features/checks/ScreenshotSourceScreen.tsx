import { Camera, ImageUp, Sparkles, ImageOff, type LucideIcon } from "lucide-react";
import { useNavigate } from "react-router";
import { AppHeader } from "../../components/AppHeader";
import { usePrototypeState } from "../../app/PrototypeState";
import { BLURRY_SCREENSHOT, exampleInputs } from "./mockAnalyze";

// S24 — Screenshot source. Photo and upload use the clear sample image in the prototype;
// the blurry example demonstrates E-03.
const sources = [
  { label: "Take a photo", Icon: Camera, content: exampleInputs.screenshot },
  { label: "Upload a screenshot", Icon: ImageUp, content: exampleInputs.screenshot },
];
const examples = [
  { label: "Use a clear example", Icon: Sparkles, content: exampleInputs.screenshot },
  { label: "Use a blurry example", Icon: ImageOff, content: BLURRY_SCREENSHOT },
];

export function ScreenshotSourceScreen() {
  const { setDraft } = usePrototypeState();
  const navigate = useNavigate();

  function choose(content: string) {
    setDraft({ type: "screenshot", content });
    navigate("/prototype/check/screenshot/preview");
  }

  const option = ({ label, Icon, content }: { label: string; Icon: LucideIcon; content: string }) => (
    <button key={label} type="button" className="card card-link" onClick={() => choose(content)}>
      <span className="input-type-icon">
        <Icon aria-hidden size={28} />
      </span>
      <span className="card-title">{label}</span>
    </button>
  );

  return (
    <div className="screen">
      <AppHeader title="Check a Screenshot" back="/prototype/home" />
      <div className="screen-content">
        <p className="body-text">Where is the picture?</p>
        <div className="stack">{sources.map(option)}</div>
        <p className="body-text muted">Or try an example:</p>
        <div className="stack">{examples.map(option)}</div>
      </div>
    </div>
  );
}
