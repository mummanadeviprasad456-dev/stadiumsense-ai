'use client';
import { useState, useCallback, useEffect, useRef } from 'react';

interface SpeechRecognitionInstance {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  onresult: ((event: { results: { [key: number]: { [key: number]: { transcript: string } } } }) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
}

/**
 * useAccessibility — WCAG-compliant accessibility settings hook.
 * Controls: high contrast, large text, color-blind palette, TTS, voice input.
 */
export function useAccessibility() {
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [colorBlind, setColorBlind] = useState(false);
  const [screenReader, setScreenReader] = useState(false);
  const [voiceInputActive, setVoiceInputActive] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);

  // Apply CSS classes to root element based on accessibility state
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('high-contrast', highContrast);
    root.classList.toggle('large-text', largeText);
    root.classList.toggle('color-blind', colorBlind);
    root.classList.toggle('screen-reader-mode', screenReader);
  }, [highContrast, largeText, colorBlind, screenReader]);

  /** Text-to-Speech: Speak a given text string aloud */
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

  /** Stop TTS playback */
  const stopSpeaking = useCallback(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  /**
   * Start listening for voice input; calls onResult with the transcript.
   */
  const startVoiceInput = useCallback((onResult: (transcript: string) => void) => {
    if (typeof window === 'undefined') return;
    const SpeechRecognitionAPI = (window as unknown as {
      SpeechRecognition?: new () => SpeechRecognitionInstance;
      webkitSpeechRecognition?: new () => SpeechRecognitionInstance;
    }).SpeechRecognition || (window as unknown as {
      SpeechRecognition?: new () => SpeechRecognitionInstance;
      webkitSpeechRecognition?: new () => SpeechRecognitionInstance;
    }).webkitSpeechRecognition;
    if (!SpeechRecognitionAPI) {
      alert('Voice recognition is not supported in this browser. Please use Chrome or Edge.');
      return;
    }
    const rec = new SpeechRecognitionAPI();
    rec.lang = 'en-US';
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    rec.onresult = (e: { results: { [key: number]: { [key: number]: { transcript: string } } } }) => {
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

  return {
    highContrast, setHighContrast,
    largeText, setLargeText,
    colorBlind, setColorBlind,
    screenReader, setScreenReader,
    voiceInputActive,
    isSpeaking,
    speak,
    stopSpeaking,
    startVoiceInput,
    stopVoiceInput,
  };
}
