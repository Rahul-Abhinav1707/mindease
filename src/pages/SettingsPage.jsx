import { useEffect, useState } from "react";
import { Bell, Loader2, LockKeyhole, Palette, UserRound } from "lucide-react";
import DashboardLayout from "../layouts/DashboardLayout";
import { PageHeader } from "../components/dashboard/PageHeader";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import { Button } from "../components/ui/Button";
import { ThemeToggle } from "../components/ui/ThemeToggle";
import { useAuth } from "../hooks/useAuth";
import { wellnessService } from "../services/wellnessService";
import { getApiErrorMessage } from "../utils/getApiErrorMessage";

const preferenceLabels = [
  { key: "gentleReminders", label: "Gentle reminders" },
  { key: "weeklyReflection", label: "Weekly reflection" },
  { key: "safetyCheckIn", label: "Safety check-in" }
];

export default function SettingsPage() {
  const { user } = useAuth();
  const [fullName, setFullName] = useState(user?.fullName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [preferences, setPreferences] = useState({
    gentleReminders: true,
    weeklyReflection: true,
    safetyCheckIn: true
  });
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const data = await wellnessService.getSettings();
        setFullName(data.user.fullName || "");
        setEmail(data.user.email || "");
        setPreferences((current) => ({ ...current, ...data.user.preferences }));
      } catch (apiError) {
        setError(getApiErrorMessage(apiError, "Unable to load settings."));
      }
    };

    loadSettings();
  }, []);

  const togglePreference = (key) => {
    setPreferences((current) => ({ ...current, [key]: !current[key] }));
  };

  const saveSettings = async () => {
    setIsSaving(true);
    setMessage("");
    setError("");

    try {
      const data = await wellnessService.updateSettings({ fullName, preferences });
      setFullName(data.user.fullName || "");
      setPreferences((current) => ({ ...current, ...data.user.preferences }));
      setMessage("Settings saved to your account.");
    } catch (apiError) {
      setError(getApiErrorMessage(apiError, "Unable to save settings."));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-7xl space-y-6">
        <PageHeader
          eyebrow="Settings"
          title="Tune your MindEase space"
          description="Profile and preference changes now save to MongoDB and appear in your activity history."
        />

        {error && <div className="rounded-3xl border border-red-400/40 bg-red-500/10 px-5 py-4 text-sm font-semibold text-red-500">{error}</div>}
        {message && <div className="rounded-3xl border border-emerald-400/40 bg-emerald-500/10 px-5 py-4 text-sm font-semibold text-success">{message}</div>}

        <div className="grid gap-6 lg:grid-cols-[1fr_.8fr]">
          <Card className="p-6">
            <div className="mb-6 flex items-center gap-3">
              <UserRound className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-extrabold">Profile</h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="settingsName">Full name</Label>
                <Input id="settingsName" value={fullName} onChange={(event) => setFullName(event.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="settingsEmail">Email</Label>
                <Input id="settingsEmail" value={email} disabled className="opacity-70" />
              </div>
            </div>
            <Button className="mt-6" onClick={saveSettings} disabled={isSaving}>
              {isSaving && <Loader2 className="h-4 w-4 animate-spin" />}
              Save profile
            </Button>
          </Card>

          <div className="space-y-6">
            <Card className="p-6">
              <div className="mb-5 flex items-center gap-3">
                <Palette className="h-5 w-5 text-secondary" />
                <h2 className="text-2xl font-extrabold">Appearance</h2>
              </div>
              <div className="flex items-center justify-between rounded-3xl bg-muted p-4">
                <div>
                  <p className="font-bold">Theme</p>
                  <p className="text-sm text-muted-foreground">Light and dark preferences are saved locally.</p>
                </div>
                <ThemeToggle />
              </div>
            </Card>

            <Card className="p-6">
              <div className="mb-5 flex items-center gap-3">
                <Bell className="h-5 w-5 text-accent" />
                <h2 className="text-2xl font-extrabold">Preferences</h2>
              </div>
              {preferenceLabels.map((item) => (
                <label key={item.key} className="mb-3 flex items-center justify-between rounded-3xl bg-muted p-4 font-semibold">
                  {item.label}
                  <input type="checkbox" checked={Boolean(preferences[item.key])} onChange={() => togglePreference(item.key)} className="h-5 w-5 accent-primary" />
                </label>
              ))}
              <Button variant="outline" className="mt-3 w-full" onClick={saveSettings} disabled={isSaving}>
                Save preferences
              </Button>
            </Card>

            <Card className="p-6">
              <div className="mb-4 flex items-center gap-3">
                <LockKeyhole className="h-5 w-5 text-success" />
                <h2 className="text-2xl font-extrabold">Security</h2>
              </div>
              <p className="leading-7 text-muted-foreground">Your session uses JWT authentication and protected routes. Password changes can be added as the next backend endpoint.</p>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
