import { motion } from 'framer-motion';

interface CompressionGaugeProps {
  savedPercentage: number;
}

export function CompressionGauge({ savedPercentage }: CompressionGaugeProps) {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (savedPercentage / 100) * circumference;

  const getColor = () => {
    if (savedPercentage >= 50) return '#22c55e';
    if (savedPercentage >= 25) return '#eab308';
    return '#ef4444';
  };

  const getLabel = () => {
    if (savedPercentage >= 70) return 'Excellent';
    if (savedPercentage >= 50) return 'Great';
    if (savedPercentage >= 25) return 'Good';
    return 'Moderate';
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border bg-card text-card-foreground p-5 h-full">
      <p className="text-xs text-muted-foreground mb-2">Compression Efficiency</p>
      <div className="flex flex-col items-center justify-center">
        <div className="relative">
          <svg width="150" height="150" className="transform -rotate-90">
            <circle
              cx="75"
              cy="75"
              r={radius}
              fill="none"
              stroke="hsl(var(--secondary))"
              strokeWidth="8"
            />
            <motion.circle
              cx="75"
              cy="75"
              r={radius}
              fill="none"
              stroke={getColor()}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <motion.p
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-2xl font-bold"
              >
                {savedPercentage}%
              </motion.p>
              <p className="text-[10px] text-muted-foreground">saved</p>
            </div>
          </div>
        </div>
        <p className="text-sm font-medium mt-1" style={{ color: getColor() }}>{getLabel()}</p>
      </div>
    </div>
  );
}
