import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Sun, Moon, Sunset, Layers, RefreshCw, Check, Share2, ShoppingBag } from 'lucide-react';
import { COLORS } from '../data/colors';
import { getContrastTextColor } from '../utils/contrast';

export default function RoomVisualizerSection({
  selectedColorFromDrawer,
  onShowToast,
  onAddRecipeToQuote,
}) {
  // Room Scenes
  const [activeRoom, setActiveRoom] = useState('living'); // 'living', 'bedroom', 'exterior'

  // Surface target currently being painted
  const [activeSurface, setActiveSurface] = useState('accentWall'); // 'accentWall', 'mainWall', 'trim'

  // Lighting condition
  const [lighting, setLighting] = useState('daylight'); // 'daylight', 'goldenHour', 'evening'

  // Room Color States
  const [roomColors, setRoomColors] = useState({
    living: {
      accentWall: COLORS.find((c) => c.id === 'pr-201') || COLORS[6], // Eucalyptus Mist
      mainWall: COLORS.find((c) => c.id === 'pr-101') || COLORS[0],   // Alabaster Cloud
      trim: COLORS.find((c) => c.id === 'pr-602') || COLORS[30],       // Obsidian Iron
    },
    bedroom: {
      accentWall: COLORS.find((c) => c.id === 'pr-402') || COLORS[18], // Terracotta Sun
      mainWall: COLORS.find((c) => c.id === 'pr-102') || COLORS[1],    // Linen Whisper
      trim: COLORS.find((c) => c.id === 'pr-104') || COLORS[3],        // Sandstone Dune
    },
    exterior: {
      accentWall: COLORS.find((c) => c.id === 'pr-103') || COLORS[2], // Nordic Greige
      mainWall: COLORS.find((c) => c.id === 'pr-303') || COLORS[14],  // Prussian Night (Door/Shutters)
      trim: COLORS.find((c) => c.id === 'pr-101') || COLORS[0],       // Alabaster Cloud Trim
    },
  });

  const currentColors = roomColors[activeRoom];

  // Quick Swatches to test in visualizer
  const quickSwatches = [
    COLORS.find((c) => c.id === 'pr-201'), // Eucalyptus Mist
    COLORS.find((c) => c.id === 'pr-402'), // Terracotta Sun
    COLORS.find((c) => c.id === 'pr-303'), // Prussian Night
    COLORS.find((c) => c.id === 'pr-103'), // Nordic Greige
    COLORS.find((c) => c.id === 'pr-401'), // Tuscan Ochre
    COLORS.find((c) => c.id === 'pr-502'), // Damson Velvet
    COLORS.find((c) => c.id === 'pr-101'), // Alabaster Cloud
    COLORS.find((c) => c.id === 'pr-601'), // Charcoal Slate
  ].filter(Boolean);

  const applyColor = (color) => {
    setRoomColors((prev) => ({
      ...prev,
      [activeRoom]: {
        ...prev[activeRoom],
        [activeSurface]: color,
      },
    }));
    onShowToast?.(`Applied ${color.name} to ${getSurfaceLabel(activeSurface)}!`, color.hex);
  };

  const resetRoomDefaults = () => {
    setRoomColors({
      living: {
        accentWall: COLORS.find((c) => c.id === 'pr-201') || COLORS[6],
        mainWall: COLORS.find((c) => c.id === 'pr-101') || COLORS[0],
        trim: COLORS.find((c) => c.id === 'pr-602') || COLORS[30],
      },
      bedroom: {
        accentWall: COLORS.find((c) => c.id === 'pr-402') || COLORS[18],
        mainWall: COLORS.find((c) => c.id === 'pr-102') || COLORS[1],
        trim: COLORS.find((c) => c.id === 'pr-104') || COLORS[3],
      },
      exterior: {
        accentWall: COLORS.find((c) => c.id === 'pr-103') || COLORS[2],
        mainWall: COLORS.find((c) => c.id === 'pr-303') || COLORS[14],
        trim: COLORS.find((c) => c.id === 'pr-101') || COLORS[0],
      },
    });
  };

  function getSurfaceLabel(surface) {
    if (surface === 'accentWall') return activeRoom === 'exterior' ? 'Main Facade Wall' : 'Focal Accent Wall';
    if (surface === 'mainWall') return activeRoom === 'exterior' ? 'Front Door & Accent' : 'Secondary Walls';
    return activeRoom === 'exterior' ? 'Cornices & Trims' : 'Molding & Trims';
  }

  // Handle external color injection (from detail drawer)
  React.useEffect(() => {
    if (selectedColorFromDrawer) {
      applyColor(selectedColorFromDrawer);
    }
  }, [selectedColorFromDrawer]);

  return (
    <section id="visualizer" className="py-20 sm:py-28 bg-paint-surfaceAlt relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-paint-border text-xs font-bold text-paint-charcoal shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-paint-sunshine" />
            <span>Interactive Digital Visualizer</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-paint-charcoal tracking-tight">
            Color Your Space Live
          </h2>
          <p className="text-sm sm:text-base text-paint-muted">
            Select a room scene, choose which wall or architectural trim to paint, and test 
            designer color combinations with smooth real-time lighting transitions.
          </p>
        </div>

        {/* Room & Lighting Switcher Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          {/* Room Scene Tabs */}
          <div className="flex items-center p-1.5 bg-white rounded-2xl border border-paint-border shadow-xs w-full md:w-auto justify-center">
            {[
              { id: 'living', label: 'Living Room' },
              { id: 'bedroom', label: 'Primary Bedroom' },
              { id: 'exterior', label: 'Exterior Facade' },
            ].map((room) => (
              <button
                key={room.id}
                onClick={() => setActiveRoom(room.id)}
                className={`px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeRoom === room.id
                    ? 'bg-paint-charcoal text-white shadow-xs'
                    : 'text-paint-muted hover:text-paint-charcoal'
                }`}
              >
                {room.label}
              </button>
            ))}
          </div>

          {/* Lighting Condition Modes */}
          <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-2xl border border-paint-border shadow-xs">
            <span className="text-[11px] font-bold text-paint-muted px-2 hidden sm:inline">
              Lighting:
            </span>
            {[
              { id: 'daylight', label: 'Daylight', icon: Sun },
              { id: 'goldenHour', label: 'Golden Hour', icon: Sunset },
              { id: 'evening', label: 'Evening Lamp', icon: Moon },
            ].map((mode) => {
              const Icon = mode.icon;
              const isSelected = lighting === mode.id;
              return (
                <button
                  key={mode.id}
                  onClick={() => setLighting(mode.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    isSelected
                      ? 'bg-paint-surfaceAlt text-paint-charcoal font-bold border border-paint-border shadow-2xs'
                      : 'text-paint-muted hover:text-paint-charcoal'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 text-paint-terracotta" />
                  <span>{mode.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Stage Grid: Interactive Visualizer + Surface Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Visualizer Canvas (8 Cols) */}
          <div className="lg:col-span-8 bg-white rounded-4xl p-3 sm:p-5 border border-paint-border shadow-card relative overflow-hidden">
            
            {/* The Interactive Room Canvas */}
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-3xl overflow-hidden shadow-inner">
              
              {/* Lighting Overlay Filter */}
              <div
                className={`absolute inset-0 pointer-events-none z-20 transition-all duration-700 ${
                  lighting === 'goldenHour'
                    ? 'bg-amber-500/15 mix-blend-color-burn'
                    : lighting === 'evening'
                    ? 'bg-indigo-950/25 mix-blend-multiply'
                    : 'bg-transparent'
                }`}
              />

              {/* Render dynamic room SVG based on activeRoom */}
              {activeRoom === 'living' && (
                <LivingRoomScene
                  accentColor={currentColors.accentWall.hex}
                  mainColor={currentColors.mainWall.hex}
                  trimColor={currentColors.trim.hex}
                  lighting={lighting}
                />
              )}

              {activeRoom === 'bedroom' && (
                <BedroomScene
                  accentColor={currentColors.accentWall.hex}
                  mainColor={currentColors.mainWall.hex}
                  trimColor={currentColors.trim.hex}
                  lighting={lighting}
                />
              )}

              {activeRoom === 'exterior' && (
                <ExteriorScene
                  facadeColor={currentColors.accentWall.hex}
                  doorColor={currentColors.mainWall.hex}
                  trimColor={currentColors.trim.hex}
                  lighting={lighting}
                />
              )}

              {/* Surface Painting Targets (Clickable overlay badges inside room) */}
              <div className="absolute bottom-4 left-4 z-30 flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveSurface('accentWall')}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-md transition-all flex items-center gap-1.5 border shadow-sm ${
                    activeSurface === 'accentWall'
                      ? 'bg-paint-charcoal text-white border-white/20 ring-2 ring-paint-terracotta'
                      : 'bg-white/80 text-paint-charcoal border-white/40 hover:bg-white'
                  }`}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full border border-black/20"
                    style={{ backgroundColor: currentColors.accentWall.hex }}
                  />
                  <span>{getSurfaceLabel('accentWall')}</span>
                </button>

                <button
                  onClick={() => setActiveSurface('mainWall')}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-md transition-all flex items-center gap-1.5 border shadow-sm ${
                    activeSurface === 'mainWall'
                      ? 'bg-paint-charcoal text-white border-white/20 ring-2 ring-paint-terracotta'
                      : 'bg-white/80 text-paint-charcoal border-white/40 hover:bg-white'
                  }`}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full border border-black/20"
                    style={{ backgroundColor: currentColors.mainWall.hex }}
                  />
                  <span>{getSurfaceLabel('mainWall')}</span>
                </button>

                <button
                  onClick={() => setActiveSurface('trim')}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-md transition-all flex items-center gap-1.5 border shadow-sm ${
                    activeSurface === 'trim'
                      ? 'bg-paint-charcoal text-white border-white/20 ring-2 ring-paint-terracotta'
                      : 'bg-white/80 text-paint-charcoal border-white/40 hover:bg-white'
                  }`}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full border border-black/20"
                    style={{ backgroundColor: currentColors.trim.hex }}
                  />
                  <span>{getSurfaceLabel('trim')}</span>
                </button>
              </div>

              {/* Reset Canvas Button */}
              <button
                onClick={resetRoomDefaults}
                title="Reset to default palette"
                className="absolute top-4 right-4 z-30 p-2 rounded-full bg-white/80 hover:bg-white backdrop-blur-md text-paint-charcoal shadow-sm border border-white/40 transition-transform active:rotate-180"
                aria-label="Reset colors to default"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Tint Palette Bar below room */}
            <div className="pt-5 px-1">
              <div className="flex items-center justify-between text-xs font-bold text-paint-charcoal mb-3">
                <span className="flex items-center gap-1.5">
                  <span>Recolor <span className="text-paint-terracotta underline">{getSurfaceLabel(activeSurface)}</span>:</span>
                </span>
                <span className="text-paint-muted text-[11px]">Click any swatch to coat live</span>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5">
                {quickSwatches.map((color) => {
                  const isCurrent = currentColors[activeSurface]?.id === color.id;
                  const textColor = getContrastTextColor(color.hex);
                  return (
                    <button
                      key={color.id}
                      onClick={() => applyColor(color)}
                      className={`group relative h-16 rounded-2xl p-2 flex flex-col justify-between text-left transition-all duration-300 border ${
                        isCurrent
                          ? 'ring-2 ring-paint-charcoal ring-offset-2 scale-105 shadow-md border-transparent'
                          : 'border-black/5 hover:scale-105 shadow-xs'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      aria-label={`Apply ${color.name} to ${getSurfaceLabel(activeSurface)}`}
                    >
                      <div className="flex justify-between items-start">
                        <span
                          className="text-[9px] font-mono font-bold leading-none"
                          style={{ color: textColor }}
                        >
                          {color.code}
                        </span>
                        {isCurrent && (
                          <div className="w-3.5 h-3.5 rounded-full bg-white text-paint-charcoal flex items-center justify-center shadow-xs">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                        )}
                      </div>
                      <span
                        className="text-[10px] font-bold leading-tight truncate"
                        style={{ color: textColor }}
                      >
                        {color.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Color Recipe & Specification Card (4 Cols) */}
          <div className="lg:col-span-4 bg-white rounded-4xl p-6 sm:p-7 border border-paint-border shadow-card space-y-6">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-paint-muted">
                Active Harmony
              </span>
              <h3 className="font-display font-extrabold text-2xl text-paint-charcoal mt-1">
                Room Color Recipe
              </h3>
              <p className="text-xs text-paint-muted mt-1">
                Designer-balanced trio formulated to reflect consistent undertones across daylight.
              </p>
            </div>

            {/* The 3 surfaces breakdown */}
            <div className="space-y-3">
              {[
                { key: 'accentWall', title: getSurfaceLabel('accentWall'), color: currentColors.accentWall },
                { key: 'mainWall', title: getSurfaceLabel('mainWall'), color: currentColors.mainWall },
                { key: 'trim', title: getSurfaceLabel('trim'), color: currentColors.trim },
              ].map(({ key, title, color }) => (
                <div
                  key={key}
                  onClick={() => setActiveSurface(key)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    activeSurface === key
                      ? 'border-paint-charcoal bg-paint-surfaceAlt/70 shadow-xs'
                      : 'border-paint-border hover:border-paint-charcoal/30 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl shadow-inner border border-black/10 shrink-0"
                      style={{ backgroundColor: color.hex }}
                    />
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-paint-muted block">
                        {title}
                      </span>
                      <h4 className="text-sm font-display font-bold text-paint-charcoal">
                        {color.name}
                      </h4>
                      <span className="text-[10px] font-mono text-paint-muted">
                        {color.code} · LRV {color.lrv}%
                      </span>
                    </div>
                  </div>

                  <span className="text-xs font-bold text-paint-terracotta">
                    {activeSurface === key ? 'Active' : 'Edit'}
                  </span>
                </div>
              ))}
            </div>

            {/* Coverage estimate quick tip */}
            <div className="bg-paint-surfaceAlt p-4 rounded-2xl border border-paint-border text-xs space-y-1.5">
              <div className="font-bold text-paint-charcoal flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-paint-terracotta" />
                <span>Recommended Combination</span>
              </div>
              <p className="text-paint-muted text-[11px] leading-relaxed">
                Use <strong>Atelier Velvet Matt</strong> on walls for deep color absorption, and{' '}
                <strong>Architectural Satin Silk</strong> on trims for easy wipe-down durability.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-2">
              <button
                onClick={() => {
                  onAddRecipeToQuote?.(currentColors);
                  onShowToast?.(`Added ${currentColors.accentWall.name} & palette recipe to quote!`);
                }}
                className="w-full py-3.5 px-4 rounded-2xl bg-paint-charcoal text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 hover:bg-paint-charcoalSoft transition-colors shadow-sm"
              >
                <ShoppingBag className="w-4 h-4 text-paint-sunshine" />
                <span>Order This 3-Color Trio</span>
              </button>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(
                    `DA Traders Color Recipe: Main: ${currentColors.accentWall.name} (${currentColors.accentWall.hex}), Secondary: ${currentColors.mainWall.name} (${currentColors.mainWall.hex}), Trim: ${currentColors.trim.name} (${currentColors.trim.hex})`
                  );
                  onShowToast?.('Copied full room palette recipe to clipboard!');
                }}
                className="w-full py-2.5 px-4 rounded-2xl bg-white border border-paint-border text-paint-charcoal text-xs font-bold flex items-center justify-center gap-2 hover:bg-stone-50 transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share Palette Recipe</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

/**
 * 1. Living Room Scene Component
 */
function LivingRoomScene({ accentColor, mainColor, trimColor, lighting }) {
  return (
    <div className="w-full h-full relative overflow-hidden transition-colors duration-700">
      <svg
        viewBox="0 0 800 500"
        className="w-full h-full object-cover"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Main Wall (Backdrop) */}
        <rect x="0" y="0" width="800" height="420" fill={mainColor} className="transition-colors duration-700" />

        {/* Feature Accent Wall (Right Architectural Recess) */}
        <polygon
          points="280,0 800,0 800,420 280,420"
          fill={accentColor}
          className="transition-colors duration-700"
        />

        {/* Corner Shadow defining depth between main wall and accent wall */}
        <line x1="280" y1="0" x2="280" y2="420" stroke="rgba(0,0,0,0.18)" strokeWidth="3" />

        {/* Crown Molding & Baseboard Trim */}
        <rect x="0" y="0" width="800" height="20" fill={trimColor} className="transition-colors duration-700" />
        <rect x="0" y="405" width="800" height="18" fill={trimColor} className="transition-colors duration-700" />

        {/* Herringbone Blonde Oak Floor */}
        <rect x="0" y="423" width="800" height="77" fill="#CBB69D" />
        {/* Floor plank perspective lines */}
        <line x1="120" y1="423" x2="80" y2="500" stroke="#B8A085" strokeWidth="2" />
        <line x1="300" y1="423" x2="260" y2="500" stroke="#B8A085" strokeWidth="2" />
        <line x1="480" y1="423" x2="440" y2="500" stroke="#B8A085" strokeWidth="2" />
        <line x1="660" y1="423" x2="620" y2="500" stroke="#B8A085" strokeWidth="2" />

        {/* Tall Architectural Window on Left */}
        <g>
          <rect x="50" y="50" width="180" height="320" rx="4" fill="#F4EDE4" stroke={trimColor} strokeWidth="12" />
          <line x1="140" y1="50" x2="140" y2="370" stroke={trimColor} strokeWidth="8" />
          <line x1="50" y1="200" x2="230" y2="200" stroke={trimColor} strokeWidth="8" />
          {/* Outdoor foliage */}
          <rect x="58" y="58" width="76" height="136" fill="#8FA88D" opacity="0.85" />
          <rect x="146" y="58" width="76" height="136" fill="#A1BA9F" opacity="0.85" />
          <rect x="58" y="206" width="76" height="158" fill="#7D987B" opacity="0.85" />
          <rect x="146" y="206" width="76" height="158" fill="#6E876C" opacity="0.85" />

          {/* Sunlight Ray onto Wall & Floor */}
          <polygon
            points="140,200 450,470 280,470 50,370"
            fill={lighting === 'goldenHour' ? '#FFA726' : '#FFF9C4'}
            opacity={lighting === 'evening' ? '0.05' : '0.18'}
          />
        </g>

        {/* Minimalist Designer Sectional Sofa */}
        <g>
          {/* Cast shadow under sofa */}
          <ellipse cx="540" cy="425" rx="190" ry="14" fill="rgba(0,0,0,0.18)" />

          {/* Sofa Body */}
          <rect x="360" y="280" width="360" height="130" rx="18" fill="#FAF7F2" stroke="#E5DEC9" strokeWidth="2" />
          <rect x="340" y="320" width="30" height="90" rx="10" fill="#EFE8DC" />
          <rect x="710" y="320" width="30" height="90" rx="10" fill="#EFE8DC" />
          {/* Cushions */}
          <rect x="380" y="300" width="150" height="90" rx="12" fill="#F3EDE2" />
          <rect x="550" y="300" width="150" height="90" rx="12" fill="#F3EDE2" />

          {/* Accent throw pillows */}
          <circle cx="430" cy="330" r="22" fill="#D95D39" opacity="0.9" />
          <circle cx="660" cy="330" r="22" fill="#457B63" opacity="0.9" />
        </g>

        {/* Wall Art Frame on Accent Wall */}
        <g>
          <rect x="460" y="60" width="160" height="190" rx="4" fill="#FDFBF7" stroke="#1A1817" strokeWidth="6" />
          {/* Abstract botanical art inside */}
          <circle cx="540" cy="140" r="40" fill={mainColor} opacity="0.85" />
          <path d="M500 190 Q540 100 580 170" stroke="#1A1817" strokeWidth="3" fill="none" />
        </g>

        {/* Sculptural Floor Lamp on Right */}
        <g>
          <line x1="740" y1="420" x2="740" y2="180" stroke="#1A1817" strokeWidth="4" />
          <ellipse cx="740" cy="420" rx="20" ry="6" fill="#1A1817" />
          {/* Lamp shade */}
          <polygon points="710,180 770,180 780,220 700,220" fill="#EFE8DC" stroke="#1A1817" strokeWidth="2" />
          {/* Lamp Warm Glow if Evening */}
          {lighting === 'evening' && (
            <circle cx="740" cy="220" r="90" fill="#FFA726" opacity="0.25" filter="blur(10px)" />
          )}
        </g>
      </svg>
    </div>
  );
}

/**
 * 2. Primary Bedroom Scene Component
 */
function BedroomScene({ accentColor, mainColor, trimColor, lighting }) {
  return (
    <div className="w-full h-full relative overflow-hidden transition-colors duration-700">
      <svg
        viewBox="0 0 800 500"
        className="w-full h-full object-cover"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Main Ceiling & Side Wall */}
        <rect x="0" y="0" width="800" height="420" fill={mainColor} className="transition-colors duration-700" />

        {/* Headboard Focal Wall Arch Feature */}
        <path
          d="M150 420 L150 160 C150 60 650 60 650 160 L650 420 Z"
          fill={accentColor}
          className="transition-colors duration-700"
        />

        {/* Trim Crown & Base */}
        <rect x="0" y="0" width="800" height="18" fill={trimColor} className="transition-colors duration-700" />
        <rect x="0" y="410" width="800" height="16" fill={trimColor} className="transition-colors duration-700" />

        {/* Warm Ash Wood Flooring */}
        <rect x="0" y="426" width="800" height="74" fill="#BFA68A" />
        <line x1="200" y1="426" x2="160" y2="500" stroke="#AA9074" strokeWidth="2" />
        <line x1="420" y1="426" x2="380" y2="500" stroke="#AA9074" strokeWidth="2" />
        <line x1="640" y1="426" x2="600" y2="500" stroke="#AA9074" strokeWidth="2" />

        {/* Modern Fluted Wood Headboard & Bed */}
        <g>
          {/* Headboard */}
          <rect x="220" y="210" width="360" height="180" rx="16" fill="#3D2B1F" />
          <rect x="230" y="220" width="340" height="160" rx="10" fill="#4E382A" />

          {/* Bed Base & Mattress */}
          <rect x="240" y="320" width="320" height="100" rx="12" fill="#FAF7F2" />
          {/* Textured Duvet Quilt */}
          <rect x="250" y="340" width="300" height="80" rx="8" fill="#E8DEC9" />

          {/* Twin Pillows */}
          <rect x="270" y="270" width="110" height="60" rx="14" fill="#FFFFFF" stroke="#E2D9CC" strokeWidth="2" />
          <rect x="420" y="270" width="110" height="60" rx="14" fill="#FFFFFF" stroke="#E2D9CC" strokeWidth="2" />

          {/* Decorative Pillow */}
          <circle cx="400" cy="315" r="20" fill={accentColor} />
        </g>

        {/* Nightstands with Minimalist Table Lamps */}
        <g>
          {/* Left Nightstand */}
          <rect x="130" y="330" width="70" height="90" rx="8" fill="#3D2B1F" />
          <line x1="165" y1="330" x2="165" y2="280" stroke="#1A1817" strokeWidth="3" />
          <circle cx="165" cy="275" r="14" fill="#FAF7F2" stroke="#1A1817" strokeWidth="2" />

          {/* Right Nightstand */}
          <rect x="600" y="330" width="70" height="90" rx="8" fill="#3D2B1F" />
          <line x1="635" y1="330" x2="635" y2="280" stroke="#1A1817" strokeWidth="3" />
          <circle cx="635" cy="275" r="14" fill="#FAF7F2" stroke="#1A1817" strokeWidth="2" />

          {/* Night Lamp Warm Rays if Evening */}
          {lighting === 'evening' && (
            <>
              <circle cx="165" cy="275" r="50" fill="#FFA726" opacity="0.3" filter="blur(8px)" />
              <circle cx="635" cy="275" r="50" fill="#FFA726" opacity="0.3" filter="blur(8px)" />
            </>
          )}
        </g>

        {/* Ambient Window Glow on Left */}
        <polygon
          points="0,60 120,400 0,400"
          fill={lighting === 'goldenHour' ? '#FFA726' : '#FFF9C4'}
          opacity={lighting === 'evening' ? '0.05' : '0.15'}
        />
      </svg>
    </div>
  );
}

/**
 * 3. Exterior Facade Scene Component
 */
function ExteriorScene({ facadeColor, doorColor, trimColor, lighting }) {
  return (
    <div className="w-full h-full relative overflow-hidden transition-colors duration-700">
      <svg
        viewBox="0 0 800 500"
        className="w-full h-full object-cover"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Sky Background */}
        <rect
          x="0"
          y="0"
          width="800"
          height="500"
          fill={lighting === 'goldenHour' ? '#FBC02D' : lighting === 'evening' ? '#1E293B' : '#BAE6FD'}
        />

        {/* Main Masonry Facade Wall */}
        <rect
          x="80"
          y="70"
          width="640"
          height="370"
          fill={facadeColor}
          className="transition-colors duration-700 shadow-xl"
        />

        {/* Roof Parapet & Architectural Cornice */}
        <rect x="60" y="55" width="680" height="22" fill={trimColor} className="transition-colors duration-700" />
        <rect x="70" y="45" width="660" height="12" fill="#2B2622" />

        {/* Stone Porch Foundation & Paving */}
        <rect x="0" y="440" width="800" height="60" fill="#696560" />
        <rect x="180" y="430" width="440" height="15" fill="#8C8780" />

        {/* Symmetrical Upper Windows with Trim Frames & Shutters */}
        <g>
          {/* Left Window */}
          <rect x="160" y="110" width="110" height="140" fill="#E2EDF8" stroke={trimColor} strokeWidth="10" />
          <line x1="215" y1="110" x2="215" y2="250" stroke={trimColor} strokeWidth="6" />
          <line x1="160" y1="180" x2="270" y2="180" stroke={trimColor} strokeWidth="6" />

          {/* Right Window */}
          <rect x="530" y="110" width="110" height="140" fill="#E2EDF8" stroke={trimColor} strokeWidth="10" />
          <line x1="585" y1="110" x2="585" y2="250" stroke={trimColor} strokeWidth="6" />
          <line x1="530" y1="180" x2="640" y2="180" stroke={trimColor} strokeWidth="6" />
        </g>

        {/* Center Grand Entrance Portico & Front Door */}
        <g>
          {/* Portico Arch surround */}
          <path
            d="M320 440 L320 250 C320 200 480 200 480 250 L480 440 Z"
            fill={trimColor}
            className="transition-colors duration-700"
          />

          {/* Front Door Opening */}
          <rect
            x="345"
            y="250"
            width="110"
            height="180"
            rx="6"
            fill={doorColor}
            className="transition-colors duration-700"
          />

          {/* Door panels & brass knocker */}
          <rect x="355" y="265" width="40" height="60" rx="4" fill="rgba(0,0,0,0.15)" />
          <rect x="405" y="265" width="40" height="60" rx="4" fill="rgba(0,0,0,0.15)" />
          <rect x="355" y="345" width="40" height="70" rx="4" fill="rgba(0,0,0,0.15)" />
          <rect x="405" y="345" width="40" height="70" rx="4" fill="rgba(0,0,0,0.15)" />

          {/* Brass handle & letter plate */}
          <circle cx="440" cy="340" r="5" fill="#F59E0B" />
          <rect x="375" y="325" width="50" height="8" rx="2" fill="#F59E0B" />
        </g>

        {/* Planter Urns flanking front steps */}
        <g>
          <rect x="250" y="380" width="40" height="50" rx="6" fill="#3D322A" />
          <ellipse cx="270" cy="370" rx="28" ry="32" fill="#34523A" />

          <rect x="510" y="380" width="40" height="50" rx="6" fill="#3D322A" />
          <ellipse cx="530" cy="370" rx="28" ry="32" fill="#34523A" />
        </g>
      </svg>
    </div>
  );
}
