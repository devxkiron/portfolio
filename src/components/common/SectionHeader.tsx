import React from "react";
import { Badge } from "./Badge";

interface SectionHeaderProps {
  badge?: string;
  badgeVariant?: "neon" | "dark" | "outline" | "muted";
  titlePrefix?: string;
  highlightText?: string;
  titleSuffix?: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  badgeVariant = "outline",
  titlePrefix,
  highlightText,
  titleSuffix,
  subtitle,
  align = "center",
  className = "",
}) => {
  const isCenter = align === "center";

  return (
    <div
      className={`flex flex-col gap-3 ${
        isCenter ? "items-center text-center max-w-2xl mx-auto" : "items-start text-left max-w-xl"
      } ${className}`}
    >
      {badge && (
        <Badge variant={badgeVariant} hasDot>
          {badge}
        </Badge>
      )}

      <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.15] text-[var(--foreground)]">
        {titlePrefix && <span>{titlePrefix} </span>}
        {highlightText && (
          <span className="relative inline-block font-black text-[#8fe000] dark:text-[var(--brand-neon)] [text-shadow:0_0_20px_rgba(174,255,0,0.35)]">
            {highlightText}
          </span>
        )}
        {titleSuffix && <span> {titleSuffix}</span>}
      </h2>

      {subtitle && (
        <p className="text-base sm:text-lg text-[var(--foreground)]/70 leading-relaxed font-normal mt-1">
          {subtitle}
        </p>
      )}
    </div>
  );
};
