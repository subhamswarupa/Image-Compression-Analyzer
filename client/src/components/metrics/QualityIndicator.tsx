import { motion } from 'framer-motion';
import { Gauge } from 'lucide-react';

interface QualityIndicatorProps {
  quality: number;
  estimatedQualityLoss: number;
}

export function QualityIndicator({ quality, estimatedQualityLoss }: QualityIndicatorProps) {
  const effectiveQuality = Math.max(0, quality - estimatedQualityLoss);
  const score = Math.round(quality - estimatedQualityLoss);

  const getColor = () => {
    if (score >= 80) return '#22c55e';
    if (score >= 60) return '#eab308';
    if (score >= 40) return '#f97316';
    return '#ef4444';
  };

  const getLabel = () => {
    if (score >= 80) return 'Excellent Quality';
    if (score >= 60) return 'Good Quality';
    if (score >= 40) return 'Fair Quality';
    return 'Low Quality';
  };

  return (
    <div className="rounded-2xl border bg-card text-card-foreground p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
          <Gauge className="h-4 w-4 text-primary" />
        </div>
        <div>
          <p className="text-sm font-medium">Quality Score</p>
          <p className="text-xs text-muted-foreground">Estimated visual quality</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative w-20 h-20">
          <svg width="80" height="80" className="transform -rotate-90">
            <circle cx="40" cy="40" r="34" fill="none" stroke="hsl(var(--secondary))" strokeWidth="6" />
            <motion.circle
              cx="40"
              cy="40"
              r="34"
              fill="none"
              stroke={getColor()}
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={`${(score / 100) * 213.6} 213.6`}
              initial={{ strokeDasharray: '0 213.6' }}
              animate={{ strokeDasharray: `${(score / 100) * 213.6} 213.6` }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-lg font-bold"
              style={{ color: getColor() }}
            >
              {score}
            </motion.span>
          </div>
        </div>

        <div className="space-y-1">
          <p className="text-sm font-medium">{getLabel()}</p>
          <p className="text-xs text-muted-foreground">
            Quality setting: {quality}%
          </p>
          <p className="text-xs text-muted-foreground">
            Est. loss: {estimatedQualityLoss}%
          </p>
        </div>
      </div>
    </div>
  );
}
