'use client';
import { useState, useRef, useEffect } from 'react';
import { Zap, Send, Mic, MicOff, Volume2, VolumeX, X, MessageSquare, Loader2 } from 'lucide-react';
import { ChatMessage, CrowdDensity, Language, UserRole } from '@/types';
import { getAIResponse } from '@/utils/gemini';
import { useAccessibility } from '@/hooks/useAccessibility';

const quickQuestions: Record<UserRole, string[]> = {
  fan: [
    'Where is my seat?',
    'Nearest washroom?',
    'How to get here by metro?',
    'Where is the food court?',
    'What time is kick-off?',
  ],
  staff: [
    'Show Gate A status',
    'Create incident report',
    'Reroute Gate D fans',
    'Security team update',
    'Check queue times',
  ],
  organizer: [
    'Show crowd analytics',
    'Sustainability report',
    'AI operational tips',
    'Emergency protocols',
    'Gate capacity summary',
  ],
  volunteer: [
    'Fan asked for restrooms',
    'Report lost child',
    'Translate: "Where is my gate?"',
    'Emergency first aid steps',
    'Lost item found procedure',
  ],
};

interface AIAssistantProps {
  role: UserRole;
  density: CrowdDensity;
  lang: Language;
  t: (key: string) => string;
}

export default function AIAssistant({ role, density, lang, t }: AIAssistantProps) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '0',
      sender: 'ai',
      text: t('aiDefaultResponse'),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { speak, stopSpeaking, isSpeaking, startVoiceInput, voiceInputActive } = useAccessibility();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const reply = await getAIResponse(text, messages, density, lang);
    const aiMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      sender: 'ai',
      text: reply,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, aiMsg]);
    setLoading(false);
  };

  const handleVoice = () => {
    if (voiceInputActive) return;
    startVoiceInput((transcript) => {
      setInput(transcript);
      sendMessage(transcript);
    });
  };

  return (
    <>
      {/* Floating Trigger Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center animate-float"
          style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)' }}
          aria-label="Open AI Assistant"
        >
          <Zap size={22} color="white" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-black animate-pulse-green" aria-hidden="true" />
        </button>
      )}

      {/* Chat Panel */}
      {open && (
        <div
          className="fixed bottom-6 right-6 z-50 w-[360px] h-[560px] glass-card flex flex-col animate-slide-right shadow-2xl"
          role="dialog"
          aria-label="StadiumSense AI Assistant"
          aria-modal="true"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-3 border-b" style={{ borderColor: 'var(--glass-border)' }}>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center">
                <Zap size={14} color="white" />
              </div>
              <div>
                <div className="text-sm font-bold">{t('aiAssistant')}</div>
                <div className="text-xs flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                  Online · {role.charAt(0).toUpperCase() + role.slice(1)} Mode
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => isSpeaking ? stopSpeaking() : speak(messages[messages.length - 1]?.text ?? '')}
                className="btn-glass p-1.5"
                aria-label={isSpeaking ? t('stopTTS') : t('ttsSpeak')}
              >
                {isSpeaking ? <VolumeX size={13} /> : <Volume2 size={13} />}
              </button>
              <button onClick={() => setOpen(false)} className="btn-glass p-1.5" aria-label="Close AI Assistant">
                <X size={13} />
              </button>
            </div>
          </div>

          {/* Quick Questions */}
          <div className="px-3 pt-2 pb-1 flex gap-1.5 flex-wrap" aria-label="Quick questions">
            {quickQuestions[role].slice(0, 3).map((q) => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                className="text-xs px-2 py-1 rounded-lg transition-all"
                style={{
                  background: 'rgba(37,99,235,0.12)',
                  border: '1px solid rgba(37,99,235,0.3)',
                  color: '#60a5fa',
                }}
              >
                {q}
              </button>
            ))}
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3" role="log" aria-label="Chat messages" aria-live="polite">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                <div>
                  {msg.sender === 'ai' && (
                    <div className="flex items-center gap-1.5 mb-1">
                      <div className="w-5 h-5 rounded-full gradient-primary flex items-center justify-center">
                        <Zap size={9} color="white" />
                      </div>
                      <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>AI · {msg.timestamp}</span>
                    </div>
                  )}
                  <div className={msg.sender === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'}>
                    <p className="whitespace-pre-wrap text-xs leading-relaxed">{msg.text}</p>
                  </div>
                  {msg.sender === 'user' && (
                    <p className="text-right text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{msg.timestamp}</p>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="chat-bubble-ai flex items-center gap-2">
                  <Loader2 size={13} className="animate-spin" style={{ color: 'var(--text-muted)' }} />
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Thinking...</span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t" style={{ borderColor: 'var(--glass-border)' }}>
            <form
              onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
              className="flex items-center gap-2"
            >
              <button
                type="button"
                onClick={handleVoice}
                className={`btn-glass p-2 shrink-0 ${voiceInputActive ? 'border-blue-500 text-blue-400' : ''}`}
                aria-label={voiceInputActive ? 'Stop voice input' : 'Start voice input'}
              >
                {voiceInputActive ? <MicOff size={14} className="animate-pulse" /> : <Mic size={14} />}
              </button>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={voiceInputActive ? t('voicePlaceholder') : t('askSomething')}
                className="flex-1 text-xs px-3 py-2 rounded-lg focus-ring outline-none"
                style={{
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--glass-border)',
                  color: 'var(--text-primary)',
                }}
                aria-label="Type your question"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="btn-primary p-2 shrink-0 disabled:opacity-40"
                aria-label="Send message"
              >
                <Send size={14} />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
