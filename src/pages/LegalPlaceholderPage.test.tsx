import { render, within } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { describe, expect, it } from 'vitest'
import { legalPages } from '../data/legalPages'
import LegalPlaceholderPage from './LegalPlaceholderPage'

describe('legal placeholders', () => {
  it.each(legalPages)('shows a truthful placeholder for $slug', (page) => {
    const { container } = render(<LegalPlaceholderPage page={page} />)

    expect(within(container).getByRole('heading', { level: 1, name: page.title })).toBeVisible()
    expect(within(container).getByText('Информация будет опубликована к запуску продаж.')).toBeVisible()
    expect(container).not.toHaveTextContent(/ИНН|ОГРН/i)
    expect(container.querySelector('form, input, select, textarea, [type="checkbox"]')).toBeNull()
  })
})
