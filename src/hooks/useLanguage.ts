'use client';
import { useState, useCallback, useEffect } from 'react';
import { Language } from '../types';
import { dictionary } from '../utils/dictionary';

/**
 * useLanguage — multilingual translation hook.
 * Supports: English, Hindi, Telugu, Spanish, French, Arabic.
 */
export function useLanguage() {
  const [lang, setLang] = useState<Language>('en');

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

  // RTL support for Arabic
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'hi', label: 'हिन्दी', flag: '🇮🇳' },
    { code: 'te', label: 'తెలుగు', flag: '🇮🇳' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'ar', label: 'العربية', flag: '🇸🇦' },
  ];

  return { lang, setLang, t, languages };
}
