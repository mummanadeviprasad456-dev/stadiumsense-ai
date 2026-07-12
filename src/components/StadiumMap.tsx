'use client';
import { CrowdDensity } from '@/types';

interface StadiumMapProps {
  density: CrowdDensity;
  zoneDensity: Record<string, CrowdDensity>;
  heatmapColor: (d: CrowdDensity) => string;
  highlightGate?: string;
}

function densityOpacity(d: CrowdDensity) {
  if (d === 'low') return '0.25';
  if (d === 'medium') return '0.45';
  return '0.65';
}

export default function StadiumMap({ density, zoneDensity, heatmapColor, highlightGate }: StadiumMapProps) {
  const zones = [
    { id: 'north', label: 'North Stand', x: 140, y: 30, w: 220, h: 80 },
    { id: 'south', label: 'South Stand', x: 140, y: 390, w: 220, h: 80 },
    { id: 'east',  label: 'East Stand',  x: 400, y: 120, w: 80, h: 260 },
    { id: 'west',  label: 'West Stand',  x: 20,  y: 120, w: 80, h: 260 },
    { id: 'vip',   label: 'VIP Lounge',  x: 195, y: 130, w: 110, h: 60 },
    { id: 'field', label: 'Field of Play', x: 130, y: 130, w: 240, h: 240 },
  ];

  const gates = [
    { id: 'A', label: 'A', cx: 250, cy: 20, gate: 'Gate A – North' },
    { id: 'B', label: 'B', cx: 490, cy: 250, gate: 'Gate B – East' },
    { id: 'C', label: 'C', cx: 250, cy: 480, gate: 'Gate C – South' },
    { id: 'D', label: 'D', cx: 10,  cy: 250, gate: 'Gate D – West' },
    { id: 'E', label: 'E', cx: 420, cy: 30, gate: 'Gate E – VIP' },
  ];

  const facilities = [
    { emoji: '🚻', label: 'Restroom', x: 50, y: 155 },
    { emoji: '🚻', label: 'Restroom', x: 430, y: 155 },
    { emoji: '🚻', label: 'Restroom', x: 50, y: 330 },
    { emoji: '🚻', label: 'Restroom', x: 430, y: 330 },
    { emoji: '🍕', label: 'Food Court A', x: 155, y: 200 },
    { emoji: '🍕', label: 'Food Court B', x: 330, y: 200 },
    { emoji: '💧', label: 'Water Refill', x: 155, y: 330 },
    { emoji: '♻️', label: 'Recycling', x: 330, y: 330 },
    { emoji: '🏥', label: 'First Aid', x: 100, y: 60 },
    { emoji: '🅿️', label: 'Parking', x: 390, y: 460 },
  ];

  // Path recommendation overlay based on density
  const recommendedPath = density === 'high'
    ? 'M 250 480 L 250 400 L 200 300 L 195 220 L 195 130'  // Gate C to VIP (south route)
    : density === 'medium'
    ? 'M 490 250 L 400 250 L 320 220 L 250 180'             // Gate B east route
    : null;

  return (
    <div className="relative w-full" role="img" aria-label="Interactive FIFA World Cup 2026 Stadium Map – MetLife Stadium">
      <svg
        viewBox="0 0 500 500"
        className="w-full rounded-xl border"
        style={{ background: 'radial-gradient(ellipse at center, #1e293b 0%, #0d1117 100%)', borderColor: 'var(--glass-border)' }}
      >
        {/* Stadium outer ring */}
        <ellipse cx="250" cy="250" rx="230" ry="235" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
        <ellipse cx="250" cy="250" rx="215" ry="220" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />

        {/* Stands / Zones */}
        {zones.map((zone) => {
          const zd = zoneDensity[zone.id] ?? 'low';
          const color = heatmapColor(zd);
          const isField = zone.id === 'field';
          return (
            <g key={zone.id} role="graphics-object" aria-label={`${zone.label}: ${zd} crowd density`}>
              <rect
                x={zone.x} y={zone.y} width={zone.w} height={zone.h}
                rx="8"
                fill={isField ? '#166534' : color}
                fillOpacity={isField ? '0.9' : densityOpacity(zd)}
                stroke={isField ? '#15803d' : color}
                strokeOpacity={isField ? '0.9' : '0.6'}
                strokeWidth="1.5"
                className={!isField && zd === 'high' ? 'animate-heat' : ''}
              />
              {/* Field markings */}
              {isField && (
                <>
                  <rect x="178" y="130" width="144" height="240" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" rx="2" />
                  <circle cx="250" cy="250" r="30" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                  <line x1="130" y1="250" x2="370" y2="250" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                  <line x1="250" y1="130" x2="250" y2="370" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                  {/* Goal areas */}
                  <rect x="210" y="130" width="80" height="30" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                  <rect x="210" y="340" width="80" height="30" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                  <text x="250" y="255" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9" fontWeight="600">FIELD OF PLAY</text>
                </>
              )}
              {!isField && (
                <text x={zone.x + zone.w / 2} y={zone.y + zone.h / 2 + 4} textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9" fontWeight="600">
                  {zone.label.toUpperCase()}
                </text>
              )}
            </g>
          );
        })}

        {/* Recommended Path Overlay */}
        {recommendedPath && (
          <g>
            <path
              d={recommendedPath}
              fill="none"
              stroke="#60a5fa"
              strokeWidth="3"
              strokeDasharray="8 4"
              strokeLinecap="round"
              opacity="0.8"
              className="animate-pulse"
            />
            <text x="250" y="450" textAnchor="middle" fill="#60a5fa" fontSize="9" fontWeight="700">
              ← AI Recommended Route
            </text>
          </g>
        )}

        {/* Gate markers */}
        {gates.map((g) => {
          const isHL = highlightGate === g.id;
          return (
            <g key={g.id} role="graphics-object" aria-label={g.gate}>
              <circle cx={g.cx} cy={g.cy} r={isHL ? 16 : 12} fill={isHL ? '#2563eb' : 'rgba(37,99,235,0.8)'} />
              <text x={g.cx} y={g.cy + 4} textAnchor="middle" fill="white" fontSize="10" fontWeight="800">
                {g.label}
              </text>
            </g>
          );
        })}

        {/* Facilities */}
        {facilities.map((f, i) => (
          <text key={i} x={f.x} y={f.y} textAnchor="middle" fontSize="14" aria-label={f.label}>
            {f.emoji}
          </text>
        ))}

        {/* Legend */}
        <g transform="translate(10, 460)">
          <rect x="0" y="0" width="120" height="36" rx="6" fill="rgba(0,0,0,0.5)" />
          {[
            { color: '#22c55e', label: 'Low' },
            { color: '#f59e0b', label: 'Med' },
            { color: '#ef4444', label: 'High' },
          ].map((item, i) => (
            <g key={item.label} transform={`translate(${i * 40 + 8}, 10)`}>
              <rect width="10" height="10" rx="2" fill={item.color} fillOpacity="0.7" />
              <text x="13" y="9" fill="rgba(255,255,255,0.6)" fontSize="7.5" fontWeight="500">{item.label}</text>
            </g>
          ))}
          <text x="4" y="30" fill="rgba(255,255,255,0.35)" fontSize="6.5">Crowd Density</text>
        </g>

        {/* Title label */}
        <text x="250" y="500" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="7.5" fontWeight="500">
          MetLife Stadium – East Rutherford, NJ · FIFA World Cup 2026
        </text>
      </svg>
    </div>
  );
}
