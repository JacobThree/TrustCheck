import { Navigate } from "react-router";
import { ResultView } from "./ResultView";
import { useScenarioParam } from "./useScenarioParam";

// S10 / S16 / S22 / S27 — Result
export function ResultScreen() {
  const scenario = useScenarioParam();
  if (!scenario) return <Navigate to="/prototype/home" replace />;
  return <ResultView scenario={scenario} back="/prototype/home" />;
}
