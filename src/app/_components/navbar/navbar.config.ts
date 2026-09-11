export interface NavLink {
  label: string;
  href: string;
}

export interface NavbarConfig {
  brand: {
    name: string;
    href: string;
  };
  links: NavLink[];
  cta: {
    text: string;
    href: string;
  };
}

export const navbarConfig: NavbarConfig = {
  brand: {
    name: 'devxkiron',
    href: '#hero',
  },
  links: [
    { label: 'Projects', href: '#projects' },
    { label: 'Process', href: '#process' },
    { label: 'Architecture', href: '#architecture' },
    { label: 'Stories', href: '#stories' },
    { label: 'Tech Stack', href: '#tech-stack' },
  ],
  cta: {
    text: 'Get in Touch',
    href: '#contact',
  },
};
