import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  subtext?: string;
  trend?: 'up' | 'down';
  gradient?: string;
  delay?: number;
}

export function MetricCard({ icon: Icon, label, value, subtext, trend, gradient, delay = 0 }: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: delay * 0.1 }}
      className={cn(
        'relative overflow-hidden rounded-2xl border p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5',
        gradient ? 'glass' : 'bg-card text-card-foreground border-border'
      )}
    >
      {gradient && (
        <div className={cn('absolute inset-0 opacity-5', gradient)} />
      )}

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary/10 text-primary">
            <Icon className="h-4.5 w-4.5" />
          </div>
          {trend && (
            <span className={cn(
              'text-xs font-semibold px-2 py-0.5 rounded-full',
              trend === 'up' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'
            )}>
              {trend === 'up' ? '↑' : '↓'}
            </span>
          )}
        </div>

        <p className="text-2xl font-bold tracking-tight">{value}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
        {subtext && (
          <p className="text-[11px] text-muted-foreground/60 mt-1">{subtext}</p>
        )}
      </div>
    </motion.div>
  );
}
