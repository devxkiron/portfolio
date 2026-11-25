import type { MetadataRoute } from 'next';
import { getSiteConfig } from '@/lib/theme-config/service';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const siteConfig = await getSiteConfig();
  const projects = siteConfig.projects || [];

  const projectEntries: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}/project/${project.id}`,
    lastModified: new Date(siteConfig.updatedAt || Date.now()),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(siteConfig.updatedAt || Date.now()),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...projectEntries,
  ];
}
