import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useCrowdDensity } from '../src/hooks/useCrowdDensity'

describe('useCrowdDensity hook', () => {
  it('should initialize with default density medium', () => {
    const { result } = renderHook(() => useCrowdDensity())
    expect(result.current.density).toBe('medium')
    expect(result.current.totalVisitors).toBe('54,200')
    expect(result.current.aiRerouting).toContain('congestion')
  })

  it('should update wait times and routing on density state transition', () => {
    const { result } = renderHook(() => useCrowdDensity())

    // Transition to low density
    act(() => {
      result.current.setDensity('low')
    })
    expect(result.current.density).toBe('low')
    expect(result.current.totalVisitors).toBe('28,400')
    expect(result.current.gates[0].waitTime).toBe(2) // Gate A North is 2 mins

    // Transition to high density
    act(() => {
      result.current.setDensity('high')
    })
    expect(result.current.density).toBe('high')
    expect(result.current.totalVisitors).toBe('82,500')
    expect(result.current.gates[0].waitTime).toBe(28) // Gate A North is 28 mins
  })

  it('should return correct heatmap colors', () => {
    const { result } = renderHook(() => useCrowdDensity())
    expect(result.current.heatmapColor('low')).toBe('#22c55e')
    expect(result.current.heatmapColor('medium')).toBe('#f59e0b')
    expect(result.current.heatmapColor('high')).toBe('#ef4444')
  })
})
