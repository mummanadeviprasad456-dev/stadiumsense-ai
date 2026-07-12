import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import FanPage from '../src/app/fan/page'
import { StadiumProvider } from '../src/context/StadiumContext'

vi.mock('next/navigation', () => ({
  usePathname: () => '/fan',
}))

describe('Fan Portal Page (FanPage)', () => {
  it('should render the fan portal header and default ticket tab', () => {
    render(
      <StadiumProvider>
        <FanPage />
      </StadiumProvider>
    )

    // Check title
    expect(screen.getByRole('heading', { name: /Fan Portal/i })).toBeInTheDocument()

    // Check default tab "My Ticket" is selected
    expect(screen.getByRole('tab', { name: /My Ticket/i, selected: true })).toBeInTheDocument()

    // Check actual ticket data from mockData
    expect(screen.getByRole('region', { name: /Digital match ticket/i })).toBeInTheDocument()
    expect(screen.getByText('Quarter Final: USA vs Argentina')).toBeInTheDocument()
    expect(screen.getByText('Alex Morgan')).toBeInTheDocument()
  })

  it('should toggle ticket scanned state when Simulate Gate Scan is clicked', () => {
    render(
      <StadiumProvider>
        <FanPage />
      </StadiumProvider>
    )

    expect(screen.getByText('🎫 Valid')).toBeInTheDocument()

    // Click Simulate Scan
    fireEvent.click(screen.getByRole('button', { name: /Simulate Gate Scan/i }))
    expect(screen.getByText('✅ Scanned')).toBeInTheDocument()

    // Click Reset
    fireEvent.click(screen.getByRole('button', { name: /Reset Ticket/i }))
    expect(screen.getByText('🎫 Valid')).toBeInTheDocument()
  })

  it('should switch to Map & Routes tab and render gate status section', () => {
    render(
      <StadiumProvider>
        <FanPage />
      </StadiumProvider>
    )

    fireEvent.click(screen.getByRole('tab', { name: /Map & Routes/i }))

    // Verify tab is active
    expect(screen.getByRole('tab', { name: /Map & Routes/i, selected: true })).toBeInTheDocument()
    // Gate Status Check is the dictionary key value
    expect(screen.getByText('Gate Status Check')).toBeInTheDocument()
  })

  it('should switch to Travel tab and render transit information', () => {
    render(
      <StadiumProvider>
        <FanPage />
      </StadiumProvider>
    )

    fireEvent.click(screen.getByRole('tab', { name: /Travel/i }))

    expect(screen.getByRole('tab', { name: /Travel/i, selected: true })).toBeInTheDocument()
    // From mockData transport names
    expect(screen.getByText('Metro Rapid Link (Line 6)')).toBeInTheDocument()
    expect(screen.getByText(/AI Eco Tip/i)).toBeInTheDocument()
  })

  it('should switch to Lost & Found tab and perform search queries', () => {
    render(
      <StadiumProvider>
        <FanPage />
      </StadiumProvider>
    )

    fireEvent.click(screen.getByRole('tab', { name: /Lost & Found/i }))

    expect(screen.getByRole('tab', { name: /Lost & Found/i, selected: true })).toBeInTheDocument()

    // Real item names from mockData
    expect(screen.getByText('Black leather wallet')).toBeInTheDocument()
    expect(screen.getByText('Argentina Scarf')).toBeInTheDocument()

    // Filter by search
    const searchInput = screen.getByPlaceholderText(/Search lost items.../i)
    fireEvent.change(searchInput, { target: { value: 'wallet' } })
    expect(screen.getByText('Black leather wallet')).toBeInTheDocument()
    expect(screen.queryByText('Argentina Scarf')).not.toBeInTheDocument()
  })

  it('should switch to Eco Hub tab and render sustainability statistics', () => {
    render(
      <StadiumProvider>
        <FanPage />
      </StadiumProvider>
    )

    fireEvent.click(screen.getByRole('tab', { name: /Eco Hub/i }))

    expect(screen.getByRole('tab', { name: /Eco Hub/i, selected: true })).toBeInTheDocument()
    // From dictionary: waterRefill = 'Water Refill Stations'
    expect(screen.getByText('Water Refill Stations')).toBeInTheDocument()
    // Hard-coded values in FanPage
    expect(screen.getByText('84.5% Rate')).toBeInTheDocument()
    expect(screen.getByText('98.2% Adoption')).toBeInTheDocument()
  })
})
