import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Copy, Check, Eye, Paintbrush } from 'lucide-react';
import { getContrastTextColor, getSubtleContrastTextColor } from '../utils/contrast';

export default function SwatchCard({
  color,
  onSelect,
  isFavorite = false,
  onToggleFavorite,
  onTestInRoom,
  onShowToast,
}) {
  const [copied, setCopied] = useState(false);

  const textColor = getContrastTextColor(color.hex);
  const subtleColor = getSubtleContrastTextColor(color.hex);

  const handleCopyHex = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(color.hex);
    setCopied(true);
    onShowToast?.(`Copied ${color.name} (${color.hex}) to clipboard!`, color.hex);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    onToggleFavorite?.(color);
  };

  const handleTestClick = (e) => {
    e.stopPropagation();
    onTestInRoom?.(color);
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2 }}
      onClick={() => onSelect?.(color)}
      className="group relative bg-white rounded-3xl p-3 sm:p-3.5 border border-paint-border shadow-soft hover:shadow-card-hover transition-all duration-300 cursor-pointer flex flex-col justify-between"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect?.(color);
        }
      }}
      aria-label={`View paint details for ${color.name}, code ${color.code}, hex ${color.hex}`}
    >
      {/* Visual Color Block with Swatch Texture */}
      <div
        className="relative w-full aspect-[4/3] rounded-2xl p-3.5 flex flex-col justify-between overflow-hidden shadow-inner transition-transform group-hover:scale-[1.01]"
        style={{ backgroundColor: color.hex }}
      >
        {/* Subtle light sheen highlight */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-white/20 pointer-events-none" />

        {/* Top Badges over Swatch */}
        <div className="relative z-10 flex items-center justify-between">
          <span
            className="text-[11px] font-mono font-bold tracking-wider px-2 py-0.5 rounded-full backdrop-blur-md shadow-xs border"
            style={{
              color: textColor,
              backgroundColor: textColor === '#FFFFFF' ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.6)',
              borderColor: textColor === '#FFFFFF' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)',
            }}
          >
            {color.code}
          </span>

          <div className="flex items-center gap-1.5">
            {/* Copy Hex Button */}
            <button
              onClick={handleCopyHex}
              title={`Copy hex ${color.hex}`}
              className="p-1.5 rounded-full backdrop-blur-md transition-all hover:scale-110 focus-visible:ring-2 focus-visible:ring-paint-terracotta"
              style={{
                color: textColor,
                backgroundColor: textColor === '#FFFFFF' ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.6)',
              }}
              aria-label={`Copy hex code ${color.hex}`}
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            </button>

            {/* Favorite Pin Button */}
            <button
              onClick={handleFavoriteClick}
              title={isFavorite ? 'Remove from palette' : 'Add to palette'}
              className="p-1.5 rounded-full backdrop-blur-md transition-all hover:scale-110 focus-visible:ring-2 focus-visible:ring-paint-terracotta"
              style={{
                color: isFavorite ? '#D95D39' : textColor,
                backgroundColor: textColor === '#FFFFFF' ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.6)',
              }}
              aria-label={isFavorite ? `Remove ${color.name} from palette` : `Add ${color.name} to palette`}
            >
              <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-paint-terracotta' : ''}`} />
            </button>
          </div>
        </div>

        {/* Bottom Swatch Stats (LRV indicator) */}
        <div className="relative z-10 flex items-end justify-between">
          <span
            className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-md backdrop-blur-md"
            style={{
              color: subtleColor,
              backgroundColor: textColor === '#FFFFFF' ? 'rgba(0,0,0,0.25)' : 'rgba(255,255,255,0.5)',
            }}
          >
            LRV {color.lrv}%
          </span>

          {color.popular && (
            <span
              className="text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-md"
              style={{
                color: textColor,
                backgroundColor: textColor === '#FFFFFF' ? 'rgba(217, 93, 57, 0.85)' : 'rgba(217, 93, 57, 0.9)',
              }}
            >
              Popular
            </span>
          )}
        </div>
      </div>

      {/* Card Info & Details */}
      <div className="pt-3 px-1 flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-bold text-sm text-paint-charcoal group-hover:text-paint-terracotta transition-colors truncate">
            {color.name}
          </h3>
          <span className="text-[11px] font-mono text-paint-muted">{color.hex}</span>
        </div>

        <p className="text-xs text-paint-muted line-clamp-1">
          {color.undertone}
        </p>

        {/* Action Row */}
        <div className="pt-2 mt-1 border-t border-paint-border/60 flex items-center justify-between text-xs font-semibold">
          <button
            onClick={handleTestClick}
            className="text-paint-charcoal hover:text-paint-terracotta flex items-center gap-1 transition-colors py-1 focus-visible:ring-1 focus-visible:ring-paint-terracotta rounded"
            aria-label={`Test ${color.name} in room visualizer`}
          >
            <Paintbrush className="w-3.5 h-3.5 text-paint-terracotta" />
            <span>Test in Room</span>
          </button>

          <span className="text-paint-muted flex items-center gap-1 group-hover:text-paint-charcoal transition-colors">
            <Eye className="w-3.5 h-3.5" />
            <span>Details</span>
          </span>
        </div>
      </div>
    </motion.div>
  );
}
