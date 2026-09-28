import { BookOpen, History, House, Settings } from "lucide-react";
import { NavLink } from "react-router";

const tabs = [
  { to: "/prototype/home", label: "Home", Icon: House },
  { to: "/prototype/history", label: "History", Icon: History },
  { to: "/prototype/learn", label: "Learn", Icon: BookOpen },
  { to: "/prototype/settings", label: "Settings", Icon: Settings },
];

export function BottomNavigation() {
  return (
    <nav className="bottom-nav" aria-label="Main">
      {tabs.map(({ to, label, Icon }) => (
        <NavLink key={to} to={to} className="bottom-nav-item">
          <Icon aria-hidden size={24} />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
