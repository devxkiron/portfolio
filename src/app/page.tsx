import { HeroSection } from './_components/hero';
import { ProjectsSection } from './_components/projects';
import { ProcessSection } from './_components/process';
import { ArchitectureSection } from './_components/architecture';

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-black">
      <HeroSection />
      <ProjectsSection />
      <ProcessSection />
      <ArchitectureSection />
    </main>
  );
}
