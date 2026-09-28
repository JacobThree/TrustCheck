import { ChevronRight, type LucideIcon } from "lucide-react";
import { Link } from "react-router";

type Props = {
  Icon: LucideIcon;
  title: string;
  description: string;
  to: string;
};

export function InputTypeCard({ Icon, title, description, to }: Props) {
  return (
    <Link to={to} className="card card-link input-type-card">
      <span className="input-type-icon">
        <Icon aria-hidden size={28} />
      </span>
      <span className="card-body">
        <span className="card-title">{title}</span>
        <span className="card-text">{description}</span>
      </span>
      <ChevronRight aria-hidden size={20} className="card-chevron" />
    </Link>
  );
}
