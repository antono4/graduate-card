import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glow?: boolean; // Kept for compatibility but styled brutalist
}

export function GlassCard({ children, className, glow = false }: GlassCardProps) {
  return (
    <div className={cn(
      "brutalist-card p-8 relative overflow-hidden group",
      glow && "hover:bg-primary/5",
      className
    )}>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
