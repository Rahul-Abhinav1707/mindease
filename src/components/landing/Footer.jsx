import { Link } from "react-router-dom";
import { Brain } from "lucide-react";

export function Footer() {
  return (
    <footer id="footer" className="border-t border-border px-4 py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <Link to="/" className="flex items-center gap-2 font-heading text-lg font-bold">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-primary text-white">
            <Brain className="h-5 w-5" />
          </span>
          MindEase
        </Link>
        <p className="text-sm text-muted-foreground">Premium mental wellness platform foundation. Built for secure growth.</p>
      </div>
    </footer>
  );
}
