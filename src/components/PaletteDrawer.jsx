import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, Trash2, Paintbrush, Sparkles, Send } from 'lucide-react';
import { getContrastTextColor } from '../utils/contrast';

export default function PaletteDrawer({
  isOpen,
  onClose,
  palette = [],
  onRemoveColor,
  onClearPalette,
  onApplyToVisualizer,
  onShowToast,
  onOrderSwatches,
}) {
  const [copiedAll, setCopiedAll] = React.useState(false);

  const handleCopyAll = () => {
    if (palette.length === 0) return;
    const text = palette.map((c) => `${c.name} (${c.code}): ${c.hex}`).join('\n');
    navigator.clipboard.writeText(text);
    setCopiedAll(true);
    onShowToast?.(`Copied ${palette.length} color specs to clipboard!`);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-paint-charcoal/40 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Drawer container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="relative w-full max-w-md bg-paint-surface h-full shadow-floating overflow-y-auto z-10 flex flex-col justify-between"
            role="dialog"
            aria-modal="true"
            aria-label="My Curated Color Palette"
          >
            {/* Header */}
            <div className="p-6 border-b border-paint-border flex items-center justify-between bg-paint-surface/90 backdrop-blur-md sticky top-0 z-10">
              <div>
                <h2 className="font-display font-extrabold text-xl text-paint-charcoal flex items-center gap-2">
                  <span>My Color Palette</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-paint-terracotta text-white font-mono">
                    {palette.length}
                  </span>
                </h2>
                <p className="text-xs text-paint-muted mt-0.5">
                  Pin colors to preview your room harmony
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-paint-surfaceAlt border border-paint-border transition-colors text-paint-charcoal"
                aria-label="Close palette"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-6 flex-1">
              {palette.length === 0 ? (
                <div className="h-64 flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-paint-border rounded-3xl">
                  <div className="w-12 h-12 rounded-full bg-paint-surfaceAlt flex items-center justify-center text-paint-muted mb-3">
                    <Sparkles className="w-6 h-6 text-paint-ochre" />
                  </div>
                  <h3 className="font-display font-bold text-paint-charcoal text-base">
                    Your palette is empty
                  </h3>
                  <p className="text-xs text-paint-muted mt-1 max-w-xs">
                    Click the heart icon on any paint swatch in the Color Explorer to pin your dream shades here.
                  </p>
                </div>
              ) : (
                <>
                  {/* Harmonious Color Ribbon Preview */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-bold text-paint-charcoal">
                      <span>Combined Harmony Strip:</span>
                      <button
                        onClick={handleCopyAll}
                        className="text-paint-terracotta hover:underline flex items-center gap-1"
                      >
                        {copiedAll ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedAll ? 'Copied All' : 'Copy All Hex'}</span>
                      </button>
                    </div>

                    <div className="w-full h-14 rounded-2xl overflow-hidden flex shadow-soft border border-paint-border">
                      {palette.map((color) => (
                        <div
                          key={color.id}
                          className="h-full flex-1 transition-all hover:flex-[1.5]"
                          style={{ backgroundColor: color.hex }}
                          title={`${color.name} (${color.hex})`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Individual Swatch Items */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs font-bold text-paint-muted uppercase">
                      <span>Selected Swatches</span>
                      <button
                        onClick={onClearPalette}
                        className="text-stone-400 hover:text-rose-500 transition-colors flex items-center gap-1 text-[11px]"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Clear All</span>
                      </button>
                    </div>

                    {palette.map((color) => {
                      const textColor = getContrastTextColor(color.hex);
                      return (
                        <div
                          key={color.id}
                          className="p-3 bg-white rounded-2xl border border-paint-border flex items-center justify-between gap-3 shadow-xs"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className="w-12 h-12 rounded-xl shadow-inner border border-black/10 shrink-0"
                              style={{ backgroundColor: color.hex }}
                            />
                            <div>
                              <h4 className="font-display font-bold text-sm text-paint-charcoal">
                                {color.name}
                              </h4>
                              <div className="flex items-center gap-2 text-xs font-mono text-paint-muted">
                                <span>{color.code}</span>
                                <span>•</span>
                                <span>{color.hex}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => {
                                onApplyToVisualizer?.(color);
                                onClose();
                              }}
                              title="Send to Room Visualizer"
                              className="p-2 rounded-xl hover:bg-paint-surfaceAlt text-paint-charcoal transition-colors"
                              aria-label={`Test ${color.name} in visualizer`}
                            >
                              <Paintbrush className="w-4 h-4 text-paint-terracotta" />
                            </button>
                            <button
                              onClick={() => onRemoveColor(color.id)}
                              title="Remove from palette"
                              className="p-2 rounded-xl hover:bg-rose-50 text-stone-400 hover:text-rose-600 transition-colors"
                              aria-label={`Remove ${color.name}`}
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>

            {/* Bottom Actions */}
            {palette.length > 0 && (
              <div className="p-6 border-t border-paint-border bg-paint-surfaceAlt space-y-2">
                <button
                  onClick={() => {
                    onOrderSwatches?.(palette);
                    onClose();
                  }}
                  className="w-full py-3.5 px-4 rounded-xl bg-paint-charcoal text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 hover:bg-paint-charcoalSoft transition-colors shadow-sm"
                >
                  <Send className="w-4 h-4 text-paint-sunshine" />
                  <span>Request 40cm Sample Cards Box</span>
                </button>
                <p className="text-[11px] text-paint-muted text-center">
                  Free 48h courier delivery on up to 5 large peel-and-stick color cards.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
