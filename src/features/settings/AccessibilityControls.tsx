import { AccessibilityToggle } from "../../components/AccessibilityToggle";
import { usePrototypeState } from "../../app/PrototypeState";
import { TextSizePicker } from "./TextSizePicker";

// Shared by S04 (onboarding) and S33 (settings), spec FR-08.
export function AccessibilityControls() {
  const { settings, updateSettings } = usePrototypeState();
  return (
    <div className="stack">
      <TextSizePicker />
      <AccessibilityToggle
        label="High contrast"
        description="Stronger colors and borders"
        checked={settings.highContrast}
        onChange={(highContrast) => updateSettings({ highContrast })}
      />
      <AccessibilityToggle
        label="Reduce motion"
        description="Turn off moving animations"
        checked={settings.reducedMotion}
        onChange={(reducedMotion) => updateSettings({ reducedMotion })}
      />
      <AccessibilityToggle
        label="Read results aloud"
        description="Shows a button to hear your result"
        checked={settings.readAloud}
        onChange={(readAloud) => updateSettings({ readAloud })}
      />
    </div>
  );
}
