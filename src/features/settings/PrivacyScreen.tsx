import { AppHeader } from "../../components/AppHeader";

// S34 — Privacy & trust (spec FR-09)
export function PrivacyScreen() {
  return (
    <div className="screen">
      <AppHeader title="Privacy & trust" back="/prototype/settings" />
      <div className="screen-content">
        <h2 className="section-title">What TrustCheck sees</h2>
        <p className="body-text">
          TrustCheck only needs the content you choose to check. A real version should minimize storage and protect
          sensitive information.
        </p>
        <h2 className="section-title">What TrustCheck cannot do</h2>
        <ul className="bullet-list">
          <li>It can miss scams.</li>
          <li>It can sometimes flag something that is real.</li>
          <li>It cannot promise that anything is safe.</li>
        </ul>
        <h2 className="section-title">You stay in control</h2>
        <p className="body-text">
          For anything involving money, passwords, or personal details, check with the company or person directly.
        </p>
        <p className="disclaimer">This prototype uses example results. It does not send anything anywhere.</p>
      </div>
    </div>
  );
}
