import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/ai
 * Optional server-side proxy for Gemini API to avoid exposing keys client-side in production.
 * In development mode, the client calls Gemini directly via NEXT_PUBLIC_GEMINI_API_KEY.
 */
export async function POST(req: NextRequest) {
  try {
    const { prompt, history, density, lang } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'No API key configured on server.' }, { status: 503 });
    }

    const systemContext = `You are StadiumSense AI, the official smart assistant for FIFA World Cup 2026 at MetLife Stadium. Current crowd density: ${density}. Respond in ${lang}.`;

    const body = {
      system_instruction: { parts: [{ text: systemContext }] },
      contents: [
        ...history,
        { role: 'user', parts: [{ text: prompt }] },
      ],
      generationConfig: { temperature: 0.7, maxOutputTokens: 512 },
    };

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }
    );

    const json = await res.json();
    const text = json?.candidates?.[0]?.content?.parts?.[0]?.text ?? 'I was unable to process that request. Please try again.';

    return NextResponse.json({ response: text });
  } catch (err) {
    console.error('[AI Route Error]', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
