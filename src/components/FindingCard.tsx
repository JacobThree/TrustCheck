import { ChevronRight, Info, OctagonAlert, TriangleAlert } from "lucide-react";
import { Link } from "react-router";
import type { Finding } from "../types/trustcheck";

const severityIcon = { info: Info, caution: TriangleAlert, high: OctagonAlert };
const severityLabel = { info: "Note", caution: "Warning sign", high: "Strong warning sign" };

export function FindingCard({ finding, to }: { finding: Finding; to: string }) {
  const Icon = severityIcon[finding.severity];
  return (
    <Link to={to} className={`card card-link finding-card severity-${finding.severity}`}>
      <Icon aria-hidden size={22} className="finding-icon" />
      <span className="card-body">
        <span className="finding-severity">{severityLabel[finding.severity]}</span>
        <span className="card-title">{finding.title}</span>
        <span className="card-text link-text">Why does this matter?</span>
      </span>
      <ChevronRight aria-hidden size={20} className="card-chevron" />
    </Link>
  );
}
