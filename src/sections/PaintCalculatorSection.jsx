import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Sparkles, Check, HelpCircle, Layers, Droplet, ArrowRight, RotateCcw } from 'lucide-react';
import { calculatePaintCoverage } from '../utils/calculator';

export default function PaintCalculatorSection({ onShowToast, onAddEstimateToQuote }) {
  const [unit, setUnit] = useState('m'); // 'm' or 'ft'
  const [length, setLength] = useState(4.5);
  const [width, setWidth] = useState(3.5);
  const [height, setHeight] = useState(2.7);
  const [doors, setDoors] = useState(1);
  const [windows, setWindows] = useState(2);
  const [coats, setCoats] = useState(2);
  const [surfaceType, setSurfaceType] = useState('smooth'); // 'smooth', 'textured', 'raw'
  const [includeCeiling, setIncludeCeiling] = useState(false);

  // Compute coverage using our math utility
  const result = useMemo(() => {
    return calculatePaintCoverage({
      length,
      width,
      height,
      unit,
      doors,
      windows,
      coats,
      surfaceType,
      includeCeiling,
    });
  }, [length, width, height, unit, doors, windows, coats, surfaceType, includeCeiling]);

  const handleReset = () => {
    setLength(4.5);
    setWidth(3.5);
    setHeight(2.7);
    setDoors(1);
    setWindows(2);
    setCoats(2);
    setSurfaceType('smooth');
    setIncludeCeiling(false);
  };

  const handleAddEstimate = () => {
    onAddEstimateToQuote?.(result);
    onShowToast?.(`Added estimate (${result.litres}L) to your project consultation request!`);
  };

  return (
    <section id="calculator" className="py-20 sm:py-28 bg-paint-surfaceAlt relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-paint-border text-xs font-bold text-paint-charcoal shadow-xs">
            <Calculator className="w-3.5 h-3.5 text-paint-terracotta" />
            <span>Architectural Coverage Estimator</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-paint-charcoal tracking-tight">
            Accurate Paint Calculator
          </h2>
          <p className="text-sm sm:text-base text-paint-muted">
            Never under-order or end up with 3 extra tins in the garage. Enter your room dimensions 
            and our algorithm factors in window deductions, wall porosity, and a 10% safety margin.
          </p>
        </div>

        {/* Calculator Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Inputs Column (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-4xl p-6 sm:p-8 border border-paint-border shadow-card space-y-6">
            
            {/* Unit Switcher & Reset */}
            <div className="flex items-center justify-between pb-4 border-b border-paint-border">
              <span className="text-xs font-bold text-paint-charcoal uppercase tracking-wider">
                1. Room Dimensions
              </span>

              <div className="flex items-center gap-3">
                <div className="flex items-center bg-paint-surfaceAlt p-1 rounded-xl border border-paint-border text-xs">
                  <button
                    onClick={() => {
                      if (unit !== 'm') {
                        setUnit('m');
                        setLength(Math.round(length * 0.3048 * 10) / 10);
                        setWidth(Math.round(width * 0.3048 * 10) / 10);
                        setHeight(Math.round(height * 0.3048 * 10) / 10);
                      }
                    }}
                    className={`px-3 py-1 rounded-lg font-bold transition-all ${
                      unit === 'm' ? 'bg-white text-paint-charcoal shadow-2xs' : 'text-paint-muted'
                    }`}
                  >
                    Meters (m)
                  </button>
                  <button
                    onClick={() => {
                      if (unit !== 'ft') {
                        setUnit('ft');
                        setLength(Math.round((length / 0.3048) * 10) / 10);
                        setWidth(Math.round((width / 0.3048) * 10) / 10);
                        setHeight(Math.round((height / 0.3048) * 10) / 10);
                      }
                    }}
                    className={`px-3 py-1 rounded-lg font-bold transition-all ${
                      unit === 'ft' ? 'bg-white text-paint-charcoal shadow-2xs' : 'text-paint-muted'
                    }`}
                  >
                    Feet (ft)
                  </button>
                </div>

                <button
                  onClick={handleReset}
                  className="p-1.5 text-paint-muted hover:text-paint-charcoal transition-colors rounded-lg hover:bg-paint-surfaceAlt"
                  title="Reset inputs"
                  aria-label="Reset calculator inputs"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Length, Width, Height Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold text-paint-charcoal block mb-1.5">
                  Length ({unit})
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="1"
                  max="50"
                  value={length}
                  onChange={(e) => setLength(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 rounded-2xl bg-paint-surfaceAlt border border-paint-border text-paint-charcoal font-bold text-sm focus:outline-none focus:border-paint-terracotta"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-paint-charcoal block mb-1.5">
                  Width ({unit})
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="1"
                  max="50"
                  value={width}
                  onChange={(e) => setWidth(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 rounded-2xl bg-paint-surfaceAlt border border-paint-border text-paint-charcoal font-bold text-sm focus:outline-none focus:border-paint-terracotta"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-paint-charcoal block mb-1.5">
                  Ceiling Height ({unit})
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="1.5"
                  max="12"
                  value={height}
                  onChange={(e) => setHeight(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 rounded-2xl bg-paint-surfaceAlt border border-paint-border text-paint-charcoal font-bold text-sm focus:outline-none focus:border-paint-terracotta"
                />
              </div>
            </div>

            {/* Deductions: Doors & Windows */}
            <div>
              <span className="text-xs font-bold text-paint-charcoal uppercase tracking-wider block mb-3">
                2. Openings to Deduct
              </span>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3.5 bg-paint-surfaceAlt rounded-2xl border border-paint-border flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-paint-charcoal block">Doors</span>
                    <span className="text-[10px] text-paint-muted">~ 1.89 m² each</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setDoors(Math.max(0, doors - 1))}
                      className="w-7 h-7 rounded-lg bg-white border border-paint-border text-paint-charcoal font-bold flex items-center justify-center hover:bg-stone-100"
                    >
                      -
                    </button>
                    <span className="text-sm font-bold font-mono w-4 text-center">{doors}</span>
                    <button
                      onClick={() => setDoors(doors + 1)}
                      className="w-7 h-7 rounded-lg bg-white border border-paint-border text-paint-charcoal font-bold flex items-center justify-center hover:bg-stone-100"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="p-3.5 bg-paint-surfaceAlt rounded-2xl border border-paint-border flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-paint-charcoal block">Windows</span>
                    <span className="text-[10px] text-paint-muted">~ 1.4 m² each</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setWindows(Math.max(0, windows - 1))}
                      className="w-7 h-7 rounded-lg bg-white border border-paint-border text-paint-charcoal font-bold flex items-center justify-center hover:bg-stone-100"
                    >
                      -
                    </button>
                    <span className="text-sm font-bold font-mono w-4 text-center">{windows}</span>
                    <button
                      onClick={() => setWindows(windows + 1)}
                      className="w-7 h-7 rounded-lg bg-white border border-paint-border text-paint-charcoal font-bold flex items-center justify-center hover:bg-stone-100"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Coats & Surface Condition */}
            <div>
              <span className="text-xs font-bold text-paint-charcoal uppercase tracking-wider block mb-3">
                3. Number of Coats &amp; Wall Surface
              </span>

              {/* Coats selector */}
              <div className="flex items-center gap-2 mb-4">
                {[
                  { count: 1, label: '1 Coat (Touch-up only)' },
                  { count: 2, label: '2 Coats (Recommended Standard)' },
                  { count: 3, label: '3 Coats (Deep Color Change)' },
                ].map((c) => (
                  <button
                    key={c.count}
                    onClick={() => setCoats(c.count)}
                    className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold border transition-all text-center ${
                      coats === c.count
                        ? 'bg-paint-charcoal text-white border-paint-charcoal shadow-xs'
                        : 'bg-paint-surfaceAlt text-paint-muted border-paint-border hover:border-paint-charcoal/40'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>

              {/* Surface condition tabs */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'smooth', label: 'Smooth Primed Wall', desc: '12 m²/L' },
                  { id: 'textured', label: 'Plaster / Orange Peel', desc: '9.5 m²/L' },
                  { id: 'raw', label: 'Raw Drywall / Porous', desc: '8 m²/L' },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSurfaceType(s.id)}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      surfaceType === s.id
                        ? 'bg-paint-surfaceAlt border-paint-charcoal font-bold shadow-2xs'
                        : 'border-paint-border bg-white text-paint-muted hover:border-stone-400'
                    }`}
                  >
                    <div className="text-xs font-bold text-paint-charcoal">{s.label}</div>
                    <div className="text-[10px] text-paint-muted mt-0.5">{s.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Ceiling Checkbox */}
            <label className="flex items-center gap-3 p-3.5 bg-paint-surfaceAlt rounded-2xl border border-paint-border cursor-pointer hover:bg-stone-200 transition-colors">
              <input
                type="checkbox"
                checked={includeCeiling}
                onChange={(e) => setIncludeCeiling(e.target.checked)}
                className="w-4 h-4 rounded text-paint-terracotta focus:ring-paint-terracotta border-paint-border"
              />
              <div className="text-xs">
                <span className="font-bold text-paint-charcoal block">Include Ceiling Area in Calculation</span>
                <span className="text-paint-muted text-[11px]">Adds +{Math.round(length * width * 10) / 10} m² to your estimate</span>
              </div>
            </label>
          </div>

          {/* Results Summary Column (5 Cols) */}
          <div className="lg:col-span-5 bg-paint-charcoal text-white rounded-4xl p-6 sm:p-8 shadow-card relative overflow-hidden flex flex-col justify-between">
            {/* Decorative background glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-paint-terracotta/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-stone-800">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-paint-ochre">
                  Estimation Output
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-stone-800 text-stone-300 font-mono">
                  +10% Buffer Included
                </span>
              </div>

              {/* Big Result Number */}
              <div>
                <span className="text-xs uppercase font-bold text-stone-400 tracking-wider block">
                  Recommended Total Paint Volume
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="font-display font-extrabold text-5xl sm:text-6xl text-white">
                    {result.litres}
                  </span>
                  <span className="font-display font-bold text-2xl text-paint-sunshine">
                    Litres
                  </span>
                </div>
                <p className="text-xs text-stone-400 mt-2">
                  To cover {result.wallArea} m² of net wall surface with {coats} coat{coats > 1 ? 's' : ''}.
                </p>
              </div>

              {/* Optimized Can Combination Breakdown */}
              <div className="bg-stone-900/80 p-4 rounded-2xl border border-stone-800 space-y-2.5">
                <span className="text-xs font-bold text-stone-300 uppercase tracking-wider block">
                  Optimized Can Combination:
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {result.cans.can20L > 0 && (
                    <div className="bg-stone-800/90 p-2.5 rounded-xl border border-stone-700">
                      <span className="font-bold text-white block">{result.cans.can20L} × 20L Drum</span>
                      <span className="text-[10px] text-stone-400">Large area economy</span>
                    </div>
                  )}
                  {result.cans.can10L > 0 && (
                    <div className="bg-stone-800/90 p-2.5 rounded-xl border border-stone-700">
                      <span className="font-bold text-white block">{result.cans.can10L} × 10L Tin</span>
                      <span className="text-[10px] text-stone-400">Room master size</span>
                    </div>
                  )}
                  {result.cans.can4L > 0 && (
                    <div className="bg-stone-800/90 p-2.5 rounded-xl border border-stone-700">
                      <span className="font-bold text-white block">{result.cans.can4L} × 4L Can</span>
                      <span className="text-[10px] text-stone-400">Standard room size</span>
                    </div>
                  )}
                  {result.cans.can1L > 0 && (
                    <div className="bg-stone-800/90 p-2.5 rounded-xl border border-stone-700">
                      <span className="font-bold text-white block">{result.cans.can1L} × 1L Tin</span>
                      <span className="text-[10px] text-stone-400">Cut-in &amp; touch-up</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Primer Note if raw surface */}
              {result.primerLitres > 0 && (
                <div className="p-3 bg-amber-950/60 rounded-2xl border border-amber-800/60 flex items-start gap-2.5 text-xs text-amber-200">
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">Primer Required for this Surface</span>
                    <span>
                      Add approx <strong>{result.primerLitres}L of Universal Gripper Primer</strong> to prevent patch absorption.
                    </span>
                  </div>
                </div>
              )}

              {/* Price Range */}
              <div className="pt-2 flex items-center justify-between text-xs border-t border-stone-800">
                <span className="text-stone-400">Estimated Trade Price Range:</span>
                <span className="font-mono font-bold text-base text-emerald-400">
                  ${result.estimatedCostMin} – ${result.estimatedCostMax}
                </span>
              </div>
            </div>

            {/* Action CTA */}
            <div className="relative z-10 pt-6">
              <button
                onClick={handleAddEstimate}
                className="w-full py-4 rounded-2xl bg-white hover:bg-stone-100 text-paint-charcoal text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-card hover:shadow-card-hover transition-all"
              >
                <span>Add Cans to Consultation Quote</span>
                <ArrowRight className="w-4 h-4 text-paint-terracotta" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
