import { usePrototypeState } from "../../app/PrototypeState";
import type { TextSize } from "../../types/trustcheck";

const options: { value: TextSize; label: string }[] = [
  { value: "default", label: "Standard" },
  { value: "large", label: "Large" },
  { value: "extra-large", label: "Extra large" },
];

export function TextSizePicker() {
  const { settings, updateSettings } = usePrototypeState();
  return (
    <fieldset className="segmented">
      <legend className="card-title">Text size</legend>
      <div className="segmented-options">
        {options.map((o) => (
          <label key={o.value} className={`segmented-option size-${o.value}`}>
            <input
              type="radio"
              name="text-size"
              value={o.value}
              checked={settings.textSize === o.value}
              onChange={() => updateSettings({ textSize: o.value })}
            />
            <span>{o.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
