import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, X, Sparkles, Paintbrush, ArrowUpDown, Filter } from 'lucide-react';
import SwatchCard from '../components/SwatchCard';
import { COLORS, COLOR_FAMILIES } from '../data/colors';

export default function ColorExplorerSection({
  onSelectColor,
  palette = [],
  onToggleFavorite,
  onTestInRoom,
  onShowToast,
}) {
  const [selectedFamily, setSelectedFamily] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFinish, setSelectedFinish] = useState('all');
  const [sortBy, setSortBy] = useState('default'); // 'default', 'lrv-desc', 'lrv-asc', 'name'
  const [onlyFavorites, setOnlyFavorites] = useState(false);

  // Filter & Search Logic
  const filteredColors = useMemo(() => {
    return COLORS.filter((c) => {
      // Family filter
      if (selectedFamily !== 'all' && c.family !== selectedFamily) return false;

      // Finish filter
      if (selectedFinish !== 'all' && !c.finishes.includes(selectedFinish)) return false;

      // Favorites only filter
      if (onlyFavorites && !palette.some((p) => p.id === c.id)) return false;

      // Search query (matches name, code, undertone, or hex)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = c.name.toLowerCase().includes(query);
        const matchesCode = c.code.toLowerCase().includes(query);
        const matchesHex = c.hex.toLowerCase().includes(query);
        const matchesUndertone = c.undertone.toLowerCase().includes(query);
        if (!matchesName && !matchesCode && !matchesHex && !matchesUndertone) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'lrv-desc') return b.lrv - a.lrv;
      if (sortBy === 'lrv-asc') return a.lrv - b.lrv;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });
  }, [selectedFamily, selectedFinish, onlyFavorites, searchQuery, sortBy, palette]);

  const resetAllFilters = () => {
    setSelectedFamily('all');
    setSearchQuery('');
    setSelectedFinish('all');
    setSortBy('default');
    setOnlyFavorites(false);
  };

  return (
    <section id="colors" className="py-20 sm:py-28 bg-paint-surface relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-paint-surfaceAlt border border-paint-border text-xs font-bold text-paint-charcoal">
              <Paintbrush className="w-3.5 h-3.5 text-paint-terracotta" />
              <span>Architectural Specimen Library</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-paint-charcoal tracking-tight">
              Curated Color Explorer
            </h2>
            <p className="text-sm sm:text-base text-paint-muted leading-relaxed">
              Explore 32 handcrafted formulations mixed with high-density mineral pigments. 
              Search by tone, filter by light reflectance, or pin swatches to test in your space.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold font-mono px-3 py-1.5 rounded-full bg-white border border-paint-border text-paint-charcoal shadow-xs">
              Showing {filteredColors.length} of {COLORS.length} Hues
            </span>
          </div>
        </div>

        {/* Color Family Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 pt-1 custom-scrollbar">
          {COLOR_FAMILIES.map((family) => {
            const isSelected = selectedFamily === family.id;
            return (
              <button
                key={family.id}
                onClick={() => setSelectedFamily(family.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold shrink-0 transition-all ${
                  isSelected
                    ? 'bg-paint-charcoal text-white shadow-sm'
                    : 'bg-white text-paint-charcoal border border-paint-border hover:bg-paint-surfaceAlt hover:border-paint-charcoal/40'
                }`}
              >
                {family.color && (
                  <span
                    className="w-3.5 h-3.5 rounded-full shrink-0 shadow-xs border border-black/10"
                    style={{ backgroundColor: family.color }}
                  />
                )}
                <span>{family.label}</span>
              </button>
            );
          })}
        </div>

        {/* Search, Finish and Sorting Toolbar */}
        <div className="mt-4 p-4 rounded-3xl bg-white border border-paint-border shadow-soft flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-paint-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by color name, code (e.g. PR-201), or tone..."
              className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-paint-surfaceAlt text-xs sm:text-sm text-paint-charcoal placeholder:text-stone-400 border border-paint-border focus:outline-none focus:border-paint-terracotta focus:ring-1 focus:ring-paint-terracotta transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-paint-muted hover:text-paint-charcoal p-1"
                aria-label="Clear search input"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Filter Controls */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Finish Filter Dropdown */}
            <div className="flex items-center gap-1.5 bg-paint-surfaceAlt px-3 py-2 rounded-xl border border-paint-border text-xs">
              <Filter className="w-3.5 h-3.5 text-paint-muted" />
              <span className="font-semibold text-paint-muted">Finish:</span>
              <select
                value={selectedFinish}
                onChange={(e) => setSelectedFinish(e.target.value)}
                className="bg-transparent font-bold text-paint-charcoal focus:outline-none cursor-pointer"
                aria-label="Filter by paint finish"
              >
                <option value="all">All Finishes</option>
                <option value="Matte">Matte Only</option>
                <option value="Eggshell">Eggshell Only</option>
                <option value="Satin">Satin Only</option>
                <option value="Gloss">Gloss Only</option>
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 bg-paint-surfaceAlt px-3 py-2 rounded-xl border border-paint-border text-xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-paint-muted" />
              <span className="font-semibold text-paint-muted">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent font-bold text-paint-charcoal focus:outline-none cursor-pointer"
                aria-label="Sort paint colors"
              >
                <option value="default">Curated Order</option>
                <option value="lrv-desc">Lightest (High LRV)</option>
                <option value="lrv-asc">Darkest (Low LRV)</option>
                <option value="name">Name (A-Z)</option>
              </select>
            </div>

            {/* Pinned Only Toggle */}
            <button
              onClick={() => setOnlyFavorites(!onlyFavorites)}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all border ${
                onlyFavorites
                  ? 'bg-paint-terracotta text-white border-paint-terracotta'
                  : 'bg-paint-surfaceAlt text-paint-charcoal border-paint-border hover:bg-stone-200'
              }`}
            >
              My Palette ({palette.length})
            </button>
          </div>
        </div>

        {/* Swatch Grid */}
        <div className="mt-8">
          {filteredColors.length === 0 ? (
            <div className="py-20 text-center bg-white rounded-4xl border border-dashed border-paint-border p-8">
              <div className="w-14 h-14 rounded-full bg-paint-surfaceAlt text-paint-muted flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-paint-charcoal">
                No matching paint colors found
              </h3>
              <p className="text-xs sm:text-sm text-paint-muted mt-1 max-w-sm mx-auto">
                Try searching for broader keywords like "green", "terracotta", "warm greige", or clear your active filters.
              </p>
              <button
                onClick={resetAllFilters}
                className="mt-5 px-6 py-2.5 rounded-full bg-paint-charcoal text-white text-xs font-bold hover:bg-paint-charcoalSoft transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-6"
            >
              {filteredColors.map((color) => {
                const isFav = palette.some((p) => p.id === color.id);
                return (
                  <SwatchCard
                    key={color.id}
                    color={color}
                    isFavorite={isFav}
                    onSelect={onSelectColor}
                    onToggleFavorite={onToggleFavorite}
                    onTestInRoom={onTestInRoom}
                    onShowToast={onShowToast}
                  />
                );
              })}
            </motion.div>
          )}
        </div>

      </div>
    </section>
  );
}
