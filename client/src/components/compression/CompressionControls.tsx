import { motion } from 'framer-motion';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { RefreshCw, Download, RotateCcw, Sparkles } from 'lucide-react';
import { FORMAT_OPTIONS } from '@/lib/constants';
import { getDownloadFilename } from '@/lib/utils';
import type { ImageFormat, UploadResult, CompressionResult } from '@/types';
import { cn } from '@/lib/utils';

interface CompressionControlsProps {
  quality: number;
  onQualityChange: (value: number) => void;
  format: string;
  onFormatChange: (format: string) => void;
  isCompressing: boolean;
  hasResult: boolean;
  image: UploadResult | null;
  result: CompressionResult | null;
  compressedUrl: string | null;
  onReset: () => void;
  onDownload: () => void;
}

export function CompressionControls({
  quality,
  onQualityChange,
  format,
  onFormatChange,
  isCompressing,
  hasResult,
  image,
  result,
  compressedUrl,
  onReset,
  onDownload,
}: CompressionControlsProps) {
  const getQualityLabel = (q: number) => {
    if (q >= 90) return 'Lossless';
    if (q >= 70) return 'High';
    if (q >= 40) return 'Medium';
    if (q >= 10) return 'Low';
    return 'Minimum';
  };

  const getRecommendation = () => {
    if (!result) return null;
    const { savedPercentage, quality: q } = result;
    if (savedPercentage > 60 && q > 70) {
      return { text: `We recommend ${q}% quality. You'll save ${savedPercentage}% storage with almost no visible quality loss.`, type: 'success' };
    }
    if (savedPercentage > 30) {
      return { text: `Good balance at ${q}% quality. Saving ${savedPercentage}% storage.`, type: 'info' };
    }
    return null;
  };

  const recommendation = getRecommendation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="glass rounded-2xl p-6 space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Quality</label>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">{quality}%</span>
              <span className={cn(
                'text-xs px-2 py-0.5 rounded-full font-medium',
                quality >= 70 ? 'bg-emerald-500/10 text-emerald-500' :
                quality >= 40 ? 'bg-amber-500/10 text-amber-500' :
                'bg-red-500/10 text-red-500'
              )}>
                {getQualityLabel(quality)}
              </span>
            </div>
          </div>
          <Slider
            value={[quality]}
            onValueChange={([v]) => onQualityChange(v)}
            min={1}
            max={100}
            step={1}
            disabled={isCompressing || !image}
            className="py-2"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Small file</span>
            <span>Best quality</span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Format</label>
          <div className="flex gap-2">
            {FORMAT_OPTIONS.map((opt) => {
              const Icon = opt.value === 'jpeg' ? '🖼' : opt.value === 'png' ? '🔲' : '🌐';
              return (
                <button
                  key={opt.value}
                  onClick={() => onFormatChange(opt.value)}
                  disabled={isCompressing || !image}
                  className={cn(
                    'flex-1 py-2.5 px-3 rounded-xl text-sm font-medium transition-all duration-200 border',
                    format === opt.value
                      ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                      : 'bg-secondary text-secondary-foreground border-border hover:bg-accent'
                  )}
                >
                  {Icon} {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        {recommendation && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 border border-blue-500/10"
          >
            <Sparkles className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              {recommendation.text}
            </p>
          </motion.div>
        )}

        {hasResult && (
          <div className="flex gap-3 pt-2">
            <Button
              onClick={onDownload}
              disabled={!compressedUrl}
              size="lg"
              className="flex-1 gap-2"
            >
              <Download className="h-4 w-4" />
              Download
            </Button>
            <Button
              onClick={onReset}
              variant="outline"
              size="lg"
              className="gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
