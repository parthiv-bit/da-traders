import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Sparkles, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  return (
    <div className="fixed bottom-6 right-6 z-50 pointer-events-none flex flex-col gap-2 max-w-sm w-full px-4 sm:px-0">
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto bg-paint-charcoal text-white px-4 py-3.5 rounded-2xl shadow-floating flex items-center justify-between gap-3 border border-stone-800"
            role="status"
            aria-live="polite"
          >
            <div className="flex items-center gap-3">
              {toast.swatchColor ? (
                <div
                  className="w-5 h-5 rounded-full ring-2 ring-white/20 shrink-0"
                  style={{ backgroundColor: toast.swatchColor }}
                />
              ) : (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              )}
              <span className="text-sm font-medium text-stone-100">{toast.message}</span>
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className="text-stone-400 hover:text-white p-1 rounded-lg transition-colors"
                aria-label="Dismiss notification"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
