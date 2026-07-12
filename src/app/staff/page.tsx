'use client';
import { useState } from 'react';
import {
  AlertTriangle, CheckCircle, Clock, Bell, Users,
  Megaphone, Plus, Shield, ArrowRight, Activity
} from 'lucide-react';
import LayoutHeader from '@/components/LayoutHeader';
import StadiumMap from '@/components/StadiumMap';
import CrowdSimulator from '@/components/CrowdSimulator';
import SOSButton from '@/components/SOSButton';
import AIAssistant from '@/components/AIAssistant';
import { useStadiumContext } from '@/context/StadiumContext';
import { initialIncidents, initialAnnouncements } from '@/utils/mockData';
import { Incident } from '@/types';

export default function StaffPage() {
  const [incidents, setIncidents] = useState<Incident[]>(initialIncidents);
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [newAnn, setNewAnn] = useState('');
  const {
    t, lang, density, setDensity, gates, heatmapColor, zoneDensity, aiRerouting, totalVisitors,
    darkMode, setDarkMode
  } = useStadiumContext();

  const resolveIncident = (id: string) => {
    setIncidents((prev) => prev.map((inc) => inc.id === id ? { ...inc, status: 'resolved' as const } : inc));
  };

  const dispatchIncident = (id: string) => {
    setIncidents((prev) => prev.map((inc) => inc.id === id ? { ...inc, status: 'dispatched' as const } : inc));
  };

  const postAnnouncement = () => {
    if (!newAnn.trim()) return;
    setAnnouncements((prev) => [{
      id: `ann-${Date.now()}`,
      title: 'Staff Broadcast',
      text: newAnn.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      targetRole: 'staff',
    }, ...prev]);
    setNewAnn('');
  };

  const severityColor: Record<string, string> = {
    low: '#22c55e', medium: '#f59e0b', high: '#ef4444', critical: '#dc2626',
  };
  const statusBadge = (s: string) => s === 'resolved' ? 'badge-success' : s === 'dispatched' ? 'badge-info' : 'badge-warning';

  const pendingCount = incidents.filter((i) => i.status === 'pending').length;
  const resolvedCount = incidents.filter((i) => i.status === 'resolved').length;

  return (
    <div className={darkMode ? '' : 'light-mode'} style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)', minHeight: '100vh' }}>
      <LayoutHeader darkMode={darkMode} onToggleDarkMode={() => setDarkMode(!darkMode)} />

      <main className="page-container py-8" id="main-content">
        <div className="mb-8 animate-fade-in-up">
          <h1 className="section-title text-3xl mb-1">
            🛡️ <span className="gradient-text">Staff Operations Dashboard</span>
          </h1>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Real-time incident management, gate control, and team coordination
          </p>
        </div>

        {/* KPI Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 animate-fade-in-up">
          {[
            { label: 'Active Incidents', value: pendingCount, icon: <AlertTriangle size={16} />, color: '#ef4444' },
            { label: 'Resolved Today', value: resolvedCount + 14, icon: <CheckCircle size={16} />, color: '#22c55e' },
            { label: 'Staff On-Duty', value: '248', icon: <Users size={16} />, color: '#60a5fa' },
            { label: 'Current Visitors', value: totalVisitors, icon: <Activity size={16} />, color: '#a78bfa' },
          ].map((kpi) => (
            <div key={kpi.label} className="stat-card">
              <div className="flex items-center gap-2 mb-2" style={{ color: kpi.color }}>{kpi.icon}<span className="text-xs">{kpi.label}</span></div>
              <div className="text-2xl font-black" style={{ color: kpi.color }}>{kpi.value}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Map + Crowd Simulator */}
          <div className="space-y-5">
            <StadiumMap density={density} zoneDensity={zoneDensity} heatmapColor={heatmapColor} />
            <CrowdSimulator density={density} setDensity={setDensity} aiRerouting={aiRerouting} totalVisitors={totalVisitors} t={t} />
          </div>

          {/* Center: Incidents */}
          <div className="space-y-5">
            <div className="glass-card p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-sm flex items-center gap-2">
                  <AlertTriangle size={14} style={{ color: '#ef4444' }} /> {t('incidentReports')}
                </h2>
                <button className="btn-glass text-xs gap-1">
                  <Plus size={11} /> New
                </button>
              </div>
              <div className="space-y-3">
                {incidents.map((inc) => (
                  <div
                    key={inc.id}
                    className="glass p-3.5 rounded-xl"
                    style={{ borderLeft: `3px solid ${severityColor[inc.severity]}` }}
                    role="article"
                    aria-label={`Incident: ${inc.title}`}
                  >
                    <div className="flex items-start justify-between mb-1.5">
                      <div className="font-semibold text-xs">{inc.title}</div>
                      <span className={`badge ${statusBadge(inc.status)}`}>{inc.status}</span>
                    </div>
                    <div className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>
                      📍 {inc.location}
                    </div>
                    <div className="flex items-center justify-between text-xs" style={{ color: 'var(--text-muted)' }}>
                      <span><Clock size={9} className="inline mr-1" />{inc.timestamp} · {inc.reporter}</span>
                      <span className="font-semibold" style={{ color: severityColor[inc.severity] }}>
                        {inc.severity.toUpperCase()}
                      </span>
                    </div>
                    {inc.status === 'pending' && (
                      <div className="flex gap-2 mt-2.5">
                        <button onClick={() => dispatchIncident(inc.id)} className="btn-glass text-xs flex-1 justify-center gap-1">
                          <ArrowRight size={10} /> Dispatch
                        </button>
                        <button onClick={() => resolveIncident(inc.id)} className="btn-primary text-xs flex-1 justify-center gap-1">
                          <CheckCircle size={10} /> Resolve
                        </button>
                      </div>
                    )}
                    {inc.status === 'dispatched' && (
                      <button onClick={() => resolveIncident(inc.id)} className="btn-primary text-xs w-full justify-center gap-1 mt-2.5">
                        <CheckCircle size={10} /> Mark Resolved
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Gate Status Quick View */}
            <div className="glass-card p-4">
              <h2 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <Shield size={14} style={{ color: 'var(--accent-primary)' }} /> {t('gateStatus')}
              </h2>
              <div className="grid grid-cols-5 gap-1.5">
                {gates.map((gate) => (
                  <div
                    key={gate.id}
                    className="flex flex-col items-center p-2 rounded-xl text-center"
                    style={{
                      background: `${heatmapColor(gate.density)}15`,
                      border: `1px solid ${heatmapColor(gate.density)}40`,
                    }}
                    title={`${gate.name}: ${gate.waitTime} min wait`}
                    aria-label={`Gate ${gate.id}: ${gate.status}, ${gate.waitTime} minutes wait`}
                  >
                    <div className="font-black text-sm" style={{ color: heatmapColor(gate.density) }}>{gate.id}</div>
                    <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{gate.waitTime}m</div>
                    <div className="w-1.5 h-1.5 rounded-full mt-1" style={{ background: heatmapColor(gate.density) }} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Announcements + SOS */}
          <div className="space-y-5">
            <SOSButton t={t} onTriggered={(loc) => {
              setIncidents((prev) => [{
                id: `sos-${Date.now()}`,
                title: '🚨 SOS Triggered by Staff',
                status: 'dispatched',
                location: loc,
                severity: 'critical',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                reporter: 'Staff Member',
              }, ...prev]);
            }} />

            <div className="glass-card p-4">
              <h2 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <Megaphone size={14} style={{ color: '#f59e0b' }} /> Staff Announcements
              </h2>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  placeholder="Broadcast message..."
                  value={newAnn}
                  onChange={(e) => setNewAnn(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && postAnnouncement()}
                  className="flex-1 text-xs px-3 py-2 rounded-lg outline-none focus-ring"
                  style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)' }}
                  aria-label="Type announcement"
                />
                <button onClick={postAnnouncement} className="btn-primary p-2" aria-label="Post announcement">
                  <Bell size={13} />
                </button>
              </div>
              <div className="space-y-2 max-h-72 overflow-y-auto">
                {announcements.map((ann) => (
                  <div key={ann.id} className="p-3 rounded-lg animate-fade-in" style={{ background: 'var(--bg-tertiary)', borderLeft: '3px solid #f59e0b' }}>
                    <div className="flex justify-between items-start mb-1">
                      <div className="text-xs font-semibold">{ann.title}</div>
                      <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{ann.timestamp}</span>
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{ann.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <AIAssistant role="staff" density={density} lang={lang} t={t} />
    </div>
  );
}
