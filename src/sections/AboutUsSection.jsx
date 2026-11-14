import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, CheckCircle2, ShieldCheck, Paintbrush, Users, Award, BookOpen } from 'lucide-react';

export default function AboutUsSection() {
  const pillars = [
    {
      icon: Paintbrush,
      title: 'Artisanal Tinting Lab',
      desc: 'We mix and tint every tin right here in our workshop using high-precision spectrophotometers and mineral pigments, ensuring flawless color accuracy.',
    },
    {
      icon: ShieldCheck,
      title: 'Zero-VOC & Family Safe',
      desc: 'Our paints are 100% solvent-free, non-toxic, and virtually odorless. You can sleep in a freshly painted room the very same night.',
    },
    {
      icon: Users,
      title: 'Unrushed Color Guidance',
      desc: 'Sit down at our studio consultation table over coffee. We look at your fabric swatches, lighting angles, and room orientations together.',
    },
    {
      icon: Award,
      title: 'Architectural Durability',
      desc: 'Formulated to resist scuffs, moisture, and ultraviolet fade. Formulated for longevity, washable resilience, and breathtaking depth.',
    },
  ];

  return (
    <section id="about" className="py-20 sm:py-28 bg-white relative border-y border-paint-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Tag & Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-paint-surfaceAlt border border-paint-border text-xs font-bold text-paint-charcoal shadow-2xs">
            <Heart className="w-3.5 h-3.5 text-paint-terracotta fill-paint-terracotta" />
            <span>Our Story &amp; Craft</span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-paint-charcoal tracking-tight">
            About DA Traders
          </h2>

          <p className="text-base sm:text-lg text-paint-muted leading-relaxed">
            We started with a straightforward vision: to bring human warmth, comprehensive services,
            and true architectural craftsmanship back to the paint and wall design industry.
          </p>
        </div>

        {/* Narrative & Atelier Philosophy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          <div className="lg:col-span-6 space-y-5 text-sm sm:text-base text-paint-muted leading-relaxed">
            <h3 className="font-display font-bold text-2xl text-paint-charcoal">
              More than a shop — a community workshop for color lovers.
            </h3>

            <p>
              For decades, buying paint meant wandering down cold, fluorescent hardware store aisles,
              peering at tiny 2-inch paper chips, and guessing how a color might look once dried on your wall.
            </p>

            <p>
              At <strong>DA Traders</strong>, we rebuilt the entire experience around people, craftsmanship,
              and reliable service. In our workshop at Myloor, you will find experienced painters ready for booking,
              rental compressor equipment, custom wall artists, and doorstep paint delivery with a passionate team
              who genuinely care about the spaces you live and work in.
            </p>

            <p>
              Whether you are refreshing a home interior, completing a commercial building, or
              seeking a bespoke 3D wall feature, our doors are open with honest guidance,
              dependable equipment, and skilled painters.
            </p>

            <div className="pt-3 flex items-center gap-6">
              <div>
                <span className="font-display font-extrabold text-3xl text-paint-charcoal block">5</span>
                <span className="text-xs text-paint-muted font-medium">Core Services</span>
              </div>
              <div className="w-px h-10 bg-paint-border" />
              <div>
                <span className="font-display font-extrabold text-3xl text-paint-terracotta block">100%</span>
                <span className="text-xs text-paint-muted font-medium">Dedicated Support</span>
              </div>
              <div className="w-px h-10 bg-paint-border" />
              <div>
                <span className="font-display font-extrabold text-3xl text-paint-charcoal block">6 Days</span>
                <span className="text-xs text-paint-muted font-medium">Mon – Sat Open</span>
              </div>
            </div>
          </div>

          {/* Right: Atelier Studio Comparison Card */}
          <div className="lg:col-span-6 bg-paint-surfaceAlt rounded-4xl p-6 sm:p-10 border border-paint-border shadow-soft space-y-6">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-paint-terracotta" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-paint-charcoal">
                The DA Traders Difference
              </span>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="p-4 rounded-2xl bg-white border border-paint-border shadow-2xs space-y-1">
                <span className="font-bold text-paint-charcoal block flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  All-in-One Painting Solutions
                </span>
                <p className="text-paint-muted pl-6">
                  Quality paint supply, experienced painters, and professional compressor machinery available together under one roof.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-paint-border shadow-2xs space-y-1">
                <span className="font-bold text-paint-charcoal block flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  Custom Wall Art &amp; 3D Designs
                </span>
                <p className="text-paint-muted pl-6">
                  Talented wall artists to transform standard walls into distinct decorative murals and dimensional textures.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-paint-border shadow-2xs space-y-1">
                <span className="font-bold text-paint-charcoal block flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  Direct Doorstep Delivery
                </span>
                <p className="text-paint-muted pl-6">
                  Convenient delivery of paint products and accessories directly to your home or work site.
                </p>
              </div>
            </div>

            <div className="pt-2 text-xs text-paint-muted italic">
              "Our commitment is to make every painting project easier, more creative, and more reliable."
            </div>
          </div>

        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <div
                key={i}
                className="p-6 rounded-3xl bg-paint-surfaceAlt border border-paint-border hover:border-paint-terracotta/40 transition-all hover:shadow-card space-y-3"
              >
                <div className="w-10 h-10 rounded-2xl bg-white border border-paint-border flex items-center justify-center text-paint-terracotta shadow-2xs">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="font-display font-bold text-base text-paint-charcoal">
                  {pillar.title}
                </h4>
                <p className="text-xs text-paint-muted leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

