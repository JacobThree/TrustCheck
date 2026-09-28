import { ChevronRight } from "lucide-react";
import { Link } from "react-router";
import { getScenario } from "../data/scenarios";
import type { HistoryEntry } from "../types/trustcheck";
import { RiskBadge } from "./RiskBadge";

const typeLabel = { message: "Message", link: "Link", qr: "QR code", screenshot: "Screenshot" };

export function HistoryItem({ entry }: { entry: HistoryEntry }) {
  const scenario = getScenario(entry.scenarioId);
  const when = new Date(entry.checkedAt).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
  return (
    <Link to={`/prototype/history/${entry.id}`} className="card card-link history-item">
      <span className="card-body">
        <span className="history-meta">
          {typeLabel[entry.inputType]} · {when}
        </span>
        <span className="card-text history-preview">{entry.preview}</span>
        {scenario && <RiskBadge risk={scenario.risk} />}
      </span>
      <ChevronRight aria-hidden size={20} className="card-chevron" />
    </Link>
  );
}
