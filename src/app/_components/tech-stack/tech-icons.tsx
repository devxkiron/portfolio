'use client';

import React from 'react';
import {
  SiNextdotjs,
  SiTypescript,
  SiReact,
  SiClaude,
  SiTailwindcss,
  SiPython,
  SiSupabase,
  SiThreedotjs,
  SiLangchain,
  SiVercel,
  SiRedis,
  SiGraphql,
  SiVite,
  SiDocker,
  SiPostgresql,
  SiKubernetes,
  SiNodedotjs,
  SiGithub,
  SiApachekafka,
  SiPrisma,
  SiStripe,
  SiBun,
  SiPytorch,
  SiCloudflare,
  SiLinux,
} from 'react-icons/si';
import { RiOpenaiFill } from 'react-icons/ri';
import { FaAws } from 'react-icons/fa6';

interface TechIconProps {
  iconName: string;
  size?: number;
  className?: string;
  color?: string;
}

// Crisp official Pinecone geometric cone SVG
export const PineconeIcon: React.FC<{ size?: number; className?: string; color?: string }> = ({
  size = 28,
  className = '',
  color = '#10B981',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect width="24" height="24" rx="5" fill="#0c100d" />
    <circle cx="12" cy="6" r="2.2" fill={color} />
    <circle cx="7.5" cy="11.5" r="2.2" fill={color} />
    <circle cx="16.5" cy="11.5" r="2.2" fill={color} />
    <circle cx="12" cy="17" r="2.2" fill={color} />
    <path d="M12 8.2V14.8M9.7 11.5H14.3" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

export const TechIconRenderer: React.FC<TechIconProps> = ({
  iconName,
  size = 32,
  className = '',
  color,
}) => {
  switch (iconName.toLowerCase()) {
    case 'nextjs':
      return <SiNextdotjs size={size} color={color || '#FFFFFF'} className={className} />;
    case 'typescript':
      return <SiTypescript size={size} color={color || '#3178C6'} className={className} />;
    case 'react':
      return <SiReact size={size} color={color || '#61DAFB'} className={className} />;
    case 'openai':
      return <RiOpenaiFill size={size + 4} color={color || '#10A37F'} className={className} />;
    case 'claude':
      return <SiClaude size={size} color={color || '#D97757'} className={className} />;
    case 'tailwind':
      return <SiTailwindcss size={size} color={color || '#06B6D4'} className={className} />;
    case 'python':
      return <SiPython size={size} color={color || '#3776AB'} className={className} />;
    case 'supabase':
      return <SiSupabase size={size} color={color || '#3ECF8E'} className={className} />;
    case 'threejs':
      return <SiThreedotjs size={size} color={color || '#FFFFFF'} className={className} />;
    case 'pinecone':
      return <PineconeIcon size={size} color={color || '#10B981'} className={className} />;
    case 'langchain':
      return <SiLangchain size={size} color={color || '#22C55E'} className={className} />;
    case 'vercel':
      return <SiVercel size={size} color={color || '#FFFFFF'} className={className} />;
    case 'redis':
      return <SiRedis size={size} color={color || '#DC382D'} className={className} />;
    case 'graphql':
      return <SiGraphql size={size} color={color || '#E535AB'} className={className} />;
    case 'vite':
      return <SiVite size={size} color={color || '#646CFF'} className={className} />;
    case 'docker':
      return <SiDocker size={size} color={color || '#2496ED'} className={className} />;
    case 'postgresql':
      return <SiPostgresql size={size} color={color || '#4169E1'} className={className} />;
    case 'kubernetes':
      return <SiKubernetes size={size} color={color || '#326CE5'} className={className} />;
    case 'aws':
      return <FaAws size={size + 2} color={color || '#FF9900'} className={className} />;
    case 'nodejs':
      return <SiNodedotjs size={size} color={color || '#5FA04E'} className={className} />;
    case 'github':
      return <SiGithub size={size} color={color || '#F0F6FC'} className={className} />;
    case 'kafka':
      return <SiApachekafka size={size} color={color || '#E84335'} className={className} />;
    case 'prisma':
      return <SiPrisma size={size} color={color || '#5A67D8'} className={className} />;
    case 'stripe':
      return <SiStripe size={size} color={color || '#635BFF'} className={className} />;
    case 'bun':
      return <SiBun size={size} color={color || '#FBF0DF'} className={className} />;
    case 'pytorch':
      return <SiPytorch size={size} color={color || '#EE4C2C'} className={className} />;
    case 'cloudflare':
      return <SiCloudflare size={size} color={color || '#F38020'} className={className} />;
    case 'linux':
      return <SiLinux size={size} color={color || '#FCC624'} className={className} />;
    default:
      return (
        <div
          style={{ width: size, height: size }}
          className={`flex items-center justify-center rounded-lg bg-zinc-800 text-[10px] font-bold text-white ${className}`}
        >
          {iconName.slice(0, 2).toUpperCase()}
        </div>
      );
  }
};
