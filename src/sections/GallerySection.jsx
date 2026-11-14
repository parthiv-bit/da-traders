import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Eye, Camera, Paintbrush, Layers } from 'lucide-react';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import { MASONRY_PROJECTS } from '../data/gallery';

export default function GallerySection({ onShowToast, onTestPaletteInRoom }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Residential', 'Kitchen', 'Commercial', 'Exterior'];

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All') return MASONRY_PROJECTS;
    return MASONRY_PROJECTS.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section id="gallery" className="py-20 sm:py-28 bg-paint-surfaceAlt relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-paint-border text-xs font-bold text-paint-charcoal shadow-xs">
            <Camera className="w-3.5 h-3.5 text-paint-terracotta" />
            <span>Real Spaces &amp; Before / After Proof</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-paint-charcoal tracking-tight">
            Architectural Project Gallery
          </h2>
          <p className="text-sm sm:text-base text-paint-muted">
            Drag the interactive slider to see how subtle mineral pigments transform tired, 
            flat drywall into spaces that radiate architectural depth.
          </p>
        </div>

        {/* 1. Interactive Before / After Slider Showcase */}
        <div>
          <BeforeAfterSlider />
        </div>

        {/* 2. Filterable Masonry Project Gallery */}
        <div className="pt-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-paint-border pb-4">
            <div>
              <h3 className="font-display font-extrabold text-2xl text-paint-charcoal">
                Curated Project Portfolio
              </h3>
              <p className="text-xs text-paint-muted mt-0.5">
                Real residential &amp; hospitality spaces photographed in natural ambient light.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                    selectedCategory === cat
                      ? 'bg-paint-charcoal text-white shadow-xs'
                      : 'bg-white text-paint-muted border border-paint-border hover:text-paint-charcoal'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-3xl p-5 border border-paint-border shadow-soft hover:shadow-card-hover transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Decorative Project Color Swatches Strip */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-paint-surfaceAlt text-paint-charcoal border border-paint-border">
                      {project.category} · {project.area}
                    </span>
                    <span className="text-[11px] font-mono text-paint-muted">
                      Photo: {project.photographer}
                    </span>
                  </div>

                  {/* Visual Color Block Trio representing this room */}
                  <div className="w-full h-36 rounded-2xl overflow-hidden flex shadow-inner mb-4 border border-paint-border">
                    {project.palette.map((hex, i) => (
                      <div
                        key={i}
                        className="h-full flex-1 transition-all hover:flex-[1.5]"
                        style={{ backgroundColor: hex }}
                        title={hex}
                      />
                    ))}
                  </div>

                  {/* Title & Description */}
                  <h4 className="font-display font-bold text-lg text-paint-charcoal">
                    {project.title}
                  </h4>
                  <p className="text-xs font-semibold text-paint-terracotta mt-0.5">
                    {project.colorNames}
                  </p>
                  <p className="text-xs text-paint-muted mt-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Footer details */}
                <div className="mt-4 pt-3 border-t border-paint-border/60 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-paint-muted flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5 text-paint-charcoal" />
                    <span>{project.finish}</span>
                  </span>

                  <button
                    onClick={() => {
                      onShowToast?.(`Loaded palette from ${project.title}!`);
                    }}
                    className="text-paint-charcoal hover:text-paint-terracotta font-bold flex items-center gap-1 transition-colors"
                  >
                    <span>View Recipe</span>
                    <span className="text-paint-terracotta">→</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
