'use client';
import { Users, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { CrowdDensity } from '@/types';

interface CrowdSimulatorProps {
  density: CrowdDensity;
  setDensity: (d: CrowdDensity) => void;
  aiRerouting: string;
  totalVisitors: string;
  t: (key: string) => string;
}

export default function CrowdSimulator({ density, setDensity, aiRerouting, totalVisitors, t }: CrowdSimulatorProps) {
  const options: { value: CrowdDensity; label: string; icon: React.ReactNode; desc: string }[] = [
    { value: 'low', label: t('low'), icon: <CheckCircle size={14} />, desc: 'All gates open. Smooth entry.' },
    { value: 'medium', label: t('medium'), icon: <TrendingUp size={14} />, desc: 'Some congestion. Rerouting active.' },
    { value: 'high', label: t('high'), icon: <AlertTriangle size={14} />, desc: 'High surge. AI rerouting urgently.' },
  ];

  const densityPercent = density === 'low' ? 34 : density === 'medium' ? 66 : 98;
  const densityColor = density === 'low' ? '#22c55e' : density === 'medium' ? '#f59e0b' : '#ef4444';

  return (
    <div className="glass-card p-4 space-y-4" role="region" aria-label="Crowd density simulator">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users size={16} style={{ color: 'var(--accent-primary)' }} />
          <span className="font-semibold text-sm">{t('simulateDensity')}</span>
        </div>
        <div className="text-right">
          <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Total Visitors</div>
          <div className="font-bold text-sm gradient-text">{totalVisitors}</div>
        </div>
      </div>

      {/* Density Toggle Buttons */}
      <div className="flex gap-2" role="radiogroup" aria-label="Select crowd density">
        {options.map((opt) => (
          <button
            key={opt.value}
            role="radio"
            aria-checked={density === opt.value}
            onClick={() => setDensity(opt.value)}
            className={`density-btn flex-1 flex items-center justify-center gap-1.5 ${density === opt.value ? `active-${opt.value}` : ''}`}
          >
            {opt.icon}
            <span className="hidden sm:inline">{opt.label}</span>
            <span className="sm:hidden">{opt.value.charAt(0).toUpperCase()}</span>
          </button>
        ))}
      </div>

      {/* Density Progress Bar */}
      <div>
        <div className="flex justify-between text-xs mb-1.5" style={{ color: 'var(--text-muted)' }}>
          <span>Stadium Occupancy</span>
          <span style={{ color: densityColor, fontWeight: 600 }}>{densityPercent}% / 82,500</span>
        </div>
        <div className="h-2.5 rounded-full overflow-hidden" style={{ background: 'var(--bg-tertiary)' }}>
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${densityPercent}%`, background: densityColor }}
          />
        </div>
      </div>

      {/* AI Rerouting Alert */}
      <div
        className="text-xs rounded-lg p-3 leading-relaxed"
        style={{
          background: density === 'high' ? 'rgba(239,68,68,0.1)' : density === 'medium' ? 'rgba(245,158,11,0.1)' : 'rgba(34,197,94,0.1)',
          border: `1px solid ${densityColor}40`,
          color: densityColor,
        }}
        role="alert"
        aria-live="polite"
      >
        {aiRerouting}
      </div>
    </div>
  );
}
