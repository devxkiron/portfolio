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
import { getSiteConfig } from '@/lib/theme-config/service';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Home() {
  const siteConfig = await getSiteConfig();

  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground transition-colors duration-200">
      <Navbar brandOverride={siteConfig.brand} />
      <HeroSection brandOverride={siteConfig.brand} />
      <ProjectsSection />
      <ProcessSection />
      <ArchitectureSection />
      <ClientStoriesSection />
      <TechStackSection />
      <BookingSection />
      <FaqSection />
      <FooterSection brandOverride={siteConfig.brand} />
    </main>
  );
}


