import { ChevronRight, Lock } from "lucide-react";
import { Link } from "react-router";
import { AccessibilityToggle } from "../../components/AccessibilityToggle";
import { AppHeader } from "../../components/AppHeader";
import { usePrototypeState } from "../../app/PrototypeState";
import { AccessibilityControls } from "./AccessibilityControls";

// S33 — Settings
export function SettingsScreen() {
  const { simulateOutage, setSimulateOutage } = usePrototypeState();
  return (
    <div className="screen">
      <AppHeader title="Settings" />
      <div className="screen-content">
        <h2 className="section-title">Reading and viewing</h2>
        <AccessibilityControls />
        <h2 className="section-title">About</h2>
        <Link to="/prototype/privacy" className="card card-link">
          <span className="input-type-icon">
            <Lock aria-hidden size={24} />
          </span>
          <span className="card-body">
            <span className="card-title">Privacy & trust</span>
            <span className="card-text">What TrustCheck sees and what it cannot do</span>
          </span>
          <ChevronRight aria-hidden size={20} className="card-chevron" />
        </Link>
        <h2 className="section-title">Prototype demo</h2>
        <AccessibilityToggle
          label="Simulate a failed check"
          description="Shows what happens when TrustCheck cannot finish a check"
          checked={simulateOutage}
          onChange={setSimulateOutage}
        />
        <Link to="/prototype/onboarding/1" className="text-link">
          Replay the introduction
        </Link>
      </div>
    </div>
  );
}
