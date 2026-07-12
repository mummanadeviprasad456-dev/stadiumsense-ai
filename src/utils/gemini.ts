import { ChatMessage, CrowdDensity, Language } from '../types';

/**
 * Gemini AI Integration Utility
 * Falls back to a rich local rule-based engine if no API key is configured.
 */

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

// ─── Local AI Rule Engine ────────────────────────────────────────────────────

const rules: { patterns: string[]; response: string }[] = [
  {
    patterns: ['washroom', 'restroom', 'toilet', 'bathroom', 'wc', 'toilet'],
    response:
      '🚻 Washrooms are located on every concourse level near sections 110, 118, 126, 134, and 142. The nearest accessible (wheelchair-friendly) restroom from your current gate is signed in blue. Need me to highlight the route on the map?',
  },
  {
    patterns: ['gate', 'entrance', 'enter', 'entry'],
    response:
      '🚪 MetLife Stadium has 5 main entry gates: A (North), B (East), C (South), D (West), and E (VIP). Please scan your digital ticket at your assigned gate. During high density periods, I may recommend alternative gates to reduce wait time.',
  },
  {
    patterns: ['food', 'eat', 'hungry', 'restaurant', 'snack', 'drink', 'beverage', 'court'],
    response:
      '🍕 Food courts are located at Concourse Levels 1 and 2: Zone A (International Cuisine), Zone B (Fast Food & Snacks), Zone C (FIFA Official Merchandise + Café), and Zone D (Halal & Vegetarian options). Wait times are approximately 8–12 minutes during peak hours.',
  },
  {
    patterns: ['parking', 'car', 'lot', 'park my'],
    response:
      '🚗 Parking is available in Lots 1–6 (Capacity: 20,000 vehicles). Current availability: Lot 1 (FULL), Lot 2 (45% Available), Lot 3 (Open). I recommend Lot 3 for shortest walking time. Shuttle service runs every 8 minutes from Lot 5 & 6.',
  },
  {
    patterns: ['metro', 'train', 'subway', 'transit', 'public transport'],
    response:
      '🚇 The NJ Transit direct route (Line 6 – Stadium Express) stops directly outside Gate B. Trains depart every 12 minutes during match days. Carbon footprint: only 0.2 kg CO₂ per trip — the most eco-friendly option!',
  },
  {
    patterns: ['bus', 'shuttle', 'coach'],
    response:
      '🚌 Official FIFA World Cup shuttle buses depart from the Meadowlands Transit Hub every 10 minutes. Free for ticketed fans. Buses are wheelchair accessible with dedicated ramps and audio announcements.',
  },
  {
    patterns: ['seat', 'section', 'row', 'find my seat', 'where is my seat'],
    response:
      '💺 Your seat is located in the East Stand. To reach it: Enter through Gate C → Take Elevator 3 or Ramp C2 → Follow signs for Sections 120–130 → Your section steward will assist you. I\'ve highlighted your route on the map above.',
  },
  {
    patterns: ['emergency', 'help', 'urgent', 'fire', 'accident', 'medical', 'first aid'],
    response:
      '🚨 Emergency detected! First Aid stations are located at Gates A, B, C, D, and E concourse levels. For fire emergencies, use Exit Ramps 1–8 marked in red. Please press the SOS button for immediate security dispatch. Medical teams are on standby throughout the venue.',
  },
  {
    patterns: ['lost', 'found', 'missing', 'lost item', 'lost child'],
    response:
      '🔍 Visit the Lost & Found Center near Gate A (Main Office) or use the Lost & Found Registry in the Fan Portal to report items. For missing children, immediately alert any staff member wearing an orange vest or press the SOS button. A dedicated Family Reunification Point is at Gate A atrium.',
  },
  {
    patterns: ['accessibility', 'wheelchair', 'disabled', 'disability', 'special needs'],
    response:
      '♿ StadiumSense AI is fully accessibility-enabled! Wheelchair-accessible seating is in sections 110, 120, 130, and 140. Accessible entrances are at Gates A (ramp) and C (elevator). Braille guides and audio tours are available at the Information Desk near Gate B. Audio descriptions are broadcast on Channel 7.',
  },
  {
    patterns: ['schedule', 'match', 'game', 'when', 'kickoff', 'time', 'fixture'],
    response:
      '📅 Today\'s match: USA vs Argentina — Quarter Final, Kick-off: 18:00 Local Time. Gates open at 16:00. Pre-match entertainment begins at 17:00 on the main pitch. Full schedule is available in the Fan Portal.',
  },
  {
    patterns: ['eco', 'environment', 'carbon', 'green', 'sustainable', 'recycle'],
    response:
      '🌿 Great initiative! MetLife Stadium during FIFA 2026 has achieved 84.5% recycling rates, saved 145,000 litres of water, and avoided 9,800 kg of CO₂ through digital ticketing and eco-transport. Water refill stations are at every concourse corner. Please use the green recycling bins!',
  },
  {
    patterns: ['volunteer', 'help me', 'where is staff', 'steward', 'info desk'],
    response:
      '🧑‍🤝‍🧑 Volunteers in orange vests are stationed at every gate and concourse junction. The main Information Desk is at Gate A Atrium. You can also use this AI assistant in 6 languages — just speak or type your question!',
  },
  {
    patterns: ['ticket', 'digital ticket', 'qr code', 'scan'],
    response:
      '🎟️ Your digital ticket is stored in the Fan Portal. Open the Fan tab, tap "My Ticket" and present the animated QR code at your gate. If you\'ve lost your ticket confirmation, please visit the Box Office at Gate A with your booking reference.',
  },
  {
    patterns: ['water', 'refill', 'bottle', 'hydration'],
    response:
      '💧 Water Refill Stations are at every concourse corner (marked with a blue droplet icon on the map). Please bring your reusable bottle — this initiative has saved over 145,000 plastic bottles during this tournament!',
  },
  {
    patterns: ['hello', 'hi', 'hey', 'good morning', 'good evening', 'namaste', 'hola', 'bonjour'],
    response:
      '👋 Hello and welcome to MetLife Stadium for the FIFA World Cup 2026! I\'m your StadiumSense AI companion. I can help you navigate the stadium, find seats, locate facilities, plan your journey, or provide emergency guidance. What do you need today?',
  },
];

/**
 * Rule-based local AI response engine for when Gemini API is not configured.
 */
function localAIResponse(input: string, density: CrowdDensity): string {
  const lower = input.toLowerCase();
  for (const rule of rules) {
    if (rule.patterns.some((p) => lower.includes(p))) {
      // Append crowd-density context
      if (density === 'high' && lower.includes('gate')) {
        return (
          rule.response +
          '\n\n⚠️ **AI Crowd Alert:** High density detected at Gates A & D. We recommend using Gates B or E for a smoother entry (estimated 6-minute wait vs 22+ minutes at Gate A).'
        );
      }
      return rule.response;
    }
  }
  return '🤖 I\'m your StadiumSense AI, here to help with navigation, facility locations, match schedules, emergency guidance, and more. Could you please clarify your question? For example, try asking: "Where is the nearest washroom?" or "How do I get to my seat?"';
}

/**
 * Queries the Gemini API or falls back to the local AI engine.
 */
export async function getAIResponse(
  input: string,
  history: ChatMessage[],
  density: CrowdDensity,
  lang: Language
): Promise<string> {
  if (!GEMINI_API_KEY) {
    // Simulate a brief network delay for realism
    await new Promise((resolve) => setTimeout(resolve, 700 + Math.random() * 600));
    return localAIResponse(input, density);
  }

  try {
    const systemContext = `You are StadiumSense AI, the official smart assistant for FIFA World Cup 2026 at MetLife Stadium (New York/New Jersey, USA). You help fans, staff, volunteers, and organizers with stadium navigation, crowd management, emergency guidance, transportation, sustainability, accessibility, and match information. The current crowd density is: ${density}. Always respond in ${lang === 'ar' ? 'Arabic' : lang === 'hi' ? 'Hindi' : lang === 'te' ? 'Telugu' : lang === 'es' ? 'Spanish' : lang === 'fr' ? 'French' : 'English'}. Keep responses concise, helpful, and action-oriented. Use relevant emojis.`;

    const formattedHistory = history.map((msg) => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }],
    }));

    const body = {
      system_instruction: { parts: [{ text: systemContext }] },
      contents: [...formattedHistory, { role: 'user', parts: [{ text: input }] }],
      generationConfig: { temperature: 0.7, maxOutputTokens: 512 },
    };

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }
    );

    const json = await res.json();
    return json?.candidates?.[0]?.content?.parts?.[0]?.text ?? localAIResponse(input, density);
  } catch {
    return localAIResponse(input, density);
  }
}

/**
 * Translates a custom phrase to the target language using Gemini or a local fallback.
 */
export async function translateText(
  text: string,
  targetLang: 'hi' | 'te' | 'es' | 'fr' | 'ar'
): Promise<string> {
  const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const langNames: Record<string, string> = {
    hi: 'Hindi',
    te: 'Telugu',
    es: 'Spanish',
    fr: 'French',
    ar: 'Arabic'
  };

  const phrasePairs: Record<string, Record<string, string>> = {
    'Where is the washroom?': { hi: 'वॉशरूम कहाँ है?', te: 'వాష్‌రూమ్ ఎక్కడ ఉంది?', es: '¿Dónde está el baño?', fr: 'Où sont les toilettes?', ar: 'أين دورة المياه؟' },
    'How do I get to my seat?': { hi: 'मैं अपनी सीट पर कैसे जाऊं?', te: 'నా సీటుకు ఎలా వెళ్ళాలి?', es: '¿Cómo llego a mi asiento?', fr: 'Comment aller à ma place?', ar: 'كيف أصل إلى مقعدي؟' },
    'Where is the food court?': { hi: 'फूड कोर्ट कहाँ है?', te: 'ఫుడ్ కోర్ట్ ఎక్కడ ఉంది?', es: '¿Dónde está el food court?', fr: 'Où est la restauration?', ar: 'أين ساحة الطعام؟' },
    'I need medical help': { hi: 'मुझे चिकित्सा सहायता चाहिए', te: 'నాకు వైద్య సహాయం అవసరం', es: 'Necesito ayuda médica', fr: "J'ai besoin d'aide médicale", ar: 'أحتاج مساعدة طبية' },
    'Where is Gate A?': { hi: 'गेट A कहाँ है?', te: 'గేట్ A ఎక్కడ ఉంది?', es: '¿Dónde está la Puerta A?', fr: 'Où est la Porte A?', ar: 'أين البوابة A؟' },
  };

  const simpleFallbacks: Record<string, Record<string, string>> = {
    'hello': { hi: 'नमस्ते', te: 'హలో', es: 'Hola', fr: 'Bonjour', ar: 'مرحبا' },
    'hi': { hi: 'नमस्ते', te: 'హలో', es: 'Hola', fr: 'Bonjour', ar: 'مرحبا' },
    'thank you': { hi: 'धन्यवाद', te: 'ధన్యవాదాలు', es: 'Gracias', fr: 'Merci', ar: 'شكرًا لك' },
    'goodbye': { hi: 'अलविदा', te: 'వీడ్కోలు', es: 'Adiós', fr: 'Au revoir', ar: 'وداعا' },
    'ticket': { hi: 'टिकट', te: 'టికెట్', es: 'boleto', fr: 'billet', ar: 'تذكرة' },
    'water': { hi: 'पानी', te: 'నీరు', es: 'agua', fr: 'eau', ar: 'ماء' },
    'emergency': { hi: 'आपातकाल', te: 'అత్యవసర పరిస్థితి', es: 'emergencia', fr: 'urgence', ar: 'حالة طوارئ' },
    'exit': { hi: 'निकास', te: 'నిష్క్రమణ', es: 'salida', fr: 'sortie', ar: 'مخرج' },
    'stadium': { hi: 'स्टेडियम', te: 'స్టేడియం', es: 'estadio', fr: 'stade', ar: 'ملعب' }
  };

  // Predefined keyword matches to make the local engine feel smart
  const lower = text.toLowerCase().trim();
  const cleanPhrase = lower.replace(/[?.!,]/g, '');

  if (phrasePairs[text]) {
    return phrasePairs[text][targetLang];
  }

  const matchedPredefined = Object.keys(phrasePairs).find(key => {
    const keyLower = key.toLowerCase();
    if (lower.includes(keyLower)) return true;
    if (lower.includes('washroom') || lower.includes('toilet') || lower.includes('restroom') || lower.includes('bathroom')) {
      return key === 'Where is the washroom?';
    }
    if (lower.includes('seat') || lower.includes('chair') || lower.includes('sit')) {
      return key === 'How do I get to my seat?';
    }
    if (lower.includes('food') || lower.includes('eat') || lower.includes('hungry') || lower.includes('court')) {
      return key === 'Where is the food court?';
    }
    if (lower.includes('medical') || lower.includes('hurt') || lower.includes('doctor') || lower.includes('hospital')) {
      return key === 'I need medical help';
    }
    if (lower.includes('gate a') || (lower.includes('gate') && lower.includes('a'))) {
      return key === 'Where is Gate A?';
    }
    return false;
  });

  if (matchedPredefined) {
    return phrasePairs[matchedPredefined][targetLang];
  }

  if (simpleFallbacks[cleanPhrase]) {
    return simpleFallbacks[cleanPhrase][targetLang];
  }

  if (!GEMINI_API_KEY) {
    // Return a simulated translation for other phrases when offline
    await new Promise((resolve) => setTimeout(resolve, 800));
    const langName = langNames[targetLang] || targetLang;

    if (lower.includes('ticket')) {
      return simpleFallbacks['ticket'][targetLang] + ' ?';
    }
    if (lower.includes('water')) {
      return simpleFallbacks['water'][targetLang] + ' ?';
    }
    if (lower.includes('exit')) {
      return simpleFallbacks['exit'][targetLang] + ' ?';
    }

    return `[AI Demo: "${text}" in ${langName}]`;
  }

  try {
    const prompt = `Translate the following English phrase into ${langNames[targetLang] || targetLang}. Respond ONLY with the translation. Do not include quotes, explanations, or extra words.
Phrase: "${text}"`;

    const body = {
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.2, maxOutputTokens: 150 },
    };

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }
    );

    const json = await res.json();
    const result = json?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    if (result) return result;
  } catch (err) {
    console.error('Translation error:', err);
  }

  return `[AI Translation Fallback: "${text}"]`;
}
