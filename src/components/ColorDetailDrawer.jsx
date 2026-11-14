import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Copy, Check, Paintbrush, Sparkles, Layers, Info, ArrowRight } from 'lucide-react';
import { getContrastTextColor } from '../utils/contrast';
import { COLORS } from '../data/colors';

export default function ColorDetailDrawer({
  color,
  isOpen,
  onClose,
  isFavorite,
  onToggleFavorite,
  onSelectColor,
  onTestInRoom,
  onShowToast,
}) {
  const [copiedHex, setCopiedHex] = useState(false);
  const [selectedSheen, setSelectedSheen] = useState('Matte');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!color) return null;

  const textColor = getContrastTextColor(color.hex);

  const handleCopy = () => {
    navigator.clipboard.writeText(color.hex);
    setCopiedHex(true);
    onShowToast?.(`Copied ${color.name} (${color.hex}) to clipboard!`, color.hex);
    setTimeout(() => setCopiedHex(false), 2000);
  };

  const handleTestInRoom = () => {
    onTestInRoom?.(color);
    onClose();
  };

  const similarColors = (color.similarIds || [])
    .map((id) => COLORS.find((c) => c.id === id))
    .filter(Boolean);

  const sheenLevels = [
    { name: 'Matte', sheen: '3%', desc: 'Velvety, zero glare, conceals wall imperfections.' },
    { name: 'Eggshell', sheen: '12%', desc: 'Soft sheen, easy wipe-down, ideal for bedrooms & halls.' },
    { name: 'Satin', sheen: '25%', desc: 'Subtle pearlescent glow, durable for kitchens & baths.' },
    { name: 'Gloss', sheen: '70%', desc: 'High reflection, dramatic statement for doors & millwork.' },
  ];

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
            className="fixed inset-0 bg-paint-charcoal/40 backdrop-blur-sm transition-opacity"
            aria-hidden="true"
          />

          {/* Drawer Content */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="relative w-full max-w-lg bg-paint-surface h-full shadow-floating overflow-y-auto z-10 flex flex-col justify-between"
            role="dialog"
            aria-modal="true"
            aria-label={`${color.name} Paint Swatch Details`}
          >
            {/* Top Bar with Close & Favorite */}
            <div className="sticky top-0 bg-paint-surface/90 backdrop-blur-md px-6 py-4 border-b border-paint-border flex items-center justify-between z-20">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-paint-muted">
                  Color Specimen
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-paint-surfaceAlt text-paint-charcoal font-semibold border border-paint-border">
                  {color.code}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onToggleFavorite?.(color)}
                  className="p-2 rounded-full hover:bg-paint-surfaceAlt border border-paint-border transition-colors text-paint-charcoal"
                  aria-label={isFavorite ? 'Remove from palette' : 'Add to palette'}
                >
                  <Heart className={`w-4 h-4 ${isFavorite ? 'fill-paint-terracotta text-paint-terracotta' : ''}`} />
                </button>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-paint-surfaceAlt border border-paint-border transition-colors text-paint-charcoal"
                  aria-label="Close detail drawer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Scrollable Body */}
            <div className="p-6 space-y-6">
              {/* Massive Swatch Hero Block */}
              <div
                className="relative w-full h-56 sm:h-64 rounded-3xl p-6 flex flex-col justify-between shadow-card overflow-hidden"
                style={{ backgroundColor: color.hex }}
              >
                {/* Surface Sheen Reflection Simulator */}
                <div
                  className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
                    selectedSheen === 'Matte'
                      ? 'bg-transparent'
                      : selectedSheen === 'Eggshell'
                      ? 'bg-gradient-to-tr from-transparent via-white/10 to-transparent'
                      : selectedSheen === 'Satin'
                      ? 'bg-gradient-to-tr from-transparent via-white/20 to-white/10'
                      : 'bg-gradient-to-tr from-black/20 via-white/35 to-white/20'
                  }`}
                />

                <div className="relative z-10 flex justify-between items-start">
                  <div
                    className="px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider"
                    style={{
                      color: textColor,
                      backgroundColor: textColor === '#FFFFFF' ? 'rgba(0,0,0,0.35)' : 'rgba(255,255,255,0.7)',
                    }}
                  >
                    HEX: {color.hex}
                  </div>

                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md shadow-xs transition-transform active:scale-95"
                    style={{
                      color: textColor,
                      backgroundColor: textColor === '#FFFFFF' ? 'rgba(0,0,0,0.35)' : 'rgba(255,255,255,0.7)',
                    }}
                  >
                    {copiedHex ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedHex ? 'Copied!' : 'Copy Hex'}</span>
                  </button>
                </div>

                <div className="relative z-10">
                  <h2
                    className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight leading-none"
                    style={{ color: textColor }}
                  >
                    {color.name}
                  </h2>
                  <p
                    className="text-xs font-mono mt-1 opacity-90"
                    style={{ color: textColor }}
                  >
                    RGB({color.rgb}) · LRV {color.lrv}%
                  </p>
                </div>
              </div>

              {/* Description & Light Response */}
              <div className="space-y-3 bg-white p-5 rounded-2xl border border-paint-border shadow-soft">
                <h3 className="font-display font-bold text-base text-paint-charcoal flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-paint-terracotta" />
                  <span>Color Character</span>
                </h3>
                <p className="text-sm text-paint-muted leading-relaxed">
                  {color.description}
                </p>
                <div className="pt-2 border-t border-paint-border/60 grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="font-bold text-paint-charcoal block">Undertone:</span>
                    <span className="text-paint-muted">{color.undertone}</span>
                  </div>
                  <div>
                    <span className="font-bold text-paint-charcoal block">Atmosphere:</span>
                    <span className="text-paint-muted">{color.mood}</span>
                  </div>
                </div>
              </div>

              {/* Light Reflectance Value (LRV) Explainer */}
              <div className="bg-white p-5 rounded-2xl border border-paint-border shadow-soft space-y-2.5">
                <div className="flex items-center justify-between text-xs font-bold text-paint-charcoal">
                  <span>Light Reflectance Value (LRV)</span>
                  <span className="font-mono text-paint-terracotta">{color.lrv}%</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-stone-200 overflow-hidden relative">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-stone-800 via-paint-ochre to-amber-200 transition-all duration-500"
                    style={{ width: `${color.lrv}%` }}
                  />
                </div>
                <p className="text-[11px] text-paint-muted">
                  {color.lrv > 60
                    ? 'High reflectance: Amplifies natural daylight, perfect for brightening north-facing or compact rooms.'
                    : color.lrv > 25
                    ? 'Medium reflectance: Balanced light absorption providing cozy warmth without darkening the space.'
                    : 'Low reflectance: Deep, moody, light-absorbing pigment creating high drama and cocooning comfort.'}
                </p>
              </div>

              {/* Interactive Finish / Sheen Selector */}
              <div className="bg-white p-5 rounded-2xl border border-paint-border shadow-soft space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-sm text-paint-charcoal flex items-center gap-2">
                    <Layers className="w-4 h-4 text-paint-terracotta" />
                    <span>Finish &amp; Sheen Level</span>
                  </h3>
                  <span className="text-xs font-bold text-paint-terracotta">{selectedSheen}</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {sheenLevels.map((sheen) => (
                    <button
                      key={sheen.name}
                      onClick={() => setSelectedSheen(sheen.name)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        selectedSheen === sheen.name
                          ? 'border-paint-charcoal bg-paint-surfaceAlt font-bold shadow-xs'
                          : 'border-paint-border hover:border-paint-charcoal/40 text-paint-muted'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-paint-charcoal">{sheen.name}</span>
                        <span className="text-[10px] font-mono text-paint-muted">{sheen.sheen}</span>
                      </div>
                      <p className="text-[10px] text-paint-muted mt-1 leading-tight line-clamp-2">
                        {sheen.desc}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Similar & Harmonious Hues */}
              {similarColors.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-display font-bold text-sm text-paint-charcoal">
                    Harmonious &amp; Sister Colors
                  </h3>
                  <div className="grid grid-cols-3 gap-2.5">
                    {similarColors.map((sim) => (
                      <button
                        key={sim.id}
                        onClick={() => onSelectColor?.(sim)}
                        className="group p-2 rounded-xl bg-white border border-paint-border hover:border-paint-charcoal/40 text-left transition-all shadow-xs"
                      >
                        <div
                          className="w-full aspect-video rounded-lg shadow-inner mb-2 group-hover:scale-105 transition-transform"
                          style={{ backgroundColor: sim.hex }}
                        />
                        <p className="text-xs font-bold text-paint-charcoal truncate">{sim.name}</p>
                        <p className="text-[10px] font-mono text-paint-muted">{sim.code}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Sticky Action Bar */}
            <div className="sticky bottom-0 bg-paint-surface/95 backdrop-blur-md p-4 sm:p-6 border-t border-paint-border flex flex-col sm:flex-row gap-2.5 z-20">
              <button
                onClick={handleTestInRoom}
                className="flex-1 py-3 px-4 rounded-xl bg-paint-charcoal text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 hover:bg-paint-charcoalSoft transition-colors shadow-sm"
              >
                <Paintbrush className="w-4 h-4 text-paint-sunshine" />
                <span>Test in Room Visualizer</span>
              </button>
              <button
                onClick={() => onToggleFavorite?.(color)}
                className={`py-3 px-4 rounded-xl border font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors ${
                  isFavorite
                    ? 'border-paint-terracotta text-paint-terracotta bg-paint-terracotta/10'
                    : 'border-paint-border bg-white text-paint-charcoal hover:bg-paint-surfaceAlt'
                }`}
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-paint-terracotta' : ''}`} />
                <span>{isFavorite ? 'In Palette' : 'Add to Palette'}</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
