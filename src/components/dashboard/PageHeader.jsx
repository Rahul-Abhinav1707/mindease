import { motion } from "framer-motion";
import { Card } from "../ui/Card";

export function PageHeader({ eyebrow, title, description, action }) {
  return (
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28 }}>
      <Card className="relative overflow-hidden p-6 sm:p-8">
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/12 blur-2xl" />
        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
            <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">{title}</h1>
            <p className="mt-4 max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">{description}</p>
          </div>
          {action}
        </div>
      </Card>
    </motion.div>
  );
}
