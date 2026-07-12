'use client';
import { useState } from 'react';
import {
  Globe, BookOpen, Calendar, Search,
  CheckCircle, Circle, AlertTriangle, Zap, Languages, Loader2
} from 'lucide-react';
import LayoutHeader from '@/components/LayoutHeader';
import SOSButton from '@/components/SOSButton';
import AIAssistant from '@/components/AIAssistant';
import { useStadiumContext } from '@/context/StadiumContext';
import { matchSchedule, lostAndFoundItems } from '@/utils/mockData';
import { translateText } from '@/utils/gemini';

type VolTab = 'translate' | 'checklist' | 'schedule' | 'lost';

// Simple volunteer task checklist
const taskTemplate = [
  { id: 't1', label: 'Check in at Volunteer Hub – Gate A', done: false },
  { id: 't2', label: 'Review crowd density briefing (use AI)', done: false },
  { id: 't3', label: 'Station assignment: Concourse Level 2, Zone B', done: false },
  { id: 't4', label: 'Verify accessibility support equipment (wheelchairs, ramps)', done: false },
  { id: 't5', label: 'Test emergency radio channel 7', done: false },
  { id: 't6', label: 'Assist fans with gate entry 16:00–18:00', done: false },
  { id: 't7', label: 'Report incidents via Staff Dashboard', done: false },
  { id: 't8', label: 'Attend post-match debrief at Gate A Hub – 21:30', done: false },
];

// Translation phrases (simplified demo)
const phrasePairs: Record<string, Record<string, string>> = {
  'Where is the washroom?': { hi: 'वॉशरूम कहाँ है?', te: 'వాష్‌రూమ్ ఎక్కడ ఉంది?', es: '¿Dónde está el baño?', fr: 'Où sont les toilettes?', ar: 'أين دورة المياه؟' },
  'How do I get to my seat?': { hi: 'मैं अपनी सीट पर कैसे जाऊं?', te: 'నా సీటుకు ఎలా వెళ్ళాలి?', es: '¿Cómo llego a mi asiento?', fr: 'Comment aller à ma place?', ar: 'كيف أصل إلى مقعدي؟' },
  'Where is the food court?': { hi: 'फूड कोर्ट कहाँ है?', te: 'ఫుడ్ కోర్ట్ ఎక్కడ ఉంది?', es: '¿Dónde está el food court?', fr: 'Où est la restauration?', ar: 'أين ساحة الطعام؟' },
  'I need medical help': { hi: 'मुझे चिकित्सा सहायता चाहिए', te: 'నాకు వైద్య సహాయం అవసరం', es: 'Necesito ayuda médica', fr: "J'ai besoin d'aide médicale", ar: 'أحتاج مساعدة طبية' },
  'Where is Gate A?': { hi: 'गेट A कहाँ है?', te: 'గేట్ A ఎక్కడ ఉంది?', es: '¿Dónde está la Puerta A?', fr: 'Où est la Porte A?', ar: 'أين البوابة A؟' },
};

export default function VolunteerPage() {
  const [activeTab, setActiveTab] = useState<VolTab>('translate');
  const [tasks, setTasks] = useState(taskTemplate);
  const [customPhrase, setCustomPhrase] = useState('');
  const [selectedPhrase, setSelectedPhrase] = useState('Where is the washroom?');
  const [customTranslation, setCustomTranslation] = useState<string | null>(null);
  const [translating, setTranslating] = useState(false);
  const [targetLang, setTargetLang] = useState<'hi' | 'te' | 'es' | 'fr' | 'ar'>('es');
  const [lostQuery, setLostQuery] = useState('');
  const {
    t, lang, density, aiRerouting, darkMode, setDarkMode
  } = useStadiumContext();

  const handleAITranslate = async () => {
    if (!customPhrase.trim()) return;
    setTranslating(true);
    setCustomTranslation(null);
    try {
      const result = await translateText(customPhrase, targetLang);
      setCustomTranslation(result);
      setSelectedPhrase(customPhrase);
    } finally {
      setTranslating(false);
    }
  };

  const toggleTask = (id: string) => {
    setTasks((prev) => prev.map((task) => task.id === id ? { ...task, done: !task.done } : task));
  };

  const completedCount = tasks.filter((t) => t.done).length;

  const tabs: { id: VolTab; label: string; icon: React.ReactNode }[] = [
    { id: 'translate', label: 'Live Translator', icon: <Languages size={14} /> },
    { id: 'checklist', label: 'My Tasks', icon: <BookOpen size={14} /> },
    { id: 'schedule', label: 'Event Schedule', icon: <Calendar size={14} /> },
    { id: 'lost', label: 'Lost & Found', icon: <Search size={14} /> },
  ];

  const langLabels: Record<string, string> = { hi: 'Hindi 🇮🇳', te: 'Telugu 🇮🇳', es: 'Spanish 🇪🇸', fr: 'French 🇫🇷', ar: 'Arabic 🇸🇦' };

  return (
    <div className={darkMode ? '' : 'light-mode'} style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)', minHeight: '100vh' }}>
      <LayoutHeader darkMode={darkMode} onToggleDarkMode={() => setDarkMode(!darkMode)} />

      <main className="page-container py-8" id="main-content">
        <div className="mb-8 animate-fade-in-up">
          <h1 className="section-title text-3xl mb-1">
            🤝 <span className="gradient-text">Volunteer Assistant Hub</span>
          </h1>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            AI-powered translation, task management, and real-time fan assistance for FIFA World Cup 2026 volunteers
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 flex-wrap mb-6 animate-fade-in-up" role="tablist">
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

        {/* AI Alert Banner */}
        <div className="mb-5 p-3 rounded-xl text-xs animate-fade-in" style={{ background: density === 'high' ? 'rgba(239,68,68,0.1)' : 'rgba(245,158,11,0.1)', border: `1px solid ${density === 'high' ? 'rgba(239,68,68,0.3)' : 'rgba(245,158,11,0.3)'}`, color: density === 'high' ? '#f87171' : '#fbbf24' }} role="alert" aria-live="polite">
          <AlertTriangle size={12} className="inline mr-1.5" />
          <strong>AI Volunteer Briefing:</strong> {aiRerouting}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-5">

            {/* ── TRANSLATION TAB ─────────────────────────────────────── */}
            {activeTab === 'translate' && (
              <div className="space-y-4 animate-fade-in">
                <div className="glass-card p-5">
                  <h2 className="font-semibold text-sm mb-4 flex items-center gap-2">
                    <Globe size={14} style={{ color: 'var(--accent-primary)' }} /> Real-Time Fan Translation Tool
                  </h2>

                  {/* Target Language Selector */}
                  <div className="flex gap-2 mb-4 flex-wrap" role="group" aria-label="Select target language">
                    {(Object.keys(langLabels) as ('hi' | 'te' | 'es' | 'fr' | 'ar')[]).map((code) => (
                      <button
                        key={code}
                        onClick={() => { setTargetLang(code); setCustomTranslation(null); }}
                        className={`density-btn text-xs ${targetLang === code ? 'active-low' : ''}`}
                        aria-pressed={targetLang === code}
                      >
                        {langLabels[code]}
                      </button>
                    ))}
                  </div>

                  {/* Common Phrase Selector */}
                  <div className="mb-4">
                    <label className="text-xs mb-2 block" style={{ color: 'var(--text-muted)' }}>Select Common Phrase:</label>
                    <div className="flex flex-wrap gap-2">
                      {Object.keys(phrasePairs).map((phrase) => (
                        <button
                          key={phrase}
                          onClick={() => setSelectedPhrase(phrase)}
                          className={`text-xs px-3 py-1.5 rounded-lg transition-all ${selectedPhrase === phrase ? 'bg-blue-500/20 border border-blue-500/40 text-blue-400' : 'glass'}`}
                        >
                          {phrase}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Translation Display */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="p-4 rounded-xl" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--glass-border)' }}>
                      <div className="text-xs mb-2 font-semibold" style={{ color: 'var(--text-muted)' }}>🇺🇸 English (Original)</div>
                      <p className="text-sm font-medium">{selectedPhrase}</p>
                    </div>
                    <div className="p-4 rounded-xl" style={{ background: 'rgba(37,99,235,0.08)', border: '1px solid rgba(37,99,235,0.3)' }}>
                      <div className="text-xs mb-2 font-semibold text-blue-400">{langLabels[targetLang]} (Translation)</div>
                      {translating ? (
                        <div className="flex items-center gap-2">
                          <Loader2 size={13} className="animate-spin text-blue-400" />
                          <span className="text-xs text-blue-300">Translating...</span>
                        </div>
                      ) : (
                        <p className="text-sm font-medium text-blue-300" dir={targetLang === 'ar' ? 'rtl' : 'ltr'}>
                          {customTranslation ?? phrasePairs[selectedPhrase]?.[targetLang] ?? selectedPhrase}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* AI Translation for custom input */}
                  <div className="mt-4">
                    <label className="text-xs mb-2 block" style={{ color: 'var(--text-muted)' }}>Or type a custom phrase for AI translation:</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Type fan's question..."
                        value={customPhrase}
                        onChange={(e) => { setCustomPhrase(e.target.value); setCustomTranslation(null); }}
                        onKeyDown={(e) => e.key === 'Enter' && handleAITranslate()}
                        className="flex-1 text-xs px-3 py-2 rounded-lg outline-none focus-ring"
                        style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)' }}
                        aria-label="Enter custom phrase to translate"
                      />
                      <button
                        onClick={handleAITranslate}
                        disabled={translating || !customPhrase.trim()}
                        className="btn-primary text-xs gap-1 disabled:opacity-50"
                      >
                        {translating ? <Loader2 size={12} className="animate-spin" /> : <Zap size={12} />} AI Translate
                      </button>
                    </div>
                  </div>
                </div>

                {/* Emergency Response Guide */}
                <div className="glass-card p-5" style={{ borderColor: 'rgba(239,68,68,0.3)' }}>
                  <h2 className="font-semibold text-sm mb-3 flex items-center gap-2 text-red-400">
                    <AlertTriangle size={14} /> Emergency Response Guide for Volunteers
                  </h2>
                  <div className="space-y-2">
                    {[
                      { step: '1', title: 'Fan Medical Emergency', action: 'Call medical team via radio Ch. 5 → Locate nearest First Aid station → Keep fan calm and seated. Do NOT move if head/neck injury.' },
                      { step: '2', title: 'Missing Child', action: 'Immediately alert Security via radio Ch. 1 → Take child to Family Reunification Point at Gate A Atrium → Note description and parent name.' },
                      { step: '3', title: 'Crowd Surge', action: 'Activate radio Ch. 3 → Request gate rerouting from Staff Dashboard → Create space barrier with arms and direct fans calmly to alternate exits.' },
                      { step: '4', title: 'Suspicious Package', action: 'Do NOT touch → Clear 100m perimeter → Notify Security Ch. 1 immediately → Use SOS button for instant dispatch.' },
                    ].map((guide) => (
                      <div key={guide.step} className="flex gap-3 p-3 rounded-xl" style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)' }}>
                        <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 font-black text-xs shrink-0">{guide.step}</div>
                        <div>
                          <div className="text-xs font-semibold text-red-400 mb-0.5">{guide.title}</div>
                          <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>{guide.action}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── CHECKLIST TAB ───────────────────────────────────────── */}
            {activeTab === 'checklist' && (
              <div className="glass-card p-5 animate-fade-in">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold text-sm flex items-center gap-2">
                    <BookOpen size={14} style={{ color: 'var(--accent-primary)' }} /> My Volunteer Tasks
                  </h2>
                  <span className="badge badge-info">{completedCount}/{tasks.length} Done</span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden mb-4" style={{ background: 'var(--bg-tertiary)' }}>
                  <div className="h-full rounded-full transition-all duration-500 bg-blue-500" style={{ width: `${(completedCount / tasks.length) * 100}%` }} />
                </div>
                <div className="space-y-2">
                  {tasks.map((task) => (
                    <label key={task.id} className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all hover:bg-white/5" style={{ background: task.done ? 'rgba(34,197,94,0.06)' : 'var(--bg-tertiary)' }}>
                      <input type="checkbox" checked={task.done} onChange={() => toggleTask(task.id)} className="sr-only" aria-label={task.label} />
                      <div className="shrink-0" style={{ color: task.done ? '#22c55e' : 'var(--text-muted)' }}>
                        {task.done ? <CheckCircle size={16} /> : <Circle size={16} />}
                      </div>
                      <span className="text-xs" style={{ color: task.done ? 'var(--text-muted)' : 'var(--text-secondary)', textDecoration: task.done ? 'line-through' : 'none' }}>
                        {task.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* ── SCHEDULE TAB ────────────────────────────────────────── */}
            {activeTab === 'schedule' && (
              <div className="glass-card p-5 animate-fade-in">
                <h2 className="font-semibold text-sm mb-4 flex items-center gap-2">
                  <Calendar size={14} style={{ color: 'var(--accent-primary)' }} /> Tournament Match Schedule
                </h2>
                <div className="space-y-3">
                  {matchSchedule.map((match, i) => (
                    <div key={i} className={`p-4 rounded-xl flex flex-wrap items-center gap-3 ${match.stadium.includes('Host') ? 'border border-blue-500/30' : ''}`} style={{ background: 'var(--bg-tertiary)' }}>
                      <div className="font-mono text-sm font-bold w-14" style={{ color: 'var(--text-muted)' }}>{match.time}</div>
                      <div className="flex-1">
                        <div className="text-sm font-semibold">{match.match}</div>
                        <div className="text-xs" style={{ color: 'var(--text-muted)' }}>📍 {match.stadium}</div>
                      </div>
                      <span className={`badge ${match.status.includes('Upcoming') ? 'badge-info' : match.status.includes('Live') ? 'badge-success' : 'badge-neutral'}`}>
                        {match.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── LOST & FOUND TAB ────────────────────────────────────── */}
            {activeTab === 'lost' && (
              <div className="glass-card p-5 animate-fade-in">
                <h2 className="font-semibold text-sm mb-4 flex items-center gap-2">
                  <Search size={14} style={{ color: 'var(--accent-primary)' }} /> Lost & Found Registry
                </h2>
                <input
                  type="search"
                  placeholder="Search items..."
                  value={lostQuery}
                  onChange={(e) => setLostQuery(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg mb-4 outline-none focus-ring"
                  style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)' }}
                />
                <div className="space-y-2">
                  {lostAndFoundItems.filter((item) => !lostQuery || item.name.toLowerCase().includes(lostQuery.toLowerCase())).map((item) => (
                    <div key={item.id} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: 'var(--bg-tertiary)' }}>
                      <span className="text-lg">{item.status === 'found' ? '✅' : '🔍'}</span>
                      <div className="flex-1">
                        <div className="text-xs font-semibold">{item.name}</div>
                        <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{item.location}</div>
                      </div>
                      <span className={`badge ${item.status === 'found' ? 'badge-success' : 'badge-warning'}`}>
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <SOSButton t={t} />
            <div className="glass-card p-4">
              <h3 className="font-semibold text-sm mb-3 gradient-text">Volunteer Quick Info</h3>
              {[
                { label: 'Volunteer ID', value: 'VOL-2026-0442' },
                { label: 'Zone', value: 'Concourse Level 2, Zone B' },
                { label: 'Supervisor', value: 'Officer R. Patel' },
                { label: 'Radio Channel', value: 'Channel 7 (Primary)' },
                { label: 'Shift End', value: '22:00 Local Time' },
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

      <AIAssistant role="volunteer" density={density} lang={lang} t={t} />
    </div>
  );
}
