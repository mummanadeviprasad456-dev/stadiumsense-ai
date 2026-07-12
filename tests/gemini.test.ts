import { describe, it, expect } from 'vitest'
import { getAIResponse, translateText } from '../src/utils/gemini'

describe('Gemini AI Integration / Local Fallback Utility', () => {
  it('should fall back to local rule-based response when NEXT_PUBLIC_GEMINI_API_KEY is not defined', async () => {
    // When offline / no API key, it should respond with matched keywords
    const response = await getAIResponse('Where is the washroom?', [], 'medium', 'en')
    expect(response).toContain('Washrooms are located')

    const foodResponse = await getAIResponse('Where can I get food?', [], 'medium', 'en')
    expect(foodResponse).toContain('Food courts are located')
  })

  it('should append crowd-density warning under high density for gate queries', async () => {
    const response = await getAIResponse('Which gate should I use?', [], 'high', 'en')
    expect(response).toContain('AI Crowd Alert')
  })

  it('should translate common preloaded phrases', async () => {
    const translation1 = await translateText('Where is the washroom?', 'es')
    expect(translation1).toBe('¿Dónde está el baño?')

    const translation2 = await translateText('Where is the food court?', 'fr')
    expect(translation2).toBe('Où est la restauration?')
  })

  it('should return simple word translations for fallback terms', async () => {
    const translationWater = await translateText('water', 'es')
    expect(translationWater).toBe('agua')
  })
})
