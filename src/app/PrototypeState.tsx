import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type {
  AccessibilitySettings,
  HistoryEntry,
  InputType,
  TrustCheckScenario,
} from "../types/trustcheck";
import { scenarios } from "../data/scenarios";

// In-memory prototype state. History resets on reload (spec §33, open decision 5).

type Draft = { type: InputType; content: string };

type PrototypeState = {
  settings: AccessibilitySettings;
  updateSettings: (patch: Partial<AccessibilitySettings>) => void;
  onboarded: boolean;
  completeOnboarding: () => void;
  draft: Draft | null;
  setDraft: (draft: Draft | null) => void;
  history: HistoryEntry[];
  recordCheck: (scenario: TrustCheckScenario, preview: string) => void;
};

const defaultSettings: AccessibilitySettings = {
  textSize: "default",
  highContrast: false,
  reducedMotion: false,
  readAloud: false,
};

// A couple of earlier checks so the History screen has content on first visit.
const seedHistory: HistoryEntry[] = [
  {
    id: "seed-1",
    scenarioId: scenarios.giftCardScam.id,
    inputType: "message",
    preview: scenarios.giftCardScam.inputPreview,
    checkedAt: "2026-09-26T15:42:00",
  },
  {
    id: "seed-2",
    scenarioId: scenarios.benignMessage.id,
    inputType: "message",
    preview: scenarios.benignMessage.inputPreview,
    checkedAt: "2026-09-24T09:10:00",
  },
];

const Ctx = createContext<PrototypeState | null>(null);

export function PrototypeStateProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState(defaultSettings);
  const [onboarded, setOnboarded] = useState(false);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [history, setHistory] = useState(seedHistory);

  const updateSettings = useCallback(
    (patch: Partial<AccessibilitySettings>) => setSettings((s) => ({ ...s, ...patch })),
    [],
  );
  const completeOnboarding = useCallback(() => setOnboarded(true), []);
  const recordCheck = useCallback((scenario: TrustCheckScenario, preview: string) => {
    setHistory((h) => [
      {
        id: crypto.randomUUID(),
        scenarioId: scenario.id,
        inputType: scenario.inputType,
        preview,
        checkedAt: new Date().toISOString(),
      },
      ...h,
    ]);
  }, []);

  const value = useMemo(
    () => ({
      settings,
      updateSettings,
      onboarded,
      completeOnboarding,
      draft,
      setDraft,
      history,
      recordCheck,
    }),
    [settings, updateSettings, onboarded, completeOnboarding, draft, history, recordCheck],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function usePrototypeState(): PrototypeState {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("usePrototypeState must be used inside PrototypeStateProvider");
  return ctx;
}
