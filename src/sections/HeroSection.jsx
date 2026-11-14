import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Star, Sparkles, Paintbrush, ArrowRight, ShieldCheck, Heart, MessageSquare } from 'lucide-react';

export default function HeroSection({ onOpenReviewModal }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-[90vh] pt-28 sm:pt-36 pb-16 sm:pb-24 overflow-hidden flex items-center">
      {/* Ambient background glow in #821400 */}
      <div className="absolute top-1/4 -right-40 w-96 sm:w-[540px] h-96 sm:h-[540px] rounded-full blur-[130px] opacity-25 bg-[#821400] pointer-events-none" />
      <div className="absolute top-1/2 -left-40 w-72 sm:w-[440px] h-72 sm:h-[440px] rounded-full blur-[110px] bg-red-950/15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left: Atelier Welcome Headline & Details */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left">
            
            {/* Pill Tag */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-paint-border shadow-2xs"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-paint-terracotta animate-pulse" />
              <span className="text-xs font-bold text-paint-charcoal uppercase tracking-wider">
                Independent Paint Atelier &amp; Tinting Studio
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display font-extrabold text-4xl sm:text-6xl xl:text-7xl text-paint-charcoal tracking-tight leading-[1.08]"
            >
              Where color is crafted with{' '}
              <span className="relative inline-block text-paint-terracotta">
                passion &amp; care.
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
              <button
                onClick={() => scrollTo('services')}
                className="px-7 py-4 rounded-2xl bg-paint-terracotta hover:bg-[#5E0E00] text-white text-sm font-bold tracking-wide flex items-center justify-center gap-2.5 shadow-card hover:shadow-card-hover transition-all"
              >
                <span>Our Services</span>
                <ArrowRight className="w-4 h-4 text-paint-sunshine" />
              </button>

              <button
                onClick={() => scrollTo('shop')}
                className="px-6 py-4 rounded-2xl bg-white hover:bg-paint-surfaceAlt text-paint-charcoal border border-paint-border text-sm font-bold tracking-wide flex items-center justify-center gap-2 transition-all shadow-xs"
              >
                <span>About The Shop</span>
              </button>

              <button
                onClick={() => scrollTo('reviews')}
                className="px-5 py-4 rounded-2xl bg-paint-surfaceAlt hover:bg-white text-paint-charcoal border border-paint-border/80 text-sm font-bold tracking-wide flex items-center justify-center gap-2 transition-all shadow-2xs"
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
                <Paintbrush className="w-4 h-4 text-paint-terracotta shrink-0" />
                <span>Experienced Painters</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-paint-charcoal">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Equipment Rental</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-paint-charcoal">
                <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />
                <span>3D Wall Art &amp; Murals</span>
              </div>
            </motion.div>

          </div>

          {/* Right: Studio Highlight Visual Card */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="bg-white rounded-4xl p-6 sm:p-8 shadow-card border border-paint-border relative overflow-hidden space-y-6"
            >
              {/* Studio Header Card */}
              <div className="flex items-center justify-between pb-4 border-b border-paint-border">
                <div className="flex items-center gap-3">
                  <div className="flex flex-col items-center shrink-0">
                    <img src="/logo-mark.png" alt="DA Traders" className="w-8 h-8 object-contain" />
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

              {/* Atelier Highlights / Experience */}
              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-2xl bg-paint-surfaceAlt border border-paint-border flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-paint-terracotta shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-paint-charcoal block text-sm">
                      Emmanual Cottage
                    </span>
                    <span className="text-paint-muted">
                      Myloor, Mannamkonum P.O.
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-paint-surfaceAlt border border-paint-border flex items-start gap-3">
                  <Clock className="w-5 h-5 text-paint-ochre shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-paint-charcoal block text-sm">
                      Working Hours
                    </span>
                    <span className="text-paint-muted block">
                      Mon – Sat: 7:30 AM – 9:00 PM
                    </span>
                    <span className="text-paint-muted block">
                      Sunday: Available on Call
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-paint-surfaceAlt border border-paint-border flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-paint-terracotta shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-paint-charcoal block text-sm">
                      In-Store Experience
                    </span>
                    <span className="text-paint-muted">
                      Walk-in color matching, free take-home swatch cards, and espresso while your formula tints.
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Callout */}
              <div className="pt-2 flex items-center justify-between text-xs border-t border-paint-border">
                <span className="text-paint-muted">Have an upcoming project?</span>
                <button
                  onClick={() => scrollTo('contact')}
                  className="font-bold text-paint-terracotta hover:underline flex items-center gap-1"
                >
                  <span>Get in touch with our team</span>
                  <span>→</span>
                </button>
              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
