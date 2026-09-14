import { FooterConfig } from './types';

export const footerConfig: FooterConfig = {
  brandName: 'Goodspeed',
  brandTagline: 'AI development agency. We turn AI from talked about to rolled out.',
  ctaText: 'Book a Strategy Call',
  ctaHref: '#booking',
  columns: [
    {
      title: 'SERVICES',
      links: [
        { label: 'AI Agents & Copilots', href: '#projects' },
        { label: 'Workflow Automation', href: '#projects' },
        { label: 'SaaS Development', href: '#projects' },
        { label: 'Internal Dashboards', href: '#projects' },
        { label: '2-Week Discovery', href: '#process' },
      ],
    },
    {
      title: 'CASE STUDIES',
      links: [
        { label: 'FlyWise Aviation', href: '#projects' },
        { label: 'MyAskAI Copilot', href: '#projects' },
        { label: 'Apex Capital Sync', href: '#projects' },
        { label: 'SizzleKick Creative', href: '#projects' },
        { label: 'LexiGuard Legal', href: '#projects' },
      ],
    },
    {
      title: 'COMPANY',
      links: [
        { label: 'How We Ship', href: '#process' },
        { label: 'Client Stories', href: '#stories' },
        { label: 'FAQ', href: '#faq' },
        { label: 'Book a Call', href: '#booking' },
      ],
    },
    {
      title: 'RESOURCES',
      links: [
        { label: 'AI Architecture Guide', href: '#architecture' },
        { label: 'Discovery Sprint Playbook', href: '#process' },
        { label: 'Next.js 16 App Router', href: '#tech-stack' },
        { label: 'n8n Automation Mesh', href: '#tech-stack' },
      ],
    },
  ],
  contact: {
    email: 'hello@goodspeed.studio',
    location: 'London, United Kingdom',
    availabilityStatus: 'Available for Q3 Projects',
  },
  copyrightText: '© 2026 Goodspeed Studio Ltd. All rights reserved.',
  legalLinks: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Security', href: '#' },
  ],
};
