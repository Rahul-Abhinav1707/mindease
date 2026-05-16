import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";

const buttonVariants = cva(
  "focus-ring inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-primary text-white shadow-glow hover:-translate-y-0.5 hover:bg-indigo-500",
        secondary: "bg-foreground text-background hover:-translate-y-0.5",
        ghost: "hover:bg-muted",
        glass: "border border-white/30 bg-white/60 text-foreground backdrop-blur-xl hover:bg-white/80 dark:border-white/10 dark:bg-white/10 dark:hover:bg-white/15",
        outline: "border border-border bg-transparent hover:bg-muted"
      },
      size: {
        sm: "h-9 px-4",
        md: "h-11 px-5",
        lg: "h-12 px-7"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md"
    }
  }
);

export function Button({ className, variant, size, asChild = false, ...props }) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}
