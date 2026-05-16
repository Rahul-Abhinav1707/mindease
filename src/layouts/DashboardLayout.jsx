import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../components/layout/Sidebar";
import { Topbar } from "../components/layout/Topbar";
import { MobileNav } from "../components/layout/MobileNav";
import { MobileDrawer } from "../components/layout/MobileDrawer";
import { useAuth } from "../hooks/useAuth";

export default function DashboardLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed inset-0 -z-10 bg-wellness-radial opacity-70" />
      <div className="flex min-h-screen">
        <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((value) => !value)} />
        <div className="min-w-0 flex-1">
          <Topbar user={user} onLogout={handleLogout} />
          <main className="px-4 pb-28 pt-6 sm:px-6 lg:pb-10">{children}</main>
        </div>
      </div>
      <MobileNav onOpen={() => setDrawerOpen(true)} />
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} onLogout={handleLogout} user={user} />
    </div>
  );
}
