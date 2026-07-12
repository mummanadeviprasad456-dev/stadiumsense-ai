import React from 'react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import SOSButton from '../src/components/SOSButton'

describe('SOSButton Component', () => {
  const mockT = vi.fn((key: string, vars?: Record<string, string | number>) => {
    if (key === 'sos') return 'SOS EMERGENCY'
    if (key === 'sosTriggered') return 'SOS Triggered'
    if (key === 'sosCountdown') return `Triggering SOS in ${vars?.seconds || 3} seconds`
    return key
  })

  let mockOnTriggered = vi.fn()

  beforeEach(() => {
    vi.useFakeTimers()
    mockOnTriggered = vi.fn()
  })

  afterEach(() => {
    vi.clearAllMocks()
    vi.clearAllTimers()
    vi.useRealTimers()
  })

  it('should render the default SOS button initially', () => {
    render(<SOSButton t={mockT} onTriggered={mockOnTriggered} />)
    const button = screen.getByRole('button', { name: /press sos emergency button/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('SOS EMERGENCY')
  })

  it('should enter countdown state when clicked', async () => {
    render(<SOSButton t={mockT} onTriggered={mockOnTriggered} />)
    const button = screen.getByRole('button', { name: /press sos emergency button/i })
    fireEvent.click(button)

    expect(screen.getByText('Triggering SOS in 3 seconds')).toBeInTheDocument()
  })

  it('should count down and trigger SOS after 3 seconds', async () => {
    render(<SOSButton t={mockT} onTriggered={mockOnTriggered} />)
    const button = screen.getByRole('button', { name: /press sos emergency button/i })
    fireEvent.click(button)

    // Advance 1 second
    act(() => {
      vi.advanceTimersByTime(1000)
    })
    expect(screen.getByText('Triggering SOS in 2 seconds')).toBeInTheDocument()

    // Advance remaining 2 seconds
    act(() => {
      vi.advanceTimersByTime(2000)
    })

    // Should display triggered state
    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.getByText(/SOS Triggered/i)).toBeInTheDocument()
    
    // Check if parent callback is triggered (using timeout)
    act(() => {
      vi.advanceTimersByTime(10)
    })
    expect(mockOnTriggered).toHaveBeenCalledWith(expect.stringContaining('Gate A'))
  })

  it('should cancel countdown when clicked during countdown', () => {
    render(<SOSButton t={mockT} onTriggered={mockOnTriggered} />)
    const button = screen.getByRole('button', { name: /press sos emergency button/i })
    fireEvent.click(button)

    const countdownButton = screen.getByRole('button', { name: /cancelling sos countdown/i })
    fireEvent.click(countdownButton)

    // Should reset back to idle state
    const originalButton = screen.getByRole('button', { name: /press sos emergency button/i })
    expect(originalButton).toBeInTheDocument()
    expect(mockOnTriggered).not.toHaveBeenCalled()
  })
})
