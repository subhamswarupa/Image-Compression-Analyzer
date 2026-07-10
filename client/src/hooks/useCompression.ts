import { useState, useCallback } from 'react';
import { api } from '@/api/client';
import type { CompressionResult, HistoryEntry, UploadResult } from '@/types';
import { DEFAULT_QUALITY } from '@/lib/constants';

interface UseCompressionReturn {
  compress: (image: UploadResult, quality?: number, format?: string) => Promise<void>;
  isCompressing: boolean;
  result: CompressionResult | null;
  historyEntry: HistoryEntry | null;
  compressedUrl: string | null;
  error: string | null;
  reset: () => void;
}

export function useCompression(): UseCompressionReturn {
  const [isCompressing, setIsCompressing] = useState(false);
  const [result, setResult] = useState<CompressionResult | null>(null);
  const [historyEntry, setHistoryEntry] = useState<HistoryEntry | null>(null);
  const [compressedUrl, setCompressedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const compress = useCallback(async (
    image: UploadResult,
    quality: number = DEFAULT_QUALITY,
    format: string = image.format
  ) => {
    setIsCompressing(true);
    setError(null);

    try {
      const response = await api.compressImage({
        fileId: image.id,
        quality,
        format,
        originalSize: image.size,
        originalName: image.originalName,
      });

      setResult(response.result);
      setHistoryEntry(response.historyEntry);

      const url = api.getFileUrl('compressed', response.compressedFileName);
      setCompressedUrl(url);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Compression failed';
      setError(message);
    } finally {
      setIsCompressing(false);
    }
  }, []);

  const reset = useCallback(() => {
    setResult(null);
    setHistoryEntry(null);
    setCompressedUrl(null);
    setError(null);
  }, []);

  return { compress, isCompressing, result, historyEntry, compressedUrl, error, reset };
}
