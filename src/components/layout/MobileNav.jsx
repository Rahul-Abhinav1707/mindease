import { NavLink } from "react-router-dom";
import { Home, Menu, MessageCircle, PenLine, Settings } from "lucide-react";
import { Button } from "../ui/Button";

const items = [
  { label: "Home", to: "/dashboard", icon: Home },
  { label: "Journal", to: "/journal", icon: PenLine },
  { label: "AI", to: "/ai-guide", icon: MessageCircle },
  { label: "Settings", to: "/settings", icon: Settings }
];

export function MobileNav({ onOpen }) {
  return (
    <div className="fixed inset-x-3 bottom-3 z-40 rounded-[1.5rem] border border-white/30 bg-white/85 p-2 shadow-soft backdrop-blur-md dark:border-white/10 dark:bg-midnight/90 lg:hidden">
      <div className="grid grid-cols-5 gap-1">
        {items.map((item) => (
          <NavLink key={item.label} to={item.to} className={({ isActive }) => `flex flex-col items-center gap-1 rounded-2xl py-2 text-xs font-semibold transition ${isActive ? "bg-primary text-white" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}>
            <item.icon className="h-5 w-5" />
            {item.label}
          </NavLink>
        ))}
        <Button variant="ghost" size="sm" onClick={onOpen} aria-label="Open menu" className="h-auto flex-col rounded-2xl py-2 text-xs">
          <Menu className="h-5 w-5" />
          Menu
        </Button>
      </div>
    </div>
  );
}
