import React, { useState, useRef, useCallback } from 'react';
import { ChevronsLeftRight, Sparkles } from 'lucide-react';
import { BEFORE_AFTER_PROJECTS } from '../data/gallery';

export default function BeforeAfterSlider() {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const project = BEFORE_AFTER_PROJECTS[activeProjectIndex];

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e) => {
    if (!e.touches[0]) return;
    handleMove(e.touches[0].clientX);
  };

  return (
    <div className="space-y-6">
      {/* Project Selector Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {BEFORE_AFTER_PROJECTS.map((proj, idx) => (
          <button
            key={proj.id}
            onClick={() => {
              setActiveProjectIndex(idx);
              setSliderPosition(50);
            }}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              activeProjectIndex === idx
                ? 'bg-paint-charcoal text-white shadow-sm'
                : 'bg-white text-paint-muted border border-paint-border hover:border-paint-charcoal/40 hover:text-paint-charcoal'
            }`}
          >
            {proj.title}
          </button>
        ))}
      </div>

      {/* Main Interactive Comparison Container */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        className="relative w-full aspect-[16/9] sm:aspect-[21/9] max-h-[500px] rounded-3xl overflow-hidden select-none cursor-ew-resize border border-paint-border shadow-card bg-stone-900"
      >
        {/* AFTER BACKGROUND (Right side revealed) */}
        <div className="absolute inset-0 w-full h-full">
          <RenderScene
            wallColor={project.afterColor}
            trimColor={project.afterTrim}
            isAfter={true}
            project={project}
          />
        </div>

        {/* BEFORE FOREGROUND (Left side clipped) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <div className="absolute inset-0 w-[100vw] max-w-[1280px] h-full pointer-events-none">
            <RenderScene
              wallColor={project.beforeColor}
              trimColor={project.beforeTrim}
              isAfter={false}
              project={project}
            />
          </div>
        </div>

        {/* Floating Badges */}
        <div className="absolute top-4 left-4 z-20 pointer-events-none">
          <span className="px-3 py-1.5 rounded-full bg-stone-900/80 backdrop-blur-md text-white text-xs font-mono font-bold tracking-wider border border-white/20">
            BEFORE
          </span>
        </div>

        <div className="absolute top-4 right-4 z-20 pointer-events-none">
          <span className="px-3.5 py-1.5 rounded-full bg-paint-terracotta text-white text-xs font-mono font-bold tracking-wider shadow-sm flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AFTER (DA TRADERS)</span>
          </span>
        </div>

        {/* Slider Divider Bar & Handle */}
        <div
          className="absolute top-0 bottom-0 z-30 w-1 bg-white shadow-2xl cursor-ew-resize flex items-center justify-center -ml-0.5"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="w-10 h-10 rounded-full bg-white text-paint-charcoal shadow-floating flex items-center justify-center border-2 border-stone-800 transition-transform hover:scale-110 active:scale-95">
            <ChevronsLeftRight className="w-5 h-5 text-paint-charcoal" />
          </div>
        </div>

        {/* Accessible Range Input for Screen Readers / Keyboard */}
        <input
          type="range"
          min="0"
          max="100"
          value={sliderPosition}
          onChange={(e) => setSliderPosition(Number(e.target.value))}
          aria-label={`Comparison slider between ${project.beforeLabel} and ${project.afterLabel}`}
          className="sr-only"
        />
      </div>

      {/* Project Meta Details & Swatches Used */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-paint-border shadow-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-paint-muted">
            {project.location}
          </span>
          <h3 className="font-display font-extrabold text-xl text-paint-charcoal">
            {project.title}
          </h3>
          <p className="text-xs sm:text-sm text-paint-muted mt-0.5">
            {sliderPosition > 50 ? project.afterDesc : project.beforeDesc}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-paint-charcoal hidden sm:inline">
            Palette Used:
          </span>
          <div className="flex items-center gap-2">
            {project.colorsUsed.map((col) => (
              <div
                key={col.code}
                className="flex items-center gap-2 px-3 py-1.5 rounded-2xl border border-paint-border bg-paint-surfaceAlt/80 shadow-xs"
              >
                <div
                  className="w-4 h-4 rounded-full shadow-inner ring-1 ring-black/10 shrink-0"
                  style={{ backgroundColor: col.hex }}
                />
                <div className="text-left">
                  <div className="text-[11px] font-bold text-paint-charcoal leading-tight">
                    {col.name}
                  </div>
                  <div className="text-[9px] font-mono text-paint-muted">
                    {col.code}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Architectural SVG scene renderer illustrating high-end interior spaces
 */
function RenderScene({ wallColor, trimColor, isAfter, project }) {
  return (
    <div
      className="relative w-full h-full flex items-center justify-center overflow-hidden transition-colors duration-500"
      style={{ backgroundColor: wallColor }}
    >
      {/* Wall Texture / Light Gradient */}
      <div
        className={`absolute inset-0 pointer-events-none ${
          isAfter
            ? 'bg-gradient-to-tr from-black/25 via-transparent to-amber-100/15'
            : 'bg-gradient-to-tr from-black/35 via-transparent to-white/10'
        }`}
      />

      {/* Stylized Architectural Room SVG */}
      <svg
        viewBox="0 0 1000 450"
        className="w-full h-full object-cover preserve-3d"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Crown Molding & Baseboard Trim */}
        <rect x="0" y="0" width="1000" height="28" fill={trimColor} />
        <line x1="0" y1="28" x2="1000" y2="28" stroke="rgba(0,0,0,0.15)" strokeWidth="2" />
        <rect x="0" y="380" width="1000" height="25" fill={trimColor} />
        <rect x="0" y="405" width="1000" height="45" fill="#3D322A" /> {/* Oak floor */}

        {/* Hardwood floor planks */}
        <line x1="150" y1="405" x2="120" y2="450" stroke="#2D241E" strokeWidth="2" opacity="0.6" />
        <line x1="380" y1="405" x2="350" y2="450" stroke="#2D241E" strokeWidth="2" opacity="0.6" />
        <line x1="620" y1="405" x2="590" y2="450" stroke="#2D241E" strokeWidth="2" opacity="0.6" />
        <line x1="850" y1="405" x2="820" y2="450" stroke="#2D241E" strokeWidth="2" opacity="0.6" />

        {/* Large Architectural Window with Sunlight beam */}
        <g opacity={isAfter ? '0.95' : '0.7'}>
          <rect x="80" y="60" width="220" height="260" rx="6" fill="#F4EFEA" stroke={trimColor} strokeWidth="12" />
          <line x1="190" y1="60" x2="190" y2="320" stroke={trimColor} strokeWidth="8" />
          <line x1="80" y1="180" x2="300" y2="180" stroke={trimColor} strokeWidth="8" />
          {/* Outside soft garden greenery visible */}
          <rect x="88" y="68" width="96" height="106" fill="#B4C9AF" opacity="0.8" />
          <rect x="196" y="68" width="96" height="106" fill="#9FBCA0" opacity="0.8" />
          <rect x="88" y="186" width="96" height="126" fill="#88A889" opacity="0.85" />
          <rect x="196" y="186" width="96" height="126" fill="#759A76" opacity="0.85" />

          {/* Sunlight cast polygon onto floor & wall */}
          <polygon
            points="190,180 480,430 320,430 80,320"
            fill={isAfter ? '#FFF3D4' : '#E8EEF5'}
            opacity={isAfter ? '0.22' : '0.1'}
          />
        </g>

        {/* Modern Minimalist Credenza / Sofa & Art */}
        <g>
          {/* Framed Wall Canvas */}
          <rect x="420" y="80" width="220" height="150" rx="4" fill="#EAE5DE" stroke="#2C2825" strokeWidth="6" />
          <circle cx="500" cy="150" r="35" fill={isAfter ? '#D95D39' : '#8A8A8A'} opacity="0.8" />
          <path d="M460 190 Q530 110 600 170" stroke="#2C2825" strokeWidth="4" fill="none" />

          {/* Designer Low-profile Sofa */}
          <rect x="360" y="270" width="360" height="90" rx="16" fill={isAfter ? '#F7F4EE' : '#8E9196'} />
          <rect x="340" y="290" width="30" height="70" rx="8" fill={isAfter ? '#ECE5D8' : '#7E8186'} />
          <rect x="710" y="290" width="30" height="70" rx="8" fill={isAfter ? '#ECE5D8' : '#7E8186'} />
          {/* Cushions */}
          <circle cx="430" cy="300" r="18" fill={isAfter ? '#DCA259' : '#5A5D62'} />
          <circle cx="650" cy="300" r="18" fill={isAfter ? '#457B63' : '#6A6D72'} />

          {/* Plant Stand & Fiddle Leaf Fig */}
          <line x1="790" y1="380" x2="790" y2="300" stroke="#1A1817" strokeWidth="4" />
          <line x1="830" y1="380" x2="830" y2="300" stroke="#1A1817" strokeWidth="4" />
          <rect x="780" y="290" width="60" height="50" rx="6" fill="#D95D39" />
          <ellipse cx="810" cy="240" rx="30" ry="40" fill="#2D4A3E" />
          <ellipse cx="830" cy="220" rx="25" ry="35" fill="#3D6857" />
          <ellipse cx="790" cy="210" rx="20" ry="30" fill="#457B63" />
        </g>
      </svg>
    </div>
  );
}
