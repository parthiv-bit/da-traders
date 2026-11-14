import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Star, ShieldCheck, Eye, ShoppingBag, Sparkles, Filter, Check } from 'lucide-react';
import { PRODUCTS, PRODUCT_CATEGORIES } from '../data/products';

export default function ProductsSection({ onOpenQuickView, onShowToast }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [finishFilter, setFinishFilter] = useState('all');

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((prod) => {
      if (activeCategory !== 'all' && prod.category !== activeCategory) return false;
      if (finishFilter !== 'all' && !prod.finishes.includes(finishFilter)) return false;
      return true;
    });
  }, [activeCategory, finishFilter]);

  const handleQuickAdd = (product) => {
    const size = product.availableSizes[0]?.size || '4L';
    onShowToast?.(`Added 1x ${product.name} (${size}) to your project quote!`);
  };

  return (
    <section id="products" className="py-20 sm:py-28 bg-paint-surface relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-paint-surfaceAlt border border-paint-border text-xs font-bold text-paint-charcoal">
              <Sparkles className="w-3.5 h-3.5 text-paint-terracotta" />
              <span>Architectural Formulation Catalog</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-paint-charcoal tracking-tight">
              High-Performance Paints &amp; Tools
            </h2>
            <p className="text-sm sm:text-base text-paint-muted leading-relaxed">
              Every formula is lab-engineered with microscopic binder particles for maximum adhesion, 
              zero splatter, and class-1 scrub resistance. Guaranteed to last up to 15 years.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold font-mono px-3 py-1.5 rounded-full bg-white border border-paint-border text-paint-charcoal shadow-xs">
              {filteredProducts.length} Formulations Available
            </span>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 custom-scrollbar">
          {PRODUCT_CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 sm:px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-paint-charcoal text-white shadow-sm'
                    : 'bg-white text-paint-charcoal border border-paint-border hover:bg-paint-surfaceAlt'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Secondary Sheen Filter Toolbar */}
        <div className="mt-3 flex items-center justify-between flex-wrap gap-3 pb-6">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-paint-muted">Filter Sheen:</span>
            {['all', 'Matte', 'Satin', 'Gloss'].map((finish) => (
              <button
                key={finish}
                onClick={() => setFinishFilter(finish)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                  finishFilter === finish
                    ? 'bg-paint-terracotta text-white font-bold'
                    : 'bg-white text-paint-muted border border-paint-border hover:text-paint-charcoal'
                }`}
              >
                {finish === 'all' ? 'All Sheens' : finish}
              </button>
            ))}
          </div>

          <span className="text-xs text-paint-muted hidden sm:inline">
            Free shipping on trade orders over $150
          </span>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-4xl p-6 border border-paint-border shadow-soft hover:shadow-card-hover transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Badge and Category Header */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-paint-surfaceAlt text-paint-charcoal border border-paint-border">
                    {product.badge}
                  </span>
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-bold text-paint-charcoal">
                      {product.rating} ({product.reviewsCount})
                    </span>
                  </div>
                </div>

                {/* Stylized Paint Can Graphic Visual */}
                <div className="relative w-full h-44 rounded-3xl bg-paint-surfaceAlt/80 border border-paint-border/80 p-4 flex items-center justify-center overflow-hidden mb-5 group-hover:bg-paint-surfaceAlt transition-colors">
                  {/* Paint drop splash background */}
                  <div
                    className="absolute w-32 h-32 rounded-full opacity-20 blur-xl transition-all group-hover:scale-125"
                    style={{ backgroundColor: product.accentColor }}
                  />

                  {/* Stylized Paint Tin SVG */}
                  <svg width="120" height="130" viewBox="0 0 120 130" fill="none" className="relative z-10 drop-shadow-md">
                    {/* Metal Handle Wire */}
                    <path d="M20 50 C20 10 100 10 100 50" stroke="#71717A" strokeWidth="3" fill="none" />
                    {/* Can Top Rim */}
                    <ellipse cx="60" cy="35" rx="45" ry="12" fill="#D4D4D8" stroke="#71717A" strokeWidth="2" />
                    <ellipse cx="60" cy="35" rx="36" ry="8" fill={product.accentColor} />
                    {/* Can Cylinder Body */}
                    <path d="M15 35 L15 110 C15 120 105 120 105 110 L105 35 Z" fill="#FFFFFF" stroke="#52525B" strokeWidth="2" />
                    <ellipse cx="60" cy="110" rx="45" ry="10" fill="#E4E4E7" />
                    {/* Branded Label Ribbon */}
                    <rect x="16" y="52" width="88" height="42" fill="#1A1817" />
                    <rect x="22" y="60" width="16" height="4" fill={product.accentColor} />
                    <rect x="22" y="68" width="60" height="3" fill="#FAF7F2" opacity="0.9" />
                    <rect x="22" y="75" width="40" height="3" fill="#FAF7F2" opacity="0.6" />
                    {/* Finish Dot */}
                    <circle cx="88" cy="72" r="5" fill={product.accentColor} />
                  </svg>

                  {/* Quick-View Overlay Trigger */}
                  <button
                    onClick={() => onOpenQuickView(product)}
                    className="absolute inset-0 bg-paint-charcoal/30 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-bold"
                  >
                    <div className="bg-white text-paint-charcoal px-4 py-2 rounded-full shadow-floating flex items-center gap-2 hover:scale-105 transition-transform">
                      <Eye className="w-3.5 h-3.5" />
                      <span>Quick View Specs</span>
                    </div>
                  </button>
                </div>

                {/* Product Info */}
                <h3 className="font-display font-extrabold text-xl text-paint-charcoal group-hover:text-paint-terracotta transition-colors">
                  {product.name}
                </h3>
                <p className="text-xs text-paint-muted mt-1.5 leading-relaxed line-clamp-2">
                  {product.tagline}
                </p>

                {/* Specs Highlights */}
                <div className="mt-4 pt-3 border-t border-paint-border/60 grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-paint-muted block">Coverage</span>
                    <span className="font-bold text-paint-charcoal">{product.specs.coverage}</span>
                  </div>
                  <div>
                    <span className="text-paint-muted block">VOC Level</span>
                    <span className="font-bold text-emerald-600">{product.specs.voc}</span>
                  </div>
                </div>

                {/* Finishes Available Badges */}
                <div className="mt-3 flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] text-paint-muted font-bold">Finishes:</span>
                  {product.finishes.map((f) => (
                    <span
                      key={f}
                      className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-paint-surfaceAlt text-paint-charcoal border border-paint-border"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              {/* Price & Action Row */}
              <div className="mt-6 pt-4 border-t border-paint-border flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-paint-muted block">From</span>
                  <span className="font-display font-extrabold text-2xl text-paint-charcoal">
                    ${product.basePrice}
                  </span>
                  <span className="text-[11px] text-paint-muted ml-1">/ 1L</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenQuickView(product)}
                    className="p-2.5 rounded-xl border border-paint-border hover:bg-paint-surfaceAlt text-paint-charcoal transition-colors"
                    aria-label={`View full details for ${product.name}`}
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleQuickAdd(product)}
                    className="px-4 py-2.5 rounded-xl bg-paint-charcoal hover:bg-paint-charcoalSoft text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-paint-sunshine" />
                    <span>Quote</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
