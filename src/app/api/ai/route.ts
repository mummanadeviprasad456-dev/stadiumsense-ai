import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/ai
 * Secure server-side proxy for the Google Gemini API.
 * All AI and translation requests from the client are routed through this endpoint.
 * The GEMINI_API_KEY environment variable is server-only and never exposed to the client bundle.
 *
 * Request body variants:
 *   Chat:        { prompt: string, history: object[], density: string, lang: string }
 *   Translation: { type: 'translate', text: string, targetLang: string }
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: 'No API key configured on server.' }, { status: 503 });
    }

    // ── Translation request ────────────────────────────────────────────────────
    if (body.type === 'translate') {
      const { text, targetLang } = body as { text: string; targetLang: string };

      const langNames: Record<string, string> = {
        hi: 'Hindi', te: 'Telugu', es: 'Spanish', fr: 'French', ar: 'Arabic',
      };

      const prompt = `Translate the following English phrase into ${langNames[targetLang] || targetLang}. Respond ONLY with the translation. Do not include quotes, explanations, or extra words.\nPhrase: "${text}"`;

      const geminiBody = {
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.2, maxOutputTokens: 150 },
      };

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(geminiBody) }
      );

      const json = await res.json();
      const translation = json?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
      if (translation) {
        return NextResponse.json({ translation });
      }
      return NextResponse.json({ error: 'Translation failed.' }, { status: 502 });
    }

    // ── Chat request (default) ─────────────────────────────────────────────────
    const { prompt, history, density, lang } = body as {
      prompt: string;
      history: { role: string; parts: { text: string }[] }[];
      density: string;
      lang: string;
    };

    const systemContext = `You are StadiumSense AI, the official smart assistant for FIFA World Cup 2026 at MetLife Stadium (New York/New Jersey, USA). You help fans, staff, volunteers, and organizers with stadium navigation, crowd management, emergency guidance, transportation, sustainability, accessibility, and match information. The current crowd density is: ${density}. Always respond in ${lang === 'ar' ? 'Arabic' : lang === 'hi' ? 'Hindi' : lang === 'te' ? 'Telugu' : lang === 'es' ? 'Spanish' : lang === 'fr' ? 'French' : 'English'}. Keep responses concise, helpful, and action-oriented. Use relevant emojis.`;

    const geminiBody = {
      system_instruction: { parts: [{ text: systemContext }] },
      contents: [
        ...history,
        { role: 'user', parts: [{ text: prompt }] },
      ],
      generationConfig: { temperature: 0.7, maxOutputTokens: 512 },
    };

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(geminiBody) }
    );

    const json = await res.json();
    const text = json?.candidates?.[0]?.content?.parts?.[0]?.text ?? 'I was unable to process that request. Please try again.';

    return NextResponse.json({ response: text });
  } catch (err) {
    console.error('[AI Route Error]', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
