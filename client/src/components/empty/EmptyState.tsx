import { motion } from 'framer-motion';
import { ImageDown } from 'lucide-react';

interface EmptyStateProps {
  hasUploaded: boolean;
}

export function EmptyState({ hasUploaded }: EmptyStateProps) {
  if (hasUploaded) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="flex flex-col items-center justify-center py-16 text-center"
    >
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          rotate: [0, 2, -2, 0],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="mb-6"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl" />
          <div className="relative flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-primary/10 to-purple-600/10 border border-primary/10">
            <ImageDown className="h-10 w-10 text-primary/40" />
          </div>
        </div>
      </motion.div>
      <h3 className="text-xl font-semibold mb-2">No image uploaded yet</h3>
      <p className="text-sm text-muted-foreground max-w-md">
        Upload an image above to start compressing and analyzing. We support
        PNG, JPG, JPEG, and WEBP formats.
      </p>
    </motion.div>
  );
}
