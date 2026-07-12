import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useLanguage } from '../src/hooks/useLanguage'

describe('useLanguage hook', () => {
  beforeEach(() => {
    document.documentElement.dir = 'ltr'
    document.documentElement.lang = 'en'
  })

  it('should initialize with default language en', () => {
    const { result } = renderHook(() => useLanguage())
    expect(result.current.lang).toBe('en')
    expect(document.documentElement.lang).toBe('en')
    expect(document.documentElement.dir).toBe('ltr')
  })

  it('should allow changing language and update document attributes', () => {
    const { result } = renderHook(() => useLanguage())
    
    act(() => {
      result.current.setLang('es')
    })
    expect(result.current.lang).toBe('es')
    expect(document.documentElement.lang).toBe('es')
    expect(document.documentElement.dir).toBe('ltr')

    // Arabic should trigger RTL
    act(() => {
      result.current.setLang('ar')
    })
    expect(result.current.lang).toBe('ar')
    expect(document.documentElement.lang).toBe('ar')
    expect(document.documentElement.dir).toBe('rtl')
  })

  it('should correctly format values with variables', () => {
    const { result } = renderHook(() => useLanguage())
    
    // Test direct key translation
    expect(result.current.t('stadiumSense')).toBe('StadiumSense AI')

    // Test text with variables
    expect(result.current.t('sosCountdown', { seconds: 5 })).toContain('5')
  })
})
