'use client';
import { useState, useEffect, useRef } from 'react';
import { AlertTriangle, X, Phone, Stethoscope, Shield, MapPin } from 'lucide-react';

interface SOSButtonProps {
  t: (key: string, vars?: Record<string, string | number>) => string;
  onTriggered?: (location: string) => void;
}

export default function SOSButton({ t, onTriggered }: SOSButtonProps) {
  const [phase, setPhase] = useState<'idle' | 'countdown' | 'active'>('idle');
  const [countdown, setCountdown] = useState(3);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startSOS = () => {
    if (phase === 'idle') {
      setPhase('countdown');
      setCountdown(3);
    }
  };

  const cancelSOS = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setPhase('idle');
    setCountdown(3);
  };

  useEffect(() => {
    if (phase === 'countdown') {
      intervalRef.current = setInterval(() => {
        setCountdown((c) => {
          if (c <= 1) {
            clearInterval(intervalRef.current!);
            setPhase('active');
            // Defer parent setState call to avoid "setState during render" warning
            setTimeout(() => onTriggered?.('Current GPS: Gate A, Section 112'), 0);
            return 0;
          }
          return c - 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [phase, onTriggered]);

  if (phase === 'active') {
    return (
      <div
        className="glass-card p-5 animate-fade-in rounded-xl"
        style={{ borderColor: 'rgba(239,68,68,0.5)', background: 'rgba(239,68,68,0.1)' }}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center animate-pulse-sos">
              <AlertTriangle size={20} color="white" />
            </div>
            <div>
              <h3 className="font-bold text-base text-red-400">🚨 {t('sosTriggered')}</h3>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>Location transmitted to security control room</p>
            </div>
          </div>
          <button onClick={cancelSOS} className="btn-glass p-1.5" aria-label="Dismiss SOS alert">
            <X size={14} />
          </button>
        </div>

        <p className="text-xs mb-4 text-red-300/90 leading-relaxed">
          {t('emergencyEvac')}
        </p>

        <div className="grid grid-cols-2 gap-2">
          {[
            { icon: <Stethoscope size={13} />, label: 'First Aid', sub: 'Gate A – Level 1', color: '#22c55e' },
            { icon: <MapPin size={13} />, label: 'Nearest Exit', sub: 'Exit Ramp 3 – East', color: '#60a5fa' },
            { icon: <Phone size={13} />, label: 'Emergency', sub: '911 / +1-201-559-1300', color: '#f59e0b' },
            { icon: <Shield size={13} />, label: 'Security', sub: 'Team dispatched (ETA 2 min)', color: '#a78bfa' },
          ].map((item) => (
            <div
              key={item.label}
              className="glass p-2.5 rounded-lg"
              style={{ borderColor: `${item.color}30` }}
            >
              <div className="flex items-center gap-1.5 mb-1" style={{ color: item.color }}>
                {item.icon}
                <span className="font-semibold text-xs">{item.label}</span>
              </div>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{item.sub}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (phase === 'countdown') {
    return (
      <button
        onClick={cancelSOS}
        className="w-full p-4 rounded-xl text-center transition-all animate-pulse"
        style={{ background: 'rgba(245,158,11,0.15)', border: '2px solid #f59e0b', color: '#fbbf24' }}
        aria-live="polite"
        aria-label={`Cancelling SOS countdown. ${countdown} seconds remaining.`}
      >
        <div className="text-3xl font-black mb-1">{countdown}</div>
        <p className="text-xs font-semibold">{t('sosCountdown', { seconds: countdown })}</p>
      </button>
    );
  }

  return (
    <button
      onClick={startSOS}
      className="btn-danger w-full justify-center py-3 text-sm font-bold animate-pulse-sos"
      aria-label="Press SOS Emergency button to alert security teams"
    >
      <AlertTriangle size={16} />
      {t('sos')}
    </button>
  );
}
