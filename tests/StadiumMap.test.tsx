import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import StadiumMap from '../src/components/StadiumMap'

describe('StadiumMap Component', () => {
  const mockHeatmapColor = vi.fn((d) => {
    if (d === 'low') return '#22c55e'
    if (d === 'medium') return '#f59e0b'
    return '#ef4444'
  })

  const mockZoneDensity = {
    north: 'low',
    south: 'medium',
    east: 'high',
    west: 'low',
    vip: 'low',
    field: 'medium',
  }

  it('should render the stadium map SVG container', () => {
    const { container } = render(
      <StadiumMap
        density="medium"
        zoneDensity={mockZoneDensity}
        heatmapColor={mockHeatmapColor}
      />
    )
    
    // Check for SVG
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
    expect(svg).toHaveAttribute('viewBox', '0 0 500 500')
  })

  it('should render stand labels', () => {
    render(
      <StadiumMap
        density="medium"
        zoneDensity={mockZoneDensity}
        heatmapColor={mockHeatmapColor}
      />
    )

    // Verify uppercase stand text exists in SVG
    expect(screen.getByText('NORTH STAND')).toBeInTheDocument()
    expect(screen.getByText('SOUTH STAND')).toBeInTheDocument()
    expect(screen.getByText('EAST STAND')).toBeInTheDocument()
    expect(screen.getByText('WEST STAND')).toBeInTheDocument()
  })

  it('should apply highlights when highlightGate is set', () => {
    const { container } = render(
      <StadiumMap
        density="medium"
        zoneDensity={mockZoneDensity}
        heatmapColor={mockHeatmapColor}
        highlightGate="A"
      />
    )

    // The gate circle has r=16 if highlighted, else r=12
    const highlightedGate = container.querySelector('circle[r="16"]')
    expect(highlightedGate).toBeInTheDocument()
  })
})
