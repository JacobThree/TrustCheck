import { useId } from "react";

type Props = {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export function AccessibilityToggle({ label, description, checked, onChange }: Props) {
  const id = useId();
  return (
    <div className="toggle-row">
      <label htmlFor={id} className="toggle-label">
        <span className="card-title">{label}</span>
        {description && <span className="card-text">{description}</span>}
      </label>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        className="switch"
        onClick={() => onChange(!checked)}
      >
        <span className="switch-thumb" />
        <span className="switch-state">{checked ? "On" : "Off"}</span>
      </button>
    </div>
  );
}
