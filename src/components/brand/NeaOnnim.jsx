import { useId } from 'react';

/**
 * NeaOnnim — Adinkra symbol "Nea Onnim No Sua A, Ohu"
 * Meaning: "He who does not know can know from learning"
 *
 * Single compound <path> built from 19 filled rectangles — each one is the
 * exact filled equivalent of the original stroke geometry (strokeWidth 30
 * in a 390×390 viewBox → bar width 7.7 in a 100×100 viewBox).
 *
 * No variant system. One path, every size from 16px to 200px.
 *
 * Props:
 *   size          — width/height in px (default 64)
 *   color         — solid color override; defaults to warm gold gradient
 *   withAnimation — fade-in reveal animation (~0.7s)
 *   className     — CSS class passthrough
 *   style         — inline style passthrough
 */
export default function NeaOnnim({
  size = 64,
  color,
  withAnimation = false,
  className = '',
  style = {},
}) {
  const uid = useId().replace(/:/g, '');
  const gradId = `nea-${uid}`;
  const fill = color || `url(#${gradId})`;

  // Compound path — 19 clockwise rectangles.
  // Each `M x y h w v h h-w Z` traces one filled bar.
  // Bars are derived from the original 16-element stroke geometry:
  //   original stroke half-width = 15/390 × 100 = 3.85 → bar width ≈ 7.7
  const d = [
    // ── Central rectangular frame (4 bars) ──────────────────────────
    'M0 30.8h100v7.7h-100Z',          // frame top
    'M0 61.5h100v7.7h-100Z',          // frame bottom
    'M0 38.5h7.7v23.1h-7.7Z',         // frame left side
    'M92.3 38.5h7.7v23.1h-7.7Z',      // frame right side

    // ── Main verticals — full height ─────────────────────────────────
    'M30.8 0h7.7v100h-7.7Z',          // left main vertical
    'M61.5 0h7.7v100h-7.7Z',          // right main vertical

    // ── Center nubs — above and below the frame ──────────────────────
    'M46.2 0h7.7v38.5h-7.7Z',         // top nub
    'M46.2 61.5h7.7v38.5h-7.7Z',      // bottom nub

    // ── Inner verticals — inside the frame only ──────────────────────
    'M15.4 30.8h7.7v38.5h-7.7Z',      // left inner
    'M76.9 30.8h7.7v38.5h-7.7Z',      // right inner

    // ── Center horizontal crossbar ───────────────────────────────────
    'M30.8 46.2h38.5v7.7h-38.5Z',

    // ── Corner L-brackets (outer bar + inner stub × 4) ───────────────
    'M0 0h38.5v7.7h-38.5Z',           // top-left outer
    'M7.7 15.4h26.9v7.7h-26.9Z',      // top-left stub
    'M61.5 0h38.5v7.7h-38.5Z',        // top-right outer
    'M65.4 15.4h26.9v7.7h-26.9Z',     // top-right stub
    'M0 92.3h38.5v7.7h-38.5Z',        // bottom-left outer
    'M7.7 76.9h26.9v7.7h-26.9Z',      // bottom-left stub
    'M61.5 92.3h38.5v7.7h-38.5Z',     // bottom-right outer
    'M65.4 76.9h26.9v7.7h-26.9Z',     // bottom-right stub
  ].join(' ');

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      style={{
        filter: !color
          ? 'drop-shadow(0 2px 6px rgba(196,138,26,0.32))'
          : undefined,
        flexShrink: 0,
        ...style,
      }}
      aria-label="Nea Onnim — Adinkra symbol for lifelong learning"
      role="img"
    >
      <defs>
        {!color && (
          <linearGradient id={gradId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#E8C260" />
            <stop offset="100%" stopColor="#9A6B1F" />
          </linearGradient>
        )}
      </defs>
      <path
        d={d}
        fill={fill}
        fillRule="nonzero"
        style={withAnimation ? {
          animation: 'neaOnnimReveal 0.7s ease forwards',
          transformOrigin: '50% 50%',
          transformBox: 'fill-box',
        } : undefined}
      />
    </svg>
  );
}
