import type { ProcessConfig } from './types';

export const processConfig: ProcessConfig = {
  sectionTitle: 'How we automate your business',
  highlightedText: 'in 5 CLEAR STEPS.',
  subtitle:
    'From initial diagnostic audit all the way to autonomous operation. Real production systems with zero overhead.',
  steps: [
    {
      id: 'step-1',
      stepNumber: '01',
      title: 'Analyze Business',
      description:
        'We conduct a deep operational audit across your tools, identify spreadsheet bottlenecks and manual admin friction, and map every single repetitive data touchpoint across your CRM, email, billing, and project management systems into an actionable automation architecture.',
      linkText: 'See more ↓',
      linkHref: '#',
      graphicType: 'radar',
    },
    {
      id: 'step-2',
      stepNumber: '02',
      title: 'Build Prototype',
      description:
        'Before writing production code, we build an interactive visual workflow prototype demonstrating the data logic, trigger flow, error handling paths, and fallback edge cases so your leadership team can inspect and approve the system live.',
      linkText: 'See more ↓',
      linkHref: '#',
      graphicType: 'workflow',
    },
    {
      id: 'step-3',
      stepNumber: '03',
      title: 'Build Solution',
      description:
        'Our engineers construct custom AI agents, n8n webhook pipelines, and robust Python microservices with automated testing, vector retrieval augmentation, and sub-10ms response latency to ensure enterprise-grade stability.',
      linkText: 'See more ↓',
      linkHref: '#',
      graphicType: 'code',
    },
    {
      id: 'step-4',
      stepNumber: '04',
      title: 'Implement In Your Business',
      description:
        'We deploy the automation engine seamlessly into your active tools—CRM, Slack, Stripe, databases, and staff portals—with zero downtime, strict encrypted secrets management, and automated fallback alerting feeds.',
      linkText: 'See more ↓',
      linkHref: '#',
      graphicType: 'deploy',
    },
    {
      id: 'step-5',
      stepNumber: '05',
      title: 'Save Time & Scale',
      description:
        'Your autonomous systems run 24/7 in the background, reclaiming 20–40+ hours per week for your team, eliminating manual human errors entirely, and allowing your business to scale volume without scaling headcount.',
      linkText: 'See more ↓',
      linkHref: '#',
      graphicType: 'roi',
    },
  ],
};
