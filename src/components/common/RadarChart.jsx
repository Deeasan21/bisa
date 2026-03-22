import { useMemo } from 'react';
import './RadarChart.css';

/**
 * Pure SVG radar/spider chart.
 *
 * @param {Object}  props
 * @param {Object}  props.scores  — e.g. { "Open-ended": 80, "Empathy": 65 }
 * @param {number}  [props.size=200]   — width & height in px
 * @param {string}  [props.color='#8B5CF6'] — accent / fill colour
 */
export default function RadarChart({
  scores = {},
  size = 200,
  color = '#8B5CF6',
}) {
  const labels = Object.keys(scores);
  const values = Object.values(scores);
  const count = labels.length;

  // Geometry constants
  const cx = size / 2;
  const cy = size / 2;
  const labelMargin = 36;            // px reserved for labels around the chart
  const radius = (size / 2) - labelMargin;
  const gridLevels = [0.25, 0.5, 0.75, 1];

  /**
   * Convert an axis index + fractional radius (0-1) into SVG x,y.
   * 0° points straight up (−π/2 offset).
   */
  const pointAt = (index, fraction) => {
    const angle = (2 * Math.PI * index) / count - Math.PI / 2;
    return {
      x: cx + radius * fraction * Math.cos(angle),
      y: cy + radius * fraction * Math.sin(angle),
    };
  };

  /** Build a polygon "points" string for a given fractional radius. */
  const polygonPoints = (fraction) =>
    Array.from({ length: count }, (_, i) => {
      const { x, y } = pointAt(i, fraction);
      return `${x},${y}`;
    }).join(' ');

  /** Position for axis labels — slightly outside the 100 % ring. */
  const labelPos = (index) => {
    const angle = (2 * Math.PI * index) / count - Math.PI / 2;
    const r = radius + 16;
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
    };
  };

  /** Decide text-anchor based on where the label sits. */
  const anchorFor = (index) => {
    const angle = ((2 * Math.PI * index) / count - Math.PI / 2) % (2 * Math.PI);
    const normAngle = angle < 0 ? angle + 2 * Math.PI : angle;
    const deg = (normAngle * 180) / Math.PI;
    if (deg > 80 && deg < 100) return 'middle';   // bottom
    if (deg > 260 && deg < 280) return 'middle';   // top
    if (deg >= 100 && deg <= 260) return 'end';     // left half
    return 'start';                                  // right half
  };

  /** Dominant-baseline helper so labels don't collide with the chart. */
  const baselineFor = (index) => {
    const angle = ((2 * Math.PI * index) / count - Math.PI / 2) % (2 * Math.PI);
    const normAngle = angle < 0 ? angle + 2 * Math.PI : angle;
    const deg = (normAngle * 180) / Math.PI;
    if (deg > 60 && deg < 120) return 'hanging';   // bottom area
    if (deg > 240 && deg < 300) return 'auto';     // top area
    return 'central';
  };

  // Data polygon
  const dataPoints = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const frac = Math.max(0, Math.min(1, (values[i] ?? 0) / 100));
        const { x, y } = pointAt(i, frac);
        return `${x},${y}`;
      }).join(' '),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [scores, size, count],
  );

  if (count < 3) return null; // need at least 3 axes

  return (
    <div className="radar-chart" style={{ width: size, height: size }}>
      <svg
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        height={size}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* ---------- concentric grid polygons ---------- */}
        {gridLevels.map((level) => (
          <polygon
            key={level}
            className="radar-grid"
            points={polygonPoints(level)}
            fill="none"
            stroke="var(--border, #e5e5e5)"
            strokeWidth={level === 1 ? 1.2 : 0.6}
            opacity={level === 1 ? 0.6 : 0.35}
          />
        ))}

        {/* ---------- axis lines ---------- */}
        {labels.map((_, i) => {
          const { x, y } = pointAt(i, 1);
          return (
            <line
              key={`axis-${i}`}
              className="radar-axis"
              x1={cx}
              y1={cy}
              x2={x}
              y2={y}
              stroke="var(--border, #e5e5e5)"
              strokeWidth={0.6}
              opacity={0.45}
            />
          );
        })}

        {/* ---------- data polygon (filled) ---------- */}
        <polygon
          className="radar-data"
          points={dataPoints}
          fill={color}
          fillOpacity={0.18}
          stroke={color}
          strokeWidth={2}
          strokeLinejoin="round"
        />

        {/* ---------- data dots ---------- */}
        {values.map((v, i) => {
          const frac = Math.max(0, Math.min(1, (v ?? 0) / 100));
          const { x, y } = pointAt(i, frac);
          return (
            <circle
              key={`dot-${i}`}
              className="radar-dot"
              cx={x}
              cy={y}
              r={3}
              fill={color}
              stroke="#fff"
              strokeWidth={1.5}
              style={{ animationDelay: `${i * 80}ms` }}
            />
          );
        })}

        {/* ---------- axis labels ---------- */}
        {labels.map((label, i) => {
          const { x, y } = labelPos(i);
          return (
            <text
              key={`label-${i}`}
              className="radar-label"
              x={x}
              y={y}
              textAnchor={anchorFor(i)}
              dominantBaseline={baselineFor(i)}
            >
              {label}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
