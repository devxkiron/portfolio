import React from 'react';

export interface FaqItem {
  id: string;
  question: string;
  answer: string | React.ReactNode;
}

export interface FaqConfig {
  sectionId: string;
  titleLines: string[];
  contactPrompt: string;
  contactEmail: string;
  items: FaqItem[];
  defaultOpenId?: string | null;
}

export interface FaqSectionProps {
  /** Optional HTML element ID for the section anchor, defaults to 'faq' */
  id?: string;
  /** Legacy alias for id */
  sectionId?: string;
  /** Full or partial configuration object */
  config?: Partial<FaqConfig>;
  /** Custom heading lines rendered with line breaks (used when title is not provided) */
  titleLines?: string[];
  /** Custom title element or string (takes precedence over titleLines) */
  title?: React.ReactNode;
  /** Optional subtitle or description below the title */
  subtitle?: React.ReactNode;
  /** Optional badge or pill above the title */
  badge?: React.ReactNode;
  /** Direct contact prompt text */
  contactPrompt?: string;
  /** Contact email address */
  contactEmail?: string;
  /** Whether to show the contact prompt & email link (default: true if contactEmail is present) */
  showContact?: boolean;
  /** Custom contact element (takes precedence over default contactPrompt/contactEmail) */
  contactNode?: React.ReactNode;
  /** List of FAQ items */
  items?: FaqItem[];
  /** Initial opened accordion item id. Pass null for all closed. Defaults to 'faq-1' */
  defaultOpenId?: string | null;
  /** Whether multiple accordion items can be open simultaneously (default: false) */
  allowMultiple?: boolean;
  /** Whether to run GSAP scroll entrance animations (default: true) */
  animated?: boolean;
  /** Additional CSS classes for the outer section */
  className?: string;
  /** Additional CSS classes for the inner container */
  containerClassName?: string;
  /** Additional CSS classes for the title element */
  titleClassName?: string;
  /** Additional CSS classes for the items list wrapper */
  itemsClassName?: string;
}
