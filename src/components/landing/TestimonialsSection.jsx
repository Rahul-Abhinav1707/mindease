import { motion } from "framer-motion";
import { Card } from "../ui/Card";

const testimonials = [
  { name: "Avery Chen", role: "Founder, WellWork", quote: "MindEase has the rare SaaS feeling: quiet, beautiful, and immediately trustworthy." },
  { name: "Mira Patel", role: "Product Lead", quote: "The dashboard foundation feels intentionally designed, not assembled from generic cards." },
  { name: "Jon Bell", role: "Therapy Ops", quote: "It has the softness of a wellness brand with the discipline of a serious product." }
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="px-4 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-secondary">Signal</p>
            <h2 className="mt-3 text-4xl font-extrabold sm:text-5xl">Designed for people who notice product quality.</h2>
          </div>
          <p className="text-lg leading-8 text-muted-foreground">
            The current scope is intentionally focused: authentication, navigation, theming, and dashboard placeholders that leave room for the real wellness modules later.
          </p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.div key={item.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }}>
              <Card className="h-full p-6">
                <p className="text-lg leading-8">"{item.quote}"</p>
                <div className="mt-8">
                  <p className="font-bold">{item.name}</p>
                  <p className="text-sm text-muted-foreground">{item.role}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
