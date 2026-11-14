import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote, ShieldCheck, Sparkles } from 'lucide-react';
import { TESTIMONIALS } from '../data/testimonials';

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const activeReview = TESTIMONIALS[currentIndex];

  return (
    <section className="py-20 sm:py-28 bg-paint-surface relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-paint-surfaceAlt border border-paint-border text-xs font-bold text-paint-charcoal shadow-xs">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>Trusted By Over 14,000 Homes &amp; Studios</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-paint-charcoal tracking-tight">
            Loved By Architects &amp; Homeowners
          </h2>
          <p className="text-sm sm:text-base text-paint-muted">
            Read verified feedback from design professionals and home renovators 
            who trust DA Traders for their most demanding spaces.
          </p>
        </div>

        {/* Carousel Container */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative bg-white rounded-4xl p-8 sm:p-12 lg:p-16 border border-paint-border shadow-card min-h-[380px] flex flex-col justify-between"
        >
          {/* Subtle Watermark Quote Mark */}
          <div className="absolute top-8 right-8 text-paint-surfaceAlt pointer-events-none select-none">
            <Quote className="w-24 h-24 stroke-[1] opacity-40 text-paint-charcoal" />
          </div>

          {/* Testimonial Content with smooth transitions */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeReview.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="space-y-6 relative z-10"
            >
              {/* Star Rating & Verified Badge */}
              <div className="flex items-center gap-3">
                <div className="flex items-center">
                  {[...Array(activeReview.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                {activeReview.verified && (
                  <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verified Project Specifier</span>
                  </span>
                )}
              </div>

              {/* Quote Body */}
              <blockquote className="font-display font-bold text-xl sm:text-2xl lg:text-3xl text-paint-charcoal leading-snug">
                "{activeReview.quote}"
              </blockquote>

              {/* Author & Colors Spec */}
              <div className="pt-4 border-t border-paint-border/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <img
                    src={activeReview.avatar}
                    alt={activeReview.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-paint-terracotta/40 shadow-xs"
                    loading="lazy"
                  />
                  <div>
                    <h4 className="font-display font-extrabold text-base text-paint-charcoal">
                      {activeReview.name}
                    </h4>
                    <p className="text-xs text-paint-muted">
                      {activeReview.role} · {activeReview.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[11px] font-bold text-paint-muted">Specified:</span>
                  {activeReview.colorsUsed.map((col, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-paint-surfaceAlt text-paint-charcoal border border-paint-border"
                    >
                      {col}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Navigation Arrows & Dots */}
          <div className="pt-8 flex items-center justify-between border-t border-paint-border/40 mt-6 relative z-10">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    currentIndex === i ? 'w-8 bg-paint-charcoal' : 'w-2.5 bg-stone-300 hover:bg-stone-400'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="p-3 rounded-full border border-paint-border bg-paint-surfaceAlt hover:bg-stone-200 text-paint-charcoal transition-colors focus-visible:ring-2 focus-visible:ring-paint-terracotta"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-3 rounded-full border border-paint-border bg-paint-surfaceAlt hover:bg-stone-200 text-paint-charcoal transition-colors focus-visible:ring-2 focus-visible:ring-paint-terracotta"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
