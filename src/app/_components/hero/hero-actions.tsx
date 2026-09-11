import React from 'react';
import { ArrowUpRight, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroActionsProps {
  primaryCta?: { text: string; href: string };
  secondaryCta?: { text: string; href: string };
  className?: string;
}

export const HeroActions: React.FC<HeroActionsProps> = ({
  primaryCta = { text: 'Explore Projects', href: '#projects' },
  secondaryCta = { text: 'Get in Touch', href: '#contact' },
  className = '',
}) => {
  return (
    <div className={`flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 ${className}`}>
      {/* Primary CTA */}
      <Button
        href={primaryCta.href}
        variant="white"
        size="lg"
        icon={<ArrowUpRight size={16} />}
        iconPosition="right"
      >
        {primaryCta.text}
      </Button>

      {/* Secondary CTA */}
      <Button
        href={secondaryCta.href}
        variant="secondary"
        size="lg"
        icon={<Mail size={16} />}
        iconPosition="left"
      >
        {secondaryCta.text}
      </Button>
    </div>
  );
};
