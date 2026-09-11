export interface ProjectItem {
  id: string;
  index: string;
  title: string;
  category?: string;
  description: string;
  tags: string[];
  imageUrl: string;
  imageAlt: string;
  href?: string;
}

export interface ProjectsConfig {
  sectionTitle: string;
  subtitle?: string;
  projects: ProjectItem[];
}
