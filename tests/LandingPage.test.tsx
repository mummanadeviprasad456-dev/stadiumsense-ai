import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import HomePage from '../src/app/page'
import { StadiumProvider } from '../src/context/StadiumContext'

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

describe('Landing Page (HomePage)', () => {
  it('should render the hero section with StadiumSense AI title', () => {
    render(
      <StadiumProvider>
        <HomePage />
      </StadiumProvider>
    )

    // Check for hero headings
    expect(screen.getByRole('heading', { name: /StadiumSense/i })).toBeInTheDocument()
    expect(screen.getByText('Smart Stadium Operations & Tournament Assistant')).toBeInTheDocument()
  })

  it('should render the interactive portal cards for different roles', () => {
    render(
      <StadiumProvider>
        <HomePage />
      </StadiumProvider>
    )

    // Check if role portal link text exists
    expect(screen.getByRole('heading', { name: /Fan Portal/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Staff Dashboard/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Organizer Dashboard/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Volunteer Assistant/i })).toBeInTheDocument()
  })

  it('should render the live statistics bar with carbon and fans data', () => {
    render(
      <StadiumProvider>
        <HomePage />
      </StadiumProvider>
    )

    // Check stats metrics labels
    expect(screen.getByText('Fans Assisted Today')).toBeInTheDocument()
    expect(screen.getByText('AI Queries Resolved')).toBeInTheDocument()
    expect(screen.getByText('Incidents Managed')).toBeInTheDocument()
    expect(screen.getByText('Carbon Saved')).toBeInTheDocument()
  })

  it('should render the Match Day Timeline with live status', () => {
    render(
      <StadiumProvider>
        <HomePage />
      </StadiumProvider>
    )

    // Check for schedule timeline elements
    expect(screen.getByText(/Today.*s Match Day Schedule/i)).toBeInTheDocument()
    expect(screen.getByText('⚽ USA vs ARGENTINA – Kick-Off')).toBeInTheDocument()
    expect(screen.getByText('Pre-Match Entertainment – Main Pitch')).toBeInTheDocument()
  })
})
