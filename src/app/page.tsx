import { Navbar } from './_components/navbar';
import { HeroSection } from './_components/hero';
import { ProjectsSection } from './_components/projects';
import { ProcessSection } from './_components/process';
import { ArchitectureSection } from './_components/architecture';
import { TechStackSection } from './_components/tech-stack';
import { ClientStoriesSection } from './_components/client-stories';
import { BookingSection } from './_components/booking';
import { FaqSection } from './_components/faq';
import { FooterSection } from './_components/footer';

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground transition-colors duration-200">
      <Navbar />
      <HeroSection />
      <ProjectsSection />
      <ProcessSection />
      <ArchitectureSection />
      <ClientStoriesSection />
      <TechStackSection />
      <BookingSection />
      <FaqSection />
      <FooterSection />
    </main>
  );
}

