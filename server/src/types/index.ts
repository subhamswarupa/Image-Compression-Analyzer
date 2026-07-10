export interface CompressionResult {
  originalSize: number;
  compressedSize: number;
  compressionRatio: number;
  savedStorage: number;
  savedPercentage: number;
  width: number;
  height: number;
  quality: number;
  format: string;
  estimatedQualityLoss: number;
  loadingSpeedImprovement: number;
}

export interface HistoryEntry {
  id: string;
  originalName: string;
  originalSize: number;
  compressedSize: number;
  compressionRatio: number;
  savedPercentage: number;
  width: number;
  height: number;
  quality: number;
  format: string;
  originalPath: string;
  compressedPath: string;
  date: string;
}

export interface UploadResult {
  id: string;
  originalName: string;
  size: number;
  width: number;
  height: number;
  format: string;
  path: string;
}
