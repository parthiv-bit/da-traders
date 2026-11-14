import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Palette, MonitorCheck, Store, PaintRoller, CheckCircle2 } from 'lucide-react';

export default function HowItWorksSection() {
  const steps = [
    {
      step: '01',
      title: 'Curate & Sample',
      desc: 'Browse our 120+ designer mineral tones. Order up to 5 complimentary 40cm peel-and-stick color cards delivered to your doorstep in 48 hours.',
      icon: Palette,
      color: '#E07A5F',
      tag: 'Risk-Free Sampling',
    },
    {
      step: '02',
      title: 'Visualize Live',
      desc: 'Test your top picks in our interactive Room Visualizer. Shift between morning daylight, golden hour, and cozy evening lamp lighting.',
      icon: MonitorCheck,
      color: '#457B63',
      tag: 'Zero Color Regret',
    },
    {
      step: '03',
      title: 'Precision Tinting',
      desc: 'Order online or visit our Marylebone & Shoreditch tinting labs. Computerized 16-nozzle dispensers mix your exact batch in under 60 minutes.',
      icon: Store,
      color: '#3D7A94',
      tag: '60-Min Express Pickup',
    },
    {
      step: '04',
      title: 'Roll & Admire',
      desc: 'Experience pure double-cream opacity. Zero spatter, virtually zero VOC fumes, and a wash-resistant finish guaranteed for 12 to 15 years.',
      icon: PaintRoller,
      color: '#D95D39',
      tag: 'Sleep In Tonight',
    },
  ];

  return (
    <section id="process" className="py-20 sm:py-28 bg-paint-surface relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-paint-surfaceAlt border border-paint-border text-xs font-bold text-paint-charcoal shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-paint-sunshine" />
            <span>The Four-Step Journey</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-paint-charcoal tracking-tight">
            How The DA Traders Process Works
          </h2>
          <p className="text-sm sm:text-base text-paint-muted">
            We reimagined paint shopping from tedious hardware store guesswork into an inspiring, 
            foolproof design journey.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.step}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-4xl p-6 sm:p-7 border border-paint-border shadow-soft hover:shadow-card-hover transition-all flex flex-col justify-between relative group"
              >
                {/* Step Number & Color Splash Dot */}
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-2xl font-extrabold text-paint-charcoal/20 group-hover:text-paint-terracotta transition-colors">
                    {item.step}
                  </span>
                  <div
                    className="w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-xs transition-transform group-hover:rotate-12"
                    style={{ backgroundColor: item.color }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-2 mb-6">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-paint-surfaceAlt text-paint-charcoal inline-block border border-paint-border">
                    {item.tag}
                  </span>
                  <h3 className="font-display font-extrabold text-xl text-paint-charcoal pt-1">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-paint-muted leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {/* Bottom Visual Step Indicator */}
                <div className="pt-4 border-t border-paint-border/60 flex items-center justify-between text-xs font-semibold text-paint-charcoal">
                  <span className="flex items-center gap-1.5 text-emerald-600">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Guaranteed Ease</span>
                  </span>
                  <span className="text-stone-300 group-hover:text-paint-terracotta transition-colors font-mono font-bold">
                    →
                  </span>
                </div>
              </motion.div>
            );
          })}

        </div>

        {/* Roller path visual accent */}
        <div className="mt-12 p-6 rounded-3xl bg-paint-surfaceAlt border border-paint-border text-center max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="font-display font-bold text-sm text-paint-charcoal">
              Need on-site architect advice?
            </h4>
            <p className="text-xs text-paint-muted mt-0.5">
              Book a 45-minute virtual or in-home consultation with our senior colorists.
            </p>
          </div>
          <a
            href="#contact"
            className="px-5 py-2.5 rounded-full bg-paint-charcoal text-white text-xs font-bold hover:bg-paint-charcoalSoft transition-colors shrink-0"
          >
            Book Free Consult
          </a>
        </div>

      </div>
    </section>
  );
}
