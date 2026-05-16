import { motion } from "framer-motion";
import { Card } from "../ui/Card";

export function StatCard({ icon: Icon, label, value, detail, tone = "primary" }) {
  const tones = {
    primary: "from-primary/18 to-primary/5 text-primary",
    secondary: "from-secondary/18 to-secondary/5 text-secondary",
    success: "from-success/18 to-success/5 text-success",
    accent: "from-accent/22 to-accent/5 text-accent"
  };

  return (
    <motion.div whileHover={{ y: -6, scale: 1.015 }}>
      <Card className="p-5">
        <div className={`mb-6 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${tones[tone]}`}>
          <Icon className="h-5 w-5" />
        </div>
        <p className="text-sm font-semibold text-muted-foreground">{label}</p>
        <h3 className="mt-2 text-3xl font-extrabold">{value}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{detail}</p>
      </Card>
    </motion.div>
  );
}
