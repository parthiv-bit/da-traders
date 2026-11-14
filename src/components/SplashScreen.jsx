import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './SplashScreen.css';

const WORDMARK_LETTERS = ['D', 'Y', 'N', 'A', 'M', 'I', 'C'];

export default function SplashScreen({ onComplete }) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      onComplete?.();
      return;
    }

    // Elegant, smooth choreography
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 3100);

    const finishTimer = setTimeout(() => {
      onComplete?.();
    }, 3700);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(finishTimer);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setIsExiting(true);
    setTimeout(() => {
      onComplete?.();
    }, 300);
  };

  return (
    <motion.aside
      className="splash-container"
      initial={{ opacity: 1 }}
      animate={{
        opacity: isExiting ? 0 : 1,
        scale: isExiting ? 1.03 : 1,
      }}
      transition={{
        duration: isExiting ? 0.6 : 0.4,
        ease: [0.4, 0, 0.2, 1],
      }}
      aria-label="Dynamic Brand Introduction"
      aria-live="polite"
    >
      {/* 1. Authentic Grainy Atmospheric Gradient Canvas */}
      <div className="splash-bg-glow" />
      <div className="splash-grain-overlay" />
      <div className="splash-vignette" />

      {/* 2. Main Brand Reveal Stage */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 max-w-lg w-full">
        
        {/* Dynamic Logo Mark Reveal (clean, no shimmer sweeps) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: -8 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          transition={{
            duration: 1.0,
            delay: 0.3,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="splash-logo-container mb-4 sm:mb-6"
        >
          <div className="relative w-36 h-36 sm:w-48 sm:h-48 md:w-56 md:h-56 flex items-center justify-center">
            <img
              src="/logo-mark.png"
              alt="Dynamic Logo"
              className="w-full h-full object-contain drop-shadow-[0_16px_36px_rgba(0,0,0,0.7)]"
              loading="eager"
              decoding="sync"
            />
          </div>
        </motion.div>

        {/* Dynamic Bauhaus 93 Uppercase Wordmark */}
        <div className="overflow-hidden py-1 px-4 flex flex-col items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.07,
                  delayChildren: 0.95,
                },
              },
            }}
            className="splash-wordmark-bauhaus text-4xl sm:text-5xl md:text-6xl select-none"
          >
            {WORDMARK_LETTERS.map((letter, index) => (
              <span key={index} className="inline-block overflow-hidden py-1 px-0.5 sm:px-1">
                <motion.span
                  variants={{
                    hidden: {
                      y: '115%',
                      opacity: 0,
                      scale: 0.9,
                    },
                    visible: {
                      y: '0%',
                      opacity: 1,
                      scale: 1,
                      transition: {
                        duration: 0.6,
                        ease: [0.16, 1, 0.3, 1],
                      },
                    },
                  }}
                  className="inline-block"
                >
                  {letter}
                </motion.span>
              </span>
            ))}
          </motion.div>
        </div>

        {/* Tagline: Bringing Life to Every Space */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.95, y: 0 }}
          transition={{ duration: 0.85, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="splash-tagline text-base sm:text-lg md:text-xl text-center mt-2.5 sm:mt-3"
        >
          Bringing Life to Every Space
        </motion.p>

      </div>

      {/* 3. Subtle Skip Button */}
      <motion.button
        type="button"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.5 }}
        onClick={handleSkip}
        className="splash-skip-btn"
        aria-label="Skip introductory animation"
      >
        Skip Intro →
      </motion.button>
    </motion.aside>
  );
}
