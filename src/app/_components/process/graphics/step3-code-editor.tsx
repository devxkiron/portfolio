'use client';

import React, { useState, useEffect } from 'react';
import { FileCode, Search, Settings } from 'lucide-react';

interface CodeSnippet {
  fileName: string;
  tag?: string;
  code: string;
}

const CODE_SNIPPETS: CodeSnippet[] = [
  {
    fileName: 'custom_ai_engine.py',
    // tag: 'Pipeline Live',
    code: `@agent.route("/pipeline/execute", methods=["POST"])
async def handle_lead_event(payload: WebhookPayload):
    # 1. Ingest & enrich incoming contact data
    lead = await crm.enrich_contact(payload.email)
    # 2. Neural intent classification & smart routing
    intent = await llm.classify(lead.notes, model="gpt-4o")
    # 3. Trigger autonomous multi-channel dispatch
    await n8n.trigger_workflow("auto_outreach", context=intent)`,
  },
  {
    fileName: 'vector_memory_sync.py',
    // tag: 'RAG Sync',
    code: `@sync.cron("*/5 * * * *")
async def refresh_knowledge_base():
    # 1. Fetch updated enterprise tickets & docs
    updates = await knowledge_db.get_recent_delta()
    # 2. Compute dense vector embeddings
    vectors = await openai.embeddings.create(updates)
    # 3. Upsert into Pinecone multi-tenant index
    await vector_store.upsert_batch(vectors, namespace="prod")`,
  },
  {
    fileName: 'autonomous_supervisor.py',
    // tag: 'Self-Healing',
    code: `@supervisor.monitor(target="ai_dispatch_worker")
async def evaluate_agent_action(action: AgentAction):
    # 1. Real-time safety & hallucination audit
    confidence = await guardrails.audit(action.output)
    if confidence < 0.88:
        return await slack.escalate_to_human(action)
    # 2. Commit autonomous transaction safely
    return await action.execute_verified()`,
  },
];

// Lightweight regex syntax highlighter for Python lines
function highlightLine(lineText: string, isLastLine: boolean) {
  // If comment line
  if (lineText.trim().startsWith('#')) {
    return (
      <span className="italic text-zinc-500">
        {lineText}
        {isLastLine && (
          <span className="inline-block h-3.5 w-2 ml-1 align-middle bg-brand-neon animate-pulse" />
        )}
      </span>
    );
  }

  // Split by words, quotes, and punctuation while keeping delimiters
  const tokens = lineText.split(
    /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|\b(?:async|def|await|return|from|import|if)\b|\b(?:handle_lead_event|enrich_contact|classify|trigger_workflow|refresh_knowledge_base|get_recent_delta|create|upsert_batch|evaluate_agent_action|audit|escalate_to_human|execute_verified)\b|@[a-zA-Z_.]+|\b(?:WebhookPayload|AgentAction)\b)/g
  );

  return (
    <span>
      {tokens.map((token, i) => {
        if (!token) return null;

        // Strings
        if (token.startsWith('"') || token.startsWith("'")) {
          return (
            <span key={i} className="text-emerald-400">
              {token}
            </span>
          );
        }
        // Keywords
        if (/^(async|def|await|return|from|import|if)$/.test(token)) {
          return (
            <span key={i} className="text-purple-400 font-semibold">
              {token}
            </span>
          );
        }
        // Decorator
        if (token.startsWith('@')) {
          return (
            <span key={i} className="text-cyan-400">
              {token}
            </span>
          );
        }
        // Functions
        if (
          /^(handle_lead_event|enrich_contact|classify|trigger_workflow|refresh_knowledge_base|get_recent_delta|create|upsert_batch|evaluate_agent_action|audit|escalate_to_human|execute_verified)$/.test(
            token
          )
        ) {
          return (
            <span key={i} className="text-blue-400">
              {token}
            </span>
          );
        }
        // Types
        if (token === 'WebhookPayload' || token === 'AgentAction') {
          return (
            <span key={i} className="text-amber-300">
              {token}
            </span>
          );
        }
        // Default text
        return <span key={i} className="text-zinc-200">{token}</span>;
      })}
      {isLastLine && (
        <span className="inline-block h-3.5 w-1 ml-1 align-middle bg-brand-neon " />
      )}
    </span>
  );
}

export const Step3CodeEditor: React.FC = () => {
  const [snippetIndex, setSnippetIndex] = useState<number>(0);
  const [charCount, setCharCount] = useState<number>(0);

  const activeSnippet = CODE_SNIPPETS[snippetIndex];

  useEffect(() => {
    // Balanced, responsive typing speed (35ms)
    const timer = setInterval(() => {
      setCharCount((prev) => {
        if (prev >= activeSnippet.code.length) {
          return prev;
        }
        return prev + 1;
      });
    }, 35);

    // Pause for 4.5 seconds when typing finishes, then cycle to next snippet
    let resetTimer: NodeJS.Timeout;
    if (charCount >= activeSnippet.code.length) {
      resetTimer = setTimeout(() => {
        setSnippetIndex((prevIdx) => (prevIdx + 1) % CODE_SNIPPETS.length);
        setCharCount(0);
      }, 4500);
    }

    return () => {
      clearInterval(timer);
      if (resetTimer) clearTimeout(resetTimer);
    };
  }, [charCount, activeSnippet.code.length]);

  const currentCode = activeSnippet.code.slice(0, charCount);
  const lines = currentCode.split('\n');

  return (
    <div className="relative flex h-full min-h-[220px] w-full flex-col justify-start overflow-hidden bg-[#0a0f0c] text-left">
      {/* macOS Window Top Bar */}
      <div className="flex h-8 sm:h-10 shrink-0 items-center justify-between border-b border-zinc-800/90 bg-[#0e1510] px-3 sm:px-4">
        {/* Window control dots */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-[#ef4444]" />
          <div className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-[#f59e0b]" />
          <div className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-[#10b981]" />
        </div>

        {/* Dynamic File name & Tag */}
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] sm:text-xs tracking-wider text-zinc-300">
            {activeSnippet.fileName}
          </span>
          <span className="rounded bg-brand-neon/10 px-1.5 py-0.2 font-mono text-[9px] text-brand-neon border border-brand-neon/20 hidden sm:inline-block">
            {activeSnippet.tag}
          </span>
        </div>

        {/* Dummy spacer */}
        <div className="w-8 sm:w-10" />
      </div>

      {/* Editor Body */}
      <div className="flex flex-1 items-start justify-start overflow-hidden">
        {/* Left Mini Sidebar */}
        <div className="flex w-8 sm:w-10 shrink-0 self-stretch flex-col items-center gap-3 sm:gap-5 border-r border-zinc-800/80 bg-[#0d130f] py-3 sm:py-5">
          <FileCode className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-brand-neon" />
          <Search className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-zinc-600 hover:text-zinc-400 cursor-pointer" />
          <Settings className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-zinc-600 hover:text-zinc-400 cursor-pointer" />
        </div>

        {/* Code Content Area */}
        <div className="flex-1 p-3 sm:p-5 lg:p-6 font-mono text-[11px] sm:text-xs lg:text-[13px] leading-relaxed sm:leading-loose text-left select-text overflow-hidden">
          {lines.map((line, index) => {
            const isLastLine = index === lines.length - 1;
            return (
              <div key={index} className="flex gap-4 items-start text-left">
                {/* Line number */}
                <span className="w-4 shrink-0 text-right text-zinc-600 select-none">
                  {index + 1}
                </span>

                {/* Syntax-colored line text */}
                <div className="flex-1 text-left whitespace-pre">
                  {highlightLine(line, isLastLine)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
