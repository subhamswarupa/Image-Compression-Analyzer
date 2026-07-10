import { motion } from 'framer-motion';
import {
  HardDrive,
  FileDown,
  Scale,
  Save,
  Maximize2,
  Minimize2,
  Gauge,
  AlertTriangle,
  Zap,
} from 'lucide-react';
import { MetricCard } from './MetricCard';
import { CompressionGauge } from './CompressionGauge';
import { StorageSavedBar } from './StorageSavedBar';
import { SpeedImprovementChart } from './SpeedImprovementChart';
import { QualityIndicator } from './QualityIndicator';
import type { CompressionResult } from '@/types';
import { formatFileSize } from '@/lib/utils';

interface MetricsDashboardProps {
  result: CompressionResult;
}

export function MetricsDashboard({ result }: MetricsDashboardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        <MetricCard
          icon={HardDrive}
          label="Original Size"
          value={formatFileSize(result.originalSize)}
          delay={1}
        />
        <MetricCard
          icon={FileDown}
          label="Compressed Size"
          value={formatFileSize(result.compressedSize)}
          trend="down"
          delay={2}
        />
        <MetricCard
          icon={Scale}
          label="Compression Ratio"
          value={`${result.compressionRatio}x`}
          subtext={result.savedPercentage > 50 ? 'Excellent' : result.savedPercentage > 20 ? 'Good' : 'Moderate'}
          delay={3}
        />
        <MetricCard
          icon={Save}
          label="Saved Storage"
          value={`${result.savedPercentage}%`}
          subtext={formatFileSize(result.savedStorage)}
          trend="up"
          delay={4}
        />
        <MetricCard
          icon={Maximize2}
          label="Dimensions"
          value={`${result.width} × ${result.height}`}
          delay={5}
        />
        <MetricCard
          icon={Gauge}
          label="Quality Level"
          value={`${result.quality}%`}
          delay={6}
        />
        <MetricCard
          icon={AlertTriangle}
          label="Quality Loss"
          value={`${result.estimatedQualityLoss}%`}
          trend={result.estimatedQualityLoss > 10 ? 'up' : 'down'}
          delay={7}
        />
        <MetricCard
          icon={Zap}
          label="Speed Improvement"
          value={`${result.loadingSpeedImprovement}%`}
          trend="up"
          delay={8}
        />
        <div className="col-span-2 md:col-span-1 lg:col-span-2">
          <CompressionGauge savedPercentage={result.savedPercentage} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StorageSavedBar savedPercentage={result.savedPercentage} originalSize={result.originalSize} compressedSize={result.compressedSize} />
        <QualityIndicator quality={result.quality} estimatedQualityLoss={result.estimatedQualityLoss} />
        <SpeedImprovementChart improvement={result.loadingSpeedImprovement} />
      </div>
    </motion.div>
  );
}
