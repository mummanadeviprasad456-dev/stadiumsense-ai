import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useAccessibility } from '../src/hooks/useAccessibility'

describe('useAccessibility hook', () => {
  beforeEach(() => {
    document.documentElement.className = ''
  })

  it('should initialize with accessibility states disabled', () => {
    const { result } = renderHook(() => useAccessibility())
    expect(result.current.highContrast).toBe(false)
    expect(result.current.largeText).toBe(false)
    expect(result.current.colorBlind).toBe(false)
    expect(result.current.screenReader).toBe(false)
  })

  it('should toggle highContrast and apply CSS class to document root', () => {
    const { result } = renderHook(() => useAccessibility())
    
    act(() => {
      result.current.setHighContrast(true)
    })
    expect(result.current.highContrast).toBe(true)
    expect(document.documentElement.classList.contains('high-contrast')).toBe(true)

    act(() => {
      result.current.setHighContrast(false)
    })
    expect(result.current.highContrast).toBe(false)
    expect(document.documentElement.classList.contains('high-contrast')).toBe(false)
  })

  it('should toggle largeText and apply CSS class to document root', () => {
    const { result } = renderHook(() => useAccessibility())
    
    act(() => {
      result.current.setLargeText(true)
    })
    expect(result.current.largeText).toBe(true)
    expect(document.documentElement.classList.contains('large-text')).toBe(true)
  })

  it('should toggle colorBlind and apply CSS class to document root', () => {
    const { result } = renderHook(() => useAccessibility())
    
    act(() => {
      result.current.setColorBlind(true)
    })
    expect(result.current.colorBlind).toBe(true)
    expect(document.documentElement.classList.contains('color-blind')).toBe(true)
  })

  it('should toggle screenReader and apply CSS class to document root', () => {
    const { result } = renderHook(() => useAccessibility())
    
    act(() => {
      result.current.setScreenReader(true)
    })
    expect(result.current.screenReader).toBe(true)
    expect(document.documentElement.classList.contains('screen-reader-mode')).toBe(true)
  })
})
