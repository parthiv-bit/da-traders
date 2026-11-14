/**
 * Paint Calculator Logic
 */

export function calculatePaintCoverage({
  length = 4,
  width = 3.5,
  height = 2.7,
  unit = 'm', // 'm' or 'ft'
  doors = 1,
  windows = 2,
  coats = 2,
  surfaceType = 'smooth', // 'smooth', 'textured', 'raw'
  includeCeiling = false,
}) {
  // Convert feet to meters if imperial
  const l = unit === 'ft' ? length * 0.3048 : parseFloat(length) || 0;
  const w = unit === 'ft' ? width * 0.3048 : parseFloat(width) || 0;
  const h = unit === 'ft' ? height * 0.3048 : parseFloat(height) || 0;

  // Perimeter * Height = Gross Wall Area (sq meters)
  const perimeter = 2 * (l + w);
  let wallArea = perimeter * h;

  // Deduct openings: standard door ~ 1.89 m², standard window ~ 1.4 m²
  const doorDeduction = (parseInt(doors) || 0) * 1.89;
  const windowDeduction = (parseInt(windows) || 0) * 1.4;
  
  let netWallArea = Math.max(0, wallArea - doorDeduction - windowDeduction);

  if (includeCeiling) {
    const ceilingArea = l * w;
    netWallArea += ceilingArea;
  }

  // Coverage rates in sq. meters per liter per coat
  const coverageRates = {
    smooth: 12,    // standard primed drywall
    textured: 9.5, // plaster, orange peel, brick
    raw: 8.0,      // porous raw drywall or masonry
  };

  const rate = coverageRates[surfaceType] || 12;

  // Total required area with coats
  const totalAreaToCover = netWallArea * (parseInt(coats) || 1);
  const rawLitres = totalAreaToCover / rate;
  
  // Add 10% safety margin for cutting in, roller absorb, touch-ups
  const recommendedLitres = Math.round((rawLitres * 1.1) * 10) / 10;

  // Calculate optimized can combination (20L, 10L, 4L, 1L)
  let remainingLitres = Math.ceil(recommendedLitres);
  const cans = {
    can20L: 0,
    can10L: 0,
    can4L: 0,
    can1L: 0,
  };

  if (remainingLitres >= 20) {
    cans.can20L = Math.floor(remainingLitres / 20);
    remainingLitres %= 20;
  }
  if (remainingLitres >= 10) {
    cans.can10L = Math.floor(remainingLitres / 10);
    remainingLitres %= 10;
  }
  if (remainingLitres >= 4) {
    cans.can4L = Math.floor(remainingLitres / 4);
    remainingLitres %= 4;
  }
  cans.can1L = remainingLitres;

  // Primer recommendation
  const primerLitres = surfaceType === 'raw' ? Math.ceil((netWallArea / 10) * 1.1) : (surfaceType === 'textured' ? Math.ceil(netWallArea / 12) : 0);

  return {
    wallArea: Math.round(netWallArea * 10) / 10,
    totalAreaToCover: Math.round(totalAreaToCover * 10) / 10,
    litres: Math.max(1, recommendedLitres),
    cans,
    primerLitres,
    estimatedCostMin: Math.round(recommendedLitres * 18),
    estimatedCostMax: Math.round(recommendedLitres * 26),
  };
}
