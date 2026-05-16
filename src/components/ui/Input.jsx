import { forwardRef } from "react";
import { cn } from "../../utils/cn";

export const Input = forwardRef(function Input({ className, error, ...props }, ref) {
  return (
    <input
      ref={ref}
      className={cn(
        "focus-ring h-12 w-full rounded-2xl border bg-white/75 px-4 text-sm text-foreground shadow-sm outline-none transition placeholder:text-muted-foreground/70 dark:bg-white/[0.06]",
        error ? "border-red-400" : "border-border",
        className
      )}
      {...props}
    />
  );
});
