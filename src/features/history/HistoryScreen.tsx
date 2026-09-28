import { AppHeader } from "../../components/AppHeader";
import { HistoryItem } from "../../components/HistoryItem";
import { usePrototypeState } from "../../app/PrototypeState";

// S29 — History
export function HistoryScreen() {
  const { history } = usePrototypeState();
  return (
    <div className="screen">
      <AppHeader title="History" />
      <div className="screen-content">
        {history.length === 0 ? (
          <p className="body-text muted">Things you check will appear here.</p>
        ) : (
          <div className="stack">
            {history.map((entry) => (
              <HistoryItem key={entry.id} entry={entry} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
