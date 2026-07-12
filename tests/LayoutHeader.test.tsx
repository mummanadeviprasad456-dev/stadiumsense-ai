import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import LayoutHeader from '../src/components/LayoutHeader'
import { StadiumProvider } from '../src/context/StadiumContext'

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

describe('LayoutHeader Component', () => {
  it('should render the header and navigation links', () => {
    render(
      <StadiumProvider>
        <LayoutHeader />
      </StadiumProvider>
    )

    // Check brand title
    expect(screen.getByLabelText('StadiumSense AI Home')).toBeInTheDocument()

    // Check nav links (accessible using role link or text)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Fans')).toBeInTheDocument()
    expect(screen.getByText('Staff')).toBeInTheDocument()
    expect(screen.getByText('Organizers')).toBeInTheDocument()
    expect(screen.getByText('Volunteers')).toBeInTheDocument()
  })

  it('should toggle accessibility menu when clicked', () => {
    render(
      <StadiumProvider>
        <LayoutHeader />
      </StadiumProvider>
    )

    const accessibilityBtn = screen.getByLabelText(/open accessibility settings/i)
    fireEvent.click(accessibilityBtn)

    // Toolkit should open and show settings
    expect(screen.getByText('High Contrast Mode')).toBeInTheDocument()
    expect(screen.getByText('Large Text Size')).toBeInTheDocument()
    expect(screen.getByText('Color-Blind Friendly Colors')).toBeInTheDocument()
  })

  it('should toggle language selector menu when clicked', () => {
    render(
      <StadiumProvider>
        <LayoutHeader />
      </StadiumProvider>
    )

    const langBtn = screen.getByLabelText(/change language/i)
    fireEvent.click(langBtn)

    // Language dropdown should open and show language options
    expect(screen.getAllByText('English').length).toBeGreaterThan(0)
    expect(screen.getByText('हिन्दी')).toBeInTheDocument()
    expect(screen.getByText('తెలుగు')).toBeInTheDocument()
    expect(screen.getByText('Español')).toBeInTheDocument()
  })
})
