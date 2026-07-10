import { motion } from 'framer-motion';
import { Save } from 'lucide-react';
import { formatFileSize } from '@/lib/utils';

interface StorageSavedBarProps {
  savedPercentage: number;
  originalSize: number;
  compressedSize: number;
}

export function StorageSavedBar({ savedPercentage, originalSize, compressedSize }: StorageSavedBarProps) {
  return (
    <div className="rounded-2xl border bg-card text-card-foreground p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/10">
          <Save className="h-4 w-4 text-emerald-500" />
        </div>
        <div>
          <p className="text-sm font-medium">Storage Saved</p>
          <p className="text-xs text-muted-foreground">Original vs Compressed</p>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span>Original</span>
            <span>{formatFileSize(originalSize)}</span>
          </div>
          <div className="h-3 rounded-full bg-secondary overflow-hidden">
            <div className="h-full w-full rounded-full bg-muted-foreground/20" />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span>Compressed</span>
            <span>{formatFileSize(compressedSize)}</span>
          </div>
          <div className="h-3 rounded-full bg-secondary overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-emerald-500"
              initial={{ width: '100%' }}
              animate={{ width: `${100 - savedPercentage}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </div>
        </div>

        <div className="pt-2 flex items-center justify-between text-sm">
          <span className="text-muted-foreground">You saved</span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="font-bold text-emerald-500"
          >
            {savedPercentage}%
          </motion.span>
        </div>
      </div>
    </div>
  );
}
