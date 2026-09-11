import React from 'react';
import type { Edge } from '@xyflow/react';
import type { ArchitectureConfig, ArchitectureNode } from './types';

// Soft, eye-friendly connection style with smooth hardware-accelerated flow (non-glaring)
const defaultEdgeStyle = {
  stroke: 'rgba(174, 255, 0, 0.40)',
  strokeWidth: 1.5,
};

// =========================================================================
// 1. FESTIVAL DATABASE & AI AGENT (Enterprise Multi-Source Automation)
// =========================================================================
const festivalNodes: ArchitectureNode[] = [
  // Triggers
  {
    id: 'f-trigger',
    type: 'architectureNode',
    position: { x: 30, y: 90 },
    data: {
      title: "When clicking 'Execute workflow'",
      subtitle: 'manual / scheduled trigger',
      nodeType: 'trigger',
      tag: 'Workflow Trigger',
      details:
        'Initiates pipeline execution across active listeners, validating credentials and passing normalized input parameters.',
    },
  },
  {
    id: 'f-webhook',
    type: 'architectureNode',
    position: { x: 30, y: 215 },
    data: {
      title: 'Inbound Webhook API',
      subtitle: 'POST: /v1/ingest/festival',
      nodeType: 'webhook',
      tag: 'Webhook Ingest',
      details:
        'Listens for external payload events from ticket portals and festival booking engines with HMAC-SHA256 signature verification.',
    },
  },
  // Ingest Sources
  {
    id: 'f-notion',
    type: 'architectureNode',
    position: { x: 230, y: 30 },
    data: {
      title: 'Get Improvbites Festival DB',
      subtitle: 'getAll: databasePage',
      nodeType: 'notion',
      tag: 'Notion Database API',
      details:
        'Queries the Notion enterprise database to fetch updated festival records, workshop schedules, and performer line-ups.',
    },
  },
  {
    id: 'f-sheets',
    type: 'architectureNode',
    position: { x: 230, y: 135 },
    data: {
      title: 'Get Global Improv Festival Google Sheet',
      subtitle: 'read: sheetRange',
      nodeType: 'sheets',
      tag: 'Google Sheets API',
      details:
        'Reads live spreadsheet rows, attendee capacities, ticket allotments, and venue allocations with automated range parsing.',
    },
  },
  {
    id: 'f-postgres',
    type: 'architectureNode',
    position: { x: 230, y: 240 },
    data: {
      title: 'PostgreSQL Audit Ledger',
      subtitle: 'SELECT * FROM festival_tickets',
      nodeType: 'postgres',
      tag: 'PostgreSQL DB',
      details:
        'Queries the high-throughput production PostgreSQL database to verify real-time seat inventory and transaction states.',
    },
  },
  // Data ETL & Normalization
  {
    id: 'f-python',
    type: 'architectureNode',
    position: { x: 440, y: 75 },
    data: {
      title: 'Python Schema Normalizer',
      subtitle: 'clean_and_dedup()',
      nodeType: 'python',
      tag: 'Python Microservice',
      details:
        'Executes custom Python normalization routines, removing duplicate submissions, resolving attendee conflicts, and formatting dates.',
    },
  },
  {
    id: 'f-streamline',
    type: 'architectureNode',
    position: { x: 440, y: 195 },
    data: {
      title: 'Streamline Transformer',
      subtitle: 'schema: normalized_json',
      nodeType: 'edit',
      tag: 'Data Transformer',
      details:
        'Maps diverse multi-source records into a unified JSON schema for seamless vector indexing and LLM prompt ingestion.',
    },
  },
  // Validation Gateway
  {
    id: 'f-filter',
    type: 'architectureNode',
    position: { x: 640, y: 135 },
    data: {
      title: 'Validation Filter Gateway',
      subtitle: 'condition: score >= 80',
      nodeType: 'filter',
      tag: 'Rule Gateway',
      details:
        'Evaluates multi-condition business rules (score >= 80 & verified === true) to discard invalid or incomplete attendee submissions.',
    },
  },
  // Vector Memory (RAG)
  {
    id: 'f-pinecone',
    type: 'architectureNode',
    position: { x: 640, y: 245 },
    data: {
      title: 'Pinecone Vector Store',
      subtitle: 'namespace="festival_kb"',
      nodeType: 'pinecone',
      tag: 'Vector DB RAG',
      details:
        'Performs sub-15ms semantic similarity retrieval across 50,000+ festival documents, past performer notes, and venue logistics.',
    },
  },
  // AI Agent Core
  {
    id: 'f-agent',
    type: 'architectureNode',
    position: { x: 840, y: 110 },
    data: {
      title: 'AI Orchestration Agent',
      nodeType: 'ai-agent',
      tag: 'Autonomous Core',
      details:
        'Autonomous reasoning agent equipped with system prompt guardrails, dynamic function calls, and Pinecone vector context retrieval.',
    },
  },
  {
    id: 'f-openrouter',
    type: 'architectureNode',
    position: { x: 865, y: 235 },
    data: {
      title: 'OpenRouter Model Router',
      subtitle: 'deepseek-r1 / gpt-4o',
      nodeType: 'router',
      tag: 'Inference Gateway',
      details:
        'Multi-model LLM router dynamically dispatching reasoning tasks to DeepSeek R1 and OpenAI GPT-4o with sub-second failovers.',
    },
  },
  // Downstream Actions
  {
    id: 'f-slack',
    type: 'architectureNode',
    position: { x: 1090, y: 30 },
    data: {
      title: 'Slack Ops Alert',
      subtitle: 'POST: #festival-ops',
      nodeType: 'slack',
      tag: 'Team Communication',
      details:
        'Dispatches rich interactive notification cards to Slack channels with one-click approval buttons for organizers.',
    },
  },
  {
    id: 'f-hubspot',
    type: 'architectureNode',
    position: { x: 1090, y: 135 },
    data: {
      title: 'HubSpot Attendee CRM',
      subtitle: 'update: contact_record',
      nodeType: 'crm',
      tag: 'CRM Synchronization',
      details:
        'Synchronizes attendee preferences, VIP ticket statuses, and workshop attendance histories directly into HubSpot CRM.',
    },
  },
  {
    id: 'f-stripe',
    type: 'architectureNode',
    position: { x: 1090, y: 240 },
    data: {
      title: 'Stripe Payout & Invoice',
      subtitle: 'create: payment_intent',
      nodeType: 'stripe',
      tag: 'Payment Processor',
      details:
        'Automatically generates encrypted checkout sessions, processes performer stipends, and reconciles ticket revenue.',
    },
  },
];

const festivalEdges: Edge[] = [
  // Triggers to Ingest Sources
  {
    id: 'fe-1',
    source: 'f-trigger',
    target: 'f-notion',
    className: 'smooth-flow-edge',
    style: defaultEdgeStyle,
  },
  {
    id: 'fe-2',
    source: 'f-trigger',
    target: 'f-sheets',
    className: 'smooth-flow-edge',
    style: defaultEdgeStyle,
  },
  {
    id: 'fe-3',
    source: 'f-webhook',
    target: 'f-postgres',
    className: 'smooth-flow-edge',
    style: defaultEdgeStyle,
  },
  {
    id: 'fe-4',
    source: 'f-webhook',
    target: 'f-sheets',
    className: 'smooth-flow-edge',
    style: defaultEdgeStyle,
  },
  // Ingest to ETL
  {
    id: 'fe-5',
    source: 'f-notion',
    target: 'f-python',
    className: 'smooth-flow-edge',
    style: defaultEdgeStyle,
  },
  {
    id: 'fe-6',
    source: 'f-sheets',
    target: 'f-python',
    className: 'smooth-flow-edge',
    style: defaultEdgeStyle,
  },
  {
    id: 'fe-7',
    source: 'f-postgres',
    target: 'f-streamline',
    className: 'smooth-flow-edge',
    style: defaultEdgeStyle,
  },
  // ETL to Filter
  {
    id: 'fe-8',
    source: 'f-python',
    target: 'f-filter',
    className: 'smooth-flow-edge',
    style: defaultEdgeStyle,
  },
  {
    id: 'fe-9',
    source: 'f-streamline',
    target: 'f-filter',
    className: 'smooth-flow-edge',
    style: defaultEdgeStyle,
  },
  // Filter to AI Agent
  {
    id: 'fe-10',
    source: 'f-filter',
    target: 'f-agent',
    className: 'smooth-flow-edge',
    label: (
      <span className="rounded-full border border-[#aeff00]/25 bg-[#0a120c] px-2 py-0.5 font-mono text-[9px] font-semibold text-[#aeff00]/90 shadow-sm">
        -- Kept --
      </span>
    ),
    style: defaultEdgeStyle,
  },
  // Pinecone to Agent Memory
  {
    id: 'fe-11',
    source: 'f-pinecone',
    target: 'f-agent',
    className: 'smooth-flow-edge',
    label: (
      <span className="rounded-full border border-emerald-500/25 bg-[#0a120c] px-2 py-0.5 font-mono text-[9px] font-semibold text-emerald-400/90">
        RAG Context
      </span>
    ),
    style: defaultEdgeStyle,
  },
  // Agent to OpenRouter
  {
    id: 'fe-12',
    source: 'f-agent',
    sourceHandle: 'chat-model-handle',
    target: 'f-openrouter',
    className: 'smooth-flow-edge',
    style: defaultEdgeStyle,
  },
  // Agent to Actions
  {
    id: 'fe-13',
    source: 'f-agent',
    target: 'f-slack',
    className: 'smooth-flow-edge',
    style: defaultEdgeStyle,
  },
  {
    id: 'fe-14',
    source: 'f-agent',
    target: 'f-hubspot',
    className: 'smooth-flow-edge',
    style: defaultEdgeStyle,
  },
  {
    id: 'fe-15',
    source: 'f-agent',
    target: 'f-stripe',
    className: 'smooth-flow-edge',
    style: defaultEdgeStyle,
  },
];

// =========================================================================
// 2. LEAD-TO-REVENUE PIPELINE (Complex High-Velocity B2B Architecture)
// =========================================================================
const leadPipelineNodes: ArchitectureNode[] = [
  {
    id: 'l-trigger',
    type: 'architectureNode',
    position: { x: 30, y: 135 },
    data: {
      title: 'Inbound Webhook API',
      subtitle: 'POST: /v1/leads/new',
      nodeType: 'webhook',
      tag: 'Webhook Listener',
      details:
        'Captures lead form submissions from marketing websites, LinkedIn lead ads, and demo request forms instantly.',
    },
  },
  {
    id: 'l-enrich',
    type: 'architectureNode',
    position: { x: 240, y: 55 },
    data: {
      title: 'Apollo & Clearbit API',
      subtitle: 'enrich: company_dossier',
      nodeType: 'apollo',
      tag: 'B2B Enrichment',
      details:
        'Enriches raw lead email domains with employee count, annual ARR, funding rounds, and verified decision-maker titles.',
    },
  },
  {
    id: 'l-postgres',
    type: 'architectureNode',
    position: { x: 240, y: 215 },
    data: {
      title: 'PostgreSQL Account Ledger',
      subtitle: 'SELECT * FROM enterprise_accounts',
      nodeType: 'postgres',
      tag: 'Database Verification',
      details:
        'Checks internal database to ensure the lead is not an existing active customer or assigned to an account executive.',
    },
  },
  {
    id: 'l-python',
    type: 'architectureNode',
    position: { x: 450, y: 135 },
    data: {
      title: 'Python Intent Scoring',
      subtitle: 'compute_lead_score()',
      nodeType: 'python',
      tag: 'Python Microservice',
      details:
        'Runs machine learning scoring algorithms on company size, job title, and web activity to compute an intent rating from 0 to 100.',
    },
  },
  {
    id: 'l-filter',
    type: 'architectureNode',
    position: { x: 650, y: 135 },
    data: {
      title: 'High-Intent Filter Gateway',
      subtitle: 'score >= 85 & ARR > $1M',
      nodeType: 'filter',
      tag: 'Revenue Gateway',
      details:
        'Routes leads scoring 85+ directly to autonomous dispatch, while routing lower scores to automated nurture sequences.',
    },
  },
  {
    id: 'l-pinecone',
    type: 'architectureNode',
    position: { x: 650, y: 245 },
    data: {
      title: 'Pinecone Vector Memory',
      subtitle: 'case_studies_embeddings',
      nodeType: 'pinecone',
      tag: 'RAG Retrieval',
      details:
        'Retrieves relevant client case studies and ROI metrics matched to the lead’s specific industry and tech stack.',
    },
  },
  {
    id: 'l-agent',
    type: 'architectureNode',
    position: { x: 860, y: 110 },
    data: {
      title: 'Autonomous Sales Agent',
      nodeType: 'ai-agent',
      tag: 'Revenue Dispatcher',
      details:
        'Crafts tailored executive briefing memos, drafts personalized outreach emails, and generates live meeting booking links.',
    },
  },
  {
    id: 'l-router',
    type: 'architectureNode',
    position: { x: 890, y: 235 },
    data: {
      title: 'Claude 3.5 & GPT-4o Gateway',
      subtitle: 'fast-classifier / reasoning',
      nodeType: 'router',
      tag: 'LLM Gateway',
      details:
        'Combines Claude 3.5 Sonnet for natural communication and GPT-4o for structured JSON validation and CRM parameter output.',
    },
  },
  {
    id: 'l-slack',
    type: 'architectureNode',
    position: { x: 1100, y: 30 },
    data: {
      title: 'Slack Urgent Deal Room',
      subtitle: 'POST: #enterprise-deals',
      nodeType: 'slack',
      tag: 'Real-time Alert',
      details:
        'Notifies sales directors immediately with the enriched dossier, company metrics, and one-click phone call action buttons.',
    },
  },
  {
    id: 'l-hubspot',
    type: 'architectureNode',
    position: { x: 1100, y: 135 },
    data: {
      title: 'HubSpot Deal Pipeline',
      subtitle: 'stage: qualified_lead',
      nodeType: 'crm',
      tag: 'Pipeline Update',
      details:
        'Creates an enterprise deal object in HubSpot, assigning the prospect to the appropriate territory representative.',
    },
  },
  {
    id: 'l-sheets',
    type: 'architectureNode',
    position: { x: 1100, y: 240 },
    data: {
      title: 'Google Sheets Master Tracker',
      subtitle: 'append: conversion_row',
      nodeType: 'sheets',
      tag: 'Executive Reporting',
      details:
        'Appends marketing attribution data and conversion timestamps to executive revenue spreadsheets for weekly syncs.',
    },
  },
];

const leadPipelineEdges: Edge[] = [
  {
    id: 'le-1',
    source: 'l-trigger',
    target: 'l-enrich',
    className: 'smooth-flow-edge',
    style: defaultEdgeStyle,
  },
  {
    id: 'le-2',
    source: 'l-trigger',
    target: 'l-postgres',
    className: 'smooth-flow-edge',
    style: defaultEdgeStyle,
  },
  {
    id: 'le-3',
    source: 'l-enrich',
    target: 'l-python',
    className: 'smooth-flow-edge',
    style: defaultEdgeStyle,
  },
  {
    id: 'le-4',
    source: 'l-postgres',
    target: 'l-python',
    className: 'smooth-flow-edge',
    style: defaultEdgeStyle,
  },
  {
    id: 'le-5',
    source: 'l-python',
    target: 'l-filter',
    className: 'smooth-flow-edge',
    style: defaultEdgeStyle,
  },
  {
    id: 'le-6',
    source: 'l-filter',
    target: 'l-agent',
    className: 'smooth-flow-edge',
    label: (
      <span className="rounded-full border border-[#aeff00]/25 bg-[#0a120c] px-2 py-0.5 font-mono text-[9px] font-semibold text-[#aeff00]/90">
        Qualified 85+
      </span>
    ),
    style: defaultEdgeStyle,
  },
  {
    id: 'le-7',
    source: 'l-pinecone',
    target: 'l-agent',
    className: 'smooth-flow-edge',
    style: defaultEdgeStyle,
  },
  {
    id: 'le-8',
    source: 'l-agent',
    sourceHandle: 'chat-model-handle',
    target: 'l-router',
    className: 'smooth-flow-edge',
    style: defaultEdgeStyle,
  },
  {
    id: 'le-9',
    source: 'l-agent',
    target: 'l-slack',
    className: 'smooth-flow-edge',
    style: defaultEdgeStyle,
  },
  {
    id: 'le-10',
    source: 'l-agent',
    target: 'l-hubspot',
    className: 'smooth-flow-edge',
    style: defaultEdgeStyle,
  },
  {
    id: 'le-11',
    source: 'l-agent',
    target: 'l-sheets',
    className: 'smooth-flow-edge',
    style: defaultEdgeStyle,
  },
];

// =========================================================================
// 3. AUTONOMOUS FINANCIAL SYNC (Complex FinTech Reconciliation Engine)
// =========================================================================
const financeNodes: ArchitectureNode[] = [
  {
    id: 'fn-cron',
    type: 'architectureNode',
    position: { x: 30, y: 135 },
    data: {
      title: 'Scheduled Cron Ingest',
      subtitle: 'tick: */15 * * * *',
      nodeType: 'trigger',
      tag: 'Cron Scheduler',
      details:
        'Triggers every 15 minutes to run enterprise billing reconciliation cycles across banking APIs and settlement ledgers.',
    },
  },
  {
    id: 'fn-stripe',
    type: 'architectureNode',
    position: { x: 240, y: 55 },
    data: {
      title: 'Stripe Billing & Invoices',
      subtitle: 'list: balance_transactions',
      nodeType: 'stripe',
      tag: 'Payment Processor',
      details:
        'Fetches recent charges, refunded subscriptions, credit card dispute events, and payout balance transactions from Stripe.',
    },
  },
  {
    id: 'fn-postgres',
    type: 'architectureNode',
    position: { x: 240, y: 215 },
    data: {
      title: 'PostgreSQL Bank Ledger',
      subtitle: 'SELECT * FROM bank_settlements',
      nodeType: 'postgres',
      tag: 'Banking Core',
      details:
        'Reads raw ACH and wire transfer settlement statements from the secure banking records database.',
    },
  },
  {
    id: 'fn-python',
    type: 'architectureNode',
    position: { x: 450, y: 135 },
    data: {
      title: 'Python Reconciliation Engine',
      subtitle: 'reconcile_and_match()',
      nodeType: 'python',
      tag: 'Python Microservice',
      details:
        'Computes mathematical variance between Stripe processing receipts and bank settlement deposits, accounting for merchant fees.',
    },
  },
  {
    id: 'fn-filter',
    type: 'architectureNode',
    position: { x: 650, y: 135 },
    data: {
      title: 'Variance & Fraud Filter',
      subtitle: 'delta === 0.00 & verified',
      nodeType: 'filter',
      tag: 'Zero-Delta Gate',
      details:
        'Validates that transactions match with zero delta error; isolates discrepancies for AI compliance agent investigation.',
    },
  },
  {
    id: 'fn-agent',
    type: 'architectureNode',
    position: { x: 860, y: 110 },
    data: {
      title: 'Financial Supervisor Agent',
      nodeType: 'ai-agent',
      tag: 'Autonomous Auditor',
      details:
        'Audits transaction logs, generates journal ledger entries, and detects unauthorized chargeback patterns.',
    },
  },
  {
    id: 'fn-router',
    type: 'architectureNode',
    position: { x: 890, y: 235 },
    data: {
      title: 'GPT-4o Financial Auditor',
      subtitle: 'verified: strict_json',
      nodeType: 'router',
      tag: 'Audit Model',
      details:
        'Audits compliance regulations and formats double-entry accounting balanced ledger entries with strict schema enforcement.',
    },
  },
  {
    id: 'fn-slack',
    type: 'architectureNode',
    position: { x: 1100, y: 55 },
    data: {
      title: 'Slack Finance Dispatch',
      subtitle: 'POST: #audit-reconciliation',
      nodeType: 'slack',
      tag: 'Compliance Alert',
      details:
        'Dispatches 15-minute reconciliation summaries and highlights any payment discrepancies directly to the CFO channel.',
    },
  },
  {
    id: 'fn-sheets',
    type: 'architectureNode',
    position: { x: 1100, y: 195 },
    data: {
      title: 'Master Accountant Ledger',
      subtitle: 'append: reconciled_row',
      nodeType: 'sheets',
      tag: 'Accounting Master',
      details:
        'Appends matched reconciliation entries to the master Google Sheets accounting book with audit hash stamps.',
    },
  },
];

const financeEdges: Edge[] = [
  {
    id: 'fne-1',
    source: 'fn-cron',
    target: 'fn-stripe',
    className: 'smooth-flow-edge',
    style: defaultEdgeStyle,
  },
  {
    id: 'fne-2',
    source: 'fn-cron',
    target: 'fn-postgres',
    className: 'smooth-flow-edge',
    style: defaultEdgeStyle,
  },
  {
    id: 'fne-3',
    source: 'fn-stripe',
    target: 'fn-python',
    className: 'smooth-flow-edge',
    style: defaultEdgeStyle,
  },
  {
    id: 'fne-4',
    source: 'fn-postgres',
    target: 'fn-python',
    className: 'smooth-flow-edge',
    style: defaultEdgeStyle,
  },
  {
    id: 'fne-5',
    source: 'fn-python',
    target: 'fn-filter',
    className: 'smooth-flow-edge',
    style: defaultEdgeStyle,
  },
  {
    id: 'fne-6',
    source: 'fn-filter',
    target: 'fn-agent',
    className: 'smooth-flow-edge',
    label: (
      <span className="rounded-full border border-[#aeff00]/25 bg-[#0a120c] px-2 py-0.5 font-mono text-[9px] font-semibold text-[#aeff00]/90">
        100% Balanced
      </span>
    ),
    style: defaultEdgeStyle,
  },
  {
    id: 'fne-7',
    source: 'fn-agent',
    sourceHandle: 'chat-model-handle',
    target: 'fn-router',
    className: 'smooth-flow-edge',
    style: defaultEdgeStyle,
  },
  {
    id: 'fne-8',
    source: 'fn-agent',
    target: 'fn-slack',
    className: 'smooth-flow-edge',
    style: defaultEdgeStyle,
  },
  {
    id: 'fne-9',
    source: 'fn-agent',
    target: 'fn-sheets',
    className: 'smooth-flow-edge',
    style: defaultEdgeStyle,
  },
];

// ==========================================
// FULL ARCHITECTURE CONFIG
// ==========================================
export const architectureConfig: ArchitectureConfig = {
  sectionTitle: 'We Build Workflows That Multiply Your Revenue',
  subtitle:
    'Stop losing deals to slow response times and manual busywork. We design production-grade, self-healing automation pipelines that connect your tools and run your business 24/7.',
  tabs: [
    {
      id: 'festival',
      label: 'Festival Database & AI Agent',
      headerTitle: 'Festival Database & AI Agent (Multi-Source RAG)',
      nodes: festivalNodes,
      edges: festivalEdges,
    },
    {
      id: 'lead-pipeline',
      label: 'Lead-to-Revenue Pipeline',
      headerTitle: 'Lead-to-Revenue Pipeline (Autonomous Sales Dispatch)',
      nodes: leadPipelineNodes,
      edges: leadPipelineEdges,
    },
    {
      id: 'financial-sync',
      label: 'Autonomous Financial Sync',
      headerTitle: 'Autonomous Financial Sync (Real-time Audit & Reconcile)',
      nodes: financeNodes,
      edges: financeEdges,
    },
  ],
  capabilities: [
    {
      id: 'cap-1',
      iconType: 'sparkles',
      title: 'AI Agents & Copilots',
      description:
        'Autonomous reasoning agents, multi-modal LLM integrations, and custom RAG pipelines.',
    },
    {
      id: 'cap-2',
      iconType: 'workflow',
      title: 'Intelligent Automations',
      description:
        'Self-healing n8n and webhook pipelines replacing hours of manual spreadsheet work.',
    },
    {
      id: 'cap-3',
      iconType: 'code',
      title: 'SaaS & Web Applications',
      description:
        'High-performance full-stack Next.js App Router platforms with sub-second responses.',
    },
    {
      id: 'cap-4',
      iconType: 'dashboard',
      title: 'Internal Tools & Portals',
      description:
        'Custom operations hubs, ERP dashboards, and role-based staff workflows.',
    },
  ],
  primaryCtaText: 'Book a Strategy Call',
  primaryCtaHref: '#contact',
  secondaryCtaText: "Let's chat →",
  secondaryCtaHref: '#contact',
};
