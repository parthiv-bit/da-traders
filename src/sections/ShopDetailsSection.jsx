import React from 'react';
import { motion } from 'framer-motion';
import { 
  Store, 
  Clock, 
  MapPin, 
  Car, 
  Phone, 
  CheckCircle2, 
  Users, 
  Wrench, 
  Palette, 
  Box, 
  Truck, 
  ArrowRight,
  MessageSquare
} from 'lucide-react';

export default function ShopDetailsSection() {
  const verifiedOfferings = [
    {
      title: 'Quality Paint Products & Supplies',
      desc: 'Browse trusted interior and exterior paints, durable enamels, primers, rollers, brushes, and masking materials for any residential or commercial project.',
      icon: Palette,
    },
    {
      title: 'Experienced Painters on Call',
      desc: 'Connect with skilled painters who handle surface prep, patching, uniform coats, and cleanup with punctuality and care.',
      icon: Users,
    },
    {
      title: 'Compressor Equipment Rental',
      desc: 'Rent high-pressure compressor machines and spray guns on flexible daily or project-based terms, fully checked and ready to operate.',
      icon: Wrench,
    },
    {
      title: 'Wall Painting Artists',
      desc: 'Transform featured walls with hand-painted artistic murals, botanical accents, and bespoke wall decor crafted by talented artists.',
      icon: Store,
    },
    {
      title: '3D Wall Art Installations',
      desc: 'Elevate your living hall, dining room, or office with modern three-dimensional wall art and textured architectural panels.',
      icon: Box,
    },
    {
      title: 'Doorstep Delivery Service',
      desc: 'Enjoy convenient delivery of paint cans, primers, and heavy equipment directly to your doorstep or active work site.',
      icon: Truck,
    },
  ];

  const amenities = [
    { icon: Car, label: 'Convenient Parking at Myloor' },
    { icon: Phone, label: 'Direct Phone & WhatsApp Booking' },
    { icon: Clock, label: 'Mon–Sat: 7:30 AM – 9:00 PM' },
    { icon: CheckCircle2, label: 'Sunday by Appointment' },
  ];

  const hours = [
    { day: 'Monday – Saturday', time: '7:30 AM – 9:00 PM', status: 'Open' },
    { day: 'Sunday', time: 'On Request / Appointment', status: 'By Call' },
  ];

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="shop" className="py-20 sm:py-28 bg-paint-surface relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-paint-border text-xs font-bold text-paint-charcoal shadow-2xs">
            <Store className="w-3.5 h-3.5 text-paint-terracotta" />
            <span>Workshop &amp; Location Details</span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-paint-charcoal tracking-tight">
            Step Inside Our Shop
          </h2>

          <p className="text-base sm:text-lg text-paint-muted leading-relaxed">
            Everything you need to know about our physical location, professional services,
            equipment rentals, and visiting hours at DA Traders.
          </p>
        </div>

        {/* Location & Hours Spotlight Card */}
        <div className="bg-white rounded-4xl p-6 sm:p-10 border border-paint-border shadow-card mb-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Open Monday to Saturday: 7:30 AM – 9:00 PM
            </div>

            <h3 className="font-display font-bold text-2xl sm:text-3xl text-paint-charcoal">
              Emmanual Cottage, Myloor
            </h3>

            <p className="text-sm sm:text-base text-paint-muted leading-relaxed">
              Located at Mannamkonum P.O., <strong>DA Traders</strong> is your neighborhood hub
              for quality paints, experienced painters, compressor machine rentals, decorative wall murals,
              3D wall art, and fast delivery service.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-4 text-xs font-semibold text-paint-charcoal">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-paint-terracotta shrink-0" />
                <span>Emmanual Cottage, Myloor, Mannamkonum P.O.</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-paint-terracotta shrink-0" />
                <a href="tel:+919497622571" className="hover:underline">+91 94976 22571</a>
                <span>/</span>
                <a href="tel:+919188452571" className="hover:underline">+91 91884 52571</a>
              </div>
            </div>

            <div className="pt-3 flex flex-wrap gap-2.5">
              {amenities.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-paint-surfaceAlt text-paint-charcoal text-xs font-medium border border-paint-border"
                  >
                    <Icon className="w-3.5 h-3.5 text-paint-terracotta" />
                    <span>{item.label}</span>
                  </span>
                );
              })}
            </div>
          </div>

          {/* Right Hours Schedule Table */}
          <div className="lg:col-span-5 bg-paint-surfaceAlt rounded-3xl p-6 border border-paint-border space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-paint-border">
              <Clock className="w-4 h-4 text-paint-terracotta" />
              <h4 className="font-display font-bold text-sm text-paint-charcoal">
                Weekly Workshop Hours
              </h4>
            </div>

            <div className="space-y-3">
              {hours.map((h, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-2xl bg-white border border-paint-border text-xs sm:text-sm"
                >
                  <span className="font-bold text-paint-charcoal">{h.day}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-paint-muted">{h.time}</span>
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                        h.status === 'Open'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {h.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={scrollToContact}
              className="w-full mt-2 py-3 rounded-xl bg-paint-terracotta hover:bg-[#5E0E00] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
            >
              <span>Get Directions &amp; Contact Us</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* 6 Key Workshop Capabilities */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {verifiedOfferings.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded-3xl bg-white border border-paint-border hover:border-paint-terracotta/40 hover:shadow-card transition-all space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-paint-surfaceAlt border border-paint-border flex items-center justify-center text-paint-terracotta">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-display font-bold text-base text-paint-charcoal">
                    {item.title}
                  </h4>
                  <p className="text-xs text-paint-muted leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
