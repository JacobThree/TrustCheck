import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { AppHeader } from "../../components/AppHeader";
import { ProgressIndicator } from "../../components/ProgressIndicator";
import { usePrototypeState } from "../../app/PrototypeState";
import type { InputType } from "../../types/trustcheck";
import { mockAnalyze, mockFailure } from "./mockAnalyze";

// S09 / S15 / S21 / S26 — Checking states, one per input type.
const copy: Record<InputType, { title: string; steps: string[] }> = {
  message: {
    title: "Checking message…",
    steps: ["Reading the message", "Looking for pressure or requests", "Checking any links"],
  },
  link: {
    title: "Checking link…",
    steps: ["Reading the website name", "Comparing it to known companies", "Looking for warning signs"],
  },
  qr: {
    title: "Checking QR destination…",
    steps: ["Reading the website name", "Checking who runs it", "Looking for warning signs"],
  },
  screenshot: {
    title: "Reading screenshot…",
    steps: ["Finding the words in the picture", "Looking for pressure or requests", "Checking any links"],
  },
};

const STEP_MS = 900;

export function AnalyzingScreen() {
  const { draft, recordCheck, simulateOutage } = usePrototypeState();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const steps = draft ? copy[draft.type].steps : [];
  const failure = draft ? mockFailure(draft.type, draft.content, simulateOutage) : null;
  const failAt = failure?.atStep;
  const failPath = failure?.path;

  useEffect(() => {
    if (!draft) return;
    if (failPath && step === failAt) {
      navigate(failPath, { replace: true }); // E-03 / E-04
      return;
    }
    if (step < steps.length) {
      const t = setTimeout(() => setStep((s) => s + 1), STEP_MS);
      return () => clearTimeout(t);
    }
    const scenario = mockAnalyze(draft.type, draft.content);
    recordCheck(scenario, draft.type === "qr" ? `QR code → ${draft.content}` : draft.content);
    navigate(`/prototype/result/${scenario.id}`, { replace: true });
  }, [draft, step, steps.length, failAt, failPath, recordCheck, navigate]);

  if (!draft) return <Navigate to="/prototype/home" replace />;

  return (
    <div className="screen">
      <AppHeader title={copy[draft.type].title} />
      <div className="screen-content">
        <ProgressIndicator steps={steps} current={step} />
        <p className="body-text muted">This usually takes a few seconds.</p>
      </div>
    </div>
  );
}
