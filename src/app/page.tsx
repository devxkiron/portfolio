import { Navbar } from "@/components/sections/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { LogoMarquee } from "@/components/sections/LogoMarquee";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { WorkflowsSection } from "@/components/sections/WorkflowsSection";
import { ImpactSection } from "@/components/sections/ImpactSection";
import { TeamSection } from "@/components/sections/TeamSection";
import { ClientStoriesSection } from "@/components/sections/ClientStoriesSection";
import { ToolchainSection } from "@/components/sections/ToolchainSection";
import { BookingSection } from "@/components/sections/BookingSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] selection:bg-[var(--brand-neon)] selection:text-[var(--brand-dark)]">
      {/* 1. Header Navigation */}
      <Navbar />

      {/* 2. Hero Section */}
      <HeroSection />

      {/* 3. Partner & Integrations Marquee Ticker */}
      <LogoMarquee />

      {/* 4. How we automate your business in 5 CLEAN STEPS */}
      <ProcessSection />

      {/* 5. We Build Workflows That Multiply Your Revenue */}
      <WorkflowsSection />

      {/* 6. You stop talking about AI. We start SHIPPING IT. */}
      <ImpactSection />

      {/* 7. One team. From whiteboard to PRODUCTION */}
      <TeamSection />

      {/* 8. CLIENT STORIES (Earth Globe & Testimonials) */}
      <ClientStoriesSection />

      {/* 9. Engineered With The World's BEST TOOLCHAIN */}
      <ToolchainSection />

      {/* 10. Book a Free STRATEGY CALL (Interactive Booking Calendar) */}
      <BookingSection />

      {/* 11. Frequently Asked Questions */}
      <FaqSection />

      {/* 12. Footer */}
      <Footer />
    </main>
  );
}
