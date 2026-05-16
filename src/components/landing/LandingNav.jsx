import { Link } from "react-router-dom";
import { Brain, Sparkles } from "lucide-react";
import { Button } from "../ui/Button";
import { ThemeToggle } from "../ui/ThemeToggle";

export function LandingNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 px-4 py-4">
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/40 bg-white/85 px-4 py-3 shadow-soft backdrop-blur-md dark:border-white/10 dark:bg-midnight/85">
        <Link to="/" className="flex items-center gap-2 font-heading text-lg font-bold">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-primary text-white shadow-glow">
            <Brain className="h-5 w-5" />
          </span>
          MindEase
        </Link>
        <div className="hidden items-center gap-7 text-sm font-semibold text-muted-foreground md:flex">
          <a href="#features" className="transition hover:text-foreground">Features</a>
          <a href="#testimonials" className="transition hover:text-foreground">Stories</a>
          <a href="#footer" className="transition hover:text-foreground">Company</a>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild variant="glass" size="sm" className="hidden sm:inline-flex">
            <Link to="/login">Sign in</Link>
          </Button>
          <Button asChild size="sm">
            <Link to="/register">
              <Sparkles className="h-4 w-4" />
              Start
            </Link>
          </Button>
        </div>
      </nav>
    </header>
  );
}
