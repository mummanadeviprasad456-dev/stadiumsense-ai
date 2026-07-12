import { describe, it, expect } from 'vitest'
import { dictionary } from '../src/utils/dictionary'

describe('dictionary utility', () => {
  it('should support all required languages', () => {
    const requiredLanguages = ['en', 'hi', 'te', 'es', 'fr', 'ar']
    requiredLanguages.forEach((lang) => {
      expect(dictionary).toHaveProperty(lang)
      expect(typeof dictionary[lang as keyof typeof dictionary]).toBe('object')
    })
  })

  it('should contain basic translations in English', () => {
    expect(dictionary.en.stadiumSense).toBe('StadiumSense AI')
    expect(dictionary.en.home).toBe('Home')
    expect(dictionary.en.fans).toBe('Fans')
  })

  it('should contain basic translations in Spanish', () => {
    expect(dictionary.es.stadiumSense).toBe('StadiumSense AI')
    expect(dictionary.es.home).toBe('Inicio')
    expect(dictionary.es.fans).toBe('Aficionados')
  })
})
