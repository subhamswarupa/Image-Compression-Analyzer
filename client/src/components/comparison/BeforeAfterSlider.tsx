import { useState, useRef, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MoveHorizontal } from 'lucide-react';

interface BeforeAfterSliderProps {
  originalUrl: string;
  compressedUrl: string;
  originalName: string;
}

export function BeforeAfterSlider({ originalUrl, compressedUrl, originalName }: BeforeAfterSliderProps) {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  }, []);

  const handleMouseDown = () => setIsDragging(true);

  useEffect(() => {
    if (!isDragging) return;
    const handleMouseMove = (e: MouseEvent) => updatePosition(e.clientX);
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, updatePosition]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div
        ref={containerRef}
        className="relative aspect-video rounded-2xl overflow-hidden select-none bg-muted/20 cursor-ew-resize"
        onMouseDown={handleMouseDown}
      >
        <img
          src={compressedUrl}
          alt={`Compressed: ${originalName}`}
          className="absolute inset-0 w-full h-full object-contain"
          draggable={false}
        />

        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPos}%` }}
        >
          <img
            src={originalUrl}
            alt={`Original: ${originalName}`}
            className="absolute top-0 left-0 w-full h-full max-w-none object-contain"
            style={{ width: `${100 / (sliderPos / 100)}%` }}
            draggable={false}
          />
        </div>

        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center">
            <MoveHorizontal className="h-5 w-5 text-foreground" />
          </div>
        </div>

        <div className="absolute bottom-3 left-3 px-2 py-1 rounded-lg bg-black/50 text-[11px] text-white font-medium">
          Original
        </div>
        <div className="absolute bottom-3 right-3 px-2 py-1 rounded-lg bg-black/50 text-[11px] text-white font-medium">
          Compressed
        </div>
      </div>
    </motion.div>
  );
}
