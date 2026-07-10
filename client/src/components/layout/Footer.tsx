import { ImageDown } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/50">
      <div className="container py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <ImageDown className="h-4 w-4" />
          <span>ImagePress &mdash; Compression Analyzer</span>
        </div>
        <p className="text-xs text-muted-foreground">
          Built with React, Express, Sharp &middot; &copy; {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
