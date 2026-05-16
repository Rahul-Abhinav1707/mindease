import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { BookOpenText, Loader2, PenLine, Plus, Search } from "lucide-react";
import DashboardLayout from "../layouts/DashboardLayout";
import { PageHeader } from "../components/dashboard/PageHeader";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { fadeUp, staggerContainer } from "../animations/variants";
import { wellnessService } from "../services/wellnessService";
import { getApiErrorMessage } from "../utils/getApiErrorMessage";

const prompts = [
  "What felt lighter today?",
  "Where did I need more space?",
  "What is one kind thing I can do next?"
];

const formatDate = (date) =>
  new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }).format(new Date(date));

export default function JournalPage() {
  const [entry, setEntry] = useState("");
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadEntries = async () => {
      try {
        const data = await wellnessService.listJournals();
        setEntries(data.entries || []);
      } catch (apiError) {
        setError(getApiErrorMessage(apiError, "Unable to load journal history."));
      } finally {
        setIsLoading(false);
      }
    };

    loadEntries();
  }, []);

  const filteredEntries = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return entries;
    return entries.filter((item) => `${item.title} ${item.content}`.toLowerCase().includes(term));
  }, [entries, search]);

  const saveEntry = async () => {
    if (!entry.trim() || isSaving) return;
    setError("");
    setIsSaving(true);

    try {
      const data = await wellnessService.createJournal({
        title: title.trim() || "Untitled reflection",
        content: entry.trim()
      });
      setEntries((current) => [data.entry, ...current]);
      setEntry("");
      setTitle("");
    } catch (apiError) {
      setError(getApiErrorMessage(apiError, "Unable to save journal entry."));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-7xl space-y-6">
        <PageHeader
          eyebrow="Journal"
          title="Write without pressure"
          description="Your reflections now save to MongoDB and remain available in your journal history."
          action={<Button onClick={() => { setTitle(""); setEntry(""); }}><Plus className="h-4 w-4" /> New entry</Button>}
        />

        {error && <div className="rounded-3xl border border-red-400/40 bg-red-500/10 px-5 py-4 text-sm font-semibold text-red-500">{error}</div>}

        <motion.section variants={staggerContainer} initial="hidden" animate="show" className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
          <motion.div variants={fadeUp}>
            <Card className="p-6">
              <div className="mb-5 flex items-center gap-3">
                <PenLine className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-extrabold">Today's reflection</h2>
              </div>
              <Input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Entry title" className="mb-4" />
              <textarea
                value={entry}
                onChange={(event) => setEntry(event.target.value)}
                placeholder="Start with one honest sentence..."
                className="focus-ring min-h-72 w-full resize-none rounded-3xl border border-border bg-white/70 p-5 leading-8 outline-none transition dark:bg-white/[0.06]"
              />
              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm font-semibold text-muted-foreground">{entry.length} characters</p>
                <Button onClick={saveEntry} disabled={isSaving || !entry.trim()}>
                  {isSaving && <Loader2 className="h-4 w-4 animate-spin" />}
                  Save entry
                </Button>
              </div>
            </Card>
          </motion.div>

          <motion.div variants={fadeUp} className="space-y-6">
            <Card className="p-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input value={search} onChange={(event) => setSearch(event.target.value)} className="pl-11" placeholder="Search reflections" />
              </div>
              <div className="mt-6 space-y-3">
                {isLoading && <p className="text-sm font-semibold text-muted-foreground">Loading journal history...</p>}
                {!isLoading && filteredEntries.length === 0 && (
                  <div className="rounded-3xl bg-muted p-4">
                    <p className="font-bold">No saved entries yet</p>
                    <p className="mt-1 text-sm text-muted-foreground">Your saved reflections will appear here.</p>
                  </div>
                )}
                {filteredEntries.map((item) => (
                  <button key={item._id} onClick={() => { setTitle(item.title); setEntry(item.content); }} className="w-full rounded-3xl bg-muted p-4 text-left transition hover:bg-primary hover:text-white">
                    <p className="font-bold">{item.title}</p>
                    <p className="mt-1 line-clamp-2 text-sm opacity-75">{item.content}</p>
                    <p className="mt-3 text-xs font-bold opacity-70">{formatDate(item.createdAt)}</p>
                  </button>
                ))}
              </div>
            </Card>
            <Card className="p-6">
              <BookOpenText className="mb-5 h-6 w-6 text-secondary" />
              <h2 className="text-xl font-extrabold">Gentle prompts</h2>
              <div className="mt-4 space-y-3">
                {prompts.map((prompt) => (
                  <button key={prompt} onClick={() => setEntry((current) => `${current}${current ? "\n\n" : ""}${prompt}\n`)} className="w-full rounded-2xl bg-muted px-4 py-3 text-left text-sm font-semibold transition hover:bg-primary hover:text-white">
                    {prompt}
                  </button>
                ))}
              </div>
            </Card>
          </motion.div>
        </motion.section>
      </div>
    </DashboardLayout>
  );
}
