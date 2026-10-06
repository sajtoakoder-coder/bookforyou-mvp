import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { afterEach, describe, expect, it } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import Header from './Header'

afterEach(cleanup)

function renderHeader() {
  return render(<MemoryRouter><Header /></MemoryRouter>)
}

describe('Header', () => {
  it('opens and closes the mobile navigation with an accessible button', () => {
    renderHeader()
    const button = screen.getByRole('button', { name: 'Меню' })
    const navigation = document.querySelector('nav[aria-label="Основная навигация"]') as HTMLElement

    expect(button).toHaveAttribute('aria-expanded', 'false')
    expect(navigation).not.toBeVisible()
    fireEvent.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'true')
    expect(navigation).toBeVisible()
    fireEvent.click(button)
    expect(navigation).not.toBeVisible()
  })

  it('closes on Escape and returns keyboard focus to the menu button', () => {
    renderHeader()
    const button = screen.getByRole('button', { name: 'Меню' })
    fireEvent.click(button)
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(button).toHaveAttribute('aria-expanded', 'false')
    expect(button).toHaveFocus()
  })

  it('closes after navigation to a new route', () => {
    renderHeader()
    const button = screen.getByRole('button', { name: 'Меню' })
    fireEvent.click(button)
    fireEvent.click(screen.getByRole('navigation', { name: 'Основная навигация' }).querySelector('a[href="/collection"]')!)
    expect(button).toHaveAttribute('aria-expanded', 'false')
  })
})
