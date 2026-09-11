import React from 'react';

// Official Notion Icon (High-fidelity brand mark)
export const NotionIcon: React.FC<{ className?: string }> = ({ className = 'h-5 w-5' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.459 4.208c.746.606 1.026.56 2.428.466l11.378-.84c1.12-.093 1.307-.466.933-1.026L17.79 1.085C17.323.385 16.483 0 15.364 0H2.5c-.84 0-1.493.466-1.586 1.213L0 18.986c-.093.746.467 1.213 1.307 1.213h14.747c.84 0 1.493-.467 1.586-1.213l.934-11.474c.093-.747-.374-1.214-1.214-1.214H4.46v-2.09zM3.712 18.053l.747-10.45c.093-.746.653-1.026 1.4-1.026h9.707c.747 0 1.027.466.933 1.213l-.746 10.263c-.094.747-.56 1.027-1.307 1.027H4.925c-.746 0-1.306-.467-1.213-1.027zM6.512 8.677h2.707l4.386 6.813v-6.813h2.24v9.146H13.24l-4.48-6.906v6.906H6.512V8.677z"
      fill="#FFFFFF"
    />
  </svg>
);

// Official Google Sheets Logo (Realistic folded corner sheet with grid)
export const GoogleSheetsIcon: React.FC<{ className?: string }> = ({ className = 'h-5 w-5' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z"
      fill="#0F9D58"
    />
    <path d="M14 2V8H20L14 2Z" fill="#87CEAC" />
    <path
      d="M7.5 12.5H16.5M7.5 15.5H16.5M10.5 9.5V18.5"
      stroke="#FFFFFF"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Official PostgreSQL Emblem (Elephant silhouette in #336791)
export const PostgresIcon: React.FC<{ className?: string }> = ({ className = 'h-5 w-5' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path
      d="M12.012 2C6.482 2 2 6.482 2 12.012c0 4.417 2.868 8.163 6.848 9.479.501.092.684-.217.684-.482 0-.237-.009-.868-.014-1.704-2.785.605-3.373-1.342-3.373-1.342-.455-1.156-1.111-1.464-1.111-1.464-.909-.622.069-.609.069-.609 1.005.071 1.534 1.032 1.534 1.032.893 1.53 2.344 1.088 2.915.832.091-.647.349-1.088.636-1.338-2.223-.253-4.559-1.112-4.559-4.948 0-1.093.39-1.988 1.03-2.688-.103-.253-.447-1.272.098-2.65 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 7.072c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.547 1.378.203 2.397.1 2.65.641.7 1.028 1.595 1.028 2.688 0 3.847-2.339 4.691-4.57 4.94.359.31.679.92.679 1.854 0 1.338-.012 2.418-.012 2.747 0 .268.18.58.688.481C19.138 20.17 22 16.425 22 12.012 22 6.482 17.518 2 12.012 2z"
      fill="#336791"
    />
  </svg>
);

// Official Pinecone Vector Database Emblem
export const PineconeIcon: React.FC<{ className?: string }> = ({ className = 'h-5 w-5' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 3L16 7.5H8L12 3Z" fill="#00DF89" />
    <path d="M12 7L18 13.5H6L12 7Z" fill="#10B981" />
    <path d="M12 12.5L19.5 19H4.5L12 12.5Z" fill="#059669" />
    <rect x="10.5" y="19" width="3" height="3" rx="0.8" fill="#047857" />
  </svg>
);

// Official DeepSeek Logo
export const DeepSeekIcon: React.FC<{ className?: string }> = ({ className = 'h-5 w-5' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="11" fill="#0F1F38" stroke="#1E40AF" strokeWidth="1.5" />
    <path
      d="M7 13.5C7 10 9.5 8 13.5 8C17 8 18 10.5 18 12.5C18 15 15.5 16.5 12 16.5C9 16.5 7 15.5 7 13.5Z"
      fill="#3B82F6"
    />
    <circle cx="14.5" cy="10.5" r="1" fill="#FFFFFF" />
    <path
      d="M6 14C4.5 13 4 11.5 4.5 10.5C5 9.5 6.5 10 7.5 11"
      stroke="#60A5FA"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

// Official OpenAI Swirl
export const OpenAIIcon: React.FC<{ className?: string }> = ({ className = 'h-5 w-5' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path
      d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.98 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.08 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.493zm-9.66-4.32a4.467 4.467 0 0 1-.535-3.014l.142.085 4.783 2.759a.77.77 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.5a4.5 4.5 0 0 1-6.14-1.39zm-1.357-9.76a4.462 4.462 0 0 1 2.345-1.975v5.677a.789.789 0 0 0 .393.677l5.837 3.37-2.02 1.166a.08.08 0 0 1-.07 0L3.89 12.31a4.497 4.497 0 0 1-1.647-3.96zm16.489 3.235l-5.837-3.37 2.02-1.165a.08.08 0 0 1 .07 0l4.898 2.827a4.5 4.5 0 0 1-.54 7.954v-5.57a.79.79 0 0 0-.391-.676h-.22zm2.01-3.024l-.142-.085-4.773-2.782a.776.776 0 0 0-.785 0L9.25 8.974V6.641a.08.08 0 0 1 .033-.061L14.12 3.7a4.5 4.5 0 0 1 6.623 4.569v.001zm-10.457 4.29l-2.67-1.542 2.67-1.543 2.67 1.543-2.67 1.542z"
      fill="#10A37F"
    />
  </svg>
);

// Official Slack 4-Color Logo
export const SlackIcon: React.FC<{ className?: string }> = ({ className = 'h-5 w-5' }) => (
  <svg viewBox="0 0 24 24" className={className}>
    <path
      d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313z"
      fill="#E01E5A"
    />
    <path
      d="M8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312z"
      fill="#36C5F0"
    />
    <path
      d="M18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312z"
      fill="#2EB67D"
    />
    <path
      d="M15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"
      fill="#ECB22E"
    />
  </svg>
);

// Official Stripe Logo
export const StripeIcon: React.FC<{ className?: string }> = ({ className = 'h-5 w-5' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <rect width="24" height="24" rx="5" fill="#635BFF" />
    <path
      d="M14.5 10.2c-1.8-.7-2.8-1.2-2.8-2 0-.7.6-1.1 1.6-1.1 1.8 0 3.7.7 5 1.3l.7-4.4c-1.6-.7-3.7-1.1-6-1.1-4.3 0-7.3 2.2-7.3 6.1 0 3.6 2.2 5.2 5.7 6.4 2.4.8 2.9 1.4 2.9 2.2 0 .9-.8 1.3-2 1.3-1.8 0-4.2-.9-5.7-1.8l-.8 4.6c1.6.8 4.2 1.4 6.8 1.4 4.6 0 7.8-2.1 7.8-6.2 0-3.7-2.3-5.3-6.2-6.7z"
      fill="#FFFFFF"
    />
  </svg>
);

// Official HubSpot Logo
export const HubSpotIcon: React.FC<{ className?: string }> = ({ className = 'h-5 w-5' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M18.89 8.01V5.55a2.12 2.12 0 0 0 1.25-1.92 2.15 2.15 0 0 0-4.3 0c0 .85.5 1.58 1.22 1.92v2.46a6.83 6.83 0 0 0-2.88 1.48L7.14 4.39a2.3 2.3 0 1 0-1.28 1.05l7 5.06a6.76 6.76 0 0 0-.82 3.22c0 1.15.3 2.22.82 3.16l-2.22 2.22a1.86 1.86 0 0 0-.6-.1 1.9 1.9 0 1 0 1.9 1.9c0-.22-.04-.42-.1-.6l2.2-2.2a6.73 6.73 0 0 0 3.83 1.18c3.74 0 6.78-3.04 6.78-6.78 0-3.32-2.4-6.09-5.57-6.65l-.01.16zm-1.81 10.45a4.95 4.95 0 1 1 0-9.9 4.95 4.95 0 0 1 0 9.9z"
      fill="#FF7A59"
    />
  </svg>
);

// Official Python Dual-Snake Logo
export const PythonIcon: React.FC<{ className?: string }> = ({ className = 'h-5 w-5' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M11.91 2C6.73 2 7.05 4.25 7.05 4.25L7.06 6.58H12.02V7.36H4.27C4.27 7.36 2 7.1 2 12.27C2 17.45 3.98 17.2 3.98 17.2H5.72V14.73C5.72 14.73 5.62 11.78 8.61 11.78H13.52C13.52 11.78 16.38 11.88 16.38 9.07V4.35C16.38 4.35 16.73 2 11.91 2ZM9.34 3.45C9.89 3.45 10.34 3.9 10.34 4.45C10.34 5 9.89 5.45 9.34 5.45C8.79 5.45 8.34 5 8.34 4.45C8.34 3.9 8.79 3.45 9.34 3.45Z"
      fill="#3776AB"
    />
    <path
      d="M12.09 22C17.27 22 16.95 19.75 16.95 19.75L16.94 17.42H11.98V16.64H19.73C19.73 16.64 22 16.9 22 11.73C22 6.55 20.02 6.8 20.02 6.8H18.28V9.27C18.28 9.27 18.38 12.22 15.39 12.22H10.48C10.48 12.22 7.62 12.12 7.62 14.93V19.65C7.62 19.65 7.27 22 12.09 22ZM14.66 20.55C14.11 20.55 13.66 20.1 13.66 19.55C13.66 19 14.11 18.55 14.66 18.55C15.21 18.55 15.66 19 15.66 19.55C15.66 20.1 15.21 20.55 14.66 20.55Z"
      fill="#FFD43B"
    />
  </svg>
);

// Official Apollo.io Data Enrichment Icon
export const ApolloIcon: React.FC<{ className?: string }> = ({ className = 'h-5 w-5' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M12 3L4.5 19H8.5L12 11.5L15.5 19H19.5L12 3Z"
      fill="url(#apollo_grad)"
    />
    <path
      d="M12 14.5L10 19H14L12 14.5Z"
      fill="#FFFFFF"
    />
    <defs>
      <linearGradient id="apollo_grad" x1="4.5" y1="3" x2="19.5" y2="19" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F59E0B" />
        <stop offset="0.5" stopColor="#EC4899" />
        <stop offset="1" stopColor="#8B5CF6" />
      </linearGradient>
    </defs>
  </svg>
);

// Trigger icon (Lightning Bolt + Action Indicator)
export const TriggerIcon: React.FC<{ className?: string }> = ({ className = 'h-5 w-5' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M13 2L4 14H11L9 22L20 10H13L15 2H13Z"
      fill="#F59E0B"
      stroke="#FBBF24"
      strokeWidth="1"
      strokeLinejoin="round"
    />
  </svg>
);

// Webhook / API Ingest Icon
export const WebhookIcon: React.FC<{ className?: string }> = ({ className = 'h-5 w-5' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="9" stroke="#10B981" strokeWidth="1.8" strokeDasharray="3 3" />
    <path
      d="M8 12L11 15L16 9"
      stroke="#AEFF00"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// OpenRouter Logo
export const OpenRouterIcon: React.FC<{ className?: string }> = ({ className = 'h-5 w-5' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="10" fill="#18181B" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
    <path
      d="M13 6L7 13H12L11 18L17 11H12L13 6Z"
      fill="#AEFF00"
      stroke="#AEFF00"
      strokeWidth="0.5"
      strokeLinejoin="round"
    />
  </svg>
);

// Streamline / Pencil Edit Icon
export const PencilEditIcon: React.FC<{ className?: string }> = ({ className = 'h-5 w-5' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <rect width="24" height="24" rx="5" fill="#6366F1" />
    <path
      d="M15.5 6.5L17.5 8.5M7 17L17.5 6.5L15.5 4.5L5 15V19H9L15.5 12.5"
      stroke="#FFFFFF"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
