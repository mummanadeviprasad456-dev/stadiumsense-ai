'use client';

import React, { createContext, useContext, useState, useMemo } from 'react';
import { CrowdDensity, Language, GateStatus } from '../types';
import { useLanguage } from '../hooks/useLanguage';
import { useAccessibility } from '../hooks/useAccessibility';
import { useCrowdDensity } from '../hooks/useCrowdDensity';

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
  const [darkMode, setDarkMode] = useState(true);

  const langHook = useLanguage();
  const accessibilityHook = useAccessibility();
  const crowdHook = useCrowdDensity();

  const value = useMemo(() => ({
    darkMode,
    setDarkMode,
    ...langHook,
    ...accessibilityHook,
    ...crowdHook,
  }), [
    darkMode,
    langHook,
    accessibilityHook,
    crowdHook,
  ]);

  return (
    <StadiumContext.Provider value={value}>
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
