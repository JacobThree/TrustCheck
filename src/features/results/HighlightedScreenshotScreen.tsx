import { Navigate } from "react-router";
import { AppHeader } from "../../components/AppHeader";
import { PrimaryButton } from "../../components/Button";
import { MockScreenshot } from "../checks/MockScreenshot";
import { useScenarioParam } from "./useScenarioParam";

// S28 — Highlighted screenshot. Marks suspicious phrases in the picture.
export function HighlightedScreenshotScreen() {
  const scenario = useScenarioParam();
  if (!scenario) return <Navigate to="/prototype/home" replace />;

  return (
    <div className="screen">
      <AppHeader title="What we marked" back={`/prototype/result/${scenario.id}`} />
      <div className="screen-content">
        <MockScreenshot highlights={scenario.highlights} />
        <ul className="bullet-list">
          {scenario.findings
            .filter((f) => f.evidenceSnippet)
            .map((f) => (
              <li key={f.id}>
                <mark className="highlight">{f.evidenceSnippet}</mark> — {f.title.toLowerCase()}
              </li>
            ))}
        </ul>
      </div>
      <div className="screen-footer">
        <PrimaryButton to={`/prototype/result/${scenario.id}/next-steps`}>What should I do?</PrimaryButton>
      </div>
    </div>
  );
}
