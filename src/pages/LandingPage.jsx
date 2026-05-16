import { motion } from "framer-motion";
import { pageTransition } from "../animations/variants";
import { FloatingBlobs } from "../components/landing/FloatingBlobs";
import { Footer } from "../components/landing/Footer";
import { FeaturesSection } from "../components/landing/FeaturesSection";
import { HeroSection } from "../components/landing/HeroSection";
import { LandingNav } from "../components/landing/LandingNav";
import { TestimonialsSection } from "../components/landing/TestimonialsSection";

export default function LandingPage() {
  return (
    <motion.main {...pageTransition} className="relative min-h-screen overflow-hidden">
      <FloatingBlobs />
      <LandingNav />
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <Footer />
    </motion.main>
  );
}
