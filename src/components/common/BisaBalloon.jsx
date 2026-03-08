import './BisaBalloon.css';

export default function BisaBalloon({ color = '#3B82F6', size = 64 }) {
  const bodyW = size;
  const bodyH = size * 1.2;
  const stringH = size * 0.55;

  return (
    <div className="bisa-balloon" aria-hidden="true">
      <svg
        viewBox={`0 0 ${bodyW + 20} ${bodyH + stringH + 10}`}
        width={bodyW + 20}
        height={bodyH + stringH + 10}
        className="balloon-svg"
      >
        {/* Balloon body */}
        <ellipse
          cx={(bodyW + 20) / 2}
          cy={bodyH / 2 + 2}
          rx={bodyW / 2}
          ry={bodyH / 2}
          fill={color}
          opacity="0.85"
        />
        {/* Highlight */}
        <ellipse
          cx={(bodyW + 20) / 2 - bodyW * 0.15}
          cy={bodyH / 2 - bodyH * 0.12}
          rx={bodyW * 0.14}
          ry={bodyH * 0.1}
          fill="white"
          opacity="0.3"
          transform={`rotate(-25 ${(bodyW + 20) / 2 - bodyW * 0.15} ${bodyH / 2 - bodyH * 0.12})`}
        />
        {/* Knot */}
        <polygon
          points={`${(bodyW + 20) / 2 - 4},${bodyH + 1} ${(bodyW + 20) / 2 + 4},${bodyH + 1} ${(bodyW + 20) / 2},${bodyH + 8}`}
          fill={color}
          opacity="0.7"
        />
        {/* String */}
        <path
          d={`M ${(bodyW + 20) / 2} ${bodyH + 8} Q ${(bodyW + 20) / 2 + 6} ${bodyH + stringH * 0.4} ${(bodyW + 20) / 2 - 3} ${bodyH + stringH}`}
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          opacity="0.4"
          className="balloon-string-path"
        />
      </svg>
    </div>
  );
}
