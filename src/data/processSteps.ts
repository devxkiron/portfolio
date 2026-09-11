import { ProcessStep } from "@/types";

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Analyze Business",
    description:
      "We conduct a deep operational audit across your tools, identify spreadsheet bottlenecks and manual admin friction, and map automated pathways.",
    ctaText: "See more",
    ctaHref: "#process",
    graphicType: "audit",
  },
  {
    number: "02",
    title: "Build Prototype",
    description:
      "Before writing production code, we build an interactive visual workflow prototype demonstrating the data logic, trigger flow, and schema validations.",
    ctaText: "See more",
    ctaHref: "#process",
    graphicType: "prototype",
  },
  {
    number: "03",
    title: "Build Solution",
    description:
      "Our engineers construct custom AI agents, n8n webhook pipelines, and robust Python microservices with automated self-healing triggers.",
    ctaText: "See more",
    ctaHref: "#process",
    graphicType: "code",
  },
  {
    number: "04",
    title: "Implement In Your Business",
    description:
      "We deploy the automation engine seamlessly into your active tools—CRM, Slack, Stripe, databases, and staff portals—with zero disruption.",
    ctaText: "See more",
    ctaHref: "#process",
    graphicType: "integration",
  },
  {
    number: "05",
    title: "Save Time & Scale",
    description:
      "Your autonomous systems run 24/7 in the background, reclaiming 20-40+ hours per week for your team, eliminating error-prone manual busywork.",
    ctaText: "See more",
    ctaHref: "#process",
    graphicType: "metrics",
  },
];
