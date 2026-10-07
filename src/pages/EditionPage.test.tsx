import { cleanup, render, screen, within } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { afterEach, expect, it } from 'vitest'
import App from '../App'

afterEach(() => { cleanup(); window.history.pushState({}, '', '/') })

it('shows release data and truthful availability for a direct edition route', () => {
  window.history.pushState({}, '', '/edition/001')
  render(<App />)
  expect(screen.getByRole('link', { name: /Вернуться к коллекции/ })).toHaveAttribute('href', '/collection')
  expect(screen.getByRole('heading', { level: 1, name: 'Гений' })).toBeVisible()
  expect(screen.getByText('Теодор Драйзер')).toBeVisible()
  expect(within(screen.getByRole('main')).getByText('4 900 ₽')).toBeVisible()
  expect(screen.getByRole('link', { name: 'Рассмотреть комплект' })).toHaveAttribute('href', '/edition/001#inside')
  expect(screen.queryByText('Описание выпуска будет добавлено')).not.toBeInTheDocument()
  expect(screen.getByText('СКОРО БУДЕТ ДОСТУПНО')).toBeVisible()
  expect(screen.queryByRole('button', { name: /скоро будет доступно/i })).not.toBeInTheDocument()
  expect(screen.getByText('КАРТОЧКА С КООРДИНАТАМИ')).toBeVisible()
})
