import { FaqItem } from "@/types";

export const faqs: FaqItem[] = [
  {
    question: "How quickly can we see the first working automation?",
    answer:
      "We deliver a fully functional, interactive proof-of-concept within 7 business days. Most full production pipelines are live, audited, and generating measurable ROI within 3 to 4 weeks.",
  },
  {
    question: "What happens if our API or underlying tool changes?",
    answer:
      "Every workflow we engineer includes automatic retry logic, schema validation, and health webhook alerts. If an external vendor updates their API, our automated telemetry flags it instantly, and our ongoing support covers rapid adapter updates.",
  },
  {
    question: "Is our company data confidential and secure with your AI?",
    answer:
      "Yes, 100%. We implement zero-data-retention enterprise API keys, encrypt all secrets at rest and in transit via KMS, and deploy vector instances inside your own dedicated cloud VPC upon request.",
  },
  {
    question: "Do you provide post-launch support & maintenance?",
    answer:
      "Absolutely. We offer dedicated monthly maintenance tiers covering proactive 24/7 uptime monitoring, token usage optimization, minor workflow updates, and security patches.",
  },
  {
    question: "Can we cancel or pause anytime?",
    answer:
      "Yes. Our retainers operate on flexible 30-day terms with zero lock-in contracts. You own 100% of the intellectual property, code repository, and deployed assets from day one.",
  },
];
