import { AppHeader } from "../../components/AppHeader";
import { InputTypeCard } from "../../components/InputTypeCard";
import { inputTypes } from "./inputTypes";

// S06 — "What should I check?" helper. Shows recognizable examples (UX-02).
const choices = [
  { type: "message", prompt: "Someone sent me words", example: "“Your account is locked. Reply now…”" },
  { type: "link", prompt: "I have a website address", example: "“www.something.com/…”" },
  { type: "qr", prompt: "I see a square code to scan", example: "On a parking meter, menu, or poster" },
  { type: "screenshot", prompt: "I have a picture of it", example: "A photo or screenshot of your screen" },
] as const;

export function CheckHelperScreen() {
  return (
    <div className="screen">
      <AppHeader title="What should I check?" back="/prototype/home" />
      <div className="screen-content">
        <p className="body-text">Choose the one that sounds most like what you have.</p>
        <div className="stack">
          {choices.map((c) => (
            <InputTypeCard
              key={c.type}
              Icon={inputTypes[c.type].Icon}
              title={c.prompt}
              description={c.example}
              to={inputTypes[c.type].to}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
