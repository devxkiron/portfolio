import { FaqConfig } from './types';

export const faqConfig: FaqConfig = {
  sectionId: 'faq',
  titleLines: ['Frequently', 'Asked', 'Questions'],
  contactPrompt: 'Have a question not listed here? Drop us a line directly at',
  contactEmail: 'hello@goodspeed.studio',
  defaultOpenId: 'faq-1',
  items: [
    {
      id: 'faq-1',
      question: 'What makes Goodspeed different from other agencies?',
      answer:
        "We don't just write code or make slide decks. We learn your domain first, then build the AI product around what you know. Most agencies build what you spec. We help you figure out what to build, and ship it in weeks.",
    },
    {
      id: 'faq-2',
      question: 'How long does it take to launch?',
      answer:
        'Most MVP projects go from kickoff to live production in 2 to 4 weeks. Full enterprise deployments, custom fine-tuned workflows, and multi-agent systems typically roll out within 6 to 8 weeks with continuous testing and telemetry.',
    },
    {
      id: 'faq-3',
      question: "I've already built something. Can you improve or rebuild it?",
      answer:
        'Yes. A significant portion of our work involves refactoring existing prototypes, optimizing latency and token costs, stabilizing unreliable agentic prompts, and hardening codebases for enterprise scale.',
    },
    {
      id: 'faq-4',
      question: 'Do you offer post-launch support?',
      answer:
        'Absolutely. We offer flexible ongoing retainer partnerships for continuous model fine-tuning, telemetry monitoring, feature expansions, and guaranteed SLA support.',
    },
    {
      id: 'faq-5',
      question: 'Do we own 100% of the code & IP?',
      answer:
        'Yes, 100%. Everything we design, architect, and code is transferred entirely to your organization upon delivery with zero vendor lock-in or proprietary licensing traps.',
    },
  ],
};
