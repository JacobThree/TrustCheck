import { ChevronLeft } from "lucide-react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router";

type Props = {
  title: string;
  /** Show a back button. Pass a path to go somewhere specific, or `true` to go back in history. */
  back?: boolean | string;
  action?: ReactNode;
};

export function AppHeader({ title, back, action }: Props) {
  const navigate = useNavigate();
  return (
    <header className="app-header">
      {back ? (
        <button
          type="button"
          className="icon-button"
          aria-label="Go back"
          onClick={() => (typeof back === "string" ? navigate(back) : navigate(-1))}
        >
          <ChevronLeft aria-hidden size={24} />
        </button>
      ) : (
        <span className="icon-button-spacer" />
      )}
      <h1 className="app-header-title">{title}</h1>
      {action ?? <span className="icon-button-spacer" />}
    </header>
  );
}
