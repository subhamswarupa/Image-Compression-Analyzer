import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

interface SideBySideProps {
  originalUrl: string;
  compressedUrl: string;
  originalName: string;
}

export function SideBySide({ originalUrl, compressedUrl, originalName }: SideBySideProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="overflow-hidden">
          <div className="p-2 bg-muted/50 border-b border-border text-xs font-medium text-muted-foreground text-center">
            Original
          </div>
          <div className="relative aspect-video bg-muted/20 flex items-center justify-center overflow-hidden">
            <img
              src={originalUrl}
              alt={`Original: ${originalName}`}
              className="max-w-full max-h-full object-contain"
              loading="lazy"
            />
          </div>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <Card className="overflow-hidden relative">
          <div className="p-2 bg-primary/10 border-b border-primary/20 text-xs font-medium text-primary text-center">
            Compressed
          </div>
          <div className="relative aspect-video bg-muted/20 flex items-center justify-center overflow-hidden">
            <img
              src={compressedUrl}
              alt={`Compressed: ${originalName}`}
              className="max-w-full max-h-full object-contain"
              loading="lazy"
            />
            <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-primary/80 text-[10px] font-semibold text-white">
              NEW
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
