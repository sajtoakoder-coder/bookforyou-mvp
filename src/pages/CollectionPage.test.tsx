import { cleanup, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { afterEach, expect, it } from 'vitest'
import App from '../App'

afterEach(() => { cleanup(); window.history.pushState({}, '', '/') })

it('marks №001 as the current release in a finite collection', () => {
  window.history.pushState({}, '', '/collection')
  render(<App />)
  expect(screen.getByRole('heading', { name: 'Коллекция' })).toBeVisible()
  expect(screen.getByText('BOOKFORYOU №001')).toBeVisible()
  expect(screen.getByText('Текущий выпуск')).toBeVisible()
  expect(screen.getAllByRole('article')).toHaveLength(3)
})
