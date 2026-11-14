import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Wrench, 
  Palette, 
  Box, 
  Truck, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Paintbrush
} from 'lucide-react';

export default function ServicesSection({ onSelectServiceForInquiry }) {
  const scrollToContact = (serviceName) => {
    onSelectServiceForInquiry?.(serviceName);
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const services = [
    {
      id: 'experienced-painters',
      title: 'Experienced Painters',
      subtitle: 'Skilled professionals for residential and commercial painting',
      description:
        'Our vetted, insured painters deliver flawless finishes with meticulous prep, crisp lines, and zero mess. Whether it is a single room refresh, an entire home interior, or high-traffic commercial spaces.',
      highlights: [
        'Residential interiors & exterior facades',
        'Commercial offices, retail & restaurants',
        'Surface preparation, plaster patching & priming',
        'Clean, timely execution with 100% satisfaction guarantee',
      ],
      icon: Users,
      badge: 'Experienced Team',
    },
    {
      id: 'equipment-rental',
      title: 'Equipment Rental',
      subtitle: 'Compressor machines and other painting equipment for rent',
      description:
        'Get access to top-tier industrial painting machinery without the heavy capital investment. Available on flexible daily, weekly, or full-project rental schedules with complete setup guidance.',
      highlights: [
        'High-pressure air compressor machines',
        'Airless spray systems for fast, uniform coats',
        'Professional extension poles, rollers & spray guns',
        'Fully serviced, tested and sanitized between rentals',
      ],
      icon: Wrench,
      badge: 'Commercial Grade Tools',
    },
    {
      id: 'wall-painting-artists',
      title: 'Wall Painting Artists',
      subtitle: 'Creative artists for decorative wall paintings and murals',
      description:
        'Transform plain blank drywall into one-of-a-kind bespoke art pieces. Our resident muralists and decorative painters craft custom artistic murals, botanical accents, faux textures, and branded feature backdrops.',
      highlights: [
        'Custom hand-painted murals & bespoke themes',
        'Decorative geometric, floral & abstract accents',
        'Kids rooms, cafes, boutique studios & lounge walls',
        'Collaborative sketch & concept review before painting',
      ],
      icon: Palette,
      badge: 'Artisanal Murals',
    },
    {
      id: '3d-wall-art',
      title: '3D Wall Art',
      subtitle: 'Unique three-dimensional wall designs to transform spaces',
      description:
        'Elevate your interior architecture with sculptural depth, shadow play, and modern tactile textures. Our 3D relief designs and dimensional paneling bring luxury and visual drama to any focal wall.',
      highlights: [
        'Sculptural geometric & organic relief patterns',
        'Acoustic & architectural textured panels',
        'Custom plaster & wood dimensional feature walls',
        'Seamless integration with accent down-lighting',
      ],
      icon: Box,
      badge: 'Modern Architecture',
    },
    {
      id: 'delivery-service',
      title: 'Delivery Service',
      subtitle: 'Convenient delivery of paint products and accessories',
      description:
        'Skip the heavy lifting. Order your curated paints, primers, rollers, brushes, and protective tapes directly to your doorstep or active construction job site with fast, careful delivery.',
      highlights: [
        'Careful handling of liquid paint tins & drums',
        'Scheduled doorstep delivery for homes & sites',
        'All accessories, tapes & drop sheets included',
        'Real-time dispatch updates via SMS or WhatsApp',
      ],
      icon: Truck,
      badge: 'Fast & Reliable',
    },
  ];

  return (
    <section id="services" className="py-20 sm:py-28 bg-gradient-to-br from-[#FBF8F5] via-white to-[#FBF8F5] relative border-y border-paint-border">

      {/* Top gradient fade separator */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white/60 to-transparent pointer-events-none" />
      {/* Bottom gradient fade separator */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/60 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-paint-surfaceAlt border border-paint-border text-xs font-bold text-paint-charcoal shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-paint-terracotta" />
            <span>Comprehensive Painting Solutions</span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-paint-charcoal tracking-tight">
            Our Services
          </h2>

          {/* Gradient underline accent bar */}
          <div className="flex justify-center">
            <div className="h-[3px] w-12 rounded-full bg-gradient-to-r from-paint-terracotta to-[#E05A3E]" />
          </div>

          <p className="text-base sm:text-lg text-paint-muted leading-relaxed font-medium">
            From quality paints and expert painters to creative wall art and professional equipment rentals,
            <span className="text-paint-charcoal font-bold"> DA Traders</span> brings everything you need
            to transform your space under one roof.
          </p>
        </div>

        {/* 5 Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isWide = index === 3 || index === 4;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className={`bg-white rounded-4xl p-7 sm:p-8 border border-paint-border hover:border-paint-terracotta/40 shadow-md hover:shadow-xl hover:border-l-4 hover:border-paint-terracotta transition-all duration-300 flex flex-col justify-between space-y-6 relative overflow-hidden ${
                  isWide ? 'lg:col-span-1 md:col-span-1' : ''
                }`}
              >
                {/* Crimson accent strip at top */}
                <div className="h-1 w-full bg-gradient-to-r from-paint-terracotta to-[#E05A3E] rounded-t-4xl -mx-7 -mt-7 mb-5 sm:-mx-8 sm:-mt-8" />

                <div className="space-y-5">
                  {/* Top Bar: Icon & Badge */}
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-paint-surfaceAlt to-paint-linen border border-paint-border flex items-center justify-center shadow-2xs">
                      <Icon className="w-6 h-6 text-paint-terracotta" />
                    </div>
                    <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-white text-paint-charcoal border border-paint-border shadow-2xs">
                      {service.badge}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h3 className="font-display font-bold text-xl text-paint-charcoal">
                      {service.title}
                    </h3>
                    <p className="text-xs font-semibold text-paint-terracotta mt-1">
                      {service.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-paint-muted leading-relaxed">
                    {service.description}
                  </p>

                  {/* Bullet Highlights */}
                  <div className="space-y-2 pt-2 border-t border-paint-border/80">
                    {service.highlights.map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-paint-charcoal">
                        <CheckCircle2 className="w-3.5 h-3.5 text-paint-terracotta shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA Button */}
                <div className="pt-4 border-t border-paint-border">
                  <button
                    onClick={() => scrollToContact(service.title)}
                    className="w-full py-3 px-4 rounded-2xl bg-white hover:bg-paint-terracotta hover:text-white text-paint-charcoal border border-paint-border text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-2xs group"
                  >
                    <span>Inquire About {service.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            );
          })}

          {/* 6th Card: DA Traders Commitment & Mission Statement Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-gradient-to-br from-[#0D0705] via-[#1A0A07] to-[#2B1410] text-white rounded-4xl p-7 sm:p-8 shadow-card flex flex-col justify-between space-y-6 relative overflow-hidden"
          >
            {/* Vibrant crimson glow overlay */}
            <div className="absolute top-0 right-0 w-56 h-56 bg-paint-terracotta/40 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#E05A3E]/20 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-800 text-stone-300 text-xs font-mono font-bold border border-stone-700">
                <ShieldCheck className="w-3.5 h-3.5 text-paint-sunshine" />
                <span>Our Quality Commitment</span>
              </div>

              <h3 className="font-display font-extrabold text-2xl text-white leading-snug">
                One Roof For All Your Painting Needs
              </h3>

              <blockquote className="text-xs sm:text-sm text-stone-300 italic leading-relaxed border-l-2 border-paint-terracotta pl-3.5 py-1">
                "Our commitment is to make every painting project easier, more creative and more satisfying
                through quality products and reliable services."
              </blockquote>

              <p className="text-xs text-stone-400 leading-relaxed">
                Whether you need equipment rented for the weekend, master muralists for a feature wall,
                or experienced painters to refresh an entire property, <strong>DA Traders</strong> handles it with excellence.
              </p>
            </div>

            <div className="relative z-10 pt-4 border-t border-stone-800">
              <button
                onClick={() => scrollToContact('General Inquiry')}
                className="w-full py-3.5 px-4 rounded-2xl bg-paint-terracotta hover:bg-[#5E0E00] text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <Paintbrush className="w-3.5 h-3.5" />
                <span>Contact DA Traders Today</span>
              </button>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
