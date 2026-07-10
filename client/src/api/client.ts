import { API_BASE } from '@/lib/constants';
import type { UploadResult, CompressionResult, HistoryEntry } from '@/types';

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || `HTTP ${response.status}`);
  }
  return response.json();
}

export const api = {
  async uploadImage(file: File): Promise<UploadResult> {
    const formData = new FormData();
    formData.append('image', file);
    const response = await fetch(`${API_BASE}/upload`, {
      method: 'POST',
      body: formData,
    });
    return handleResponse<UploadResult>(response);
  },

  async compressImage(params: {
    fileId: string;
    quality: number;
    format: string;
    originalSize: number;
    originalName: string;
  }): Promise<{
    compressedFileName: string;
    compressedPath: string;
    result: CompressionResult;
    historyEntry: HistoryEntry;
  }> {
    const response = await fetch(`${API_BASE}/compress`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    return handleResponse(response);
  },

  async getHistory(): Promise<HistoryEntry[]> {
    const response = await fetch(`${API_BASE}/history`);
    return handleResponse<HistoryEntry[]>(response);
  },

  async deleteHistoryItem(id: string): Promise<void> {
    const response = await fetch(`${API_BASE}/history/${id}`, {
      method: 'DELETE',
    });
    await handleResponse(response);
  },

  async clearHistory(): Promise<void> {
    const response = await fetch(`${API_BASE}/history`, {
      method: 'DELETE',
    });
    await handleResponse(response);
  },

  getFileUrl(type: 'uploads' | 'compressed', filename: string): string {
    return `${API_BASE}/file/${type}/${filename}`;
  },

  async downloadCompressed(compressedPath: string, filename: string): Promise<void> {
    const response = await fetch(compressedPath);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },
};
