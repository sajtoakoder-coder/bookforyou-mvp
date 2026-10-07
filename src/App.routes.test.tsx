import { cleanup, render, screen, within } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { afterEach, describe, expect, it } from 'vitest'
import App from './App'
import { collection, getEditionBySlug } from './data/editions'
import { legalPages } from './data/legalPages'

function renderAtPath(path: string) {
  window.history.pushState({}, '', path)
  return render(<App />)
}

afterEach(() => {
  cleanup()
  window.history.pushState({}, '', '/')
})

describe('edition data', () => {
  it('finds BOOKFORYOU №001 by slug with its exact price', () => {
    expect(getEditionBySlug('001')?.price).toBe('4 900 ₽')
    expect(getEditionBySlug('001')?.isCurrent).toBe(true)
    expect(getEditionBySlug('001')?.title).toBe('Гений')
    expect(getEditionBySlug('001')?.author).toBe('Теодор Драйзер')
  })

  it('keeps the collection finite and returns nothing for unknown slugs', () => {
    expect(collection.length).toBeGreaterThan(0)
    expect(collection.length).toBeLessThanOrEqual(3)
    expect(getEditionBySlug('999')).toBeUndefined()
  })
})

describe('direct routes', () => {
  it('renders the home page', () => {
    renderAtPath('/')
    expect(screen.getByRole('heading', { level: 1, name: 'КНИГА ДЛЯ ТЕБЯ' })).toBeInTheDocument()
  })

  it('renders the current edition for a direct URL', () => {
    renderAtPath('/edition/001')
    expect(screen.getByRole('heading', { level: 1, name: 'Гений' })).toBeInTheDocument()
    expect(within(screen.getByRole('main')).getByText('4 900 ₽')).toBeInTheDocument()
  })

  it('renders the collection for a direct URL', () => {
    renderAtPath('/collection')
    expect(screen.getByRole('heading', { name: /коллекция/i })).toBeInTheDocument()
  })

  it.each(legalPages)('renders the $title legal placeholder for a direct URL', ({ slug, title }) => {
    renderAtPath(`/legal/${slug}`)
    expect(screen.getByRole('heading', { name: title })).toBeInTheDocument()
    expect(screen.getByText(/будет опубликована к запуску продаж/i)).toBeInTheDocument()
  })

  it.each(['/missing', '/edition/999', '/legal/missing'])('shows not found at %s', (path) => {
    renderAtPath(path)
    expect(screen.getByRole('heading', { name: /страница не найдена/i })).toBeInTheDocument()
  })
})
