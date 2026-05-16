import { Link, NavLink } from "react-router-dom";
import { BarChart3, Brain, CalendarHeart, Home, Menu, MessageCircle, PenLine, Settings } from "lucide-react";
import { cn } from "../../utils/cn";
import { Button } from "../ui/Button";

const navItems = [
  { label: "Home", to: "/dashboard", icon: Home },
  { label: "Mood", to: "/mood", icon: CalendarHeart },
  { label: "Journal", to: "/journal", icon: PenLine },
  { label: "AI Guide", to: "/ai-guide", icon: MessageCircle },
  { label: "Insights", to: "/insights", icon: BarChart3 },
  { label: "Settings", to: "/settings", icon: Settings }
];

export function Sidebar({ collapsed, onToggle }) {
  return (
    <aside className={cn("hidden border-r border-border bg-card/70 backdrop-blur-xl transition-all duration-300 lg:flex lg:flex-col", collapsed ? "lg:w-24" : "lg:w-72")}>
      <div className="flex h-20 items-center justify-between px-5">
        <Link to="/dashboard" className="flex items-center gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary text-white shadow-glow">
            <Brain className="h-5 w-5" />
          </span>
          {!collapsed && <span className="font-heading text-xl font-bold">MindEase</span>}
        </Link>
        {!collapsed && (
          <Button variant="ghost" size="sm" onClick={onToggle} aria-label="Collapse sidebar">
            <Menu className="h-4 w-4" />
          </Button>
        )}
      </div>
      {collapsed && (
        <div className="px-5 pb-4">
          <Button variant="ghost" size="sm" onClick={onToggle} aria-label="Expand sidebar">
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      )}
      <nav className="flex-1 space-y-2 px-4 py-4">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-muted-foreground transition hover:bg-muted hover:text-foreground",
                isActive && "bg-primary text-white shadow-glow hover:bg-primary hover:text-white",
                collapsed && "justify-center px-0"
              )
            }
          >
            <item.icon className="h-5 w-5 shrink-0" />
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>
      <div className="p-4">
        <div className={cn("rounded-3xl bg-gradient-to-br from-primary/15 via-secondary/15 to-success/15 p-4", collapsed && "hidden")}>
          <p className="font-bold">Wellness suite</p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">Mood, journal, AI guide, insights, and settings are now wired into the workspace.</p>
        </div>
      </div>
    </aside>
  );
}
