import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import { compressImage } from '../utils/compression';
import { HistoryEntry } from '../types';

const HISTORY_FILE = path.join(__dirname, '../../history.json');
const UPLOADS_DIR = path.join(__dirname, '../../uploads');

function loadHistory(): HistoryEntry[] {
  try {
    if (fs.existsSync(HISTORY_FILE)) {
      return JSON.parse(fs.readFileSync(HISTORY_FILE, 'utf-8'));
    }
  } catch { /* empty */ }
  return [];
}

function saveHistory(history: HistoryEntry[]): void {
  fs.writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2));
}

export async function uploadImage(req: Request, res: Response) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const metadata = await sharp(req.file.path).metadata();
    const width = metadata.width || 0;
    const height = metadata.height || 0;
    const format = metadata.format || 'png';

    const result = {
      id: path.parse(req.file.filename).name,
      originalName: req.file.originalname,
      size: req.file.size,
      width,
      height,
      format,
      path: req.file.path,
    };

    return res.json(result);
  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({ error: 'Failed to process image' });
  }
}

export async function compress(req: Request, res: Response) {
  try {
    const { fileId, quality, format } = req.body;

    if (!fileId || quality === undefined || !format) {
      return res.status(400).json({ error: 'Missing required fields: fileId, quality, format' });
    }

    const q = Math.max(1, Math.min(100, Number(quality)));

    const files = fs.readdirSync(UPLOADS_DIR);
    const file = files.find(f => f.startsWith(fileId));
    if (!file) {
      return res.status(404).json({ error: 'Original file not found' });
    }

    const inputPath = path.join(UPLOADS_DIR, file);
    const metadata = await sharp(inputPath).metadata();

    const { outputPath, result } = await compressImage(
      inputPath,
      q,
      format,
      req.body.originalSize || fs.statSync(inputPath).size,
      metadata.width || 0,
      metadata.height || 0
    );

    const compressedFileName = path.basename(outputPath);
    const historyEntry: HistoryEntry = {
      id: uuidv4(),
      originalName: req.body.originalName || file,
      originalSize: result.originalSize,
      compressedSize: result.compressedSize,
      compressionRatio: result.compressionRatio,
      savedPercentage: result.savedPercentage,
      width: result.width,
      height: result.height,
      quality: result.quality,
      format: result.format,
      originalPath: inputPath,
      compressedPath: outputPath,
      date: new Date().toISOString(),
    };

    const history = loadHistory();
    history.unshift(historyEntry);
    saveHistory(history);

    return res.json({
      compressedFileName,
      compressedPath: outputPath,
      result,
      historyEntry,
    });
  } catch (error) {
    console.error('Compression error:', error);
    return res.status(500).json({ error: 'Compression failed' });
  }
}

export function getHistory(_req: Request, res: Response) {
  try {
    const history = loadHistory();
    return res.json(history);
  } catch (error) {
    console.error('History error:', error);
    return res.status(500).json({ error: 'Failed to load history' });
  }
}

export function deleteHistoryItem(req: Request, res: Response) {
  try {
    const { id } = req.params;
    let history = loadHistory();
    const entry = history.find(h => h.id === id);
    if (!entry) {
      return res.status(404).json({ error: 'History entry not found' });
    }

    history = history.filter(h => h.id !== id);
    saveHistory(history);
    return res.json({ success: true });
  } catch (error) {
    console.error('Delete error:', error);
    return res.status(500).json({ error: 'Failed to delete history entry' });
  }
}

export function clearHistory(_req: Request, res: Response) {
  try {
    saveHistory([]);
    return res.json({ success: true });
  } catch (error) {
    console.error('Clear history error:', error);
    return res.status(500).json({ error: 'Failed to clear history' });
  }
}

export function serveFile(req: Request, res: Response) {
  const { type, filename } = req.params;
  const baseDir = type === 'uploads' ? UPLOADS_DIR : path.join(__dirname, '../../compressed');
  const filepath = path.join(baseDir, filename);

  if (!fs.existsSync(filepath)) {
    return res.status(404).json({ error: 'File not found' });
  }

  return res.sendFile(filepath);
}
