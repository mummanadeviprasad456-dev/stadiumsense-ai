'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Zap, Globe, Eye, Type, Palette, Mic, Sun, Moon, Menu, X,
  Users, LayoutDashboard, HeartHandshake, Home, Settings
} from 'lucide-react';
import { useStadiumContext } from '@/context/StadiumContext';

interface LayoutHeaderProps {
  darkMode?: boolean;
  onToggleDarkMode?: () => void;
}

export default function LayoutHeader({ darkMode: propDarkMode, onToggleDarkMode: propOnToggleDarkMode }: LayoutHeaderProps) {
  const {
    lang, setLang, t, languages,
    highContrast, setHighContrast,
    largeText, setLargeText,
    colorBlind, setColorBlind,
    screenReader, setScreenReader,
    voiceInputActive, startVoiceInput, stopVoiceInput,
    darkMode: ctxDarkMode, setDarkMode: ctxSetDarkMode
  } = useStadiumContext();

  const darkMode = propDarkMode !== undefined ? propDarkMode : ctxDarkMode;
  const onToggleDarkMode = propOnToggleDarkMode !== undefined ? propOnToggleDarkMode : () => ctxSetDarkMode(!ctxDarkMode);

  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [accessOpen, setAccessOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const navLinks = [
    { href: '/', label: t('home'), icon: <Home size={15} /> },
    { href: '/fan', label: t('fans'), icon: <Users size={15} /> },
    { href: '/staff', label: t('staff'), icon: <LayoutDashboard size={15} /> },
    { href: '/organizer', label: t('organizers'), icon: <Settings size={15} /> },
    { href: '/volunteer', label: t('volunteers'), icon: <HeartHandshake size={15} /> },
  ];

  return (
    <header
      role="banner"
      className="glass sticky top-0 z-50 border-b"
      style={{ borderColor: 'var(--glass-border)' }}
    >
      <div className="page-container">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0" aria-label="StadiumSense AI Home">
            <div className="gradient-primary w-9 h-9 rounded-xl flex items-center justify-center shadow-lg">
              <Zap size={18} color="white" />
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-sm leading-tight gradient-text">{t('stadiumSense')}</div>
              <div className="text-xs" style={{ color: 'var(--text-muted)' }}>FIFA WC 2026</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1" role="navigation" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link focus-ring ${pathname === link.href ? 'active' : ''}`}
                aria-current={pathname === link.href ? 'page' : undefined}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => { setLangOpen(!langOpen); setAccessOpen(false); }}
                className="btn-glass gap-1 px-3 py-1.5 text-xs"
                aria-label="Change language"
                aria-expanded={langOpen}
              >
                <Globe size={13} />
                {languages.find((l) => l.code === lang)?.flag}{' '}
                <span className="hidden sm:inline">{languages.find((l) => l.code === lang)?.label}</span>
              </button>
              {langOpen && (
                <div
                  className="absolute right-0 top-10 glass-card rounded-xl p-1.5 z-50 min-w-[170px] animate-fade-in"
                  role="listbox"
                  aria-label="Select language"
                >
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      role="option"
                      aria-selected={lang === l.code}
                      onClick={() => { setLang(l.code); setLangOpen(false); }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-2 transition-all ${lang === l.code ? 'bg-blue-500/20 text-blue-400' : 'hover:bg-white/5'}`}
                      style={{ color: lang === l.code ? undefined : 'var(--text-secondary)' }}
                    >
                      <span className="text-base">{l.flag}</span> {l.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Accessibility Panel */}
            <div className="relative">
              <button
                onClick={() => { setAccessOpen(!accessOpen); setLangOpen(false); }}
                className="btn-glass p-2"
                aria-label="Open accessibility settings"
                aria-expanded={accessOpen}
              >
                <Eye size={15} />
              </button>
              {accessOpen && (
                <div
                  className="absolute right-0 top-10 glass-card rounded-xl p-3 z-50 w-64 animate-fade-in"
                  role="dialog"
                  aria-label="Accessibility settings"
                >
                  <p className="text-xs font-semibold mb-3 pb-2 border-b" style={{ color: 'var(--text-muted)', borderColor: 'var(--glass-border)' }}>
                    {t('accessibilityPanel')}
                  </p>
                  {[
                    { label: t('highContrast'), icon: <Palette size={13}/>, value: highContrast, setter: setHighContrast },
                    { label: t('largeText'), icon: <Type size={13}/>, value: largeText, setter: setLargeText },
                    { label: t('colorBlind'), icon: <Eye size={13}/>, value: colorBlind, setter: setColorBlind },
                    { label: t('screenReader'), icon: <Mic size={13}/>, value: screenReader, setter: setScreenReader },
                  ].map((item) => (
                    <label
                      key={item.label}
                      className="flex items-center justify-between mb-2.5 cursor-pointer"
                    >
                      <span className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
                        {item.icon} {item.label}
                      </span>
                      <label className="toggle">
                        <input
                          type="checkbox"
                          checked={item.value}
                          onChange={() => item.setter(!item.value)}
                          aria-label={item.label}
                        />
                        <span className="toggle-slider" />
                      </label>
                    </label>
                  ))}
                  <hr className="divider" />
                  <button
                    className={`btn-glass w-full text-xs justify-center gap-2 ${voiceInputActive ? 'border-blue-500 text-blue-400' : ''}`}
                    onClick={() => voiceInputActive ? stopVoiceInput() : startVoiceInput(() => {})}
                    aria-label={voiceInputActive ? 'Stop voice input' : 'Start voice input'}
                  >
                    <Mic size={13} className={voiceInputActive ? 'animate-pulse' : ''} />
                    {voiceInputActive ? 'Listening...' : t('voiceInput')}
                  </button>
                </div>
              )}
            </div>

            {/* Dark/Light Mode */}
            <button
              onClick={onToggleDarkMode}
              className="btn-glass p-2"
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="btn-glass p-2 lg:hidden"
              aria-label="Toggle mobile menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <nav
            className="lg:hidden pb-3 pt-1 border-t animate-fade-in-up"
            style={{ borderColor: 'var(--glass-border)' }}
            role="navigation"
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link focus-ring ${pathname === link.href ? 'active' : ''}`}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.icon} {link.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
