import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "neon" | "dark" | "outline" | "muted";
  className?: string;
  hasDot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "outline",
  className = "",
  hasDot = false,
}) => {
  const baseStyles =
    "inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full transition-all duration-200";

  const variantStyles = {
    neon: "bg-[var(--brand-neon)] text-[var(--brand-dark)] shadow-[0_0_15px_rgba(174,255,0,0.3)]",
    dark: "bg-[var(--brand-dark)] text-[var(--brand-neon)] border border-[var(--brand-neon)]/20",
    outline:
      "border border-black/[0.1] dark:border-white/[0.15] text-black/80 dark:text-white/80 bg-black/[0.02] dark:bg-white/[0.04]",
    muted:
      "bg-[var(--brand-muted)] text-[var(--foreground)]/70 border border-black/[0.05]",
  };

  return (
    <span className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {hasDot && (
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-neon)] animate-pulse" />
      )}
      {children}
    </span>
  );
};
