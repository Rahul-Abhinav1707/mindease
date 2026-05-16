import { Link } from "react-router-dom";
import { X, Brain, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/Button";

const drawerItems = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Mood", to: "/mood" },
  { label: "Journal", to: "/journal" },
  { label: "AI guide", to: "/ai-guide" },
  { label: "Insights", to: "/insights" },
  { label: "Settings", to: "/settings" }
];

export function MobileDrawer({ open, onClose, onLogout, user }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50 lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <button aria-label="Close menu" className="absolute inset-0 bg-midnight/60 backdrop-blur-sm" onClick={onClose} />
          <motion.aside initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 26, stiffness: 260 }} className="absolute right-0 top-0 h-full w-[86%] max-w-sm bg-card p-5 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary text-white">
                  <Brain className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-heading text-lg font-bold">MindEase</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="mt-8 space-y-3">
              {drawerItems.map((item) => (
                <Link key={item.label} to={item.to} onClick={onClose} className="block w-full rounded-2xl bg-muted px-4 py-3 text-left text-sm font-semibold transition hover:bg-primary hover:text-white">
                  {item.label}
                </Link>
              ))}
            </div>
            <Button variant="outline" className="mt-8 w-full" onClick={onLogout}>
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
