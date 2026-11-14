import React, { useState } from 'react';
import { MessageSquare, Phone, X } from 'lucide-react';

export default function FloatingAction() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40">
      {isOpen ? (
        <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-paint-border max-w-xs animate-scale-in flex flex-col">
          {/* Popup header with gradient */}
          <div className="bg-gradient-to-r from-[#821400] to-[#B01E00] px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold text-white">DA Traders Support</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/70 hover:text-white p-1 rounded-lg transition-colors"
              aria-label="Close support modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-5 flex flex-col gap-3">
            <p className="text-xs text-paint-muted">
              Need experienced painters, compressor equipment rental, or doorstep paint delivery? Reach us directly:
            </p>

            <div className="flex flex-col gap-2 pt-1">
              <a
                href="https://wa.me/919497622571?text=Hello%20DA%20Traders,%20I%20need%20information%20about%20your%20services"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp (+91 94976 22571)</span>
              </a>
              <a
                href="tel:+919497622571"
                className="w-full py-2.5 px-3 rounded-xl bg-paint-surfaceAlt hover:bg-stone-200 text-paint-charcoal text-xs font-bold flex items-center justify-center gap-2 transition-colors border border-paint-border"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Primary (+91 94976 22571)</span>
              </a>
              <a
                href="tel:+919188452571"
                className="w-full py-2.5 px-3 rounded-xl bg-paint-surfaceAlt hover:bg-stone-200 text-paint-charcoal text-xs font-bold flex items-center justify-center gap-2 transition-colors border border-paint-border"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Secondary (+91 91884 52571)</span>
              </a>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2.5 bg-gradient-to-r from-[#821400] to-[#B01E00] text-white pl-4 pr-5 py-3 rounded-full shadow-floating hover:shadow-card-hover transition-all hover:scale-105 focus-visible:outline-none ring-2 ring-[#821400]/30 hover:ring-[#821400]/50"
          aria-label="Open DA Traders direct contact options"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-bold tracking-wide">Quick Contact</span>
          <MessageSquare className="w-4 h-4 text-paint-sunshine group-hover:rotate-12 transition-transform" />
        </button>
      )}
    </div>
  );
}
