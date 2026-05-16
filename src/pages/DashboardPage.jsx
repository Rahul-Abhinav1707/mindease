import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Activity, CalendarDays, HeartPulse, Moon, SmilePlus } from "lucide-react";
import DashboardLayout from "../layouts/DashboardLayout";
import { pageTransition, staggerContainer, fadeUp } from "../animations/variants";
import { useAuth } from "../hooks/useAuth";
import { StatCard } from "../components/dashboard/StatCard";
import { ActivityFeed } from "../components/dashboard/ActivityFeed";
import { QuoteCard } from "../components/dashboard/QuoteCard";
import { Card } from "../components/ui/Card";
import { wellnessService } from "../services/wellnessService";
import { aiService } from "../services/aiService";

export default function DashboardPage() {
  const { user } = useAuth();
  const [activities, setActivities] = useState([]);
  const [stats, setStats] = useState({ moods: 0, journals: 0, aiMessages: 0, latestMood: "Start" });
  const [isLoadingActivity, setIsLoadingActivity] = useState(true);
  const now = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  }).format(new Date());

  const firstName = user?.fullName?.split(" ")?.[0] || "there";

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [activityData, moodData, journalData, aiData] = await Promise.all([
          wellnessService.listActivities(),
          wellnessService.listMoods(),
          wellnessService.listJournals(),
          aiService.getHistory()
        ]);

        setActivities(activityData.activities || []);
        setStats({
          moods: moodData.moods?.length || 0,
          journals: journalData.entries?.length || 0,
          aiMessages: aiData.messages?.length || 0,
          latestMood: moodData.moods?.[0]?.mood || "Start"
        });
      } catch {
        setActivities([]);
      } finally {
        setIsLoadingActivity(false);
      }
    };

    loadDashboard();
  }, []);

  return (
    <DashboardLayout>
      <motion.div {...pageTransition} className="mx-auto max-w-7xl">
        <motion.section variants={staggerContainer} initial="hidden" animate="show" className="grid gap-6 lg:grid-cols-[1.3fr_.7fr]">
          <motion.div variants={fadeUp}>
            <Card className="relative overflow-hidden p-6 sm:p-8">
              <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-primary/14 blur-2xl" />
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">{now}</p>
              <h1 className="mt-4 text-4xl font-extrabold sm:text-5xl">Good to see you, {firstName}.</h1>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
                Your wellness dashboard now reflects saved moods, journals, AI guide conversations, and activity history.
              </p>
            </Card>
          </motion.div>
          <motion.div variants={fadeUp}>
            <QuoteCard />
          </motion.div>
        </motion.section>

        <motion.section variants={staggerContainer} initial="hidden" animate="show" className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <motion.div variants={fadeUp}><StatCard icon={SmilePlus} label="Latest mood" value={stats.latestMood} detail={`${stats.moods} saved mood check-ins`} /></motion.div>
          <motion.div variants={fadeUp}><StatCard icon={HeartPulse} label="Journal entries" value={String(stats.journals)} detail="Saved reflections in your history" tone="success" /></motion.div>
          <motion.div variants={fadeUp}><StatCard icon={Moon} label="AI messages" value={String(stats.aiMessages)} detail="Stored guide conversation messages" tone="secondary" /></motion.div>
          <motion.div variants={fadeUp}><StatCard icon={Activity} label="Activity events" value={String(activities.length)} detail="Recent saved wellness actions" tone="accent" /></motion.div>
        </motion.section>

        <div className="mt-6 grid gap-6 lg:grid-cols-[.95fr_1.05fr]">
          <ActivityFeed activities={activities} isLoading={isLoadingActivity} />
          <Card className="p-6">
            <div className="mb-6 flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-secondary/12 text-secondary">
                <CalendarDays className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-secondary">Weekly rhythm</p>
                <h3 className="text-2xl font-extrabold">Saved activity rhythm</h3>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-2">
              {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
                <div key={`${day}-${index}`} className="rounded-2xl bg-muted p-3 text-center">
                  <p className="text-xs font-bold text-muted-foreground">{day}</p>
                  <div className="mx-auto mt-4 flex h-20 w-2 items-end rounded-full bg-background">
                    <div className="mt-auto rounded-full bg-gradient-to-t from-primary to-success" style={{ height: `${34 + index * 8}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
