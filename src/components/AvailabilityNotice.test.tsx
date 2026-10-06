import { cleanup, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { afterEach, describe, expect, it } from 'vitest'
import AvailabilityNotice from './AvailabilityNotice'

afterEach(cleanup)

describe('AvailabilityNotice', () => {
  it('uses only the non-purchasable availability copy', () => {
    render(<AvailabilityNotice />)
    const button = screen.getByRole('button', { name: 'Скоро будет доступно' })
    expect(button).toBeVisible()
    expect(button).toHaveAttribute('type', 'button')
    expect(button).toHaveAttribute('aria-disabled', 'true')
    expect(screen.queryByText(/^купить$/i)).not.toBeInTheDocument()
  })
})
