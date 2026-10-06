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
  it('exposes the campaign navigation and release marker', () => {
    renderHeader()
    const navigation = document.querySelector('nav[aria-label="Разделы сайта"]') as HTMLElement
    for (const label of ['COLLECTION', 'STORY', 'GIFT']) {
      expect(navigation).toHaveTextContent(label)
    }
    expect(screen.getByText('№001 · 4 900 ₽')).toBeInTheDocument()
    expect(screen.getByText('№001', { selector: 'span' })).toBeVisible()
  })

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
    const destination = screen.getByRole('navigation', { name: 'Основная навигация' }).querySelector('a[href="/collection"]') as HTMLAnchorElement
    destination.focus()
    expect(destination).toHaveFocus()
    fireEvent.click(destination)
    expect(button).toHaveAttribute('aria-expanded', 'false')
    // The route shell transfers focus to the new page heading.
    expect(button).not.toHaveFocus()
  })
})
