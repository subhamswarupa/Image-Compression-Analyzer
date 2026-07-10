import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { CompressionResult } from '../types';

const COMPRESSED_DIR = path.join(__dirname, '../../compressed');

export async function compressImage(
  inputPath: string,
  quality: number,
  format: string,
  originalSize: number,
  width: number,
  height: number
): Promise<{ outputPath: string; result: CompressionResult }> {
  const ext = format === 'jpeg' ? 'jpg' : format;
  const outputFileName = `compressed-${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const outputPath = path.join(COMPRESSED_DIR, outputFileName);

  let sharpInstance = sharp(inputPath);

  if (format === 'jpeg' || format === 'jpg') {
    sharpInstance = sharpInstance.jpeg({ quality });
  } else if (format === 'png') {
    sharpInstance = sharpInstance.png({ quality, compressionLevel: Math.round((100 - quality) / 10) });
  } else if (format === 'webp') {
    sharpInstance = sharpInstance.webp({ quality });
  }

  await sharpInstance.toFile(outputPath);

  const stats = fs.statSync(outputPath);
  const compressedSize = stats.size;

  const compressionRatio = compressedSize > 0 ? +(originalSize / compressedSize).toFixed(2) : 1;
  const savedStorage = originalSize - compressedSize;
  const savedPercentage = originalSize > 0 ? +((savedStorage / originalSize) * 100).toFixed(1) : 0;

  const qualityRatio = quality / 100;
  const estimatedQualityLoss = quality < 100 ? +((1 - qualityRatio) * (1 - compressionRatio / 5) * 100).toFixed(1) : 0;

  const loadingSpeedImprovement = originalSize > 0
    ? +((1 - compressedSize / originalSize) * 100).toFixed(1)
    : 0;

  return {
    outputPath,
    result: {
      originalSize,
      compressedSize,
      compressionRatio,
      savedStorage,
      savedPercentage,
      width,
      height,
      quality,
      format,
      estimatedQualityLoss: Math.max(0, Math.min(100, estimatedQualityLoss)),
      loadingSpeedImprovement: Math.max(0, loadingSpeedImprovement),
    },
  };
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(i > 0 ? 1 : 0)} ${units[i]}`;
}
