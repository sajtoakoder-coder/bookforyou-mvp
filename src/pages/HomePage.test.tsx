import { cleanup, render, screen, within } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { afterEach, expect, it } from 'vitest'
import App from '../App'

afterEach(() => { cleanup(); window.history.pushState({}, '', '/') })

it('leads with the campaign title, release plaque and launch statement', () => {
  render(<App />)
  const title = screen.getByRole('heading', { level: 1, name: 'BOOK FOR YOU' })
  for (const line of ['BOOK', 'FOR', 'YOU']) expect(within(title).getByText(line)).toBeVisible()
  const hero = screen.getByRole('region', { name: 'BOOK FOR YOU' })
  expect(within(hero).getByText('№001')).toBeVisible()
  expect(within(hero).getByText('ВЫПУСК №001 — 4 900 ₽')).toBeVisible()
  expect(within(hero).getByText('СКОРО БУДЕТ ДОСТУПНО')).toBeVisible()
  expect(screen.getByRole('region', { name: 'Первый выпуск' })).toHaveTextContent('История начинается с человека.')
  expect(within(hero).queryByRole('button')).not.toBeInTheDocument()
})

it('shows the editorial story, gift destination and every required physical object', () => {
  window.history.pushState({}, '', '/')
  render(<App />)
  expect(screen.getByRole('heading', { name: 'Почему эта книга здесь' })).toBeVisible()
  expect(screen.getByText('КНИГА')).toBeVisible()
  expect(screen.getByText('КОРОБКА')).toBeVisible()
  expect(screen.getByText('ЗАПЕЧАТАННЫЙ КОНВЕРТ')).toBeVisible()
  expect(screen.getByText('КАРТОЧКА С КООРДИНАТАМИ')).toBeVisible()
  expect(screen.getByRole('heading', { name: 'BOOKFORYOU для другого' })).toBeVisible()
  expect(screen.getByRole('region', { name: 'BOOKFORYOU для другого' })).toHaveAttribute('id', 'gift')
  expect(screen.getByText('Рита Ленских')).toBeVisible()
})
