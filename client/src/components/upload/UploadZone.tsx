import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileImage, X, ImageDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ALLOWED_EXTENSIONS } from '@/lib/constants';

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
  isUploading: boolean;
  error: string | null;
  hasImage: boolean;
}

export function UploadZone({ onFileSelect, isUploading, error, hasImage }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) onFileSelect(file);
  }, [onFileSelect]);

  const handleClick = () => inputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFileSelect(file);
    e.target.value = '';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        'relative',
        hasImage && 'hidden'
      )}
    >
      <motion.div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        className={cn(
          'relative cursor-pointer overflow-hidden rounded-2xl border-2 border-dashed p-12 md:p-16 transition-all duration-300',
          isDragging
            ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10 scale-[1.02]'
            : 'border-muted-foreground/25 hover:border-primary/50 hover:bg-accent/30',
        )}
      >
        <AnimatePresence>
          {isDragging && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gradient-to-br from-primary/10 to-purple-500/10 pointer-events-none"
            />
          )}
        </AnimatePresence>

        <input
          ref={inputRef}
          type="file"
          accept={ALLOWED_EXTENSIONS.join(',')}
          onChange={handleFileChange}
          className="hidden"
          aria-label="Upload image"
        />

        <div className="flex flex-col items-center gap-6 text-center">
          <motion.div
            animate={isDragging ? { scale: 1.1, rotate: [0, -5, 5, 0] } : {}}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl" />
            <div className="relative flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-purple-600 shadow-xl shadow-primary/20">
              {isUploading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                >
                  <ImageDown className="h-8 w-8 text-white" />
                </motion.div>
              ) : (
                <Upload className="h-8 w-8 text-white" />
              )}
            </div>
          </motion.div>

          <div>
            <p className="text-xl font-semibold">
              {isDragging ? 'Drop your image here' : 'Drop an image or click to browse'}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              PNG, JPG, JPEG, WEBP &mdash; Max 10MB
            </p>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center gap-2"
          >
            <X className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
