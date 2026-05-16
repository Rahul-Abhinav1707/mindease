import { Link } from "react-router-dom";
import { Brain } from "lucide-react";
import { motion } from "framer-motion";
import { FloatingBlobs } from "../landing/FloatingBlobs";
import { ThemeToggle } from "../ui/ThemeToggle";

export function AuthShell({ title, subtitle, children }) {
  return (
    <main className="relative grid min-h-screen overflow-hidden bg-wellness-radial px-4 py-8 lg:grid-cols-[1fr_520px]">
      <FloatingBlobs />
      <div className="relative z-10 hidden flex-col justify-between p-8 lg:flex">
        <Link to="/" className="flex items-center gap-2 font-heading text-xl font-bold">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-primary text-white shadow-glow">
            <Brain className="h-5 w-5" />
          </span>
          MindEase
        </Link>
        <div className="max-w-xl">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary">Secure wellness access</p>
          <h1 className="mt-4 text-5xl font-extrabold leading-tight">A calmer operating system for your inner life.</h1>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">Sign in to a focused dashboard foundation built for reflection, trust, and future AI-powered guidance.</p>
        </div>
      </div>
      <div className="relative z-10 mx-auto flex w-full max-w-xl flex-col justify-center">
        <div className="mb-6 flex items-center justify-between lg:justify-end">
          <Link to="/" className="flex items-center gap-2 font-heading text-xl font-bold lg:hidden">
            <Brain className="h-6 w-6 text-primary" />
            MindEase
          </Link>
          <ThemeToggle />
        </div>
        <motion.section initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="glass-panel rounded-[2rem] p-6 sm:p-8">
          <h2 className="text-3xl font-extrabold">{title}</h2>
          <p className="mt-2 text-muted-foreground">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </motion.section>
      </div>
    </main>
  );
}
