import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

interface SpeedImprovementChartProps {
  improvement: number;
}

export function SpeedImprovementChart({ improvement }: SpeedImprovementChartProps) {
  const bars = [
    { label: 'Original', value: 100, color: 'bg-muted-foreground/20' },
    { label: 'Compressed', value: Math.max(5, 100 - improvement), color: 'bg-blue-500' },
  ];

  return (
    <div className="rounded-2xl border bg-card text-card-foreground p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/10">
          <Zap className="h-4 w-4 text-blue-500" />
        </div>
        <div>
          <p className="text-sm font-medium">Loading Speed</p>
          <p className="text-xs text-muted-foreground">Estimated improvement</p>
        </div>
      </div>

      <div className="space-y-3">
        {bars.map((bar, i) => (
          <div key={bar.label}>
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>{bar.label}</span>
              <span>{i === 0 ? '100%' : `${Math.round(bar.value)}%`}</span>
            </div>
            <div className="h-3 rounded-full bg-secondary overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${bar.color}`}
                initial={{ width: '0%' }}
                animate={{ width: `${bar.value}%` }}
                transition={{ duration: 1, delay: i * 0.2, ease: 'easeOut' }}
              />
            </div>
          </div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="mt-4 p-3 rounded-xl bg-blue-500/5 border border-blue-500/10"
      >
        <p className="text-xs text-center">
          <span className="font-semibold text-blue-500">{improvement}% faster</span>{' '}
          <span className="text-muted-foreground">loading speed improvement</span>
        </p>
      </motion.div>
    </div>
  );
}
