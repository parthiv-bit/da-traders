import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Star, Sparkles, Paintbrush, ArrowRight, ShieldCheck, Heart, MessageSquare, ChevronDown, Check } from 'lucide-react';

const SIGNATURE_SHADES = [
  { name: 'Venetian Crimson', hex: '#821400', code: 'DT-01' },
  { name: 'Heritage Terracotta', hex: '#BD3218', code: 'DT-02' },
  { name: 'Spiceland Ochre', hex: '#E05A3E', code: 'DT-03' },
  { name: 'Kerala Sage', hex: '#457B63', code: 'DT-04' },
  { name: 'Monsoon Forest', hex: '#264653', code: 'DT-05' },
];

export default function HeroSection({ onOpenReviewModal }) {
  const [activeShade, setActiveShade] = useState(SIGNATURE_SHADES[0]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen bg-[#FBF8F5] pt-28 sm:pt-36 pb-20 sm:pb-28 overflow-hidden flex items-center">

      {/* === Layered Background Glows === */}
      {/* Large crimson glow — top right */}
      <div className="absolute -top-24 -right-36 w-[600px] sm:w-[850px] h-[600px] sm:h-[850px] rounded-full blur-[160px] opacity-25 bg-[#821400] pointer-events-none" />
      {/* Warm amber/orange glow — bottom left */}
      <div className="absolute -bottom-24 -left-36 w-[450px] sm:w-[650px] h-[450px] sm:h-[650px] rounded-full blur-[140px] opacity-20 bg-[#E05A3E] pointer-events-none" />
      {/* Soft golden sun warmth — center */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-[150px] opacity-15 bg-[#F59E0B] pointer-events-none" />

      {/* === Organic Fluid Acrylic Ribbon Wave (Artistic Animated SVG Canvas) === */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none opacity-40">
        <svg
          className="absolute -top-10 -right-20 w-[800px] sm:w-[1200px] h-[600px] sm:h-[900px] text-paint-terracotta/10"
          viewBox="0 0 1000 1000"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d="M150,300 C300,150 650,200 850,400 C1050,600 800,850 600,900 C400,950 100,850 50,650 C0,450 0,450 150,300 Z"
            fill="url(#artistic-paint-gradient-1)"
            animate={{
              d: [
                "M150,300 C300,150 650,200 850,400 C1050,600 800,850 600,900 C400,950 100,850 50,650 C0,450 0,450 150,300 Z",
                "M180,260 C360,180 700,240 820,440 C940,640 760,820 540,880 C320,940 120,780 70,580 C20,380 0,340 180,260 Z",
                "M150,300 C300,150 650,200 850,400 C1050,600 800,850 600,900 C400,950 100,850 50,650 C0,450 0,450 150,300 Z",
              ],
            }}
            transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.path
            d="M200,400 C350,280 620,320 800,500 C980,680 750,850 550,880 C350,910 160,800 110,650 C60,500 50,520 200,400 Z"
            fill="url(#artistic-paint-gradient-2)"
            animate={{
              d: [
                "M200,400 C350,280 620,320 800,500 C980,680 750,850 550,880 C350,910 160,800 110,650 C60,500 50,520 200,400 Z",
                "M240,360 C400,300 660,360 760,540 C860,720 710,810 500,850 C290,890 180,750 130,590 C80,430 80,420 240,360 Z",
                "M200,400 C350,280 620,320 800,500 C980,680 750,850 550,880 C350,910 160,800 110,650 C60,500 50,520 200,400 Z",
              ],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />
          <defs>
            <linearGradient id="artistic-paint-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#821400" stopOpacity="0.22" />
              <stop offset="60%" stopColor="#E05A3E" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.04" />
            </linearGradient>
            <linearGradient id="artistic-paint-gradient-2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#457B63" stopOpacity="0.14" />
              <stop offset="70%" stopColor="#821400" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#FAF6F5" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* === Floating Fine-Crafted SVG Elements (Studio Aesthetics) === */}
      {/* Floating Paint Palette Emblem */}
      <motion.div
        className="absolute top-[18%] right-[10%] hidden md:flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-white/80 backdrop-blur-md border border-paint-border/80 shadow-card select-none pointer-events-none"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
        aria-hidden="true"
      >
        <svg className="w-5 h-5 text-paint-terracotta" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="13.5" cy="6.5" r=".5" fill="#821400" />
          <circle cx="17.5" cy="10.5" r=".5" fill="#E05A3E" />
          <circle cx="8.5" cy="7.5" r=".5" fill="#457B63" />
          <circle cx="6.5" cy="12.5" r=".5" fill="#F59E0B" />
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
        </svg>
        <span className="text-[11px] font-bold text-paint-charcoal">Artisan Mineral Tints</span>
      </motion.div>

      {/* Floating Brushstroke Capsule */}
      <motion.div
        className="absolute top-[28%] left-[4%] hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-white/80 backdrop-blur-md border border-paint-border/80 shadow-card select-none pointer-events-none"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: [0, -12, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
        aria-hidden="true"
      >
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-[11px] font-bold text-paint-charcoal">Hand-Crafted Precision</span>
      </motion.div>

      {/* Floating Starlight Icon */}
      <motion.div
        className="absolute bottom-[22%] left-[12%] hidden sm:block text-paint-terracotta/40 select-none pointer-events-none"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.15, 1], rotate: [0, 90, 180] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
        </svg>
      </motion.div>

      {/* === Main Hero Grid === */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left: Atelier Welcome Headline & Details */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left">

            {/* Pill Tag */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-paint-border shadow-2xs"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-paint-terracotta animate-pulse" />
              <span className="text-xs font-bold text-paint-charcoal uppercase tracking-wider">
                Independent Paint Atelier &amp; Tinting Studio
              </span>
            </motion.div>

            {/* Main Headline — dramatic stagger with spring */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, type: 'spring', stiffness: 70, damping: 18 }}
              className="font-display font-extrabold text-4xl sm:text-6xl xl:text-8xl text-paint-charcoal tracking-tight leading-[1.06]"
            >
              Where color is crafted with{' '}
              <span className="relative inline-block text-paint-terracotta">
                passion &amp; care.
                
                {/* Authentic Paint Stroke Ribbon Highlight (Organic Vector Underline) */}
                <svg
                  className="absolute -bottom-2 sm:-bottom-3 left-0 w-full h-3 sm:h-4 text-paint-terracotta/25 overflow-visible pointer-events-none"
                  viewBox="0 0 300 16"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <motion.path
                    d="M 2 12 Q 75 3, 150 10 T 298 7"
                    stroke="currentColor"
                    strokeWidth="8"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.1, delay: 0.7, ease: 'easeOut' }}
                  />
                  <motion.path
                    d="M 10 14 Q 85 5, 160 11 T 290 9"
                    stroke="#821400"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.0, delay: 0.85, ease: 'easeOut' }}
                  />
                </svg>
              </span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-paint-muted max-w-xl font-normal leading-relaxed"
            >
              Welcome to <strong>DA Traders</strong>. From quality paints and
              expert painters to creative wall art and professional equipment rentals, we bring
              everything you need to transform your space under one roof.
            </motion.p>

            {/* Quick Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2"
            >
              {/* Primary CTA with animated shimmer */}
              <button
                onClick={() => scrollTo('services')}
                className="relative px-7 py-4 rounded-2xl text-white text-sm font-bold tracking-wide flex items-center justify-center gap-2.5 shadow-card hover:shadow-card-hover transition-all overflow-hidden group hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  background: 'linear-gradient(135deg, #821400 0%, #B01E00 60%, #821400 100%)',
                }}
              >
                {/* Shimmer sweep effect */}
                <span
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.22) 50%, transparent 65%)',
                    animation: 'shimmer-sweep 2.8s ease-in-out infinite',
                  }}
                />
                <span className="relative z-10">Our Services</span>
                <ArrowRight className="relative z-10 w-4 h-4 text-paint-sunshine group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => scrollTo('shop')}
                className="px-6 py-4 rounded-2xl bg-white hover:bg-paint-surfaceAlt text-paint-charcoal border border-paint-border text-sm font-bold tracking-wide flex items-center justify-center gap-2 transition-all shadow-xs hover:border-paint-terracotta/40"
              >
                <span>About The Shop</span>
              </button>

              <button
                onClick={() => scrollTo('reviews')}
                className="px-5 py-4 rounded-2xl bg-paint-surfaceAlt hover:bg-white text-paint-charcoal border border-paint-border/80 text-sm font-bold tracking-wide flex items-center justify-center gap-2 transition-all shadow-2xs hover:border-paint-terracotta/40"
              >
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>Customer Reviews</span>
              </button>
            </motion.div>

            {/* Studio Badges Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="pt-6 border-t border-paint-border grid grid-cols-3 gap-4"
            >
              <div className="flex items-center gap-2 text-xs font-semibold text-paint-charcoal">
                <div className="w-7 h-7 rounded-lg bg-paint-surfaceAlt flex items-center justify-center border border-paint-border/60 shrink-0">
                  <Paintbrush className="w-3.5 h-3.5 text-paint-terracotta" />
                </div>
                <span>Experienced Painters</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-paint-charcoal">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center border border-emerald-200/60 shrink-0">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                </div>
                <span>Equipment Rental</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-paint-charcoal">
                <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center border border-amber-200/60 shrink-0">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                </div>
                <span>3D Wall Art &amp; Murals</span>
              </div>
            </motion.div>

          </div>

          {/* Right: Studio Highlight Visual Card with Interactive Artisan Swatches */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="bg-white rounded-4xl p-6 sm:p-8 shadow-card hover:shadow-card-hover border border-paint-border relative overflow-hidden space-y-6 transition-shadow duration-500"
            >
              {/* Studio Header Card */}
              <div className="flex items-center justify-between pb-4 border-b border-paint-border">
                <div className="flex items-center gap-3">
                  <div className="flex flex-col items-center shrink-0">
                    <img src="/logo-mark.png" alt="DA Traders" className="w-9 h-9 object-contain drop-shadow-sm" />
                    <span className="font-bauhaus text-[8px] sm:text-[9px] tracking-wider text-paint-charcoal uppercase -mt-0.5">DYNAMIC</span>
                  </div>
                  <div>
                    <h3 className="font-display font-extrabold text-base text-paint-charcoal">
                      DA Traders
                    </h3>
                    <p className="text-xs text-paint-muted">Paints, Services &amp; Rentals</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  Open Mon–Sat
                </span>
              </div>

              {/* Interactive Artisan Tint Rail (Real Paint Studio Visual Feature) */}
              <div className="p-4 rounded-3xl bg-gradient-to-br from-paint-surfaceAlt to-white border border-paint-border space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-paint-charcoal uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: activeShade.hex }} />
                    <span>Signature Mineral Palette</span>
                  </span>
                  <span className="text-[10px] font-mono font-bold text-paint-muted bg-white px-2 py-0.5 rounded-md border border-paint-border">
                    {activeShade.code} · {activeShade.hex}
                  </span>
                </div>

                <div className="grid grid-cols-5 gap-2">
                  {SIGNATURE_SHADES.map((shade) => {
                    const isSelected = activeShade.hex === shade.hex;
                    return (
                      <button
                        key={shade.code}
                        type="button"
                        onClick={() => setActiveShade(shade)}
                        className={`group relative h-12 rounded-2xl transition-all duration-300 flex items-center justify-center ${
                          isSelected ? 'scale-105 shadow-md ring-2 ring-paint-charcoal ring-offset-2' : 'hover:scale-105 opacity-90 hover:opacity-100'
                        }`}
                        style={{ backgroundColor: shade.hex }}
                        title={`${shade.name} (${shade.hex})`}
                      >
                        {isSelected && <Check className="w-4 h-4 text-white drop-shadow" />}
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between text-[11px] pt-1">
                  <span className="font-bold text-paint-charcoal">{activeShade.name}</span>
                  <span className="text-paint-muted">Custom formulated in workshop</span>
                </div>
              </div>

              {/* Atelier Highlights / Experience — staggered entrance */}
              <div className="space-y-3.5 text-xs">

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="p-3.5 rounded-2xl bg-paint-surfaceAlt border border-paint-border flex items-start gap-3 hover:border-paint-terracotta/40 transition-colors"
                >
                  <div className="w-8 h-8 rounded-xl bg-white border border-paint-border flex items-center justify-center text-paint-terracotta shrink-0 mt-0.5 shadow-2xs">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-paint-charcoal block text-sm">
                      Emmanual Cottage
                    </span>
                    <span className="text-paint-muted">
                      Myloor, Mannamkonum P.O.
                    </span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="p-3.5 rounded-2xl bg-paint-surfaceAlt border border-paint-border flex items-start gap-3 hover:border-paint-terracotta/40 transition-colors"
                >
                  <div className="w-8 h-8 rounded-xl bg-white border border-paint-border flex items-center justify-center text-paint-ochre shrink-0 mt-0.5 shadow-2xs">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-paint-charcoal block text-sm">
                      Workshop Hours
                    </span>
                    <span className="text-paint-muted block">
                      Mon – Sat: 7:30 AM – 9:00 PM
                    </span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="p-3.5 rounded-2xl bg-paint-surfaceAlt border border-paint-border flex items-start gap-3 hover:border-paint-terracotta/40 transition-colors"
                >
                  <div className="w-8 h-8 rounded-xl bg-white border border-paint-border flex items-center justify-center text-paint-terracotta shrink-0 mt-0.5 shadow-2xs">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-paint-charcoal block text-sm">
                      In-Store Experience
                    </span>
                    <span className="text-paint-muted">
                      Walk-in color matching, free take-home swatches, and direct booking for skilled painters.
                    </span>
                  </div>
                </motion.div>

              </div>

              {/* Bottom Callout */}
              <div className="pt-2 flex items-center justify-between text-xs border-t border-paint-border">
                <span className="text-paint-muted">Have an upcoming project?</span>
                <button
                  onClick={() => scrollTo('contact')}
                  className="font-bold text-paint-terracotta hover:underline flex items-center gap-1 group"
                >
                  <span>Get in touch with our team</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>

            </motion.div>
          </div>

        </div>
      </div>

      {/* === Scroll Indicator === */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer z-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        onClick={() => scrollTo('about')}
        aria-label="Scroll down"
      >
        <span className="text-[10px] uppercase tracking-widest text-paint-muted font-semibold">Explore Workshop</span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-5 h-5 text-paint-terracotta" />
        </motion.div>
      </motion.div>

      {/* Shimmer keyframes injected via style tag */}
      <style>{`
        @keyframes shimmer-sweep {
          0%   { transform: translateX(-100%); }
          60%  { transform: translateX(200%); }
          100% { transform: translateX(200%); }
        }
      `}</style>

    </section>
  );
}
