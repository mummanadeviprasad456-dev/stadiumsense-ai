'use client';
import Link from 'next/link';
import {
  Zap, Users, LayoutDashboard, HeartHandshake, Settings,
  Shield, Globe, Leaf, ChevronRight, Map,
  Mic, ArrowRight, Check, TrendingUp
} from 'lucide-react';
import LayoutHeader from '@/components/LayoutHeader';
import AIAssistant from '@/components/AIAssistant';
import { useStadiumContext } from '@/context/StadiumContext';

const stats = [
  { label: 'Fans Assisted Today', value: '124,800', icon: <Users size={18} />, color: '#60a5fa' },
  { label: 'AI Queries Resolved', value: '42,100+', icon: <Zap size={18} />, color: '#a78bfa' },
  { label: 'Incidents Managed', value: '97.8%', sub: 'Resolution Rate', icon: <Shield size={18} />, color: '#4ade80' },
  { label: 'Carbon Saved', value: '9,840 kg', sub: 'CO₂ Avoided', icon: <Leaf size={18} />, color: '#34d399' },
];

const features = [
  { icon: <Map size={20} />, title: 'Interactive Stadium Map', desc: 'Real-time heatmaps, crowd density overlays, and AI-generated optimal routes to any facility.', color: '#2563eb' },
  { icon: <Mic size={20} />, title: 'Multilingual Voice AI', desc: '6 languages supported: English, Hindi, Telugu, Spanish, French & Arabic. Voice-first accessibility.', color: '#7c3aed' },
  { icon: <Shield size={20} />, title: 'Emergency Management', desc: 'One-tap SOS with countdown safety, AI evacuation guidance, and real-time security dispatch.', color: '#ef4444' },
  { icon: <TrendingUp size={20} />, title: 'Crowd Intelligence', desc: 'Dynamic crowd simulation: Low, Medium, High density. AI rerouting recommendations in milliseconds.', color: '#f59e0b' },
  { icon: <Globe size={20} />, title: 'Real-Time Operations', desc: 'Staff dashboards, volunteer tools, and organizer analytics — all synchronized with crowd data.', color: '#10b981' },
  { icon: <Leaf size={20} />, title: 'Sustainability Hub', desc: '84.5% recycling, water refill stations, carbon footprint scoring per transport mode.', color: '#22c55e' },
];

const roles = [
  {
    href: '/fan',
    icon: <Users size={24} />,
    title: 'Fan Portal',
    desc: 'Navigate the stadium, view your digital ticket, find facilities, plan travel and access AI trip assistant.',
    gradient: 'linear-gradient(135deg, #2563eb, #7c3aed)',
    badge: '🎟️ Fan Experience',
    items: ['Digital Ticket & QR Code', 'Interactive Seat Finder', 'Eco Travel Planner', 'Lost & Found Registry', 'Accessibility Navigation'],
  },
  {
    href: '/staff',
    icon: <LayoutDashboard size={24} />,
    title: 'Staff Dashboard',
    desc: 'Monitor incidents in real-time, manage gate access, assign resources, and broadcast announcements.',
    gradient: 'linear-gradient(135deg, #0891b2, #2563eb)',
    badge: '🛡️ Operations Center',
    items: ['Incident Management', 'Gate Status Control', 'Queue Monitoring', 'Resource Allocation', 'Staff Announcements'],
  },
  {
    href: '/organizer',
    icon: <Settings size={24} />,
    title: 'Organizer Dashboard',
    desc: 'Access full operational analytics, crowd heatmaps, sustainability metrics and AI operational insights.',
    gradient: 'linear-gradient(135deg, #7c3aed, #ec4899)',
    badge: '📊 Analytics Hub',
    items: ['Live Crowd Analytics', 'Sustainability Tracking', 'AI Operational Alerts', 'Venue Statistics', 'Match Day Reports'],
  },
  {
    href: '/volunteer',
    icon: <HeartHandshake size={24} />,
    title: 'Volunteer Assistant',
    desc: 'Get instant AI-powered guidance for fan questions, emergencies, translation and lost & found.',
    gradient: 'linear-gradient(135deg, #059669, #0891b2)',
    badge: '🤝 Volunteer Hub',
    items: ['AI Translation Tool', 'Emergency Checklists', 'Event Schedule', 'Lost Item Registry', 'Help Request Queue'],
  },
];

const matchDay = [
  { time: '16:00', event: 'Gates Open – Fan Entry Begins', status: 'past' },
  { time: '17:00', event: 'Pre-Match Entertainment – Main Pitch', status: 'past' },
  { time: '17:30', event: 'National Anthem Ceremony', status: 'live' },
  { time: '18:00', event: '⚽ USA vs ARGENTINA – Kick-Off', status: 'upcoming' },
  { time: '19:50', event: 'Half-Time Break (15 mins)', status: 'upcoming' },
  { time: '21:00', event: 'Final Whistle – Post-Match', status: 'upcoming' },
];

export default function HomePage() {
  const { t, lang, density, darkMode, setDarkMode } = useStadiumContext();

  return (
    <div className={darkMode ? '' : 'light-mode'} style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)', minHeight: '100vh' }}>
      <LayoutHeader darkMode={darkMode} onToggleDarkMode={() => setDarkMode(!darkMode)} />

      {/* ── HERO SECTION ─────────────────────────────────────────────────── */}
      <section className="gradient-hero py-24 relative overflow-hidden" aria-labelledby="hero-heading">
        {/* Decorative blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full opacity-10 animate-spin-slow" style={{ background: 'radial-gradient(circle, #2563eb, transparent)' }} aria-hidden="true" />
        <div className="absolute bottom-10 right-20 w-96 h-96 rounded-full opacity-8 animate-float" style={{ background: 'radial-gradient(circle, #7c3aed, transparent)' }} aria-hidden="true" />

        <div className="page-container relative text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6 animate-fade-in glass" style={{ color: '#60a5fa', borderColor: 'rgba(96,165,250,0.3)' }}>
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse-green" />
            Live · FIFA World Cup 2026 · MetLife Stadium · Group Stage Day 4
          </div>

          <h1 id="hero-heading" className="section-title text-5xl md:text-7xl mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <span className="gradient-text">StadiumSense</span>
            <br />
            <span style={{ color: 'var(--text-primary)' }}>AI</span>
          </h1>

          <p className="text-xl md:text-2xl mb-3 animate-fade-in-up font-medium" style={{ color: 'var(--text-secondary)', animationDelay: '0.2s' }}>
            Smart Stadium Operations & Tournament Assistant
          </p>
          <p className="text-base mb-10 max-w-2xl mx-auto animate-fade-in-up" style={{ color: 'var(--text-muted)', animationDelay: '0.3s' }}>
            Powered by Google Gemini AI · Crowd Intelligence · Multilingual Support · Accessibility-First · Real-Time Operations
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <Link href="/fan" className="btn-primary px-6 py-3 text-base font-bold rounded-xl">
              Fan Portal <ArrowRight size={16} />
            </Link>
            <Link href="/staff" className="btn-glass px-6 py-3 text-base font-semibold rounded-xl">
              Staff Dashboard <ChevronRight size={16} />
            </Link>
            <Link href="/organizer" className="btn-glass px-6 py-3 text-base font-semibold rounded-xl">
              Organizer Analytics <ChevronRight size={16} />
            </Link>
          </div>

          {/* Language tag row */}
          <div className="flex items-center justify-center gap-3 mt-8 flex-wrap animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            {['🇺🇸 EN', '🇮🇳 हिं', '🇮🇳 తె', '🇪🇸 ES', '🇫🇷 FR', '🇸🇦 AR'].map((l) => (
              <span key={l} className="text-xs px-3 py-1 rounded-full glass" style={{ color: 'var(--text-muted)' }}>{l}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── LIVE STATS BAR ───────────────────────────────────────────────── */}
      <section className="py-8 border-y" style={{ borderColor: 'var(--glass-border)', background: 'var(--bg-secondary)' }} aria-label="Live statistics">
        <div className="page-container grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div key={stat.label} className="stat-card text-center animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="flex justify-center mb-2" style={{ color: stat.color }}>{stat.icon}</div>
              <div className="text-2xl font-black" style={{ color: stat.color }}>{stat.value}</div>
              {stat.sub && <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{stat.sub}</div>}
              <div className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── ROLE PORTALS ─────────────────────────────────────────────────── */}
      <section className="py-20" aria-labelledby="portals-heading">
        <div className="page-container">
          <div className="text-center mb-12">
            <h2 id="portals-heading" className="section-title text-4xl mb-4 gradient-text">Choose Your Role</h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: 'var(--text-muted)' }}>
              Tailored AI experiences for every stakeholder at FIFA World Cup 2026
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {roles.map((role, i) => (
              <Link
                key={role.href}
                href={role.href}
                className="glass-card p-6 flex flex-col gap-4 no-underline animate-fade-in-up"
                style={{ animationDelay: `${i * 0.1}s` }}
                aria-label={`Navigate to ${role.title}`}
              >
                <div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full glass" style={{ color: 'var(--text-secondary)' }}>{role.badge}</span>
                </div>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white" style={{ background: role.gradient }}>
                  {role.icon}
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1.5">{role.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>{role.desc}</p>
                </div>
                <ul className="space-y-1.5 mt-auto">
                  {role.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
                      <Check size={11} className="shrink-0 text-green-500" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-1 text-xs font-semibold" style={{ color: 'var(--accent-primary)' }}>
                  Open Portal <ArrowRight size={12} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES GRID ────────────────────────────────────────────────── */}
      <section className="py-20" style={{ background: 'var(--bg-secondary)' }} aria-labelledby="features-heading">
        <div className="page-container">
          <div className="text-center mb-12">
            <h2 id="features-heading" className="section-title text-4xl mb-4 gradient-text">Platform Capabilities</h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: 'var(--text-muted)' }}>
              Enterprise-grade AI features designed for the world&apos;s largest sporting event
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, i) => (
              <div key={feat.title} className="glass-card p-5 flex gap-4 animate-fade-in-up" style={{ animationDelay: `${i * 0.08}s` }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-white" style={{ background: `${feat.color}22`, color: feat.color, border: `1px solid ${feat.color}40` }}>
                  {feat.icon}
                </div>
                <div>
                  <h3 className="font-bold text-sm mb-1">{feat.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MATCH DAY TIMELINE ───────────────────────────────────────────── */}
      <section className="py-20" aria-labelledby="schedule-heading">
        <div className="page-container">
          <div className="text-center mb-12">
            <h2 id="schedule-heading" className="section-title text-4xl mb-4 gradient-text">Today&apos;s Match Day Schedule</h2>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>USA vs Argentina · Quarter Final · MetLife Stadium</p>
          </div>
          <div className="max-w-xl mx-auto space-y-3">
            {matchDay.map((item, i) => (
              <div key={i} className={`glass-card p-4 flex items-center gap-4 ${item.status === 'live' ? 'border border-green-500/40' : ''}`}>
                <div className="text-sm font-bold w-14 shrink-0 font-mono" style={{ color: 'var(--text-muted)' }}>{item.time}</div>
                <div
                  className={`w-2.5 h-2.5 rounded-full shrink-0 ${item.status === 'live' ? 'bg-green-500 animate-pulse-green' : item.status === 'past' ? 'bg-blue-500/50' : 'bg-gray-600'}`}
                />
                <div className="text-sm flex-1" style={{ color: item.status === 'past' ? 'var(--text-muted)' : item.status === 'live' ? '#4ade80' : 'var(--text-primary)' }}>
                  {item.event}
                </div>
                {item.status === 'live' && <span className="badge badge-success">LIVE</span>}
                {item.status === 'past' && <span className="badge badge-neutral">Done</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer className="py-12 border-t" style={{ borderColor: 'var(--glass-border)', background: 'var(--bg-secondary)' }} role="contentinfo">
        <div className="page-container text-center">
          <div className="flex items-center justify-center gap-2.5 mb-4">
            <div className="gradient-primary w-8 h-8 rounded-xl flex items-center justify-center">
              <Zap size={16} color="white" />
            </div>
            <span className="font-bold gradient-text">StadiumSense AI</span>
          </div>
          <p className="text-xs mb-2" style={{ color: 'var(--text-muted)' }}>
            Powered by Google Gemini AI · Built for FIFA World Cup 2026 · PromptWars Challenge 4
          </p>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            🌐 WCAG 2.1 AA Compliant · ♿ Fully Accessible · 🌿 Carbon-Neutral Platform
          </p>
          <div className="flex items-center justify-center gap-4 mt-6 text-xs" style={{ color: 'var(--text-muted)' }}>
            {['Privacy Policy', 'Accessibility Statement', 'Emergency Contacts', 'Venue Info'].map((l) => (
              <span key={l} className="cursor-pointer hover:text-blue-400 transition-colors">{l}</span>
            ))}
          </div>
        </div>
      </footer>

      <AIAssistant role="fan" density={density} lang={lang} t={t} />
    </div>
  );
}
