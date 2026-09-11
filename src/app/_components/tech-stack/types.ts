export type TechCategoryId = 'all' | 'ai' | 'frontend' | 'backend' | 'devops';

export interface TechItem {
  id: string;
  name: string;
  category: TechCategoryId;
  categoryLabel: string;
  description: string;
  brandColor: string;
  row: 1 | 2;
  iconName: string;
}

export interface TechCategory {
  id: TechCategoryId;
  label: string;
}

export interface TechStackConfig {
  badgeText?: string;
  titlePrefix: string;
  titleHighlight: string;
  titleSuffix: string;
  subtitle: string;
  categories: TechCategory[];
  items: TechItem[];
}
