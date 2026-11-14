import React, { useState } from 'react';
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
    <footer className="bg-paint-charcoal text-white pt-16 sm:pt-20 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Newsletter Band */}
        <div className="bg-stone-900 rounded-3xl p-6 sm:p-10 border border-stone-800 flex flex-col lg:flex-row items-center justify-between gap-8">
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
                    className="px-4 py-3 rounded-xl bg-stone-800 text-xs sm:text-sm text-white placeholder:text-stone-500 border border-stone-700 focus:outline-none focus:border-paint-terracotta flex-1"
                  />
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-5 py-3 rounded-xl bg-paint-terracotta hover:bg-[#5E0E00] text-white text-xs font-bold flex items-center gap-1.5 transition-colors shrink-0 shadow-sm disabled:opacity-60"
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

        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 pt-4">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-center shrink-0">
                <img
                  src="/logo-mark.png"
                  alt="DA Traders Logo"
                  className="w-10 h-10 object-contain drop-shadow"
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
                className="w-9 h-9 rounded-full bg-stone-800 hover:bg-emerald-800/60 flex items-center justify-center text-emerald-400 transition-colors"
                aria-label="WhatsApp DA Traders"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
              <a
                href="mailto:donaemmanual347@gmail.com"
                className="w-9 h-9 rounded-full bg-stone-800 hover:bg-stone-700 flex items-center justify-center text-stone-300 transition-colors"
                aria-label="Email DA Traders"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href="tel:+919497622571"
                className="w-9 h-9 rounded-full bg-stone-800 hover:bg-stone-700 flex items-center justify-center text-stone-300 transition-colors"
                aria-label="Call DA Traders"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href="#reviews"
                onClick={(e) => scrollTo(e, 'reviews')}
                className="px-3 py-1.5 rounded-full bg-stone-800 hover:bg-stone-700 text-[11px] font-bold text-amber-400 flex items-center gap-1.5 transition-colors"
              >
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>Customer Reviews</span>
              </a>
            </div>
          </div>

          {/* Services Column */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-sm text-stone-200">Our Services</h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <a href="#services" onClick={(e) => scrollTo(e, 'services')} className="hover:text-white transition-colors">
                  Experienced Painters
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => scrollTo(e, 'services')} className="hover:text-white transition-colors">
                  Equipment Rental
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => scrollTo(e, 'services')} className="hover:text-white transition-colors">
                  Wall Painting Artists
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => scrollTo(e, 'services')} className="hover:text-white transition-colors">
                  3D Wall Art
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => scrollTo(e, 'services')} className="hover:text-white transition-colors">
                  Delivery Service
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Jump Navigation */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-sm text-stone-200">Quick Links</h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <a href="#about" onClick={(e) => scrollTo(e, 'about')} className="hover:text-white transition-colors">
                  About DA Traders
                </a>
              </li>
              <li>
                <a href="#shop" onClick={(e) => scrollTo(e, 'shop')} className="hover:text-white transition-colors">
                  Shop Details &amp; Hours
                </a>
              </li>
              <li>
                <a href="#reviews" onClick={(e) => scrollTo(e, 'reviews')} className="hover:text-white transition-colors">
                  Customer Reviews
                </a>
              </li>
              <li>
                <a href="#reviews" onClick={(e) => scrollTo(e, 'reviews')} className="hover:text-white transition-colors">
                  Write a Review
                </a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => scrollTo(e, 'contact')} className="hover:text-white transition-colors">
                  Visit &amp; Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Workshop & Visit Info */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-sm text-stone-200">Contact DA Traders</h4>
            <div className="space-y-2.5 text-xs text-stone-400">
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-paint-terracotta shrink-0 mt-0.5" />
                <span>Emmanual Cottage, Myloor, Mannamkonum P.O.</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-paint-terracotta shrink-0" />
                <a href="tel:+919497622571" className="hover:text-white transition-colors">
                  +91 94976 22571
                </a>
                <span>/</span>
                <a href="tel:+919188452571" className="hover:text-white transition-colors">
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
                  className="text-paint-sunshine hover:underline font-semibold inline-flex items-center gap-1"
                >
                  <MapPin className="w-3 h-3" />
                  <span>Google Maps Directions</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Admin Portal Link */}
        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
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
