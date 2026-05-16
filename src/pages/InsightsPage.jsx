import { useEffect, useMemo, useState } from "react";
import { Activity, BarChart3, Brain, CalendarDays, Download, Loader2, MessageCircle, PenLine, Sparkles, TrendingUp } from "lucide-react";
import DashboardLayout from "../layouts/DashboardLayout";
import { PageHeader } from "../components/dashboard/PageHeader";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { StatCard } from "../components/dashboard/StatCard";
import { wellnessService } from "../services/wellnessService";
import { aiService } from "../services/aiService";
import { getApiErrorMessage } from "../utils/getApiErrorMessage";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const moodScores = { Low: 30, Okay: 55, Good: 75, Great: 92 };

const formatDate = (date) =>
  new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }).format(new Date(date));

function average(values) {
  if (!values.length) return 0;
  return Math.round(values.reduce((total, value) => total + value, 0) / values.length);
}

function getSevenDayStart() {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  start.setDate(start.getDate() - 6);
  return start;
}

function buildWeeklyMood(moods) {
  const start = getSevenDayStart();

  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    const dayStart = new Date(date);
    const dayEnd = new Date(date);
    dayEnd.setHours(23, 59, 59, 999);

    const dayMoods = moods.filter((item) => {
      const createdAt = new Date(item.createdAt);
      return createdAt >= dayStart && createdAt <= dayEnd;
    });

    return {
      label: days[date.getDay()],
      score: average(dayMoods.map((item) => moodScores[item.mood] || 0)),
      count: dayMoods.length
    };
  });
}

function getFactorCounts(moods) {
  const counts = moods.reduce((result, item) => {
    item.factors?.forEach((factor) => {
      result[factor] = (result[factor] || 0) + 1;
    });
    return result;
  }, {});

  return Object.entries(counts)
    .map(([factor, count]) => ({ factor, count }))
    .sort((a, b) => b.count - a.count);
}

function getCurrentStreak(activities) {
  const activeDays = new Set(
    activities.map((item) => {
      const date = new Date(item.createdAt);
      date.setHours(0, 0, 0, 0);
      return date.toISOString();
    })
  );

  let streak = 0;
  const cursor = new Date();
  cursor.setHours(0, 0, 0, 0);

  while (activeDays.has(cursor.toISOString())) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
}

function getRecommendation({ moods, journals, aiMessages, topFactors }) {
  const latestMood = moods[0]?.mood;
  const topFactor = topFactors[0]?.factor;

  if (!moods.length && !journals.length && !aiMessages.length) {
    return "Start with one mood check-in or a short journal entry so MindEase has a signal to learn from.";
  }

  if (latestMood === "Low") {
    return "Your latest mood was low. Try a short AI Guide conversation or write one paragraph about what would make the next hour easier.";
  }

  if (topFactor === "Stress") {
    return "Stress is showing up often. Consider tracking what happens before stressful moments and ask the AI Guide for one grounding step.";
  }

  if (journals.length < moods.length / 2) {
    return "You are checking moods more often than journaling. Add a brief reflection after check-ins to make future insights richer.";
  }

  return "Your activity looks balanced. Keep using mood check-ins, journaling, and AI guidance together for stronger patterns.";
}

export default function InsightsPage() {
  const [moods, setMoods] = useState([]);
  const [journals, setJournals] = useState([]);
  const [activities, setActivities] = useState([]);
  const [aiMessages, setAiMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadInsights = async () => {
      try {
        const [moodData, journalData, activityData, aiData] = await Promise.all([
          wellnessService.listMoods(),
          wellnessService.listJournals(),
          wellnessService.listActivities(),
          aiService.getHistory()
        ]);

        setMoods(moodData.moods || []);
        setJournals(journalData.entries || []);
        setActivities(activityData.activities || []);
        setAiMessages(aiData.messages || []);
      } catch (apiError) {
        setError(getApiErrorMessage(apiError, "Unable to load insights."));
      } finally {
        setIsLoading(false);
      }
    };

    loadInsights();
  }, []);

  const weeklyMood = useMemo(() => buildWeeklyMood(moods), [moods]);
  const factorCounts = useMemo(() => getFactorCounts(moods), [moods]);
  const averageMood = useMemo(() => average(moods.map((item) => moodScores[item.mood] || 0)), [moods]);
  const streak = useMemo(() => getCurrentStreak(activities), [activities]);
  const aiUserMessages = useMemo(() => aiMessages.filter((item) => item.role === "user"), [aiMessages]);
  const journalWords = useMemo(
    () => journals.reduce((total, item) => total + item.content.split(/\s+/).filter(Boolean).length, 0),
    [journals]
  );
  const recommendation = useMemo(
    () => getRecommendation({ moods, journals, aiMessages, topFactors: factorCounts }),
    [moods, journals, aiMessages, factorCounts]
  );

  const exportInsights = () => {
    const snapshot = {
      exportedAt: new Date().toISOString(),
      summary: {
        averageMood,
        moodCheckIns: moods.length,
        journalEntries: journals.length,
        aiMessages: aiMessages.length,
        activityEvents: activities.length,
        currentStreak: streak,
        journalWords
      },
      weeklyMood,
      topFactors: factorCounts,
      recentActivities: activities.slice(0, 20)
    };

    const blob = new Blob([JSON.stringify(snapshot, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `mindease-insights-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-7xl space-y-6">
        <PageHeader
          eyebrow="Insights"
          title="Patterns without pressure"
          description="Insights now use your saved moods, journals, AI guide conversations, and activity history."
          action={
            <Button onClick={exportInsights} disabled={isLoading || (!moods.length && !journals.length && !activities.length)}>
              <Download className="h-4 w-4" />
              Export snapshot
            </Button>
          }
        />

        {error && <div className="rounded-3xl border border-red-400/40 bg-red-500/10 px-5 py-4 text-sm font-semibold text-red-500">{error}</div>}
        {isLoading && (
          <Card className="flex items-center gap-3 p-6 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span className="font-semibold">Loading your insight history...</span>
          </Card>
        )}

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard icon={TrendingUp} label="Average mood" value={moods.length ? `${averageMood}%` : "--"} detail={`${moods.length} saved mood check-ins`} />
          <StatCard icon={PenLine} label="Journal words" value={String(journalWords)} detail={`${journals.length} saved reflections`} tone="success" />
          <StatCard icon={Brain} label="AI guide" value={String(aiUserMessages.length)} detail="User prompts saved in history" tone="secondary" />
          <StatCard icon={CalendarDays} label="Current streak" value={`${streak}d`} detail={`${activities.length} total activity events`} tone="accent" />
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
          <Card className="p-6">
            <div className="mb-6 flex items-center gap-3">
              <BarChart3 className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-extrabold">Weekly emotional rhythm</h2>
            </div>
            <div className="flex h-80 items-end gap-3 rounded-3xl bg-muted/60 p-5">
              {weeklyMood.map((day) => (
                <div key={day.label} className="flex flex-1 flex-col items-center gap-3">
                  <div className="flex h-56 w-full items-end rounded-2xl bg-background p-1">
                    <div
                      className="w-full rounded-xl bg-gradient-to-t from-primary to-success transition-all"
                      style={{ height: `${day.score || 6}%`, opacity: day.count ? 1 : 0.28 }}
                      title={`${day.count} check-ins`}
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-bold text-muted-foreground">{day.label}</p>
                    <p className="mt-1 text-[11px] font-semibold text-muted-foreground">{day.count}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <div className="mb-5 flex items-center gap-3">
              <Sparkles className="h-5 w-5 text-accent" />
              <h2 className="text-2xl font-extrabold">Recommendation</h2>
            </div>
            <p className="rounded-3xl bg-gradient-to-br from-primary/12 via-secondary/12 to-success/12 p-5 font-semibold leading-8">
              {recommendation}
            </p>

            <div className="mt-6 space-y-4">
              <div className="rounded-3xl bg-muted p-4">
                <p className="font-bold">Latest mood</p>
                <p className="mt-1 text-sm text-muted-foreground">{moods[0] ? `${moods[0].mood} on ${formatDate(moods[0].createdAt)}` : "No mood check-ins yet"}</p>
              </div>
              <div className="rounded-3xl bg-muted p-4">
                <p className="font-bold">Latest journal</p>
                <p className="mt-1 text-sm text-muted-foreground">{journals[0] ? `${journals[0].title} on ${formatDate(journals[0].createdAt)}` : "No journal entries yet"}</p>
              </div>
              <div className="rounded-3xl bg-muted p-4">
                <p className="font-bold">Latest AI prompt</p>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{aiUserMessages.at(-1)?.content || "No AI prompts yet"}</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="p-6">
            <div className="mb-5 flex items-center gap-3">
              <Activity className="h-5 w-5 text-success" />
              <h2 className="text-xl font-extrabold">Mood factor correlation</h2>
            </div>
            <div className="space-y-3">
              {factorCounts.length === 0 && <p className="text-sm font-semibold text-muted-foreground">Select mood factors during check-ins to see correlations.</p>}
              {factorCounts.slice(0, 6).map((item) => (
                <div key={item.factor}>
                  <div className="mb-2 flex justify-between text-sm font-bold">
                    <span>{item.factor}</span>
                    <span className="text-muted-foreground">{item.count}</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-success" style={{ width: `${Math.max(12, (item.count / factorCounts[0].count) * 100)}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <div className="mb-5 flex items-center gap-3">
              <PenLine className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-extrabold">Journal signal</h2>
            </div>
            <div className="space-y-4">
              <div className="rounded-3xl bg-muted p-4">
                <p className="text-sm font-semibold text-muted-foreground">Average entry length</p>
                <p className="mt-2 text-3xl font-extrabold">{journals.length ? Math.round(journalWords / journals.length) : 0}</p>
              </div>
              <div className="rounded-3xl bg-muted p-4">
                <p className="text-sm font-semibold text-muted-foreground">Reflection cadence</p>
                <p className="mt-2 font-bold">{journals.length >= 3 ? "Building a strong rhythm" : "Still warming up"}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="mb-5 flex items-center gap-3">
              <MessageCircle className="h-5 w-5 text-secondary" />
              <h2 className="text-xl font-extrabold">AI guide usage</h2>
            </div>
            <div className="space-y-4">
              <div className="rounded-3xl bg-muted p-4">
                <p className="text-sm font-semibold text-muted-foreground">Saved responses</p>
                <p className="mt-2 text-3xl font-extrabold">{aiMessages.filter((item) => item.role === "assistant").length}</p>
              </div>
              <div className="rounded-3xl bg-muted p-4">
                <p className="text-sm font-semibold text-muted-foreground">Support pattern</p>
                <p className="mt-2 font-bold">{aiUserMessages.length ? "AI guidance is part of your routine" : "Try one prompt to begin"}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
