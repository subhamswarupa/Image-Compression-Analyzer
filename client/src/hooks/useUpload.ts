import { useState, useCallback } from 'react';
import { api } from '@/api/client';
import type { UploadResult } from '@/types';
import { ALLOWED_FORMATS, MAX_FILE_SIZE } from '@/lib/constants';

interface UseUploadReturn {
  upload: (file: File) => Promise<UploadResult | null>;
  isUploading: boolean;
  error: string | null;
  validateFile: (file: File) => string | null;
}

export function useUpload(): UseUploadReturn {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateFile = useCallback((file: File): string | null => {
    if (!ALLOWED_FORMATS.includes(file.type)) {
      return 'Unsupported file type. Allowed: PNG, JPG, JPEG, WEBP';
    }
    if (file.size > MAX_FILE_SIZE) {
      return 'File too large. Maximum size is 10MB.';
    }
    if (file.size === 0) {
      return 'File is empty.';
    }
    return null;
  }, []);

  const upload = useCallback(async (file: File): Promise<UploadResult | null> => {
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return null;
    }

    setIsUploading(true);
    setError(null);

    try {
      const result = await api.uploadImage(file);
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Upload failed';
      setError(message);
      return null;
    } finally {
      setIsUploading(false);
    }
  }, [validateFile]);

  return { upload, isUploading, error, validateFile };
}
