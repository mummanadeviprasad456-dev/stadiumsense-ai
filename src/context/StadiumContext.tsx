'use client';

import React, { createContext, useContext, useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { CrowdDensity, Language, GateStatus } from '../types';
import { dictionary } from '../utils/dictionary';

interface StadiumContextType {
  // Language
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
  languages: { code: Language; label: string; flag: string }[];

  // Accessibility
  highContrast: boolean;
  setHighContrast: (v: boolean) => void;
  largeText: boolean;
  setLargeText: (v: boolean) => void;
  colorBlind: boolean;
  setColorBlind: (v: boolean) => void;
  screenReader: boolean;
  setScreenReader: (v: boolean) => void;
  voiceInputActive: boolean;
  isSpeaking: boolean;
  speak: (text: string) => void;
  stopSpeaking: () => void;
  startVoiceInput: (onResult: (transcript: string) => void) => void;
  stopVoiceInput: () => void;

  // Crowd Density
  density: CrowdDensity;
  setDensity: (d: CrowdDensity) => void;
  gates: GateStatus[];
  heatmapColor: (d: CrowdDensity) => string;
  zoneDensity: Record<string, CrowdDensity>;
  aiRerouting: string;
  totalVisitors: string;

  // Dark/Light Mode
  darkMode: boolean;
  setDarkMode: (v: boolean) => void;
}

const StadiumContext = createContext<StadiumContextType | undefined>(undefined);

export function StadiumProvider({ children }: { children: React.ReactNode }) {
  // Dark/Light Mode
  const [darkMode, setDarkMode] = useState(true);

  // Language
  const [lang, setLang] = useState<Language>('en');

  // Accessibility
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [colorBlind, setColorBlind] = useState(false);
  const [screenReader, setScreenReader] = useState(false);
  const [voiceInputActive, setVoiceInputActive] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const recognitionRef = useRef<any | null>(null);

  // Crowd Density
  const [density, setDensity] = useState<CrowdDensity>('medium');

  // Translations
  const t = useCallback(
    (key: string, vars?: Record<string, string | number>): string => {
      let value = dictionary[lang]?.[key] ?? dictionary['en']?.[key] ?? key;
      if (vars) {
        Object.entries(vars).forEach(([k, v]) => {
          value = value.replace(`{${k}}`, String(v));
        });
      }
      return value;
    },
    [lang]
  );

  const languages = useMemo((): { code: Language; label: string; flag: string }[] => [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'hi', label: 'हिन्दी', flag: '🇮🇳' },
    { code: 'te', label: 'తెలుగు', flag: '🇮🇳' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'ar', label: 'العربية', flag: '🇸🇦' },
  ], []);

  // RTL and Language class updates
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  // Accessibility classes
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('high-contrast', highContrast);
    root.classList.toggle('large-text', largeText);
    root.classList.toggle('color-blind', colorBlind);
    root.classList.toggle('screen-reader-mode', screenReader);
  }, [highContrast, largeText, colorBlind, screenReader]);

  // TTS
  const speak = useCallback((text: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  }, []);

  const stopSpeaking = useCallback(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  // Voice Input
  const startVoiceInput = useCallback((onResult: (transcript: string) => void) => {
    if (typeof window === 'undefined') return;
    const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognitionAPI) {
      alert('Voice recognition is not supported in this browser. Please use Chrome or Edge.');
      return;
    }
    const rec = new SpeechRecognitionAPI();
    rec.lang = 'en-US';
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    rec.onresult = (e: any) => {
      const transcript = e.results[0][0].transcript;
      onResult(transcript);
      setVoiceInputActive(false);
    };
    rec.onerror = () => setVoiceInputActive(false);
    rec.onend = () => setVoiceInputActive(false);
    recognitionRef.current = rec;
    rec.start();
    setVoiceInputActive(true);
  }, []);

  const stopVoiceInput = useCallback(() => {
    recognitionRef.current?.stop();
    setVoiceInputActive(false);
  }, []);

  // Crowd Density Mock Data mapping
  const gateData: Record<CrowdDensity, GateStatus[]> = useMemo(() => ({
    low: [
      { id: 'A', name: 'Gate A (North)', status: 'open', density: 'low', waitTime: 2, recommendedRoute: 'Use Gate A – Clear entry.' },
      { id: 'B', name: 'Gate B (East)', status: 'open', density: 'low', waitTime: 1, recommendedRoute: 'Use Gate B – Fastest route.' },
      { id: 'C', name: 'Gate C (South)', status: 'open', density: 'low', waitTime: 3, recommendedRoute: 'Use Gate C – Standard entry.' },
      { id: 'D', name: 'Gate D (West)', status: 'open', density: 'low', waitTime: 2, recommendedRoute: 'Use Gate D – Open access.' },
      { id: 'E', name: 'Gate E (VIP)', status: 'open', density: 'low', waitTime: 0, recommendedRoute: 'VIP Gate E – Priority access.' },
    ],
    medium: [
      { id: 'A', name: 'Gate A (North)', status: 'congested', density: 'medium', waitTime: 12, recommendedRoute: 'Moderate wait. Consider Gate B.' },
      { id: 'B', name: 'Gate B (East)', status: 'open', density: 'low', waitTime: 5, recommendedRoute: 'Gate B is clear – Recommended.' },
      { id: 'C', name: 'Gate C (South)', status: 'open', density: 'medium', waitTime: 8, recommendedRoute: 'Gate C has medium traffic.' },
      { id: 'D', name: 'Gate D (West)', status: 'congested', density: 'medium', waitTime: 14, recommendedRoute: 'Reroute via Gate E or B.' },
      { id: 'E', name: 'Gate E (VIP)', status: 'open', density: 'low', waitTime: 1, recommendedRoute: 'VIP Gate E – Priority entry.' },
    ],
    high: [
      { id: 'A', name: 'Gate A (North)', status: 'congested', density: 'high', waitTime: 28, recommendedRoute: '⚠️ Avoid Gate A. Reroute to Gate C.' },
      { id: 'B', name: 'Gate B (East)', status: 'congested', density: 'high', waitTime: 22, recommendedRoute: '⚠️ High delay. Try Gate C or E.' },
      { id: 'C', name: 'Gate C (South)', status: 'open', density: 'medium', waitTime: 10, recommendedRoute: '✅ Best option under high density.' },
      { id: 'D', name: 'Gate D (West)', status: 'closed', density: 'high', waitTime: 35, recommendedRoute: '🚫 Gate D temporarily closed. Use Gate C.' },
      { id: 'E', name: 'Gate E (VIP)', status: 'open', density: 'low', waitTime: 2, recommendedRoute: 'VIP Gate E open – Priority access.' },
    ],
  }), []);

  const gates = useMemo(() => gateData[density], [density, gateData]);

  const heatmapColor = useCallback((d: CrowdDensity): string => {
    if (d === 'low') return '#22c55e';
    if (d === 'medium') return '#f59e0b';
    return '#ef4444';
  }, []);

  const zoneDensity: Record<string, CrowdDensity> = useMemo(() => {
    const zoneMap: Record<CrowdDensity, Record<string, CrowdDensity>> = {
      low: { north: 'low', east: 'low', south: 'low', west: 'low', vip: 'low', field: 'low' },
      medium: { north: 'medium', east: 'low', south: 'medium', west: 'high', vip: 'low', field: 'medium' },
      high: { north: 'high', east: 'high', south: 'medium', west: 'high', vip: 'low', field: 'high' },
    };
    return zoneMap[density];
  }, [density]);

  const aiRerouting = useMemo(() => {
    if (density === 'high') {
      return '🔴 AI Alert: High crowd density detected. Gates A, B, D are congested. AI recommends routing all fans to Gate C and VIP Gate E. Estimated wait reduction: 18 minutes.';
    }
    if (density === 'medium') {
      return '🟡 AI Notice: Moderate congestion at Gates A and D. AI recommends Gates B and E for faster entry. Estimated wait: 5–8 minutes.';
    }
    return '🟢 AI Status: Crowd density is low. All gates are open with minimal wait times. Enjoy smooth entry!';
  }, [density]);

  const totalVisitors = useMemo(() => {
    if (density === 'low') return '28,400';
    if (density === 'medium') return '54,200';
    return '82,500';
  }, [density]);

  return (
    <StadiumContext.Provider value={{
      lang, setLang, t, languages,
      highContrast, setHighContrast,
      largeText, setLargeText,
      colorBlind, setColorBlind,
      screenReader, setScreenReader,
      voiceInputActive, isSpeaking, speak, stopSpeaking, startVoiceInput, stopVoiceInput,
      density, setDensity, gates, heatmapColor, zoneDensity, aiRerouting, totalVisitors,
      darkMode, setDarkMode
    }}>
      {children}
    </StadiumContext.Provider>
  );
}

export function useStadiumContext() {
  const context = useContext(StadiumContext);
  if (context === undefined) {
    throw new Error('useStadiumContext must be used within a StadiumProvider');
  }
  return context;
}
