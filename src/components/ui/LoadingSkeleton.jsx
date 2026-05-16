import { cn } from "../../utils/cn";

export function LoadingSkeleton({ className }) {
  return <div className={cn("animate-pulse rounded-2xl bg-muted", className)} />;
}
