import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Star, ShieldCheck, Droplets, Clock, Sparkles, Plus, Minus, ShoppingBag } from 'lucide-react';

export default function ProductQuickViewModal({ product, isOpen, onClose, onShowToast }) {
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [selectedFinish, setSelectedFinish] = useState(product?.finishes?.[0] || 'Matte');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product) {
      setSelectedSizeIndex(0);
      setSelectedFinish(product.finishes?.[0] || 'Matte');
      setQuantity(1);
    }
  }, [product]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!product) return null;

  const currentSizeObj = product.availableSizes?.[selectedSizeIndex] || { size: '4L', price: product.basePrice, coverage: '48 m²' };
  const totalPrice = currentSizeObj.price * quantity;

  const handleAddToQuote = () => {
    onShowToast?.(`Added ${quantity}x ${product.name} (${currentSizeObj.size}, ${selectedFinish}) to your estimate!`);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-paint-charcoal/50 backdrop-blur-sm transition-opacity"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-2xl bg-paint-surface rounded-3xl shadow-floating overflow-hidden z-10 border border-paint-border my-8"
            role="dialog"
            aria-modal="true"
            aria-label={`${product.name} Quick View`}
          >
            {/* Header with badge & close */}
            <div className="bg-paint-surfaceAlt px-6 py-4 border-b border-paint-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-paint-charcoal text-white">
                  {product.badge}
                </span>
                <span className="text-xs text-paint-muted font-medium capitalize">
                  {product.category} Formulation
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-stone-200 text-paint-charcoal transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
              {/* Title & Rating */}
              <div>
                <div className="flex items-center gap-2 text-amber-500 mb-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-paint-charcoal">
                    {product.rating} ({product.reviewsCount} verified trade reviews)
                  </span>
                </div>
                <h2 className="font-display font-extrabold text-2xl text-paint-charcoal">
                  {product.name}
                </h2>
                <p className="text-sm text-paint-muted mt-1 leading-relaxed">
                  {product.tagline}
                </p>
              </div>

              {/* Size Selector */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold text-paint-charcoal">
                  <span>Select Container Size:</span>
                  <span className="text-paint-muted">Covers ~ {currentSizeObj.coverage}</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {product.availableSizes.map((s, idx) => (
                    <button
                      key={s.size}
                      onClick={() => setSelectedSizeIndex(idx)}
                      className={`p-3 rounded-2xl border text-center transition-all ${
                        selectedSizeIndex === idx
                          ? 'border-paint-charcoal bg-white font-bold shadow-sm'
                          : 'border-paint-border bg-paint-surfaceAlt/60 text-paint-muted hover:border-paint-charcoal/40'
                      }`}
                    >
                      <div className="text-sm font-bold text-paint-charcoal">{s.size}</div>
                      <div className="text-xs font-semibold text-paint-terracotta mt-0.5">${s.price}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Finish Options (if applicable) */}
              {product.finishes && product.finishes.length > 1 && (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-paint-charcoal block">Select Finish:</span>
                  <div className="flex flex-wrap gap-2">
                    {product.finishes.map((finish) => (
                      <button
                        key={finish}
                        onClick={() => setSelectedFinish(finish)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                          selectedFinish === finish
                            ? 'bg-paint-charcoal text-white border-paint-charcoal'
                            : 'bg-white text-paint-charcoal border-paint-border hover:border-paint-charcoal/40'
                        }`}
                      >
                        {finish} Sheen
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Specs Grid */}
              <div className="bg-white p-4 rounded-2xl border border-paint-border grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <span className="text-paint-muted block">Coverage</span>
                  <span className="font-bold text-paint-charcoal">{product.specs.coverage}</span>
                </div>
                <div>
                  <span className="text-paint-muted block">VOC Emissions</span>
                  <span className="font-bold text-emerald-600 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 inline" /> {product.specs.voc}
                  </span>
                </div>
                <div>
                  <span className="text-paint-muted block">Touch Dry</span>
                  <span className="font-bold text-paint-charcoal flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 inline" /> {product.specs.touchDry}
                  </span>
                </div>
                <div>
                  <span className="text-paint-muted block">Recoat Window</span>
                  <span className="font-bold text-paint-charcoal">{product.specs.recoatTime}</span>
                </div>
                <div>
                  <span className="text-paint-muted block">Washability</span>
                  <span className="font-bold text-paint-charcoal">{product.specs.washability}</span>
                </div>
                <div>
                  <span className="text-paint-muted block">Performance Warranty</span>
                  <span className="font-bold text-paint-charcoal">{product.specs.warranty}</span>
                </div>
              </div>

              {/* Formulation Features */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-paint-muted">
                  Formulation Highlights
                </span>
                <ul className="space-y-1.5">
                  {product.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-paint-charcoal">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Sticky Action Footer */}
            <div className="bg-paint-surfaceAlt px-6 py-4 border-t border-paint-border flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4 w-full sm:w-auto justify-between">
                <div>
                  <span className="text-[11px] text-paint-muted uppercase font-bold block">
                    Estimated Total
                  </span>
                  <span className="text-2xl font-display font-extrabold text-paint-charcoal">
                    ${totalPrice}
                  </span>
                </div>

                {/* Quantity adjuster */}
                <div className="flex items-center border border-paint-border bg-white rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 text-paint-charcoal hover:bg-stone-100 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-bold font-mono text-paint-charcoal">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 text-paint-charcoal hover:bg-stone-100 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={handleAddToQuote}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-paint-charcoal text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 hover:bg-paint-charcoalSoft transition-colors shadow-sm"
                >
                  <ShoppingBag className="w-4 h-4 text-paint-sunshine" />
                  <span>Add to Project Quote</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
