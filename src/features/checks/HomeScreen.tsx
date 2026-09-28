import { CircleHelp, ShieldCheck } from "lucide-react";
import { Link } from "react-router";
import { InputTypeCard } from "../../components/InputTypeCard";
import { inputTypes } from "./inputTypes";

// S05 — Home
export function HomeScreen() {
  return (
    <div className="screen">
      <div className="screen-content">
        <div className="home-hero">
          <ShieldCheck aria-hidden size={36} className="brand-icon" />
          <h1 className="screen-title">What would you like to check?</h1>
          <p className="body-text muted">Pick the kind of thing you received.</p>
        </div>
        <div className="stack">
          {Object.values(inputTypes).map((t) => (
            <InputTypeCard key={t.to} Icon={t.Icon} title={t.title} description={t.description} to={t.to} />
          ))}
        </div>
        <Link to="/prototype/check/helper" className="text-link helper-link">
          <CircleHelp aria-hidden size={20} />
          Not sure what type this is?
        </Link>
      </div>
    </div>
  );
}
