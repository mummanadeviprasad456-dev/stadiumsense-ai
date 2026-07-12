import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import StaffPage from '../src/app/staff/page'
import { StadiumProvider } from '../src/context/StadiumContext'

vi.mock('next/navigation', () => ({
  usePathname: () => '/staff',
}))

describe('Staff Operations Dashboard Page (StaffPage)', () => {
  it('should render the dashboard header and KPI metrics', () => {
    render(
      <StadiumProvider>
        <StaffPage />
      </StadiumProvider>
    )

    expect(screen.getByRole('heading', { name: /Staff Operations Dashboard/i })).toBeInTheDocument()
    expect(screen.getByText('Active Incidents')).toBeInTheDocument()
    expect(screen.getByText('Resolved Today')).toBeInTheDocument()
    expect(screen.getByText('Staff On-Duty')).toBeInTheDocument()
  })

  it('should list incidents from initial data', () => {
    render(
      <StadiumProvider>
        <StaffPage />
      </StadiumProvider>
    )

    // Real incident titles from mockData.ts
    expect(screen.getByText('Spill near Food Court B')).toBeInTheDocument()
    expect(screen.getByText('Elevator 4 Malfunction')).toBeInTheDocument()
    expect(screen.getByText('Crowd surge block')).toBeInTheDocument()
  })

  it('should dispatch a pending incident when Dispatch is clicked', () => {
    render(
      <StadiumProvider>
        <StaffPage />
      </StadiumProvider>
    )

    // "Spill near Food Court B" is the pending incident with a Dispatch button
    const dispatchBtns = screen.getAllByRole('button', { name: /Dispatch/i })
    expect(dispatchBtns.length).toBeGreaterThan(0)
    fireEvent.click(dispatchBtns[0])

    // After dispatch, the status badge for that incident changes to "dispatched"
    const dispatched = screen.getAllByText('dispatched')
    expect(dispatched.length).toBeGreaterThan(0)
  })

  it('should post a staff announcement successfully', () => {
    render(
      <StadiumProvider>
        <StaffPage />
      </StadiumProvider>
    )

    const input = screen.getByPlaceholderText(/Broadcast message.../i)
    const postBtn = screen.getByRole('button', { name: /Post announcement/i })

    fireEvent.change(input, { target: { value: 'Gate D is now reopened' } })
    fireEvent.click(postBtn)

    expect(screen.getByText('Gate D is now reopened')).toBeInTheDocument()
    expect(screen.getByText('Staff Broadcast')).toBeInTheDocument()
    // Input should be cleared
    expect(input).toHaveValue('')
  })
})
