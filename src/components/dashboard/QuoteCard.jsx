import { Sparkles } from "lucide-react";
import { Card } from "../ui/Card";

export function QuoteCard() {
  return (
    <Card className="relative overflow-hidden p-6">
      <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-accent/14 blur-2xl" />
      <Sparkles className="mb-6 h-6 w-6 text-accent" />
      <p className="text-2xl font-bold leading-snug">"Small pauses can become the architecture of a steadier day."</p>
      <p className="mt-5 text-sm font-semibold text-muted-foreground">MindEase daily note</p>
    </Card>
  );
}
