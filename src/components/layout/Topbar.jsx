import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Bell, ChevronDown, LogOut, Search, UserRound } from "lucide-react";
import { ThemeToggle } from "../ui/ThemeToggle";
import { Button } from "../ui/Button";

export function Topbar({ user, onLogout }) {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/86 px-4 py-4 backdrop-blur-md sm:px-6">
      <div className="flex items-center justify-between gap-4">
        <div className="hidden min-w-0 flex-1 items-center gap-3 rounded-full border border-border bg-card/70 px-4 py-3 shadow-sm md:flex">
          <Search className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Search wellness spaces, settings, or future modules</span>
        </div>
        <div className="md:hidden">
          <p className="font-heading text-xl font-bold">MindEase</p>
          <p className="text-xs text-muted-foreground">Dashboard</p>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="glass" size="sm" aria-label="Notifications">
            <Bell className="h-4 w-4" />
          </Button>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button className="focus-ring flex items-center gap-2 rounded-full border border-border bg-card/80 p-1.5 pr-3 shadow-sm transition hover:bg-muted">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-primary to-secondary text-white">
                  <UserRound className="h-4 w-4" />
                </span>
                <span className="hidden max-w-32 truncate text-sm font-bold sm:block">{user?.fullName || "Member"}</span>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content align="end" className="z-50 mt-2 w-56 rounded-3xl border border-border bg-card p-2 shadow-soft">
                <div className="px-3 py-3">
                  <p className="font-bold">{user?.fullName}</p>
                  <p className="truncate text-sm text-muted-foreground">{user?.email}</p>
                </div>
                <DropdownMenu.Separator className="my-1 h-px bg-border" />
                <DropdownMenu.Item onClick={onLogout} className="flex cursor-pointer items-center gap-2 rounded-2xl px-3 py-2 text-sm font-semibold outline-none transition hover:bg-muted">
                  <LogOut className="h-4 w-4" />
                  Logout
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
      </div>
    </header>
  );
}
