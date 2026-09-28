import { ChevronRight, Lock } from "lucide-react";
import { Link } from "react-router";
import { AppHeader } from "../../components/AppHeader";
import { AccessibilityControls } from "./AccessibilityControls";

// S33 — Settings
export function SettingsScreen() {
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
        <Link to="/prototype/onboarding/1" className="text-link">
          Replay the introduction
        </Link>
      </div>
    </div>
  );
}
