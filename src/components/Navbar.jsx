import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Star, Phone, MapPin, Store, MessageSquare, Clock } from 'lucide-react';

export default function Navbar({ onOpenReviewModal }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['hero', 'about', 'services', 'shop', 'reviews', 'contact'];
      const scrollPos = window.scrollY + 220;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About Us', href: '#about', id: 'about' },
    { label: 'Services', href: '#services', id: 'services' },
    { label: 'The Shop', href: '#shop', id: 'shop' },
    { label: 'Reviews', href: '#reviews', id: 'reviews' },
    { label: 'Contact & Hours', href: '#contact', id: 'contact' },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-xl py-3.5 shadow-lg border-b border-paint-border/50'
            : 'bg-transparent py-5 sm:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

          {/* Logo / Brand Mark — scale on hover */}
          <a
            href="#hero"
            onClick={(e) => handleLinkClick(e, '#hero')}
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-paint-terracotta rounded-lg"
            aria-label="DA Traders Home"
          >
            <div className="flex flex-col items-center transition-transform duration-300 group-hover:scale-110 shrink-0">
              <img
                src="/logo-mark.png"
                alt="DA Traders Logo"
                className="w-9 h-9 sm:w-10 sm:h-10 object-contain drop-shadow-sm"
              />
              <span className="font-bauhaus text-[9px] sm:text-[10px] tracking-wider text-paint-charcoal uppercase -mt-0.5">DYNAMIC</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-lg sm:text-xl text-paint-charcoal tracking-tight flex items-center gap-1.5">
                DA Traders
              </span>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-paint-muted">
                Bringing life to every space
              </span>
            </div>
          </a>

          {/* Desktop Nav Links — frosted glass pill container */}
          <nav className="hidden md:flex items-center gap-1 bg-white/70 backdrop-blur-sm p-1.5 rounded-full border border-paint-border shadow-2xs">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? 'text-white font-bold'
                      : 'text-paint-muted hover:text-paint-charcoal hover:bg-white/60'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 bg-paint-terracotta rounded-full shadow-xs -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            <a
              href="#reviews"
              onClick={(e) => {
                handleLinkClick(e, '#reviews');
                onOpenReviewModal?.();
              }}
              className="px-3.5 py-2 rounded-xl bg-paint-surfaceAlt hover:bg-white text-paint-charcoal border border-paint-border text-xs font-bold flex items-center gap-1.5 transition-all shadow-2xs"
            >
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>Leave a Review</span>
            </a>

            {/* Primary "Visit Shop" with gradient background */}
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              className="px-4 py-2 rounded-xl text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm hover:opacity-90 hover:shadow-md"
              style={{
                background: 'linear-gradient(135deg, #821400 0%, #B01E00 100%)',
              }}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Visit Shop</span>
            </a>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            <a
              href="#reviews"
              onClick={(e) => handleLinkClick(e, '#reviews')}
              className="p-2 rounded-xl bg-paint-surfaceAlt border border-paint-border text-paint-charcoal text-xs font-bold flex items-center gap-1"
              aria-label="Reviews"
            >
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-white border border-paint-border text-paint-charcoal hover:bg-paint-surfaceAlt focus:outline-none focus:ring-2 focus:ring-paint-terracotta"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu — full-width with header area */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="fixed inset-x-0 top-0 z-30 bg-white/95 backdrop-blur-xl border-b border-paint-border shadow-floating md:hidden"
          >
            {/* Mobile Menu Header */}
            <div
              className="px-5 pt-20 pb-5"
              style={{
                background: 'linear-gradient(135deg, #821400 0%, #B01E00 100%)',
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-display font-extrabold text-xl text-white tracking-tight block">
                    DA Traders
                  </span>
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-white/70">
                    Bringing life to every space
                  </span>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold border border-white/30">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Open Now
                </span>
              </div>
            </div>

            {/* Nav Links */}
            <div className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={`px-4 py-3.5 rounded-2xl text-sm font-bold transition-colors flex items-center justify-between ${
                      isActive
                        ? 'bg-paint-terracotta text-white'
                        : 'text-paint-charcoal hover:bg-paint-surfaceAlt'
                    }`}
                  >
                    <span>{link.label}</span>
                    <span className={`text-xs ${isActive ? 'text-white/70' : 'text-paint-muted'}`}>→</span>
                  </a>
                );
              })}
            </div>

            {/* CTA Buttons */}
            <div className="px-4 pb-6 pt-2 border-t border-paint-border grid grid-cols-2 gap-2">
              <a
                href="#reviews"
                onClick={(e) => {
                  handleLinkClick(e, '#reviews');
                  onOpenReviewModal?.();
                }}
                className="py-3 px-3 rounded-2xl bg-paint-surfaceAlt text-paint-charcoal text-xs font-bold text-center flex items-center justify-center gap-1.5"
              >
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>Write Review</span>
              </a>
              <a
                href="#contact"
                onClick={(e) => handleLinkClick(e, '#contact')}
                className="py-3 px-3 rounded-2xl text-white text-xs font-bold text-center flex items-center justify-center gap-1.5 hover:opacity-90 transition-opacity"
                style={{
                  background: 'linear-gradient(135deg, #821400 0%, #B01E00 100%)',
                }}
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Visit &amp; Contact</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
