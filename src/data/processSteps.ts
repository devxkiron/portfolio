import { ProcessStep } from "@/types";

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Analyze Your Business",
    description:
      "We dissect your existing manual processes, map data flows, and identify high-leverage bottlenecks ripe for automated agent execution.",
    ctaText: "Read more",
    ctaHref: "#process",
    graphicType: "audit",
    metrics: [
      { label: "Target Automation Rate", value: "92%" },
      { label: "Audit Bottlenecks Found", value: "14 Solved" },
    ],
  },
  {
    number: "02",
    title: "Build Prototype",
    description:
      "A working interactive proof-of-concept in under 7 days so you see immediate value and validate the flow before we commit to full production code.",
    ctaText: "Read more",
    ctaHref: "#process",
    graphicType: "prototype",
    metrics: [
      { label: "Delivery Time", value: "< 7 Days" },
      { label: "Feedback Iteration", value: "Real-time" },
    ],
  },
  {
    number: "03",
    title: "Build Solution",
    description:
      "Production-grade engineering using robust modern stacks, secure webhook connections, custom LLM agents, and fault-tolerant queue handlers.",
    ctaText: "Read more",
    ctaHref: "#process",
    graphicType: "code",
    metrics: [
      { label: "Code Coverage", value: "99.8%" },
      { label: "API Latency", value: "< 120ms" },
    ],
  },
  {
    number: "04",
    title: "Implement in Your Business",
    description:
      "Seamless roll-out with zero downtime. We train your staff, connect internal databases, and wire the automated pipelines directly into your daily stack.",
    ctaText: "Read more",
    ctaHref: "#process",
    graphicType: "integration",
    metrics: [
      { label: "Deployment Downtime", value: "0 ms" },
      { label: "Staff Onboarding", value: "1 Session" },
    ],
  },
  {
    number: "05",
    title: "Save Time & Scale",
    description:
      "Watch operational hours drop while client throughput multiplies. Continuous monitoring, alert telemetry, and periodic optimization are included.",
    ctaText: "Read more",
    ctaHref: "#process",
    graphicType: "metrics",
    metrics: [
      { label: "Hours Saved / Mo", value: "+384 hrs" },
      { label: "Net Client ROI", value: "+$48.5K" },
    ],
  },
];
