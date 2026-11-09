import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getSiteConfig } from '@/lib/theme-config/service';
import { ProjectDetailClient } from './project-detail-client';
import { Navbar } from '@/app/_components/navbar';
import { FooterSection } from '@/app/_components/footer';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const siteConfig = await getSiteConfig();
  const projects = siteConfig.projects || [];
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return { title: 'Project Not Found' };
  }

  return {
    title: `${project.title} | ${siteConfig.brand?.name || 'Portfolio'}`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { id } = await params;
  const siteConfig = await getSiteConfig();
  const projects = siteConfig.projects || [];

  const projectIndex = projects.findIndex((p) => p.id === id);

  if (projectIndex === -1) {
    notFound();
  }

  const project = projects[projectIndex];

  // Get prev/next for navigation
  const prevProject =
    projectIndex > 0
      ? { id: projects[projectIndex - 1].id, title: projects[projectIndex - 1].title }
      : null;
  const nextProject =
    projectIndex < projects.length - 1
      ? { id: projects[projectIndex + 1].id, title: projects[projectIndex + 1].title }
      : null;

  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground transition-colors duration-200">
      <Navbar
        brandOverride={siteConfig.brand}
        navbarStyle={siteConfig.navbarStyle || siteConfig.layout?.navbarStyle}
      />
      <ProjectDetailClient
        project={project}
        prevProject={prevProject}
        nextProject={nextProject}
        brandOverride={siteConfig.brand}
      />
      <FooterSection brandOverride={siteConfig.brand} />
    </main>
  );
}
