export interface FooterLink {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface FooterContact {
  email: string;
  location: string;
  availabilityStatus: string;
}

export interface FooterConfig {
  brandName: string;
  brandTagline: string;
  ctaText: string;
  ctaHref: string;
  columns: FooterColumn[];
  contact: FooterContact;
  copyrightText: string;
  legalLinks: FooterLink[];
}
