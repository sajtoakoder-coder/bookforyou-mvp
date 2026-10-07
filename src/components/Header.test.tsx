import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import Header from './Header'

afterEach(cleanup)

// JSDOM has no native dialog API. Browser tests cover focus containment.
beforeAll(() => {
  Object.defineProperty(HTMLDialogElement.prototype, 'showModal', { configurable: true, value() { this.setAttribute('open', '') } })
  Object.defineProperty(HTMLDialogElement.prototype, 'close', { configurable: true, value() { this.removeAttribute('open'); this.dispatchEvent(new Event('close')) } })
})
afterAll(() => {
  Reflect.deleteProperty(HTMLDialogElement.prototype, 'showModal')
  Reflect.deleteProperty(HTMLDialogElement.prototype, 'close')
})

function renderHeader() {
  return render(<MemoryRouter><Header /></MemoryRouter>)
}

describe('Header', () => {
  it('exposes the campaign navigation and release marker', () => {
    renderHeader()
    const navigation = document.querySelector('nav[aria-label="Разделы сайта"]') as HTMLElement
    for (const label of ['Коллекция', 'Выпуск №001', 'В подарок']) {
      expect(navigation).toHaveTextContent(label)
    }
    expect(screen.getByText('№001 · 4 900 ₽')).toBeInTheDocument()
    expect(screen.getByText('№001', { selector: 'span' })).toBeVisible()
  })

  it('does not mark the gift destination active on the home page without its hash', () => {
    renderHeader()
    const gift = document.querySelector('nav[aria-label="Разделы сайта"] a[href="/#gift"]')
    expect(gift).not.toHaveAttribute('aria-current')
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
    expect(screen.getByRole('dialog', { name: 'Навигация' })).toBeVisible()
    expect(document.body.style.overflow).toBe('hidden')
    fireEvent.click(screen.getByRole('button', { name: 'Закрыть меню' }))
    expect(navigation).not.toBeVisible()
    expect(document.body.style.overflow).not.toBe('hidden')
    expect(button).toHaveFocus()
  })

  it('closes on Escape and returns keyboard focus to the menu button', () => {
    renderHeader()
    const button = screen.getByRole('button', { name: 'Меню' })
    fireEvent.click(button)
    fireEvent(screen.getByRole('dialog', { name: 'Навигация' }), new Event('cancel', { cancelable: true }))
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
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    // Focus on the new page heading is verified in the browser route shell.
  })

  it('closes when the current destination is selected again', () => {
    render(<MemoryRouter initialEntries={['/collection']}><Header /></MemoryRouter>)
    const button = screen.getByRole('button', { name: 'Меню' })
    fireEvent.click(button)
    fireEvent.click(screen.getByRole('navigation', { name: 'Основная навигация' }).querySelector('a[href="/collection"]')!)
    expect(button).toHaveAttribute('aria-expanded', 'false')
    expect(document.body.style.overflow).not.toBe('hidden')
  })
})
