import { useParams } from "react-router";
import { getScenario } from "../../data/scenarios";

export function useScenarioParam() {
  const { scenarioId } = useParams();
  return getScenario(scenarioId);
}
