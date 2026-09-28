import { CircleCheck, CircleHelp, OctagonAlert, TriangleAlert, type LucideIcon } from "lucide-react";
import { riskCopy } from "../data/copy";
import type { RiskLevel } from "../types/trustcheck";

// ACC-04: every risk state has an icon, a text label, and a color.
const icons: Record<RiskLevel, LucideIcon> = {
  "lower-concern": CircleCheck,
  caution: TriangleAlert,
  "high-risk": OctagonAlert,
  unknown: CircleHelp,
};

export function RiskBadge({ risk, large = false }: { risk: RiskLevel; large?: boolean }) {
  const Icon = icons[risk];
  return (
    <span className={`risk-badge risk-${risk}${large ? " risk-badge-large" : ""}`}>
      <Icon aria-hidden size={large ? 28 : 18} />
      <span>{riskCopy[risk].label}</span>
    </span>
  );
}
