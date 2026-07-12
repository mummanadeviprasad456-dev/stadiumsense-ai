import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import AIAssistant from '../src/components/AIAssistant'

describe('AIAssistant Component', () => {
  const mockT = vi.fn((key: string) => {
    const dict: Record<string, string> = {
      aiDefaultResponse: 'Welcome to MetLife Stadium!',
      aiAssistant: 'StadiumSense AI Companion',
    }
    return dict[key] || key
  })

  it('should render the floating AI trigger button initially', () => {
    render(
      <AIAssistant
        role="fan"
        density="medium"
        lang="en"
        t={mockT}
      />
    )

    const triggerBtn = screen.getByRole('button', { name: /open ai assistant/i })
    expect(triggerBtn).toBeInTheDocument()
  })

  it('should open the chat drawer panel when clicked', () => {
    render(
      <AIAssistant
        role="fan"
        density="medium"
        lang="en"
        t={mockT}
      />
    )

    const triggerBtn = screen.getByRole('button', { name: /open ai assistant/i })
    fireEvent.click(triggerBtn)

    // Header and assistant title should be visible
    expect(screen.getByText('StadiumSense AI Companion')).toBeInTheDocument()
    expect(screen.getByText('Welcome to MetLife Stadium!')).toBeInTheDocument()
  })

  it('should display role-specific quick questions', () => {
    render(
      <AIAssistant
        role="fan"
        density="medium"
        lang="en"
        t={mockT}
      />
    )

    const triggerBtn = screen.getByRole('button', { name: /open ai assistant/i })
    fireEvent.click(triggerBtn)

    // For fan role, check for one of the quick questions
    expect(screen.getByText('Where is my seat?')).toBeInTheDocument()
    expect(screen.getByText('Nearest washroom?')).toBeInTheDocument()
  })
})
