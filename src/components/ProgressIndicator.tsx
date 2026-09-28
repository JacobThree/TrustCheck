import { CircleCheck, LoaderCircle } from "lucide-react";

// System-status feedback for "Checking…" screens. Each step is also stated in text,
// so the animation is never required to understand progress (ACC-07).
export function ProgressIndicator({ steps, current }: { steps: string[]; current: number }) {
  return (
    <ol className="progress" aria-live="polite">
      {steps.map((step, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={step} className={`progress-step${done ? " is-done" : ""}${active ? " is-active" : ""}`}>
            {done ? (
              <CircleCheck aria-hidden size={22} />
            ) : (
              <LoaderCircle aria-hidden size={22} className={active ? "spin" : "is-pending"} />
            )}
            <span>
              {step}
              <span className="visually-hidden">{done ? " (done)" : active ? " (in progress)" : ""}</span>
            </span>
          </li>
        );
      })}
    </ol>
  );
}
