import React from 'react';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'neon'
  | 'white'
  | 'outline'
  | 'ghost';

export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  children?: React.ReactNode;
}

export type ButtonProps = ButtonBaseProps &
  (
    | ({ href: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>)
    | ({ href?: undefined } & React.ButtonHTMLAttributes<HTMLButtonElement>)
  );

const variantStyles: Record<ButtonVariant, string> = {
  // 1. PRIMARY: High-impact flagship CTA (vibrant neon with black text & ambient aura)
  primary:
    'border border-brand-neon bg-brand-neon text-black font-bold shadow-[0_4px_18px_-4px_rgba(174,255,0,0.45)] hover:bg-[#b5ff17] hover:shadow-[0_6px_24px_-4px_rgba(174,255,0,0.65)] hover:-translate-y-0.5 dark:shadow-[0_0_24px_rgba(174,255,0,0.3)] dark:hover:shadow-[0_0_32px_rgba(174,255,0,0.5)]',

  // 2. SECONDARY: Subtle companion surface aligned with project pastel palette
  secondary:
    'border border-[#b8d4ab] dark:border-border bg-[#f2f7ec] dark:bg-card/90 text-zinc-900 dark:text-foreground font-semibold shadow-xs hover:border-[#8ec279] dark:hover:border-border-subtle hover:bg-[#e6f0de] dark:hover:bg-muted hover:text-black dark:hover:text-foreground hover:-translate-y-0.5',

  // 3. ACCENT: Striking high-contrast dark emerald/obsidian in light mode & glowing pill in dark mode
  accent:
    'border border-emerald-800/40 dark:border-brand-neon/40 bg-[#101b13] dark:bg-brand-neon/15 text-white dark:text-brand-neon font-semibold shadow-sm hover:bg-[#182e1d] dark:hover:bg-brand-neon/25 hover:border-emerald-700/60 dark:hover:border-brand-neon/60 hover:-translate-y-0.5 dark:shadow-[0_0_18px_rgba(174,255,0,0.2)]',

  // Backward compatibility aliases
  neon:
    'border border-brand-neon bg-brand-neon text-black font-bold shadow-[0_4px_18px_-4px_rgba(174,255,0,0.45)] hover:bg-[#b5ff17] hover:shadow-[0_6px_24px_-4px_rgba(174,255,0,0.65)] hover:-translate-y-0.5 dark:shadow-[0_0_24px_rgba(174,255,0,0.3)] dark:hover:shadow-[0_0_32px_rgba(174,255,0,0.5)]',
  white:
    'border border-[#b8d4ab] dark:border-border bg-[#f2f7ec] dark:bg-card/90 text-zinc-900 dark:text-foreground font-semibold shadow-xs hover:border-[#8ec279] dark:hover:border-border-subtle hover:bg-[#e6f0de] dark:hover:bg-muted hover:text-black dark:hover:text-foreground hover:-translate-y-0.5',
  outline:
    'border border-border bg-transparent text-foreground font-semibold hover:border-foreground/40 hover:bg-muted hover:text-foreground hover:-translate-y-0.5',
  ghost:
    'bg-transparent text-muted-foreground font-medium hover:text-foreground hover:bg-muted/80 border border-transparent',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3.5 py-1.5 text-xs rounded-lg gap-1.5',
  md: 'px-5 py-2.5 sm:py-3 text-xs sm:text-sm rounded-xl gap-2',
  lg: 'px-7 py-3.5 text-sm sm:text-base rounded-xl gap-2.5',
};

export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      icon,
      iconPosition = 'right',
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    // Shimmer sheen wave & tactile animations
    const baseClasses =
      'group relative overflow-hidden inline-flex items-center justify-center font-sans transition-all duration-200 ease-out active:scale-95 cursor-pointer select-none after:pointer-events-none after:absolute after:inset-0 after:-translate-x-full hover:after:translate-x-full after:bg-gradient-to-r after:from-transparent after:via-white/20 dark:after:via-white/10 after:to-transparent after:transition-transform after:duration-700';

    const selectedVariantClass = variantStyles[variant] || variantStyles.primary;
    const selectedSizeClass = sizeStyles[size] || sizeStyles.md;
    const combinedClasses = `${baseClasses} ${selectedVariantClass} ${selectedSizeClass} ${className}`.trim();

    const content = (
      <>
        {icon && iconPosition === 'left' && (
          <span className="shrink-0 transition-transform duration-200 group-hover:-translate-x-0.5 group-hover:scale-105">
            {icon}
          </span>
        )}
        {children && <span className="relative z-10">{children}</span>}
        {icon && iconPosition === 'right' && (
          <span className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:scale-105">
            {icon}
          </span>
        )}
      </>
    );

    if ('href' in props && props.href) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={combinedClasses}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </a>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={(props as React.ButtonHTMLAttributes<HTMLButtonElement>).type || 'button'}
        className={combinedClasses}
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';
