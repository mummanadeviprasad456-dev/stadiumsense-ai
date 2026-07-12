import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import CrowdSimulator from '../src/components/CrowdSimulator'

describe('CrowdSimulator Component', () => {
  const mockSetDensity = vi.fn()
  const mockT = vi.fn((key: string) => key)

  it('should render the density simulator details correctly', () => {
    render(
      <CrowdSimulator
        density="medium"
        setDensity={mockSetDensity}
        aiRerouting="🟡 AI Notice: Moderate congestion at Gates A and D."
        totalVisitors="54,200"
        t={mockT}
      />
    )

    // Check title and values
    expect(screen.getByText('simulateDensity')).toBeInTheDocument()
    expect(screen.getByText('54,200')).toBeInTheDocument()
    expect(screen.getByText('🟡 AI Notice: Moderate congestion at Gates A and D.')).toBeInTheDocument()
  })

  it('should trigger setDensity callback when buttons are clicked', () => {
    render(
      <CrowdSimulator
        density="medium"
        setDensity={mockSetDensity}
        aiRerouting="🟡 AI Notice"
        totalVisitors="54,200"
        t={mockT}
      />
    )

    const lowBtn = screen.getByRole('radio', { name: /low/i })
    fireEvent.click(lowBtn)
    expect(mockSetDensity).toHaveBeenCalledWith('low')

    const highBtn = screen.getByRole('radio', { name: /high/i })
    fireEvent.click(highBtn)
    expect(mockSetDensity).toHaveBeenCalledWith('high')
  })
})
