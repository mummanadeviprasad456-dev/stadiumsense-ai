import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import OrganizerPage from '../src/app/organizer/page'
import { StadiumProvider } from '../src/context/StadiumContext'

vi.mock('next/navigation', () => ({
  usePathname: () => '/organizer',
}))

describe('Organizer Analytics Hub Page (OrganizerPage)', () => {

  it('should render the organizer hub title and key stats cards', () => {
    render(
      <StadiumProvider>
        <OrganizerPage />
      </StadiumProvider>
    )

    expect(screen.getByRole('heading', { name: /Organizer Analytics Hub/i })).toBeInTheDocument()
    expect(screen.getByText('Avg Entry Time')).toBeInTheDocument()
    expect(screen.getByText('Nationality Diversity')).toBeInTheDocument()
    expect(screen.getByText('AI Queries Today')).toBeInTheDocument()
    expect(screen.getByText('Carbon Saved')).toBeInTheDocument()
  })

  it('should display SVG charts for crowd stats and incidents', () => {
    render(
      <StadiumProvider>
        <OrganizerPage />
      </StadiumProvider>
    )

    const barChart = screen.getByRole('img', { name: /Bar chart/i })
    const lineChart = screen.getByRole('img', { name: /Line trend chart/i })
    expect(barChart).toBeInTheDocument()
    expect(lineChart).toBeInTheDocument()
  })

  it('should list nationalities in the fan distribution section', () => {
    render(
      <StadiumProvider>
        <OrganizerPage />
      </StadiumProvider>
    )

    expect(screen.getByText('USA')).toBeInTheDocument()
    expect(screen.getByText('ARG')).toBeInTheDocument()
    expect(screen.getByText('Brazil')).toBeInTheDocument()
    expect(screen.getByText('Mexico')).toBeInTheDocument()
  })

  it('should display sustainability metrics on the dashboard', () => {
    render(
      <StadiumProvider>
        <OrganizerPage />
      </StadiumProvider>
    )

    expect(screen.getByText('Recycling Rate')).toBeInTheDocument()
    expect(screen.getByText('Digital Ticket Adoption')).toBeInTheDocument()
    expect(screen.getByText('Eco Transport Mode')).toBeInTheDocument()
  })

  it('should show and update live visitor count section', () => {
    render(
      <StadiumProvider>
        <OrganizerPage />
      </StadiumProvider>
    )

    // Section heading is always present
    expect(screen.getByText('Live Visitor Count')).toBeInTheDocument()
    // Initial value renders — may appear in multiple locations (live count + sidebar)
    expect(screen.getAllByText('54,200').length).toBeGreaterThan(0)
    // Fluctuation rate display should be present (e.g. "+15/min")
    expect(screen.getByText(/\/min/i)).toBeInTheDocument()
  })
})
