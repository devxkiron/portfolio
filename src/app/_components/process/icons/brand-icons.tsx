import React from 'react';

export const OpenAIIcon: React.FC<{ className?: string }> = ({ className = 'h-5 w-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.98 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.08 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.493zm-9.66-4.32a4.467 4.467 0 0 1-.535-3.014l.142.085 4.783 2.759a.77.77 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.5a4.5 4.5 0 0 1-6.14-1.39zm-1.357-9.76a4.462 4.462 0 0 1 2.345-1.975v5.677a.789.789 0 0 0 .393.677l5.837 3.37-2.02 1.166a.08.08 0 0 1-.07 0L3.89 12.31a4.497 4.497 0 0 1-1.647-3.96zm16.489 3.235l-5.837-3.37 2.02-1.165a.08.08 0 0 1 .07 0l4.898 2.827a4.5 4.5 0 0 1-.54 7.954v-5.57a.79.79 0 0 0-.391-.676h-.22zm2.01-3.024l-.142-.085-4.773-2.782a.776.776 0 0 0-.785 0L9.25 8.974V6.641a.08.08 0 0 1 .033-.061L14.12 3.7a4.5 4.5 0 0 1 6.623 4.569v.001zm-10.457 4.29l-2.67-1.542 2.67-1.543 2.67 1.543-2.67 1.542z" />
  </svg>
);

export const SlackIcon: React.FC<{ className?: string }> = ({ className = 'h-5 w-5' }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
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

export const HubSpotIcon: React.FC<{ className?: string }> = ({ className = 'h-5 w-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18.89 8.01V5.55a2.12 2.12 0 0 0 1.25-1.92 2.15 2.15 0 0 0-4.3 0c0 .85.5 1.58 1.22 1.92v2.46a6.83 6.83 0 0 0-2.88 1.48L7.14 4.39a2.3 2.3 0 1 0-1.28 1.05l7 5.06a6.76 6.76 0 0 0-.82 3.22c0 1.15.3 2.22.82 3.16l-2.22 2.22a1.86 1.86 0 0 0-.6-.1 1.9 1.9 0 1 0 1.9 1.9c0-.22-.04-.42-.1-.6l2.2-2.2a6.73 6.73 0 0 0 3.83 1.18c3.74 0 6.78-3.04 6.78-6.78 0-3.32-2.4-6.09-5.57-6.65l-.01.16zm-1.81 10.45a4.95 4.95 0 1 1 0-9.9 4.95 4.95 0 0 1 0 9.9z" />
  </svg>
);

export const StripeIcon: React.FC<{ className?: string }> = ({ className = 'h-5 w-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697.5 12.875.5 7.63.5 3.968 3.238 3.968 7.915c0 4.35 2.668 6.275 6.96 7.828 2.87 1.036 3.498 1.689 3.498 2.695 0 1.047-.935 1.54-2.457 1.54-2.193 0-5.074-1.07-6.938-2.158l-.946 5.61C5.787 24.28 8.9 25 12.012 25c5.626 0 9.47-2.612 9.47-7.604 0-4.524-2.766-6.494-7.506-8.246z" />
  </svg>
);

export const ClearbitIcon: React.FC<{ className?: string }> = ({ className = 'h-5 w-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5" />
    <path d="M2 12l10 5 10-5" />
  </svg>
);

// Authentic glowing spiral / vortex icon for GPT-4o Router
export const GPT4oSwirlIcon: React.FC<{ className?: string }> = ({ className = 'h-6 w-6' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Concentric curved vortex spiral arms */}
    <path
      d="M12 3a9 9 0 0 1 9 9c0 2.2-.8 4.2-2.1 5.8"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className="opacity-75"
    />
    <path
      d="M12 6a6 6 0 0 1 6 6c0 1.4-.5 2.8-1.4 3.8"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className="opacity-90"
    />
    <path
      d="M12 9a3 3 0 0 1 3 3c0 .8-.3 1.5-.9 2.1"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M12 21a9 9 0 0 1-9-9c0-2.2.8-4.2 2.1-5.8"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className="opacity-75"
    />
    <path
      d="M12 18a6 6 0 0 1-6-6c0-1.4.5-2.8 1.4-3.8"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className="opacity-90"
    />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
  </svg>
);
