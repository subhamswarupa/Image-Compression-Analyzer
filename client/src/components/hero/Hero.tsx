import { motion } from 'framer-motion';
import { ArrowDown, ImageDown, Zap, BarChart3, Download } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 gradient-mesh" />
      <div className="floating-circle w-[500px] h-[500px] bg-blue-500/20 -top-48 -left-48" />
      <div className="floating-circle w-[400px] h-[400px] bg-purple-500/20 top-1/2 -right-24" style={{ animationDelay: '-7s' }} />
      <div className="floating-circle w-[300px] h-[300px] bg-cyan-500/20 -bottom-24 left-1/3" style={{ animationDelay: '-14s' }} />
      <div className="grid-background absolute inset-0" />

      <div className="container relative py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-sm text-primary mb-8"
          >
            <Zap className="h-3.5 w-3.5" />
            <span>AI-Powered Image Optimization</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight"
          >
            Compress Images with{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500">
              Precision
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Upload, compress, and analyze your images with real-time quality adjustments.
            Compare results side-by-side and download optimized files.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-8"
          >
            {[
              { icon: ImageDown, label: 'Smart Compression' },
              { icon: BarChart3, label: 'Detailed Analytics' },
              { icon: Download, label: 'One-Click Export' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                <item.icon className="h-4 w-4 text-primary" />
                <span>{item.label}</span>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="mt-12"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowDown className="h-6 w-6 mx-auto text-muted-foreground/40" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
