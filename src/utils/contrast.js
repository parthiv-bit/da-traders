/**
 * WCAG AA Contrast and Color Utilities
 */

// Convert HEX to RGB
export function hexToRgb(hex) {
  let cleanHex = hex.replace('#', '');
  if (cleanHex.length === 3) {
    cleanHex = cleanHex.split('').map(c => c + c).join('');
  }
  const num = parseInt(cleanHex, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255
  };
}

// Calculate relative luminance based on WCAG standard
export function getLuminance(hex) {
  const { r, g, b } = hexToRgb(hex);
  const a = [r, g, b].map(v => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

// Determine optimal readable text color (dark charcoal or pure white)
export function getContrastTextColor(hex) {
  const luminance = getLuminance(hex);
  // WCAG contrast threshold: if luminance > 0.38, dark text gives superior contrast
  return luminance > 0.38 ? '#1A1817' : '#FFFFFF';
}

// Secondary text color for subtler metadata over swatch
export function getSubtleContrastTextColor(hex) {
  const luminance = getLuminance(hex);
  return luminance > 0.38 ? 'rgba(26, 24, 23, 0.7)' : 'rgba(255, 255, 255, 0.8)';
}

// Convert RGB object to CSS string
export function rgbToString({ r, g, b }, alpha = 1) {
  return alpha < 1 ? `rgba(${r}, ${g}, ${b}, ${alpha})` : `rgb(${r}, ${g}, ${b})`;
}
