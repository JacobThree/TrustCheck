// Domain types from spec §11 (Findings) and §14 FR-05 (Scenarios).

export type InputType = "message" | "link" | "qr" | "screenshot";

export type RiskLevel = "lower-concern" | "caution" | "high-risk" | "unknown";

export type Severity = "info" | "caution" | "high";

export type Finding = {
  id: string;
  title: string;
  plainLanguageReason: string;
  severity: Severity;
  evidenceSnippet?: string;
  recommendedAction?: string;
};

export type TrustCheckScenario = {
  id: string;
  inputType: InputType;
  inputPreview: string;
  risk: RiskLevel;
  summary: string;
  findings: Finding[];
  nextSteps: string[];
  // Optional extras used by specific explanation screens.
  claimedSender?: string; // S17 — who the content says it is from
  actualDomain?: string; // S17 / S20 — where the link actually goes
  highlights?: string[]; // S28 — suspicious phrases to mark in a screenshot
};

export type HistoryEntry = {
  id: string;
  scenarioId: string;
  inputType: InputType;
  preview: string;
  checkedAt: string; // ISO timestamp
};

export type Lesson = {
  id: string;
  title: string;
  summary: string;
  example: string;
  warningSigns: string[];
  whatToDo: string[];
};

export type TextSize = "default" | "large" | "extra-large";

export type AccessibilitySettings = {
  textSize: TextSize;
  highContrast: boolean;
  reducedMotion: boolean;
  readAloud: boolean;
};
