import { HeroSection } from '@/components/sections/hero';
import { ProjectsSection } from '@/components/sections/projects';

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-black">
      <HeroSection />
      <ProjectsSection />
    </main>
  );
}
