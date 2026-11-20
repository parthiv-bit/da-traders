import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, CheckCircle2, ShieldCheck, Paintbrush, Users, Award, BookOpen } from 'lucide-react';

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

  const pillarDelays = [0, 0.1, 0.2, 0.3];

  return (
    <section id="about" className="py-20 sm:py-28 bg-gradient-to-b from-white to-[#FBF8F5] relative border-y border-paint-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-paint-charcoal tracking-tight">
            What Defines Us
          </h2>

          <p className="text-base sm:text-lg text-paint-muted leading-relaxed">
            We started with a straightforward vision: to bring human warmth, comprehensive services,
            and true architectural craftsmanship back to the paint and wall design industry.
          </p>
        </div>

        {/* Narrative & Atelier Philosophy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">

          {/* Left: Story Text */}
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

              {/* Stats Row — upgraded */}
              <div className="pt-3 flex items-center gap-6">
                <div className="text-center">
                  <span className="block w-2 h-2 rounded-full bg-paint-terracotta mx-auto mb-1" />
                  <span className="font-display font-extrabold text-5xl text-paint-charcoal block leading-none">5</span>
                  <span className="text-xs text-paint-muted font-medium">Core Services</span>
                </div>
                <div className="w-px h-14 bg-paint-border" />
                <div className="text-center">
                  <span className="block w-2 h-2 rounded-full bg-paint-terracotta mx-auto mb-1" />
                  <span className="font-display font-extrabold text-5xl text-paint-terracotta block leading-none">100%</span>
                  <span className="text-xs text-paint-muted font-medium">Dedicated Support</span>
                </div>
                <div className="w-px h-14 bg-paint-border" />
                <div className="text-center">
                  <span className="block w-2 h-2 rounded-full bg-paint-terracotta mx-auto mb-1" />
                  <span className="font-display font-extrabold text-5xl text-paint-charcoal block leading-none">6 Days</span>
                  <span className="text-xs text-paint-muted font-medium">Mon – Sat Open</span>
                </div>
              </div>
          </div>

          {/* Right: Atelier Studio Comparison Card */}
          <div className="lg:col-span-6 bg-gradient-to-br from-[#FBF8F5] via-white to-[#FDF5EF] rounded-4xl p-6 sm:p-10 border-l-4 border-paint-terracotta border border-paint-border shadow-soft space-y-6">
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
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: pillarDelays[i] }}
                className="p-6 rounded-3xl bg-white border border-paint-border hover:border-paint-terracotta/40 transition-all hover:shadow-card hover:-translate-y-1 shadow-soft space-y-3"
              >
                {/* Small colored dot badge above icon */}
                <div className="flex flex-col items-start gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-paint-terracotta block" />
                  <div className="w-10 h-10 rounded-2xl bg-white border border-paint-border flex items-center justify-center text-paint-terracotta shadow-2xs">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <h4 className="font-display font-bold text-base text-paint-charcoal">
                  {pillar.title}
                </h4>
                <p className="text-xs text-paint-muted leading-relaxed">
                  {pillar.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
