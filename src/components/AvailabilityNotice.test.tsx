import { cleanup, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { afterEach, describe, expect, it } from 'vitest'
import AvailabilityNotice from './AvailabilityNotice'

afterEach(cleanup)

describe('AvailabilityNotice', () => {
  it('renders the exact release message without purchase controls', () => {
    render(<AvailabilityNotice />)
    expect(screen.getByText('СКОРО БУДЕТ ДОСТУПНО')).toBeVisible()
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
    expect(screen.queryByRole('form')).not.toBeInTheDocument()
  })
})
