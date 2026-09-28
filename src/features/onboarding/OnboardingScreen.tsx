import { Image, Link2, MessageSquareText, QrCode, ShieldCheck } from "lucide-react";
import { Navigate, useNavigate, useParams } from "react-router";
import { PrimaryButton, SecondaryButton } from "../../components/Button";
import { usePrototypeState } from "../../app/PrototypeState";
import { AccessibilityControls } from "../settings/AccessibilityControls";

// S01–S04 — Onboarding steps
const steps = [
  {
    title: "Not sure if you can trust something?",
    body: (
      <p className="body-text">
        TrustCheck looks at a message, link, or code with you, explains what seems off, and tells you what to do next.
      </p>
    ),
  },
  {
    title: "What you can check",
    body: (
      <ul className="icon-list">
        <li>
          <MessageSquareText aria-hidden /> Messages — texts, emails, and chats
        </li>
        <li>
          <Link2 aria-hidden /> Links — website addresses
        </li>
        <li>
          <QrCode aria-hidden /> QR codes — square codes on signs and stickers
        </li>
        <li>
          <Image aria-hidden /> Screenshots — pictures of your screen
        </li>
      </ul>
    ),
  },
  {
    title: "TrustCheck helps, but it can be wrong",
    body: (
      <>
        <p className="body-text">We point out warning signs. We cannot promise that anything is safe.</p>
        <p className="body-text">
          If something asks for money, passwords, or personal details, check with the company or person directly.
        </p>
      </>
    ),
  },
  {
    title: "Make TrustCheck easier to use",
    body: (
      <>
        <p className="body-text muted">You can change these any time in Settings.</p>
        <AccessibilityControls />
      </>
    ),
  },
];

export function OnboardingScreen() {
  const { completeOnboarding } = usePrototypeState();
  const navigate = useNavigate();
  const index = Number(useParams().step) - 1;
  const step = steps[index];
  if (!step) return <Navigate to="/prototype/onboarding/1" replace />;
  const isLast = index === steps.length - 1;

  function finish() {
    completeOnboarding();
    navigate("/prototype/home");
  }

  return (
    <div className="screen">
      <div className="screen-content onboarding">
        {index === 0 && <ShieldCheck aria-hidden size={56} className="brand-icon" />}
        <p className="muted">
          Step {index + 1} of {steps.length}
        </p>
        <h1 className="screen-title">{step.title}</h1>
        {step.body}
      </div>
      <div className="screen-footer button-stack">
        {isLast ? (
          <PrimaryButton onClick={finish}>Start using TrustCheck</PrimaryButton>
        ) : (
          <PrimaryButton to={`/prototype/onboarding/${index + 2}`}>Continue</PrimaryButton>
        )}
        {index > 0 && <SecondaryButton to={`/prototype/onboarding/${index}`}>Back</SecondaryButton>}
      </div>
    </div>
  );
}
