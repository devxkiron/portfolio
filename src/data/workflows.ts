import { WorkflowTab, WorkflowFeature } from "@/types";

export const workflowTabs: WorkflowTab[] = [
  {
    id: "lead-gen",
    label: "Lead Generation & CRM",
    description: "Automated qualification, multi-channel enrichment, and calendar sync.",
    badge: "Most Popular",
  },
  {
    id: "support-ai",
    label: "Customer Support AI",
    description: "Multi-modal triage agent answering tickets with vector-embedded knowledge.",
    badge: "High Impact",
  },
  {
    id: "ops-invoicing",
    label: "Automated Invoicing & Ops",
    description: "OCR document ingestion, contract verification, and accounting reconciliation.",
    badge: "Operations",
  },
];

export const workflowFeatures: WorkflowFeature[] = [
  {
    title: "Instant Lead Capture",
    description: "Ingests form fills, emails, and webhooks in real-time without latency.",
    iconName: "Zap",
  },
  {
    title: "Intelligent Routing",
    description: "LLM-driven scoring routes high-intent deals directly to senior account reps.",
    iconName: "GitFork",
  },
  {
    title: "Real-Time Enrichment",
    description: "Enriches company size, tech stack, and decision maker profiles instantly.",
    iconName: "Database",
  },
  {
    title: "Automated Follow-ups",
    description: "Executes hyper-personalized email & Slack alerts with contextual context.",
    iconName: "Send",
  },
];
