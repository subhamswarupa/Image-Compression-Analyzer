import { motion, AnimatePresence } from 'framer-motion';
import { History, Trash2, Download, RotateCcw, Clock, HardDrive, Gauge, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useHistory } from '@/hooks/useHistory';
import { api } from '@/api/client';
import { formatFileSize, getDownloadFilename } from '@/lib/utils';

export function HistoryPanel() {
  const { history, isLoading, deleteItem, clearHistory, isDeleting, isClearing } = useHistory();

  if (isLoading) {
    return (
      <div className="rounded-2xl border bg-card p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 w-32 bg-muted rounded" />
          <div className="h-20 bg-muted rounded-xl" />
          <div className="h-20 bg-muted rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl border bg-card"
    >
      <div className="p-5 flex items-center justify-between border-b border-border">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
            <History className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-semibold">History</h3>
            <p className="text-xs text-muted-foreground">{history.length} compressions</p>
          </div>
        </div>
        {history.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => clearHistory()}
            disabled={isClearing}
            className="text-xs text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="h-3.5 w-3.5 mr-1" />
            Clear all
          </Button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="p-8 text-center">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-muted mx-auto mb-3">
            <Clock className="h-6 w-6 text-muted-foreground/40" />
          </div>
          <p className="text-sm text-muted-foreground">No compression history yet</p>
        </div>
      ) : (
        <ScrollArea className="h-[400px]">
          <div className="p-3 space-y-2">
            <AnimatePresence initial={false}>
              {history.map((entry, index) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="group relative p-3 rounded-xl border border-border hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted shrink-0 overflow-hidden">
                      <img
                        src={api.getFileUrl('compressed', entry.compressedPath.split(/[\\/]/).pop()!)}
                        alt=""
                        className="w-full h-full object-cover"
                        loading="lazy"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium truncate">{entry.originalName}</p>
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary">{entry.quality}%</span>
                      </div>
                      <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1 text-[11px] text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <HardDrive className="h-3 w-3" />
                          {formatFileSize(entry.originalSize)} → {formatFileSize(entry.compressedSize)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Gauge className="h-3 w-3" />
                          -{entry.savedPercentage}%
                        </span>
                      </div>
                      <p className="text-[10px] text-muted-foreground/50 mt-0.5">
                        {new Date(entry.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>

                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => {
                          const filename = getDownloadFilename(entry.originalName, entry.quality, entry.format);
                          api.downloadCompressed(api.getFileUrl('compressed', entry.compressedPath.split(/[\\/]/).pop()!), filename);
                        }}
                        title="Download again"
                      >
                        <Download className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:text-destructive"
                        onClick={() => deleteItem(entry.id)}
                        disabled={isDeleting}
                        title="Delete"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </ScrollArea>
      )}
    </motion.div>
  );
}
