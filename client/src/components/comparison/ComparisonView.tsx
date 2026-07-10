import { motion, AnimatePresence } from 'framer-motion';
import { Columns2, MoveHorizontal, SplitSquareHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ComparisonMode } from '@/types';
import { SideBySide } from './SideBySide';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { SplitView } from './SplitView';

interface ComparisonViewProps {
  mode: ComparisonMode;
  onModeChange: (mode: ComparisonMode) => void;
  originalUrl: string;
  compressedUrl: string;
  originalName: string;
  hasResult: boolean;
}

const modes: { value: ComparisonMode; label: string; icon: typeof Columns2 }[] = [
  { value: 'side-by-side', label: 'Side by Side', icon: Columns2 },
  { value: 'slider', label: 'Before / After', icon: MoveHorizontal },
  { value: 'split', label: 'Split View', icon: SplitSquareHorizontal },
];

export function ComparisonView({
  mode,
  onModeChange,
  originalUrl,
  compressedUrl,
  originalName,
  hasResult,
}: ComparisonViewProps) {
  if (!hasResult) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      <div className="flex items-center gap-2 p-1 rounded-xl bg-muted/50 border border-border w-fit">
        {modes.map((m) => {
          const Icon = m.icon;
          const isActive = mode === m.value;
          return (
            <button
              key={m.value}
              onClick={() => onModeChange(m.value)}
              className={cn(
                'flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline">{m.label}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {mode === 'side-by-side' && (
            <SideBySide originalUrl={originalUrl} compressedUrl={compressedUrl} originalName={originalName} />
          )}
          {mode === 'slider' && (
            <BeforeAfterSlider originalUrl={originalUrl} compressedUrl={compressedUrl} originalName={originalName} />
          )}
          {mode === 'split' && (
            <SplitView originalUrl={originalUrl} compressedUrl={compressedUrl} originalName={originalName} />
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
