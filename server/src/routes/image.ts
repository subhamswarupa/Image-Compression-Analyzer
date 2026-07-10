import { Router } from 'express';
import { upload } from '../middleware/upload';
import {
  uploadImage,
  compress,
  getHistory,
  deleteHistoryItem,
  clearHistory,
  serveFile,
} from '../controllers/imageController';

const router = Router();

router.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

router.post('/upload', upload.single('image'), uploadImage);
router.post('/compress', compress);
router.get('/history', getHistory);
router.delete('/history/:id', deleteHistoryItem);
router.delete('/history', clearHistory);
router.get('/file/:type/:filename', serveFile);

export default router;
