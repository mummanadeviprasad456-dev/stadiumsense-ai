'use client';
import { useState } from 'react';
import {
  Ticket, Map, Navigation, Bus, Leaf, Search, Plus, CheckCircle,
  XCircle, Clock, Zap, Droplets, Recycle, ChevronRight, QrCode
} from 'lucide-react';
import LayoutHeader from '@/components/LayoutHeader';
import StadiumMap from '@/components/StadiumMap';
import CrowdSimulator from '@/components/CrowdSimulator';
import SOSButton from '@/components/SOSButton';
import AIAssistant from '@/components/AIAssistant';
import { useStadiumContext } from '@/context/StadiumContext';
import { mockTicket, transportModes, lostAndFoundItems } from '@/utils/mockData';

type FanTab = 'ticket' | 'map' | 'transport' | 'lost' | 'sustainability';

export default function FanPage() {
  const [activeTab, setActiveTab] = useState<FanTab>('ticket');
  const [ticketScanned, setTicketScanned] = useState(false);
  const [lostQuery, setLostQuery] = useState('');
  const [lostReportOpen, setLostReportOpen] = useState(false);
  const {
    t, lang, density, setDensity, gates, heatmapColor, zoneDensity, aiRerouting, totalVisitors,
    darkMode, setDarkMode
  } = useStadiumContext();

  const tabs: { id: FanTab; label: string; icon: React.ReactNode }[] = [
    { id: 'ticket', label: 'My Ticket', icon: <Ticket size={14} /> },
    { id: 'map', label: 'Map & Routes', icon: <Map size={14} /> },
    { id: 'transport', label: 'Travel', icon: <Bus size={14} /> },
    { id: 'lost', label: 'Lost & Found', icon: <Search size={14} /> },
    { id: 'sustainability', label: 'Eco Hub', icon: <Leaf size={14} /> },
  ];

  return (
    <div className={darkMode ? '' : 'light-mode'} style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)', minHeight: '100vh' }}>
      <LayoutHeader darkMode={darkMode} onToggleDarkMode={() => setDarkMode(!darkMode)} />

      <main className="page-container py-8" id="main-content">
        {/* Page Header */}
        <div className="mb-8 animate-fade-in-up">
          <h1 className="section-title text-3xl mb-1">
            🎟️ <span className="gradient-text">Fan Portal</span>
          </h1>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Your complete matchday companion — powered by StadiumSense AI
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 flex-wrap mb-6 animate-fade-in-up" role="tablist" aria-label="Fan portal sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`btn-glass text-xs gap-1.5 ${activeTab === tab.id ? 'border-blue-500 text-blue-400 bg-blue-500/10' : ''}`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content Panel */}
          <div className="lg:col-span-2 space-y-6">

            {/* ── TICKET TAB ─────────────────────────────────────────────── */}
            {activeTab === 'ticket' && (
              <div className="space-y-4 animate-fade-in">
                <div
                  className="glass-card p-6 relative overflow-hidden"
                  style={{ background: 'linear-gradient(135deg, rgba(37,99,235,0.15), rgba(124,58,237,0.1))', borderColor: 'rgba(37,99,235,0.4)' }}
                  role="region"
                  aria-label="Digital match ticket"
                >
                  {/* Ticket decorative circles */}
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-5" style={{ background: '#2563eb', transform: 'translate(30%, -30%)' }} />
                  <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full opacity-5" style={{ background: '#7c3aed', transform: 'translate(-30%, 30%)' }} />

                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="text-xs font-semibold mb-1 gradient-gold-text">FIFA WORLD CUP 2026 · OFFICIAL</div>
                      <h2 className="font-black text-xl" style={{ color: 'var(--text-primary)' }}>{mockTicket.match}</h2>
                      <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>MetLife Stadium · East Rutherford, NJ</p>
                    </div>
                    <span className={`badge ${ticketScanned ? 'badge-success' : 'badge-info'}`}>
                      {ticketScanned ? '✅ Scanned' : '🎫 Valid'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-4">
                    {[
                      { label: 'Holder', value: mockTicket.holderName },
                      { label: 'Entry', value: mockTicket.gate },
                      { label: 'Zone', value: mockTicket.zone.split(' - ')[1] },
                      { label: 'Category', value: mockTicket.category.replace('Category ', 'Cat.') },
                    ].map((item) => (
                      <div key={item.label}>
                        <div className="text-xs mb-0.5" style={{ color: 'var(--text-muted)' }}>{item.label}</div>
                        <div className="text-sm font-bold">{item.value}</div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-dashed my-4" style={{ borderColor: 'rgba(255,255,255,0.1)' }} />

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs mb-0.5" style={{ color: 'var(--text-muted)' }}>Ticket ID</div>
                      <div className="font-mono text-sm font-bold">{mockTicket.ticketId}</div>
                    </div>
                    {/* Simulated QR code visual */}
                    <div className="p-2 rounded-lg bg-white/10 border border-white/20" aria-label="Digital QR code">
                      <QrCode size={52} color="white" />
                    </div>
                  </div>
                </div>

                {/* Seat Info */}
                <div className="glass-card p-5">
                  <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
                    <Navigation size={14} style={{ color: 'var(--accent-primary)' }} /> Seat & Route Information
                  </h3>
                  <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>{mockTicket.seat}</p>
                  <div className="text-xs p-3 rounded-lg" style={{ background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.3)', color: '#60a5fa' }}>
                    🗺️ <strong>AI Directions:</strong> Enter at {mockTicket.gate} → Take Elevator 3 (Level 2) → Follow blue signage to Section 124 → Steward will guide you to Row 12.
                  </div>
                  <button
                    onClick={() => setTicketScanned(!ticketScanned)}
                    className="mt-4 btn-primary w-full justify-center"
                  >
                    {ticketScanned ? <XCircle size={14} /> : <CheckCircle size={14} />}
                    {ticketScanned ? 'Reset Ticket' : 'Simulate Gate Scan'}
                  </button>
                </div>
              </div>
            )}

            {/* ── MAP & ROUTES TAB ─────────────────────────────────────── */}
            {activeTab === 'map' && (
              <div className="space-y-4 animate-fade-in">
                <StadiumMap density={density} zoneDensity={zoneDensity} heatmapColor={heatmapColor} />
                <CrowdSimulator density={density} setDensity={setDensity} aiRerouting={aiRerouting} totalVisitors={totalVisitors} t={t} />
                <div className="glass-card p-4">
                  <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
                    <Zap size={14} style={{ color: 'var(--accent-primary)' }} /> {t('gateStatus')}
                  </h3>
                  <div className="space-y-2">
                    {gates.map((gate) => (
                      <div key={gate.id} className="flex items-center gap-3 p-2.5 rounded-lg" style={{ background: 'var(--bg-tertiary)' }}>
                        <div className="w-7 h-7 rounded-lg gradient-primary flex items-center justify-center text-white text-xs font-bold shrink-0">
                          {gate.id}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-semibold">{gate.name}</div>
                          <div className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>{gate.recommendedRoute}</div>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="text-xs font-bold" style={{ color: heatmapColor(gate.density) }}>
                            <Clock size={10} className="inline mr-0.5" />{gate.waitTime}min
                          </div>
                          <span className={`badge ${gate.status === 'open' ? 'badge-success' : gate.status === 'congested' ? 'badge-warning' : 'badge-danger'} mt-0.5`}>
                            {gate.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── TRANSPORT TAB ────────────────────────────────────────── */}
            {activeTab === 'transport' && (
              <div className="space-y-4 animate-fade-in">
                <div className="glass-card p-4">
                  <h3 className="font-semibold text-sm mb-4 flex items-center gap-2">
                    <Bus size={14} style={{ color: 'var(--accent-primary)' }} /> {t('transitGuide')}
                  </h3>
                  <div className="space-y-3">
                    {transportModes.map((mode) => (
                      <div key={mode.id} className="glass p-3.5 rounded-xl transition-all hover:border-blue-500/30">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="text-sm font-semibold">{mode.name}</div>
                            <div className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                              {mode.accessibilitySupport ? '♿ Accessibility-supported' : ''}
                            </div>
                          </div>
                          <span className="font-bold text-sm text-blue-400">{mode.cost}</span>
                        </div>
                        <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--text-secondary)' }}>
                          <span className="flex items-center gap-1"><Clock size={11} /> {mode.duration} min</span>
                          <span className="flex items-center gap-1"><Leaf size={11} /> {mode.carbonFootprint} kg CO₂</span>
                          <span>{'⭐'.repeat(mode.ecoRating)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="glass-card p-4" style={{ borderColor: 'rgba(34,197,94,0.3)' }}>
                  <p className="text-xs" style={{ color: '#4ade80' }}>
                    🌿 <strong>AI Eco Tip:</strong> Taking the Metro Line 6 instead of driving saves an average of 3.6 kg CO₂ per person per trip. 82% of today's fans have chosen eco-transport — join them!
                  </p>
                </div>
              </div>
            )}

            {/* ── LOST & FOUND TAB ────────────────────────────────────── */}
            {activeTab === 'lost' && (
              <div className="space-y-4 animate-fade-in">
                <div className="glass-card p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-sm flex items-center gap-2">
                      <Search size={14} style={{ color: 'var(--accent-primary)' }} /> {t('lostAndFound')}
                    </h3>
                    <button onClick={() => setLostReportOpen(!lostReportOpen)} className="btn-glass text-xs gap-1">
                      <Plus size={12} /> Report Item
                    </button>
                  </div>
                  <input
                    type="search"
                    placeholder="Search lost items..."
                    value={lostQuery}
                    onChange={(e) => setLostQuery(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-lg mb-4 outline-none focus-ring"
                    style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)' }}
                    aria-label="Search lost items"
                  />
                  {lostReportOpen && (
                    <div className="p-3 rounded-xl mb-4 animate-fade-in space-y-2" style={{ background: 'rgba(37,99,235,0.08)', border: '1px solid rgba(37,99,235,0.2)' }}>
                      <p className="text-xs font-semibold" style={{ color: '#60a5fa' }}>Report a Lost or Found Item</p>
                      {['Item Description', 'Last Seen Location', 'Your Contact Number'].map((ph) => (
                        <input key={ph} type="text" placeholder={ph} className="w-full text-xs px-3 py-2 rounded-lg outline-none" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)' }} />
                      ))}
                      <button className="btn-primary text-xs w-full justify-center">Submit Report</button>
                    </div>
                  )}
                  <div className="space-y-2">
                    {lostAndFoundItems
                      .filter((item) => !lostQuery || item.name.toLowerCase().includes(lostQuery.toLowerCase()))
                      .map((item) => (
                        <div key={item.id} className="flex items-center gap-3 p-3 rounded-lg" style={{ background: 'var(--bg-tertiary)' }}>
                          <span className="text-lg">{item.status === 'found' ? '✅' : '🔍'}</span>
                          <div className="flex-1">
                            <div className="text-xs font-semibold">{item.name}</div>
                            <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{item.location}</div>
                          </div>
                          <span className={`badge ${item.status === 'found' ? 'badge-success' : 'badge-warning'}`}>
                            {item.status === 'found' ? 'Found' : 'Lost'}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── SUSTAINABILITY TAB ──────────────────────────────────── */}
            {activeTab === 'sustainability' && (
              <div className="space-y-4 animate-fade-in">
                <div className="glass-card p-5" style={{ borderColor: 'rgba(34,197,94,0.3)' }}>
                  <h3 className="font-semibold text-sm mb-4 flex items-center gap-2">
                    <Leaf size={14} className="text-green-400" /> {t('sustainability')}
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { icon: <Droplets size={18} />, label: t('waterRefill'), value: '145,020 L Saved', color: '#0891b2' },
                      { icon: <Recycle size={18} />, label: t('recyclingKiosks'), value: '84.5% Rate', color: '#22c55e' },
                      { icon: <Leaf size={18} />, label: t('carbonSaved'), value: '9,840 kg CO₂', color: '#34d399' },
                      { icon: <CheckCircle size={18} />, label: 'Digital Tickets', value: '98.2% Adoption', color: '#a78bfa' },
                    ].map((item) => (
                      <div key={item.label} className="p-4 rounded-xl" style={{ background: `${item.color}15`, border: `1px solid ${item.color}30` }}>
                        <div className="mb-2" style={{ color: item.color }}>{item.icon}</div>
                        <div className="font-bold text-sm" style={{ color: item.color }}>{item.value}</div>
                        <div className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{item.label}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-3 rounded-xl text-xs leading-relaxed" style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', color: '#4ade80' }}>
                    🌿 <strong>AI Green Tip:</strong> You traveled by metro today saving 3.6 kg CO₂. Combined with choosing the digital ticket, your carbon footprint for this match is 91% lower than the average fan. Excellent choice!
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="space-y-5">
            <SOSButton t={t} onTriggered={(loc) => console.log('SOS triggered at', loc)} />
            <div className="glass-card p-4">
              <h3 className="font-semibold text-sm mb-3 gradient-text">Quick Info</h3>
              {[
                { label: 'Match Kick-Off', value: '18:00 Local Time' },
                { label: 'Stadium Capacity', value: '82,500' },
                { label: 'Current Fans Inside', value: totalVisitors },
                { label: 'Weather', value: '🌤 74°F (23°C)' },
                { label: 'WiFi', value: '⚡ FIFA-Fan-2026 (Free)' },
              ].map((item) => (
                <div key={item.label} className="flex justify-between py-1.5 border-b text-xs" style={{ borderColor: 'var(--glass-border)' }}>
                  <span style={{ color: 'var(--text-muted)' }}>{item.label}</span>
                  <span className="font-semibold">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <AIAssistant role="fan" density={density} lang={lang} t={t} />
    </div>
  );
}
