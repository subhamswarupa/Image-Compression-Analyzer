import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface SplitViewProps {
  originalUrl: string;
  compressedUrl: string;
  originalName: string;
}

export function SplitView({ originalUrl, compressedUrl, originalName }: SplitViewProps) {
  const [showOriginal, setShowOriginal] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="overflow-hidden">
        <div className="flex border-b border-border">
          <Button
            variant="ghost"
            onClick={() => setShowOriginal(true)}
            className={`flex-1 rounded-none h-10 text-sm ${showOriginal ? 'bg-accent text-foreground font-semibold border-b-2 border-primary' : 'text-muted-foreground'}`}
          >
            Original
          </Button>
          <Button
            variant="ghost"
            onClick={() => setShowOriginal(false)}
            className={`flex-1 rounded-none h-10 text-sm ${!showOriginal ? 'bg-accent text-foreground font-semibold border-b-2 border-primary' : 'text-muted-foreground'}`}
          >
            Compressed
          </Button>
        </div>

        <div className="relative aspect-video bg-muted/20 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img
              key={showOriginal ? 'original' : 'compressed'}
              src={showOriginal ? originalUrl : compressedUrl}
              alt={showOriginal ? `Original: ${originalName}` : `Compressed: ${originalName}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="max-w-full max-h-full object-contain"
              loading="lazy"
            />
          </AnimatePresence>
        </div>
      </Card>
    </motion.div>
  );
}
