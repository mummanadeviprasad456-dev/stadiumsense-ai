import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import VolunteerPage from '../src/app/volunteer/page'
import { StadiumProvider } from '../src/context/StadiumContext'

vi.mock('next/navigation', () => ({
  usePathname: () => '/volunteer',
}))

// Mock the gemini translateText utility to avoid real API calls
vi.mock('../src/utils/gemini', () => ({
  translateText: vi.fn().mockResolvedValue('¿Dónde está el baño?'),
  getAIResponse: vi.fn().mockResolvedValue('AI response'),
}))

describe('Volunteer Assistant Hub Page (VolunteerPage)', () => {
  it('should render the volunteer hub title and AI alert banner', () => {
    render(
      <StadiumProvider>
        <VolunteerPage />
      </StadiumProvider>
    )

    expect(screen.getByRole('heading', { name: /Volunteer Assistant Hub/i })).toBeInTheDocument()
    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.getByText(/AI Volunteer Briefing/i)).toBeInTheDocument()
  })

  it('should render the default Live Translator tab', () => {
    render(
      <StadiumProvider>
        <VolunteerPage />
      </StadiumProvider>
    )

    expect(screen.getByRole('tab', { name: /Live Translator/i, selected: true })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Real-Time Fan Translation Tool/i })).toBeInTheDocument()

    // Common phrase buttons — use getAllByText since the phrase appears in both the button and the translation panel
    expect(screen.getAllByText('Where is the washroom?').length).toBeGreaterThan(0)
    expect(screen.getAllByText('How do I get to my seat?').length).toBeGreaterThan(0)
    expect(screen.getAllByText('I need medical help').length).toBeGreaterThan(0)
  })

  it('should switch target language when a language button is clicked', () => {
    render(
      <StadiumProvider>
        <VolunteerPage />
      </StadiumProvider>
    )

    const arabicBtn = screen.getByRole('button', { name: /Arabic/i })
    fireEvent.click(arabicBtn)
    expect(arabicBtn).toHaveAttribute('aria-pressed', 'true')
  })

  it('should render the emergency response guide on the Translator tab', () => {
    render(
      <StadiumProvider>
        <VolunteerPage />
      </StadiumProvider>
    )

    expect(screen.getByText('Fan Medical Emergency')).toBeInTheDocument()
    expect(screen.getByText('Missing Child')).toBeInTheDocument()
    expect(screen.getByText('Crowd Surge')).toBeInTheDocument()
    expect(screen.getByText('Suspicious Package')).toBeInTheDocument()
  })

  it('should switch to My Tasks tab and show unchecked volunteer checklist', () => {
    render(
      <StadiumProvider>
        <VolunteerPage />
      </StadiumProvider>
    )

    fireEvent.click(screen.getByRole('tab', { name: /My Tasks/i }))

    expect(screen.getByRole('heading', { name: /My Volunteer Tasks/i })).toBeInTheDocument()
    const checkboxes = screen.getAllByRole('checkbox')
    checkboxes.forEach(cb => expect(cb).not.toBeChecked())
  })

  it('should mark a volunteer task as done when checkbox is clicked', () => {
    render(
      <StadiumProvider>
        <VolunteerPage />
      </StadiumProvider>
    )

    fireEvent.click(screen.getByRole('tab', { name: /My Tasks/i }))

    const checkboxes = screen.getAllByRole('checkbox')
    fireEvent.click(checkboxes[0])
    expect(checkboxes[0]).toBeChecked()
    expect(screen.getByText('1/8 Done')).toBeInTheDocument()
  })

  it('should switch to Event Schedule tab and render match list', () => {
    render(
      <StadiumProvider>
        <VolunteerPage />
      </StadiumProvider>
    )

    fireEvent.click(screen.getByRole('tab', { name: /Event Schedule/i }))

    expect(screen.getByRole('heading', { name: /Tournament Match Schedule/i })).toBeInTheDocument()
    // From matchSchedule mockData
    expect(screen.getByText('Group B: USA vs Argentina')).toBeInTheDocument()
    expect(screen.getByText('Group A: Mexico vs Canada')).toBeInTheDocument()
  })

  it('should switch to Lost & Found tab and filter items by search', () => {
    render(
      <StadiumProvider>
        <VolunteerPage />
      </StadiumProvider>
    )

    fireEvent.click(screen.getByRole('tab', { name: /Lost & Found/i }))

    expect(screen.getByRole('heading', { name: /Lost & Found Registry/i })).toBeInTheDocument()

    // Real item names from mockData.ts
    expect(screen.getByText('Black leather wallet')).toBeInTheDocument()
    expect(screen.getByText('Argentina Scarf')).toBeInTheDocument()

    // Filter
    const searchInput = screen.getByPlaceholderText(/Search items.../i)
    fireEvent.change(searchInput, { target: { value: 'Argentina' } })
    expect(screen.getByText('Argentina Scarf')).toBeInTheDocument()
    expect(screen.queryByText('Black leather wallet')).not.toBeInTheDocument()
  })
})
