import { Bot, CalendarHeart, PenLine, Settings } from "lucide-react";
import { Card } from "../ui/Card";

const icons = {
  mood: CalendarHeart,
  journal: PenLine,
  ai: Bot,
  settings: Settings
};

const formatDate = (date) =>
  new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }).format(new Date(date));

export function ActivityFeed({ activities = [], isLoading = false }) {
  return (
    <Card className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">Activity</p>
          <h3 className="mt-1 text-2xl font-extrabold">Recent history</h3>
        </div>
        <span className="rounded-full bg-muted px-3 py-1 text-xs font-bold text-muted-foreground">Live</span>
      </div>
      <div className="space-y-4">
        {isLoading && <p className="text-sm font-semibold text-muted-foreground">Loading activity...</p>}
        {!isLoading && activities.length === 0 && (
          <div className="rounded-3xl bg-muted/70 p-4">
            <p className="font-semibold">No activity yet</p>
            <p className="text-sm text-muted-foreground">Saved moods, journals, and AI chats will appear here.</p>
          </div>
        )}
        {activities.slice(0, 8).map((item) => {
          const Icon = icons[item.type] || Settings;
          return (
            <div key={item._id} className="flex gap-4 rounded-3xl bg-muted/70 p-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-primary to-success text-white shadow-glow">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold">{item.title}</p>
                <p className="text-sm text-muted-foreground">{item.description}</p>
                <p className="mt-1 text-xs font-bold text-muted-foreground">{formatDate(item.createdAt)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
