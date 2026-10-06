import { cleanup, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { afterEach, expect, it } from 'vitest'
import App from '../App'

afterEach(() => { cleanup(); window.history.pushState({}, '', '/') })

it('shows release data and truthful availability for a direct edition route', () => {
  window.history.pushState({}, '', '/edition/001')
  render(<App />)
  expect(screen.getByRole('heading', { name: 'BOOKFORYOU №001' })).toBeVisible()
  expect(screen.getByText('Название книги будет объявлено')).toBeVisible()
  expect(screen.getByText('Автор будет объявлен')).toBeVisible()
  expect(screen.getByText('4 900 ₽')).toBeVisible()
  expect(screen.getByRole('button', { name: 'Скоро будет доступно' })).toHaveAttribute('aria-disabled', 'true')
  expect(screen.getByText('КАРТОЧКА С КООРДИНАТАМИ')).toBeVisible()
})
