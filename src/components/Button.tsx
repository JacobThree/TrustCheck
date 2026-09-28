import type { ReactNode } from "react";
import { Link } from "react-router";

type Props = {
  children: ReactNode;
  to?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
};

function BaseButton({ variant, children, to, onClick, type = "button", disabled }: Props & { variant: string }) {
  const className = `button button-${variant}`;
  if (to) {
    return (
      <Link to={to} className={className} onClick={onClick}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} className={className} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

export function PrimaryButton(props: Props) {
  return <BaseButton variant="primary" {...props} />;
}

export function SecondaryButton(props: Props) {
  return <BaseButton variant="secondary" {...props} />;
}
