import { cleanup, render, screen, within } from '@testing-library/react'
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
  const current = screen.getByRole('article', { name: 'BOOKFORYOU №001' })
  expect(within(current).getByRole('img')).toBeVisible()
  expect(within(current).getByText('4 900 ₽')).toBeVisible()
  expect(within(current).getByRole('link', { name: /Узнать о выпуске/ })).toHaveAttribute('href', '/edition/001')
  for (const number of ['№002', '№003']) {
    const row = screen.getByRole('article', { name: `BOOKFORYOU ${number}` })
    expect(within(row).getByText('Будущий выпуск')).toBeVisible()
    expect(within(row).getByText('Название книги будет объявлено')).toBeVisible()
    expect(within(row).getByText('Цена будет объявлена')).toBeVisible()
    expect(within(row).queryByRole('img')).not.toBeInTheDocument()
    expect(within(row).queryByRole('link')).not.toBeInTheDocument()
  }
})
