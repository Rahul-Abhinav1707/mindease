import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CalendarHeart, CloudSun, Frown, Laugh, Loader2, Meh, Smile, Sparkles } from "lucide-react";
import DashboardLayout from "../layouts/DashboardLayout";
import { PageHeader } from "../components/dashboard/PageHeader";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { fadeUp, staggerContainer } from "../animations/variants";
import { wellnessService } from "../services/wellnessService";
import { getApiErrorMessage } from "../utils/getApiErrorMessage";

const moods = [
  { label: "Great", icon: Laugh, color: "text-success", score: 92 },
  { label: "Good", icon: Smile, color: "text-primary", score: 74 },
  { label: "Okay", icon: Meh, color: "text-accent", score: 55 },
  { label: "Low", icon: Frown, color: "text-secondary", score: 34 }
];

const factors = ["Sleep", "Work", "Family", "Exercise", "Food", "Social", "Stress", "Focus"];

const formatDate = (date) =>
  new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }).format(new Date(date));

export default function MoodPage() {
  const [selectedMood, setSelectedMood] = useState("Good");
  const [selectedFactors, setSelectedFactors] = useState(["Sleep", "Focus"]);
  const [moodHistory, setMoodHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const tone = useMemo(() => moods.find((mood) => mood.label === selectedMood), [selectedMood]);
  const ToneIcon = tone?.icon || Smile;

  useEffect(() => {
    const loadMoods = async () => {
      try {
        const data = await wellnessService.listMoods();
        setMoodHistory(data.moods || []);
      } catch (apiError) {
        setError(getApiErrorMessage(apiError, "Unable to load mood history."));
      } finally {
        setIsLoading(false);
      }
    };

    loadMoods();
  }, []);

  const toggleFactor = (factor) => {
    setSelectedFactors((current) =>
      current.includes(factor) ? current.filter((item) => item !== factor) : [...current, factor]
    );
  };

  const saveCheckIn = async () => {
    setIsSaving(true);
    setError("");

    try {
      const data = await wellnessService.createMood({
        mood: selectedMood,
        factors: selectedFactors
      });
      setMoodHistory((current) => [data.mood, ...current]);
    } catch (apiError) {
      setError(getApiErrorMessage(apiError, "Unable to save mood check-in."));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-7xl space-y-6">
        <PageHeader
          eyebrow="Mood"
          title="Check in with yourself"
          description="Mood check-ins now save to MongoDB and feed the dashboard activity history."
          action={<Button onClick={saveCheckIn} disabled={isSaving}><CalendarHeart className="h-4 w-4" /> {isSaving ? "Saving..." : "Save check-in"}</Button>}
        />

        {error && <div className="rounded-3xl border border-red-400/40 bg-red-500/10 px-5 py-4 text-sm font-semibold text-red-500">{error}</div>}

        <motion.section variants={staggerContainer} initial="hidden" animate="show" className="grid gap-6 lg:grid-cols-[1fr_.8fr]">
          <motion.div variants={fadeUp}>
            <Card className="p-6">
              <h2 className="text-2xl font-extrabold">How are you feeling?</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-4">
                {moods.map((mood) => (
                  <button
                    key={mood.label}
                    onClick={() => setSelectedMood(mood.label)}
                    className={`rounded-3xl border p-5 text-left transition hover:-translate-y-1 hover:shadow-soft ${
                      selectedMood === mood.label ? "border-primary bg-primary text-white shadow-glow" : "border-border bg-muted/60"
                    }`}
                  >
                    <mood.icon className={`h-8 w-8 ${selectedMood === mood.label ? "text-white" : mood.color}`} />
                    <p className="mt-5 font-bold">{mood.label}</p>
                  </button>
                ))}
              </div>

              <h3 className="mt-8 text-lg font-bold">What influenced it?</h3>
              <div className="mt-4 flex flex-wrap gap-3">
                {factors.map((factor) => (
                  <button
                    key={factor}
                    onClick={() => toggleFactor(factor)}
                    className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                      selectedFactors.includes(factor) ? "bg-success text-white" : "bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {factor}
                  </button>
                ))}
              </div>
            </Card>
          </motion.div>

          <motion.div variants={fadeUp}>
            <Card className="h-full p-6">
              <div className="grid h-16 w-16 place-items-center rounded-3xl bg-primary/10 text-primary">
                <ToneIcon className="h-8 w-8" />
              </div>
              <h2 className="mt-6 text-3xl font-extrabold">{selectedMood} energy</h2>
              <p className="mt-3 leading-8 text-muted-foreground">
                Your current check-in highlights {selectedFactors.length || "no"} selected factor{selectedFactors.length === 1 ? "" : "s"}.
              </p>
              <div className="mt-6 rounded-3xl bg-gradient-to-br from-primary/12 via-secondary/12 to-success/12 p-5">
                <Sparkles className="mb-4 h-5 w-5 text-accent" />
                <p className="font-semibold leading-7">Saved check-ins will appear in your history and dashboard activity feed.</p>
              </div>
            </Card>
          </motion.div>
        </motion.section>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <CloudSun className="h-5 w-5 text-secondary" />
            <h2 className="text-2xl font-extrabold">Mood timeline</h2>
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-4">
            {isLoading && <p className="text-sm font-semibold text-muted-foreground"><Loader2 className="mr-2 inline h-4 w-4 animate-spin" />Loading mood history...</p>}
            {!isLoading && moodHistory.length === 0 && (
              <div className="rounded-3xl bg-muted p-4">
                <p className="font-bold">No check-ins yet</p>
                <p className="mt-1 text-sm text-muted-foreground">Save your first mood to begin the timeline.</p>
              </div>
            )}
            {moodHistory.slice(0, 8).map((item) => {
              const moodMeta = moods.find((mood) => mood.label === item.mood) || moods[1];
              return (
                <div key={item._id} className="rounded-3xl bg-muted p-4">
                  <p className="text-sm font-bold text-muted-foreground">{formatDate(item.createdAt)}</p>
                  <p className="mt-3 font-bold">{item.mood}</p>
                  <div className="mt-5 h-2 rounded-full bg-background">
                    <div className="h-2 rounded-full bg-gradient-to-r from-primary to-success" style={{ width: `${moodMeta.score}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
