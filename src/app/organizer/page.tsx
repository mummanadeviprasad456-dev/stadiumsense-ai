'use client';
import { useState, useEffect } from 'react';
import {
  TrendingUp, Leaf, BarChart3, Activity,
  Zap, Clock, Globe, ArrowUp
} from 'lucide-react';
import LayoutHeader from '@/components/LayoutHeader';
import StadiumMap from '@/components/StadiumMap';
import CrowdSimulator from '@/components/CrowdSimulator';
import AIAssistant from '@/components/AIAssistant';
import { useStadiumContext } from '@/context/StadiumContext';

// Simple Bar Chart using pure SVG
function SVGBarChart({ data, color }: { data: { label: string; value: number }[]; color: string }) {
  const max = Math.max(...data.map((d) => d.value));
  return (
    <svg viewBox={`0 0 ${data.length * 50} 120`} className="w-full" role="img" aria-label="Bar chart">
      {data.map((d, i) => {
        const barH = (d.value / max) * 80;
        const x = i * 50 + 10;
        return (
          <g key={d.label}>
            <rect x={x} y={100 - barH} width="30" height={barH} rx="4" fill={color} fillOpacity="0.8" />
            <text x={x + 15} y="115" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="8">
              {d.label}
            </text>
            <text x={x + 15} y={95 - barH} textAnchor="middle" fill={color} fontSize="8" fontWeight="600">
              {d.value}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// Simple Line Chart using pure SVG
function SVGLineChart({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const w = 300; const h = 80;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - (v / max) * h}`).join(' ');
  const area = `0,${h} ${pts} ${w},${h}`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" role="img" aria-label="Line trend chart">
      <defs>
        <linearGradient id="lg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={area} fill="url(#lg)" />
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {data.map((v, i) => (
        <circle key={i} cx={(i / (data.length - 1)) * w} cy={h - (v / max) * h} r="3.5" fill={color} />
      ))}
    </svg>
  );
}

const aiInsights = [
  { icon: '🔴', text: 'High congestion at Gate D. Recommend deploying 3 additional staff and opening side access point D2 to reduce wait time by 14 min.' },
  { icon: '🟡', text: 'Food Court A is at 89% capacity. Suggest AI routing fans to Food Court B and C through digital signage updates.' },
  { icon: '🟢', text: 'Eco travel mode adoption at 82% — above target. Carbon savings are on track for FIFA Green Stadium certification.' },
  { icon: '💡', text: 'Security rotation at 18:00 — AI recommends pre-positioning 2 medical teams at Section 104 based on historical crowd injury data.' },
];

export default function OrganizerPage() {
  const {
    t, lang, density, setDensity, gates, heatmapColor, zoneDensity, aiRerouting, totalVisitors,
    darkMode, setDarkMode
  } = useStadiumContext();
  const [liveCount, setLiveCount] = useState(54200);
  const [fluctuation, setFluctuation] = useState(15);

  // Simulate live visitor counter fluctuation
  useEffect(() => {
    const id = setInterval(() => {
      const diff = Math.floor(Math.random() * 60 - 20);
      setLiveCount((c) => c + diff);
      setFluctuation(Math.floor(Math.random() * 30 + 10));
    }, 3000);
    return () => clearInterval(id);
  }, []);

  const crowdByHour = [
    { label: '14:00', value: 18 },
    { label: '15:00', value: 32 },
    { label: '16:00', value: 58 },
    { label: '17:00', value: 72 },
    { label: '17:30', value: 87 },
    { label: '18:00', value: 96 },
  ];

  const incidentTrend = [4, 8, 6, 12, 7, 5, 3, 2];

  const nationalities = [
    { label: 'USA', pct: 38 }, { label: 'ARG', pct: 29 }, { label: 'Brazil', pct: 12 },
    { label: 'Mexico', pct: 10 }, { label: 'UK', pct: 6 }, { label: 'Other', pct: 5 },
  ];

  return (
    <div className={darkMode ? '' : 'light-mode'} style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)', minHeight: '100vh' }}>
      <LayoutHeader darkMode={darkMode} onToggleDarkMode={() => setDarkMode(!darkMode)} />

      <main className="page-container py-8" id="main-content">
        <div className="mb-8 animate-fade-in-up flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="section-title text-3xl mb-1">
              📊 <span className="gradient-text">Organizer Analytics Hub</span>
            </h1>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              Live crowd intelligence, sustainability metrics, and AI operational insights
            </p>
          </div>
          <div className="glass-card px-4 py-3 text-center">
            <div className="text-xs mb-0.5" style={{ color: 'var(--text-muted)' }}>Live Visitor Count</div>
            <div className="text-2xl font-black gradient-text">{liveCount.toLocaleString()}</div>
            <div className="flex items-center justify-center gap-1 text-xs text-green-400 mt-0.5">
              <ArrowUp size={10} /> +{fluctuation}/min
            </div>
          </div>
        </div>

        {/* Top KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 animate-fade-in-up">
          {[
            { label: 'Avg Entry Time', value: '4.2 min', icon: <Clock size={16} />, color: '#60a5fa', sub: '↓ 38% vs. last event' },
            { label: 'Nationality Diversity', value: '68 Nations', icon: <Globe size={16} />, color: '#a78bfa', sub: 'Top: USA, ARG, BRA' },
            { label: 'AI Queries Today', value: '42,100+', icon: <Zap size={16} />, color: '#fbbf24', sub: '96% resolved < 2s' },
            { label: 'Carbon Saved', value: '9,840 kg', icon: <Leaf size={16} />, color: '#34d399', sub: 'FIFA Green certified ✅' },
          ].map((kpi) => (
            <div key={kpi.label} className="stat-card">
              <div className="flex items-center gap-2 mb-1" style={{ color: kpi.color }}>{kpi.icon}<span className="text-xs">{kpi.label}</span></div>
              <div className="text-xl font-black" style={{ color: kpi.color }}>{kpi.value}</div>
              <div className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{kpi.sub}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map + Crowd Simulator */}
          <div className="space-y-5">
            <StadiumMap density={density} zoneDensity={zoneDensity} heatmapColor={heatmapColor} />
            <CrowdSimulator density={density} setDensity={setDensity} aiRerouting={aiRerouting} totalVisitors={totalVisitors} t={t} />
          </div>

          {/* Charts column */}
          <div className="space-y-5">
            <div className="glass-card p-4">
              <h2 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <BarChart3 size={14} style={{ color: 'var(--accent-primary)' }} /> Crowd Build-Up by Hour
              </h2>
              <SVGBarChart data={crowdByHour} color="#2563eb" />
            </div>

            <div className="glass-card p-4">
              <h2 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <Activity size={14} style={{ color: '#f59e0b' }} /> Incident Volume Trend
              </h2>
              <SVGLineChart data={incidentTrend} color="#f59e0b" />
            </div>

            <div className="glass-card p-4">
              <h2 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <Globe size={14} style={{ color: '#a78bfa' }} /> Fan Nationality Distribution
              </h2>
              <div className="space-y-2">
                {nationalities.map((n) => (
                  <div key={n.label}>
                    <div className="flex justify-between text-xs mb-1">
                      <span style={{ color: 'var(--text-secondary)' }}>{n.label}</span>
                      <span className="font-semibold" style={{ color: '#a78bfa' }}>{n.pct}%</span>
                    </div>
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--bg-tertiary)' }}>
                      <div className="h-full rounded-full transition-all duration-700" style={{ width: `${n.pct}%`, background: '#7c3aed' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: AI Insights + Sustainability */}
          <div className="space-y-5">
            <div className="glass-card p-4">
              <h2 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <Zap size={14} style={{ color: '#f59e0b' }} /> AI Operational Insights
              </h2>
              <div className="space-y-2.5">
                {aiInsights.map((insight, i) => (
                  <div key={i} className="p-3 rounded-xl text-xs leading-relaxed animate-fade-in" style={{ background: 'var(--bg-tertiary)', borderLeft: '3px solid rgba(245,158,11,0.5)', animationDelay: `${i * 0.1}s` }}>
                    <span className="mr-1.5 text-sm">{insight.icon}</span>
                    <span style={{ color: 'var(--text-secondary)' }}>{insight.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card p-4" style={{ borderColor: 'rgba(34,197,94,0.3)' }}>
              <h2 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <Leaf size={14} className="text-green-400" /> Sustainability Dashboard
              </h2>
              {[
                { label: 'Recycling Rate', value: 84.5, unit: '%', color: '#22c55e' },
                { label: 'Digital Ticket Adoption', value: 98.2, unit: '%', color: '#0891b2' },
                { label: 'Eco Transport Mode', value: 82, unit: '%', color: '#34d399' },
                { label: 'Water Bottles Saved', value: 72, unit: '% of daily target', color: '#a78bfa' },
              ].map((item) => (
                <div key={item.label} className="mb-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span style={{ color: 'var(--text-secondary)' }}>{item.label}</span>
                    <span className="font-bold" style={{ color: item.color }}>{item.value}{item.unit}</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--bg-tertiary)' }}>
                    <div className="h-full rounded-full transition-all duration-700" style={{ width: `${item.value}%`, background: item.color }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="glass-card p-4">
              <h2 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <TrendingUp size={14} style={{ color: '#60a5fa' }} /> Gate Queue Overview
              </h2>
              <div className="space-y-1.5">
                {gates.map((gate) => (
                  <div key={gate.id} className="flex items-center gap-2 text-xs">
                    <div className="w-6 h-6 rounded-lg gradient-primary flex items-center justify-center text-white font-bold text-xs shrink-0">{gate.id}</div>
                    <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: 'var(--bg-tertiary)' }}>
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${Math.min(100, (gate.waitTime / 35) * 100)}%`,
                          background: heatmapColor(gate.density),
                        }}
                      />
                    </div>
                    <span className="font-semibold w-12 text-right" style={{ color: heatmapColor(gate.density) }}>
                      {gate.waitTime}m
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <AIAssistant role="organizer" density={density} lang={lang} t={t} />
    </div>
  );
}
