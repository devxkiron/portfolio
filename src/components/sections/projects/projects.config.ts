import type { ProjectsConfig } from './types';

export const projectsConfig: ProjectsConfig = {
  sectionTitle: 'Projects',
  subtitle: 'Selected production systems and automated digital software we have engineered.',
  projects: [
    {
      id: 'project-1',
      index: '01',
      title: 'Autopilot Workflow & Pipeline Engine',
      category: 'AI AUTOMATION',
      description:
        'Custom end-to-end automation infrastructure integrating lead capture, neural qualification, and multi-system syncing to eliminate manual data entry.',
      tags: ['Next.js 16', 'OpenAI API', 'FastAPI'],
      imageUrl:
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop',
      imageAlt: 'Analytics and automated workflow dashboard',
      href: '#',
    },
    {
      id: 'project-2',
      index: '02',
      title: 'Nexus Predictive Revenue Telemetry',
      category: 'FINTECH SAAS',
      description:
        'Real-time cash flow monitoring and automated churn mitigation platform built for high-growth recurring revenue businesses.',
      tags: ['React 19', 'TypeScript', 'Tailwind CSS'],
      imageUrl:
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop',
      imageAlt: 'Financial forecasting telemetry software',
      href: '#',
    },
    {
      id: 'project-3',
      index: '03',
      title: 'Autonomous Client Operations Concierge',
      category: 'ENTERPRISE AI',
      description:
        'Intelligent multi-agent operations layer resolving 82% of customer inquiries autonomously with real-time human escalation safeguards.',
      tags: ['Python', 'Vector DB', 'Next.js'],
      imageUrl:
        'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop',
      imageAlt: 'AI and hardware chip intelligence interface',
      href: '#',
    },
  ],
};
