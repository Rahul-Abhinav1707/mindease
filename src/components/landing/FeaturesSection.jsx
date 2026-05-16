import { motion } from "framer-motion";
import { LockKeyhole, Palette, PanelsTopLeft, Route, Sparkles, Smartphone } from "lucide-react";
import { fadeUp, staggerContainer } from "../../animations/variants";
import { Card } from "../ui/Card";

const features = [
  { icon: LockKeyhole, title: "Secure by default", text: "JWT sessions, protected routes, hashed passwords, and clear API boundaries." },
  { icon: PanelsTopLeft, title: "Dashboard ready", text: "A premium shell prepared for future wellness modules without shipping fake analytics." },
  { icon: Palette, title: "Calming theme system", text: "Persistent dark and light modes with smooth transitions and wellness-first colors." },
  { icon: Route, title: "Scalable routing", text: "Clean React Router architecture with reusable layouts and auth-aware navigation." },
  { icon: Smartphone, title: "Mobile first", text: "Bottom navigation, responsive drawer patterns, and polished tablet layouts." },
  { icon: Sparkles, title: "Motion language", text: "Framer Motion transitions, staggered reveals, and gentle floating UI details." }
];

export function FeaturesSection() {
  return (
    <section id="features" className="px-4 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary">Foundation</p>
          <h2 className="mt-3 text-4xl font-extrabold sm:text-5xl">A wellness platform base that already feels alive.</h2>
        </div>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <motion.div key={feature.title} variants={fadeUp} whileHover={{ y: -8, scale: 1.015 }}>
              <Card className="h-full p-6">
                <div className="mb-6 grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="mt-3 leading-7 text-muted-foreground">{feature.text}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
