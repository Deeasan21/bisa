import { useId } from 'react';

/**
 * NeaOnnim — Adinkra symbol "Nea Onnim No Sua A, Ohu"
 * Meaning: "He who does not know can know from learning"
 *
 * Faithful SVG recreation of the Wikimedia Commons source geometry.
 * viewBox: 0 0 390 390, stroke-width: 30
 *
 * Props:
 *   size        — rendered width/height in px (default 64)
 *   color       — override stroke color (default: currentColor / gradient for "full")
 *   variant     — "full" | "standard" | "minimal" | "icon"
 *                  full     : warm gold gradient + soft drop shadow
 *                  standard : currentColor, all elements, clean
 *                  minimal  : currentColor, core structure only (for tiny sizes)
 *                  icon     : gold gradient, 3 elements only — optimised for ≤48px
 *   withAnimation — boolean, enables draw-on stroke animation (~1.2s)
 *   className   — additional CSS classes
 */
export default function NeaOnnim({
  size = 64,
  color,
  variant = 'standard',
  withAnimation = false,
  className = '',
  style = {},
}) {
  const uid = useId().replace(/:/g, '');
  const gradientId = `nea-grad-${uid}`;

  // Resolve stroke color
  const strokeColor =
    (variant === 'full' || variant === 'icon') && !color
      ? `url(#${gradientId})`
      : color || 'currentColor';

  // Drop shadow for "full" / "icon" variants
  const dropShadow =
    variant === 'full' || variant === 'icon'
      ? { filter: 'drop-shadow(0 2px 6px rgba(196, 138, 26, 0.35))' }
      : {};

  // Animation helpers
  // Max path length: rect perimeter = 2*(360+120) = 960 — use 1000 to be safe
  const DASH = 1000;

  const anim = (i) =>
    withAnimation
      ? {
          strokeDasharray: DASH,
          strokeDashoffset: DASH,
          animation: `neaOnnimDraw 0.5s ease forwards ${(i * 0.07).toFixed(2)}s`,
        }
      : {};

  // Shared stroke props
  const sq = (i) => ({
    fill: 'none',
    stroke: strokeColor,
    strokeWidth: 30,
    strokeLinecap: 'square',
    strokeMiterlimit: 10,
    ...anim(i),
  });

  // "b" class in original: same as sq but no explicit linecap (defaults to butt)
  const bt = (i) => ({
    fill: 'none',
    stroke: strokeColor,
    strokeWidth: 30,
    strokeMiterlimit: 10,
    ...anim(i),
  });

  return (
    <svg
      viewBox="0 0 390 390"
      width={size}
      height={size}
      className={className}
      style={{ ...dropShadow, ...style }}
      aria-label="Nea Onnim — Adinkra symbol for lifelong learning"
      role="img"
    >
      <defs>
        {(variant === 'full' || variant === 'icon') && (
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color || '#E8C260'} />
            <stop offset="100%" stopColor={color ? color : '#9A6B1F'} />
          </linearGradient>
        )}
      </defs>

      {/* ── Icon variant: 3 elements only, readable at ≤48px ── */}
      {variant === 'icon' && (
        <>
          <rect x="15" y="135" width="360" height="120" {...sq(0)} />
          <line x1="255" y1="15" x2="255" y2="375" {...sq(1)} />
          <line x1="135" y1="15" x2="135" y2="375" {...sq(2)} />
        </>
      )}

      {/* ── Full / standard / minimal geometry ── */}
      {variant !== 'icon' && (<>

      {/* Central horizontal band */}
      <rect x="15" y="135" width="360" height="120" {...sq(0)} />

      {/* Full-height verticals */}
      <line x1="255" y1="15" x2="255" y2="375" {...sq(1)} />
      <line x1="135" y1="15" x2="135" y2="375" {...sq(2)} />

      {/* Center verticals above and below the band */}
      <line x1="195" y1="15" x2="195" y2="135" {...sq(3)} />
      <line x1="195" y1="255" x2="195" y2="375" {...sq(4)} />

      {/* ── Detail lines (hidden at minimal variant) ── */}

      {variant !== 'minimal' && (
        <>
          {/* Side verticals within the band */}
          <line x1="75" y1="135" x2="75" y2="255" {...sq(5)} />
          <line x1="315" y1="135" x2="315" y2="255" {...sq(6)} />

          {/* Center horizontal between main verticals */}
          <line x1="135" y1="195" x2="255" y2="195" {...sq(7)} />
        </>
      )}

      {/* ── Corner L-brackets (all variants) ── */}

      {/* Top-right outer */}
      <line x1="255" y1="15" x2="375" y2="15" {...sq(8)} />
      {/* Top-right inner stub */}
      <line x1="255" y1="75" x2="360" y2="75" {...bt(9)} />

      {/* Top-left outer */}
      <line x1="135" y1="15" x2="15" y2="15" {...sq(10)} />
      {/* Top-left inner stub */}
      <line x1="30" y1="75" x2="135" y2="75" {...bt(11)} />

      {/* Bottom-left outer */}
      <line x1="135" y1="375" x2="15" y2="375" {...sq(12)} />
      {/* Bottom-left inner stub */}
      <line x1="135" y1="315" x2="30" y2="315" {...bt(13)} />

      {/* Bottom-right outer */}
      <line x1="255" y1="375" x2="375" y2="375" {...sq(14)} />
      {/* Bottom-right inner stub */}
      <line x1="255" y1="315" x2="360" y2="315" {...bt(15)} />

      </>)}
    </svg>
  );
}
