import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { fadeUp, staggerContainer } from "../../animations/variants";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-wellness-radial px-4 pt-32">
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(99,102,241,.07),rgba(167,139,250,.05),rgba(16,185,129,.06))]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 pb-20 pt-10 lg:grid-cols-[1.02fr_.98fr]">
        <motion.div variants={staggerContainer} initial="hidden" animate="show" className="max-w-3xl">
          <motion.div variants={fadeUp} className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/70 px-4 py-2 text-sm font-semibold text-muted-foreground shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/10">
            <Sparkles className="h-4 w-4 text-accent" />
            AI powered mental wellness, built with calm precision
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-5xl font-extrabold leading-[1.02] sm:text-6xl lg:text-7xl">
            Your private space for a calmer, clearer mind.
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            MindEase combines thoughtful design, secure authentication, and a polished dashboard foundation for future wellness intelligence.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link to="/register">
                Create your sanctuary
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="glass" size="lg">
              <Link to="/login">Open dashboard</Link>
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative"
        >
          <Card className="relative overflow-hidden p-5">
            <div className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
            <div className="rounded-[1.35rem] bg-midnight p-5 text-white shadow-2xl">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/55">Today</p>
                  <h3 className="text-2xl font-bold">Gentle check-in</h3>
                </div>
                <span className="rounded-full bg-success/15 px-3 py-1 text-sm font-semibold text-emerald-200">Balanced</span>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {["Mood clarity", "Sleep rhythm", "Mindful minutes", "Weekly streak"].map((item, index) => (
                  <div
                    key={item}
                    className="rounded-3xl border border-white/10 bg-white/[0.08] p-4"
                  >
                    <p className="text-sm text-white/55">{item}</p>
                    <div className="mt-5 h-2 rounded-full bg-white/10">
                      <div className="h-2 rounded-full bg-gradient-to-r from-primary to-success" style={{ width: `${64 + index * 7}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-3xl border border-white/10 bg-gradient-to-r from-primary/25 to-secondary/25 p-5">
                <ShieldCheck className="mb-3 h-6 w-6 text-accent" />
                <p className="text-lg font-semibold">A secure dashboard foundation ready for future wellness modules.</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
