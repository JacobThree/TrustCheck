import { Navigate, useParams } from "react-router";
import { usePrototypeState } from "../../app/PrototypeState";
import { getScenario } from "../../data/scenarios";
import { ResultView } from "../results/ResultView";

// S30 — History detail. Re-opens a stored result.
export function HistoryDetailScreen() {
  const { history } = usePrototypeState();
  const { entryId } = useParams();
  const scenario = getScenario(history.find((h) => h.id === entryId)?.scenarioId);
  if (!scenario) return <Navigate to="/prototype/history" replace />;
  return <ResultView scenario={scenario} back="/prototype/history" />;
}
