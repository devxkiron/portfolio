import { HeroSection } from './_components/hero';
import { ProjectsSection } from './_components/projects';

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-black">
      <HeroSection />
      <ProjectsSection />
    </main>
  );
}
