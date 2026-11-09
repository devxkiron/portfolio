export interface ProjectDetailDesign {
  backgroundColor?: string;
  backgroundPattern?: 'dots' | 'grid' | 'waves' | 'circuit' | 'topography' | 'noise' | 'none';
  primaryColor?: string;
  textColor?: string;
  accentColor?: string;
  headingFont?: string;
  bodyFont?: string;
  animation?: 'fade-up' | 'slide-in' | 'scale-up' | 'stagger' | 'none';
}

export interface ProjectDetails {
  content: string; // TipTap HTML string
  design: ProjectDetailDesign;
}

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
  details?: ProjectDetails;
}

export interface ProjectsConfig {
  sectionTitle: string;
  subtitle?: string;
  projects: ProjectItem[];
}
