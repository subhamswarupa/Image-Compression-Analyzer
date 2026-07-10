# ImagePress - Image Compression Analyzer

A premium, AI-inspired full-stack image compression and analysis tool. Upload images, compress them in real-time with adjustable quality, compare original vs compressed side-by-side, and download optimized files.

## Features

- **Smart Upload** — Drag-and-drop with real-time validation (PNG, JPG, JPEG, WEBP, max 10MB)
- **Live Compression** — Adjust quality slider (1–100%) with instant preview and recompression
- **Three Comparison Modes** — Side-by-side, interactive Before/After slider, and Split View toggle
- **Metrics Dashboard** — Animated stat cards for file sizes, compression ratio, storage saved, dimensions, quality loss, and speed improvement
- **Circular Gauges** — Compression efficiency ring, quality score indicator, storage saved bar chart, and loading speed chart
- **AI Recommendations** — Smart quality suggestions based on compression results
- **Format Conversion** — Compress to JPEG, PNG, or WEBP
- **History Panel** — View, re-download, or delete past compressions
- **Dark/Light Mode** — Persistent theme toggle with smooth transitions
- **Framer Motion Animations** — Micro-interactions, page transitions, animated counters, floating gradients
- **Glassmorphism UI** — Premium design inspired by Apple, Linear, and Raycast
- **Fully Responsive** — Mobile, tablet, and desktop layouts

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, TypeScript, Vite, Tailwind CSS, shadcn/ui |
| Animations | Framer Motion |
| Icons | Lucide React |
| State | React Query, React Hooks |
| Backend | Node.js, Express, TypeScript |
| Image Processing | Sharp |
| File Upload | Multer |

## Installation

```bash
# Clone the repository
git clone <repo-url>
cd image-compression-analyzer

# Install all dependencies (root + server + client)
npm run install:all

# Start development servers (backend on :3001, frontend on :5173)
npm run dev
```

The client proxies `/api` requests to the server automatically via Vite.

## API Documentation

### `POST /api/upload`
Upload an image file.

- **Content-Type:** `multipart/form-data`
- **Body:** `image` (file)
- **Response:**
```json
{
  "id": "uuid",
  "originalName": "photo.jpg",
  "size": 2048576,
  "width": 1920,
  "height": 1080,
  "format": "jpeg",
  "path": "uploads/uuid.jpg"
}
```

### `POST /api/compress`
Compress an uploaded image.

- **Body:**
```json
{
  "fileId": "uuid-from-upload",
  "quality": 80,
  "format": "jpeg",
  "originalSize": 2048576,
  "originalName": "photo.jpg"
}
```

### `GET /api/history`
Returns array of past compression entries.

### `DELETE /api/history/:id`
Delete a single history entry.

### `DELETE /api/history`
Clear all history.

### `GET /api/file/:type/:filename`
Serve uploaded (`uploads`) or compressed images.

## Project Structure

```
├── client/                  # React frontend
│   ├── src/
│   │   ├── api/             # API client functions
│   │   ├── components/
│   │   │   ├── comparison/  # Side-by-side, slider, split view
│   │   │   ├── compression/ # Quality slider, format selector
│   │   │   ├── history/     # History panel
│   │   │   ├── layout/      # Navbar, Footer
│   │   │   ├── loading/     # Compression spinner
│   │   │   ├── metrics/     # Dashboard, gauges, charts
│   │   │   ├── theme/       # Theme toggle
│   │   │   ├── ui/          # shadcn/ui primitives
│   │   │   └── upload/      # Drag-and-drop upload zone
│   │   ├── hooks/           # useUpload, useCompression, useHistory, useTheme
│   │   └── lib/             # Utils, constants
│   └── ...
├── server/                  # Express backend
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── middleware/       # Multer upload config
│   │   ├── routes/          # API route definitions
│   │   └── utils/           # Sharp compression logic
│   └── ...
└── package.json             # Root orchestrator scripts
```

## Future Improvements

- Batch compression with ZIP download
- Image metadata viewer (EXIF)
- Real-time image histogram visualization
- Social media optimization presets
- AI auto-quality recommendation based on image content
- WebAssembly-based client-side compression
- User authentication with cloud storage

## License

MIT
