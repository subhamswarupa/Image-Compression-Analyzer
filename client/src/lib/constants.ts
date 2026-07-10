export const API_BASE = '/api';
export const MAX_FILE_SIZE = 10 * 1024 * 1024;
export const ALLOWED_FORMATS = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
export const ALLOWED_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.webp'];
export const DEFAULT_QUALITY = 80;
export const MIN_QUALITY = 1;
export const MAX_QUALITY = 100;

export const FORMAT_OPTIONS = [
  { value: 'jpeg', label: 'JPEG' },
  { value: 'png', label: 'PNG' },
  { value: 'webp', label: 'WEBP' },
] as const;

export const COMPARISON_MODES = [
  { value: 'side-by-side', label: 'Side by Side', icon: 'Columns2' },
  { value: 'slider', label: 'Before / After', icon: 'MoveHorizontal' },
  { value: 'split', label: 'Split View', icon: 'SplitSquareHorizontal' },
] as const;
