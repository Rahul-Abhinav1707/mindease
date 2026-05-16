import { cn } from "../../utils/cn";

export function Card({ className, children }) {
  return <div className={cn("glass-panel rounded-[1.75rem]", className)}>{children}</div>;
}
