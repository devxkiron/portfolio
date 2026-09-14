import React from 'react';

export type ButtonVariant = 'neon' | 'secondary' | 'white' | 'outline' | 'ghost';
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
  neon: 'bg-brand-neon text-black font-bold shadow-[0_0_15px_rgba(174,255,0,0.15)] hover:bg-[#b8ff1a] hover:shadow-[0_0_24px_rgba(174,255,0,0.3)] border border-transparent',
  secondary:
    'border border-border bg-card/90 text-foreground font-semibold backdrop-blur-sm hover:border-border hover:bg-muted hover:text-foreground',
  white:
    'bg-foreground text-background font-semibold shadow-md hover:opacity-90 border border-transparent',
  outline:
    'border border-border bg-transparent text-foreground font-semibold hover:border-foreground/40 hover:bg-muted hover:text-foreground',
  ghost:
    'bg-transparent text-muted-foreground font-medium hover:text-foreground hover:bg-muted/80 border border-transparent',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-xs rounded-lg gap-1.5',
  md: 'px-6 py-2.5 sm:py-3 text-xs sm:text-sm rounded-xl gap-2',
  lg: 'px-7 py-3.5 text-sm sm:text-base rounded-xl gap-2.5',
};

export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      variant = 'neon',
      size = 'md',
      icon,
      iconPosition = 'right',
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      'group inline-flex items-center justify-center font-sans transition-all duration-200 active:scale-95 cursor-pointer select-none';
    const combinedClasses = `${baseClasses} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

    const content = (
      <>
        {icon && iconPosition === 'left' && (
          <span className="shrink-0 transition-transform duration-200 group-hover:scale-105">
            {icon}
          </span>
        )}
        {children && <span>{children}</span>}
        {icon && iconPosition === 'right' && (
          <span className="shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
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
