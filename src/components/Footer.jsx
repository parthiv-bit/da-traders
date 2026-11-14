import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Truck, 
  MapPin, 
  Clock, 
  Phone, 
  Star, 
  MessageSquare, 
  Mail, 
  Loader2,
  Lock,
  AlertCircle
} from 'lucide-react';
import { subscribeNewsletter, validateSubscriber } from '../services/newsletterService';

export default function Footer({ onShowToast, onNavigateToAdmin }) {
  const [email, setEmail] = useState('');
  const [consentGiven, setConsentGiven] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [subResult, setSubResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setErrorMsg(null);

    const validation = validateSubscriber({ email, consentGiven });
    if (!validation.isValid) {
      setErrorMsg(validation.errors.email || validation.errors.consent);
      return;
    }

    setSubmitting(true);
    try {
      const res = await subscribeNewsletter({ email, consentGiven });
      setSubResult(res.message);
      onShowToast?.(res.message, '#821400');
      setEmail('');
    } catch (err) {
      setErrorMsg(err.message || 'Unable to subscribe right now.');
    } finally {
      setSubmitting(false);
    }
  };

  const scrollTo = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#0D0705] text-white pt-16 sm:pt-20 pb-12 overflow-hidden">
      {/* Subtle gradient mesh background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-paint-terracotta/5 blur-[120px]" />
        <div className="absolute top-1/2 -left-32 w-80 h-80 rounded-full bg-[#821400]/8 blur-[100px]" />
        <div className="absolute bottom-0 right-1/3 w-64 h-64 rounded-full bg-paint-terracotta/4 blur-[90px]" />
      </div>

      {/* Gradient separator at top */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-paint-terracotta/40 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Newsletter Band */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="border-l-4 border-paint-terracotta rounded-3xl"
        >
          <div className="bg-stone-900/80 backdrop-blur-sm rounded-3xl p-6 sm:p-10 border border-stone-800/60 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-2 max-w-xl text-center lg:text-left">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-paint-sunshine">
                DA Traders Updates
              </span>
              <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
                Painting tips &amp; workshop service updates
              </h3>
              <p className="text-xs sm:text-sm text-stone-400">
                Receive updates on seasonal color advice, painter availability, and equipment rentals
                directly from DA Traders.
              </p>
            </div>

            <div className="w-full lg:w-auto min-w-[320px]">
              {subResult ? (
                <div className="flex items-center gap-2 text-emerald-400 bg-stone-800 px-4 py-3 rounded-2xl border border-emerald-500/30 text-xs font-bold justify-center">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{subResult}</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} noValidate className="space-y-2.5">
                  <div className="flex gap-2">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errorMsg) setErrorMsg(null);
                      }}
                      placeholder="Enter your email address..."
                      className="px-4 py-3 rounded-xl bg-white/5 text-xs sm:text-sm text-white placeholder:text-stone-500 border border-stone-700 focus:outline-none focus:border-paint-terracotta focus:ring-2 focus:ring-paint-terracotta/40 flex-1 transition-all duration-200"
                    />
                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-5 py-3 rounded-xl bg-paint-terracotta hover:bg-[#5E0E00] text-white text-xs font-bold flex items-center gap-1.5 transition-all duration-200 shrink-0 shadow-sm disabled:opacity-60 hover:shadow-lg hover:shadow-paint-terracotta/20"
                    >
                      {submitting ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Subscribe</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-stone-400">
                    <input
                      type="checkbox"
                      id="newsletter-consent"
                      checked={consentGiven}
                      onChange={(e) => setConsentGiven(e.target.checked)}
                      className="rounded text-paint-terracotta focus:ring-0 cursor-pointer"
                    />
                    <label htmlFor="newsletter-consent" className="cursor-pointer">
                      I agree to receive occasional updates. Unsubscribe anytime.
                    </label>
                  </div>

                  {errorMsg && (
                    <p className="text-[11px] text-red-400 font-medium flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errorMsg}
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>
        </motion.div>

        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 pt-4">
          
          {/* Brand Col */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-2 space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-center shrink-0 relative">
                {/* Subtle glow behind logo */}
                <div className="absolute inset-0 rounded-full bg-paint-terracotta/20 blur-xl scale-150 pointer-events-none" />
                <img
                  src="/logo-mark.png"
                  alt="DA Traders Logo"
                  className="relative w-10 h-10 object-contain drop-shadow"
                />
                <span className="font-bauhaus text-[9px] sm:text-[10px] tracking-wider text-stone-300 uppercase -mt-0.5">DYNAMIC</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-extrabold text-2xl tracking-tight text-white">
                  DA Traders
                </span>
                <span className="text-[11px] text-stone-400 font-medium">
                  Paint Shop &amp; Painting Services
                </span>
              </div>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Your one-stop destination for quality paints, experienced painters, compressor equipment rental, creative wall murals, and 3D wall art.
            </p>
            
            {/* Direct Contact Action Badges */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://wa.me/919497622571"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-stone-800/80 hover:bg-emerald-800/60 hover:text-emerald-300 flex items-center justify-center text-emerald-400 transition-all duration-200 hover:scale-110 hover:shadow-lg"
                aria-label="WhatsApp DA Traders"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
              <a
                href="mailto:donaemmanual347@gmail.com"
                className="w-9 h-9 rounded-full bg-stone-800/80 hover:bg-paint-terracotta/20 hover:text-paint-terracotta flex items-center justify-center text-stone-300 transition-all duration-200 hover:scale-110 hover:shadow-lg"
                aria-label="Email DA Traders"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href="tel:+919497622571"
                className="w-9 h-9 rounded-full bg-stone-800/80 hover:bg-paint-terracotta/20 hover:text-paint-terracotta flex items-center justify-center text-stone-300 transition-all duration-200 hover:scale-110 hover:shadow-lg"
                aria-label="Call DA Traders"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href="#reviews"
                onClick={(e) => scrollTo(e, 'reviews')}
                className="px-3 py-1.5 rounded-full bg-stone-800/80 hover:bg-amber-500/10 hover:border-amber-400/40 border border-transparent text-[11px] font-bold text-amber-400 flex items-center gap-1.5 transition-all duration-200 hover:scale-105"
              >
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>Customer Reviews</span>
              </a>
            </div>
          </motion.div>

          {/* Services Column */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-3"
          >
            <h4 className="font-display font-bold text-sm text-stone-200">Our Services</h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <a href="#services" onClick={(e) => scrollTo(e, 'services')} className="hover:text-paint-terracotta transition-colors duration-200">
                  Experienced Painters
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => scrollTo(e, 'services')} className="hover:text-paint-terracotta transition-colors duration-200">
                  Equipment Rental
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => scrollTo(e, 'services')} className="hover:text-paint-terracotta transition-colors duration-200">
                  Wall Painting Artists
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => scrollTo(e, 'services')} className="hover:text-paint-terracotta transition-colors duration-200">
                  3D Wall Art
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => scrollTo(e, 'services')} className="hover:text-paint-terracotta transition-colors duration-200">
                  Delivery Service
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Quick Jump Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-3"
          >
            <h4 className="font-display font-bold text-sm text-stone-200">Quick Links</h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <a href="#about" onClick={(e) => scrollTo(e, 'about')} className="hover:text-paint-terracotta transition-colors duration-200">
                  About DA Traders
                </a>
              </li>
              <li>
                <a href="#shop" onClick={(e) => scrollTo(e, 'shop')} className="hover:text-paint-terracotta transition-colors duration-200">
                  Shop Details &amp; Hours
                </a>
              </li>
              <li>
                <a href="#reviews" onClick={(e) => scrollTo(e, 'reviews')} className="hover:text-paint-terracotta transition-colors duration-200">
                  Customer Reviews
                </a>
              </li>
              <li>
                <a href="#reviews" onClick={(e) => scrollTo(e, 'reviews')} className="hover:text-paint-terracotta transition-colors duration-200">
                  Write a Review
                </a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => scrollTo(e, 'contact')} className="hover:text-paint-terracotta transition-colors duration-200">
                  Visit &amp; Contact Us
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Workshop & Visit Info */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-3"
          >
            <h4 className="font-display font-bold text-sm text-stone-200">Contact DA Traders</h4>
            <div className="space-y-2.5 text-xs text-stone-400">
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-paint-terracotta shrink-0 mt-0.5" />
                <span>Emmanual Cottage, Myloor, Mannamkonum P.O.</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-paint-terracotta shrink-0" />
                <a href="tel:+919497622571" className="hover:text-paint-terracotta transition-colors duration-200">
                  +91 94976 22571
                </a>
                <span>/</span>
                <a href="tel:+919188452571" className="hover:text-paint-terracotta transition-colors duration-200">
                  +91 91884 52571
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-stone-300 shrink-0" />
                <span>Mon – Sat: 7:30 AM – 9:00 PM</span>
              </p>
              <div className="pt-1">
                <a
                  href="https://share.google/JdaeUc0MMDbNtK5hT"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-paint-sunshine hover:underline font-semibold inline-flex items-center gap-1 transition-colors duration-200"
                >
                  <MapPin className="w-3 h-3" />
                  <span>Google Maps Directions</span>
                </a>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Bottom Bar: Copyright & Admin Portal Link */}
        <div className="pt-8 relative flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          {/* Gradient separator instead of plain border */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-stone-700/60 to-transparent" />

          <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-start">
            <span className="flex items-center gap-1.5 text-stone-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Reliable Professional Craftsmanship</span>
            </span>
            <span className="flex items-center gap-1.5 text-stone-400">
              <Truck className="w-4 h-4 text-paint-sunshine" />
              <span>Doorstep Paint &amp; Equipment Delivery</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <p>© {new Date().getFullYear()} DA Traders. All rights reserved.</p>
            <button
              onClick={() => onNavigateToAdmin?.()}
              className="text-stone-500 hover:text-stone-300 transition-colors inline-flex items-center gap-1 text-[11px]"
              title="Admin Portal Login"
            >
              <Lock className="w-3 h-3" />
              <span>Staff Login</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
