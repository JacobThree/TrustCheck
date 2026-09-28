import { createBrowserRouter, Navigate } from "react-router";
import { PortfolioPage } from "../pages/portfolio/PortfolioPage";
import { PrototypeIndex, PrototypeLayout, TabLayout, TaskLayout } from "../pages/prototype/PrototypeLayout";
import { OnboardingScreen } from "../features/onboarding/OnboardingScreen";
import { HomeScreen } from "../features/checks/HomeScreen";
import { CheckHelperScreen } from "../features/checks/CheckHelperScreen";
import { MessageInputScreen } from "../features/checks/MessageInputScreen";
import { MessageReviewScreen } from "../features/checks/MessageReviewScreen";
import { LinkInputScreen } from "../features/checks/LinkInputScreen";
import { LinkReviewScreen } from "../features/checks/LinkReviewScreen";
import { QrScannerScreen } from "../features/checks/QrScannerScreen";
import { QrDetectedScreen } from "../features/checks/QrDetectedScreen";
import { ScreenshotSourceScreen } from "../features/checks/ScreenshotSourceScreen";
import { ScreenshotPreviewScreen } from "../features/checks/ScreenshotPreviewScreen";
import { AnalyzingScreen } from "../features/checks/AnalyzingScreen";
import { UnreadableScreenshotScreen } from "../features/checks/UnreadableScreenshotScreen";
import { AnalysisUnavailableScreen } from "../features/checks/AnalysisUnavailableScreen";
import { ResultScreen } from "../features/results/ResultScreen";
import { FindingDetailScreen } from "../features/results/FindingDetailScreen";
import { NextStepsScreen } from "../features/results/NextStepsScreen";
import { DomainExplanationScreen } from "../features/results/DomainExplanationScreen";
import { VerifyOfficialSiteScreen } from "../features/results/VerifyOfficialSiteScreen";
import { QrExplanationScreen } from "../features/results/QrExplanationScreen";
import { HighlightedScreenshotScreen } from "../features/results/HighlightedScreenshotScreen";
import { HistoryScreen } from "../features/history/HistoryScreen";
import { HistoryDetailScreen } from "../features/history/HistoryDetailScreen";
import { LearnScreen } from "../features/learn/LearnScreen";
import { LessonDetailScreen } from "../features/learn/LessonDetailScreen";
import { SettingsScreen } from "../features/settings/SettingsScreen";
import { PrivacyScreen } from "../features/settings/PrivacyScreen";

// Route map from spec §26. Screen IDs (S01–S34) from spec §19, error states (E-xx) from §22.
export const router = createBrowserRouter([
  { path: "/", element: <PortfolioPage /> },
  { path: "/portfolio", element: <Navigate to="/" replace /> },
  {
    path: "/prototype",
    element: <PrototypeLayout />,
    children: [
      { index: true, element: <PrototypeIndex /> },
      {
        element: <TabLayout />,
        children: [
          { path: "home", element: <HomeScreen /> }, // S05
          { path: "history", element: <HistoryScreen /> }, // S29
          { path: "learn", element: <LearnScreen /> }, // S31
          { path: "learn/:topicId", element: <LessonDetailScreen /> }, // S32
          { path: "settings", element: <SettingsScreen /> }, // S33
          { path: "privacy", element: <PrivacyScreen /> }, // S34
        ],
      },
      {
        element: <TaskLayout />,
        children: [
          { path: "onboarding", element: <Navigate to="1" replace /> },
          { path: "onboarding/:step", element: <OnboardingScreen /> }, // S01–S04
          { path: "check/helper", element: <CheckHelperScreen /> }, // S06
          { path: "check/message", element: <MessageInputScreen /> }, // S07
          { path: "check/message/review", element: <MessageReviewScreen /> }, // S08
          { path: "check/link", element: <LinkInputScreen /> }, // S13
          { path: "check/link/review", element: <LinkReviewScreen /> }, // S14
          { path: "check/qr", element: <QrScannerScreen /> }, // S19
          { path: "check/qr/detected", element: <QrDetectedScreen /> }, // S20
          { path: "check/screenshot", element: <ScreenshotSourceScreen /> }, // S24
          { path: "check/screenshot/preview", element: <ScreenshotPreviewScreen /> }, // S25
          { path: "check/screenshot/unreadable", element: <UnreadableScreenshotScreen /> }, // E-03
          { path: "check/unavailable", element: <AnalysisUnavailableScreen /> }, // E-04
          { path: "analyzing", element: <AnalyzingScreen /> }, // S09, S15, S21, S26
          { path: "result/:scenarioId", element: <ResultScreen /> }, // S10, S16, S22, S27
          { path: "result/:scenarioId/finding/:findingId", element: <FindingDetailScreen /> }, // S11
          { path: "result/:scenarioId/next-steps", element: <NextStepsScreen /> }, // S12
          { path: "result/:scenarioId/domain", element: <DomainExplanationScreen /> }, // S17
          { path: "result/:scenarioId/verify", element: <VerifyOfficialSiteScreen /> }, // S18
          { path: "result/:scenarioId/qr-explained", element: <QrExplanationScreen /> }, // S23
          { path: "result/:scenarioId/highlights", element: <HighlightedScreenshotScreen /> }, // S28
          { path: "history/:entryId", element: <HistoryDetailScreen /> }, // S30
        ],
      },
      { path: "*", element: <Navigate to="/prototype" replace /> },
    ],
  },
  { path: "*", element: <Navigate to="/" replace /> },
], {
  // Matches Vite's `base` so routes work under /<repo>/ on GitHub Pages.
  basename: import.meta.env.BASE_URL.replace(/\/$/, "") || "/",
});
