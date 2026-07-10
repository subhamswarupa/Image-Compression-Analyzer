import { useState, useCallback, useEffect, useRef } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeProvider } from '@/hooks/useTheme';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/hero/Hero';
import { UploadZone } from '@/components/upload/UploadZone';
import { ComparisonView } from '@/components/comparison/ComparisonView';
import { MetricsDashboard } from '@/components/metrics/MetricsDashboard';
import { CompressionControls } from '@/components/compression/CompressionControls';
import { HistoryPanel } from '@/components/history/HistoryPanel';
import { LoadingSpinner } from '@/components/loading/LoadingSpinner';
import { EmptyState } from '@/components/empty/EmptyState';
import { useUpload } from '@/hooks/useUpload';
import { useCompression } from '@/hooks/useCompression';
import { api } from '@/api/client';
import { getDownloadFilename } from '@/lib/utils';
import { DEFAULT_QUALITY } from '@/lib/constants';
import type { ComparisonMode, UploadResult } from '@/types';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, staleTime: 30000 },
  },
});

function AppContent() {
  const [image, setImage] = useState<UploadResult | null>(null);
  const [quality, setQuality] = useState(DEFAULT_QUALITY);
  const [format, setFormat] = useState('jpeg');
  const [comparisonMode, setComparisonMode] = useState<ComparisonMode>('side-by-side');
  const originalUrlRef = useRef<string | null>(null);

  const { upload, isUploading, error: uploadError } = useUpload();
  const {
    compress,
    isCompressing,
    result,
    compressedUrl,
    error: compressError,
    reset: resetCompression,
  } = useCompression();

  const handleFileSelect = useCallback(async (file: File) => {
    const result = await upload(file);
    if (result) {
      setImage(result);
      setFormat(result.format === 'jpeg' ? 'jpeg' : result.format === 'jpg' ? 'jpeg' : result.format);
      setQuality(DEFAULT_QUALITY);
      resetCompression();
    }
  }, [upload, resetCompression]);

  useEffect(() => {
    if (image) {
      compress(image, quality, format);
    }
  }, [image, quality, format, compress]);

  useEffect(() => {
    if (image) {
      const url = api.getFileUrl('uploads', image.path.split(/[\\/]/).pop()!);
      originalUrlRef.current = url;
    }
  }, [image]);

  const handleReset = useCallback(() => {
    setImage(null);
    setQuality(DEFAULT_QUALITY);
    setFormat('jpeg');
    setComparisonMode('side-by-side');
    resetCompression();
    originalUrlRef.current = null;
  }, [resetCompression]);

  const handleDownload = useCallback(() => {
    if (!compressedUrl || !image || !result) return;
    const filename = getDownloadFilename(image.originalName, result.quality, result.format);
    api.downloadCompressed(compressedUrl, filename);
  }, [compressedUrl, image, result]);

  const hasResult = !!result && !!compressedUrl;
  const hasImage = !!image;
  const error = uploadError || compressError;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {!hasImage && <Hero />}

        <div className="container py-8 space-y-8">
          <UploadZone
            onFileSelect={handleFileSelect}
            isUploading={isUploading}
            error={error}
            hasImage={hasImage}
          />

          <AnimatePresence mode="wait">
            {isCompressing && !hasResult && (
              <LoadingSpinner key="loading" />
            )}
          </AnimatePresence>

          {error && hasImage && !isCompressing && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm"
            >
              {error}
            </motion.div>
          )}

          {hasImage && !isCompressing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              <div className="lg:col-span-2 space-y-8">
                {hasResult && (
                  <ComparisonView
                    mode={comparisonMode}
                    onModeChange={setComparisonMode}
                    originalUrl={originalUrlRef.current || ''}
                    compressedUrl={compressedUrl || ''}
                    originalName={image?.originalName || ''}
                    hasResult={hasResult}
                  />
                )}

                {hasResult && result && (
                  <MetricsDashboard result={result} />
                )}

                <EmptyState hasUploaded={hasImage && !hasResult} />
              </div>

              <div className="space-y-6">
                <CompressionControls
                  quality={quality}
                  onQualityChange={setQuality}
                  format={format}
                  onFormatChange={setFormat}
                  isCompressing={isCompressing}
                  hasResult={hasResult}
                  image={image}
                  result={result}
                  compressedUrl={compressedUrl}
                  onReset={handleReset}
                  onDownload={handleDownload}
                />

                {hasResult && <HistoryPanel />}
              </div>
            </motion.div>
          )}

          {!hasImage && (
            <EmptyState hasUploaded={false} />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <AppContent />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
